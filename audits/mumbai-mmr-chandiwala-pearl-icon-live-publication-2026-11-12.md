# Way2Paisa — Mumbai/MMR live publication and QA

**Date:** 12 November 2026 (India)  
**Connected database:** Way2Paisa Realty, Supabase project `dqoxrsywknsgkxrdrxep`  
**Canonical production site:** https://www.way2paisa.in

## 1. Project actually published this cycle

**Chandiwala Pearl Icon — Pathanwadi, Malad East, Mumbai**

- **Slug:** `chandiwala-pearl-icon-malad-east`
- **URL:** https://www.way2paisa.in/projects/chandiwala-pearl-icon-malad-east
- **MahaRERA:** `P51800079553`
- **Registered promoter:** Bahist Enterprises Pvt. Ltd.; developer/marketing brand Chandiwala Group of Companies
- **Registered completion date:** 31 December 2030
- **Category:** Apartments, 1 and 2 BHK
- **Starting advertised all-inclusive price:** ₹1.10 crore (subject to current promoter reconfirmation)
- **Existing, unchanged priced inventory rows activated: nine**; 1 BHK 484–496 sq.ft ₹1.10–1.12 Cr, 2 BHK 579–634 sq.ft ₹1.30–1.42 Cr.
- Public configuration-level pricing is **partner-advertised**, not a representation that a particular flat, floor or final price is promoter-confirmed. Updated availability field: `Partner-advertised — confirm developer availability and final all-inclusive quote.`

### Primary/secondary sources

- Official Chandiwala project brand: https://pearlicon.com/ (project identification, offerings)
- RERA-derived detail: https://www.squareyards.com/mumbai-residential-property/bahist-pearl-icon/325792/project/rera/p51800079553 (registration/promoter/target)
- Housiey public current Malad East advertised inventory: https://housiey.com/in/mumbai/malad-east (nine carpet/price combinations)
- Chandiwala Group official company profile: https://chandiwalacorp.com/about.html
- Company logo used by official site: https://chandiwalacorp.com/assets/img/logo.svg (exact URL and browser load verified)
- Existing project-specific media records from Chandiwala Pearl Icon's marketing partner site: https://chandiwalapearlicon.com/. **These existing media were not copied or uploaded anew. Marketing-partner authorisation alone does not independently grant Way2Paisa blanket reuse rights: image-rights follow-up remains appropriate.**

### Database operations

1. Initial guarded activation attempted and **rolled back** by `enforce_project_verification_completeness()` because the official developer logo was missing. No partial publication occurred.
2. Read-only browser independently confirmed the exact Chandiwala Group SVG on the official corporate website. Updated shared developer row `d2926f35-79b1-44e7-accd-b695369adcf1` to the first-party logo URL with source and verification date.
3. Re-ran a guarded CTE activation constrained to the one matching inactive project, registration, registered completion target, **nine** source-linked currently advertised unactivated rows and **four** existing project-media records, with no already-live duplicate RERA.
4. Guarded activation succeeded: exactly **1 project** moved to `active=true, verified=true, enrichment_status='complete'`; **9 inventory records** moved to active. Existing carpet/price values preserved; availability text and verification timestamps updated.
5. Added **4 source audit rows**: `registered_identity_20261112`, `developer_project_20261112`, `partner_advertised_configurations_20261112`, `developer_logo_20261112`.

### Post-write verification

- `public.project_enrichment_gaps` returns **[]** on the newly published project.
- Nine active inventory rows, min ₹1.10 Cr, max ₹1.42 Cr.
- Three existing gallery photos and developer corporate logo; correct registration and 2030 date.
- Live browser opened https://www.way2paisa.in/projects/chandiwala-pearl-icon-malad-east without a 404, with correct project title, grouped 1/2-BHK configurations, starting price, RERA, possession date, three gallery images and developer brand logo. No forms or enquiries sent.
- Published catalogue snapshot rose from **681** to **682** projects: **Mumbai 367 + MMR 119 + Dubai 196**.
- All remaining published Mumbai/MMR records still have at least one active inventory row.

## 2. Sitemap and SEO

- The production https://www.way2paisa.in/sitemap.xml was independently opened by a live browser and returned **HTTP 200**. It is a single large flat XML sitemap.
- A targeted scan for the exact newly published project URL was **inconclusive** because the browsing agent timed out reading the large document; **do not call the URL inclusion independently confirmed**.
- GitHub `app/sitemap.js` source dynamically fetches **active=true, verified=true, enrichment_status=complete** projects through keyset pagination with 300-second cache. Chandiwala Pearl Icon meets these filters; expected dynamic inclusion is supported by implementation, **but the production XML entry itself has not been confirmed**.
- New publication is driven by already-deployed database-backed project routing; no GoDaddy Git deployment was required to create its live project page. Other earlier GitHub code commits are not independently verified deployed.

## 3. Other candidates inspected, not published

- **H. Rishabraj Trident (Juhu)**, RERA P51800053505: Housiey advertises 3 BHK 1,216 sq.ft ₹8.63 Cr / 4 BHK 1,808 sq.ft ₹12.67 Cr, but legal promoter allocation still not independently confirmed and developer project-media set has 1 hero + **2** galleries, below strict ≥3 gallery gate. Old 2 BHK market row remains inactive. Status remains private.
- **NVK Palmera Residences (Bandra West)**, P51800033870: official developer advertises 4 BHK 2,090 sq.ft onwards and PROJECT from ₹15 Cr+, not unit-specific flat allocation; historical third-party prices conflict and some image rights remain in question. Keep held.
- **The Sands (Alibaug)**, PR1270002502620: official villa project starting ₹9.25Cr++ but unit/carpet mapping and completion-date conflict remain.
- **Goodlife Holistic Group (Karjat)**, P52000079493: registered plot vs marketed villa legal scope and current costed villa-unit allocation remain unresolved.
- **Casa Venero, Emaar India Alibaug**, P52000077606: official source Price on Request; current named villa, total cost, legal carpet not verified.
- Inactive duplicates, umbrella project master aliases and sold-out records were **not** activated.

## 4. Publication guardrails upheld

- No existing published project was unpublished.
- No other active prices, inventory rows, stock counts or previously published images were changed.
- No new unlicensed or unrelated images were inserted; 12 existing missing-image Mumbai/MMR projects remain awaiting valid image-level evidence.
- No developer emails, contact-form submissions, customer enquiries, WhatsApp alerts, paid hosting changes or migration.
- Deferred Dubai Emaar photo issues remain deferred.

## Final

**New fully live project publications this cycle: 1.**  
**Existing new project's advertised configuration rows activated: 9.**  
**Published public catalogue: 682.**  
**Live detail page QA: passed.**  
**Sitemap endpoint: HTTP 200; specific URL inclusion: not independently established.**
