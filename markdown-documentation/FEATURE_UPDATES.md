# Feature Updates & Enhancements

**Purpose**: Log of major feature additions and improvements  
**Last Updated**: January 1, 2026

---

## January 2026

### Footer Refactor

**Date**: January 1, 2026

**Overview**: Complete redesign of application footer with modern, centered layout

**Changes**:
- **Clickable Copyright**: ICJIA copyright now links to https://icjia.illinois.gov
- **Modern Design**: Centered layout with visual hierarchy
- **Enhanced Links**: GitHub, Print FAQs, Accessibility Report
- **Responsive**: 4 breakpoints (desktop → small mobile)
- **Accessible**: Proper ARIA labels, focus indicators

**Technical Details**:
- Component: [`app/components/AppFooter.vue`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/app/components/AppFooter.vue)
- Structure: Vertical stacking, centered alignment
- Icons: Material Design Icons (16px)
- Separators: Bullet points (•) between links (hidden on small mobile)

**Accessibility**:
- ✅ `role="contentinfo"` on footer
- ✅ `<nav aria-label="Footer navigation">`
- ✅ Descriptive ARIA labels on all links
- ✅ `:focus-visible` for keyboard-only focus indicators
- ✅ 2px outline + background highlight on focus

**Documentation**: [FOOTER_REFACTOR.md](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/markdown-documentation/FOOTER_REFACTOR.md)

---

### GitHub Links in Architecture Guide

**Date**: January 1, 2026

**Overview**: Added 30+ direct GitHub links to source files in ARCHITECTURE_GUIDE.md

**Changes**:
- **30+ Links Added**: Every code snippet now has GitHub link
- **File Format**: `[filename.ext](github-url)` before each snippet
- **Benefits**: Click filename → view full source on GitHub
- **Note Added**: Banner at top explaining the links

**Impact**:
- ✅ Instant access to source code
- ✅ Always current (links to `main` branch)
- ✅ Better developer experience
- ✅ Easier code verification

**Link Format**:
```
https://github.com/ICJIA/icjia-accessibility-portal/blob/main/[file-path]
```

**Documentation**: [ARCHITECTURE_GUIDE_GITHUB_LINKS.md](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/markdown-documentation/ARCHITECTURE_GUIDE_GITHUB_LINKS.md)

---

## Future Enhancements

### Planned

- Search functionality across FAQs
- Enhanced analytics integration
- Additional print templates

### Under Consideration

- PWA support for offline access
- Internationalization (i18n)
- Interactive FAQ wizard

---

**Maintained By**: ICJIA Development Team

