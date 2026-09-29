import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const fallbackImage = 'https://www.way2paisa.in/way2paisa-mark.jpg';

function safeUrl(value) {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return fallbackImage;
    // Satori (the PNG renderer) cannot decode WebP inputs. Use the brand fallback
    // rather than returning a partially rendered image that Meta cannot process.
    if (/\.webp($|\?)/i.test(url.pathname)) return fallbackImage;
    return url.toString();
  } catch {
    return fallbackImage;
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get('project');
  if (!projectId) return new Response('Project is required.', { status: 400 });

  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!base || !key) return new Response('Creative service is not configured.', { status: 500 });

  const query = new URL(base + '/rest/v1/projects');
  query.searchParams.set('select', 'id,name,slug,hero_image_url,market,bhk_original,price_original,rera_number');
  query.searchParams.set('id', 'eq.' + projectId);
  query.searchParams.set('active', 'eq.true');
  query.searchParams.set('verified', 'eq.true');

  const response = await fetch(query, { headers: { apikey: key, Authorization: 'Bearer ' + key }, cache: 'no-store' });
  const projects = await response.json().catch(() => []);
  const project = Array.isArray(projects) ? projects[0] : null;
  if (!project) return new Response('Verified project not found.', { status: 404 });

  const origin = new URL(request.url).origin;
  const logoUrl = origin + '/way2paisa-logo.png';
  const heroUrl = safeUrl(project.hero_image_url);
  const price = (project.price_original || 'Price on Request').replace(/₹/g, 'Rs. ');
  const configuration = project.bhk_original || 'Verified project';
  const location = project.market || 'Mumbai · MMR';
  const rera = project.rera_number ? 'MahaRERA: ' + project.rera_number : 'Verified project details';

  return new ImageResponse(
    <div style={{ display: 'flex', width: '100%', height: '100%', background: '#061b36', color: 'white', position: 'relative', overflow: 'hidden', fontFamily: 'sans-serif' }}>
      <img src={heroUrl} width="1080" height="1080" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
      <div style={{ display: 'flex', position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(3,16,35,.12) 0%, rgba(3,16,35,.30) 42%, rgba(3,16,35,.96) 100%)' }} />
      <div style={{ display: 'flex', position: 'relative', width: '100%', height: '100%', padding: '62px', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <img src={logoUrl} width="245" height="72" style={{ objectFit: 'contain', objectPosition: 'left center' }} />
          <div style={{ display: 'flex', border: '1px solid rgba(255,255,255,.55)', borderRadius: '999px', padding: '12px 20px', fontSize: 20, letterSpacing: 1.5 }}>VERIFIED LISTING</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', padding: '38px', borderRadius: '24px', background: 'rgba(4,24,51,.78)', border: '1px solid rgba(255,255,255,.22)' }}>
          <div style={{ display: 'flex', fontSize: 24, color: '#a9d8ff', letterSpacing: 1.4, marginBottom: 16 }}>{location.toUpperCase()}</div>
          <div style={{ display: 'flex', fontSize: 66, lineHeight: 1.05, fontWeight: 800, letterSpacing: -2, marginBottom: 22 }}>{project.name}</div>
          <div style={{ display: 'flex', fontSize: 27, color: '#e6f1ff', marginBottom: 22 }}>{configuration}</div>
          <div style={{ display: 'flex', fontSize: 40, color: '#ffffff', fontWeight: 800 }}>{price}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: 19, color: '#e5f1ff' }}>
          <div style={{ display: 'flex', maxWidth: '63%' }}>{rera}</div>
          <div style={{ display: 'flex', fontWeight: 800, letterSpacing: .7 }}>Speak to an Advisor · 88503 73012</div>
        </div>
      </div>
    </div>,
    { width: 1080, height: 1080 }
  );
}