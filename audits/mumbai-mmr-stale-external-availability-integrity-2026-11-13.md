# Way2Paisa — 13 November 2026, Mumbai/MMR inventory availability integrity batch and plotted-land deployment gate

## Verified cycle result

- Published catalogue remains **682** projects: **367 Mumbai, 119 MMR, 196 Dubai**. **New projects activated: 0**.
- The active Mumbai/MMR inventory count remains **1,731 rows**; no unit, plot, price, area, configuration, active flag, RERA status, or publication flag was changed.
- Reclassified exactly **264** aged externally sourced inventory rows across **113** existing published projects from database-level **`Available`** to neutral **`Confirm Availability`**. The original external/partner source record was last checked more than **14 days** ago, and the record was not backed by a fresh promoter-issued unit-specific booking confirmation. This is a **wording/confirmation-status change, NOT a sold-out/unpublished state and NOT a promoter-stock re-verification**.
- Wrote **113 complete per-project source-audit records** under `public.project_sources`, `field_name='inventory_stale_external_availability_20261113'`, preserving all 264 old statuses, their immutable inventory IDs, configurations, existing price values, external source type, URL and original `last_verified` dates. No stored `last_verified` values were falsely refreshed.
- Guarded the update on 264 candidate records and exactly 113 auditable project summaries; returned 264/113, zero inventory rows unexpectedly inactive. Summed original numeric prices in changed rows after the update = 1552.9645 Cr as a record-level sum, **not** a valuation/turnover calculation and not a before-after price difference; prices never appeared in UPDATE SET clause.
- Read-back of all live Mumbai/MMR inventory confirms: **1,731 active**, **285** already neutral `Confirm Availability` (including the prior-cycle 21), **210** remaining labelled `Available` from source types excluded from this **external/partner-only** batch. **Zero** remaining records meeting the exact stale-external-source predicate claim `Available`.
- Independent live page read-only QA:
  - https://www.way2paisa.in/projects/prime-one-k-raheja-juinagar — existing 526–3,621 sq.ft office quotes unchanged; table displays Confirm Availability.
  - https://www.way2paisa.in/projects/arkade-pearl-vile-parle — live 2 BHK 721–839 sq.ft ₹3.47–4.16 Cr, 3 BHK 1126–1200 sq.ft ₹5.48–5.96 Cr; table Confirm Availability.
  - https://www.way2paisa.in/projects/celebration-land-neral — live Villa Land 2,260 sq.ft ₹81.99 Lakh, Confirm Availability; title still says Ready to Move (a DIFFERENT plot status display problem).
  These pages had a cautious client rendering even before the DB fix; thus browser checks corroborate no apparent regression but are not standalone proof of instant live database freshness. SQL post-write read-back is authoritative for stored edits.
- All **13** previously identified live Mumbai/MMR project completeness flags remain outstanding (including **9** config-level inventory gates). These are not automatically fixed by availability-copy changes.

## Why these 264, not the remaining 210

The filter deliberately required ALL of:
1. `public.projects.active=true`, market Mumbai or MMR
2. `public.inventory.active=true` and `availability='Available'`
3. `last_verified < now()-interval '14 days'`
4. `source_type` explicitly identifies third-party, partner, marketplace, market-primary, external/new property listing or unallocated marketing, using regex `marketing_partner|external|market_primary|marketplace|new_property_listing|third.party|indicat|brok|unallocated`.

This selected **178 Mumbai and 86 MMR** rows. `market`, source attribution, exact current area and selling-price basis were preserved. Excluded original developer-certified or other category rows from this operation for separate verification; a source that was verified last month is not a fresh currently allocated flat simply because the original importer wrote "Available". The public UI already contains the safety function `publicAvailability` that often labels dated non-promoter offers Confirm Availability, so the DB update brings persisted data into alignment with buyer-visible caution. **Never change `last_verified` to now without actually rechecking that exact unit with the source.**

## Plot-status UI bug — draft PR only, live still incorrect

On GoDaddy live, Celebration Land Neral (residential land plot, not a constructed house) still displays **`Status: Ready to Move`** and `Possession: Available on request`. Sol de Alibaug / The Riyasat Sankalp also have historic completed/ready terminology. Original project descriptions were previously corrected to clarify that the buyer is purchasing land.

The staging branch `fix/mmr-plot-status-predeploy-20261112`, commit `731b63a15cc878e01ddfdeb9bb168e25405361ee`, changes only the project-detail status formatter in `app/projects/[slug]/page.js`:
- `publicStatus(p.status,p.category)` used at both rendered status call sites.
- `plot/land` render `Plotted Land — Verify Handover` where legacy status says "Ready", "Completed" or "Possession", plus separate labels for upcoming/sold-out/new plotted launch.
- Apartment/villa/commercial status handling left intact.

Created **[draft GitHub PR #17](https://github.com/way2paisaindia/way2paisa-public/pull/17)** for this staged fix. It is **unmerged, undeployed**; GH compare reported one code commit ahead and six audit-only commits behind main. Do not merge blindly because GoDaddy/Airo premium live homepage and source differ from this GitHub checkout. First reconcile current GoDaddy source, inspect main / build preservation, test lead forms and all project categories, then plan a safe deploy to avoid a new outage or loss of UI. Live source fix is NOT yet done.

## New project publication

The new-launch discovery source https://www.mumbaipropertyexchange.com/new-launch-projects-in-m (updated 12 Nov 2026) and local-market pages show newly marketed projects and areas, but this is a partner/portal discovery feed, **not** proof of current promoter unit-numbered flat + registered RERA carpet + all-inclusive price and permitted original images. Existing close-to-ready private research records are still held. No synthetic gallery, price, promoter's inventory or unverified location was activated. Publication count remains 682.

## Next priorities

1. Review the remaining 210 "Available" inventory rows separately to distinguish genuinely current direct developer offers from old third-party information; do not blanket downgrade them or mark any more stock sold.
2. Continue screening new Mumbai/MMR first-party exact allocated stock plus statutory and image permissions before adding new public projects. 
3. Resolve authenticated GoDaddy source-freshness and code-drift issue, then test and deploy PR #17 safely, not directly from an unverified git branch.
4. Close the 13 published media/project completeness flags with approved images and legally correct configuration areas; keep inactive photo URL candidates out of public page until reuse rights are established.

No emails, customer contact, charge, Cloudflare/Vercel migrations or GoDaddy deployment were performed in this cycle.
