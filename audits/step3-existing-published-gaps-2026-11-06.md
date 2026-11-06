# Step 3 — Legacy published project gaps under the November 2026 enhanced quality gate

**Audit timestamp:** 6 November 2026 (after 681-project catalogue and the two successfully quality-gated plot activations). **Source:** read-only `public.project_enrichment_gaps(project_id)` on all `public.projects` currently `active=true AND verified=true AND enrichment_status='complete'`.

## Exact count

- Current published under existing public catalogue filter: **681 projects**
- Pass all present verification constraints: **667**
- **14** already-published projects have at least one outstanding check; these are legacy/newer projects which were published **before** the stricter `BEFORE UPDATE OF verified` database trigger was installed or before complete evidence was captured.
- This audit did **not unpublish or reprice any record**, change a `verified` boolean or claim missing approvals or media are available. It is a remediation backlog for source-backed improvement and independently verified image/legal stock work.
- A safe metadata-only fix was performed to Casa Foresta's *existing registration provenance categorisation*: added a source whose field_name contains `maharera_registration`, correctly referencing P51700032990 A/B/H/I RERA. That one gap is now closed while its remaining status/GPS/media issues remain unresolved.

## Exact missing-field summary

- `genuine_project_gallery`: **14** projects
- `genuine_project_hero`: **13** projects
- `geographic_coordinates`: **12** projects
- `exact_configuration_inventory`: **9** projects
- `possession_and_status`: **7** projects

A project can have multiple different gaps, so these category counts cannot be summed to get 14.

## Full unremediated set

| Public project | Slug | Required checks still missing |
|---|---|---|
| Lodha Casa Evergreen — Vikhroli West (C1 & C3) | `lodha-casa-evergreen-vikhroli-west` | possession_and_status, exact_configuration_inventory, geographic_coordinates, genuine_project_hero, genuine_project_gallery |
| Lodha Signet Kalyan–Shil Road — Commercial Offices | `lodha-signet-kalyan-shil-road-offices` | possession_and_status, exact_configuration_inventory, geographic_coordinates, genuine_project_hero, genuine_project_gallery |
| Lodha Signet — Matunga Offices & Doctors Enclave | `lodha-signet-matunga-offices` | possession_and_status, exact_configuration_inventory, geographic_coordinates, genuine_project_hero, genuine_project_gallery |
| Lodha Signet Thane — Kolshet Road Offices | `lodha-signet-thane-kolshet-road-offices` | possession_and_status, exact_configuration_inventory, geographic_coordinates, genuine_project_hero, genuine_project_gallery |
| Lodha Signet — Vikhroli Commercial Offices | `lodha-signet-vikhroli-offices` | possession_and_status, exact_configuration_inventory, geographic_coordinates, genuine_project_hero, genuine_project_gallery |
| Dosti Willow — West County Phase 7 | `dosti-west-county-willow-thane` | exact_configuration_inventory, geographic_coordinates, genuine_project_hero, genuine_project_gallery |
| Lodha Bellavista — Thane (Wings B1 & B2) | `lodha-bellavista-thane-west` | exact_configuration_inventory, geographic_coordinates, genuine_project_hero, genuine_project_gallery |
| Lodha Casa Foresta — Palava (A, B, H & I) | `lodha-casa-foresta-palava` | possession_and_status, geographic_coordinates, genuine_project_hero, genuine_project_gallery |
| Lodha Casa Olivia — 3 Bed with Deck | `lodha-casa-olivia-palava` | exact_configuration_inventory, geographic_coordinates, genuine_project_hero, genuine_project_gallery |
| Marathon Nexzone — Nirvana Collection (Wings A & B) | `marathon-nexzone-nirvana-collection-panvel` | possession_and_status, geographic_coordinates, genuine_project_hero, genuine_project_gallery |
| Sunset Gardens by Marathon | `sunset-gardens-by-marathon-mulund-west` | exact_configuration_inventory, geographic_coordinates, genuine_project_hero, genuine_project_gallery |
| Marathon Zaver Arcade | `marathon-zaver-arcade-mulund-west` | geographic_coordinates, genuine_project_hero, genuine_project_gallery |
| Godrej Bliss | `bliss-godrej-properties-kandivali-east` | genuine_project_hero, genuine_project_gallery |
| Emaar Harbour Gate at Dubai Creek Harbour | `emaar-harbour-gate-dubai-creek-harbour` | genuine_project_gallery |

## Remediation order

1. **Previously known broken imagery:** Godrej Bliss (hero/gallery) and Emaar Harbour Gate (gallery). Retrieve genuine rights-cleared project-specific photos; use nonduplicated distinct gallery images with working browser URLs. Do not use a different development's render or a generic stock image. Independent browser display verification is required, not just a server `HEAD` status.
2. **Recently published no-image + no-coordinate projects:** Lodha Casa Evergreen/Foresta/Olivia, Lodha Bellavista, Lodha Signet Thane/Kalyan–Shil/Vikhroli/Matunga, Marathon Nirvana/Zaver/Sunset, Dosti Willow. Their exact tower/phase coordinates need first-party cadastral/regulatory evidence; do not generate approximate lat/long from the locality. Obtain authorised original hero and three distinct gallery images (never impersonate rights ownership).
3. **Exact configuration inventory:** some recent developer-labelled *starting-price* rows intentionally have `carpet_area_sqft=NULL` because they are not verified to a numbered, currently available apartment/office. A true confirmed current developer flat/office at exact RERA carpet size and promoter cost sheet is needed for the stricter gate, not fabricated numbers; keep public marketing caveats until then.
4. **Completion and status:** mixed phase/tower marketed collections intentionally use `possession_date=NULL` where different registered completion schedules exist. Do not fill a false collection-wide RERA date just to silence a constraint. Either store correctly modelled per-phase legally supported dates with a revised presentation layer or keep an honestly recorded checker gap.
5. **Hosting migration:** the Cloudflare Pages static-first code and build template remain on isolated `migration/cloudflare-free-static-first`. No real preview, account, or custom domain cutover was completed. The current premium production site stays at Vercel until Cloudflare Free visual/design parity and full admin/CRM/lead/canonical URL/media checks pass.

## Safety commitments

- The newly activated `godrej-hillview-estate-khalapur` and `birla-mrida-boisar-palghar` both have **zero** quality checker gaps following activation and explicit marketplace-price/availability disclaimers. No incoming emails or developer requests were generated.
- Guarded catalogue snapshot minimum for the migration remains **681**, with **2,412** active inventory rows, **3,173** active media and **1,159** private records as last observed.
- An earlier attempt to force private `godrej-city-nexspace-panvel` through verification was blocked atomically by the database gate because five evidence classes were missing. It remains PRIVATE; no bypass was attempted.
- This audit is an internal source remediation plan, *not a user-facing guarantee* that all 681 are safe to book and not approval for promotional publication or live sale-allocation statements.
