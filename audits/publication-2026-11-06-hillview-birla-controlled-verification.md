# Way2Paisa — 6 Nov 2026: regulated plotted-project activation & verified guard audit

## Database and publication totals

| Measure | Before | After | Difference |
|---|---:|---:|---:|
| Active, verified, fully enriched published projects | 679 | **681** | +2 |
| Active inventory | 2,409 | **2,412** | +3 |
| Active media | 3,173 | **3,173** | 0 |
| Private/unpublished project records | 1,161 | **1,159** | −2 |

Activated **two existing independently researched private records**, rather than creating new duplicate projects. Each has **0** pending items from the *database's currently enforced* `public.project_enrichment_gaps(project_id)` function, passing the `trg_enforce_project_verification_completeness` trigger. Images and coordinates were already in the private source records; no images were newly copied or licensed by this audit. Only the two specific private projects, **three newly active configuration-price entries**, and their field-level provenance were changed. Existing published project prices, inventory, media and statuses were not modified. No emails or developer requests were sent.

### 1. Godrej Hillview Estate — Khalapur plots

- Canonical: https://www.way2paisa.in/projects/godrej-hillview-estate-khalapur
- Existing project UUID `a4408694-9731-4f4f-9a2b-9fa07c87a107`, RERA **P52000055348**, Godrej Properties, Khalapur near Khopoli/Imagicaa.
- First-party Godrej current `/overview`: https://www.godrejproperties.com/mumbai/plotted/godrej-hillview-estate/overview advertises plots from **₹54 lakh**. A separate developer campaign previously advertised **₹1.19 crore** starting, so offers and stock cannot be regarded identical.
- Housing.com's **1,200 sq.ft residential plot type advertised at ₹54.4 lakh**: https://housing.com/in/buy/projects/page/318434-godrej-hillview-estate-by-godrej-properties-ltd-in-khanav . House/plot price is marketplace indicative, **not a confirmed numbered available registered plot**. One new active inventory row: `plot_area_sqft=1200`, `price=0.544` INR crore, `carpet_area_sqft=NULL`, availability explicitly says partner-advertised/current developer confirmation required.
- Five pre-existing **inactive** legacy Housing.com rows 2,798–3,228 sq.ft with ₹1.27–1.46 crore are not independently tied to current promoter inventory; they were **left inactive**. Five new provenance source records note differences and legal diligence.
- Registered completion target **March 2027** and “Completed” lifecycle reported in one RERA mirror, but handover of individual plots, NA/layout infrastructure and land rights are not certified. RERA Genie https://reragenie.com/p/godrej-hillview-estate-golewadi-9ymve1vy/ records two MahaRERA complaints at latest read; do not state litigation disposition or guaranteed readiness.
- Existing original developer-sourced 1 hero + 5 gallery images and RERA-linked map pin used. No new files copied. Images are representational/source credited; independent browser quality and legal image-use review still pending.
- The quality function returned `[]` after the active row and before activation. Verification trigger accepted UPDATE to `active=true, verified=true, enrichment_status='complete'`. Public page returned **HTTP 200**, SEO title `Godrej Hillview Estate Khalapur | Plots From ₹54.4 Lakh`, correct RERA and price, existing first-party imagery references.

### 2. Birla Mrida — Boisar/Palghar plots

- Canonical: https://www.way2paisa.in/projects/birla-mrida-boisar-palghar
- Existing private project UUID `1525826f-3fc9-4bc9-96f6-26ec943c2997`, MahaRERA **PP1240002502953**, statutory promoter **Birla Estates Private Limited**.
- Verified official Birla Estates origin: https://www.birlaestates.com/birla-mrida-boisar/ — project spread across 68 acres, 539 plotted parcels, developer-advertised total plot types **1,200–9,000 sq.ft**, clubhouse/gardens; there is **no developer-public numbered plot price sheet or quote for currently available specific plot**.
- Independent Square Yards current project price page https://www.squareyards.com/birla-mrida-padghe-palghar-npd-343842 specifically maps marketed **1,200 sq.ft ₹56.39 lakh + charges** and **1,500 sq.ft ₹70.48 lakh + charges**. Two new active partner-indicative inventory `plot_area_sqft` rows (`price=0.5639` and `0.7048`, Indian crore units), `carpet_area_sqft=NULL`, source URL and last verification now. **Neither is a numbered, currently available, promoter-signed sale allocation.**
- Existing Housiey 1,200 sq.ft ₹58.51 lakh **all-inclusive** differs from Square Yards **plus charges**; earlier Housiey 9,000 sq.ft ₹4.38 Cr and a legacy 3,400 sq.ft Pearl offer lack source-verified current sellable stock. All 3 previously inactive rows **remain inactive**. Seven new `project_sources` records capture pricing and statutory differences; customer overview explicitly states partner-marketplace basis.
- RERA-derived source https://reragenie.com/p/birla-mrida-betegaon-padghe-boisar-sgukzkoh/ gives completion **31 March 2029**, promoter Birla Estates Private Limited, 539 plots, 102 historically booked (June/July 2026 filing); **historical counts do not prove today's plot allocation**. Zero filed complaints and litigation and no declared mortgage as of that snapshot, but legal title, NA/layout, current development stage and allotment require independent due diligence. 2026 RERA Inspector https://www.rerainspector.com/projects/63702/PP1240002502953 says some full-height permissions remain pending; it is a *plotted* project and requires relevant municipal documentation.
- Existing original Birla-owned 1 hero and 3 gallery assets (the developer describes imagery as for representation) retained, not newly downloaded. Registered land-project geo pin already recorded. No unaffiliated Birla microsite used for price.
- **0 quality gaps** before activation; trigger accepted true verification. Canonical public page returned **HTTP 200** with project name, RERA, ₹56.39 lakh offer, linked representative media and SEO title `Birla Mrida Boisar | Residential Plots From ₹56.39 Lakh`.

### Failed Godrej Nexspace update — a positive safety check

- Existing private `godrej-city-nexspace-panvel`, MahaRERA **PC1270002501723**, official Godrej advertises commercial office starting **₹85 lakh**, but price is not allocated to a specific sized registered office and there are **no verified image assets** or exact project coordinates. Statutory derivative additionally reports an **Axis Bank ₹265 crore land charge**, conflicting with a CERSAI filing, and completion date revised to April 2033 vs promoter's old marketing date.
- An attempted guarded project verification failed atomically with PostgreSQL **23514** from `trg_enforce_project_verification_completeness`: missing exact configuration inventory, address/maps, geographic coordinates, genuine hero and genuine gallery. **No data were written by that failed SQL transaction**. No bypass was made, and Nexspace remains private, active=false/verified=false. No user-facing claim of published Nexspace.
- Exact SQL validation: `public.project_enrichment_gaps(project_id)` checks registration sources, exact active price-area inventory, mapped project location, true lat/long, sourced developer identity/logo, one licensed/verified hero and 3 licensed/verified gallery images, verification timestamp and other required fields. Publication should never be forced with missing evidence.

### SEO/hosting & migration guard

- Two canonical pages verified HTTP 200 and project registration/SEO content; initial sitemap still used cached **680** URLs (Hillview present and Birla not yet there). **Revalidate the sitemap after expiration before claiming 681 URLs**, and do not equate a correct sitemap with Google actually indexing pages.
- New static Cloudflare migration branch `migration/cloudflare-free-static-first` now has **fail-closed minimum 681 published projects**, and a README baseline **681 published / 2412 active inventory / 3173 active media / 1159 private**.
- **No live Cloudflare Pages account/preview deployment** is connected. Keeping site architecture, original premium appearance, CRM/admin/Promotions, all dynamic forms and 681 working canonical pages intact requires a full staging test before GoDaddy DNS changes. Free hosting cost cannot be contractually promised forever; no paid plan was chosen or applied.
- The publication/audit commits only touch migration branch (not Vercel's live GitHub `main`), avoiding unnecessary Vercel CPU-consuming new builds after the Hobby usage alert.
- Step 3 original project imagery and independent browser UX remain open. Step 4 remains on hold. No emails, developer requests, unauthorized imagery substitutions or DNS/domain/hosting changes.

## Final public sitemap & migration checks — after cache refresh

- Canonical `https://www.way2paisa.in/sitemap.xml` returned **HTTP 200, 681 published project URLs, 689 total URL entries**. It now includes both newly activated `godrej-hillview-estate-khalapur` and `birla-mrida-boisar-palghar`. This supersedes the immediate post-activation cached 680 URL result.
- Both new canonical project pages returned **HTTP 200** with correct RERA, SEO title, original source media and indicative partner-plot price display. A website-side 200 status does NOT confirm that Google has indexed any new URL, available numbered inventory or that source URLs work in every visitor browser.
- Cloudflare free static exporter minimum 681-project check passed its isolated GitHub Actions fixture CI: https://github.com/way2paisaindia/way2paisa-public/actions/runs/42222055929 . Live user account Cloudflare preview/DNS migration is **not completed**.
- Read-only full-catalogue current verification gap audit found **667 projects with no open gap, 14 projects with at least one open gap** under the newer `project_enrichment_gaps` rules. Remediation catalogue: `audits/step3-existing-published-gaps-2026-11-06.md`. No existing project unpublishing, zero mislicensed image substitutions. One pre-existing Foresta RERA provenance label was added to clear its `maharera_numbers_and_source` gap, but its remaining media/location/status requirements remain open.
