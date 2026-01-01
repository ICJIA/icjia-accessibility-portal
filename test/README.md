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
# Run all tests and generate reports (recommended)
# This runs tests and automatically generates all reports:
# - test/failed-tests.json (failed tests only)
# - test/test-results.json (all test results)
# - public/docs/tests/index.html (HTML report)
yarn test

# Run tests without generating reports (faster for development)
yarn test:run

# Run only unit tests
yarn test:unit

# Run only Nuxt tests
yarn test:nuxt

# Run tests in watch mode (for development)
yarn test:watch

# Run tests with coverage
yarn test:coverage

# Generate test reports only (if tests already ran)
yarn test:reports
```

### Test Reports

Running `yarn test` automatically generates three files:

1. **`test/failed-tests.json`** - Contains only failed tests in a structured format (useful for sharing with LLMs)
2. **`test/test-results.json`** - Contains all test results (both successful and failed tests)
3. **`public/docs/tests/index.html`** - HTML report with a visual representation of all test results

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
import { describe, it, expect } from 'vitest'
import { myFunction } from '../../app/utils/myUtils'

describe('myFunction', () => {
  it('should work correctly', () => {
    expect(myFunction('input')).toBe('output')
  })
})
```

### Nuxt Tests

Place tests that need Nuxt runtime (composables, components) in `test/nuxt/`:

```typescript
import { describe, it, expect } from 'vitest'
import { useMyComposable } from '../../app/composables/useMyComposable'

describe('useMyComposable', () => {
  it('should work in Nuxt environment', () => {
    const { value } = useMyComposable()
    expect(value.value).toBeDefined()
  })
})
```

## Best Practices

1. **Keep unit tests fast** - Place pure functions in `test/unit/`
2. **Use Nuxt environment only when needed** - Only use `test/nuxt/` for code that requires Nuxt runtime
3. **Mock external dependencies** - Use Vitest's mocking capabilities for external APIs
4. **Test accessibility** - Consider adding accessibility checks when testing components

## E2E Tests (Planned)

E2E tests were temporarily removed to maintain a 100% test pass rate. A comprehensive plan for re-implementing them is available in [`test/E2E_TEST_PLAN.md`](./E2E_TEST_PLAN.md).

### Quick Summary

E2E tests will cover:
- Critical user flows (navigation, FAQ access, content loading)
- Accessibility features (keyboard navigation, ARIA attributes)
- Print functionality
- Server-side rendering verification
- Integration testing across the full stack

### Implementation Status

- ✅ **Plan Created** - See `test/E2E_TEST_PLAN.md` for detailed implementation plan
- ⏳ **Database Isolation** - Need to resolve SQLite conflicts before implementation
- ⏳ **Test Infrastructure** - Will be set up following the plan
- ⏳ **Test Implementation** - Will be added incrementally

See [`test/E2E_TEST_PLAN.md`](./E2E_TEST_PLAN.md) for the complete implementation strategy, test coverage plan, and example code.

## Related Documentation

- **[E2E_TEST_PLAN.md](./E2E_TEST_PLAN.md)** - Comprehensive plan for implementing E2E tests
- **[../markdown-documentation/INDEX.md](../markdown-documentation/INDEX.md)** - Main documentation index
- **[../markdown-documentation/ARCHITECTURE_GUIDE.md](../markdown-documentation/ARCHITECTURE_GUIDE.md)** - Complete technical architecture guide

## Dependencies

- `@nuxt/test-utils` - Nuxt testing utilities
- `vitest` - Test runner
- `@vue/test-utils` - Vue component testing utilities
- `happy-dom` - DOM environment for Nuxt tests

