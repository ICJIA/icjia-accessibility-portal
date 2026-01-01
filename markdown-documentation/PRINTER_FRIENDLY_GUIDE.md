# Printer-Friendly FAQ Guide

**Last Updated**: January 2026  
**Version**: 1.1

---

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Implementation](#implementation)
4. [Usage](#usage)
5. [Verification & Audit Results](#verification--audit-results)

---

## Overview

The ICJIA Accessibility Portal includes a comprehensive printer-friendly version of all FAQs at `/faqs-print`. This feature provides users with the ability to print or save all FAQ content as a PDF for offline reference, which is particularly useful for:

- Staff who prefer printed reference materials
- Training sessions and workshops
- Offline access in areas with limited connectivity
- Archival purposes
- Comprehensive review of all FAQs at once

### Automatic Synchronization

The printer-friendly version **automatically stays in sync** with the main FAQ content because:

1. Both versions read from the same source file (`content/faqs.md`)
2. The page is regenerated during the build process
3. Any changes to `content/faqs.md` will appear in both versions immediately

**No manual synchronization is required** - edit `content/faqs.md` once and both versions update.

---

## Features

### Content

- **Complete FAQ Content**: All questions and answers from `content/faqs.md`
- **Table of Contents**: Auto-generated TOC with section counts
- **Section Organization**: Clear section headings
- **Numbered Questions**: Each question numbered (Q1, Q2, etc.)
- **"New" Badge Support**: Recently added questions marked
- **Last Updated Date**: Displays last update date
- **Metadata**: Includes compliance deadline (April 24, 2026)

### Design

- **Print-Optimized Layout**: Clean, serif typography
- **Page Break Management**: Avoids splitting questions/answers
- **Clear Visual Hierarchy**: Distinct sections, questions, answers
- **Professional Formatting**: Black and white design
- **Screen Preview**: Styled like a printed document on screen

### Accessibility

- **Screen Reader Friendly**: Semantic HTML with proper heading hierarchy
- **Keyboard Navigable**: External links keyboard accessible
- **High Contrast**: Black text on white background
- **WCAG 2.1 AA Compliant**: Maintains same compliance as main site
- **Skip Link**: Includes reusable SkipLink component
- **Link Handling**: Internal links (section references) are styled as bold text and non-clickable, while external links remain fully functional

---

## Implementation

### File Structure

```
app/
  layouts/
    print.vue              # Clean layout without navbar/footer
  pages/
    faqs-print.vue        # Main printer-friendly page component
  components/
    SkipLink.vue          # Reusable skip link component
    AppNavbar.vue         # Updated with "Print FAQs" link
    AppFooter.vue         # Updated with "Print FAQs" link
content/
  faqs.md                 # Source content (shared with online version)
```

**Source Files**:

- Main Page: [`app/pages/faqs-print.vue`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/app/pages/faqs-print.vue)
- Print Layout: [`app/layouts/print.vue`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/app/layouts/print.vue)
- Skip Link: [`app/components/SkipLink.vue`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/app/components/SkipLink.vue)

### Skip Link Implementation

The printer-friendly page uses the shared `SkipLink` component via the print layout:

1. `print.vue` layout includes `<SkipLink />` component
2. Layout's `v-main` has `id="main-content"` and `tabindex="-1"`
3. SkipLink component provides:
   - Off-screen positioning until focused (`top: -100px`)
   - High z-index (10000) to appear above all content
   - Proper focus styles with outline and shadow
   - Reduced motion support
   - Hidden in print media queries

**Benefits**:

- ✅ Consistent implementation across all pages
- ✅ 100% accessibility audit pass rate (12/12 skip links working)
- ✅ Reuses tested and validated component
- ✅ Maintains code reusability and DRY principles

### How It Works

1. **Layout Selection**: Uses custom "print" layout (no navbar/footer)
2. **Content Parsing**: Queries same `faqs.md` as main FAQ page
3. **Section Extraction**: Parses H2 headings as major sections
4. **Question Extraction**: Parses H3 headings as questions
5. **"New" Badge Processing**: Detects `{new:YYYY-MM-DD}` tags
6. **Table of Contents Generation**: Auto-generates TOC
7. **Print Styling**: Applies print-specific CSS

### Link Handling

The printer-friendly page intelligently handles different types of links:

#### Internal Links (Section References)

- **Styling**: Bold text, no underline
- **Functionality**: Non-clickable (href removed)
- **Purpose**: Indicates section names or question references
- **Example**: Links to `#section-name` or `#question-id` appear as **bold text**

#### External Links

- **Styling**: Underlined, clickable
- **Functionality**: Fully functional links
- **Purpose**: Links to external resources remain clickable
- **Example**: Links to `https://example.com` remain clickable with URL appended in parentheses

**Implementation**: The [`usePrintLinks` composable](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/app/composables/usePrintLinks.ts) automatically processes all links on the printer-friendly page to:

- Remove internal anchor links (convert to bold text)
- Keep external links functional with URLs appended for print accessibility

### URLs in Footer

Footer includes clickable links to production site:

- Open in new tab (`target="_blank"`)
- Security attributes (`rel="noopener noreferrer"`)
- Blue, underlined on screen
- Plain black when printed
- Always reference live site (`https://accessibility.icjia.app`)

### Styling Details

#### Screen View

- 8.5" x 11" page simulation with shadow
- Print instruction banner at top
- Table of contents (non-clickable, bold text)
- External links are clickable with hover effects
- Internal links appear as bold text (non-clickable)

#### Print View

- Clean black and white output
- Optimized font sizes (10-11pt)
- Intelligent page breaks
- No interactive elements (internal links as bold text, external links with URLs)
- Professional business document appearance

### Key CSS Classes

- `.print-container` - Main wrapper
- `.print-header` - Header section
- `.print-toc` - Table of contents
- `.print-toc-link` - TOC item (non-clickable, bold text)
- `.print-internal-link` - Internal links styled as bold text (non-clickable)
- `.print-section` - Major section container
- `.print-section-heading` - Section heading (H2)
- `.print-faq-item` - Individual Q&A container
- `.print-question` - Question heading (H3)
- `.print-answer` - Answer content
- `.print-new-badge` - "NEW" badge

### Link Processing

The printer-friendly page uses the [`usePrintLinks` composable](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/app/composables/usePrintLinks.ts) to automatically process links:

**Internal Links** (href starting with `#`):

- Removed `href` attribute (non-clickable)
- Added `print-internal-link` class
- Styled as bold text with no underline
- Indicates section references or question titles

**External Links** (http/https):

- Remain fully functional
- URL appended in parentheses for print accessibility
- Underlined and clickable

---

## Usage

### For Users

1. Navigate to `/faqs-print` from navigation menu or footer
2. Click "Print FAQs" link in navbar or footer
3. Use browser's print function (Ctrl/Cmd + P) to:
   - Print to physical printer
   - Save as PDF
   - Preview before printing

### Print Instructions

When viewing `/faqs-print`:

1. **Browser Print**: Use Ctrl/Cmd + P
2. **Save as PDF**: In print dialog, select "Save as PDF"
3. **Recommended Settings**:
   - Paper size: Letter (8.5" x 11")
   - Margins: Default
   - Background graphics: On (for section headers)
4. **Quality**: Use high quality setting

### For Content Editors

When adding or editing FAQs:

1. Edit `content/faqs.md` as usual
2. No additional steps needed - printer version updates automatically
3. To mark a question as new, add `{new:2026-01-01}` tag

### Last Updated Date Management

Update the "Last Updated" date when:

- New FAQs are added to `content/faqs.md`
- Existing FAQs are significantly revised
- Major content reorganization occurs
- Important corrections are made

**Where to Update**:

1. `app/pages/faqs-print.vue` - Line ~422: `const lastUpdated = "January 1, 2026";`
2. `README.md` - **Last Updated**: January 1, 2026

---

## Verification & Audit Results

### Accessibility Audit

**Status**: ✅ **PASSING** - 100% Compliant

**Results**:

- **WCAG 2.1 AA Violations**: 0
- **Skip Links Found**: 12/12
- **Skip Links Working**: 12/12
- **Color Contrast**: PASS
- **Keyboard Navigation**: PASS
- **Screen Reader Compatibility**: PASS

### Pages Tested

- `/` (Home)
- `/faqs` (Main FAQs)
- `/faqs-print` (Printer-friendly FAQs) ✅
- `/links` (Resources)

### Viewports Tested

- Desktop (1920x1080)
- Tablet (768x1024)
- Mobile (375x667)

### Skip Link Verification

**Test**: `/faqs-print` skip link functionality

**Results**:

- ✅ Skip link detected
- ✅ Target element (`#main-content`) found
- ✅ Target is focusable (`tabindex="-1"`)
- ✅ Properly positioned off-screen (`top: -100px`)
- ✅ High z-index (10000)
- ✅ Visible on focus
- ✅ Smooth scroll behavior
- ✅ Reduced motion respected

**Audit Report**: Available at `/docs/accessibility/`

### SEO Verification

- ✅ Proper meta tags included
- ✅ Included in `routes.json`
- ✅ Included in `sitemap.xml`
- ✅ Canonical URL set
- ✅ Accessible from navigation

### Performance

- ✅ Static generation enabled
- ✅ No client-side processing needed
- ✅ Lightweight (no additional libraries)
- ✅ Fast load times

### Browser Compatibility

Tested and verified in:

- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari (macOS/iOS)
- ✅ PDF generation via browser print-to-PDF

---

## Maintenance

### Regular Tasks

1. **Content Updates**: Edit `content/faqs.md` - printer version updates automatically
2. **Date Updates**: Update last-updated date for significant changes
3. **Style Adjustments**: Modify print CSS in `faqs-print.vue` if needed

### Troubleshooting

**Q: Printer version out of sync with main FAQs**

- Should not happen (same source file)
- Try rebuilding: `yarn generate`
- Check both pages query same collection

**Q: Page breaks splitting questions**

- Ensure `.print-faq-item` has `page-break-inside: avoid`
- Add `page-break-before: auto` if needed

**Q: Styles not appearing in print**

- Check browser's "Background graphics" option enabled
- Verify `print-color-adjust: exact` is set

**Q: Table of contents links not working**

- TOC items are intentionally non-clickable (styled as bold text)
- Internal links throughout the page are converted to bold text (not clickable)
- This is intentional - internal links don't work when printed
- External links remain functional and clickable

---

## Technical Considerations

### Performance

- Static generation for fast loading
- No client-side processing
- Lightweight implementation

### Browser Support

- All modern browsers supported
- Print tested across major browsers
- PDF generation verified

### Accessibility Compliance

- WCAG 2.1 AA compliant
- Semantic HTML structure
- Proper heading hierarchy (H1 → H2 → H3)
- Sufficient color contrast
- Keyboard accessible
- Screen reader friendly

---

## Related Documentation

- [ARCHITECTURE_GUIDE.md](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/markdown-documentation/ARCHITECTURE_GUIDE.md) - Complete technical architecture
- [FAQ_CONTENT_GUIDE.md](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/markdown-documentation/FAQ_CONTENT_GUIDE.md) - FAQ management guide
- [ACCESSIBILITY_GUIDE.md](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/markdown-documentation/ACCESSIBILITY_GUIDE.md) - Accessibility documentation

---

**Created**: January 1, 2026  
**Status**: Production Ready ✅
