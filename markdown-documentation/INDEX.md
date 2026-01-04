# Documentation Index

**Last Updated**: January 4, 2026  
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

### For Creating Documentation Portals (Universal Prompt)

**[DOCUMENTATION_PORTAL_PROMPT.md](DOCUMENTATION_PORTAL_PROMPT.md)** 🆕⭐⭐  
**Step-by-step LLM-ready prompt | Works with any Vue/Nuxt/Vuetify project**

Prompt for creating a `/docs/` portal with:

- Accessibility testing reports (axe-core)
- Unit/E2E test reports (Vitest)
- API documentation (JSDoc/TypeDoc)
- Architecture documentation
- All code snippets with GitHub links
- Build automation and configuration

**Show this guide to an LLM to create a documentation portal from scratch.**

### Prompts vs Guides (Important)

- **Prompts**: Written as explicit instructions for LLMs to **build or modify** something.
- **Guides**: Written as documentation of **what already exists** (and why).

This repo includes both. Use prompts when you want an LLM to implement a feature or generate a full docs system.

---

## 📋 Documentation by Category

### Core (4 files)

| Document                                                                                       | Purpose                                       | When to Read                        |
| ---------------------------------------------------------------------------------------------- | --------------------------------------------- | ----------------------------------- |
| **[ARCHITECTURE_GUIDE.md](ARCHITECTURE_GUIDE.md)** ⭐                                          | Complete technical architecture               | First time working on project       |
| **[DOCUMENTATION_PORTAL_PROMPT.md](DOCUMENTATION_PORTAL_PROMPT.md)** 🆕                      | LLM-ready documentation portal prompt         | Creating docs for other projects    |
| **[INDEX.md](INDEX.md)**                                                                       | Documentation index (this file)               | Finding specific documentation      |
| **[PROJECT_REVIEW.md](PROJECT_REVIEW.md)**                                                     | Project review with improvement suggestions   | Understanding project goals         |

### Prompts (3 files)

| Prompt | Purpose | When to Use |
| ------ | ------- | ----------- |
| **[DOCUMENTATION_PORTAL_PROMPT.md](DOCUMENTATION_PORTAL_PROMPT.md)** ⭐ | Copy/paste prompt to build `/public/docs/*` portal | Creating a docs portal in any repo |
| **[ACCESSIBILITY_AUDIT_PROMPT.md](ACCESSIBILITY_AUDIT_PROMPT.md)** 🆕 | Prompt to add axe-core audits + `/docs/accessibility/` outputs | Adding automated accessibility reporting |
| **[TESTING_REPORTS_PROMPT.md](TESTING_REPORTS_PROMPT.md)** 🆕 | Prompt to add Vitest runner + `/docs/tests/` report | Adding unit/nuxt/e2e reporting |
| **[ARCHITECTURE_DOCS_PROMPT.md](ARCHITECTURE_DOCS_PROMPT.md)** 🆕 | Prompt to generate `/docs/architecture/` from markdown | Adding architecture docs generation |

### Features & Guides (6 files)

| Document                                                                       | Purpose                                                | When to Read                          |
| ------------------------------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------- |
| **[PRINTER_FRIENDLY_GUIDE.md](PRINTER_FRIENDLY_GUIDE.md)**                     | Complete printer-friendly FAQ guide                    | Working on print functionality        |
| **[ACCESSIBILITY_GUIDE.md](ACCESSIBILITY_GUIDE.md)**                           | All accessibility documentation                        | Working on accessibility features     |
| **[ACCESSIBILITY_AUDIT_SCRIPT_GUIDE.md](ACCESSIBILITY_AUDIT_SCRIPT_GUIDE.md)** | Complete accessibility audit script guide (1355 lines) | Using or customizing the audit script |
| **[FAQ_CONTENT_GUIDE.md](FAQ_CONTENT_GUIDE.md)**                               | FAQ management and "new" badge system                  | Adding/managing FAQ content           |
| **[SEO_GUIDE.md](SEO_GUIDE.md)**                                               | Complete SEO guide with external action recommendations | Improving search rankings             |
| **[CONFIGURATION_ABSTRACTION.md](CONFIGURATION_ABSTRACTION.md)**               | Configuration management patterns                      | Setting up environments               |

### Testing (1 file)

| Document                                                         | Purpose                                                                                 | When to Read                                   |
| ---------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ---------------------------------------------- |
| **[TESTING_METHODOLOGY_GUIDE.md](TESTING_METHODOLOGY_GUIDE.md)** | Reusable testing methodology for Nuxt + Vuetify (unit → component → E2E → a11y → smoke) | Adding features or validating behavior changes |
| **[../test/E2E_TEST_PLAN.md](../test/E2E_TEST_PLAN.md)**         | E2E test implementation plan                                                            | Planning or implementing E2E tests             |

### History & Updates (3 files)

| Document                                                             | Purpose                            | When to Read                  |
| -------------------------------------------------------------------- | ---------------------------------- | ----------------------------- |
| **[CONTENT_MAINTENANCE_HISTORY.md](CONTENT_MAINTENANCE_HISTORY.md)** | Chronological log of content fixes | Tracking content changes      |
| **[FEATURE_UPDATES.md](FEATURE_UPDATES.md)**                         | Log of feature additions           | Understanding recent features |
| **[DOCUMENTATION_HISTORY.md](DOCUMENTATION_HISTORY.md)**             | Documentation update log           | Understanding doc evolution   |

---

## 🎯 Quick Reference by Task

### I want to...

#### Understand the entire application

👉 **[ARCHITECTURE_GUIDE.md](ARCHITECTURE_GUIDE.md)** - Start here! (1300+ lines with code links)

#### Create a documentation portal for my project

👉 **[DOCUMENTATION_PORTAL_PROMPT.md](DOCUMENTATION_PORTAL_PROMPT.md)** - LLM-ready step-by-step prompt  
   Works with any Vue/Nuxt/Vuetify project. Show to an LLM to create a full `/docs/` portal.

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

#### Work with search functionality

👉 **[ARCHITECTURE_GUIDE.md](ARCHITECTURE_GUIDE.md)** - Section 11: Search Functionality  
👉 Edit `search.config.json` for Fuse.js configuration  
👉 Edit `app/pages/search.vue` for search UI

#### Build a similar app

👉 **[ARCHITECTURE_GUIDE.md](ARCHITECTURE_GUIDE.md)** - Section 10: Replicating This Application  
👉 **[PROJECT_REVIEW.md](PROJECT_REVIEW.md)** - Lessons learned

---

## 📊 Documentation Statistics

| Metric                  | Count           |
| ----------------------- | --------------- |
| **Total Documents**     | 18              |
| **Core Docs**           | 3               |
| **Feature/Guide Docs**  | 8               |
| **Testing Docs**        | 1 (this folder) |
| **History/Update Docs** | 3               |
| **Plans/Analysis Docs** | 4               |

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

_Last Updated: January 4, 2026 | Consolidated from 24 to 12 files (includes test documentation)_
