# Way2Paisa Mumbai/MMR — Godrej Bliss hero integrity, Delta Meadows incorrect GPS and live cache mismatch, project comparisons

**Date:** 14 November 2026 (IST)  
**Scope:** targeted live catalogue corrections and evidence-based internal SEO; no GoDaddy deployment, hosting migration, developer/customer communication, or external email.

## Confirmed completed database work

### 1. Godrej Bliss, Kandivali East: quarantined media must not leak as a public hero

- Published project `bliss-godrej-properties-kandivali-east`, MahaRERA **P51800051172**, remains **active=true** and verified; existing 2/3BHK ₹2.02–3.18Cr archived vendor price configurations and availability statuses unchanged.
- Audit of **474 active Mumbai/MMR projects with non-null `hero_image_url`** found **only one** whose public hero was the exact URL of an **inactive** `project_media` entry under a pending reuse/delivery licence and which had **no alternative active+verified project media**: Godrej Bliss.
- Its prior direct Godrej CDN hero: `https://gplwebsitecdnblob.blob.core.windows.net/godrej-cdn/Images/Godrej-Bliss-Mumbai-Gallery01-1332X750++%281%29d83a8173-2b1d-4345-89ec-cf21498f9389.webp`.
- Current GitHub `app/projects/[slug]/page.js` directly used `projects.hero_image_url` for public hero and OpenGraph; `app/api/project-image/route.js` also tried the raw hero independently of `project_media.active/verified_at`. Thus the official source URL **did not** establish a commercial licence, despite project media being quarantined.
- **Guarded SQL update cleared just `projects.hero_image_url` on this one project**, after verifying `active=true`, matching RERA, exact original URL, no active verified hero/gallery and an inactive same-image row labelled `first_party_hosted_candidate_commercial_reuse_grant_and_browser_delivery_pending`. Original URL preserved in inactive `project_media` and in dated `project_sources` record `godrej_bliss_unlicensed_hero_public_fallback_20261114`.
- Post-check confirmed `hero_image_url=NULL`, `project_media.active=0`, published flag unchanged. Fresh live page's OpenGraph image now references `https://www.way2paisa.in/opengraph-image` (Way2Paisa brand); image proxy `/api/project-image?project=79ce7d20-0a32-4dc5-9816-d8e5a7e996b1` returns **HTTP 404**. The exact image delivery/fallback visual across all browsers was not separately certified, though stale nonapproved CDN URL no longer appears as OG image.
- **Media quality gap remains open**; no image licence acquired, no media reactivated, no price or existing inventory changed.

### 2. Active public images reused across phases: reviewed without false deduplication

- SQL across active Mumbai/MMR hero and gallery media revealed **49 distinct URLs shared across two or more published projects**; highest-sharing URLs occur within known multi-phase master projects Dosti West County (7 phases), L&T Crestoria (5 towers), Godrej Reserve (4 wings), Rustomjee La Vie (4 wings), Adani Airica (3 towers), and L&T Island Cove (3 variants). Shared master amenity images are not automatically wrong tower images; no indiscriminate removal.
- **19 duplicated URL entries within the same individual project** were all **intentional one active hero plus one active gallery occurrence** of the exact image. Examples: Lodha Sea Face, Aaradhya Parkwood 2, L&T Crestoria Towers1–5, Mahindra Vista Phase2, Godrej Square, Galaxy Heights Tower II. None was two misleading separate gallery images. No active images deactivated.

### 3. Delta Meadows, Andheri West: invalid map coordinates corrected in database

- Published `delta-meadows-delta-group-andheri-west`, MahaRERA **P51800078499**, first-party developer https://www.deltarealty.in/ongoing/delta-meadows/ and corroborating brochure https://imagecdn.99acres.com/media1/30159/0/603180469O-1748938307215.pdf identify the true site **J. P. Road, opposite Andheri Sports Complex, Azad Nagar, Andheri West, Mumbai 400058**, near Azad Nagar Metro (~200 metres).
- Historical `latitude=19.1609643100472`, `longitude=72.8536558832031` from SquareYards placed the project adjacent to **Goregaon-area** other developments, inconsistent with the developer site. This was **already flagged as wrong in internal notes on 27 Oct 2026**, and distance recommendations had been disabled, but invalid numeric data remained in `projects` to avoid a validator gap. Another NoBroker marker also conflicted; no first-party certified exact numeric building entrance pin was found.
- **Guarded correction:** set both `latitude` and `longitude` to **NULL**; preserved the **developer exact street-address map-search URL** `https://www.google.com/maps/search/?api=1&query=Delta+Meadows%2C+JP+Road%2C+opposite+Andheri+Sports+Complex%2C+Andheri+West%2C+Mumbai+400058`. No GPS guess, no recommendation added and no project status/inventory/price changed.
- Dated source note `delta_meadows_remove_wrong_goregaon_pin_20261114` preserves old coordinates and first-party source.
- **Validator tradeoff clearly recorded:** the total active Mumbai/MMR `public.project_enrichment_gaps()` count increased from **13 to 14**, and geographic gaps from **7 to 8**, because a known-false coordinate is properly marked missing instead of considered valid. Original **13 projects with missing hero/gallery** and **9 with missing configuration-level inventory** remain unchanged. The new 14th project, Delta Meadows, needs only certified GPS. This is a genuine data-quality correction, not lost project content.

### 4. Delta Meadows: internal map QA notes removed from public description **in Supabase**, LIVE REFRESH OPEN

- The public `location_details` field contained raw text beginning `27-Oct-2026 maps QA` including SquareYards and NoBroker coordinate disputes, plus a new 14 November database audit sentence. This is not acceptable customer-facing project copy.
- Guarded SQL replaced public `location_details` with:

  > Delta Meadows is located on J. P. Road, opposite Andheri Sports Complex, Azad Nagar, Andheri West, Mumbai 400058. The developer lists Azad Nagar Metro approximately 200 metres away, D. N. Nagar Metro approximately 650 metres away, and Andheri railway station approximately 1.9 kilometres away. The map opens the project’s official street address.

- Old complete location-copy preserved verbatim in internal `project_sources` `delta_meadows_public_location_qc_copy_removed_20261114` along with original coordinate discrepancy. `enrichment_notes` continues retaining internal historical audit.
- SQL read-back **passes**: no technical `maps QA` copy in current public field; an active Mumbai/MMR scan of direct technical audit-pattern location details finds zero remaining matches.
- **IMPORTANT LIVE QA BLOCKER:** The website `https://www.way2paisa.in/projects/delta-meadows-delta-group-andheri-west` still serves the **OLD** technical location paragraph in an independent live read-only check after the DB save; same on apex `https://way2paisa.in/projects/delta-meadows-delta-group-andheri-west?copycheck=20261114b` and www with distinct query. **DO NOT CLAIM THIS USER-FACING DISPLAY FIX IS LIVE YET.**
- Current GitHub project page source exports `revalidate=300`, `fetchCache='default-cache'` and `next.revalidate:300` on Supabase reads. GoDaddy/Airo deployment may have an additional separate HTML/Data cache or source divergence. Need a safe authenticated cache/revalidation/source-freshness check respecting premium production and no unauthorised GoDaddy restart/publish. A query-string variant did not force fresh project copy. No cache purge or deployment was attempted. Existing user enquiries/admin kept safe.

## 5. SEO Step 4: proximity-link insert and enforced 5km radius

- Initially selected **nine** valid same-market/same-category apartment comparisons with source/target both active and verified, target not sold-out, and non-null coordinates:
  - Dosti Willow: Rustomjee La Vie Wing B ~**0.71km**, Rustomjee Verdant Vistas ~**1.01km**, Narang Privado Tower B ~**1.07km**.
  - Lodha Belmont Richmond County: Dosti Greater Thane ~**3.65km**, Mahindra Happinest Kalyan-2 Project B ~**5.00km**, Dosti West County Maple ~**5.29km**.
  - Marathon Nirvana Panvel: Godrej Golf Crest ~**6.32km**, The Highlands ~**6.39km**, Green Terraces ~**6.52km**.
- All distances generated in SQL with great-circle formula, **approximate straight-line**, not road time or guaranteed survey-pin accuracy. No map coordinates added or changed for these projects.
- **Critical post-insert catch:** trigger `trg_enforce_project_recommendation_radius`, function `public.enforce_project_recommendation_radius()`, automatically changes new `project_recommendations.active=false` when **India distance_km >5.0** (Dubai >2.0). Thus despite original INSERT RETURNING nine, only **FIVE** became active: **3 Dosti Willow + 2 Lodha Belmont**. **ZERO new Nirvana links** remained active. Not a tool failure, but expected site safeguard.
- Final cleanup removed only four newly inserted **inactive** out-of-radius candidate rows, zero previously active rows. The full original candidate and radius analysis is preserved in dated `project_sources` `step4_same_market_apartment_proximity_links_20261114`, reconciled with actual active counts, append notes.
- The **real new active links = five**, across **two newly covered source pages**. Database active Mumbai/MMR recommendation count increased from **2,177 to 2,182**; source coverage from **465/486 to 467/486**. Dosti Willow live page visibly names La Vie, Verdant Vistas and Narang Privado; Lodha Belmont names Dosti Greater Thane and Mahindra Happinest; some generic related listings may also appear but are not counted as newly added graph edges.
- No misleading long-distance "nearby" links left active or force-enabled.

## 6. Final live and database reconciliation

- **682 published projects** (Mumbai 367, MMR 119, Dubai 196). **No project activation/unpublication** this cycle.
- **1,731 active Mumbai/MMR inventory records**, 495 `Confirm Availability`, 0 unqualified `Available`. No price/area/RERA inventory modification.
- Published Mumbai/MMR quality flagged **14** after correctly nulling Delta Meadows bad GPS (previous 13), with **13** missing approved hero/gallery, **9** exact configuration inventory gaps, **8** geo verification gaps (overlap; not additive).
- Dosti Willow and Lodha Belmont now have 3 and 2 active newly added rec edges respectively, five total; Marathon Nirvana 0 new active recommendations because nearest valid comps >5km.
- Godrej Bliss remains active, raw public hero field null, OpenGraph branded fallback verified. Original direct images retained inactive and licence unresolved.
- Delta Meadows database now has correct street-address text and null GPS; **live website STILL STALE** on description. Explicit next-release blocker.

## 7. Pending production changes and no-email constraint

Draft PRs still held, unmerged, not deployed:
- [#17](https://github.com/way2paisaindia/way2paisa-public/pull/17) — land-only status must not display `Ready to Move` as built housing.
- [#20](https://github.com/way2paisaindia/way2paisa-public/pull/20) — mixed Mahindra Meridian villa/plot area cell.
- [#22](https://github.com/way2paisaindia/way2paisa-public/pull/22) — Lodha Signet commercial **marketed** sizes without false RERA carpet and neutral `Configurations & Pricing` heading.
Need current GoDaddy/Airo project code, preview tests, premium homepage preservation, project-photo isolation, CRM and lead workflows and cache integrity before any public code deployment. A successful Netlify preview CI status is **not** a GoDaddy release proof.

Original first-party Godrej/Marathon imagery rights remain unconfirmed; no images activated or copied to production. Do not send developer emails, form enquiries or purchase subscriptions.

**No emails sent. No GoDaddy restart/deployment. No paid actions. No project price, inventory or publication changes.**
