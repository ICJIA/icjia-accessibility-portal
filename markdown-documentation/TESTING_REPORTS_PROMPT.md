# Testing + Reports Prompt (Vitest + HTML Report under `/docs/tests/`)

**Last Updated**: January 4, 2026

## How to use this prompt

Copy/paste **this entire file** into an LLM and provide your repo. The LLM must implement:

- A test runner that executes your Vitest projects (unit + Nuxt + optional E2E)
- A JSON artifact of results (for tooling/CI)
- A human-friendly HTML report at `public/docs/tests/index.html`
- Expandable per-test descriptions so the report doubles as documentation

### Reference implementation (ICJIA)

- Test runner + report generator: [`test/run-all-tests.js`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/test/run-all-tests.js)
- Example report output: [`public/docs/tests/index.html`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/public/docs/tests/index.html)
- Vitest config: [`vitest.config.ts`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/vitest.config.ts)

---

## Instructions to the LLM (do these steps)

### 1) Ensure testing deps are installed

At minimum:

- `vitest`
- `@vue/test-utils`
- `@nuxt/test-utils` (if Nuxt tests exist)

### 2) Create or update Vitest config(s)

Ensure you can run at least:

- `vitest --project unit`
- `vitest --project nuxt`
- (optional) `vitest --project e2e`

If you already have Vitest set up, don’t break existing structure—adapt the runner to it.

Reference:

- [`vitest.config.ts`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/vitest.config.ts)

### 3) Implement the report runner

Create `test/run-all-tests.js` that:

- Runs the configured Vitest projects
- Parses results
- Writes:
  - `test/test-results.json`
  - `test/failed-tests.json`
  - `public/docs/tests/index.html`

Add `TEST_DESCRIPTIONS` mapping test names → 2–4 sentence explanation.

Reference:

- [`test/run-all-tests.js`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/test/run-all-tests.js)

### 4) Add package.json scripts

Add:

- `"test": "node test/run-all-tests.js"`
- `"test:unit": "vitest --project unit"`
- `"test:nuxt": "vitest --project nuxt"`
- (optional) `"test:e2e": "vitest --project e2e"`

### 5) Verify (must pass checklist)

Run:

```bash
yarn test
```

Verify:

- `public/docs/tests/index.html` exists and renders
- It includes totals (passed/failed) and individual test results
- Each test has expandable text describing what it validates


