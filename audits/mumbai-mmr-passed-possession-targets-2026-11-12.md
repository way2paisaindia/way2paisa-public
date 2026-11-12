# Way2Paisa Mumbai/MMR — passed-possession-target corrections

Date: 12 November 2026 (India)

## Production database changes verified

Three **already-published** project records had a recorded target possession date earlier than 12 November 2026 while carrying ordinary "Under Construction" or "Near Possession" status language.

Using guarded updates in connected Supabase project `dqoxrsywknsgkxrdrxep`, their public-facing `status` values were revised as follows:

| Project | Slug | Existing recorded possession date | New status |
| --- | --- | --- | --- |
| Silicon Hofe B Wing | `silicon-hofe-b-wing` | 2026-09-30 | Under Construction — recorded Sep 2026 target passed; current OC/handover unverified |
| Ace Aristo | `ace-aristo-thane` | 2026-10-31 | Under Construction — recorded Oct 2026 target passed; current OC/handover unverified |
| Dosti West County — Dosti Tulip | `dosti-west-county-tulip-thane` | 2026-10-31 | Under Construction — recorded Oct 2026 target passed; current OC/handover unverified |

Post-write SELECT confirmed these exact values and unchanged `possession_date` values. All three remain active.

## External verification / conservative decision

- Silicon Hofe B Wing P51800054852: https://reragenie.com/p/silicon-hofe-b-wing-tilaknagar-chembur-yvrqt56j/ reports 30 Sep 2026 revised filed target; no independent current OC verification.
- Ace Aristo P51700053626: https://gharkundli.com/projects/12825 describes a 28 Feb 2027 deadline inclusive of a four-month automatic extension; database still reflects the originally recorded October date. No current primary certificate was checked during this pass.
- Dosti Tulip P51700032666: https://gharkundli.com/projects/11340 describes a 28 Feb 2027 deadline inclusive of automatic extension, while https://www.squareyards.com/dosti-tulip-balkum-pada-thane-npd-344481/rera/p51700032666 shows 31 October 2026 with no filed revision. This disagreement requires current regulator documentation before any date is replaced.

**Do not call these units ready-to-move, assert a revised statutory completion date, or claim OC/handover without direct document verification.** Note that `possession_date` is a historical stored target until reconciled; the status now explicitly warns visitors.

## Preserved invariants

- No new project publication, unpublished project activation, or publication-status change.
- No prices, active inventory, media, SEO title, description, RERA number or original possession-date changes.
- The Mumbai/MMR active catalogue remains 485 at this snapshot.
- No developer emails, lead submissions, notifications, hosting or DNS changes.

## Remaining

- Confirm actual OC/handover and regulator-approved target for these three projects from recent primary documents.
- Continue remedying the 12 published Mumbai/MMR records without usable project-specific photographs; never reuse unrelated or unlicensed assets.
- Publish additional verified Mumbai/MMR projects only when complete project-level evidence is available.

This audit records **database modifications**, not a verified production frontend deployment or fresh Google index check.
