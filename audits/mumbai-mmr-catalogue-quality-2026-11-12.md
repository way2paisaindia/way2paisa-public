# Way2Paisa — Mumbai/MMR catalogue quality continuation

Date: 12 November 2026 (India)
Source: read-only queries against connected Supabase project `Way2Paisa Realty` (project ref `dqoxrsywknsgkxrdrxep`). This is a database audit, **not** evidence of a successful live deployment or browser verification.

## Snapshot
- Active projects: Mumbai **366**, MMR **119**, Dubai **196**, total **681**.
- Published Mumbai/MMR records: **485**.
- Active Mumbai/MMR records with empty RERA field: **0**.
- Active Mumbai/MMR records with null `min_price`: **0**. Presence of numeric price does **not** certify that it is current.
- Duplicate identical non-empty `rera_number` strings within active Mumbai/MMR records: **0**. This does not eliminate possible duplicates with differently formatted/multi-phase RERA numbers.
- Published Mumbai/MMR records without `hero_image_url` and with **0 active project_media rows of media_type='image'**: **12** (Mumbai 5, MMR 7). Do not substitute stock photos, logos or unrelated project images; verify project-specific image rights and source first.

## Missing image work queue — Mumbai
1. Lodha Casa Evergreen — Vikhroli West (C1 & C3) — `lodha-casa-evergreen-vikhroli-west`
2. Lodha Signet — Matunga Offices & Doctors Enclave — `lodha-signet-matunga-offices`
3. Lodha Signet — Vikhroli Commercial Offices — `lodha-signet-vikhroli-offices`
4. Marathon Zaver Arcade — `marathon-zaver-arcade-mulund-west`
5. Sunset Gardens by Marathon — `sunset-gardens-by-marathon-mulund-west`

## Missing image work queue — MMR
1. Dosti Willow — West County Phase 7 — `dosti-west-county-willow-thane`
2. Lodha Bellavista — Thane (Wings B1 & B2) — `lodha-bellavista-thane-west`
3. Lodha Casa Foresta — Palava (A, B, H & I) — `lodha-casa-foresta-palava`
4. Lodha Casa Olivia — 3 Bed with Deck — `lodha-casa-olivia-palava`
5. Lodha Signet Kalyan–Shil Road — Commercial Offices — `lodha-signet-kalyan-shil-road-offices`
6. Lodha Signet Thane — Kolshet Road Offices — `lodha-signet-thane-kolshet-road-offices`
7. Marathon Nexzone — Nirvana Collection (Wings A & B) — `marathon-nexzone-nirvana-collection-panvel`

## Duplicate handling spot-check
- `P51900032251`: `raheja-imperia-ii-the-riviere-worli` active; two historical aliases inactive.
- `P51800048862; P51800052417`: `lodha-acenza` active; stale alias inactive.
- `P51800055489`: `moonrise-at-rivali-park-borivali-east` active; duplicate inactive.
- `PR1180002502121`: both Elite Spectrum/Spectrum records inactive pending saleable inventory/verification.
- Galaxy Heights Tower IV remains inactive pending dated RERA clarification, sellable inventory, carpet/price verification and licensed media. Third-party summaries contain inconsistent completion/revision dates, so do not assert a specific possession date without current authoritative filing.

## Publication guardrails
- Prioritize Mumbai/MMR over Dubai; leave Emaar imagery separately deferred.
- Publish only after verifying legal project/tower identity, registration, phase-wise dates, current saleable configuration/carpet/pricing, address, and permitted real project imagery.
- Do not change active prices, inventory, publication statuses, or domain/hosting in response to this audit alone.
- No emails, developer requests, lead submissions, or external notifications were sent.

## Status
This cycle saved a reproducible issue queue and duplicate checks only. **New projects published in this cycle: 0. Database records modified in this cycle: 0.**
