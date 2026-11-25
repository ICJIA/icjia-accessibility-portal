# Changelog

All notable changes to the ICJIA Accessibility Portal are documented in this file.

This project follows [Semantic Versioning](https://semver.org/).

---

## [1.5.3] - 2026-11-25

### Security (Red/Blue Team Audit)

A red/blue team security audit of the deployed site, the source, the build pipeline, and the repository settings was run on 2026-11-25. **Overall risk: LOW**: 12 findings, none critical or high in the deployed site. The README's [Security Audits](README.md#security-audits) section has the full table and the list of what was verified with no finding; it now lists every audit, with only the newest shown open.

#### Fixed

- **Content-Security-Policy tightened** (`netlify.toml`): `img-src` is `'self' data:` (was any `https:` host); `plausible.icjia.cloud` removed from `script-src` (no script is loaded from it; it stays in `connect-src`); `object-src 'none'` and `upgrade-insecure-requests` added.
- **`X-XSS-Protection: 0`** (was `1; mode=block`): the legacy filter is removed from current browsers and could be abused in old ones.
- **`Cross-Origin-Opener-Policy: same-origin`** added; **`Permissions-Policy`** also switches off payment, USB, and motion sensors.
- **`?highlight=` with a `%`** (`FaqAccordion.vue`): the value was URL-decoded twice, so a link from a search such as "50%" threw `URI malformed` and stopped the FAQ list's setup on that page. The second decode is removed.
- **`/.well-known/security.txt`** added (RFC 9116), with a contact address and an expiry date.

#### Accepted, with reasons

- **`script-src 'unsafe-inline'`** stays: Nuxt writes its page data as an inline script and the static `/docs/` pages use inline scripts. No injection point was found, and every other directive is limited to this origin.
- **8 dependency advisories** (4 high, 4 moderate: `zod` 3.x, `glob` 13.x, `minimatch` 10.x, `basic-ftp`, `extract-zip`): all in build or developer tools, none in the browser bundle, no server in production, and no fix short of a major-version change in the parent package.
- **`v-html` for the About notes**: the text is repository front matter, never visitor input.

#### For the repository owner

- The repository is private, with no branch protection on `main` and no secret scanning on its current plan.
- The footer and README link to the repository, which the public cannot open while it is private.

#### Verified

- 250/250 tests pass. The production build, served locally with the new headers, loaded every page (including `/docs/`) with no Content-Security-Policy violation and no console error. A search for `<img src=x onerror=alert(1)>` renders nothing.

## [1.5.2] - 2026-11-25

### Fixed — the Word download printed the page's front matter as text

- `scripts/generate-faq-docx.js` meant to skip the YAML front matter at the top of `content/faqs.md`, but its search for the closing `---` started at the opening one, so only the first line was skipped. The rest (`title:`, `description:`, `lastUpdated:`, the `disclaimer:` notes) was written into the document as a run of body text just above the first heading. The front matter is now skipped whole. The Markdown and plain-text downloads were not affected.
- **Test:** a regression test opens the generated `.docx` and checks that no front-matter text is in the body (250 tests, was 249).

## [1.5.1] - 2026-11-25

### Content — the FAQ's maintainer is named

- **"About These FAQs" → Created by** now names the person who created the FAQs and maintains, updates, and reviews them: Christopher Schweda, with an email link (`content/faqs.md` front matter). It shows on the home page, `/faqs`, and `/faqs-print`.
- The Word and Markdown downloads say the same in their "Who created them" paragraph (`scripts/generate-faq-docx.js`, `scripts/generate-faq-md.js`).
- Links inside an About note are underlined in the link blue (`FaqBrowser.vue`). axe-core: 0 violations on `/`, `/faqs`, and `/faqs-print`.

### Changed — question rows have padding inside the focus outline

- An open question draws a blue focus outline around the whole row, and the text sat tight against it on every side. Question titles and answers now have 20px of side padding (14px on phones), so the outline has room (`FaqAccordion.vue`).

### Docs — README reviewed against the code, with screenshots

- **Screenshots** (new section; files in `markdown-documentation/screenshots/`): the home page, an open answer, the Links page, What's New, and the home page on a phone, each with alt text.
- **Corrected:** `yarn generate:accessibility` never existed — the audit is one script, run with `yarn audit:a11y`, which prints a summary and writes the HTML report (and uses Puppeteer, not `@axe-core/playwright`); the menu button appears below 900px, not 600px; the What's New strip sits under the countdown; stale counts removed or fixed (hyperlinks, headings, and tables in the downloads; documentation line and file counts; the audit script's configuration line range); the `{days_until_deadline}` placeholder is described as what it is (a tested helper no page calls) alongside the deadline-phrase rewriting the FAQ actually uses.
- **"Why axe-core?" rewritten:** it no longer says Siteimprove uses axe-core or that automated rules cover all of WCAG 2.1 A/AA. It now says what automated testing can and cannot show, with current rule counts.
- **Audit status** shows the November 25, 2026 check (6 pages, 0 violations) and notes that the published report dates from March 2026.

## [1.5.0] - 2026-11-25

### Changed — a complete visual redesign (the "Plakat" look of audit.icjia.app)

Every page now shares the Swiss-style design of ICJIA's document checker at [audit.icjia.app](https://audit.icjia.app): a near-black page, one heavy grotesque (Archivo) set tight, square corners, thick white rules, small capital labels, and a single cobalt colour block per page. **No functionality or logic changed**: the countdown, sorting, deep links, search, downloads, and What's New all work as before, and the 249 tests pass unchanged.

- **Design tokens:** `app/assets/css/plakat.css` (new) holds the `--pk-*` tokens and the global rules; the Vuetify dark theme in `nuxt.config.ts` mirrors them. `primary` is the link blue (`#60A5FA`, 7.6:1 on the page); the cobalt brand colour (`#3559E0`) is only ever a background (white on it is 5.7:1).
- **Font:** Archivo, self-hosted through `@fontsource-variable/archivo` (new dependency), so there is no font CDN request and the CSP's `font-src 'self'` holds.
- **Home page:** a two-part hero — the cobalt block (title, deadline link, created/updated/reviewed dates) beside a white-outlined countdown panel with the day count at poster scale — then the What's New strip, "About These FAQs" as three ruled notes, and the FAQ at the full 1180px width. The `h1` stays first in the document; the label row above it is placed with CSS `order`.
- **Questions:** ruled rows instead of cards, with an "Open +" / "Close –" cue in place of the chevron (decorative; `aria-expanded` still carries the state). Answers are set at 19px in a 49rem column. New and Updated labels are square, green on a dark wash (9.5:1), with New on cobalt.
- **Internal pages** (`/faqs`, `/links`, `/search`, `/whats-new`, and the error page): one reading-page layout (`.pk-page`) — a 46rem column under a heavy rule, a small label, a poster-scale title — like the reading pages on audit.icjia.app. The compact countdown is a cobalt band with the What's New strip attached. `/links` is a ruled reference list; search results and What's New entries are bordered panels.
- **Top bar and footer:** a flat black bar with an uppercase wordmark and plain text links (the current page is underlined as well as marked with `aria-current`); the footer is a heavy rule with the copyright on the left and text links on the right. Icons were removed from both. The menu button now appears below 900px (was 600px), because six text links need the room.
- **Download dialog and mobile menu:** square panels with a white outline; each download format is a ruled row.
- **og:image** (`scripts/og-image-template.html`, `public/og-image.png`): redrawn in the new look, using the same self-hosted Archivo file, so generating it needs no network. It shows the deadline date, not a day count, so it never goes stale.
- **Small wording additions:** labels above the internal page titles ("Questions and answers", "Resources", "Find an answer", "Update archive"). The error page's duplicate "You might be looking for" links were removed (the two buttons remain).
- **Print page** (`/faqs-print`) is unchanged: the new global rules are scoped to the default layout.

### Fixed — accessibility

- **Search results:** the lowest relevance chip ("Partial") was white on Vuetify's grey (2.7:1); it is now white on `#333` (12.6:1). The section chip text is 12px (was 10px).
- **Search-term highlights** are dark ink on yellow (15:1) instead of the page's light text on translucent yellow.
- **Verified:** axe-core 0 violations (WCAG 2.1 A/AA plus best practices) on `/`, `/faqs`, `/links`, `/search`, and `/whats-new` at desktop width, and on `/` and `/links` at mobile width. A pixel-level contrast pass found no failing text (its one flag, the sort menu, samples the arrow image, not the background).

### Content — late-November review of every question and answer

Six parallel reviewers read all of `content/faqs.md` and `content/links.md`; each finding was checked against the primary source before it was applied.

- **Status re-verified November 25, 2026:** 28 CFR § 35.200(b) still reads April 26, 2027 / April 26, 2028 (eCFR current through November 23); no DOJ document after the April 20, 2026 interim rule; no Fall 2026 Unified Agenda; HHS § 84.84 unchanged; DoIT has announced no IITAA change. All "as of" markers for these now read November 25, 2026.
- **NFB v. DOJ:** the docket now shows the NFB's motion for summary judgment (September 28, 2026) and an order granting the government more time to respond (November 13, 2026). No ruling. The three places that describe the case say so.
- **Overclaims softened** (sourced claims rest only on IITAA, ADA Title II, or WCAG 2.1): the rule has no "linked from navigation" test for archived content; accessibility is not "actively monitored" (it is complaint-driven and easy for anyone to check); the rules do not make good-faith effort a defense; DoIT's procurement guidance says the State "should include" IITAA language (not "directs"); the IITAA has no enforcement path of its own; the "contractual, licensing, or other arrangements" wording is the ADA rule's, not the IITAA's.
- **Corrections:** audit.icjia.app checks up to 25 files at a time (was "five"); reading order is WCAG 1.3.2 Meaningful Sequence, not 1.3.1; mobile apps an agency "provides or makes available" (the rule has no "to the public" limit); documents posted "on or after" the compliance date can't use the preexisting-document exception; the multimedia summary now includes audio description; Acrobat's document-language steps cover Windows and Mac; voicecap's test count (about 8,300) and published sites (seven); pointers to the 2024 Federal Register text now note that its dates were extended.
- **Links page:** "Techniques for WCAG 2.1" points to the techniques themselves; the Section508.gov training-courses link no longer goes through a redirect stub.
- **Dates:** `lastUpdated`/`lastReviewed`, both prose markers, and the home page's Updated/Reviewed line are November 25, 2026; 31 edited questions carry `{updated:2026-11-25}`. The three notes that ICJIA has no designated accessibility coordinator were confirmed by the owner and re-dated November 25, 2026.
- **What's New:** new entry for this release.

## [1.4.2] - 2026-11-06

### Docs — README and architecture documents brought current

Checked against the code after v1.4.0 (What's New) and v1.4.1 (dependency refresh); each change was verified against the files it describes.

- **README.md:** Nuxt and Vue badges (4.6.4+, 3.5.45+); axe-core 4.14.0+ and Playwright 1.65.0+; build steps include JSDoc generation; project tree adds `FaqBrowser.vue`, `utils/icons.ts`, and the `docs/architecture`, `docs/jsdoc`, and `docs/tests` folders, and drops `resource-hints.server.ts` (no longer exists); the FAQ accordion is described by its real ARIA pattern (`aria-expanded` disclosure; nothing in `app/` uses `aria-describedby`); "SPA fallback redirects" and "custom 404 handling" removed (`netlify.toml` has no redirects); the countdown is on `/`, `/faqs`, and `/links`, not "all pages"; What's New added to the status list.
- **CLAUDE.md:** components and utils lists include What's New; the chip window is 21 days (was "10 days"); the E2E project is noted as commented out in `vitest.config.ts`; the build steps match `pregenerate`/`postgenerate`; 249/249 tests across 14 files; last major update November 2026.
- **ARCHITECTURE_GUIDE.md:** new "What's New Banner and Archive" section; directory tree, routes (6), and question count (101) current; `server/` directory added; badge window 21 days (4 places); build pipeline; Netlify config shows the real CSP and HSTS headers and no redirects; Node requirement is Nuxt 4.6's `^22.22.3 || ^24.15.0 || >=26.0.0`; the Vuetify example uses `mdi-svg` in `vuetifyOptions`; TypeDoc coverage counts; the accordion ARIA example matches the markup.
- **INDEX.md:** dates, the guide's length, and section pointers.

### Fixed — the published architecture page (`/docs/architecture/`)

- **Regenerated** from the current guide (`yarn generate:docs`). The published copy dated from January and still gave the deadline as April 24, 2026.
- **Accessibility** (`scripts/generate-architecture-docs.js`), the published page failed 2 axe-core AA rules on 274 elements (color contrast, links told apart by color alone), and the regenerated one also a third (a code block keyboard users couldn't scroll); it now has 0 violations, best practices included, at desktop and mobile widths:
  - light theme: links, accents, and the sticky header used the dark theme's colors (`#60a5fa` on white, about 2.5:1; a dark header behind dark text). The light theme now has its own blues (`#1d4ed8`, 4.5:1 or more) and header background (WCAG 1.4.3);
  - links are underlined, so a link in a sentence isn't told apart by color alone (WCAG 1.4.1), with a visible focus outline;
  - code blocks have `tabindex="0"`, so a keyboard user can scroll a wide one (WCAG 2.1.1);
  - the page content is in a `<main>` landmark.
- **Broken links:** the generator's `_italic_` rule matched inside HTML attributes, so nine `target="_blank"` links were written as `target="em>blank"`. Underscore italics now apply only at word boundaries and never across a quote or tag; the guide's two real underscore italics still render.

## [1.4.1] - 2026-11-06

### Dependencies — one refresh in place of 26 stale Dependabot PRs

The 26 open Dependabot security PRs (#3–#43, January–April 2026) all conflicted with `main`, and newer advisories had landed on most of the packages they fixed. They're closed in favor of this single refresh, which takes open Dependabot alerts from **317 to 7**.

- **In-range upgrade** (`yarn upgrade` within the existing ranges): Nuxt 4.6.4, Vue 3.5.45, Vuetify 3.13.7, Nuxt Content 3.16.2, Vite 8.3.6, Vitest 4.1.12, Fuse.js 7.5.0, and their dependencies.
- **Dev majors:** `@nuxt/test-utils` 3 → 4 (required: the upgraded `vitest-environment-nuxt` pulls in test-utils 4, and with 3 alongside it every Nuxt test failed with `Missing "#nuxt-test-utils/h3" specifier`), `happy-dom` 20 → 21, `netlify-cli` 23 → 27. `.nuxtrc` records the test-utils setup version.
- **Node 22.14.0 → 22.23.4** (`.nvmrc`, `NODE_VERSION` in `netlify.toml`, README, CLAUDE.md, and the Architecture Guide): Nuxt 4.6 requires Node `^22.22.3 || ^24.15`.
- **Test:** Fuse.js 7.5 returns every item for an empty pattern (7.1 returned none). The search page already returns nothing for empty or too-short queries (`app/pages/search.vue`, `searchResults`), so the site is unaffected; `test/nuxt/search.test.ts` "should handle empty search query" now tests that guard instead of Fuse's raw result.
- **Icon config fix:** `icons: { defaultSet: 'mdi-svg' }` moved from `vuetify.moduleOptions` to `vuetify.vuetifyOptions`, where vuetify-nuxt-module reads it. In the wrong place, the module fell back to the `mdi` font set and injected the `@mdi/font` stylesheet from a CDN. Before, a `{ key: 'mdi', rel: 'prefetch', href: '' }` head link papered over that; after the upgrade both links were emitted and the site's Content-Security-Policy blocked the stylesheet (a console error on every page of the deploy preview). That workaround link is removed, no CDN stylesheet is injected, and Vuetify's own icons (dropdown arrows, accordion chevrons) render as SVG.
- **The 7 alerts left** have no non-major fix, or no fix at all, and are build-time or dev-only (the site is static): zod 3 (via @nuxt/content, netlify-cli, puppeteer), glob 13, minimatch 10, basic-ftp 5 and extract-zip (puppeteer, netlify-cli), and deepmerge.

### Verification

- `yarn install --frozen-lockfile` on Node 22.23.4; `yarn test:run`: 14 files, 249/249 passing.
- `yarn generate`: succeeds; every route prerendered; the three FAQ downloads produced, and the .docx has no field codes.
- axe-core (AA) on the built site: 0 violations on `/`, `/faqs/`, `/whats-new/`, and `/search/`. In Chrome, a search for "captions" returns results and an empty query returns none. No console errors on the built site; the Netlify deploy preview built on Node 22.23.4.

## [1.4.0] - 2026-11-06

### Added — What's New banner and page

- **What's New banner** (`app/components/WhatsNewBanner.vue`) replaces the April 2026 deadline-extension notice at the top of the countdown card. It shows the newest entry's badge and date, headline, and summary, with a "See all updates" link. On `/faqs` and `/links`, the countdown's compact version shows the headline and link only. On a phone, the badge sits above the text.
- **`/whats-new` page** (`app/pages/whats-new.vue`): every update, newest first, each with its badge, date, headline, summary, details, and links. Each entry has its own anchor (`/whats-new#<id>`). SEO meta and breadcrumb structured data, like the other pages; included in `routes.json` and the sitemap.
- **Entries** (`app/utils/whatsNew.ts`): nine entries, from the portal's launch (December 15, 2025) to today, written for readers from this CHANGELOG. The deadline-extension notice is now the April 20, 2026 entry, with the same Federal Register and Government Technology links. Static data with string dates, so server and client render the same markup.
- **Footer:** "What's New" is the first link (with `aria-current="page"` on `/whats-new`). The top nav already holds six buttons, so the link went in the footer rather than crowding the nav at tablet widths.
- **Tests:** `test/unit/whatsNew.test.ts` (13 tests): unique ids, valid dates, required fields, newest-first order in the source, every `/faqs#…` link resolves to a real question, and the date and link helpers.

### Removed

- The old extension-notice markup and CSS in `app/pages/index.vue` and `app/components/CountdownTimer.vue`.

### Verification

- `yarn test:run`: 14 files, 249/249 tests passing.
- `yarn generate`: succeeds; `/whats-new` is prerendered and in the sitemap.
- axe-core (AA, plus best practices on mobile): 0 violations on `/`, `/faqs`, and `/whats-new`, at desktop and mobile widths. Checked in Chrome at 1280 px and 390 px; no hydration warnings.

## [1.3.9] - 2026-11-06

### Content — November 2026 review

All 120 Q&As were checked for anything out of date as of November 6, 2026. Nothing was found to be wrong. The legal status behind the FAQ's dated status notes was re-verified against primary sources and still holds:

- eCFR 28 CFR § 35.200(b) still reads April 26, 2027 / April 26, 2028; the Federal Register shows no DOJ follow-up to the April 20, 2026 IFR, and no Fall 2026 Unified Agenda has been published.
- *NFB v. DOJ* (D. Md. 1:26-cv-02007): no ruling; the last docketed entry is July 13, 2026.
- HHS has not changed 45 CFR § 84.84 (its Nov 3, 2026 Part 84 rule amends only § 84.4).
- DoIT has announced no IITAA standards change; 30 ILCS 587/25 is unchanged.

So the status dates moved from October 26 to November 6, 2026: the executive summary's "Status" line, the IITAA-change, compliance-dates, deadline-final (two places), and Section 504 answers, and (owner-confirmed: still no designated coordinator) the three ICJIA coordinator notes.

### Content — voicecap

- **voicecap section, matched to voicecap 0.24.1:** the voice page now starts each recording at 0.3× and shows each page's screenshot and transcripts beside its recording, outlining the line NVDA is saying; the voice page has its own fingerprint check; the published-results link now names the five ICJIA sites on voicecap.icjia.app; and the "window check" limit now says correctly that a window popping up just before a key press can get that one key press (the step is still thrown out). The Mac note no longer says what is or isn't planned.
- **voicecap as an ICJIA tool in more answers:** "Do we need an agency accessibility coordinator?" (testing reality), "What if we can't meet the April 26, 2027 deadline?" (document efforts), "Who's going to notice if we're not compliant…?" (document progress), "I'm on executive staff. Where do I start?" (evidence retained), "Should we test against WCAG 2.2 or WCAG 2.1?" (voicecap's axe check includes 2.2 and best-practice rules), "Is there a quick way to test PDF files…?" (files vs. web pages), the third-party tools test plan (screen reader spot-check), and the glossary's "Screen reader" entry.

### Content — adversarial accuracy review

After the review above, every Q&A was checked again, adversarially, against primary sources (eCFR, the Federal Register, ILGA, DoIT, w3.org, ada.gov, voicecap v0.24.1, audit.icjia.app). Corrections:

- **Legal precision:** "Who's going to notice…?" says who can file under § 35.170(a) ("an individual who believes" they faced disability discrimination), not "anyone"; the executive summary gives April 26, 2027 as the date for Illinois state agencies rather than for all state and local governments; "What happens after April 26, 2027?" names the rule's defenses as well as its exceptions (§§ 35.200(b), 35.201, 35.205); the fundamental-alteration determination can be made by the agency head "or a designee" (§ 35.164); the conventional-document formats are the four categories in § 35.104 (PDF, word processor, presentation, spreadsheet), not four brand names; the § 35.201(b) checklist now includes the file-format test; mobile apps are covered when the agency "provides or makes available" them (§ 35.200(a)(2)), not only when public; restoring the original deadlines would make only the 50,000+ tier past due; and an older document posted later can fit other exceptions too, with the archived-content test stated as § 35.104 defines it.
- **ICJIA's grievance procedure (4 Ill. Adm. Code Part 150):** the 180-day limit notes the "extenuating circumstances" exception, and the outside filing right names the Illinois Department of Human Rights and the U.S. EEOC (§ 150.10(d)).
- **Coordinator:** the executive summary's "your agency's accessibility coordinator" now notes ICJIA hasn't designated one yet.
- **Sourcing:** unsupported claims removed or softened: NFB/ACB "monitor government websites" and law firms "regularly scan government sites"; Ohio State's analysis as "widely cited … used nationwide"; WebAIM's overlay figure is its stated 67% (was 69%), and the survey measured ratings, not advice; DoIT's WAVE caveat is quoted as DoIT gives it; Deafblind/transcript wording follows W3C's.
- **Tools:** audit.icjia.app's PDF categories and WCAG scope match the tool; Acrobat's classic check is "Accessibility Check, formerly called Full Check"; the W3C Images Tutorial reference no longer claims to cover alt text length.
- **links.md:** the compliance-dates table includes special district governments; the POUR "Robust" summary no longer says WCAG 2.1 requires valid code.
- **Keyword Index:** the overlay entry's link text matches its question exactly.

### Links

- The Canva VPAT/ACR link pointed to a June 2021 report; it now goes to Canva's accessibility statement, which says the latest report is in Canva's Trust & Security Portal.

### Dates and version

- `lastUpdated` / `lastReviewed` and both prose markers in `content/faqs.md`, and `lastUpdated` / `lastReviewed` in `app/pages/index.vue`: November 6, 2026. Edited Q&As carry `{updated:2026-11-06}`; the voicecap Q&As keep their `{new:2026-10-26}` chips, which are still inside the 21-day window.
- 1.3.8 → 1.3.9 (`package.json`, README badge, Recent Updates, and Version Information).

## [1.3.8] - 2026-10-26

### Content

- **voicecap:** "How is voicecap different from automated checkers like axe, Pa11y, Lighthouse, or SiteImprove?" no longer lists forms among the things left to manual checks (now "contrast, zoom, captions").
- **Section 504 / HHS:** in "Did the Section 504 web deadlines change too?", the ICJIA funding note now cites [USAspending.gov](https://www.usaspending.gov/recipient/6d56daa9-a718-d1a7-e00c-7e39bb997d00-C/all). DOJ made all of ICJIA's direct federal grant awards in fiscal years 2022–2026 ($234.3 million, 89.6% through the Office of Justice Programs), and HHS accounts for $13,500 of about $1.06 billion in direct awards since FY2008. The note now also says that HHS's rule covers HHS money received "through another recipient" ([45 CFR § 84.10](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-A/part-84/subpart-A/section-84.10), definition of "recipient"), so pass-through funding counts too, and it keeps "consult your legal counsel."

### Version

- 1.3.7 → 1.3.8 (`package.json`, README badge, Recent Updates, and Version Information).

### Verification

- `yarn test:run`: 13 files, 236/236 tests passing.
- New citation URLs return 200 (the USAspending recipient profile and eCFR § 84.10). The funding figures come from the USAspending API (awards by awarding agency and subagency, FY2022–FY2026 and FY2008–FY2026), and the "recipient" definition was read on eCFR (Title 45, issue date October 22, 2026).

## [1.3.7] - 2026-10-26

### Content — ICJIA's ADA grievance procedure (4 Ill. Adm. Code Part 150)

"How do we handle accessibility complaints?" said ICJIA "hasn't yet finalized a formal complaint-handling procedure." It has had one since 1993: [4 Ill. Adm. Code Part 150](https://ilga.gov/agencies/JCAR/EntirePart?titlepart=00400150), adopted at 17 Ill. Reg. 19120 (effective October 25, 1993) to implement 28 CFR § 35.107. The answer now says so, links the rule on ilga.gov, and summarizes how it works: the EEO Officer investigates (§ 150.10); complaints are filed in writing on ICJIA's form within 180 days (§ 150.20); findings are due within 10 working days, and the Executive Director issues the final written decision within 5 working days of the EEO Officer's report (§§ 150.20–150.40). Step 4 of the formal-complaint list now sends complaints to the EEO Officer, bringing in IT for digital barriers, and the closing note says whom to contact instead of promising an update once a procedure exists. Chip 2026-05-14 → 2026-10-26.

### Content — "MCAR" removed

No source uses "MCAR" for an accessibility document: not ITI's VPAT materials, not DoIT's IITAA procurement guidance, and no Illinois solicitation found (IDOT's "MCAR" is a construction contractor's Monthly Contract Activity Report). The term is removed from the VPAT question's title, quick answer, and term list, and from the Procurement Terms glossary. The question is now "What is a VPAT? What is an ACR?", and all eight links to it use the new anchor (`#procurement-and-third-party-tools-what-is-a-vpat-what-is-an-acr`).

### Content — ICJIA headcount cited

"Do we need an agency accessibility coordinator?" says ICJIA is well over § 35.107's 50-employee threshold. It now cites the [Illinois State Budget for Fiscal Year 2027](https://budget.illinois.gov/content/dam/soi/en/web/budget/documents/budget-book/fy2027-budget/Fiscal-Year-2027-Operating-Budget.pdf): 130 employees in FY2025 (actual), 150 estimated for FY2026.

### Content — voicecap

- Removed the "It reads and moves through pages — it doesn't operate them" bullet from "What doesn't voicecap do? Does a clean voicecap report mean our site is compliant?"
- Removed the "Interactive pages need hands-on testing, too" paragraph from "When should we run voicecap, and what do we do with the results?"

### Version

- 1.3.6 → 1.3.7 (`package.json`, README badge, Recent Updates, and Version Information). `lastUpdated` and `lastReviewed` were already October 26, 2026.

### Verification

- `yarn test:run`: 13 files, 236/236 tests passing, including the FAQ internal-link check (all eight links to the renamed VPAT question resolve).
- New citation URLs return 200: the Part 150 rule on ilga.gov and the FY2027 budget book on budget.illinois.gov. Part 150's text, authority note, and source note were read on ilga.gov. The headcount comes from ICJIA's "Resources by Fund" and "Headcount by Division" tables in the budget book, and IDOT's "Monthly Contract Activity Report (MCAR)" from its November 6, 2026 letting notice.

## [1.3.6] - 2026-10-26

### Content — ICJIA accessibility-coordinator status confirmed as of October 26, 2026

The site owner confirmed that ICJIA still hasn't designated an agency accessibility coordinator, which settles the first owner-confirmation item listed in 1.3.5. Each dated ICJIA status note in `content/faqs.md` now carries that date:

- Intro "ICJIA Contact Note": dated October 26, 2026 (was March 10, 2026); "has been identified" → "has been designated."
- "Why should I trust this FAQ if it wasn't created by agency leadership or official accessibility experts?", item 4: "As of October 26, 2026" (was "As of May 2026"). Its chip moves from 2026-01-23 to 2026-10-26.
- "I'm a manager. Where do I start?", "ICJIA Contact" line: now dated October 26, 2026; "identified" → "designated."

"Designated" is the term 28 CFR § 35.107(a) uses. Nothing else changed: both notes still send readers to ICJIA's IT department, and the complaint-handling Q&A ("once designated") and the general "Do we need an agency accessibility coordinator?" guidance are untouched.

### Version

- 1.3.5 → 1.3.6 (`package.json`, README badge and Version Information). `lastUpdated` and `lastReviewed` were already October 26, 2026 (set in 1.3.5).

### Verification

- `yarn test:run`: 13 files, 236/236 tests passing.

## [1.3.5] - 2026-10-26

### Added — "Screen Reader Testing (voicecap)" FAQ section (eight new Q&As)

A new section in `content/faqs.md`, between "Website Accessibility" and "Content Accessibility," on ICJIA's free, open-source [voicecap](https://github.com/ICJIA/voicecap) tool: it runs the real NVDA screen reader through every page of a site and saves every word NVDA says as transcripts, as the complement to code checkers such as axe and Pa11y. All eight questions carry `{new:2026-10-26}`:

1. What is voicecap, and why did ICJIA build it? (includes a full-disclosure note that it's ICJIA's own tool)
2. How is voicecap different from automated checkers like axe, Pa11y, Lighthouse, or SiteImprove? (comparison table; WCAG 2.1 SC 1.1.1, 2.4.4, 2.4.6, 1.3.2, 4.1.2, and 2.4.1 mapping; SC 1.1.1 verbatim; WebAIM Screen Reader User Survey #11 figures; note that voicecap's own axe run includes WCAG 2.2 and best-practice rules beyond the 2.1 AA target)
3. How does voicecap work, step by step? (the three NVDA passes, focus checks, the sealed record, and a real transcript excerpt)
4. How much time does voicecap save? (measured run times from voicecap's documentation; the hand-testing comparison is labeled as an illustration, not a measurement)
5. How accurate is voicecap, and how can a manager or auditor check its results?
6. What doesn't voicecap do? Does a clean voicecap report mean our site is compliant? (WCAG 2.1 Conformance Requirement 2 verbatim; W3C "no tool alone")
7. What do I need to run voicecap, and how do I get started?
8. When should we run voicecap, and what do we do with the results?

- Facts are taken from voicecap's README at v0.22.2 (npm `@icjia/voicecap`, released October 24, 2026), including that its audits run on Windows with NVDA and that a Mac/VoiceOver version isn't planned for now. Example figures (the October 6, 2026 i2i run: 32 pages, 2,219 spoken lines, just under an hour) are the README's own.
- **Cross-links into the new section:** body text added to "How do I test my website for accessibility?", "I'm a web developer. Where do I start?", and "I'm a manager. Where do I start?" (re-tagged `{updated:2026-10-26}`); "See also" links added to the SiteImprove, external-audit, overlay, commonly-overlooked, common-mistakes, good-faith-progress, sign-off, and maintain-compliance answers (link-only additions, not re-tagged — same policy as v1.3.3).
- **Keyword Index:** new "Screen Reader Testing (voicecap)" group, plus an entry under Testing & Auditing. **Glossary** (Process Terms): voicecap entry. **Free Testing Tools:** voicecap row; "ICJIA PDF Audit" relabeled "ICJIA File Accessibility Audit (PDF, Word, PowerPoint, Excel)" to match what audit.icjia.app checks.
- `content/links.md`: new "Screen Reader Testing (Free)" subsection — NVDA, voicecap, and ICJIA's published results at voicecap.icjia.app.
- H3 count 111 → 120 (eight Q&As plus the new Keyword Index group); H2 count 15 → 16.

### Content — October 2026 periodic accuracy review

Every Q&A re-read, and the open legal and standards threads re-verified against primary sources: the Federal Register API, eCFR (title 28 current to 2026-10-22), reginfo.gov and OIRA's review lists, regulations.gov, the CourtListener docket, Illinois DoIT's accessibility news feed and IITAA pages, ILGA (30 ILCS 587 and every 104th General Assembly Public Act), W3C, WebAIM, and NV Access.

**Verified unchanged — no edit needed:** the compliance dates in 28 CFR § 35.200(b) (April 26, 2027 / April 26, 2028); DOJ's Interim Final Rule (91 FR 20902) is still DOJ's latest document on the rule — no final rule, NPRM, correction, or further extension; the Unified Agenda entry for RIN 1190-AA82 (pubId 202510 is still the current edition, and the RIN isn't under OIRA review); HHS's Section 504 IFR (91 FR 25496) and the 45 CFR § 84.84 dates; _NFB v. DOJ_ — no ruling, and no docketed activity after July 13, 2026 on CourtListener; the IITAA — no review announcement, draft, or comment period, 30 ILCS 587/25 unchanged, and no 104th General Assembly Public Act touches 30 ILCS 587; the WCAG 2.1 (May 6, 2025) and WCAG 2.2 (December 12, 2024) editions.

**Status refreshed:** every "as of" marker now reads October 26, 2026 — the executive summary, "When must we comply with the ADA Title II rule?", "Is the April 26, 2027 deadline final…?" (two markers), "Did the Section 504 web deadlines change too?", and "Could the IITAA standards change in 2026?" (each re-tagged `{updated:2026-10-26}`).

**Updated:** WCAG 3.0's latest Working Draft is now September 10, 2026 (was March 3, 2026), and the draft is now linked; it still says it "still has several years of work," so the quote stands.

**Corrections:**

- "Why does your agency need to worry about digital accessibility?" said the April 26, 2027 deadline came from "the ADA Title II web rule … and IITAA 2.1 standards." The date is federal only; the IITAA 2.1 Standards have applied since June 24, 2024. Fixed.
- "Given the uncertainty around enforcement…" — the same conflation in its quick answer is fixed. The "deadline is set" bullet now notes that the date has moved once and that a pending lawsuit asks to move it earlier. The "The rules might change" row, written before the April 2026 extension, now acknowledges the one-time federal date change and DOJ's agenda signal, while noting that the WCAG 2.1 AA standard hasn't changed and that the IITAA requires it regardless.
- Word alt text: "Right-click image > Edit Alt Text" → "View Alt Text" (the Microsoft 365 label; "Edit Alt Text" in older versions), matching the FAQ's other mention; the same fix in the "Why fix the source document" table.
- Third-party tools: "from an `il.gov` page" → "from a state agency site" (Illinois agency sites aren't on il.gov).

**Considered — no change:** WebAIM's Screen Reader User Survey #11 (results posted September 29, 2026) now has JAWS leading both "primary" (55.0%) and "commonly used" (69.2%) screen readers; nothing in the FAQ claimed otherwise (the testing table's "Most common choice for testing" for NVDA describes testers, not users), and the new section cites the survey. NVDA 2026.3 (released October 26, 2026) doesn't affect the FAQ, which pins no NVDA version. A secondary-source report of a September 28 summary-judgment motion in _NFB v. DOJ_ isn't visible on the docket, so the FAQ says only that no ruling has been issued.

### Content — adversarial review of every Q&A (October 26, 2026)

All 120 `###` entries were split into seven slices, and each slice was adversarially reviewed against current primary sources. Every finding was then checked against the source before anything changed: eCFR (28 CFR Part 35 as of 2026-10-22), the Federal Register text of the 2024 rule and the 2026 IFR, ILGA (30 ILCS 587), DoIT's IITAA, IITAA 2.1 Standards, procurement, DOJ-rule, guides and testing pages, ADA.gov's fact sheet, W3C, WebAIM, Microsoft, YouTube and Cornell. One finding was refuted and not applied (see below). 67 Q&As carry `{updated:2026-10-26}`; link-only "See also" and index additions weren't re-tagged.

**Legal accuracy (ADA Title II and IITAA):**

- **Internal content and intranets.** Three answers said the federal rule covers only content "provided or made available to the public" — a phrase that isn't in the rule. § 35.200(a) says "provides or makes available," and DOJ declined to exempt "internal, non-public applications, such as web content used solely by employees" (89 FR 31320). "Does ADA Title II apply to internal documents?", "Does our agency's password-protected intranet need to be accessible?", and "Do all documents need to be accessible?" now say the federal question is unsettled. They also say the IITAA settles it for Illinois agencies: 30 ILCS 587/10 covers "internet and intranet systems," and IITAA 2.1 Standards E203.1 and E205.3 cover intranet pages, forms, training materials, and policy announcements. "What about archived documents on the intranet?" now rests on IITAA (E202.2, E205.3) instead of Title I.
- **What IITAA 2.1 applies to.** DoIT's standards page says IITAA 2.1 applies to technology "developed, procured, or substantially modified … after June 24, 2024," with older technology held to IITAA 2.0 (WCAG 2.0 Level AA). 30 ILCS 587/20 says the same. Answers that said IITAA 2.1 "applies to your content today" now say so precisely, in five Q&As plus two of today's own edits.
- **The pre-2027 document exception, § 35.201(b).** This is now a three-part test: file type, posted before the date *and not revised since* (89 FR: a revised document "would no longer be 'preexisting'"), and not currently used to apply for, access, or take part in services. The examples table no longer applies the archive test to old reports. DOJ's own examples (old COVID-19 statistics, decades of water-quality reports) "generally need not conform."
- **Archived web content.** The criteria now match § 35.104: reproductions of pre-deadline paper are covered, and the "never update" cut-off is the archiving date, not the compliance date. The county-park quote now includes its dropped qualifier and is marked _(emphasis added)_.
- **Deadline framing.** "One-time implementation accommodation" was removed; it isn't DOJ's language. The IFR's actual conditions are quoted instead ("will consider issuing an NPRM"; "circumstances suggesting further delays"). "After April 26, 2027, non-compliance becomes a violation of federal law" no longer implies a grace period before then. "Total population," not "serving populations," is used throughout, and special district governments are noted.
- **Other legal fixes:**
  - The IITAA was signed August 20, 2007; its standards took effect in 2008.
  - The general Title II regulation dates from 1991 and took effect in 1992 ("on the books since 1991").
  - Complaints are due within 180 days (§ 35.170), and grantors can receive them (§ 35.170(c)).
  - Attorney's fees are cited to 42 U.S.C. § 12205.
  - Effective-communication limits now cite § 35.164, and § 35.202 limits "accessible alternatives" for Tableau and ArcGIS embeds.
  - § 35.107(a) also requires publishing the coordinator's contact details.
  - "How is the IITAA enforced?" now describes what the statute actually does (§§ 15, 20, 25; Standards E101.1).
  - Section 508 used WCAG 2.0 AA.
  - DOJ has said since 1996 that Title II covers government websites.
- **Quotes made verbatim:** the DoIT DOJ-rule quote (full Act name), the § 35.201(c) wording, "through" (not "under") arrangements, the DoIT IITAA quote's opening, the full Cornell IT quote, and "who must comply," now quoted from the statute (30 ILCS 587/10, which adds "public bodies"). _(emphasis added)_ marks were added wherever bold was inserted into a quote.

**Standards and guidance:**

- **Unsupported claims replaced:** the WebAIM Million claim (2026 data: low contrast 83.9%, missing alt text 53.1%, empty links 46.3%; headings aren't in the top six), "studies suggest 20-57%" (one Deque study), and "remediation costs several times more" (W3C's business case doesn't say so).
- **WCAG nuances added:** 4.1.1 (WCAG 2.1's current note; 2.2's "may need to continue to test and report"), the PowerPoint slide-title mapping (SC 1.3.1/2.4.6; 2.4.2 is the presentation's own title), SC 1.4.2 (audio over 3 seconds), SC 2.4.2 (titles that describe), and Excel named ranges (not required).
- **SiteImprove Q&A:** it no longer calls a scanner score "fully compliant," and it describes axe's tag configuration generally rather than as ICJIA's.
- **Overlays:** WebAIM's numbers (69% "not very" or "not at all" effective) and Illinois DoIT's advice against overlays on State websites.
- **Captions:** W3C's statement that auto-captions don't meet requirements unless "confirmed to be fully accurate," and CART for live events.
- **Alt text length:** aligned with WebAIM and Microsoft ("a few words," rarely more than a sentence or two). An alt text that repeats its caption is no longer recommended.
- **CDC:** cognitive disability is 13.9% (serious difficulty). BJS sources now back the DEIA answer's over-representation claim.

**Product instructions (current UI):**

- **Microsoft 365:** Word document language (Review > Language > Set Proofing Language; "Set as Preferred"), Table Design > Header Row, the checker's categories (no icon claims; Intelligent Services added), and the Word checker's real rule list (no checks for language, link text, heading order, or color-only meaning), plus the PowerPoint Reading Order Pane.
- **Outlook:** checker paths (Windows: Review; web: Options or Message; Mac: Edit) and "Add alternate text".
- **Acrobat:** "Automatically tag PDF" and Figures Alternate Text > Fix.
- **Other apps:** YouTube Studio (Subtitles > Edit / Duplicate and edit > Publish), Instagram (More options > Write alt text), Canva's **Digital** PDF preset (formerly "PDF Standard") and its alt-text gaps (no alt text in PNG/MP4 downloads or scheduled posts), and NVDA (Ctrl+Alt+N works once NVDA is installed). DoIT's WAVE caution ("can't (yet) test within shadow DOMs") and training sign-up are now cited.
- **audit.icjia.app:** a 25 MB/5-file limit (not "no usage limits"), "a web page" rather than "runs in your browser," the 365-day usage log, and "scores WCAG 2.1 A/AA and lists 2.2's additions separately."
- **Quick tests:** documents now get a meaningful quick test (the checker plus Word's Navigation Pane), and the Word "Format as Table" mix-up in the Markdown Q&A is fixed.

**Procurement:** the full DoIT contract clause, including the VPAT/ACR requirement and the optional demonstration clause; DoIT's "should include a requirement similar to" wording; the ITI VPAT rating definitions, including "Not Evaluated" (AAA only); and MCAR described as a non-ITI label (its unverified expansion was removed).

**voicecap section (independently reviewed against voicecap's README and source):**

- A clean report needs every page reviewed: the "Nothing needs attention" verdict alone doesn't show that a person read every transcript.
- `--compare previous` doesn't match a `--page` re-run, so use a run id.
- What `verify` and the in-browser check can and can't prove; keep the record in Git with a protected branch.
- The NVDA-log check applies from 0.17.0 and runs in the shareable report.
- Repeats can't promise the same words.
- Two gaps in the window check.
- JAWS leads in North America (72.5%, WebAIM 2026); reads happen at 1280 × 960; AppLocker or WDAC can block recordings; Node 24; and "about 7,900" tests.

**Keyword Index:** 23 Q&As that weren't indexed are now listed.

**Refuted — not applied:** one reviewer said "develops, procures, maintains, or uses" was Section 508 wording, not IITAA. IITAA 2.1 Standards E201.1 uses exactly that formula ("ICT that is procured, developed, maintained, or used by agencies"), so the FAQ keeps it and now cites E201.1.

**Needs owner confirmation (no change made):**

- Whether ICJIA has designated its § 35.107(a) ADA coordinator. The notes are dated March 10 and "May 2026," and § 35.107(a) requires publishing the coordinator's name and contact details.
- ICJIA's headcount (≥ 50).
- The status of the complaint procedure.
- The origin of "MCAR."
- The VPP SiteImprove figures.
- Whether ICJIA's federal funding includes HHS pass-throughs.
- Outside the FAQ:
  - `audit-accessibility.js` passes `tags:` and `exclude:` to `axe.run()`, which ignores both options, so it runs axe's full default rule set.
  - voicecap's GitHub description and some README and site text still promise VoiceOver audits (and the description has a typo, "vision-imparied").
  - The file-audit tool's README links a 404 ADA.gov page.

### Fixed — footer "Print" link (WCAG 2.5.3 Label in Name)

- axe-core 4.14 flagged `label-content-name-mismatch` on every page: the footer link's visible text is "Print," but its accessible name was "View printer-friendly version of FAQs," which doesn't contain it (voice-control users say what they see). `app/components/AppFooter.vue`: `aria-label` → "Print version of FAQs." axe-core 4.14 runs this rule by default; earlier versions marked it experimental, which is why the project's own audit (axe-core 4.11) didn't flag it.

### Fixed — plain-text download garbled code examples

- `scripts/generate-faq-txt.js` converted inline code before handling fenced code blocks, so it paired backticks across fences (every code block in `ICJIA-Accessibility-FAQs.txt` came out wrapped in stray ``"`"`` marks), and its emphasis, table, and HTML rules then rewrote the code itself (for example, the Markdown table sample). Fenced blocks are now set aside first and restored verbatim, indented four spaces, without their fences. New regression tests in `test/unit/faqDownloadGenerators.test.ts` cover a top-level fence and an indented fence inside a list item. The real TXT export now has no stray backticks.

### Links

- Citation link check: 229 unique URLs across `faqs.md` and `links.md` — 220 return 200 (a few through benign redirects; the DoIT training sign-up redirects to the State's Microsoft login, as expected for an "Illinois staff only" page), and 9 return 403 to automated clients because the sites serve bot challenges (Canva ×3, HHS, SSA, NFB, University of Michigan, UK LGA, and npm). npm's package page was confirmed with `npm view @icjia/voicecap` (0.22.2). The rest should be spot-checked in a regular browser at the next review.
- Internal links: 290/290 valid (`test/unit/faqInternalLinks.test.ts`).

### Dates / version

- `lastUpdated` and `lastReviewed` → 2026-10-26 (`content/faqs.md` frontmatter and both prose markers; `app/pages/index.vue` constants).
- Version 1.3.4 → 1.3.5 (`package.json`, README badge, Version Information, and Recent Updates).
- `public/sitemap.xml` regenerated (lastmod 2026-10-26). `routes.json` regenerated with `yarn generate:routes`, and now lists the five real pages (`/`, `/faqs`, `/faqs-print`, `/links`, `/search`). The committed copy listed `/`, `/docs`, and `/docs/accessibility`, which is what a `yarn test:run` writes, so a test run had overwritten it before the v1.3.4 commit.

### Verification

- `yarn test:run`: 13 files, **236/236 passing** (234 plus the two new plain-text regression tests), including the FAQ internal-link check: 290/290 links valid.
- Rendered-page link check (headless Chrome against `yarn dev`): all 103 distinct `#anchor` targets that `faqs.md` links to exist as element IDs on `/faqs`, and a deep link to each of the eight new questions opens its panel with the answer shown.
- axe-core 4.14, WCAG 2.1 A + AA: `/`, `/faqs`, `/faqs-print`, and `/links` at desktop and mobile widths, plus `/faqs` deep-linked open to four of the new answers and to the rewritten exceptions answer (tables, code blocks, blockquotes): **0 violations** after the footer fix, rechecked on the final content.
- Downloads regenerated from the new content: the Word file has no field codes (`w:instrText`/`w:fldChar`: 0; `updateFields`: 0); the Markdown and plain-text files include the new section, and the plain-text file has no stray backticks.

## [1.3.4] - 2026-09-03

### Removed — "ICJIA has many public sites. Where can I see the audit reports for each site?"

- The Q&A and its per-site audit-report table are withdrawn from `content/faqs.md` (ICJIA-Specific Information section) and from the question index at the end of the file. The report locations have changed and each site's accessibility report is being updated over the coming weeks; the Q&A will return once the new locations are confirmed. (H3 question count: 112 → 111.)
- Removed the "See also" link to the withdrawn Q&A from `markdown-documentation/PROPOSED_FAQ_ADDITIONS.md`. A repo-wide sweep (content, app, tests, docs, `public/`, README, CHANGELOG) found no other reference to the question text or its anchor.

### Chore — single lockfile

- Deleted the stale `package-lock.json` (untouched since January 2026). Yarn is the project's package manager: `yarn.lock` (current as of April 2026) covers every declared dependency, `node_modules` carries the `.yarn-integrity` marker, and README, CLAUDE.md, and the Netlify build all use yarn. This clears the VS Code "multiple lockfiles" warning.

### Dates / version

- `lastUpdated` → September 3, 2026 (`content/faqs.md` frontmatter and both prose markers; `app/pages/index.vue`). `lastReviewed` stays September 2, 2026 — no accuracy review was performed in this release.
- `routes.json` / `public/sitemap.xml` regenerated (lastmod 2026-09-03).
- Version 1.3.3 → 1.3.4 (`package.json`, README badge and Version Information).

### Verification

- `yarn test:run`: 13 files, 234/234 tests passing.
- Dev server (`yarn dev`): `/` and `/faqs` render HTTP 200; the withdrawn question no longer appears on `/faqs`, and the neighboring "How do we handle accessibility complaints?" Q&A is intact.

## [1.3.3] - 2026-09-02

### Content — September 2026 periodic accuracy review

Full re-verification of `content/faqs.md` against primary sources: eCFR (28 CFR §§ 35.104, 35.107, 35.130, 35.160, 35.200–35.205 as of 2026-09-01), the Federal Register API, reginfo.gov, regulations.gov, the CourtListener docket, ada.gov, Illinois DoIT and ILGA, W3C (WCAG 2.1/2.2/3.0, Understanding docs), and vendor/tool documentation (ITI VPAT, PAC, Canva, Adobe, NVDA, Microsoft, IAAP, WebAIM, Deque, CDC DHDS). All status markers now read September 2, 2026, and every Q&A whose content changed carries `{updated:2026-09-02}` (six of the August 13 `{new:}` questions changed and were re-tagged; the two that did not change keep their `{new:}` tag and expire on schedule).

**Verified unchanged — no edit needed:** the compliance dates in 28 CFR § 35.200(b) (April 26, 2027 / April 26, 2028, as amended at 91 FR 20912); every verbatim regulation quote in the FAQ; the DoIT IITAA page quotes and version history (1.0 2008, 2.0 2018, 2.1 June 24, 2024); the 30 ILCS 587/25 review-year text; DoIT contact numbers; all WCAG 2.1 quotes (conformance requirements, SC 1.2.2/1.2.4/1.2.5/1.4.3); the W3C "no tool alone" and third-party-content quotes; ITI VPAT 2.5Rev (April 2025) covering WCAG 2.2; PAC 2026; the Deque 57% study; IAAP credential descriptions; CDC figures (DHDS 2022 is still the latest release); DOJ's own Section 504 regulations contain no web deadlines.

**Status refreshed (as of September 2, 2026):**

- **NFB v. DOJ** (D. Md. 1:26-cv-02007) — court entered a briefing schedule June 29, 2026; last docketed activity July 13, 2026; no ruling. Executive summary, "When must we comply with the ADA Title II rule?", and "Is the April 26, 2027 deadline final…?" refreshed.
- **DOJ Interim Final Rule** (91 FR 20902) — no final rule, revision, or withdrawal; docket DOJ-CRT-2026-0067 holds only the IFR. **New:** DOJ's 2026 Unified Agenda (published August 14, 2026; RIN 1190-AA82) says the Department is considering an NPRM "to reconsider whether some of the regulatory provisions imposed by the April 24, 2024 rule could be made less burdensome," timing "To Be Determined" — added as a third scenario ("DOJ could propose changes to the rule itself") in "Is the deadline final," cited to reginfo.gov.
- **HHS Section 504 IFR** — title corrected to the IFR's actual title; added effective date May 7, 2026, publication May 11, 2026 (91 FR 25496), comment close July 6, 2026; canonical Federal Register URL; "HHS has not finalized, revised, or withdrawn" status line.
- **IITAA 2026 statutory review** — still unannounced (no draft, workgroup, or comment period on DoIT's site or news feed; window runs through December 31, 2026); DoIT accessibility-news page now linked.

**Corrections:**

- 30 ILCS 587/25 was *amended* (not added) by P.A. 103-729; the review requirement dates to the original 2007 Act (P.A. 95-307) — P.A. 103-729 set the calendar-year-2026 date.
- "online guides, live trainings, and technical assistance" is on DoIT's DOJ Rule page, not guides.html — now cited correctly; that page's "Illinois agencies have a head start, but there is still work to do" quote added to "Did the federal deadline extension give Illinois agencies an extra year?"
- Canva: reading order is set from the Position panel's layer order plus "Match reading order to layers" at download — "Edit text semantics" sets headings only (both Canva Q&As fixed); added Canva's own caveat that its Design Accessibility checker "isn't a compliance tool"; freshness note → September 2026.
- WCAG 2.2's AA-only criteria list now includes 2.5.7 Dragging Movements (four AA additions, not three); WCAG 3.0 is described as a Working Draft (latest March 3, 2026) that W3C says "still has several years of work"; noted WCAG 2.1's May 6, 2025 errata republication (the federal rule still pins the June 5, 2018 edition).
- NVDA quit shortcut is Insert+Q *then Enter*; Acrobat's legacy menu path labeled as the classic interface of older versions; the Illinois 23.7% disability prevalence labeled age-adjusted (CDC DHDS 2022).
- `content/links.md`: "PAC 2024" → "PAC 2026".

### Links — citation link check (231 unique URLs)

- **Repaired (moved pages):** HHS Section 504 fact sheet → the Part 84 final-rule fact sheet; Section508.gov "Update and Maintain Agency Accessibility Policy"; PlainLanguage.gov → Digital.gov plain-language guides; JAWS and Colour Contrast Analyser → vispero.com; W3C mobile-accessibility page; Apple accessibility developer docs; Microsoft Accessibility Checker; Markdown Guide tables anchor (extended syntax); Level Access Title II guide; IAAP certification overview; UK LGA social-media guide; Figma accessibility; W3C "Content Usable" objective page; CommonLook (now Allyant); IBM Equal Access checker.
- **WCAG quick reference:** all 124 quick-reference links now point at W3C's current URL (`WCAG22/quickref/?versions=2.1#…`), where the old `WCAG21/quickref` URLs 301-redirect. The redirect also drops the old `?levels=aa` parameter, which in the quickref's URL scheme *hides* the listed level — so the old links were hiding the very criteria they pointed at. The two AAA "target size" links now point at the WCAG 2.1 spec anchor (the quickref anchor id changed).
- **Removed / relabeled:** i2i and VPP audit-report links (both pages 404 with no replacement on those sites — the table rows now read "Report temporarily unavailable"); Safe From the Start relabeled "View Accessibility Statement" (it is a statement, not an audit report); Digital.gov social-media toolkit (404, no successor) dropped from `links.md`; Yale social-media article (now a video page) replaced with the University of Michigan guide; the ADA.gov "Title II Web Rule" link relabeled as DOJ's overview/webinar page; Adobe "PDF Specifications" label corrected.
- **Not re-tagged:** URL-only repairs did not receive `{updated:}` chips (same policy as the v1.3.1 editorial pass); the audit-report table did, because its content changed.

### Added — proposed FAQ entries for review (not yet in the FAQ)

- `markdown-documentation/PROPOSED_FAQ_ADDITIONS.md` — seven fully drafted, pillar-sourced Q&As with verbatim rule text, ready to paste: conforming alternate versions (28 CFR § 35.202); the undue-burden / fundamental-alteration defense (§ 35.204); live captions for streamed meetings and webinars (WCAG 1.2.4 + § 35.160); which file types are "conventional electronic documents" (§ 35.104); PDF/UA vs. WCAG 2.1; whether WCAG 2.1 AA would still apply if the federal rule were withdrawn (IITAA); and accessibility statements (§ 35.107).

### Dates / version

- `lastUpdated` and `lastReviewed` → 2026-09-02 in `content/faqs.md` frontmatter and both prose markers; homepage `lastUpdated`/`lastReviewed` constants → September 2, 2026; version 1.3.3 (package.json, README badge and Version Information).

### Verification

- Test suite: 234/234 passing (unit + Nuxt), including the FAQ internal-link check.
- Citation link check: 231 unique URLs across `faqs.md` and `links.md` — 153 OK, 65 redirected (all rewritten to their targets), 11 broken (all repaired, replaced, or removed), 2 unverifiable by automation (Adobe help pages; verify manually).

---

## [1.3.2] - 2026-08-13

### Docs — README/CLAUDE.md currency sync

- README's Content Management how-to still documented the old badge system (single `{updated:}` tag, 10-day window, green-chip-only); it now documents both tags, the 21-day window, the chip appearance, and the New-first sort. Three remaining "new badge" annotations in the structure tree and feature list updated to the chip terminology.
- CLAUDE.md Quick Reference updated: test coverage now reads 234/234 passing; "Last Major Update" moved from January 2026 to August 2026.

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
