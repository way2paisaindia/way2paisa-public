import Link from 'next/link';
import {notFound} from 'next/navigation';
import {loadPublicProjects} from '../../lib/public-projects';
import {intentLandingPages,intentLandingSlugs} from '../../lib/intent-landing-pages';
import ListingImage from '../../components/ListingImage';
import styles from './page.module.css';

export const revalidate = 300;

export function generateStaticParams(){
  return intentLandingSlugs.map(intent=>({intent}));
}

export async function generateMetadata({params}){
  const{intent}=await params;
  const config=intentLandingPages[intent];
  if(!config)return{title:'Page Not Found | Way2Paisa',robots:{index:false,follow:false}};
  const canonical='/explore/'+intent;
  return{
    title:config.metaTitle,
    description:config.description,
    alternates:{canonical},
    openGraph:{title:config.metaTitle,description:config.description,type:'website',siteName:'Way2Paisa FinPro Services',url:canonical,images:[{url:'/opengraph-image',alt:'Way2Paisa property advisory'}]},
    twitter:{card:'summary_large_image',title:config.metaTitle,description:config.description,images:['/opengraph-image']}
  };
}

const trim=value=>String(value||'').trim();

function priceLabel(project){
  const value=Number(project.min_price);
  if(!Number.isFinite(value)||value<=0)return'Price on request';
  if(project.market==='Dubai')return 'From AED '+Math.round(value).toLocaleString('en-AE');
  const crore=value>=100000?value/10000000:value;
  if(crore>=1)return 'From ₹'+crore.toLocaleString('en-IN',{maximumFractionDigits:2})+' Cr';
  return 'From ₹'+(crore*100).toLocaleString('en-IN',{maximumFractionDigits:2})+' L';
}
function projectType(value){
  return {apartment:'Apartment',villa:'Villa',plot:'Residential plot',land:'Land plot',commercial_office:'Commercial office'}[value]||'Property';
}
function card(p){
  return <article key={p.id} className={styles.card}>
    <Link className={styles.cardImage} href={'/projects/'+encodeURIComponent(p.slug)} aria-label={'View '+p.name}>
      <ListingImage src={p.hero_image_url} projectId={p.id} alt={p.name} imageVariant="preview" loading="lazy"/>
    </Link>
    <div className={styles.cardBody}>
      <div className={styles.cardMeta}><span>{projectType(p.category)}</span><span>{p.locations?.name||p.market}</span></div>
      <h3><Link href={'/projects/'+encodeURIComponent(p.slug)}>{p.name}</Link></h3>
      {p.developers?.name&&<p className={styles.developer}>By {p.developers.name}</p>}
      <p className={styles.configuration}>{trim(p.live_configuration_summary)||'Configurations on request'}</p>
      <div className={styles.cardFooter}>
        <strong>{priceLabel(p)}</strong>
        <Link href={'/projects/'+encodeURIComponent(p.slug)}>View details <span aria-hidden="true">→</span></Link>
      </div>
    </div>
  </article>;
}

export default async function IntentLandingPage({params}){
  const{intent}=await params;
  const config=intentLandingPages[intent];
  if(!config)notFound();
  const result=await loadPublicProjects();
  const projects=(result.projects||[]).filter(config.match);
  // The source loader already excludes anything not active, verified and
  // completely enriched. Never fall back to draft or unpublished projects.
  const selected=projects.slice().sort((a,b)=>Number(Boolean(b.featured))-Number(Boolean(a.featured))
    || trim(a.name).localeCompare(trim(b.name))).slice(0,24);
  const canonical='https://www.way2paisa.in/explore/'+intent;
  const structured={
    '@context':'https://schema.org',
    '@type':'CollectionPage',
    name:config.title,
    description:config.description,
    url:canonical,
    mainEntity:{
      '@type':'ItemList',
      itemListElement:selected.map((p,i)=>({
        '@type':'ListItem',position:i+1,
        name:p.name,
        url:'https://www.way2paisa.in/projects/'+encodeURIComponent(p.slug)
      }))
    }
  };
  return <main className={styles.page}>
    <header className={styles.header}>
      <Link className={styles.brand} href="/" aria-label="Way2Paisa homepage"><img src="/way2paisa-logo.png" alt="Way2Paisa FinPro Services"/></Link>
      <nav aria-label="Main navigation"><Link href="/properties">All properties</Link><Link href="/finance">Finance solutions</Link><Link href="/#enquire">Speak to an advisor</Link></nav>
    </header>
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.eyebrow}>WAY2PAISA / {config.eyebrow}</div>
        <h1>{config.title}</h1>
        <p>{config.intro}</p>
        <div className={styles.heroActions}><a href="#verified-projects" className={styles.primary}>Explore verified projects</a><Link className={styles.secondary} href={config.browseHref}>{config.browseLabel}</Link></div>
      </div>
    </section>
    <div className={styles.breadcrumb}><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/properties">Properties</Link><span aria-hidden="true">/</span><span>{config.title}</span></div>
    <section className={styles.mainSection} id="verified-projects">
      <div className={styles.sectionHead}>
        <div><p className={styles.kicker}>FULLY PUBLISHED PROJECTS</p><h2>Explore matching developments</h2><p>{config.criteria}. Listings update from the published catalogue; final developer pricing and availability require confirmation.</p></div>
        <div className={styles.count}>{!result.error ? projects.length+' matching projects' : 'Catalogue unavailable'}</div>
      </div>
      {result.error?<div className={styles.notice} role="status">Project listings are temporarily unavailable. <Link href="/properties">Return to property search</Link>.</div>:
        selected.length?<div className={styles.grid}>{selected.map(card)}</div>:
        <div className={styles.notice}>No fully published projects match these criteria today. <Link href={config.browseHref}>Browse the full catalogue</Link>.</div>}
      {projects.length>selected.length&&<p className={styles.more}>Showing {selected.length} of {projects.length} matching projects. <Link href={config.browseHref}>Refine your search in the full property catalogue.</Link></p>}
    </section>
    <section className={styles.advisory}>
      <div><p className={styles.kicker}>BUYER DUE DILIGENCE</p><h2>Before you shortlist</h2><p>{config.guidance}</p></div>
      <div><h2>Need tailored options?</h2><p>Tell our advisory team your preferred location, budget and property type. We can help review suitable published developments and arrange a discussion.</p><Link className={styles.primary} href="/#enquire">Speak to an advisor</Link></div>
    </section>
    <nav className={styles.related} aria-label="Other property searches">
      <strong>Explore another property goal</strong>
      {intentLandingSlugs.filter(key=>key!==intent).map(key=><Link key={key} href={'/explore/'+key}>{intentLandingPages[key].title}</Link>)}
    </nav>
    <footer className={styles.footer}><Link href="/">Way2Paisa FinPro Services</Link><span>Independent channel partner. Details and images subject to developer confirmation. Verify approvals, pricing and terms before booking. T&amp;C apply.</span><Link href="/legal">Legal information</Link></footer>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structured).replace(/</g,'\\u003c')}}/>
  </main>;
}
