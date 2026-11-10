import { createClient } from '@supabase/supabase-js';

// Public catalogue queries use the publishable key and existing RLS policies.
// The service-role key must NEVER be used in server-rendered page props.
const projectColumns = 'id,name,slug,address,status,min_price,max_price,featured,verified,hero_image_url,market,category,bhk_original,carpet_area_original,min_carpet_sqft,max_carpet_sqft,developer_id,location_id,developers(name),locations(name,zone)';

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
    else if (/\bmansion\b/i.test(raw)) tokens.add(raw);
  }
  const rank = token => token === 'Studio' ? 0 : (Number(token.match(/^([0-9]+(?:\.[0-9]+)?)/)?.[1]) || 90);
  return [...tokens].sort((a, b) => rank(a) - rank(b) || a.localeCompare(b)).join(' | ');
}

// A transient upstream 502 can otherwise erase the entire public catalogue
// for that render. Retry only read-only SELECT operations, and only once.
// Persistent schema/auth errors still surface immediately.
function isTransientCatalogueFailure(error) {
  const message = String(error?.message || error?.details || error || '');
  return /\b(?:429|502|503|504)\b|bad gateway|service unavailable|gateway timeout|fetch failed|network error|econnreset|etimedout/i.test(message);
}
async function readCatalogueWithRetry(read) {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await read();
      if (attempt === 0 && response?.error && isTransientCatalogueFailure(response.error)) {
        await new Promise(resolve => setTimeout(resolve, 180));
        continue;
      }
      return response;
    } catch (error) {
      if (attempt !== 0 || !isTransientCatalogueFailure(error)) throw error;
      await new Promise(resolve => setTimeout(resolve, 180));
    }
  }
}

// Supabase/PostgREST may enforce a per-response max-rows cap even when a
// larger .limit() is requested. Page all active units so every configuration
// participates in the public search and bedroom filters.
async function loadAllActiveInventory(db) {
  const pageSize = 500;
  const maxPages = 40;
  const rows = [];
  let cursor = null;

  // Keyset pagination avoids offset/count drift when new inventory is
  // published while a visitor is loading multiple pages.
  for (let page = 0; page < maxPages; page++) {
    const res = await readCatalogueWithRetry(() => {
      let query = db.from('inventory')
        .select('id,project_id,configuration,price,price_max,carpet_area_sqft,carpet_area_max_sqft,plot_area_sqft,plot_area_max_sqft')
        .eq('active', true)
        .order('id', { ascending: true })
        .limit(pageSize);
      if (cursor) query = query.gt('id', cursor);
      return query;
    });
    if (res.error) throw res.error;
    if (!Array.isArray(res.data)) throw new Error('Invalid inventory response');
    if (res.data.length && cursor && res.data[0].id <= cursor) {
      throw new Error('Inventory cursor failed to advance');
    }
    rows.push(...res.data);
    if (res.data.length < pageSize) {
      return { data: rows, count: rows.length, error: null };
    }
    const lastId = res.data[res.data.length - 1]?.id;
    if (!lastId || lastId === cursor) throw new Error('Inventory cursor failed to advance');
    cursor = lastId;
  }
  throw new Error('Inventory pagination exceeded its safety limit');
}

// Page every fully published project rather than trusting a single limit(2000).
// This keeps all projects discoverable after the catalogue crosses 1,000 records.
async function loadAllPublishedProjects(db) {
  const pageSize = 500;
  const maxPages = 50;
  const rows = [];
  let cursor = null;
  for (let page = 0; page < maxPages; page++) {
    const res = await readCatalogueWithRetry(() => {
      let query = db.from('projects')
        .select(projectColumns + ',updated_at')
        .eq('active', true)
        .eq('verified', true)
        .eq('enrichment_status', 'complete')
        .order('id', { ascending: true })
        .limit(pageSize);
      if (cursor) query = query.gt('id', cursor);
      return query;
    });
    if (res.error) throw res.error;
    if (!Array.isArray(res.data)) throw new Error('Invalid published project response');
    if (res.data.length && cursor && res.data[0].id <= cursor) {
      throw new Error('Published project cursor failed to advance');
    }
    rows.push(...res.data);
    if (res.data.length < pageSize) {
      rows.sort((a, b) => (Number(b.featured) - Number(a.featured))
        || (Date.parse(b.updated_at || '') || 0) - (Date.parse(a.updated_at || '') || 0));
      return { data: rows, count: rows.length, error: null };
    }
    const lastId = res.data[res.data.length - 1]?.id;
    if (!lastId || lastId === cursor) throw new Error('Published project cursor failed to advance');
    cursor = lastId;
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
      readCatalogueWithRetry(() => db.from('locations').select('id,name,zone').eq('active', true).order('name')),
      readCatalogueWithRetry(() => db.from('developers').select('id,name').eq('active', true).order('name')),
      loadAllActiveInventory(db)
    ]);
    for (const res of [projectsRes, locationsRes, developersRes, inventoryRes]) {
      if (res.error) throw res.error;
    }
    const configurations = new Map();
    const offerGroups = new Map();
    const projectMarkets = new Map((projectsRes.data || []).map(p => [p.id, p.market]));
    const projectCategories = new Map((projectsRes.data || []).map(p => [p.id, p.category]));
    for (const item of inventoryRes.data || []) {
      if (!item.project_id || !item.configuration || !projectMarkets.has(item.project_id)) continue;
      if (!configurations.has(item.project_id)) configurations.set(item.project_id, []);
      configurations.get(item.project_id).push(item.configuration);
      const label = summarizeConfigurations([item.configuration], projectMarkets.get(item.project_id));
      const minimum = Number(item.price);
      const rawMaximum = Number(item.price_max);
      const maximum = Number.isFinite(rawMaximum) && rawMaximum >= minimum ? rawMaximum : minimum;
      if (!label || !Number.isFinite(minimum) || minimum <= 0 || !Number.isFinite(maximum)) continue;
      if (!offerGroups.has(item.project_id)) offerGroups.set(item.project_id, new Map());
      const groups = offerGroups.get(item.project_id);
      // Plotted developments use land size, not residential RERA carpet area.
      const isPlot = ['plot', 'land'].includes(String(projectCategories.get(item.project_id) || '').toLowerCase());
      const areaMinimum = Number(isPlot ? (item.plot_area_sqft ?? item.carpet_area_sqft) : item.carpet_area_sqft);
      const areaMaximum = Number(isPlot
        ? (item.plot_area_max_sqft ?? item.plot_area_sqft ?? item.carpet_area_max_sqft ?? item.carpet_area_sqft)
        : (item.carpet_area_max_sqft ?? item.carpet_area_sqft));
      const hasValidArea = Number.isFinite(areaMinimum) && areaMinimum > 0
        && Number.isFinite(areaMaximum) && areaMaximum >= areaMinimum;
      if (!groups.has(label)) groups.set(label, {
        configuration: label, minimum, maximum,
        ...(hasValidArea ? { areaMinimum, areaMaximum } : {})
      });
      else {
        const group = groups.get(label);
        group.minimum = Math.min(group.minimum, minimum);
        group.maximum = Math.max(group.maximum, maximum);
        if (hasValidArea) {
          group.areaMinimum = Math.min(Number.isFinite(group.areaMinimum) ? group.areaMinimum : areaMinimum, areaMinimum);
          group.areaMaximum = Math.max(Number.isFinite(group.areaMaximum) ? group.areaMaximum : areaMaximum, areaMaximum);
        }
      }
    }
    return {
      projects: (projectsRes.data || []).filter(p => p.slug).map(({updated_at, ...p}) => ({
        ...p,
        live_configuration_summary: summarizeConfigurations(configurations.get(p.id), p.market),
        // Public catalogue receives only configuration-level price ranges; no unit IDs or source notes.
        live_unit_offers: [...(offerGroups.get(p.id)?.values() || [])]
      })),
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


// Step 4: a buyer guide must not fetch the whole public catalogue just to
// render a handful of cards. Only these explicitly requested, published
// projects and their active inventory enter the scope of each read.
// The homepage and searchable catalogue retain loadPublicProjects unchanged.
export async function loadLandingProjects({ slugs, market, categories } = {}) {
  const errorResult = { projects: [], error: 'The published projects are temporarily unavailable. Please try again.' };
  const selectedSlugs = Array.isArray(slugs) && slugs.length > 0 && slugs.length <= 50
    && slugs.every(slug => typeof slug === 'string' && /^[a-z0-9-]{2,120}$/.test(slug))
    ? [...new Set(slugs)] : null;
  const selectedMarket = !selectedSlugs && market === 'MMR'
    && Array.isArray(categories) && categories.length > 0
    && categories.every(category => ['plot', 'villa', 'land'].includes(category))
    ? market : null;
  if (!selectedSlugs && !selectedMarket) {
    console.error('Scoped project query requested without a recognised buyer-guide filter');
    return errorResult;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return errorResult;

  try {
    const db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });

    // Retain safe keyset pagination: public PostgREST instances can cap rows
    // below a requested limit, and the catalogue may grow after this launch.
    async function readAll(table, columns, scope) {
      const rows = [];
      let cursor = null;
      for (let page = 0; page < 20; page++) {
        const response = await readCatalogueWithRetry(() => {
          let query = db.from(table).select(columns).order('id', { ascending: true }).limit(500);
          query = scope(query);
          if (cursor) query = query.gt('id', cursor);
          return query;
        });
        if (response.error) throw response.error;
        if (!Array.isArray(response.data)) throw new Error('Invalid buyer-guide response: ' + table);
        if (response.data.length && cursor && response.data[0].id <= cursor) {
          throw new Error('Buyer-guide keyset pagination did not advance: ' + table);
        }
        rows.push(...response.data);
        if (response.data.length < 500) return rows;
        const nextCursor = response.data[response.data.length - 1]?.id;
        if (!nextCursor || cursor === nextCursor) throw new Error('Buyer-guide pagination stalled');
        cursor = nextCursor;
      }
      throw new Error('Buyer-guide catalogue exceeded pagination safety limit');
    }

    const published = await readAll('projects', projectColumns, query => {
      query = query.eq('active', true).eq('verified', true).eq('enrichment_status', 'complete');
      return selectedSlugs
        ? query.in('slug', selectedSlugs)
        : query.eq('market', selectedMarket).in('category', categories);
    });
    if (published.length === 0) return { projects: [], error: '' };

    const projectMap = new Map(published.map(project => [project.id, project]));
    const inventory = await readAll(
      'inventory',
      'id,project_id,configuration,price,price_max,carpet_area_sqft,carpet_area_max_sqft,plot_area_sqft,plot_area_max_sqft',
      query => query.eq('active', true).in('project_id', [...projectMap.keys()])
    );

    const configurations = new Map();
    const offers = new Map();
    for (const unit of inventory) {
      const project = projectMap.get(unit.project_id);
      if (!project || !unit.configuration) continue;
      if (!configurations.has(project.id)) configurations.set(project.id, []);
      configurations.get(project.id).push(unit.configuration);

      const label = summarizeConfigurations([unit.configuration], project.market);
      const minimum = Number(unit.price);
      const rawMaximum = Number(unit.price_max);
      const maximum = Number.isFinite(rawMaximum) && rawMaximum >= minimum ? rawMaximum : minimum;
      if (!label || !Number.isFinite(minimum) || minimum <= 0 || !Number.isFinite(maximum)) continue;

      if (!offers.has(project.id)) offers.set(project.id, new Map());
      const byConfiguration = offers.get(project.id);
      const plot = ['plot', 'land'].includes(String(project.category || '').toLowerCase());
      const areaMinimum = Number(plot
        ? (unit.plot_area_sqft ?? unit.carpet_area_sqft) : unit.carpet_area_sqft);
      const areaMaximum = Number(plot
        ? (unit.plot_area_max_sqft ?? unit.plot_area_sqft ?? unit.carpet_area_max_sqft ?? unit.carpet_area_sqft)
        : (unit.carpet_area_max_sqft ?? unit.carpet_area_sqft));
      const hasArea = Number.isFinite(areaMinimum) && areaMinimum > 0
        && Number.isFinite(areaMaximum) && areaMaximum >= areaMinimum;
      if (!byConfiguration.has(label)) {
        byConfiguration.set(label, {
          configuration: label, minimum, maximum,
          ...(hasArea ? { areaMinimum, areaMaximum } : {})
        });
      } else {
        const group = byConfiguration.get(label);
        group.minimum = Math.min(group.minimum, minimum);
        group.maximum = Math.max(group.maximum, maximum);
        if (hasArea) {
          group.areaMinimum = Math.min(Number.isFinite(group.areaMinimum) ? group.areaMinimum : areaMinimum, areaMinimum);
          group.areaMaximum = Math.max(Number.isFinite(group.areaMaximum) ? group.areaMaximum : areaMaximum, areaMaximum);
        }
      }
    }

    return {
      projects: published.filter(project => project.slug).map(project => ({
        ...project,
        live_configuration_summary: summarizeConfigurations(configurations.get(project.id), project.market),
        live_unit_offers: [...(offers.get(project.id)?.values() || [])]
      })),
      error: ''
    };
  } catch (error) {
    console.error('Scoped buyer-guide catalogue read failed', error?.message || error);
    return errorResult;
  }
}
