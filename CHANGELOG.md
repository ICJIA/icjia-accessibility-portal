# Changelog

All notable changes to the ICJIA Accessibility Portal are documented in this file.

This project follows [Semantic Versioning](https://semver.org/).

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
