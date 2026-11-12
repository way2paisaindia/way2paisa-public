# Way2Paisa — Mumbai/MMR publication pipeline: Asmi Legacy and new Signet-3 phase

Date: 12 November 2026 (IST)

## Verified catalogue invariants
- Active projects **682**: Mumbai **367**, MMR **119**, Dubai **196**, unchanged by this continuation.
- New **public** publications: **0**.
- New **unpublished** phase records created: **1** (Lodha Signet-3). Existing unpublished project significantly enriched: **1** (Asmi Legacy).
- New verified developer profiles: **1**, Asmi Developers.
- New project-source audit rows added: **10** (Asmi Legacy 6; Lodha Signet-3 3; existing older Lodha Signet 1).
- New inactive original-image reference rows: **2**, Asmi Legacy, with explicit quarantine and no commercial reuse permission assumed.
- Existing selling prices, active inventory, published project status, media availability, existing possession dates and old RERA numbers unchanged.

## 1. Asmi Legacy, Goregaon West — private record enriched
- Existing slug: `asmi-legacy-goregaon-west`, MahaRERA **P51800031746**.
- First-party developer website verified live: https://www.asmigroup.co.in/ and exact project page https://www.asmigroup.co.in/asmi_legacy.html.
- Legal promoter: **Asmi Developers** (MahaRERA-derived registration; Asmi Group brand), official company logo https://www.asmigroup.co.in/img/logo.jpg.
- Registered original completion: **31 December 2026** (ReraGenie filing snapshot updated May 2026); a secondary GharKundli October 2026 interpretation claims an automatic four-month eligibility extension to April 2027, not treated as an independently registered revised completion certificate.
- First-party project page explicitly markets **2 and 3 BHK apartments**, **750–1,100 sq.ft**; it **does not specify that the sizes are RERA carpet**, so numeric carpet area fields are deliberately blank.
- Two registered towers: Desire and Destiny, total 266 filed units, including rehabilitated allocation in the filing. No claim that unsold filed units equal presently developer-saleable stock.
- First-party current site offers no named, costed available flats. Third-party marketed price guides diverge sharply: MPE https://www.mumbaipropertyexchange.com/project/asmi-legacy-goregaon-west/33199 and MagicBricks https://www.magicbricks.com/asmi-legacy-goregaon-west-mumbai-pdpid-4d4235343234303733. No invented public starting price or saleable inventory.
- Old `asmilegacy.com` returned a 404, and `asmilegacygoregaon.in` showed an expired domain. The corporate site above is current.
- Connected a newly created `developers` profile with legal name, verified corporate website, description and actual logo.
- Updated the **unpublished** project's overview, status, registered date and phase-specific caveat, search title/description, legal, maps/location provenance and developer references; `active=false` and `verified=false` preserved.
- Inserted 6 verified source notes, including one explicit `maharera_registered_details_20261112` row recognized by the validation function.
- Stored two original developer project image URLs privately:
  - https://www.asmigroup.co.in/img/project/asmi_legacy/01.jpg
  - https://www.asmigroup.co.in/img/project/asmi_legacy/02.jpg
  Both set `active=false`, `license_status=quarantined_pending_commercial_reuse_authorization`; commercial permissions NOT established.
- `public.project_enrichment_gaps()` now identifies outstanding current unit inventory, project-specific amenity evidence, genuine authorized hero and 3 distinct gallery images. No false publication.

## 2. New registered Lodha Signet-3 commercial phase — private candidate created
- New slug: `lodha-signet-3-kalyan-shil-road-commercial`.
- MahaRERA **PC1330002602612**, registered **3 November 2026** in **Mangaon, Thane**, promoter Lodha Developers Limited. Filed single commercial phase, **404 units** and original completion **December 2031**. Two court matters disclosed; no adverse legal conclusion inferred.
- Sources:
  - https://askrera.com/projects/signet-3-pc1330002602612/
  - https://www.rerainspector.com/projects/68175/PC1330002602612
  - https://www.lodhagroup.com/projects/commercial-property-in-mumbai/lodha-signet-kalyan-shil-road
- Lodha's current marketing master includes the newer Signet-3 registration while older development sources and the page footer refer to the earlier **P51700054751**.
- The existing public project `lodha-signet-kalyan-shil-road-offices` retains its original registered phase **P51700054751**, price inventory and July 2027 target; **not** merged or replaced.
- New Signet-3 record linked to existing Lodha developer and Palava regional location; **no exact tower coordinates, priced office stock, licensed distinct phase images or sales availability** fabricated. New candidate is deliberately `active=false,verified=false`.
- Added 3 sources for new phase and one phase-separation source for the older published listing.

## 3. Missing-image source batch
Revisited all 12 previously staged official project-page links (no image copy or publication):
- First-party URLs rendered **11/12**, with matching named developments for: Dosti Willow, Lodha Bellavista, Casa Foresta, Casa Olivia, Signet Kalyan–Shil, Signet Thane, Casa Evergreen, Signet Matunga, Signet Vikhroli, Marathon Zaver Arcade, Sunset Gardens.
- https://marathon.in/nexzone/ timed out in the extraction tool; treat as unverified rather than nonexistent.
- Official-site presence is provenance, not third-party commercial image reuse license. Existing 12 published-image gaps remain; gallery data not modified.
- Discovered distinct Signet-3 phase while checking newer first-party Lodha Signet registration; corrected ambiguity by adding the separate private phase and caveat, as above.

## 4. Read-only public privacy gate
Live https://www.way2paisa.in/sitemap.xml reported **692 URLs**.
- Old published `/projects/lodha-signet-kalyan-shil-road-offices` remains in the XML.
- Private Asmi Legacy and newly staged Signet-3 slugs are **not** in the XML.
- Independent HTTP fetches of `https://www.way2paisa.in/projects/asmi-legacy-goregaon-west` and `https://www.way2paisa.in/projects/lodha-signet-3-kalyan-shil-road-commercial` both reported **404**, as expected. Do not claim they are published.
- Old GoDaddy static-detail content for Ace Aristo and Runwal Sanctuary had remained stale despite newer Supabase descriptions. No authenticated GoDaddy deployment was attempted; no false claims that GitHub frontend possession-warning commits are live.

## Final release statement
**0 newly activated public projects this cycle.** One newly registered commercial phase accurately staged privately, another incomplete Mumbai project substantially enriched, 10 source evidence rows and 2 quarantined original media references added. Existing public catalogue remains at 682; no email, WhatsApp, lead, DNS, or hosting operation performed.

## Next gates to unlock actual publishing
- Asmi Legacy: current promoter-issued costed saleable unit allocations and legally classified RERA carpet, project amenities supported by official records, rights-cleared distinct gallery.
- Signet-3: phase-allocated office sale inventory and prices, precise entrance/approval documents, phase-specific media permissions.
- Rishabraj Trident/Navkar Palace: current unit allocation and a third unique rights-cleared project gallery image.
- 12 missing-image public projects: image-level permission and visitor browser delivery validation, then stage/activate only correct original project images.
