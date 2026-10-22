export const revalidate = 3600;

export default async function sitemap() {
  const baseUrl = 'https://www.way2paisa.in';
  const staticRoutes = [
    { url: baseUrl, changeFrequency: 'daily', priority: 1 },
    { url: baseUrl + '/properties', changeFrequency: 'daily', priority: 0.9 },
    { url: baseUrl + '/mumbai-localities', changeFrequency: 'daily', priority: 0.85 },
    { url: baseUrl + '/mumbai-project-watchlist', changeFrequency: 'weekly', priority: 0.75 },
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
    return [...staticRoutes, ...projectRoutes];
  } catch {
    return staticRoutes;
  }
}
