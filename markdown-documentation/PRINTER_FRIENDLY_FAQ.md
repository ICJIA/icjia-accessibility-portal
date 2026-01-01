# Printer-Friendly FAQ Feature

**Last Updated**: January 1, 2026

## Overview

The ICJIA Accessibility Portal includes a comprehensive printer-friendly version of all FAQs at `/faqs-print`. This feature provides users with the ability to print or save all FAQ content as a PDF for offline reference, which is particularly useful for:

- Staff who prefer printed reference materials
- Training sessions and workshops
- Offline access in areas with limited connectivity
- Archival purposes
- Comprehensive review of all FAQs at once

## Features

### Content

- **Complete FAQ Content**: All questions and answers from `content/faqs.md` are included
- **Table of Contents**: Auto-generated TOC showing all sections with question counts
- **Section Organization**: Clear section headings matching the online version
- **Numbered Questions**: Each question is numbered (Q1, Q2, etc.) within its section
- **"New" Badge Support**: Recently added questions are marked with a "NEW" badge
- **Last Updated Date**: Displays the last update date (coordinated with the countdown timer deadline)
- **Metadata**: Includes compliance deadline (April 24, 2026) and other key information

### Design

- **Print-Optimized Layout**: Clean, serif typography optimized for reading and printing
- **Page Break Management**: Intelligent page breaks to avoid splitting questions/answers
- **Clear Visual Hierarchy**: Section headings, questions, and answers are clearly distinguished
- **Professional Formatting**: Black and white design suitable for printing
- **Screen Preview**: Styled to look like a printed document when viewed on screen

### Accessibility

- **Screen Reader Friendly**: Semantic HTML with proper heading hierarchy
- **Keyboard Navigable**: All links in TOC are keyboard accessible
- **High Contrast**: Black text on white background for maximum readability
- **Print Instructions**: Clear instructions for printing or saving as PDF

## Implementation Details

### File Structure

```
app/
  layouts/
    print.vue              # Clean layout without navbar/footer
  pages/
    faqs-print.vue        # Main printer-friendly page component
  components/
    AppNavbar.vue         # Updated with "Print FAQs" link
    AppFooter.vue         # Updated with "Print FAQs" link
content/
  faqs.md                 # Source content (shared with online version)
```

### How It Works

1. **Layout Selection**: The page uses a custom "print" layout that excludes navbar and footer
2. **Content Parsing**: The page queries the same `faqs.md` content used by the main FAQ page
3. **Section Extraction**: Parses H2 headings as major sections
4. **Question Extraction**: Parses H3 headings as questions with following content as answers
5. **"New" Badge Processing**: Detects `{new:YYYY-MM-DD}` tags and displays badges for recent questions
6. **Table of Contents Generation**: Auto-generates TOC from parsed sections
7. **Print Styling**: Applies print-specific CSS for optimal output

**URLs in Footer**: The page footer includes clickable links to the live production site (`https://accessibility.icjia.app`). These links:

- Open in a new tab/window (`target="_blank"`)
- Include proper security attributes (`rel="noopener noreferrer"`)
- Are styled as blue, underlined links on screen for easy clicking
- Appear as plain black text when printed (for cost-effective printing)
- Ensure printed documents always reference the correct live site

### Automatic Updates

The printer-friendly version **automatically stays in sync** with the main FAQ content because:

1. Both versions read from the same source file (`content/faqs.md`)
2. The page is regenerated during the build process
3. Any changes to `content/faqs.md` will appear in both versions immediately

**No manual synchronization is required** - edit `content/faqs.md` once and both versions update.

## Usage

### For Users

1. Navigate to `/faqs-print` from the navigation menu or footer
2. Click the "Print FAQs" link in the navbar or footer
3. Use browser's print function (Ctrl/Cmd + P) to:
   - Print to physical printer
   - Save as PDF
   - Preview before printing

### For Content Editors

When adding or editing FAQs:

1. Edit `content/faqs.md` as usual
2. No additional steps needed - printer version updates automatically
3. To mark a question as new, add `{new:2026-01-01}` tag (see FAQ_NEW_TAG_SYSTEM.md)

### Print Instructions for Users

When viewing `/faqs-print`:

1. **Browser Print**: Use Ctrl/Cmd + P to open print dialog
2. **Save as PDF**: In print dialog, select "Save as PDF" as destination
3. **Page Settings**: Recommended settings:
   - Paper size: Letter (8.5" x 11")
   - Margins: Default
   - Background graphics: On (for section headers)
4. **Quality**: Use high quality setting for best results

## Last Updated Date Management

The printer-friendly version includes a "Last Updated" date that should be coordinated with other project dates:

### Where to Update

1. **Printer Version** (`app/pages/faqs-print.vue`):

   ```vue
   // Line ~422 const lastUpdated = "January 1, 2026";
   ```

2. **README.md**:

   ```markdown
   **Last Updated**: January 1, 2026
   ```

3. **Countdown Timer** (`app/composables/useDeadlineCountdown.ts`):
   ```typescript
   // Deadline date (do not change)
   const DEADLINE_DATE = new Date("2026-04-24T00:00:00").getTime();
   ```

### When to Update

Update the "Last Updated" date when:

- New FAQs are added to `content/faqs.md`
- Existing FAQs are significantly revised
- Major content reorganization occurs
- Important corrections are made

**Note**: The date should reflect significant content updates, not minor typo fixes or formatting changes.

## Styling Details

### Screen View

- 8.5" x 11" page simulation with shadow
- Print instruction banner at top
- Clickable table of contents
- Hover effects on links

### Print View

- Clean black and white output
- Optimized font sizes (10-11pt)
- Intelligent page breaks
- No interactive elements
- Section headers with black background
- Professional business document appearance

### CSS Classes

Key CSS classes for customization:

- `.print-container` - Main wrapper
- `.print-header` - Header section with logo and title
- `.print-toc` - Table of contents
- `.print-section` - Major section container
- `.print-section-heading` - Section heading (H2)
- `.print-faq-item` - Individual Q&A container
- `.print-question` - Question heading (H3)
- `.print-answer` - Answer content
- `.print-new-badge` - "NEW" badge for recent questions

## Technical Considerations

### Performance

- **Static Generation**: Page is pre-rendered during build for fast loading
- **No Client-Side Processing**: All parsing happens during build
- **Lightweight**: No additional JavaScript libraries needed

### SEO

- Proper meta tags included
- Excluded from sitemap (utility page, not main content)
- Canonical URL points to printer version

### Browser Compatibility

- Works in all modern browsers (Chrome, Firefox, Safari, Edge)
- Print functionality tested in:
  - Chrome/Edge (Chromium)
  - Firefox
  - Safari (macOS/iOS)
- PDF generation tested with browser print-to-PDF

### Accessibility Compliance

The printer-friendly version maintains the same WCAG 2.1 AA compliance as the main site:

- Semantic HTML structure
- Proper heading hierarchy (H1 → H2 → H3)
- Sufficient color contrast (black on white)
- Keyboard accessible navigation
- Screen reader friendly
- Print media queries for optimal output

## Maintenance

### Regular Maintenance Tasks

1. **Content Updates**: Edit `content/faqs.md` - printer version updates automatically
2. **Date Updates**: Update last-updated date when making significant content changes
3. **Style Adjustments**: Modify print CSS in `faqs-print.vue` if needed

### Troubleshooting

**Q: Printer version is out of sync with main FAQs**

- This should not happen as both read from the same file
- Try rebuilding: `yarn generate`
- Check that both pages query the same collection: `queryCollection("faqs")`

**Q: Page breaks are splitting questions**

- Ensure `.print-faq-item` has `page-break-inside: avoid`
- Add `page-break-before: auto` if needed

**Q: Styles not appearing in print**

- Check browser's "Background graphics" option is enabled
- Verify `print-color-adjust: exact` is set for colored elements

**Q: Table of contents links not working**

- Links are only functional in screen view
- In print, they appear as plain text (intentional)

## Future Enhancements

Potential improvements for consideration:

1. **PDF Generation**: Server-side PDF generation for direct download
2. **Custom Date Ranges**: Filter FAQs by date range before printing
3. **Section Selection**: Allow users to select specific sections to print
4. **Export Options**: Export as Word document or other formats
5. **Print Templates**: Multiple print templates (compact, detailed, etc.)
6. **Bookmarks**: PDF bookmarks for easy navigation in generated PDFs

## Related Documentation

- `FAQ_NEW_TAG_SYSTEM.md` - Using the "new" badge system
- `FAQ_COMPREHENSIVE_ASSESSMENT.md` - FAQ content guidelines
- `ACCESSIBILITY_AUDIT_RESULTS.md` - Accessibility testing results
- `README.md` - Main project documentation

## Support

For questions or issues with the printer-friendly feature:

1. Check this documentation first
2. Review the source code in `app/pages/faqs-print.vue`
3. Test in a different browser to rule out browser-specific issues
4. Contact the development team

---

**Version**: 1.0  
**Created**: January 1, 2026  
**Last Updated**: January 1, 2026  
**Maintained By**: ICJIA Development Team
