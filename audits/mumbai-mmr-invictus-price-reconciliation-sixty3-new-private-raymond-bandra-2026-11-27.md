# Way2Paisa — Mumbai/MMR continuation, 27 November 2026
**Subject:** Raymond Sion cache closure, Invictus BKC price drift, genuine new Goregaon East Sixty3 project candidate, and phase-safe Raymond Bandra registration audit.

## Context and business restrictions
Production https://www.way2paisa.in is on GoDaddy. Keep premium design and public catalogue intact, do not redeploy GoDaddy or email developers, do not add unrelated third-party portal logos/names to customer pages. Source documentation may keep original URLs and prices **internally**. Publish no project as active free-sale stock without currently verified promoter-allocated flat, legal RERA carpet, price, phase and project-specific media rights.

## 1. Raymond The Address by GS — Sion, customer detail cache finally refreshed
- Public: https://www.way2paisa.in/projects/the-address-by-gs-raymond-realty-sion
- Previous 27-Nov correction archived three 2+2 and 3+3 market Jodi combinations (not established sanctioned standalone registered homes), left five standard 2/3/4 BHK indicative market examples.
- At start of this cycle, a **direct live Firecrawl browser** returned HTTP 200 **x-nextjs-cache=STALE** with old ETag `3uzrtratyg1wfo`, still showing 2+2/3+3 Jodi and 2,544sqft despite DB corrections. Recheck later in this cycle via live Firecrawl scrape verified **HTTP 200** title **Raymond The Address by GS Sion | 2, 3 & 4 BHK**, configuration **2 BHK | 3 BHK | 4 BHK**, only **724–1,454sqft**, **₹3.14Cr** indicative starting quote, **no Jodi** text. **Cache issue resolved without GoDaddy redeployment**.
- No Sion DB changes made in this continuation; this is verification of prior work.

## 2. Raymond Invictus by GS BKC — five old October prices below updated source, all archived
- Public: https://www.way2paisa.in/projects/invictus-by-gs-bkc-raymond-realty-bandra-east-bkc
- Existing project ID: `52166745-76dc-4447-9bfe-f53a2e62b0a5`; RERA project registration refs `PR1180002501505; PR1180002501501; PR1180002501500; PR1180002501495; PR1180002501494; PR1180002501493`.
- First party https://raymondrealty.in/residential-property/invictus-by-gs-bkc verifies 3/4 BHK project identity and broad marketed carpet 3BHK **1113–1353sqft**, 4BHK **1684–1928sqft**, but no confirmed promoter-numbered currently available flat with fee-complete written price.
- Third party *project-specific* quote page https://housiey.com/projects/raymond-invictus-by-gs last updated **12 Nov 2026** with all-inclusive guidance significantly higher than Way2Paisa's **October 17, 2026** generic market quotes for exactly matching carpet:
  | Configuration | Carpet sqft | Old Way2Paisa market price (₹Cr) | Updated independent guidance (₹Cr) |
  | --- | ---: | ---: | ---: |
  | 3 BHK | 1113 | 6.99 | 7.45 |
  | 3 BHK | 1353 | 8.50 | 9.06 |
  | 4 BHK | 1685 | 10.60 | 11.28 |
  | 4 BHK | 1681 | 10.99 | 11.26 |
  | 4 BHK | 1928 | 13.00 | 13.88 |
- Updated source marked some other layout plans sold out and others limited, but the source does not prove any numbered promoter-allocated current available flat in the correct six-tower RERA release. Some layout formats near the edge differ by a few sq.ft from developer's typical range; do not infer legal carpet from the broker page.
- **Archived exactly 5 October inventory records** (active=false) while preserving historic configuration, carpet, `price`, original `source_url` and `last_verified`. Did **NOT** mechanically raise customer unit prices to unverified Nov 12 examples.
- Published project remains `active=true,verified=true`; cleared structured min/max price and carpet, updated official source/description/SEO to **Price on Request**, kept 3 & 4 BHK. `project_sources.field_name=invictus_bkc_oct_to_nov_quote_drift_and_phase_release_quarantine_20261127`.
- **Live validation:** production search card `/properties?market=Mumbai&q=Invictus` was HTTP 200 with 3 & 4 BHK, **Price on request**, but initially showed **1,353–1,928sqft** from an `carpet_area_original` internal fallback even after zero active inventory. Corrected the fallback to nonnumeric **On request** while retaining promoter plan ranges in project description/internal audit; new source row `invictus_bkc_zero_inventory_numeric_carpet_fallback_20261127`.
- The *separate* Invictus project detail was still delivering stale cached **₹6.99Cr+** / 1,113–1,928sqft on the first subsequent scrape. Do **not** claim the detail refreshed until a later verified fresh HTML check. No redeploy.

## 3. Sixty3 W.E. Residences — brand new PRIVATE registered research listing, Goregaon East
- New candidate: `sixty3-we-residences-goregaon-east`, MahaRERA **PM1180002500670**, market Mumbai, locality **Goregaon East**, category apartment, **active=false, verified=false**, no hero, gallery, public price, inventory or guessed coordinates.
- Developer first-party official https://agmvijaylaxmi.com/sixty3-we-residences.php clearly names Sixty3 W.E. Goregaon East, RERA **PM1180002500670**, **G+31** building and **Euphoria amenity floor 26**; near Western Express Highway, Hub Mall. The publisher's images include **Stock Image** and **Artist's Impression** captions; those are NOT a commercial licence to use them as real project-specific photographs on the public Way2Paisa site.
- 23-Nov-2026 developer-attributed press coverage https://www.business-standard.com/content/press-releases-ani/agm-vijaylaxmi-group-brings-together-three-industry-leaders-to-create-sixty3-w-e-residences-an-iconic-luxury-address-in-goregaon-east-126112301116_1.html describes residential **2 BHK** and **G+32**. Developer's official G+31 and press G+32 differ in counting basis; no invented resolution. Secondary landing sites give indicative 2BHK ₹1.62–1.71Cr but no currently saleable *numbered promoter flat*, legal carpet and fee-complete signed offer. This figure retained **internal private price_original narrative only**; no priced inventory records and no publication.
- Separate office project **Sixty3 W.E. Bizpark** has a **different RERA PC1180002500686** and must never contaminate the residential registered stock/phase.
- Created **one** `public.developers` record `AGM Vijaylaxmi Group` with `active=false`, `website=https://agmvijaylaxmi.com/`, no logo, and first-party developer source. Linked one existing Goregaon East location `e66bc31f-8c6f-463b-9adf-7a5a273932ab` and the new private project to it.
- Created two private research evidence records `sixty3_goregaon_developer_project_rera_identity_20261127`, `sixty3_goregaon_independent_20261123_launch_20261127`. The official page itself does NOT list 2BHK available numbered units; the press—not the first-party page—is the source for that type; internal source note corrected to reflect proper attribution.
- Site check for `https://www.way2paisa.in/projects/sixty3-we-residences-goregaon-east` returned **HTTP 404**, as expected for this newly private record, and no public catalogue price was changed for this candidate.
- No project with the same slug or RERA existed before insertion, so this was a genuinely new project candidate, not an alias or overwrite.

## 4. Raymond The Address by GS — Bandra, eight registration phases
- Existing published `the-address-by-gs-bkc-first-circle-raymond-realty-bandra-east-highway`, `edf6a861-d38a-4849-8b4c-bd984cc62837`.
- Official corporate source https://raymondrealty.in/residential-property/the-address-by-gs-bandra states marketed 2/3/4 BHK and **Tower A–F** RERAs `P51800054847, P51800054846, P51800054828, P51800066457, P51800078863, P51800078922`.
- Separately first-party-registry-derived sources support later Tower G **PR1180002502795** and Tower H **PR1180002502783**, e.g. https://reragenie.com/p/the-address-by-gs-bandra-tower-g-nirmal-nagar-bandra-east-ex06xufn/ , https://reragenie.com/p/the-address-by-gs-bandra-tower-h-nirmal-nagar-d236b9k7/ and https://www.rerainspector.com/projects/group/the-address-by-gs-bandra . G/H being registered is **not** proof their flats are in the current promotional A–F sale stock.
- Existing 3 advertised independent October price examples: 2BHK700 sqft ₹2.79Cr, 3BHK955 sqft ₹3.81Cr, 4BHK1475 sqft ₹5.73Cr (all **Confirm Availability**). These prices came from a non-corporate promotional microsite, not a dated Raymond corporate currently allocated flat cost sheet. **Left all three prices/inventory rows as is**, but updated public source/description and internal `data_quality_flags` to avoid wrongly attributing them to new Tower G/H; linked main `rera_source_url` to authentic Raymond corporate A–F site, preserving G/H registry evidence in source audit.
- Added `project_sources.field_name=raymond_bandra_corporate_af_tower_gh_registry_differentiation_20261127`. Public project remained active, same price and area range, no developer request.

## 5. Final SQL reconciliation
- Total DB project records: **1,907** (was 1,906; exactly 1 new **private** Goregaon East project).
- Published projects: **683** unchanged.
- Private projects: **1,224** (was 1,223).
- Published Mumbai/MMR projects: **487** unchanged.
- Private Mumbai/MMR projects: **1,140**.
- Active published Mumbai/MMR unit quote rows: **1,656** (was 1,661; exactly **five** archival-only Invictus quote changes).
- Active inventory attached to private Mumbai/MMR projects: **0**.
- Published Mumbai/MMR projects with **no active quote**: **17** (one more for Invictus).
- Published Mumbai/MMR hero missing: **13**.
- Published zero-stock Mumbai/MMR records with structured numeric price/area or numeric customer-facing carpet fallback: **0**.
- New source evidence rows this cycle: **5**.
- **No new public projects**; **zero existing projects unpublished**; **zero new selling prices stated as verified**; no developer emails, new third-party portal logos, GoDaddy redeployment or image rights violations.

## Next verified checks
1. Check Raymond Invictus detail ISR cache until old ₹6.99Cr and numeric carpet are gone. Search page now correct.
2. Verify the Invictus current *numbered promoter unit* and actual all-inclusive quote, tower, floor, RERA carpet and first-party photo rights before reactivating any price.
3. Develop new Sixty3 registered residential candidate only with builder current stock, dated legally binding cost, exact area and photo permissions. Never confuse separate Bizpark office RERA.
4. Expand Mumbai/MMR phase-aware project audit and avoid suppressing plausible confirmed current advertisements solely because their registration is complex.
