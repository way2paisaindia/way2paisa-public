import { createClient } from '@supabase/supabase-js';

const instagramAccountId = process.env.INSTAGRAM_ACCOUNT_ID || '17841460118476853';
const instagramGraphVersion = process.env.INSTAGRAM_GRAPH_API_VERSION || 'v24.0';
const facebookGraphVersion = process.env.FACEBOOK_GRAPH_API_VERSION || 'v26.0';
const googleTokenEndpoint = 'https://oauth2.googleapis.com/token';

function errorMessage(payload, fallback) {
  return payload?.error?.message || payload?.message || fallback;
}

function instagramErrorMessage(payload, fallback) {
  const message = errorMessage(payload, fallback);
  if (/application request limit reached|rate limit|too many calls/i.test(message)) {
    return 'Instagram has temporarily rate-limited the Way2Paisa publishing app. Please wait about 60 minutes, then publish this same draft again. Do not create a new draft or repeatedly retry it.';
  }
  return message;
}

function wait(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function getGoogleAccessToken() {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('Google publishing is not configured yet. Connect the Google OAuth credentials in Vercel first.');
  }
  const response = await fetch(googleTokenEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
    cache: 'no-store',
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || !payload.access_token) throw new Error(errorMessage(payload, 'Google could not refresh the publishing connection.'));
  return payload.access_token;
}

async function waitForMediaContainer(graphRoot, containerId, accessToken, maxAttempts = 6) {
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const statusResponse = await fetch(graphRoot + '/' + containerId + '?fields=status_code,status&access_token=' + encodeURIComponent(accessToken));
    const statusPayload = await statusResponse.json().catch(() => ({}));
    const status = statusPayload.status_code || statusPayload.status || '';
    console.info('Instagram media container status', { attempt, status, responseOk: statusResponse.ok });
    if (status === 'FINISHED') return { ready: true };
    if (!statusResponse.ok || status === 'ERROR' || status === 'EXPIRED') {
      return { ready: false, error: instagramErrorMessage(statusPayload, 'Instagram could not process this image or video.') };
    }
    if (attempt < maxAttempts) await wait(5000);
  }
  return { ready: false, error: 'Instagram is still processing the creative. Please wait one minute, then publish this same draft again.' };
}

async function publishInstagram({ promotion, request, isReel }) {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!accessToken) throw new Error('Instagram publishing is not configured yet.');

  const generatedCreativeUrl = new URL('/api/admin/promotion-creative', request.url);
  generatedCreativeUrl.searchParams.set('project', promotion.project_id);
  generatedCreativeUrl.searchParams.set('v', promotion.id);
  const mediaUrl = isReel ? promotion.creative_video_url : (promotion.creative_image_url || generatedCreativeUrl.toString());
  const graphRoot = 'https://graph.instagram.com/' + instagramGraphVersion;
  const graphBase = graphRoot + '/' + instagramAccountId;
  const containerResponse = await fetch(graphBase + '/media', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(isReel
      ? { media_type: 'REELS', video_url: mediaUrl, caption: promotion.caption, share_to_feed: 'true', access_token: accessToken }
      : { image_url: mediaUrl, caption: promotion.caption, access_token: accessToken }),
  });
  const container = await containerResponse.json().catch(() => ({}));
  if (!containerResponse.ok || !container.id) throw new Error(instagramErrorMessage(container, 'Instagram did not accept this image or video.'));

  const containerState = await waitForMediaContainer(graphRoot, container.id, accessToken, isReel ? 6 : 4);
  if (!containerState.ready) throw new Error(containerState.error);

  const publishResponse = await fetch(graphBase + '/media_publish', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ creation_id: container.id, access_token: accessToken }),
  });
  const published = await publishResponse.json().catch(() => ({}));
  if (!publishResponse.ok || !published.id) throw new Error(instagramErrorMessage(published, 'Instagram could not publish this image or video.'));

  const detailsResponse = await fetch(graphRoot + '/' + published.id + '?fields=permalink&access_token=' + encodeURIComponent(accessToken));
  const details = await detailsResponse.json().catch(() => ({}));
  return { id: published.id, permalink: details.permalink || '' };
}

async function publishFacebook({ promotion, request, isVideo }) {
  const pageId = process.env.FACEBOOK_PAGE_ID;
  const accessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  if (!pageId || !accessToken) throw new Error('Facebook Page publishing is not configured yet.');

  const generatedCreativeUrl = new URL('/api/admin/promotion-creative', request.url);
  generatedCreativeUrl.searchParams.set('project', promotion.project_id);
  generatedCreativeUrl.searchParams.set('v', promotion.id);
  const mediaUrl = isVideo ? promotion.creative_video_url : (promotion.creative_image_url || generatedCreativeUrl.toString());
  const endpoint = 'https://graph.facebook.com/' + facebookGraphVersion + '/' + pageId + (isVideo ? '/videos' : '/photos');
  const payload = isVideo
    ? { file_url: mediaUrl, description: promotion.caption, access_token: accessToken }
    : { url: mediaUrl, caption: promotion.caption, access_token: accessToken };
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(payload),
  });
  const published = await response.json().catch(() => ({}));
  if (!response.ok || !published.id) throw new Error(errorMessage(published, 'Facebook could not publish this image or video.'));

  const detailsResponse = await fetch('https://graph.facebook.com/' + facebookGraphVersion + '/' + published.id + '?fields=permalink_url&access_token=' + encodeURIComponent(accessToken));
  const details = await detailsResponse.json().catch(() => ({}));
  return { id: published.id, permalink: details.permalink_url || 'https://www.facebook.com/' + published.id };
}

async function publishYouTube({ promotion }) {
  if (!promotion.creative_video_url) throw new Error('Upload an MP4 project video before selecting YouTube.');
  const accessToken = await getGoogleAccessToken();
  const videoResponse = await fetch(promotion.creative_video_url, { cache: 'no-store' });
  if (!videoResponse.ok) throw new Error('The uploaded video could not be retrieved for YouTube publishing.');
  const contentType = videoResponse.headers.get('content-type') || 'video/mp4';
  const video = new Blob([await videoResponse.arrayBuffer()], { type: contentType });
  const title = String(promotion.headline || promotion.projects?.name || 'Way2Paisa property update').replace(/\s+/g, ' ').trim().slice(0, 100);
  const description = String(promotion.caption || '').slice(0, 5000);
  const metadata = {
    snippet: {
      title: title || 'Way2Paisa property update',
      description,
      categoryId: '22',
    },
    status: {
      privacyStatus: process.env.YOUTUBE_PRIVACY_STATUS || 'public',
      selfDeclaredMadeForKids: false,
    },
  };
  const form = new FormData();
  form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }), 'metadata.json');
  form.append('video', video, 'way2paisa-project-video.mp4');
  const response = await fetch('https://www.googleapis.com/upload/youtube/v3/videos?uploadType=multipart&part=snippet,status', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + accessToken },
    body: form,
    cache: 'no-store',
  });
  const published = await response.json().catch(() => ({}));
  if (!response.ok || !published.id) throw new Error(errorMessage(published, 'YouTube could not upload this video.'));
  return { id: published.id, permalink: 'https://www.youtube.com/watch?v=' + published.id };
}

async function publishGoogleBusiness({ promotion, request }) {
  const locationName = String(process.env.GOOGLE_BUSINESS_LOCATION_NAME || '').replace(/^\/+|\/+$/g, '');
  if (!locationName) throw new Error('Google Business is not configured yet. Add the Google Business location name in Vercel first.');
  const accessToken = await getGoogleAccessToken();
  const generatedCreativeUrl = new URL('/api/admin/promotion-creative', request.url);
  generatedCreativeUrl.searchParams.set('project', promotion.project_id);
  generatedCreativeUrl.searchParams.set('v', promotion.id);
  const imageUrl = promotion.creative_image_url || generatedCreativeUrl.toString();
  const listingUrl = new URL('/projects/' + promotion.projects.slug, request.url).toString();
  const body = {
    languageCode: 'en',
    summary: String(promotion.caption || '').slice(0, 1500),
    topicType: 'STANDARD',
    callToAction: { actionType: 'LEARN_MORE', url: listingUrl },
    media: [{ sourceUrl: imageUrl }],
  };
  const response = await fetch('https://mybusiness.googleapis.com/v4/' + locationName + '/localPosts', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + accessToken, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    cache: 'no-store',
  });
  const published = await response.json().catch(() => ({}));
  if (!response.ok || !published.name) throw new Error(errorMessage(published, 'Google Business could not publish this post.'));
  return { id: published.name, permalink: published.searchUrl || 'https://business.google.com/' };
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
      .select('id,project_id,caption,headline,platforms,platform_post_urls,creative_image_url,creative_video_url,projects(name,slug,active,verified)')
      .eq('id', promotionId)
      .maybeSingle();
    if (promotionError || !promotion) return Response.json({ error: 'Promotion not found or not available to this admin.' }, { status: 404 });
    if (!promotion.projects?.active || !promotion.projects?.verified) return Response.json({ error: 'Only verified active listings can be published.' }, { status: 400 });

    const isVideo = Boolean(promotion.creative_video_url);
    const wantsInstagram = isVideo ? promotion.platforms?.includes('Instagram Reel') : promotion.platforms?.includes('Instagram');
    const wantsFacebook = promotion.platforms?.includes('Facebook');
    const wantsYouTube = isVideo && promotion.platforms?.includes('YouTube');
    const wantsGoogleBusiness = !isVideo && promotion.platforms?.includes('Google Business');
    const wantsWebsite = isVideo && promotion.platforms?.includes('Website');
    if (!wantsInstagram && !wantsFacebook && !wantsYouTube && !wantsGoogleBusiness) {
      return Response.json({ error: isVideo ? 'Select Instagram Reel, Facebook, or YouTube before publishing this video.' : 'Select Instagram, Facebook, or Google Business before publishing this image.' }, { status: 400 });
    }

    const results = {};
    const errors = {};
    if (wantsInstagram && !promotion.platform_post_urls?.Instagram) {
      try { results.Instagram = await publishInstagram({ promotion, request, isReel: isVideo }); }
      catch (error) { errors.Instagram = error.message || 'Instagram could not publish this promotion.'; }
    } else if (promotion.platform_post_urls?.Instagram) {
      results.Instagram = { id: promotion.platform_post_urls.Instagram, permalink: promotion.platform_post_urls.Instagram };
    }

    if (wantsFacebook && !promotion.platform_post_urls?.Facebook) {
      try { results.Facebook = await publishFacebook({ promotion, request, isVideo }); }
      catch (error) { errors.Facebook = error.message || 'Facebook could not publish this promotion.'; }
    } else if (promotion.platform_post_urls?.Facebook) {
      results.Facebook = { id: promotion.platform_post_urls.Facebook, permalink: promotion.platform_post_urls.Facebook };
    }

    if (wantsYouTube && !promotion.platform_post_urls?.YouTube) {
      try { results.YouTube = await publishYouTube({ promotion }); }
      catch (error) { errors.YouTube = error.message || 'YouTube could not publish this video.'; }
    } else if (wantsYouTube && promotion.platform_post_urls?.YouTube) {
      results.YouTube = { id: promotion.platform_post_urls.YouTube, permalink: promotion.platform_post_urls.YouTube };
    }

    if (wantsGoogleBusiness && !promotion.platform_post_urls?.['Google Business']) {
      try { results['Google Business'] = await publishGoogleBusiness({ promotion, request }); }
      catch (error) { errors['Google Business'] = error.message || 'Google Business could not publish this post.'; }
    } else if (wantsGoogleBusiness && promotion.platform_post_urls?.['Google Business']) {
      results['Google Business'] = { id: promotion.platform_post_urls['Google Business'], permalink: promotion.platform_post_urls['Google Business'] };
    }

    const platformPostUrls = { ...(promotion.platform_post_urls || {}) };
    for (const [platform, result] of Object.entries(results)) platformPostUrls[platform] = result.permalink || result.id;
    if (wantsWebsite) {
      const sourceUrl = platformPostUrls.Instagram || platformPostUrls.YouTube || platformPostUrls.Facebook;
      if (!sourceUrl) {
        errors.Website = 'Website Reel Gallery needs one successfully published Instagram Reel, YouTube video, or Facebook video.';
      } else {
        const { data: existing, error: existingError } = await supabase.from('project_media').select('id').eq('project_id', promotion.project_id).eq('media_type', 'video').eq('source_url', sourceUrl).maybeSingle();
        if (existingError) {
          errors.Website = existingError.message || 'The Website Reel Gallery could not be checked.';
        } else if (!existing) {
          const { data: latest, error: latestError } = await supabase.from('project_media').select('sort_order').eq('project_id', promotion.project_id).eq('media_type', 'video').order('sort_order', { ascending: false }).limit(1).maybeSingle();
          if (latestError) {
            errors.Website = latestError.message || 'The Website Reel Gallery could not be prepared.';
          } else {
            const { error: galleryError } = await supabase.from('project_media').insert({project_id:promotion.project_id,image_url:sourceUrl,source_url:sourceUrl,alt_text:promotion.projects?.name||'Way2Paisa project video',media_type:'video',sort_order:(Number(latest?.sort_order)||0)+1,active:true,verified_at:new Date().toISOString(),license_status:'admin-approved social video'});
            if (galleryError) errors.Website = galleryError.message || 'The published video could not be added to the Website Reel Gallery.';
          }
        }
        if (!errors.Website) {
          results.Website = { permalink: new URL('/projects/' + promotion.projects.slug, request.url).toString() };
          platformPostUrls.Website = results.Website.permalink;
        }
      }
    }
    const errorText = Object.entries(errors).map(([platform, message]) => platform + ': ' + message).join(' | ');
    const { error: updateError } = await supabase.from('project_promotions')
      .update({ status: Object.keys(results).length ? 'published' : 'draft', platform_post_urls: platformPostUrls, publish_error: errorText || null, approved_by: user.id, approved_at: new Date().toISOString() })
      .eq('id', promotion.id);
    if (updateError) return Response.json({ error: 'Publishing completed, but its history could not be saved.' }, { status: 500 });
    if (!Object.keys(results).length) return Response.json({ error: errorText || 'No selected platform could publish this promotion.' }, { status: 502 });

    return Response.json({ ok: true, results, errors, platformPostUrls });
  } catch (error) {
    console.error('Promotion publishing failed', error);
    return Response.json({ error: 'Could not publish this promotion. Please try again.' }, { status: 500 });
  }
}
