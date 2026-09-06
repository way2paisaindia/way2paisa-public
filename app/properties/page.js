'use client';

import { useEffect, useMemo, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '918850373012';
const categories = [
  ['apartment', 'Apartments'],
  ['villa', 'Villas & Row Houses'],
  ['plot', 'Plots'],
  ['land', 'Land'],
  ['commercial_office', 'Commercial Offices'],
  ['retail', 'Retail & Shops'],
];

export default function PropertiesPage() {
  const [projects, setProjects] = useState([]);
  const [locations, setLocations] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [q, setQ] = useState('');
  const [location, setLocation] = useState('');
  const [developer, setDeveloper] = useState('');
  const [configuration, setConfiguration] = useState('');
  const [budget, setBudget] = useState('');
  const [status, setStatus] = useState('');
  const [market, setMarket] = useState('');
  const [category, setCategory] = useState('apartment');
  const [sort, setSort] = useState('featured');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQ(params.get('q') || '');
    setLocation(params.get('location') || '');
    setDeveloper(params.get('developer') || '');
    setConfiguration(params.get('bhk') || params.get('configuration') || '');
    setBudget(params.get('budget') || '');
    setMarket(params.get('market') || '');
    setCategory(params.get('category') || 'apartment');
  }, []);

  useEffect(() => {
    (async () => {
      const [{ data: p, error: pe }, { data: l }, { data: d }] = await Promise.all([
        supabase.from('projects').select('id,name,slug,status,min_price,max_price,featured,verified,hero_image_url,market,category,bhk_original,carpet_area_original,price_original,developer_id,location_id,developers(name),locations(name,zone)').eq('active', true).eq('verified', true).limit(500),
        supabase.from('locations').select('id,name,zone').eq('active', true).order('name'),
        supabase.from('developers').select('id,name').eq('active', true).order('name'),
      ]);
      if (pe) setError(pe.message);
      setProjects(p || []);
      setLocations(l || []);
      setDevelopers(d || []);
      setLoading(false);
    })();
  }, []);

  const unitLabel = category === 'commercial_office' ? 'Office type' : category === 'retail' ? 'Retail type' : category === 'plot' || category === 'land' ? 'Plot type' : category === 'villa' ? 'Home type' : 'Configuration';
  const unitOptions = category === 'commercial_office' ? ['Office Space', 'Commercial Office'] : category === 'retail' ? ['Retail Shop', 'Shop'] : category === 'villa' ? ['3 BHK', '4 BHK', '5 BHK', '5 BHK+'] : category === 'plot' || category === 'land' ? ['Residential Plot', 'NA Plot', 'Land Parcel'] : ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK', '5 BHK+'];

  const filtered = useMemo(() => {
    let list = projects.filter((p) => {
      const text = [p.name, p.market, p.bhk_original, p.category, p.developers?.name, p.locations?.name].filter(Boolean).join(' ').toLowerCase();
      const marketOk = !market || (market.toLowerCase() === 'dubai' ? String(p.market || '').toLowerCase().includes('dubai') : String(p.market || '').toLowerCase().includes(market.toLowerCase()));
      const budgetOk = !budget || !p.min_price || (budget === 'above' ? Number(p.min_price) > 10 : Number(p.min_price) <= Number(budget));
      return marketOk && (!category || p.category === category) && (!q || text.includes(q.toLowerCase())) && (!location || p.location_id === location) && (!developer || p.developer_id === developer) && (!configuration || (p.bhk_original || '').toLowerCase().includes(configuration.toLowerCase())) && budgetOk && (!status || p.status === status);
    });
    if (sort === 'priceAsc') list.sort((a, b) => (Number(a.min_price) || 999) - (Number(b.min_price) || 999));
    else if (sort === 'priceDesc') list.sort((a, b) => (Number(b.min_price) || 0) - (Number(a.min_price) || 0));
    else if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
    else list.sort((a, b) => (Number(b.featured) - Number(a.featured)) || (Number(b.verified) - Number(a.verified)));
    return list;
  }, [projects, q, location, developer, configuration, budget, status, market, category, sort]);

  const statuses = [...new Set(projects.map((p) => p.status).filter(Boolean))].sort();
  const clear = () => { setQ(''); setLocation(''); setDeveloper(''); setConfiguration(''); setBudget(''); setStatus(''); setMarket(''); setCategory('apartment'); };

  return <main><Header />
    <section className="listingHero"><div><span className="kicker light">WAY2PAISA PROPERTY DISCOVERY</span><h1>Find the right property,<br /><em>without the noise.</em></h1><p>Curated apartments, villas, plots and commercial opportunities with Way2Paisa advisory.</p><div className="marketLinks"><a href="/properties?category=apartment">Apartments</a><a href="/properties?category=commercial_office">Commercial</a><a href="/properties?market=Dubai">Dubai Properties</a></div></div></section>
    <section className="listingShell"><aside className="filters"><div className="filterHead"><strong>Refine Search</strong><button onClick={clear}>Clear all</button></div>
      <label>Property category<select value={category} onChange={(e) => { setCategory(e.target.value); setConfiguration(''); }}><option value="">All categories</option>{categories.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
      <label>Market<select value={market} onChange={(e) => setMarket(e.target.value)}><option value="">All markets</option><option value="Mumbai">Mumbai & MMR</option><option value="Dubai">Dubai</option></select></label>
      <label>Search<input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Project, developer, location" /></label>
      <label>Location<select value={location} onChange={(e) => setLocation(e.target.value)}><option value="">All locations</option>{locations.map((x) => <option value={x.id} key={x.id}>{x.name}</option>)}</select></label>
      <label>Developer<select value={developer} onChange={(e) => setDeveloper(e.target.value)}><option value="">All developers</option>{developers.map((x) => <option value={x.id} key={x.id}>{x.name}</option>)}</select></label>
      <label>{unitLabel}<select value={configuration} onChange={(e) => setConfiguration(e.target.value)}><option value="">Any {unitLabel.toLowerCase()}</option>{unitOptions.map((x) => <option key={x}>{x}</option>)}</select></label>
      <label>Maximum Budget<select value={budget} onChange={(e) => setBudget(e.target.value)}><option value="">Any budget</option><option value="2">Up to ₹2 Cr</option><option value="3">Up to ₹3 Cr</option><option value="5">Up to ₹5 Cr</option><option value="10">Up to ₹10 Cr</option><option value="20">Up to ₹20 Cr</option><option value="above">Above ₹10 Cr</option></select></label>
      <label>Status<select value={status} onChange={(e) => setStatus(e.target.value)}><option value="">Any status</option>{statuses.map((x) => <option key={x}>{x}</option>)}</select></label>
    </aside><div className="listingResults"><div className="resultsBar"><div><strong>{filtered.length}</strong> projects found</div><select value={sort} onChange={(e) => setSort(e.target.value)}><option value="featured">Recommended</option><option value="priceAsc">Price: Low to High</option><option value="priceDesc">Price: High to Low</option><option value="name">Project Name</option></select></div>{loading ? <div className="loading">Loading live projects…</div> : error ? <div className="error">{error}</div> : <div className="grid listingGrid">{filtered.map((p) => <Card p={p} key={p.id} />)}</div>}{!loading && !filtered.length && <div className="empty">No fully enriched projects are published in this category yet. Our team can still help with current opportunities.</div>}</div></section><Footer />
  </main>;
}

function Header() { return <header className="nav"><a className="logoLink logoLockup" href="/"><img src="/way2paisa-logo.png" alt="Way2Paisa FinPro Services" /><span className="logoTagline">Finance | Real Estate</span></a><nav><a href="/properties?category=apartment">Residential</a><a href="/properties?category=commercial_office">Commercial</a><a href="/properties?market=Dubai">Dubai Properties</a><a href="/#advisory">Advisory</a><a className="navCta" href="/#enquire">Speak to an Advisor</a></nav></header>; }
function Card({ p }) { const msg = `Hi Way2Paisa, I am interested in ${p.name}. Please share details.`; return <article className="card"><a className="imageWrap" href={`/projects/${p.slug}`}>{p.hero_image_url ? <img src={p.hero_image_url} alt={p.name} /> : <div className="imageFallback"><div className="brandOrb">↗</div><span>WAY2PAISA SELECT</span><b>{p.locations?.name || p.market || 'MUMBAI'}</b></div>}{(p.featured || p.verified) && <span className="badge">{p.featured ? 'Featured' : 'Verified'}</span>}</a><div className="cardBody"><div className="muted">{p.developers?.name || 'Leading Developer'} · {p.locations?.name || p.market || 'Mumbai'}</div><h3><a href={`/projects/${p.slug}`}>{p.name}</a></h3><div className="facts">{p.bhk_original && <span>{p.bhk_original}</span>}{p.carpet_area_original && <span>{p.carpet_area_original} sq.ft.</span>}</div><div className="priceLine"><span>Starting</span><strong>{p.price_original || 'Price on request'}</strong></div><div className="actions"><a className="detailsBtn" href={`/projects/${p.slug}`}>View Project</a><a className="waBtn" href={`https://wa.me/${wa}?text=${encodeURIComponent(msg)}`} target="_blank">WhatsApp</a></div></div></article>; }
function Footer() { return <footer><div className="footerBrand"><img src="/way2paisa-logo.png" alt="Way2Paisa FinPro Services" /><div className="logoTagline">Finance | Real Estate</div><p>Preferred Channel Partner for leading Developers, Banks & NBFC's.</p><div className="socialLinks"><a href="https://www.instagram.com/way2paisa_/" target="_blank" aria-label="Instagram">IG</a><a href="https://www.facebook.com/share/18Won2YfMQ/" target="_blank" aria-label="Facebook">f</a><a href="https://www.linkedin.com/company/way2paisa-finpro-services/" target="_blank" aria-label="LinkedIn">in</a><a href="https://share.google/3snbZFb4aCvHWjYzE" target="_blank" aria-label="Google Business">G</a><a href="https://x.com/way2paisa_" target="_blank" aria-label="X">X</a><a href={`https://wa.me/${wa}`} target="_blank" aria-label="WhatsApp">WA</a></div></div><div className="footerLinks"><a href="/properties?category=apartment">Residential</a><a href="/properties?category=commercial_office">Commercial</a><a href="/properties?market=Dubai">Dubai Properties</a><a href="/legal">Legal, Compliance & Privacy</a><a href="/#enquire">Contact</a></div><div className="footerContact"><a href={`https://wa.me/${wa}`} target="_blank">+91 88503 73012</a><a href="mailto:way2paisaindia@gmail.com">way2paisaindia@gmail.com</a></div><div className="footerBottom">© {new Date().getFullYear()} Way2Paisa FinPro Services. All rights reserved.</div></footer>; }
