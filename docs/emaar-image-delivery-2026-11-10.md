# Way2Paisa: Emaar project photography — deployment and validation (10 November 2026)

## Verified source inventory, not a live-browser claim
- **73 published Emaar projects** in connected Supabase.
- **71 Emaar hero URLs** and **277 active gallery/media URLs** on `https://uae-cms.emaar.com/uploads/`.
- Every one of those **348 URLs** matches the restricted first-party fallback converter (project-specific original JPEG/PNG/WebP file; no user-supplied arbitrary URL).
- Remaining 2 Emaar heroes are project-related third-party hosts; unchanged.
- Existing galleries and alt text retained. No guessed images, logos-as-hero, image copying or rights assumptions.
- User confirms Dubai listings and GoDaddy property catalogue **already display correctly**; previous old web search cache "0 projects / Failed to fetch" is NOT a present diagnosis.

## Source fix already merged to `main` (PR #8)
- `app/lib/unavailable-project-media.js` previously **blocked every Emaar CMS photo unconditionally**, a certain application-level obstacle. The fix stops treating all on-page images as dead while preserving social-preview crawler guards.
- `app/components/ListingImage.js` now first tries the exact original Emaar CMS image with `referrerPolicy=no-referrer`, then the equivalent **Emaar official site** `https://www.emaar.com/_next/image?url=<original>&w=1200&q=75`.
- If neither is accessible it displays the existing neutral Way2Paisa no-image placeholder. It never substitutes a developer logo or unrelated photograph.
- Existing image relay `/api/project-image` remains available for other providers; no expensive server proxying of Emaar is introduced.
- Initial helper source and safety URL test: `node scripts/test-emaar-image-fallback.mjs` (valid image host/path; denies unrelated host, HTTP, non-image, spoofed domains).

## Follow-up patch staged in `fix/emaar-gallery-fallback-diagnostics-2026-11-10`
- On project details, gallery URLs passed as approved same-project `fallbackSources` are now tried **both directly and through Emaar's own optimizer**, not just as raw CMS URLs, bounded to six alternatives. This helps when one original project image is down but another project gallery rendering still works.
- A zero-secrets, zero-mutations diagnostic script `scripts/diagnose-emaar-images.mjs` probes three representative hero sources directly and by official Emaar optimizer, reporting HTTP status/content type/image-byte signature:
  ```sh
  npm run test:emaar-images
  npm run diagnose:emaar-images
  ```
  Run the diagnostics **from the same hosting environment as GoDaddy Node runtime** to test server-side network access; that is not equivalent to an end-user browser. If browser hotlinking differs from server network, inspect Developer Tools > Network on live Dubai listings.
- Diagnostic script does **not** download full files, use a private API key, mutate Supabase, upload assets, change DNS, switch hosting or send emails.
- Our ChatGPT command environment returned DNS error `EAI_AGAIN` for the public sites, so it cannot certify Emaar remote image byte success on GoDaddy. This is a **tool runtime restriction**, not evidence GoDaddy DNS or the customer site is failing.

## GoDaddy release boundary
- GitHub `main` was updated by merging PR #8 at commit `5b13c0f9e319256301866c90831a3ecac3effb6f`. No connected GoDaddy deployment API, repository auto-deploy workflow, runtime SSH/SFTP or host log access was available in this session.
- **Do not claim the fix is live** just because GitHub merged. Production GoDaddy must use a deployment of current `main`, with the original environment variables and working Node.js Next runtime. No settings/hosting changes are required for the code change itself.
- Minimal post-deploy browser checks:
  1. Open `https://www.way2paisa.in/properties?market=Dubai`; check Emaar Golf Trails, Emaar Silva, Emaar Valo cards.
  2. Open `https://www.way2paisa.in/projects/emaar-golf-trails` and `/projects/emaar-silva-dubai-creek-harbour`; check hero and three different approved gallery images.
  3. In browser Network tab, compare HTTP response to raw `uae-cms.emaar.com/uploads/` vs `www.emaar.com/_next/image`. If both fail (403/404/HTML), project data/images remain intact; replacement requires stable approved project-specific assets and host testing.
  4. Verify a non-Emaar Mumbai project still displays its image; ensure no unrelated photo/duplicate rendered.

## Known blocker / permanent fix
- **A code fallback is not a guaranteed image delivery fix.** Emaar can block third-party displays or their first-party image optimizer can deny remote calls. Long-term stable solution is licensed project-specific photos uploaded to Way2Paisa-owned storage with duplicate checks, permitted reuse rights and actual browser verification.
- Supabase `project-media` bucket currently contains no Emaar-named uploaded photos; do not bulk-download/copy copyrighted originals without usage authorization.
- Preserve existing published projects, stock and prices until directly supported evidence warrants changes.
