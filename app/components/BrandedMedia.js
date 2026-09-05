'use client';
import {useRef} from 'react';

export default function BrandedMedia({item,floorPlan=false}) {
  const dialog=useRef(null);
  const caption=item.alt_text||item.configuration||'Project image';
  const picture=<><img className="brandedSource" src={item.image_url} alt={caption} loading="lazy"/><span className="mediaBrand"><img src="/way2paisa-watermark.png" alt="Way2Paisa"/></span></>;
  return <figure className="brandedMedia">
    <button type="button" className="mediaOpen" onClick={()=>dialog.current?.showModal()} aria-label={`Enlarge ${caption}`}>{picture}</button>
    <figcaption>{floorPlan&&item.configuration?item.configuration:caption}</figcaption>
    <dialog ref={dialog} className="mediaDialog" onClick={e=>{if(e.target===e.currentTarget)e.currentTarget.close()}}>
      <button type="button" className="mediaClose" onClick={()=>dialog.current.close()}>Close</button>
      <div className="mediaFull">{picture}</div><p>{caption}</p>
    </dialog>
  </figure>;
}
