# Way2Paisa — 6 November 2026 autonomous publication + free-hosting migration protection

## Completed publication

Two **new, unique** Lodha residential projects were added to the Supabase source-of-truth with atomic no-duplicate checks, first-party developer sources, RERA derivative checks, SEO metadata, explicit buyer caveats and zero unapproved image uploads.

| Metric | Before | After |
|---|---:|---:|
| Active, verified, enrichment complete published projects | 671 | **673** |
| Active inventory records | 2,389 | **2,394** |
| Active media rows | 3,173 | **3,173** |
| Private/unpublished project records | 1,161 | **1,161** |

No existing project, previously published listing, price, inventory, gallery or private project was modified by the publication CTEs. **No messages, marketing or developer outreach were sent.** Step 3 independent image/browser verification remains open. Step 4 retained on hold. The Cloudflare migration remains a separate Git branch and was **not deployed to a Cloudflare account** or attached to a domain.

### Lodha Casa Olivia, Palava — one new project and one new active price record

- Canonical: https://www.way2paisa.in/projects/lodha-casa-olivia-palava
- DB project ID: `96e61dbd-76f8-4744-99bf-ac15badf46ca`.
- MahaRERA **P51700052243**, filed under **Lodha Developers Limited** for **Olivia Tower B**; the other Olivia Tower A has a *different* registration P51700052470 and no unverified price was assigned to it.
- 3 BHK with Deck, **official Lodha dedicated price page from ₹1.09 Cr+**, `inventory.price=1.09` stored in Indian crores, `carpet_area_sqft=NULL` as developer has not tied that starting price to a numbered available apartment, floor or exact RERA carpet.
- Official dedicated price source: https://www.lodhagroup.com/palava-city/projects/residential-property-in-dombivli/casa-olivia/price
- Important first-party discrepancy: official project FAQ at https://www.lodhagroup.com/palava-city/projects/residential-property-in-dombivli/casa-olivia says *flats start at ₹1.08 Cr (all in)*, whereas the specific **3 Bed with Deck** price page says ₹1.09 Cr+. The dedicated named variant page takes precedence; ₹1.09 Cr is **not falsely described as all-inclusive**. Require a dated current written promoter quotation.
- Statutory Tower B first-party-filed RERA 3 BHK types reported around **844–860 sq.ft** (https://www.mumbaipropertyexchange.com/maharera-project/olivia-tower-b/P51700052243). Do not pair that exact range with the ₹1.09 Cr offer as a certified flat. Project-level RERA target **31 March 2027**, developer says under construction.
- Independent statutory mirrors disagree on a generic completed lifecycle status vs actual progress at ~30% slabs and no public OC. Marketed as **Under Construction**, not ready-to-move; https://www.rerainspector.com/projects/45099/P51700052243 and https://reragenie.com/p/olivia-tower-b-khoni-n6lq2wsd/ .
- Original neutral branded fallback, with no hero image or gallery photo attached absent reuse rights. Exact tower entrance coordinates were not invented.
- Seven field-level verified `project_sources` records, and no preexisting CRM/contact records altered.
- The public canonical route returned HTTP **200**, title `Lodha Casa Olivia Palava | 3 BHK From ₹1.09 Cr`, correct RERA and advertised price, and honest no-verified-gallery notice.

### Lodha Casa Foresta, Palava — one new project and four configuration price records

- Canonical: https://www.way2paisa.in/projects/lodha-casa-foresta-palava
- DB project ID: `ae420e4a-2f0f-4ec8-9be9-8c2e8b4744be`.
- MahaRERA **P51700032990**, legal promoter **Macrotech Developers Limited** (marketed as Lodha); applies to **Foresta A, B, H and I**, not Foresta C, D, G separately registered under P51700032683.
- First-party developer original price page https://www.lodhagroup.com/palava-city/projects/residential-property-in-dombivli/casa-foresta/price maps:
  - **2 Bed with Deck** starting **₹74 lakh+** (stored `price=0.74` crore); registered type RERA carpet **459–533 sq.ft**.
  - **2 Bed Ultima with Deck** starting **₹88 lakh+** (`0.88` crore); registered type RERA carpet **597–604 sq.ft**.
  - **3 Bed Optima with Deck** starting **₹99 lakh+** (`0.99` crore); registered type RERA carpet **699–702 sq.ft**.
  - **3 Bed Ultima with Deck** starting **₹1.22 Cr+** (`1.22` crore); registered type RERA carpet **752 sq.ft**.
- All are **named type-level developer-advertised starting prices, not price quotes for a confirmed available apartment number**. RERA type ranges from https://www.mumbaipropertyexchange.com/maharera-project/foresta-a-b-h-and-i/P51700032990 .
- Important caveat: **Lodha Casa Premier** happens to display the **same four published price bands** on its separate official page and is already published on Way2Paisa with separate RERAs P51700052337/P51700052950. Do not treat them as the same legal project and do not claim either site certifies actual current sellable units. We deliberately did **not** alter the existing Casa Premier record or stock.
- RERA derivative https://reragenie.com/p/foresta-a-b-h-and-i-dombivali-0f3moaih/ reports historical **one MahaRERA complaint**, no filed litigation and a completed registration label with filed completion in **November 2025**. That is *not enough to assert a tower-specific OC or ready-to-move* and the public status is **Completion and occupancy verification pending** with no invented delivery date.
- No new hero/gallery imagery or precise geocoordinates. Six provenance records, historical complaint disclosure and first-party/statuatory mismatch described in the buyer-facing overview.
- The public canonical route returned HTTP **200**, title `Lodha Casa Foresta Palava | 2 BHK From ₹74 Lakh`, correct RERA number, price, canonical and no-gallery notice.

## Migration preservation

- This audit is deliberately committed only to **`migration/cloudflare-free-static-first`**, rather than `main`, to avoid triggering an unnecessary new build/CPU on a Vercel Hobby account after an exhausted Fluid Active CPU alert.
- The Cloudflare static-first exporter baseline updated from **671 to 673 published projects** (`migration/cloudflare/build.mjs`: `MIN_PUBLISHED_PROJECTS || 673`); it will fail closed if any subsequent production snapshot has fewer records. The migration README now records **2,394 active inventory / 3,173 media**, while the original 1,161 private records are protected.
- The GitHub fixture CI tests page template construction, HTML escaping, admin React bundle and sitemap fixture, but does **not** prove complete live Supabase export, fully functional admin/promotions or lead forms on actual Cloudflare Pages. No connected Cloudflare account/project or `*.pages.dev` preview exists in this session. **Do not migrate www.way2paisa.in DNS** until Cloudflare preview tests and custom-domain readiness pass.
- The public Vercel sitemap uses a cache; first post-publication sitemap check returned HTTP 200 with **672** project URLs and **only Casa Olivia** added (Foresta not yet reflected). **Recheck 673 sitemap before claiming propagation.**

## Mandatory ongoing checks

1. Repeat `/sitemap.xml` and individual page HTTP tests after the cache refresh; sitemap must include all 673 project paths and preserve existing canonical host.
2. Check that buyer enquiry forms, CRM submissions, admin console and analytics still function; 200 server HTML alone does not certify these.
3. Source-based litigation/finance/OC/live unit allocation diligence for any potential transaction; don't call unknown booked inventory "guaranteed".
4. Work towards Cloudflare free-plan preview without switching DNS or treating free hosting as contractually guaranteed forever.
