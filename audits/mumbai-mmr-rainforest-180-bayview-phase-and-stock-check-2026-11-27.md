# Way2Paisa Mumbai/MMR inventory-source reconciliation
**Date:** 27 November 2026, afternoon (IST)
**Scope:** Supabase live project `dqoxrsywknsgkxrdrxep`, production https://www.way2paisa.in, 2 multi-MahaRERA projects with older priced quotations. All historical financial data preserved in **inactive inventory**, no public projects unpublished, no mail sent and no GoDaddy deployment.

## 1. Mahindra Rainforest — Kanjurmarg West

- Project ID: `ec490357-c6eb-4bdd-8c61-f5482b689777`
- Public slug: `mahindra-rainforest-mahindra-lifespaces-kanjurmarg`
- Registered phase refs: Phase 1 **PM1181012502957**, Phase 2 **PR1181012502956**; primary developer source at https://www.mahindralifespaces.com/residential/mumbai-properties/mahindra-rainforest/ explicitly names both and markets **2 and 3 BHK, starting ₹1.99 Cr+**. First-party site says RERA December 2031 for phases.
- Way2Paisa previously displayed **₹1.84 Cr+** on the production property card and project detail from old October 16 generic market guide, sourced at `https://housiey.com/builder/mahindra-lifespace`; individual public Rainforest market project guide `https://housiey.com/projects/mahindra-rainforest` last updated **6 August 2026** and still publishes ₹1.84–3.75 Cr broad indicative all-inclusive formats.
- Archived **six** active price rows, preserving all amounts, carpet figures, original URLs and last_verified timestamps:
  - 2 BHK 662 sq.ft **₹1.84 Cr**
  - 2 BHK 778 sq.ft **₹2.18 Cr**
  - 2.5 BHK 863 sq.ft **₹2.42 Cr**
  - 3 BHK 968 sq.ft **₹2.78 Cr**
  - 3 BHK 1129 sq.ft **₹3.29 Cr**
  - 3 BHK 1301 sq.ft **₹3.75 Cr**
- The current promoter-wide ₹1.99 Cr+ marketing entry is not a flat-numbered currently allocated written complete offer, so it **was not substituted** as a price/stock row. Project `min_price/max_price/min_carpet_sqft/max_carpet_sqft=NULL`; `bhk_original='2 & 3 BHK'`, `carpet_area_original` now explicitly on request without numeric fallback, official source URLs updated, source phases clarified in description, SEO title **Price on Request**. Public record remains **active=true, verified=true**.
- Added `project_sources.field_name=mahindra_rainforest_live_firstparty_price_vs_old_phase_unattributed_market_20261127`.
- **Live 27-Nov verification:** `/properties?market=Mumbai&q=Mahindra%20Rainforest` HTTP 200 with **2 & 3 BHK / Starting Price on request**. However the separate project detail `/projects/mahindra-rainforest-mahindra-lifespaces-kanjurmarg` was still serving a **stale Next.js cached HTML** with old ₹1.84 Cr and 662–1301 sqft, `x-nextjs-cache=HIT`, ETag `14i92xurwjh1pgv`, **despite database verification of the new values**. This is a cache-propagation issue; check detail again in future. Do **not** claim detail already refreshed or redeploy GoDaddy unnecessarily.

## 2. Rustomjee 180 Bayview — Matunga West

- Project ID `8b1f8e7e-a6bd-4dde-8b36-7a7830480bd0`; public slug `rustomjee-180-bayview-matunga-west`.
- Rustomjee official project (https://www.rustomjee.com/projects/residential/rustomjee-180-bayview/) and official unit-plans page (https://www.rustomjee.com/projects/residential/rustomjee-180-bayview/residences/) explicitly tie registration **P51900066547** to Wing A and **P51900066548** to Wing B:
  - Wing A 2 BHK **829 sq.ft**, 3 BHK **1,337 sq.ft**, 4 BHK **1,664 sq.ft**.
  - Wing B 2 BHK **837 sq.ft**, 3 BHK **1,406 sq.ft**; **no standard 4 BHK** on current primary typical-floor-plan disclosure.
- Current Rustomjee main-page developer marketing headline **3-bedroom from ₹6.53 Cr all inclusive**; an older first-party FAQ entry still quotes 3 BHK **₹5.72 Cr**. Different source passages conflict, and neither reveals an exact currently saleable identified flat and final quote. Do not treat either as a current bookable unit-price record.
- Way2Paisa had **seven** active October 16 Rustomjee builder-wide market-guide rows in range **₹5.40–10.40 Cr**, but no phase or flat attribution: 2 BHK 824sqft ₹5.40Cr, 2 BHK 840sqft ₹5.40Cr, 3 BHK 1089sqft ₹6.80Cr, 3 BHK 1407sqft ₹7.95Cr, 3 BHK 1336sqft ₹8.90Cr, 4 BHK 1664sqft ₹9.15Cr, and 4 BHK 1898sqft ₹10.40Cr. Several are incompatible with promoter typical plan schedule, particularly **4 BHK 1898** versus official 1664 and **3 BHK 1089** versus official 1337/1406. One-sqft differences may be rounding, but none proves live stock.
- Archived seven rows, **without overwriting prices, carpet areas, sources**; cleared public project numeric minimum/maximum price and area, set `bhk_original='2, 3 & 4 BHK'`, official wing-specific plan descriptions, **Price on Request** SEO; safe area fallback nonnumeric to avoid displaying historical 1664 as current offered apartment size. Existing project remains published.
- Added `project_sources` rows `rustomjee_180_bayview_20261127_official_wing_layout_price_conflict` and `rustomjee_180_bayview_zero_inventory_area_fallback_20261127`.
- **Live 27-Nov verification:** search card HTTP 200 now **2, 3 & 4 BHK / Price on request**. Project detail HTTP 200 and fresh browser cache ETag `175qq4qxnie1qb5` shows title **Rustomjee 180 Bayview Matunga West | Price on Request**, **Price on request**, **Configuration 2 BHK | 3 BHK | 4 BHK**, **Carpet On request**.

## 3. Publication readiness and final SQL counts
- **1,906** total projects.
- **683** published; **1,223** private; **487** published Mumbai/MMR.
- **1,675** active published Mumbai/MMR inventory records (reduced from 1,688 by **6 + 7 = 13** archived unallocated October historic rows).
- **15** published Mumbai/MMR projects with zero active stock (2 newly moved to request-based listings, **not unpublished**).
- Of those 15, **zero** with residual structured numeric price/area or parsed `carpet_area_original` sales claims; **13** published Mumbai/MMR projects have no verified hero images.
- **Three** evidence audit records recorded this cycle.
- No new private candidate with confirmed current free-sale apartment allocation, approved photos and complete documentation identified; **0 newly published**.
- No selling price changed for any retained active row, no published project deactivated, no emails to developers and no GoDaddy redeployment.

## Next actions
1. Recheck **Rainforest detail** until no stale cached old ₹1.84Cr is presented (search page already corrected). If stale persists, inspect Next.js ISR cache configuration rather than blind redeploy.
2. Verify other high-risk Mumbai/MMR compound-registration listings with unnumbered October market guide sources; prioritize cases where first-party prices/configuration differ from the old project feed. Avoid indiscriminate unpublishing.
3. Continue vetting private candidate exact current promoter-unit allocation, legal carpet, fees, image permissions. Registration unbooked counts are not saleable allocations.
