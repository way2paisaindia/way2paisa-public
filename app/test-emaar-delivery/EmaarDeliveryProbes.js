'use client';

import {useEffect,useRef,useState} from 'react';

// TEMPORARY READ-ONLY PREVIEW TEST. All sources come from verified published
// Way2Paisa Golf Trails media. Remove this test route after resolving images.
const original='https://uae-cms.emaar.com/uploads/HERO_1620_X832_2_d200e4e4ec.jpg';
const second='https://uae-cms.emaar.com/uploads/HERO_1620_X832_3_aa21f5bfb4.jpg';
const optimized='https://www.emaar.com/_next/image?url='+encodeURIComponent(original)+'&w=1200&q=75';
const id='ce31df69-ccbd-407f-9671-c4c7d2e68d64';
const galleryId='603e78ff-b9fc-4143-9a40-f232db0622f5';
const cases=[
  {label:'Original Emaar CMS — no-referrer (current proposed fix)',src:original,policy:'no-referrer'},
  {label:'Original Emaar CMS — default browser referrer',src:original},
  {label:'Original Emaar CMS — origin referrer',src:original,policy:'origin'},
  {label:'Second verified Golf Trails project visual — no-referrer',src:second,policy:'no-referrer'},
  {label:'Emaar first-party image optimizer — no-referrer',src:optimized,policy:'no-referrer'},
  {label:'Way2Paisa project-image server relay, full',src:'/api/project-image?project='+id,policy:'no-referrer'},
  {label:'Way2Paisa media server relay, verified gallery',src:'/api/project-image?project='+id+'&media='+galleryId+'&variant=preview',policy:'no-referrer'},
];

function ImageProbe({label,src,policy}) {
  const image=useRef(null);
  const [status,setStatus]=useState('Pending...');
  useEffect(()=>{
    const el=image.current;
    if(el?.complete) setStatus(el.naturalWidth>0?'Loaded: '+el.naturalWidth+'x'+el.naturalHeight:'Failed to load');
  },[src]);
  return <section style={{border:'1px solid #ccd4df',borderRadius:8,padding:16,marginBottom:14}}>
    <h2 style={{fontSize:16,fontWeight:700,marginBottom:10}}>{label}</h2>
    <p style={{fontSize:12,wordBreak:'break-all'}}>{src}</p>
    <p style={{fontSize:14,fontWeight:700,color:status.startsWith('Loaded')?'#116c36':'#9d2b24'}}>Result: {status}</p>
    <img
      ref={image}
      src={src}
      referrerPolicy={policy}
      alt={label}
      width={420} height={230}
      style={{objectFit:'contain',maxWidth:'100%',background:'#e7ecf2',border:'1px solid #d6dce5'}}
      onLoad={event=>setStatus('Loaded: '+event.currentTarget.naturalWidth+'x'+event.currentTarget.naturalHeight)}
      onError={()=>setStatus('Failed to load')}
    />
  </section>;
}
export default function EmaarDeliveryProbes(){
  return <main style={{fontFamily:'Arial,sans-serif',maxWidth:850,margin:'32px auto',padding:20,color:'#121921',background:'#ffffff'}}>
    <h1>Way2Paisa Emaar Image Delivery — Temporary Preview Test</h1>
    <p>This route tests approved Golf Trails image sources and records what the browser actually loads. It changes no catalogue data, secrets, payments, settings or image files. Not indexed by search engines.</p>
    {cases.map((item,i)=><ImageProbe key={i} {...item}/>)}
  </main>;
}
