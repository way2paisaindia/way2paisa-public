# Way2Paisa — 13 November 2026 Mumbai/MMR publication safeguards and original-image sourcing

## Executive result

This continuation focused on production listing quality and near-ready Mumbai/MMR private projects without disrupting live GoDaddy hosting.

**Verified release counts:**
- Published projects remain **682**, broken down **Mumbai 367, MMR 119, Dubai 196**. Newly activated projects this cycle **0**.
- Staged **22** original first-party project image URL references across **6 already published Mumbai/MMR projects**, all `project_media.active=false`, with quarantined licence status. **ZERO images activated on the public site.**
- Added **10** dated `project_sources` provenance / photo-quality audit rows across 8 published projects, including exclusion of cross-project imagery.
- Corrected `possession_original` for published **Marathon Zaver Arcade** from a verbose OC note to exact `OC Received`, which is substantiated by official developer page. Project `possession_date`, status, prices, inventory and active flags unchanged. **Production still returns the older `Possession: Available on request` after the DB edit**: do not call the display issue resolved until GoDaddy deployment/cache freshness is reconciled.
- No emails, developer requests, enquiry form submissions, price changes, unpublishing, or GoDaddy deployments.

## 1. First-party image sourcing — all media private/quarantined

| Existing published project | Stage count | Hero candidate | Source | Notes |
|---|---:|---:|---|---|
| Dosti Willow, Thane | 1 | 1 | https://www.dostirealty.com/project/dosti-willow | Named `Dosti_Willow_Shot` photo. Other generalized filenames not ingested as if confirmed Willow |
| Marathon Zaver Arcade, Mulund West | 5 | 1 | https://marathon.in/zaver-arcade/ | Five filename-matched official `zaver-arcade_website_carousel` images; site independently says 2 BHK last few from ₹2.30 Cr and OC received |
| Lodha Signet Matunga, Mumbai | 5 | 1 | https://www.lodhagroup.com/projects/commercial-property-in-mumbai/lodha-signet-matunga | First-party project-titled desktop hero, two named amenity images and two project-titled feature images; excluded QR and logo |
| Lodha Casa Evergreen, Vikhroli West | 5 | 1 | https://www.lodhagroup.com/projects/residential-property-in-mumbai/casa-evergreen-vikhroli | First-party Casa Evergreen-named banner and Amenity_Evergreen_1–4 images |
| Lodha Bellavista, Thane | 4 | 1 | https://www.lodhagroup.com/projects/residential-property-in-thane/lodha-bellavista | First-party Bellavista banner and three same-page podium/pool/Bellavista gallery images |
| Lodha Signet Vikhroli, Mumbai | 2 | 0 | https://www.lodhagroup.com/projects/commercial-property-in-mumbai/lodha-signet-vikhroli | Two explicitly Vikhroli-Signet named features staged; generic same-page images were not treated as genuine project images |
| **Total** | **22** | **5** | | **Zero media activated** |

All `license_status` values begin `quarantined_`; records are only research references. Publishing another business's photo on Way2Paisa, a commercial CP portal, requires marketing reuse permission, correct project/wing matching, live-image delivery check and no duplicate/logo/QR placeholders. First-party hosting alone is NOT a licence. Every new record has `active=false`, a developer source URL and dated verification. These staging actions do not change live hero/gallery output.

## 2. Official source mismatch — intentionally rejected images

**Lodha Casa Foresta**, Palava: its developer source https://www.lodhagroup.com/palava-city/projects/residential-property-in-dombivli/casa-foresta exposes files named `casa-rio-gold`, `amenity1-casa-premier` and `Belvedere_USP`, even though displayed on the Casa Foresta page. These are **not** independently authenticated as Casa Foresta's own project images, so zero were staged/activated. This protects against a wrong-photo incident similar to earlier Way2Paisa problems.

**Lodha Signet Vikhroli** official project page includes `USP3_Signet-Lower-Parel` and generic gallery names `1_10`, `2_10`, `3_10`. Excluded from approved candidate set until positively identified.

**Sunset Gardens**, Mulund: https://sunset.in/gardens/ exposes site logo and icons, including an `og:image` which is **the project logo**, not a project photograph. The developer currently advertises studio ₹63.99 lakh and 1BHK ₹1.26Cr (both all-inclusive), but no suitable original gallery hero was accepted. Pricing unchanged.

**Godrej Bliss**, Kandivali East: existing developer-hosted gallery photos are already stored but remain inactive, along with separately quarantined Housiey floor plans. New audit records do not bypass authorization or browser image checks.

**Dosti Willow** distinction: first-party marketed 2 BHK **833 sq.ft** and 3 BHK up to **1,275 sq.ft** are not established as the same area basis as legal RERA-derived **785 sq.ft 2BHK and 1,175–1,190 sq.ft 3BHK carpet**. Existing project-level carpet range from registration is preserved; no invented direct area-to-starting-price quote and no active inventory changes.

## 3. Mandatory public completeness audit — 486 Mumbai/MMR projects

Ran `public.project_enrichment_gaps(p.id)` for all **486** active listings (367 Mumbai +119 MMR). Results:

| Test | Flagged active listings |
|---|---:|
| One or more current enrichment gates failed | **13** |
| Missing approved/active project hero | **13** |
| Missing approved/active project gallery | **13** |
| Incomplete configuration-level carpet/price/inventory gate | **9** |
| Passed every current enrichment gate | **473** |

This does **not** mean the other 473 are perfectly documented or that all 13 are unlawful; it is an operational data-completeness check. All 13 have `enrichment_status='complete'` from prior publication and remain live despite current dynamic checklist flags. We did not bulk reset this status or unpublish them because it would break already public customer URLs and possibly search-engine visibility. No live price/inventory changes.

13 listings for targeted correction (source of truth is RERA/legal developer documents, NOT arbitrary third-party approximate numbers):
1. Dosti Willow, Thane — inventory carpet + hero/gallery
2. Lodha Bellavista, Thane — inventory carpet + hero/gallery
3. Lodha Casa Foresta, Palava — mapped site pin + hero/gallery
4. Lodha Casa Olivia, Palava — inventory carpet, mapped pin + hero/gallery
5. Lodha Signet Kalyan–Shil Road Offices — inventory carpet, mapped pin + hero/gallery
6. Lodha Signet Thane Offices — inventory carpet, mapped pin + hero/gallery
7. Marathon Nexzone Nirvana Collection, Panvel — hero/gallery
8. Godrej Bliss, Kandivali East — approved project hero/gallery
9. Lodha Casa Evergreen, Vikhroli — inventory carpet, mapped pin + hero/gallery
10. Lodha Signet Matunga Offices — inventory carpet, mapped pin + hero/gallery
11. Lodha Signet Vikhroli Offices — inventory carpet, mapped pin + hero/gallery
12. Marathon Zaver Arcade, Mulund — hero/gallery
13. Sunset Gardens, Mulund — inventory carpet + hero/gallery

**Important:** some active inventory rows are category-level STARTING offers for which registered flat carpet and exact price pairing are not established. Do not fill `carpet_area_sqft` with developer general marketed area or equate a "from" price to a randomly selected unit merely to satisfy the validator.

## 4. Marathon Zaver Arcade possession display fix and live/cache gate

- Original developer https://marathon.in/zaver-arcade/ explicitly advertises **OC HAS ARRIVED**, `OC Received`, a limited number of ready 2BHK homes from ₹2.30Cr and RERA carpet layouts 700–724 sq.ft.
- The public Way2Paisa project page before the edit displayed `Status: Ready to Move` BUT `Possession: Available on request`, an unhelpful contradictory UI due to `possessionText()` logic on a verbose phrase with "confirm" or no recognizable month/date.
- Updated only `projects.possession_original` to **`OC Received`**, backed by first-party proof. Existing description already requires buyer to verify exact apartment and occupancy documents; original statutory date remains 31 March 2026, active price ₹2.30Cr unchanged.
- Post-write Supabase read-back confirmed corrected field.
- A fresh read of live public URL, including an altered query-string cache buster, still displayed **Possession: Available on request**. This is a live-version or cache freshness/deployment synchronization issue; **not fixed on production** yet.
- Website's active source GitHub `app/projects/[slug]/page.js` has `revalidate=300`, but previous independent edits also failed to refresh live overviews beyond five minutes. Avoid asserting changing DB alone guarantees immediate freshness. GoDaddy access needs an authenticated profile and safe production-vs-GitHub reconciliation; TinyFish Browser Context default profile presently has **no recorded signed-in sites**, so no authenticated GoDaddy deployment action was performed.

## 5. New-project publication status

No private new Mumbai/MMR candidate cleared the actual developer-sale stock + RERA/phase + pricing/area + licensed media gates. Rechecked shortlisting for NVK Palmera Bandra W, The Sands Alibaug, Sankalp Meadows Khalapur and Goodlife Karjat:
- Palmera: developer project FROM ₹15Cr, 4BHK 2,090sq.ft and 4BHK+ 4,180sq.ft, but conflicts with older Housing basic-price 1,393/1,759sq.ft flats and promoter's project totals; no allocated new first-sale offer verified.
- The Sands: six 4/4.5BR villas, developer marketing from ₹9.25Cr and area 4,000sqft but not necessarily legal RERA carpet area or a named available villa; ready status vs original 2027 registry unresolved.
- Sankalp Meadows: current named plot seller/title and plot number not established; official brand page doesn't list priced numbered stock.
- Goodlife Karjat: marketed constructed villas vs regulated plotted-project legal scope requires explicit proof; starting ₹1.29Cr not tied to a currently available named villa registered sale unit.
- No new project published or existing status/price changed.

## 6. Next safe release steps

1. Resolve GoDaddy live cache/version mismatch and verify safe deployment with zero homepage regression; do not blindly pull GitHub main to GoDaddy.
2. For the 13 published listing fixes, obtain authorized original images and real inventory area/price evidence; only then activate verified media and complete flags.
3. Continue priority Mumbai/MMR new project discovery where a first-party developer issues **current saleable config + RERA carpet + price + rights-cleared project media**. Do not inflate public project count with stage-only projects or umbrella duplicates.
