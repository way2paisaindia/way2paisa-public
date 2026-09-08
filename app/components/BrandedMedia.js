'use client';
import {useRef} from 'react';

export default function BrandedMedia({item,floorPlan=false}) {
  const dialog=useRef(null);
  const caption=item.alt_text||item.configuration||'Project image';
  const picture=<span style={{position:'relative',display:'block'}}><img className="brandedSource" src={item.image_url} alt={caption} loading="lazy"/><span aria-hidden="true" style={{position:'absolute',right:10,bottom:10,display:'block',opacity:.15,pointerEvents:'none',background:'none',padding:0,border:0,zIndex:2}}><img src="/way2paisa-watermark.png" alt="" style={{display:'block',width:'clamp(70px,16vw,115px)',maxWidth:'28%',height:'auto'}}/></span></span>;
  return <figure className="brandedMedia">
    <button type="button" className="mediaOpen" onClick={()=>dialog.current?.showModal()} aria-label={`Enlarge ${caption}`}>{picture}</button>
    <figcaption>{floorPlan&&item.configuration?item.configuration:caption}</figcaption>
    <dialog ref={dialog} className="mediaDialog" onClick={e=>{if(e.target===e.currentTarget)e.currentTarget.close()}}>
      <button type="button" className="mediaClose" onClick={()=>dialog.current.close()}>Close</button>
      <div className="mediaFull">{picture}</div><p>{caption}</p>
    </dialog>
  </figure>;
}
