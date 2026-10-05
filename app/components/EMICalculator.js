'use client';

import {useMemo,useState} from 'react';

const inr=n=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(n);
const aed=n=>new Intl.NumberFormat('en-AE',{style:'currency',currency:'AED',maximumFractionDigits:0}).format(n);

export default function EMICalculator({price,market,projectName}){
 const dubai=String(market||'').toLowerCase().includes('dubai');
 const base=Number(price)||0;
 const defaultPrice=dubai?base:(base>=100000?base/10000000:base);
 const[projectPrice,setProjectPrice]=useState(defaultPrice?String(Number(defaultPrice.toFixed(2))):'');
 const[loanPercent,setLoanPercent]=useState('80');
 const[rate,setRate]=useState(dubai?'5.25':'8.5');
 const[years,setYears]=useState('20');
 const estimate=useMemo(()=>{const value=Number(projectPrice),percent=Number(loanPercent),annual=Number(rate),term=Number(years);if(!value||value<=0||!percent||!annual||!term)return null;const principal=dubai?value:value*10000000;const loan=principal*percent/100;const months=term*12;const monthlyRate=annual/1200;const emi=loan*monthlyRate*Math.pow(1+monthlyRate,months)/(Math.pow(1+monthlyRate,months)-1);return{loan,emi,total:emi*months}},[projectPrice,loanPercent,rate,years,dubai]);
 const formatter=dubai?aed:inr;
 return <section className="emiCalculator" aria-labelledby="emi-title"><div className="emiIntro"><span className="kicker">FINANCE PLANNING</span><h2 id="emi-title">Estimate your monthly EMI</h2><p>Use the project’s starting price as a guide, then speak with Way2Paisa for a lender-specific eligibility assessment.</p><a href={`/finance#finance-enquiry`}>Discuss finance for {projectName} →</a></div><div className="emiPanel"><div className="emiInputs"><label>{dubai?'Property value (AED)':'Property value (₹ Cr)'}<input inputMode="decimal" value={projectPrice} onChange={e=>setProjectPrice(e.target.value.replace(/[^0-9.]/g,''))}/></label><label>Loan amount<select value={loanPercent} onChange={e=>setLoanPercent(e.target.value)}>{['60','70','75','80','85','90'].map(value=><option key={value} value={value}>{value}% of property value</option>)}</select></label><label>Interest rate <span>p.a.</span><input inputMode="decimal" value={rate} onChange={e=>setRate(e.target.value.replace(/[^0-9.]/g,''))}/></label><label>Loan tenure<select value={years} onChange={e=>setYears(e.target.value)}>{[5,10,15,20,25,30].map(value=><option key={value} value={value}>{value} years</option>)}</select></label></div>{estimate?<div className="emiResult"><div><span>Estimated monthly EMI</span><strong>{formatter(estimate.emi)}</strong></div><p>Loan amount: <b>{formatter(estimate.loan)}</b> · Total repayment: <b>{formatter(estimate.total)}</b></p></div>:<p className="emiEmpty">Enter a valid property value, interest rate and tenure to calculate an estimate.</p>}<small>This is an indicative calculation only. Actual eligibility, interest rates, terms, charges and approvals are determined solely by the relevant lender.</small></div></section>;
}
