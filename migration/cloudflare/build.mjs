/**
 * Way2Paisa Cloudflare Pages FREE static-first build.
 * Node 22+, no npm dependencies, no privileged Supabase credentials.
 * Read-only public RLS queries; fail closed if any page is missing.
 * HTML escape all database content; do not export enrichment notes or internal IDs.
 */
import {mkdir, writeFile, rm, cp, readFile} from 'node:fs/promises';
import {dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {highIntentPages} from '../../app/lib/high-intent-pages.js';
import {intentLandingPages} from '../../app/lib/intent-landing-pages.js';
import {build as esbuild} from 'esbuild';

const ROOT = dirname(fileURLToPath(import.meta.url));
const OUTPUT = join(ROOT, 'dist');
const HOST = 'https://www.way2paisa.in';
const SNAPSHOT = process.env.MIGRATION_FIXTURE === '1';
const MIN_COUNT = Number(process.env.MIN_PUBLISHED_PROJECTS || 670);
const pageSize = 500;

const esc = input => String(input ?? '').replace(/[&<>"']/g, x => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
const asNum = v => v == null || v === '' ? NaN : Number(v);
const fmt = n => new Intl.NumberFormat('en-IN',{maximumFractionDigits:0}).format(n);
const dollar = n => 'AED '+fmt(n);
const rupee = n => Number.isFinite(n) && n < 1 ? '₹'+(n*100).toFixed(2).replace(/\.?0+$/,'')+' L' : '₹'+Number(n).toFixed(2).replace(/\.?0+$/,'')+' Cr';
const price = (n,m) => Number.isFinite(asNum(n)) && asNum(n)>0 ? ((m||'').toLowerCase()==='dubai'?dollar(asNum(n)):rupee(asNum(n))) : 'On Request';
const url = u => {try {const s=new URL(String(u));return s.protocol==='https:'?s.href:null;}catch{return null;}};
const slugOk = s => /^[a-z0-9][a-z0-9-]*$/.test(String(s||''));
const xml = s => esc(s);
const scriptJSON = data => JSON.stringify(data).replace(/</g,'\\u003c').replace(/>/g,'\\u003e').replace(/&/g,'\\u0026');
const officialRoute = slug => '/projects/'+slug+'/';
const date = d => /^\d{4}-\d{2}-\d{2}/.test(String(d||''))? String(d).slice(0,10):null;
function pageHead(title,description,pathname,extra=''){
 const canonical=HOST+pathname.replace(/\/$/,'')+(pathname==='/'?'':'');
 const headline=esc(title),short=esc(description);
 return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+headline+'</title><meta name="description" content="'+short+'"><meta name="robots" content="index,follow"><link rel="canonical" href="'+esc(canonical)+'"><meta property="og:type" content="website"><meta property="og:title" content="'+headline+'"><meta property="og:description" content="'+short+'"><meta property="og:url" content="'+esc(canonical)+'"><link rel="icon" href="/way2paisa-mark.jpg"><link rel="stylesheet" href="/assets/site.css">'+extra+'</head><body>';
}
const nav = '<header class="nav"><a class="logo" href="/"><img src="/way2paisa-logo.png" alt="Way2Paisa FinPro Services" width="164"></a><nav aria-label="Main navigation"><a href="/properties/">Properties</a><a href="/properties/?market=Mumbai">Mumbai &amp; MMR</a><a href="/properties/?market=Dubai">Dubai</a><a href="/finance/">Finance</a></nav><a class="nav-cta" href="/#enquire">Speak to an Advisor</a></header>';
const foot = '<footer class="footer"><p><strong>Way2Paisa FinPro Services</strong> · Mumbai, India</p><p>Independent channel partner. Verify MahaRERA/DLD registration, developer quotation, available unit, carpet area, legal approvals and all charges before booking.</p><p><a href="/legal/">Legal &amp; Privacy</a> · <a href="https://wa.me/918850373012">WhatsApp +91 88503 73012</a> · <a href="https://www.way2paisa.in/">www.way2paisa.in</a></p></footer><script src="/assets/site.js" defer></script></body></html>';
async function write(relative,body){
 const target=join(OUTPUT,relative);await mkdir(dirname(target),{recursive:true});await writeFile(target,body,'utf8');
}
async function paged(table,select,filters,base,key){
 const items=[];let cursor=null;
 for(let page=0;page<40;page++){
  const u=new URL('/rest/v1/'+table,base);u.searchParams.set('select',select);
  for(const [field,value] of Object.entries(filters))u.searchParams.set(field,value);
  u.searchParams.set('order','id.asc');u.searchParams.set('limit',String(pageSize));
  if(cursor)u.searchParams.set('id','gt.'+cursor);
  let response;
  for(let attempt=0;attempt<3;attempt++){
   try{response=await fetch(u,{headers:{apikey:key,authorization:'Bearer '+key},signal:AbortSignal.timeout(30000)});if(response.ok)break;}catch(e){if(attempt===2)throw e;}
   if(attempt===2)throw Error(table+' upstream HTTP '+response?.status);
  }
  const batch=await response.json();
  if(!Array.isArray(batch))throw Error('Invalid '+table+' source');
  if(cursor&&batch.length&&String(batch[0].id)<=String(cursor))throw Error('Pagination cursor stalled for '+table);
  items.push(...batch);
  if(batch.length<pageSize)return items;
  const next=batch.at(-1)?.id;
  if(!next||next===cursor)throw Error('Pagination loop for '+table);
  cursor=next;
 }
 throw Error('Pagination limit hit for '+table);
}
function offerRow(o,m) {
 const area=asNum(o.plot_area_sqft??o.carpet_area_sqft);
 const endArea=asNum(o.plot_area_max_sqft??o.carpet_area_max_sqft);
 const areaText=Number.isFinite(area)&&area>0 ? fmt(area)+(Number.isFinite(endArea)&&endArea>area?'–'+fmt(endArea):'')+' sq.ft' : 'Area on request';
 return '<tr><td>'+esc(o.configuration||'Configuration on request')+'</td><td>'+esc(areaText)+'</td><td>'+esc(price(o.price,m))+'</td><td>Developer confirmation required</td></tr>';
}
function safeImages(p,media){
 const seen=new Set(),out=[];
 for(const raw of [p.hero_image_url,...media.filter(x=>x.media_type==='hero'||x.media_type==='gallery').map(x=>x.image_url)]){
  const src=url(raw);
  if(!src||seen.has(src))continue;
  seen.add(src);
  out.push(src);
  if(out.length>=8)break;
 }
 return out;
}
function card(p) {
 const photo=url(p.hero_image_url);
 return '<article class="property-card"><a class="photo" href="'+esc(officialRoute(p.slug))+'">'+(photo?'<img src="'+esc(photo)+'" loading="lazy" decoding="async" alt="'+esc(p.name)+'" onerror="this.replaceWith(Object.assign(document.createElement(\'span\'),{className:\'no-photo\',textContent:\'Project photograph unavailable\'}))">':'<span class="no-photo">WAY2PAISA SELECT</span>')+'</a><div class="card-copy"><small>'+esc((p.location_name||p.market)+' · '+(p.developer_name||'Developer'))+'</small><h3><a href="'+esc(officialRoute(p.slug))+'">'+esc(p.name)+'</a></h3><p>'+esc(p.configuration_summary||p.bhk_original||p.category||'Property')+'</p><strong>'+esc(price(p.min_price,p.market))+'+</strong></div></article>';
}
function leadForm(projectId='',projectName='General advisory enquiry'){
 return '<form class="lead-form" data-lead-form><input type="hidden" name="projectId" value="'+esc(projectId)+'"><input type="hidden" name="projectName" value="'+esc(projectName)+'"><label>Your name<input name="name" required maxlength="120" autocomplete="name"></label><label>Mobile / WhatsApp number<input name="phone" required inputmode="tel" maxlength="40" autocomplete="tel"></label><label>Email (optional)<input name="email" type="email" maxlength="160" autocomplete="email"></label><label>Requirements<textarea name="preferred_locations" maxlength="300" rows="2" placeholder="Preferred location, BHK, budget or query"></textarea></label><label class="honeypot" aria-hidden="true">Leave blank<input name="website" tabindex="-1" autocomplete="off"></label><label class="consent"><input name="whatsapp_updates" type="checkbox"> I consent to WhatsApp follow-up about my enquiry</label><button type="submit">Request a Call Back</button><p class="form-status" role="status" aria-live="polite">We use your details only to respond to your enquiry.</p></form>';
}
function projectHtml(p,units,media){
 const details=p.description||'Discover this premium development through Way2Paisa.';
 const description=p.seo_description||details.slice(0,165);
 const title=p.seo_title||p.name+' | Way2Paisa';
 const pictures=safeImages(p,media);
 const gallery=pictures.length?'<div class="gallery">'+pictures.map((src,i)=>'<figure><img src="'+esc(src)+'" loading="'+(i?'lazy':'eager')+'" alt="'+esc(p.name+' project image '+(i+1))+'" onerror="this.closest(\'figure\').remove()"></figure>').join('')+'</div>':'<div class="fallback-panel">A verified project photo gallery is not currently available.</div>';
 const fact=[['Location',p.location_name||p.address||p.market],['Developer',p.developer_name||'On request'],['Configuration',units.map(x=>x.configuration).filter(Boolean).filter((x,i,a)=>a.indexOf(x)===i).join(' | ')||p.bhk_original||'On request'],['MahaRERA / DLD',p.rera_number||'Verify with developer'],['Status',p.status||'Confirm with developer'],['Carpet area',p.min_carpet_sqft?(fmt(Number(p.min_carpet_sqft))+(p.max_carpet_sqft?'–'+fmt(Number(p.max_carpet_sqft)):'')+' sq.ft'):'See available configurations']];
 const offerings=units.length?'<div class="table-scroll"><table><thead><tr><th>Configuration</th><th>Carpet / land area</th><th>Starting Price</th><th>Availability</th></tr></thead><tbody>'+units.slice().sort((a,b)=>Number(a.price)-Number(b.price)).map(x=>offerRow(x,p.market)).join('')+'</tbody></table></div>':'<p>Contact our advisory team for current configurations and verified developer quotations.</p>';
 const canonical=HOST+'/projects/'+p.slug;
 const schema={'@context':'https://schema.org','@type':'Residence',name:p.name,description,url:canonical,address:{'@type':'PostalAddress',streetAddress:p.address||'',addressLocality:p.location_name||'',addressCountry:(p.market||'').toLowerCase()==='dubai'?'AE':'IN'},offers:{'@type':'Offer',priceCurrency:(p.market||'').toLowerCase()==='dubai'?'AED':'INR',availability:'https://schema.org/InStock',url:canonical}};
 // India's prices are stored in crores; don't claim a numeric schema Offer price before
 // converting from crores, and don't claim exact unit availability.
 delete schema.offers;
 return pageHead(title,description,'/projects/'+p.slug,'<script type="application/ld+json">'+scriptJSON(schema)+'</script>')+nav+
 '<main><section class="project-top"><div><p class="eyebrow">'+esc(p.market)+' · '+esc(p.category||'Residential')+'</p><h1>'+esc(p.name)+'</h1><p>'+esc(p.location_name||p.address||'Location on request')+'</p><p class="headline-price">Starting '+esc(price(p.min_price,p.market))+'+</p><a class="nav-cta" href="#enquiry">Enquire About This Project</a></div></section><section class="section media-section">'+gallery+'</section>'+
 '<section class="section split"><div><h2>Project overview</h2><p>'+esc(details)+'</p><h2>Highlights</h2><div class="fact-grid">'+fact.map(([a,b])=>'<div><small>'+esc(a)+'</small><strong>'+esc(b)+'</strong></div>').join('')+'</div></div><aside id="enquiry"><h2>Speak to an Advisor</h2>'+leadForm(p.id,p.name)+'</aside></section>'+
 '<section class="section"><h2>Configurations &amp; starting offers</h2>'+offerings+'<p class="disclosure">Prices and availability are indicative and must be reconfirmed from the developer. Carpet area is displayed only when sourced. For Dubai, areas may follow developer measurement standards rather than Indian RERA.</p></section>'+
 (p.amenities?.length?'<section class="section"><h2>Project amenities</h2><p>'+p.amenities.map(x=>'<span class="tag">'+esc(x)+'</span>').join('')+'</p></section>':'')+
 '<section class="section"><h2>Location and registration</h2><p>'+esc(p.address||p.location_name||p.market)+'</p>'+(url(p.google_maps_url)?'<p><a href="'+esc(url(p.google_maps_url))+'" rel="noopener" target="_blank">View location on map</a></p>':'')+
 '<p>Always verify this registration and the exact apartment, approved plans, possession schedule, title and payment terms before committing.</p></section></main>'+foot;
}
function directoryHtml(projects){
 return pageHead('New & Upcoming Projects in Mumbai, MMR & Dubai | Way2Paisa','Explore verified residential, commercial, villas and plots in Mumbai, MMR and Dubai. Compare developer-advertised prices and configurations.','/properties')+nav+
 '<main><section class="hero compact"><p class="eyebrow">WAY2PAISA PROPERTY DISCOVERY</p><h1>Find the right property.</h1><p>Browse '+fmt(projects.length)+' published projects in Mumbai, MMR and Dubai.</p></section><section class="section"><div class="filters"><label>Market<select id="market"><option value="Mumbai">Mumbai &amp; MMR</option><option value="Dubai">Dubai</option></select></label><label>Search<input id="search" placeholder="Project, developer, location"></label><label>Property type<select id="category"><option value="">All categories</option><option value="apartment">Residential apartments</option><option value="villa">Villas</option><option value="plot">Plots</option><option value="commercial_office">Commercial offices</option><option value="retail">Retail</option></select></label><label>Configuration<input id="configuration" placeholder="e.g. 2 BHK, 3 BR"></label><label>Budget (maximum)<input id="maxBudget" type="number" min="0" step="0.1" placeholder="₹ Cr or AED"></label></div><p id="result-count" role="status"></p><div id="results" class="cards"></div><button id="more" type="button" class="load-more">Show More Projects</button><noscript>JavaScript is required for catalogue filters. The full index is available in the <a href="/sitemap.xml">XML sitemap</a>.</noscript></section></main>'+foot;
}
const guideContent=highIntentPages;
function guideHtml(key,meta,projects,pathname){
 const target=meta.market==='Dubai'?'Dubai':meta.market==='MMR'?'MMR':'Mumbai';
 const eligible=projects.filter(p=>(target==='Dubai'?p.market==='Dubai':target==='MMR'?p.market==='MMR':p.market!=='Dubai')&&(!meta.categories?.length||meta.categories.includes(p.category)));
 const preferred=Array.isArray(meta.slugs)?meta.slugs.map(slug=>eligible.find(p=>p.slug===slug)).filter(Boolean):[];
 const selected=preferred.length?preferred:eligible.slice(0,30);
 const intro=Array.isArray(meta.introduction)?meta.introduction:meta.intro?[meta.intro]:[];
 const h2=Array.isArray(meta.sections)?meta.sections.map(section=>'<section class="guide-section"><h2>'+esc(section.title)+'</h2>'+((section.paragraphs||[]).map(p=>'<p>'+esc(p)+'</p>').join(''))+'</section>').join(''):'';
 const faqs=Array.isArray(meta.faqs)&&meta.faqs.length?'<section class="section"><h2>Frequently asked questions</h2>'+meta.faqs.map(([q,a])=>'<details><summary>'+esc(q)+'</summary><p>'+esc(a)+'</p></details>').join('')+'</section>':'';
 return pageHead(meta.seoTitle||meta.metaTitle||meta.title+' | Way2Paisa',meta.seoDescription||meta.description||meta.subtitle||'',pathname)+nav+
 '<main><section class="hero compact"><p class="eyebrow">'+esc(meta.eyebrow||'WAY2PAISA SPECIALIST ADVISORY')+'</p><h1>'+esc(meta.title)+'</h1><p>'+esc(meta.subtitle||meta.description||'')+'</p><a href="'+esc(meta.catalogueLink||meta.browseHref||'/properties/')+'" class="nav-cta">'+esc(meta.browseLabel||'Browse all published projects')+'</a></section>'+
 '<section class="section guide-article">'+intro.map(p=>'<p>'+esc(p)+'</p>').join('')+h2+(meta.guidance?'<p>'+esc(meta.guidance)+'</p>':'')+'</section>'+
 '<section class="section"><h2>'+esc(meta.cardHeading||'Explore current developer offers')+'</h2><p>'+esc(meta.cardIntro||meta.criteria||'')+'</p><div class="cards">'+selected.map(card).join('')+'</div></section>'+
 faqs+'<section class="section"><h2>Speak to an Advisor</h2>'+leadForm('',meta.leadName||meta.title)+'</section></main>'+foot;
}
function financeHtml(){
 return pageHead('Property Finance & Loans | Way2Paisa','Home loans, loan against property and finance advisory by Way2Paisa, Mumbai.','/finance')+nav+'<main><section class="hero compact"><h1>Finance your next move.</h1><p>Home Loans · Loan Against Property · Commercial Funding · Business Finance</p></section><section class="section split"><div><h2>Finance solutions</h2><p>Independent facilitation with leading banks and NBFCs. Eligibility, interest rates, documentation and approvals are lender-dependent. No guaranteed sanction.</p><ul><li>Home Loans for new purchases and under-construction projects</li><li>Loan Against Property for residential and commercial assets</li><li>Commercial purchase finance and developer-side financing coordination</li><li>Refinancing and balance-transfer guidance</li></ul></div><aside><h2>Request a Finance Consultation</h2>'+leadForm('','Finance enquiry')+'</aside></section></main>'+foot;
}
function legalHtml(content){
 const entries=content.sections||[];
 return pageHead(content.title,content.description,'/legal')+nav+'<main><section class="hero compact"><h1>Legal, compliance &amp; privacy</h1><p>Clear information about how we present property and finance opportunities, and how we handle your details.</p></section><article class="section legal-body">'+entries.map(([title,paragraphs])=>'<section><h2>'+esc(title)+'</h2>'+(paragraphs||[]).map(text=>'<p>'+esc(text)+'</p>').join('')+'</section>').join('')+'<p class="disclosure">Last updated: '+esc(content.updated||'')+'</p></article></main>'+foot;
}

async function buildAdminBundle(){
 // Client-side authenticated CRM uses existing Supabase RLS; no privileged key.
 // Every production build must receive a public Supabase publishable key.
 const publicURL=process.env.NEXT_PUBLIC_SUPABASE_URL||process.env.SUPABASE_URL||(SNAPSHOT?'https://fixture.invalid':'');
 const publicKey=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY||process.env.SUPABASE_PUBLISHABLE_KEY||(SNAPSHOT?'fixture-publishable-key':'');
 if(!publicURL||!publicKey)throw Error('Missing public Supabase config for admin build');
 const common={bundle:true,platform:'browser',format:'iife',minify:true,target:'es2020',jsx:'automatic',
  loader:{'.js':'jsx'},logLevel:'warning',
  define:{
   'process.env.NEXT_PUBLIC_SUPABASE_URL':JSON.stringify(publicURL),
   'process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY':JSON.stringify(publicKey),
   'process.env.NEXT_PUBLIC_WHATSAPP_NUMBER':JSON.stringify('918850373012')
  }};
 await Promise.all([
  esbuild({...common,entryPoints:[join(ROOT,'admin-entry.jsx')],outfile:join(OUTPUT,'assets/admin.js')}),
  esbuild({...common,entryPoints:[join(ROOT,'promotions-entry.jsx')],outfile:join(OUTPUT,'assets/admin-promotions.js')})
 ]);
 const adminHead='<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><link rel="icon" href="/way2paisa-mark.jpg"><title>Way2Paisa Admin Operations</title></head><body style="margin:0">';
 await write('admin/index.html',adminHead+'<div id="admin-root"></div><script src="/assets/admin.js" defer></script></body></html>');
 await write('admin/promotions/index.html',adminHead.replace('Way2Paisa Admin Operations','Way2Paisa Promotion Studio')+
 '<p style="background:#fff3d0;padding:12px;font:14px Arial,sans-serif;color:#663300">Migration preview only: protected social publishing endpoints have not been migrated. Do not publish live promotions from this preview.</p>'+
 '<div id="admin-root"></div><script src="/assets/admin-promotions.js" defer></script></body></html>');
}

async function main(){
 let projects,inventory,media,developers,locations;
 if(SNAPSHOT){
  ({projects,inventory,media,developers,locations}=JSON.parse(await readFile(join(ROOT,'fixture.json'),'utf8')));
 }else{
  const base=process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;
  if(!base||!key)throw Error('Missing publishable Supabase build variables — aborting without partial output.');
  [projects,inventory,media,developers,locations]=await Promise.all([
   paged('projects','id,name,slug,address,description,rera_number,possession_date,status,min_price,max_price,min_carpet_sqft,max_carpet_sqft,hero_image_url,market,bhk_original,seo_title,seo_description,amenities,google_maps_url,category,developer_id,location_id,updated_at,featured', {active:'eq.true',verified:'eq.true',enrichment_status:'eq.complete'},base,key),
   paged('inventory','id,project_id,configuration,carpet_area_sqft,carpet_area_max_sqft,plot_area_sqft,plot_area_max_sqft,price,price_max,updated_at', {active:'eq.true'},base,key),
   paged('project_media','id,project_id,image_url,alt_text,media_type,verified_at,license_status,sort_order', {active:'eq.true',verified_at:'not.is.null'},base,key),
   paged('developers','id,name,logo_url', {active:'eq.true'},base,key),
   paged('locations','id,name,zone', {active:'eq.true'},base,key)
  ]);
 }
 if(!Array.isArray(projects)||!Array.isArray(inventory)||!Array.isArray(media))throw Error('Invalid source response');
 const threshold=SNAPSHOT?1:MIN_COUNT;
 if(projects.length<threshold)throw Error('Safety abort: published project count '+projects.length+' below minimum '+threshold);
 if(projects.length>19000)throw Error('Cloudflare Pages free static asset limit risk; audit before building');
 const slugs=new Set(),ids=new Set();
 for(const p of projects){if(!slugOk(p.slug)||slugs.has(p.slug)||ids.has(p.id))throw Error('Missing/duplicate/invalid project slug or id: '+p.slug);slugs.add(p.slug);ids.add(p.id);}
 const dev=new Map(developers.map(x=>[x.id,x.name]));
 const loc=new Map(locations.map(x=>[x.id,x.name]));
 const byInv=new Map(),byMedia=new Map();
 for(const row of inventory){if(!ids.has(row.project_id))continue;if(!byInv.has(row.project_id))byInv.set(row.project_id,[]);byInv.get(row.project_id).push(row);}
 for(const row of media){if(!ids.has(row.project_id))continue;if(!byMedia.has(row.project_id))byMedia.set(row.project_id,[]);byMedia.get(row.project_id).push(row);}
 projects=projects.map(p=>({...p,developer_name:dev.get(p.developer_id)||'',location_name:loc.get(p.location_id)||'',configuration_summary:[...new Set((byInv.get(p.id)||[]).map(x=>x.configuration).filter(Boolean))].join(' | ')}));
 await rm(OUTPUT,{recursive:true,force:true});
 await mkdir(OUTPUT,{recursive:true});
 const assets=resolve(ROOT,'../../public');
 await cp(assets,OUTPUT,{recursive:true});
 await mkdir(join(OUTPUT,'assets'),{recursive:true});
 await cp(join(ROOT,'assets/site.css'),join(OUTPUT,'assets/site.css'));
 await cp(join(ROOT,'assets/site.js'),join(OUTPUT,'assets/site.js'));
 await buildAdminBundle();
 await write('index.html',pageHead('Way2Paisa FinPro Services | Premium Real Estate & Finance Advisory','Premium new launches, residential, commercial, villas and plots across Mumbai, MMR and Dubai.','/')+nav+'<main><section class="hero"><p class="eyebrow">Mumbai · MMR · Dubai</p><h1>Find your next address.<br>Invest with confidence.</h1><p>Premium developer projects and independent real estate and finance advisory.</p><p><a class="nav-cta" href="/properties/">Explore Published Projects</a></p></section><section class="section"><h2>Featured opportunities</h2><div class="cards">'+projects.filter(p=>p.featured).concat(projects.filter(p=>!p.featured)).slice(0,12).map(card).join('')+'</div><p><a href="/properties/">Browse all '+fmt(projects.length)+' published projects</a></p></section><section class="section split"><div><h2>Mumbai, MMR &amp; Dubai</h2><p>Discover new launches, under-construction residences, villas, plots, commercial offices and investment opportunities sourced from published project records.</p><p>Every transaction is subject to developer confirmation and regulatory checks.</p></div><aside id="enquire"><h2>Enquire Now</h2>'+leadForm()+'</aside></section></main>'+foot);
 await write('properties/index.html',directoryHtml(projects));
 await write('finance/index.html',financeHtml());
 await write('legal/index.html',legalHtml(JSON.parse(await readFile(join(ROOT,'legal-content.json'),'utf8'))));
 for(const p of projects)await write('projects/'+p.slug+'/index.html',projectHtml(p,byInv.get(p.id)||[],byMedia.get(p.id)||[]));
 for(const [key,meta] of Object.entries(guideContent))await write('solutions/'+key+'/index.html',guideHtml(key,meta,projects,'/solutions/'+key));
 for(const [key,meta] of Object.entries(intentLandingPages))await write('explore/'+key+'/index.html',guideHtml(key,meta,projects,'/explore/'+key));
 // Current production includes an intent landing page only where configured.
 // A source-backed dedicated migration file will be supplied after parity check.
 const publicJSON=projects.map(p=>({name:p.name,slug:p.slug,market:p.market,category:p.category,location:p.location_name,developer:p.developer_name,configuration:p.configuration_summary||p.bhk_original||'',min_price:p.min_price,featured:p.featured,hero_image_url:url(p.hero_image_url)}));
 await write('assets/catalogue.json',JSON.stringify(publicJSON));
 const pages=['/','/properties','/finance','/legal',...Object.keys(guideContent).map(x=>'/solutions/'+x),...Object.keys(intentLandingPages).map(x=>'/explore/'+x),...projects.map(x=>'/projects/'+x.slug)];
 const siteMap='<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+pages.map(path=>'<url><loc>'+xml(HOST+path)+'</loc></url>').join('')+'</urlset>';
 await write('sitemap.xml',siteMap);
 await write('robots.txt','User-agent: *\nDisallow: /admin\nDisallow: /api/\nAllow: /\nSitemap: '+HOST+'/sitemap.xml\n');
 await write('404.html',pageHead('Page Not Found | Way2Paisa','This page is not available.','/404')+nav+'<main class="section"><h1>Page not found</h1><p>Explore <a href="/properties/">published property listings</a>.</p></main>'+foot);
 // Cloudflare Pages transparent redirects for canonical no-trailing-slash routes.
 await write('_redirects','/favicon.ico /way2paisa-mark.jpg 301\n');
 // Security headers for static assets, not Functions.
 await write('_headers','/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Frame-Options: SAMEORIGIN\n');
 console.log(JSON.stringify({ok:true,projects:projects.length,activeInventory:inventory.filter(i=>ids.has(i.project_id)).length,media:media.filter(i=>ids.has(i.project_id)).length,staticUrls:pages.length,files:projects.length+12,mode:SNAPSHOT?'fixture':'production',output:OUTPUT}));
}
main().catch(error=>{console.error('CLOUDFLARE MIGRATION BUILD ABORTED:',error.message);process.exitCode=1;});
