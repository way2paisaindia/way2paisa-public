# Way2Paisa — Mumbai/MMR research and publication-gate audit
**Date: 10 November 2026**

## Purpose
As directed, focus on Mumbai/MMR buyer-first-sale opportunities, not Dubai/Emaar and not GoDaddy publishing. User wants substantially more **genuine live** residential and commercial projects, preferably 2–10Cr Mumbai and high-value Juhu/Bandra/Dadar, then MMR. Maintain all existing public prices, active inventories, premium consistent listing data, licensed genuine media, separate registered carpet and market area and valid MahaRERA project/phase identities. No developer emails/paid upgrade.

## This cycle: actual connected Supabase operations
- Created **TWO** missing, unique Mumbai/MMR Marathon Group township collection project rows as **private**: `active=false`, `verified=false`, with no fake active unit allocation, no photos scraped or uploaded, no map pin invented.
  1. **Marathon Nexworld — Aura, Elara, Nova & Flora**, `marathon-nexworld-dombivli-east`, `market=MMR`, 7 individually registered phases:
     - Aura 1 `P51700000652`, Aura 2 `P51700000507`, Aura 3 `P51700022847`;
     - Elara 1 `P51700000478`, Elara 2 `P51700000470`;
     - Nova `P51700032675`, Flora `P51700052461`.
     - All registrations directly reconciled across Marathon first-party status and its original official PDF; *no promise that any one currently advertised 1 BHK applies to a particular tower*.
     - Marathon developer official current `/nexworld/` and `/apartments/` market Smart **288–315 sq.ft from ₹29.49L all incl** and regular 1BHK **356–385 sq.ft from ₹34.9L**. Developer separate `/pricing/` still quotes Smart **₹27.9L** and normal 1BHK **₹36.49L** (338–385 sf) and promotes studio from ₹18.9L even as main apartments page marks Studio, Premium 1BHK and 2BHK **SOLD OUT**. This is a first-party date/page price discrepancy: **no public numeric price** or current available flat allocated; private source labels explicitly mention disagreement.
     - RERA/OC phase breakdown: Aura 1/2 OC, Aura 3 and Elara 2 OC till 35th floor; Nova separate marketed target Dec 2026; Flora marketed target Dec 2027. Developer 3 Sep 2026 progress notes other work; these are dated records, not a new MahaRERA certificate or all-towers ready claim.
     - Address Gavdevi Road, Betwade Gaon, Off Diva-Manpada Road, Dombivli East, from first-party sunset.in/nexworld contact; no building-door map.
     - Source URLs: https://marathon.in/nexworld/ ; https://marathon.in/nexworld/apartments/ ; https://marathon.in/nexworld/pricing/ ; https://marathon.in/nexworld/status/ ; https://marathon.in/nexworld/construction-updates-september26/ ; https://marathon.in/nexworld/wp-content/uploads/sites/9/2019/12/marathon-nexworld-dombivli-brochure.pdf .
  2. **Marathon Nextown — Kalyan–Shil Road**, `marathon-nextown-kalyan-shil-road-dombivli`, 5 registered separately legal phases:
     - Emerald `P51700000686`, Coral `P51700000952`, Sapphire `P51700001265`, Ruby `P51700021189`, Jasper `P51700049449`.
     - Marathon's current `/nextown/` homepage markets under-construction 1BHK **372 sq.ft from ₹36.99L**, 2BHK **476–500 sq.ft from ₹47.99L**, ready 1BHK **400–500 sq.ft from ₹44.99L**; however same site has historic INR25.99L hero and `/virtualtour/` offers different areas/2BHK Smart starting ₹46.99L and 2BHK 536.66 CA plus 121.96 balcony from ₹55.99L. Need distinguish current registered carpet vs balcony-inclusive and exact tower unsold developer apartment. No flat-level price inserted.
     - October 1 2026 first-party construction: Emerald, Coral, Sapphire and other early towers with OC; Ruby `P51700021189` construction completion developer target Dec 2026, Jasper `P51700049449` target Dec 2028. Do not classify all towers ready or all under construction. RERA-derived propertybaazi matches phases, and early phase promoter MARATHON ENER-GEN LLP; later phase legal promoter not independently checked.
     - Source URLs: https://marathon.in/nextown/ ; https://marathon.in/nextown/virtualtour/ ; https://marathon.in/nextown/construction-updates-oct-26/ ; https://www.propertybaazi.com/projects/marathon-nextown-dombivli-east-thane ; https://justprop.in/project/marathon-nextown .
- Reused existing `Marathon Group` developer profile; no duplicate developers or locations.
- Added **11 idempotent first-party and MahaRERA-derived source records** to `public.project_sources` (6 Nexworld, 5 Nextown). These are internal evidence records, not confirmations of currently allocatable/promoter-issued stock.
- Confirmed through database scan that **Marathon Nexzone Nirvana Collection, Monte South, NeoPark, NeoValley Narmada, Zaver Arcade and Sunset Gardens were already published**, so no duplicate records.
- Read-only stock QA found **zero active published inventory entries explicitly marked Sold Out**. Many offer rows are properly labelled "advertised/confirm current allocation" rather than guaranteed Book Now. No mass stock deletion/deactivation performed.

## Final direct SQL verification
- **1,861 total** `public.projects`; **681 published**, **1,180 private**.
- Public regional counts **366 Mumbai, 119 MMR, 196 Dubai**.
- **2,413 active inventory**, **3,174 active media** unchanged.
- Both new project rows `active=false, verified=false`, `inventory=0`, `project_media=0`; validator still has exact_configuration_inventory, geo, hero/gallery and other sources/verification-date checks.
- Simulated website public API visibility via `BEGIN READ ONLY; SET LOCAL ROLE anon;` confirmed **0 of two private projects visible** and all 681 published accessible.

## Important no-publication decision
Although source-corroborated, the project-wide marketed "starting from" price does not identify the currently available unit, sanctioned carpet, registered tower, all-inclusive charges and actual promoter allocation. There are first-party *contradictory price pages*, plus the same marketed township has both occupied and under-construction distinct registration towers, and project photography is not independently licensed for Way2Paisa reuse. Therefore **neither project was activated as a public listing** and no new active inventory was invented. This avoids misleading a real buyer or falsely inflating verified project count.

## Next high-impact work
- Mumbai 2–10 Cr and 10Cr+ centrally: target promoter-current **costed allocatable** stock and rights-cleared official media for private near-ready Navkar Palace Andheri, H. Rishabraj Trident Juhu, Aakasa Shivaji Park, Notan DC/House Juhu, Promesa Fremont Parel; if promoter allocation cannot be verified, do not activate.
- MMR: Nexworld/Nextown newer tower registered phases (Nova/Flora, Ruby/Jasper) have official marketing and builder-level prices. Map *specific* RERA carpet and legal promoter to current selling floor/cost sheet, then correct the price discrepancy and add authorised gallery; only then publish.
- Never infer flat availability from RERA unsold counts alone; registration and dated construction update do not guarantee OC or sellable title; no old "sold out" configs as current.

## No-contact and hosting exclusions
No external developer mail/request, no GoDaddy publish retries, no Emaar photo work, no site migration, no DNS changes, and no current active/public prices or inventory altered.
