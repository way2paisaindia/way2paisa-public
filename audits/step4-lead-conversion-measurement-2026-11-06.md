# Way2Paisa Step 4 — buyer-guide conversion measurement audit
Date: 6 November 2026 (India)

## Objective
Continue Step 4 after the first four buyer-intent pages launched. Verify the ability to attribute successful lead enquiries by buyer intent and to measure consultation CTA clicks, while maintaining published-project integrity and not sending test enquiries, emails or WhatsApp messages.

## Implemented and deployed
- `app/lib/lead-attribution.js`: `trackSavedLead(type, {leadTopic})` now passes only a preapproved non-personal `lead_topic` to the GA4 `generate_lead` event; legacy callers without topics keep their original event.
- `app/components/HighIntentEnquiryForm.js`: successful saves on the four exact public landing paths supply the corresponding topic. The event remains behind the successful response from `/api/leads`.
- `app/components/AnalyticsTracker.js`: consultation-anchor clicks on those same paths emit the separate `select_advisory_cta` event with the allowed topic. These pages use the `buyer_guide` classification for general call and WhatsApp click tracking. Page content, personal details, budgets, free-text briefs and URL query strings are never supplied as event properties.

Allowed `lead_topic` values:
- `mumbai_luxury_homes`
- `mumbai_commercial_offices`
- `dubai_property_investment`
- `mmr_villas_plots`

## Safe live-browser verification
Four form success scenarios were tested in a Chromium browser with every outbound POST intercepted and mock-success responses returned locally. All 4 passed: each carried its own campaign topic, preserved sanitized UTM source and current landing URL in the mocked CRM payload, and emitted exactly one correctly classified `generate_lead` event without contact details. A separate intercepted HTTP 503 failure scenario correctly showed an error message, no success state and no `generate_lead` event.

The Google tag script was present on the live landing page. Click tracking was verified in a hydrated browser for the Mumbai luxury and MMR villa/plot routes: each emitted `select_advisory_cta` with its correct topic, without triggering a lead event. Earlier unsuccessful synthetic click attempts were test-selector/timing issues (mobile hides the desktop-only header CTA); they are **not** counted as passes or website defects. A longer Playwright batch ended with a test-browser process failure, not an observed site runtime error.

No real lead API submissions occurred in these tests, so no emails, WhatsApp notifications or real CRM lead entries were created.

## Published catalogue and SEO regression
At final check:
- Fully published projects: **673**; active inventory records: **2,394**; active media records: **3,173**.
- **673/673** published project pages returned HTTP 200 with title, canonical, Open Graph image metadata and RealEstateListing structured data.
- All four buyer-intent routes returned HTTP 200 with titles, canonicals and enquiry forms.
- Selected live project cards: Mumbai luxury 8, Mumbai commercial 6, Dubai investment 8, MMR villas and plots 22.
- The live XML sitemap returned HTTP 200 with **673** published project URLs, all four buyer-intent URLs, no missing published project URL and **zero duplicate loc entries**.
- Vercel runtime errors were absent in the latest one-hour check.

## Important limits
The browser checks prove the site can emit the correct GA4 events. They do NOT prove Google Analytics has received, processed or attributed real traffic/conversions or that Google has indexed the new guides. Those must be checked inside the connected GA4 and Google Search Console accounts. The event-scoped custom parameter `lead_topic` may need to be registered as a custom dimension in GA4 for standard reports.

Step 3 image remediation remains a separate backlog, including Emaar legacy image sources and other project-specific missing galleries. This Step 4 work did not edit project statuses, prices, inventory, image source records or hosting cutover settings.

## Follow-up
After read-only GA4 and Search Console access is connected, compare actual landing-page impressions, organic clicks, CTA events, successful `generate_lead` events and indexed status. Do not infer conversion uplift from synthetic tests. Continue preserving the premium production experience during any future hosting migration.
