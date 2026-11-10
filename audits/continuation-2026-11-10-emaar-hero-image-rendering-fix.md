# Way2Paisa — 10 November 2026: Emaar photographs not appearing on GoDaddy

## Owner-supplied production fact
- Owner explicitly confirms **https://www.way2paisa.in/properties?market=Dubai displays the full Dubai property catalogue**. Only Emaar projects' photos are absent. Do not recycle three-week-old Google crawl "0 projects/Failed to fetch" claims as live outage reports.

## Root cause confirmed from GitHub main
- `app/lib/unavailable-project-media.js` previously classified ALL `https://uae-cms.emaar.com/uploads/*` hero/gallery source URLs as already unavailable and also rejected `https://www.emaar.com/_next/image?url=https%3A%2F%2Fuae-cms...*` as known-unavailable.
- `app/components/ListingImage.js` recognized Emaar CMS sources and deliberately disabled project-server image relaying; if the only available image was marked known-unavailable, it rendered the neutral project-photograph-not-available placeholder at once **without a browser image request**.
- Database count at 10 Nov 2026: **73 published Emaar projects**, **71** have primary hero source host `uae-cms.emaar.com`, and **277** active Emaar `project_media` rows have the same source host.
- This code logic definitively explains suppression of CMS photos regardless of their present source-host availability. There can ALSO be Emaar hotlink/403 problems; the new approach mitigates but does not prove images will load in all visitor browsers. Earlier server-side CMS image fetches failed; no first-party user-browser test is available through connected tools.
- `storage.objects` bucket `project-media` contains only one existing file with no Emaar-named asset; there are no bulk cached licensed Emaar files available locally. Copying unlicensed images from property portals, forging project imagery or swapping developer logos would be incorrect.

## Fix implemented and MERGED into GitHub main
PR **#8**, https://github.com/way2paisaindia/way2paisa-public/pull/8 , was created and merged into `main`, merge SHA **5b13c0f9e319256301866c90831a3ecac3effb6f**. Files were fetched back from `main` and verified.

1. `app/lib/unavailable-project-media.js`: removed the blanket Emaar CMS/optimizer host blacklist from **on-page project-image** eligibility, so Emaar photography gets a real loading attempt. Kept these hosts blocked for *social-image crawler metadata* via `isKnownUnavailableSocialPreview`, where hotlink denial has previously caused inaccurate social previews.
2. `app/lib/official-emaar-image-fallback.mjs`: pure helper creates a strictly restricted `https://www.emaar.com/_next/image?url=...&w=1200&q=75` alternative for a source whose protocol is HTTPS, exact host `uae-cms.emaar.com`, path starts `/uploads/` and extension is JPEG/PNG/WEBP. The developer already uses this Emaar first-party image optimizer in published project/gallery addresses; only first-party Emaar pictures are eligible.
3. `app/components/ListingImage.js`: tries original Emaar CMS URL with no-referrer, falls back on Emaar official Next image delivery, then (where present) other previously approved photos for the **same project**. Keeps unbranded project-photograph unavailable fallback for failed images. Other developers retain their existing behaviour.
4. `scripts/test-emaar-image-fallback.mjs`: Node `assert` tests cover official URL construction, w/q params, suspicious hosts/paths, invalid extension, non-HTTPS URL, NULL input and a positive WEBP example. Equivalent local unit tests passed using Node 22 and GitHub files were fetched to verify contents. Full Next.js build, actual Emaar server response and GoDaddy visitor-browser outcome **not yet verified**.

GitHub merged and verified; NO production GoDaddy publish was triggered by this connector call. GitHub commit workflow lookup reported no workflow runs for this merge SHA. Do not claim deployed or cured on production just because main changed.

## GoDaddy publication route
- Prior user-context GoDaddy procedure was **Products → Node.js Hosting → Manage All → way2paisa-public**, then **Sync from Preview**, and **Publish**. This appears to be a manual publish operation; direct GoDaddy connector/control-panel access is unavailable in this conversation, and no GoDaddy-specific plugin was found in app/plugin discovery. Do not press Publish unless the Preview/build actually contains merge commit `5b13c0f9e319256301866c90831a3ecac3effb6f` and checks pass.
- Once deployed, independently test the Emaar images in the live GoDaddy browser (examples Emaar Albero, Golf Trails, Creek Bay), their gallery thumbs and lightbox, and a non-Emaar Dubai listing. In DevTools Network, check image HTTP statuses and content-type for Emaar CMS and `www.emaar.com/_next/image` requests.
- If both image origins return 403/HTML, obtain project-specific licensed developer marketing assets and host them in Way2Paisa's media bucket (no blanket hotlink bypass). Update only properly matched project photos, avoid unauthorized watermarked reseller photos. At current stage do not claim every Emaar image is restored.

## Unchanged project publication baseline
- Published projects **681**, active inventory **2413**, active media **3174**.
- No project images, rights, project prices, inventory, active/published statuses, DNS, GoDaddy billing/hosting or marketing credentials changed. No external emails or outreach.
- New projects published in this cycle: **0**; purpose was to remedy the blocking issue reported by the owner and prepare the live-catalogue media to actually display, rather than spending a cycle on new project count.
