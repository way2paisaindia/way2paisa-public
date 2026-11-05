import {notFound} from 'next/navigation';
import ListingImage from '../../components/ListingImage';
import HighIntentEnquiryForm from '../../components/HighIntentEnquiryForm';
import {loadPublicProjects} from '../../lib/public-projects';
import {highIntentPages,highIntentSlugs} from '../../lib/high-intent-pages';
import '../solutions.css';

export const revalidate=300;

export function generateStaticParams(){
  return highIntentSlugs.map(slug=>({slug}));
}

export async function generateMetadata({params}){
  const {slug}=await params;
  const page=highIntentPages[slug];
  if(!page)return {title:'Page not found | Way2Paisa',robots:{index:false,follow:false}};
  const url='https://www.way2paisa.in/solutions/'+slug;
  return {
    title:page.seoTitle,
    description:page.seoDescription,
    alternates:{canonical:'/solutions/'+slug},
    openGraph:{
      title:page.seoTitle,
      description:page.seoDescription,
      url,
      type:'website',
      siteName:'Way2Paisa FinPro Services',
      images:[{url:'/opengraph-image',alt:'Way2Paisa FinPro Services property advisory'}]
    },
    twitter:{card:'summary_large_image',title:page.seoTitle,description:page.seoDescription,images:['/opengraph-image']}
  };
}

function publishedPrice(project){
  const candidates=(project.live_unit_offers||[])
    .map(offer=>Number(offer.minimum))
    .filter(amount=>Number.isFinite(amount)&&amount>0);
  if(!candidates.length)return 'Price on request';
  const value=Math.min(...candidates);
  if(String(project.market||'').toLowerCase()==='dubai'){
    return 'AED '+Math.round(value).toLocaleString('en-AE')+'+';
  }
  const crores=value>=100000?value/10000000:value;
  return crores<1?'₹'+(crores*100).toLocaleString('en-IN',{maximumFractionDigits:2})+' Lakh+'
    :'₹'+crores.toLocaleString('en-IN',{maximumFractionDigits:2})+' Cr+';
}

function PublishedCard({project}){
  const area=project.locations?.name||project.market;
  const developer=project.developers?.name||'Project developer';
  const configuration=project.live_configuration_summary||'Configuration on request';
  return <article className="solutionListing">
    <a className="solutionListingImage" href={'/projects/'+project.slug} aria-label={'View '+project.name}>
      {project.hero_image_url?<ListingImage projectId={project.id} src={project.hero_image_url} alt={project.name} imageVariant="preview" loading="lazy"/>:<div className="solutionImageMissing">Verified project photograph unavailable</div>}
    </a>
    <div className="solutionListingBody">
      <span className="solutionListingArea">{area} · {developer}</span>
      <h3><a href={'/projects/'+project.slug}>{project.name}</a></h3>
      <p>{configuration}</p>
      <div className="solutionListingBottom"><strong>{publishedPrice(project)}</strong><a href={'/projects/'+project.slug}>View project details</a></div>
    </div>
  </article>;
}

export default async function HighIntentLandingPage({params}){
  const {slug}=await params;
  const page=highIntentPages[slug];
  if(!page)notFound();
  const catalogue=await loadPublicProjects();
  const eligible=new Map((catalogue.projects||[])
    .filter(project=>project.market===page.market&&page.categories.includes(project.category))
    .map(project=>[project.slug,project]));
  const selected=page.slugs.map(key=>eligible.get(key)).filter(Boolean);
  const currentUrl='https://www.way2paisa.in/solutions/'+slug;
  const structured={
    '@context':'https://schema.org',
    '@type':'WebPage',
    name:page.title,
    description:page.seoDescription,
    url:currentUrl,
    isPartOf:{'@type':'WebSite',name:'Way2Paisa FinPro Services',url:'https://www.way2paisa.in'},
    mainEntity:{
      '@type':'ItemList',
      numberOfItems:selected.length,
      itemListElement:selected.map((item,index)=>({
        '@type':'ListItem',
        position:index+1,
        name:item.name,
        url:'https://www.way2paisa.in/projects/'+encodeURIComponent(item.slug)
      }))
    }
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structured).replace(/</g,'\\u003c')}}/>
    <header className="solutionTopNav">
      <a className="solutionBrand" href="/"><img src="/way2paisa-logo.png" alt="Way2Paisa FinPro Services"/></a>
      <nav aria-label="Primary navigation">
        <a href="/">Home</a>
        <a href={page.catalogueLink}>Explore properties</a>
        <a href="/finance">Finance solutions</a>
        <a className="solutionTopAction" href="#consultation">Speak to an Advisor</a>
      </nav>
    </header>
    <main id="content">
      <section className="solutionHero" aria-labelledby="solution-title">
        <div className="solutionHeroInner">
          <nav className="solutionBreadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span>›</span><span>{page.title}</span></nav>
          <p className="solutionEyebrow">{page.eyebrow}</p>
          <h1 id="solution-title">{page.title}</h1>
          <p className="solutionSubtitle">{page.subtitle}</p>
          <div className="solutionHeroActions">
            <a className="solutionButton" href="#consultation">{page.primaryAction}</a>
            <a className="solutionSecondary" href="#published-projects">View selected projects</a>
          </div>
          <p className="solutionTrust">Only published, verified projects · No guaranteed returns or availability claims · Terms subject to confirmation</p>
        </div>
      </section>
      <section className="solutionIntro" aria-label="Buyer overview">
        {page.introduction.map((paragraph,i)=><p key={i}>{paragraph}</p>)}
      </section>
      <section className="solutionProjects" id="published-projects" aria-labelledby="solution-projects-title">
        <div className="solutionSectionHead">
          <p className="solutionEyebrow">LIVE PROJECT CATALOGUE</p>
          <h2 id="solution-projects-title">{page.cardHeading}</h2>
          <p>{page.cardIntro}</p>
        </div>
        {selected.length>0
          ? <div className="solutionListings">{selected.map(project=><PublishedCard key={project.id} project={project}/>)}</div>
          : <p className="solutionEmpty">Current published project matches are temporarily unavailable. Browse the main verified catalogue or request an updated shortlist.</p>}
        <p className="solutionFootnote">Starting prices are indicative from currently published active inventory, not final unit quotations. Eligibility, taxes and charges depend on the actual transaction. Images are subject to the source-specific verification and display notices on each listing.</p>
        <a className="solutionTextLink" href={page.catalogueLink}>Explore the full verified catalogue</a>
      </section>
      <section className="solutionEditorial" aria-label="Property buying and due diligence guide">
        <p className="solutionEyebrow">BUYER DECISION GUIDE</p>
        {page.sections.map((section,i)=><article key={section.title} className="solutionEditorialSection">
          <div className="solutionEditorialNumber">{String(i+1).padStart(2,'0')}</div>
          <div><h2>{section.title}</h2>{section.paragraphs.map((paragraph,j)=><p key={j}>{paragraph}</p>)}</div>
        </article>)}
      </section>
      <section className="solutionFaq" aria-labelledby="solution-faq-title">
        <p className="solutionEyebrow">COMMON BUYER QUESTIONS</p>
        <h2 id="solution-faq-title">Frequently asked questions</h2>
        <div className="solutionFaqList">{page.faqs.map(([question,answer])=><details key={question} className="solutionFaqItem"><summary>{question}</summary><p>{answer}</p></details>)}</div>
      </section>
      <section className="solutionEnquirySection" id="consultation" aria-labelledby="solution-contact-title">
        <div className="solutionContactCopy">
          <p className="solutionEyebrow">PERSONALISED WAY2PAISA ADVISORY</p>
          <h2 id="solution-contact-title">Find a property that fits your actual brief.</h2>
          <p>Share your preferred area, configuration, budget and purchase timeline. We can help narrow the options, coordinate updated project information and arrange suitable next steps. We do not send unrelated listings.</p>
          <p><strong>Prefer to explore independently?</strong> Every project card links to its detailed published page. You can also browse the complete catalogue and compare current configuration information.</p>
          <a href={page.catalogueLink}>Browse matching projects</a>
        </div>
        <HighIntentEnquiryForm topic={page.leadName} market={page.market}/>
      </section>
      <section className="solutionRelated" aria-label="Other property advisory guides">
        <h2>Explore more property decisions</h2>
        <div>{highIntentSlugs.filter(other=>other!==slug).map(other=><a key={other} href={'/solutions/'+other}>{highIntentPages[other].title}</a>)}</div>
      </section>
    </main>
    <footer className="solutionFooter">
      <div><strong>Way2Paisa FinPro Services</strong><p>Independent property and finance advisory · Mumbai, India</p></div>
      <div><a href="/">Home</a><a href="/properties">Published projects</a><a href="/legal">Legal and privacy</a></div>
      <p className="solutionDisclaimer">Independent facilitator. Details, layouts, prices, inventory, completion dates and images are subject to source verification and developer change. Check applicable RERA or DLD records and the binding agreement. No guaranteed investment return. Terms and conditions apply.</p>
      <span>www.way2paisa.in</span>
    </footer>
  </>;
}
