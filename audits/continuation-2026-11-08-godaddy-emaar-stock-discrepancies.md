# Way2Paisa — 8 November 2026 continuation, developer inventory divergence and publication guards

## Scope
The owner reports that `www.way2paisa.in` migrated from Vercel to GoDaddy. This continuation performed read-only catalogue checks and added source evidence to the existing connected Supabase database, without changing public project status, project selling prices, primary stock rows, existing media, DNS, hosting, or developer contact workflows.

## Current baseline
- `public.projects`: 1,842 total, 681 published (`active=true, verified=true, enrichment_status='complete'`) and 1,161 unpublished.
- Active inventory: 2,412 rows. Active project media: 3,173.
- Published projects with `project_enrichment_gaps(id)`: 14 distinct; among them `emaar-harbour-gate-dubai-creek-harbour` lacks a third verified gallery asset and `bliss-godrej-properties-kandivali-east` lacks verified hero and gallery. Most remaining gaps combine genuine images and exact coordinates and several have phase inventory/possession conflicts.
- New **project** activations: **0**. New `project_sources` verification records: **7**, all saved on 8 November.

## Emaar Dubai Creek Harbour — developer catalogue versus Way2Paisa
Source: https://www.emaar.com/en/our-communities/dubai-creek-harbour ; Emaar official pages indexed 7–8 November 2026. A community card is not itself a unit-level availability confirmation.

| Published project | Way2Paisa active rows / lowest active price | Emaar advertised current card | Outcome |
|---|---|---|---|
| Emaar Silva | 9 / AED 1,790,888 | 8 remaining / AED 1,824,888 | **Reconciliation hold:** old direct P2-P202 page says AED 1,790,888 Available while new community headline implies that low offer may no longer be current. Do not selectively delete or reprice until direct named-unit live booking proof. |
| Emaar Altus | 4 / AED 2,739,888 | 3 remaining / AED 3,991,888 | **Reconciliation hold:** low 2BR DC Altus T2-8-806 AED 2,739,888 derives from partner AL SAEB, not current Emaar 3BR-only card. 3 named 3BR rows are independently corroborated; do not assume broker Reserve means first-party bookable. |
| Emaar Albero | 21 / AED 1,813,888 | 22 remaining / AED 1,813,888 | **Missing unit reconciliation:** official Arabic sales page highlights DC Albero-13-1308, 3BR 1,848 sq.ft AED 4,196,888, but an independent unit-listing snapshot labels the same unit Sold Out. Do not auto-publish the 22nd unit from headline count. |
| Emaar Lyvia by Palace | 5 / AED 2,684,888 | 15 remaining / AED 2,684,888 | **Batch opportunity, not a claim:** 10 unrepresented named units must be verified against first-party exact available status, prices and phase before adding; existing five partner quotes unchanged. |
| Emaar Harbour Gate | 6 / AED 3,360,888 | 6 remaining / AED 3,360,888 | **Six-unit quoted amount reconciliation PASS**: six Way2Paisa unit IDs and asking prices match Emaar unit pages. Project still has missing verified third gallery image; commercial asset-use rights are not inferred. |

Exact Harbour Gate developer references:
- T1-1-103: https://www.emaar.com/en/unit-details/DC%20Harbour%20Gate%20T1-1-103 — 3BR, 1639 sq.ft, AED 4,964,888.
- T1-1-104: https://www.emaar.com/en/unit-details/DC%20Harbour%20Gate%20T1-1-104 — 2BR, 1152 sq.ft, AED 3,360,888.
- T1-2-203: https://www.emaar.com/en/unit-details/DC%20Harbour%20Gate%20T1-2-203 — 3BR, 1639 sq.ft, AED 4,976,888.
- T1-4-403: https://www.emaar.com/en/unit-details/DC%20Harbour%20Gate%20T1-4-403 — 3BR, 1640 sq.ft, AED 4,999,888.
- T1-5-503: https://www.emaar.com/en/unit-details/DC%20Harbour%20Gate%20T1-5-503 — 3BR, 1640 sq.ft, AED 5,009,888.
- T2-2-203: https://www.emaar.com/en/unit-details/DC%20Harbour%20Gate%20T2-2-203 — 3BR, 1639 sq.ft, AED 4,516,888.

## Unpublished candidate rechecks (still held)
- **Binghatti Haven**, DLD 3442: current https://www.binghatti.com/en/projects/binghatti-haven identifies layouts but does not prove a specific unsold 2BR; the developer's archived `/en/project-details/2-bedroom-binghatti-haven/10069` has indicated SOLD OUT for an exact different sized offering, despite generic project-search advertisements. Registered Q1 2026 completion has elapsed; no claim of OC or handover.
- **Emaar Fior 1**, DLD 4287: official https://www.emaar.com/en/properties/fior-1-at-rashid-yachts-and-marina still leads to Register Interest and starting-price marketing, not current exact Emaar Book Now stock. Broker-listed 15 numbered offers remain private. Developer asset-use permission not established.
- **Emaar Acacia**, DLD 1633: developer English/Arabic source attribution between Acacia/Mulberry remains conflicting; official current indexed sales grid alone does not verify statutory registered project for each stock ID. Do not override prior withdrawal.

## Evidence mutations and checks
Added seven idempotently named `public.project_sources` rows:
`20261108_primary_vs_catalogue_silva_stock_count`,
`20261108_primary_vs_partner_altus_stock_conflict`,
`20261108_primary_vs_catalogue_albero_stock_count`,
`20261108_primary_vs_partner_lyvia_stock_count`,
`20261108_six_developer_quoted_stock_reconciliation`,
`20261108_official_project_teaser_not_unit_allocation`,
`20261108_official_fior1_teaser_only`.

No project or inventory price, availability, active state, project photos or GoDaddy deployment was modified. The public website's GoDaddy build and live Supabase propagation could not be independently certified in this session: do **not** describe these Supabase evidence notes as a published web update.

## Next release gates
1. For any private project, obtain direct promoter bookable unit/plot allocation, registered area, inclusive cost sheet with fees, independent regulatory identity, accurate project pin and project-specific licensed media; re-run `project_enrichment_gaps` and compliance recheck before activating.
2. Prioritize Altus and Silva to reconcile actual current unit availability (avoid inaccurate low prices). Add any missing Lyvia or Albero unit only after its exact *first-party* available source is confirmed.
3. Check actual `www.way2paisa.in` canonical page, collection count and sitemap once GoDaddy deployment access can be verified, without changing nameservers or forcing a hosting cutover.
4. Do not send emails, purchase upgrades or request developer data without the owner's direction.
