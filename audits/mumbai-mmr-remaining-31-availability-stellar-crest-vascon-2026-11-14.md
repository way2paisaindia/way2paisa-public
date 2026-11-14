# Way2Paisa — Mumbai/MMR publication, stock verification and Santacruz private pipeline

**14 November 2026 (IST)**  
**Market priority:** Mumbai / MMR; no Dubai work, no developer or customer emails, no unauthorised photos, no GoDaddy deployment, no unpublishing.

## Executive result

- **Published catalogue unchanged: 682 projects** (367 Mumbai, 119 MMR, 196 Dubai). Newly publicly activated **0**.
- **Active Mumbai/MMR inventory unchanged: 1,731**. Completed the outstanding `availability='Available'` review with **31 current active records across 14 projects** classified **`Confirm Availability`**. These were *not* called sold out or deleted; original numeric prices, project area, carpet/plot areas, configurations, active flags, source names, original URLs and **original inventory.last_verified** dates all retained. Updated `availability` wording and routine `updated_at` only.
- Created **14 dated per-project `public.project_sources` stock-audit records** under `remaining_31_official_price_not_allocated_inventory_20261114`, preserving 31 inventory UUIDs and old quotations/provenance. Exact preflight: 31 eligible, 14 projects, 0 source-less, 0 price-null, 0 recent verification dates and 0 configuration texts with a specific flat number. Write checks 31/31 corrected, 14 provenance records, 0 accidentally inactive.
- **Verified final stock labels:** of 1,731 active Mumbai/MMR rows, **0** still say unqualified `Available`, **495** are `Confirm Availability`, and **1,236** have other status strings. This **does NOT mean no flats can be sold**; it means that no previously `Available` row has freshly confirmed a numbered unit with an inclusive promoter-issued quote. Project-level / configuration-level headline prices remain visible as indicative offers with confirmation required.
- **One new PRIVATE research listing created:** PCPL Stellar Crest, Santacruz West, MahaRERA **PM1180002600436**.
- **Two existing PRIVATE listings enriched:** Platinum Stellar, Santacruz West **PR1180002600268**; Vascon Onyx Residences, Santacruz West **PM1180002601508**.
- **One new developer profile added:** Vascon Engineers Limited, https://www.vascon.com/, separately distinguished from `vascon.in` authorised-channel-partner marketing source. Existing Platinum Corp and Pranav corporate developer profiles reused.
- **19 dated project-source records for private project research:** Platinum Stellar **8**, PCPL Stellar Crest **7**, Vascon Onyx **4**. Including availability audits, **33 dated project_sources records** added. No project prices or media activated.
- **Published Mumbai/MMR checker remains:** 486 projects, **13** flagged (13 incomplete approved hero/gallery, including **9** exact configuration inventory gaps). Not bypassed with unverified photos or fabricated price.

## 1. Final 31 "Available" label corrections (14 projects)

The original direct, corporate or marketing prices have their own source URL and prior October verification timestamp. This pass distinguishes *project type starting price* from *a currently contractable numbered flat/plot*. The exact dates and old records are saved in each project's immutable source-audit text, not discarded. Project groups affected:

| Market/project | Count | Why `Confirm Availability`, not `Available` |
|---|---:|---|
| Mahindra Happinest Kalyan-2 Project B | 5 | General Mahindra corporate under-construction catalogue has project and category prices; no current specified flat-wise allocation and full cost sheet for 1BHK B/C/E or 2BHK A/B. |
| Mahindra Happinest Kalyan Project A | 1 | Developer ready-project catalogue confirms overall offer but no specific 547.45sqft named 2BHK written allocation. |
| Mahindra Vista Phase 2, Kandivali East | 3 | Developer corporate catalogue provides broad starting-price marketing, not specific 628/1004/1450sqft builder held flats under current written quote. |
| Raheja Residency Tower R, Malad/Goregaon East | 5 | Developer official `https://www.krahejarealty.com/raheja-residency-malad-east-tower-r` advertises 1BHK from ₹1.46Cr++, 2BHK ₹2.25Cr++, 3.5BHK ₹3.80Cr++, 4BHK ₹3.99Cr++ with carpets, but no currently available numbered flat. Two different 1BHK carpets of 491 and 619 sq.ft share same starting price in historic inventory; do not claim either is a real assigned unit at ₹1.46Cr. |
| Shapoorji Pallonji Northern Lights Thane | 2 | Project-wide 2/3BHK ₹1.80Cr* all inclusive starting, tower, floor and views affect final price; dated 2025 booking campaign copy still on page. Current 3BHK 1,181sqft ₹3.05Cr quote must be promoter-unit-checked. |
| Ashar Arize, Thane West | 2 | Prior Ashar campaign page returned empty content on live source fetch, so old Oct 1/2BHK price was **not** recertified; a broken source does not mean sold out, but cannot prove currently bookable stock. |
| MJ Shah Centrio NX Phase 1 | 3 | Original branded campaign page returned empty content; no fresh named-flat promoter quote for 1/2BHK variants. |
| Sushanku Avenue 37, Goregaon West | 3 | Three 2BHK quotes are historical carpet × promotional per-square-foot calculations, not currently available numbered units. Project first-party page describes floor plans but not a signed precise unit price. |
| Trump Tower Mumbai | 2 | Lodha Trump Tower price route currently renders Lodha Park umbrella ₹9.48Cr+ in search/nav, **not** a specific Trump Tower 3BHK 1356sqft ₹9.95Cr or 4BHK1583sqft ₹11.65Cr current available flat. Historic prices preserved, never replaced with broad Park entry price. |
| Rustomjee Ashiana Juhu | 1 | Rustomjee first-party site advertises project starting from ₹10.50Cr inclusive and explicitly says final individual flat prices vary with floor/type; no current numbered 1,578sqft 3BHK builder quotation. |
| Rustomjee The Panorama, Bandra West | 1 | Rustomjee first-party site project 4BHK 2,537sqft starting from ₹35.22Cr all-inclusive but not a numbered available flat. |
| Ajmera Arham | 1 | Prior project microsite unreachable in fresh check; October quote 4BHK1928sqft ₹7.65Cr not reverified as named unit. |
| Runwal Malabar, Malabar Hill | 1 | Developer project landing page does not publicly issue a current allotted 7,500sqft Private Mansion ₹33Cr cost sheet. |
| Ruparel Urbana Kurla East | 1 | Partner/project marketing site did not furnish current numbered 2BHK595sqft ₹1.59Cr sale allotment. |

Total: 31. Distinguish the dated quote (still retained) from still-unsold unit status; never report live buyer quotations as guaranteed or recent simply because a general developer page loaded.

## 2. Private Platinum Stellar — substantially upgraded, not duplicated

Existing private `platinum-stellar-santacruz-west`, MahaRERA **PR1180002600268**, legally `PLATINUMCORP ELEGANT RESIDENCES PRIVATE LIMITED`, developer brand **Platinum Corp** linked to its existing profile. First-party https://platinumcorp.in/ongoing-projects.html current read-only fetch lists `PLATINUM STELLAR — SANTACRUZ WEST` as ongoing; a guessed `/platinum-stellar.html` path was 404 and **not** stored as a source.

RERA-derived https://askrera.com/projects/platinum-stellar-pr1180002600268/ shows **39 total residential homes with 11 rehab allocations**, original completion **31 Dec 2029**. Other derivative sources https://gharkundli.com/projects/7450 report an automatic four-month shift to **30 Apr 2030**; current private `possession_date` retained Apr30 with an explicit original-versus-reported-extension disclosure because individually signed revised registration certificate not inspected. Historic Jul booked reports disagree (0 vs 3); neither can be construed as today's developer stock.

Housing.com marketing https://housing.com/in/buy/projects/page/363253-platinum-stellar-by-platinumcorp-elegant-residences-private-limited-in-santacruz-west lists 1,230–2,430sqft 3/4BHK price on request. SquareYards https://www.squareyards.com/new-launch-projects-in-santacruz-west-mumbai markets 3BHK1,230sqft ₹9.84Cr and 4BHK2,430sqft ₹19.44Cr. MPE https://www.mumbaipropertyexchange.com/project/platinum-stellar-santacruz-west/33983 instead offers 4BHK 2,500–2,660sqft about ₹16.25–17.29Cr and larger 5/6BHK. The product type and price bases are materially inconsistent. No current promoter-issued named flat quote or approved media rights established. **Still private** `active=false`, `verified=false`, `min_price=NULL`, 0 active inventory/media; 8 dated sources added.

## 3. NEW PRIVATE PCPL Stellar Crest — proper mixed statutory scope

New `pcpl-stellar-crest-santacruz-west`, registered **PM1180002600436**, legal promoter **Pranav Constructions Limited**, existing market Pranav corporate developer profile linked but distinct legal suffix noted. Location **Station Road, Santacruz West** per RERA (Housing.com incorrectly labels Santacruz East). Filed on **15 May 2026**; original declared completion **10 Oct 2029**. https://reradata.in/maharashtra/projects/PM1180002600436/pcpl-stellar-crest-andheri reports a four-month shift to **10 Feb 2030**, without a separately inspected individual amended certificate. Original stored `possession_date` Oct10, with current-derivative extension caveat.

MahaRERA derivative https://reragenie.com/p/pcpl-stellar-crest-santacruz-west-kjel472m/ shows **47 registered premises (25 residential, 22 nonresidential)** in one building and **35 rehab allocations** in the mixed registered project. **Never** imply 47 saleable apartments or even 25 saleable apartments; rehab may span residential or other categories and the promoter-held flat numbers require a documented schedule.

This is legal due diligence, *not wrongdoing*: the filed derivative reports a declared **₹33Cr secured charge in favour of ICICI Home Finance Limited**, a CERSAI matching discrepancy, and **one filed case 1872/2015 at Mumbai City Civil Court Dindoshi**. Obtain up-to-date case status, title, mortgagee NOC, sanctioned plans and registration documents before a buyer considers booking. Secondary Housing.com says 1/2/3/4 BHK, price on request; Houssed/MagicBricks supply inconsistent 2/3BHK starting-rate marketing, not builder allocated stock.

No speculative precise coordinates, current price, inventory, floorplan or commercial-gallery permission entered. `active=false`, `verified=false`, `min_price=NULL`, 0 active inventory/media. Seven dated source records preserve full audit.

## 4. Private Vascon Onyx — correct primary-versus-partner source

Existing `vascon-onyx-residences-santacruz-west`, MahaRERA **PM1180002601508**, registered 11 Aug 2026, original declared completion **30 Jun 2030**, mixed three-wing legal scope, **96 residential plus six other units** from prior registered-phase source.

Added brand profile **Vascon Engineers Limited** at corporate https://www.vascon.com/ and linked it to this *private* project. The separately branded https://vascon.in/projects page **explicitly says it is NOT the developer official website** and belongs to authorised MahaRERA channel partner Mr Vinay Nagabhushanam Machha A51700021052. It may legitimately market Onyx but is not proof of developer-issued saleable named units, project images or current promoter quotation. The genuine corporate site does **not** show a first-party Onyx Santacruz unit-level current price sheet in inspected pages. Existing RERA-derived project source retained; four extra dated sources added distinguishing the two domains and legal identity.

Still private, `min_price=NULL`, zero active inventory/media. Do not misidentify `vascon.in` as promoter-primary or assume prices/photographs are authorised for Way2Paisa commercial use.

## 5. Hiranandani Sands private Coral phases not promoted without launch

Existing Coral Bay `PP1270002600903`, Coral Court `PP1270002600904` and Coral Nest `PP1270002600911` remain private and correctly scoped RERA-specific plots. Current third-party Hiranandani launch reports (November 2026) say first-party developer has not yet opened individual Coral-phase launch; Hiranandani community account is teasing upcoming Sands releases. Latest developer site fetch timed out, so a fresh first-party launch status **could not** be independently certified in this cycle. No general Sands ₹2.49Cr master price applied to any of these phases. No unit/plot numbers or media activated.

## 6. Read-only website and post-write checks

SQL after all writes:
- **Published: 682** (Mumbai 367, MMR 119, Dubai 196)
- **Active Mumbai/MMR inventory: 1,731**; `Available=0`, `Confirm Availability=495`, other descriptions `1,236`.
- **Project completeness flags**: 13 published Mumbai/MMR projects, including nine missing configuration-level inventory, and 13 missing approved original hero/gallery evidence.
- 31 legacy Available label changes, 14 dated provenance records, zero active rows deactivated.
- 1 private project created (PCPL), 2 private projects enriched (Platinum Stellar, Vascon Onyx); 1 Vascon developer profile created; 19 private source records added. Private records no listed numeric `min_price` or active inventory/media. No duplicated published RERA IDs for these three registrations.

Independent read-only production QA:
- https://www.way2paisa.in/projects/raheja-residency-tower-r-k-raheja-goregaon-east — original 491–619sqft ₹1.46Cr 1BHK, 770sqft ₹2.25Cr 2BHK, 1307sqft ₹3.80Cr 3.5BHK, 1549sqft ₹3.99Cr 4BHK, with `Confirm Availability`.
- https://www.way2paisa.in/projects/rustomjee-ashiana-juhu — original 1578sqft ₹10.50Cr with `Confirm Availability`.
- https://www.way2paisa.in/projects/trump-tower-mumbai — original 1356sqft ₹9.95Cr and 1583sqft ₹11.65Cr, with `Confirm Availability`; floor plans remain visible.
- https://www.way2paisa.in/projects/pcpl-stellar-crest-santacruz-west — public **HTTP 404**, as required for private project. PCPL, Platinum Stellar and Vascon Onyx slugs all **absent from live XML sitemap**.

**Open site terminology / release blocker:** GitHub current project page still has static kicker `AVAILABLE CONFIGURATIONS` although price row may correctly say `Confirm Availability` or `Sold Out`. This label can mislead buyers; a neutral `PROPERTY CONFIGURATIONS` or `CONFIGURATIONS & PRICING` would be more accurate. Do **not** deploy a GitHub-only change without authenticated GoDaddy/Airo source reconciliation. Two prior draft PRs also remain unmerged: [#17 land status wording](https://github.com/way2paisaindia/way2paisa-public/pull/17) and [#20 mixed villa/plot size](https://github.com/way2paisaindia/way2paisa-public/pull/20). GoDaddy premium runtime must be preserved with complete test of homepage, project categories, admin/CRM and lead form before release.

## Next work

1. **Publish new Mumbai/MMR listings only after** independent promoter-specific floor/flat or numbered plot, RERA carpet, price/all-inclusive fee confirmation, saleable ownership/sanctioned plans and license-cleared correct project media. Focus the high-intent Bandra/Santacruz/Khar and wider Mumbai/MMR pipelines, not Dubai/Emaar photos.
2. Resolve the **13 published hero/gallery licensing issues**, nine exact config inventory gaps, and previously noted live-area/status PRs through a safe GoDaddy source workflow. Avoid sharing unverified photographic rights.
3. Keep completed catalogue counts verifiable via sitemap and Supabase, compare Google Search Console refreshed indexing data when authorised; don't claim indexing increases without a current source.

**No published project created, no existing project deactivated, no price or area modified, no emails or developer requests sent, no charge incurred, no live deployment.**
