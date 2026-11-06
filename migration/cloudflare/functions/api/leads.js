// Cloudflare Pages /api/leads — server-side RLS-safe public CRM intake.
// Public key permits INSERT but never CRM SELECT; encrypted Resend/MSG91 keys remain server-side.
const reply=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store'}});
const clean=(s,max=300)=>typeof s==='string'?s.trim().slice(0,max):'';
const ipRequests=new Map();
function checkRate(ip){
 const now=Date.now();
 if(ipRequests.size>1500)ipRequests.clear();
 const row=ipRequests.get(ip)||{count:0,until:now+60000};
 if(now>row.until){row.count=0;row.until=now+60000}
 row.count++;ipRequests.set(ip,row);return row.count<=5;
}
function validPhone(s){
 const digits=s.replace(/\D/g,'');
 return /^[+\d\s().-]+$/.test(s)&&digits.length>=8&&digits.length<=15&&!/^(\d)\1+$/.test(digits);
}
function validAppointment(type,date,time,zone){
 if(!type)return{ok:true,date:null,time:null};
 if(!/^\d{4}-\d{2}-\d{2}$/.test(date))return{ok:false};
 const m=/^(\d{1,2}):([0-5]\d)(?:\s*(am|pm))?$/i.exec(time);
 if(!m)return{ok:false};
 let h=Number(m[1]),minute=Number(m[2]);
 if(m[3]){if(h<1||h>12)return{ok:false};h=h%12+(m[3].toLowerCase()==='pm'?12:0)}
 if(h<10||h>19||(minute!==0&&minute!==30)||(h===19&&minute>0))return{ok:false};
 const now=new Date(),dateMs=Date.UTC(...date.split('-').map((v,i)=>Number(v)-(i===1?1:0)));
 if(!Number.isFinite(dateMs)||new Date(dateMs).toISOString().slice(0,10)!==date)return{ok:false};
 const local=new Intl.DateTimeFormat('en-CA',{timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit'}).format(now);
 const min=/^\d{4}-/.test(local)?local:local.replace(/(\d{2})\/(\d{2})\/(\d{4})/,'$3-$1-$2');
 const earliest=Date.parse(min+'T00:00:00Z');
 if(dateMs<earliest||dateMs>earliest+60*86400000)return{ok:false};
 return{ok:true,date,time:String(h).padStart(2,'0')+':'+m[2]+':00'};
}
export async function onRequestGet(){return reply({error:'Use POST to submit an enquiry'},405)}
export async function onRequestPost({request,env}){
 const origin=request.headers.get('Origin');
 if(origin&&origin!==new URL(request.url).origin)return reply({error:'Invalid origin'},403);
 if(Number(request.headers.get('content-length')||0)>12000)return reply({error:'Enquiry too large'},413);
 if(!checkRate(request.headers.get('CF-Connecting-IP')||'unknown'))return reply({error:'Please try again later'},429);
 let body;try{body=await request.json()}catch{return reply({error:'Invalid enquiry JSON'},400)}
 if(!body||typeof body!=='object'||Array.isArray(body))return reply({error:'Invalid enquiry'},400);
 if(clean(body.website,90))return reply({ok:true,notificationWarning:false});
 const name=clean(body.name,120),phone=clean(body.phone,40),email=clean(body.email,160);
 const projectId=clean(body.projectId,64),projectName=clean(body.projectName,200)||'General advisory enquiry';
 const preferredBhk=clean(body.preferred_bhk,80),budget=clean(body.budget,100);
 const places=clean(body.preferred_locations,300),financeProduct=clean(body.financeProduct,120),employment=clean(body.employmentType,120);
 const appointmentType=clean(body.appointmentType,80),apptDate=clean(body.appointmentDate,20),apptTime=clean(body.appointmentTime,20);
 const zone=body.appointmentTimeZone==='Asia/Dubai'?'Asia/Dubai':'Asia/Kolkata';
 const landing=clean(body.landingPage,1000);
 const whatsapp=body.whatsapp_updates===true,emailConsent=body.email_notifications===true;
 if(!name||!phone)return reply({error:'Please enter your name and mobile number'},400);
 if(!validPhone(phone))return reply({error:'Please enter a valid international contact number'},400);
 if(email&&!/^\S+@\S+\.\S+$/.test(email))return reply({error:'Invalid email address'},400);
 if(projectId&&!/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(projectId))return reply({error:'Invalid project reference'},400);
 const appointment=validAppointment(appointmentType,apptDate,apptTime,zone);
 if(!appointment.ok)return reply({error:'Invalid appointment date or time (next 60 days; 10am–7pm)'},400);
 const base=env.NEXT_PUBLIC_SUPABASE_URL||env.SUPABASE_URL;
 const key=env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY||env.SUPABASE_PUBLISHABLE_KEY;
 if(!base||!key)return reply({error:'CRM temporarily unavailable; contact us by WhatsApp'},503);
 const preference=appointmentType
  ? appointmentType+' on '+apptDate+' at '+apptTime+' ('+zone+')'
  : financeProduct
    ? 'Finance: '+financeProduct+' | '+employment+' | '+budget
    : 'Configuration: '+preferredBhk+' | Budget: '+budget+' | Location: '+places;
 const attr=(body.attribution&&typeof body.attribution==='object'&&!Array.isArray(body.attribution))?body.attribution:{};
 const utm=['utm_source','utm_medium','utm_campaign','utm_content','utm_term','landing_path','referrer_host']
  .map(k=>clean(attr[k],90).replace(/[^a-zA-Z0-9 _./-]/g,'')).filter(Boolean).join(' | ');
 const lead={
  name,phone,email:email||null,project_id:projectId||null,
  source:clean(body.source,100)||'Website - Cloudflare enquiry',
  campaign:projectName,preferred_bhk:preferredBhk||null,budget:budget||null,
  preferred_locations:places||null,landing_page:landing||null,
  remarks:projectName+': '+preference+' | WhatsApp consent: '+(whatsapp?'Yes':'No')+
    ' | Email consent: '+(emailConsent?'Yes':'No')+(utm?' | Attribution: '+utm:''),
  appointment_type:appointmentType||null,
  appointment_date:appointmentType?appointment.date:null,
  appointment_time:appointmentType?appointment.time:null,
  whatsapp_updates:whatsapp,email_notifications:emailConsent
 };
 try{
  const res=await fetch(new URL('/rest/v1/leads',base),{
   method:'POST',headers:{apikey:key,authorization:'Bearer '+key,'content-type':'application/json',prefer:'return=minimal'},
   body:JSON.stringify(lead)
  });
  if(!res.ok){console.error('CRM insert rejected HTTP',res.status);return reply({error:'Unable to save lead. Please contact us via WhatsApp.'},503)}
 }catch(e){console.error('CRM upstream unavailable');return reply({error:'Unable to save lead. Please contact us via WhatsApp.'},503)}
 let notificationWarning=false;
 if(!env.RESEND_API_KEY){notificationWarning=true}else{
  try{
   const subject=appointmentType?'New '+appointmentType+': '+projectName:financeProduct?'New finance enquiry: '+financeProduct:projectId?'New project enquiry: '+projectName:'New advisory enquiry';
   const textBody=[subject,'Name: '+name,'Phone: '+phone,'Email: '+email,'Project: '+projectName,'Requirements: '+preference,'Page: '+landing,'WhatsApp consent: '+whatsapp].join('\n');
   const res=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+env.RESEND_API_KEY,'Content-Type':'application/json'},body:JSON.stringify({from:env.RESEND_FROM_EMAIL||'Way2Paisa Enquiries <onboarding@resend.dev>',to:[env.LEADS_NOTIFICATION_EMAIL||'way2paisaindia@gmail.com'],reply_to:email||undefined,subject,text:textBody})});
   if(!res.ok){notificationWarning=true;console.warn('Resend notification rejected HTTP',res.status)}
  }catch(e){notificationWarning=true;console.warn('Resend notification unavailable')}
 }
 if(env.MSG91_AUTH_KEY){
  try{
   const res=await fetch('https://api.msg91.com/api/v5/whatsapp/whatsapp-outbound-message/bulk/',{
    method:'POST',headers:{authkey:env.MSG91_AUTH_KEY,'content-type':'application/json'},
    body:JSON.stringify({integrated_number:env.MSG91_WHATSAPP_NUMBER||'918850373012',content_type:'template',payload:{messaging_product:'whatsapp',type:'template',template:{name:env.MSG91_WHATSAPP_TEMPLATE||'new_way2paisa_booking',language:{code:'en',policy:'deterministic'},namespace:env.MSG91_WHATSAPP_NAMESPACE||'adfcde5d_459d_4162_8e52_20d0085acf76',to_and_components:[{to:[env.MSG91_WHATSAPP_ALERT_TO||'919820139735'],components:{body_1:{type:'text',value:name},body_2:{type:'text',value:phone+(email?' | '+email:'')},body_3:{type:'text',value:projectName},body_4:{type:'text',value:preference}}}]}}})
   });
   if(!res.ok){notificationWarning=true;console.warn('MSG91 notification rejected HTTP',res.status)}
  }catch(e){notificationWarning=true;console.warn('MSG91 notification unavailable')}
 }
 return reply({ok:true,notificationWarning});
}