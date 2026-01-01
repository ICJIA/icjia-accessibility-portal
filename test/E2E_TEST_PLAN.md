# E2E Test Plan

**Status**: Planned (not yet implemented)  
**Last Updated**: January 1, 2026

---

## Overview

This document outlines the plan for implementing End-to-End (E2E) tests for the ICJIA Accessibility Portal. E2E tests were temporarily removed to maintain a 100% test pass rate while resolving database conflicts. This plan provides a roadmap for re-implementing them.

---

## Why E2E Tests Are Important

E2E tests validate the complete application stack in a real browser environment, catching issues that unit and Nuxt tests cannot:

1. **Integration Testing** - Verifies all components work together (Nuxt → Content → Components → Browser)
2. **Real User Flows** - Tests actual user interactions and navigation
3. **Accessibility Validation** - Confirms ARIA attributes and keyboard navigation work in browsers
4. **SSR Verification** - Ensures server-side rendering works correctly
5. **Build & Deployment Confidence** - Validates production builds before deployment

---

## Test Coverage Plan

### 1. Critical User Flows

#### Home Page (`/`)

- [ ] Page loads and renders correctly
- [ ] Countdown timer displays and updates
- [ ] FAQ section displays with accordion functionality
- [ ] "New" badges appear on recent FAQ items
- [ ] Skip link works (keyboard navigation)
- [ ] Navigation links are functional
- [ ] Meta tags are present and correct
- [ ] SEO structured data is valid

#### FAQs Page (`/faqs`)

- [ ] Page loads with all FAQ content
- [ ] FAQ accordions expand/collapse correctly
- [ ] Search functionality works (if implemented)
- [ ] "New" badges display correctly
- [ ] Print-friendly link works
- [ ] Keyboard navigation through FAQs
- [ ] ARIA attributes are present

#### Print FAQs Page (`/faqs-print`)

- [ ] Page loads without navigation/footer
- [ ] All FAQ content is visible
- [ ] Print styles are applied correctly
- [ ] No interactive elements (appropriate for print)

#### Links Page (`/links`)

- [ ] Page loads with all resource links
- [ ] External links open in new tabs (`target="_blank"`)
- [ ] Links are properly formatted
- [ ] Content loads from markdown

### 2. Navigation & Routing

- [ ] Navigation between all pages works
- [ ] Active page is highlighted in navbar (`aria-current="page"`)
- [ ] Browser back/forward buttons work
- [ ] Direct URL access works for all routes
- [ ] 404 page handles invalid routes

### 3. Accessibility Features

#### Keyboard Navigation

- [ ] Tab order is logical
- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicators are visible
- [ ] No keyboard traps
- [ ] Skip link is first focusable element
- [ ] Enter/Space activate buttons and links

#### ARIA Attributes

- [ ] `aria-live="polite"` on countdown timer
- [ ] `aria-describedby` on FAQ accordions
- [ ] `aria-current="page"` on active nav items
- [ ] `aria-hidden="true"` on decorative icons
- [ ] `aria-label` on icon-only buttons

#### Screen Reader Compatibility

- [ ] Semantic HTML structure
- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] Form labels are associated
- [ ] Error messages are announced
- [ ] Dynamic content updates are announced

### 4. Content Loading

- [ ] Markdown content loads from `@nuxt/content`
- [ ] FAQ content transforms correctly
- [ ] Links content displays properly
- [ ] Images load with alt text
- [ ] Content is searchable (if search is implemented)

### 5. Responsive Design

- [ ] Mobile viewport (375x667) renders correctly
- [ ] Tablet viewport (768x1024) renders correctly
- [ ] Desktop viewport (1920x1080) renders correctly
- [ ] Navigation adapts to screen size
- [ ] Content is readable at all sizes

---

## Implementation Strategy

### Phase 1: Database Isolation (Prerequisite)

**Problem**: SQLite database conflicts when multiple E2E test suites run in parallel.

**Solution Options**:

1. **Separate Database Per Test Suite** (Recommended)
   - Use unique database paths for each test file
   - Configure `@nuxt/content` to use isolated databases
   - Clean up databases after tests complete

2. **Sequential Test Execution**
   - Run E2E tests sequentially instead of in parallel
   - Simpler but slower

3. **In-Memory Database**
   - Use SQLite in-memory mode for tests
   - Fastest but may not catch all issues

**Recommended Approach**: Option 1 - Separate database per test suite with cleanup.

### Phase 2: Test Infrastructure Setup

1. **Re-add E2E Project to `vitest.config.ts`**

   ```typescript
   {
     test: {
       name: 'e2e',
       include: ['test/e2e/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
       environment: 'node',
     },
   }
   ```

2. **Create Test Utilities**
   - Database isolation helper
   - Common setup/teardown functions
   - Accessibility testing helpers

3. **Configure Test Timeouts**
   - `setupTimeout: 180000` (3 minutes for build)
   - Individual test timeouts as needed

### Phase 3: Implement Tests

Start with critical user flows, then expand:

1. **Week 1**: Home page and basic navigation
2. **Week 2**: FAQ pages and content loading
3. **Week 3**: Accessibility features and keyboard navigation
4. **Week 4**: Print functionality and edge cases

### Phase 4: Integration with CI/CD

- Add E2E tests to CI pipeline
- Run on pull requests
- Generate reports for failed tests
- Keep test execution time reasonable (< 5 minutes)

---

## Test File Structure

```
test/e2e/
├── setup.ts              # Common setup utilities
├── helpers/
│   ├── database.ts       # Database isolation helpers
│   ├── accessibility.ts # Accessibility testing helpers
│   └── navigation.ts    # Navigation testing helpers
├── pages/
│   ├── index.test.ts     # Home page tests
│   ├── faqs.test.ts      # FAQ page tests
│   ├── faqs-print.test.ts # Print FAQ tests
│   └── links.test.ts     # Links page tests
├── navigation.test.ts    # Cross-page navigation
└── accessibility.test.ts # Accessibility-specific tests
```

---

## Example Test Structure

```typescript
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { fileURLToPath } from "node:url";
import { $fetch, setup, createPage } from "@nuxt/test-utils/e2e";
import { isolateDatabase } from "./helpers/database";

describe("Home Page", async () => {
  // Isolate database for this test suite
  const dbPath = await isolateDatabase("home-page");

  await setup({
    rootDir: fileURLToPath(new URL("../..", import.meta.url)),
    build: true,
    server: true,
    setupTimeout: 180000,
    // Configure content database path
    nuxtConfig: {
      content: {
        database: dbPath,
      },
    },
  });

  afterAll(async () => {
    // Clean up isolated database
    await cleanupDatabase(dbPath);
  });

  it("should render the home page", async () => {
    const html = await $fetch("/");
    expect(html).toContain("ICJIA Accessibility Portal");
    expect(html).toContain("Countdown to WCAG 2.1 AA Compliance");
  });

  it("should have working skip link", async () => {
    const page = await createPage("/");
    const skipLink = await page.locator('a[href="#main-content"]');
    expect(await skipLink.isVisible()).toBe(true);

    await skipLink.focus();
    await page.keyboard.press("Enter");
    // Verify focus moved to main content
  });
});
```

---

## Accessibility Testing Tools

### Automated Tools

- **axe-core** (via `@axe-core/playwright`) - Already in dependencies
- **Playwright accessibility checks** - Built-in accessibility testing

### Manual Testing Checklist

- [ ] Keyboard navigation works
- [ ] Screen reader compatibility
- [ ] Color contrast meets WCAG 2.1 AA
- [ ] Focus indicators are visible
- [ ] No keyboard traps

---

## Success Criteria

E2E tests are considered successful when:

1. ✅ All critical user flows are tested
2. ✅ Tests run reliably without database conflicts
3. ✅ Test execution time < 5 minutes
4. ✅ 100% pass rate maintained
5. ✅ Accessibility features validated
6. ✅ Reports generated automatically

---

## Maintenance

### Regular Updates

- Update tests when adding new pages
- Add tests for new accessibility features
- Keep test data in sync with content

### Performance Monitoring

- Track test execution time
- Optimize slow tests
- Remove redundant tests

---

## Resources

- [Nuxt Testing Documentation](https://nuxt.com/docs/4.x/getting-started/testing)
- [Playwright Documentation](https://playwright.dev/)
- [axe-core Documentation](https://github.com/dequelabs/axe-core)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## Notes

- E2E tests were removed on January 1, 2026 to maintain 100% pass rate
- Database conflicts need resolution before re-implementation
- Tests should be added incrementally, not all at once
- Focus on critical user flows first, then expand coverage
