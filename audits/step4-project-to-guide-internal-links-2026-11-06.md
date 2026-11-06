# Way2Paisa — Step 4 project-to-guide discovery and engagement audit

Date: 6 November 2026 (India)

## Scope
Improve internal discoverability of the four existing high-intent buyer guides from *relevant* published project pages on the current Vercel production website. No Cloudflare migration, domain/DNS action, project publication change, price change, inventory change, photograph change, email or real lead submission.

## Changes deployed to GitHub main
1. `app/lib/project-intent-guide.js`: safe, project-specific routing based on published market/category and active-inventory starting price. Do not label or link unrelated listings.
2. `app/projects/[slug]/page.js`: server-rendered contextual buyer-guide link near the existing related-project/advisory content. Visitors can navigate naturally, and search engines can discover those links without JavaScript.
3. `app/globals.css`: responsive premium styling for the guide section, with keyboard-accessible links.
4. `app/components/AnalyticsTracker.js`: `select_buyer_guide` event on project-to-guide clicks. Fixed, non-personal `lead_topic` and `page_section='project'` only. Do not record a `generate_lead` unless a genuine enquiry has been saved by the normal lead API.

## Matching rules and live counts
At the catalogue snapshot of **681 fully published projects**:
- Mumbai apartments with effective starting price at least ₹5 Cr: **95** project links to `/solutions/mumbai-luxury-homes`.
- Mumbai commercial offices: **8** links to `/solutions/mumbai-commercial-property`.
- Dubai apartments and villas: **187** links to `/solutions/dubai-property-investment`.
- MMR residential plots, land and villas: **24** links to `/explore/villas-and-plots-mmr`.
- Remaining **367** project pages deliberately have no buyer-guide link.

## Verification
- 12 deterministic routing tests passed, including valid and excluded markets, unsupported categories and invalid prices.
- **681/681 live published project pages** passed HTTP 200 and title/canonical/Open Graph/RealEstateListing checks, and each contained exactly the expected contextual link or no link.
- Live XML sitemap returned HTTP 200 with 681 published-project URLs, all four buyer-guide URLs, zero duplicates and no missing published URLs.
- **14/14 Chromium desktop/mobile checks passed** across six eligible examples and one unrelated project (390px and 1440px); no horizontal layout overflow or browser exceptions. Buyer-guide links opened the intended page, and each click emitted exactly one `select_buyer_guide` event with the expected whitelisted topic and without project or personal details. Unrelated project links correctly remained absent.
- No emails, WhatsApp notifications, real leads or site visits were triggered by these tests.

## Interpreting results
These tests verify *technical* internal discoverability, link navigation and event generation. They do **not** establish that Google has crawled or indexed the pages, nor that any genuine visitor clicked through or submitted a qualified enquiry. Real GA4 and Google Search Console evidence is still needed for performance claims.

## Constraints preserved
- Production remains `www.way2paisa.in` on Vercel; no hosting migration or Cloudflare activity.
- No changes to project availability, selling prices, live inventory, media assets, or published statuses.
- Separate Step 3 Emaar/non-Emaar licensed-image backlog remains open.
