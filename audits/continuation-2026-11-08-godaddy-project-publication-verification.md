# Way2Paisa — 8 Nov 2026: Publication continuation after owner-reported GoDaddy migration

## Current state read from production-connected Supabase
- Database project: Way2Paisa Realty (project ref deliberately omitted from public audit).
- 1,842 project records; 681 published (`active=true, verified=true, enrichment_status='complete'`); 1,161 private.
- 2,412 active inventory rows; 3,173 active project-media rows. Baseline unchanged from 6 Nov.
- Of the 1,161 private projects: 204 have *archived* inventory rows; 71 have at least three media rows; 70 have both historical positive-price inventory and at least three media rows, but **zero** have active sale inventory.
- All examined near-publication records carry explicit quality/legal/media/stock holds. Historical prices or media counts are not evidence of current bookable inventory or a commercial photo licence.
- **New projects activated: 0**. Do not relax the existing verification guard, reactivate old stock or mark records complete to force a count increase.

## Evidence added to internal `public.project_sources` (four new records)

1. `h-rishabraj-trident` — official [developer page](https://www.hrishabraj.com/projects/trident) verifies Juhu Plot 22, RERA P51800053505, and **3 and 4 BHK**. The page does not provide promoter-numbered currently available flats or a promoter cost sheet. Archived older 2 BHK broker price is not the active developer product. Hold intact.
2. `navkar-palace-andheri-west` — official [Palace page](https://navkar.co/navkar-palace/) verifies ongoing PR1180002500275 and 2/3/4 BHK. However the page includes a **Navkar Residency B Wing** gallery section. Do not use those as Palace photos. Brochure/cost sheet/current primary stock and a genuinely distinct Palace gallery image remain unresolved. Hold intact.
3. `chandiwala-pearl-icon-malad-east` — official [corporate compliance disclosures](https://chandiwalacorp.com/compliance.html) identify Bahist Enterprises Pvt Ltd as the Pathanwadi Malad East SRA proponent; separate [corporate portfolio](https://chandiwalacorp.com/about.html) lists Pearl Icon. This does not confirm that archived Housiey unit prices represent currently allotted sale inventory, nor grant image rights from an outside marketing-partner microsite. Hold intact.
4. `emaar-urbana-iii-emaar-south` — official [Emaar Asset Usage Policy](https://www.emaar.com/en/emaar-asset-usage-policy) requires prior approval for advertising use of Emaar Assets visuals including iconic buildings; the policy is **not** a blanket ruling on all project photos. Officially accessible developer CMS image URLs do not themselves establish Way2Paisa commercial image-reuse rights. Urbana III also lacks a correctly surveyed building pin and independently verified, distinct project gallery assets. Hold intact.

## Publishing and hosting safeguards
- The owner reports that `www.way2paisa.in` has moved to GoDaddy since the previous Vercel/Cloudflare audit. No DNS or GoDaddy changes attempted.
- Neither GoDaddy deployment wiring nor any static-snapshot rebuild behavior could be independently certified in this continuation. **Do not describe a Supabase row update as visible on the GoDaddy website without independently verifying the public canonical page and sitemap.**
- Previous Cloudflare migration branch deliberately untouched. No GitHub source/code changes to the current production branch were made. This audit is committed only on a dedicated nondeployment branch.
- No email, paid upgrade, purchase, DNS change, developer outreach, existing public project price change, active inventory change or active listing publication during this continuation.

## Next safe publication gates
- Obtain independently evidenced, current promoter unit/plot allocation + exact registered carpet/plot area + final dated price/fee quote and legal seller/promoter status, not just broker advertised historical price.
- Use only project-specific authentic media with credible advertising-use authorization; validate hero and distinct gallery and exact location.
- Verify individual candidates against existing published RERA/slug canonical identities to avoid duplicate/umbrella listings.
- Before any future production publication after GoDaddy migration, confirm whether the site dynamically reads Supabase or requires an explicit rebuild/reupload, then verify canonical URL, project listing count, sitemap, and client navigation after changes.
