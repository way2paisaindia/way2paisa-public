# Way2Paisa — 14 November 2026 | Mumbai/MMR mixed plotted-land area, developer-stock audit, Roswalt Ryla deduplication

## Confirmed completed work

**Published project count remains 682:** Mumbai **367**, MMR **119**, Dubai **196**. Active Mumbai/MMR inventory **1,731** — no removal, unpublishing, unit-price mutation or last_verified-date fabrication.

**18** old inventory `Available` claims across **13** existing public projects moved to the neutral `Confirm Availability`. All had dated official developer price/headline evidence, but none had an independently verified current numbered saleable flat/plot/office in this audit. **13 dated `public.project_sources`** capture original unit IDs, area, old price, page and previously checked date (`field_name=developer_headline_not_numbered_stock_20261114`). Not a sold-out/hold/unpublishing action. After this cycle 65 active stock rows still `Available`; 430 `Confirm Availability`; other active rows carry different labels.

**11 incorrect plot/carpet inventory rows corrected**:
- Mahindra Meridian, Alibaug: one 5,400sqft plot previously incorrectly had `carpet_area_sqft=5400` and `plot_area_sqft=5400`. The former is **NULL**; `plot_area_sqft=5400` remains; residential plot price **₹2.14 Cr** unchanged. This is a mixed villa-and-plotted community; the active 3 BHK villa price **₹3.60 Cr**, RERA carpet **2,003.16sqft**, and inactive 4BHK area 2,411.01sqft are preserved. `public.projects.max_carpet_sqft` corrected from the misleading 7,800 (plot-land value) to true 4BHK villa 2,411.01; min 2,003.16 unchanged. One dated source row from first-party Mahindra Lifespaces https://www.mahindralifespaces.com/residential/studio-flats-in-alibaug/ verifies **separate plots from ₹2.14Cr and villas from ₹3.60Cr**, NOT that exact plot availability is confirmed.
- Ascenta Basalt Hills 3, Rustomjee Belle Vue 4, The Riyasat Sankalp 3: all 10 plotted-land inventory rows stored the same land size in both carpet and plot columns. Now only plot area retained. Changed generic duplicate config names to unique `Residential Plot — 1,350 sq.ft`, `Plot — 5,000 sq.ft`, etc. (10 changes) because `inventory_project_plan_unique_idx` enforces `(project_id,configuration,carpet_area_sqft) NULLS NOT DISTINCT`. Preflight found zero existing/new duplicate collisions and post-check found zero dual land/carpet rows. All 10 rows remain active with original plot sizes, prices, availability and source URLs; **3 dated audit records** saved.
- **Caution:** `public.projects.min_carpet_sqft/max_carpet_sqft` are currently used by a generic frontend/filter system even for plot-category projects because there are no separate project-level min/max plot columns. Those old *project-level* overloaded fields for other pure plotted developments have NOT been bulk nulled to avoid a filter regression. Inventory fields have the correct classification after cleanup.

## Supabase validator migration applied and tested

`public.project_enrichment_gaps(uuid)` previously used only `p.category='plot'` to decide whether an active inventory row must have `plot_area_sqft` versus `carpet_area_sqft`. A correct `Mahindra Meridian` residential plot inside the villa-category master would have erroneously failed `exact_configuration_inventory` unless carpet area were falsified. **Migration** `allow_villa_master_plotted_inventory_area_in_enrichment_gaps_20261114` applied via Supabase migration tool. It changes ONLY the per-inventory asset area guard:
- original: `case when p.category='plot' then verify plot area else verify carpet area end`
- replacement: treat an explicitly named plot or land row **with a genuine `plot_area_sqft`** inside `p.category='villa'` as a plot for completeness checking; otherwise preserve the old carpet rule.
- Original function's other RERA, media, source, price, status, title, etc. checks unchanged. Dynamic migration verified the exact preexisting guard occurred only once before replacement; migration successful.
- Post-write `public.project_enrichment_gaps(mahindraMeridian.id)=[]`. The published Mumbai/MMR baseline remains **13** projects with gaps, including **9** with exact-configuration inventory gaps, i.e. no regression from factually correct area data.

Supabase's latest changelog https://supabase.com/changelog.md was reviewed, with no relevant breaking change for PL/pgSQL predicate replacement.

## Frontend still has one known live mismatch — drafted code, not deployed

Live GoDaddy page https://www.way2paisa.in/projects/mahindra-meridian-alibaug now has correct data and displays `Residential Plot | Villa Size: On request | ₹2.14Cr` instead of the factual `Plot 5,400 sq.ft`, because current project detail `area(x,p.category)` uses a **project-wide villa** category for all inventory rows. Its villa row displays 3BHK built-up 2,505.08sqft ₹3.60Cr correctly.

Created code-only branch `fix/mixed-villa-plot-area-display-predeploy-20261114`, commit `cb0406d9d17a56f756fe782efb16d5d3438d7288`, on GitHub main baseline. It updates `app/projects/[slug]/page.js` with `isPlottedInventoryRow()` on villa master stock, row-level correct land area, `Villa / Plot Area` header and separate `Villas ... · Plots ...` summary rather than a fabricated mixed numeric range. Created **[draft PR #20](https://github.com/way2paisaindia/way2paisa-public/pull/20)**. It is **NOT merged**, not CI-certified against GoDaddy/Airo premium deployed source and **NOT deployed**. Live visitor display has NOT been fixed. Source divergence and the existing distinct plotted-land status **draft PR #17** must be reconciled with a secure GoDaddy source build before release. Do not blindly sync or replace premium homepage/CRM.

Read-only independent live checks:
- https://www.way2paisa.in/projects/the-riyasat-sankalp-khalapur lists land 1,119 / 2,152 / 2,368sqft with original ₹79.50L / ₹1.53Cr / ₹1.68Cr; column Plot Area
- https://www.way2paisa.in/projects/rustomjee-belle-vue-kasara lists plots 2,200/5,000/6,000/7,000sqft and original prices, Plot Area
- https://www.way2paisa.in/projects/basalt-hills-ascenta-khalapur-navi-mumbai lists plotted land ranges, prices unchanged
- Mahindra Meridian mixed `Villa Size: On request` for land is an OPEN live display issue until PR#20 safe release
- https://www.way2paisa.in/projects/mission-blue-zone-mumbai-neral and https://www.way2paisa.in/projects/galaxy-heights-tower-ii still show old numeric stock prices but now the cautious Confirm Availability; source mismatches preserved in auditable notes.

## First-party price checks and important unconfirmed offers

Current first-party development and marketing pages read-only on 14Nov:
- https://www.hoabl.com/projects/aero-estate says plotted land from ₹99L all-inclusive but no named 1,507sqft plot allocation.
- https://www.hoabl.com/projects/blue-zone-mumbai explicitly advertises **1,150sqft ₹44.99L all-in, 1,600sqft ₹63.99L all-in**. Existing Way2Paisa 1,400sqft ₹49.95L is historical and not currently matched on this official page. Preserve price until verified, and neutral Confirm Availability; do not silently swap areas or prices.
- https://www.hoabl.com/projects/cape-of-bliss 1,400sqft headline from ₹32.77L; no numbered plot.
- https://www.hoabl.com/projects/sol-de-alibaug luxury plotted land headline ₹3.99Cr; existing ₹4Cr row without named plot must be reconfirmed.
- https://www.godrejproperties.com/mumbai/plotted/godrej-country-estate ₹79.99L onwards, and https://www.godrejproperties.com/mumbai/plotted/godrej-woodside-estate ₹99.99L onwards; both project-wide starting plots, not written individual plot-number price.
- https://www.lodhagroup.com/projects/residential-property-in-mumbai/lodha-elaris-vikhroli/price 4BHK from ₹8Cr, not confirmed named apartment.
- https://kalpatarultd.com/summit/ Apex/Pinnacle offices from ₹1.48Cr/₹2.70Cr; project-level starting suites, not allocated office numbers.
- https://mpchfl.com/galaxy-heights-tower-2/ current developer 1BHK starting headline ₹62L, older Way2Paisa ₹58L promotional quote requires fresh written confirmation; no price edit.
- https://www.lodhagroup.com/projects/residential-property-in-dombivli/lodha-villa-imperio-palava/price and https://www.lodhagroup.com/projects/residential-property-in-mumbai/lodha-villa-cerro-khopoli/price show project-level category starting prices and expressly exclude government levies/development charges.
- https://marathon.in/neohomes/neopark/ 1BHK from ₹68.24L; original second layout ₹73.25L not newly confirmed unit-by-unit.

Never set `inventory.last_verified=now` because a marketing homepage renders; last verified still means prior unit-source check.

## Private launch record deduplication — Roswalt Ryla / Sujata Nivas, Bandra West

Developer first-party https://www.roswalt.com/ongoing-projects.php explicitly confirms **Roswalt Ryla = Sujata Nivas CHS redevelopment**, 3BHK boutique residence, MahaRERA **PR1180002600645**. The DB previously had TWO separate inactive research records:
- `roswalt-ryla-bandra-west` marketing-name record without RERA, developer or location
- `discovery-20261024-pr1180002600645` imported legal-name Sujata Niwas with RERA and incorrect 2/3 BHK assumptions.

Reconciled with conditional SQL, without creating a third project or publishing either:
- Canonical **`roswalt-ryla-bandra-west`** now carries unique RERA PR1180002600645, registered promoter Roswalt Realty Private Limited, existing verified developer record, Bandra West locality, RERA parcel reference CTS F/1172 F.P.1/C3 and site-locator 19.05828/72.83648 (not asserted entrance), 3BHK first-party identity.
- Original registered completion **25 October 2030** from https://reragenie.com/p/sujata-nivas-bandra-o0mu0y8n/ and https://deedo.in/mumbai-suburban/bandra/sujata-nivas/. Deedo/GharKundli generic +4 months claim Feb25 2031 but no individual amended certificate found, so not asserted certified; original stored date and caveat.
- Statutory derived **56 registered premises, including 26 rehab**, so not 56 currently available sale apartments. Promoter price on request; broker MPE 1,068sqft ₹8Cr, another partner 1,245sqft ₹9.25Cr before taxes, another partner FAQ ₹6.9Cr all-in; these marketing prices/bases conflict and are not current flat-numbered promoter allocations. No active stock, media or numeric `min_price`.
- Old discovery alias remains `active=false,verified=false` with RERA field cleared and `enrichment_status='duplicate_alias_do_not_publish__canonical_roswalt_ryla_bandra_west'`; original legal registration preserved in notes. Do not create another public listing or merge fake marketing names.
- **8 dated `public.project_sources` rows** added on the canonical record for official source, registration/redevelopment, title/CTS, pricing conflicts, extra third-party bedroom claims, and duplicate resolution.

Read-only live https://www.way2paisa.in/projects/roswalt-ryla-bandra-west still HTTP404, correctly absent from public sitemap. The private alias is not in sitemap either. No new live project.

## Final verified metrics

- Published 682 (Mumbai 367, MMR 119, Dubai 196).
- Active Mumbai/MMR inventory 1,731, labelled Available **65**, labelled Confirm Availability **430**, other status labels ~1,236.
- 13 live Mumbai/MMR listings still flagged by enrichment checker, nine involving exact configuration inventory; media licensing remains unresolved in all 13.
- 0 active plotted-land inventory rows duplicate land area as carpet.
- 1 Mahindra corrected, 10 pure plotted inventory rows corrected.
- 18 status wording rows normalized across 13 verified official price pages; all prices, areas, prior timestamps and live stock active flags preserved.
- 25 new dated source audit records: 13 developer headline availability +3 pure plot +1 Mahindra +8 Roswalt.
- No new projects publicly published, none unpublished, no developer/customer emails, no direct lead enquiries, no GoDaddy deployment, no Cloudflare/Vercel migration, no unauthorized photos activated.

## Next release gate

1. Authenticated GoDaddy/Airo source reconciliation and safe test deployment of draft PR#20 mixed-asset display + draft PR#17 plot status only after comparison and explicit production preservation.
2. Remaining 65 "Available" inventory records direct promoter number/phase current verification; do not blanket change.
3. Current promoter-issued approved cost sheets, floor-number allocation, MahaRERA carpet and legally licensed project photos for Mumbai/MMR private candidates, including Roswalt Ryla; only then publish.
4. Resolve 13 public media and 9 configuration gaps, not by inserting fake floorplans or coordinates.
