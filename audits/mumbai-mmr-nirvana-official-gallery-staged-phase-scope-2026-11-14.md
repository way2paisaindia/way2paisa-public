# Way2Paisa — Nirvana phase-specific media staging and live scope correction
**14 November 2026, Mumbai/MMR continuation. Priority: improve published listing quality without inventing rights or numbered stock.**

## Completed and SQL verified

- **Marathon Nexzone — The Nirvana Collection (Wings A & B)**, public project `marathon-nexzone-nirvana-collection-panvel`, currently active with two registered RERAs `PM1273032502296; PM1273032502304`.
- **6 first-party image candidates staged in `public.project_media`, all active=false**:
  - One tentative hero: `https://marathon.in/nexzone/wp-content/uploads/sites/29/2026/02/Nexzone_Nirvana_Website_12.jpg`
  - Five tentative gallery: `Nexzone_Nirvana_Website_04.jpg`, `_05.jpg`, `_06.jpg`, `_03.jpg`, `_07.jpg`, all under the exact same official `marathon.in/nexzone/wp-content/uploads/sites/29/2026/02/` path.
- **Distinct image candidate URLs:** 6. **Active media:** 0. **Hero URL on project:** remains NULL. `verified_at` on candidates remains NULL because image identity, delivery and distribution rights are not certified. Asset label `quarantined_first_party_nirvana_identity_delivery_and_commercial_reuse_pending`.
- Official gallery `https://marathon.in/nexzone/gallery/` labels images as The Nirvana Collection apartment interiors (2 BHK / 5 BHK), Nirvana-specific amenities, exteriors and construction; its direct image links were retrieved by read-only source parsing. Avoid using generic Nexzone 2022 images as Nirvana-specific. Exact JPG-to-hero/cell identity still needs independent visual verification; those descriptions are tentative candidates, not certified proof. Direct binary file download via the available visual tools was blocked, so **image HTTP/UX not certified**. Source-gallery link alone does **NOT** confer permission to rehost or redistribute.
- Discovered Marathon's **official channel-partner collateral page** `https://marathon.in/partner-with-us/`: the developer explicitly offers campaign/project collateral for its CP network, and lists Nexzone collateral on Dropbox. The linked document is labelled **Nexzone 1/2/2.5BHK**, apparently older broader township materials; it does not establish a commercial-reuse grant for 2026 Nirvana A/B campaign assets or confirm Way2Paisa's current Marathon CP accreditation. The Dropbox collateral source link was visible `https://www.dropbox.com/scl/fo/0ggdfmtxwa3i35rtp4sfj/h?dl=0&rlkey=wmqey3e33mzvh2lehvpq5o61b` but a read-only fetch cache-missed. No redistribution, no partner sign-in, no outreach/email. No assumption of rights.
- Source record `nirvana_gallery_phase_specific_candidates_staged_20261114` contains the six exact candidate image URLs, the first-party gallery URL and the explicit rights/identity/delivery hold.

## Live buyer-facing phase description corrected

Marathon's current **first-party main project** page `https://marathon.in/nexzone/` explicitly markets Nirvana as **FOUR final towers**; the **construction update** `https://marathon.in/nexzone/construction-updates/` lists Nirvana Tower **A, B, C and D**. The existing Way2Paisa listing represents only two **independently verified RERA Wing A/B** registrations and should not imply those are all towers or assign 2/3/4/5BHK stock to C or D without legal registration.

- **One existing public project `description` corrected** in Supabase, preserving source proof under `nirvana_four_tower_marketing_vs_two_registered_wings_20261114`.
- New live overview excerpt: "The developer markets four final Nirvana towers, but this Way2Paisa listing covers only the separately verified registered Wings A and B (PM1273032502296 and PM1273032502304). Displayed configurations and starting prices describe the wider collection, not confirmed individually allocated flats in either wing."
- `enrichment_notes` appended with source/gate explanation.
- **NO** changes to `status='Under Construction — Phase 3 Wings A & B'`, price, unit area, inventory, RERA, possession date `2030-12-30`, active flag, hero, gallery, developer name or map.
- **Confirmed visible in independent live page fetch**: `https://www.way2paisa.in/projects/marathon-nexzone-nirvana-collection-panvel` now renders updated overview. Price table remains 2BHK RERA carpet **617–664sqft ₹98L–1.08Cr**; 3.5 BHK **944–1,000sqft ₹1.69Cr**; 4.5BHK **1,307sqft ₹1.96Cr**; 5BHK **1,337sqft ₹2.16Cr**; all **Confirm Availability**. The developer's separately marketed 656/710/1076/1385/1431sqft sizes are not falsely relabelled as registered carpet; the 3.5BR marketed size and floorplan differences remain flagged.
- Independent live Godrej Bliss and Marathon Zaver Arcade pages still render original ranges, prices and honest request-photo fallback; no asset altered.

## Final integrity check

- Total published **682**: Mumbai **367**, MMR **119**, Dubai **196**.
- Active Mumbai/MMR inventory **1,731**, with **0** `Available`, **495** `Confirm Availability`, other 1,236 previously qualified labels.
- **13** active Mumbai/MMR projects still flagged by `public.project_enrichment_gaps()`: **3** blocked solely by media, **9** with incomplete exact configuration inventory, **7** with GPS gaps (overlapping sets). Nirvana remains **genuine_project_hero + genuine_project_gallery** incomplete because six newly staged assets are correctly inactive.
- Two new dated `project_sources` notes for Nirvana, six media candidates staged, one **public content** correction propagated. No public activation, no prices changed, no inventory modification, no new project published, no mail sent.

## Existing release blockers

Draft GitHub PR [#17](https://github.com/way2paisaindia/way2paisa-public/pull/17) for plotted-land "Ready to Move" mislabelling; [#20](https://github.com/way2paisaindia/way2paisa-public/pull/20) for mixed villa/plot size; [#22](https://github.com/way2paisaindia/way2paisa-public/pull/22) for commercial advertised area and "Available Configurations" heading. All unmerged/undeployed. PR #22 preview had successful Netlify build status but HTTP 401 preview authentication and Vercel account-blocked status; cannot certify premium GoDaddy/Airo production compatibility. Existing GoDaddy site and CRM/enquiry pipeline preserved, no migration planned.

## Next actions

1. Reconcile documented commercial-reuse rights for first-party Marathon Nirvana, Marathon Zaver and Godrej Bliss media via authorised partner material, if user provides/authorises; do not send developer requests by email on user's behalf.
2. Check asset identities are distinct, real JPGs, correct phase and load reliably in browser, then only after lawful marketing permission activate approved hero/gallery.
3. Continue registered new Mumbai/MMR pipeline for true active promoter-issued numbered units and final all-in pricing, avoiding unregistered sales and misleading marketed carpet.
4. Release UI drafts only after current authenticated GoDaddy source, premium homepage, project gallery isolation, admin/CRM, lead form and SEO metadata smoke tests.
