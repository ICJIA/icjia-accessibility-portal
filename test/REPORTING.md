# Test Reporting Configuration

This document explains how test results are collected and reported across all test types (unit, nuxt, and e2e).

---

## Overview

The project uses a custom test reporting system that:
1. Runs all test projects (unit, nuxt, e2e)
2. Generates comprehensive JSON reports
3. Creates an interactive HTML report
4. Extracts failed tests for easy debugging

---

## How It Works

### Test Execution Flow

```
yarn test
    ↓
test/generate-failed-tests-report.js
    ↓
vitest run --reporter=json --reporter=verbose
    ↓
Runs ALL projects in vitest.config.ts:
  - unit (test/unit/**)
  - nuxt (test/nuxt/**)
  - e2e (test/e2e/**) [when enabled]
    ↓
Generates 3 reports:
  1. test/test-results.json (all results)
  2. test/failed-tests.json (failures only)
  3. public/docs/tests/index.html (interactive report)
```

---

## Generated Reports

### 1. `test/test-results.json`

**Purpose**: Complete test results for all test types

**Contents**:
- Summary statistics (total, passed, failed, skipped)
- Full results for every test file
- All test cases with status and duration
- Timestamps and metadata

**Use Cases**:
- CI/CD integration
- Historical tracking
- Detailed analysis

**Example Structure**:
```json
{
  "summary": {
    "totalTests": 115,
    "passedTests": 115,
    "failedTests": 0,
    "skippedTests": 0,
    "duration": 6130,
    "generatedAt": "2026-01-01T13:51:44.000Z"
  },
  "testResults": [
    {
      "name": "/path/to/test/unit/faqTransform.test.ts",
      "status": "passed",
      "assertionResults": [
        {
          "title": "should extract text from nodes",
          "status": "passed",
          "duration": 2.5
        }
      ]
    }
  ]
}
```

### 2. `test/failed-tests.json`

**Purpose**: Only failed tests for quick debugging

**Contents**:
- Summary statistics
- Only test files with failures
- Failure messages and stack traces

**Use Cases**:
- Sharing with LLMs for debugging help
- Quick failure overview
- CI/CD failure notifications

**Example Structure**:
```json
{
  "summary": {
    "totalTests": 115,
    "passedTests": 114,
    "failedTests": 1,
    "skippedTests": 0,
    "duration": 6130
  },
  "testResults": [
    {
      "file": "/path/to/failing-test.ts",
      "status": "failed",
      "failedCases": [
        {
          "title": "should do something",
          "status": "failed",
          "failureMessages": ["Expected 'foo' to be 'bar'"]
        }
      ]
    }
  ]
}
```

### 3. `public/docs/tests/index.html`

**Purpose**: Interactive HTML report for visual inspection

**Features**:
- Summary cards with pass/fail counts
- Color-coded test results
- Expandable test files
- Failure messages with syntax highlighting
- Responsive design

**Access**:
- After running tests: `open public/docs/tests/index.html`
- In production build: `https://your-site.com/docs/tests/`

---

## Test Project Configuration

All test projects are configured in `vitest.config.ts`:

```typescript
export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: "unit",
          include: ["test/unit/**/*.{test,spec}.{js,ts}"],
          environment: "node",
        },
      },
      await defineVitestProject({
        test: {
          name: "nuxt",
          include: ["test/nuxt/**/*.{test,spec}.{js,ts}"],
          environment: "nuxt",
        },
      }),
      // E2E tests (currently disabled)
      // await defineVitestProject({
      //   test: {
      //     name: "e2e",
      //     include: ["test/e2e/**/*.{test,spec}.{js,ts}"],
      //     environment: "nuxt",
      //   },
      // }),
    ],
  },
})
```

---

## Running Tests

### All Tests (Recommended)

```bash
yarn test
```

This runs all test projects and generates all reports.

### Individual Test Projects

```bash
# Unit tests only
yarn test:unit

# Nuxt tests only
yarn test:nuxt

# E2E tests only (when enabled)
yarn test:e2e
```

**Note**: Individual project commands do NOT generate reports. Use `yarn test` for reports.

---

## E2E Test Integration

When E2E tests are enabled (by uncommenting in `vitest.config.ts`):

1. ✅ E2E tests run automatically with `yarn test`
2. ✅ E2E results appear in `test-results.json`
3. ✅ E2E failures appear in `failed-tests.json`
4. ✅ E2E tests appear in HTML report
5. ✅ No additional configuration needed

The reporting system automatically includes all configured test projects.

---

## CI/CD Integration

The test reporting system is designed for CI/CD:

```yaml
# Example GitHub Actions workflow
- name: Run tests
  run: yarn test

- name: Upload test results
  if: always()
  uses: actions/upload-artifact@v3
  with:
    name: test-results
    path: |
      test/test-results.json
      test/failed-tests.json
      public/docs/tests/index.html
```

---

## Troubleshooting

### Reports Not Generated

**Problem**: Running `yarn test:unit` or `yarn test:nuxt` doesn't create reports

**Solution**: Use `yarn test` instead. Individual project commands skip report generation.

### E2E Tests Not in Reports

**Problem**: E2E tests don't appear in reports

**Solution**: 
1. Check that E2E project is uncommented in `vitest.config.ts`
2. Run `yarn test` (not `yarn test:e2e`)

### HTML Report Not Found

**Problem**: Can't find `public/docs/tests/index.html`

**Solution**: 
1. Run `yarn test` to generate reports
2. Check that `public/docs/tests/` directory exists
3. The script creates the directory automatically if missing

---

## Summary

- ✅ All test types (unit, nuxt, e2e) are included in reports
- ✅ Three report formats: JSON (full), JSON (failures), HTML
- ✅ Reports generated automatically with `yarn test`
- ✅ E2E tests will be included when enabled
- ✅ No additional configuration needed

