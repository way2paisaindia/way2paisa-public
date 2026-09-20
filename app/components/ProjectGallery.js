'use client';
import {useEffect,useState} from 'react';

export default function ProjectGallery({items=[]}){
 const[index,setIndex]=useState(null);
 const open=i=>setIndex(i), close=()=>setIndex(null);
 const move=d=>setIndex(i=>(i+d+items.length)%items.length);
 useEffect(()=>{if(index===null)return;const key=e=>{if(e.key==='Escape')close();if(e.key==='ArrowLeft')move(-1);if(e.key==='ArrowRight')move(1)};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key)},[index,items.length]);
 return <><div className="projectGalleryGrid">{items.map((item,i)=><button type="button" className="galleryThumb" key={item.id} onClick={()=>open(i)} aria-label={`View project image ${i+1}`}><img src={item.image_url} alt="" loading="lazy"/><span className="galleryWatermark"><img src="/way2paisa-watermark.png" alt=""/></span></button>)}</div>
 {index!==null&&items[index]&&<div className="galleryLightbox" role="dialog" aria-modal="true" onClick={e=>{if(e.target===e.currentTarget)close()}}><button className="galleryClose" onClick={close} aria-label="Close gallery">×</button><button className="galleryPrev" onClick={()=>move(-1)} aria-label="Previous image">‹</button><div className="galleryStage"><img src={items[index].image_url} alt=""/><span className="galleryWatermark lightboxMark"><img src="/way2paisa-watermark.png" alt=""/></span><div className="galleryCount">{index+1} / {items.length}</div></div><button className="galleryNext" onClick={()=>move(1)} aria-label="Next image">›</button></div>}</>
}