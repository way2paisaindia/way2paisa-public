# Mumbai/MMR publication-readiness continuation — 26 November 2026

## Scope and current state
- Way2Paisa production Supabase project `dqoxrsywknsgkxrdrxep`, read and checked on 26 November 2026.
- Published (`projects.active=true`): **683**. Private: **1,215**. Total: **1,898**.
- Private projects in Mumbai + MMR: **1,131**. Private Mumbai/MMR projects with active inventory: **0**. Thus no current private project has a priced, live sellable unit that can satisfy the established publication gate.
- **Entirely new projects published this continuation: 0**. Never imply that a private record was activated.
- No prices, unit allocations, public statuses, or GoDaddy application/deployment settings were changed. No developer contact sent.

## Godrej Hillview Estate — actual live verification
- First-party developer marketing: https://www.godrejproperties.com/mumbai/plotted/godrej-hillview-estate — **₹1.19 Cr onwards project-wide**, extras apply. No numbered plot/paired plot area and final cost confirmed.
- Way2Paisa actual production page: https://www.way2paisa.in/projects/godrej-hillview-estate-khalapur returned **HTTP 200** from fresh Firecrawl scrape (`maxAge=0`) and now shows **"Price on request"** / "On request" area, with no active inventory table.
- Earlier indexed search result still reflected historical **₹54.4 lakh** on a past snapshot. Do not mistake that outdated search-cache excerpt for the present page.
- DB check: `min_price IS NULL`, all six historical plot inventory rows inactive. Older 1,200 sq.ft / ₹54.4 lakh quote is archived, not a live sale listing.

## New-project candidate screening (hold statuses)
1. **Navkar Palace**, Andheri West; MahaRERA PR1180002500275. Official source https://navkar.co/navkar-palace/ confirms an ongoing 2/3/4 BHK + Jodi development but does not publish current promoter-allocated priced units. An independent research price page https://housiey.com/projects/navkar-palace states its last update was **31 May 2026**. Its quoted prices cannot be assumed to represent a 26 November available flat.
2. **H. Rishabraj Trident**, Juhu; MahaRERA P51800053505. Official source https://www.hrishabraj.com/projects/trident confirms 3/4 BHK and project location. Independent research listing https://housiey.com/projects/h-rishabraj-trident identifies its last update as **10 May 2026** and additionally promotes a 2-BHK configuration absent from current first-party site. Separate November PROPi quotes have different fee/area bases, so there is no verified binding promoter allocation/cost sheet.
3. **Buildarch Sakura**, Dadar West; MahaRERA P51900055573. Filed unsold-flat counts do not certify a unit is currently offered by promoter, pricing/typology missing, only one unique developer project render distinct from floor plans.
4. **Suraj Nova**, Mahim West; MahaRERA PR1170002602806. Developer stock exchange filing dated 21 Nov 2026 confirms 1-BHK ~374 sq.ft and 2-BHK ~600 sq.ft marketed homes; the ₹175 Cr reported is project GDV, not apartment asking price. Source: https://nsearchives.nseindia.com/corporate/SURAJ_21112026185124_Pressrelease.pdf . No available priced apartment or licensed project gallery yet.
5. **Godrej Reserve — Wing 2**, Kandivali East; MahaRERA P51800079457. Parent-development brochure imagery is not phase-specific proof; no verified Wing 2 numbered available priced sale allocation.

## Completed database mutations and verification
- `project_media.id=7f9f44cf-7d9c-4ee6-a84f-f0b3ab3e11c6` (Navkar Palace gallery URL identical to hero) was **deactivated**; existing hero and distinct nighttime project render retained. No image bytes deleted.
- Four source trail records inserted into `project_sources`: first-party project identities + explicitly dated historical independent market price reference for Navkar Palace and H. Rishabraj Trident. Their `field_name` values are `publication_readiness_2026_11_26` and `market_quote_age_2026_11_26`, respectively.
- Read-back verification confirmed four new audit-source records, zero active duplicated Navkar gallery, zero active private inventory for Mumbai/MMR, and published count still 683.

## Next publication gate
Publish only when the **specific RERA/phase**, **current available promoter sale allocation**, **unit/configuration-specific carpet or plot area**, **current properly described price basis**, **verified project imagery with appropriate reuse authorization**, and **validated project location** are all established. Do not use stale or mismatched fee-basis quotes as live prices; do not activate duplicate umbrella, sold-out, or unverified phases. Mumbai/MMR takes priority over Dubai photo backlog.

This file is a dated audit trail only, not a deployment artifact.

## Later same-day live listing-card fix (26 Nov 2026)
- A fresh production scrape of `/properties?market=Mumbai&zone=Navi%20Mumbai%20%26%20Outer%20MMR` returned HTTP 200 and initially showed **Price on request** but still displayed **1,200 sq.ft plot area** on Godrej Hillview Estate's search card.
- Root cause: `app/components/PropertiesClient.js` `cardArea()` uses a regex fallback against `projects.carpet_area_original` when there are no active inventory area offers; that field still contained a numeric historical plot quote.
- The database's published Godrej Hillview Estate row was narrowly updated to replace the fallback text with a nonnumeric disclaimer: current plot area on request. **No historical inventory row, quoted price or project status was deleted or changed**. One `project_sources` audit record was added (`public_card_area_correction_2026_11_26`).
- **Verified live after change** with a new no-cache scrape: Godrej Hillview card now shows **Starting Price on request**, **no 1,200 sq.ft area**, and no ₹54.4 lakh value. HTTP 200. The detailed project page had already shown Price on request.
- Long-term hardening recommendation: prevent any future card from deriving marketed current areas from unverified historic `carpet_area_original` prose when there is no validated active area offer. Code change requires separately controlled deployment review; no GoDaddy restart or redeploy was performed.

## Additional 26 Nov continuation — six more stale public area/price corrections

This pass audited all 7 published Mumbai/MMR projects with no `inventory.active=true` records. Initially 6 of those projects still carried stale numerical public-card area fields, and some carried archived `max_price` values that could affect budget filters, despite showing "Price on request".

Completed and confirmed live (HTTP 200, fresh/no-cache public card requests):
- Godrej Reserve — Wings **1, 3, 4, 5**: cleared historic numeric `min_carpet_sqft`, `max_carpet_sqft`, `max_price` and the old numeric excerpt in `carpet_area_original`. Historical unit examples and prices remain in `price_original` and/or inactive research inventory. All 4 cards now display **Price on request** with **no old unit area**.
- Vaswani Seascape, Juhu: cleared archived ~2,421–2,422 sq.ft structured area range and historical maximum price; card now **Price on request** with no area implying a current available apartment.
- Rustomjee Balmoral, Chembur: cleared archived 1,671–3,026 sq.ft structured area range and historic ₹18.85 Cr max marketing price; card now **Price on request** with no stale area or old amount. Historic multi-wing price examples remain in `price_original`.
- Godrej Hillview Estate: previous card clean-up already verified earlier on 26 Nov.

**Final SQL check:** published Mumbai/MMR records lacking active inventory = **7**; of those, records still exposing numeric structured asking price, minimum/maximum area, or area-regex legacy description = **0**. No active pricing or inventory rows altered, no live project statuses modified.

11 project-specific audit-source rows were added in this cycle for the six public corrections (5 + 6) plus 6 first-party verification/media investigation records (6), making **17 added source rows**, all dated 26 November 2026. [Correction: individual count 5 `public_card_archived_area_suppression`, 5 `public_card_structured_area_price_suppression` + 1 Balmoral `public_card_structured_area_price_suppression` + 6 private/media source rechecks = 17.] The historical Godrej Hillview correction is documented in the previous same-day section.

### Private project verification (still held)
- Skylon Suburbia: first-party marketing page confirms the marketer Hariko and explicitly says **developed by Sai Krupa Developers**, preserving the statutory identity from RERA-derived records. Current numbered allotment, legally attributable sale-unit scope, price and legal status remain blockers. Sources: https://harikoproperties.com/skylon-suburbia/ and https://skylonsuburbia.harikoproperties.com/ .
- Goodlife by Holistic Group (Karjat): first-party project page confirms 3/4/5-bed concept, 48 villas across 8.5 acres, **advertised ₹1.29 Cr project-wide** and registration P52000079493, but no confirmed particular saleable villa, fee basis and legal plot-villa scope. Remains private. Source: https://holisticgroup.in/goodlife/ .
- Marathon Nexzone — Nirvana Collection and Dosti Willow: first-party official galleries/source pages discovered for further validation; **no project images were copied/activated**, because specific asset matching and permitted commercial reuse were not established. Sources: https://marathon.in/nexzone/gallery/ and https://dostirealty.com/project/dosti-willow .

### Publication result
- Projects total **1,898**; published **683** (Mumbai/MMR **487**), private **1,215**.
- Private Mumbai/MMR projects **1,131**; private Mumbai/MMR active-priced inventories remain **0**.
- **New projects published this continuation: 0**. No invented unit allocation, fake current offer, developer email, GoDaddy restart/redeploy or price replacement.
