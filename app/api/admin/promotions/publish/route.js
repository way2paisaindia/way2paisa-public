import { createClient } from '@supabase/supabase-js';

const instagramAccountId = process.env.INSTAGRAM_ACCOUNT_ID || '17841460118476853';
const graphVersion = process.env.INSTAGRAM_GRAPH_API_VERSION || 'v24.0';

function errorMessage(payload, fallback) {
  return payload?.error?.message || payload?.message || fallback;
}

function wait(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function waitForMediaContainer(graphRoot, containerId, accessToken) {
  for (let attempt = 1; attempt <= 8; attempt += 1) {
    const statusResponse = await fetch(graphRoot + '/' + containerId + '?fields=status_code,status&access_token=' + encodeURIComponent(accessToken));
    const statusPayload = await statusResponse.json().catch(() => ({}));
    const status = statusPayload.status_code || statusPayload.status || '';
    console.info('Instagram media container status', { attempt, status, responseOk: statusResponse.ok });
    if (status === 'FINISHED') return { ready: true };
    if (!statusResponse.ok || status === 'ERROR' || status === 'EXPIRED') {
      return { ready: false, error: errorMessage(statusPayload, 'Instagram could not process this creative.') };
    }
    await wait(2000);
  }
  return { ready: false, error: 'Instagram is still processing the creative. Please try publishing this draft again in a minute.' };
}

export async function POST(request) {
  try {
    const authorization = request.headers.get('authorization') || '';
    const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';
    if (!token) return Response.json({ error: 'Sign in as an active admin before publishing.' }, { status: 401 });

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { headers: { Authorization: authorization } },
    });
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    if (userError || !user) return Response.json({ error: 'Your admin session has expired. Please sign in again.' }, { status: 401 });

    const { data: admin } = await supabase.from('admin_profiles').select('id').eq('id', user.id).eq('active', true).maybeSingle();
    if (!admin) return Response.json({ error: 'Only active Way2Paisa admins can publish promotions.' }, { status: 403 });

    const { promotionId } = await request.json();
    if (!promotionId) return Response.json({ error: 'Promotion is required.' }, { status: 400 });

    const { data: promotion, error: promotionError } = await supabase
      .from('project_promotions')
      .select('id,project_id,caption,platforms,platform_post_urls,creative_image_url,projects(name,slug,active,verified)')
      .eq('id', promotionId)
      .maybeSingle();
    if (promotionError || !promotion) return Response.json({ error: 'Promotion not found or not available to this admin.' }, { status: 404 });
    if (!promotion.platforms?.includes('Instagram')) return Response.json({ error: 'Instagram is not selected for this promotion.' }, { status: 400 });
    if (!promotion.projects?.active || !promotion.projects?.verified) return Response.json({ error: 'Only verified active listings can be published.' }, { status: 400 });

    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    if (!accessToken) return Response.json({ error: 'Instagram publishing is not configured yet.' }, { status: 503 });

    const generatedCreativeUrl = new URL('/api/admin/promotion-creative', request.url);
    generatedCreativeUrl.searchParams.set('project', promotion.project_id);
    generatedCreativeUrl.searchParams.set('v', promotion.id);
    const creativeUrl = promotion.creative_image_url || generatedCreativeUrl.toString();

    const graphRoot = 'https://graph.instagram.com/' + graphVersion;
    const graphBase = graphRoot + '/' + instagramAccountId;
    const containerResponse = await fetch(graphBase + '/media', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ image_url: creativeUrl, caption: promotion.caption, access_token: accessToken }),
    });
    const container = await containerResponse.json().catch(() => ({}));
    console.info('Instagram media container request', { responseOk: containerResponse.ok, hasContainerId: Boolean(container.id), errorCode: container?.error?.code || null });
    if (!containerResponse.ok || !container.id) {
      const message = errorMessage(container, 'Instagram did not accept the creative.');
      await supabase.from('project_promotions').update({ publish_error: message }).eq('id', promotion.id);
      return Response.json({ error: message }, { status: 502 });
    }

    const containerState = await waitForMediaContainer(graphRoot, container.id, accessToken);
    if (!containerState.ready) {
      await supabase.from('project_promotions').update({ publish_error: containerState.error }).eq('id', promotion.id);
      return Response.json({ error: containerState.error }, { status: 502 });
    }

    const publishResponse = await fetch(graphBase + '/media_publish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ creation_id: container.id, access_token: accessToken }),
    });
    const published = await publishResponse.json().catch(() => ({}));
    console.info('Instagram media publish request', { responseOk: publishResponse.ok, hasPublishedId: Boolean(published.id), errorCode: published?.error?.code || null });
    if (!publishResponse.ok || !published.id) {
      const message = errorMessage(published, 'Instagram could not publish the creative.');
      await supabase.from('project_promotions').update({ publish_error: message }).eq('id', promotion.id);
      return Response.json({ error: message }, { status: 502 });
    }

    const detailsResponse = await fetch(graphRoot + '/' + published.id + '?fields=permalink&access_token=' + encodeURIComponent(accessToken));
    const details = await detailsResponse.json().catch(() => ({}));
    const permalink = details.permalink || '';
    const platformPostUrls = { ...(promotion.platform_post_urls || {}), Instagram: permalink || published.id };

    const { error: updateError } = await supabase.from('project_promotions')
      .update({ status: 'published', platform_post_urls: platformPostUrls, publish_error: null, approved_by: user.id, approved_at: new Date().toISOString() })
      .eq('id', promotion.id);
    if (updateError) return Response.json({ error: 'Instagram posted successfully, but its history could not be saved.' }, { status: 500 });

    return Response.json({ ok: true, postId: published.id, permalink });
  } catch (error) {
    console.error('Instagram promotion publishing failed', error);
    return Response.json({ error: 'Could not publish this promotion. Please try again.' }, { status: 500 });
  }
}