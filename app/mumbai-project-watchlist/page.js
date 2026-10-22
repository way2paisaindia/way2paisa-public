export const metadata = {
  title: 'Mumbai New Project Watchlist | Offices, Retail & Homes | Way2Paisa',
  description: 'Explore upcoming and under-construction Mumbai commercial and residential projects being verified by Way2Paisa. Enquire for current promoter inventory, prices and site visits.',
  alternates: { canonical: '/mumbai-project-watchlist' },
  robots: { index: true, follow: true },
};

const data = [["L&T Innovation Campus — Lower Parel","Lower Parel","Commercial • Grade-A office leasing","","Under development; leasing focus","Official L&T Realty office page","Developer describes the office campus for prospective occupiers. Unit-wise leasing rates and available floor plates remain unverified; this is not a verified sale offering."],["One Lower Parel — Arth Realty","Lower Parel","Commercial • Offices, retail & mixed use","","Launched September 2026; registrations to verify","AFW project architect","Architect confirms mixed-use concept and launch; current registered sale/lease inventory, developer terms and availability are not yet verified."],["24 High Zennith","Andheri East","Commercial • Offices","P51800055713","Under construction","First-party project page","331 sq.ft office format; request developer's current costed unit sheet."],["Ajod One","Vile Parle West","Commercial • Offices & retail","PC1180002500084","Under construction","Developer & regulatory record","Offices and shops near Mithibai College; pricing and allocations under review."],["Bharat Waterfield One9","Bandra West","Commercial • Boutique offices","","Under construction","Developer-listed project","Waterfield Road business address; registration and current inventory under review."],["Bhoomi Prarambh Commercial","Borivali West","Commercial • Office & shops","P51800051754","Under construction","Project-market record","Office and retail options; exact current units and media under review."],["BKC Edge by Labdhi","Sion–Bandra Link Road","Commercial • Grade-A offices","P51900013846","Under construction","Developer & regulatory record","Near BKC, in the Sion/Dharavi approach; do not confuse with central BKC."],["DLH Business Bay","Bandra East","Commercial • Offices","PC1180002501679","Under construction","Project-market & regulatory record","Western Express Highway frontage; published rate guides are indicative, not unit allocations."],["Lotus Arc One","Andheri West","Commercial • Offices","P51800047410","Construction / completion check","Developer corporate portfolio","Boutique offices; developer-confirmed remaining office allotments pending."],["Lotus Sky Plaza","Oshiwara, Andheri West","Commercial • Offices","","Upcoming","Developer investor disclosure","Newly disclosed commercial development; phase registration and sales opening under review."],["Pahuja Business Avenue","Andheri East","Commercial • Offices","P51800047394","Under construction","Market & regulatory reference","Office development in Andheri East; current builder cost sheet under review."],["Passcode Rise Above","Oshiwara, Andheri West","Commercial • Boutique offices","P51800049549","Under construction","Market & regulatory reference","Oshiwara commercial project; promoter, media and available units under verification."],["Transcon UNO (Off BKC)","Off BKC — site location to verify","Commercial • Office & retail","P51800054865","Under construction","Market & regulatory reference","BKC-area office development; precise building location and first-party inventory pending."],["Yura Commercial by Transcon","Off Juhu Circle","Commercial • Boutique offices","P51800005547","Current status to verify","Market & regulatory reference","Juhu Circle office address; fresh first-sale status must be verified."],["AOS Khar West","Khar West","Residential • 2 & 3 BHK","P51800078308","Under construction","Market & regulatory reference","Promoter carpet layouts and dated available home prices under review."],["Prarambh by Chandiwala","Veera Desai Road, Andheri West","Residential • 1 & 2 BHK","P51800080142","Construction status to verify","Market & regulatory reference","Registered residential opportunity; units and gallery still under verification."],["Bharat Altavistas","Lokhandwala, Andheri West","Residential • Apartments","","Under construction","Developer-listed project","Developer confirms an ongoing residential project; exact registered phase and units under review."]];
const whatsapp = '918850373012';
const inquiry = (project) => 'https://wa.me/' + whatsapp + '?text=' + encodeURIComponent('Hello Way2Paisa, I am interested in ' + project + '. Please verify current units, prices, MahaRERA and arrange a site visit or presentation.');
const S = {
  main: {fontFamily: 'Arial, Helvetica, sans-serif', background: '#f7f7f5', color: '#20252c', minHeight:'100vh', padding:'0 0 64px'},
  shell: {maxWidth:1120,margin:'auto',padding:'24px 22px'},
  hero: {background:'linear-gradient(125deg,#0e253d,#173e57)',color:'#fff',padding:'44px 0'},
  over: {fontSize:12,letterSpacing:2,textTransform:'uppercase',color:'#ddd',fontWeight:700},
  title: {fontSize:'clamp(30px,5vw,48px)',lineHeight:1.13,maxWidth:840,margin:'13px 0'},
  subtitle: {fontSize:16,maxWidth:750,lineHeight:1.7,color:'#e3e9ee'},
  nav: {display:'flex',gap:18,flexWrap:'wrap',marginBottom:30,fontSize:14},
  tabs: {display:'flex',gap:12,flexWrap:'wrap',margin:'26px 0'},
  pill: {border:'1px solid #d3dae1',borderRadius:40,padding:'10px 15px',color:'#223446',textDecoration:'none',background:'#fff',fontSize:14,fontWeight:600},
  grid: {display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(285px,1fr))',gap:15,margin:'16px 0 32px'},
  card: {border:'1px solid #e4e5e7',borderRadius:15,background:'#fff',padding:20,display:'flex',flexDirection:'column',gap:10,boxShadow:'0 2px 10px #00000009'},
  label: {fontSize:12,color:'#607181',fontWeight:700,letterSpacing:.3},
  name: {fontSize:20,lineHeight:1.25,margin:0},
  p: {fontSize:14,lineHeight:1.6,color:'#55606b',margin:0},
  cta: {marginTop:'auto',display:'inline-flex',justifyContent:'center',textDecoration:'none',background:'#143f58',color:'white',padding:'12px 15px',borderRadius:8,fontWeight:700,fontSize:14},
  disclaimer: {background:'#fff',border:'1px solid #dde0e4',borderRadius:12,padding:20,lineHeight:1.7,color:'#59636a',fontSize:14},
};
function ProjectCard({p}){
 const [name,locality,type,rera,stage,source,note]=p;
 return <article style={S.card}>
  <span style={S.label}>{type}</span>
  <h3 style={S.name}>{name}</h3>
  <div style={S.p}><strong>Location:</strong> {locality}</div>
  <div style={S.p}><strong>Stage:</strong> {stage}</div>
  <div style={S.p}><strong>MahaRERA reference:</strong> {rera || 'To be verified'}</div>
  <div style={S.p}><strong>Research source:</strong> {source}</div>
  <p style={S.p}>{note}</p>
  <p style={{...S.p,fontWeight:700,color:'#965f26'}}>Price, allocation and media not yet fully verified — not a live sale listing.</p>
  <a href={inquiry(name)} target="_blank" rel="noopener noreferrer" style={S.cta}>Request verified price & site visit</a>
 </article>;
}
export default function MumbaiProjectWatchlist(){
 const commercial=data.filter(p=>p[2].startsWith('Commercial'));
 const residential=data.filter(p=>p[2].startsWith('Residential'));
 return <main style={S.main}>
  <header style={S.hero}><div style={S.shell}>
   <div style={S.nav}><a href="/" style={{color:'white'}}>Way2Paisa Home</a><a href="/properties?market=Mumbai" style={{color:'white'}}>Browse verified Mumbai properties</a><a href="/properties?market=Dubai" style={{color:'white'}}>Dubai properties</a></div>
   <div style={S.over}>Way2Paisa • Market Watch • Mumbai</div>
   <h1 style={S.title}>Upcoming & Ongoing Mumbai Property Projects</h1>
   <p style={S.subtitle}>Discover offices, retail developments and homes across Mumbai's high-demand locations. These opportunities are in active verification; ask Way2Paisa for live, promoter-confirmed pricing and availability. Only fully verified stock appears in our main property search.</p>
  </div></header>
  <div style={S.shell}>
   <div style={S.tabs}><a style={S.pill} href="#commercial">Commercial ({commercial.length})</a><a style={S.pill} href="#residential">Residential ({residential.length})</a><a style={S.pill} href="/properties?market=Mumbai">Fully verified listings</a></div>
   <section id="commercial"><h2>Commercial opportunities</h2><p style={S.p}>New or ongoing offices and retail developments in Bandra, Andheri, Oshiwara, Vile Parle, Sion, Juhu and Borivali.</p><div style={S.grid}>{commercial.map(p=><ProjectCard key={p[0]} p={p}/>)}</div></section>
   <section id="residential"><h2>Residential opportunities</h2><p style={S.p}>Recently identified high-demand suburban residential developments being vetted for exact current stock.</p><div style={S.grid}>{residential.map(p=><ProjectCard key={p[0]} p={p}/>)}</div></section>
   <aside style={S.disclaimer}><strong>Important verification notice.</strong> Projects on this page are research leads, not verified-for-booking sale listings. A named project or MahaRERA reference does not establish construction status, price, allotment or availability. Some project registrations, precise locations, promoter rights and sale inventories remain under investigation. Way2Paisa will reconfirm promoter status, approvals, carpet area, unit price, charges and legal details before advising any transaction. Developer property imagery has not been reused here. <a href="/properties?market=Mumbai">Explore fully verified live properties.</a></aside>
   <p style={{...S.p,marginTop:24}}>Way2Paisa FinPro Services | Finance • Real Estate | MahaRERA A51900044593 | <a href="https://www.way2paisa.in">www.way2paisa.in</a></p>
  </div>
 </main>;
}
