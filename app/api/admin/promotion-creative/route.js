import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

function formatCreativePrice(value, market) {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return 'Price on Request';
  if (String(market || '').toLowerCase() === 'dubai') return 'AED ' + Math.round(n).toLocaleString('en-AE') + ' onwards';
  const crores = n >= 100000 ? n / 10000000 : n;
  if (crores < 1) return 'Rs. ' + (crores * 100).toLocaleString('en-IN', { maximumFractionDigits: 2 }) + ' Lakh onwards';
  return 'Rs. ' + crores.toLocaleString('en-IN', { maximumFractionDigits: 2 }) + ' Cr onwards';
}

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
      tokens.add(token); continue;
    }
    if (/office/i.test(raw)) tokens.add('Office');
    else if (/retail|shop/i.test(raw)) tokens.add('Retail');
    else if (/plot/i.test(raw)) tokens.add('Plot');
    else if (/villa/i.test(raw)) tokens.add('Villa');
  }
  const rank = token => token === 'Studio' ? 0 : (Number(token.match(/^([0-9]+(?:\.[0-9]+)?)/)?.[1]) || 90);
  return [...tokens].sort((a, b) => rank(a) - rank(b) || a.localeCompare(b)).join(' | ');
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get('project');
  if (!projectId) return new Response('Project is required.', { status: 400 });

  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!base || !key) return new Response('Creative service is not configured.', { status: 500 });

  const query = new URL(base + '/rest/v1/projects');
  query.searchParams.set('select', 'id,name,slug,hero_image_url,market,bhk_original,min_price,rera_number,locations(name)');
  query.searchParams.set('id', 'eq.' + projectId);
  query.searchParams.set('active', 'eq.true');
  query.searchParams.set('verified', 'eq.true');

  const response = await fetch(query, { headers: { apikey: key, Authorization: 'Bearer ' + key }, cache: 'no-store' });
  const projects = await response.json().catch(() => []);
  const project = Array.isArray(projects) ? projects[0] : null;
  if (!project) return new Response('Verified project not found.', { status: 404 });
  if (!project.hero_image_url) return new Response('No project image is available.', { status: 422 });

  const inventoryQuery = new URL(base + '/rest/v1/inventory');
  inventoryQuery.searchParams.set('select', 'configuration');
  inventoryQuery.searchParams.set('project_id', 'eq.' + project.id);
  inventoryQuery.searchParams.set('active', 'eq.true');
  const inventoryResponse = await fetch(inventoryQuery, { headers: { apikey: key, Authorization: 'Bearer ' + key }, cache: 'no-store' });
  const inventory = inventoryResponse.ok ? await inventoryResponse.json().catch(() => []) : [];

  const origin = new URL(request.url).origin;
  // This internal Node route converts each genuine stored project source,
  // including WebP/AVIF, into a JPEG that next/og can render reliably.
  const heroUrl = origin + '/api/admin/promotion-source-image?project=' + encodeURIComponent(project.id);
  const logoUrl = origin + '/way2paisa-logo.png';
  const dubai = String(project.market || '').toLowerCase() === 'dubai';
  const price = formatCreativePrice(project.min_price, project.market);
  const configuration = summarizeConfigurations((inventory || []).map(row => row.configuration), project.market) || project.bhk_original || 'Verified project';
  const location = project.locations?.name || project.market || 'Mumbai · MMR';
  const rera = project.rera_number ? (dubai ? 'DLD: ' : 'MahaRERA: ') + project.rera_number : 'Verified project details';

  return new ImageResponse(
    <div style={{ display: 'flex', width: '100%', height: '100%', background: '#061b36', color: 'white', position: 'relative', overflow: 'hidden', fontFamily: 'sans-serif' }}>
      <img src={heroUrl} width="1080" height="1080" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ display: 'flex', position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(3,16,35,.08) 0%, rgba(3,16,35,.12) 43%, rgba(3,16,35,.9) 100%)' }} />
      <div style={{ display: 'flex', position: 'relative', width: '100%', height: '100%', padding: '54px', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <img src={logoUrl} width="210" height="62" style={{ objectFit: 'contain', objectPosition: 'left center' }} />
          <div style={{ display: 'flex', border: '1px solid rgba(255,255,255,.55)', borderRadius: '999px', padding: '10px 18px', fontSize: 18, letterSpacing: 1.3 }}>VERIFIED LISTING</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', padding: '34px', borderRadius: '22px', background: 'rgba(4,24,51,.78)', border: '1px solid rgba(255,255,255,.22)' }}>
          <div style={{ display: 'flex', fontSize: 22, color: '#a9d8ff', letterSpacing: 1.3, marginBottom: 14 }}>{location.toUpperCase()}</div>
          <div style={{ display: 'flex', fontSize: 56, lineHeight: 1.05, fontWeight: 800, letterSpacing: -1.6, marginBottom: 18 }}>{project.name}</div>
          <div style={{ display: 'flex', fontSize: 25, color: '#e6f1ff', marginBottom: 18 }}>{configuration}</div>
          <div style={{ display: 'flex', fontSize: 37, color: '#ffffff', fontWeight: 800 }}>{price}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: 17, color: '#e5f1ff' }}>
          <div style={{ display: 'flex', maxWidth: '60%' }}>{rera}</div>
          <div style={{ display: 'flex', fontWeight: 800, letterSpacing: .6 }}>Speak to an Advisor · 88503 73012</div>
        </div>
      </div>
    </div>,
    { width: 1080, height: 1080 }
  );
}