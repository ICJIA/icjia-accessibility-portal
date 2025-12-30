# Internal Links Fix - December 30, 2025

## Problem
Internal anchor links in the FAQ were not working because H2 section headings on the index page (`app/pages/index.vue`) were not getting ID attributes.

## Root Cause
The H2 headings were rendered without IDs:
```vue
<h2 v-if="section.heading" class="faq-section-heading">
  {{ section.heading }}
</h2>
```

## Solution
Added `:id` attribute to H2 headings using the existing `slugify` function:
```vue
<h2
  v-if="section.heading"
  :id="slugify(section.heading || '')"
  class="faq-section-heading"
>
  {{ section.heading }}
</h2>
```

## Files Changed
1. **app/pages/index.vue** - Added `:id="slugify(section.heading || '')"` to H2 headings (line ~105)
2. **content/faqs.md** - Updated internal links to use correct truncated slugs:
   - `#quick-reference-5-critical-actions-by-role` → `#quick-reference-5-critical-act` (truncated to 50 chars)

## H2 Section IDs (50-character limit)
All H2 headings now have these IDs:
- `quick-reference-5-critical-act` - "Quick Reference: 5 Critical Actions by Role"
- `general-accessibility-question` - "General Accessibility Questions"
- `getting-started` - "Getting Started"
- `state-agency-applicability` - "State Agency Applicability"
- `legal-requirements-iitaa-and-a` - "Legal Requirements (IITAA and ADA Title II)"
- `website-accessibility` - "Website Accessibility"
- `content-accessibility-document` - "Content Accessibility (Documents, PDFs, Presentations)"
- `social-media-accessibility` - "Social Media Accessibility"
- `procurement-and-third-party-to` - "Procurement and Third-Party Tools"
- `about-this-faq` - "About This FAQ"
- `getting-help` - "Getting Help"
- `glossary` - "Glossary"

## Testing
Verified that:
1. H2 headings now have IDs
2. Links to H2 sections work correctly
3. The "Quick Reference" link in "Why is this FAQ so long?" now works

## Note
The `slugify` function truncates IDs to 50 characters, so any internal links to H2 sections must use the truncated version.

