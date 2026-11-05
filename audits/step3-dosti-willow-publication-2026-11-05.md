# Way2Paisa — Step 3 publication addendum, 5 November 2026: Dosti Willow (Balkum Thane)

**Status:** One genuinely new registered phase published in Supabase; Step 3 image availability/rights QA OPEN; Step 4 ON HOLD. No emails, developer outreach, deletions or edits to pre-existing active prices.

## Production result, after guarded write

- Prior live project count: **668**; verified result: **669** published + verified + enrichment complete projects.
- Active inventory: **2,380 → 2,382**, exactly two newly inserted developer-category-price records.
- Active media: **3,173 → 3,173** unchanged.
- Private projects: **1,161** unchanged.
- New project canonical: https://www.way2paisa.in/projects/dosti-west-county-willow-thane
- ID: `cae056dd-25e3-4553-89d2-0ee623af613d`. Registration: **P51700056278**. Six new dated source records attached. Source price field is only a marketed category threshold; no numbered developer allocation fabricated.
- Duplicate guard ensured **exact** registration `P51700056278` did not exist as a separately published project. An existing **private umbrella** Dosti West County record references this RERA among 12 phase numbers, but is neither current nor a canonical single-phase listing. Existing published Pine, Maple, Tulip and Olive phase records untouched.

## First-party marketing sources and statutory separation

1. Developer exact phase page: https://www.dostirealty.com/project/dosti-willow
   - **2 BHK from ₹1.91 Cr+**, **3 BHK from ₹2.95 Cr+**. Developer labels these *all-inclusive* after monetary benefits / applicable limited-period scheme terms. Specific floor, current apartment and final complete quote are not implied.
   - Developer-marketed area figures: **2BR 833 sq.ft**, **3BR 1264–1275 sq.ft**, which are **not independently certified to equal the registered RERA carpet area**.
2. Statutory-derived identity: https://reragenie.com/p/dosti-west-county-phase-7-dosti-willow-thane-bhiwandi-wadpa-road-village-balkum-thane-west-8j3tybow/
   - Legal promoter: **DOSTI ENTERPRISES** (not the same name as the marketing brand Dosti Realty); two wings, **368 registered units**; original registered completion **31 March 2028**.
   - Historical units reported booked are NOT developer's presently available sale inventory.
3. RERA Inspector unit schedule: https://www.rerainspector.com/projects/46834/P51700056278
   - **2BR 785 sq.ft** and **3BR 1175–1190 sq.ft** RERA-derived carpet, not the marketer's 833 and 1264–1275. Public listing clearly describes that mismatch and does not display misleading size-to-quoted-price combinations.
4. October 2026 regulatory derivative: https://gharkundli.com/projects/13071
   - Reports +4-month automatic extension eligibility to **July 2028**. We have **not reviewed a signed project-specific extension certificate**; the original registered completion remains the database date.
   - This derivative lists one court case, while a June filing derivative mentions no declared litigation. Do not assert the project has clean litigation or title standing. Independent legal assessment and original documents should precede buyer commitment.
5. First-party township phases: https://dostirealty.com/dosti-west-county identifies the separated Willow phase, avoiding duplicate estate listings.

## Public-media and geolocation release guards

- No hero or gallery images were copied or activated; commercial reproduction rights not proven merely by public website availability. Neutral website fallback and explicit unavailable-gallery text are used. This is **not** a Step 3 media-rights clearance.
- Maps button searches developer-published Dosti West County Road / Balkum site address; no invented precise entrance GPS.
- Public inventory has two rows without specific flat area, which visually render **Carpet Area: On request** with **Confirm Availability**. Headline project area 785–1190 sq.ft is labelled RERA-derived and the overview differentiates the marketed figures. No fake unit numbers.

## Production HTTP checks

- Latest previously READY deployment `dpl_A8m13VjSRaFKMbb6PmUUqCmnt5Qm` rendered `/projects/dosti-west-county-willow-thane` with **HTTP 200**, correct canonical, title, prices, RERA number, neutral image fallback and no-gallery disclosure.
- On initial check the same deployment's `/sitemap.xml` yielded **HTTP 200** with **668 project URLs**, not yet 669; the Next.js sitemap response was cached before the latest database activation. The private SoBo URL remained **HTTP 404**.
- **Required post-commit retest:** refresh sitemap via this new deployment to establish **669** canonical published project URLs (673 URLs including 4 static routes) and confirm Willow is included. Do not say sitemap succeeded until independently seen.

## Adjacent pipeline reviewed and held

- **One Dosti**, Balkum Thane, `PC1330002600012`, marketed as commercial retail / offices ₹1.1Cr+ and 550–3000 sq.ft by developer https://dostirealty.com/project/one-dosti. MahaRERA-derived legal registration reports multiple court matters and divergent statutory unit-type/absorption snapshots. Direct current sellable unit category and carpet-to-price matrix need verification, so no priced listing activated.
- **Marathon Nextown** Kalyan-Shil Road (https://marathon.in/nextown/) has active developer development-wide offers, but multiple distinct registrations Ruby P51700021189, Jasper P51700049449, Sapphire P51700001265 etc. Current 1/2BHK price claims cannot be safely attributed to a particular phase; no umbrella counted as a new independent project.
- **Sugee Akanksha** Dadar West `P51900027981`: developer lists it as delivered in 2025; historical 2BR ₹3.81Cr campaign conflicts with 2026 portal prices, current primary stock unverified. Do not present old launch price as live primary developer allocation.

## Continuity

- No emails or developer follow-ups.
- No deletion, unpublishing, changed price or active status for any previously published project.
- Step 3 remains **OPEN** for image licence, serving and visitor-browser validation. Step 4 remains **ON HOLD**.


## Verified production release result — final check, 5 November

- Vercel production artifact `dpl_F4EJyLcK3gbwQXV8SftrZJhFJkvb` for audit commit `756d58ed9635a46339a6485aff0bade42aedbeca` is **READY**.
- Authenticated deployed sitemap `/sitemap.xml`: **HTTP 200, 669 project URLs, 673 total URLs**. Both Dosti Willow and Marathon Zaver Arcade appear; the unpublished `k-raheja-sobo-residences` is absent.
- Dosti Willow SSR page `/projects/dosti-west-county-willow-thane`: **HTTP 200**, title **Dosti Willow Thane West | 2 BHK From ₹1.91 Cr+**, correct canonical and P51700056278, developer project-level offer, and explicit no-verified-gallery disclosure. Rendered unit rows show carpet-area **On request**, not an invented unit-level price/carpet pairing.
- Private SoBo route `/projects/k-raheja-sobo-residences`: **HTTP 404**.
- Follow-up database query: **669** published projects, **2,382** active inventory, **3,173** active media, **1,161** private projects.
- The exact-image blacklist audit now identifies **89** published projects with no gallery surviving the static known-unavailable filter (69 Dubai, 16 Mumbai, 4 MMR): up from 87 before the two explicitly disclosed image-free publications. This is a filter-only count, not a browser/network certification. Step 3 remains OPEN.
- A targeted database refinement to the new Willow overview includes exact marketed-versus-RERA-derived area figures, but the inspected server HTML may still be serving an earlier cache snapshot. Do not claim this latest descriptive refinement has reached every visitor before a post-cache SSR check. The project has remained listed with a discrepancy warning throughout.
- No emails, outreach, existing price changes, existing active inventory changes, or unpublishing were performed; Step 4 remains held.
