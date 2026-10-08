'use client';

const ShareIcon=()=> <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 16a3 3 0 0 0-2.39 1.19L8.91 13.7a3.18 3.18 0 0 0 0-3.4l6.7-3.49A3 3 0 1 0 15 5a2.9 2.9 0 0 0 .09.7L8.4 9.18a3 3 0 1 0 0 5.64l6.69 3.48A2.9 2.9 0 0 0 15 19a3 3 0 1 0 3-3Z" fill="currentColor"/></svg>;

export default function HomeShare(){
 const text='Way2Paisa FinPro Services — Premium real-estate and finance advisory across Mumbai, MMR and Dubai.';
 const url=typeof window==='undefined'?'https://www.way2paisa.in':window.location.origin;
 const message=`${text}\n${url}`;
 return <a className="footerShareBtn" href={`https://wa.me/?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer" aria-label="Share Way2Paisa on WhatsApp" title="Share on WhatsApp"><ShareIcon/></a>;
}
