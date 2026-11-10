# Way2Paisa — Mumbai/MMR growth-priority launch audit
**Date:** 10 November 2026 · **Scope:** Mumbai + MMR only

## Management direction
95% of business expected from Mumbai/MMR. Pause all Emaar photo / GoDaddy release work pending a separate future request. Focus new first-sale residential, commercial, villas and plots in Bandra–Colaba, Juhu–Borivali, Sion–Wadala–Parel–Worli, Powai, Ghatkopar, Thane, Navi Mumbai and surrounding MMR. Preserve existing public listings and stock. Do not contact developers or send email.

## Applied changes to connected Supabase
- **Seven** truly absent MahaRERA-anchored Mumbai/MMR projects were inserted into `public.projects` as **private research**: `active=false`, `verified=false`, no active inventory, no invented prices, no unlicensed media, no SEO public publication.
- New **Notandas Realty** profile inserted `active=false` (no unverified logo) to prevent public developer search clutter. Note official **marketing brand** is not the statutory legal promoter of the two associated Juhu projects.
- **23 dated `public.project_sources` rows were added** in this continuation: 14 first-wave Mumbai project source reviews, 6 MMR references and 3 for existing internal canonical records; check: first-wave source inserts 17 + second-wave 6 = 23. Source rows are internal publication-evidence and explicit holds, not confirmation of bookings or image licensing.
- Existing private **Bhoomi Simana Building 2 (C Wing)** `PR1170002500564` rechecked and documented, not duplicated. Existing published **Vaswani Seascape** `PR1180002502464` verified as already canonical Juhu listing, with statutory vs marketer possession distinct, prices and images untouched.
- Final counted `1849` total projects, `681` published (unchanged), `1168` private (increased seven), `366` published Mumbai, `119` published MMR, `2413` active inventory, `3174` active media.
- Critical RLS public QA: `BEGIN READ ONLY; SET LOCAL ROLE anon;` returned **0 of seven private records publicly visible** and **681 total public records**; RLS gate correctly protects unpublished rows.

## Five NEW Mumbai private discoveries
| Project | MahaRERA | Locality / Market | Legal/promoter and publication holds |
|---|---|---|---|
| **Notan DC** | `PR1180002501929` | Juhu NS Road 10 · residential | Notandas Realty *brand*, statutory **SSD Housing LLP**. Last registry-derived apartment schedule incomplete/0 registered; no confirmed price/unsold carpet/photo license, original Sep 2029 with eligible 4-month later note not yet primary certificate |
| **Notan House** | `P51800077910` | Juhu JVPD · commercial offices | Notandas Realty brand, statutory **Notan House Private Limited**; 40 registered, 31 previously booked (dated April 2026), remaining nine not developer-confirmed saleable; no current specific office quote or photo rights |
| **Promesa Fremont** | `P51900055088` | Lalbaug/Parel · residential | Developer direct identity/site. RERA statutory **Dec 2030**, different from third-party possession campaign; 2–4 BHK/₹2.69–7.30Cr indicative MPE not promoter-allocated/saleable stock, media not licensed for reuse |
| **Pranav Joeville** | `PR1180002501744` | Orlem, Malad West · residential | RERA **The Redevelopment of Joe Henriques Bungalow**, legal **Pranav Constructions Limited** (marketing Joeville). 15 registered/6 booked in recent derivative; unbooked does not equal current allocated first-sale price or stock. No approved gallery |
| **Namo Whispering Bliss** | `PM1180002602118` | Malad East · mixed-use | Legally **Parvati Madhav Realty LLP**. Mixed residential/shops; independently verify carpet and legal split, developer brand association, costed current stock and pending legal/case details. No public price or gallery |

### Primary and independent references
- Notan DC official: https://www.notandasrealty.com/projects/notan-dc/ ; registry-derived https://reragenie.com/p/notan-dc-juhu-vile-parle-west-py6okv5o/ ; extension secondary https://gharkundli.com/projects/67
- Notan House official: https://www.notandasrealty.com/projects/notan-house/ ; registry-derived https://reragenie.com/p/notan-house-jvpd-scheme-vile-parle-west-2suhc9a2/
- Promesa Fremont official: https://promesarealty.com/project/promesa-fremont/ ; registry-derived https://www.squareyards.com/mumbai-residential-property/promesa-fremont/245719/project/rera/p51900055088
- Pranav Joeville legal registration: https://reradata.in/maharashtra/projects/PR1180002501744/the-redevelopment-of-joe-henriques-bungalow-borivali ; MPE market https://www.mumbaipropertyexchange.com/project/joe-ville-malad-west/33151
- Namo Whispering Bliss legal: https://gharkundli.com/projects/175498 ; current market (not promoter allocation) https://www.mumbaipropertyexchange.com/project/namo-whispering-bliss-malad-east/34013

## Two NEW MMR private discoveries
| Project | MahaRERA | Locality / Market | Legal/promoter and publication holds |
|---|---|---|---|
| **Rudra Dream City** | `PM1270002500392` | Survey 9/5 Taloje Majkur, Upper Kharghar/Panvel · marketed 1–3 BHK | RERA legally **SAI ASHIRWAD** partnership, project classification **Mixed**; Rudra developer-marketing brand not proven identical statutory entity. Existing developer `Rudra Techno Construction Homes LLP` must **not** be wrongly mapped. Filed coordinate **19.084949437571222,73.09589032608073** represents parcel approximate, not entrance. Marketing from ₹33.67 Lakh is NOT costed available apartment. Original MahaRERA June 2030. Private category `other` until use verified |
| **Sugee Lake District — Lake Trade Centre I** | `PC1331012601435` | Sector III / Panchpakhadi, Thane West · commercial | Sugee Group brand, registered **Sugee Enterprises Private Limited**, Aug 2026 new phase, 20 registered 4-floor units, original Dec 2033. **Critical statutory SHOP vs office marketing distinction**: RERA derivative 760–6285 sq.ft shop carpets, while MPE commercial office marketing 800–6000 sq.ft ₹2.64–19.8 Cr. 0 historically booked is not current availability. Do not assign unverified office-usage/flat prices to statutory shop units. Large developer-masterplan acreage must not be attributed to one registration. Private category `other`, no images or unverified map pin |

### MMR source references
- Rudra marketing: https://www.rudra-dream-city.com/ ; RERA derivative: https://www.squareyards.com/navi-mumbai-residential-property/rudra-dream-city/340626/project/rera/pm1270002500392
- Sugee official developer press release: https://www.prnewswire.com/in/news-releases/sugee-lake-district-to-shape-thanes-next-chapter-of-commercial-growth-302861592.html
- Sugee RERA: https://www.rerainspector.com/projects/65560/PC1331012601435 ; MPE marketing: https://www.mumbaipropertyexchange.com/project/sugee-lake-district-thane-west/33906 ; partner microsite https://sugee-lake-district.com/contact-us (not primary licensed media).

## Existing private near-ready workstreams evaluated and correctly held
The database has no newly promotable Mumbai/MMR private candidate with current confirmed *active* exact inventory. The 21 one/two-gap private cases with official gallery or other progress have **zero active available inventory**, often intentionally deactivated as secondary-only, sold-out or master/multi-phase duplicates. Examples:
- Navkar Palace Andheri West `PR1180002500275`: official gallery contains pictures labelled *Navkar Residency B Wing*, not 3 distinct correct Palace photos; individual promoter costed 2/3/4BR stock unresolved.
- Chandiwala Pearl Icon Malad East `P51800079553`: statutory promoter **Bahist Enterprises Pvt Ltd** versus Chandiwala branding; third-party cost sheet and carpet disagreement, unlicensed channel-partner gallery and official logo hold.
- H. Rishabraj Trident Juhu `P51800053505`: missing promoter saleable 3/4BR allocation + third distinct developer-controlled gallery photo.
- Buildarch Sakura Dadar W `P51900055573`: only one genuine project photo; panorama cube faces/floorplans are not a distinct photo gallery, current costed inventory unclear.
- Sandu Shilpadatta Chembur `P51800045569`: only one genuine developer project visual, current promoter allocation still unproven; do not substitute W2.0 images.
- Choice Ambe Shraddha Ghatkopar E `PR1180002500720`: developer official flat-price table is empty; possible same-name project in Kamothe is not equivalent. One developer hero photo only.
- Private master records Godrej Reserve, Piramal Revanta, Narang Privado and Kalpataru Srishti Namaah Wing A-G have separate **published canonical phase records**, do not duplicate or publish umbrella records.

## Order of next publication pushes
**Tier 1 high buyer demand**: Juhu, Bandra/Khar/Santacruz, Andheri, Dadar, Worli/Lower Parel, Chembur, Ghatkopar, Goregaon–Borivali. Direct current RERA + promoter inventory/price sheets and approved media required.
**Tier 2 priority**: Thane West, Navi Mumbai/Panvel, upper Kharghar/Taloja and high-demand commercial projects. For commercial, confirm legal office vs shops/retail and carpet/area metrics; don't use generic master-plan acreage.
**Tier 3**: Alibaug/Karjat/Khalapur villas and plots; verify registered plot-vs-bungalow legal scope, land tenure and current seller/title/right to sell.

No new **public** project activated this cycle because of non-negotiable current saleable inventory, exact carpet/unit and licensed media gates. Never invent unit/price merely to increase listing count. Database source references with `20261110_` are internal evidence only and do not authorize marketing as developer Book Now. No developer messages/emails, GoDaddy/Emaar follow-ups, DNS or hosting changes.
