// Match the public catalogue cache so newly published projects are discoverable promptly.
export const revalidate = 300;

const baseUrl = 'https://www.way2paisa.in';
const pageSize = 500;

// Supabase can cap the number of rows returned by a PostgREST request.
// Always page through results: silently dropping published project URLs is unsafe.
async function fetchAllPublicRows(table, columns, filters, supabaseUrl, key) {
  const rows = [];
  const maxPages = 30;
  for (let page = 0; page < maxPages; page++) {
    const query = new URL(supabaseUrl + '/rest/v1/' + table);
    query.searchParams.set('select', columns);
    for (const [field, value] of Object.entries(filters)) {
      query.searchParams.set(field, value);
    }
    query.searchParams.set('order', 'id.asc');
    query.searchParams.set('limit', String(pageSize));
    query.searchParams.set('offset', String(page * pageSize));

    const response = await fetch(query, {
      headers: { apikey: key, Authorization: 'Bearer ' + key },
      next: { revalidate: 300 },
    });
    if (!response.ok) {
      throw new Error('Project sitemap source unavailable: ' + table + ' (HTTP ' + response.status + ')');
    }
    const batch = await response.json();
    if (!Array.isArray(batch)) throw new Error('Unexpected sitemap data: ' + table);
    rows.push(...batch);
    if (batch.length < pageSize) return rows;
  }
  throw new Error('Sitemap pagination safety limit reached for ' + table);
}

function latestSignificantChange(...dates) {
  const valid = dates.map(date => date ? new Date(date).getTime() : NaN).filter(Number.isFinite);
  return valid.length ? new Date(Math.max(...valid)) : undefined;
}

export default async function sitemap() {
  const staticRoutes = [
    { url: baseUrl, changeFrequency: 'daily', priority: 1 },
    { url: baseUrl + '/properties', changeFrequency: 'daily', priority: 0.9 },
    { url: baseUrl + '/finance', changeFrequency: 'monthly', priority: 0.7 },
    { url: baseUrl + '/legal', changeFrequency: 'monthly', priority: 0.3 },
  ];

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!supabaseUrl || !key) throw new Error('Missing configuration for the published project sitemap.');

  try {
    const [projects, inventory] = await Promise.all([
      fetchAllPublicRows('projects', 'id,slug,updated_at', { active: 'eq.true', verified: 'eq.true', enrichment_status: 'eq.complete' }, supabaseUrl, key),
      fetchAllPublicRows('inventory', 'id,project_id,updated_at', { active: 'eq.true' }, supabaseUrl, key),
    ]);

    const inventoryLastModified = new Map();
    for (const item of inventory) {
      if (!item.project_id || !item.updated_at) continue;
      const last = inventoryLastModified.get(item.project_id);
      if (!last || Date.parse(item.updated_at) > Date.parse(last)) {
        inventoryLastModified.set(item.project_id, item.updated_at);
      }
    }

    const projectRoutes = projects
      .filter(project => project.slug)
      .map(project => ({
        url: baseUrl + '/projects/' + encodeURIComponent(project.slug),
        lastModified: latestSignificantChange(project.updated_at, inventoryLastModified.get(project.id)),
        changeFrequency: 'weekly',
        priority: 0.7,
      }));
    return [...staticRoutes, ...projectRoutes];
  } catch (error) {
    console.error('Published project sitemap could not be refreshed', error);
    throw error;
  }
}
