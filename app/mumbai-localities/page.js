'use client';
import {useEffect,useMemo,useState} from 'react';
import {createClient} from '@supabase/supabase-js';

const supabase=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
const groups=[{"heading":"Western Suburbs & Prime Western Mumbai","places":[["Bandra",["Bandra East","Bandra West","Bandra"]],["Khar",["Khar West","Khar East","Khar"]],["Santacruz",["Santacruz West","Santacruz East","Santacruz","Santa Cruz"]],["Vile Parle",["Vile Parle West","Vile Parle East","Vile Parle"]],["Juhu",["Juhu"]],["Juhu Tara Road",["Juhu Tara Road"]],["Versova",["Versova"]],["Andheri",["Andheri East","Andheri West","Andheri"]],["Oshiwara Link Road",["Oshiwara"]],["Jogeshwari",["Jogeshwari East","Jogeshwari West","Jogeshwari"]],["Goregaon",["Goregaon East","Goregaon West","Goregaon"]],["Malad",["Malad East","Malad West","Malad"]],["Kandivali",["Kandivali East","Kandivali West","Kandivali"]],["Borivali",["Borivali East","Borivali West","Borivali"]]]},{"heading":"Central Mumbai & Eastern Demand Corridors","places":[["Sion",["Sion"]],["Matunga",["Matunga East","Matunga West","Matunga"]],["Dadar",["Dadar East","Dadar West","Shivaji Park","Dadar"]],["Wadala",["Wadala","New Cuffe Parade"]],["Parel",["Parel"],["Lower Parel"]],["Sewri",["Sewri"]],["Prabhadevi",["Prabhadevi"]],["Worli",["Worli"]],["Lower Parel",["Lower Parel"]],["Mahalaxmi",["Mahalaxmi","Mahalakshmi"]],["Byculla",["Byculla"]],["Ghatkopar",["Ghatkopar East","Ghatkopar West","Ghatkopar"]],["Powai",["Powai"]]]},{"heading":"South Mumbai & Waterfront Luxury","places":[["Tardeo",["Tardeo"]],["Nariman Point",["Nariman Point"]],["Nepean Sea Road",["Nepean Sea Road","Nepeansea Road","Nepeansea"]],["Cuffe Parade",["Cuffe Parade"],["New Cuffe Parade"]],["Malabar Hill",["Malabar Hill","Walkeshwar"]],["Marine Lines",["Marine Lines"]],["Churchgate",["Churchgate"]],["Colaba",["Colaba"]]]}];
const WA=process.env.NEXT_PUBLIC_WHATSAPP_NUMBER||'918850373012';
const normalize=s=>String(s||'').toLocaleLowerCase('en-IN').replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
const matches=(p,def)=>{
 const [,aliases,excludes=[]]=def;
 const location=normalize(p.locations?.name);
 const address=normalize(p.address);
 const full=location+' '+address;
 if(excludes.some(x=>full.includes(normalize(x))))return false;
 return aliases.some(x=>{
  const term=normalize(x);
  return location===term||location.startsWith(term+' ')||address.includes(term);
 });
};
const message=(name)=>'Hello Way2Paisa, I am looking for currently available residential/commercial projects in '+name+', Mumbai. Please share verified MahaRERA, carpet, current pricing and site visit options.';
const inquiry=name=>'https://wa.me/'+WA+'?text='+encodeURIComponent(message(name));
const search=name=>'/properties?market=Mumbai&q='+encodeURIComponent(name==='Oshiwara Link Road'?'Oshiwara':name);
const css={
 main:{minHeight:'100vh',background:'#f6f7f8',color:'#172535',fontFamily:'Arial,Helvetica,sans-serif'},
 shell:{maxWidth:1220,margin:'auto',padding:'30px 20px'},
 hero:{background:'linear-gradient(125deg,#122c46,#25566e)',color:'#fff'},
 nav:{display:'flex',flexWrap:'wrap',gap:20,fontSize:14,marginBottom:30},
 kicker:{fontSize:12,letterSpacing:1.8,fontWeight:700,textTransform:'uppercase',opacity:.84},
 h1:{fontSize:'clamp(30px,5vw,48px)',lineHeight:1.12,maxWidth:900,margin:'12px 0'},
 subtitle:{fontSize:16,lineHeight:1.65,maxWidth:920,color:'#e2e9ef'},
 metrics:{display:'flex',flexWrap:'wrap',gap:16,marginTop:24},
 metric:{padding:'13px 18px',border:'1px solid #ffffff48',borderRadius:12,minWidth:130},
 grid:{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(275px,1fr))',gap:16,margin:'18px 0 32px'},
 card:{padding:20,borderRadius:14,border:'1px solid #e0e3e7',background:'#fff',display:'flex',flexDirection:'column',gap:10},
 label:{fontSize:13,color:'#5a6877',lineHeight:1.6},
 title:{fontSize:20,margin:0},
 row:{display:'flex',flexWrap:'wrap',gap:8,alignItems:'center'},
 button:{fontSize:13,fontWeight:700,textDecoration:'none',borderRadius:7,padding:'10px 12px',background:'#12415b',color:'white',display:'inline-flex',justifyContent:'center'},
 outline:{fontSize:13,fontWeight:700,textDecoration:'none',borderRadius:7,padding:'10px 12px',color:'#12415b',border:'1px solid #bfd0d9',display:'inline-flex',justifyContent:'center'},
 link:{fontSize:13,color:'#125679',textDecoration:'none'},
 notice:{lineHeight:1.65,fontSize:14,color:'#526171',border:'1px solid #dbe2e8',borderRadius:12,background:'#fff',padding:20},
};
export default function MumbaiLocalities(){
 const [projects,setProjects]=useState([]),[loading,setLoading]=useState(true),[error,setError]=useState('');
 useEffect(()=>{(async()=>{const {data,error:e}=await supabase.from('projects').select('id,name,slug,address,category,verified,active,market,locations(name)').eq('active',true).eq('verified',true).eq('market','Mumbai').order('name').limit(1500);if(e)setError(e.message);setProjects(data||[]);setLoading(false)})()},[]);
 const stats=useMemo(()=>groups.map(group=>({...group,cards:group.places.map(def=>{
  const relevant=projects.filter(p=>matches(p,def));
  return {def,related:relevant,res:relevant.filter(p=>p.category==='apartment'||p.category==='villa'),commercial:relevant.filter(p=>p.category==='commercial_office'||p.category==='retail')};
 })})),[projects]);
 const all=stats.flatMap(s=>s.cards),withListings=all.filter(c=>c.related.length>0).length;
 return <main style={css.main}>
 <section style={css.hero}><div style={css.shell}>
  <div style={css.nav}><a href="/" style={{color:'#fff'}}>Way2Paisa Home</a><a href="/properties?market=Mumbai" style={{color:'#fff'}}>All verified Mumbai listings</a><a href="/mumbai-project-watchlist" style={{color:'#fff'}}>New project watchlist</a></div>
  <div style={css.kicker}>WAY2PAISA • MUMBAI DEMAND CORRIDORS</div>
  <h1 style={css.h1}>Explore Mumbai properties by locality</h1>
  <p style={css.subtitle}>Residential and commercial discovery across all 35 high-demand Mumbai micro-markets. See which localities have genuinely verified live listings, search the full site, or request sourcing for a location with limited published options.</p>
  <div style={css.metrics}>
   <div style={css.metric}><div style={css.kicker}>Demand locations</div><strong style={{fontSize:25}}>35</strong></div>
   <div style={css.metric}><div style={css.kicker}>With verified results</div><strong style={{fontSize:25}}>{loading?'…':withListings}</strong></div>
   <div style={css.metric}><div style={css.kicker}>Needs live sourcing</div><strong style={{fontSize:25}}>{loading?'…':35-withListings}</strong></div>
  </div>
 </div></section>
 <div style={css.shell}>
 {error&&<p style={{color:'#ad4d20'}}>Live catalogue could not be loaded. Counts are unavailable; please use the inquiry links. {error}</p>}
 {stats.map((group,index)=><section key={group.heading} id={'region-'+index}>
  <h2 style={{fontSize:26,margin:'20px 0 6px'}}>{group.heading}</h2>
  <p style={{...css.label,marginBottom:14}}>Counted from currently published, verified Mumbai project records only. A location may share projects with a broader neighbouring market.</p>
  <div style={css.grid}>
  {group.cards.map(({def,related,res,commercial})=>{
   const [name]=def;const count=related.length;
   return <article key={name} style={css.card}>
    <h3 style={css.title}>{name}</h3>
    <div style={css.row}>
      <span style={css.label}><strong>{loading?'…':res.length}</strong> residential</span>
      <span style={css.label}> · </span>
      <span style={css.label}><strong>{loading?'…':commercial.length}</strong> commercial</span>
    </div>
    {count>0?<div style={css.label}><strong>Verified on Way2Paisa:</strong> {related.slice(0,3).map((p,i)=><span key={p.id}>{i?', ':''}<a href={'/projects/'+p.slug} style={css.link}>{p.name}</a></span>)}{count>3?<span> and {count-3} more</span>:null}</div>:
      <p style={css.label}>No verified live listing currently matched to this micro-market. Sourcing requests are welcome; no project availability is implied.</p>}
    <div style={{...css.row,marginTop:'auto'}}>
      <a href={search(name)} style={css.outline}>Search all verified</a>
      <a href={inquiry(name)} target="_blank" rel="noopener noreferrer" style={css.button}>Request sourcing</a>
    </div>
   </article>;
  })}
  </div>
 </section>)}
 <aside style={css.notice}><strong>Verification policy.</strong> Published counts exclude draft, resale-unconfirmed, sold-out and incompletely enriched projects. Prices, possession, MahaRERA records and specific unit availability require a fresh check before booking. A nearby listing under a broader locality is not automatically a project in your chosen street or building. No projects have been invented to fill a zero count. For upcoming and unverified launches, explore the <a href="/mumbai-project-watchlist">research-stage new project watchlist</a>. Way2Paisa FinPro Services • MahaRERA A51900044593 • <a href="https://www.way2paisa.in">www.way2paisa.in</a>.</aside>
 </div>
 </main>;
}
