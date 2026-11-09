# Way2Paisa — 9 November 2026: Emaar Golf Trails verified source inventory continuation

## Outcome
- Connected Supabase project `dqoxrsywknsgkxrdrxep`, public catalogue and GitHub repository `way2paisaindia/way2paisa-public` reviewed.
- **One additional active individually named developer-listed inventory record** was inserted for the **already published** Emaar Golf Trails (Emaar South, Dubai), with exact Emaar original source and a dated availability disclaimer.
- **Zero new entire projects** activated. Published project count **681** before and after; active inventory **2,412 → 2,413**, project media **3,174** unchanged. No active inventory removed, no earlier unit or project price altered, no status changes, no DNS/hosting/GoDaddy/Vercel/Cloudflare modifications, no external developer email or broker contact.
- An anonymous database-role test in a read-only transaction (with `SET LOCAL ROLE anon`) succeeded after the write, showing `681` public projects and `2,413` public inventory rows. Thus the Supabase RLS/grants for `anon` do **not** erase the catalogue, but these database reads do not certify production GoDaddy HTML delivery. Search-engine cached `www.way2paisa.in` homepage/catalogue reports zero listings about 3 weeks ago; fresh external HTML fetch currently returns cache miss. That old cache is NOT evidence of today's live site being empty.

## New active first-party unit inserted: ES Golf Trails-2-208
- **Project:** Emaar Golf Trails at Emaar South, `emaar-golf-trails`, DLD Project **4523**, existing published verified complete status.
- **Unit number:** `ES Golf Trails-2-208` (Floor 2).
- **Type:** 3 Bedroom Apartment.
- **Area:** 1,606 sq.ft. **Dubai developer total/unit area, NOT Indian MahaRERA carpet** (stored in the existing database's area field for Dubai consistent with other stock).
- **Price:** AED **2,712,888** selling price, Emaar unit page states inclusive of VAT. Additional **Land Registration Fee AED 108,516** and **Oqood AED 3,000**, total **Applicable Fee AED 111,516**, explicitly outside displayed selling price.
- **Source:** https://www.emaar.com/en/unit-details/ES%20Golf%20Trails-2-208 , Emaar Properties own exact unit page. Web index crawled circa **5 November 2026** shows `Property Status Available` and `Book Now`, not a guaranteed live reservation today. Source recency dated `2026-11-05` is stored in `inventory.last_verified` (date-of-capture basis).
- **Public inventory availability field:** `Emaar unit page showed Available / Book Now in 5 Nov 2026 indexed capture; reconfirm developer stock and registration charges before booking.`
- **Internal source_type:** `official_developer_exact_book_now`; `source_name` says individually named Emaar unit.
- Inserted only if exact unit did NOT already exist in the project, with project slug/market/DLD registration/verified active state guards. Prior 20 live Golf Trails inventory rows remained unchanged. New row ID `bc353c5c-ac6e-4578-bd55-bc47eda38c4e`.
- One internal `public.project_sources` row inserted for exact unit with Emaar fee context and the historical count discrepancy.

## Unresolved Golf Trails aggregate inventory mismatch — do not silently inflate supply
- Emaar current first-party Emaar South community https://www.emaar.com/en/our-communities/emaar-south advertises **16** Golf Trails homes remaining, from AED 1,906,888. The count has varied in short-lived Emaar snapshots, and is not a complete row-level dated export.
- Way2Paisa had **20** active previously dated mostly partner-origin named-unit offers; after inserting one exact first-party source, **21** historical/current active records are present. At least a subset of partner-only stock could now be stale, but the aggregate 16 does **not** identify which specific unit sold/withdrawn. All historical records already describe themselves as partner advertised with reconfirmation requirement, not an Emaar booking guarantee.
- Could not fetch individual current Emaar pages for the 20 partner-origin units (direct open attempts returned unavailable/cache miss); do not arbitrarily disable any one row, nor present 21 as developer-reconfirmed available supply. Need authenticated exact-unit booking verification before any future deactivation or price changes.
- The new unit was individually Emaar listed as Available at a more recent snapshot; adding it increases documented *sourced* options but does not resolve aggregate divergence.

## Other first-party Emaar reconciliation checks — 5 new provenance records
- **Golf Vale** `emaar-golf-vale`: official Emaar project page https://www.emaar.com/en/properties/golf-vale-at-emaar-south lists 10 available; Way2Paisa has 5 active named listings (2 Emaar first-party unit pages + 3 partner crosschecks). No guessed additional units inserted.
- **Vista Ridge** `emaar-vista-ridge`: Emaar South community lists 10 available; Way2Paisa has 4 active partner quoted named rows. No inferred six units.
- **Grove Ridge** `emaar-grove-ridge`: Emaar community lists 16 available; Way2Paisa has 4 active named rows, 3 with direct Emaar exact unit pages. No inferred 12 units.
- **Albero** `emaar-albero-dubai-creek-harbour`: official community lists about 22 available; Way2Paisa 21 active. Emaar unit page `DC Albero-P2-P204` https://www.emaar.com/en/unit-details/DC%20Albero-P2-P204 was indexed about a month ago as Available/Book Now, but not live reverified and absent in DB. Was deliberately not activated on a month-old source merely to align aggregate count.
- Official Fior 1 at Rashid Yachts & Marina https://www.emaar.com/en/properties/fior-1-at-rashid-yachts-and-marina remains a **Register Interest** release with AED 2.2M from price, not developer-bookable allocated inventory; Marèva 2 at The Oasis https://www.emaar.com/en/properties/mareva-2-at-the-oasis is project-level 4–6 BR villa marketing from AED 13.83M, not currently numbered bookable villas. Both previously held new projects remain unpublished; Golf Fields at Emaar South official card is Open to Explore with no Book Now inventory, so not publishable as booked stock.
- These five reconciliations were written idempotently to `public.project_sources` with `20261109_` identifiers; no active row was altered.

## Public-role access diagnostic
Executed read-only transaction:
```sql
BEGIN READ ONLY;
SET LOCAL ROLE anon;
SELECT current_user,
  (SELECT COUNT(*) FROM public.projects WHERE active AND verified AND enrichment_status='complete') visible_projects,
  (SELECT COUNT(*) FROM public.inventory WHERE active) visible_inventory;
ROLLBACK;
```
Actual results: `current_user=anon`, `visible_projects=681`, `visible_inventory=2413`. A second query successfully selected the new unit price, total area, stored source URL and capture-date disclaimer under `anon`; Golf Trails public active count 21. Supabase SELECT role grants and RLS policies were also checked for projects/inventory/developers/locations and correctly authorize the public active/verified/complete rows. This substantially narrows old cached '0 properties' concerns to deployment config/upstream SSR/runtime/old-crawl issues; it does **not** prove any specific GoDaddy error.

## Outstanding priority
1. Confirm GoDaddy public `/properties`, a published project page and `/sitemap.xml` **with a fresh browser HTTP request** before claiming visitor-visible new inventory or search indexing.
2. Batch reconcile Golf Trails 21 historical active named rows against Emaar's own *current individually bookable* unit results (official aggregate shows around 16). Do not use total count to guess which ones expired; preserve existing records and prices until specific contradiction established.
3. Publish **new projects** only with valid RERA/DLD identity, exact current first-party or clearly labelled verified saleable configuration, registered size, date/status, approved project images and zero completeness validator gaps; avoid false duplicate/umbrella listings, stale resale and sold-out inventory.
4. Address the remaining 14 published project media/stock completeness cases. Keep existing price data intact, do not email developers, and make no hosting change or paid upgrade.
