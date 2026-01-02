# Nuxt 4 + Vuetify 3: Testing Methodology Guide (Reusable)

**Last Updated**: January 2, 2026  
**Audience**: Developers, QA, and LLMs working on Nuxt/Vuetify sites  
**Purpose**: A reusable testing playbook for Nuxt 4 + Vuetify 3 applications, with a concrete example from this project’s FAQ “New date tags” + sorting work.

---

## What We Tested in This Project (Concrete Example)

This project introduced/validated behavior across three layers: **content parsing**, **UI sorting**, and **real-browser verification**.

### 1) Note the risk surface (what can break)

- **Markdown parsing**: `{new:YYYY-MM-DD}` tags must be extracted reliably from Nuxt Content MiniMark nodes.
- **“New” display vs sorting**: The “New” window can expire, but the *tag date* must remain available for sorting.
- **UI sorting**: “Latest first” must sort by full date (including year), and the Executive Summary must not accidentally override the ordering.
- **Accessibility and UX**: Sort controls must be keyboard accessible, correctly labeled, and stable.

### 2) Key acceptance checks (what “done” means)

- **Executive Summary appears in “Latest first”** and shows **Jan 2, 2026** in its chip.
- **Newest dated FAQs appear at the top** when “Latest first” is selected.
- **Sort modes work consistently**: Original order, Latest first, A–Z.
- **Dates sort by true date order** (including year), not lexicographic quirks.

### 3) How we verified (actual steps used)

- **Unit tests** (logic): validate tag extraction rules and edge cases in `app/utils/faqTransform.ts`.
- **Manual UI smoke** (real browser): open `http://localhost:3000/`, switch sort dropdown to **Latest first**, confirm ordering and that Executive Summary’s chip date reads **Jan 2, 2026**.

> This is intentionally “small and repeatable”: it’s the fastest way to catch regressions where the UI renders but the ordering is subtly wrong.

---

## Reusable Testing Methodology for Any Nuxt/Vuetify App

### Testing Pyramid (Recommended)

1. **Unit tests** (fastest): pure utilities (parsers, transforms, date math)
2. **Component / composable tests**: Vue logic and rendering in a DOM-like runtime
3. **E2E tests**: Playwright for critical flows (routing, state, regressions)
4. **Accessibility audits**: automated axe-core runs + targeted manual keyboard/screen reader spot checks
5. **Manual smoke**: minimal “human sanity” checks for high-risk UX

This order keeps feedback fast while still catching integration issues.

---

## Layer 1 — Unit Tests (Pure Logic)

**When**: parsing, transforms, sorting functions, date handling, slugify, etc.

**What to test**:

- **Parsing correctness**: does the function reliably detect tags across node shapes?
- **Edge cases**: missing tags, malformed tags, multiple tags, empty nodes
- **Sorting correctness**: date comparisons including year, stable tie-breaking

**Commands (this repo)**:

- `yarn test:unit`
- `yarn test` (runs all and generates reports)

**Best practices**:

- Keep unit tests deterministic (don’t depend on current time unless you freeze time).
- Avoid DOM in unit tests; isolate utilities into `test/unit/`.

---

## Layer 2 — Component + Nuxt Runtime Tests

**When**: Vue/Vuetify rendering, computed behavior, composables, accessibility attributes.

**What to test**:

- **Critical rendering**: sort dropdown exists, correct labels, correct values
- **State transitions**: changing sort changes visible order
- **A11y hooks**: `aria-label`, `aria-describedby`, focus behavior

**Commands (this repo)**:

- `yarn test:nuxt`

**Notes**:

- Prefer “behavior tests” over brittle CSS snapshot tests.
- Assert semantics (“combobox labeled Sort”), not pixel perfection.

---

## Layer 3 — E2E Tests (Playwright)

**When**: flows that span routing, rendering, data-loading, and UI interactions.

**What to test**:

- **Navigation**: core routes load (`/`, `/faqs`, `/links`, `/faqs-print`)
- **Critical interactions**: dropdown sort, expanding accordions, deep links (hash routing)
- **Regression guards**: ordering rules, presence of key content, broken anchors

**Strategy**:

- Keep E2E tests few but high-value (critical paths).
- Stabilize selectors using accessible roles/names (`getByRole`) rather than fragile CSS classes.

---

## Layer 4 — Automated Accessibility Audits (axe-core)

**Goal**: prevent regressions in WCAG 2.1 AA compliance and catch missing ARIA/landmarks.

**Commands (this repo)**:

- `yarn audit:a11y` (quick console audit)

**What to check**:

- No new violations introduced by UI controls (e.g., `v-select`)
- Keyboard navigability: tab order reaches sort dropdown and accordions
- Labels are present and meaningful (`aria-label="Sort Frequently Asked Questions"`)

---

## Layer 5 — Manual Smoke Tests (Real Browser)

Automated tests won’t catch everything (especially “this feels wrong” ordering bugs). Keep a minimal checklist you can run in ~60 seconds.

**Reusable checklist**:

- **Load**: `http://localhost:3000/` renders without console errors
- **Interact**: change one key control (e.g., sort dropdown) and confirm the UI updates
- **Verify one high-risk invariant**: “latest first truly shows newest content first”
- **A11y spot-check**: tab to key controls; visible focus; labels read well

---

## Reporting & Evidence

For changes that impact stakeholders (like FAQs for executives/managers), keep evidence lightweight but explicit:

- **Before/after screenshots** for a key state (e.g., “Latest first” shows dated Executive Summary)
- **Test command outputs** via `yarn test` and/or `yarn audit:a11y` when appropriate
- **Short acceptance notes** (“Verified in browser on port 3000”)

---

## “If You Only Do 3 Things” (Minimum Viable Testing)

1. **Run unit tests** for the changed logic.
2. **Run an accessibility audit** (or at least spot-check with keyboard).
3. **Do a 60-second real-browser smoke** of the most important flow.


