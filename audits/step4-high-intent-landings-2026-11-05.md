# Way2Paisa — Step 4 initial buyer-intent landing rollout
Date: 5 November 2026 (India)

## Decision and scope
The owner authorised moving to Step 4 while the Step 3 image-replacement backlog is tracked separately. Step 3 is **not** certified complete; both Emaar and non-Emaar photo replacements remain unresolved. No permission was given to invent photographs, change prices or inventory, unpublish projects, or send emails.

The Step 4 initial gate is three working, indexable, high-intent landing pages with unique content, current verified projects, transparent comparisons, navigation and enquiry options. This deployment delivers four distinct user-intent pages, not a reinstated locality watchlist.

## Live pages and checks
- `/solutions/mumbai-luxury-homes` — 8 verified published project cards, 5 buyer FAQs, 4 long-form due-diligence sections, enquiry form, unique canonical and SEO metadata.
- `/solutions/mumbai-commercial-property` — 6 verified published commercial-office cards, 5 FAQs, 4 long-form sections, enquiry form, unique canonical and SEO metadata.
- `/solutions/dubai-property-investment` — 8 verified published Dubai apartment/villa cards, 5 FAQs, 4 long-form sections, AED price presentation, enquiry form, unique canonical and SEO metadata.
- `/explore/villas-and-plots-mmr` — 22 verified published villa/plot cards, 5 legal/construction/cost guidance sections, 5 buyer FAQs, enquiry form, unique canonical and SEO metadata.

No availability claims are made without current confirmation; listings derive from the server-side published catalogue, not unpublished stock. Price cards on the three solutions pages prefer current active inventory-level published minima. The MMR page uses the published project starting-price field.

## Post-deploy verification
- All four URLs returned HTTP 200 with matching title, canonical URL and live project cards.
- All six desktop/mobile browser scenarios on the three solutions pages passed: 8/6/8 cards, 5 FAQs each, embedded enquiry forms, no horizontal overflow, first FAQ opens, visible listing links lead to HTTP 200 projects and no browser page errors.
- Both MMR desktop/mobile scenarios passed: 22 cards, 5 editorial sections, 5 FAQs, embedded enquiry form, functional consultation anchor, no overflow or browser errors.
- Website regression: **670 of 670** published project pages returned HTTP 200 and contained expected page title, canonical, Open Graph image metadata and RealEstateListing structured data.
- `/sitemap.xml`: HTTP 200, **670 published project URLs**, all four unique landing URLs, **678 distinct URLs total**, no duplicates and no missing published project URLs.
- Homepage footer has direct navigation to the four buyer-intent pages.
- Three overlapping draft `/explore` intents were deliberately kept 404 to avoid competing SEO pages; the single MMR villa/plot intent is distinct.
- No forms were submitted during tests, so no lead notification emails were triggered. No manual emails were sent.

## Deferred Step 3 image backlog
The existing photo-exception register remains authoritative: Emaar legacy CMS hero-image URLs remain unavailable, along with some non-Emaar project photo galleries (including Godrej Bliss). The site uses honest missing-photograph states rather than unrelated stock or unlicensed images. Image source recovery, licensing and subsequent asset verification can continue independently of these landing pages.

## Integrity and next work
This rollout did not delete, unpublish or alter existing projects, price records, active inventory, or media database records. Next Step 4 work should evaluate analytics events and organic indexing for these pages after recrawl, check actual qualified-lead conversions using real user submissions only, and extend only truly distinct high-intent segments when supported by verified project stock. Do not restore confusing locality pages or project watchlists.
