# Way2Paisa — 6 November 2026: three additional verified Lodha projects activated

**Goal:** source-backed new project publication, no existing listings deleted or repriced, no promotional outreach, and no uncontrolled DNS/hosting change.

## Production database audit

| Metric | Before | After | Net |
|---|---:|---:|---:|
| Active, verified, complete published projects | 676 | **679** | **+3** |
| Active inventory records | 2,402 | **2,409** | **+7** |
| Active project-media rows | 3,173 | **3,173** | 0 |
| Private project rows | 1,161 | **1,161** | 0 |

New records used slug-and-MahaRERA-not-exists guarded, transactional Supabase inserts with the correct existing Lodha developer master. Seven new *marketing start-price offers* were activated, and **21 distinct field-level provenance records** were added. No old project, active inventory, price, media, original description, coordinates or published status was changed. The three projects keep **hero_image_url=NULL** with no newly licensed media, so their existing branded image fallback is used.

## 1. Lodha Signet Kalyan–Shil Road — Commercial Offices

- DB ID `b0468912-42e2-47ef-bf5a-5fedf78862c6`, slug `lodha-signet-kalyan-shil-road-offices`, public https://www.way2paisa.in/projects/lodha-signet-kalyan-shil-road-offices
- Market MMR, location Palava/Kalyan–Shil Road near Central Avenue; office category; marketed by Lodha; legal promoter Lodha Developers Limited.
- Distinct RERA **P51700054751**, regulator's filing name **Palava Signet 2**, not the separate already published Signet Thane/Matunga/Vikhroli registrations.
- First-party project https://www.lodhagroup.com/projects/commercial-property-in-mumbai/lodha-signet-kalyan-shil-road and first-party prices https://www.lodhagroup.com/projects/commercial-property-in-mumbai/lodha-signet-kalyan-shil-road/price
- Three developer-advertised starting offers: **375 sq.ft ₹85 lakh** (`price=0.85` crore), **383 sq.ft ₹90 lakh** (`0.90` crore), **550 sq.ft ₹1.25 Cr** (`1.25` crore). The developer marketing does not certify these marketed square feet as **RERA carpet** or as a specific currently unbooked office's dimensions, so `carpet_area_sqft=NULL` for all three active inventory rows. Retail mentioned but *not priced*; no invented retail stock or price.
- Filing derivative https://reragenie.com/p/palava-signet-2-kole-fiuptaof/ confirms target **31 Jul 2027** unchanged at the 23 June 2026 regulatory snapshot, a partially built commercial structure, and historically 380 of 517 units booked. Historic unbooked figures are **NOT** available developer stock at the starting price. ReraGenie reports no lawsuits/complaints/encumbrances *in that snapshot*, not a final legal opinion; confirm current promoter/regulator disclosures.
- Six new `project_sources`. No speculative coordinates and no copied project imagery.
- Verified HTML **HTTP 200** with canonical, expected SEO title `Lodha Signet Kalyan–Shil Offices | From ₹85 Lakh`, correct RERA, price and explicit no-photo-gallery notice.

## 2. Lodha Bellavista Thane — Wings B1 and B2

- DB ID `4edd0940-ed09-4fea-9a38-4395adface9e`, public https://www.way2paisa.in/projects/lodha-bellavista-thane-west
- First-party https://www.lodhagroup.com/projects/residential-property-in-thane/lodha-bellavista and first-party price list https://www.lodhagroup.com/projects/residential-property-in-thane/lodha-bellavista/price
- Developer-marketed **2 BHK with deck ₹1.67 Cr+** and **4 BHK ₹4.04 Cr+**, the only two active offers newly created. Penthouse is on-request on developer site but **no invented price was created**.
- Registered in **two distinct RERA wings**: B1 **P51700024815**, B2 **P51700024060**. These belong to the same marketed site, so one nonduplicated collection-level project was activated; **no statement** that each size or price applies to both wings. Both derive promoter Lodha Developers Limited, original completion **Dec 2025** revised to **31 Jul 2028** after two statutory extensions, *under construction*, with no individual OC certified. Field `possession_date=2028-07-31` represents the common filed revised target, **not guaranteed contractual handover**.
- Filing summaries: https://reragenie.com/p/lodha-bellavista-wing-b1-off-ghodbunder-road-thane-50he593o/ and https://reragenie.com/p/lodha-bellavista-wing-b2-off-ghodbunder-road-thane-34d5rv1y/ . B1 one court matter, ReraGenie no complaint Jun 2026; independently https://gharkundli.com/projects/10606 Oct 2026 says one complaint. B2 ReraGenie one complaint and no litigation in mid-2026, whereas https://gharkundli.com/projects/10485 Oct 2026 reports two complaints and a court matter. **Secondary summaries conflict; do not state an unconditional clean legal status or case finding. Verify latest MahaRERA and court records with counsel before a booking.**
- RERA filing B1 apartment type ranges (from https://deedo.in/thane/thane-m-corp/lodha-bellavista-wing-b1/ ) show 2 BHK about 690–703 sq.ft, 4 BHK about 1,851–2,006 sq.ft; **not mapped to an actual allocated apartment at developer's marketed from-price**, hence two inventory `carpet_area_sqft=NULL`.
- Regional RERA derivative coordinates 20.2152, 73.7986 are inconsistent with the independently established Thane locality; **latitude/longitude not saved**, address-based Google Maps search only. No unlicensed hero/gallery added.
- Eight new `project_sources`. Verified page HTML **HTTP 200**, canonical, `Lodha Bellavista Thane | 2 BHK From ₹1.67 Cr`, both RERA identifiers, price and no-gallery notice.

## 3. Lodha Signet Thane — Kolshet Road Offices

- DB ID `16f03d9b-7316-4493-9c1c-f54589e865b4`, public https://www.way2paisa.in/projects/lodha-signet-thane-kolshet-road-offices
- Official developer page https://www.lodhagroup.com/projects/commercial-property-in-thane/lodha-signet-thane and first-party two-variant office price page https://www.lodhagroup.com/projects/commercial-property-in-thane/lodha-signet-thane/price
- Developer marketing: **358 sq.ft office from ₹1.05 Cr+** and **487 sq.ft office from ₹1.35 Cr+**, stored in INR crores. Both sizes are **generic developer advertised office-format dimensions**, not validated RERA carpet or numbered currently saleable office; structured `inventory.carpet_area_sqft=NULL` for both.
- RERA **P51700050421**, legal registered name Lodha Signet B – Kolshet, commercial building, legal promoter Lodha Developers Limited. Separate from the other Signet projects. Under construction.
- https://reragenie.com/p/lodha-signet-b-kolshet-balkum-0jbqvfcm/ cites original **30 Nov 2027** filed deadline, 522 units/294 historically booked and no court/complaint entries at its July 2026 snapshot. Later https://gharkundli.com/projects/12327 reports automatic statutory four-month extension to **March 2028**, one MahaRERA complaint and two court cases, while https://www.rerainspector.com/projects/43965/P51700050421 lists two court matters and full-height CC still in progress, with no OC. No definitive possession or legal clearance is claimed, as **the derivatives conflict**. Registered inventory units 522/523 and bookings also differ across derivative vintages and should not be presented as current remaining stock.
- New project status explicitly **Under Construction**, no guaranteed occupancy date, no photos without licensed access or speculative GPS, seven source evidence rows.
- Verified public HTML **HTTP 200**, canonical, SEO title `Lodha Signet Thane Offices | From ₹1.05 Cr`, exact RERA and price, neutral missing-verified-gallery notice.

## Sitemap / SEO / deployment

- All **three** new pages returned **HTTP 200**, their canonical metadata and visible RERA/prices checked. This verifies server HTML only, **not Google indexing**, browser photo authorization, individual inventory, or successful CRM form submit.
- The **first sitemap poll** shortly after the inserts returned HTTP **200 with 678 project URLs** and included Bellavista and Kalyan–Shil Signet but did **not yet include** the newest Kolshet Signet. A **679-project sitemap refresh is required** before claiming all new URLs are included; earlier published projects have not been removed.
- Vercel account previously warned of exhausted Hobby Fluid CPU; to avoid extra Vercel production builds, the audit and Cloudflare migration updates are committed **only** to isolated branch `migration/cloudflare-free-static-first`, not production `main`.
- Cloudflare build default `MIN_PUBLISHED_PROJECTS` updated **676 -> 679**. Isolated README records database totals **679 published / 2,409 active inventory / 3,173 media / 1,161 private**. Full-fidelity premium Vercel layout, protected admin/Promotion Studio, CRM, GA, lead form, sitemap and image rights must be tested on a real `*.pages.dev` preview before DNS/host cutover. **There is still no connected Cloudflare account or live Cloudflare deployment confirmed by this audit.** Do not promise eternal free hosting; free-tier terms/quotas can change.

## Candidates held, not activated

- **Lodha Elanor**, Thane: developer markets 3BR from ₹2.29Cr and 3+study from ₹2.79Cr, but Tower 1 **P51700046312** currently has a RERA-derived record of a single registered apartment, a declared ongoing matter and delayed construction with official target shifted June2028 to 2031/2032; Tower 2 **P51700046313** reports an open complaint and delivery moved to Dec2031. There is no independently verified advertised price to a legally consistent specific current tower/apartment. Hold rather than publish a generic estate price or mislabel a tower. Sources https://www.lodhagroup.com/projects/residential-property-in-thane/lodha-elanor/price ; https://reragenie.com/p/elanor-tower-1-dhokali-jpgylqnc/ ; https://reragenie.com/p/elanor-tower-2-dhokali-cf2q8tis/ .
- **Lodha Sterling**, Thane: official site explicitly says ready-to-move apartments are **sold out**, with a newer Kensington Square phase mentioned. There is no current launch-specific promoter RERA/available unit price mapped to the new phase. No fake immediate possession offering created. Source https://www.lodhagroup.com/projects/residential-property-in-thane/lodha-sterling .
- **Lodha Promina Worli**: valid commercial RERA **PC1170002501811**, but verified current developer office prices are not published. No unsourced pricing invented. Sources https://www.lodhagroup.com/projects/commercial-property-in-mumbai/lodha-promina-worli and https://askrera.com/projects/lodha-promina-pc1170002501811/ .

**User constraints maintained:** No email/developer outreach, no unverified image substitutions, no existing prices or published statuses changed, Step 3 media verification open, Step 4 held, no changes to GoDaddy DNS or production hosting.

## Final sitemap propagation confirmed

- Following the initial cached **678-project** XML response, both a separate uncached query and then the **unmodified canonical public** `https://www.way2paisa.in/sitemap.xml` returned **HTTP 200, 679 project URLs and 687 total sitemap URLs**.
- All three new paths were present: `lodha-signet-kalyan-shil-road-offices`, `lodha-bellavista-thane-west`, `lodha-signet-thane-kolshet-road-offices`.
- The public homepage separately returned **HTTP 200** with the expected premium Way2Paisa homepage title. No DNS or code changes on live `main`.
- Cloudflare's separate static build has **minimum 679 active published projects** guard committed and its synthetic GitHub build tests passed. This does **not** validate browser-level premium layout parity, admin, CRM, lead notifications or Cloudflare deployability and is **not an authorisation to switch DNS**.
- Final controlled cycle count from Supabase: **679 published**, **2,409 active inventory**, **3,173 active media**, **1,161 private projects**. Three new projects, seven new active developer starting-offer configuration records and 21 provenance records.
