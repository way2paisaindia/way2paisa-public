# Way2Paisa — 13 November 2026: Mumbai/MMR inventory customer-copy cleanup and source hygiene

## Work completed, with production safeguards

- **Published catalogue unchanged: 682 total** (367 Mumbai +119 MMR +196 Dubai). **New project activations: 0.**
- Updated **21 active inventory configuration labels across nine Mumbai/MMR projects**, replacing long in-field broker/agent/portal attribution or awkward "advertised area" suffixes with concise property-configuration labels.
- Updated **21 active inventory availability field texts across 11 Mumbai/MMR projects** to the neutral `Confirm Availability` status, matching the existing public project-page `publicAvailability()` behavior. Each prior longer explanatory text was preserved in a new dated `public.project_sources` audit entry; **11** such audit rows were created. Original inventory sourcing metadata, source URLs, prices, category, carpet/plot area, timestamps and existing project legal notes were not overwritten.
- Database uniqueness preflight proved **21/21** proposed label edits matched existing active inventory and introduced **zero conflicts** against `inventory_project_plan_unique_idx` `(project_id,configuration,carpet_area_sqft) NULLS NOT DISTINCT`. Insert result was 21/21 successful; zero rows unexpectedly inactive.
- All sale-price and RERA/possession dates unchanged, no project unpublishing, no unauthorized image activation, no emails or lead messages and no GoDaddy deployments.

## 1. Configuration-label cleanup

Source rows are not invented new stock; their price and area mappings remain identical. The nine projects touched:
- `blubay-ora-land-karjat`: 2 Villa Plot size rows (1,500, 1,900 sq.ft), stripped "advertised land area" wording but kept the plot size.
- `godrej-hillview-estate-khalapur`: 1 plot, removed in-field parenthetical portal attribution.
- `riyasat-royalcrest-khalapur`: 2 land parcels, removed in-field "agent-advertised" without suggesting a numbered plot is verified.
- `sugee-shree-krishna-kunj-sugee-group-dadar-west-shivaji-park`: 2 priced 3 BHK layouts 928/955 sq.ft, removed "broker-advertised all-in" from the **configuration** label (the provenance remains elsewhere).
- `lodha-unica-jogeshwari-west`: 2 1 BHK layouts 322/323 sq.ft, concise carpet configuration labels.
- `lodha-signet-kalyan-shil-road-offices`: 3 office offerings (375/383/550 sq.ft), labelled "marketed area" because registered carpet basis unverified.
- `lodha-signet-matunga-offices`: 4 office and doctors enclave offerings, properly describing 300/405/622 sq.ft as "marketed area", *not* certified RERA carpet area.
- `lodha-signet-thane-kolshet-road-offices`: 2 office offerings (358/487 sq.ft marketed area).
- `lodha-signet-vikhroli-offices`: 3 office/doctor offerings (485/630 sq.ft marketed area).

### Why "marketed area" is retained
The first-party Lodha price pages identify headline office price and marketed size but do not always establish that a specific active numbered office's **RERA carpet area** equals that size. Thus `carpet_area_sqft` was NOT filled merely to satisfy the validator. The customer site currently displays "Carpet Area — On request" for the commercial offerings, which is safer than falsely claiming marketed 300–622 sq.ft as certified unit carpet.

## 2. Availability-field cleanup

The selected 21 overly verbose `public.inventory.availability` values from **11** projects were changed to `Confirm Availability` after confirming they were already customer-facing fallback/confirm/written-quote instructions, **not** confirmed, available named inventory. These included:
- Dosti Willow
- Galaxy Heights Tower III
- Godrej Hillview Estate
- Lodha Bellavista
- Lodha Casa Olivia
- Lodha Signet Matunga
- Lodha Signet Thane
- Lodha Signet Vikhroli
- Lodha Unica
- Marathon Zaver Arcade
- Sunset Gardens

Original notes preserved in `public.project_sources` with `field_name='public_availability_wording_standardized_20261113'` including number of changed rows and original wording per project. Active availability status is neutral until actual promoter allocated inventory is confirmed; no "Available" status was fabricated.

## 3. Public read-only QA

Fresh independent live-site content inspections of:
- https://www.way2paisa.in/projects/sugee-shree-krishna-kunj-sugee-group-dadar-west-shivaji-park — neat single "3 BHK" inventory row, **928–955 sq.ft**, **₹6.20–6.40Cr**, status "Confirm Availability".
- https://www.way2paisa.in/projects/lodha-signet-matunga-offices — four office/Doctors Enclave rows, **₹1.75Cr, ₹1.80Cr, ₹2.30Cr, ₹3.45Cr**, carpet On request, neutral availability.
- https://www.way2paisa.in/projects/riyasat-royalcrest-khalapur — two residential plots **1,162 / 1,205 sq.ft**, **₹69.75 / ₹72.30 lakh**, status "Confirm Availability".

No broker/partner/agent source text displayed on these customer pages. **Important limitation**: the live frontend already applied normalization of configuration labels and availability before this database copy cleanup, so visual cleanliness does *not by itself* prove the same-turn database changes have already propagated through GoDaddy cache. Supabase direct SQL read-back verifies changes are stored correctly.

## 4. Revalidated exact remaining publication gaps

After modifications ran `public.project_enrichment_gaps()` on all **486** live Mumbai/MMR projects; exactly **13** still have at least one flagged requirement, including **nine** with missing exact configuration-level area-to-price inventory and **13** with no active approved hero/gallery. Do not change `enrichment_status='complete'` to a new label without considering public query filters: GitHub project pages require `active=true, verified=true, enrichment_status='complete'` to show published listings and recommendations.

**No fake coordinates:** For seven live Lodha listings missing geo (Casa Evergreen Vikhroli, Casa Foresta Palava, Casa Olivia Palava, Signet Kalyan–Shil, Signet Thane, Signet Matunga, Signet Vikhroli), existing DB notes accurately say exact entrance/registered parcel coordinates are not verified. External RERA-derived pages establish project localities, but do not expose an independently matched registered latitude/longitude pair; Dwello and SquareYards show slightly differing directory pins for Signet Matunga, so **no precise coordinates inserted**. Keep address-based Google Maps search fallback, rather than filling an arbitrary decimal-geocode just to clear the validator.

## 5. Next safe steps

- Obtain first-party, current allocated unit/cost sheet and RERA-carpet source in the nine live projects still missing exact configuration inventory. Do not equate marketed size to registered carpet or project starting price to a particular apartment.
- Resolve third-party licensed media reuse for the 13 live projects. The existing 22 staged first-party visual URL references remain inactive/quarantined; not activated solely due to being served on a developer website.
- Keep publication focus Mumbai/MMR, but never activate retired umbrella, sold-out, duplicated RERA, or unallocated projects to inflate count.
- GoDaddy production metadata/source divergence remains an open task: verify in authenticated deployment context rather than blindly pull GitHub main.
