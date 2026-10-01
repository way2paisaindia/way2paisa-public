import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

function googleConfigured() {
  return Boolean(
    process.env.GOOGLE_OAUTH_CLIENT_ID &&
    process.env.GOOGLE_OAUTH_CLIENT_SECRET &&
    process.env.GOOGLE_OAUTH_REFRESH_TOKEN
  );
}

export async function GET(request) {
  const authorization = request.headers.get('authorization') || '';
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';
  if (!token) return Response.json({ error: 'Sign in as an active admin before viewing connections.' }, { status: 401 });

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: authorization } },
  });
  const { data: { user }, error: userError } = await supabase.auth.getUser(token);
  if (userError || !user) return Response.json({ error: 'Your admin session has expired. Please sign in again.' }, { status: 401 });
  const { data: admin } = await supabase.from('admin_profiles').select('id').eq('id', user.id).eq('active', true).maybeSingle();
  if (!admin) return Response.json({ error: 'Only active Way2Paisa admins can view publishing connections.' }, { status: 403 });

  const googleReady = googleConfigured();
  return Response.json({
    connections: {
      Instagram: Boolean(process.env.INSTAGRAM_ACCESS_TOKEN && process.env.INSTAGRAM_ACCOUNT_ID),
      'Instagram Reel': Boolean(process.env.INSTAGRAM_ACCESS_TOKEN && process.env.INSTAGRAM_ACCOUNT_ID),
      Facebook: Boolean(process.env.FACEBOOK_PAGE_ACCESS_TOKEN && process.env.FACEBOOK_PAGE_ID),
      YouTube: googleReady,
      'Google Business': googleReady && Boolean(process.env.GOOGLE_BUSINESS_LOCATION_NAME),
    },
  });
}
