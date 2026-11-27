# Way2Paisa — Mumbai/MMR project source, phase and launch audit
**Date:** Friday 27 November 2026, afternoon IST
**Repository:** way2paisaindia/way2paisa-public
**Live database:** Supabase project `dqoxrsywknsgkxrdrxep`
**Production:** https://www.way2paisa.in
**Policy:** Mumbai/MMR priority; no developer emails or other seller outreach; do not present independently registered phase-level market averages as currently saleable units; no third-party portal names or logos in customer-facing website; no incorrect/unauthorized cross-project photography; no GoDaddy restart/redeployment.

## 1. Previous Rainforest cache issue — independently RESOLVED
Published `/projects/mahindra-rainforest-mahindra-lifespaces-kanjurmarg` was serving cached stale ₹1.84 Cr after earlier price archival. A subsequent fresh Firecrawl production scrape this 27-Nov cycle returned HTTP 200 and **Mahindra Rainforest Kanjurmarg West | Price on Request**, Configuration **2 BHK | 3 BHK**, Carpet **On request**, starting price **Price on request**, with former ₹1.84 Cr price and 662–1,301 sq.ft fallback gone. No GoDaddy deployment.

## 2. Lodha Casa Premier — 11 mixed-registration offers archived; public project remains
Published `/projects/casa-premier-lodha-dombivli`, project ID `59b7f8a5-d144-4a41-bd13-1165bea55fd6`, MahaRERA **P51700052337 and P51700052950**.
First-party developer https://www.lodhagroup.com/palava-city/projects/residential-property-in-dombivli/casa-premier lists those two registrations and current price page https://www.lodhagroup.com/palava-city/projects/residential-property-in-dombivli/casa-premier/price markets:
- 2 Bed with Deck **₹72.5 Lakh+**
- 2 Bed Ultima with Deck **₹91 Lakh+**
- 3 Bed Optima with Deck **₹1.02 Cr+**
- 3 Bed Ultima with Deck **₹1.26 Cr+**.
The official detailed plans page confirms 2 and 3 bedroom floor plans. No registered, currently promoter-allocated flat number with fee-complete cost documented.

Historical October 16 inventory had **eleven** actively displayed broker offers at **₹55.99 Lakh–₹1.22 Cr**, carpets **444–977 sq.ft** and layouts including **1 BHK**. The *specific secondary source project page* updated 20 November 2026 lists **P51700020381, P51700033960 and P51700034753**, **not the two current project's developer registrations**. The different registration sets preclude attaching those old prices to current marketed phase without a tower/flat-level legal bridge. No automatic assignment to existing P51700052337 / P51700052950; **all 11** old prices, carpet areas, source URLs and last-verification dates preserved intact in **inactive** history.

DB changes: project **active=true** preserved; min/max price/area cleared; public fallback `bhk_original='2 & 3 BHK'`; exact saleable apartment carpet, price **On request**; corrected current official source URLs, phase-sensitive description and Price-on-Request SEO, no external competitor branding.
- Audit source `casa_premier_nov27_developer_phase_vs_broker_rera_mismatch`.
- Live public search `/properties?market=MMR&q=Casa%20Premier` returned **HTTP 200** with **2 & 3 BHK / Starting Price on request**.
- Live public detail `/projects/casa-premier-lodha-dombivli` **HTTP 200**, title **Lodha Casa Premier Palava Dombivli | Price on Request**, **2 BHK | 3 BHK**, **Price on request**, carpet **On request**. Historic ₹55.99L starting display no longer visible.

## 3. Raymond The Address by GS — Sion: correct first-party corporate provenance and remove unverified Jodi stock
Published `/projects/the-address-by-gs-raymond-realty-sion`, ID `e439d59d-113a-41f7-aaeb-55400d6503d5`, registration:
- Tower A **PR1170002503012**
- Tower B **PR1170002503011**
- Tower C **PR1170002503010**
- Tower D **PR1170002503009**
- Tower E **PR1170002503008**.

Raymond Realty's listed-company BSE/NSE SEBI disclosure explicitly identifies **raymondrealty.in** as its corporate website. Reference https://bsmedia.business-standard.com/_media/bs/data/announcements/bse/21012026/f9ddd410-8645-439c-a25d-6db536df70c7.pdf (21 January 2026 filing). Its first-party project URL https://raymondrealty.in/residential-property/the-address-by-gs-sion fetched HTTP200 on Nov 27 and individually verifies all five tower RERAs, standard **2 BHK / 3 BHK / 4 BHK** typologies and broad marketed sizes: 2BHK around 724–828, 3BHK 970–1450, 4BHK 1451–2313 sq.ft.

Former project `overview_source_url=https://raymondgroup.in/projects/raymond-sion/` was incorrectly labelled "Raymond Realty official project source" despite different-domain content marketing **1/2/4 BHK**, inconsistent with corporate Sion page. Former `details_source_url` led to a generic third-party city portal. Corrected **overview/details/RERA source links to issuer-owned raymondrealty.in** and current official phase-aware public description. The source names in customer-facing fields identify only Raymond Realty Limited, no third-party portal names or logos.

Historic separate intermediary price guide from Oct 17 shows **five standard 2/3/4 BHK** quotes: 2BHK 724/828 sqft ₹3.14/3.60Cr; 3BHK 1002/1272 sqft ₹4.35/5.53Cr; 4BHK 1454 sqft ₹6.32Cr. Kept all **five active** but user-facing availability remains **Confirm Availability**, **not certified live promoter numbered unit**. Actual current prices, tower, free-sale allocation and date remain unverified; these are indicative only.

The same guide advertised **three combined Jodi layout price rows** 2+2 and 3+3 BHK at combined carpets **1,656 / 2,104 / 2,544 sqft** and total prices **₹7.20 / 9.15 / 11.06 Cr**. The official Raymond project page neither presents a registered independent combined apartment nor permits inference of builder/joining permission; no pair of adjoining currently allocated flat numbers or approved plan exists in sources. Archived those exact **three Jodi records** (not deleted), preserved amounts, source URLs and area, removed from public inventory. Recalculated project min/max price of **remaining five indicative rows to ₹3.14–6.32Cr** and carpet to **724–1454 sqft**, removed Jodi from customer inventory/SEO wording. No alteration of quoted unit prices for retained active rows.
- Audit row `raymond_sion_corporate_primary_source_and_jodi_quarantine_20261127`.
- Initial subsequent public detail still returned **stale cached previous Jodi rows** with old 2544 sqft and price max; monitored further in the same cycle. This does not reflect DB state and should be rechecked, as Next.js ISR `s-maxage=300, stale-while-revalidate=31535700` may persist before next regeneration. Do NOT claim individual live detail refreshed until directly observed.
- Public 2/3/4 normal typologies and official registered tower numbers match first-party. Avoid presenting the retained five as guaranteed stock.

## 4. Sunteck Belvedere Park Mira Road East — verified first-party but no safe publication
Existing **private** `sunteck-belvedere-park-mira-road-east`, project ID `413c5533-ada9-4714-bf95-e75b3102d960`, separate RERA **PR1331012602464**.
- Developer first-party https://www.sunteckindia.com/sunteck-belvedere-park returned **HTTP 200**, legally identifies the new project's registration but contains several amenity thumbnails labelled **Sunteck Sky Park**, another development. They should not be reused as actual Belvedere phase photographs; commercial reuse permission is not independently established.
- First tower launch announcement **19 Nov 2026**, sales opened/planned 21 Nov 2026 (existing research and contemporaneous press). Updated private `launch_date='2026-11-19'`, `launch_stage`, data-quality flags and blocker to clearly say **2/3 BHK numbered current builder-allocated flat price/carpet/possession and authorized genuine project imagery pending**. Existing 4 third-party historic quotes remain inactive research; no publication, no price fields, no media or guessed map coordinates.
- Live private public URL `/projects/sunteck-belvedere-park-mira-road-east` returned **HTTP 404**, so the nonpublish gate is working.
- Added audit source row `sunteck_belvedere_first_party_crossproject_media_and_stock_gate_20261127`.

## 5. Audited and left intact: Kalpataru Srishti Namaah, L&T Ahana
- Kalpataru first-party https://www.kalpataru.com/thane/srishtinamaah confirmed 2/3/4BHK, multiple individually registered phases including later JKL and project-wide 2Bed headline from ₹1.69Cr++; Way2Paisa historic matrix has first sample ₹1.73Cr all-inclusive, different pricing basis but not a demonstrated contradiction. No data change without current phase/flat-specific evidence.
- L&T Realty official https://www.lntrealty.com/residences/ahana-2-3-4-bhk-flats-in-malad/ confirms marketed 2/3/4 BHK and distinct tower registrations **PM1180002600813**, **PM1180002600814**, consistent with Way2Paisa. Original generic portfolio numbers still indicative; no data change without evidence. Historical images not touched.
- Recent potential new launches Puje Ayana, Suraj Nova, Sunteck Belvedere Park already present **private** in DB; did not insert aliases/duplicates. No newly publishable projects meeting real live-priced stock/media gate.

## 6. Final verified SQL counts
- Total projects **1,906**
- Published **683**, private **1,223**
- Published Mumbai/MMR **487**, private Mumbai/MMR **1,139**
- Active Mumbai/MMR inventory **1,661** (previous **1,675**; archived **11 Casa Premier + 3 Raymond Jodi = 14**)
- Published Mumbai/MMR with no active inventory **16** (previous 15; Casa Premier now request based)
- Published Mumbai/MMR missing verified hero **13**
- Published zero-stock Mumbai/MMR rows with leftover structured price/area or numeric customer fallback **0**
- **Three** new audit-source rows, **one** existing private launch record enriched, **zero** entirely new projects created
- **0** newly published projects and **0** unpublished projects, **0** developer emails, **0** GoDaddy deployment

## Next priority
Recheck Raymond Sion detail page cache until it no longer advertises legally unsupported Jodi configurations and historic 2,544 sqft. Follow up only with hard evidence for current numbered promoter saleable apartments and image permissions; user explicitly prefers conservative accuracy to dubious listings. Continue Mumbai/MMR compound-RERA audit with emphasis on price-date, phase-specific unit identity, developer-corporate source URLs and duplicate prevention.
