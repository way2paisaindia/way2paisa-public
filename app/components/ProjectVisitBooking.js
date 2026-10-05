'use client';

import {useMemo,useState} from 'react';

const slots=['10:30 AM','12:00 PM','2:30 PM','4:00 PM','5:30 PM'];
const isoDate=date=>date.toISOString().slice(0,10);

export default function ProjectVisitBooking({project}){
 const dates=useMemo(()=>Array.from({length:7},(_,index)=>{const date=new Date();date.setDate(date.getDate()+index+1);return{value:isoDate(date),label:new Intl.DateTimeFormat('en-IN',{weekday:'short',day:'numeric',month:'short'}).format(date)}}),[]);
 const[date,setDate]=useState(dates[0]?.value||'');
 const[time,setTime]=useState(slots[0]);
 const[form,setForm]=useState({name:'',phone:'',email:''});
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
    appointmentType:'Site Visit',
    appointmentDate:date,
    appointmentTime:time,
    source:'Website - Site Visit Booking',
    landingPage:window.location.href,
   })});
   const result=await response.json();
   if(!response.ok)throw new Error(result.error||'Unable to book the visit.');
   setState({busy:false,message:'Your site-visit request is confirmed. Our advisor will call to coordinate access.'});
   setForm({name:'',phone:'',email:''});
  }catch(error){setState({busy:false,message:error.message||'Unable to book the visit. Please try again.'})}
 }
 return <section className="visitBooking" aria-label="Book a site visit">
  <span className="kicker">SITE VISIT</span><h3>Book a project visit</h3><p>Choose a preferred slot. We will confirm developer access with you.</p>
  <form onSubmit={submit}>
   <div className="visitDateGrid">{dates.map(item=><button type="button" key={item.value} className={date===item.value?'selected':''} onClick={()=>setDate(item.value)}>{item.label}</button>)}</div>
   <label>Preferred time<select value={time} onChange={event=>setTime(event.target.value)}>{slots.map(slot=><option key={slot}>{slot}</option>)}</select></label>
   <label>Your name<input name="name" value={form.name} onChange={change} required placeholder="Full name"/></label>
   <label>Mobile number<input name="phone" value={form.phone} onChange={change} required inputMode="tel" placeholder="10-digit mobile number"/></label>
   <label>Email <small>(optional)</small><input name="email" value={form.email} onChange={change} type="email" placeholder="you@example.com"/></label>
   <button className="primaryBtn visitSubmit" disabled={state.busy}>{state.busy?'Sending…':'Request site visit'}</button>
   {state.message&&<p className={state.message.startsWith('Your')?'formSuccess':'formError'} role="status">{state.message}</p>}
  </form>
 </section>;
}
