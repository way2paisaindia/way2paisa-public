# Way2Paisa — Mumbai/MMR continuation, 12 November 2026

## Release summary (verified)
- **New published project activations this cycle: 0.** Existing public catalogue remains **682** = **367 Mumbai + 119 MMR + 196 Dubai**.
- 3 private Mumbai candidate projects materially enriched: H. Rishabraj Anuja, Axiom Gloria and Axiom Vrindavan.
- 17 dated statutory/developer/partner provenance rows added (Anuja 7, Gloria 5, Vrindavan 5).
- 5 exact first-party Anuja image URL references staged privately and quarantined. No third-party republication licence inferred; zero active images and inventory on the 3 private projects.
- 19 active MMR plot inventory rows across 15 projects had invalid duplicate *carpet* areas cleared, with correct plot areas preserved (first Sol de Alibaug row; then 18 other rows across 14 projects). Prices and availability untouched.
- 3 Ascenta Basalt Hills active inventory ranges had the actual upper plot sizes correctly migrated into **plot_area_max_sqft**, extending the full project range to **1,350–3,900 sq.ft.** from previously displayed **1,350–2,550**.
- Three published plot-project descriptions corrected in DB to distinguish *buying residential land* from *buying a constructed, ready-to-move villa*.
- One attempted all-rows plot-field cleanup **rolled back** by PostgreSQL unique constraint; final safe guarded migration was segmented and verified, without dropping or weakening constraints.
- No developer emails, enquiries, WhatsApp, new paid hosting, unpublishing or selling-price changes.

## A. H. Rishabraj Anuja — fixed a genuine wrong-location and RERA discovery record
- Old private slug: `h-rishabraj-anuja-borivali-east`; correct private slug: `h-rishabraj-anuja-borivali-west`.
- First party: https://www.hrishabraj.com/projects/anuja explicitly says **Kastur Park, Borivali West**, not Borivali East; 1/2/3 BHK plus Jodi options.
- MahaRERA registration **PR1180002501316**, legal promoter H Rishabraj Developers, filed **20 Oct 2025**, original completion **30 Jun 2028**.
- Filed MahaRERA geolocation **19.222184542514537, 72.84491568803787**, grounded in https://www.squareyards.com/mumbai-residential-property/h-rishabraj-anuja/341269/project/rera/pr1180002501316. Added to private record with exact Google Maps URL; preserved original site name and address.
- Filing identifies two 17-unit wings (34 total), with AskRERA declaring **29 rehab/landowner-share units outside open sale**. At most 5 could be promoter-saleable, and not necessarily now available. Source: https://askrera.com/projects/rishabraj-anuja-pr1180002501316/.
- MPE https://www.mumbaipropertyexchange.com/project/rishabraj-anuja-borivali-west/33126 advertises five *indicative, unallocated* 2/3BHK prices: 2BHK660sqft ₹1.75Cr++ (not all-in), 2BHK683 ₹2.20Cr all-in, 689 ₹2.26Cr all-in, 726 ₹2.35Cr all-in, 3BHK935 ₹3.03Cr all-in. Those cannot be safely equated with the five legally potential sale flats; later secondary recorded booking percentages also conflict with early snapshot counts.
- Kept `min_price=null`, zero active inventory and `active=false/verified=false`.
- Staged five images from official hrishabraj.com gallery as `active=false`, `quarantined_first_party_media_reuse_rights_and_delivery_not_verified`. No image or flat made public. Exact current allocation, final cost and rights still outstanding.
- 7 source audit rows saved.

## B. Axiom Gloria and Axiom Vrindavan — clean private legal and pricing distinction

Both were preexisting empty private project candidates by **Axiom Refab Construction (India) Pvt Ltd**, original registered **31 Mar 2030** completion retained. Corporate website claimed on an uploaded promoter affidavit (axiomrcipl.in) could not be accessed/validated, so no corporate logo or project image was invented.

**Axiom Gloria**, `PR1180002600454`, Trimurti Road, Mulund West:
- ReraGenie https://reragenie.com/p/axiom-gloria-mulund-west-mo354qvp/ confirms **62 residential plus 5 other units**; never turn the five others into apartments.
- Housing.com `Price on Request` for 2 BHK area range **527–881 sq.ft** vs MPE indicative **524–745 sq.ft** at **₹1.46–2.08 Cr**.
- Different statutory snapshots refer to 38 rehab/share and 29 recorded unsold; neither establishes that the promoter currently offers 29 sale units. No booked unit or cost sheet validated.

**Axiom Vrindavan**, `P51800080260`, Goshala Road, Mulund West:
- ReraGenie https://reragenie.com/p/axiom-vrindavan-mulund-west-mumbai-7sr1v8a8/ confirms **69 registered total units**, original **31 March 2030** completion.
- AskRERA https://askrera.com/projects/axiom-vrindavan-p51800080260/ reports **18 outside open sale** landowner/investor-share units. Raw 0% historical bookings does not mean 69 current open-sale apartments.
- Housing.com markets 2/3/4BHK 542–1,466 sq.ft and ₹1.36–3.67Cr, while MPE markets only 2BHK 542–600 sq.ft at ₹1.35–1.50Cr. Secondary estimates of blanket four-month completion extension to July 2030 conflict with RERA-derived registered original; not silently overwritten.
- Preserved both projects `active=false`, `verified=false`, `min_price=null`, zero active inventory or media. Added 5 provenance rows for each.
- Source aggregation: https://www.mumbaipropertyexchange.com/projects-by-axiom-refab-construction-in-mulund and Housing project detail pages.

## C. Live MMR land plots — correct category-specific areas without breaking uniqueness

Detected 29 originally active plot inventory records with `carpet_area_sqft = plot_area_sqft`; land area should not be treated as RERA apartment carpet.

**Safe approach chosen**:
- `public.project_enrichment_gaps()` correctly tests plot projects using `plot_area_sqft` rather than carpet.
- Source `app/projects/[slug]/page.js` uses `areaLabel(p)` to display **Plot Area** and `areaValues()` prioritizes `plot_area_sqft/plot_area_max_sqft`.
- PostgreSQL has `inventory_project_plan_unique_idx` unique **(project_id, configuration, carpet_area_sqft) NULLS NOT DISTINCT**. A broad cleanup was attempted but rolled back with unique violation, protecting multiple price/configuration rows. Index was NOT altered or weakened.
- Set only 19 *non-colliding* active inventory rows' apartment carpet fields to NULL: 1 Sol de Alibaug + 18 in 14 other MMR plot projects. Plot areas, prices, category, availability and active flags retained.
- Three Ascenta Basalt Hills records had ranges stored in old carpet max fields but absent from plot max. Moved `1350–2000`, `2100–2500`, `2550–3900` into proper plot-range fields; kept the carpet surrogate for these **three** until the old unique key can be migrated safely.
- **10** remaining rows across Ascenta Basalt Hills (3), Rustomjee Belle Vue (4), The Riyasat Sankalp (3) intentionally retain legacy carpet key solely to avoid accidental collision. Public site already displays their true plot sizes correctly through plot_area fields. Future schema migration should use category-aware unique plot key or distinct plan record IDs, with full duplicate audit first.

**Database QA** after migration:
- MMR active plot inventory rows **32**, **22** already having clean null carpet fields (includes prior clean records), **10** legacy keys retained.
- **0** active plots with invalid plot area, reversed ranges or newly failed `project_enrichment_gaps()`.
- Public active project count **682** unchanged; all pricing unchanged.
- Production read-only QA:
  - https://www.way2paisa.in/projects/basalt-hills-ascenta-khalapur-navi-mumbai now displays **Plot Area 1,350–3,900 sq.ft**, priced tiers **₹81L–₹1.19Cr**, **₹1.25–1.49Cr**, **₹1.52–2.36Cr**. Verified live.
  - https://www.way2paisa.in/projects/sol-de-alibaug still displays **Plot Area 2,691 sq.ft, ₹4Cr+**; verified live.
  - https://www.way2paisa.in/projects/cape-of-bliss-hoabl-dapoli and `/projects/riyasat-royalcrest-khalapur` still show correct sizes and prices post-write.

## D. Distinguish plot ownership vs built villas, and deployment caveat

Saved updated project overviews in the Supabase DB for:
- `celebration-land-neral`: 2,260sqft is residential *land*, not a constructed house.
- `sol-de-alibaug`: 2,691sqft is a *plot*, not a ready-built furnished villa; original phase-two completion recorded Jun2026.
- `the-riyasat-sankalp-khalapur`: 1,119–2,368sqft are residential land plots, not already-built villas.

**Release limitation:** independent immediate live-site fetches for all 3 still showed **previous cached descriptions** after DB changes. Do not claim those text revisions live. Original selling prices, actual plot sizes and stored legal dates were unchanged and live. The production property-page status renderer maps completed/ready raw statuses to **Ready to Move** regardless of `category='plot'`, which can be misleading for plotted land. Correct this in a reconciled GoDaddy-ready source/build only after comparing the live Airo code with GitHub `main`. Avoid blind GitHub Pull because production homepage already has a separate premium Thane/Navi Mumbai buyer-guide section not present in the old GitHub source.

## E. Outstanding publication gates
- Anuja: verify the *exact* 5 potential promoter-sale flats and remaining current stock / occupancy of rehab units, itemised all-in price, promoter authority for gallery reuse.
- Axiom Gloria and Vrindavan: official promoter live costed unit inventory, phase-specific approved carpet, corporate logo, project photos with reuse permission, site entrance pin.
- Larger shortlists (Palmera, Rishabraj Trident, The Sands, Goodlife) continue to require phase-allocated current saleable unit proof, right images or legal scope.
- New published projects: **0 this cycle**. No unpublished URL was made live, no developer requests/emails sent, no Dubai Emaar image work restarted.
