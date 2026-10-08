'use client';
import {useEffect,useState} from 'react';

const ShareIcon=()=> <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 16a3 3 0 0 0-2.39 1.19L8.91 13.7a3.18 3.18 0 0 0 0-3.4l6.7-3.49A3 3 0 1 0 15 5a2.9 2.9 0 0 0 .09.7L8.4 9.18a3 3 0 1 0 0 5.64l6.69 3.48A2.9 2.9 0 0 0 15 19a3 3 0 1 0 3-3Z" fill="currentColor"/></svg>;

export default function HomeShare(){
 const [copied,setCopied]=useState(false),[showChoices,setShowChoices]=useState(false);
 const [shareImage,setShareImage]=useState(null);
 const text='Way2Paisa FinPro Services — curated real-estate opportunities and professional finance advisory across Mumbai, MMR and Dubai.';
 const url=typeof window==='undefined'?'https://www.way2paisa.in/share':window.location.origin+'/share';
 const message=`${text}\n${url}`;
 useEffect(()=>{
  let active=true;
  fetch('/opengraph-image').then(r=>r.ok?r.blob():null).then(blob=>{
   if(active&&blob)setShareImage(new File([blob],'way2paisa-real-estate.png',{type:'image/png'}));
  }).catch(()=>{});
  return()=>{active=false};
 },[]);
 const copy=async()=>{try{await navigator.clipboard?.writeText(message)}catch(e){}setCopied(true);setShowChoices(false);setTimeout(()=>setCopied(false),1800)};
 async function share(){
  const payload={title:'Way2Paisa FinPro Services',text,url};
  if(navigator.share){
   try{
    if(shareImage&&navigator.canShare?.({files:[shareImage]})){
     await navigator.share({...payload,files:[shareImage]});
    }else{
     await navigator.share(payload);
    }
    return;
   }catch(e){if(e?.name==='AbortError')return}
  }
  setShowChoices(current=>!current);
 }
 return <span className="footerShareWrap"><button type="button" className="footerShareBtn" onClick={share} aria-label={copied?'Way2Paisa link copied':'Share Way2Paisa'} title={copied?'Link copied':'Share Way2Paisa'}><ShareIcon/></button>{showChoices&&<span className="footerShareChoices" role="menu"><a href={`https://wa.me/?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer" role="menuitem">WhatsApp</a><a href={`mailto:?subject=${encodeURIComponent('Way2Paisa FinPro Services')}&body=${encodeURIComponent(message)}`} role="menuitem">Email</a><button type="button" onClick={copy} role="menuitem">Copy Link</button></span>}</span>;
}
