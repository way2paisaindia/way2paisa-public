# Way2Paisa — 14 November 2026 | Mumbai/MMR price corrections, statutory vs builder possession labels and cache verification

**Production policy:** database-only guarded improvements; no GitHub PR merged, no GoDaddy/Airo restart, cache flush or deploy, no direct developer outreach, no customer emails, no hosted-media activation, no unpublishing.

## 1. Source-backed public STARTING PRICE correction — Galaxy Heights Tower II, Malad West

**Published slug:** `galaxy-heights-tower-ii` | **MahaRERA:** P51800077290 | **Promoter:** MPCHFL.

**Before:** active project minimum and maximum price ₹58 lakh (0.58Cr), active 1 BHK price ₹58 lakh with separately advertised minimum RERA carpet 365sq.ft; SEO says ₹58 lakh; public project overview said "Way2Paisa publishes only..." and status claimed spot-booking availability without identified flat.

**14Nov current first-party:** https://mpchfl.com/galaxy-heights-tower-2/ has current 1BHK from ₹62 lakh in primary offer and in FAQ; developer projects index https://mpchfl.com/projects/ also lists Tower II from ₹62 lakh. The individual page HTML/document title still says *from ₹54 Lakhs* (stale metadata), but its live rendered body, FAQ, and main directory agree on ₹62. Projects-index disclaimer says price excludes applicable taxes, statutory charges and is subject to change/limited unit offer.

**Corrected in guarded transactional SQL:** `projects.min_price=0.62`, `max_price=0.62`; single active `inventory.price=0.62`; `seo_description`, `price_original`, `description`, `status='Under Construction — confirm flat availability'`, `inventory.source_type='official_promoter_project_starting_price_not_allocated_unit'` and source label updated. `inventory.carpet_area_sqft=365` retained as independently advertised *minimum area*, NOT confirmed a specific numbered flat at exactly ₹62L; `availability='Confirm Availability'`, `active=true`, `last_verified=2026-10-23` (unit-level source not falsely refreshed). `possession_date=2029-12-31` remains unchanged. Old ₹58 and full fields captured under `project_sources.field_name=galaxy_heights_tower2_official_starting_price_58_to_62_20261114`, with metadata caution.

**Caution:** This is a current category-level starting price, not a signed rate card/flat allotment, not guaranteed final all-inclusive price.

## 2. Source-backed villa-LAND correction — HOABL Celebration Land, Neral

**Published slug:** `celebration-land-neral`, four unchanged MahaRERA phase registrations P52000045544, P52000045546, P52000046022, P52000046039.

First-party pages `https://www.hoabl.com/projects/celebration-land-neral` and `https://www.hoabl.com/projects/the-elements_foothills-of-matheran` currently show an exact pairing in main product card and FAQ: **210 sq.m/2,260 sq.ft residential villa land from ₹83.99 lakh all-inclusive**. Both document titles/OG titles still say historic **₹81.99 lakh**. The current repeated consumer-facing body/FAQ take precedence over stale title metadata; may still change, buyer needs named plot/all-in contract.

Changed guarded exactly one old entry: `projects.min_price=max_price=0.8399`, `inventory.price=price_max=0.8399`, explicit `price_original`, `seo_description`, and inventory source class now clarifies **first-party plot-type promotional price, not numbered allotment**. Plot area 2,260sqft preserved, `carpet_area_sqft=NULL` remains correct (it is land not a built villa), all active flags and original `inventory.last_verified=2026-10-14` preserved. `availability='Confirm Availability'`. Original ₹81.99 amount/title conflict and exact previous fields archived under `hoabl_celebration_2260_plot_current_83_99_vs_old_81_99_20261114`.

**Status UI still pending:** current project.status `Ready to Move` is a legacy generic status rendered as if a built home might be ready. Actual product is **possession-ready plotted villa land**; pending draft PR #17 will prevent conflating land possession with residential ready-to-move occupancy. No risky raw status edit that would render a different inaccurate status was applied.

## 3. HIGH-IMPACT display-data correction: 12 projects' statutory vs developer possession dates

The GitHub project-page `possessionText()` parser identifies the first date in each fragment of `possession_original`, then labels it "RERA" if the entire fragment contains the word RERA. Text like `Target Dec 2027 / RERA 31 Mar 2028` was previously showing **RERA Dec 2027**, erroneously treating the builder's earlier target as statutory, and dropping the actual registered date.

Guarded SQL converted **exactly 12** already-verified, already-live project records to two pipe-separated labelled fragments `RERA [date] | Developer target [date]`, matching the recorded `projects.possession_date` RERA year and **without changing either date**:
- `asrava-romell-group-andheri-west`: RERA Dec2028 | target Dec2027.
- `bhoomi-amogh-andheri-west`: RERA 31Dec2029 | target Dec2028.
- `bhutra-sky-avenue-mira-road-east`: MahaRERA Dec2029 | target Dec2028.
- `esto-arkis-versova-andheri-west`: RERA 31Dec2030 | target Dec2029.
- `galaxy-heights-tower-ii`: RERA Tower II Dec2029 | target Dec2028.
- `jet-ananta-andheri-west`: RERA 31Mar2028 | target Dec2027.
- `kabra-dvayam-worli`: RERA Dec2029 | target Jan2028.
- `lnt-the-gateway-sewri`: MahaRERA revised 30Jan2029 | target Dec2028.
- `omsai-white-house-chembur-east`: MahaRERA Dec2028 | target Dec2027.
- `spenta-anthea-andheri-west`: RERA 31Dec2029 | target Dec2028.
- `swaroop-grandeur-andheri-west`: RERA 31Mar2029 | target Mar2028.
- `veena-imperia-andheri-west`: RERA 31Dec2030 | target Dec2029.

**12 dated source audit notes** `rera_vs_developer_target_presentation_20261114` archive original public `possession_original`, exact revised text, existing registered numeric date and prior project RERA source URL. New date source is not falsely certified: this is presentation formatting of existing approved project-data fields. Conditional cases of only "automatic extensions" lacking signed certificates and unrelated old-versus-revised RERA dates were excluded intentionally.

First execution failed safely because `project_sources.source_url` is NOT NULL; Postgres rolled back the attempted transaction. Recovery used existing project `rera_source_url`/developer source; second execution succeeded exactly **12/12 audited and 12/12 changed**. No partially written data from the failed attempt.

## 4. Marathon Nirvana Collection overview — neutral, project-specific copy

`marathon-nexzone-nirvana-collection-panvel`: buyer-facing overview formerly said "this Way2Paisa listing covers only..." which exposed unnecessary internal editorial framing. Reworded to neutral reference to separately registered Wings A and B **PM1273032502296 / PM1273032502304**, four marketed developer towers, and collection-wide prices not equal to individually allocated flat offers. Promoter `https://marathon.in/nexzone/` / official construction updates are source. One new source record `nirvana_public_overview_remove_self_reference_20261114` preserves original copy. All RERA, price, floor plans, active stock, media and project status untouched.

## 5. Godrej Bliss channel-partner imagery compliance source

After previous cycle cleared the only known unauthorized public hero pointer at `bliss-godrej-properties-kandivali-east`, researched a publicly accessible **third-party-hosted copy** of *Godrej Properties Channel Partner Brand Guidelines*, URL `https://propjourneyservices.com/wp-content/uploads/2024/06/Godrej-CHANNEL-PARTNER-BRAND-GUIDELINES.pdf`. PDF extracted text specifically says company brand images, project photos, renders and logos require written approval from an authorized Godrej Properties employee; broader partner webpages require appropriate promotional approvals. Source publisher **not Godrej official**, document **current version/applicability to Way2Paisa's actual CP agreement NOT VERIFIED**. PDF screenshot fetch failed due cache miss, so do not claim visual PDF certification, contractual applicability, lack of user approval, or unlawfulness for other existing sites. One dated `public.project_sources` compliance note `godrej_cp_public_brand_guideline_written_approval_20261114` saved, referencing earlier media hold. No other Godrej media removed/activated, no emails sent.

## 6. Draft GoDaddy-safe frontend code defence

Updated existing **draft PR #22** `https://github.com/way2paisaindia/way2paisa-public/pull/22`, branch `fix/commercial-marketed-area-and-neutral-configurations-20261114`, commit **77c2caa485661701439a4bca7181b2b84137a356**, one file `app/projects/[slug]/page.js`. In `publicLocationDescription(p)`, added small, pattern-specific protection to truncate dated internal `27-Oct-2026 maps QA` / `14 Nov 2026: removed disproven` notes before public display, returning the readable first location paragraph; if the text begins with technical notes it falls back to official public address. Four targeted JavaScript behavior cases passed: legacy Delta cached copy, newly cleaned Delta copy, normal property address and a note-only copy. This is **defence in depth** for old cached records and future imports.

**DRAFT only — NOT merged or deployed.** Existing PRs #17 plotted land status and #20 mixed villa/plot area remain held. Do not deploy GitHub main to GoDaddy before reconciling premium authenticated production source. The earlier Netlify preview is login-protected and known to have separate image cache problems, not approved for use as production.

## 7. Live production / cache verification — transparent

Final SQL verified:
- Published **682** projects: Mumbai **367**, MMR **119**, Dubai **196**.
- Active Mumbai/MMR inventory **1,731**, exactly **495** `Confirm Availability`, **0** unqualified `Available`.
- Published Mumbai/MMR enrichment gap flags **14**, including 13 missing appropriate project hero/gallery, nine missing exact configuration inventory, eight missing verified numeric GPS. Counts overlap.
- Active site recommendation links **2,182** covering **467/486** Mumbai/MMR published pages, unchanged this cycle.
- Two source-backed promotional starting prices **actually changed in DB**: Galaxy ₹58L→₹62L and Celebration Land ₹81.99L→₹83.99L; one active inventory row each. Distinguish from previous cycles where no prices changed. These price changes are justified by refreshed official sources and archived.
- 12 `possession_original` strings separated while numeric registered dates unchanged; one Nirvana public description revised; one Godrej rights-reference source saved. 16 project_sources notes/records (12+2+1+1).
- No new public projects, no unpublishing, no media activations.

**LIVE cache caveat:** The independent fetch of `https://www.way2paisa.in/projects/galaxy-heights-tower-ii` still displays older ₹58 lakh, old Way2Paisa-internal overview and WRONG `RERA Tower II December 2028` (while DB now has ₹62 and RERA Dec2029/Target Dec2028). Likewise live `/projects/celebration-land-neral` still ₹81.99L, and live Nirvana page still previous self-referential description, immediately after DB updates. Do **NOT** claim these three changes are publicly propagated until readback passes. The prior location-cleanup issue at `/projects/delta-meadows-delta-group-andheri-west` **has** propagated and now displays clean address without technical maps QA log on live both fetch and SQL.

The GoDaddy/Next.js HTML + Supabase fetch caching uses revalidate ~300 seconds in GitHub source; actual deployed GoDaddy Airo runtime may diverge or have additional persistent cache. No forced app restart/publish, cache flush or side-effecting admin actions attempted. Future safe authentication-based cache source check required if changes do not propagate. Do not use unrelated Netlify/Vercel hosting.
