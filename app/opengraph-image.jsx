import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Way2Paisa FinPro Services — Premium Real Estate & Finance Advisory';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{display:'flex',width:'100%',height:'100%',position:'relative',overflow:'hidden',background:'#06264c',fontFamily:'Arial, sans-serif',color:'#fff'}}>
      <img src="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1600&q=88" width="1200" height="630" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}} />
      <div style={{display:'flex',position:'absolute',inset:0,background:'linear-gradient(90deg,rgba(2,22,48,.96) 0%,rgba(3,31,63,.76) 47%,rgba(2,20,42,.14) 100%)'}} />
      <div style={{display:'flex',position:'relative',width:'100%',height:'100%',padding:'56px 66px',flexDirection:'column',justifyContent:'space-between'}}>
        <div style={{display:'flex',alignItems:'center',gap:16}}><img src="https://www.way2paisa.in/way2paisa-logo.png" width="68" height="68" style={{objectFit:'contain',background:'#fff',borderRadius:14,padding:7}}/><div style={{display:'flex',flexDirection:'column'}}><div style={{display:'flex',fontSize:33,fontWeight:800,letterSpacing:-1}}>WAY2PAISA</div><div style={{display:'flex',fontSize:16,letterSpacing:2,color:'#b9ddff'}}>FINANCE | REAL ESTATE</div></div></div>
        <div style={{display:'flex',flexDirection:'column',maxWidth:690}}><div style={{display:'flex',fontSize:18,letterSpacing:3,color:'#9ed2ff',fontWeight:700,marginBottom:18}}>MUMBAI · MMR · DUBAI</div><div style={{display:'flex',fontSize:58,lineHeight:1.05,fontWeight:800,letterSpacing:-2}}>Find your next address.</div><div style={{display:'flex',fontSize:30,lineHeight:1.25,color:'#d9eeff',marginTop:16}}>Curated residences and professional finance advisory.</div></div>
        <div style={{display:'flex',fontSize:19,fontWeight:700,color:'#e7f4ff'}}>Preferred Channel Partner for leading Developers, Banks &amp; NBFCs</div>
      </div>
    </div>,
    size
  );
}
