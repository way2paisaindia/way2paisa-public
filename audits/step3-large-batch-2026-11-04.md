# Way2Paisa — 4 November 2026 larger-batch project publication and media audit

**Production environment:** Supabase project `dqoxrsywknsgkxrdrxep`, Way2Paisa www.way2paisa.in.  
**Run:** 4 Nov 2026 IST. **Step 3 remains OPEN. Step 4 remains ON HOLD. No emails/developer contact.**

## Final counts (queried after all writes)
- Published `active=true AND verified=true AND enrichment_status='complete'` projects: **667** (unchanged)
- Private projects: **1,161** (increased by 2)
- Active inventory: **2,379** (unchanged)
- Inactive inventory: **1,352** (increased by 11)
- Active `project_media`: **3,173** (unchanged)
- `project_sources` records created for audited 6 projects in this cycle: **19** (73 East 4; Sigma Amber 2; Pratap Elegance 3; Edmont-Aurelia 2; Marina Shores 5; Emaar Park Horizon 3).
- No existing published prices, active inventory, developer logos, media or project publication flags were altered.

## Large-batch Mumbai source records / publication guards
1. **Sigma Amber, Charkop/Kandivali West**, new PRIVATE ID `138972ac-ed65-475e-a4ed-ba747ef55d8d`, PR1180002501074, legal promoter Drashti Realtors Pvt Ltd (NOT Sigma Realtors). Regulatory record https://reragenie.com/p/sigma-amber-charkop-tytgmg5h/ revised possession 28 Apr 2029, two wings 95 mixed homes incl 34 rehab, allotment letter model deviation. Two inactive partner examples: 1BR407sqft ₹90.32L and 2BR630sqft ₹1.4Cr, not confirmed current unallocated promoter flats. Sources: https://housing.com/in/buy/projects/page/350718-drashti-sigma-amber-by-drashti-realtors-in-kandivali-west . No genuinely licensed gallery or flat allocations; do NOT activate.
2. **Pratap Elegance (Downtown Elegance), Lallubhai Park Andheri West**, new PRIVATE ID `9f6961fe-5325-40ce-ad32-0a76ccf7f8cc`, RERA P51800031141, statutory promoter Downtown Lifespaces LLP, JPV Realtors marketing. Regulator https://reragenie.com/p/pratap-elegance-lallubhai-park-zau53hco/ shows registration **LAPSED** after March 2025. Earlier construction completion and several OC documents are not proof each flat is legally ready for sale. Three inactive third-party quote references (2BR627sqft ₹3Cr, 3BR937sqft ₹4.5Cr, 4BR1288sqft ₹6Cr); source https://a2zrealtors.in/properties/pratap-elegance-new-project-in-lallubhai-park-andheri-west-jpv-downtown-lifespaces-p51800031141/ . Address is Lallubhai Park at Andheri/Vile Parle border. No published claims of Ready to Move.
3. **73 East, Kandivali West**, EXISTING private ID `9de16ef1-3764-4654-85e0-0c914f7a4b93`, RERA P51800015343, fully enriched legal/project background from official https://dimplesgroup.com/ongoing-project/73east . ReraGenie https://reragenie.com/p/73-east-kandivali-west-3az1qw1j/ reports 7 legal cases, 2 MahaRERA complaints, ₹175Cr charge in favour of Aditya Birla Capital, 218 mixed units and 159 booked historical. Official registered extension Dec31 2026, another derivative quotes Apr2027, reconcile signed RERA. Developer floorplans 2BR818–836sqft, 3.5BR1462 and larger sky villas, but cannot match available promoter flats with published MPE price range. Two INACTIVE indicative quotes 2BR818 ₹2.58Cr, 3.5BR1462 ₹4.68Cr **cannot be regarded as guaranteed price/area pairs**.
4. **Edmont – Aurelia, Kandivali West**, EXISTING PUBLIC, ID `73f116b9-f75f-45bd-b77f-4a864e6648ba`, P51800053546, already marketed by Ashwin Sheth Group; DO NOT duplicate under Sheth Edmont. First-party https://edmont.ashwinshethgroup.com/ advertises project-wide 2/3BR ₹1.99Cr+ and sizes 761–1255; existing public channel-partner 3BR1007sqft ₹2.61Cr remains unchanged until exact promoter unit-price area pairing confirmed. Statutory record https://reragenie.com/p/edmont-aurelia-kandivali-west-55tm3vo3/ shows Sheth Homes Pvt Ltd as promoter, ₹165Cr secured charge, 1 MahaRERA complaint, 31 Aug2029 completion. Two private sources attached; 0 public stock changes.

## Dubai additional inventory / source review
5. **Emaar Marina Shores, Dubai Marina**, existing PRIVATE ID `2001aaa0-6292-435a-8807-b8c65d27cc05`, DLD2425. Emaar first-party https://www.emaar.com/en/property-for-sale confirms 3 individually named units:
   - DME Marina Shores-35-3501 2BR **1148 sqft**, AED **4,467,888**.
   - DME Marina Shores-31-3108 2BR **1190 sqft**, AED **4,535,888**.
   - DME Marina Shores-45-4505 3BR **1596 sqft**, AED **6,058,888**.
   The latter two already existed privately as unnamed priced area records, and this batch attached the exact developer unit IDs without changing amounts. A fourth AL SAEB-partner offered 1BR745sqft AED2,103,888, unit 26-2603 was added as a **new INACTIVE** partner quote (not confirmed on Emaar unit details), source https://alsaeb.com/projects/emaar-marina-shores/?lang=en. All four remain private due to unavailable authorized exact-project media and marketing usage rights.
6. **Emaar Park Horizon at Dubai Hills**, EXISTING PUBLIC ID `13c95c83-81c4-49b1-8942-63c88bc277b0`, DLD2483. Developer https://www.emaar.com/en/our-communities/dubai-hills-estate advertises **THREE remaining** 2BR properties from AED5,296,888, while partner https://alsaeb.com/projects/emaar-park-horizon/?lang=en advertises **FOUR** named ground-floor podium homes G01–G04. Existing G01 active record preserved. Added three **INACTIVE**, individually labelled partner quotes (G02/G03 1966 sqft AED5,296,888; G04 1968 sqft AED5,297,888) and 3 explanation sources; exact Emaar individual unit pages G02-G04 could not be fetched. No “available” stock or price alterations. These are Dubai developer total areas, not Indian carpet.

## Page QA, 21 public pages successfully checked
Vercel authenticated `web_fetch_vercel_url` from live `www.way2paisa.in`, 21 project URLs in groups of 7. All **21 returned HTTP 200**, contained their canonical URLs and publicly displayed prices, and **none** had `robots noindex` meta. **9 of 21** showed explicit “verified gallery unavailable” disclosures (known Emaar legacy photo issue); this is a safe user-facing fallback, not successful image replacement. The tested markets include:
- Dubai: Binghatti Skyterraces, Emaar Bayview, Clearpoint, Ocean Cove, Park Horizon, Golf Vale, Golf Verge, Grove Ridge, Marina Cove, Ovelle, Vista Ridge, SAMANA Boulevard Heights.
- MMR: Lodha Belmont and Mahindra Meridian.
- Mumbai: Ajmera Vann, Edmont Aurelia, Godrej Square, Kalpataru Oceana, Lodha Unica, Rustomjee Crown, Supreme Boulevard.
No user-identifying information exposed. Tests are SSR/HTTP tests, **not** an independent interactive visitor-browser UX certification.

## Release guard / known media problems
- Developer Emaar Asset Usage Policy https://www.emaar.com/en/emaar-asset-usage-policy requires permission for use of its copyright project images in advertising. Do not scrape/re-upload Emaar marketing imagery without verified authorization, even when exact asset URL can be found.
- The prior audit counted 71 published project heroes pointing at broken legacy `uae-cms.emaar.com/uploads/` URLs and 277 related active media rows; roughly 70 public projects have no surviving usable gallery after known-broken filtering. These remain open.
- Continue authentic project-specific gallery replacement ONLY once rights-cleared stable assets exist; do not assume placeholder or remote preview is a successful image.
- Refresh Google Search Console actual indexing via user export, not extrapolate success from HTTP 200/canonicals. Step 4 stays ON HOLD, absolutely no email requests.
