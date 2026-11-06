# Way2Paisa — Continuation: accurate RERA dates, Godrej RKS private pipeline and copy QA

**Run date:** 6 November 2026 · **User scope:** continue autonomously, favor verified Mumbai/MMR real estate publication, preserve published inventory and high-end site; retain ₹0 Cloudflare migration separate; **no emails or developer outreach**.

## Verified production baseline (after all writes)

| Metric | Before | After |
|---|---:|---:|
| Active + verified + complete published projects | **681** | **681** |
| Active inventory | **2,412** | **2,412** |
| Active project-media records | **3,173** | **3,173** |
| Private / unpublished project records | **1,160** | **1,161** |
| Project URLs in canonical live sitemap | **681** | **681** |

- The single new prospect `godrej-rks-rk-studios-chembur` is private; its live URL returned **HTTP 404**; the sitemap returned **HTTP 200** and did not include its path. The two edited existing public commercial URLs returned **HTTP 200**.
- No developer price or inventory record was updated, no existing published project was unpublished, no images copied, and no domain/hosting changes occurred.

## Two safely corrected published records — *registered statutory completion dates, not guaranteed possession*

### Lodha Signet Kalyan–Shil Road

- Public path `/projects/lodha-signet-kalyan-shil-road-offices`; project UUID `b0468912-42e2-47ef-bf5a-5fedf78862c6`.
- RERA **P51700054751** registered separately under name **Palava - Signet 2**, legal promoter Lodha Developers Limited.
- `possession_date` now accurately stores **2027-07-31**, previously NULL, after RERA record cross-verification: https://gharkundli.com/projects/12894 (October 2026 statutory check), https://reragenie.com/p/palava-signet-2-kole-fiuptaof/ (23 June 2026 filing), https://www.rerainspector.com/projects/46120/P51700054751 .
- Other fields retained: status remains **Under Construction**; no Occupancy Certificate publicly verified for this office. Site original project `https://www.lodhagroup.com/projects/commercial-property-in-mumbai/lodha-signet-kalyan-shil-road`.
- The DB's `project_enrichment_gaps` no longer returns `possession_and_status` for this record; remaining gaps are **exact_configuration_inventory**, **geographic_coordinates**, **genuine_project_hero** and **genuine_project_gallery**.
- Source provenance entry `20261106_latest_registered_completion_crosscheck` added. No office prices, marketed area basis or availability changed.

### Lodha Signet Vikhroli

- Public path `/projects/lodha-signet-vikhroli-offices`; project UUID `af7edfe0-886c-41e4-94ee-307f82ba8f7c`.
- Commercial RERA **P51800047504**, legal promoter Lodha Developers Limited. The registered **revised** completion is **2029-06-29**, **24 months later** than original 30 June 2027.
- `possession_date` now stores **2029-06-29**, previously NULL; cross-checked October 2026 https://gharkundli.com/projects/5117 and ReraGenie https://reragenie.com/p/lodha-vikhroli-signet-vikroli-y7isyn5c/ .
- Status remains **Under Construction**. The recorded date must never be read as an OC, developer guarantee of handover or available-unit confirmation.
- The checker `possession_and_status` gap is resolved; four gaps remain: **exact_configuration_inventory**, **geographic_coordinates**, **genuine_project_hero** and **genuine_project_gallery**. Evidence note `20261106_latest_registered_completion_crosscheck` added.
- Existing ₹1.90 Cr+ office marketing threshold, availability disclaimers and inventory rows were **not** modified.

**Aggregate checker effect:** 681 total published; **667 already zero-gap**, **14** still have at least one gap. Open `possession_and_status` cases reduced **7 → 5**, with no false GPS, invented media or assumed exact saleable office stock.

## New high-value private pipeline record — Godrej RKS, former RK Studios, Chembur

- Private UUID `fcbddfe9-f95c-42f2-b198-c676082c8a5a`; slug `godrej-rks-rk-studios-chembur`; **not** a published live catalogue record.
- Registered **MahaRERA P51800023915**, legal developer **Godrej Projects Development Limited**, marketed by Godrej Properties. Official source: https://www.godrejproperties.com/mumbai/residential/godrej-rks/landingpage/source/SFDC/campid/77286 , first-party registration: https://www.godrejproperties.com/mumbai/residential/godrej-rks/landingpage/project-location .
- Current first-party promotion advertises **3 BHK from ₹7.45 crore** and **4 BHK from ₹11.50 crore** as *indicative agreement values*, **excluding** GST, registration, stamp duty, PLC and floor rise. Older Godrej overview https://www.godrejproperties.com/index.php/mumbai/residential/godrej-rks/overview advertises broad 3/4BR from ₹7.25Cr, a cross-campaign difference. None of those prices is explicitly attached to a **specific newly unsold** promoter-listed flat or exact RERA carpet. Therefore project `min_price=NULL`, **zero active inventory**.
- Developer historical product-size description: 3 BHK Luxe 1316 sq.ft, Regal 1502 sq.ft, Supreme approx1465 sq.ft; 4 BHK Regal approx2258 sq.ft. These are marketed/plan product types, **not confirmed 2026 developer stock**.
- RERA derivative https://reragenie.com/p/godrej-rks-chembur-e3f6ynl3/ shows **Completed** project registration, committed 30 Dec 2024; its available historic snapshot is **7 October 2024**, with **7 MahaRERA complaints** and **149 registered units, 132 historically booked**. Some OC/CC documents were uploaded in Dec 2023, but exact wing/floor coverage and current case dispositions remain to be inspected. Secondary October 2026 https://propertywala.com/godrej-rks-mumbai corroborates completed registration and seven complaints; **historic unsold is not today's current developer allocation**.
- Secondary resale at https://www.mumbaipropertyexchange.com/property/9984248/3-bhk-godrej-rks-chembur is a **resale** 3 BHK 1316 sq.ft asking ₹6.25Cr as of 20 Sep 2026. **It is not promoter new-sale inventory** and was excluded from the new-project selling-price record.
- Project has **seven** new field-specific source evidence rows. It is **active=false, verified=false**, with `enrichment_status=hold_current_promoter_numbered_flat_price_carpet_usable_gallery_and_wing_oc_legal_diligence`, no hero, no gallery and no speculative precise map coordinate.
- Current `public.project_enrichment_gaps(id)` returns exactly **exact_configuration_inventory**, **geographic_coordinates**, **genuine_project_hero** and **genuine_project_gallery**. These must be resolved with authentic promoter allocation, rights-cleared actual-project photos and exact tower location before real publication. The RERA complaint/wing occupancy checks are additionally a legal buyer-diligence task.

## Public-facing page copy hygiene

Read-only scan over **all 681 published projects**:

- No customer-facing `projects.description` matches for the checked internal sourcing/audit patterns (such as `Way2Paisa currently presents`, `internal audit`, `source provenance`, `private note`, `enrichment_status`).
- No active `inventory.availability` matches for checked internal allocation/research strings or text longer than 300 characters.
- **0 of 681** published project `description` fields contain the Way2Paisa brand name; **0** exceed 1,800 characters.
- This is a *pattern-based quality scan*, not a guarantee of full factual accuracy or grammar across all text. No copy was auto-rewritten.

## Zero-subscription hosting migration

- Cloudflare static-first migration remains in isolated branch `migration/cloudflare-free-static-first` with a **fail-closed minimum of 681 published projects**. No new published rows this cycle, so no count-baseline code update is necessary.
- Cloudflare is not yet connected as an authenticated deployment platform and no tested `*.pages.dev` live preview exists in this ChatGPT execution environment.
- Original premium UI, working leads/admin/Promotion Studio, login, all sitemap and canonical routes, media rights, Supabase RLS, image behavior and free-tier quotas must be validated on the new platform **before any GoDaddy DNS changes**.
- No emails, external developer requests, payment, Vercel production code deploy or DNS migration were made. Do not claim hosting is guaranteed ₹0 forever or that this is a completed Cloudflare migration.

## Next safe publication shortlist

- Private `nvk-palmera-residences`, `the-sands-sasawane-alibaug`, `goodlife-holistic-group-karjat`, `emaar-casa-venero-alibaug`, and similar 1-gap records remain held for true paired, phase-specific unit offers, not a fabricated row to satisfy the checker.
- Prioritize genuine licensed images and exact coordinates for the **14 already-published quality-gap cases**, followed by first-party developer exact carpet/numbered-stock confirmation for private high-value prospects.
- Godrej RKS Chembur is a new private, high-ticket pipeline prospect requiring promoter-allocated live sale price and image permissions; avoid publishing secondary resale as new primary inventory.

