# Way2Paisa — 10 November 2026 Emaar photograph recovery / GoDaddy release audit

## User-visible confirmation and priority
Owner explicitly confirmed that live https://www.way2paisa.in/properties?market=Dubai **is displaying all Dubai listings** and **only Emaar listings are missing photographs**. Therefore the earlier crawler-cache '0 properties' result is stale and must no longer be treated as an active catalogue outage. No unrelated website indexing fix, Supabase credential change or hosting migration was attempted.

## Root cause isolated in main code
Supabase public catalogue includes **73 published Emaar-developed projects**; **71** use `uae-cms.emaar.com` for project hero and **277 active verified Emaar project_media rows** use the same source CDN. Only 2 Emaar published hero sources use other domains (Greencrest and Serro). The previous `app/lib/unavailable-project-media.js` classified all `uae-cms.emaar.com/uploads/...` and Emaar optimized images as known unavailable unconditionally, while `app/components/ListingImage.js` bypassed Way2Paisa's server image relay for those CMS URLs. That combination could show 'Project photograph temporarily unavailable' immediately even if a browser could fetch the developer photo.

## Implemented on GitHub main — code, NOT certified GoDaddy live
**PR #8** https://github.com/way2paisaindia/way2paisa-public/pull/8 merged (SHA `5b13c0f9e319256301866c90831a3ecac3effb6f`).
- Removes blanket Emaar CMS unavailability predicate **only for on-page photos** (social crawler previews still blocked where unverified).
- For each existing project-specific `https://uae-cms.emaar.com/uploads/...jpg/png/webp` URL, `ListingImage` first attempts source direct without a cross-site Referer and, on browser error, tries Emaar's first-party Next image route `https://www.emaar.com/_next/image?url=<encoded-source>&w=1200&q=75` built by a strict allowlist helper.
- Other same-project fallbacks remain, and if all attempts fail, neutral unavailable-photo placeholder stays; it never substitutes a developer logo, unrelated property photo, or random stock image.
- A pure helper restricts source to official HTTPS Emaar CMS `/uploads/` images; no unsafe generic proxy endpoint or arbitrary external URL feature.
- 11 helper assertions were run locally in Node and passed in the source review session.

**PR #9** https://github.com/way2paisaindia/way2paisa-public/pull/9 merged (SHA `5f346477c4439e0587c1af8c1f845fd5fccfb4f7`).
- The same no-referrer policy now applies both to direct original CMS photo and the official Emaar first-party optimized image fallback, not to other developers.
- Six read-back source assertions passed and files were verified in GitHub `main`; no full Next.js build or GoDaddy live HTTP image result was verified.

## Current image hosting and limitations
- Way2Paisa Supabase Storage `project-media` bucket contains **no Emaar images**; it has one other object. 277 verified active Emaar image records are URL references, not owned uploaded backup files.
- Emaar CDN/optimizer can independently return 403 or timeout due to anti-hotlink policies even after removing the website code block. All existing records and source copyrights/permission limitations remain unchanged; bulk rehosting Emaar marketing assets without authorization was NOT attempted.
- The system's container lacks external DNS connectivity; web tool couldn't fetch actual Emaar original or optimized image content nor fresh Way2Paisa live page (cache miss). No assertion that 71 images now actually load on GoDaddy is supported.
- Existing Supabase projects, prices, inventory and published statuses left unchanged. No emails, paid upgrades, DNS/GoDaddy changes or Cloudflare migration.

## Deploy GoDaddy Node.js Hosting (existing app: way2paisa-public)
Per https://www.godaddy.com/en-in/hosting/nodejs and https://developer.godaddy.com/en/docs/api-users/hosting/workflows/deploy-nodejs-app the current GoDaddy Node.js Hosting workflow has a PREVIEW and PUBLISH variant. GitHub repository connections may auto-sync source, but the actual GoDaddy connection/deployment state is not accessible via available connector APIs in this chat. The integrated tool catalogue has **no installed or installable GoDaddy connector**. No GoDaddy PAT/token should be pasted into chat and no unrelated migration is requested.

Release checklist for the existing app after pulling GitHub main SHA `5f346477`:
1. In GoDaddy Products → Node.js Hosting → Manage All, open the **existing** app `way2paisa-public`, not a new app/site.
2. Check code source/preview build points at GitHub main, commit `5f346477` or later; if GitHub auto-synced already, do not re-import duplicate apps. Rebuild preview if necessary.
3. Confirm PREVIEW app loads Mumbai and Dubai catalogue and images for `/projects/emaar-albero-dubai-creek-harbour` and `/projects/emaar-golf-trails`. Browser network panel should check HTTP status and `Content-Type:image/*` for direct CMS and official Emaar fallback routes.
4. Promote tested preview to **PUBLISH** using existing GoDaddy Node.js Hosting application, preserving existing Publish secrets, domain, SSL, enquiry functionality and live project catalogue.
5. Independently check live Emaar image cards, project hero and gallery in a normal/private browser, plus non-Emaar image regression; if Emaar still returns 403, the source policy needs permitted self-hosted project media and independent verified project-by-project image authorization, not arbitrary hotlinks.
6. Existing developer media source URLs are not sufficient evidence of license for rehosting; do not ingest into own CDN without permission.

## Future work
After Emaar image delivery is independently observed, continue fixing remaining incomplete original hero/gallery (e.g., Godrej Bliss, Emaar Harbour Gate distinct gallery image), then publish complete legally verified new projects with actually saleable units. Avoid delaying all new-project research solely due to the Emaar artwork issue, but do not weaken publication gates to satisfy quantity targets.
