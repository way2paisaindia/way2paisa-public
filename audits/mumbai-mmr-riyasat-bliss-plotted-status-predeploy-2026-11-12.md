# Way2Paisa Mumbai/MMR — Riyasat Bliss statutory status and category-aware land status branch

Date: 12 November 2026 (IST)

## Outcome and publication invariants

- **New project activations this cycle: 0.** Existing active public catalogue **682**: 367 Mumbai, 119 MMR, 196 Dubai.
- Private `riyasat-bliss-khalapur` (MahaRERA P52000079379) updated and kept unpublished because current promoter-allocated numbered plots, title, cost sheet and completion/handover evidence are insufficient.
- Five dated third-party/developer/MahaRERA provenance rows added for this private project, no prices or inventory rows activated.
- New category-aware `publicStatus()` frontend change saved only on isolated GitHub branch `fix/mmr-plot-status-predeploy-20261112`, commit `731b63a15cc878e01ddfdeb9bb168e25405361ee`. **NOT** merged or deployed to GoDaddy.
- No changes to the 3 active plotted project statuses/quotes themselves: Celebration Land, Sol de Alibaug, The Riyasat Sankalp. Their corrected Supabase overviews were committed in an earlier continuation but the production pages still serve old cached overview copies.
- No emails, developer contacts, lead forms, WhatsApp, price edits, paid hosting migrations or public deactivations.

## A. Riyasat Bliss — conflicting lifecycle sources reconciled without false availability

Developer: Riyasat Infra Developers Pvt Ltd. Site Village Panshil and Talegaon, Khalapur / Raigad; registered `P52000079379`. Project is for **residential plotted land, not constructed flats or villas**.

Sources reviewed:
1. https://www.riyasatinfra.com/projects/navi-mumbai/ongoing/riyasat-bliss official promoter page — project name, registration, location and amenities, but no named available plot-specific price.
2. https://reragenie.com/p/riyasat-bliss-village-panshil-and-talegaon-gfs0panl/ — filing snapshot dated May 27, 2026 reports **243 plots**, **113 booked**, **130 not recorded booked**, **2 complaints**, original target Dec 31 2025, revised statutory completion Apr 30 2026, and lifecycle tagged completed.
3. https://reragenie.com/d/riyasat-infra-developers-private-limited/ — developer portfolio listing retrieved Nov 2026 nevertheless lists the same project as ongoing/not delivered, inconsistent with the standalone project filing snapshot. Neither alone certifies physical site infrastructure or a particular plot's possession.
4. https://www.mumbaipropertyexchange.com/maharera-project/riyasat-bliss/P52000079379 — updated Oct 2026, explicitly says **lifecycle requires verification**; building construction stage 0% tables may be nonapplicable for NA land where no building is registered.
5. https://housing.com/in/buy/projects/page/343820-riyasat-bliss-by-riyasat-infra-developers-pvt-ltd-in-panvel — Oct 8 2026 project marketing guide advertises ~1615–5916 sq.ft plots at ₹1.16–3.49Cr range, but the guide does not identify verified promoter-salable numbered plots/individual sellers/title/current all-in quotes.

Database changes restricted to preexisting private project:
- `status` changed from unqualified `Completed / Ready to Move` to `MahaRERA lifecycle shown completed — individual plot handover and infrastructure to verify`.
- `description` corrected to clearly distinguish land plot versus villa, explain 236 residential + 7 commercial premises per first-party website; the recorded project completion stage cannot certify numbered plot handover.
- `possession_original` details original vs revised statutory targets; `possession_date` unchanged **2026-04-30**.
- `price_original` acknowledges historical range as reference only; `min_price` stays NULL and all three historical price rows inactive.
- `enrichment_status` explicitly holds for current plot number, seller/ownership, price, handover, infrastructure and complaint verification.
- Five new `public.project_sources` rows saved. Post-write confirms `active=false`, no active inventory and completeness gap `exact_configuration_inventory`.

## B. Plotted development status UI code staged safely, not deployed

Current production category-agnostic helper in GitHub `main`:
`app/projects/[slug]/page.js` `publicStatus(value)` returns **Ready to Move** on raw status containing *completed*, *ready*, or *OC received*. This is appropriate for completed apartments but misleading for bare **land plots**.

Created branch `fix/mmr-plot-status-predeploy-20261112` from `main`; commit `731b63a15cc878e01ddfdeb9bb168e25405361ee`.
- Update helper to `publicStatus(value,category)`. For `category='plot'|'land'`, show:
  - Sold Out when truly sold out;
  - Upcoming Plots / New Plotted Launch for prelaunch/launch statuses;
  - **Plotted Land — Verify Handover** for marked ready, completed, possession or handover;
  - **Plotted Development** otherwise, avoiding a false built-home readiness claim.
- Updated **both** existing status display call sites (`projectFacts` pill and `detailGrid`) to pass `p.category`.
- Untouched apartment, villa, commercial and Dubai existing status behavior.
- Post-write fetched back `branch` and verified exactly one revised helper and two revised call sites. The `main` branch does **not** have this code yet.
- Deliberately avoided GoDaddy deployment and blind GitHub Pull: live Airo/GoDaddy homepage contains a premium Thane/Navi Mumbai buyer-guide region absent from current GitHub `main` HomeClient source, so a full pull could regress live site. Reconcile preview/prod before deployment.
- Read-only live checks confirmed `/projects/celebration-land-neral` and `/projects/sol-de-alibaug` still show **Ready to Move**; do not report new UI label is live yet.

## C. Sitemap and privacy validation

Read-only sitemap https://www.way2paisa.in/sitemap.xml extracted **692 distinct Way2Paisa URLs**, comprising **682 project URLs** and **10 other site pages** (including homepage, properties, finance, buyer guides, legal).
- Private `riyasat-bliss-khalapur` URL returned HTTP 404 and was absent from sitemap.
- Both buyer-guide URLs are present.
- This proves sitemap publication, **not Google Search Console indexing**.

## Final release gate

- Published database unchanged at **682**, 0 newly activated projects.
- Do not reactivate Riyasat Bliss merely because a May 2026 filed snapshot reports 130 unbooked plots; unbooked doesn't prove seller authorisation or current allocation.
- To release plotted-status fix: reconcile GoDaddy's currently live page/section source with GitHub, inspect preview, then selectively deploy branch without losing the premium existing homepage content.
- Continue primary Mumbai/MMR project research for new promoter-confirmed saleable unit/area/pricing, proper legal and authorized project photography.
