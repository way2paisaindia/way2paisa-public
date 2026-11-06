/* Cloudflare Pages zero-SSR public catalogue and lead form. No secrets. */
(()=>{'use strict';
const money=(n,market)=>{const x=Number(n);if(!Number.isFinite(x)||x<=0)return'Price on request';if(String(market).toLowerCase()==='dubai')return'AED '+new Intl.NumberFormat('en-AE',{maximumFractionDigits:0}).format(x);return x<1?'₹'+(+((x*100).toFixed(2))).toLocaleString('en-IN')+' L':'₹'+(+x.toFixed(2)).toLocaleString('en-IN')+' Cr'};
const esc=t=>String(t??'').replace(/[&<>"']/g,k=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[k]));
const imgSource=u=>{try{const uo=new URL(u);return uo.protocol==='https:'?u:''}catch{return''}};
let all=[],show=36,current=[];
const dom=id=>document.getElementById(id);
function makeCard(p){
 const link='/projects/'+encodeURIComponent(p.slug)+'/';
 const image=imgSource(p.hero_image_url);
 const photo=image?'<img src="'+esc(image)+'" alt="'+esc(p.name)+'" loading="lazy" decoding="async" onerror="this.replaceWith(Object.assign(document.createElement(\'span\'),{className:\'no-photo\',textContent:\'Project photograph unavailable\'}))">':'<span class="no-photo">WAY2PAISA SELECT</span>';
 return '<article class="property-card"><a href="'+link+'" class="photo">'+photo+'</a><div class="card-copy"><small>'+esc((p.location||p.market)+' · '+(p.developer||'Developer'))+'</small><h3><a href="'+link+'">'+esc(p.name)+'</a></h3><p>'+esc(p.configuration||p.category||'Property')+'</p><strong>'+esc(money(p.min_price,p.market))+'+</strong></div></article>';
}
function update(){
 const market=dom('market')?.value||'Mumbai',search=String(dom('search')?.value||'').trim().toLowerCase(),cat=dom('category')?.value||'',config=String(dom('configuration')?.value||'').trim().toLowerCase(),budget=Number(dom('maxBudget')?.value||0);
 current=all.filter(p=>{
  const isDubai=String(p.market).toLowerCase()==='dubai';
  if((market==='Dubai')!==isDubai)return false;
  if(cat&&p.category!==cat)return false;
  if(config&&!String(p.configuration).toLowerCase().includes(config))return false;
  if(search&&!((p.name+' '+p.developer+' '+p.location+' '+p.configuration).toLowerCase().includes(search)))return false;
  if(budget>0&&Number(p.min_price)>budget)return false;
  return true;
 });
 current.sort((a,b)=>Number(Boolean(b.featured))-Number(Boolean(a.featured))||a.name.localeCompare(b.name));
 show=36;render();
}
function render(){
 if(!dom('results'))return;
 const list=current.slice(0,show);
 dom('results').innerHTML=list.map(makeCard).join('')||'<p>No published projects match these filters. Please adjust your search.</p>';
 dom('result-count').textContent=current.length.toLocaleString('en-IN')+' published projects found';
 dom('more').style.display=current.length>show?'block':'none';
 dom('more').textContent='Show more ('+(current.length-show).toLocaleString('en-IN')+' remaining)';
}
async function initCatalogue(){
 if(!dom('results'))return;
 const params=new URLSearchParams(location.search);
 if(params.get('market')==='Dubai')dom('market').value='Dubai';
 if(params.get('q'))dom('search').value=params.get('q');
 const response=await fetch('/assets/catalogue.json',{cache:'force-cache'});
 if(!response.ok)throw Error('Published catalogue temporarily unavailable');
 all=await response.json();
 if(!Array.isArray(all)||!all.length)throw Error('Published catalogue temporarily unavailable');
 for(const id of ['market','search','category','configuration','maxBudget'])dom(id)?.addEventListener('input',update);
 dom('more')?.addEventListener('click',()=>{show+=36;render()});
 update();
}
function clean(v,max=300){return String(v||'').trim().slice(0,max)}
async function submitForm(event){
 event.preventDefault();const form=event.currentTarget,feedback=form.querySelector('.form-status'),button=form.querySelector('button[type=submit]');
 const data=new FormData(form);
 if(clean(data.get('website')))return;
 const payload={name:clean(data.get('name'),120),phone:clean(data.get('phone'),40),email:clean(data.get('email'),160),projectId:clean(data.get('projectId'),64),projectName:clean(data.get('projectName'),200),preferred_locations:clean(data.get('preferred_locations'),300),source:'Cloudflare Pages - Website enquiry',landingPage:location.href,whatsapp_updates:data.get('whatsapp_updates')==='on',email_notifications:false};
 button.disabled=true;feedback.textContent='Sending your enquiry…';
 try{
  const response=await fetch('/api/leads',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
  let result=await response.json().catch(()=>({}));
  if(!response.ok||!result.ok)throw Error(result.error||'Unable to submit. Try WhatsApp instead.');
  feedback.textContent='Thank you. Your enquiry was saved. Our team will contact you shortly.'+(result.notificationWarning?' Notification delivery may be delayed.':'');
  form.reset();
 }catch(error){feedback.textContent=error.message+' You can contact us via WhatsApp on +91 88503 73012.'}
 finally{button.disabled=false}
}
document.querySelectorAll('form[data-lead-form]').forEach(f=>f.addEventListener('submit',submitForm));
initCatalogue().catch(error=>{if(dom('result-count'))dom('result-count').textContent=error.message});
})();