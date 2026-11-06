import Link from 'next/link';
import {notFound} from 'next/navigation';
import {loadLandingProjects} from '../../lib/public-projects';
import {intentLandingPages,intentLandingSlugs} from '../../lib/intent-landing-pages';
import ListingImage from '../../components/ListingImage';
import HighIntentEnquiryForm from '../../components/HighIntentEnquiryForm';
import '../../solutions/solutions.css';
import styles from './page.module.css';

export const revalidate = 300;
// Do not generate unpublished or overlapping buyer-intent routes.
export const dynamicParams = false;

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
// If a published development offers both bare plots and built villas,
// never pair the lower plot price with an unqualified "Villa" label.
// Both amounts are derived from verified, active configuration-level stock.
function mixedPlotVillaPrices(project){
  const offers=project.live_unit_offers||[];
  const valid=offers.filter(offer=>Number.isFinite(Number(offer.minimum))&&Number(offer.minimum)>0);
  const plot=valid.filter(offer=>/\b(?:plot|land)\b/i.test(String(offer.configuration||'')));
  const villa=valid.filter(offer=>/\b(?:villa|townhouse)\b/i.test(String(offer.configuration||'')));
  if(!plot.length||!villa.length)return null;
  const lowest=items=>Math.min(...items.map(item=>Number(item.minimum)));
  const format=amount=>priceLabel({...project,min_price:amount}).replace(/^From /,'')+'+';
  return {plot:format(lowest(plot)),villa:format(lowest(villa))};
}
function projectType(project){
  if(mixedPlotVillaPrices(project))return'Plots & Villas';
  return {apartment:'Apartment',villa:'Villa',plot:'Residential plot',land:'Land plot',commercial_office:'Commercial office'}[project.category]||'Property';
}
function card(p){
  return <article key={p.id} className={styles.card}>
    <Link className={styles.cardImage} href={'/projects/'+encodeURIComponent(p.slug)} aria-label={'View '+p.name}>
      <ListingImage src={p.hero_image_url} projectId={p.id} alt={p.name} imageVariant="preview" loading="lazy"/>
    </Link>
    <div className={styles.cardBody}>
      <div className={styles.cardMeta}><span>{projectType(p)}</span><span>{p.locations?.name||p.market}</span></div>
      <h3><Link href={'/projects/'+encodeURIComponent(p.slug)}>{p.name}</Link></h3>
      {p.developers?.name&&<p className={styles.developer}>By {p.developers.name}</p>}
      <p className={styles.configuration}>{trim(p.live_configuration_summary)||'Configurations on request'}</p>
      <div className={styles.cardFooter}>
        {mixedPlotVillaPrices(p)?<div className={styles.priceTypes}><span>Plots <strong>{mixedPlotVillaPrices(p).plot}</strong></span><span>Villas <strong>{mixedPlotVillaPrices(p).villa}</strong></span></div>:<strong>{priceLabel(p)}</strong>}
        <Link href={'/projects/'+encodeURIComponent(p.slug)}>View details <span aria-hidden="true">→</span></Link>
      </div>
    </div>
  </article>;
}

export default async function IntentLandingPage({params}){
  const{intent}=await params;
  const config=intentLandingPages[intent];
  if(!config)notFound();
  const result=await loadLandingProjects({market:'MMR',categories:['plot','villa','land']});
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
  const breadcrumbs={
    '@context':'https://schema.org',
    '@type':'BreadcrumbList',
    itemListElement:[
      {'@type':'ListItem',position:1,name:'Home',item:'https://www.way2paisa.in/'},
      {'@type':'ListItem',position:2,name:'Properties',item:'https://www.way2paisa.in/properties'},
      {'@type':'ListItem',position:3,name:config.title,item:canonical}
    ]
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
    {config.sections?.length>0&&<section className="solutionEditorial" aria-label="Villa and plot buying guide">
      <p className="solutionEyebrow">VILLA AND PLOT BUYER GUIDE</p>
      {config.sections.map((section,i)=><article className="solutionEditorialSection" key={section.title}>
        <div className="solutionEditorialNumber">{String(i+1).padStart(2,'0')}</div>
        <div><h2>{section.title}</h2>{section.paragraphs.map((paragraph,j)=><p key={j}>{paragraph}</p>)}</div>
      </article>)}
    </section>}
    {config.faqs?.length>0&&<section className="solutionFaq" aria-labelledby="mmr-property-faq-title">
      <p className="solutionEyebrow">COMMON BUYER QUESTIONS</p>
      <h2 id="mmr-property-faq-title">Frequently asked questions</h2>
      <div className="solutionFaqList">{config.faqs.map(([question,answer])=><details key={question} className="solutionFaqItem">
        <summary>{question}</summary><p>{answer}</p>
      </details>)}</div>
    </section>}
    <section className={styles.advisory}>
      <div><p className={styles.kicker}>BUYER DUE DILIGENCE</p><h2>Before you shortlist</h2><p>{config.guidance}</p></div>
      <div><h2>Need tailored options?</h2><p>Share your preferred location, budget and property type. The enquiry form below lets our team coordinate a relevant shortlist without unrelated listings.</p><a className={styles.primary} href="#consultation">Request a property shortlist</a></div>
    </section>
    <section className="solutionEnquirySection" id="consultation" aria-labelledby="mmr-shortlist-title">
      <div className="solutionContactCopy"><p className="solutionEyebrow">MMR VILLA & PLOT ADVISORY</p><h2 id="mmr-shortlist-title">Find the right second home or plotted development.</h2><p>Share your preferred area, budget and whether you seek a built villa or residential plot. We can coordinate published project information, site visits and the questions to ask about legal approvals and construction scope.</p><p>Prices and inventory must be reconfirmed against current developer documentation before any booking.</p></div>
      <HighIntentEnquiryForm topic="MMR Villas and Plots Advisory" market="Mumbai"/>
    </section>
    <nav className={styles.related} aria-label="Other property searches">
      <strong>Explore another property goal</strong>
      <Link href="/solutions/mumbai-luxury-homes">Mumbai luxury homes</Link><Link href="/solutions/mumbai-commercial-property">Mumbai commercial offices</Link><Link href="/solutions/dubai-property-investment">Dubai property investment</Link>
    </nav>
    <footer className={styles.footer}><Link href="/">Way2Paisa FinPro Services</Link><span>Independent channel partner. Details and images subject to developer confirmation. Verify approvals, pricing and terms before booking. T&amp;C apply.</span><Link href="/legal">Legal information</Link></footer>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structured).replace(/</g,'\\u003c')}}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumbs).replace(/</g,'\\u003c')}}/>
  </main>;
}
