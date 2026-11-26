# Mumbai/MMR pricing integrity and new-launch screening — 26 November 2026

## Production catalogue outcome
- Supabase: Way2Paisa Realty, project id `dqoxrsywknsgkxrdrxep`.
- Final SQL counts: **1,898** projects total, **683 published** (487 Mumbai/MMR), **1,215 private** (1,131 Mumbai/MMR).
- Published Mumbai/MMR active inventory records **1,703**. Private Mumbai/MMR active inventory records **0**.
- Published Mumbai/MMR project pages lacking active inventory increased from seven to **nine**, because Godrej Bliss and Birla Anayu had non-confirmed market quotes correctly archived. Such projects retain public information and use "Price on request".
- Published Mumbai/MMR projects without hero image remain **13**.
- **New projects published: 0**. No project unpublished. No GoDaddy redeployment; no developer emails; no media asset activated; no monetary value in an archived inventory quote overwritten.

## 1. Godrej Bliss, Kandivali East — public price materially corrected
- Project `bliss-godrej-properties-kandivali-east`, MahaRERA `P51800051172`.
- Way2Paisa previously advertised **₹2.02 Cr+** with 2 BHK **656–739 sq.ft / ₹2.02–2.41 Cr** and 3 BHK **944–985 sq.ft / ₹3.13–3.18 Cr** as active configurations.
- Audit showed **all seven** active apartment price rows came from independent October 16, 2026 marketed price research; every `availability` field explicitly stated **"NOT a confirmed available numbered Godrej promoter flat."** These were all-inclusive *indicative* examples, not current authenticated saleable stock.
- First-party https://www.godrejproperties.com/mumbai/residential/godrej-bliss currently markets 2 BHK **₹1.89 Cr base** and 3 BHK **₹2.86 Cr base**, plus additional charges. These cannot be substituted into the public per-unit sale price without a current allocated flat, area and full fee basis.
- **Mutations completed:** 7 research-only inventory rows set `active=false`, historical numeric `price` unchanged; historical 1 BHK sold-out rows also remain inactive. `projects.active=true`, `verified=true`, `enrichment_status=complete` retained. `min_price`, `max_price`, `min_carpet_sqft`, `max_carpet_sqft` reset NULL. Current SEO title changed to `Godrej Bliss Kandivali East | Price on Request`; description and original area prose updated to distinguish historic reference from current stock. Four-field screen area fallback prevented.
- **Verification:** DB 0 active, 9 archived historical inventory rows. Fresh public search card `https://www.way2paisa.in/properties?market=Mumbai&q=Godrej%20Bliss` displays **Starting Price on request** and no historical range. Individual `/projects/bliss-godrej-properties-kandivali-east` initially served old HTML `x-nextjs-cache:HIT`, `Cache-Control:s-maxage=300, stale-while-revalidate=31535700`. A later direct live browser HTTP GET returned **200** with a **new ETag**, title `Godrej Bliss Kandivali East | Price on Request`, and no `₹2.02 Cr` output. Cache regenerated without redeployment.
- Source audit fields: `godrej_bliss_unverified_market_stock_retired_20261126`, `godrej_bliss_detail_cache_stale_20261126`.

## 2. Birla Anayu, Malabar Hill — unsupported secondary quote archived
- Project `birla-anayu-malabar-hill`, MahaRERA `P51900077140`.
- Previous public starting price: **₹58.65 Cr+**, quoted as 4 BHK 3,450 sq.ft. This figure came from a single October secondary market property listing (one active research inventory row).
- Re-opened the exact old property-detail URL `https://www.magicbricks.com/propertyDetails/4-BHK-3450-Sq-ft-Multistorey-Apartment-FOR-Sale-Malabar-Hill-in-Mumbai%26id%3D4d423836313836373933` on 26 November; it now redirects to general Birla Anayu project catalogue, not a verified currently available numbered apartment or seller authorization. The official https://www.birlaestates.com/birla-anayu/ page identifies the project but does not provide a matching current numbered sale offer or binding total price.
- **Mutations completed:** the single 4 BHK research quote archived (`inventory.active=false`, original price ₹58.65 Cr preserved), public `projects.min_price`, `max_price`, `min_carpet_sqft`, `max_carpet_sqft` set NULL, `carpet_area_original` changed to a nonnumeric internal-history caveat, `price_original` and description retain fully qualified historic quote. Project stays published and verified.
- **Verification:** DB 0 active and 1 archived inventory row. Live search card now **Starting Price on request**. Direct browser project-page GET later returned **HTTP 200**, `x-nextjs-cache:HIT`, **new ETag** and text **Price on request**, without the old `₹58.65 Cr` price display.
- Source audit field `birla_anayu_archived_unverified_resale_listing_20261126`.

## 3. New project: Suraj Nova — Mahim West
- Project `suraj-nova-lobo-villa-mahim`, registered `PR1170002602806`, **private**.
- Issuer primary source is Suraj Estate Developers Limited's **21 November 2026** exchange filing: https://nsearchives.nseindia.com/corporate/SURAJ_21112026185124_Pressrelease.pdf
- Confirms launch, G+21 floors, 1-bedroom approximately 374 sq.ft, 2-bedroom approximately 600 sq.ft, six podium parking floors, and **₹175 Cr overall GDV** (NOT a flat selling price).
- Some secondary November listing feeds additionally display 1 RK and 355/431/569 sq.ft plans. Those variant claims are **not independently corroborated by the issuer announcement**. Their presence alone does not prove they're false; do not activate without exact statutory phase-specific flat schedules.
- No current numbered available apartment, written cost sheet, final registration-specific area, and licensed project imagery. Kept **private**, `active=false`; no research inventory activated. Added caveat to `data_quality_flags` and an additional project source `suraj_nova_mixed_listing_configuration_check_20261126`.

## Audit, constraints and next priorities
- Four newly logged project-source rows in total for these issues. All relevant record changes were read back from Supabase.
- The old price/date quotations and original source links remain in **inactive internal** inventory; no third-party portal name or logo was added to customer-facing descriptions, SEO fields or page display.
- One key rule: do not infer a current **available** sale allocation merely from a currently marketed 2 BHK or base-price banner, registration showing "unbooked", project GDV, or a stale resale listing.
- Other private candidates currently remain held; no active private Mumbai/MMR inventory exists. Continue source checks for the closest candidates, keep the 13 missing-hero media permission holds, and prioritize Mumbai/MMR.

Recorded by ChatGPT during the user-directed autonomous Way2Paisa production data-quality continuation on 26 November 2026.
