# Way2Paisa Step 3: SEO titles, image-service audit and source reconciliation
**Date:** 4 November 2026 IST  
**Outcome:** Operational fixes deployed; media Step 3 remains **OPEN**; Step 4 **ON HOLD**.

## Production baseline and final guard
Queried Supabase project `dqoxrsywknsgkxrdrxep` after writes:
- **667** published / verified / complete projects (unchanged)
- **2,379** active inventory (unchanged)
- **1,161** private projects (unchanged)
- **1,352** inactive inventory (unchanged)
- **3,173** active media rows (unchanged; source provenance retained)
No price, available inventory record, public-project activation or developer outreach was changed.

## Five real truncated SEO titles repaired in database
Customer-facing SEO titles were cut off inside a word, e.g. `Emaar Bea`. Corrected these five verified published records *only*, without modifying configurations or prices:

1. Emaar Bayview by Address Resorts -> `Emaar Bayview by Address Resorts | Emaar Beachfront`
2. Emaar Palace Residences Hillside A -> `Emaar Palace Residences Hillside A | Dubai Hills`
3. Emaar Vida Residences Hillside -> `Emaar Vida Residences Hillside | Dubai Hills`
4. Raymond The Address by GS, BKC First Circle -> `Raymond The Address by GS | BKC First Circle`
5. Shapoorji Pallonji The Canvas Residences, Sewri -> `Shapoorji Pallonji Canvas Residences | Sewri`

Commit `2b6531b0c5d1783747ceef8e0d80049d85ef1491` also fixes the generated metadata title builder in `app/projects/[slug]/page.js` so it truncates on complete word boundaries rather than `.slice(0,n)` inside a word. Vercel corresponding deployment `dpl_FGWTQpkvVK6qL8orw8mCnVR2ofcD` reached READY.

Production page HTML after ISR refresh verified HTTP 200 and the final titles for Emaar Bayview, Emaar Palace Hillside A and Emaar Vida Hillside. Other two database corrections are recorded; production page snapshots should be refreshed before claiming their live titles.

## 15 production hero image-relay tests (distributed Mumbai/MMR/Dubai)
Queried `https://www.way2paisa.in/api/project-image?project=<published UUID>` for 15 selected published projects:
- Binghatti Skyrise — 200
- DAMAC Chelsea Residences — 200
- Danube Bayz 102 — 200
- Sobha 310 Riverside Crescent — 200
- Sobha The Woods Abode — 200
- Dosti West County Nest Phase 3 — 200
- Ascenta Basalt Hills — 200
- Blue Zone Mumbai — 200
- Kalpataru Srishti Namaah — 200
- **Dosti Eden — 422**
- Lodha Bellevue — 200
- Saffron by Buildarch-GP — 200
- Rustomjee Ashiana — 200
- Sayba Samriddhi — 200
- Arkade Evoke — 200

The 14 HTTP 200 statuses certify only image-service responses, not actual project visual composition, copyright licence or independently tested visitor-browser experience.

### Dosti Eden exact-image 422 failure and safe response
Existing project `aa8a76a0-b196-4c3a-911e-373a57ec03f1`, RERA `P51700049421`, official source https://dostirealty.com/project/dosti-eden:
- Hero `https://admin.dostirealty.com/uploads/Dosti_Eden_Banner_Image_36da48e6b8.jpg`: 422
- Living room `https://admin.dostirealty.com/uploads/living_room_spec_5aa227f032.jpg`: 422
- Pool `https://admin.dostirealty.com/uploads/Pool_with_Sundeck_59b56a1b9b.png`: 422
- Gym `https://admin.dostirealty.com/uploads/Gymnasium_44dc4bab3a.png`: 422

A Dosti-sourced alternate `https://dr1smgqbv7ncv.cloudfront.net/uploads/Dosti_Eden_Banner_Image_36da48e6b8.jpg` was tested as the live hero and **also returned 422**. A guarded SQL rollback immediately restored the prior project's original hero and media URL; no untested CDN URL was left in production.

Commit `4c6b61a6d65cc3ce08e7688d6a1bad913de62df8` adds these four exact, tested-unavailable URLs to the project's existing *client-side and image-service exclusion list* in `app/lib/unavailable-project-media.js`. Old media/source records remain for provenance.

Vercel deployment `dpl_6rujcjZzctzYEWDfd8nPWFoqEqL3` reached **READY**. Production Dosti Eden SSR page returned **HTTP 200**, displayed `A verified project photo gallery is not currently available...` and image relay returned deliberate **404** (known source unavailable) instead of repeatedly fetching four bad URLs. `ListingImage` provides a neutral `Project photograph temporarily unavailable` fallback. This is **not** successful media restoration.

## Six source records added for legal/stock guardrails
New dated `project_sources` records, all without changing live stock:
1. Dosti Eden — four image 422 diagnoses and CDN rollback
2. Emaar Fior 1 — Emaar official `Open to explore / Enquire` from AED 2.2m; not a first-party `Book Now` unit
3. The Sands, Sasawane Alibaug — first-party villas from INR 9.25Cr++ vs statutory six one-floor bungalow units with reported carpet 335–380 sq.ft; construction and OC status inconsistent with ready-to-move marketing
4. Birla Mrida — first-party 68-acre/539-plot identity and clearly representative imagery; no validated current numbered-plot cost sheet
5. Emaar Golf Trails — first-party community feed shows project starting AED 1,906,888, 17 units remaining; Way2Paisa preserves 20 historical partner-advertised active references, each requires developer reconfirmation and may not all remain available
6. Emaar Urbana III — official exact 2BR ES Urbana III-Block 29-101 1,214 total sq.ft AED1,957,888 already privately staged, but unavailable legacy Emaar CMS media and exact building coordinates prevent publication.

### Remaining gates
- Dosti Eden: obtain stable, same-project, permission-cleared genuinely serving photographs and test all hero/gallery endpoints.
- Emaar: 71 legacy image-hero issues and 277 related active media rows were already flagged in earlier audit. Do not bypass rights or substitute duplicates.
- Search Console: only a fresh Google indexing export can measure actual indexing changes versus prior excluded pages.
- **No emails sent. Step 4 held until Step 3 is complete.**
