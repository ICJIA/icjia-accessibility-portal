# Changelog

All notable changes to the ICJIA Accessibility Portal are documented in this file.

This project follows [Semantic Versioning](https://semver.org/).

---

## [1.3.1] - 2026-08-13

### Fixed — all 7 long-standing test failures (suite now 234/234)

Each failure was diagnosed to intent rather than blindly appeased:

- **useSeo (2)** — tests expected the title suffix "| ICJIA Accessibility Portal"; the composable deliberately uses the shorter "| ICJIA Accessibility" (documented ≤60-char SEO constraint, from the earlier "SEO fixes" commit). Tests updated to the intended behavior.
- **DownloadDialog (2)** — tests targeted a `v-btn` cancel button that had been replaced with an `<a href="javascript:void(0)" role="button">` link. That markup was itself an accessibility wart (announces as a button but doesn't activate on Space), so the control is now a real `<button type="button">` with identical styling, and the tests target it — one now also asserts the aria-label it was named for.
- **usePrintLinks (3)** — tests mounted content outside `.print-container`, the scope the composable (correctly) restricts itself to, and asserted pre-conversion behavior. Tests now mirror the real print-page DOM and assert the actual contract: internal anchors become non-interactive `span.print-internal-link` elements.

### Changed — full-app tone pass (colleague voice: professional, accurate, not lawyerly, not absolute)

Reviewed every FAQ answer and every user-facing UI string against the owner's voice target; applied ~160 phrase-level edits across `content/faqs.md`, `content/links.md`, and 8 app/script files. Verbatim regulation quotes, citations, dates, and legal meaning untouched throughout — hard requirements stay hard, but are now attributed to the rule ("§ 35.107 requires…") instead of commanded by the FAQ ("you must… not optional").

- **De-absolutized:** removed "No. This is wrong.", "⚠️ CRITICAL"/"This is critical:" alarms, "not optional" (×4), "you cannot refuse", "Never edit", "full stop", "It is not.", the "no downsides/no tradeoff/no ambiguity" overclaim cluster, ~10 "Always …" commands on practice advice, and shouting caps (ALL FOUR, NOT, YES/NO table cells → sentence case).
- **De-lawyered:** "codified at" → "lives at", "companion provision" → "its neighbor", "non-delegable" → "stays with the agency", "immunity period" → "grace period", "exposure" → plain phrasing, "private right of action" sentence rewritten in plain language, "is excepted/opposite of excepted" → plain, section-symbol stacks spelled out ("Section 5 … Section 10 …"), "defensible/risk posture/fact-specific/attaches/operative/scheme" all translated; softened "authoritative legal analysis" for the OSU commentary per the sourcing-pillars rule.
- **Warmed and tightened:** scolding recasts removed ("Directing staff to ignore…" → "Putting accessibility on hold…", "babysit your output" → "check every new piece you publish", "most managers haven't thought through" → "easy to overlook"), duplicate sentences cut, passive institutional voice made active.
- **UI copy:** post-deadline countdown message no longer barks "Immediate action is required"; download dialog drops superlatives ("Perfect/Ideal/excellent/beautifully") and its absolute "fully accessible" claim; error page now says "Something Went Wrong" for non-404s (was "500 - Page Not Found") with a friendlier message; search page copy no longer tells users to check their spelling while advertising typo-tolerant search; deadline label standardized to "ADA Title II Compliance Deadline" across countdown and homepage; TXT download gains the not-legal-advice line its sibling formats already carried; DOCX/MD download headers synced with the softened frontmatter disclaimer and "ADA guidelines" corrected to "ADA requirements".

Editorial-only pass: no facts changed, so individual Q&As were not re-tagged `{updated:}` (displayed dates already read August 13, 2026).

### Verification

- Test suite: **234/234 passing** (one dialog test updated where it asserted the old marketing copy).
- axe-core AA: `/` and `/faqs` — 0 violations; 404 page verified in-browser (heading, friendlier message, correct title).

---

## [1.3.0] - 2026-08-13

### Refactor — homepage and /faqs now share one FAQ component (parity by construction)

User testing caught the homepage FAQ list showing no NEW chips while /faqs showed them — because the two pages each carried their own near-copy of the FAQ pipeline (section builder, chip wiring, sorting), and the v1.2.11–13 chip work only reached /faqs. This release ends that class of bug: the entire FAQ experience now lives in one shared component, **`app/components/FaqBrowser.vue`** — frontmatter-driven disclaimer card, title/sort header, review-status panel, intro content, sectioned `FaqAccordion` with New/Updated chips, and all sorting logic — rendered by both routes with small presentational props (`title-tag`, `show-description`, `wrap-in-card`, `inject-faq-schema`).

**Parity gains for the homepage** (previously drifted): dated ★ NEW chips, New-first "Latest first" ordering, the review-status panel, the frontmatter-driven disclaimer (was hardcoded text), and `aria-hidden` on the FAQ title icon. **Parity gain for /faqs**: the dynamic deadline-text replacement (countdown-aware phrasing like "X days remain…") that previously ran only on the homepage. `/faqs` keeps its `h1`, card layout, and FAQPage structured data (schema injection is prop-gated to that route).

### Added — dates on NEW chips

The NEW chip now reads "★ New on mm/dd/yyyy," matching the "Updated on mm/dd/yyyy" chip format, on both pages and in the print version ("NEW mm/dd/yyyy").

### Verification

- Both routes verified in-browser: "Latest first" leads with all 8 "★ New on 08/13/2026" chips, then the 18 "Updated on 08/13/2026" chips; review panel and disclaimer present on both; /faqs retains h1 + card + FAQPage schema.
- axe-core AA audits: `/` — 0 violations; `/faqs` — 0 violations.
- Test suite: 227 passing; same 7 pre-existing failures.
- `index.vue` shrank by ~370 lines of duplicated template/logic/styles.

---

## [1.2.14] - 2026-08-13

### Improve — "Last reviewed" promoted to a visible review-status panel

The v1.2.11 "Last reviewed / Last updated" line rendered as caption-size, medium-emphasis text under the page description — technically present, practically invisible (user testing on prod: it went unnoticed). It is now a proper review-status strip on `/faqs`: calendar-check icon, normal-size text ("**Last reviewed:** … · **Last updated:** …"), and the note "These FAQs are re-verified periodically against official sources," styled on the same audited surface-variant + primary-left-border pattern as the section headings. `role="note"` for assistive tech; icon `aria-hidden`.

Also added a "Reviewed:" date to the home page's Created/Updated caption line (new `lastReviewed` constant in `index.vue`, alongside the countdown-date constants that get refreshed each release).

### Verification

- Local axe AA audit with the new panel: **0 violations**; test suite unchanged (227 passing, 7 pre-existing failures).
- Production re-verified via a fresh isolated browser session: "Latest first" leads with all 8 "★ New" chips (#1d4ed8) followed by the 18 "Updated on 08/13/2026" chips — confirming v1.2.12/v1.2.13 behavior is live and earlier "missing chips" reports trace to browser-cached assets.

---

## [1.2.13] - 2026-08-13

### Improve — star prefix on the NEW chip (color-independent cue)

User testing of the deployed chips showed the New/Updated distinction was easy to miss at a glance: in dark mode, v1.2.11's pale-blue NEW chip sat beside pale-green UPDATED chips — a color-only difference, weak for everyone and near-invisible for deuteranopia. v1.2.12's dark-blue chip helps; this release adds a **★ prefix** (aria-hidden, so screen readers still hear just "New") so the cue no longer depends on color perception at all. Combined with the New-first "Latest first" ordering, newly added questions are now unmistakable.

### Verification

- axe-core AA audit on live `/faqs/` (v1.2.12): **0 violations** — contrast hotfix confirmed on production; local re-audit with the star prefix: 0 violations.

---

## [1.2.12] - 2026-08-13

### Fix — NEW chip color contrast (WCAG 1.4.3)

A post-deploy axe audit of the live site found one serious violation introduced in v1.2.11: the NEW chip used the theme's `primary`/`on-primary` pair, and the light theme's primary (`#2563EB`) with white 10px text sits below the 4.5:1 minimum — flagged on all eight new Q&As (the dark theme masked it during pre-deploy checks). The chip now uses fixed colors — white on `#1d4ed8` (the palette's own darker brand blue) — which computes to **6.7:1 in both themes**. Theme tokens were deliberately not used: the dark theme's lighter primary (`#3B82F6`) would fail with white text.

### Verification

- axe-core AA audit: live `/faqs/` before fix — 1 serious violation (color-contrast, 8 elements); local `/faqs` after fix — **0 violations**.

---

## [1.2.11] - 2026-08-13

### FAQ — August 2026 accuracy review, eight new Q&As, NEW/UPDATED chips, "Last reviewed" date

### Added — eight new Q&As (each tagged `{new:2026-08-13}`)

1. **"Is the April 26, 2027 deadline final, or could a court move it back?"** — the IFR's unfinished rulemaking + the NFB v. DOJ vacatur risk, and why the safe strategy is identical under every outcome (Compliance Requirements).
2. **"Did the federal deadline extension give Illinois agencies an extra year?"** — No: quotes DoIT's April 20, 2026 announcement verbatim ("…the extension only changes when the DOJ may begin taking additional enforcement actions"); two-clock table of IITAA-now vs. federal-2027 (Compliance Requirements).
3. **"Can we face complaints or lawsuits before April 2027?"** — pre-deadline exposure under § 35.130 (since 1991), § 35.160 effective communication (quoted verbatim from eCFR), and 42 U.S.C. § 12133 private enforcement (Compliance Requirements).
4. **"Did the Section 504 web deadlines change too?"** — HHS's parallel May 2026 IFR (May 11, 2027 / May 10, 2028), framed strictly as context per the sourcing-pillars rule (Compliance Requirements).
5. **"Could the IITAA standards change in 2026?"** — 30 ILCS 587/25 quoted verbatim: DoIT must review the standards "in calendar year 2026"; what that means for planning and procurement (Compliance Requirements).
6. **"Should we test against WCAG 2.2 or WCAG 2.1?"** — legal targets pin 2.1 AA (the rule IBRs the June 5, 2018 version); 2.2 as voluntary headroom; WCAG 3.0 caution (Common Concerns).
7. **"What if a vendor has no VPAT or refuses to provide one?"** — five-step escalation path ending in documented risk acceptance + accessible alternative (Procurement).
8. **"A vendor's VPAT uses WCAG 2.2 — does it satisfy our WCAG 2.1 AA requirement?"** — usually yes; how to read 2.2-based ACRs against a 2.1 target, and why WCAG 2.0-only ACRs are the real red flag (Procurement).

All eight added to the Keyword Index. Also extended "Is Canva accessible?" with a step-by-step tagged-PDF export procedure (PDF Standard export, "Flatten PDF" unchecked, Edit text semantics, verify in PAC).

### Added — NEW vs UPDATED chips (21-day window)

- **New `{new:YYYY-MM-DD}` tag** for brand-new questions renders a **"NEW" chip** (primary color); `{updated:YYYY-MM-DD}` now renders an **"Updated on mm/dd/yyyy" chip** (success color) — so readers can tell at a glance what was added vs. revised, and nothing gets lost.
- **Badge window extended from 10 to 21 days** (`NEW_QUESTION_DAYS` in `app/utils/faqTransform.ts`).
- **"Latest first" sorting ranks NEW above UPDATED on date ties**, so a review cycle that adds and revises questions on the same day surfaces all the brand-new material at the very top (verified in-browser: all 8 new Q&As lead the list, followed by the 18 updated ones).
- New `extractTaggedInfo()` util returns `{date, kind}`; `extractTaggedDate()` retained for compatibility; both tag kinds stripped from rendered/exported output.
- `/faqs-print` now uses the shared util (its local copy only matched `{new:}` and used a 10-day window, so its badges never fired for the `{updated:}` tags the content actually uses — fixed) and prints "NEW" / "UPDATED mm/dd/yyyy" chips.
- Download generators updated: Markdown exports show 🆕 *New* / 🔄 *Updated*, plain text shows [NEW] / [UPDATED], Word skips both tags.
- Docs updated (CLAUDE.md, README, FAQ_CONTENT_GUIDE); 6 new unit tests, and window-boundary tests recalibrated to 21 days.

### FAQ — August 2026 accuracy review, "Last reviewed" date, NFB-litigation note

Full re-verification of the FAQ against primary sources as of August 13, 2026 — every load-bearing claim checked against eCFR, the Federal Register, ADA.gov, Illinois DoIT, ILGA, W3C, CDC, and vendor documentation (~250 claims, ~190 links). Core premise confirmed: the April 20, 2026 DOJ Interim Final Rule (91 FR 20902, AG Order No. 6742-2026) remains in effect and codified — current eCFR § 35.200(b) reads April 26, 2027 (≥50k population) / April 26, 2028 (<50k and special districts), WCAG 2.1 AA unchanged, with no amending action since the comment period closed June 22, 2026.

### Added

- **"Last reviewed" date** — new `lastReviewed` frontmatter field (validated in `content.config.ts`), displayed at the top of `/faqs` ("Last updated … · Last reviewed …" plus a "reviewed periodically" note) and in the `/faqs-print` header and footer, so readers can see the FAQ is re-verified on a schedule.
- **Litigation note** — _National Federation of the Blind v. Department of Justice_ (D. Md., filed May 21, 2026) challenges the deadline extension under the APA and seeks restoration of the original dates. Noted in the executive summary and the "When must we comply?" Q&A with NFB press-release and docket links: the extended dates remain law, but agencies should treat the extra year as provisional.
- **Special-district row** in the compliance-deadline table — special district governments get April 26, 2028 regardless of population under § 35.200(b)(2); the previous two-row table implied population alone controls.

### Changed — quote hygiene (the FAQ's "direct quotes" promise, enforced)

- **§ 35.200(b) "verbatim" quote replaced with the actual regulation text** (fetched from the eCFR API, current through Aug 11, 2026). The prior quote's sentence structure ("A public entity that, on April 24, 2024, has a total population of …") appears nowhere in the section and omitted both special-district clauses. The true text also surfaces the fundamental-alteration/undue-burden proviso the FAQ never quoted before.
- **Removed an unverifiable ALA quotation** ("The exceptions are narrow and specific…") that does not appear on the cited ALA page.
- **§ 35.201 exceptions block now true verbatim** (was a paraphrase labeled "Verbatim"), including "this subpart" (not "this rule") in (e), the two-part § 35.201(d) test, and the (b) "available … before" posting-date language.
- **DOJ "First Steps" quotes now match the page word-for-word** (the prior version hybridized two different sentences); the scope quote misattributed to the DOJ fact sheet is now correctly quoted from and attributed to 28 CFR § 35.200(a).
- **DoIT IITAA quotes** now carry the page's full sentence ("The Illinois Information Technology Accessibility Act (IITAA) requires…") with an explicit _(emphasis added)_ marker where the FAQ bolds words.

### Changed — statistics and technical claims

- Illinois disability prevalence corrected to match the cited CDC DHDS source: **~2.3 million adults, roughly 1 in 4 (23.7%, 2022 BRFSS)** — was "1.3 million (12.6%)," a figure from a different (Census ACS-style) source. National figure updated from "over 60 million" to **more than 70 million adults**; cognitive-difficulty prevalence updated from ~12% to **~14%** with a CDC citation.
- **axe-core best-practice claim corrected** (it was backwards): a bare `axe.run()` *does* include axe's best-practice rules; ICJIA's audits exclude them because they restrict to WCAG A/AA tags via `runOnly`. AAA rules are off by default either way.
- Deque automated-coverage range restated as **20–57%** to match the cited study (57% found; 20–30% prior industry estimates).
- #999999-on-white contrast example corrected from 3.0:1 to **2.8:1**; § 35.200(b)(1)–(2) (not (b)(3)) now cited as the source of the A/AA mandate.
- **audit.icjia.app description rewritten to match the current tool**: audits PDF, Word, PowerPoint, and Excel (was "PDF only"); produces A–F letter grades with severity-ranked findings (was "pass/fail per check"); offers optional server-side PDF auto-remediation (was "checker, not a remediator"); files are processed server-side in memory and deleted immediately (was "processed locally in your browser — not uploaded"); GitHub link updated to the renamed `ICJIA/file-accessibility-audit` repo.
- **Canva guidance updated**: Canva now exports tagged PDFs (PDF Standard export with "Flatten PDF" unchecked, "Edit text semantics" for headings/reading order); exports still commonly fail PDF/UA, so verify in PAC.
- UI paths refreshed: Acrobat "All tools > Prepare for accessibility" (legacy paths noted), Office "View Alt Text" label, new-Outlook accessibility checker location, Gmail image alt text (supported since 2022 — the FAQ said the opposite), X's "+ALT" button.
- "PAC 2024" → version-neutral "PAC (PDF Accessibility Checker)" (current release is PAC 2026); "IT Industry Council" → **Information Technology Industry Council** (ITI); MCAR relabeled as an informal solicitation term rather than a standardized synonym for ACR; softened the unsourced "2–10x" remediation-cost multiplier; "sixteen-plus years" of IITAA → eighteen; Section 508 context added to the "first technical standard" claim.
- Social-media exception bullets reframed: § 35.201(e) has no "currently used" carve-out (the pinned/linked-post limits were practice advice presented as legal limits — now labeled as practical caution).

### Fixed — broken/moved links (12)

- Illinois DoIT training page (404, site restructure) — six references now point to DoIT's Accessibility Guides page, with training requests via DoIT.Accessibility@Illinois.gov; the IITAA-training Q&A no longer lists the retired course catalog.
- ILGA statute link for 30 ILCS 587 (ILGA redesign killed `ilcs3.asp` URLs) → new `Legislation/ILCS/Articles` URL.
- `initiatives/accessibility/iitaa-2-1-update.html` (path-mix 404) → the real IITAA 2.1 Standards page; `ada.gov/topics/web-accessibility/` → `ada.gov/resources/web-guidance/`; `ada.gov/topics/title-i/` → archive.ada.gov Title I page (and the "ADA Title I Regulations" label corrected to "ADA Statute (as amended)"); CDC infographic → post-2024-migration URL; R3 audit report → `/documentation/accessibility/`; SFS → `/accessibility` statement page.
- `index.vue` countdown target now uses the explicit Chicago offset (`2027-04-26T00:00:00-05:00`), matching `useDeadlineCountdown` and the project convention.

### Known issues (flagged, not fixed)

- **i2i and VPP audit-report links return 404** with no discoverable replacement — need correct paths from those sites' owners (or re-publish the reports).
- **HHS Section 504 fact-sheet link** blocks automated checks (403); verify manually in a browser.
- **7 pre-existing test failures** (useSeo site-name suffix, DownloadDialog cancel aria-label, usePrintLinks link styling) — present on clean `main` before this change; tests appear stale relative to earlier copy changes.

### Verification

- All verification performed against primary sources; § 35.200 text pulled directly from the eCFR API (current through 2026-08-11).
- Replacement URLs curl-verified 200 before substitution (CDC and NFB pages are bot-blocked 403 but confirmed current via search indexes and agent cross-checks).
- Full test suite: 221 passing, 7 failures — identical failures reproduce on clean HEAD (verified via stash), so no regressions from this change.
- `/faqs` and `/faqs-print` confirmed in-browser: dates line renders ("Last updated … · Last reviewed August 13, 2026"), print header/footer carry both dates.

---

## [1.2.10] - 2026-05-14

### FAQ — official-source citation sweep + new IAAP-certification Q&A

Both changes follow the principle that, for an Illinois state agency, only the three governing authorities — the IITAA, ADA Title II, and WCAG 2.1 — carry weight as sources.

### Changed

- **Every regulatory citation now links to an official government source.** Replaced all 30 `law.cornell.edu` (Cornell LII) links in `content/faqs.md`:
  - 28 CFR Part 35 sections (§§ 35.107, 35.130, 35.200, 35.201, 35.205) → the official **eCFR** (`ecfr.gov`), with the correct subpart path for each section.
  - U.S. Code sections (42 U.S.C. §§ 12131–12133; 29 U.S.C. § 794) → **govinfo.gov**, the U.S. Government Publishing Office's official permalink service.
  - "(Cornell LII)" labels updated to "(eCFR)". Cornell LII only mirrors the regulation text — but a citation labeled as a third-party legal site reads as carrying no weight for a state agency. The authority itself was never in question (28 CFR Part 35 _is_ the ADA Title II regulation); the host and label were. Net result: 24 eCFR + 7 govinfo.gov official links, zero third-party-mirror links.

### Added

- **New Q&A: "Does IAAP certification help — and can it build agency confidence in our accessibility work?"** in the State Agency Applicability section. A qualified yes: IAAP certification (CPACC, WAS, CPWA) is not required by any of the three governing authorities, but it can build agency confidence — as a structured path to genuine competence, a credible signal of good-faith investment, and a hedge against single-person risk — provided it is understood as strengthening the _people_ doing the work, not as a substitute for the _content_ meeting WCAG 2.1 Level AA. Cross-linked with the coordinator Q&A and the "can we certify compliance?" Q&A; added to the Keyword Index.

### Verification

- All 98 unit tests pass; **202/202 internal links valid** (faqInternalLinks suite).
- Zero `law.cornell.edu` links remain in the FAQ; confirmed in-browser (no Cornell links anywhere on the rendered `/faqs` page).
- New IAAP Q&A confirmed in-browser: renders fully, and its deep-link scrolls to and expands the panel correctly on a fresh load.

---

## [1.2.9] - 2026-05-14

### FAQ — adversarial review pass: accuracy fixes, primary-source strengthening, new remediator-liability Q&A

A fresh adversarial read of every Q&A in `content/faqs.md`, scoped to the three authorities that actually govern an Illinois state agency — **IITAA, ADA Title II, and WCAG 2.1**. The April 20, 2026 DOJ Interim Final Rule (deadline extension to April 26, 2027) was re-verified against primary sources and confirmed accurate as described in the FAQ.

### Added

- **New Q&A: "Does hiring a remediator shield our agency from compliance liability?"** in the Procurement and Third-Party Tools section. Answers a recurring manager assumption with a clear "no": the duty is non-delegable on the face of `28 CFR § 35.200(a)` ("a public entity shall ensure") and `§ 35.130(b)(1)` ("directly or through contractual, licensing, or other arrangements"); enforcement runs against the public entity, not the vendor; and a contract can shift _cost_ (indemnification) but not _liability_. Includes a cost-vs-liability table and reframes the remediator as leverage and evidence, not a shield. Reciprocal "See also" link added to the existing remediation-firm Q&A, and both are now listed in the Keyword Index (the remediation-firm Q&A had been missing from the index).
- **`28 CFR § 35.130(b)(1)` verbatim pullouts** added to "What is the ADA Title II digital accessibility rule?", the third-party-tools Q&A, and the remediation-firm Q&A. This is the general non-discrimination provision — in force since 1991 — and the cleanest statement that an agency cannot do through a contractor what it cannot do itself. The FAQ's non-delegation argument previously rested only on the 2024 web rule's `§ 35.200(a)`.
- **`28 CFR § 35.107` citations** added to "Do we need an agency accessibility coordinator?" (with a new References block) and "How do we handle accessibility complaints?". The section _requires_ public entities with 50+ employees to designate a responsible ADA Coordinator (§ 35.107(a)) and adopt/publish grievance procedures (§ 35.107(b)) — both Q&As now frame these as legal requirements, not just best practices.
- **`42 U.S.C. § 12132`** (the core Title II statutory prohibition) added to "What is the ADA Title II digital accessibility rule?".
- **`30 ILCS 587/5, /10, /15` pinpoint citations** added to "What is the IITAA?" — the FAQ previously cited only the DoIT website describing the IITAA, not the statute itself.
- **WCAG 2.1 Conformance Requirement 3 (Complete Processes)** verbatim pullout added to the third-party-tools Q&A — the regulatory backing for "test the whole workflow, not just the landing page."
- **Expanded "Do we need an agency accessibility coordinator?"** with sections on coordinator qualities, knowledge, and experience; whether being an IT or other manager is enough; whether a project manager (PMP/Six Sigma) can run accessibility "as a project" (answer: a PM can run the legacy-remediation _project_, but accessibility itself is an ongoing _program_, not a project — grounded in `§ 35.200`'s continuous-state obligation, per-publish WCAG conformance, and IITAA's 16-year track record); and IAAP CPACC certification (not required by any of the three governing authorities, but can help as a structured knowledge path). The role is framed as permanent, not a "get to April 2027" appointment.
- **Expanded "How does digital accessibility and compliance fit into an agency's DEIA mission?"** with an ICJIA-specific section: disability is over-represented in justice-involved populations, so inaccessible ICJIA content disproportionately excludes the exact community the agency exists to serve — accessibility is ICJIA's social- and criminal-justice mission applied to its own digital front door, not a compliance side-task.

### Fixed

- **Accuracy + internal contradiction — ADA Title II damages.** "Who's going to notice if we're not compliant?" stated that "ADA Title II doesn't provide for monetary damages to individuals" — inaccurate, and it contradicted another Q&A. Rescoped to what the three pillars support, deferring monetary-damages questions to legal counsel.
- **Accuracy — statute of limitations.** The same Q&A claimed "the ADA does not have a statute of limitations." Replaced with the defensible point: a barrier left in place stays exposed; the obligation does not expire when the deadline passes.
- **Citation precision — effective communication.** The exceptions Q&A cited `§ 35.130` for the effective-communication obligation; corrected to `§ 35.160` ("Communications"), the specific provision.
- **Accuracy — WCAG version compatibility.** "What does WCAG 2.1 Level AA mean?" claimed WCAG versions are fully backward-compatible; added the known exception (WCAG 2.2 removed SC 4.1.1 Parsing, so it remains in 2.1 but not 2.2 — trivially met by modern HTML in practice).

### Changed

- `{updated:2026-05-14}` tag set or added on all 11 touched/new Q&As so the "Updated" badge reflects the edit.
- Displayed "last updated" dates refreshed to May 14, 2026: `content/faqs.md` frontmatter `lastUpdated` and the two `_Last updated:_` prose markers, plus the home-page countdown-timer constant in `app/pages/index.vue` (the `Created` date is now the exact first-commit date, December 15, 2025).

### Verification

- All 98 unit tests pass (`yarn test:unit`), including the internal-link checker: **194/194 internal links valid** — confirms the new Q&A's anchor and every new cross-link resolve.
- `faqTransform` and `faqInternalLinks` suites pass; no new near-max-length IDs introduced.
- axe-core AA not re-run for this content-only change — run `yarn audit:a11y` before deploy if a fresh 0-violations confirmation is wanted.

---

## [1.2.8] - 2026-05-06

### FAQ — new Q&A: "Why does SiteImprove show 98% when axe-core shows 100%?"

A new question in the Website Accessibility section addressing a recurring source of manager confusion: SiteImprove's overall score is a weighted rollup that mixes WCAG AAA and SiteImprove's own "best practices" into the same number as Level A and AA results. When the law (ADA Title II web rule + IITAA 2.1 Standards) only requires WCAG 2.1 Level AA, sub-100 SiteImprove rollups are usually being pulled down by AAA criteria or editorial best-practice rules — not real AA failures.

**Worked example uses the actual ICJIA SiteImprove export of vpp.icjia.illinois.gov (Violence Prevention Plan, May 6, 2026).** Of 75 issue rules tested:

  - 38 of 38 Level A rules: 100/100
  - 10 of 10 Level AA rules: 100/100
  - 5 of 8 Level AAA rules: 100/100; 3 below 100 (color contrast enhanced 1.4.6, target size enhanced 2.5.5, visual presentation 1.4.8)
  - 6 of 6 WAI-ARIA authoring practice rules: 100/100
  - 12 of 13 SiteImprove "best practices": 100/100; 1 below 100 (overuse of italics — not in WCAG)

The Q&A walks through how to read a SiteImprove report when AA is the target (filter by Conformance column), explains how axe-core's default rule set differs (WCAG A + AA only; AAA and best-practice tags are opt-in), and gives three rules of thumb for handling scanner disagreement: aim for AA (AAA is a stretch goal), treat SiteImprove "best practices" as editorial guidance, and when tools disagree look at rule sets first rather than scores.

Placed between "How do I test my website for accessibility?" and "Do we need an independent (external) accessibility audit?" so it sits in the natural reading flow for someone working through the testing/audit material.

axe-core AA on /faqs: 0 violations.

---

## [1.2.7] - 2026-05-06

### Updated — bump all "Last updated" displayed dates to May 6, 2026

So the freshness signal on every page matches the actual most-recent edit:

- `content/faqs.md` frontmatter `lastUpdated: 2026-05-06` (already current) — drives the visible "Last updated" label on `/faqs` and `/faqs-print`.
- `content/faqs.md` two prose markers (`_Last updated: April 20, 2026_` at the top of the executive summary and at the end of the document) → `May 6, 2026`.
- `app/pages/index.vue` — the home page hardcoded `lastUpdated` constant → `"May 6, 2026"`.
- "As of March 2026, ICJIA has not yet designated an official accessibility coordinator" → "As of May 2026" (still accurate, no longer stale-looking).

Factual citations of historical events (DOJ IFR published April 20, 2026; original compliance dates of April 24, 2026 / April 26, 2027) are unchanged — they refer to specific dated events.

---

## [1.2.6] - 2026-05-06

### FAQ — inline VPAT definitions wherever VPAT is referenced

Acronym-on-first-use across the FAQ instead of relying on readers to find the canonical "What is a VPAT?" question. Every section that mentions VPAT/ACR before the canonical definition now has an inline gloss linking to the full Q&A.

**Spots covered (one inline gloss per section, applied at first-mention only):**

- Quick Reference checklists — executive + procurement bullets
- "How do I test my website for accessibility?" — third-party-tools row in the testing table
- Third-party-tools FAQ — full callout block right after first VPAT mention (covers the question's 9 subsequent mentions)
- Remediator-firm FAQ — division-of-labor table cell

The canonical "What is a VPAT? What is an ACR or MCAR?" Q&A and the Glossary entries (VPAT, ACR, MCAR, VPAT ratings, VPAT/ACR review) remain as the source of truth — the inline glosses link back to them.

---

## [1.2.5] - 2026-05-06

### FAQ — voice, Tableau coverage, source-vs-PDF Q&A, feedback callout

Pulling several reviewer-driven adjustments into one release:

### Added

- **New Q&A: "Why fix the source document (Word) instead of fixing the PDF after it's published?"** in the Content Accessibility section. Addresses the recurring manager misconception that a remediation vendor can clean up any published PDF and the source doesn't matter. Walks through the round-trip problem (every "Save As PDF" wipes prior PDF tagging), why Word's built-in accessibility checker matters, what the source carries that PDFs need (with a side-by-side table), the cost comparison, and the compounding effect of fixing the Word template once. WCAG citations: SC 1.1.1, 1.3.1, 1.4.1, 2.4.4, 2.4.6, 3.1.1.
- **Prominent "Disagreement is welcome — contact IDS" callout** under the introductory blockquote at the top of the FAQ. Frames the document as a work-in-progress maintained by ICJIA's IDS Unit by an IT staff member who's been working on accessibility for years (not a lawyer, not a designated accessibility officer — ICJIA hasn't named one yet) and explicitly invites pushback on framing, language, or claims. The "Why should I trust this FAQ" answer was strengthened with the same disagreement-welcome posture.
- **Tableau included alongside ArcGIS and Canva** in every "third-party embed" reference. Tableau is the most-used third-party tool at ICJIA, so it now leads the tool list in: the third-party-tools FAQ canonical phrasing ("A Tableau, ArcGIS, or Canva license you pay for…"), the "What that means in practice for…" section heading (now "Tableau, ArcGIS, Canva, and similar embeds"), and the remediator-firm contract-clause example for author training.

### Changed — voice/tone (less lawyerly, more passionate-IT)

The third-party-content and remediator-firm FAQs were rewritten to drop legalistic phrasing without losing the regulatory grounding (verbatim quotes still anchor every claim). Specific changes:

- "duty-bearer" / "the legal duty rests with…" / "regulated entity" / "compliance plane" / "operative carve-out" — replaced with plainer language ("the rule talks to the agency, not its vendors", "you can hire a vendor to do the work; you can't hire them to be the one who's responsible", "both rules point at the agency, not the vendor").
- "That is not how the law works" — replaced with "That isn't what the rule says, and it isn't how the experience works for users."
- "WCAG 2.1 Level AA is a continuous-state standard" — replaced with "WCAG 2.1 Level AA isn't a one-time audit grade — it's a property of the page (and digital documents) every time you publish," with the verbatim Conformance Requirement 2 quote inline.
- "Compliance with one is not a defense to the other" (in the IITAA-vs-ADA section) — softened to "Doing one well doesn't get you a pass on the other."
- "What gives WCAG legal force for state agencies" — softened to "what makes hitting WCAG 2.1 AA the way Illinois state agencies demonstrate they've met the requirement."

The disclaimer that this FAQ is not legal advice (already present in the frontmatter) was the load-bearing protection here; the body text no longer pretends to give legal opinions, just plain English summaries of what the actual rules say with the rules quoted alongside.

### Verification

- axe-core AA on `/faqs`: 0 violations.
- FAQ-related test files (faqTransform, faqInternalLinks, faqDownloadGenerators) all pass.
- Pre-existing test failures in useSeo / DownloadDialog / usePrintLinks (unrelated to these edits) remain.

---

## [1.2.4] - 2026-05-06

### FAQ content — primary-source pullouts across the FAQ + critical citation correction

Continuing the manager-skeptic-proofing pass started in v1.2.3. Pullouts now appear at the canonical question for each major regulatory or technical claim across the FAQ, anchored to verbatim text and direct primary-source links. Other Q&As cross-reference these anchors instead of paraphrasing.

### Fixed — critical citation correction (§ 35.200(b)(N) → § 35.201(a)–(e))

The FAQ's exceptions section had been citing the five ADA Title II web rule exceptions as `28 CFR § 35.200(b)(1)–(5)`. **This is incorrect.** Per the published rule (verified against Cornell LII):

- `§ 35.200` = "Requirements for web and mobile accessibility" (the duty + technical standard + compliance dates)
- `§ 35.201` = "Exceptions" (the five carve-outs)

`§ 35.200(b)` is the compliance-dates subsection — `(b)(1)` is the date for entities serving 50,000+, `(b)(2)` is the date for entities under 50,000, `(b)(3)` incorporates WCAG 2.1 by reference. None of those are exceptions. Fixed every occurrence (5 exception headings, 7 cells in the practical-examples table, 5 procedure-section bullet points, plus 3 cross-references in other questions). Anyone who quoted the wrong citation to colleagues should update their notes.

### Added — primary-source pullouts (verbatim, with links)

Each pullout uses the same format: bold "Verbatim from [source]:" header, blockquote with exact text, em-dash + linked source.

**Compliance Requirements section:**

- "What is the IITAA?" — DoIT IITAA "shall ensure" + WCAG 2.1 AA standard
- "Who must comply with the IITAA?" — DoIT scope quote
- "How is the IITAA enforced?" — DoIT IITAA-vs-ADA relationship quote
- "What does the IITAA cover?" — DoIT ICT-scope quote with explicit callout that IITAA reaches kiosks/hardware/telecom that the federal web rule does not
- "When did the current IITAA standards take effect?" — DoIT effective-date quote with manager-facing reminder that IITAA 2.1 is in force NOW (since June 24, 2024)
- "What is the ADA Title II digital accessibility rule?" — verbatim 28 CFR § 35.200(a)
- "When must we comply with the ADA Title II rule?" — verbatim § 35.200(b) compliance dates as extended by the April 20, 2026 IFR
- "What does the April 2027 deadline cover?" — § 35.200(a) scope quote
- "Does ADA Title II apply to internal documents?" — IITAA broader-scope quote
- "Are there exceptions to the April 2027 deadline?" — verbatim § 35.201 anchor with all five exceptions

**Common Concerns section:**

- "What is WCAG?" — WCAG 2.1 "Layers of Guidance" + "why WCAG matters legally" callout (regulations point to it = legal force)
- "What does 'WCAG 2.1 Level AA' mean?" — verbatim Conformance Requirement 1 (Conformance Level) and Conformance Requirement 2 (Full pages, "cannot be achieved if part of a web page is excluded")

**State Agency Applicability section:**

- "What if we can't meet the April 26, 2027 deadline?" — verbatim 28 CFR § 35.205 ("Effect of noncompliance that has a minimal impact on access") with explicit warning that the provision is much narrower than it sounds

**Website Accessibility section:**

- "What color contrast ratio is required?" — verbatim WCAG 2.1 SC 1.4.3 "Contrast (Minimum)" with all three exceptions (Large Text, Incidental, Logotypes)
- "Do I need to caption all videos?" — verbatim WCAG 2.1 SC 1.2.2 (Prerecorded), SC 1.2.4 (Live), SC 1.2.5 (Audio Description)
- "Does our agency's password-protected intranet need to be accessible?" — IITAA quote anchoring why state law reaches employee-facing intranets even when the federal web rule does not; clarifies that § 35.201(d) is for individualized documents, not shared internal portals

**Social Media Accessibility section:**

- "Do social media posts need to be accessible?" — verbatim § 35.201(e) with note that the exception applies only to posts before the agency's compliance date

### Sources used (all linked from the FAQ body)

- <a href="https://www.law.cornell.edu/cfr/text/28/35.200" target="_blank" rel="noopener noreferrer">28 CFR § 35.200 (Cornell LII)</a>
- <a href="https://www.law.cornell.edu/cfr/text/28/35.201" target="_blank" rel="noopener noreferrer">28 CFR § 35.201 (Cornell LII)</a>
- <a href="https://www.law.cornell.edu/cfr/text/28/35.205" target="_blank" rel="noopener noreferrer">28 CFR § 35.205 (Cornell LII)</a>
- <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">Illinois DoIT: IITAA</a>
- <a href="https://www.w3.org/TR/WCAG21/" target="_blank" rel="noopener noreferrer">WCAG 2.1 Specification (W3C, normative)</a>
- <a href="https://www.w3.org/TR/WCAG21/#conformance" target="_blank" rel="noopener noreferrer">WCAG 2.1 § 5 Conformance</a>
- <a href="https://www.w3.org/TR/WCAG21/#contrast-minimum" target="_blank" rel="noopener noreferrer">WCAG 2.1 SC 1.4.3 (Contrast Minimum)</a>
- <a href="https://www.w3.org/TR/WCAG21/#captions-prerecorded" target="_blank" rel="noopener noreferrer">WCAG 2.1 SC 1.2.2 (Captions Prerecorded)</a>

### Verification

- axe-core AA across `/`, `/faqs`, `/faqs-print` — 0 violations after every edit batch.

---

## [1.2.3] - 2026-05-06

### FAQ content — primary-source quote blocks for the third-party content + remediator FAQs

Authors and managers reading the v1.2.2 FAQs reported that without verbatim regulatory quotes and direct links to primary sources, the guidance was easy to dismiss as the FAQ author's interpretation. Both new FAQs now include a "What the rules actually say (verbatim, with sources)" block with quoted-and-linked text from each primary source — usable as a copy-paste memo when a manager pushes back.

- **Refined: third-party tools FAQ (ArcGIS / Canva / etc.)** — added verbatim quotes from 28 CFR § 35.200(a) (Cornell LII), 28 CFR § 35.201(c) (the third-party exception), DoIT's IITAA scope and IITAA-vs-ADA-relationship statements, DoIT's IITAA Procurement contract-language template, WCAG 2.1 Conformance Requirement 2 (Full pages), and W3C WAI "Understanding Conformance" on third-party implementations. Each block links directly to its source.
- **Refined: remediator-firm FAQ** — same primary-source block, plus a new "Why IITAA matters even if you think you're 'covered' by ADA Title II" section. The new section addresses the recurring assumption that compliance with the federal rule is the same thing as compliance with Illinois state law. Quoted directly from DoIT: "the IITAA establishes specific technical standards and encourages the State to address accessibility proactively" — establishing IITAA as a separate, simultaneously-enforceable obligation that has been in effect since 2008, has broader scope than the federal web rule (covers ICT including kiosks, hardware, telecom equipment), and runs through DoIT's enforcement path rather than DOJ's.

### Sources used (all linked from the FAQ body)

- <a href="https://www.law.cornell.edu/cfr/text/28/35.200" target="_blank" rel="noopener noreferrer">28 CFR § 35.200 (Cornell LII)</a>
- <a href="https://www.law.cornell.edu/cfr/text/28/35.201" target="_blank" rel="noopener noreferrer">28 CFR § 35.201 (Cornell LII)</a>
- <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">Illinois DoIT: IITAA</a>
- <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa/iitaa-procurement.html" target="_blank" rel="noopener noreferrer">DoIT: IITAA Procurement Guidance</a>
- <a href="https://www.w3.org/TR/WCAG21/#conformance" target="_blank" rel="noopener noreferrer">WCAG 2.1, Section 5 (Conformance)</a>
- <a href="https://www.w3.org/WAI/WCAG21/Understanding/conformance" target="_blank" rel="noopener noreferrer">W3C WAI: Understanding Conformance</a>

### Verification

- axe-core AA across `/`, `/faqs`, `/faqs-print` — 0 violations.

---

## [1.2.2] - 2026-05-06

### FAQ content — third-party content and remediation-firm misconceptions

Two recurring author misconceptions surfaced from recent agency conversations: (1) "we just embed an iframe — the vendor is responsible," and (2) "we hired a remediation firm, so staff don't need to worry about accessibility anymore." Both were addressed directly in `content/faqs.md` with explicit citations to ADA Title II 28 CFR § 35.200, IITAA / IITAA 2.1 Standards (30 ILCS 587), and WCAG 2.1 Level AA. Tagged `{new:2026-05-06}` so they sort to the top of "Latest first."

- **Refined: "How do we ensure accessibility compliance with third-party tools…"** — title now includes Canva alongside the existing LMS/DocuSign/Tableau/ArcGIS list. Added a prominent upfront section addressing the "we only get an iframe" misconception, a per-rule rundown (28 CFR § 35.200 contractual-arrangement responsibility under ADA Title II; IITAA's no-carve-out posture; WCAG 2.1 AA's medium-agnostic application), Canva-specific guidance (Canva embeds/exports inherit author choices about contrast, color, and alt text; PDF exports are typically untagged), and ArcGIS-specific guidance (Esri VPATs are per-product-line; embed iframes need a keyboard exit path; provide an HTML data-table alternative).
- **New: "We hired a third-party remediation firm — does that mean authors don't need to learn accessibility anymore?"** — explains why the legal duty under ADA Title II § 35.200 and IITAA 2.1 stays with the public entity regardless of vendor engagement, why WCAG 2.1 AA is a continuous-state standard (not a one-time audit grade), and how a remediator-and-author division of labor actually works. Includes recommended contract clauses (knowledge transfer, author training, re-test rights, WCAG 2.1 AA acceptance criterion, deliverables held by the agency).

### Changed

- `content/faqs.md` — `lastUpdated: 2026-05-06`.

### Verification

- axe-core AA across `/`, `/faqs`, `/faqs-print` — 0 violations.

---

## [1.2.1] - 2026-05-06

### Fixed

- **Production CSP unblocking client sqlite-wasm** — `netlify.toml` `Content-Security-Policy` `script-src` now includes `'wasm-unsafe-eval'`. Nuxt Content 3 ships sqlite-wasm to the client to back content queries; the previous policy blocked WebAssembly compilation in production, surfacing as console errors (`WebAssembly.instantiate(): … violates the following Content Security policy directive`) on accessibility.icjia.app. Dev was unaffected because Netlify headers don't apply to the local server. `'wasm-unsafe-eval'` is scoped to WebAssembly only — it does **not** enable `eval()`/`Function()` in JavaScript, so the strict CSP posture is preserved.
- **`aria-describedby` broken-reference (WCAG 4.1.2)** — `app/components/FaqAccordion.vue` set `aria-describedby="answer-XXX"` on every collapsed FAQ trigger, but Vuetify's `v-expansion-panel-text` lazy-renders its slot, so the referenced ID didn't exist in the DOM until the panel was opened. axe-core flagged 99 elements on `/` and `/faqs` ("ARIA attribute element ID does not exist on the page"). Removed the binding — the question text already provides the trigger's accessible name and Vuetify continues to manage `aria-expanded` for the disclosure pattern.
- **Empty `<table>` in FAQ content (WCAG 1.3.1)** — `content/faqs.md` rendered an example "hard to make accessible" table as live HTML with a header row and no body rows, tripping `th-has-data-cells`. Converted to a fenced code block — preserves the visual demonstration of the wide markdown table without producing an ill-formed DOM table.
- **Scrollable `<pre>` on `/faqs-print` without keyboard access (WCAG 2.1.1)** — `app/pages/faqs-print.vue` styled `pre` with `overflow-x: auto`, creating a horizontally-scrollable region that keyboard users couldn't reach. Switched to `white-space: pre-wrap; word-break: break-word` so long lines wrap. Bonus: print output no longer truncates wide code blocks.

### Accessibility audit

Full axe-core sweep across all five pages (`/`, `/faqs`, `/faqs-print`, `/links`, `/search`) — **0 WCAG A+AA violations** before and after fixes. The four needs-review items listed above were resolved at the source.

A separate contrast audit was run with `contrastcap` (pixel-sampling, supplementary to axe). Confirmed one **false positive** on the homepage FAQ sort `<select>` (`#faq-sort-select-home`, reported as 1.69:1):

- Computed CSS in Chromium: `background-color: rgb(30, 41, 59)` (dark surface, opaque) over `color: rgb(248, 250, 252)` — actual ratio ~14:1, passes AAA.
- Cause of the false positive: the chevron is rendered via `background-image` (inline-SVG), which triggers contrastcap's `pixel-sample-over-image` fallback. The sampler blends chevron-stroke pixels into the bg sample and reports a degraded ratio that does not reflect the visible text background. Visual screenshot confirmed the rendered control is fully readable.
- No code change made; documenting here so future audits don't re-investigate the same artifact. If the warning needs to be silenced for tooling reasons, the chevron can be moved to a pseudo-element instead of `background-image`.

### Changed

- **README** — removed the now-stale `aria-describedby relationships linking FAQ questions to answers` claim from the ARIA support list. The accordion's accessibility now relies on the trigger's accessible name + Vuetify's `aria-expanded` for the disclosure pattern.

---

## [1.2.0] - 2026-04-20

### Deadline extended to April 26, 2027

On April 20, 2026, the U.S. Department of Justice published an [Interim Final Rule](https://www.federalregister.gov/documents/2026/04/20/2026-07663/extension-of-compliance-dates-for-nondiscrimination-on-the-basis-of-disability-accessibility-of-web) extending the ADA Title II web accessibility compliance date by one year. The portal has been updated to reflect the new deadlines.

### Changed

- **Countdown timer** now targets April 26, 2027 (previously April 24, 2026) — `useDeadlineCountdown.ts`, `CountdownTimer.vue`, `index.vue`, `faqTransform.ts`, `og-image-template.html`.
- **FAQ content (`content/faqs.md`)** — all deadline references updated from April 24, 2026 to April 26, 2027. The tiered-deadline table now shows April 26, 2027 (50k+ jurisdictions) and April 26, 2028 (under 50k). Slug-style anchors (`april-24-2026` → `april-26-2027`) and internal anchor links updated to match; section-heading slugs regenerate automatically from the new text.
- **Homepage compliance link** now reads "April 26, 2027" (fixed a missed line-wrapped reference).
- **Homepage `lastUpdated`** bumped to April 20, 2026.
- **Links page (`content/links.md`)** — compliance-dates table updated to reflect extension.
- **FAQ downloads (DOCX, MD, TXT)** — headers/footers now show April 26, 2027.
- **Print-friendly FAQs (`/faqs-print`)** — deadline text updated.
- **SEO meta description** on homepage now notes the one-year extension.
- **FAQ `lastUpdated`** frontmatter bumped to `2026-04-20`.

### Added

- **Permanent in-card extension notice** on the homepage countdown card — amber "Extended 4/20/2026" badge with the full announcement, pinned directly to the countdown so the extension context is visible wherever the countdown appears. Links to both the Federal Register notice and the Government Technology coverage so agency staff can verify the change directly. Hidden in print.
- **Dedicated FAQ guidance** on the extension — including a pinned callout in the Executive Summary, a rewrite of the "deadline is firm" messaging to acknowledge that DOJ has already extended the date once, and explicit guidance that agencies should not plan around further extensions.

### Accessibility — FAQ downloads

Audited all three generated download formats against WCAG 2.1 AA and fixed two DOCX issues found during the audit:

- **DOCX language declaration (WCAG 3.1.1)** — the generated Word document had no `<w:lang>` attribute anywhere, so screen readers couldn't determine the document language. Added `styles.default.document.run.language = "en-US"` to `scripts/generate-faq-docx.js` so every run inherits en-US.
- **DOCX table header row markup (WCAG 1.3.1)** — none of the 35 tables had `<w:tblHeader/>` markup, so assistive tech couldn't distinguish header rows from data rows or repeat headers on page breaks. Added `tableHeader: isHeader` on the first row of each table. Verified output: 35 header rows (one per table) + 175 data rows.
- **Audit results**: DOCX (proper H1–H4 hierarchy, 522 hyperlinks with visible text, no images missing alt, metadata complete). Markdown (122 headings with zero level skips, 37 tables with header separators). Plain text (4,084 well-structured lines with section separators). DownloadDialog carries `role="dialog"`, `aria-modal`, proper button labels. `axe-core` AA on `/` and `/faqs`: 0 violations.

### Notes

- The WCAG 2.1 Level AA technical standard is unchanged — only the compliance date moved.
- "Pre-existing documents" exception language in the FAQ now references the April 26, 2027 compliance-date cutoff.

---

## [1.1.1] - 2026-04-07

### Lighthouse Scores

- **Performance: 100** (up from 95) — render-blocking font CSS eliminated
- **Accessibility: 100** — label-content-name-mismatch fixed
- **Best Practices: 100**
- **SEO: 100**
- **Unused CSS reduced from 79 KiB to 31 KiB** (~48 KiB saved from MDI font removal)

### Performance

- **Switched MDI icons from font to tree-shaken SVG** — replaced `@mdi/font` (50KB+ CSS for 7,000+ icons) with `@mdi/js` SVG imports (only 27 used icons bundled), eliminating render-blocking font CSS
- **Removed unused Vite font-display plugin** — no longer needed with SVG icons
- **Removed no-op resource-hints server plugin** — dead code elimination
- **Restructured suppress-vuetify-logs plugin** — moved helper functions inside plugin body so they are tree-shaken from production builds

### Accessibility

- **Fixed `label-content-name-mismatch`** on navbar logo link — aria-label now matches visible text ("Accessibility Portal")

### Fixed

- **Fixed bfcache support** — added `pagehide`/`pageshow` listener cleanup in content-links plugin so browsers can cache pages in back/forward cache
- **Fixed CSP `script-src`** — added `'unsafe-inline'` to allow Nuxt hydration scripts in production
- **Fixed SSR hydration mismatch** — configured `vuetify-nuxt-module` to use `mdi-svg` icon set on both server and client
- **Removed stale `@mdi/font` CDN preload** injected by vuetify-nuxt-module

---

## [1.1.0] - 2026-03-26

### Security (Red/Blue Team Audit)

A comprehensive red/blue team security audit was conducted on 2026-03-26. The following findings were identified and remediated:

#### Red Team Findings

| # | Severity | Finding | Category | Status |
|---|----------|---------|----------|--------|
| 1 | **MEDIUM** | Missing Content-Security-Policy (CSP) header | OWASP A05 – Misconfiguration | **Fixed** |
| 2 | **MEDIUM** | Missing Strict-Transport-Security (HSTS) header | OWASP A05 – Misconfiguration | **Fixed** |
| 3 | **HIGH** | Transitive dependency vulnerabilities (basic-ftp path traversal, devalue prototype pollution, axios DoS) | OWASP A06 – Vulnerable Components | **Acknowledged** (dev-only, transitive) |
| 4 | **HIGH** (Conditional) | `v-html` usage in FAQ disclaimer rendering (`faqs.vue:44`) | OWASP A03 – Injection | **Low risk** (content is controlled frontmatter, not user input) |
| 5 | **MODERATE** | ReDoS in `ajv` (netlify-cli transitive dep) | OWASP A05 – Misconfiguration | **Dev-only** |
| 6 | **MODERATE** | esbuild dev server XSS (dev-only) | OWASP A03 – Injection | **Dev-only** |
| 7 | **MODERATE** | jsdiff DoS in parsePatch (build-time only) | OWASP A05 – Misconfiguration | **Build-only** |

#### Blue Team Strengths (Positive Findings)

- **No `eval()`, `Function()`, or `innerHTML` with user data** — zero dangerous patterns in application code
- **Proper XSS escaping** in search page (`escapeHtml()` applied before `v-html` rendering)
- **External links** use `rel="noopener noreferrer"` and `window.open()` with `noopener,noreferrer`
- **Zod schema validation** on all content frontmatter
- **No exposed secrets** — `.env` is gitignored, no API keys in source
- **Static site generation** eliminates server-side attack surface (no sessions, no auth, no DB)
- **Privacy-first analytics** via self-hosted Plausible (no cookies, GDPR compliant)
- **Input validation** on search (minimum 2 characters, escaped output)
- **Safe build scripts** — `path.join()` for all file paths, no shell injection vectors
- **X-Frame-Options: DENY** prevents clickjacking
- **X-Content-Type-Options: nosniff** prevents MIME type sniffing
- **Permissions-Policy** blocks geolocation, microphone, camera

#### Remediations Applied

- **Added Content-Security-Policy header** — restricts script/style/font/image sources to `'self'` and `plausible.icjia.cloud`; blocks `frame-ancestors`, `base-uri`, `form-action` to `'self'`/`'none'`
- **Added Strict-Transport-Security header** — `max-age=31536000; includeSubDomains; preload` enforces HTTPS
- **Version bumped to 1.1.0** to reflect security hardening
- **CHANGELOG.md created** to document all project milestones and security audit trail

#### Recommendations (Not Yet Applied)

- Run `npm audit fix` periodically to patch transitive dev dependency vulnerabilities
- Upgrade `netlify-cli` to latest when available
- Consider replacing `v-html` in FAQ disclaimer with Vue template directives + `DOMPurify` if untrusted content sources are ever added
- Monitor Nuxt releases for `devalue` prototype pollution patches

### Accessibility

- **Full axe-core audit completed** (2026-03-26): **0 violations** across all 5 pages, 3 viewports, 1,335 total checks
- Skip link verification: 15/15 passing
- WCAG 2.1 AA compliance: 100%

### Added

- `CHANGELOG.md` — project changelog with milestone history and security audit documentation
- Version badge in README
- Security audit section in README

### Changed

- Version bumped from `1.0.0` to `1.1.0` in `package.json`
- `netlify.toml` — added CSP and HSTS security headers

---

## [1.0.0] - 2025-12-15 to 2026-03-10

### Initial Release & Iterative Development

The 1.0.0 release encompasses the full initial development of the ICJIA Accessibility Portal from first commit through production stabilization.

### Milestones

#### 2025-12-15 — Project Genesis

- Initial commit: Nuxt 4 + Vue 3 + Vuetify 3 scaffolding
- Core pages: Home (countdown timer), FAQs (accordion), Links (resource cards)
- Netlify deployment configuration
- Dark theme with Material Design
- Basic FAQ content and link resources

#### 2025-12-16 — Content & Accessibility Foundation

- Plausible Analytics integration (privacy-friendly, self-hosted)
- FAQ accordion behavior (one-at-a-time expand)
- Scroll-to-top links per FAQ question
- Countdown timer added to all pages
- Additional FAQ content (alt text, captions, complex images, web vs. content accessibility)
- Last-updated dates and scrolling link navigation

#### 2025-12-17 — Production Hardening

- SSR hydration error fixes (favicon, footer)
- Plausible `apiHost` configuration
- Accessibility violation fixes
- FAQ content updates and refinements

#### 2026-01-01 to 2026-01-04 — Feature Expansion

- **Fuzzy search** (`/search`) with Fuse.js — relevance ranking, match highlighting, badges
- **PDF download** feature (later replaced with accessible alternatives)
- **Sitemap generation** automation
- **Documentation portal** (`/docs/`) with accessibility reports
- **E2E test suite** with Playwright
- **FAQ sorting** (original, latest, alphabetical)
- **Fiscal year info** and OGC-specific questions added

#### 2026-01-05 to 2026-01-08 — Content Quality & Testing

- FAQ content accuracy review and 25% condensation
- Dynamic `{days_until_deadline}` placeholder support
- **Printer-friendly FAQs** (`/faqs-print`) with table of contents
- **Accessible FAQ downloads** — Word (.docx), Markdown (.md), Plain Text (.txt) replacing inaccessible PDF
- Comprehensive test suite with axe-core accessibility audits
- Disclaimer system with legal/informational notices
- DVFR accessibility report added

#### 2026-01-09 to 2026-01-27 — Content Maturity

- WCAG AAA enhancements where possible
- New FAQ topics: exceptions, "don't make this accessible" scenarios, "too busy" questions
- Internal link system for cross-referencing FAQs
- `CLAUDE.md` added for AI assistant guidance
- Content editing for tone, accuracy, and concision

#### 2026-02-09 to 2026-02-11 — SSR & SEO Fixes

- **SSR hydration mismatch resolution** — all pages zero console errors
  - `AppNavbar.vue`: CSS media queries replace JavaScript `useDisplay()`
  - `faqs.vue`: Fixed `useAsyncData` cache invalidation
  - Documented Vuetify SSR layout behavior (`opacity:NaN` is intentional)
- SEO improvements: `og:image`, structured data, meta tags
- Responsive navigation fix (hamburger menu on small screens only)
- Lighthouse scores: 100% Accessibility, 100% Best Practices, 100% SEO on all pages
- Homepage and `faqs-print` accessibility fixes

#### 2026-03-10 — Latest Content Update

- PDF accessibility checker FAQ (https://audit.icjia.app)
- "Check PDF" link added to footer navigation
- "See Also" card styling for cross-referenced answers
- Content clarity and redundancy cleanup
- All app-level dates updated to March 10, 2026

### Technical Summary (v1.0.0)

| Metric | Value |
|--------|-------|
| Pages | 5 (Home, FAQs, FAQs-Print, Links, Search) |
| WCAG 2.1 AA Violations | 0 |
| axe-core Tests | 1,335 |
| Lighthouse Accessibility | 100% |
| Lighthouse Best Practices | 100% |
| Lighthouse SEO | 100% |
| Hydration Errors | 0 |
| Skip Links | 15/15 passing |
| Node.js | 22.14.0 |
| Nuxt | 4.2.2 |
| Vue | 3.5.26 |
| Vuetify | 3.11.6 |

---

[1.1.0]: https://github.com/ICJIA/icjia-accessibility-portal/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/ICJIA/icjia-accessibility-portal/releases/tag/v1.0.0
