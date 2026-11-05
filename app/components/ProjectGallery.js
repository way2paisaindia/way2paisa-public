'use client';
import {useEffect,useRef,useState} from 'react';
import ListingImage from './ListingImage';

export default function ProjectGallery({items=[],projectId}){
 const[index,setIndex]=useState(null);
 const lightboxRef=useRef(null);
 const closeButtonRef=useRef(null);
 const previousFocusRef=useRef(null);
 const isOpen=index!==null&&Boolean(items[index]);
 const open=i=>{
   previousFocusRef.current=document.activeElement;
   setIndex(i);
 };
 const close=()=>setIndex(null);
 const move=d=>setIndex(i=>i===null||!items.length?i:(i+d+items.length)%items.length);

 // Treat the enlarged image as a modal: focus the close control, lock page
 // scrolling, and return focus to the originating thumbnail on dismissal.
 // Depend on the open/closed state, not the current image index, so moving
 // between photographs never resets the focus or scroll position.
 useEffect(()=>{
   if(!isOpen)return;
   const previousOverflow=document.body.style.overflow;
   document.body.style.overflow='hidden';
   closeButtonRef.current?.focus();
   return()=>{
     document.body.style.overflow=previousOverflow;
     if(previousFocusRef.current?.isConnected)previousFocusRef.current.focus();
   };
 },[isOpen]);

 useEffect(()=>{
   if(!isOpen)return;
   const onKeyDown=e=>{
     if(e.key==='Escape'){e.preventDefault();close();return;}
     if(e.key==='ArrowLeft'){e.preventDefault();move(-1);return;}
     if(e.key==='ArrowRight'){e.preventDefault();move(1);return;}
     if(e.key!=='Tab')return;
     const controls=[...lightboxRef.current?.querySelectorAll('button:not([disabled])')||[]];
     if(!controls.length)return;
     const first=controls[0],last=controls[controls.length-1];
     if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
     else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
     else if(!lightboxRef.current?.contains(document.activeElement)){e.preventDefault();first.focus();}
   };
   window.addEventListener('keydown',onKeyDown);
   return()=>window.removeEventListener('keydown',onKeyDown);
 },[isOpen,items.length]);

 return <><div className="projectGalleryGrid">{items.map((item,i)=><button type="button" className="galleryThumb" key={item.id} onClick={()=>open(i)} aria-label={`View ${item.alt_text||`project image ${i+1}`}`}><ListingImage src={item.image_url} alt={item.alt_text||`Project gallery image ${i+1}`} projectId={projectId} mediaId={item.id} imageVariant="preview" loading="lazy"/><span className="galleryWatermark"><img src="/way2paisa-watermark.png" alt=""/></span></button>)}</div>
 {isOpen&&<div ref={lightboxRef} className="galleryLightbox" role="dialog" aria-modal="true" aria-label="Project image gallery" onClick={e=>{if(e.target===e.currentTarget)close()}}><button ref={closeButtonRef} type="button" className="galleryClose" onClick={close} aria-label="Close gallery">&times;</button><button type="button" className="galleryPrev" onClick={()=>move(-1)} aria-label="Previous image">&lsaquo;</button><div className="galleryStage"><ListingImage src={items[index].image_url} alt={items[index].alt_text||`Project gallery image ${index+1}`} projectId={projectId} mediaId={items[index].id}/><span className="galleryWatermark lightboxMark"><img src="/way2paisa-watermark.png" alt=""/></span><div className="galleryCount">{index+1} / {items.length}</div><div className="galleryCaption" aria-live="polite">{items[index].alt_text||`Project gallery image ${index+1}`}</div></div><button type="button" className="galleryNext" onClick={()=>move(1)} aria-label="Next image">&rsaquo;</button></div>}</>
}
