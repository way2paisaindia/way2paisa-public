# Way2Paisa Step 3 — Media reconciliation audit
Date: 2026-11-03 (IST)
Scope: Read-only production investigation of published media records, source policy and server-rendered pages.
Status: OPEN. Step 4 remains ON HOLD.

## Production baseline
- Published, verified, enrichment-complete projects: 665.
- Active inventory records: 2,372.
- Active project_media records: 3,173.
- These counts were read from Supabase project dqoxrsywknsgkxrdrxep, public.projects/public.inventory/public.project_media.

## Two named media exceptions
1. Godrej Bliss — canonical published ID `79ce7d20-0a32-4dc5-9816-d8e5a7e996b1`, slug `bliss-godrej-properties-kandivali-east`.
   - The stored project hero is a legacy `gplwebsitecdnblob.blob.core.windows.net` Godrej Bliss Gallery01 URL (previously identified unavailable); it remains in source data for audit traceability.
   - All four legacy official Gallery01–04 media rows are inactive, as are third-party Housiey photos and plans. The proposed developer site's `_next/image` hero is staged in project_media as inactive with `first_party_hosted_candidate_reuse_rights_and_browser_validation_pending`.
   - No active gallery. Frontend uses an explicit unavailable-photo fallback; no replacement was activated. The official developer gallery still references the same original legacy gallery source family.
2. Emaar Harbour Gate — published ID `423fcb5b-1972-40c0-8745-6007c67c1713`, slug `emaar-harbour-gate-dubai-creek-harbour`.
   - Database has two active gallery records: Emaar CMS `28699_property_Main_Image_2441738176.jpg` (known-unavailable URL family), and project-labelled official VR-tour JPG `HARBOUR-GATE_1057x595_VR.jpg`.
   - Current production server-rendered HTML shows **one** gallery thumbnail after the Emaar CMS exclusion filter, not two distinct usable images.
   - A third legacy `properties.emaar.com/wp-content/uploads/2020/10/HARBOUR_GATE_HERO.jpg` gallery row is inactive.
   - No distinct, rights-cleared, browser-verified third gallery photograph was approved or published.

## Broader Step 3 media inventory
- 665/665 published, verified and enriched projects inspected at the media-record level.
- 70 have zero gallery rows surviving the *known broken URL pattern* filter: **69 Dubai + 1 Mumbai** (Godrej Bliss).
- 71 published projects have a `uae-cms.emaar.com/uploads/` hero-image source; 277 active media rows across 71 projects also use that previously confirmed broken URL family.
- These figures describe recorded URLs and static server-side filtering only; they do **not** certify successful image downloads or interactive browser display.
- Emaar's published asset-usage policy requires prior approval for the advertising uses it covers: https://www.emaar.com/en/emaar-asset-usage-policy .
- Godrej official project: https://www.godrejproperties.com/mumbai/residential/godrej-bliss/gallery .
- Emaar project: https://www.emaar.com/en/properties/harbour-gate .
- Current production HTML checks for both Way2Paisa project routes returned HTTP 200. This is not equivalent to an independent browser image-display check.

## Constraints preserved
- No new image activated, no duplicate or stock photograph substituted, and no third-party image licensed by assumption.
- No published project status, active inventory, property price or sale availability changed.
- No emails or developer requests sent.
- Step 3 **not certified**. Step 4 **not started**.

## Follow-up gates
- Godrej Bliss: obtain existing partnership reuse authorization/permission evidence and validate the original developer image in a real visitor browser before activating hero/gallery.
- Harbour Gate: secure a third distinct, project-specific rights-cleared image with stable direct image response; validate correct content in a browser; only then activate.
- Emaar estate-wide: restore approved project-specific assets for 69 Dubai pages with zero rendered gallery and independently verify Emaar image UX before closing Step 3.
