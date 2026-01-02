# Documentation Index

**Last Updated**: January 2026  
**Total Documents**: 18  
**Purpose**: Quick reference guide to all project documentation

---

## 🌟 Start Here

### For New Developers or LLMs

**[ARCHITECTURE_GUIDE.md](ARCHITECTURE_GUIDE.md)** ⭐⭐⭐  
**1300+ lines with GitHub links | Essential Reading**

Complete technical guide covering:
- Project architecture and design decisions
- Content management strategy
- Accessibility implementation (including skip links)
- Build and deployment process
- Real challenges faced and solutions found
- Best practices and patterns
- Testing and validation
- Tips for replicating similar applications

**This is the single most important document for understanding the entire codebase.**

---

## 📋 Documentation by Category

### Core (3 files)

| Document | Purpose | When to Read |
|----------|---------|--------------|
| **[ARCHITECTURE_GUIDE.md](ARCHITECTURE_GUIDE.md)** ⭐ | Complete technical architecture | First time working on project |
| **[INDEX.md](INDEX.md)** | Documentation index (this file) | Finding specific documentation |
| **[PROJECT_REVIEW.md](PROJECT_REVIEW.md)** | Project review with improvement suggestions | Understanding project goals |

### Features & Guides (6 files)

| Document | Purpose | When to Read |
|----------|---------|--------------|
| **[PRINTER_FRIENDLY_GUIDE.md](PRINTER_FRIENDLY_GUIDE.md)** | Complete printer-friendly FAQ guide | Working on print functionality |
| **[ACCESSIBILITY_GUIDE.md](ACCESSIBILITY_GUIDE.md)** | All accessibility documentation | Working on accessibility features |
| **[ACCESSIBILITY_AUDIT_SCRIPT_GUIDE.md](ACCESSIBILITY_AUDIT_SCRIPT_GUIDE.md)** | Complete accessibility audit script guide (1355 lines) | Using or customizing the audit script |
| **[FAQ_CONTENT_GUIDE.md](FAQ_CONTENT_GUIDE.md)** | FAQ management and "new" badge system | Adding/managing FAQ content |
| **[SEO_GUIDE.md](SEO_GUIDE.md)** | SEO optimization and verification | Improving search rankings |
| **[CONFIGURATION_ABSTRACTION.md](CONFIGURATION_ABSTRACTION.md)** | Configuration management patterns | Setting up environments |

### Testing (1 file)

| Document | Purpose | When to Read |
|----------|---------|--------------|
| **[TESTING_METHODOLOGY_GUIDE.md](TESTING_METHODOLOGY_GUIDE.md)** | Reusable testing methodology for Nuxt + Vuetify (unit → component → E2E → a11y → smoke) | Adding features or validating behavior changes |
| **[../test/E2E_TEST_PLAN.md](../test/E2E_TEST_PLAN.md)** | E2E test implementation plan | Planning or implementing E2E tests |

### History & Updates (3 files)

| Document | Purpose | When to Read |
|----------|---------|--------------|
| **[CONTENT_MAINTENANCE_HISTORY.md](CONTENT_MAINTENANCE_HISTORY.md)** | Chronological log of content fixes | Tracking content changes |
| **[FEATURE_UPDATES.md](FEATURE_UPDATES.md)** | Log of feature additions | Understanding recent features |
| **[DOCUMENTATION_HISTORY.md](DOCUMENTATION_HISTORY.md)** | Documentation update log | Understanding doc evolution |

---

## 🎯 Quick Reference by Task

### I want to...

#### Understand the entire application
👉 **[ARCHITECTURE_GUIDE.md](ARCHITECTURE_GUIDE.md)** - Start here! (1300+ lines with code links)

#### Add a new FAQ question
👉 **[FAQ_CONTENT_GUIDE.md](FAQ_CONTENT_GUIDE.md)** - "New" badge system section  
👉 Edit `content/faqs.md` directly

#### Work on accessibility
👉 **[ARCHITECTURE_GUIDE.md](ARCHITECTURE_GUIDE.md)** - Section 5: Accessibility  
👉 **[ACCESSIBILITY_GUIDE.md](ACCESSIBILITY_GUIDE.md)** - Complete accessibility reference  

#### Modify the printer-friendly page
👉 **[PRINTER_FRIENDLY_GUIDE.md](PRINTER_FRIENDLY_GUIDE.md)** - Complete implementation guide

#### Run tests
👉 **[../test/README.md](../test/README.md)** - Complete test suite documentation  
👉 **[../test/E2E_TEST_PLAN.md](../test/E2E_TEST_PLAN.md)** - E2E test implementation plan  
👉 **[TESTING_METHODOLOGY_GUIDE.md](TESTING_METHODOLOGY_GUIDE.md)** - Testing methodology (recommended workflow)  
👉 Run: `yarn test` (runs all tests and generates reports)

#### Run accessibility audits
👉 **[ACCESSIBILITY_AUDIT_SCRIPT_GUIDE.md](ACCESSIBILITY_AUDIT_SCRIPT_GUIDE.md)** - Complete script documentation (1355 lines with challenges & solutions)  
👉 **[ARCHITECTURE_GUIDE.md](ARCHITECTURE_GUIDE.md)** - Section 9: Testing  
👉 **[ACCESSIBILITY_GUIDE.md](ACCESSIBILITY_GUIDE.md)** - Audit configuration
👉 Run: `yarn audit:a11y` or `yarn generate:accessibility`

#### Deploy to production
👉 **[ARCHITECTURE_GUIDE.md](ARCHITECTURE_GUIDE.md)** - Section 6: Build & Deployment  
👉 **[CONFIGURATION_ABSTRACTION.md](CONFIGURATION_ABSTRACTION.md)** - Environment setup

#### Improve SEO
👉 **[SEO_GUIDE.md](SEO_GUIDE.md)** - SEO optimization guide  
👉 **[ARCHITECTURE_GUIDE.md](ARCHITECTURE_GUIDE.md)** - Section 8: Best Practices

#### Update content
👉 **[FAQ_CONTENT_GUIDE.md](FAQ_CONTENT_GUIDE.md)** - Content guidelines  
👉 **[CONTENT_MAINTENANCE_HISTORY.md](CONTENT_MAINTENANCE_HISTORY.md)** - Previous changes  
👉 Edit files in `content/` directory

#### Build a similar app
👉 **[ARCHITECTURE_GUIDE.md](ARCHITECTURE_GUIDE.md)** - Section 10: Replicating This Application  
👉 **[PROJECT_REVIEW.md](PROJECT_REVIEW.md)** - Lessons learned

---

## 📊 Documentation Statistics

| Metric | Count |
|--------|-------|
| **Total Documents** | 18 |
| **Core Docs** | 3 |
| **Feature/Guide Docs** | 8 |
| **Testing Docs** | 1 (this folder) |
| **History/Update Docs** | 3 |
| **Plans/Analysis Docs** | 4 |

---

## 🔄 Documentation Maintenance

### When to Update Documentation

- **ARCHITECTURE_GUIDE.md**: When making architectural changes, adding new patterns, or solving significant challenges
- **Feature Guides**: When modifying or adding features
- **Accessibility Guide**: After each audit, when fixing a11y issues
- **Content Guides**: When changing content strategy
- **Testing Docs**: When adding or modifying tests
- **History Files**: When completing significant changes
- **This Index**: When adding new documentation files

### Documentation Standards

1. **Use Markdown** for all documentation
2. **Include dates** at the top of each document
3. **Add code examples** where relevant
4. **Explain "why"** not just "what"
5. **Keep updated** - stale docs are worse than no docs
6. **Link to GitHub** - Reference source files

---

## 🎓 Learning Path

### For Complete Beginners

1. Read **[ARCHITECTURE_GUIDE.md](ARCHITECTURE_GUIDE.md)** - Learn architecture (Sections 1-3)
2. Review **[FAQ_CONTENT_GUIDE.md](FAQ_CONTENT_GUIDE.md)** - Make first content edit
3. Check **[ACCESSIBILITY_GUIDE.md](ACCESSIBILITY_GUIDE.md)** - Understand accessibility
4. Run `yarn dev` and explore the app

### For Experienced Developers

1. Read **[ARCHITECTURE_GUIDE.md](ARCHITECTURE_GUIDE.md)** - Deep dive (all sections)
2. Review **[ACCESSIBILITY_GUIDE.md](ACCESSIBILITY_GUIDE.md)** - Audit standards
3. Check relevant feature guides for your task
4. Start coding!

### For LLMs

1. **Always start with [ARCHITECTURE_GUIDE.md](ARCHITECTURE_GUIDE.md)**
2. Reference specific feature guides as needed
3. Check accessibility guide before making a11y changes
4. Follow patterns documented in architecture guide

---

## 📞 Quick Links

- **Main README**: [../README.md](../README.md)
- **Test Suite**: [../test/README.md](../test/README.md)
- **E2E Test Plan**: [../test/E2E_TEST_PLAN.md](../test/E2E_TEST_PLAN.md)
- **FAQ Content**: [../content/faqs.md](../content/faqs.md)
- **Links Content**: [../content/links.md](../content/links.md)
- **Nuxt Config**: [../nuxt.config.ts](../nuxt.config.ts)
- **Audit Script**: [../audit-accessibility.js](../audit-accessibility.js)

---

## ✅ Documentation Quality Checklist

When creating or updating documentation:

- [ ] Date added at top
- [ ] Purpose clearly stated
- [ ] Target audience identified
- [ ] Code examples included (if applicable)
- [ ] Screenshots/diagrams included (if helpful)
- [ ] Cross-references to related docs
- [ ] "Why" explained, not just "how"
- [ ] Updated in this index
- [ ] Verified all links work
- [ ] GitHub links added for code references

---

## 🗂️ File Organization

**Location**: `/markdown-documentation/`

**Naming Convention**:
- Use UPPER_SNAKE_CASE for file names
- Descriptive names (e.g., `ACCESSIBILITY_GUIDE.md`)
- Consolidated files end in `_GUIDE` or `_HISTORY`

**Categories**:
- Core: Essential reference documents
- Features: Specific feature documentation
- History: Chronological logs and updates

---

## 🔗 External Resources

- **GitHub Repository**: https://github.com/ICJIA/icjia-accessibility-portal
- **Live Site**: https://accessibility.icjia.app
- **Nuxt Docs**: https://nuxt.com/docs
- **Vuetify Docs**: https://vuetifyjs.com/
- **WCAG Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/

---

**This index is your map to understanding the ICJIA Accessibility Portal. Start with the Architecture Guide, then branch out to specific topics as needed.**

---

*Last Updated: January 1, 2026 | Consolidated from 24 to 12 files (includes test documentation)*
