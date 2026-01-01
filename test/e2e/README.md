# E2E Tests - Currently Disabled

**Status**: ⚠️ Temporarily Disabled  
**Reason**: Compatibility issue with `@nuxt/test-utils`  
**Tracking Issue**: https://github.com/nuxt/test-utils/issues/1491

---

## Why Are E2E Tests Disabled?

The E2E tests are currently disabled due to a known issue with `@nuxt/test-utils` version 3.19.0+ that causes a bundling error:

```
Error: Cannot bundle built-in module "bun:test" imported from "@nuxt/test-utils"
```

This is a known upstream issue being tracked in the Nuxt test-utils repository.

---

## What's Been Implemented?

Even though the E2E tests are temporarily disabled, **all the infrastructure is ready**:

### ✅ Complete Test Infrastructure

1. **Database Isolation** (`helpers/database.ts`)
   - Creates unique databases per test suite
   - Prevents conflicts when running tests in parallel
   - Automatic cleanup after tests

2. **Accessibility Helpers** (`helpers/accessibility.ts`)
   - Keyboard navigation testing
   - ARIA attribute validation
   - Skip link testing
   - Heading hierarchy validation
   - Image alt text checking
   - External link validation
   - Keyboard trap detection

3. **Navigation Helpers** (`helpers/navigation.ts`)
   - Navigation link testing
   - Active page highlighting
   - Browser back/forward testing
   - Direct URL access testing
   - 404 page testing
   - Meta tag validation
   - Structured data validation

4. **Setup Utilities** (`setup.ts`)
   - Standard test configuration
   - Database isolation setup
   - Viewport management (mobile, tablet, desktop)
   - Nuxt hydration waiting
   - Common test data

5. **Initial Test Suite** (`pages/index.test.ts`)
   - 10 comprehensive tests for the home page
   - Ready to run once the upstream issue is resolved

---

## How to Enable E2E Tests

Once the `@nuxt/test-utils` issue is resolved, follow these steps:

### 1. Update `vitest.config.ts`

Uncomment the E2E project configuration:

```typescript
await defineVitestProject({
  test: {
    name: "e2e",
    include: [
      "test/e2e/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
    ],
    environment: "nuxt",
    setupTimeout: 180000, // 3 minutes for build
    testTimeout: 30000, // 30 seconds per test
  },
}),
```

### 2. Run E2E Tests

```bash
# Run all tests (unit + nuxt + e2e) with reports
yarn test

# Run only E2E tests
yarn test:e2e

# Run specific test file
yarn test test/e2e/pages/index.test.ts

# Run with watch mode
yarn test --project=e2e --watch
```

### 3. Test Reports

When you run `yarn test`, the following reports are automatically generated:

- **`test/test-results.json`** - Complete results for all tests (unit, nuxt, e2e)
- **`test/failed-tests.json`** - Only failed tests (for sharing with LLMs)
- **`public/docs/tests/index.html`** - Interactive HTML report

E2E test results will be included in all three reports alongside unit and nuxt tests.

---

## Test Files Structure

```
test/e2e/
├── README.md              # This file
├── setup.ts               # Common setup utilities
├── helpers/
│   ├── database.ts        # Database isolation helpers
│   ├── accessibility.ts   # Accessibility testing helpers
│   └── navigation.ts      # Navigation testing helpers
└── pages/
    └── index.test.ts      # Home page tests (10 tests)
```

---

## Adding More E2E Tests

When E2E tests are re-enabled, you can easily add more tests:

### Example: FAQs Page Test

```typescript
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { $fetch, createPage } from "@nuxt/test-utils/e2e";
import { setupWithDatabase } from "../setup";
import { testHeadingHierarchy } from "../helpers/accessibility";

describe("FAQs Page", async () => {
  let cleanup: () => Promise<void>;

  beforeAll(async () => {
    cleanup = await setupWithDatabase("faqs-page");
  }, 180000);

  afterAll(async () => {
    if (cleanup) await cleanup();
  });

  it("should render FAQ content", async () => {
    const html = await $fetch("/faqs");
    expect(html).toContain("Frequently Asked Questions");
  });

  it("should have proper heading hierarchy", async () => {
    const page = await createPage("/faqs");
    await testHeadingHierarchy(page);
    await page.close();
  });
});
```

---

## Monitoring the Upstream Issue

Check the status of the upstream issue:

- **GitHub Issue**: https://github.com/nuxt/test-utils/issues/1491
- **Related Issues**: Search for "bun:test" in nuxt/test-utils issues

---

## Alternative: Manual E2E Testing

While automated E2E tests are disabled, you can manually test:

1. **Start development server**:

   ```bash
   yarn dev
   ```

2. **Test in browser**:
   - Navigate to http://localhost:3000
   - Test keyboard navigation (Tab key)
   - Test skip link (Tab, then Enter)
   - Test FAQ accordions
   - Test navigation links

3. **Test production build**:
   ```bash
   yarn generate:serve
   ```

   - Navigate to http://localhost:5150
   - Repeat browser tests

---

## Summary

- ✅ **Infrastructure**: Complete and ready
- ✅ **Helpers**: Comprehensive accessibility and navigation utilities
- ✅ **Tests**: Initial home page test suite written
- ⚠️ **Status**: Temporarily disabled due to upstream issue
- 🔄 **Next Steps**: Re-enable when `@nuxt/test-utils` issue is resolved

The E2E test infrastructure is production-ready and can be enabled immediately once the upstream compatibility issue is fixed.
