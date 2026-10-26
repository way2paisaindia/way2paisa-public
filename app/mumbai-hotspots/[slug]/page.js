import Link from 'next/link';
import {notFound} from 'next/navigation';
import {areaFromSlug,areaDetailUrl,areaSearchUrl,areaEnquiryUrl,hotspotGroups,loadPublishedMumbaiProjects,projectMatchesArea,splitProjectsByCategory} from '../areas';
import styles from './page.module.css';

export const revalidate=3600;
const areaContext={
 'Bandra':'Premium west-coast residences, family housing in Bandra East and West, and BKC-linked investments.',
 'Khar':'Boutique Khar West residences and office addresses around the western suburban corridor.',
 'Santacruz':'Residential choices spanning Santacruz East and West and their adjoining business districts.',
 'Vile Parle':'New and ongoing residences across Vile Parle East and West.',
 'Juhu':'Luxury and boutique homes near Juhu’s coastal neighbourhoods.',
 'Juhu Tara Road':'Premium residential opportunities focused on the Juhu Tara Road corridor.',
 'Versova':'Homes in a coastal western suburb with local high-street connections.',
 'Andheri':'Apartment and investment opportunities across Andheri East and West.',
 'Oshiwara Link Road':'Residential and office enquiries along the western suburban link-road corridor.',
 'Jogeshwari':'A wide range of residential formats around the eastern and western neighbourhoods.',
 'Goregaon':'Family apartments, premium towers and developer launches in Goregaon East and West.',
 'Malad':'Mid-market and premium apartment developments across Malad.',
 'Kandivali':'Residential launches and family housing across Kandivali East and West.',
 'Borivali':'Mid-market, premium and luxury residential developments across Borivali.',
 'Sion':'Central Mumbai residential developments with connections to eastern and southern districts.',
 'Matunga':'Boutique residences in an established central Mumbai neighbourhood.',
 'Dadar':'Residential options around Dadar East and West with central-city access.',
 'Wadala':'Residential developments across Wadala and adjoining central Mumbai districts.',
 'Parel':'Residential and commercial enquiries near the central Mumbai business corridor.',
 'Sewri':'Residential towers and projects in the eastern waterfront redevelopment corridor.',
 'Prabhadevi':'Premium and luxury residential projects close to Worli and Dadar.',
 'Lower Parel':'Residences and workspace enquiries in the Lower Parel business district.',
 'Worli':'Premium residential towers and coastal properties in South-Central Mumbai.',
 'Mahalaxmi':'Premium high-rise residences in the Mahalaxmi and Saat Rasta corridor.',
 'Tardeo':'Luxury and established neighbourhood residential addresses in South Mumbai.',
 'Byculla':'Residential developments and redevelopment projects around central South Mumbai.',
 'Nariman Point':'Office and investment enquiries focused on Mumbai’s established CBD.',
 'Nepean Sea Road':'Luxury apartment enquiries in the Nepean Sea Road corridor.',
 'Cuffe Parade':'South Mumbai residential and commercial investment enquiries.',
 'Malabar Hill':'Ultra-premium residential opportunities in the Malabar Hill neighbourhood.',
 'Marine Lines':'Residential and business enquiries around Marine Lines.',
 'Churchgate':'Prime South Mumbai office and residential enquiries around Churchgate.',
 'Colaba':'Premium South Mumbai property and commercial enquiries in Colaba.',
 'Ghatkopar':'Apartment options near the eastern suburban residential and business corridors.',
 'Powai':'Premium lakeside-district residences and eastern suburban investment options.',
};
const priceLabel=(v)=>{const n=Number(v);return Number.isFinite(n)&&n>0?'Indicative from ₹'+new Intl.NumberFormat('en-IN',{maximumFractionDigits:2}).format(n)+' Cr':'Price on request'};
export async function generateMetadata({params}){
 const {slug}=await params;
 const area=areaFromSlug(slug);
 if(!area)return {title:'Locality not found | Way2Paisa',robots:{index:false,follow:true}};
 const rows=await loadPublishedMumbaiProjects();
 const count=rows===null?0:rows.filter(p=>projectMatchesArea(p,area)).length;
 return {
  title:area+' Residential & Commercial Projects | Mumbai | Way2Paisa',
  description:'Explore '+area+', Mumbai: verified published apartments, commercial properties, indicative prices and direct project links. Ask for current promoter inventory and quotations.',
  alternates:{canonical:areaDetailUrl(area)},
  robots:{index:count>=3,follow:true},
  openGraph:{title:area+' Property Projects | Way2Paisa',description:'Explore currently published homes and offices in '+area+', Mumbai.',url:'https://www.way2paisa.in'+areaDetailUrl(area)},
 };
}
function ProjectRow({project}){
 return <article className={styles.project}>
  <div><p className={styles.projType}>{project.category==='commercial_office'?'OFFICE / COMMERCIAL':'RESIDENTIAL'} · {project.locations?.name||'Mumbai'}</p>
    <h3><Link href={'/projects/'+encodeURIComponent(project.slug)}>{project.name}</Link></h3>
    <p className={styles.developer}>{project.developers?.name||'Developer / promoter details on project page'}</p>
  </div>
  <div className={styles.price}><strong>{priceLabel(project.min_price)}</strong><span>Price and unsold-unit availability require reconfirmation</span><Link href={'/projects/'+encodeURIComponent(project.slug)}>View project ↗</Link></div>
 </article>
}
export default async function MumbaiAreaPage({params}){
 const {slug}=await params;const area=areaFromSlug(slug);if(!area)notFound();
 const rows=await loadPublishedMumbaiProjects();
 const matching=(rows||[]).filter(project=>projectMatchesArea(project,area)&&project.slug);
 const {homes,offices}=splitProjectsByCategory(matching);
 const group=hotspotGroups.find(x=>x.areas.includes(area));
 const nearby=group.areas.filter(x=>x!==area).slice(0,7);
 return <main className={styles.root}>
  <header className={styles.nav}><Link href="/" className={styles.brand}>WAY2PAISA</Link><nav><Link href="/mumbai-hotspots">Mumbai hotspots</Link><Link href="/properties?market=Mumbai">All projects</Link><Link href="/properties?market=Dubai">Dubai</Link></nav></header>
  <div className={styles.body}>
   <div className={styles.breadcrumb}><Link href="/">Home</Link> / <Link href="/mumbai-hotspots">Mumbai hotspots</Link> / {area}</div>
   <section className={styles.hero}><p className={styles.kicker}>MUMBAI · RESIDENTIAL & COMMERCIAL</p><h1>{area} property projects</h1><p>{areaContext[area]} Compare Way2Paisa’s verified published listings, then request the latest developer-confirmed offer before making a purchase decision.</p>
   <div className={styles.actions}><a href={areaEnquiryUrl(area)} target="_blank" rel="noopener noreferrer" className={styles.primary}>Enquire about {area}</a><Link href={areaSearchUrl(area)} className={styles.secondary}>Search complete catalogue</Link></div></section>
   <div className={styles.stats}><div><strong>{rows===null?'—':matching.length}</strong><span>Published matching projects</span></div><div><strong>{rows===null?'—':homes.length}</strong><span>Residential projects</span></div><div><strong>{rows===null?'—':offices.length}</strong><span>Commercial projects</span></div></div>
   <div className={styles.disclaimer}>Only already-published and verified project records appear below. Listed prices are indicative and do not guarantee a currently available numbered unit. Private pipeline projects are excluded.</div>
   <section className={styles.segment}><div className={styles.sectionHead}><div><p className={styles.kicker}>BUY A HOME</p><h2>Residential projects in {area}</h2></div><Link href={areaSearchUrl(area,'apartment')}>Search residential →</Link></div>
   {homes.length>0?<div className={styles.cards}>{homes.map(project=><ProjectRow key={project.id} project={project}/>)}</div>:<p className={styles.empty}>No residential project in this locality currently meets our public-listing requirements. Ask our advisors to check approved upcoming and nearby developer inventory.</p>}</section>
   <section className={styles.segment}><div className={styles.sectionHead}><div><p className={styles.kicker}>WORK & INVEST</p><h2>Commercial properties in {area}</h2></div><Link href={areaSearchUrl(area,'commercial_office')}>Search offices →</Link></div>
   {offices.length>0?<div className={styles.cards}>{offices.map(project=><ProjectRow key={project.id} project={project}/>)}</div>:<p className={styles.empty}>No currently published office or retail development is matched to {area}. Ask for verified commercial options or search the full Mumbai office catalogue.</p>}</section>
   <section className={styles.nearby}><h2>Explore other {group.title.toLowerCase()}</h2><p>Broaden the shortlist to published neighbouring-market options.</p><div className={styles.pills}>{nearby.map(near=><Link key={near} href={areaDetailUrl(near)}>{near} ↗</Link>)}</div></section>
   <section className={styles.cta}><div><h2>Looking for an upcoming project?</h2><p>Tell us your budget, preferred property type and requirements. We can check primary-market availability without advertising an unverified project as bookable.</p></div><a href={areaEnquiryUrl(area)} target="_blank" rel="noopener noreferrer">Ask for verified {area} options</a></section>
   <footer className={styles.footer}><Link href="/">Home</Link><Link href="/mumbai-hotspots">All Mumbai hotspots</Link><Link href="/legal">Legal information</Link><span>© Way2Paisa FinPro Services</span></footer>
  </div></main>;
}
