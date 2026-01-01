# Test Suite

This directory contains the test suite for the ICJIA Accessibility Portal, following Nuxt 4 testing best practices.

> 📚 **Documentation**: This test suite is also documented in the [main documentation index](../markdown-documentation/INDEX.md#testing-1-file).

## Structure

The tests are organized into two categories using Vitest projects:

- **`test/unit/`** - Unit tests for pure utility functions (no Nuxt runtime required)
  - `faqTransform.test.ts` - Tests for FAQ transformation utilities
  - `useSlugify.test.ts` - Tests for slug generation functions

- **`test/nuxt/`** - Tests that require Nuxt runtime environment
  - `useDeadlineCountdown.test.ts` - Tests for deadline countdown composable
  - `useFaqCollapse.test.ts` - Tests for FAQ collapse state management
  - `FaqAccordion.test.ts` - Tests for FAQ accordion component

## Running Tests

```bash
# Run all tests with comprehensive reporting (recommended)
# Uses the new comprehensive test runner that:
# - Auto-detects E2E tests
# - Starts dev server if E2E tests are enabled
# - Generates all reports with project breakdown
yarn test

# Run tests without generating reports (faster for development)
yarn test:run

# Run only unit tests
yarn test:unit

# Run only Nuxt tests
yarn test:nuxt

# Run only E2E tests (when enabled)
yarn test:e2e

# Run tests in watch mode (for development)
yarn test:watch

# Legacy test runner (without E2E support)
yarn test:legacy
```

### Test Reports

Running `yarn test` automatically generates three comprehensive reports:

1. **`test/test-results.json`** - Complete test results with project breakdown

   ```json
   {
     "summary": { "totalTests": 105, "passedTests": 105, ... },
     "projectStats": {
       "unit": { "passed": 37, "failed": 0, "total": 37 },
       "nuxt": { "passed": 68, "failed": 0, "total": 68 }
     },
     "testResults": [...]
   }
   ```

2. **`test/failed-tests.json`** - Only failed tests (useful for sharing with LLMs)

3. **`public/docs/tests/index.html`** - Interactive HTML report with:
   - Summary cards (total, passed, failed, skipped)
   - **Project breakdown** (unit, nuxt, e2e)
   - Color-coded test results
   - Failure messages with syntax highlighting

You can view the HTML report by opening `public/docs/tests/index.html` in a browser or by visiting `/docs/tests` when the app is running.

### Why JSON is Better for LLMs

JSON reports are superior to console output for sharing with LLMs because:

1. **Structured Data** - Easy to parse and understand programmatically
2. **No Formatting Issues** - Console output can have ANSI colors, special characters, and formatting that confuses parsing
3. **Complete Information** - Contains all relevant test details (file paths, error messages, stack traces)
4. **Reliable** - Consistent format every time, regardless of terminal settings
5. **Focused** - Only contains failed tests, filtering out noise from passing tests

The JSON files include:

- Summary statistics (total, passed, failed, skipped)
- File paths for each test
- Test names and full descriptions
- Error messages and stack traces (for failed tests)
- Duration information
- Generation timestamp

The HTML report provides:

- Visual summary cards showing test statistics
- Color-coded test status (passed/failed/skipped)
- Detailed test case information
- Failure messages with syntax highlighting
- Responsive design for viewing on any device

## Test Configuration

The test configuration is in `vitest.config.ts` and uses the project-based setup recommended by Nuxt:

- **Unit tests** run in Node environment for speed
- **Nuxt tests** run in Nuxt runtime environment (happy-dom) for components and composables

## Writing New Tests

### Unit Tests

Place pure utility functions that don't need Nuxt runtime in `test/unit/`:

```typescript
import { describe, it, expect } from "vitest";
import { myFunction } from "../../app/utils/myUtils";

describe("myFunction", () => {
  it("should work correctly", () => {
    expect(myFunction("input")).toBe("output");
  });
});
```

### Nuxt Tests

Place tests that need Nuxt runtime (composables, components) in `test/nuxt/`:

```typescript
import { describe, it, expect } from "vitest";
import { useMyComposable } from "../../app/composables/useMyComposable";

describe("useMyComposable", () => {
  it("should work in Nuxt environment", () => {
    const { value } = useMyComposable();
    expect(value.value).toBeDefined();
  });
});
```

## Best Practices

1. **Keep unit tests fast** - Place pure functions in `test/unit/`
2. **Use Nuxt environment only when needed** - Only use `test/nuxt/` for code that requires Nuxt runtime
3. **Mock external dependencies** - Use Vitest's mocking capabilities for external APIs
4. **Test accessibility** - Consider adding accessibility checks when testing components

## E2E Tests

E2E test infrastructure is **complete and ready** but temporarily disabled due to a compatibility issue with `@nuxt/test-utils`.

### Status

⚠️ **Temporarily Disabled** - Upstream issue: https://github.com/nuxt/test-utils/issues/1491
✅ **Infrastructure Complete** - All helpers, setup, and tests are ready
📋 **Documentation** - See [`test/e2e/README.md`](./e2e/README.md) for details

### What's Ready

- ✅ **Database isolation** - Prevents test conflicts
- ✅ **Accessibility helpers** - Comprehensive a11y testing utilities
- ✅ **Navigation helpers** - Routing and meta tag validation
- ✅ **Setup utilities** - Standard configuration and viewport management
- ✅ **Initial test suite** - 10 tests for the home page
- ✅ **Auto-detection** - Test runner automatically detects E2E tests
- ✅ **Dev server management** - Automatically starts/stops for E2E tests

### How to Enable

Once the upstream issue is resolved:

1. Uncomment the E2E project in `vitest.config.ts`
2. Run `yarn test` (dev server will start automatically)
3. E2E results will appear in all reports

See [`test/e2e/README.md`](./e2e/README.md) for complete documentation.

## Related Documentation

- **[E2E_TEST_PLAN.md](./E2E_TEST_PLAN.md)** - Comprehensive plan for implementing E2E tests
- **[../markdown-documentation/INDEX.md](../markdown-documentation/INDEX.md)** - Main documentation index
- **[../markdown-documentation/ARCHITECTURE_GUIDE.md](../markdown-documentation/ARCHITECTURE_GUIDE.md)** - Complete technical architecture guide

## Dependencies

- `@nuxt/test-utils` - Nuxt testing utilities
- `vitest` - Test runner
- `@vue/test-utils` - Vue component testing utilities
- `happy-dom` - DOM environment for Nuxt tests
