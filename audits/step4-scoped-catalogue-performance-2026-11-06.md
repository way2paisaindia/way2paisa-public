# Way2Paisa Step 4 — Scoped Buyer-Guide Catalogue Reads
Date: 6 November 2026 (India)

## Objective
Reduce unnecessary Supabase requests and response payloads for the four high-intent buyer guides, supporting the premium site while reducing hosting and database work. No published project, inventory, price, source image, or lead record should be changed.

## Before
Each landing page called `loadPublicProjects()`, reading the entire published catalogue plus all active inventory and all active locations/developers. As of the starting audit, this meant 673 published projects and 2,394 active inventory rows for *each* guide, despite only rendering a small selection. Keyset pagination required at least two project pages and five inventory pages at 500 rows, plus two metadata reads (normally nine source queries per page).

## Implemented
- `app/lib/public-projects.js`: added `loadLandingProjects({slugs, market, categories})`, which accepts only bounded, approved buyer-guide filters; selects `active=true`, `verified=true`, `enrichment_status=complete`; and then reads *only active inventory belonging to the selected published project IDs*. It retains read-only retry behaviour, safe keyset pagination, configuration summarisation, and configuration-level min/max inventory pricing logic.
- `app/solutions/[slug]/page.js`: the three curated guides now query only their own configured eight/six/eight project slugs rather than the full catalogue.
- `app/explore/[intent]/page.js`: the MMR villas-and-plots guide now queries only published MMR projects in `plot`, `villa`, or `land` categories.
- The homepage, entire search catalogue, project detail pages, other static buyer content, sitemap generation, authentication, lead API, and CRM behaviour are unchanged.

## Read-volume comparison
At the beginning of the cycle the four pages together used 44 displayed project records and 87 active associated inventory records:
- Mumbai luxury: 8 projects / 26 active units.
- Mumbai commercial: 6 / 10.
- Dubai property investment: 8 / 17.
- MMR plots and villas: 22 / 34.

Previously each of the four page renders fetched 673 public projects and 2,394 inventory records. With scoped reads, each render requests only its own published projects and their active unit rows. This greatly reduces transferred source rows; an observed user page-speed/Core Web Vitals improvement is **not established** by this read-volume comparison.

## Verification
After deployment:
- All four pages returned HTTP 200 with their original 8 / 6 / 8 / 22 project card counts, five buyer FAQs, one functional enquiry form, title, canonical metadata and JSON-LD.
- Eight desktop/mobile Chromium checks passed (390px and 1440px), including correct card counts, no horizontal overflow, working FAQ disclosure, form fields, one H1 and no page exceptions.
- **674 / 674** contemporaneously published project pages returned HTTP 200 with title, canonical, Open Graph and RealEstateListing structured data.
- Live sitemap returned HTTP 200 with **674 project URLs**, all four buyer-guide URLs, **zero duplicate URLs** and no missing current published slugs.
- The published project count increased separately from 673 to 674 during this audit cycle. These Step 4 code changes did **not** write to the project or inventory database.

## Outstanding work
The separate Step 3 licensed-image exceptions remain open. Actual GA4 traffic, indexation and conversion lift require read-only account evidence after the site is crawled and real users submit enquiries; no claims of improved traffic or ranking should be made from these tests. Continue to keep the premium design and publish-status integrity during the hosting migration. No emails or test leads were sent.
