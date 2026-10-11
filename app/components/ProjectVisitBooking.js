'use client';

import {useMemo,useState} from 'react';

const slots=[];for(let hour=10;hour<=19;hour+=1){for(const minute of [0,30]){if(hour===19&&minute===30)continue;const h=hour%12||12;slots.push(`${h}:${String(minute).padStart(2,'0')} ${hour>=12?'pm':'am'}`)}}
const dateValue=date=>{
 const year=date.getFullYear();
 const month=String(date.getMonth()+1).padStart(2,'0');
 const day=String(date.getDate()).padStart(2,'0');
 return `${year}-${month}-${day}`;
};

export default function ProjectVisitBooking({project}){
 const dateBounds=useMemo(()=>{
  const first=new Date();
  first.setHours(12,0,0,0);
  first.setDate(first.getDate()+1);
  const last=new Date(first);
  last.setDate(last.getDate()+59);
  return{min:dateValue(first),max:dateValue(last)};
 },[]);
 const[date,setDate]=useState(dateBounds.min);
 const[time,setTime]=useState(slots[0]);
 const[appointmentType,setAppointmentType]=useState('Site Visit');
 const[form,setForm]=useState({name:'',phone:'',email:'',whatsapp_updates:false,email_notifications:false});
 const[state,setState]=useState({busy:false,message:''});
 const change=event=>setForm(current=>({...current,[event.target.name]:event.target.value}));
 async function submit(event){
  event.preventDefault();
  setState({busy:true,message:''});
  try{
   const response=await fetch('/api/leads',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({
    ...form,
    projectId:project.id,
    projectName:project.name,
    appointmentType,
    appointmentDate:date,
    appointmentTime:time,
    source:`Website - ${appointmentType} Booking`,
    landingPage:window.location.href,
   })});
   const result=await response.json();
   if(!response.ok)throw new Error(result.error||'Unable to book the visit.');
   setState({busy:false,message:`Your ${appointmentType.toLowerCase()} request has been received. Our advisor will call to confirm the appointment.`});
   setForm({name:'',phone:'',email:'',whatsapp_updates:false,email_notifications:false});
  }catch(error){setState({busy:false,message:error.message||'Unable to book the visit. Please try again.'})}
 }
 return <section className="visitBooking" aria-label="Book a project visit or presentation">
  <span className="kicker">PRIVATE APPOINTMENT</span><h3>Book a Visit or Online Presentation</h3><p>Choose your preferred format, date and time. We will confirm developer access or send the presentation link.</p>
  <form onSubmit={submit}>
   <div className="visitTypeGrid" aria-label="Appointment format"><button type="button" className={appointmentType==='Site Visit'?'selected':''} onClick={()=>setAppointmentType('Site Visit')}>🏙️ Site Visit</button><button type="button" className={appointmentType==='Online Presentation'?'selected':''} onClick={()=>setAppointmentType('Online Presentation')}>💻 Online Presentation</button></div>
   <label className="visitDateLabel">Preferred Date<input type="date" required min={dateBounds.min} max={dateBounds.max} value={date} onChange={event=>setDate(event.target.value)}/><small>Choose any date in the next 60 days. We will confirm the appointment with you.</small></label>
   <label>Preferred Time<select value={time} onChange={event=>setTime(event.target.value)}>{slots.map(slot=><option key={slot}>{slot}</option>)}</select></label>
   <label>Your Name<input name="name" value={form.name} onChange={change} required placeholder="Full name"/></label>
   <label>Mobile Number<input name="phone" value={form.phone} onChange={change} required inputMode="tel" placeholder="10-digit mobile number"/></label>
   <label>Email <small>(optional)</small><input name="email" value={form.email} onChange={change} type="email" placeholder="you@example.com"/></label>
   <label className="check"><input type="checkbox" name="whatsapp_updates" checked={form.whatsapp_updates} onChange={change}/>Get relevant Way2Paisa updates on WhatsApp</label><label className="check"><input type="checkbox" name="email_notifications" checked={form.email_notifications} onChange={change}/>Subscribe to relevant email updates</label>
   <button className="primaryBtn actionBlue visitSubmit" disabled={state.busy}>{state.busy?'Sending…':appointmentType==='Site Visit'?'Request Site Visit':'Request Online Presentation'}</button>
   {state.message&&<p className={state.message.startsWith('Your')?'formSuccess':'formError'} role="status">{state.message}</p>}
  </form>
 </section>;
}
