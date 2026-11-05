# Way2Paisa — Step 3 / 5 November 2026: Marathon Nexzone Nirvana Collection publication

**Operation:** New source-backed residential project activation; media rights held; Step 4 held; no email or developer outreach.

## Before / after

| Verified production database | Before | After |
|---|---:|---:|
| Published active + verified + enriched projects | 670 | **671** |
| Active inventory records | 2,384 | **2,389** |
| Active media records | 3,173 | **3,173** |
| Private projects | 1,161 | **1,161** |

One new canonical project record `984ae8f5-24fb-4e5f-939b-ed425bdb7b4c`; five new active starting-offer configuration records; seven source evidence rows. New slug: `marathon-nexzone-nirvana-collection-panvel` — https://www.way2paisa.in/projects/marathon-nexzone-nirvana-collection-panvel .

Neither RERA identifier nor the slug had any matching existing project before the guarded transaction. There was no existing published project deletion, modification to existing price, inventory, availability, developer or active media.

## Legal registration vs marketing collection

Official Marathon first-party page: https://marathon.in/nexzone/

It markets **Nirvana Collection** as a unified product, but displays two distinct statutory Phase 3 S6 registrations:

- Wing A **PM1273032502296**, Sanvo Resorts Pvt Ltd legal promoter, 169 registered units, filed deadline **31 Dec 2029**. ReraGenie first-party-filing mirror: https://reragenie.com/p/marathon-nexzone-phase-3-s6-wing-a-palaspe-phata-eve1vcqe/
- Wing B **PM1273032502304**, Sanvo Resorts Pvt Ltd legal promoter, 169 units, original registered deadline **30 Dec 2030**. First-party filing mirror: https://reragenie.com/p/marathon-nexzone-phase-3-s6-wing-b-near-palaspe-phata-panvel-mumbai-maharashtra-kwufvcsy/
- Marathon Group is the **marketing/developer group** and is mapped to existing logo/developer master. Do not substitute the brand for the legal Sanvo Resorts promoter on a buyer's agreement.
- The marketed collection is represented as **one aggregated non-duplicated landing**, *not* two claimed phase-confirmed flat inventories, *not* one invented joint MahaRERA registration, and *not* a promise that all marketing units are available in both wings.
- Never apply a single common possession date to these two differently registered wings. Wing A and B target years remain separately described in prose. RERA filed deadline ≠ guaranteed handover.
- Independently dated July 2026 Mumbai Property Exchange indication for Wing B reports an Apr 2031 completion derivative and different 3/4/5 BHK prices; not relied on to override first-party current collection marketing: https://www.mumbaipropertyexchange.com/maharera-project/marathon-nexzone-phase-3-s6-wing-b/PM1273032502304

## Configuration-by-configuration exact areas and headline pricing

First-party landing page currently advertises:

| Name | Configuration | Developer-marketed total | Developer first-party from-price | Approved developer floorplan RERA carpet |
|---|---|---:|---:|---:|
| Serene | 2 BHK | 656 sq.ft | ₹98 lakh all-inclusive | **617** sq.ft |
| Sanctuary | 2 BHK | 710 sq.ft | ₹1.08 Cr all-inclusive | **664** sq.ft |
| Solace | 3.5 BHK | 1,076 sq.ft on landing | ₹1.69 Cr all-inclusive | **944–1,000** sq.ft, floor-dependent |
| Horizon | 4.5 BHK | 1,385 sq.ft | ₹1.96 Cr all-inclusive | **1,307** sq.ft |
| Retreat | 5 BHK | 1,431 sq.ft | ₹2.16 Cr all-inclusive | **1,337** sq.ft |

Original developer plan: https://marathon.in/nexzone/wp-content/uploads/sites/29/2026/02/Nirvana_project_plan.pdf

- Crucial buyer-experience correction: **656 / 710 / 1,385 / 1,431 are developer total areas, not RERA carpet.** The original plan explicitly separately states RERA carpet, balcony area and utility areas; structured `carpet_area_sqft` stores the *smaller verified RERA figures*, not total saleable/marketing areas. The customer-facing `carpet_area_original` records marketing totals and the distinction.
- **Solace marketing discrepancy:** website says 1,076 sq.ft; approved plan calls lower floor 1,028 total / 944 RERA and upper floors 1,080 total / 1,000 RERA. This discrepancy is logged, not hidden. Individual flat cost and size must be verified.
- **Joined apartment issue:** developer floorplans state Horizon 4.5 BHK combines two Serene layouts, and Retreat 5 BHK combines two Sanctuary layouts. Do not promise that a single legally amalgamated unit is available until promoter/municipal evidence and correct agreement are confirmed.
- `inventory.availability` was shortened to the customer-friendly **“Developer-advertised starting offer; confirm available flat and final quote.”** All detailed phase, RERA, joining/area and copyright notes are stored internally in `project_sources` and `enrichment_notes`, not in the public Availability field.
- The project description was cleaned up to a concise buyer-readable overview after the initial technical insert.
- Price rows are directly named developer offers **but not allocated numbered, unbooked units in either wing**. Never describe them as promoter-confirmed flat availability or quote an all-inclusive final cost.

## Media and map integrity

- **No new hero/gallery photo activated** because independently granted reuse rights and file/browser QA were not obtained. Neutral branded fallback and explicit no-verified-gallery notice are intentionally used. Step 3 media certification is **OPEN**.
- No approximate GPS inserted. The linked map is a location search of first-party Palaspe Phata / NH4B site address, not invented entrance coordinates.
- In-app test on a READY authenticated Vercel production deployment: `/projects/marathon-nexzone-nirvana-collection-panvel` returned **HTTP 200**; HTML included correct SEO title, canonical, both RERAs, pricing and no-gallery disclosure. This tests server HTML, **not** visitor-browser rights or display of external images.
- First sitemap fetch returned HTTP 200 but still **670** project URLs and did **not** yet include the new project, so a **671-project sitemap refresh is required**. This is a separately recorded dynamic cache / propagation check, not evidence of Google indexation.

## Other leads reviewed — held, not activated

- **Marathon Nextown (Ruby/Jasper)**: current developer page markets township-wide prices not unambiguously attributable to an unsold unit or the specific MahaRERA phase. Official latest November 5 construction update identifies Ruby Dec 2026 and Jasper Dec 2028 separately: https://marathon.in/nextown/construction-updates/ . Ruby RERA P51700021189 (legal promoter Marathon Ener-Gen), RERA-derived financing land charge ₹45 Cr and one historic complaint; Jasper P51700049449 discloses three litigation cases, secured land ₹45 Cr and a 12-month completion revision. Do not infer all historic unbooked units are actively for sale, or price Ruby/Jasper from a combined township headline. RERA derivative https://reragenie.com/p/marathon-nextown-ruby-desai-villege-tn0o0gua/ and https://reragenie.com/p/marathon-nextown-jasper-desai-villege-hk3ukc9b/ .
- **Marathon Nexworld Nova & Flora**: primary developer advertises 1 BHK from ₹29.49L and separately P51700032675 (Nova) and P51700052461 (Flora), but current developer price not assigned to a specific tower/numbered flat. Flora RERA-derived filing reports **three litigation matters** and a ₹22 Cr land charge in favour of housing lenders, requiring legal review and lenders' NOCs. This combined launch was **not** activated; statutory and commercial release gates retained. Official https://marathon.in/nexworld/ , https://marathon.in/nexworld/status/ ; statutory mirror https://reragenie.com/p/marathon-nexworld-flora-betawade-3pl88rmg/ .

## Release guards

- Existing published project statuses, prices, inventory, developer profiles and active media remain intact. Five new project-level developer starting offers only; no unauthorized source images, no cloned tower projects, no precise coordinates invented.
- **No email or developer outreach.**
- **Step 3 is OPEN. Step 4 remains on HOLD for this requested continuation.**

## Later 5 November buyer legal reconciliation — Wing B

A further independently checked RERA-derived filing for S6 Wing B (`PM1273032502304`) materially extends due diligence:

- ReraGenie reports **₹180 crore secured land charge** declared 6 Oct 2025 in favour of **PIRAMALFINANCELTD**. Source https://reragenie.com/p/marathon-nexzone-phase-3-s6-wing-b-near-palaspe-phata-panvel-mumbai-maharashtra-kwufvcsy/
- A source discrepancy exists about commencement certificates: ReraGenie does not list the CC in its public document slots; independent RERA Inspector says initial CC is on file and **further CC for full height remains pending** https://www.rerainspector.com/projects/59732/PM1273032502304 . Do NOT claim either that the correct sanctioned floor has a valid CC or that no CC exists based solely on derivatives.
- Public description was amended with one concise sentence: **“Wing B filing reports a secured land charge, so lender NOC and phase-specific approvals should be checked before booking.”** Internally, the more detailed risk, conflicting derivative reports, official RERA confirmation and agreement/charge-release needs were saved to `project_sources`, `enrichment_notes` and `data_quality_flags`.
- This was a new-project-only description and source update; **no inventory price, active project count, old project or media changed**. Current publication is a developer-advertised launch discovery result, **not certified transaction/legal clearance**.
