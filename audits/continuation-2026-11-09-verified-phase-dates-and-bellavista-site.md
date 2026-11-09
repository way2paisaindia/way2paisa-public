# Way2Paisa — 9 November 2026 continuation: legal phase dates and Bellavista site verification

## Purpose and result

Owner requested autonomous continuation of project publication and quality checks. The current canonical website is **reported by the owner to be hosted on GoDaddy**; no Cloudflare/Vercel migration requested or attempted.

Connected Supabase audit (project id dqoxrsywknsgkxrdrxep) shows:
- **1,842** project records; **681** verified, fully published; **1,161** private.
- **2,412** active inventory records; **3,174** active project media.
- Private projects currently have **0 active sale inventory rows**, and the nearest publication candidates remain held because exact live developer allocations, legal phase mapping and/or approved project images are not established.
- Published projects with completeness gaps: **14** before and after. Individual checklist gap instances reduced **48 → 45** in this continuation (3 gaps cleared).
- New projects activated: **0**. No existing project price, offer area, inventory active state, photo/license, status, developer contact, DNS, hosting or deployment action changed.
- New `project_sources` source records in this continuation: **7** (2 Marathon, 2 Casa Evergreen, 3 Bellavista).
- Independent fresh HTTP checks for `https://www.way2paisa.in/properties` and `https://www.way2paisa.in/sitemap.xml` could not be completed. Search-index cache saying 0 cards is **not** reliable proof of current production state; do not certify GoDaddy live updates/sitemap from database results alone.

## Published project #1: Marathon Nexzone — Nirvana Collection (Wings A & B)

- Slug: `marathon-nexzone-nirvana-collection-panvel`.
- MahaRERA Phase 3 S6 Wing A **PM1273032502296** statutory original/current completion **31 Dec 2029**, as ReraGenie mirror last checked developer filing May 2026: https://reragenie.com/p/marathon-nexzone-phase-3-s6-wing-a-palaspe-phata-eve1vcqe/
- MahaRERA Phase 3 S6 Wing B **PM1273032502304** statutory completion **30 Dec 2030** in last checked developer filing May 2026: https://reragenie.com/p/marathon-nexzone-phase-3-s6-wing-b-near-palaspe-phata-panvel-mumbai-maharashtra-kwufvcsy/ ; RERA derivative describes secured land charge ₹180 Cr to Piramal Finance. Buyer-specific NOC/approvals still require legal verification.
- This listing intentionally combines **two phases** without claiming a unit is in a particular wing. Former `possession_original` used semicolon separation and `possession_date=NULL`. Website's actual `app/projects/[slug]/page.js` `possessionText()` renders only the first date in a semicolon-separated string, while `|` is its explicit phase separator.
- Updated `possession_original` to **`RERA Wing A Dec 2029 | RERA Wing B Dec 2030`** so the detail page can display *both* registered targets. `possession_date='2030-12-30'` is the latest target for aggregate sorting, not a universal completion guarantee for both wings. Buyer-facing overview now names both phases/dates and confirms collection-wide prices are not live allotted units. Did **not** change any prices, inventory or images.
- The `possession_and_status` quality gap was cleared on a **separate verifying SQL query after write**, leaving only location and genuine hero/gallery evidence gaps.
- Two evidence records inserted, idempotent `20261109_phase3_s6_*`.

## Published project #2: Lodha Casa Evergreen — Vikhroli West (Towers C1 & C3)

- Slug `lodha-casa-evergreen-vikhroli-west`.
- MahaRERA **P51800046322**, Tower C1: revised filed completion **31 Dec 2028** (original 31 Dec 2027), per https://reragenie.com/p/lodha-vikhroli-tower-c1-vikhroli-west-zj21l6fr/ and https://gharkundli.com/projects/5116 .
- MahaRERA **P51800054475**, Tower C3: promoter's later filed revised date **31 Dec 2029** (original Dec 2028), with government automatic four-month eligible extension to **30 Apr 2030** reported by October 2026 RERA derivative https://gharkundli.com/projects/6056 and independently https://deedo.in/mumbai-suburban/vikhroli/vikhroli-tower-c3/ . Other filing mirrors show Dec 2029 because they omit the additional automatic extension; do not conflate original, promoter revision, and administrative extension.
- Updated `possession_original` to `RERA Tower C1 Dec 2028 | RERA Tower C3 Apr 2030`; `possession_date='2030-04-30'` is the latest aggregate sorting date. Buyer-facing overview explicitly notes both dates, original vs extension, and no flat-wise price allocation.
- Cleared one `possession_and_status` gap; retained `exact_configuration_inventory`, `geographic_coordinates`, `genuine_project_hero` and `genuine_project_gallery`. No prices or saleable unit attributes changed.
- Two new `20261109_casa_evergreen_*` evidence rows.

## Published project #3: Lodha Bellavista — Pokhran, Thane West (B1 & B2)

- Slug `lodha-bellavista-thane-west`, registration IDs **P51700024815** and **P51700024060**; owner-sourced developer https://www.lodhagroup.com/projects/residential-property-in-thane/lodha-bellavista confirms both and site.
- Source RERA-derived filing B1 https://www.squareyards.com/thane-residential-property/lodha-bellavista/234218/project/rera/p51700024815 supplies **four actual land-parcel DMS boundary coordinates** (N19°13′55–56″, E72°58′14–16″). Computing average boundary centre gives **19.23220903, 72.97097708**.
- Source RERA-derived B2 https://www.aurumproptech.in/pulse/rera/maharashtra/thane/lodha-bellavista-wing-b2-P51700024060 gives the four distinct B2 parcel corners; average centre **19.23179653, 72.97127708**. Both are adjacent and reflect different wings of the same project.
- Independent named-project https://dwello.in/project/lodha-bellavista-by-lodha-group-at-thane-west_37083f8b-0990-42fd-be33-765d237919e3/directions pins **19.2323, 72.970959**, about **10m from B1's registered boundary-centre** and **65m from B2's registered boundary-centre**. This triangulates a genuine development-site locator. Some general RERA data fields incorrectly say **20.2152,73.7986**, contradicting the physically filed parcel bounds, and were explicitly rejected.
- Saved verified project-site pin **19.2323,72.970959**, coordinate Google Maps query URL and transparent locality description stating *this is not a specific entrance pin*.
- Cleared `geographic_coordinates` quality gap on separate verifying SQL after write. Remaining `exact_configuration_inventory`, `genuine_project_hero`, `genuine_project_gallery` unresolved. No project-media rights presumed.
- Inserted 3 `20261109_bellavista_*` evidence rows.

## Final post-write verification

Connected Supabase SQL returned: `published_projects=681`, `active_inventory=2412`, `active_media=3174`, `private_active_units=0`, `published_cases_with_gaps=14`, `published_individual_gap_count=45`; exactly **2+2+3** evidence rows for the three project updates. Project records remained published and verified, each of three specific original quality gaps now cleared. No new project publication was asserted because complete current unit saleability and photo rights are still unverified.

## Next independent publication gates

1. Confirm GoDaddy runtime serves dynamic published Supabase catalogue and actual `/properties`, `/projects/[slug]` and `/sitemap.xml` pages. Do not infer live site success from server snapshots or old search-cache empty catalogue.
2. For private residential/commercial/villa/plot candidates, secure first-party *current individual* promoter sale/booking quote with exact numbered unit or plot, registered carpet/plot area, all charges, valid RERA phase, genuine licensed project hero and >=3 different verified gallery images. No partner resale/closed deal may be promoted as new-build bookable inventory.
3. Resolve remaining 45 checklist gaps on 14 published projects, prioritizing existing image provenance, coordinates and seller stock.
4. Maintain no-email, no hosting change, no DNS change, no paid-upgrade constraints.
