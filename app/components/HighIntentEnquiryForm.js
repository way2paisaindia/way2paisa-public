'use client';

import {useState} from 'react';
import {getLeadAttribution,trackSavedLead} from '../lib/lead-attribution';

// Exact public route mapping. Never send a visitor's free-text brief, name,
// telephone number, email address or URL query string to analytics.
const LANDING_TOPICS = {
  '/solutions/mumbai-luxury-homes': 'mumbai_luxury_homes',
  '/solutions/mumbai-commercial-property': 'mumbai_commercial_offices',
  '/solutions/dubai-property-investment': 'dubai_property_investment',
  '/explore/villas-and-plots-mmr': 'mmr_villas_plots'
};

export default function HighIntentEnquiryForm({topic,market}) {
  const [form,setForm]=useState({name:'',phone:'',email:'',preferred_locations:'',preferred_bhk:'',budget:''});
  const [sending,setSending]=useState(false);
  const [submitted,setSubmitted]=useState(false);
  const [error,setError]=useState('');
  const [phoneError,setPhoneError]=useState('');
  const change=event=>{
    setForm(previous=>({...previous,[event.target.name]:event.target.value}));
    if(event.target.name==='phone')setPhoneError('');
  };
  async function submit(event){
    event.preventDefault();
    if(sending)return;
    const rawPhone=form.phone.trim();
    const digits=rawPhone.replace(/\D/g,'');
    // Match the existing server-side validation to give visitors immediate
    // feedback, without excluding +91, +971 or other international formats.
    const validPhone=/^[+\d\s().-]+$/.test(rawPhone)
      && digits.length>=8&&digits.length<=15&&!/^(\d)\1+$/.test(digits);
    if(!validPhone){
      setPhoneError('Enter a valid mobile number (8–15 digits). You may include a country code.');
      return;
    }
    setSending(true);
    setError('');
    setPhoneError('');
    try{
      const response=await fetch('/api/leads',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          ...form,
          projectName:topic,
          source:'Website - High Intent Landing',
          landingPage:window.location.href,
          attribution:getLeadAttribution()
        })
      });
      const result=await response.json();
      if(!response.ok)throw new Error(result.error||'We could not submit your enquiry.');
      trackSavedLead('advisory', {leadTopic: LANDING_TOPICS[window.location.pathname]});
      setSubmitted(true);
    }catch(err){
      setError(err.message||'We could not submit your enquiry. Please try again.');
    }finally{setSending(false);}
  }

  if(submitted)return <div className="solutionFormSuccess" role="status">
    <h3>Enquiry received</h3>
    <p>Thank you. Our advisory team will contact you to discuss your property brief.</p>
    <a href={market==='Dubai'?'/properties?market=Dubai':'/properties?market=Mumbai'}>Continue browsing published projects</a>
  </div>;

  return <form className="solutionForm" onSubmit={submit} aria-label={topic+' enquiry'}>
    <h3>Request a tailored shortlist</h3>
    <p>Tell us what you need. We will coordinate a relevant comparison rather than send unrelated listings.</p>
    <div className="solutionFormFields">
      <label>Full name<input name="name" autoComplete="name" value={form.name} onChange={change} required maxLength={120}/></label>
      <label>Mobile / WhatsApp number<input name="phone" type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={change} aria-invalid={Boolean(phoneError)} aria-describedby={phoneError?'solution-phone-error':undefined} required maxLength={40} placeholder="+91 or +971 …"/>{phoneError&&<span id="solution-phone-error" className="solutionFieldError" role="alert">{phoneError}</span>}</label>
      <label>Email <span>(optional)</span><input name="email" type="email" autoComplete="email" value={form.email} onChange={change} maxLength={160}/></label>
      <label>Preferred location<input name="preferred_locations" value={form.preferred_locations} onChange={change} maxLength={300} placeholder={market==='Dubai'?'Business Bay, Dubai Islands…':'Juhu, Worli, Bandra…'}/></label>
      <label>Property / configuration<input name="preferred_bhk" value={form.preferred_bhk} onChange={change} maxLength={80} placeholder={topic.includes('Office')?'Office area and use':'3 BHK, villa, duplex…'}/></label>
      <label>Approximate budget<input name="budget" value={form.budget} onChange={change} maxLength={100} placeholder={market==='Dubai'?'AED budget':'₹ budget'}/></label>
    </div>
    <button type="submit" disabled={sending}>{sending?'Submitting…':'Request a Callback'}</button>
    {error&&<p className="solutionFormError" role="alert">{error}</p>}
    <small>Submitting authorises a response to this enquiry. Availability, prices and documentation are subject to independent confirmation.</small>
  </form>;
}
