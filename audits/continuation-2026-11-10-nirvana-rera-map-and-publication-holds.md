# Way2Paisa — 10 November 2026: Nirvana RERA geolocation, public access and publication holds

## Results
- **681 published** projects, **1,161 private** out of **1,842 total**, **2,413 active inventory** entries, **3,174 active media** entries; **no new entire projects published**, no prices/inventory/media flags or existing live status changed.
- **One verified published-project location-quality issue fixed:** Marathon Nexzone Nirvana, Phase 3 S6 Wings A and B, `marathon-nexzone-nirvana-collection-panvel`.
- **Published quality-check gap instances 45 → 44**; 14 published project records still have at least one outstanding check (mainly licensed project visuals, phase-specific inventory and exact geography).
- **Eight dated source-evidence records** inserted: 3 to support the geocode and 5 for source conflict/permission/availability holds. No emails, outreach, deployment, DNS or GoDaddy/Cloudflare/Vercel actions.

## Marathon Nexzone Nirvana — verified RERA Phase 3 geolocation

Project: **Marathon Nexzone Nirvana Collection (Wings A & B)**, Panvel, Raigad, Maharashtra, market MMR. Registered phase identifiers **PM1273032502296** (S6 Wing A) and **PM1273032502304** (S6 Wing B). Both separate regulator-derived project pages supply **precisely matching** registered parcel geocode **18.9656615, 73.128322**:
- Wing A RERA-derived filing: https://www.squareyards.com/marathon-nexzone-nirvana-palaspe-phata-navi-mumbai-npd-344051/rera/pm1273032502296
- Wing B RERA-derived filing: https://www.squareyards.com/marathon-nexzone-nirvana-palaspe-phata-navi-mumbai-npd-344051/rera/pm1273032502304
- Developer's matching NH4B/JNPT Road, Palaspe Phata Panvel address: https://marathon.in/nexzone/location/ and https://marathon.in/nexzone/contact-us/
- Independent older Dwello entire Nexzone township centroid **18.965999, 73.126866**: https://dwello.in/project/marathon-nexzone-by-marathon-at-panvel_c6af8cd5-af4c-4654-b8ad-c7831359f16b/directions . The township locator is not accurate enough to replace **phase-specific MahaRERA parcel map**. Neither exact entrance nor separate wing lobby is represented by the RERA point.

Applied `projects.latitude=18.9656615`, `longitude=73.128322`, project-coordinate Google Maps search URL `https://www.google.com/maps/search/?api=1&query=18.9656615%2C73.128322`, and buyer-facing project location_details explicitly says *registration parcel pin, not separately verified tower entrance*. Preserved existing `possession_original=RERA Wing A Dec 2029 | RERA Wing B Dec 2030`, date 2030-12-30 for aggregate sorting, existing 5 developer configuration starting offers, media, sale price and verified active status. New 3 `20261110_nirvana_*` source records.

Verified after commit: `public.project_enrichment_gaps(project_id)` now **[`genuine_project_hero`, `genuine_project_gallery`]**, previously location + hero + gallery. A `BEGIN READ ONLY; SET LOCAL ROLE anon;` query returned the corrected project Google Maps URL from the publicly visible `projects` row and counted **681** public projects and **2,413** visible active inventory. Thus public Supabase RLS/grants and correction are confirmed. Live GoDaddy HTML project-page/sitemap delivery and image display **NOT independently certified**.

## New-project publication research (none was safely activated)

### Emaar Fior 1, Rashid Yachts & Marina — Dubai
First-party Emaar community page https://www.emaar.com/en/our-communities/rashid-yachts-marina checked 10 Nov: 1–3 bedrooms from AED 2.2M, **Open to explore**, no individually named `Book Now` unit and no available-units count. https://offplandeals.ae/dubai/rashid-yachts-marina/fior-1 advertises generic 1/2/3 BR offerings with third-party WhatsApp booking, **not** named Emaar primary stock. Existing staged numbered private rows stay inactive. No invented saleable stock or asset rights.

### Emaar Marèva 2, The Oasis — Dubai
Developer https://www.emaar.com/en/our-communities/the-oasis and https://www.emaar.com/en/properties/mareva-2-at-the-oasis checked 10 Nov: 4–6 bedroom villa collection from AED 13.83M, labelled **Open to explore**, not first-party bookable allocated inventory. External agent https://www.oasisemaar.com/listings advertises 30+ named Marèva 2 villas with prices and `Verify`/enquiry buttons; agent assertion of direct developer inventory/availability cannot substitute an actual first-party `Book Now` confirmation. A matching AED13,875,888 / 8,267sqft DLD transaction appears 6 Aug 2026 in https://www.propertyindex.ae/dubai/the-oasis-by-emaar-mareva-2-the-oasis, which makes transaction/stock identity especially important. Project remains private; no guessed primary allocation or price set.

### H. Rishabraj Trident, Juhu — Mumbai
Developer https://www.hrishabraj.com/projects/trident confirms named premium 3/4BR Juhu scheme; Aug 6 2026 MPE https://www.mumbaipropertyexchange.com/project/hrishabraj-trident-juhu/33855 advertises approximate 3BR 1216sqft ₹6.68Cr, 1498 ₹8.23Cr, 1574 ₹8.65Cr, 1648 ₹9.06Cr, 4BR 1808 ₹9.6Cr; Sep 20 2026 Housiey https://housiey.com/projects/h-rishabraj-trident separately shows broader 2/3/4BR, ₹4.35–12.67Cr. Neither provides authenticated current flat-level developer allocation, with rehab/retail carpet differences and inconsistent dates. Preserve project private and verify final promoter unit availability and proper photos.

### Navkar Palace, Andheri West — Mumbai
Developer https://navkar.co/navkar-palace/ validates name/MahaRERA PR1180002500275 and apartment types, but gallery metadata on the **Palace** page refers to **Navkar Residency B wing**. Do not borrow project photography without resolving mismatch or commercial usage permission. Marketplace https://propx8.com/mumbai/flats-in-andheri-west markets 2BR 741sqft ₹3.85Cr, 3BR 1037sqft ₹5.42Cr, 4BR 1288sqft ₹6.58Cr while Housing.com https://housing.com/in/buy/projects/page/347717-navkar-palace-by-navkar-construction-in-andheri-west starts a 742sqft 2BR at ₹3.3Cr *excluding* many taxes and charges. No exact current promoter unit allocation/price basis reconciled; project kept private and verified status unchanged.

### Lodha Casa Foresta, Palava — MMR: status/OC evidence held
MahaRERA-derived latest ReraGenie registration https://reragenie.com/p/foresta-a-b-h-and-i-dombivali-0f3moaih/ identifies P51700032990 Foresta A,B,H,I, statutory promoter Macrotech, project **recorded Completed** and filed March 28 2024 OC and Form 4 completion documents. Registered original completion Nov 30 2025. This makes `completion and occupancy verification pending` status worth buyer legal recheck. Upload of documents into an OC portal slot **does not independently establish signed OC validity or that a specific floor/home is handover-ready**. Do not convert status into unqualified `Ready to Move`, alter prices, or infer phase-independent inventory from the larger Lodha Codename Premier umbrella.

Five `20261110_*` source evidence records inserted, one per candidate/status conflict. These project-hold notes are internal and do not clutter public configuration fields.

## Technical delivery and compliance

- Public GoDaddy site fresh HTTP `/properties` and `/sitemap.xml` still inaccessible to the independent web fetch; a ~3-week-old search-engine snapshot showed `0 projects found` but does **not** prove current production outage or zero active projects. Do not claim visitor-visible corrections without actual live HTML/bot test.
- Direct GitHub `main` inspection: `app/lib/public-projects.js` reads `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, pages use `revalidate=300`, and `app/sitemap.js` paginates public Supabase projects. The non-deployed `fix/godaddy-preview-hydration` env file has **both** expected environment variable **names**, but whether GoDaddy itself runs that Next.js server/build with those exact variables is not independently known; no secret contents printed or shared.
- Verified database schema contains the public projects/locations/developers columns actually selected by the app, and an anonymous read-only join showed all **681** published projects have accessible active developer/location relations. Thus **no obvious Supabase grant/column/foreign-key problem**, leaving GoDaddy deployment/runtime/network/caching and live-browser verification as next diagnostic.
- Supabase documentation October 30 2026 change to *new table* Data API grants does **not** retroactively revoke existing `projects`, `inventory`, `locations` or `developers` table read grants. Existing RLS policies passed read-only anon-role test. Do not modify those security permissions to fix an unverified frontend issue.
- The previously isolated date-only Next.js fallback test branch remains unmerged and NOT verified deployed to GoDaddy. Hosting/DNS/payment/email remain untouched.

## Remaining work
1. **Actually publish new projects** once the exact current promoter/agent-authorized stock, phase-specific RERA/DLD carpet/area, price/taxes, and genuine licensed project images pass the existing formal validator. No bypass of `project_enrichment_gaps` or activation of a stale `Sold Out`/resale/duplicate umbrella.
2. Get independent GoDaddy visitor/browser verification of `/properties`, `/sitemap.xml` and this improved Panvel map after deployment; do not assert live parity from a SQL read.
3. Clear remaining **44 published quality-check instances**, notably missing legitimate hero/gallery for Nirvana and many others; prioritize approved images and current exact allotment.
