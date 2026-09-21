'use client';
import {useState} from 'react';

export default function ProjectShare({project}) {
  const [open,setOpen]=useState(false);
  const [copied,setCopied]=useState(false);
  const url=typeof window==='undefined'?'/projects/'+project.slug:window.location.href;
  const text=[project.name,project.location,project.configurations,project.price,project.possession,project.rera&&'MahaRERA: '+project.rera].filter(Boolean).join(' · ');
  async function share(){
    const payload={title:project.name,text,url};
    if(navigator.share){try{await navigator.share(payload);return}catch(e){if(e?.name==='AbortError')return}}
    setOpen(true);
  }
  async function copy(){
    await navigator.clipboard?.writeText(url);
    setCopied(true); setTimeout(()=>setCopied(false),1800);
  }
  const encoded=encodeURIComponent(text+'\n'+url);
  return <div className="projectShare">
    <button type="button" className="shareBtn projectShareMain" onClick={share}>Share project</button>
    {open&&<div className="projectShareFallback" aria-label="Share options">
      <a href={'https://wa.me/?text='+encoded} target="_blank" rel="noopener noreferrer">WhatsApp</a>
      <a href={'mailto:?subject='+encodeURIComponent(project.name)+'&body='+encoded}>Email</a>
      <button type="button" onClick={copy}>{copied?'Copied':'Copy link'}</button>
    </div>}
  </div>;
}