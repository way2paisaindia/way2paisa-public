'use client';

import CurrencyConverter from './CurrencyConverter';

function aed(amount){
 const n=Number(amount);
 return Number.isFinite(n)?new Intl.NumberFormat('en-AE',{style:'currency',currency:'AED',maximumFractionDigits:0}).format(n):'Price on request';
}

export default function DubaiPrice({amount,maxAmount,showNote=true}){
 const n=Number(amount), max=Number(maxAmount);
 if(!Number.isFinite(n))return <span>Price on request</span>;
 const hasMax=Number.isFinite(max)&&max!==n;
 return <span className="dubaiPrice"><strong>{aed(n)}{hasMax?` – ${aed(max)}`:''}</strong><CurrencyConverter amount={n} compact={!showNote}/>{showNote&&hasMax&&<small>Converted figure shown for the starting amount. AED is the authoritative project price.</small>}</span>;
}
