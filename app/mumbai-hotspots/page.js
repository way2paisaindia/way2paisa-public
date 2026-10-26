import styles from './page.module.css';

export const revalidate = 3600;
export const metadata = {
  title: 'Mumbai Property Hotspots | Residential & Commercial Projects | Way2Paisa',
  description: 'Explore published residential and commercial projects across Bandra, Khar, Santacruz, Andheri, Goregaon, Worli, Dadar, Powai, South Mumbai and more. Compare neighbourhoods and enquire with Way2Paisa.',
  keywords: ['Mumbai residential projects','Mumbai commercial office projects','Bandra new projects','Andheri real estate','Worli luxury apartments','Mumbai property hotspots'],
  alternates: { canonical: '/mumbai-hotspots' },
  openGraph: { title: 'Mumbai Property Hotspots | Way2Paisa', description: 'Explore verified published homes and offices in Mumbai’s high-demand neighbourhoods.', url: 'https://www.way2paisa.in/mumbai-hotspots' },
};

const groups = [
  { title: 'Western suburbs & coastal addresses', detail: 'Established residential neighbourhoods and business corridors, from Bandra to Borivali.', areas: ['Bandra','Khar','Santacruz','Vile Parle','Juhu','Juhu Tara Road','Versova','Andheri','Oshiwara Link Road','Jogeshwari','Goregaon','Malad','Kandivali','Borivali'] },
  { title: 'Central Mumbai & employment hubs', detail: 'Well-connected residential and commercial catchments spanning the central corridor.', areas: ['Sion','Matunga','Dadar','Wadala','Parel','Sewri','Prabhadevi','Lower Parel'] },
  { title: 'South Mumbai & luxury waterfront', detail: 'Premium coastal residences, heritage localities and South Mumbai commercial addresses.', areas: ['Worli','Mahalaxmi','Tardeo','Byculla','Nariman Point','Nepean Sea Road','Cuffe Parade','Malabar Hill','Marine Lines','Churchgate','Colaba'] },
  { title: 'Eastern suburbs & growth corridors', detail: 'Residential options around established business districts and cross-city connections.', areas: ['Ghatkopar','Powai'] },
];

function searchUrl(area,category) {
  const params = new URLSearchParams({market:'Mumbai',q:area});
  if (category) params.set('category',category);
  return '/properties?' + params.toString();
}

async function publishedMumbaiProjects(){
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if(!base||!key) return null;
  try {
    const url = new URL(base + '/rest/v1/projects');
    url.searchParams.set('select','id,category,address,locations(name)');
    url.searchParams.set('active','eq.true');
    url.searchParams.set('verified','eq.true');
    url.searchParams.set('market','eq.Mumbai');
    url.searchParams.set('limit','1000');
    const response = await fetch(url,{headers:{apikey:key,Authorization:'Bearer '+key},next:{revalidate:3600}});
    if(!response.ok) return null;
    const rows = await response.json();
    return Array.isArray(rows)?rows:null;
  } catch {return null;}
}

export default async function MumbaiHotspotsPage(){
  const projects = await publishedMumbaiProjects();
  const totals = (area)=>{
    if (!projects) return null;
    const needle=area.toLocaleLowerCase('en-IN');
    const matching=projects.filter(project => [project.locations?.name,project.address].filter(Boolean).join(' ').toLocaleLowerCase('en-IN').includes(needle));
    return {total:matching.length,homes:matching.filter(p=>p.category==='apartment'||p.category==='villa').length,offices:matching.filter(p=>p.category==='commercial_office'||p.category==='retail').length};
  };
  return <main className={styles.page}>
    <header className={styles.nav}><a href="/" className={styles.brand}><img src="/way2paisa-logo.png" alt="Way2Paisa FinPro Services"/><span>Way2Paisa</span></a><nav><a href="/">Home</a><a href="/properties?market=Mumbai">All Mumbai projects</a><a href="/properties?market=Dubai">Dubai</a></nav></header>
    <section className={styles.hero}>
      <p className={styles.eyebrow}>WAY2PAISA | MUMBAI PROPERTY DISCOVERY</p>
      <h1>Where Mumbai is buying <em>and investing.</em></h1>
      <p className={styles.lead}>Explore residential developments and commercial offices across Mumbai’s most sought-after neighbourhoods. Every result opens our currently published property catalogue—not unverified upcoming inventory.</p>
      <div className={styles.heroLinks}><a className={styles.primary} href="/properties?market=Mumbai&category=apartment">Explore residential</a><a className={styles.secondary} href="/properties?market=Mumbai&category=commercial_office">Explore commercial offices</a><a className={styles.secondary} href="/properties?market=Dubai">Explore Dubai</a></div>
    </section>
    <div className={styles.content}>
      <div className={styles.intro}><h2>Explore by neighbourhood</h2><p>Choose an area to see the active published matches. Where no matching project is currently published, you can still search the locality while new projects undergo verification.</p></div>
      {groups.map(group=><section className={styles.group} key={group.title} aria-label={group.title}><div className={styles.groupTitle}><h2>{group.title}</h2><p>{group.detail}</p></div><div className={styles.grid}>{group.areas.map(area=>{const counts=totals(area);return <article className={styles.area} key={area}><div><h3>{area}</h3><p className={styles.count}>{counts===null?'Browse available listings':counts.total===0?'No published matching project yet':counts.total+' published project'+(counts.total===1?'':'s')}</p></div><div className={styles.areaLinks}><a href={searchUrl(area)}>View all <span aria-hidden="true">↗</span></a>{(counts===null||counts.homes>0)&&<a href={searchUrl(area,'apartment')}>Homes</a>}{(counts===null||counts.offices>0)&&<a href={searchUrl(area,'commercial_office')}>Offices</a>}</div></article>})}</div></section>)}
      <section className={styles.advisory}><div><p className={styles.eyebrow}>PROPERTY ADVISORY</p><h2>Shortlist the right address, not just the right price.</h2><p>Project registration, apartment or office configuration, carpet area, price and stock must be reconfirmed with the respective developer or seller before any reservation. We can assist with shortlisting and due diligence.</p></div><a href="/#enquire">Speak to a Way2Paisa advisor</a></section>
      <footer className={styles.footer}><span>© Way2Paisa FinPro Services</span><a href="/">Home</a><a href="/legal">Legal information</a><a href="/properties?market=Dubai">Dubai properties</a></footer>
    </div>
  </main>;
}
