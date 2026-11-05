# Way2Paisa — Step 3 full unavailable-gallery filter audit (5 Nov 2026)

**Status:** Step 3 OPEN; Step 4 ON HOLD. Read-only Supabase media and published-project reconciliation; one narrow frontend fallback change deployed. No email or outreach.

## Scope and verified baseline

- Supabase project: `dqoxrsywknsgkxrdrxep`.
- Published, verified, complete projects: **667**.
- Active inventory rows: **2,379**.
- Active media rows (published and private together): **3,173**.
- **71** published project hero URL fields use known-unavailable `uae-cms.emaar.com/uploads/` sources.
- **277** active Emaar legacy-host media rows belong to published projects (**226 gallery, 51 hero**); another **28** rows belong to private/not-published projects (**19 gallery, 9 hero**). **305** is the all-projects total, **not** a growth or new degradation from the previously reported published count of 277.
- The older **70-gallery-empty** figure applied a limited Emaar-URL exclusion check. Applying **the actual current `isKnownUnavailableProjectImage` blocklist (86 exact URLs plus Emaar, Godrej and Serro URL patterns)** and the page's verified/gallery/layout conditions yields **87** published projects with **zero gallery candidates surviving that filter**, divided as: Dubai **69**, Mumbai **15**, MMR **3**.
- This filter-level finding **does not prove** that all remaining media URLs download or display in an interactive visitor browser. Some other gallery candidates may also fail dynamically; 87 is the known-filter-zero cohort, **not a certified comprehensive network-failure count**.

## Targeted frontend release (no DB mutation)

- Commit: [7f8f87c99eb9abfc83e62928ce9b3d10eebd0f04](https://github.com/way2paisaindia/way2paisa-public/commit/7f8f87c99eb9abfc83e62928ce9b3d10eebd0f04).
- File: `app/projects/[slug]/page.js`. For hero URLs already recognized as unavailable, the gallery is **not** passed to `ListingImage` as an automatic hero replacement. This prevents reusing the same existing gallery photo as the hero for known-broken sources. Existing gallery assets remain in place, unchanged.
- Vercel production deployment `dpl_F5LGxi8zV2XqpaYPqbfrqs3DsE1A`: **READY**, GitHub SHA matched; Vercel status check success.
- No image was replaced or licensed by inference. A READY deployment is **not** a visitor-browser screenshot/content-rights certification.

## Priority holds

1. **Godrej Bliss:** official legacy source still unavailable; staged candidate is inactive and lacks documented promotional-reuse authorisation and browser proof. Keep neutral photo fallback.
2. **Emaar Harbour Gate:** one official VR project gallery URL survives; no third distinct licensed gallery photograph approved. Do not duplicate it into another media slot.
3. **Emaar Vista Ridge:** two non-legacy gallery links are from third-party broker portals; project specificity alone is not evidence of reproduction rights. Do not promote these to a replacement hero without rights review.
4. **69 Dubai Emaar zero-surviving-gallery pages:** approved, stable, project-specific gallery images are required before certification. Emaar's published asset-usage policy indicates prior permission may be necessary for advertising uses (https://www.emaar.com/en/emaar-asset-usage-policy).
5. **17 additional Mumbai/MMR listings beyond Godrej Bliss:** individually confirmed unavailable URLs are present in code, including Dosti Eden, Godrej Varanya and The Odyssey. Keep records for provenance and preserve no-gallery notices.

## Exception register (87 published projects)

Each entry is a published project with **no surviving gallery candidate under the current static exclusion rules**. This register is not an assessment of sale inventory, a withdrawal recommendation, or evidence of media rights.

### Dubai — 69

| Project | Public URL |
| --- | --- |
| Emaar Aeon at Dubai Creek Harbour | [emaar-aeon-dubai-creek-harbour](https://www.way2paisa.in/projects/emaar-aeon-dubai-creek-harbour) |
| Emaar Albero at Dubai Creek Harbour | [emaar-albero-dubai-creek-harbour](https://www.way2paisa.in/projects/emaar-albero-dubai-creek-harbour) |
| Emaar Altan at Dubai Creek Harbour | [emaar-altan-dubai-creek-harbour](https://www.way2paisa.in/projects/emaar-altan-dubai-creek-harbour) |
| Emaar Altus at Dubai Creek Harbour | [emaar-altus-dubai-creek-harbour](https://www.way2paisa.in/projects/emaar-altus-dubai-creek-harbour) |
| Emaar Aurea at Rashid Yachts & Marina | [emaar-aurea-rashid-yachts-marina](https://www.way2paisa.in/projects/emaar-aurea-rashid-yachts-marina) |
| Emaar Avarra by Palace at Business Bay | [emaar-avarra-by-palace-business-bay](https://www.way2paisa.in/projects/emaar-avarra-by-palace-business-bay) |
| Emaar Baystar by Vida at Rashid Yachts & Marina | [emaar-baystar-by-vida-rashid-yachts-marina](https://www.way2paisa.in/projects/emaar-baystar-by-vida-rashid-yachts-marina) |
| Emaar Bayview by Address Resorts at Emaar Beachfront | [emaar-bayview-by-address-resorts-emaar-beachfront](https://www.way2paisa.in/projects/emaar-bayview-by-address-resorts-emaar-beachfront) |
| Emaar Beach Mansion at Emaar Beachfront | [emaar-beach-mansion-emaar-beachfront](https://www.way2paisa.in/projects/emaar-beach-mansion-emaar-beachfront) |
| Emaar Beach Vista at Emaar Beachfront | [emaar-beach-vista-emaar-beachfront](https://www.way2paisa.in/projects/emaar-beach-vista-emaar-beachfront) |
| Emaar Beachgate by Address at Emaar Beachfront | [emaar-beachgate-by-address-emaar-beachfront](https://www.way2paisa.in/projects/emaar-beachgate-by-address-emaar-beachfront) |
| Emaar BLVD Crescent at Downtown Dubai | [emaar-blvd-crescent-downtown-dubai](https://www.way2paisa.in/projects/emaar-blvd-crescent-downtown-dubai) |
| Emaar BLVD Heights at Downtown Dubai | [emaar-blvd-heights-downtown-dubai](https://www.way2paisa.in/projects/emaar-blvd-heights-downtown-dubai) |
| Emaar Cedar at Dubai Creek Harbour | [emaar-cedar-dubai-creek-harbour](https://www.way2paisa.in/projects/emaar-cedar-dubai-creek-harbour) |
| Emaar Clearpoint at Rashid Yachts & Marina | [emaar-clearpoint-rashid-yachts-marina](https://www.way2paisa.in/projects/emaar-clearpoint-rashid-yachts-marina) |
| Emaar Club Place at Dubai Hills Estate | [emaar-club-place-dubai-hills-estate](https://www.way2paisa.in/projects/emaar-club-place-dubai-hills-estate) |
| Emaar Creek Bay at Dubai Creek Harbour | [emaar-creek-bay](https://www.way2paisa.in/projects/emaar-creek-bay) |
| Emaar Creek Haven at Dubai Creek Harbour | [emaar-creek-haven](https://www.way2paisa.in/projects/emaar-creek-haven) |
| Emaar Creek Palace at Dubai Creek Harbour | [emaar-creek-palace-dubai-creek-harbour](https://www.way2paisa.in/projects/emaar-creek-palace-dubai-creek-harbour) |
| Emaar Creek Waters 2 at Dubai Creek Harbour | [emaar-creek-waters-2-dubai-creek-harbour](https://www.way2paisa.in/projects/emaar-creek-waters-2-dubai-creek-harbour) |
| Emaar Creekside 18 at Dubai Creek Harbour | [emaar-creekside-18-dubai-creek-harbour](https://www.way2paisa.in/projects/emaar-creekside-18-dubai-creek-harbour) |
| Emaar Downtown Views II | [emaar-downtown-views-ii](https://www.way2paisa.in/projects/emaar-downtown-views-ii) |
| Emaar Dubai Creek Residences at Dubai Creek Harbour | [emaar-dubai-creek-residences-dubai-creek-harbour](https://www.way2paisa.in/projects/emaar-dubai-creek-residences-dubai-creek-harbour) |
| Emaar Forte at Downtown Dubai | [emaar-forte-downtown-dubai](https://www.way2paisa.in/projects/emaar-forte-downtown-dubai) |
| Emaar Golf Acres at Emaar South | [emaar-golf-acres-emaar-south](https://www.way2paisa.in/projects/emaar-golf-acres-emaar-south) |
| Emaar Golf Dale at Emaar South | [emaar-golf-dale-emaar-south](https://www.way2paisa.in/projects/emaar-golf-dale-emaar-south) |
| Emaar Golf Grand at Dubai Hills Estate | [emaar-golf-grand-dubai-hills-estate](https://www.way2paisa.in/projects/emaar-golf-grand-dubai-hills-estate) |
| Emaar Golf Hills 2 at Emaar South | [emaar-golf-hills-2-emaar-south](https://www.way2paisa.in/projects/emaar-golf-hills-2-emaar-south) |
| Emaar Golf Hillside at Dubai Hills Estate | [emaar-golf-hillside-dubai-hills-estate](https://www.way2paisa.in/projects/emaar-golf-hillside-dubai-hills-estate) |
| Emaar Golf Meadow at Emaar South | [emaar-golf-meadow-emaar-south](https://www.way2paisa.in/projects/emaar-golf-meadow-emaar-south) |
| Emaar Golf Point at Emaar South | [emaar-golf-point-emaar-south](https://www.way2paisa.in/projects/emaar-golf-point-emaar-south) |
| Emaar Golf Trails at Emaar South | [emaar-golf-trails](https://www.way2paisa.in/projects/emaar-golf-trails) |
| Emaar Golf Vale at Emaar South | [emaar-golf-vale](https://www.way2paisa.in/projects/emaar-golf-vale) |
| Emaar Golf Verge at Emaar South | [emaar-golf-verge-emaar-south](https://www.way2paisa.in/projects/emaar-golf-verge-emaar-south) |
| Emaar Grand Bleu Tower at Emaar Beachfront | [emaar-grand-bleu-tower-emaar-beachfront](https://www.way2paisa.in/projects/emaar-grand-bleu-tower-emaar-beachfront) |
| Emaar Greenside Residence at Dubai Hills Estate | [emaar-greenside-residence-dubai-hills-estate](https://www.way2paisa.in/projects/emaar-greenside-residence-dubai-hills-estate) |
| Emaar Grove Ridge at Emaar South | [emaar-grove-ridge](https://www.way2paisa.in/projects/emaar-grove-ridge) |
| Emaar Hillsedge at Dubai Hills Estate | [emaar-hillsedge-dubai-hills-estate](https://www.way2paisa.in/projects/emaar-hillsedge-dubai-hills-estate) |
| Emaar Lyvia by Palace at Dubai Creek Harbour | [emaar-lyvia-by-palace-dubai-creek-harbour](https://www.way2paisa.in/projects/emaar-lyvia-by-palace-dubai-creek-harbour) |
| Emaar Mangrove at Dubai Creek Harbour | [emaar-mangrove-dubai-creek-harbour](https://www.way2paisa.in/projects/emaar-mangrove-dubai-creek-harbour) |
| Emaar Marina Cove at Dubai Marina | [emaar-marina-cove-dubai-marina](https://www.way2paisa.in/projects/emaar-marina-cove-dubai-marina) |
| Emaar Montiva by Vida at Dubai Creek Harbour | [emaar-montiva-by-vida-dubai-creek-harbour](https://www.way2paisa.in/projects/emaar-montiva-by-vida-dubai-creek-harbour) |
| Emaar Mulberry at Dubai Hills Estate | [emaar-mulberry-dubai-hills-estate](https://www.way2paisa.in/projects/emaar-mulberry-dubai-hills-estate) |
| Emaar Ocean Cove at Rashid Yachts & Marina | [emaar-ocean-cove-rashid-yachts-marina](https://www.way2paisa.in/projects/emaar-ocean-cove-rashid-yachts-marina) |
| Emaar Ovelle at The Valley | [emaar-ovelle-the-valley](https://www.way2paisa.in/projects/emaar-ovelle-the-valley) |
| Emaar Palace Residences Hillside A at Dubai Hills Estate | [emaar-palace-residences-hillside-a-dubai-hills-estate](https://www.way2paisa.in/projects/emaar-palace-residences-hillside-a-dubai-hills-estate) |
| Emaar Palace Residences North at Dubai Creek Harbour | [emaar-palace-residences-north-dubai-creek-harbour](https://www.way2paisa.in/projects/emaar-palace-residences-north-dubai-creek-harbour) |
| Emaar Park Horizon at Dubai Hills Estate | [emaar-park-horizon-dubai-hills-estate](https://www.way2paisa.in/projects/emaar-park-horizon-dubai-hills-estate) |
| Emaar Park Lane at Dubai Hills Estate | [emaar-park-lane-dubai-hills-estate](https://www.way2paisa.in/projects/emaar-park-lane-dubai-hills-estate) |
| Emaar Parkside Hills at Dubai Hills Estate | [emaar-parkside-hills-dubai-hills-estate](https://www.way2paisa.in/projects/emaar-parkside-hills-dubai-hills-estate) |
| Emaar Parkside Views Residence at Dubai Hills Estate | [emaar-parkside-views-residence-dubai-hills-estate](https://www.way2paisa.in/projects/emaar-parkside-views-residence-dubai-hills-estate) |
| Emaar Parkwood at Dubai Hills Estate | [emaar-parkwood-dubai-hills-estate](https://www.way2paisa.in/projects/emaar-parkwood-dubai-hills-estate) |
| Emaar Pier Point 1 at Rashid Yachts & Marina | [emaar-pier-point-1-rashid-yachts-marina](https://www.way2paisa.in/projects/emaar-pier-point-1-rashid-yachts-marina) |
| Emaar Rosehill at Dubai Hills Estate | [emaar-rosehill-dubai-hills-estate](https://www.way2paisa.in/projects/emaar-rosehill-dubai-hills-estate) |
| Emaar Salva at The Heights | [emaar-salva](https://www.way2paisa.in/projects/emaar-salva) |
| Emaar Savanna at Dubai Creek Harbour | [emaar-savanna-dubai-creek-harbour](https://www.way2paisa.in/projects/emaar-savanna-dubai-creek-harbour) |
| Emaar Seascape at Rashid Yachts & Marina | [emaar-seascape-rashid-yachts-marina](https://www.way2paisa.in/projects/emaar-seascape-rashid-yachts-marina) |
| Emaar Selvara 3 at Grand Polo Club & Resort | [emaar-selvara-3-grand-polo-club-resort](https://www.way2paisa.in/projects/emaar-selvara-3-grand-polo-club-resort) |
| Emaar Selvara 4 at Grand Polo Club & Resort | [emaar-selvara-4-grand-polo-club-resort](https://www.way2paisa.in/projects/emaar-selvara-4-grand-polo-club-resort) |
| Emaar Sera 2 at Rashid Yachts & Marina | [emaar-sera-2-rashid-yachts-marina](https://www.way2paisa.in/projects/emaar-sera-2-rashid-yachts-marina) |
| Emaar Serro 2 at The Heights | [emaar-serro-2](https://www.way2paisa.in/projects/emaar-serro-2) |
| Emaar Silva at Dubai Creek Harbour | [emaar-silva-dubai-creek-harbour](https://www.way2paisa.in/projects/emaar-silva-dubai-creek-harbour) |
| Emaar Terra Gardens at Expo Living | [emaar-terra-gardens-expo-living](https://www.way2paisa.in/projects/emaar-terra-gardens-expo-living) |
| Emaar Terra Woods at Expo Living | [emaar-terra-woods](https://www.way2paisa.in/projects/emaar-terra-woods) |
| Emaar The Cove II at Dubai Creek Harbour | [emaar-the-cove-ii-dubai-creek-harbour](https://www.way2paisa.in/projects/emaar-the-cove-ii-dubai-creek-harbour) |
| Emaar Valia at Dubai Creek Harbour | [emaar-valia](https://www.way2paisa.in/projects/emaar-valia) |
| Emaar Valo at Dubai Creek Harbour | [emaar-valo-dubai-creek-harbour](https://www.way2paisa.in/projects/emaar-valo-dubai-creek-harbour) |
| Emaar Vida Residences Dubai Marina | [emaar-vida-residences-dubai-marina](https://www.way2paisa.in/projects/emaar-vida-residences-dubai-marina) |
| Emaar Vida Residences Hillside at Dubai Hills Estate | [emaar-vida-residences-hillside-dubai-hills-estate](https://www.way2paisa.in/projects/emaar-vida-residences-hillside-dubai-hills-estate) |

### Mumbai — 15

| Project | Public URL |
| --- | --- |
| 72 Parksyde | [72-parksyde-ghatkopar-east](https://www.way2paisa.in/projects/72-parksyde-ghatkopar-east) |
| Aayush Aurum | [aayush-aurum](https://www.way2paisa.in/projects/aayush-aurum) |
| Bhakti Pride | [bhakti-pride-chembur](https://www.way2paisa.in/projects/bhakti-pride-chembur) |
| Godrej Bliss | [bliss-godrej-properties-kandivali-east](https://www.way2paisa.in/projects/bliss-godrej-properties-kandivali-east) |
| Kaustubh Breeze 91 | [kaustubh-breeze-91-borivali-west](https://www.way2paisa.in/projects/kaustubh-breeze-91-borivali-west) |
| MJ Shah Centrio Nx Phase 1 | [mj-shah-centrio-nx-phase-1](https://www.way2paisa.in/projects/mj-shah-centrio-nx-phase-1) |
| Rivali Park Moonrise | [moonrise-at-rivali-park-borivali-east](https://www.way2paisa.in/projects/moonrise-at-rivali-park-borivali-east) |
| Romell Orbis | [romell-orbis-andheri-east](https://www.way2paisa.in/projects/romell-orbis-andheri-east) |
| Roswalt Raya | [roswalt-raya-roswalt-realty-chembur](https://www.way2paisa.in/projects/roswalt-raya-roswalt-realty-chembur) |
| Runwal Garden Vista | [garden-vista-runwal-enterprises-kanjurmarg-east](https://www.way2paisa.in/projects/garden-vista-runwal-enterprises-kanjurmarg-east) |
| Shapoorji Pallonji The Odyssey | [the-odyssey-shapoorji-pallonji-marine-drive](https://www.way2paisa.in/projects/the-odyssey-shapoorji-pallonji-marine-drive) |
| Vardhaman Aarambh | [vardhaman-aarambh](https://www.way2paisa.in/projects/vardhaman-aarambh) |
| Vardhaman Ananda | [vardhaman-ananda-ghatkopar-east](https://www.way2paisa.in/projects/vardhaman-ananda-ghatkopar-east) |
| Vardhaman Palace | [vardhaman-palace](https://www.way2paisa.in/projects/vardhaman-palace) |
| Vastu Shilp | [vastu-shilp-uvk-develpers-borivali-east](https://www.way2paisa.in/projects/vastu-shilp-uvk-develpers-borivali-east) |

### MMR — 3

| Project | Public URL |
| --- | --- |
| Dosti Eden | [dosti-eden-dosti-realty-thane-west-brahmand](https://www.way2paisa.in/projects/dosti-eden-dosti-realty-thane-west-brahmand) |
| Godrej Varanya | [godrej-varanya-godrej-properties-kharghar-navi-mumbai](https://www.way2paisa.in/projects/godrej-varanya-godrej-properties-kharghar-navi-mumbai) |
| Sheth Cnergy — Phase 1 | [sheth-cnergy-phase-1-thane-west](https://www.way2paisa.in/projects/sheth-cnergy-phase-1-thane-west) |

## Release guard and next verifications

- Keep all 667 published projects and all existing prices/inventory unaffected; no fake or duplicate project images; no source-rights assumptions.
- Before a listing exits this exception register: establish a stable image response and genuine project identity, document appropriate advertising/reuse rights, ensure sufficiently distinct hero/gallery photos, and independently inspect actual display in a visitor browser.
- Retest sitemap/page HTTP, image bytes and generated UI after any newly authorized media is activated. HTTP 200 on a project page alone does not imply image success.
- No developer outreach, emails, new-publication claims or Step 4 work during this cycle.
