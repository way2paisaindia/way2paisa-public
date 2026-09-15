'use client';

import { useEffect, useState } from 'react';

const currencies = ['INR','USD','GBP','EUR','CAD','AUD','SGD','AED'];

export default function CurrencyConverter({ amount, compact=false }) {
  const [currency,setCurrency]=useState('INR');
  const [rates,setRates]=useState({AED:1});
  const [meta,setMeta]=useState(null);
  useEffect(()=>{const saved=localStorage.getItem('way2paisa-dubai-currency');if(saved&&currencies.includes(saved))setCurrency(saved);fetch('/api/fx').then(r=>r.json()).then(d=>{setRates(d.rates||{AED:1});setMeta(d)}).catch(()=>{})},[]);
  const change=e=>{setCurrency(e.target.value);localStorage.setItem('way2paisa-dubai-currency',e.target.value)};
  const n=Number(amount), rate=Number(rates[currency]);
  const converted=Number.isFinite(n)&&Number.isFinite(rate)?n*rate:null;
  const formatted=converted===null?'Price on request':new Intl.NumberFormat(currency==='INR'?'en-IN':'en-US',{style:'currency',currency,maximumFractionDigits:0}).format(converted);
  return <span className={compact?'fxCompact':'fxConverter'}><span>{formatted}</span><select value={currency} onChange={change} aria-label="Display currency">{currencies.map(c=><option key={c} value={c}>{c}</option>)}</select>{!compact&&<small>Approx. conversion from AED{meta?.date?` · rate ${meta.date}`:''}{meta&&!meta.live?' · indicative rate':''}</small>}</span>;
}
