'use client';
import {useEffect} from 'react';

export default function ShareHomeRedirect(){
 useEffect(()=>{window.location.replace('/')},[]);
 return <main style={{minHeight:'100vh',display:'grid',placeItems:'center',fontFamily:'Arial, sans-serif',color:'#073b77'}}>Opening Way2Paisa…</main>;
}
