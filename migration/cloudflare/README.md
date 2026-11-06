# Way2Paisa — zero-subscription static-first Cloudflare migration (isolated branch)

**Status: IN PREPARATION — NO CUSTOM DOMAIN CUTOVER.** This branch is deliberately separate from `main` so no active Vercel deployments, project records, DNS or live leads are altered.

## Why this architecture

- **Cloudflare Pages Free** serves static HTML, CSS, JS and images without metered Workers CPU on those requests. Official limits as of Nov 2026: 500 builds/month, 20,000 static assets/deployment, 25 MiB per file, 100 custom domains/site; no guaranteed permanence or unlimited function requests. Cloudflare says static assets are free and unlimited, but acceptable-use terms still apply.
- Avoid Cloudflare Workers Free rendering Next.js SSR for every page; Workers Free has a **10 ms CPU per dynamic request** and 100,000 dynamic requests/day.
- Preserve the existing Supabase source of truth; do not clone/simplify published price or inventory data, or inject internal source/enrichment remarks.
- **Build-time read-only export** of all active, verified, complete projects, active inventory and verified active project-media, one static canonical HTML page per slug with SEO, structured data and sitemap. Public filtering can run in browser from a bounded exported JSON catalogue. No business database credentials in browser.
- **Pages Functions only for privileged operations**, such as `/api/leads`. Keep secrets in encrypted Cloudflare dashboard bindings; validate all inputs and avoid logging PII. Do not activate without a real save-and-notification acceptance test.
- Preserve administrative CRM, authentication and Promotion Studio through a **separately tested authenticated static admin bundle plus vetted Cloudflare Functions/Supabase Edge Functions**; do not cut the production site over while any admin action is missing. Existing main admin talks to Supabase RLS via client, but Promotion Studio has numerous server-only routes requiring a port.
- Preserve exact existing project slugs, canonical host, all high-intent guide and intent URLs, robots/sitemap, publicly linked legal/finance pages, WhatsApp CTA and lead attribution. Do not rely on Google reindexing or domain redirects for basic URL equivalence.
- The GoDaddy nameservers `ns05.domaincontrol.com` and `ns06.domaincontrol.com` currently control the domain; Vercel is only an externally pointed hosting target. **Do not change those nameservers or any DNS A/CNAME** until the alternate hostname and end-to-end tests pass.
- All new media use only existing approved/verified first-party DB assets, directly served from approved source or a preauthorized local asset; no unauthorized hotlink proxies or invented photos. Known dead/blocked images fall back honestly.

## Current production source baseline (6 Nov 2026)

- GitHub: `way2paisaindia/way2paisa-public`, Next.js 15, React 19, Supabase-backed project catalogue and CRM. `main` remains live.
- Supabase project ref `dqoxrsywknsgkxrdrxep`; **679 fully published projects**, **2,409 active inventory records**, **3,173 active media records**. Counts must be checked afresh just before cutover.
- 6 major Next API families include leads/notifications, image relay (Sharp), FX, developer logos and Promotion Studio workflows. Admin promotions currently performs protected server-side Instagram/Meta/other operations. Never expose those credentials to the browser.
- The public image relay is expensive under Vercel's Fluid Active CPU; use browser-native lazy loading and remove per-request Sharp transforms from the static site, with accurate unavailable-image fallback.
- Current website homepage returned HTTP 200; this is not proof the Vercel free-tier pause has been lifted.
- Currently **no authenticated Cloudflare Pages/Netlify integration is connected to ChatGPT**; creation of a Cloudflare account/project, GitHub OAuth authorization and configuring encrypted variables must be completed in Cloudflare's UI by its owner. A GitHub branch alone does not deploy anywhere.

## Release and verification gates (ALL REQUIRED)

1. A connected owner Cloudflare Free account, linked to this GitHub repo, deploys this branch to a separate `*.pages.dev` preview, without changing `way2paisa.in`.
2. Build the full real-source static export (not just fixtures): full count parity, no null/unverified projects, same canonical slugs, no missing legal/static/guide URLs, sitemap count and 200/404 behavior audited.
3. Visual/browser check across desktop and mobile: homepage, paginated catalogue/filter/search, Mumbai and Dubai currency formatting, 20 sampled project pages and every high-intent landing page; image fallback, accessibility and gallery rights.
4. End-to-end test **actual** lead form submission, insert in Supabase CRM, optional email/WhatsApp notification status, anti-spam safeguards, analytics/GA4 and buyer appointment schedule. Mock unit tests alone are insufficient.
5. Admin user login/roles, editing all 673 source-backed listings, inventory, CRM, and Promotion Studio's authenticated routes work on Cloudflare. If any operation is unsupported, pause migration, do not silently remove functionality.
6. Test Cloudflare Worker Free dynamic-requests and CPU, Pages build volume/files limits, Supabase free quotas, Resend/MSG91 quotas, security/abuse controls and analytics. Free tiers are **not a forever guarantee**; domain registration/renewal is still a cost.
7. Only after all gates pass, add `www.way2paisa.in` to Cloudflare Pages, verify TLS and update GoDaddy CNAME in a coordinated final switchover; handle apex redirect carefully. Keep a verified rollback path to Vercel DNS/records and retain the source repo/database.

## Cloudflare Pages Git settings (after the preview build is production-ready)

- Repository: `way2paisaindia/way2paisa-public`.
- **Root directory:** `migration/cloudflare` (Cloudflare must see this folder as its Pages project root, including its `functions/` directory).
- Production branch: initially the dedicated `migration/cloudflare-free-static-first` branch, not `main` during testing; defer custom-domain cutover.
- Build command: `npm run build` (Cloudflare should install dependencies from the nested `package.json`).
- Build output directory: `dist` relative to that root.
- Check in Pages build logs that React admin bundles and all static pages generated successfully. CI fixture builds only prove syntax and page template safety, not real runtime parity.
- Build-time public configuration: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. These are publishable/RLS-restricted, not service-role secrets.
- Required runtime `/api/leads` secrets/bindings: the same public Supabase URL/key (server-side use only), and `RESEND_API_KEY` if notifications are enabled. Never commit tokens to GitHub. MSG91 optional and requires user-authorized credentials.
- Cloudflare Pages Functions must live in the Pages project root `functions/` relative to the configured repository root; verify adapter path when using nested code. A dedicated Cloudflare Pages root directory setting or a Worker advanced-mode alternative may be necessary. Test in preview before shipping.
- Build on public project listing changes requires an explicit redeploy; no unsafe automatic git push on each Supabase DB write. Prefer a daily/low-cadence bounded, free build with snapshot and source safety controls. **Not automatic until a complete test**.

## Budget and permanence disclaimer

No hosting vendor can contractually guarantee a perpetual ₹0 plan. Cloudflare may change pricing, limits, or acceptable-use terms, and a growing site can exceed free function/other provider quotas. The migration targets **zero recurring *hosting subscription*** at current free-tier volumes, with portability/export to avoid lock-in. Domain renewal, Supabase, email and WhatsApp consumption may still involve costs. Never represent static pages alone as a fully migrated production business site.

## Validated branch milestones

- Synthetic project export and HTML escaping have passed the isolated GitHub Actions smoke workflow. A separate CI step now installs dependencies and tests the existing admin React components after static bundling.
- Both legacy admin React entry points are available under `/admin/` and `/admin/promotions/` in the preview build, using the same browser Supabase auth/RLS. **Their visual and functional parity remains unverified.** Promotion Studio APIs are intentionally not yet provided; social publishing must remain disabled/blocked during preview.
- The existing editorial `highIntentPages` and `intentLandingPages` modules are imported directly, preserving full SEO guide sections and FAQs for all three `/solutions/` pages and `/explore/villas-and-plots-mmr` rather than replacing them with generic text. The legal page includes all six original policy sections from the original production page.
- A Cloudflare Pages Function has been prepared for `/api/leads`, using only the existing public INSERT RLS policy; optional Resend/MSG91 notifications require encrypted bindings. **No live lead was sent as part of preparation** and acceptance tests are pending. This does not authorize promotional messaging.
- Never move `www.way2paisa.in` or change the GoDaddy DNS while preview has any failing feature, even if the static build succeeds.

## 6 November 2026 publication count refresh

- Supabase source-of-truth published **Lodha Casa Olivia** (RERA P51700052243, 3 BHK deck from developer named price ₹1.09Cr+) and **Lodha Casa Foresta A/B/H/I** (RERA P51700032990, four developer starting price variants from ₹74L+). These are newly published project records not preexisting files. 7 and 6 primary/statutory source records, respectively; no new media activated without rights clearance.
- Latest actual database count **673 active verified complete projects, 2,394 active inventory, 3,173 active project media**. Private records remain 1,161. Subsequent exporter requires minimum 673 or fails closed. This is a minimum guard, not a guarantee that every file and edge case is valid; the full preview count/URL parity must still pass before switching DNS.
- Do not merge or deploy this branch over `main` merely to update a count: isolate the Cloudflare migration to protect Vercel production while free hosting is configured. No emails or external developer requests are authorised.

## 6 November 2026 later publication refresh — 676 minimum

- **New:** Lodha Casa Evergreen Vikhroli West (C1/C3), Lodha Signet Vikhroli commercial offices, Lodha Signet Matunga commercial offices. Three separate source-verified RERA listings, adding **8 active developer advertised configuration-level starting offers**; project photos were not copied without rights clearance.
- Latest *live database* counts **676 active verified complete projects, 2,402 active inventory, 3,173 active media, 1,161 private project records**. Supersedes the historical 673/2,394 row above. Static export now refuses to run with fewer than **676** published projects.
- This is a **temporary count floor**, not a mechanism for publishing new database records on a static Cloudflare website. Until a real Cloudflare owner account, build-time Supabase config, preview QA and safe redeploy trigger are connected, **no live Cloudflare migration has happened**. It would be misleading to claim the site can stay up indefinitely at ₹0 simply because the isolated GitHub fixture CI passed.
- Original `main` on Vercel and GoDaddy nameservers remain unchanged. No emails or outreach, no DNS switch, Step 3 image issues open, Step 4 on hold.

## 6 November 2026 new Lodha publication refresh — 679 minimum

- The authoritative source-of-truth now verifies **679 active verified complete projects, 2,409 active inventory, 3,173 active media, 1,161 private records**. This supersedes earlier 676/2,402 baseline entries above, which are retained as an audit trail.
- Three newly published sites are Lodha Signet Kalyan–Shil Road offices, Lodha Bellavista Wings B1/B2 and Lodha Signet Thane (Kolshet Road). Seven newly added first-party offer records are developer-marketed *from prices*, not promoter-confirmed numbered saleable flats or offices. Precise registered carpet sizes and photo rights are unverified unless specifically evidenced; all new source-image hero/gallery records remain empty.
- The fail-closed exporter default `MIN_PUBLISHED_PROJECTS` is now **679**. This guards against accidental project-count regression, not against missing functionality, invalid links, inconsistent photos, missing live price changes or security issues. Premium visual parity to the current Vercel design and end-to-end admin/lead validation remain mandatory before replacing the domain or using Cloudflare as public production.
- No connected Cloudflare deployment has been established by this source-only action. Keep GoDaddy DNS, Vercel main and the original Supabase projects unchanged until full preview sign-off; never promise perpetual ₹0 service despite a current free-tier plan.
