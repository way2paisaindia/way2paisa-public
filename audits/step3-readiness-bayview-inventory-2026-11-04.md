# Way2Paisa Step 3 — public status safeguards and Bayview inventory QA
Date: 4 November 2026 (IST)
Status: **Step 3 OPEN; Step 4 ON HOLD**

## Baseline and scope
Read actual data from production Supabase `dqoxrsywknsgkxrdrxep`.
- Public projects with `active=true`, `verified=true`, `enrichment_status='complete'`: **667**.
- Active inventory after this continuation: **2,379** (prior 2,378).
- Private projects: **1,159**, unchanged.
- Active project media: **3,173**, unchanged.
- No live project was unpublished; no existing active price was changed; no emails or external developer requests.

## One actual new Emaar unit added to an already published project
Emaar first-party `Book Now` catalogue: https://www.emaar.com/en/property-for-sale/emaar-beachfront (checked 4 Nov 2026).
- Existing published Way2Paisa project: **Emaar Bayview by Address Resorts at Emaar Beachfront**, DLD Project 2646, project ID `6bca6e78-edf8-49c2-b0c1-50ad22878398`.
- **1 Bedroom**, Emaar named apartment **EB Bayview T1-4-401**, developer total area **783 sq.ft**, **AED 4,502,888**.
- Source field `emaar_developer_first_party_named_book_now_inventory`, current snapshot, **Confirm Availability** before any reservation or payment; additional land registration and transaction costs not included in displayed amount.
- New inventory row ID `1411f30b-4ef0-45df-beaf-13a318635f6a` active. Price and area are taken from the exact named Emaar card (not inferred from distinct starting minima).
- Existing 4 active Bayview records stayed intact; Bayview now **5 active**.
- Production Bayview page returned HTTP 200 and exposed new AED 4,502,888 and 783 sq.ft. This is not proof of image UX success.

## Important buyer-facing status bug fixed globally
Some source text mentions “OC” only to express **missing or unverified** clearance. Before the fix, `app/projects/[slug]/page.js` readiness helpers matched a bare `OC` anywhere and printed **Ready to Move** for the whole project.

Fixed and deployed in commit **`888fa1e99964e7950889bbb315cd5afa205e3491`**:
- `publicStatus()` now treats `Near(ing) Possession` as **Near Possession**, not Ready, even if notes include an OC check.
- A **Part OC / partially ready** claim cannot imply all towers are ready.
- `possessionText()` requires affirmative OC received / ready-to-move proof, not a generic string containing OC; pending or unverified phrases do not trigger Ready.
- One immediate intermediate build of commit `537a7d041c8f94a6373d2275c1fd810b35f97977` failed with syntax errors. Corrected immediately in commit `888fa1e99964e7950889bbb315cd5afa205e3491`, whose production Vercel deployment `dpl_F9aAojyKutS1byKbzfJ9i2rsvcgt` reached **READY** and became aliased to www.way2paisa.in. The live site remained on the previous READY deployment until the successful replacement.
- Additional public data cleanup: Lodha Unica `possession_original` is now the concise verified `MahaRERA revised completion 27 Aug 2024 | Lodha developer: nearing possession`. Detailed certificate discussion is still preserved in its private enrichment and project_sources.

**Post-fix production SSR checks**:
- `/projects/lodha-unica-jogeshwari-west`: HTTP 200, **Status Near Possession**, **Possession RERA 27 Aug 2024**, current two 1 BHK advertised sizes/prices unchanged.
- `/projects/rustomjee-crown`: HTTP 200, **Status Under Construction / Part OC**, not a blanket Ready-to-Move claim.
- `/projects/supreme-boulevard-chembur`: HTTP 200, **Under Construction / Target Mar 2029**, not ready based on “complete OC targeted.”
- `/projects/mesacon-greens-mesacon-group-andheri-west`: HTTP 200, **Under Construction / RERA June 2027**, not ready based on a request to confirm OC.
- `/projects/supreme-evana-bandra-west`: HTTP 200, **Ready to Move** backed by affirmative full-OC developer disclosure.

## Generic configuration-label normalization
Frontend `publicConfigurationLabel()` separately categorized **“1 Bedroom”** and **“1 Bedroom Apartment”** (and similarly for 2 BR) though both denote the same apartment configuration. This caused duplicative row labels on Emaar Bayview.
- Commit `1cb6bbfb92b057431359c9a998ca5bed370a6012` strips only a generic trailing **Apartment(s)** from `Studio`, `n Bedroom` or `n BHK` labels; **Townhouse, Villa, Penthouse and other distinct types are not merged**.
- Original unit codes, areas, prices, dated source links and project identities remain stored unchanged. Bayview’s new 1BR inventory row was also normalized to `1 Bedroom`.
- Verify refreshed production browser/SSR presentation after the CI/CD deployment completes.

## High-demand Mumbai record enriched, still unpublished
**Lodha World View, Worli**, private project ID `6d0fd6f9-d5d1-404f-8163-c9c0500837a4`, RERA P51900008962:
- First-party Lodha World View price guide: 3 BHK from **₹12.50 Cr+**, 4 BHK from **₹13.50 Cr+** (development starting prices, not paired promoter apartment offers).
- Statutory filing reports original completion June 2021; a newer derivative reports extension to June 2023, while another portal omits extension. Direct latest certificate should settle the conflict.
- RERA registration covers World View and World One Tier III together. Location and plot pin matched; status first-party markets ready to move, but **tower-specific OC and available first-sale numbered apartments are not established**.
- Historical derivative reports **240/249 booked (96%)**, not proof remaining nine are current bookable developer stock.
- Two **inactive** starting-price references and six sources saved, no live inventory activated.
- Genuine first-party image URLs and advertising reuse rights not established. No third-party or unrelated Lodha images copied.
- Live /projects/lodha-world-view-lower-parel returned **HTTP 404** as intended.

## Remaining Step 3 image release gates
- Emaar's unavailable legacy `uae-cms.emaar.com/uploads` image family still impacts public hero/gallery data; image fixes need genuine, project-specific, directly accessible assets with channel partner reuse authorization. Do not count fallback text or branded placeholders as actual gallery completion.
- The live gallery-disclosure fallback remains active; no images were invented or unauthorized images activated here.
- **Step 4 not started. No emails sent.**
