# Way2Paisa — 6 Nov 2026 evening autonomous continuation: date provenance, integrity and held publication

## Measured results

| Item | Before | After |
|---|---:|---:|
| Published projects, `active AND verified AND enrichment_status='complete'` | 681 | **681** |
| Active inventory | 2,412 | **2,412** |
| Active project media | 3,173 | **3,173** |
| Private/unpublished records | 1,161 | **1,161** |
| Published with zero current quality checker gaps | 667 | **667** |
| Published with any checker gaps | 14 | **14** |
| Published with `possession_and_status` checker gap | 5 | **2** |
| Published with absent SEO title/description/RERA/developer/location | 0 each | **0 each** |
| Published with active inventory min-price mismatch or zero active inventory | 0 | **0** |
| Duplicate published SEO titles | 0 | **0** |

**This cycle activated 0 new projects.** The private near-publication candidates have previously documented legal/carpeting/ownership/current quote conflicts, and the strict database verification guard must not be bypassed. No published price, unit inventory, media, developer/location or DNS changed. No emails or developer requests were sent.

## Three documented statutory completion dates restored in structured DB data

### 1. Matunga Signet (Lodha commercial), P51900077196

- Public canonical: https://www.way2paisa.in/projects/lodha-signet-matunga-offices
- `possession_date` set to **2030-01-30** from NULL, representing the *latest RERA-derived registered target* including a four-month automatic extension beyond the original **2029-09-30**, **not the unit possession or an OC certificate**. The status remains `Under Construction — MahaRERA target 30 Jan 2030`.
- RERA corroboration https://gharkundli.com/projects/1149 and https://deedo.in/mumbai-city/bhosari/matunga-signet/ ; note Deedo's misleading `Bhosari` geotag for a Mumbai City/Matunga project; original location coordinates remain unchanged. Three court cases reported in the RERA-derived sources; no legal clean-slate statement.
- New internal `project_sources` record `20261106_verified_rera_completion_structured_date`.

### 2. Signet B Kolshet (Lodha commercial), P51700050421

- Public canonical: https://www.way2paisa.in/projects/lodha-signet-thane-kolshet-road-offices
- `possession_date` set to **2028-03-30** from NULL, latest RERA-derived statutory target after a 4-month automatic extension of original **2027-11-30**. Buyer-facing status updated to `Under Construction — MahaRERA target 30 Mar 2028`, never ready-to-move.
- Sources https://gharkundli.com/projects/12327 and https://deedo.in/thane/balkum/lodha-signet-b-kolshet/ . Secondary sources differ on unit booking figures and complaints/court status; no current promoter unit allocation assumed.
- New internal `project_sources` record `20261106_verified_rera_completion_structured_date`.

### 3. Casa Foresta, Palava A/B/H/I (Lodha), P51700032990

- Public canonical: https://www.way2paisa.in/projects/lodha-casa-foresta-palava
- `possession_date` set to **2025-11-30** from NULL, **historical MahaRERA originally filed completion**, not an independently checked current OC/actual handover. Retained buyer-facing `status='Completion and occupancy verification pending'`. Registration lifecycle marked completed in some derivatives; regulator reports one historical complaint.
- Sources https://reragenie.com/p/foresta-a-b-h-and-i-dombivali-0f3moaih/ and https://www.mumbaipropertyexchange.com/maharera-project/foresta-a-b-h-and-i/P51700032990 . Do not confuse the separate C/D/G registered Foresta phases.
- New internal `project_sources` record `20261106_verified_rera_completion_structured_date`.

**Measured quality checker:** These three now no longer have `possession_and_status`. Only two multi-phase collections retain that date gap: `lodha-casa-evergreen-vikhroli-west` (two towers with distinct statutory dates) and `marathon-nexzone-nirvana-collection-panvel` (wings A/B distinct dates). Do not fill false umbrella-level dates; display phase-specific dates in future normalized schema.

## Important Vercel cache propagation finding

- Public project route code `app/projects/[slug]/page.js` sets `export const revalidate = 300;` and `fetchCache='default-cache'`. Vercel serves Incremental Static Regeneration (ISR) cached HTML, and regeneration is opportunistic after expiry.
- Verified live page HTTP 200 for all three routes and correct RERA IDs. During this cycle, the **Matunga HTML still showed RERA 30 Sep 2029** and **Kolshet HTML still showed 30 Nov 2027**, while Foresta already displayed **RERA wings 30 Nov 2025**. Request headers at the last fetch were `x-vercel-cache=HIT` and `age=~140 seconds`, less than the 300-second revalidation interval.
- **Thus the DB is corrected but Matunga/Kolshet public HTML had not refreshed at the last observed check.** Do not claim those two live date corrections are visible until an independent page fetch confirms 30 Jan 2030 and 30 Mar 2028. Do not force a Vercel production build: the Hobby account had exhausted its Fluid Active CPU allowance and the user cannot fund Pro.
- Official Vercel ISR behavior: https://vercel.com/docs/incremental-static-regeneration and https://vercel.com/docs/incremental-static-regeneration/quickstart . A stale cached response can be served to the first request after expiry while regeneration executes; subsequent responses may reflect the new data.
- The canonical sitemap remained **HTTP 200 with 681 project URLs**, and all three routes remained included. A sitemap page count alone does not establish Google indexing.

## Publication shortlist evaluated and held

- `nvk-palmera-residences`, Bandra West, P51800033870, original private hold: Pantheion first-party official site https://pantheion.in/projects/palmera/ markets **4BHK starting ₹15Cr+**, type around 2,090sqft, 4BHK+ 4,180sqft. However older Housing.com 1,392.96/1,758.82sqft basic-price listings (₹9.75/12.31Cr) conflict with the current developer plans; original internal audit recorded 32 developer-marketed homes vs 25 RERA registered and unverified image commercial permissions. No specific current, numbered 2,090sqft/₹15Cr primary allocated unit. Keep its inactive old inventory inactive; project remains private.
- `riyasat-bliss-khalapur`, P52000079379: first-party https://www.riyasatbliss.com/index.html publishes residential plot **area types** 1,614.60/2,971.82/3,398.31sqft and total 236 residential + 7 commercial plots, but no promoter unit-numbered sale price/availability; SquareYards/housing sales and resale are third-party listings with unclear owner title and conflicting prices. This exact project was previously tentatively published and **deliberately withdrawn** on 19 Oct after real allocation could not be reconfirmed. Do not silently override this protected hold merely to fill one quality-check field. Registered target and complaint status need current title/closing documents.
- `sankalp-meadows-nadhal-khalapur`, P52000077315: official project identity confirmed, statutory promoter **New Path Developers LLP** while promoted as part of Riyasat/associate brand. Housing.com currently contains specific broker-placed *resale* 1,119/1,500/2,152sqft offers but no verified seller title, signed promoter first-sale agreement/price or numbered available land parcel. Previous protected withdrawal recorded on 19 Oct. Keep private, inactive offers inactive; do not confuse other `The Riyasat Sankalp` registration.
- `the-sands-sasawane-alibaug`, `goodlife-holistic-group-karjat`, `emaar-casa-venero-alibaug` remain private for unresolved phase-specific registered villa carpet, sale price, legal plot/villa scope and/or image-use rights; no unallocated marketing prices forced into active inventory.

## Cross-catalogue data integrity checks (read-only)

- All **681** published projects have non-empty `seo_title`, `seo_description`, `rera_number`, `developer_id`, `location_id` and `min_price`.
- No duplicate SEO titles across the published set.
- There are **zero projects** with zero active inventory or with `min_price` materially different from minimum currently active inventory price (threshold 0.01 in market-native project price units).
- Existing earlier copy audit found 0 internal sourcing phrases leaking into public descriptions/availability. Current audit adds integrity checks but **does not** guarantee live stock validity or image licensing.

## Zero-cost hosting, no platform cutover

- The separate source branch `migration/cloudflare-free-static-first` still has **681-project minimum fail-closed static export guard** and last GitHub Actions fixture test **SUCCESS** (https://github.com/way2paisaindia/way2paisa-public/actions/runs/42222055929).
- No connected Cloudflare Pages deployment project, no visual parity certification against the original premium Next.js site, and no DNS / nameserver switch completed. Do not describe the ₹0 migration as completed or as free forever: vendor terms, build and Worker quotas can change.
- Publishing stalled deliberately when genuinely necessary evidence is missing; this is preferable to inaccurate price, registration, photos or title promises that create reputational/legal risk.

## Next verifiable actions

1. Revisit the two live Signet URLs after their ISR cache refresh; verify new dates appear in the actual public HTML, and avoid forcing a fresh Vercel deployment under CPU exhaustion.
2. Resolve the two known multi-phase completion date checker gaps by representing RERA wing-level dates rather than inventing one site-wide date.
3. Work the 14-project original media/location/actual inventory evidence backlog; do not bypass genuine hero/gallery checks or infer map pins.
4. Progress real Cloudflare Free preview connection and visual/function parity before touching `www.way2paisa.in`.

## Display precedence root cause identified and corrected after initial audit

- Investigation of the production Next.js source `app/projects/[slug]/page.js` found that the display calls `formatPossession(p.possession_original || p.possession_date)`; the `possessionText` helper extracts **the first recognized date** from each text segment.
- The initially saved provenance string for **Matunga** started with the *original* RERA date `30 Sep 2029` before mentioning the latest `30 Jan 2030`. **Kolshet** similarly started with original `30 Nov 2027` ahead of latest `30 Mar 2028`. Therefore the public HTML displayed those historic dates even on a cache MISS — **not solely because of an expired or stale Vercel ISR cache**. This supersedes the initial narrower cache hypothesis above.
- Targeted **data-only corrections**, *without changing `possession_date` or code*, set `possession_original` to begin exactly `RERA 30 Jan 2030 (latest ...)` and `RERA 30 Mar 2028 (latest ...)` respectively; original deadline and extension history remain visible in the detailed `possession_original` annotations and internal `project_sources`. Status still explicitly **Under Construction**, no OC claim.
- After this correction, the live production page cache returned `x-vercel-cache=HIT`, with approximately **211–212 seconds age**, lower than configured 300-second ISR revalidation. The HTML still displayed old original deadlines **at last check**; do not assert the new dates are publicly visible until checking after regeneration. No forced redeploy or cache purge is appropriate with Vercel Hobby CPU exhausted.
- Follow-up audit of published `possession_original` vs date year found **137 records** where the *first literal year* differs from structured `possession_date` year, but most intentionally display a **developer Target ... | RERA ...** pair. This is *not* necessarily a bug. The frontend splits on `|` and can display both. **Do not mass-rewrite these 137 records**; inspect the exact source record and rendered label first for each.
- The temporary safe fix works in the existing UI as soon as its 300-second ISR page and Supabase data cache refreshes, without any potentially costly code deployment. It does not remove the underlying fragile first-date-selection behavior; a future UI refactor should prefer a structured RERA date for the first display label while preserving separate developer/phase dates, after proper test coverage.
