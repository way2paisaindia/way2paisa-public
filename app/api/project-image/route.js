import sharp from 'sharp';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const projectIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const maxInputBytes = 15 * 1024 * 1024;

function safeUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.toString() : null;
  } catch {
    return null;
  }
}

// Fetches only the approved hero image already attached to a verified project.
// The browser never supplies an arbitrary remote URL.
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get('project') || '';
  if (!projectIdPattern.test(projectId)) return new Response('Invalid project.', { status: 400 });

  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!base || !key) return new Response('Image service is not configured.', { status: 500 });

  const projectQuery = new URL(base + '/rest/v1/projects');
  projectQuery.searchParams.set('select', 'hero_image_url,overview_source_url');
  projectQuery.searchParams.set('id', 'eq.' + projectId);
  projectQuery.searchParams.set('active', 'eq.true');
  projectQuery.searchParams.set('verified', 'eq.true');
  const projectResponse = await fetch(projectQuery, {
    headers: { apikey: key, Authorization: 'Bearer ' + key },
    cache: 'no-store',
  });
  const projects = await projectResponse.json().catch(() => []);
  const project = Array.isArray(projects) ? projects[0] : null;
  const source = safeUrl(project?.hero_image_url);
  if (!source) return new Response('Verified project image not found.', { status: 404 });

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    const imageResponse = await fetch(source, {
      signal: controller.signal,
      headers: {
        Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'User-Agent': 'Mozilla/5.0 (compatible; Way2PaisaMedia/1.0)',
        ...(safeUrl(project?.overview_source_url) ? { Referer: safeUrl(project.overview_source_url) } : {}),
      },
      cache: 'no-store',
    });
    clearTimeout(timeout);
    const declaredSize = Number(imageResponse.headers.get('content-length') || 0);
    if (!imageResponse.ok || (declaredSize && declaredSize > maxInputBytes)) return new Response('Project image is unavailable.', { status: 422 });
    const buffer = Buffer.from(await imageResponse.arrayBuffer());
    if (!buffer.length || buffer.length > maxInputBytes) return new Response('Project image is unavailable.', { status: 422 });
    const jpeg = await sharp(buffer, { limitInputPixels: 40000000 })
      .rotate()
      .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 88, mozjpeg: true })
      .toBuffer();
    return new Response(jpeg, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=3600, s-maxage=604800, stale-while-revalidate=86400',
        'Content-Length': String(jpeg.length),
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch {
    return new Response('Project image is unavailable.', { status: 422 });
  }
}
