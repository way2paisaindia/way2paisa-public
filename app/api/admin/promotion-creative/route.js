import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

function imageCandidates(value) {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return [];

    const candidates = [];
    // Some developer websites expose an original JPEG/PNG followed by ".webp".
    // Prefer that original file because next/og cannot decode WebP.
    if (/\.(jpe?g|png)\.webp$/i.test(url.pathname)) {
      const original = new URL(url);
      original.pathname = original.pathname.replace(/\.webp$/i, '');
      candidates.push(original.toString());
    }
    if (/\.(jpe?g|png)$/i.test(url.pathname)) candidates.push(url.toString());
    return [...new Set(candidates)];
  } catch {
    return [];
  }
}

async function canRenderImage(url) {
  try {
    const response = await fetch(url, {
      headers: { Range: 'bytes=0-2048' },
      cache: 'no-store',
    });
    const type = response.headers.get('content-type') || '';
    return response.ok && /^image\/(jpeg|png)/i.test(type);
  } catch {
    return false;
  }
}

async function findProjectImage(urls) {
  const candidates = urls.flatMap(imageCandidates);
  const checks = await Promise.all(candidates.map(async (url) => ({ url, ok: await canRenderImage(url) })));
  return checks.find((item) => item.ok)?.url || null;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get('project');
  if (!projectId) return new Response('Project is required.', { status: 400 });

  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!base || !key) return new Response('Creative service is not configured.', { status: 500 });

  const headers = { apikey: key, Authorization: 'Bearer ' + key };
  const query = new URL(base + '/rest/v1/projects');
  query.searchParams.set('select', 'id,name,slug,hero_image_url,market,bhk_original,price_original,rera_number');
  query.searchParams.set('id', 'eq.' + projectId);
  query.searchParams.set('active', 'eq.true');
  query.searchParams.set('verified', 'eq.true');

  const response = await fetch(query, { headers, cache: 'no-store' });
  const projects = await response.json().catch(() => []);
  const project = Array.isArray(projects) ? projects[0] : null;
  if (!project) return new Response('Verified project not found.', { status: 404 });

  const mediaQuery = new URL(base + '/rest/v1/project_media');
  mediaQuery.searchParams.set('select', 'image_url,sort_order');
  mediaQuery.searchParams.set('project_id', 'eq.' + project.id);
  mediaQuery.searchParams.set('active', 'eq.true');
  mediaQuery.searchParams.set('order', 'sort_order.asc');
  const mediaResponse = await fetch(mediaQuery, { headers, cache: 'no-store' });
  const media = await mediaResponse.json().catch(() => []);
  const heroUrl = await findProjectImage([
    project.hero_image_url,
    ...(Array.isArray(media) ? media.map((item) => item.image_url) : []),
  ]);

  // Never silently create a brand-only "project" post. The studio will show an
  // upload choice when the verified listing has no compatible JPG/PNG source.
  if (!heroUrl) {
    return new Response('No compatible project image is available. Upload an approved image creative.', { status: 422 });
  }

  const origin = new URL(request.url).origin;
  const logoUrl = origin + '/way2paisa-logo.png';
  const price = (project.price_original || 'Price on Request').replace(/₹/g, 'Rs. ');
  const configuration = project.bhk_original || 'Verified project';
  const location = project.market || 'Mumbai · MMR';
  const rera = project.rera_number ? 'MahaRERA: ' + project.rera_number : 'Verified project details';

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