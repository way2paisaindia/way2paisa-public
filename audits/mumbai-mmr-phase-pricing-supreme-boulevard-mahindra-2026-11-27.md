# Mumbai/MMR publication QA — 27 November 2026

## Scope and execution
Way2Paisa FinPro Services production catalogue, backend Supabase project `dqoxrsywknsgkxrdrxep`, public https://www.way2paisa.in, code repository `way2paisaindia/way2paisa-public`.

This is a **completed** autonomous live database audit. No emails sent, no GoDaddy deployment, no developer requests, no third-party imagery activated, no historical price values overwritten. Preserved all 683 published projects; did not invent current available apartment/plot stock.

### 1. Outstanding L&T Elixir Reserve — Dove cache issue: RESOLVED

Published project canonical URL: https://www.way2paisa.in/projects/elixir-reserve-l-t-realty-powai

- The previous 26 November conditional DB corrections were applied; on the morning of 27 Nov a fresh Firecrawl metadata scrape still returned older `3 BHK`-only and generic 19.125739,72.892047 map pin.
- A later actual isolated browser direct GET returned **HTTP 200**, `x-nextjs-cache=HIT`, **new ETag** `mrzralmwpy1pah`, with correct published title `L&T Elixir Reserve Dove Powai | Price on Request`, both **3 BHK | 4 BHK** rendered, and **no** old generic Google Maps coordinate.
- Same result with canonical path and a query-string verification URL. Thus the outstanding HTML ISR propagation is **resolved**; no need to touch GoDaddy hosting.
- No current numbered Dove apartment was activated. Registration-based sources from Nov 2026 now indicate later Sep 30, 2026 aggregate **139 units / 102 sold / 1 booked / 36 unbooked** at registration P51800055488, vs older 74 booked historical research. These derivative registration figures are **not promoter-available sale stock**. Only internal `data_quality_flags` note and `project_sources.field_name=dove_q3_2026_registry_sales_aggregate_not_available_stock_20261127` were added.
  - Registry-derived source: https://inspectrera.com/p/mh/p51800055488-dove-at-l-and-t-realty-elixir-reserve
  - First-party registration master page: https://www.lntrealty.com/residences/luxury-2-3-4-bhk-flats-in-elixir-reserve-powai-mumbai/
  - Correct Dove 3 BHK/4 BHK registration schedule also corroborated at https://deedo.in/mumbai-suburban/paspoli/dove-at-l-and-t-realty-elixir-reserve/ (3 BHK 88.23 and 122.18 sqm, 4 BHK 168.3 and 181.25 sqm).
- For Dove, the prior 26 November price archival, map normalization and seven separate private L&T phase records remain unchanged.

### 2. Supreme Boulevard Chembur — launched Tower C investigated; new publication still held
Already-staged private project `supreme-boulevard-chembur-wing-c`, registration **PR1182022602663**.

- Company news dated **23 Nov 2026** widely covered a launch described as roughly **131 three-bedroom homes**, with marketed configuration areas **1,200 / 1,410 sq.ft**. Independent reports conflict on starting price **₹4.09 Cr** vs **₹4.89 Cr**, and neither establishes exact registered-carpet area, charges and currently available promoter-allocated flat for Wing C.
- Phase-specific registry-derived official filing shows Wing C legal promoter Supreme Sky High Pvt Ltd, **114 registered residences** in a separately registered building, 3 BHK approximately **902–1,293 sq.ft carpet**, with originally registered completion **6 Oct 2031**. Initial registration showed zero booked as of Nov 4, which is **not proof of 114 saleable free-sale allocations**. Registered 114 vs marketed 131 and area/price bases need reconciliation, not automatic substitution.
  - Developer's master-project site: https://www.supremeuniversal.com/residential-property/mumbai/chembur/supreme-boulevard/
  - Registry-derived source: https://reragenie.com/p/supreme-boulevard-chembur-wing-c-deonar-e-o2yyu98l/
  - Launch reporting: https://www.moneycontrol.com/news/business/supreme-universal-launches-131-home-tower-at-chembur-project-in-mumbai-14089784.html
  - Alternative starting-price coverage: https://www.hindustantimes.com/real-estate/supreme-universal-launches-second-phase-of-mumbais-chembur-project-targets-700-crore-revenue-potential-101795430793851.html
- **Updated private record only**: `bhk_original=3 BHK`, `launch_date=2026-11-23`, launch stage, phase-specific RERA-carpet vs marketed-area caveat, conflicting price provenance and legal/availability issues. Kept **active=false,verified=false**, zero active inventory, no public price/media.
- **Two** source rows logged: `wing_c_20261123_launch_131_vs_114_reconciliation` and `wing_c_rera_114_units_and_registered_carpet_check_20261127`.
- Public preview for private `/projects/supreme-boulevard-chembur-wing-c` returned **HTTP 404**.

### 3. Published Supreme Boulevard Wings A & B — phase-unattributed marketing quotes ARCHIVED
Existing public canonical page: https://www.way2paisa.in/projects/supreme-boulevard-chembur
Registered Wings A **P51800079148**, B **PR1180002400026**. This is **not** the new Tower C record.

- Previously **six live** priced project-wide marketing examples (2, 2.5, 3 and 4 BHK) from Oct 17 general Chembur market feed:
  - 2 BHK 758 sqft **₹3.45 Cr**
  - 2.5 BHK 938 sqft **₹4.49 Cr**
  - 3 BHK 1,065 sqft **₹4.87 Cr**
  - 3 BHK 1,170 sqft **₹5.46 Cr**
  - 4 BHK 1,743 sqft **₹8.22 Cr**
  - 4 BHK 1,962 sqft **₹9.21 Cr**
- Independently retrieved the **project-specific** current secondary property guide updated **26 November 2026**, and it still carries this master **project-wide** matrix: https://housiey.com/projects/supreme-boulevard . This means the figures were not necessarily obsolete; the material publication defect is **no identification of current available numbered flat and its proper Wing A or B RERA phase**, while the newly launched Wing C has its own registration and potentially overlapping 3 BHK offers.
- Developer first-party official page markets current project-wide **3 & 4 BHK from ₹4.09 Cr++** and announces Tower C, but does not distinguish A/B real-time numbered-unit allocated offers at the six old quoted prices. See first-party URL above.
- Six conditional Supabase SQL inventory rows archived (`inventory.active=false`, original price/size/source unchanged), exact reason retained in internal `availability`. **Do not transfer the six to Tower C**. Project `active=true,verified=true,enrichment_status=complete` preserved; public project-level `min_price/max_price/min_carpet_sqft/max_carpet_sqft=NULL`. Revised `bhk_original=3 & 4 BHK` consistent with current official master marketed types, updated public SEO and descriptions, clarified Wing A/B vs C.
- Live search `/properties?market=Mumbai&q=Supreme%20Boulevard` HTTP **200**, card **3 & 4 BHK** and **Starting Price on request**.
- Live project detail initially returned cached HTML with former ₹3.45 Cr. Subsequently an actual isolated-browser **direct GET** returned **HTTP 200**, `x-nextjs-cache:HIT`, new ETag `147a4qcdee71r1q`, title **Supreme Boulevard Chembur — Wings A & B | Price on Request**, starting-price section **Price on request**, rendered **3 BHK | 4 BHK**, and no old ₹3.45Cr starting-price line. No GoDaddy redeployment.
- Audit source row `supreme_boulevard_ab_projectwide_price_phase_quarantine_20261127`.
- This work **does not establish** saleable availability for the wing. Clear new promoter flat-level written offer and correctly assigned RERA/approved imagery are necessary.

### 4. New future MMR development — Mahindra ~100 acre plotted project private-stage CREATED
- Developer **Mahindra Lifespaces** signed a deal for approximately **100 acres of plotted development in MMR**. Official first-party press-release page published **5 Nov 2026**; body dated **23 Oct 2026** (date inconsistency retained, not silently corrected).
  - https://www.mahindralifespaces.com/newsroom/press-releases/mahindra-lifespaces-signs-its-first-100-acre-plotted-development-in-mmr/
- Independent 5 Nov 2026 news places development in general **Karjat–Murbad Road** corridor, not sufficient for site-specific pinpoint or a development-plan approval.
  - https://www.hindustantimes.com/real-estate/mahindra-lifespaces-signs-its-100-acre-plotted-development-on-karjat-murbad-road-near-mumbai-101793862218998.html
- **Created one new private non-published project research row** `mahindra-lifespaces-100-acre-mmr-plotted-proposal`, using established Mahindra Lifespaces developer identifier, market MMR, category plot, **no** legal RERA, possession, price, actual saleable plot size, geocoordinates, map link or invented gallery.
- Explicitly labelled early *land-agreement proposal*, not consumer launch; public page returns **404**. Two evidence rows added: `mahindra_100acre_mmr_corporate_agreement_20261127` and `mahindra_100acre_mmr_independent_corridor_context_20261127`.
- This stage does **not** count as a newly published saleable project.

### 5. Mahindra Vicino — sold-out private hold clarified
- Existing private `mahindra-vicino-andheri-east` wrongly retained generic enrichment status `batch50_wave3_needs_housiey_inventory` with no live stock.
- First-party official site directly lists Mahindra Vicino in its **Sold-out Projects** section:
  https://www.mahindralifespaces.com/residential/sold-out-projects/mahindra-vicino/
- Updated private status and description to **developer-sold-out archive**, kept no public promotion or current first-sale inventory. Separate individual resale could only be promoted after authorized named seller stock verification.
- One `project_sources` audit row `mahindra_vicino_first_party_sold_out_20261127`.

## Final production SQL counts (verified after edits)
| Metric | Final |
|---|---:|
| Projects total | **1,906** |
| Published total | **683** |
| Private total | **1,223** |
| Published Mumbai/MMR | **487** |
| Published Mumbai/MMR active inventory rows | **1,692** |
| Private Mumbai/MMR active inventory rows | **0** |
| Published Mumbai/MMR listings with no confirmed active inventory | **12** |
| Of the no-stock public listings, misleading structured numeric price/area fields | **0** |
| Published Mumbai/MMR projects lacking verified hero image | **13** |
| New PRIVATE research candidate this cycle | **1** |
| Superseded project-wide marketing inventory rows archived this cycle | **6** |
| Public projects newly published | **0** |
| Published projects removed | **0** |
| Newly added project_sources this cycle | **7** |

All zero-stock public projects remain **published with Price on request**. Existing public price amounts are not overwritten in historic records. Any non-zero active-stock project may still carry **indicative** non-bookable price examples, which need continued phase-and-allocation checks. User prohibits third-party names/logos customer-facing, contacting developers, unlicensed/repeated photos and unnecessary GoDaddy redeployment; those constraints have been respected.

## Next priorities
1. Look for newly issued **specific promoter-approved numbered flat stock** with current cost sheet and images cleared for commercial partner use for the existing ready-to-publish private candidate pool, rather than activating generic unbooked counts.
2. Resolve the **13 published Mumbai/MMR hero-image rights holds** using written developer/owned asset authorization, not copying images just because developer websites display them.
3. Review published **other multi-registration** project pages for source-price mixing analogous to the Dove/Wing C problem, taking care not to overwrite stable legitimate price and inventory.
