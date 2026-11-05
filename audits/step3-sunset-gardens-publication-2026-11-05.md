# Way2Paisa — Sunset Gardens autonomous publication audit (5 Nov 2026)

**Status:** One new published residential project, subject to remaining Step 3 image-rights/media checks. No email or outreach. Step 4 is not part of this publication continuation.

## Database baseline and resulting state

- Database before transaction: **669** fully published/verified/complete projects, **2,382** active inventory (previous external cycle had published Dosti Willow), **3,173** active media.
- After transaction: **670** fully published/verified/complete projects; **2,384** active inventory; **3,173** active media. Private projects remain **1,161**.
- Added project: [Sunset Gardens by Marathon — Mulund West](https://www.way2paisa.in/projects/sunset-gardens-by-marathon-mulund-west).
- Project ID: `ebe697a1-c8d8-4cb0-a980-d70f9bc7b149`; RERA **P51800047418**; market Mumbai; category apartment; location Mulund West. Two new active developer-level starting-offer records and six dated `project_sources` records.
- Database uniqueness guard checked slug and exact RERA; prior query returned no duplicates.
- **No preexisting project, inventory, price, media, status, or coordinates changed.** Image media records unchanged.

## Current first-party offer, accurately distinguished from individual apartment quotes

Developer landing page: https://sunset.in/gardens/

- **Studio from ₹63.99 lakh all-inclusive**, clearly advertised as project-level starting offer.
- **1 BHK from ₹1.26 Cr all-inclusive**, also a separate starting offer.
- Project currently marketing studio and 1 BHK. **2 BHK explicitly SOLD OUT** per dedicated official apartment page, so no 2 BHK inventory was activated.
- The dedicated developer apartment page https://sunset.in/gardens-apartments/ separately shows *studio 208 sq.ft ₹58L* and *1 BHK 434 sq.ft ₹1.3Cr*, with other sizes and prices. This is a material first-party marketing inconsistency. The public listing uses the main landing-page all-inclusive starting offers but does **not** assign those prices to any specific carpet area, unit or floor. Flat-specific saleability/cost sheet requires fresh promoter confirmation.
- Active inventory rows hold `carpet_area_sqft=NULL` intentionally; never imply the cheapest price buys a particular developer plan. Project-wide figure and source disagreement are disclosed in buyer-facing prose and dated source records.

## Registration, promoter and construction details

- Registration **P51800047418**, legally filed promoter **United Enterprise**, marketed as Sunset Gardens under the Marathon Group/Sunset brand.
- Regulatory sources: https://reragenie.com/p/sunset-gardens-by-marathon-mulund-west-fhgdg3uv/ ; https://www.squareyards.com/mumbai-residential-property/marathon-sunset-gardens/192137/project/rera/p51800047418
- Originally filed completion: **31 Dec 2026**. Independent updated November 2026 regulator derivative https://gharkundli.com/projects/5249 reports **automatic four-month eligible extension to 30 Apr 2027**. This is recorded as a discrepancy requiring the latest signed certificate; neither is advertised as a guaranteed possession date.
- July 2026 developer construction updates https://sunset.in/gardens/construction-updates/ describe work in progress; the listing says *Under Construction*, not ready to move.
- Located by Devidayal Garden, D. C. Das Marg, Mulund West. Exact project entrance coordinates are not independently confirmed, so street-address Google Maps search is used. No inferred latitude/longitude inserted.

## Step 3 image and verification guard

- No unlicensed or unverifiable new hero/gallery images activated. Public site deliberately shows branded neutral fallback and a factual no-verified-gallery notice. This is **not media certification**, and Step 3 remains open.
- At a READY Vercel deployment, `/projects/sunset-gardens-by-marathon-mulund-west` returned **HTTP 200**, title `Sunset Gardens Mulund West | Studio From ₹63.99 Lakh`, canonical URL correct, RERA number and pricing rendered, explicit empty-gallery notice present.
- An early production `/sitemap.xml` fetch returned HTTP **200** with **669** project URLs and was **not yet refreshed** to include the new Sunset Gardens project (DB held 670 published). Treat as a 300-second cache/propagation verification item, not an indexing claim. Retest until there are 670 project URLs and the new canonical URL.
- Static server HTML checks do not establish interactive browser image rights or Google indexation.

## Next candidate safeguards

- Another source-qualified listing is not automatically publishable solely because it has a legal RERA identifier; inspect actual phase and currently advertised developer stock first.
- Existing project queues remain private where registration/OC conflicts, ambiguous promoter allocations, unlicensed galleries, duplicate phases or sold-out inventory persist.
- No emails, developer contact, resale activation, photo replacements, old price changes, or Step 4 actions within this continuation.
