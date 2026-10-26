export const hotspotGroups = [
  {title:'Western suburbs & coastal addresses',detail:'Established residential neighbourhoods and business corridors, from Bandra to Borivali.',areas:['Bandra','Khar','Santacruz','Vile Parle','Juhu','Juhu Tara Road','Versova','Andheri','Oshiwara Link Road','Jogeshwari','Goregaon','Malad','Kandivali','Borivali']},
  {title:'Central Mumbai & employment hubs',detail:'Well-connected residential and commercial catchments spanning the central corridor.',areas:['Sion','Matunga','Dadar','Wadala','Parel','Sewri','Prabhadevi','Lower Parel']},
  {title:'South Mumbai & luxury waterfront',detail:'Premium coastal residences, heritage localities and South Mumbai commercial addresses.',areas:['Worli','Mahalaxmi','Tardeo','Byculla','Nariman Point','Nepean Sea Road','Cuffe Parade','Malabar Hill','Marine Lines','Churchgate','Colaba']},
  {title:'Eastern suburbs & growth corridors',detail:'Residential options around established business districts and cross-city connections.',areas:['Ghatkopar','Powai']},
];
export const hotspotAreas=hotspotGroups.flatMap(group=>group.areas);
export function areaSlug(area){return area.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
export function areaFromSlug(slug){return hotspotAreas.find(area=>areaSlug(area)===slug)||null}
function normalized(text){return String(text||'').normalize('NFKD').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim()}
const aliases={'Nepean Sea Road':['Nepean Sea Road','Napean Sea Road'],'Oshiwara Link Road':['Oshiwara Link Road','New Link Road Oshiwara'],'Juhu Tara Road':['Juhu Tara Road','Juhu Tara']};
export function projectMatchesArea(project,area){
  const locality=normalized(project.locations?.name);
  const searchable=normalized([project.name,project.address,project.locations?.name].filter(Boolean).join(' '));
  const matches=(aliases[area]||[area]).some(alias=>(' '+searchable+' ').includes(' '+normalized(alias)+' '));
  if(!matches)return false;
  // Lower Parel listings should not be counted as Parel-only matches.
  if(area==='Parel'&&locality==='lower parel')return false;
  return true;
}
export function areaSearchUrl(area,category){
  const query=new URLSearchParams({market:'Mumbai',q:area});
  if(category)query.set('category',category);
  return '/properties?'+query.toString();
}
export function areaDetailUrl(area){return '/mumbai-hotspots/'+areaSlug(area)}
export function areaEnquiryUrl(area){
  const phone=process.env.NEXT_PUBLIC_WHATSAPP_NUMBER||'918850373012';
  const message='Hi Way2Paisa, I am interested in verified residential and commercial projects in '+area+', Mumbai. Please share current developer availability, exact unit pricing and upcoming launches.';
  return 'https://wa.me/'+phone+'?text='+encodeURIComponent(message);
}
export async function loadPublishedMumbaiProjects(){
  const base=process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if(!base||!key)return null;
  try{
    const url=new URL(base+'/rest/v1/projects');
    url.searchParams.set('select','id,name,slug,category,address,min_price,developer_id,location_id,locations(name),developers(name)');
    url.searchParams.set('active','eq.true');
    url.searchParams.set('verified','eq.true');
    url.searchParams.set('market','eq.Mumbai');
    url.searchParams.set('limit','1000');
    const response=await fetch(url,{headers:{apikey:key,Authorization:'Bearer '+key},next:{revalidate:3600}});
    if(!response.ok)return null;
    const rows=await response.json();
    return Array.isArray(rows)?rows:null;
  }catch{return null}
}
export function splitProjectsByCategory(projects){
  return {
    homes:projects.filter(p=>p.category==='apartment'||p.category==='villa'),
    offices:projects.filter(p=>p.category==='commercial_office'||p.category==='retail'),
  };
}
