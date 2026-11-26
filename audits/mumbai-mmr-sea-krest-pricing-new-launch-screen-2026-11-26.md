# Mumbai/MMR catalogue — Sea Krest pricing and new-launch readiness audit
**Date:** 26 November 2026
**Target:** Way2Paisa Production database `dqoxrsywknsgkxrdrxep`, repository `way2paisaindia/way2paisa-public`.

## Completed production data correction — Sugee Sea Krest, Worli
- Public project `sugee-sea-krest-worli`, project ID `c177aacf-14e4-458b-afd4-d6fc93dc9e1d`, MahaRERA `P51900051903`.
- Previously one **active** 4 BHK, 4,870 sqft, ₹75.00 crore **all-inclusive** quote linked to `https://housiey.com/projects/sugee-sea-krest`, market guide last updated **30 Sep 2026**, inventory verified 15 Oct 2026. Its availability text said **"Advertised — confirm availability and final price"**, not an identified available promoter allotment.
- Primary official developer source `https://seakrest.sugeegroup.com/` (also `https://www.sugeegroup.com/projects-sea-krest-4bhk-flats-in-worli`) explicitly states 4 bedroom 4,870 sqft and **Price On Request**, with no current numbered apartment or binding all-inclusive price.
- Independently checked **JLL Homes** `https://www.jllhomes.co.in/apartments-new/mumbai/sugee-seakrest` lists 4 BHK 4,912 sqft from **₹24.56 Cr**, while a recent property portal listing publishes from **₹43.94 Cr** and another current broker markets **₹73.05 Cr++**. Differences in floors/fees/measurement may explain some differences, but they are not attributable to a presently available unit and cannot establish ₹75 Cr as current entry price.
- **Executed** one conditional Supabase SQL update to mark the ₹75 Cr row **inactive**, preserving the original numeric asking price and original research source. The archived row explains why active sale status was withdrawn.
- **Executed** one conditional project update (only if zero active inventory) to clear `min_price/max_price/min_carpet_sqft/max_carpet_sqft`, replace misleading public marketing price/size fallback, set SEO title to `Sugee Sea Krest Worli | Price on Request` and user-facing description to a first-party 4-bedroom configuration with explicit unit-availability caveat. Retained project `active=true,verified=true,enrichment_status=complete`, developer images and other records unchanged.
- Added `project_sources` evidence `sea_krest_current_quote_conflict_20261126`.
- **Verified** SQL: 0 active/1 archived Sea Krest inventory row, project price/area fields NULL. Production **public search card** `https://www.way2paisa.in/properties?market=Mumbai&q=Sugee%20Sea%20Krest` returned HTTP **200** and "**Starting Price on request**", no ₹75 Cr amount.
- **Detail-page freshness caveat:** production `https://www.way2paisa.in/projects/sugee-sea-krest-worli` at the last check still returned old ₹75 Cr HTML; a direct browser GET returned `x-nextjs-cache: HIT` / old title. Its route has Next.js revalidate=300 seconds and stale-while-revalidate; the search card is already fresh but detail-page cache must be checked again. No GoDaddy redeploy/restart or blind cache purge was performed.

## First-party late-November private new-launch checks
- **Sunteck Belvedere Park, Mira Road East**, private existing record `sunteck-belvedere-park-mira-road-east`, MahaRERA `PR1331012602464`. First tower launched 19 Nov and bookings announced for 21 Nov 2026. First-party `https://www.sunteckindia.com/belvedere-park` displays 2-BED and 3-BED deck-residence unit-plan photos but still no public **currently available tower-numbered unit plus exact RERA carpet, full developer cost sheet and media business-use permission**. Older private price research is not a saleable seller allocation; do **not** publish or copy unrelated SkyPark images.
- **DLF The Westpark Phase-1B**, private existing record `dlf-the-westpark-phase-1b-andheri-west`, registration `PR1181012602591`. First-party `https://thewestpark.dlf.in/` now clearly lists Phase 1B valid to **30 June 2034**, starting prices **on request**, and **Phase 1B unit plans Coming Soon**. Images for Tower-03/05 refer to Phase-1, not Phase-1B Towers 6/7A. DLF `https://thewestpark.dlf.in/compliance` says Phase-1B construction photo / compliance downloads coming soon. Project remains private until specific allocated promoter flats, all-inclusive dated prices and approved phase photos.
- Both projects were **already** in Way2Paisa's database; no duplicate records were created or statuses changed.

## Higher value published price spot-checks — not altered
- Supreme Prana 4 BHK 4,175 sq.ft ₹58.00 Cr: original `https://www.jllhomes.co.in/apartments-new/mumbai/supreme-prana-4-bhk-flat-bandra-west-4175-sqft` still currently displays same combination. RERA derivative ReraGenie reports **16 of 21 units not recorded sold/booked**; this is not a promised available numbered unit. Retained source price as a **market quote** pending seller confirmation.
- Lodha Malabar: original `https://www.jllhomes.co.in/apartments-new/mumbai/lodha-malabar` still lists **4 BHK 3,843 sq.ft ₹53.80 Cr** and **5 BHK 6,271 sq.ft ₹87.79 Cr** as a current market guide; confirm numbered flat and cost before any binding claim. No data changed.
- Lodha Sea Face: original `https://www.jllhomes.co.in/apartments-new/mumbai/lodha-sea-face-5-bhk-flat-worli-7210-sqft` continues to display **5 BHK 7,210 sqft ₹89.40 Cr** market guide, matched to developer RERA P51900053592. No selling price changed or inventory removed.
- Six verification records added to `project_sources` (two DLF, one Belvedere, one each three higher-value spot checks), in addition to Sugee record = **7 new evidence records**.

## Final database invariants
- **1,898** projects; **683 published**, **1,215 private**.
- Published Mumbai/MMR **487**; private Mumbai/MMR **1,131**.
- Published Mumbai/MMR active inventory records **1,702** (one fewer than preceding 1,703 due to justified Sugee quote archival).
- Private Mumbai/MMR active inventory **0**. Published Mumbai/MMR listings with no active inventory now **10**; all ten cleared of unverified structured numeric price/area fallbacks (`0` remain).
- Published Mumbai/MMR listings without licensed verified hero photo remain **13**.
- **New projects published in this continuation: 0.** No published project was unpublished; no developer email; no GoDaddy deployment; no unauthorized media activation; historical numeric price not overwritten. The independent media-rights and exact unit-allotment conditions remain mandatory.

**Next:** verify Sugee project-page HTML cache regeneration, review other date-sensitive public quote inconsistencies only with first-party and present exact-source evidence, and resume private market launch readiness checks.
