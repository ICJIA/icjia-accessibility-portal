# FAQ Content Management Guide

**Last Updated**: January 1, 2026

---

## Table of Contents

1. ["New" Badge System](#new-badge-system)
2. [Content Quality Guidelines](#content-quality-guidelines)
3. [References & Sources](#references--sources)

---

## "New" Badge System

### Overview

The FAQ system includes an automatic "new" badge that highlights recently added questions. The badge:
- Displays for 10 days (configurable)
- Auto-expires without manual cleanup
- Works in both online and printer-friendly versions

### Usage

Add a "new" tag on its own line after the question heading:

```markdown
### Your Question Here?

{new:2026-01-15}

**Quick answer:** Your answer here...
```

### Syntax

**Format**: `{new:YYYY-MM-DD}`

**Requirements**:
- Must be on its own line
- Immediately after the H3 question heading
- Date in ISO format (YYYY-MM-DD)
- Curly braces (not HTML comments)

**Example**:
```markdown
### What is digital accessibility?

{new:2026-01-01}

**Quick answer:** Digital accessibility means...
```

### How It Works

1. **Detection**: Parser scans answer content for `{new:YYYY-MM-DD}` pattern
2. **Date Check**: Compares tag date to current date
3. **Display**: If within 10 days, shows badge; otherwise hidden
4. **Filtering**: Tag removed from displayed content
5. **Expiration**: Automatically stops showing after 10 days

### Configuration

**Duration**: Edit `NEW_QUESTION_DAYS` in `app/utils/faqTransform.ts`:

```typescript
const NEW_QUESTION_DAYS = 10; // Change this number
```

**Why Curly Braces?**
- Survives markdown parsing (HTML comments sometimes stripped)
- Easy to detect with regex
- Visual distinction in markdown source
- Reliable across different markdown processors

### Display

**Online Version** (`/faqs`):
- Green chip next to question
- "NEW" text in chip
- Accessible (doesn't rely only on color)

**Printer Version** (`/faqs-print`):
- Text badge: "[NEW]"
- Appears before question text
- Black and white (print-friendly)

### Implementation

**File**: [`app/utils/faqTransform.ts`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/app/utils/faqTransform.ts)

**Key Functions**:
- `extractNewDate()` - Detects and validates date
- `filterNewComments()` - Removes tag from display
- `isWithinNewWindow()` - Checks if still within 10 days

---

## Content Quality Guidelines

### Writing Style

**Tone**: Professional but approachable
- Use clear, plain language
- Avoid jargon where possible
- Define technical terms when first used
- Address reader directly ("you")

**Structure**:
- Start with "Quick answer" for immediate clarity
- Follow with detailed explanation
- Use bullet points for lists
- Include examples where helpful

**Best Practices**:
- Keep sentences short and clear
- One main idea per paragraph
- Use active voice
- Break up long blocks of text

### Question Format

**Good Questions**:
```markdown
### What is digital accessibility?
### How do I test for accessibility?
### Why does accessibility matter?
```

**Avoid**:
- Questions without question marks
- Vague or ambiguous questions
- Overly technical language in question

### Answer Format

**Recommended Structure**:
```markdown
### Question?

{new:2026-01-01}

**Quick answer:** One or two sentence summary.

**Full explanation:**

Detailed information here...

- Bullet points for clarity
- Examples when helpful
- Links to resources
```

### Content Organization

**Sections (H2 headings)**:
- Group related questions together
- Use clear, descriptive section names
- Maintain logical flow

**Questions (H3 headings)**:
- Keep questions specific and focused
- One topic per question
- Cross-reference related questions when needed

### Accuracy & Currency

**Ensure content is**:
- Factually accurate
- Up-to-date with current standards
- Properly sourced (see References section)
- Reviewed regularly

**When updating**:
- Update "Last Updated" date for significant changes
- Add "new" badge for new questions
- Review related questions for consistency

---

## References & Sources

### Purpose

Including references:
- Establishes credibility
- Allows readers to verify information
- Provides paths for deeper learning
- Documents where information comes from

### How to Add References

**Inline Citations**:
```markdown
According to the W3C Web Accessibility Initiative...

[Source: WAI](https://www.w3.org/WAI/)
```

**Reference Lists**:
```markdown
**References:**
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ADA Title II Guidance](https://www.ada.gov/)
```

### Key Sources

**Standards & Guidelines**:
- W3C WCAG 2.1: https://www.w3.org/WAI/WCAG21/quickref/
- ADA.gov: https://www.ada.gov/
- Section 508: https://www.section508.gov/

**Tools & Resources**:
- axe DevTools: https://www.deque.com/axe/
- WAVE: https://wave.webaim.org/
- WebAIM: https://webaim.org/

**Official Guidance**:
- Illinois.gov Accessibility: https://www.illinois.gov/accessibility.html
- DOJ ADA Title II: https://www.ada.gov/topics/title-ii/

### Source Quality

**Preferred Sources**:
- ✅ Official government guidance (ADA.gov, Section508.gov)
- ✅ W3C/WAI standards and documentation
- ✅ Established accessibility organizations (WebAIM, Deque)
- ✅ Peer-reviewed research
- ✅ Official tool documentation

**Use with Caution**:
- ⚠️ Blog posts (verify with official sources)
- ⚠️ General statistics (check original source)
- ⚠️ Outdated information (check publication date)

### Citation Format

**Consistent format for references**:
```markdown
**Source**: [Title](URL) - Organization Name
```

**Example**:
```markdown
**Source**: [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/WAI/WCAG21/quickref/) - W3C WAI
```

---

## Content Maintenance

### Regular Tasks

1. **Review accuracy** - Quarterly review of all content
2. **Update dates** - When making significant changes
3. **Check links** - Verify all external links still work
4. **Add new content** - Based on user questions/needs
5. **Remove outdated** - Archive or update old information

### Adding New FAQs

1. Determine appropriate section (H2)
2. Write clear, specific question (H3)
3. Add `{new:YYYY-MM-DD}` tag
4. Write quick answer + full explanation
5. Include references if applicable
6. Test in both online and print versions

### Updating Existing FAQs

1. Make changes in `content/faqs.md`
2. Update last-modified date if significant
3. Consider adding "new" badge if major revision
4. Review related questions for consistency
5. Test changes in browser

---

## File Structure

**Content File**: [`content/faqs.md`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/content/faqs.md)

**Structure**:
```markdown
---
title: Frequently Asked Questions
description: Common questions about accessibility
---

# FAQs

Introduction text...

---

## Section 1 (H2)

### Question 1 (H3)

{new:2026-01-01}

Answer...

### Question 2 (H3)

Answer...

## Section 2 (H2)

### Question 3 (H3)

Answer...
```

---

## Related Documentation

- [ARCHITECTURE_GUIDE.md](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/markdown-documentation/ARCHITECTURE_GUIDE.md) - Complete technical architecture (Section 4: Content Management)
- [PRINTER_FRIENDLY_GUIDE.md](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/markdown-documentation/PRINTER_FRIENDLY_GUIDE.md) - Printer-friendly FAQ feature

---

**Maintained By**: ICJIA Development Team  
**Last Updated**: January 1, 2026

