# Way2Paisa — Mumbai/MMR: remaining available-status audit and Haware registered launch pipeline

**13 November 2026 (IST). No hosting redeploy, email request, lead submission, price mutation or public project activation.**

## 1. Verified cycle results

- **Active published projects unchanged = 682** (Mumbai 367, MMR 119, Dubai 196); **Mumbai/MMR active inventory unchanged = 1,731**.
- Additional stale availability claims corrected this cycle: **127 active inventory rows spanning 58 distinct published Mumbai/MMR projects**. No row was deactivated. All preserved its original `price`, `carpet_area_sqft`, `plot_area_sqft`, `configuration`, `source_type`, `source_name`, `source_url`, `last_verified`. Only `availability` wording changed from `Available` to `Confirm Availability` and `updated_at` advanced.
- **58 per-project source records** preserve original inventory IDs, dated source URLs, prior verification timestamps, price/configuration and source attribution.
  - **85 records / 40 projects** had explicit dated real estate portal, JLL, or partner source URL/name, >14 days stale. Source-audit field `stale_marketplace_available_not_confirmed_20261113`.
  - **42 records / 18 projects** had generic `Project current inventory`, `current_project_pricing`, `current_new_launch_inventory`, or `current_commercial_inventory` source types, each >14 days old with **zero named flat/office/plot allotment identifiers**. Source-audit field `old_project_level_inventory_unverified_availability_20261113`.
- End-of-cycle active inventory database labels: **412 `Confirm Availability`**, **83 `Available`**. The other 1,236 active records use other descriptions/status text or empty labels; do not misinterpret the 412 and 83 as the entire inventory. Previous-cycle 264 + 21 normalisations are also reflected in the 412.
- **Zero** still-`Available` rows satisfy either of the two exact now-resolved stale-source predicates. Remaining 83 are predominantly developer/authorized-attributed sources, with no fresh named-unit confirmation in the current session; **they were not blanket modified or claimed reverified**.

## 2. Read-only current first-party source checks, no unwarranted price edits

Current first-party rendered pages checked during continuation:
- https://www.lodhagroup.com/projects/residential-property-in-dombivli/lodha-villa-imperio-palava/price — Ultimate 350 sq yd from ₹2.82Cr; Supreme 450 sq yd from ₹4.53Cr; Presidential 600 sq yd on request. Developer **expressly excludes additional development charges and government levies**.
- https://www.lodhagroup.com/projects/residential-property-in-mumbai/lodha-villa-cerro-khopoli/price — Ultimate 350 sq yd ₹2.50Cr+, Supreme 450 sq yd ₹3.48Cr+, Presidential on request; extra charges excluded.
- https://www.godrejproperties.com/mumbai/plotted/godrej-country-estate — land plot general project headline from ₹79.99 lakh. No named current 2,000 sq.ft numbered plot price/allotment established.
- https://marathon.in/neohomes/neopark/ — Marathon NeoPark general 1BHK starting ₹68.24L; Studio marketed Sold Out; previous 328sqft ₹68.24L / 355sqft ₹73.25L mapping is old but no current named flat-to-price pairing.
- https://www.lodhagroup.com/projects/residential-property-in-worli/lodha-trump-tower/price — search/navigation in page displays **Lodha Park** 9.48Cr+; this is NOT a clear Trump Tower 3BHK/4BHK unit price and must **not** replace stored Trump Tower 9.95Cr / 11.65Cr with broad umbrella price.
- Mahindra Lifespaces taxonomy page timeout; no data refreshed on that failed query.

Added five dated audit source rows for the relevant existing published projects, preserving old quotation dates. No price changes, no false unit availability, no `last_verified=now` mutation. Official headline price is not a booked/available unit.

## 3. Newly discovered registered project — PRIVATE Haware One & Only Crown, Bandra East

New `public.projects` row `haware-one-only-crown-bandra-east`, RERA **PR1180002602298**, registered **14 October 2026**, original completion **31 December 2031**. Registered project identity **One & Only Crown by Haware Properties**, legal promoter **Haware Housing**. Registered site reference Building No.34 (part), CTS607(part), Kher Nagar, Bandra East, Maharashtra 400051. Approx 1,400.57sq.m statutory land. RERA-published parcel point **19.07487, 72.86569**, not buyer entrance. Sources:
- https://deedo.in/mumbai-suburban/bandra-kurla/one-only-crown-by-haware-properties/
- https://cityair.in/mumbai-suburban-real-estate-projects.html
- https://propx8.com/builders/haware
- https://www.squareyards.com/haware-one-and-only-crown-bandra-east-mumbai-npd-346814

**Critical marketing conflict:** independent new 12Nov article https://estateherald.com/mumbai-pune/haware-properties-markets-kherwadi-project-in-bandra-east-from-rs-375/ markets `Haware Kherwadi` from ₹2.14Cr (2BHK 714–740sqft) and ₹2.84Cr (3BHK 947–1054sqft) but claims **MahaRERA is still pending**. A partner microsite https://hawarekherwadi-bandra.in/ displays **the actual Crown RERA number PR1180002602298** but incorrectly calls its developer **Trust Developer**. RERA-linked One & Only Crown portals instead quote 2BHK 685sqft from ₹3.11–3.12Cr, 3BHK 947–975sqft from ₹4.20–4.43Cr. No project-scoped original first-party Haware written price sheet, matching saleable flat numbers or marketing-photo rights. Use **registered canonical identity**, NOT unfounded Haware Kherwadi alias, not Trust Developer and not lowest of conflicting marketing prices. **PRIVATE**: active=false verified=false min_price=NULL 0 active inventory/media.

## 4. Newly discovered registered project — PRIVATE Haware Intelligentia Prime, Borivali East

New `public.projects` row `haware-intelligentia-prime-borivali-east`, RERA **PR1180002602285**, also registered **14 October 2026**, original completion **31 December 2031**, legal promoter **Haware Properties Landmarks** partnership and marketing brand Haware Properties. Registered Building No.15, CTS207A, Survey34 Hissa5, Magathane Borivali East Mumbai 400066; RERA source parcel point **19.21347,72.82596**, not verified entrance.
- https://deedo.in/mumbai-suburban/magathane/intelligentia-prime-by-haware-properties/
- https://askrera.com/projects/intelligentia-prime-by-haware-properties-pr1180002602285/
- https://quietlist.in/mumbai/intelligentia-prime-by-haware-properties
- https://housiey.com/projects/haware-intelligentia-prime
- https://propx8.com/builders/haware
- https://gethorizon.in/projects/intelligentia-prime-by-haware-properties-magathane-borivali-uz8k08s3

RERA-file derivative **87 residential premises** (Wings A 46/B41), including **29 rehabilitation allocation**, and another 58-home inventory file with government **ready-reckoner values NOT developer asking prices**. AskRERA reports encumbrance entry; obtain original charge/NOC/title source before booking. Housiey markets 2BHK 761sqft ₹2.35Cr all-in and 791sqft ₹2.45Cr; PropX8 markets 3BHK946sqft ₹2.92Cr; neither establishes currently saleable named promoter flat and written all-inclusive quote. This is **NOT Haware Intelligentia Axis P51800031976**; do not merge RERA records or photos. **PRIVATE**: active=false verified=false min_price=NULL 0 active inventory/media.

## 5. Developer and 18 provenance records

New developer profile **Haware Properties** `https://www.haware.in/`, no unlicensed logo assigned; developer brand linked to both private new projects. Its corporate site does not provide either project's direct priced unit sales list. Do not mix Haware Properties brand with Haware Engineers & Builders site `haware.com` or substitute unrelated Haware legal promoter.

**18 dated `project_sources` records** created across **7 projects**: 7 for One & Only Crown, 6 for Intelligentia Prime, plus 5 first-party price cross-checks for current listed projects as above.

## 6. Production and database verification

Post-write SQL:
- 682 published projects (367/119/196)
- 1,731 active Mumbai/MMR inventory records
- 412 neutral `Confirm Availability`, 83 still `Available`.
- 0 stale marketplace available records and 0 generic unverified project-level source records still `Available` matching this cycle's predicates
- 58 dated provenance records across **58 distinct** projects
- 2 new private Haware projects with their distinct registrations, min_price=NULL, zero live inventory/media; original possession Dec2031 and correct Haware Properties developer mapping.
- The **13 existing published Mumbai/MMR enrichment flags** remain, **9** with configuration-level missing inventory.
- Live Way2Paisa `/projects/haware-one-only-crown-bandra-east` and `/projects/haware-intelligentia-prime-borivali-east` each **HTTP 404**, absent from production sitemap. Appropriate for private staging.
- Read-only customer page tests: Ventara Heights Malad East, Piramal Revanta Rayansh Tower6 display `Confirm Availability` and unchanged prices/carpet areas. Existing Next.js frontend normalization could have displayed Confirm even prior to DB update; claim only no visible regression, not instant propagation proof.

## 7. Publishing gates and next action

**New live projects published this cycle: zero.** This is intentional: no verified current legal promoter-issued unit allocation and all-in cost sheet plus rights-cleared project gallery has been established for the newly discovered projects. We will not fabricate numeric prices or re-use unlicensed vendor imagery. Continue priority Mumbai/MMR publication and evidence retrieval.

Remaining buyer-facing technical issue: draft **GitHub PR #17** for plotted-land category status labels remains unmerged and undeployed because live GoDaddy/Airo premium source may differ from repository `main`; no blind production deployment.

No emails, developer/lead requests, credit-card spend, Vercel/Cloudflare migration, unpublishing, or GoDaddy admin changes.
