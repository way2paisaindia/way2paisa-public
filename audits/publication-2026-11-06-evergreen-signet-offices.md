# Way2Paisa — 6 November 2026: three source-verified listings added

**Scope:** continue real project publication without modifying existing stock or prices; protect the free Cloudflare migration count guard; no emails/outreach; do not modify GoDaddy DNS or the Vercel production repo branch.

## Direct Supabase verification

| Production data | Before | After |
|---|---:|---:|
| Active + verified + complete published projects | 673 | **676** |
| Active inventory configurations | 2,394 | **2,402** |
| Active media | 3,173 | **3,173** |
| Private projects | 1,161 | **1,161** |

**Three** distinct new project records and **eight** new developer-advertised starting-offer inventory rows, with **21 source evidence rows**. All inserts were in guarded SQL CTE transactions that returned the expected project id and source/inventory counts. Each project page returned HTTP 200, canonical, correct SEO title and official registration identifiers. Source photos have **not** been copied; the neutral no-verified-gallery fallback remains. No existing project, price, unit record or media changed. After inserting, customer-facing overview text on **only those three new project IDs** was shortened to 437–505 characters; all statutory caveats remain in internal enrichment notes and field-level source records.

### Casa Evergreen — residential, Vikhroli West

- Project ID: `04d15e64-cbb5-4790-a0d2-84e41acdae4d`. URL: https://www.way2paisa.in/projects/lodha-casa-evergreen-vikhroli-west
- Developer direct: https://www.lodhagroup.com/projects/residential-property-in-mumbai/casa-evergreen-vikhroli
- Price page: https://www.lodhagroup.com/projects/residential-property-in-mumbai/casa-evergreen-vikhroli/price
- From-price: **2 BHK with deck ₹1.65 Cr+**, one `inventory.price=1.65` in INR crores. This is a first-party **collection-wide threshold**, not a numbered, unbooked, available Tower C1 or C3 flat. No certified RERA carpet-to-price pairing (structured carpet NULL). No additional 2.5 BHK price invented from secondary listings.
- Developer groups two different registered projects: **Tower C1 P51800046322** and **Tower C3 P51800054475**. Distinct statutory revised deadlines, **C1 December 2028**, **C3 December 2029** with independent October 2026 derivative suggesting an automatic extension to **April 2030**. We deliberately leave `possession_date=NULL` at collection level; no single date represents both towers. Sources: https://www.rerainspector.com/projects/39154/P51800046322 ; https://reragenie.com/p/vikhroli-tower-c3-vikhroli-x82asvhb/ ; https://gharkundli.com/projects/6056
- Relevant risks: C1 filings show two MahaRERA complaints, one potentially open, plus further-CC check; C3 filing reports a Bombay HC matter and environmental-clearance-related extension. Historic booking snapshots are *not* current saleable stock. The current 2026 detailed C3 derivative lists a case even though its own summary says zero litigation. Never misstate this as unconditional legal clearance.
- No exact tower GPS, no unlicensed external assets, no claims of ready-to-move or confirmed individual stock. 8 field-level provenance records.

### Lodha Signet — commercial offices, Vikhroli

- Project ID: `af7edfe0-886c-41e4-94ee-307f82ba8f7c`. URL https://www.way2paisa.in/projects/lodha-signet-vikhroli-offices
- First party: https://www.lodhagroup.com/projects/commercial-property-in-mumbai/lodha-signet-vikhroli
- Prices: https://www.lodhagroup.com/projects/commercial-property-in-mumbai/lodha-signet-vikhroli/price
- Three developer-labelled offers, all stored in Indian crores, **Office 485 sq.ft ₹1.90 Cr+, Office 630 sq.ft ₹2.35 Cr+, Doctors' Enclave 630 sq.ft ₹2.40 Cr+**. The advertised `sq.ft` is **not certified RERA carpet** by this developer price page; areas only in named configuration, `carpet_area_sqft=NULL` for all rows. Exact numbered-unit availability, clinic permission, all-inclusive price and final cost sheet remain unverified.
- MahaRERA **P51800047504**, legal promoter Lodha Developers Limited. A **commercial** registration separate from residential Casa Evergreen's two RERA phases. Statutory record says target moved **June 2027 → June 2029**, two extensions; historical 634/907 registered units booked as of mid-2026 does not imply live unsold stock. Sources: https://reragenie.com/p/lodha-vikhroli-signet-vikroli-y7isyn5c/ ; https://gharkundli.com/projects/5117
- Same honest no-photo fallback; no fabricated GPS. Six source records. Page SEO title `Lodha Signet Vikhroli Offices | From ₹1.90 Cr`.

### Lodha Signet — commercial offices, Matunga

- Project ID: `923035f2-f168-4d15-893a-a6b85e812660`. URL https://www.way2paisa.in/projects/lodha-signet-matunga-offices
- Official project and commercial description https://www.lodhagroup.com/projects/commercial-property-in-mumbai/lodha-signet-matunga and direct price matrix https://www.lodhagroup.com/projects/commercial-property-in-mumbai/lodha-signet-matunga/price .
- Four developer-advertised offers in Indian crores: **300 sq.ft Office ₹1.75 Cr+; 405 sq.ft Office ₹2.30 Cr+; 622 sq.ft Office ₹3.45 Cr+; 300–622 sq.ft Doctors Enclave from ₹1.80 Cr+**. These dimensions were *not certified as RERA carpet* by the price page; `carpet_area_sqft=NULL`. There are no specific-numbered current allocations, written all-inclusive prices or sanctioned-clinic-use confirmations.
- MahaRERA **P51900077196**, legal promoter Lodha Developers Limited, under-construction commercial project. Originally filed Sep 2029 completion; October 2026 derivative adds a 4-month general extension to **Jan 2030**. No single guaranteed contract possession stated.
- **Three promoter-filed court matter references** are reported by statutory derivative https://malki.in/mr/project/matunga-signet-p51900077196/ : Bombay City Civil 2646/2015; NCLT Mumbai 45/2022; NGT Pune 21/2023. Matter details and present outcomes require a property lawyer. Other statutory derivatives can mislabel "Bhosari" as Pune despite official Matunga and Mumbai City pincode 400022, or show zero litigation; prefer official developer locality and disclose reported cases instead of asserting a clean slate. Also check CC for actual office floor and OC status. Regulatory sources: https://www.rerainspector.com/projects/47523/P51900077196 ; https://gharkundli.com/projects/1149 .
- Seven provenance records. No hero, gallery or inaccurate map coordinates; honest neutral fallback. SEO title `Lodha Signet Matunga Offices | From ₹1.75 Cr`.

## Website, sitemap and migration

- Initial live HTML verification: all **three newly created** project routes responded HTTP **200**, canonical correct, correct title, RERA and starting price; no-gallery notice visible.
- Initial sitemap response remained cached on **674** project URLs, including only Evergreen; this is *not* evidence Google indexation of any new URL. Repeat after cache refresh and record final figure separately.
- **Cloudflare migration remains isolated** in `migration/cloudflare-free-static-first`. The fail-closed `MIN_PUBLISHED_PROJECTS` exporter guard was updated from **673 to 676**, and the README reflects **676 published / 2,402 active inventory / 3,173 active media / 1,161 private**. Fixture CI proves build correctness only; **no live Cloudflare Pages preview exists in this ChatGPT session**, and the customer-facing production site remains on Vercel until full premium visual, content, admin, enquiry and SEO parity is independently verified.
- A green GitHub Actions run after this commit can validate the *offline fixture*, not production-data import or automatic future update. No DNS, nameservers or paid hosting plan touched.
- Separate production focus remains **Step 3 image rights and in-browser QA open; Step 4 on hold; no messages or emails sent**.

## Held candidates

- **Lodha Casa Magnolia** was researched but confirmed *already published* at `lodha-casa-magnolia-palava` (MahaRERA P51700020131), so no duplicate created.
- **Lodha Casa Belvedere Wing J** first-party collection price is not assigned to its specifically registered wing; historical statutory filing has **two declared litigation cases**, 2026 current booking changes and a revised deadline extending from Dec 2029 to Apr 2030 depending on derivative. Leave unpublished pending phase-specific quote/stock verification. Sources: https://www.lodhagroup.com/palava-city/projects/residential-property-in-dombivli/casa-belvedere-by-lodha/price ; https://reragenie.com/p/belvedere-j-hedutane-emkl06nb/ ; https://reradata.in/maharashtra/projects/P51700078768/belvedere-j-kalyan .

## Final production checks — completed after cache refresh

- The canonical public **https://www.way2paisa.in/sitemap.xml** responded **HTTP 200 with exactly 676 project URLs and 684 total URLs**, including all three newly published canonical slugs. This supersedes the initial cached 674-project sitemap seen immediately after the write. An independent READY Vercel production deployment `way2paisa-public-pzrdatitf-federalinfosystem-9302.vercel.app` returned the same counts and all three paths.
- Public project HTML verification on `www.way2paisa.in`: Evergreen, Signet Vikhroli and Signet Matunga all **HTTP 200**, expected SEO title, canonical, MahaRERA IDs, configured starting prices and no-gallery disclosure. Does *not* establish Google indexing or interactive browser photo behavior.
- Cloudflare branch's updated 676-project guard passed isolated GitHub Actions build and safety test: https://github.com/way2paisaindia/way2paisa-public/actions/runs/42215053177 . This test is synthetic; the external free hosting account and custom domain are not switched.
- Latest known verified DB: **676 published, 2,402 active inventory, 3,173 media, 1,161 private**. No old prices or stock modified, no emails or outreach, Step 3 unresolved images open and Step 4 on hold.
