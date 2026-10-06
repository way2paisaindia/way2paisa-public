'use client';
import {useState} from 'react';

const ShareIcon=()=> <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 16a3 3 0 0 0-2.39 1.19L8.91 13.7a3.18 3.18 0 0 0 0-3.4l6.7-3.49A3 3 0 1 0 15 5a2.9 2.9 0 0 0 .09.7L8.4 9.18a3 3 0 1 0 0 5.64l6.69 3.48A2.9 2.9 0 0 0 15 19a3 3 0 1 0 3-3Z" fill="currentColor"/></svg>;

export default function HomeShare(){
 const [copied,setCopied]=useState(false);
 const text='Way2Paisa FinPro Services — curated real-estate opportunities and professional finance advisory across Mumbai, MMR and Dubai.';
 async function share(){
  const url=window.location.origin+'/share';
  const payload={title:'Way2Paisa FinPro Services',text,url};
  if(navigator.share){try{const response=await fetch(new URL('/opengraph-image',window.location.origin),{cache:'no-store'});const image=await response.blob();const file=new File([image],'way2paisa-real-estate-advisory.png',{type:'image/png'});await navigator.share({...payload,files:[file]});return}catch(e){/* Continue with text/link sharing when this browser or target does not support image files. */}}
  if(navigator.share){try{await navigator.share(payload);return}catch(e){if(e?.name==='AbortError')return}}
  await navigator.clipboard?.writeText(`${text}\n${url}`);setCopied(true);setTimeout(()=>setCopied(false),1800);
 }
 return <button type="button" className="heroShareBtn" onClick={share} aria-label="Share Way2Paisa"><ShareIcon/><span className="heroShareText">{copied?'Copied':'Share Way2Paisa'}</span></button>;
}
