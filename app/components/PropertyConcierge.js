'use client';

import {useMemo, useState} from 'react';

const money=(value,market)=>{
  const amount=Number(value);
  if(!Number.isFinite(amount)||amount<=0)return 'Price on request';
  if(String(market||'').toLowerCase().includes('dubai'))return new Intl.NumberFormat('en-AE',{style:'currency',currency:'AED',maximumFractionDigits:0}).format(amount)+'+';
  const crores=amount>=100000?amount/10000000:amount;
  return crores<1?`₹${(crores*100).toLocaleString('en-IN',{maximumFractionDigits:2})} Lakh+`:`₹${crores.toLocaleString('en-IN',{maximumFractionDigits:2})} Cr+`;
};

// Keep a precise locality phrase intact. A broad token such as "Andheri" must
// never cause an Andheri East project to be returned for an Andheri West brief.
const localityPhrases=['andheri west','andheri east','borivali west','borivali east','goregaon west','goregaon east','malad west','malad east','bandra west','bandra east','vile parle west','vile parle east','lower parel','marine lines','dadar west','dadar east','thane west','thane east','mulund west','mulund east','kandivali west','kandivali east','vikhroli west','vikhroli east','bandra kurla complex','dubai marina','downtown dubai','business bay','palm jumeirah','jebel ali','bur dubai','dubai south','jumeirah village circle','dubai hills','emaar beachfront','maritime city','sobha hartland'];

function budgetFrom(text,isDubai){
  const match=text.match(/(?:under|below|upto|up to|within|budget(?: of| is)?|around)\s*(?:₹|inr\s*|aed\s*)?(\d+(?:\.\d+)?)\s*(cr|crore|crores|lakh|lakhs|m|million)?/i);
  if(!match)return null;
  const value=Number(match[1]);const unit=(match[2]||'').toLowerCase();
  if(isDubai)return unit==='m'||unit.includes('million')?value*1000000:value;
  if(unit.startsWith('lakh'))return value/100;
  return value;
}

function parsedIntent(query){
  const text=query.trim().toLowerCase();
  const isDubai=/\bdubai\b|\baed\b|\bdowntown\b|\bmarina\b|\bjumeirah\b|\bdeira\b|\bbur dubai\b|\bjebel ali\b|\bjvc\b|\bbusiness bay\b/.test(text);
  const bhk=(text.match(/\b([1-5])\s*(?:bhk|bed(?:room)?s?)\b/i)||[])[1];
  const ready=/\bready\b|\bready possession\b|\bmove[ -]?in\b|\boc\b|\bcompleted\b/.test(text);
  const budget=budgetFrom(text,isDubai);
  const stopWords=new Set(['show','find','need','want','looking','homes','home','house','apartment','property','properties','near','with','under','below','upto','up','to','within','budget','ready','possession','move','in','bhk','bedroom','bedrooms','crore','crores','lakh','lakhs','million','dubai','mumbai','mmr','aed','inr','the','and','for','east','west','north','south']);
  const terms=text.split(/[^a-z0-9]+/).filter(word=>word.length>2&&!stopWords.has(word));
  return {text,isDubai,bhk,ready,budget,terms,localities:localityPhrases.filter(phrase=>text.includes(phrase))};
}

function possessionLabel(value){
  const text=String(value||'').trim();
  if(!text)return 'Possession on request';
  if(/ready\s*to\s*move|\boc\b|completed/i.test(text))return 'Ready to move';
  const match=text.match(/(?:Q[1-4]\s*\d{4}|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s*\d{4})/i);
  return match?`Possession ${match[0]}`:'Possession details available';
}

function resultFor(projects,query){
  const intent=parsedIntent(query);
  if(!intent.text)return {intent,results:[]};
  const results=projects.map(project=>{
    const marketDubai=String(project.market||'').toLowerCase().includes('dubai');
    if(intent.isDubai!==marketDubai)return null;
    const blob=[project.name,project.developers?.name,project.locations?.name,project.address,project.bhk_original,project.status,project.possession_original].filter(Boolean).join(' ').toLowerCase();
    const locationBlob=[project.locations?.name,project.address].filter(Boolean).join(' ').toLowerCase();
    const exactLocality=intent.localities.some(phrase=>locationBlob.includes(phrase));
    if(intent.localities.length&&!exactLocality)return null;
    let score=0;
    let matchedTerms=0;
    intent.terms.forEach(term=>{if(blob.includes(term)){score+=8;matchedTerms+=1}});
    if(exactLocality)score+=48;
    if(project.name?.toLowerCase().includes(intent.text)||project.developers?.name?.toLowerCase().includes(intent.text))score+=36;
    if(intent.bhk&&new RegExp(`\\b${intent.bhk}(?:\\s|[.,&-])*bhk\\b`,'i').test(project.bhk_original||''))score+=20;
    if(intent.ready&&/ready\s*to\s*move|\boc\b|completed/i.test(`${project.status||''} ${project.possession_original||''}`))score+=18;
    const price=Number(project.min_price);
    if(intent.budget&&price>0){const comparison=marketDubai?price:(price>=100000?price/10000000:price);score+=comparison<=intent.budget?16:-12}
    if(intent.terms.length&&matchedTerms===0&&!project.name?.toLowerCase().includes(intent.text)&&!project.developers?.name?.toLowerCase().includes(intent.text))return null;
    return {...project,score};
  }).filter(Boolean).filter(project=>project.score>0).sort((a,b)=>b.score-a.score||Number(b.featured)-Number(a.featured)||a.name.localeCompare(b.name)).slice(0,4);
  return {intent,results};
}

function intentSummary(intent){
  const bits=[];
  bits.push(intent.isDubai?'Dubai verified catalogue':'Mumbai / MMR verified catalogue');
  if(intent.bhk)bits.push(`${intent.bhk} BHK`);
  if(intent.budget)bits.push(intent.isDubai?`up to AED ${(intent.budget/1000000).toLocaleString('en-AE',{maximumFractionDigits:2})}M`:`up to ₹${intent.budget.toLocaleString('en-IN',{maximumFractionDigits:2})} Cr`);
  if(intent.ready)bits.push('ready-possession priority');
  return bits.join(' · ');
}

export default function PropertyConcierge({projects=[]}){
  const [query,setQuery]=useState('');
  const [submitted,setSubmitted]=useState('');
  const {intent,results}=useMemo(()=>resultFor(projects,submitted),[projects,submitted]);
  const examples=['3 BHK in Andheri West under ₹5 Cr','Ready homes near BKC','Dubai Marina apartment under AED 2 million'];
  const search=event=>{event.preventDefault();setSubmitted(query)};
  const compareHref=results.length>1?`/compare?projects=${results.slice(0,3).map(project=>project.slug).join(',')}`:null;
  return <section className="concierge" aria-label="Way2Paisa Concierge">
    <div className="conciergeCopy"><span className="kicker">WAY2PAISA CONCIERGE</span><h2>Tell us the home you have in mind.</h2><p>Describe your preferred location, configuration, budget or possession preference. We search only verified Way2Paisa listings and return the closest matches.</p></div>
    <form onSubmit={search} className="conciergeForm"><label htmlFor="concierge-query">What are you looking for?</label><div><input id="concierge-query" value={query} onChange={event=>setQuery(event.target.value)} placeholder="e.g. 3 BHK in Andheri West under ₹5 Cr"/><button type="submit">Find verified matches</button></div><div className="conciergeExamples">{examples.map(example=><button type="button" onClick={()=>{setQuery(example);setSubmitted(example)}} key={example}>{example}</button>)}</div></form>
    {submitted&&<div className="conciergeResults" aria-live="polite"><div className="conciergeResultHead"><div><p className="conciergeSummary">{results.length?`${results.length} verified match${results.length===1?'':'es'} for “${submitted}”`:'No exact match yet.'}</p><span>{intentSummary(intent)}</span></div>{compareHref&&<a className="conciergeCompare" href={compareHref}>Compare top matches →</a>}</div>{results.length>0&&<div className="conciergeGrid">{results.map(project=><article key={project.id}><span>{project.developers?.name||'Way2Paisa verified'} · {project.locations?.name||project.market}</span><h3>{project.name}</h3><p>{project.bhk_original||'Configuration on request'} · Starting {money(project.min_price,project.market)}</p><small>{possessionLabel(project.possession_original||project.status)}</small><a href={`/projects/${project.slug}`}>View project →</a></article>)}</div>}{!results.length&&<div className="conciergeEmpty"><p>Try a wider locality or budget, or let an advisor curate a private shortlist around your exact requirement.</p><a className="secondaryBtn conciergeAdvisor" href="#enquire">Ask an advisor to curate options</a></div>}</div>}
  </section>;
}
