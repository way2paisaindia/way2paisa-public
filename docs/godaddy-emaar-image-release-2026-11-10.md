# Way2Paisa — Existing GoDaddy App: Emaar image release and QA

**Date:** 10 November 2026. **Scope:** Repair missing Emaar project photographs on the *existing* GoDaddy-hosted Way2Paisa website. Do not migrate hosting, change DNS, create another app, buy hosting, or alter project data.

## Completed source work

1. PR **#8** (merged, https://github.com/way2paisaindia/way2paisa-public/pull/8) removes the application-level blanket ban on `uae-cms.emaar.com/uploads/` photographs. The browser tries Emaar's original verified photo, then Emaar's own first-party image optimization endpoint. Unusable sources fall back to the existing honest **Project photograph temporarily unavailable** panel; never display a generic realty stock photo, another project's image or the developer logo.
2. PR **#11** (merged, https://github.com/way2paisaindia/way2paisa-public/pull/11) applies `referrerPolicy='no-referrer'` to all official direct/optimized Emaar requests, including same-project verified-gallery fallback images, not merely the first hero. Invalid/forged URL hosts are excluded from first-party fallback.
3. Source is committed to both `main` and `fix/godaddy-preview-hydration` (the historically GoDaddy-related source branch). The exact branch that the GoDaddy application imports has **not** been independently read from GoDaddy; do not assume that merging `main` pushed to the hosting production build.
4. The repo test entrypoint is `node scripts/test-emaar-image-fallback.mjs`. Local Node tests passed 11 grouped URL-guard assertions and 8 referrer-delivery assertions. Tests verify **URL selection/security**, not that Emaar's remote CDN actually returned an image.
5. Connected Supabase audit: **73** published Emaar projects, **71** using `uae-cms.emaar.com` hero photographs; **277** active project media records using that host, for **348 unique assignments** (not 348 unique image files). All 348 URLs fit permitted `/uploads/*.{jpg,jpeg,png,webp}` patterns. No source media files reside in the project-media Supabase Storage bucket, so we cannot truthfully assert image files are copied/hosted locally.
6. Original URLs and internal source citations remain unchanged. **No Supabase write**, project unpublishing, price change, domain, SSL, notification, social channel, CRM, or hosting update was needed for the code fix.

## Release via the EXISTING GoDaddy Node.js Hosting app (web UI)

Official current GoDaddy guide: https://www.godaddy.com/en-ca/help/deploy-my-cursor-or-claude-app-with-godaddy-nodejs-hosting-42908 ; GoDaddy app/variant concepts: https://developer.godaddy.com/en/docs/api-users/hosting/concepts .

1. Go to https://www.godaddy.com/en-in/hosting/nodejs and select **My Apps** at top right. The regular GoDaddy **My Products** page is not necessarily the Node.js app list. If already signed in, select the Way2Paisa app whose existing published URL serves https://www.way2paisa.in. **Do not Create App**, **Attach Domain**, **Change Hosting Plan**, **Change Secrets**, or **Switch to Cloudflare**.
2. Check what branch the app is connected to. Both `main` and `fix/godaddy-preview-hydration` have the image fix as of this documentation. Use the *existing configured branch* to avoid changing other features.
3. If **Pull from GitHub** is available, select it to import the latest existing-branch code to **preview**. The preview and published variants are different; GitHub merging alone is not GoDaddy publishing. If it was ZIP-deployed, do not import an arbitrary partial ZIP; the *whole existing Next.js app* plus package.json must be imported, excluding `.env`/secrets, `node_modules`, `.git`. Do not accidentally reset production config.
4. Open the private **preview** and confirm (a) homepage loads; (b) `/properties?market=Dubai` displays cards; (c) at least 3 image samples (Emaar Golf Trails, Creek Bay, Albero) show real, correct project visuals; (d) each project's Gallery opens correct images; (e) Mumbai cards remain normal; (f) enquiry, CRM login, and social links are unaffected.
5. For image failure diagnosis, open Firefox Developer Tools > Network, filter `Img`, reload the preview and check the failed image request's HTTP status: `uae-cms.emaar.com` and `www.emaar.com/_next/image`. HTTP 403/404/422, timeout and CSP errors mean different root causes; a placeholder means attempts failed, not that the website's catalogue is empty. Record only URLs and status codes, **never credentials**.
6. **Publish Now** on the same app **only if the preview checks pass**. Afterwards, retest public `https://www.way2paisa.in/properties?market=Dubai` and `/projects/emaar-golf-trails`. Verify images in a new private tab to avoid browser caches.
7. If Emaar blocks both original and first-party optimizer, **do not repeatedly publish the same fix**. Keep the neutral photo-unavailable panel and use separately verified, project-specific, marketing-authorized replacement files on an approved stable host in a later controlled batch. Do not copy third-party images without usage rights, assume Emaar permits rehosting, or show the same photo on different unrelated projects.

## Alternative GoDaddy CLI/API (authorized operator only; not performed by ChatGPT in this session)

GoDaddy has an official `gddy` CLI and Hosting API supporting the same existing app. https://www.godaddy.com/resources/news/deploy-a-node-js-app-to-godaddy-from-your-terminal-or-let-your-coding-agent-do-it and https://developer.godaddy.com/en/docs/api-users/hosting/workflows/deploy-nodejs-app . The existing app can accept an updated ZIP (source import to preview) followed by a publish of that preview. A GoDaddy authenticated app session or scoped Personal Access Token is needed; none was connected to this ChatGPT session. **Do not disclose tokens in chat or commit them to GitHub**.

## Final status at document creation

GitHub code: **committed and verified** on `main` and GoDaddy-related branch.
Local URL/referrer tests: **passed**.
Emaar live upstream HTTP successful response: **not verified** due web cache misses and disabled external DNS in the execution sandbox.
GoDaddy private preview refresh: **not performed**.
GoDaddy production publish: **not performed**.
**Do not mark image issue resolved on the production website until browser-tested.**
