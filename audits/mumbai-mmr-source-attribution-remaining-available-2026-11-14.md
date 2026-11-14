# Way2Paisa Mumbai/MMR — 14 November 2026: developer primary provenance and stale available-stock audit

## Operational result

- **24 active inventory rows** reviewed and corrected:
  - **12 rows across 6 projects**: aged first-party/authorised project-level offers with no specific identified current flat/plot, `Available` -> `Confirm Availability`.
  - **3 rows across 2 luxury projects**: K Raheja Corp Modern Vivarea (2) and Birla Silas Niyaara (1). Corrected overstated source attribution (developer-primary vs channel-partner / non-primary branded marketing domain), also `Available` -> `Confirm Availability`.
  - **9 rows across 6 Mumbai projects**: older property-type starting offers without numbered available unit, `Available` -> `Confirm Availability`.
- **14 dated new source audit records** (`project_sources`): 6 first-party group, 2 domain-provenance group, 6 Mumbai group, original source URLs, source types, price/area, IDs, verification stamps retained.
- **Two additional existing `project_sources.current_inventory` records corrected**, originally misleadingly named as developer primary when URLs were marketing domains. Source URLs and original evidence retained.
- **No numeric price / price_max, carpet/plot area, configuration, inventory.active, project.active, project.verified, RERA, `last_verified` or licence/media mutated**. Only `availability`, the three source attribution metadata entries, two historical project source labels/notes and routine `updated_at` affected. No new stock records and **zero newly published projects**.
- Post-write published catalogue stays **682**: Mumbai **367**, MMR **119**, Dubai **196**. Published Mumbai/MMR projects **486**. Active Mumbai/MMR inventory **1,731**. Labeled `Confirm Availability` **454**; `Available` **41**; the remaining 1,236 active stock rows have other status strings. All 24 updated records remain active.
- Existing public listing completeness flags remain **13**, with **9** missing exact configuration-level inventory and 13 missing approved hero/gallery. No near-ready private Mumbai/MMR candidate produced zero `project_enrichment_gaps()` in this read-only check; therefore no inappropriate new-public-project activation.

## Batch 1 — 12 stock status rows across 6 MMR projects

Audited by read-only first-party or advertised project pages, evidence dated 14 Nov:
- **Godrej Emerald**, Thane — 2 & 3 BHK historically ₹1.45 / ₹1.59Cr; developer's marketing page highlights price starting, no number-matched promoter unit and all-in cost sheet, 2 corrected.
- **Peninsula Estates Alibaug ONE** — villa-ready plot from ₹2.39Cr, 2,454sqft starts, but no confirmed numbered 2,454sqft plot allotment, 1 corrected.
- **Puraniks Elyra**, Thane — official/advertiser campaign 1BHK305–317sqft from ₹39.99L; no numbered flat confirmed, 1 corrected.
- **Raymond Invictus**, Thane — campaign labels Stellar 2,417sqft ₹6.06Cr, Sky Suit 2,588sqft ₹6.48Cr, Epitome 2,725sqft ₹6.86Cr including charges; no numbered developer saleable flat confirmed, 3 corrected.
- **Suraksha Smart City Phase I**, Vasai — official campaign typology 1BHK375sqft from ₹34L, 1BHK Luxe480sqft from ₹43.50L. Existing ₹36L 375sqft 'Nearing Possession' variant is *not* in current campaign; preserve old quote pending phase-specific title/possession allocation, 3 corrected.
- **Vihang Thane Infinity**, Kasarvadavli — marketing matrix 1BHK430sqft ₹55L, 2BHK630sqft ₹89L, yet FAQ says 2BHK actual rate on request based on floor/view. No numbered flat confirmed, 2 corrected.
`project_sources.field_name='dated_first_party_source_no_allocated_unit_20261114'`: six project audit rows.

## Important source integrity — 3 Mumbai luxury rows and 2 historical project_sources

### K Raheja Modern Vivarea South Tower

Two active 3/4 BHK rows 1,740sqft ₹18.50Cr and 2,259sqft ₹25Cr were falsely classified as `Developer official current inventory` from `https://krahejaltd.com/modern-vivarea/`. The website `krahejaltd.com` explicitly discloses in footer: *website of an official channel partner (CP) of K Raheja Corp* and pricing is general reference, not guaranteed offer. Actual developer first-party `https://www.krahejacorphomes.com/project/modern-vivarea/`, plus `https://www.krahejacorp.com/`, independently confirms North/South tower identities, South Tower **P51900034288**, promoter K Raheja Corp Pvt Ltd, mortgages and agreement-based final details — not those specific numbered ₹18.50/25Cr flats. Corrections:
- `inventory.source_type='channel_partner_project_marketing_price'`, `source_name='K Raheja Corp channel-partner project website'`, `availability='Confirm Availability'`, original prices/areas/URL and original verification stamps preserved.
- Corresponding historical `project_sources(field_name='current_inventory')` source_name revised to accurate marketing-channel attribution; original URL and original note preserved/appended.
- **No accusation of illegal website**; the footer describes it as a CP, not the promoter direct.

### Birla Silas at Birla Niyaara, Worli

One active 4 BHK 3,000sqft ₹30.28Cr recorded as `official_developer` with source `https://birlaestatesltd.com/silas-at-birla-niyaara/`. The documented developer primary site `https://www.birlaestates.com/birla-niyaara-worli/` confirms Silas, 4/5BHK, Birla Niyaara **Phase 2 P51900054455**, but has **no specific numbered saleable ₹30.28Cr apartment** on its official project page. `birlaestatesltd.com` is a distinct branded marketing site and actual promoter control/ownership was not established. Correction `source_type='branded_marketing_site_provenance_unverified'`, corresponding `source_name='Birla Silas branded marketing website — promoter ownership unverified'`, `availability='Confirm Availability'`. Historical `project_sources.current_inventory` attribution corrected. **Not a claim of fraud or unlicensed property**, only evidence hierarchy.

`project_sources.field_name='correct_nonprimary_developer_pricing_attribution_20261114'`: two detailed audit rows preserving prior labels, old links, prices and previous verification dates.

## Batch 3 — 9 older Mumbai price claims across 6 developments

- **Avant Heritage V, Jogeshwari East** — official offer 2BHK648sqft from ₹2.12Cr, no numbered apartment.
- **Crest Oaks, Andheri East** — project website says currently 2 BHK 717–731sqft from ₹2.23Cr, while 3/3.5BHK sold out. Developer Crest Ventures official project identity `https://www.crest.in/crest-oaks` crosschecked; no named saleable flat.
- **Kalpataru Virtus, JVLR** — corporate developer page office 473sqft from ₹1.85Cr++, no identified available office.
- **Marathon NeoValley Narmada, Bhandup** — Marathon first-party 2 BHK 476sqft ₹98.79L; prior inventory has 475.98sqft and ₹98.79L, likely marketing rounding, no numbered apartment.
- **Runwal Garden Vista, Kanjurmarg East** — FOUR historical available rows:
  - 373sqft 1BHK ₹1.01Cr
  - 531sqft 1.5BHK ₹1.50Cr
  - 631sqft 2BHK ₹1.80Cr
  - 661sqft 2BHK ₹1.95Cr
  - Newly read marketing site `https://www.runwalgardenvista.com/` currently advertises *different* all-inclusive project typology headlines: 373sqft ₹99L, 531sqft ₹1.40Cr, 630sqft ₹1.60Cr. That marketing site is not independently established as promoter first-party. Neither evidence establishes which historical 631/661sqft flats are currently allocated. All 4 marked Confirm Availability, no price or area invented/replaced; conflict explicitly preserved in audit.
- **Platinum Life, Andheri West** — developer's portfolio displays project headline from ₹2.99Cr and some stock status but does not establish a numbered 665sqft 2BHK ₹2.99Cr written quote.

`project_sources.field_name='nov14_mumbai_promotional_price_not_specific_saleable_unit'`: six audit rows with exact source/price difference notes.

## Read-only production verification

Fetched live pages after database changes, confirming retained buyer-visible prices, areas and neutral availability, though frontend also normalizes stale stock separately so live inspection alone is not proof of instant cache propagation:
- https://www.way2paisa.in/projects/raheja-modern-vivarea-south-tower — 3BHK1740sqft ₹18.50–21.24Cr, 4BHK2259sqft ₹25–27.58Cr, Confirm Availability. High endpoints are pre-existing `price_max`, not a change made here.
- https://www.way2paisa.in/projects/silas-at-birla-niyaara-worli — 4BHK 3,000–4,300sqft ₹30.28Cr, Confirm Availability.
- https://www.way2paisa.in/projects/garden-vista-runwal-enterprises-kanjurmarg-east — original 373/531/631–661sqft, historical ₹1.01/1.50/1.80–1.95Cr displayed and Confirm Availability.
- https://www.way2paisa.in/projects/crest-oaks-marol-andheri-east — 2BHK717sqft ₹2.23Cr, Confirm Availability.
- https://www.way2paisa.in/projects/raymond-invictus-by-gs-tower-a-thane — three marketed premium type prices ₹6.06/6.48/6.86Cr, Confirm Availability.

## Publication gates

No private candidates activated: none passed the exact MahaRERA carpet and named promoter-saleable stock + written current final cost + correctly attributable source image/media-rights requirements. Existing 13 published imagery/config flags and 41 remaining "Available" claims still need work; **do not simply erase prices or lower standards to increase the count**.

Outstanding code-only PRs: [#17 plotted-land status](https://github.com/way2paisaindia/way2paisa-public/pull/17) and [#20 mixed villa/plot area](https://github.com/way2paisaindia/way2paisa-public/pull/20). BOTH DRAFT, UNMERGED, UNDEPLOYED. Premium GoDaddy/Airo production source differs from Github checkout; safe authenticated release reconciliation still required.

No emails, outbound contacts, account payments, project removals, active stock cancellations, Google indexing claims, new deployments, or cloud hosting migration.
