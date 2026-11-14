# Way2Paisa — Mumbai/MMR continued source verification and new Ghatkopar launch pipeline

**Date:** 14 November 2026 (IST).  
**Scope:** published Mumbai/MMR inventory and brand/RERA identity reconciliation. **No GoDaddy deployment**.

## Verified results

- **Newly corrected stale availability labels:** **10** active inventory records across **6** published projects, `Available` → `Confirm Availability`. The corresponding six new dated `public.project_sources` provenance records preserve the original inventory UUIDs, category, exact prices, source URLs, source type, original `last_verified` dates and explanation.
- **Partner-source attribution clarified:** four of those 10 rows: Rustomjee 33 Fifteen 1, Shapoorji Pallonji The Minerva 3. Both campaign sources disclose authorised/channel-partner status rather than developer-direct proof; `inventory.source_type='authorised_channel_partner_price_overview'` and accurate partner `source_name`. Do not claim a signed promoter quote or specific still-available flat/office from those partner price matrices.
- **New private Mumbai research candidate:** **Emperia Legacy, Pant Nagar, Ghatkopar East**, MahaRERA **PR1180002600209**. Linked a newly created **Emperia Group** developer profile and existing Ghatkopar East location. Stored original RERA completion **31 December 2031**, statutory promoter **HHB Erectors And Developers LLP**, registration-derived project location and 1/2 BHK secondary product range. **Price on request**, zero active inventory, zero active gallery, `active=false`, `verified=false`, no speculative GPS point.
- **Six** separate dated `public.project_sources` records on Emperia Legacy cover the first-party Emperia portfolio, RERA registry, secondary RERA corroboration, Housiey pricing, Mumbai Property Exchange pricing and an out-of-date partner landing page. Total **12 new audit source records** this cycle.
- **Published projects still 682**, Mumbai 367, MMR 119, Dubai 196; active Mumbai/MMR inventory **1,731**. Among this inventory, exactly **31 rows** remain unqualified `Available` and **464** rows show neutral `Confirm Availability`; remaining rows have other prior statuses. Zero rows became inactive, no prices, areas, units, RERA IDs, published project statuses, source URLs, original inventory `last_verified` or media were changed.
- Published Mumbai/MMR enrichment gaps remain **13 projects**, **9** with exact-configuration inventory deficiencies, and **13** with missing approved hero/gallery evidence. No new project was publicly activated.

## 1. Source-audit table for 10 corrected inventory records

| Published slug | Corrected rows | Decision & evidence |
|---|---:|---|
| `celebration-land-neral` | 1 | First-party HOABL page `https://www.hoabl.com/projects/the-elements_foothills-of-matheran` HTML title still claims **₹81.99 lakh** for the identical **2,260 sq.ft** residential villa land, while the *current rendered page body and FAQ* repeat **₹83.99 lakh all-inclusive**. Separate first-party `https://www.hoabl.com/projects/celebration-land-neral` also renders ₹83.99 lakh. Original Way2Paisa ₹81.99 lakh kept in inventory; marked `Confirm Availability`, documented developer-controlled metadata/body price discrepancy. **PRICE NOT REVERIFIED AS A NAMED PLOT OR CHANGED**. Do not say a physical villa is ready: it is possession-ready *land* by developer description. |
| `33-fifteen-rustomjee-bandra-west` | 1 | `https://www.rustomjeesbandra.com/rustomjee-thirty-315/` declares itself an **authorised marketing-partner site**, with office **536–1,390 sq.ft from ₹4.53Cr**, not a signed developer allocation for a 536 sq.ft specific office. Source-type corrected to authorised partner. |
| `konark-vaayu-goregaon-west` | 3 | ₹89 lakh++, ₹1.44Cr++, ₹2.40Cr++ are **promotional EOI configuration offers** (1/2/3BHK) and should not imply bookable named flats or all-inclusive prices. The former quoted microsite `https://konarkvaayugoregaon.com/` did not resolve in current fetch; registered project MahaRERA **P51800080319**, first-party `https://konarkvaayu.co/` supports marketed layouts but not current numbered allotted promoter quotations. Old prices retained and source dates not falsely refreshed. |
| `marina-vista-the-wadhwa-goup-bandra-west-pali-hill` | 1 | `https://www.wadhwamarinasvista.com/` markets 4BHK from **₹32.50Cr** and an **₹18 lakh EOI amount**. EOI is not proof of identified 2,500 sq.ft legally contracted saleable flat or final inclusive price. Price unchanged and neutral availability. |
| `the-minerva-shapoorji-pallonji-mahalaxmi` | 3 | `https://minerva-mahalaxmi.southmumbai.co.in/` explicitly says not an official developer site, belongs to authorised channel partner and does not guarantee listed prices or availability. Existing prices **₹14.45/14.99/15.45Cr**, 2019/2058/2136 sq.ft, retained with CP attribution. |
| `ajmera-boulevard-malad-west` | 1 | `https://ajmera-boulevard.in/` RERA-agent campaign markets 1BHK485 sq.ft ₹1.42Cr; not an issued currently allocated flat cost sheet. Price retained, status neutral. |

### Important limitation

For Celebration Land, **buyer-visible ₹81.99 lakh is still the stored historical amount** while two first-party content bodies say ₹83.99 lakh. This discrepancy is prominently dated in Supabase source notes, but **not yet resolved in the live price**; do not treat ₹81.99 as a confirmed current quote. A written current developer plot-priced offer would decide the final amount. We do not send developer enquiries without user instruction.

Other independent current price examples reflect the same difference between promoter *project-level* advertising and specifically allocated sale units. The buyer-facing website may already normalise status to `Confirm Availability`; SQL read-back proves persisted status corrections while public checks only show no regression.

## 2. New PRIVATE Emperia Legacy, Ghatkopar East

- `emperia-legacy-ghatkopar-east`, market **Mumbai**, RERA **PR1180002600209**. Registered legal promoter **HHB Erectors And Developers LLP**; marketing brand **Emperia by Manjeri Group**. Never label the corporate brand as legal promoter without distinction. Linked existing `Ghatkopar East` locality and new `Emperia Group` developer profile; intentionally no logo/image usage rights asserted.
- First-party corporate portfolios `https://emperia.co.in/projects` and `https://www.emperia.co.in/residential-properties` show **Emperia Legacy, Pant Nagar** as upcoming but elsewhere refer to Emperia Legacy, Ghatkopar East as completed. They might be different sales phases or a stale tag; **do not merge those identities or claim this registered building is completed**.
- Independent RERA registry derivative `https://www.squareyards.com/emperia-legacy-ghatkopar-east-mumbai-npd-344960/rera/pr1180002600209` states original registered project completion **31 December 2031** and registered project land around **1,824.5 sq.m**. Its project overview says one building but lists Wing A/Wing B in filings. Horizon `https://gethorizon.in/projects/emperia-legacy-kirol-kurla-6csnj14v` identifies two buildings from indexing but automated direct reads are blocked. No asserted precise entrance coordinates or unit count.
- Current secondary `https://www.housiey.com/projects/emperia-legacy` describes 1/2 BHK and marketing range **₹1.36–1.95Cr all-inclusive**, while source-backed Mumbai Property Exchange market report `https://www.mumbaipropertyexchange.com/new-launch-projects-in-ghatkopar-under-2-crore` suggests **₹1.19–1.71Cr** indicative and **December 2029** completion. The registered RERA date **December 2031** takes priority, and both differing marketing price ranges are private notes only, not active sale quotations.
- A secondary lead-generation site `https://www.emperialegacy.site/` still says RERA **Coming Soon**, while the actual project was registered **PR1180002600209** in 2026. Do not use such stale material for statutory guarantees or copy project photographs.
- **Publication hold:** independently reconcile completed-vs-upcoming first-party brand label, registered building/wing exact scope, promoter-issued specific current saleable flat/floor number, legal carpet, inclusive price, current RERA/title and photos authorised for reuse. `min_price=NULL`; **no active inventory or media**. It must stay 404 and absent from live sitemap.

## 3. Final DB and live checks

- `public.projects WHERE active=true`: Mumbai **367**, MMR **119**, Dubai **196**.
- Mumbai/MMR active `public.inventory` **1,731**, `availability='Available'` **31**, `availability='Confirm Availability'` **464**.
- `project_enrichment_gaps()` across 486 active Mumbai/MMR: **13** incomplete, **9** inventory issues, other image gaps not bypassed.
- `Emperia Legacy` DB readback: private, RERA PR1180002600209, registered date Dec2031, `min_price=NULL`, 0 live inventory, 0 live media, six provenance records.
- Live read-only pages `/projects/celebration-land-neral`, `/projects/konark-vaayu-goregaon-west`, and `/projects/the-minerva-shapoorji-pallonji-mahalaxmi` still present original historic prices/areas with `Confirm Availability`. Live Emperia `/projects/emperia-legacy-ghatkopar-east` **HTTP 404**, absent from live XML sitemap, as intended.
- Supabase `https://supabase.com/changelog.md` reviewed; no schema changes or migrations conducted in this cycle.

## Unresolved known code-only changes

- Draft, **unmerged** [PR #17 plotted-land public status](https://github.com/way2paisaindia/way2paisa-public/pull/17).
- Draft, **unmerged** [PR #20 mixed plotted-land/villa area display](https://github.com/way2paisaindia/way2paisa-public/pull/20).
- Premium GoDaddy/Airo current runtime source diverges from GitHub checkout; neither PR deployed. Don't publish main blindly.

**New live projects this cycle: zero.** One source-backed private research candidate, 10 inventory statuses corrected, 12 provenance rows added, one developer brand profile. No developer or customer emails, no promotion posts, no payments, no hosting migration, no false price or image-rights claim.
