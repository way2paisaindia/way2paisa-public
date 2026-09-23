'use client';
import {useState} from 'react';

const ShareIcon=()=>(
  <svg className="shareMainIcon" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18 16a3 3 0 0 0-2.39 1.19L8.91 13.7a3.18 3.18 0 0 0 0-3.4l6.7-3.49A3 3 0 1 0 15 5a2.9 2.9 0 0 0 .09.7L8.4 9.18a3 3 0 1 0 0 5.64l6.69 3.48A2.9 2.9 0 0 0 15 19a3 3 0 1 0 3-3Z" fill="currentColor"/>
  </svg>
);
const WhatsAppIcon=()=>(
  <svg className="shareOptionIcon whatsappIcon" viewBox="0 0 32 32" aria-hidden="true">
    <path fill="#25D366" d="M16 3a13 13 0 0 0-11.1 19.77L3 29l6.4-1.83A13 13 0 1 0 16 3Z"/>
    <path fill="#fff" d="M23.55 19.42c-.4-.2-2.35-1.16-2.71-1.3-.36-.13-.62-.2-.88.2-.26.4-1.01 1.3-1.24 1.57-.23.26-.46.3-.85.1-.4-.2-1.67-.62-3.18-1.96-1.17-1.05-1.97-2.35-2.2-2.75-.23-.4-.02-.61.17-.8.18-.17.4-.46.6-.7.2-.23.26-.4.4-.66.13-.26.06-.5-.04-.7-.1-.2-.88-2.12-1.2-2.9-.32-.77-.65-.67-.88-.68h-.75c-.26 0-.69.1-1.05.5-.36.4-1.38 1.35-1.38 3.28 0 1.94 1.41 3.81 1.61 4.07.2.27 2.77 4.23 6.71 5.94.94.4 1.67.65 2.24.83.94.3 1.8.26 2.48.16.76-.11 2.35-.96 2.68-1.89.33-.93.33-1.72.23-1.89-.1-.16-.36-.26-.76-.46Z"/>
  </svg>
);
const EmailIcon=()=>(
  <svg className="shareOptionIcon" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M3 5h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm9 7.2L20.4 7H3.6L12 12.2Zm0 2.35L3 8.98V17h18V8.98l-9 5.57Z" fill="currentColor"/>
  </svg>
);

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
    <button type="button" className="shareBtn projectShareMain" onClick={share}><ShareIcon/>Share Project</button>
    {open&&<div className="projectShareFallback" aria-label="Share options">
      <a href={'https://wa.me/?text='+encoded} target="_blank" rel="noopener noreferrer"><WhatsAppIcon/>WhatsApp</a>
      <a href={'mailto:way2paisaindia@gmail.com?subject='+encodeURIComponent(project.name)+'&body='+encoded}><EmailIcon/>Email</a>
      <button type="button" onClick={copy}>{copied?'Copied':'Copy link'}</button>
    </div>}
  </div>;
}
