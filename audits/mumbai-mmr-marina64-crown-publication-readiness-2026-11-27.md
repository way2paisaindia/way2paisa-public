# Way2Paisa Mumbai/MMR publication and phase-price audit — 27 November 2026

## Scope
Live Supabase `dqoxrsywknsgkxrdrxep`, customer site https://www.way2paisa.in, and first-party Mahindra Lifespaces / Rustomjee project sites. Preserve production GoDaddy hosting, published listings, old quoted values, and image rights; do not send developers emails.

**Summary:** One published Mumbai project price display was corrected, four historical unverified price rows archived, two existing *private* registered phase profiles enriched, one published phase disclosure refreshed, two no-stock BHK display fallbacks normalized, two near-publication private projects rechecked and safely held. **0 projects newly published** because no exact current saleable stock was confirmed.

## A. Mahindra Marina64, Malad West — published price correction
Canonical public URL: https://www.way2paisa.in/projects/marina-64-mahindra-lifespaces-malad-west
Project ID `a99b0ac2-a5a5-47ec-85f3-573230a39801`.

Official first-party source:
https://www.mahindralifespaces.com/residential/mumbai-properties/mahindra-marina64/
- Current developer site clearly markets **2 & 3 BHK from ₹2.89 Cr+**, without a unit-numbered offer or explicit all-inclusive cost matching old database rows.
- The same official site explicitly identifies **three separately registered phases**:
  - Phase 1 **PR1181012500087**
  - Phase 2 **PR1181012500523**
  - Phase 3 **PR1182022502265**
- Primary content includes a generic masterplan and tower plans A–G; tower/flat availability **cannot** be allocated to a separate phase merely from the masterplan.
- Existing published Way2Paisa Marina64 umbrella project covered all 3 registrations and was showing an October 10 broad third-party **developer portfolio**, not phase-specific currently available apartments:
  1. 2 BHK **761 sq.ft ₹2.79 Cr** (`c52768e1-4358-4a8e-9a85-5408fba49376`)
  2. 2 BHK **775 sq.ft ₹2.81 Cr** (`823071ab-b3af-4505-9251-0e3364cb8e55`)
  3. 3 BHK **968 sq.ft ₹3.55 Cr** (`74ad0acd-c59f-4fbc-b824-f0b61f1b541c`)
  4. 3 BHK **1,050 sq.ft ₹3.85 Cr** (`323032c0-2c47-43f8-9da9-df20542605d1`)
- The former advertised **₹2.79 Cr** starting price is below the developer's current broader **₹2.89 Cr+** headline (fee basis may differ; do not simply replace one with the other). Four price rows were marked **inventory.active=false** and historical figures/carpets/source were retained unchanged. Project `min_price/max_price/min_carpet_sqft/max_carpet_sqft` cleared to NULL, official sources updated and SEO title set `Mahindra Marina64 Malad West | Price on Request`. Website description explicitly distinguishes three RERA phases. The published project **remains active=true/verified=true/enrichment_status=complete**.
- **Second correction:** first new live search-card rendering already showed **Price on request** but incorrectly retained archived **1,050 sq.ft** because `carpet_area_original` still mentioned historical 761–1,050 sqft. The fallback was changed to only `Current exact RERA carpet area is on request for an identified, available home in the correct registered Marina64 phase.` Historical prices and areas remain archived internally. No misleading numeric fallback for the zero-stock project.
- **Live verification:** actual Firecrawl browser GET returned project detail **HTTP 200**, `x-nextjs-cache=HIT`, fresh ETag `ao492wyec41p1j`, title **Mahindra Marina64 Malad West | Price on Request**, **no** ₹2.79 Cr old price or 1,050 sq.ft fallback. The customer search page `/properties?market=Mumbai&q=Mahindra%20Marina64` also returned **HTTP 200** and **Price on request**, without archived prices or area.
- Two `project_sources` records: `marina64_primary_price_phase_quote_reconciliation_20261127` and `marina64_numeric_area_fallback_removed_20261127`.

## B. Marina64 Phase 2 and Phase 3 existing private candidates — official registration enrichment
The existing project records `mahindra-marina64-phase-2-malad-west` (`cdd25301-55b6-4d4c-8301-7cbad1277453`) and `mahindra-marina-64-phase-3-malad-west` (`fc41fb1b-314c-4044-88e6-3d3afac3af65`) had no RERA number, developer_id, location_id, overview source or substantive description.

**Updated existing private rows** to exact first-party official RERA identifiers **PR1181012500523** and **PR1182022502265**, reused verified Mahindra Lifespaces developer and broad Malad West location IDs from public umbrella project, added correct source URLs and textual phased-identity caveats. They remain **active=false, verified=false**, with no invented tower assignments, possession, images, current unit stock or selling prices. Both `enrichment_status` values now say `hold_official_registered_phase_confirmed_specific_available_flat_price_carpet_photos_missing`. **No duplicate records created** and no user-facing development status changed. Two phase source audit entries `marina64_private_separate_phase_identity_verified_20261127`.

## C. Rustomjee Crown, Prabhadevi — first-party price corroborated; stock unchanged
Published canonical URL https://www.way2paisa.in/projects/rustomjee-crown .
Official Rustomjee page https://www.rustomjee.com/projects/residential/rustomjee-crown-prabhadevi/
- Explicitly states **3-bedroom Tower C (Phase II P51900006367) price on request**, Towers A/B (Phase I P51900003268) have their Occupancy Certificates, developer markets **4 and 5-bedroom homes from ₹17.01 Cr all inclusive**. The official site is presently consistent with the broad **₹17.01 Cr** starting claim on Way2Paisa.
- Four older active **market quote** rows linked only to generic builder feed still need exact floor/flat, 4-vs-5 BHK classification, up-to-date seller allocation and price confirmation: 4 BHK 1,700 sqft ₹17.01 Cr; 2,500 sqft ₹19.80 Cr; 3,002 sqft ₹30.42 Cr; 4,700 sqft ₹47.25 Cr. The third-party project-specific pricing guide was last marked updated 3 Sep 2026 and gives various 4BHK carpet examples; does not individually confirm current numbered apartments.
- Corrected live project's phase-description copy and added a `data_quality_flags` research caveat, retaining all **four** active price records and the published project without changing prices. Unlike Marina64, **the starting price was corroborated** by an official developer price statement, so no sweeping price archival was made merely because records predated November.
- Added `project_sources.field_name=rustomjee_crown_official_phase_starting_price_check_20261127`.

## D. No-inventory published project BHK labels
The existing detail-page `cleanConfiguration` fallback parser truncates `A BHK | B BHK` at the first pipe `|` when `inventory.active` has no rows.
- Two already published/no-stock projects were given syntactically equivalent grouped configuration values:
  - **Godrej Bliss**: `2 & 3 BHK` instead of `2 BHK | 3 BHK`.
  - **Rustomjee Balmoral**: `3, 4 & 5 BHK` instead of pipe-delimited 3/4/5 BHK plus internal commentary.
- No inventory, price, developer, RERA or media changed; after Next.js ISR regeneration, the existing formatter should show all legally marketed configurations. Two `project_sources.field_name=zero_stock_bhk_formatter_20261127`. Changes deliberately limited to DB text; no GoDaddy redeploy.

## E. Private publication-readiness audit
Private Mumbai/MMR portfolio at end of cycle: **1,139** records; **937** have some RERA string, **54** have non-NULL `hero_image_url`, **53** have some active verified media, **39** have any November-priced research inventory, and **zero** have active saleable inventory. Only **two** private projects with MahaRERA numbers had BOTH November-priced historical stock and active verified hero/gallery media:
1. **H. Rishabraj Trident**, private `h-rishabraj-trident`, Juhu, P51800053505: older market price sources have conflicting 3 BHK carpets / fee treatment; current first-party marketing project mix 3 & 4 BHK; no named current developer-flat cost sheet or licensed reuse guarantee. A fresh direct scrape of the previously official `https://www.hrishabraj.com/projects/trident` returned **HTTP 404** on 27 Nov 2026 although an older web-search cache contains the valid official content showing 3/4 BHK, 17 floors and registered Juhu identity. Thus do not assert project cancellation; inspect restored primary URL and newly confirmed stock before publication. No price or media rows activated.
2. **Riyasat Bliss**, private `riyasat-bliss-khalapur`, P52000079379: developer official `https://www.riyasatinfra.com/projects/navi-mumbai/ongoing/riyasat-bliss` returned **HTTP 200** and confirms project identity/plot amenities/registration. No currently available numbered promoter plot with final cost, seller-title authority and legal approvals were confirmed; a staged third-party reseller's Plot 301 quote cannot be treated as verified land title or first-sale allocation. Existing regulatory complaint / site-infrastructure flags still open. No publishing.
- Two documentary `project_sources` records: `trident_official_page_live_http404_vs_index_20261127`, `riyasat_bliss_developer_no_current_numbered_plot_quote_20261127`.
- No buyer-facing third-party portal logos or names added. The research audit/source logs are internal.

## Verified final production database counts
- **1,906** total projects
- **683 published**, **1,223 private**
- **487 published Mumbai/MMR**, **1,139 private Mumbai/MMR**
- **1,688** active inventory records attached to published Mumbai/MMR projects (**4 fewer** than prior 1,692, exclusively the unverified Marina64 market quotes)
- **0** active inventory records attached to private Mumbai/MMR projects
- **13** published Mumbai/MMR projects with **zero** active inventory
- **0** zero-stock published projects retaining misleading structured price/carpet values or numeric `carpet_area_original` fallbacks
- **13** published Mumbai/MMR projects still missing verified hero images
- **9** source audit records added this cycle
- **2** existing private projects phase-enriched; **0** new project rows created, **0** new projects published; **0** existing projects unpublished.
- All source and project updates were verified via SQL; the Marina64 public search/detail pages were tested live via an isolated browser. No GoDaddy restart or redeployment; no developer email/request.

## Next candidate work
Seek a present first-party promoter issued **unit-number, RERA carpet, date-stamped price and live allocation** (and authorized media) for a private project. Avoid publishing an old generic "from ₹" or unbooked RERA aggregate as active inventory. Finish exact tower/rera mapping for ambiguous Rustomjee Crown 4BHK 4,700 sqft quote if sufficiently supported; avoid speculative removal of confirmed project-wide official ₹17.01Cr price.
