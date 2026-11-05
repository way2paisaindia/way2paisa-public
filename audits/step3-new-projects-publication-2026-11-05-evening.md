# Way2Paisa — 5 November 2026 evening | New project publication and source reconciliation

**Scope:** New source-qualified residential project activation in Mulund West; review of additional Marathon residential/commercial leads. Step 3 media still **OPEN**; Step 4 **HELD**; **NO EMAILS / OUTREACH**.

## Verified production result

- Before: **667** published / verified / complete projects; **2,379** active inventory; **3,173** active media.
- After guarded atomic Supabase insertion: **668** published / verified / complete projects; **2,380** active inventory; **3,173** active media; private projects remain **1,161**.
- New **Marathon Zaver Arcade**: https://www.way2paisa.in/projects/marathon-zaver-arcade-mulund-west
- Project ID: `5b44ab2c-4336-48d0-9b6b-ac7794f38f5c`; MahaRERA `P51800020332`.
- There was no prior exact RERA or canonical slug; post-write duplicate query returned exactly one project.
- Inserted **one active project-level developer offer** and **five dated project_sources rows**. No existing project, inventory, photo provenance or price was altered.

## Publication details and primary evidence

**Developer marketing identity:** Marathon Group (existing mapped developer master and logo); **statutory legal promoter:** UNITED BUILDERS, per regulatory derivatives. Do not conflate legal promoter and marketer.

- First-party developer: https://marathon.in/zaver-arcade/
  - Developer advertises a *last few* available ready-to-move **2 BHK homes from ₹2.30 Cr** in Mulund West, and says OC received.
  - Current exact unit number/floor/final quote has **not** been disclosed by the promoter publicly. Store one **project-level threshold row**, not invented available unit assignments.
  - Street address published by developer: Zaver Arcade, Zaver Road, Vidya Vihar, Mulund West, Mumbai 400080, opposite a Jain Derasar.
- Developer original plan brochure: https://marathon.in/zaver-arcade/wp-content/uploads/sites/28/2025/04/za_mbrochure.pdf
  - Two **approved 2 BHK RERA carpet layouts of 700 and 724 sq.ft**. The ₹2.30 Cr headline is *not* certified as the price of both or either specific carpet layout.
- RERA-derived filing summaries:
  - https://reragenie.com/p/marathon-zaver-arcade-mulund-west-u4ryv9gx/
  - https://www.squareyards.com/mumbai-residential-property/united-marathon-zaver-arcade/102970/project/rera/p51800020332
  - Legal promoter **UNITED BUILDERS**; RERA `P51800020332`. Registered completion revised from December 2024 to March 2026; reported registered completed. Developer claims an OC has been issued. Obtain flat-specific OC/document checks before a customer commitment.
- Existing developer ID `28bee4dd-ad0e-44b6-a230-3c34ba11d5a3`, existing Mulund West location ID `148e2e6b-2103-4bc6-a6b6-1d9493f6eb07`.
- No approximated building GPS: map URL searches the exact official street address.

## Media integrity

- **No project hero/gallery image activated**: developer project imagery exists on its website, but independent reproduction rights and image file/browser tests were not established in this environment.
- Public page should display built-in neutral brand hero fallback and explicit *no verified gallery* notice rather than a borrowed or unlicensed photo; no `project_media` rows were added.
- This is a **published factual/offer listing**, **not Step 3 media certification**. It adds one project requiring the same image-rights and UX follow-up as other known exceptions.
- HTTP verification of the new production project route and sitemap could not be performed in the web tool environment (page fetch reported inaccessible); therefore **do not certify new-page HTTP 200 or sitemap URL count until an independent browser/HTTP check succeeds**. Database publication is independently verified.

## Additional candidates reviewed but not falsely activated

1. **Sunset Gardens by Marathon**, Mulund West, MahaRERA `P51800047418`. Official Marathon/Sunset pages offer studios/1BHK, while different currently surfaced first-party subpages disagree materially on their starting amounts (e.g. ₹58L vs ₹63.99L for studio; ₹1.26Cr vs ₹1.30/1.33Cr for 1BHK), and construction/possession snapshots vary. Official apartment page explicitly marks **2BHK SOLD OUT**. Legal promoter **United Enterprise**; reported original Dec 2026 timeline and a separate November 2026 regulatory derivative's four-month extension to Apr 2027. Hold for dated current cost sheet and exact available phase/unit, image reuse rights and live media QA; **no record activated**.
   - https://sunset.in/gardens/
   - https://sunset.in/gardens-apartments/
   - https://reragenie.com/p/sunset-gardens-by-marathon-mulund-west-fhgdg3uv/
   - https://gharkundli.com/projects/5249
2. **Marathon Millennium** offices, Mulund West. The developer site markets higher-floor offices from ₹91L and elsewhere ₹98L; two different RERA phase identifiers `P51800017324` and `P51800021203` appear on the same site, with price/offer not attributed to a specific legally registered phase or saleable unit. Hold to avoid a misleading phase-level listing.
   - https://marathon.in/millennium/
3. Existing private **H. Rishabraj Trident**, **Chandiwala Pearl Icon**, **Binghatti Haven**, **Goodlife by Holistic Group** still have documented legal, media-authorization or current inventory conflicts. No premature status change.

## Final guards

- All existing published project IDs and active inventory prices retained; no unpublishing, rebranding of duplicates, invented unit allocations, unauthorised media, or email outreach.
- Step 3 continues until existing image and visitor-browser QA issues are truly cleared. Step 4 remains on hold.

## Post-deployment production HTTP verification

- Vercel production `dpl_5w7gHSLC7pqzPv6qRC9FhmPZ7K6s` is **READY**, commit `32d234cd3f141dc3b515398466bc52a5a9f10885`.
- Independently fetched the READY Vercel production artifact using the authenticated deployment page fetch:
  - `/projects/marathon-zaver-arcade-mulund-west` → **HTTP 200**, canonical URL correct, SEO title correct, RERA `P51800020332`, ₹2.30 Cr and honest no-gallery notice in server HTML.
  - `/sitemap.xml` → **HTTP 200**, **668 project URLs**, **672 total URLs** including four static routes, and the new Zaver Arcade canonical present. Private K Raheja SoBo Residence slug was **absent**.
- HTTP response and server HTML do **not** prove independent interactive visitor browser, photo licence, or external Google indexation. Media Step 3 stays OPEN.
- The earlier HTTP-verification-pending entry above described the state *before* the successful checks. It is superseded by this section.

## Additional current candidate refusal — Marathon Ekveera

- The Marathon website advertises studio/1BHK from ₹39.99L, but MahaRERA filing derivative identifies `P51800032741` as **lapsed**, with December 2023 registered completion and unresolved renewed/legal standing (https://reragenie.com/p/ekveera-sidharth-nagar-mulund-west-d83em0r8/).
- **Not published**. Obtain regulator-current completion/OC and ability to transact lawfully before advertising sale stock. Developer project site https://marathon.in/ekveera/ alone is insufficient.

