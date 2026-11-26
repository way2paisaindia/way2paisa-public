# Way2Paisa Mumbai/MMR — Elixir Reserve phase identity, Dove listing reconciliation
**Audit date:** 26 November 2026
**Production site:** https://www.way2paisa.in
**Supabase project:** `dqoxrsywknsgkxrdrxep`
**Repository:** `way2paisaindia/way2paisa-public`

## Executive outcome
- **Seven additional first-party-identified registered L&T Elixir Reserve phases** were added to Supabase as distinct *private* project research records.
- An existing *published* generic L&T Elixir Reserve record was conclusively identified as the **Dove** registered phase, corrected in its name and public title, and four phase-unattributed 4 BHK price examples were moved to historical inactive inventory.
- The record's unverified precise map coordinates and generic map pin were withdrawn; original broad Powai development location remains.
- The live public **property-search card** for the now named `L&T Elixir Reserve — Dove` passed HTTP 200 and showed **Price on request**. Its separate detail-page HTML still held the prior cached presentation on first check; Next.js ISR must regenerate independently and requires a follow-up verification.
- Previous outstanding Sugee Sea Krest detail-page stale cache **was verified resolved**: HTTP 200 and `Sugee Sea Krest Worli | Price on Request`, without the older ₹75 crore price in starting-price display.
- No new project **published**, no existing project unpublished, no GoDaddy deployment, no emails, no live price manufactured, no unauthorized phase imagery activated.

## Source: L&T Realty's own registration disclosures
Official primary source:
https://www.lntrealty.com/residences/luxury-2-3-4-bhk-flats-in-elixir-reserve-powai-mumbai/

The official developer RERA roster names **eight individually registered** phases:
1. Atthis at L&T Realty Elixir Reserve — **P51800033618**
2. Iora — **P51800033984**
3. Cafer — **P51800034053**
4. Dove — **P51800055488** (already a published Way2Paisa record, formerly generic `L&T Elixir Reserve`)
5. Prinia — **P51800055625**
6. Ibis — **P51800055830**
7. Cygnus — **P51800055987**
8. Barbet — **PR1180002500072**

The first-party source reliably establishes developer branding and RERA identity; it does **not** prove present unbooked numbered stock, phase-specific exact unit carpet/cost basis, image licensing, or statutory completion dates. Nothing was derived from generic masterplan photos/prices for each phase.

## Seven private project records CREATED
Common private controls: `active=false`, `verified=false`, `min_price/max_price=NULL`, `min_carpet_sqft/max_carpet_sqft=NULL`, `hero_image_url=NULL`, zero active inventory, first-party source URL, registered phase-specific RERA number, `enrichment_status=hold_first_party_rera_identity_only_exact_phase_unit_price_stock_and_authorized_media`.

| Phase | Slug | MahaRERA |
|---|---|---|
| Atthis | `l-t-elixir-reserve-atthis-powai` | P51800033618 |
| Iora | `l-t-elixir-reserve-iora-powai` | P51800033984 |
| Cafer | `l-t-elixir-reserve-cafer-powai` | P51800034053 |
| Prinia | `l-t-elixir-reserve-prinia-powai` | P51800055625 |
| Ibis | `l-t-elixir-reserve-ibis-powai` | P51800055830 |
| Cygnus | `l-t-elixir-reserve-cygnus-powai` | P51800055987 |
| Barbet | `l-t-elixir-reserve-barbet-powai` | PR1180002500072 |

Reused verified parent developer mapping `L&T Realty` and locality `Powai`; avoided invented *phase-specific* coordinates, price, flat schedules, possession dates, photos or availability. Seven source-audit rows created (`phase_specific_lnt_registered_identity_20261126`). Supabase insert guarded by unique slug or matching RERA to prevent duplicate creation. A production request for private Barbet `/projects/l-t-elixir-reserve-barbet-powai` returned HTTP 404 as required.

## Existing published Elixir Reserve — Dove corrected
Existing published ID: `539c94ab-dc05-4d0f-ba88-be1b9086b628`; canonical path preserved:
https://www.way2paisa.in/projects/elixir-reserve-l-t-realty-powai

First-party L&T RERA roster associates its `P51800055488` with **Dove**, not the entire masterplan. Distinct units cannot be transferred across registered phases merely because their marketing names share a development.

Registration-derived Dove unit reference:
https://www.squareyards.com/mumbai-residential-property/lnt-elixir-reserve/141429/project/rera/p51800055488
- 4 BHK registered unit-area lines shown at **168.30 m² and 181.25 m²**, roughly **1,811–1,951 sq.ft**. This is a registration-derived secondary view and was *not* mistaken for direct regulator inspection or currently available promoter flats.
- This existing published record carried **four active** 4 BHK market rows **1,995 / 2,062 / 2,196 / 2,270 sq.ft**, with historical advertised asking prices **₹9.25, ₹9.75, ₹10.25, ₹10.75 crore**, all linked to a **generic L&T builder portfolio page**, rather than saleable flat allocations in Dove. Comparison: the separately registered **Cygnus P51800055987** is marketed with larger 4 BHK **1,995–2,272 sq.ft** ranges in an independent phase comparison: https://www.mumbaipropertyexchange.com/4bhk-flats-in-powai-under-10-crore . This indicates possible phase leakage but does *not* justify reassigning units to Cygnus.
- Action: conditionally deactivated all **four** unrelated phase-unattributed rows. Original `price`, `carpet_area_sqft` and `source_url` retained, and explicit internal `availability` archival rationale added.
- Corrected **public project name to `L&T Elixir Reserve — Dove`**, `bhk_original` to registered residential types `3 BHK | 4 BHK`, and `min_price/max_price/min_carpet_sqft/max_carpet_sqft=NULL`. Public title/description now explain phase-specific registration and require a fresh named available flat, legal carpet and dated inclusive promoter cost sheet; historical price examples remain in private/internal fields only.
- Preserved `active=true`, `verified=true`, `enrichment_status=complete`; slug and current hero/gallery files not changed. No developer emails.

### Location and source cleanup
- The original public Dove `google_maps_url` pointed to **19.125739, 72.892047**, sourced from a generic Elixir Reserve development map provider, not the exact Dove tower entrance. Reset `latitude/longitude/google_maps_url` to **NULL**, retaining broad **Saki Vihar Road, Powai** address with honest phase-specific pin caveat.
- Updated `rera_source_url`, `overview_source_url`, `details_source_url`, `location_source_url` to the canonical official L&T Realty Elixir Reserve project page that lists all registered phases. Removed third-party portal name from `source_name`; corrected `source_type` to indicate official phase identity with older market quotes archived.
- Two project audit-source rows inserted: `dove_elixir_rera_phase_carpet_pricing_correction_20261126` and `dove_elixir_no_unverified_phase_pin_20261126`.
- Existing hero and 3 gallery references remain unchanged; their precise Dove phase attribution and commercial reuse basis should be re-reviewed before any new media activation. Image cleanup/GoDaddy deployment was not attempted.

## Live verification and post-conditions
- Public property search: `https://www.way2paisa.in/properties?market=Mumbai&q=Elixir%20Reserve`, HTTP **200**, shows **L&T Elixir Reserve — Dove**, **3 BHK | 4 BHK**, **Starting Price on request**.
- Dove individual project `/projects/elixir-reserve-l-t-realty-powai` initially returned an older cached ₹9.25Cr page. Do not claim full page refresh until it is verified; Next.js route renders with `revalidate=300` but may retain HTML until regeneration.
- Previously outstanding Sugee Sea Krest individual `/projects/sugee-sea-krest-worli` returned **200**, title **Price on Request**, and no old ₹75Cr starting quote after natural cache regeneration.
- Final Supabase SQL at end of this cycle: **1,905** projects total, **683 published**, **1,222 private**. Published Mumbai/MMR **487**, live Mumbai/MMR inventory rows **1,698** (four fewer due Dove archival), zero private Mumbai/MMR live inventory, **11** published Mumbai/MMR projects with no active inventory; **zero** such projects still have misleading numeric `min/max price/carpet` or quote-derived numeric area fallback. Private newly added L&T phases **7**, source evidence rows **9**.
- `active=true` and `verified=true` are not guaranteed unit stock; the site remains price-on-request when no current offers.
- This audit does **not** imply a GoDaddy code deployment, newly published project, licensed image publication or verified phase-specific currently unbooked units.

## Next actions
1. Recheck the Dove project page HTML after route cache regeneration.
2. Find direct promoter-issued, dated wing/flat/area/cost sheets and verified first-party permissible project media for a subset of the seven staged phases, prioritizing Barbet and Cygnus.
3. Confirm exact Dove tower entrance and phase-specific image rights before re-enabling pin/gallery changes; avoid generic development pin and stock cross-allocation.


## Late evening verification — Dove detail route and BHK formatter
- Public `/projects/elixir-reserve-l-t-realty-powai` subsequently regenerated with HTTP 200, current SEO title `L&T Elixir Reserve Dove Powai | Price on Request`, current Dove name and **Starting Price on request**; no former ₹9.25 Cr starting price.
- Immediately following the developer source and map correction, the rendered location section was still serving its **earlier** broad description and old Google Maps 19.125739,72.892047 link. This is a distinct ISR snapshot from the later Supabase source updates and requires another route-cache refresh before confirming that the exact unverified map link disappeared. **Database** location coordinates, `google_maps_url` already verified NULL, no invented replacement pin.
- In the live detail page configuration formatter, `cleanConfiguration` split `3 BHK | 4 BHK` at the pipe and displayed only 3 BHK, whereas public search showed both. Rather than redeploy code, corrected Dove `bhk_original` to the equivalent `3 & 4 BHK`, which existing renderer expands to both options on refresh. One audit entry `dove_bhk_display_formatter_fix_20261126` added. No inventory, pricing, RERA or publish status change.
