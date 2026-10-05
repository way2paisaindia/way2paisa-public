'use client';

import {useEffect,useState} from 'react';
const key='way2paisa-compare-projects';
const read=()=>{try{return JSON.parse(window.localStorage.getItem(key)||'[]')}catch{return[]}};

export default function ProjectCompareButton({project}){
 const[selected,setSelected]=useState([]);
 useEffect(()=>setSelected(read()),[]);
 const active=selected.some(item=>item.slug===project.slug);
 function toggle(){const current=read();let next;if(current.some(item=>item.slug===project.slug)){next=current.filter(item=>item.slug!==project.slug)}else{if(current.length>=3){window.alert('You can compare up to three projects at a time.');return}next=[...current,project]}window.localStorage.setItem(key,JSON.stringify(next));setSelected(next)}
 const href=`/compare?projects=${encodeURIComponent(selected.map(item=>item.slug).join(','))}`;
 return <span style={{display:'inline-flex',alignItems:'center',gap:'7px',flexWrap:'wrap'}}><button type="button" onClick={toggle} style={{border:'1px solid #9fb9d2',borderRadius:'7px',padding:'9px 10px',background:active?'#e6f2fc':'#fff',color:'#123a60',fontSize:'11px',fontWeight:800,cursor:'pointer'}}>{active?'Added ✓':'Compare'}</button>{selected.length>=2&&<a href={href} style={{color:'#075b9d',fontSize:'11px',fontWeight:800,textDecoration:'none'}}>Compare {selected.length} →</a>}</span>;
}
