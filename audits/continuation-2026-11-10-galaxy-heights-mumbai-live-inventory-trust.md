# Way2Paisa — 10 Nov 2026: Malad West Galaxy Heights live inventory-quality correction

## Priority
User prioritizes Mumbai/MMR (95% of expected business) and explicitly says **leave Emaar image issue and GoDaddy publishing issue for later**. This cycle focused on improving accuracy of existing Mumbai sales listings rather than inflating the private backlog. **No deploy, CDN purge, hosting/domain/DNS change, email or developer outreach.**

## External primary source — developer MPCHFL
Official Maharashtra Police Co-operative Housing Federation Ltd (MPCHFL) project pages checked 10 November 2026:
- **Tower III** RERA `P51800052922`: https://mpchfl.com/galaxy-heights-tower-iii/ ; **1 BHK SOLD OUT**, **2 BHK balcony homes from ₹88 lakh**, **RERA carpet from 523 sq.ft**, original registered possession December 2027. Developer says promotional price, taxes/statutory charges additional: https://mpchfl.com/terms-conditions/ . The price and carpet are separate **project minimums**, NOT necessarily the same allocated flat. Marketing text alternately says "Construction Status Completed / Full CC Received" and "Construction Completed 65% / Full CC Received": **do not infer full OC/ready possession** without independent confirmation.
- **Tower II** RERA `P51800077290`: https://mpchfl.com/projects/ and https://mpchfl.com/galaxy-heights-tower-2/ advertise **1/2/3 BHK available**, but only 1 BHK currently has costed published Way2Paisa category offer; dedicated developer Tower II page **₹58L** versus project index **₹62L**, no valid unit-by-unit carpet/price grid for 2/3 BHK. Keep ₹58L headline with clear confirmation required; do not fabricate 2/3BHK prices.
- **Tower I** RERA `P51800045503`: current https://mpchfl.com/projects/ marks **1BHK and 2BHK sold out**. Older /home1/ shows 1BHK available; newer source takes precedence; record held private until exact developer allocation contrary evidence.
- Site: New Malwani, Malad West, Mumbai. Tower registrations are distinct, no duplicate master/wing blur.

## Actual Supabase writes
**Tower III, already published**:
1. Retired (not deleted) active historical Housing.com `1 BHK 353 sq.ft ₹50.85L` `inventory.id=1f550ea8-4479-401a-8ffc-7993cb483d6a` as Sold Out; outdated `2 BHK 519 sq.ft ₹74.82L` `inventory.id=4f322737-cb82-4b65-ad6a-e2101dc6dcd2` as inactive below developer current first-party ₹88L.
2. Reactivated the existing `2 BHK, 523 sq.ft, ₹88L` historical inventory row `inventory.id=4f00ef2d-3705-4db7-bba9-aca3f0633527`; updated provenance to `official_developer_project_level_starting_offer_unallocated`, direct MPCHFL URL and new verification date. Availability text **explicitly states promo and carpet are two independent project minimums**, and exact unit + total cost must be reconfirmed.
3. Updated project min/max price `0.5085/0.7548 Cr → 0.88/0.88 Cr`. Standardized customer-facing `bhk_original='2 BHK'`, `price_original='2 BHK from ₹88 Lakh* (MPCHFL developer-advertised starting offer; taxes and statutory charges extra). Exact current flat and all-inclusive quotation on request.'`, and `carpet_area_original='2 BHK RERA carpet from 523 sq.ft onwards (developer starting area; specific available flat to be confirmed).'`. Older price/identity dispute notes preserved in `enrichment_notes` and inactive inventory, **not customer-facing**.
4. **Important live UI issue:** Read-only real-browser check initially showed corrected ₹88L / 523 sqft / only 2 BHK, and removed old offers, but **2 BHK badge erroneously 'Sold Out'** because its then-active long availability text included the substring **'1 BHK sold out'**. Deployed GitHub source `app/projects/[slug]/page.js` `publicAvailability()` matches any `/sold\s*out/` in an inventory availability string, without knowing which BHK it describes. Changed active 2BHK availability to `Developer-advertised 2 BHK category — enquiry open ...` with **no Sold Out substring**. Historical inactive 1BHK retains explicit sold-out label. 
5. A second real-browser check ~1 minute after the availability-wording change still showed 2 BHK 'Sold Out' despite correct Supabase row. The Next.js source has **`export const revalidate = 300`** and Supabase `fetch(... next: {revalidate:300})`, which could explain still-stale response (two caching layers); not a verified live correction until a later cache-expiry check. No purge/CDN/GoDaddy changes as instructed.
6. First-party dated source row `20261110_mpchfl_tower_iii_sold_out_1bhk_promoter_88_lakh_2bhk` recorded.

**Tower II published**: description revised to clarify official available 1/2/3 BHK categories but only exact 1BHK *promotional category* priced. Standard `bhk_original='1 BHK | 2 BHK | 3 BHK'`; 1BHK ₹58L price and inventory preserved. No 2/3BHK active stock invented. Dated source record `20261110_mpchfl_tower_ii_1_2_3bhk_current_categories`.

**Tower I unpublished**: explicit `enrichment_status='hold_mpchfl_galaxy_tower_i_1bhk_and_2bhk_sold_out_official_20261110_do_not_publish'`; no status `active` or public changes. Internal source `20261110_mpchfl_tower_i_all_configs_sold_out`.

## QA after changes
- Supabase `public.projects`: **681 published**, **366 published Mumbai**, **119 published MMR**. No newly activated entire project this turn.
- Active public `inventory` count **2,412** (net -1: two former active partner rows retired, one developer-backed 2BHK row active); no historic inventory deleted.
- `project_enrichment_gaps` still **[]** on published Tower II/III. Tower I private.
- `BEGIN READ ONLY; SET LOCAL ROLE anon;` confirmed **681** public projects and **one active Tower III unit**, **zero 1BHK** exposed as available for that project.
- Live QA run [first](https://agent.tinyfish.ai/runs/7492090d-bc53-48ee-9160-b4bf95853079): old prices absent, 2BHK ₹88L visible but badge 'Sold Out'; [second](https://agent.tinyfish.ai/runs/60615542-cdd9-41de-856d-b57534f8c774): immediately after availability text change, badge remained 'Sold Out' (likely cached; unconfirmed).
- **Important**: do not claim live badge resolved until a fresh browser check after the render/data cache refresh shows `Confirm Availability` or equivalent. Front-end regex will classify current corrected note as `Confirm Availability` once truly refreshed, based on GitHub code. There is no reason to push a GoDaddy deployment unless a future independent live test proves an additional bug.

## Next work
Recheck normal live site after its cache naturally expires, no forced purge. Focus Mumbai/MMR high-demand developer-first verified 2/3/4BHK allocations and current cost sheets/approved project photography, not unsourced private rows. Further published-site quality corrections should take precedence over misleading buyer offers. Never turn sold-out offers into current search results; always distinguish first-party project-level starts from exact allocated apartment prices.

## Final post-cache production read-only browser validation — PASS
A third independent TinyFish read-only live browser check **after natural cache expiry** completed, with exact [run evidence](https://agent.tinyfish.ai/runs/d683a5aa-c5b9-443e-ab1f-a50d15491034):
- Public canonical https://www.way2paisa.in/projects/galaxy-heights-tower-iii displays exactly **2 BHK, 523 sq.ft, ₹88 Lakh** in its inventory table.
- Live availability badge now correctly displays **"Confirm Availability"**, **NOT "Sold Out"**. This confirms the previous wrong badge was stale cached HTML/data after the earlier active inventory note mentioned a different sold-out configuration. No code deployment or forced cache refresh necessary.
- Historical 1 BHK ₹50.85L and 2 BHK ₹74.82L do not appear in live public inventory, and project summary says **2 BHK only**.
- No form submission, CDN purge, code change, hosting change or email occurred during any browser validation.
- As of this check, the Tower III production correction is **verified live**. Individual exact unit and final all-inclusive developer quote still require reconfirmation before booking; **"Confirm Availability" is the appropriate honest buyer-facing state**.
