# Way2Paisa — Mumbai/MMR production catalogue continuation
Date: 12 November 2026 (IST)

## Verified results
- Connected Supabase project: Way2Paisa Realty. Post-update **681 active projects**: Mumbai **366**, MMR **119**, Dubai **196**.
- The original 12 missing-hero Mumbai/MMR listings still have **0 images added**; no unverified or copied images were deployed.
- No selling prices, active inventory, registered target-date columns, publication statuses or stock counts were changed.

## Two published project corrections
### Runwal Sanctuary — `sanctuary-runwal-realty-mulund-west`
- Earlier `status`: Near Possession.
- New `status`: **Mixed tower delivery stages — recorded Mar 2026 target passed; current OC/handover unverified**.
- Earlier `possession_original`: RERA 2026 (incorrectly implies same target for multiple towers).
- New `possession_original`: **Phase-wise — confirm tower-specific RERA timeline**.
- Stored historical `possession_date`: 2026-03-01 **unchanged**.
- Sources: https://runwalrealty.com/our-project/residential-ongoing/runwal-sanctuary/ (promoter still displays project-wide 2026 marketing) and https://askrera.com/projects/district/mumbai-suburban/mulund/ (Tower 2 / Towers 4,5 differ). The Runwal Realty own 2-BHK page mentions OC but not exact unit/tower clearance; a blanket ready-to-move status is not supportable without phase identification. New provenance source row inserted.

### MJ Shah Centrio NX — `mj-shah-centrio-nx-phase-1`
- Earlier `status`: Near Possession / Partially Ready To Move.
- New `status`: **Under Construction — recorded Oct 2026 target passed; current OC/handover unverified**.
- Buyer-facing overview revised to remove unverified near-possession claim and request certificate/actual handover confirmation.
- Stored historical `possession_date`: 2026-10-31 **unchanged**.
- Sources: https://reragenie.com/p/centrio-nx-by-mj-shah-gowandi-sxvhs1lm/ (MahaRERA-derived summary last filing 6 Jul 2026) and https://centrio-nx.com/ (promoter 1/2 BHK identity and phase). An external extension interpretation exists at https://gharkundli.com/projects/4725; we did not overwrite the filed target with an unsupported revised certificate. New provenance source row inserted.

Post-write SELECT verified both exact statuses; both projects still active with their same starting prices and active inventory rows.

## Buyer-facing source-code improvement
- Commit `818d0269b97a2cb49a9530385a0e092e7c36b375` to `main` in `app/projects/[slug]/page.js` handles explicit **phase-wise, verification-needed** possession text as `Phase-wise — verify registered tower dates` instead of `Available on request`.
- The conditional overdue possession notice from earlier commit `c5095d8f97d070ee85a6eda462e8a4738d2c7206` also matches the two new status values; manual predicate checks confirm intended eligible/ineligible cases.
- **GoDaddy deployment not verified**; GitHub commits do not establish live user-facing deployment. No Cloudflare or Vercel migration attempted.

## Image-research source backlog completed
Exactly **12 new `project_sources` records** were added using `official_media_source_candidate_20261112`, one for each active Mumbai/MMR listing with missing hero/media; all verified by post-write SELECT. These links establish a known first-party location to research **project-specific** media, not permission to reproduce or hotlink the files.

| Slug | First-party project source |
|---|---|
| `dosti-west-county-willow-thane` | https://www.dostirealty.com/project/dosti-willow |
| `lodha-bellavista-thane-west` | https://www.lodhagroup.com/projects/residential-property-in-thane/lodha-bellavista |
| `lodha-casa-foresta-palava` | https://www.lodhagroup.com/palava-city/projects/residential-property-in-dombivli/casa-foresta |
| `lodha-casa-olivia-palava` | https://www.lodhagroup.com/palava-city/projects/residential-property-in-dombivli/casa-olivia |
| `lodha-signet-kalyan-shil-road-offices` | https://www.lodhagroup.com/projects/commercial-property-in-mumbai/lodha-signet-kalyan-shil-road |
| `lodha-signet-thane-kolshet-road-offices` | https://www.lodhagroup.com/projects/commercial-property-in-thane/lodha-signet-thane |
| `marathon-nexzone-nirvana-collection-panvel` | https://marathon.in/nexzone/ |
| `lodha-casa-evergreen-vikhroli-west` | https://www.lodhagroup.com/projects/residential-property-in-mumbai/casa-evergreen-vikhroli |
| `lodha-signet-matunga-offices` | https://www.lodhagroup.com/projects/commercial-property-in-mumbai/lodha-signet-matunga |
| `lodha-signet-vikhroli-offices` | https://www.lodhagroup.com/projects/commercial-property-in-mumbai/lodha-signet-vikhroli |
| `marathon-zaver-arcade-mulund-west` | https://marathon.in/zaver-arcade/ |
| `sunset-gardens-by-marathon-mulund-west` | https://sunset.in/gardens/ |

### Individual source caveats
- Runwal Sanctuary / Centrio NX: authoritative current tower/OC certificate remains needed.
- Dosti Willow developer marketing shows 2-BHK and 3-BHK area examples; source does not certify registered carpet or exact allocated unit. No area/price pair was invented in inventory.
- Marathon Zaver Arcade promoter site now says OC received, already reflected in active database status.
- Official pages contain images and renderings but not reliable permission grants. Keep all 12 image fields empty until image-level permissions and tower relevance are established.

## Unpublished near-ready inventory pipeline reviewed (not published)
- **H. Rishabraj Trident**, P51800053505: 3 BHK 1,216 sq.ft at ₹8.63 Cr / 4 BHK 1,808 sq.ft at ₹12.67 Cr are held partner-advertised figures, not confirmed promoter unit allocation; third distinct official project photo also missing. 2-BHK historical quote remains inactive.
- **The Sands**, Alibaug, PR1270002502620: ₹9.25 Cr starting marketing, but saleable villa/carpet mapping and completion status discrepancy block publication.
- **Lodha Villa Royale Gold TDLR 2**, P51700054370: marketed 250/350/450 sq.yd estate guide not uniquely allocated to registered phase / available numbered plots; related media are explicitly quarantined as wider-estate assets. https://reragenie.com/p/lodha-villa-royale-tdlr-2-sarang-mankoli-surai-x10kani0/ gives a past statutory sold/unsold snapshot, **not** a live sale allocation.

## Final audit status
- Published project count unchanged: **681**.
- Newly activated projects: **0**.
- Existing project records whose buyer-facing text/status changed this continuation: **2**.
- New source audit rows: **14** = 2 possession provenance + 12 official media research leads.
- GitHub code changes: **1** guarded possession-text enhancement; deploy pending independent verification.
- No image was inserted; no emails, developer outreach, leads, WhatsApp alerts, DNS changes, hosting migrations or external requests were sent.
