'use client';

import {useMemo,useState} from 'react';

const inr=value=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(value||0);

export default function FinanceEligibility(){
 const[income,setIncome]=useState('');
 const[existingEmi,setExistingEmi]=useState('');
 const[rate,setRate]=useState('8.5');
 const[years,setYears]=useState('20');
 const estimate=useMemo(()=>{
  const monthlyIncome=Math.max(0,Number(income)||0);
  const currentEmi=Math.max(0,Number(existingEmi)||0);
  const annualRate=Math.max(0.1,Number(rate)||8.5);
  const termYears=Math.max(1,Number(years)||20);
  const available=Math.max(0,(monthlyIncome*.5)-currentEmi);
  const monthlyRate=annualRate/1200;
  const months=termYears*12;
  const loan=available?available*(1-Math.pow(1+monthlyRate,-months))/monthlyRate:0;
  return{available,loan};
 },[income,existingEmi,rate,years]);
 return <section className="financeEligibility" aria-labelledby="eligibility-title"><div className="eligibilityCopy"><span className="kicker">PRIVATE ELIGIBILITY PLANNER</span><h2 id="eligibility-title">Plan your home-loan eligibility.</h2><p>Use this private planning tool before speaking to an advisor. Your figures stay in this browser until you choose to submit a finance enquiry.</p><small>Illustrative only — it uses a conservative 50% total-EMI planning cap. Final eligibility, interest rate and sanction are decided solely by the lender.</small></div><div className="eligibilityCalculator"><label>Monthly net income (₹)<input inputMode="numeric" type="number" min="0" value={income} onChange={event=>setIncome(event.target.value)} placeholder="For example: 200000"/></label><label>Existing monthly EMIs (₹)<input inputMode="numeric" type="number" min="0" value={existingEmi} onChange={event=>setExistingEmi(event.target.value)} placeholder="Enter 0 if none"/></label><label>Illustrative interest rate<select value={rate} onChange={event=>setRate(event.target.value)}>{['7.5','8','8.5','9','9.5','10'].map(value=><option key={value} value={value}>{value}% p.a.</option>)}</select></label><label>Loan tenure<select value={years} onChange={event=>setYears(event.target.value)}>{[10,15,20,25,30].map(value=><option key={value} value={value}>{value} years</option>)}</select></label><div className="eligibilityResult"><span>Indicative additional EMI capacity</span><strong>{inr(estimate.available)} / month</strong><span>Illustrative home-loan amount</span><b>{inr(estimate.loan)}</b></div><a className="actionBlue eligibilityCta" href="#finance-enquiry">Request A Private Eligibility Review</a></div></section>;
}
