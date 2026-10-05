'use client';

import {useMemo,useState} from 'react';

const inr=value=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(value||0);
const amount=value=>Number(String(value||'').replace(/[^\d.]/g,''))||0;

export default function FinanceEligibility(){
 const[income,setIncome]=useState('');
 const[existingEmi,setExistingEmi]=useState('');
 const[rate,setRate]=useState('8.5');
 const[years,setYears]=useState('20');
 const[showResult,setShowResult]=useState(false);
 const[validation,setValidation]=useState('');
 const estimate=useMemo(()=>{
  const monthlyIncome=Math.max(0,amount(income));
  const currentEmi=Math.max(0,amount(existingEmi));
  const annualRate=Math.max(0.1,Number(rate)||8.5);
  const termYears=Math.max(1,Number(years)||20);
  const available=Math.max(0,(monthlyIncome*.5)-currentEmi);
  const monthlyRate=annualRate/1200;
  const months=termYears*12;
  const loan=available?available*(1-Math.pow(1+monthlyRate,-months))/monthlyRate:0;
  return{monthlyIncome,available,loan};
 },[income,existingEmi,rate,years]);
 const update=setter=>event=>{setter(event.target.value);setShowResult(false);setValidation('')};
 const calculate=event=>{
  event?.preventDefault();
  if(!estimate.monthlyIncome){
   setShowResult(false);
   setValidation('Enter a valid monthly income, for example 200000 or ₹2,00,000.');
   return;
  }
  setValidation('');
  setShowResult(true);
 };
 return <section className="financeEligibility" aria-labelledby="eligibility-title"><div className="eligibilityCopy"><span className="kicker">PRIVATE ELIGIBILITY PLANNER</span><h2 id="eligibility-title">Plan your home-loan eligibility.</h2><p>Use this private planning tool before speaking to an advisor. Your figures stay in this browser until you choose to submit a finance enquiry.</p><small>Illustrative only — it uses a conservative 50% total-EMI planning cap. Final eligibility, interest rate and sanction are decided solely by the lender.</small></div><form className="eligibilityCalculator" onSubmit={calculate} noValidate><label>Monthly net income (₹)<input inputMode="numeric" type="text" value={income} onChange={update(setIncome)} placeholder="For example: 2,00,000" autoComplete="off"/></label><label>Existing monthly EMIs (₹)<input inputMode="numeric" type="text" value={existingEmi} onChange={update(setExistingEmi)} placeholder="Enter 0 if none" autoComplete="off"/></label><label>Illustrative interest rate<select value={rate} onChange={update(setRate)}>{['7.5','8','8.5','9','9.5','10'].map(value=><option key={value} value={value}>{value}% p.a.</option>)}</select></label><label>Loan tenure<select value={years} onChange={update(setYears)}>{[10,15,20,25,30].map(value=><option key={value} value={value}>{value} years</option>)}</select></label><button className="actionBlue eligibilityCalculate" type="button" onClick={calculate}>Calculate My Estimate</button>{showResult?<><div className="eligibilityResult" aria-live="polite"><span>Indicative additional EMI capacity</span><strong>{inr(estimate.available)} / month</strong><span>Illustrative home-loan amount</span><b>{inr(estimate.loan)}</b></div><a className="actionBlue eligibilityCta" href="#finance-enquiry">Request A Private Eligibility Review</a><small className="eligibilityNext">Next: complete the short finance enquiry form below. A Way2Paisa advisor will review your requirement privately.</small></>:<div className="eligibilityPlaceholder" aria-live="polite">{validation?<b role="alert">{validation}</b>:<><b>Enter your monthly income, then choose Calculate My Estimate.</b><span>You may enter 200000 or ₹2,00,000. The result appears here instantly and remains private to this browser.</span></>}</div>}</form></section>;
}
