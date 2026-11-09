# Way2Paisa — 9 November 2026 additional autonomous continuation: Mulund site pins and strict publication gates

## Execution summary
- **Published projects:** 681 before and after; **new projects published:** 0.
- **Active inventory:** 2,412 rows before and after; **active project media:** 3,174 before and after.
- **Project geolocation gaps corrected:** 2 published Mumbai project records (Marathon Zaver Arcade and Sunset Gardens by Marathon).
- **New internal source-evidence records:** 7 — 4 corroborating pins, 1 Dosti Willow conflicting pin hold, 1 Emaar Albero named-unit ambiguity hold, and 1 Marathon Zaver Arcade RERA/OC timeline cross-check.
- No new photo/image rights asserted, no active inventory/prices/availability changed, no projects unpublished, no DNS/GoDaddy/Vercel/Cloudflare or email operations.
- Fresh public requests to `https://www.way2paisa.in/`, `/properties` and `/sitemap.xml` could not be independently completed using the available external fetch routes. Older cached search results showing zero listings are **not proof of current visitor status**. Do not claim website-side publication or sitemap freshness from Supabase-only verification.

## Published project coordinates corrected in Supabase

### Marathon Zaver Arcade, Mulund West — P51800020332

- Database project slug: `marathon-zaver-arcade-mulund-west`.
- Prior `latitude/longitude`: NULL/NULL; independent sources now reconcile the same Zaver Road building site.
- Selected project-site map position: **19.17216483255048, 72.95332252924311** from [Dwello project-specific directions](https://dwello.in/project/marathon-zaver-arcade-by-marathon-at-mulund_ceb9068d-e162-4439-8d0a-4db5ec0dfdba/directions).
- Independent same-project comparison: **19.1722673,72.9533105** from [Mumbai Property Exchange](https://www.mumbaipropertyexchange.com/project/marathon-zaver-arcade-mulund-west/28618), supporting the same site.
- [Marathon official project website](https://marathon.in/zaver-arcade/) confirms exact Zaver Arcade, Zaver Road, Vidya Vihar, Mulund West address, registered RERA P51800020332 and advertised OC received/2 BHK from ₹2.30 Cr.
- The updated Google Maps query now uses the selected project-site coordinates rather than a broad street-name search.
- `public.project_enrichment_gaps` before: `geographic_coordinates`, `genuine_project_hero`, `genuine_project_gallery`. After: **`genuine_project_hero`, `genuine_project_gallery`** only.
- OC/registered timeline cross-check: RERA-derived latest registered completion **31 Mar 2026**, original **30 Dec 2024** per [ReraGenie](https://reragenie.com/p/marathon-zaver-arcade-mulund-west-u4ryv9gx/). Existing data already matched; no date, status or stock modification.

### Sunset Gardens by Marathon, Mulund West — P51800047418

- Database slug: `sunset-gardens-by-marathon-mulund-west`.
- Prior site geolocation NULL/NULL. Selected RERA-derived project-specific pin: **19.176881459427130,72.947005680950940** from [SquareYards regulator-derived P51800047418 registration map](https://www.squareyards.com/mumbai-residential-property/marathon-sunset-gardens/192137/project/rera/p51800047418), including plot/survey 1032/A.
- Independent [Dwello Sunset Gardens directions](https://dwello.in/project/marathon-sunset-gardens-by-marathon-at-mulund_a8ed6df1-58c5-4cc6-871c-1e241365d1a9/directions) identifies **19.17689120274072,72.947118023476**, consistent with the same project site.
- Stored the regulator-derived pin, replaced broad location search URL with a coordinate-specific Google Maps link, retained existing site address and prices.
- `public.project_enrichment_gaps` before: `exact_configuration_inventory`, `geographic_coordinates`, `genuine_project_hero`, `genuine_project_gallery`. After: **`exact_configuration_inventory`, `genuine_project_hero`, `genuine_project_gallery`**.

## Explicit protected holds — no unsafe map or sale activation

- **Dosti Willow / West County Phase 7, P51700056278**: [SquareYards MahaRERA-derived map](https://www.squareyards.com/thane-residential-property/dosti-willow/251905/project/rera/p51700056278) identifies **19.210471255547766,72.9840325550781**, whereas [Dwello's Dosti Willow directory pin](https://dwello.in/project/dosti-willow-by-dosti-realty-limited-at-thane-west_3dc11257-2667-4c02-846c-9fcdc5b79097/directions) identifies **19.226293,72.994862**. The material disagreement likely involves site/phase/map attribution and cannot justify an exact tower pin. Project remains published with NULL coordinates, no guessed pin. Logged in `public.project_sources` as `20261109_willow_rera_versus_directory_geopoint_discrepancy`.
- **Emaar Albero / DC Albero-13-1308**: Emaar official [Arabic Dubai Creek Harbour sales catalogue](https://www.emaar.com/ar/property-for-sale/dubai-creek-harbour) displayed the named 3BR/1,848 sq.ft/AED4,196,888 unit with **Book Now** in an earlier production search snapshot; an Emaar staging search snapshot also displayed the same record, while [this third-party inventory listing](https://www.newlaunchproperties.ae/property/apartment-albero-by-emaar-at-green-gate-dubai-creek-harbour-availability) has **Sold Out** but explicitly notes last update **22 April 2025**. The third party is stale compared with Emaar's indexed listing, but live exact-unit Emaar Book Now access cannot be independently confirmed in this cycle, and the first-party production page can return different dated snapshots. Do not activate this unit or extrapolate from a project-wide count of 22/23 remaining. Logged discrepancy; **21 existing active Albero units remain unchanged**.
- **Private new project candidates:** Private inventory has no verified active stock; do not bypass strict completeness/usage-rights gates or reactivate sold-out, secondary resale or legally conflicting units merely for publication count.

## GoDaddy / release verification requirement
- The owner reports GoDaddy as the hosting destination. Existing GitHub `main` uses the Next.js server-side `loadPublicProjects()` Supabase read and 300-second revalidation, but current GoDaddy runtime/build configuration cannot be independently certified. Data-only updates may or may not propagate without rebuilding the actual GoDaddy site. No DNS, deployment, or hosting changes were made.
- Once an independent browser check is available, verify current `/properties` count, two corrected canonical project pages and exact map links, `/sitemap.xml` listing count, and a no-PII enquiry smoke test before claiming live parity.
- Follow-up priorities: complete current developer-issued bookable units, valid legal/phase identity, prices/inclusions, genuine project-specific licensed gallery and verified coordinates; then publish only on passing strict checker plus public GoDaddy validation.

## Source audit trail
Four geolocation corroborations and three non-geolocation provenance entries were written idempotently to `public.project_sources` with `20261109_` prefixes. No frontend code or deployment changed. This audit is committed to a non-deploying GitHub branch only.
