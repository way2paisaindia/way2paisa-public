# Way2Paisa — 14 Nov 2026: live sitemap parity, honest commercial marketed sizes and Godrej Bliss image-rights metadata

## Work completed and checked

1. **LIVE SITEMAP EXACT PARITY (SEO Step 4):**
   - Read-only live `https://www.way2paisa.in/sitemap.xml`, downloaded as page text with live links, **44,305 text characters**.
   - Queried all Supabase `public.projects WHERE active=true` and extracted exact project slugs.
   - **682 active Supabase project slugs**: Mumbai **367**, MMR **119**, Dubai **196**.
   - **682 sitemap project URL occurrences, 682 unique slugs**; set difference = **zero active slugs missing** and **zero unexpected/private slugs added**. No duplicate URLs in this source list.
   - This verifies **site sitemap coverage only**, *not* Google Search Console indexing/crawl success. Do not claim Google indexed all 682 URLs. Historical 127 excluded project URLs require a current Search Console export before claiming progress.

2. **DRAFT CODE-ONLY PR #22** [https://github.com/way2paisaindia/way2paisa-public/pull/22](https://github.com/way2paisaindia/way2paisa-public/pull/22):
   - Real live issue at `/projects/lodha-signet-vikhroli-offices`: customer inventory shows `Office | Carpet Area: On request | ₹1.90Cr` although `public.inventory.configuration='Office — 485 sq.ft marketed area'`. It hides actual developer-marketed size because `publicConfigurationLabel` drops suffix and the verified **RERA carpet is correctly NULL**.
   - Main checkout `app/projects/[slug]/page.js` patched on branch `fix/commercial-marketed-area-and-neutral-configurations-20261114`, commit `7e8e7994a1ebfc8de528386e4ac5d6f2fd856559`.
   - Added conditional `publicInventoryConfigurationLabel(item,project)` that **only** for `category='commercial_office'` and absent RERA carpet reads a strict existing configuration string `Office — 485 sq.ft marketed area` or `Doctors Enclave — 300–622 sq.ft marketed area`, showing the **marketed** area explicitly in the configuration while the separate Carpet Area column remains `On request`. Does not substitute developer-marketed sizes into `inventory.carpet_area_sqft` or `built_up_area_sqft`.
   - Neutralized misleading entire-table kicker `AVAILABLE CONFIGURATIONS` to `CONFIGURATIONS & PRICING`. This is necessary since all 1,731 live Mumbai/MMR inventory records were reaudited by previous cycles and none is marked `Available` on stale evidence; 495 explicitly say `Confirm Availability`.
   - Actual affected data review: **12 active commercial-office inventory rows over four projects** have exactly this class of unshown marketed sizes: Lodha Signet Matunga **4**, Kalyan–Shil **3**, Vikhroli **3**, Thane Kolshet **2**. Confirmed row strings already contain sizes and price; no DB update needed.
   - Pure project price and apartment/villa/Dubai labels remain on old helper. Four direct source-level sample regressions passed (office 485, doctors 300–622, commercial with actual verified carpet, normal apartment 3BHK).
   - GitHub compare: **one file changed** (`app/projects/[slug]/page.js`), one commit ahead of main, no unrelated changes. PR is **DRAFT, UNMERGED, UNDEPLOYED**.
   - Commit combined status: **Netlify deploy preview success** and **Vercel failure (account deployment blocked by previous account limits)**. The preview `https://deploy-preview-22--zingy-sundae-9078f5.netlify.app/projects/lodha-signet-vikhroli-offices` returned **HTTP 401 login**, so screenshot/visual check, main CI regression suite and GoDaddy integration **NOT CERTIFIED**. Netlify image-cache contamination observed in prior hosting trial is an additional reason not to promote that preview. This is NOT a Netlify migration. No sign-in/payment requested.
   - **DO NOT DEPLOY** a GitHub checkout blindly over premium GoDaddy/Airo runtime. User requires premium website, correct project photos, admin/CRM, WhatsApp and enquiry delivery preserved. Combine only in a controlled test with prior separate draft PR [#17 plotted-land status](https://github.com/way2paisaindia/way2paisa-public/pull/17) and [#20 villa/plot mixed area](https://github.com/way2paisaindia/way2paisa-public/pull/20) after inspecting actual GoDaddy source. Those PRs likewise unmerged/undeployed.

3. **GODREJ BLISS MEDIA COPYRIGHT PROVENANCE**:
   - The published `bliss-godrej-properties-kandivali-east` has four **distinct** inactive direct developer-hosted gallery records from `https://www.godrejproperties.com/mumbai/residential/godrej-bliss`. Previously `project_media.license_status='official_developer_marketing_asset'` is ambiguous and might be read as permission to redistribute.
   - Set these **four inactive rows** to `first_party_hosted_candidate_commercial_reuse_grant_and_browser_delivery_pending` with safe preflight exactly four matched rows, no activating, no URL change, no third-party images and no fake licence claim.
   - One dated `public.project_sources` note `godrej_bliss_developer_source_not_reuse_grant_20261114` records exact original URLs and IDs. Final SQL **4/4 metadata changed, 0 active**, four distinct official-source images preserved for later marketing-rights/visual/render check.
   - Live Godrej Bliss still shows honest **Request project photographs** fallback and no active gallery. Do not claim media gap resolved, copyright grant acquired, or image display certified. All 13 media completeness issues persist.

4. **SCREENING AND VERIFIED NO-CHANGE GATES:**
   - All 13 published Mumbai/MMR `public.project_enrichment_gaps()` unresolved: **3** lack only approved hero/gallery; **9** lack exact configuration inventory; **7** lack verified precise GPS; categories overlap. This is not 3+9+7 distinct projects.
   - Investigated official and registration-derived Lodha Signet/Vikhroli/Kolshet/Casa Olivia maps. Found **risky, contradictory geolocation on 3rd-party pages** including MPE Vikhroli Signet page at `0,0`, and unrelated location snippets, no phase-matched official RERA precise coordinates suitable for controlled write. **No speculative GPS**.
   - Investigated near-publication `The Sands`, `Navkar Palace`, `Buildarch Sakura`, `NVK Palmera` and `H Rishabraj Trident`. First-party The Sands marks starting **₹9.25Cr++**, but no specifically allocated villa, certified legal carpet or final cost sheet. Navkar partner inventory price versus specific statutory booking not established and some photos belong to Navkar Residency B Wing. Sakura filed unsold/reckoner prices are **not** promoter asking prices. Palmera developer starting ₹15Cr+ is not tied to specific flat; The Sands 6 unsold statutory registration count isn't buyer-bookable stock. All remain private; no activation, no copy of copyrighted images.
   - Public live pages Godrej Bliss, Marathon Zaver Arcade, Lodha Signet Vikhroli, Mahindra Meridian still show appropriately cautious image/photo and availability; *known UI issues* `AVAILABLE CONFIGURATIONS`, Signet marketed area hidden and Mahindra Meridian plot-size "On request" require the appropriate **draft** fixes. No GoDaddy deployment attempted.
   - Final published catalogue **682** (367 Mumbai /119 MMR /196 Dubai); **1,731 active Mumbai/MMR inventory**, **0** unqualified Available, **495** Confirm Availability; other existing statuses 1,236.

## Next priority

- Request/get **verifiable written developer commercial-reuse rights** from existing partner relationships when allowed by user; **no emails/contact made here**. Use exact project and image source, check browser delivery and subject before activation of any of 13 missing galleries.
- Obtain exact current promoter-sale flat or numbered plot, carpet and all-in quotation for private near-ready projects; 0 new public activations this cycle rather than inventing available stock. Do not blindly reassign separate MahaRERA phases.
- Reconcile and test actual GoDaddy premium source, then release all three safe UI fixes together with project photo cache identity regression and CRM/enquiry production tests.
- Obtain a current Google Search Console indexing export for comparison against 127 historically excluded URLs; sitemap presence does not mean indexed.

**No emails, no customer enquiries, no live deployment, no hosting switch, no price/inventory changes, no new project published, no project unpublished, no media accidentally activated.**
