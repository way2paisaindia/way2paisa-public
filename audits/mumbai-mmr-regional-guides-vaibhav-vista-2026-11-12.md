# Way2Paisa — 12 November 2026 continuation: live regional-guide links and PCPL Vaibhav Vista private enrichment

## Outcome
- Published projects **682** in Supabase: **Mumbai 367 / MMR 119 / Dubai 196**.
- **New projects activated this cycle: 0.** No existing published projects removed, no active inventory or selling-price edits.
- Verified one code navigation mismatch; committed two GitHub changes.
- Significantly enriched **one** unpublished Mumbai project, PCPL Vaibhav Vista. Added **7** dated source notes and **5** original project-specific image references, **all quarantined** (`active=false`). No public images or stock published.

## 1. Regional buyer-guide homepage navigation / code vs live

GitHub `main`, `app/components/HomeClient.js` previously lacked homepage links to the two already-live pages:
- https://www.way2paisa.in/solutions/thane-residential-property
- https://www.way2paisa.in/solutions/navi-mumbai-residential-property

Commits to GitHub `main`:
- `5e48a02055a879232fb70d94c2d8f8d43cb73f5c`: added visible inline Thane and Navi Mumbai regional links under Mumbai/MMR zone cards and footer links.
- `8451c4ad90ae63ca81a869423353fc31598aab91`: responsive premium-themed regional link styles in `app/globals.css`.

Both changes were fetched back and confirmed present, unique in source.

**Important subsequent QA correction:** A live-production read of `https://www.way2paisa.in/` found an **existing** dedicated 'PROPERTY BUYING GUIDES — Explore homes in Thane & Navi Mumbai' section with both destination URLs linked already. The missing-link observation applies to GitHub `main` *before the commits*, **not to production**. The committed code aligns GitHub source discoverability but GoDaddy live source currently differs from GitHub. Do not blindly claim these commits deployed or that new live links appeared as a result. The two destination guides themselves are live, canonical and indexable from prior QA.

This divergence also warrants care before manually triggering GoDaddy GitHub Pull, as that could alter the richer existing live-site guide section. Preserve production appearance and test preview before publishing; reconcile source differences.

## 2. PCPL Vaibhav Vista — improved private project record

Existing private project:
- `pcpl-vaibhav-vista-andheri-west`, MahaRERA `PR1180002500233` (registered as 'Redevelopment of Daulatrao Desai Nagar CHSL').
- Under construction, Model Town near Versova Metro, Andheri West.
- Stored original registered completion date **14 Nov 2028** preserved; some newer third-party reports interpret a four-month extension to **14 Mar 2029**, not certified as amended official filed date here.
- Developer marketed 2 BHK **700 sq.ft** and 3 BHK **989 sq.ft** on https://www.pranavconstructions.com/vaibhav_vista/; area designation basis not specified.
- Pranav Constructions corporate homepage has a **first-party visual banner** marketing Vaibhav Vista 2 & 3 BHK **starting ₹3.19 Cr ALL INCLUSIVE**: https://www.pranavconstructions.com/ .
- Third parties diverge: MPE 2 BHK 700 sq.ft **₹2.59Cr** and 3 BHK 1015 sq.ft **₹3.75Cr** labelled indicative (https://www.mumbaipropertyexchange.com/project/vaibhav-vista-andheri-west/31668); Housing.com uses wider layouts 600–1015 sq.ft and different prices (https://housing.com/in/buy/projects/page/347545-pranav-vaibhav-vista-by-pranav-constructions-pvt-ltd-in-andheri-west).
- Official ₹3.19Cr project-level starting quote is NOT assigned to a specific RERA flat/carpet area or currently unsold allocation. Stored only under `price_original` with explicit caveat. `min_price` remains **NULL**; no `inventory` row created or activated.
- Developer first-party amenities recorded: Yoga Deck, Senior Citizen Area, Party Deck, Toddlers Play Area, Gymnasium.
- Private description, SEO title/description, provenance, notes and `enrichment_status` updated to `hold_current_promoter_allocated_unit_price_registered_carpet_basis_and_licensed_media`.
- **Seven** new project source rows saved: first-party marketing, dedicated project page, two contradictory price-portal sources, registered unit-type schedule, legal charge/case summary, later autoextension interpretation.
- **Five** project-specific first-party media URLs staged as `public.project_media` with `active=false` and `quarantined_first_party_media_republication_permission_and_browser_delivery_unverified`: developer tower/day elevation (hero), night elevation and lobby, living room, bedroom interiors. No third-party re-use rights inferred merely because published on promoter site.
- Latest MahaRERA-derived unit schedule (https://www.rerainspector.com/projects/55718/PR1180002500233) lists 2 BHK **600–700 sq.ft** and 3 BHK **1015 sq.ft carpet**, diverging from developer marketed 3 BHK 989 sq.ft whose basis is unspecified. Require actual saleable unit, legal carpet field and approved plan match before activation.
- ReraGenie summary (https://reragenie.com/p/redevelopment-of-daulatrao-desai-nagar-chsl-ambivali-bh7rfmps/) flags one disclosed litigation case and an approx. **₹23Cr** lender charge in favour of Bajaj Housing Finance, with its CERSAI information flagged for reconciliation. No allegation of illegality; promoter’s latest official filed documents, lender NOC and independent title check are necessary for any specific buyer.
- Current ReraData listing (https://reradata.in/maharashtra/projects/PR1180002500233/redevelopment-of-daulatrao-desai-nagar-chsl-andheri) reports six recorded booked units as of Nov2026, not actual current promotional allocations.

Post-write SQL confirms project **active=false, verified=false, min_price=null, hero_image_url=null, 0 active inventory, 0 active media, 5 quarantined media, 7 new evidence sources**.

## 3. Other new-project checks

Web research of new Andheri West 2026 registrations: Spenta Anthea was already published under `spenta-anthea-andheri-west` (do not duplicate). Sheetal Kamdhenu did not yet have a MahaRERA registration as of 3 Nov2026, per MPE; don't create publicly bookable project without registration. Vaibhav Vista is already a private candidate; source corrected rather than duplicate created.

## 4. Release status

- **682** published (unchanged), **0** new publications.
- Home link source commits are **not independently verified deployed on GoDaddy**. Live homepage already links to both guides via another existing section.
- No emails, developer outreach, lead submissions, WhatsApp campaigns, paid hosting, site unpublishing, price changes or live gallery uploads.
- Emaar Dubai image issue remains deferred per instruction.
- Next gates: reconcile live Airo / GitHub homepage before any manual GitHub pull; obtain current developer-confirmed cost sheet, valid RERA carpet and legal approval package for a Vaibhav Vista unit; obtain permitted distinct images; then allow publication only when the database completeness gate passes.
