'use client';
import {useEffect,useRef,useState} from 'react';

export default function BrandedMedia({item,floorPlan=false}) {
  const dialog=useRef(null);
  const [imageFailed,setImageFailed]=useState(!item?.image_url);
  useEffect(()=>setImageFailed(!item?.image_url),[item?.image_url]);
  const caption=item.alt_text||item.configuration||'Project image';
  // Some developer/partner hosts withdraw images after their last audit.
  // Show an honest missing-image state rather than a broken or unrelated image.
  const picture=<span className="mediaImageFrame">
    {imageFailed
      ? <span role="img" aria-label={caption+' temporarily unavailable'} style={{
          display:'flex',minHeight:160,width:'100%',alignItems:'center',justifyContent:'center',
          padding:16,boxSizing:'border-box',textAlign:'center',background:'#09385f',color:'#fff'
        }}>Project image temporarily unavailable</span>
      : <>
        <img className="brandedSource" src={item.image_url} alt={caption} loading="lazy" onError={()=>setImageFailed(true)}/>
        <img className="mediaWatermark" src="/way2paisa-watermark.png" alt="" aria-hidden="true"/>
      </>}
  </span>;
  return <figure className="brandedMedia">
    <button type="button" className="mediaOpen" disabled={imageFailed} onClick={()=>dialog.current?.showModal()} aria-label={imageFailed?`${caption} temporarily unavailable`:`Enlarge ${caption}`}>{picture}</button>
    <figcaption>{caption}</figcaption>
    <dialog ref={dialog} className="mediaDialog" onClick={e=>{if(e.target===e.currentTarget)e.currentTarget.close()}}>
      <button type="button" className="mediaClose" onClick={()=>dialog.current.close()}>Close</button>
      <div className="mediaFull">{picture}</div><p>{caption}</p>
    </dialog>
  </figure>;
}
