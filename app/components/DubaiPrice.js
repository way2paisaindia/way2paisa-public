'use client';

import CurrencyConverter from './CurrencyConverter';

function positiveAedAmount(value){
 if(value===null||value===undefined||value==='')return null;
 const number=Number(value);
 return Number.isFinite(number)&&number>0?number:null;
}

function aed(amount){
 const number=positiveAedAmount(amount);
 return number===null?'Price on request':new Intl.NumberFormat('en-AE',{style:'currency',currency:'AED',maximumFractionDigits:0}).format(number);
}

export default function DubaiPrice({amount,maxAmount,showNote=true,starting=false}){
 const number=positiveAedAmount(amount);
 const maximum=positiveAedAmount(maxAmount);
 if(number===null)return <span>Price on request</span>;
 const hasMax=maximum!==null&&maximum>number;
 return <span className="dubaiPrice"><strong>{aed(number)}{hasMax?` – ${aed(maximum)}`:(starting?'+':'')}</strong><CurrencyConverter amount={number} compact={!showNote}/>{showNote&&hasMax&&<small>Converted figure shown for the starting amount. AED is the authoritative project price.</small>}</span>;
}
