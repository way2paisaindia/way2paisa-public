# Way2Paisa — Mumbai/MMR autonomous publication continuation
**Date: 11 November 2026**  · **Scope:** Mumbai and MMR only

## Mandate, controls and exclusions
User explicitly prioritizes Mumbai/MMR (~95% future business) over Dubai. Emaar photos and GoDaddy publishing platform remain **on hold**. Do not send any developer or support emails, migrate hosting, touch GoDaddy, change DNS, or move published projects/stock for speculative reasons. Maintain precise MahaRERA statutory identities, true RERA carpet versus developer total, unit-level promoter price validation, approved media reuse rights and a short clean customer-facing overview. Saved internal provenance never authorizes unverified public Book Now marketing.

## Actual connected Supabase writes
1. Inserted **two new genuine previously absent Mumbai/MMR projects into private (not published)** `public.projects` with Rustomjee existing developer mapping, locality, registration, original separate possession dates, public-developer marketing ranges labelled explicitly **unallocated** and detailed private hold flags.
2. Saved **11** dated `public.project_sources` evidence records: **4** Cleon, **6** La Familia, **1** existing already published Ashiana Juhu OC/regulatory conflict. No media, active inventory, price, active/verified/publication status edits on existing public projects.

### New private project A — high-intent Bandra East
**Rustomjee Cleon, Bandra East/BKC Annexe** (`rustomjee-cleon-bkc-annexe-bandra-east`), MahaRERA **P51800050269**, legal promoter **Keystone Realtors Limited**, developer marketing **Rustomjee**.
- Official primary website https://www.rustomjee.com/projects/residential/rustomjee-cleon-bkc/ verifies name/registration, under construction, 2-bedroom project-wide **starting ₹3.99 Cr**.
- Official residence plans https://www.rustomjee.com/projects/residential/rustomjee-cleon-bkc/residences/ show **2 BHK Wing A 659 sq.ft registered carpet** on floors 4–21 and **1 BHK Wing A 439 sq.ft**. Current official home highlights 2BHK; historical 1BHK floor plans do not prove currently saleable 1BHK inventory.
- MahaRERA-derived https://www.squareyards.com/mumbai-residential-property/rustomjee-cleon/219585/project/rera/p51800050269 lists legal promoter, declared registered completion **25 June 2027**, project type residential; independent RERA extracts disagree on 4 vs 110 units in top-level summaries (do not infer remaining marketable count from either).
- MPE https://www.mumbaipropertyexchange.com/project/rustomjee-cleon-bandra-east/29168 repeats 2BHK 659sf ₹3.99Cr but does not identify a **currently unsold 659sf flat available at ₹3.99Cr** or full taxes/charges. Registered land coordinate **19.0592435,72.8485896** is approximate CTS site, not confirmed entrance.
- Developer first-party project images exist; explicit permission to republish on Way2Paisa has **not** been confirmed, so no images were copied, uploaded, or active in the project's public media.
- **Publication HOLD**: current promoter-specific numbered unsold apartment 2BHK floor/wing with approved carpet, full price and taxes, and permission for project-specific hero + gallery. No active inventory, no min-price header, no activation.

### New private project B — Thane MMR, 3 distinct legal phases
**Rustomjee Uptown Urbania — La Familia, Wings A/B/C** (`rustomjee-uptown-urbania-la-familia-thane`), Majiwada, Thane West. Registrations:
- **Wing A `P51700032262`**, original registered completion **31 Dec 2026**;
- **Wing B `P51700032205`**, original registered completion **31 Dec 2026**;
- **Wing C `P51700046128`**, original registered completion **30 Jun 2027**.
- MahaRERA legal promoter **Kapstone Constructions Private Limited**, marketed Rustomjee. Distinct wings must not be merged into a falsely uniform registered date.
- Rustomjee official https://www.rustomjee.com/uptown-urbania-thane/rustomjee-uptown-urbania-la-familia-thane/ currently markets 2 BHK **from ₹1.62Cr all-inclusive** and mentions all three MahaRERA registrations.
- Official https://projects.rustomjee.com/rustomjee-la-familia/ displays 2BHK **633–688 sq.ft registered carpet**, 3BHK **880–1076 sq.ft**; Rustomjee blog https://www.rustomjee.com/blog/best-2-bhk-flats-in-thane-west-for-a-family/ (published approximately 6 Nov 2026) calls out Wing B 650sf, Wing A 688sf but does not link first-party starting-price to a specific currently allocated flat.
- Developer public sales site currently says **under construction**. Oct 8/11 2026 stock-exchange-derived corporate report https://rustomjeeltd.net/updates/keystone-realtors-completes-three-urbania-towers-ahead-of-rera-timelines/ says A/B/C construction completed ahead of RERA dates. MahaRERA derivative snapshots (https://www.squareyards.com/thane-residential-property/rustomjee-uptown-urbania/121648/project/rera/p51700032262) remain marked under construction or older filing data. **Legal OC, completed possession and phase-specific current lender NOC are not independently verified. Do not show Ready to Move until certificate.**
- Wing C https://reragenie.com/p/rustomjee-la-familia-wing-c-rustomjee-urbania-pbtajwxv/ reports disclosed IndusInd bank land charge ₹300Cr and legal cases in source dated earlier; requires normal lawyer/title due diligence, no inference of wrongdoing.
- Publication HOLD: exact wing-identified currently available full-cost apartment, allocated floor, sanctioned RERA carpet, verified OC/possession specifics and project photo display permission. No active inventory or copied image files.

### Existing published Ashiana Juhu cross-check — no change
- Rustomjee official https://www.rustomjee.com/projects/residential/rustomjee-ashiana-juhu/ says **OC Received** and ready for possession at 10th Road Juhu, 3/4 BHK from **₹10.50 Cr all-inclusive**.
- Existing Way2Paisa `rustomjee-ashiana-juhu` currently published with 3BHK primary offer at ₹10.50Cr and `status='Under Construction / Advanced Stage'` because the last separately checked RERA derivative did **not independently show completed OC**. With no independently validated issued OC PDF, this continuation DID NOT flip status to Ready to Move or alter public stock. An internal dated source note documents the conflicting developer vs registration/OC evidence for subsequent certificate check.
- Do not infer 4 BHK availability from marketing mix; existing partner records say 4BHK sold out. No price was changed.

### First-pass project photo reuse audit
Read-only SQL on **681 published** projects and `project_media` showed repeated photo addresses on **separately registered wings/phases within one developer township**: Dosti West County (seven phase listings), L&T Crestoria Estate (five), Rustomjee La Vie (four), Godrej Reserve (four), Adani Airica (three), etc. This is NOT by itself proof of wrong-property photographs; community imagery can legitimately be shared across adjacent towers, but **phase-specific elevation labels** need an eventual per-wing validation. No deletion, swap, duplicate logo, cross-project image replacement or new media was performed.

## Final post-change database and visibility verification
Direct Supabase SQL:
- **1,863 total** project records = **681 published + 1,182 private**.
- Of the 681 published: **366 Mumbai + 119 MMR + 196 Dubai**.
- **2,412 active inventory** and **3,174 active media** unchanged.
- Cleon: private unverified `active=false, verified=false`, 0 active inventory, 4 new source records; eligibility check still requires exact configuration stock and project photos.
- La Familia: private unverified, 0 active inventory, 6 source records; phase-specific registered area/title/OC/hero/gallery unresolved.
- Rustomjee Ashiana: public unchanged, 1 new evidence record.
- Public access test: `BEGIN READ ONLY; SET LOCAL ROLE anon;` returned **681** public projects and **0/2** new projects exposed. No unapproved content was published.

## Next commercially valuable actions
1. Highest priority Mumbai: procure/reconcile exact developer "2BHK Wing A 659sf at rate" for Cleon, other Bandra/Khar/Juhu/Andheri/Dadar Parel verified projects, plus three distinct correct project visuals with rights for CP marketing; then perform a strict publish gate. If live Promoter allocations cannot be established publicly, no fabricated availability.
2. Thane: validate La Familia A/B/C phase-specific apartment sales, current 1.62Cr marketing, OC certificates, and legal handover status; only then publish.
3. Broader Mumbai: continue correcting existing high-demand buyer-facing false Sold Out / false Ready to Move / stale below-developer asking price leads; keep audit notes internal.
4. No Emaar images or GoDaddy publish retries, no unsolicited email/developer outreach.

**Public projects newly published this cycle: 0** because the developer's public "from" price is a marketing minimum, not an individually bookable inventory allocation, and authorised image reuse was not confirmed. This is deliberate buyer-protection, not a claimed successful production launch.
