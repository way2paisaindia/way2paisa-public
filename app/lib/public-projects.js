import { createClient } from '@supabase/supabase-js';

// Public catalogue queries use the publishable key and existing RLS policies.
// The service-role key must NEVER be used in server-rendered page props.
const projectColumns = 'id,name,slug,address,status,min_price,max_price,featured,verified,hero_image_url,market,category,bhk_original,carpet_area_original,price_original,min_carpet_sqft,max_carpet_sqft,developer_id,location_id,developers(name,logo_url),locations(name,zone)';

function summarizeConfigurations(values, market) {
  const dubai = String(market || '').toLowerCase() === 'dubai';
  const tokens = new Set();
  for (const value of values || []) {
    const raw = String(value || '').trim();
    if (!raw) continue;
    if (/studio/i.test(raw)) { tokens.add('Studio'); continue; }
    const jodi = raw.match(/(?:\(([0-9.]+\+[0-9.]+)\)\s*BHK|Jodi\s*([0-9.]+\+[0-9.]+))/i);
    if (jodi) { tokens.add('Jodi ' + (jodi[1] || jodi[2])); continue; }
    const match = raw.match(/([0-9]+(?:\.[0-9]+)?)\s*(?:BHK|BR|Bedroom|Bedrooms)/i);
    if (match) {
      let token = match[1] + ' ' + (dubai ? 'BR' : 'BHK');
      if (/townhouse/i.test(raw)) token += ' Townhouse';
      else if (/villa/i.test(raw)) token += ' Villa';
      else if (/penthouse/i.test(raw)) token += ' Penthouse';
      else if (/duplex/i.test(raw)) token += ' Duplex';
      else if (/study/i.test(raw)) token += ' + Study';
      tokens.add(token);
      continue;
    }
    if (/office/i.test(raw)) tokens.add('Office');
    else if (/retail|shop/i.test(raw)) tokens.add('Retail');
    else if (/plot/i.test(raw)) tokens.add('Plot');
    else if (/villa/i.test(raw)) tokens.add('Villa');
  }
  const rank = token => token === 'Studio' ? 0 : (Number(token.match(/^([0-9]+(?:\.[0-9]+)?)/)?.[1]) || 90);
  return [...tokens].sort((a, b) => rank(a) - rank(b) || a.localeCompare(b)).join(' | ');
}

// Supabase/PostgREST may enforce a per-response max-rows cap even when a
// larger .limit() is requested. Page all active units so every configuration
// participates in the public search and bedroom filters.
async function loadAllActiveInventory(db) {
  const pageSize = 500;
  const maxPages = 40;
  const rows = [];
  let expectedCount = null;

  for (let page = 0; page < maxPages; page++) {
    const start = page * pageSize;
    const res = await db.from('inventory')
      .select('id,project_id,configuration', { count: page === 0 ? 'exact' : undefined })
      .eq('active', true)
      .order('id', { ascending: true })
      .range(start, start + pageSize - 1);
    if (res.error) throw res.error;
    if (!Array.isArray(res.data)) throw new Error('Invalid inventory response');
    if (page === 0 && Number.isInteger(res.count)) expectedCount = res.count;
    rows.push(...res.data);

    if (expectedCount !== null && rows.length === expectedCount) {
      return { data: rows, count: expectedCount, error: null };
    }
    if (res.data.length < pageSize) {
      if (expectedCount !== null && rows.length !== expectedCount) {
        throw new Error('Inventory pagination returned fewer rows than expected');
      }
      return { data: rows, count: rows.length, error: null };
    }
  }
  throw new Error('Inventory pagination exceeded its safety limit');
}

// Page every fully published project rather than trusting a single limit(2000).
// This keeps all projects discoverable after the catalogue crosses 1,000 records.
async function loadAllPublishedProjects(db) {
  const pageSize = 500;
  const maxPages = 50;
  const rows = [];
  let expectedCount = null;
  for (let page = 0; page < maxPages; page++) {
    const res = await db.from('projects')
      .select(projectColumns + ',updated_at', { count: page === 0 ? 'exact' : undefined })
      .eq('active', true)
      .eq('verified', true)
      .eq('enrichment_status', 'complete')
      .order('id', { ascending: true })
      .range(page * pageSize, (page + 1) * pageSize - 1);
    if (res.error) throw res.error;
    if (!Array.isArray(res.data)) throw new Error('Invalid published project response');
    if (page === 0 && Number.isInteger(res.count)) expectedCount = res.count;
    rows.push(...res.data);
    if (expectedCount !== null && rows.length === expectedCount) {
      rows.sort((a, b) => (Number(b.featured) - Number(a.featured))
        || (Date.parse(b.updated_at || '') || 0) - (Date.parse(a.updated_at || '') || 0));
      return { data: rows, count: rows.length, error: null };
    }
    if (res.data.length < pageSize) {
      if (expectedCount !== null && rows.length !== expectedCount) {
        throw new Error('Published project pagination returned fewer rows than expected');
      }
      rows.sort((a, b) => (Number(b.featured) - Number(a.featured))
        || (Date.parse(b.updated_at || '') || 0) - (Date.parse(a.updated_at || '') || 0));
      return { data: rows, count: rows.length, error: null };
    }
  }
  throw new Error('Published project pagination exceeded its safety limit');
}

export async function loadPublicProjects() {
  const empty = { projects: [], locations: [], developers: [], inventoryOptions: 0, error: 'The property catalogue is temporarily unavailable. Please try again.' };
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    console.error('Public catalogue: missing Supabase configuration');
    return empty;
  }
  try {
    const db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
    const [projectsRes, locationsRes, developersRes, inventoryRes] = await Promise.all([
      loadAllPublishedProjects(db),
      db.from('locations').select('id,name,zone').eq('active', true).order('name'),
      db.from('developers').select('id,name,logo_url').eq('active', true).order('name'),
      loadAllActiveInventory(db)
    ]);
    for (const res of [projectsRes, locationsRes, developersRes, inventoryRes]) {
      if (res.error) throw res.error;
    }
    const configurations = new Map();
    for (const item of inventoryRes.data || []) {
      if (!item.project_id || !item.configuration) continue;
      if (!configurations.has(item.project_id)) configurations.set(item.project_id, []);
      configurations.get(item.project_id).push(item.configuration);
    }
    return {
      projects: (projectsRes.data || []).filter(p => p.slug).map(p => ({ ...p, live_configuration_summary: summarizeConfigurations(configurations.get(p.id), p.market) })),
      locations: locationsRes.data || [],
      developers: developersRes.data || [],
      inventoryOptions: Number(inventoryRes.count) || 0,
      error: ''
    };
  } catch (error) {
    console.error('Public catalogue server load failed', error?.message || error);
    return empty;
  }
}
