'use client';

import {useMemo, useState} from 'react';

const money=(value,market)=>{
  const amount=Number(value);
  if(!Number.isFinite(amount)||amount<=0)return 'Price on request';
  if(String(market||'').toLowerCase().includes('dubai'))return new Intl.NumberFormat('en-AE',{style:'currency',currency:'AED',maximumFractionDigits:0}).format(amount)+'+';
  const crores=amount>=100000?amount/10000000:amount;
  return crores<1?`₹${(crores*100).toLocaleString('en-IN',{maximumFractionDigits:2})} Lakh+`:`₹${crores.toLocaleString('en-IN',{maximumFractionDigits:2})} Cr+`;
};

function budgetFrom(text,isDubai){
  const match=text.match(/(?:under|below|upto|up to|within)\s*(?:₹|aed\s*)?(\d+(?:\.\d+)?)\s*(cr|crore|crores|lakh|lakhs|m|million)?/i);
  if(!match)return null;
  const value=Number(match[1]); const unit=(match[2]||'').toLowerCase();
  if(isDubai)return unit==='m'||unit.includes('million')?value*1000000:value;
  if(unit.startsWith('lakh'))return value/100;
  return value;
}

function resultFor(projects,query){
  const text=query.trim().toLowerCase();
  if(!text)return [];
  const isDubai=/\bdubai\b|\baed\b|\bdowntown\b|\bmarina\b|\bjumeirah\b|\bdeira\b|\bbur dubai\b|\bjebel ali\b/.test(text);
  const bhk=(text.match(/\b([1-5])\s*(?:bhk|bed(?:room)?s?)\b/i)||[])[1];
  const budget=budgetFrom(text,isDubai);
  return projects.map(project=>{
    const blob=[project.name,project.developers?.name,project.locations?.name,project.address,project.bhk_original].filter(Boolean).join(' ').toLowerCase();
    const marketDubai=String(project.market||'').toLowerCase().includes('dubai');
    if(isDubai!==marketDubai)return null;
    let score=0;
    const words=text.split(/[^a-z0-9]+/).filter(word=>word.length>2&&!['under','below','upto','with','bhk','bedroom','crore','lakhs','million','dubai'].includes(word));
    words.forEach(word=>{if(blob.includes(word))score+=6});
    if(project.name?.toLowerCase().includes(text)||project.developers?.name?.toLowerCase().includes(text))score+=36;
    if(bhk&&new RegExp(`\\b${bhk}(?:\\s|[.,&-])*bhk\\b`,'i').test(project.bhk_original||''))score+=18;
    const price=Number(project.min_price);
    if(budget&&price>0){const comparison=marketDubai?price:(price>=100000?price/10000000:price);score+=comparison<=budget?16:-8}
    return {...project,score};
  }).filter(Boolean).filter(project=>project.score>0).sort((a,b)=>b.score-a.score||Number(b.featured)-Number(a.featured)).slice(0,3);
}

export default function PropertyConcierge({projects=[]}){
  const [query,setQuery]=useState('');
  const [submitted,setSubmitted]=useState('');
  const results=useMemo(()=>resultFor(projects,submitted),[projects,submitted]);
  const examples=['3 BHK in Andheri West under ₹5 Cr','Ready homes near BKC','Dubai Marina apartment under AED 2 million'];
  const search=event=>{event.preventDefault();setSubmitted(query)};
  return <section className="concierge" aria-label="Way2Paisa Concierge">
    <div className="conciergeCopy"><span className="kicker">WAY2PAISA CONCIERGE</span><h2>Tell us the home you have in mind.</h2><p>Describe your preferred location, configuration and budget. We search only verified Way2Paisa listings and return the closest matches.</p></div>
    <form onSubmit={search} className="conciergeForm"><label htmlFor="concierge-query">What are you looking for?</label><div><input id="concierge-query" value={query} onChange={event=>setQuery(event.target.value)} placeholder="e.g. 3 BHK in Andheri West under ₹5 Cr"/><button type="submit">Find matches</button></div><div className="conciergeExamples">{examples.map(example=><button type="button" onClick={()=>{setQuery(example);setSubmitted(example)}} key={example}>{example}</button>)}</div></form>
    {submitted&&<div className="conciergeResults" aria-live="polite"><p className="conciergeSummary">{results.length?`${results.length} verified match${results.length===1?'':'es'} for “${submitted}”`:`No exact match yet. Try a wider area or let our advisor curate a shortlist.`}</p>{results.length>0&&<div className="conciergeGrid">{results.map(project=><article key={project.id}><span>{project.developers?.name||'Way2Paisa verified'} · {project.locations?.name||project.market}</span><h3>{project.name}</h3><p>{project.bhk_original||'Configuration on request'} · Starting {money(project.min_price,project.market)}</p><a href={`/projects/${project.slug}`}>View project →</a></article>)}</div>}{!results.length&&<a className="secondaryBtn conciergeAdvisor" href="#enquire">Ask an advisor to curate options</a>}</div>}
  </section>;
}
