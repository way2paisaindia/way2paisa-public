# Way2Paisa — 9 November 2026 autonomous continuation: statutory dates and production-safe publication

## Outcome and access limitations
- User's destination host is **GoDaddy**, not Cloudflare/Vercel. Do not change DNS, hosting, or deploy an untested branch.
- Connected Supabase is healthy and accessible; GitHub repo `way2paisaindia/way2paisa-public` is accessible.
- New project activations **0**. **681** published, **1,161** private projects. **2,412** active inventory rows; **3,174** active media rows. No prices, inventory, published status, or media usage rights were modified.
- Latest direct web retrieval of `https://www.way2paisa.in/properties` and `/sitemap.xml` could not complete (cache miss/inaccessible), and container-side HTTP requests cannot resolve outside domains in this tool environment. Cached search-engine pages show 0 cards around 3 weeks ago and some project details around 2 weeks ago. **Do not mistake a cached initial server-render screenshot for current GoDaddy traffic or assert a current outage without independent live browser validation.**
- Private catalogue has no active, promoter-verified available stock; candidates with apparent `project_enrichment_gaps=1` are invariably held on `exact_configuration_inventory` for genuine sold-out/re-sale/developer allocation/legal mapping issues. Do not reactivate stale or secondary offerings just to inflate publication count.

## Statutory basis: selective automatic four-month MahaRERA extension
Per MahaRERA **Order No. 66/2026 dated 7 August 2026**, eligible registered projects with original/revised/extended completion dates on/after 28 February 2026 received an automatic four-month registration extension; projects registered on/after 1 August 2026 were excluded. Extension concerns legal project registration targets, **not automatic physical handover or OC**.

Contemporary explanations:
- https://desaidiwanji.com/insights/articles/maharera-grants-four-month-extension-to-real-estate-projects-on-account-of-force-majeure
- https://economictimes.indiatimes.com/industry/services/property-/-cstruction/maharera-extends-project-completion-deadlines-by-4-months-citing-force-majeure/articleshow/133034752.cms

Not every Way2Paisa date was shifted by four months blindly. Each of the six affected live projects was checked against an *identified* regulatory-derived source and the stored old date before update. Underlying current certificate/OC and individual possession must still be confirmed by the buyer.

## Applied Supabase updates — 8 published projects
All updates were scoped by exact slug + exact registration number + verified active complete status + old date + NULL `possession_original`, and inserted one idempotent evidence `project_sources` row per project. Post-update read verified all eight rows remained published and no stock or price changed.

| Project (slug) | Old project date | New project date and public presentation | Source |
|---|---|---|---|
| `raheja-maestro-juhu` | 30 Nov 2026 | **30 Mar 2027** · `RERA Mar 2027` | https://gharkundli.com/projects/49 ; independent https://deedo.in/mumbai-suburban/juhu/maestro/ |
| `gp-skylark-vile-parle-west` | 31 Dec 2027 | **30 Apr 2028** · `RERA Apr 2028` | https://gharkundli.com/projects/5507 |
| `ace-parkside-thane` | 31 Dec 2029 | **30 Apr 2030** · `RERA Apr 2030` | https://gharkundli.com/projects/12690 |
| `ambit-primoris` | 31 Dec 2027 | **30 Apr 2028** · `RERA Apr 2028` | https://gharkundli.com/projects/6604 |
| `rustomjee-the-panorama-bandra-west` | 30 Oct 2028 | **28 Feb 2029** · `RERA Feb 2029` | https://gharkundli.com/projects/6108 |
| `rock-highland-kandivali-west` | 30 Dec 2026 | **30 Apr 2027** · `RERA Apr 2027` | https://gharkundli.com/possession/2027/mumbai-suburban and https://www.squareyards.com/mumbai-residential-property/origin-rock-highland/217432/project/rera/p51800049632 |
| `kabra-embraze-ghatkopar-east` | 31 Dec 2027 | Date **unchanged**; display `RERA Dec 2027` | https://gharkundli.com/projects/6218 |
| `damac-canal-crown-business-bay` | 28 Feb 2027 | Date **unchanged**; display `DLD Feb 2027` | https://www.mitchellscommercialrealty.com/off-plan/canal-crown (DLD 7 Nov 2026 registry snapshot); official DLD verification at https://dubailand.gov.ae/en/eservices/real-estate-project-status-landing |

The `possession_original` stored for each was descriptive and correctly understood by the existing public UI, e.g. `RERA Mar 2027 (four-month automatic extension; verify current certificate)`. No OC or handover statement was added. Every affected project currently has `status` still under construction/off-plan, without changing configurations, carpet areas, price, media or sale availability.

## Customer-facing possession date display fault: 50 published records
- `app/projects/[slug]/page.js` contains `possessionText` parser that recognizes text such as `RERA Dec 2026`, but **not** ISO-8601 `YYYY-MM-DD` returned by the database when `possession_original` is NULL.
- Before updates, **50** published records had `possession_date` but NULL display field, leading `formatPossession(p.possession_original || p.possession_date)` to output `Available on request` for a date-only string. Search-index cache reproduced this on `/projects/sayba-orchid`, despite RERA registration P51800054279 and `possession_date=2026-12-31`. Its construction/OC status also merits independent RERA checking, so no status update was made.
- After the eight source-grounded database fixes, **42** published records still lack a display field. Do not globally shift their dates based on force majeure without eligible dates and exact project registration identity; a number of date sources already include the extension or show completed status.

### Isolated, tested GitHub fix — NOT deployed
Created separate branch:
https://github.com/way2paisaindia/way2paisa-public/tree/fix/possession-iso-fallback-2026-11-09

Changes on this **non-deployed branch**:
1. `app/lib/possession-date.mjs`: pure helper `formatStoredIsoPossession` recognizes and validates `YYYY-MM-DD` and ISO timestamps, returns `Registered target MMM YYYY · Reconfirm current approvals`, never treats date as proof of Ready to Move/OC. Rejects impossible dates and preserves normal RERA text handling.
2. `app/projects/[slug]/page.js`: imports helper and applies it at the start of `possessionText()`, after empty value check, before the existing descriptive statuses logic.
3. `scripts/test-possession-date.mjs`: 11 cases for ISO dates, leap years, impossible dates, status text and NULL.

The same helper/test logic ran locally via Node and **all 11 passed**; branch file contents were fetched back from GitHub and inspected (import and call present). This is a source fix, not a claimed production GoDaddy fix; a real `next build`, production deployment route and fresh browser smoke test remain **unverified**. No PR merged/deployment initiated.

## Two project status conflicts documented, without unsafe OC claims
- `sayba-orchid`: GharKundli October 2026 MahaRERA-derived Kurla East index lists P51800054279 `COMPLETED`, while Way2Paisa current project status is `Under Construction`, completion Dec 2026. https://gharkundli.com/area/mumbai-suburban/kurla-east-400024 . This is not yet verified by an authenticated Occupation Certificate or current developer delivery status. Preserve published listing and no ready-to-move claim.
- `ajmera-shringaar-vile-parle-west`: https://propx8.com/projects/ajmera-shringaar-vile-parle-west reports MahaRERA status completed in 22 Oct 2026 record, versus Way2Paisa under construction/near possession. Do not set Ready to Move without OC or legal evidence. 
Two date-stamped `public.project_sources` records were inserted for this status-check backlog; nothing public changed.

## Validation after all writes
- `public.projects` published: **681**, private: **1,161**.
- `public.inventory` active: **2,412**; `public.project_media` active: **3,174**.
- Evidence rows written this continuation: **10** (8 completion-date/format source records plus 2 status discrepancies).
- Published project quality cases (independent `project_enrichment_gaps`): **14**; individual gap checks: **45**, unchanged by this date-display work.
- Remaining published dates with NULL display field: **42** (isolated code fix will cover simple ISO cases if deployed and tested).
- Net new *published projects*: **0**, because existing private research inventory is not yet current/promoter-confirmed and the live GoDaddy website cannot be certified in this tool session.

## Next safe continuation
1. Verify actual GoDaddy hosting route /production branch and that server-side Next.js published catalogue is connected to Supabase. Do not speculate based on old web crawls.
2. Build and deploy the ISO fallback branch only after actual GoDaddy build path is verified; then test live `/projects/sayba-orchid` and other missing-date pages and check `/properties` + sitemap. Do not claim fixes from a GitHub branch as live.
3. Pursue promoter-issued current saleable apartment or plot units, verified phase RERA carpet, full prices and commercial rights to exact hero + 3 gallery images before activating any private candidate.
4. Continue resolving 45 published quality-check instances, prioritizing Godrej Bliss images, Emaar Harbour Gate third image, and phase/mapping integrity. No unsolicited emails, paid upgrades, hosting or DNS actions.
