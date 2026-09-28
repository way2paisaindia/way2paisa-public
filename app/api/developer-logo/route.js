import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

export async function GET(request) {
  const name = new URL(request.url).searchParams.get('name')?.trim();

  if (!name) {
    return new NextResponse('Developer name is required.', { status: 400 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  );
  const { data: developer } = await supabase
    .from('developers')
    .select('logo_url')
    .eq('name', name)
    .maybeSingle();

  const logoUrl = developer?.logo_url;
  if (!logoUrl || !/^https:\/\//i.test(logoUrl)) {
    return new NextResponse('Logo not found.', { status: 404 });
  }

  try {
    const response = await fetch(logoUrl, {
      headers: { 'User-Agent': 'Way2Paisa logo renderer' },
      redirect: 'follow',
      next: { revalidate: 604800 },
    });

    if (!response.ok) {
      return new NextResponse('Logo source unavailable.', { status: 502 });
    }

    const contentType = response.headers.get('content-type') || 'image/png';
    if (!contentType.startsWith('image/')) {
      return new NextResponse('Invalid logo format.', { status: 415 });
    }

    return new NextResponse(await response.arrayBuffer(), {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400',
      },
    });
  } catch {
    return new NextResponse('Logo source unavailable.', { status: 502 });
  }
}
