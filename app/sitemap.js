import {hotspotAreas,areaDetailUrl,projectMatchesArea,loadPublishedMumbaiProjects} from './mumbai-hotspots/areas';
export const revalidate = 3600;

export default async function sitemap() {
  const baseUrl = 'https://www.way2paisa.in';
  const staticRoutes = [
    { url: baseUrl, changeFrequency: 'daily', priority: 1 },
    { url: baseUrl + '/properties', changeFrequency: 'daily', priority: 0.9 },
    { url: baseUrl + '/mumbai-hotspots', changeFrequency: 'weekly', priority: 0.85 },
    { url: baseUrl + '/finance', changeFrequency: 'monthly', priority: 0.7 },
    { url: baseUrl + '/legal', changeFrequency: 'monthly', priority: 0.3 },
  ];

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!supabaseUrl || !key) return staticRoutes;

  try {
    const query = new URL(supabaseUrl + '/rest/v1/projects');
    query.searchParams.set('select', 'slug,updated_at');
    query.searchParams.set('active', 'eq.true');
    query.searchParams.set('verified', 'eq.true');
    query.searchParams.set('order', 'updated_at.desc');
    query.searchParams.set('limit', '2000');
    const response = await fetch(query, {
      headers: { apikey: key, Authorization: 'Bearer ' + key },
      next: { revalidate: 3600 },
    });
    if (!response.ok) throw new Error('Project sitemap source unavailable.');
    const projects = await response.json();
    const projectRoutes = (projects || [])
      .filter(project => project.slug)
      .map(project => ({
        url: baseUrl + '/projects/' + encodeURIComponent(project.slug),
        lastModified: project.updated_at ? new Date(project.updated_at) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      }));
    // Only include neighbourhood pages with enough distinct published
    // projects to be useful search results. Sparse areas remain accessible
    // to visitors for enquiries but are noindex until verified stock grows.
    const mumbai=await loadPublishedMumbaiProjects();
    const neighbourhoodRoutes=(mumbai||[]).length===0?[]:hotspotAreas
      .filter(area=>mumbai.filter(project=>projectMatchesArea(project,area)&&project.slug).length>=3)
      .map(area=>({
        url:baseUrl+areaDetailUrl(area),
        lastModified:new Date(),
        changeFrequency:'weekly',
        priority:0.65,
      }));
    return [...staticRoutes, ...neighbourhoodRoutes, ...projectRoutes];
  } catch {
    return staticRoutes;
  }
}
