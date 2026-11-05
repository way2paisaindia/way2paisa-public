# Way2Paisa — 5 November 2026 publication and Step 3 source audit

**Scope:** Source-of-truth reconciliation for published Rustomjee Ozone Skye, private K Raheja SoBo Residences, and developer first-party Dubai named-unit cross-check.  
**Status:** Step 3 still open. Step 4 held. No emails / developer outreach.

## Initial state
Production Supabase project `dqoxrsywknsgkxrdrxep` held **667** live/verified/complete projects, **2,379** active inventory records, **1,161** private projects and **3,173** active project media. Changes are recorded with exact source URLs, dated project_sources rows, and final SQL verification.

## Rustomjee Ozone Skye — published project updated, original priced inventory preserved
- Canonical published project: `ozone-skye-rustomjee-goregaon-west`; MahaRERA **PR1180002601227** (legal promoter Keystone Realtors Limited).
- First-party Rustomjee project: https://www.rustomjee.com/projects/residential/ozone-skye-goregaon-west/
- Official Rustomjee layouts **2 BHK: 693.74, 723.88, 771.24 sq.ft** and **3 BHK: 944.54, 976.29 sq.ft**, project-level starting price **₹2.52 Cr all-inclusive**. No certified per-unit floor/price matrix on source page.
- Dated partner Housiey source: https://housiey.com/projects/rustomjee-ozone-skye , **2 BHK: 752 and 786 sq.ft (₹2.52/2.63 Cr)**, **3 BHK: 1011 and 1030 sq.ft (₹3.37/3.42 Cr)**. They are inconsistent with official floor-plan carpet figures; as of this check, no supported unit-level mapping reconciles them.
- Preserved **four existing live partner quotes**, their amounts, carpet figures, active flags, and source URLs. Added **five INACTIVE official layout-reference rows, all unpriced**, so there is no fabricated pairing.
- Updated public overview to disclose Rustomjee's official layouts and tell buyers to reconfirm the chosen flat's RERA carpet, floor and all-inclusive quote. Standard buyer language, no internal supply source names in prose.
- Three new `project_sources`: first-party layout; independent partner price/area mismatch; current RERA completion/legal notes. Original registered completion Dec 2031; one regulatory derivative reports +4mo automatic eligible extension to Apr2032, not treated as signed revised completion.
- Publication count and live stock unchanged. This is correction of misleading description, not certification that broker market units match legal promoter sale stock.

## K Raheja SoBo Residences — duplicate avoided, private statutory record enriched
- Existing private `k-raheja-sobo-residences`, RERA **PR1170002502274**; legally registered promoter **K Raheja Corp Real Estate Private Limited**.
- Latest RERA-derived sources: https://askrera.com/projects/raheja-sobo-residences-pr1170002502274/ ; https://www.squareyards.com/mumbai-residential-property/k-raheja-sobo-residences/343108/project/rera/pr1170002502274 ; https://deedo.in/mumbai-city/mumbai-city-mumbai-city/raheja-sobo-residences/
- Registered site M. M. Malavia Marg, Tardeo/Haji Ali, plot CS14/738 and 15/738; plot coordinate **18.9756587,72.811943** (not a verified building entrance).
- Original registered completion **31 Jul 2033**; current Oct 2026 derivative reports four-month automatic extension to **30 Nov 2033**. Dated, source-identified possession field updated **only on the private record**.
- **Material unresolved legal inventory conflict**: current regulatory derivatives list about **63 registered units**, earlier third-party development promotional claims describe **129**; RERA Inspector derivative lists 2BR 1215–1625 sq.ft and duplex 5630, while Housing.com advertises 4BR 3601/4136/5070 and another marketing microsite makes still larger 5BR claims. These figures cannot be merged as guaranteed available stock. Historical booked snapshots also disagree.
- All three prior historic 4BR floorplan rows remain **INACTIVE**, no prices entered, no project activation. Status explicitly held for legal unit schedule, current promoter cost sheet, genuine project images and exact usable plot/entry check.
- Three `project_sources` attached: registration/promoter/date; configuration mismatch; divergent historical absorption.

## Emaar developer-unit no-duplicate cross-check
The first six currently visible individual `Book Now` cards on each official Emaar page were compared against existing Way2Paisa inventory by full developer unit code, not by size alone:
- Rashid Yachts & Marina: https://www.emaar.com/en/property-for-sale/rashid-yachts-marina — Clearpoint G06, Ocean Cove T1-1-118 and T2-1-103, Pier Point 1-P-P04 and 1-1-104, Baystar by Vida T1-1-103 already have the matching named records, prices and areas.
- Emaar South: https://www.emaar.com/en/property-for-sale/emaar-south — Golf Point P18 in Buildings 1 and 2, Golf Point P15, Golf Dale G04 and Townhouse G02 already active; Urbana III-Block29-101 exact developer unit is documented but held **PRIVATE** for unavailable Emaar image rights/galleries and building coordinates.
- Dubai Creek Harbour: https://www.emaar.com/en/property-for-sale/dubai-creek-harbour — Aeon P07/P08, Creek Palace B2-P04 and the first three Dubai Creek Residences named apartments were already present. No duplicate rows inserted.
- No unverified historical partner quantity used to infer live availability. All Dubai total areas are developer total square feet, not Indian RERA carpet.
- Prior Step 3 Emaar legacy image failure remains unresolved; do not claim the existence of an Emaar online gallery grants commercial media licence.

## Release guards
- New entirely published projects this cycle: **0**. Do not inflate totals by republishing aliases, staged flats, expired offers, resale stock, or unlicensed galleries.
- Preserve 667 live projects and 2,379 active inventory, existing prices, and all existing gallery media/provenance.
- Search Console indexing still requires a fresh dated export to measure actual Google indexation; HTTP 200 and canonical checks do not prove Google indexed pages.
- **No emails** or outreach and **no Step 4** until Step 3 actually completes.
