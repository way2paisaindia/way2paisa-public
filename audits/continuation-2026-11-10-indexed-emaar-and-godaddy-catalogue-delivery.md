# Way2Paisa — 10 November 2026: Emaar exact-unit provenance and GoDaddy public catalogue diagnosis

## Scope and verified production database outcome
- User authorizes autonomous work for Way2Paisa and confirms the current hosting destination is **GoDaddy**.
- No DNS, hosting, runtime environment, GoDaddy publishing, Cloudflare/Vercel migration or external email requests were performed.
- **681** published projects, **1,161** private projects, **2,413** active inventory records, **3,174** active media records on final connected Supabase audit.
- **0 new projects activated**, **0 new active inventory added** in this continuation. Existing project/unit prices, sale states and photos unchanged.
- The internal `public.project_enrichment_gaps` detector reported 14 published projects with gaps and **44** individual gap instances at final audit; previous turn reported 45, but this continuation made no project/media/stock changes that would explain a difference. Treat as independent current state, not an accomplished change here.
- Six new independently dated, source-matched project_sources provenance records saved, one per already-active Emaar exact named unit. Their existing source prices, stored area and active status were compared before recording. No blanket `last_verified` inventory timestamp was advanced based only on a crawler index.

## Confirmed source-matched Emaar exact units (all ALREADY active)
Current public developer search snippets (as of 10 Nov) show "Property Status Available" and "Book Now" on individual pages. Crawling dates vary from 2–6 days ago; an indexed available status is NOT a realtime reservation guarantee.

| Project | Unit | Developer price AED | Developer area sq.ft | Source |
|---|---|---:|---:|---|
| Albero at Dubai Creek Harbour, DLD 3609 | DC Albero-1-104 | 3,254,888 | 1453 | https://www.emaar.com/en/unit-details/DC%20Albero-1-104 |
| Albero | DC Albero-1-102 | 3,257,888 | 1454 | https://www.emaar.com/en/unit-details/DC%20Albero-1-102 |
| Albero | DC Albero-2-203 | 3,261,888 | 1453 | https://www.emaar.com/en/unit-details/DC%20Albero-2-203 |
| Albero | DC Albero-3-308 | 4,117,888 | 1848 | https://www.emaar.com/en/unit-details/DC%20Albero-3-308 |
| Grove Ridge at Emaar South, DLD 4200 | ES Grove Ridge T1-7-708 | 2,626,888 | 1283 | https://www.emaar.com/en/unit-details/ES%20Grove%20Ridge%20T1-7-708 |
| Golf Trails at Emaar South, DLD 4523 | ES Golf Trails-2-208 | 2,712,888 | 1606 | https://www.emaar.com/en/unit-details/ES%20Golf%20Trails-2-208 |

**Important unit semantics**: Dubai source area denotes Emaar developer property area, **not** Indian MahaRERA carpet. The source price is Emaar selling price incl. VAT; land registration and Oqood fees are extra on specific unit pages (e.g., Albero-1-104 AED 133,196 applicable fees and Golf Trails-2-208 AED 111,516 applicable fees). Reconfirm booking/fees with Emaar. Six idempotent internal `project_sources` rows were inserted with `20261110_individual_developer_unit_` identifiers, each requiring a matching preexisting active inventory row, exact price, exact area, official source_url, active published project and no existing record.

## Why the absence of new full-project publications is not solved by source refreshes
- Current private shortlist with zero/one remaining checklist issue includes Emaar Fior 1 (developer register interest / no current numbered bookable stock), Emaar Mareva 2 (unit saleability not confirmed, marketing-use permissions pending), Goodlife Karjat (plotted statutory registration vs advertised villas need legal mapping), The Sands Alibaug (specific villa cost/registered area/status not reconciled), and Binghatti Haven (developer stock sold-out/variant conflict). They remain private.
- Current Emaar Albero exact page DC Albero-P2-P204 (1BR 757 sq.ft AED 1,813,888) is missing from Way2Paisa but its indexed availability capture is **two months old**, much less recent than other existing units; no new active row was inserted without a timely direct current offer.
- Other newly discovered Emaar Albero direct units -1-104/-1-102/-2-203/-3-308 and Grove Ridge T1-7-708 all already exist at the identical price and size; avoid duplicate rows.
- Emaar Golf Trails developer community aggregate remaining count ~16 differs from 21 historical Way2Paisa active rows after prior-turn first-party insertion. A count difference does not identify the sold-out IDs. Reconfirm exact first-party bookability before deactivating or further adding individual rows; historical partner records should not be described as developer-guaranteed.

## Critical GoDaddy production website delivery risk — explicit warning, root cause still UNCONFIRMED
- Web search crawler cached `https://www.way2paisa.in/properties?market=Dubai` from **about three weeks ago** with "0 projects found" and "**TypeError: Failed to fetch**". Main homepage crawler also displayed zero project cards in all regions about three weeks ago. These cached copies are older than the latest GoDaddy work; do not assert that the site is presently down. Examples: https://www.way2paisa.in/properties?market=Dubai and https://www.way2paisa.in/.
- The connected public DB was proved in prior turn using `BEGIN READ ONLY; SET LOCAL ROLE anon` to return **681 projects** and **2413 inventory** after last addition. RLS/grants are not a total public database read-denial problem. Yet this does not verify that browser Supabase fetch actually succeeds from GoDaddy or that the deployed bundle contains correct secrets/env/build flags.
- GitHub main `app/lib/public-projects.js` invokes Supabase `createClient(url,key)` inside `loadPublicProjects()`, using **`NEXT_PUBLIC_SUPABASE_URL`** and **`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`**, and returns empty catalogue if those variables are missing or remote SELECTs fail (with `The property catalogue is temporarily unavailable` error object).
- GitHub main `app/page.js` and `app/properties/page.js` server-call `loadPublicProjects()` and use **`revalidate=300`**. The GitHub `package.json` expects real Next.js dynamic-capable build/run with `next build` and `next start`; `next.config.mjs` is not a static-export configuration. A GoDaddy basic static-file upload, a stale build rendered without env vars, or unsupported Node/ISR runtime could produce all-zero catalogue even though DB is public. Those are **plausible hypotheses, not verified root causes**.
- NEXT_PUBLIC variables are published client-side; use only Supabase publishable/anon key, **never service_role or private access tokens**. Verify actual GoDaddy deployment panel supports a persistent Node.js Next 15 server and proper SSR/ISR; do not assume GoDaddy Shared Linux/WordPress/static web hosting can run Next.js server-side App Router by uploading `.next` files.
- For production diagnosis, an interactive browser/deployment check should verify fresh `/properties?market=Dubai`, `/properties?market=Mumbai`, project canonical page and `/sitemap.xml`; capture network errors/status and server runtime logs; validate environment names and whether a new code push actually triggers GoDaddy deployment. No credentials were read or changed.

## Code patch staged before this cycle
- The previous dated possession-date ISO display fix resides on **non-deployed branch** `fix/possession-iso-fallback-2026-11-09`, not on production GoDaddy. It does not fix Supabase catalogue fetch failures. Do not imply it was deployed or that this cycle did so.

## Source and publication hygiene
- No emails, developer requests, paid hosting upgrades, DNS edits or unpermissioned photo ingestion.
- New project publication remains subject to fresh actual promoter unit booking/allocated price, registration/phase/legal completeness, unit sizes and approved project-specific images + validation check.
