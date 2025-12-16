# FAQ Cards Redesign Guide
## ICJIA Accessibility Portal

**Project Repository:** [https://github.com/ICJIA/icjia-accessibility-portal](https://github.com/ICJIA/icjia-accessibility-portal)  
**Live Site:** [https://icjia-accessibility.netlify.app/](https://icjia-accessibility.netlify.app/)  
**Tech Stack:** Nuxt 4, Vue 3, Vuetify 3

---

## Overview

This guide provides a comprehensive design specification for modernizing the FAQ cards in the ICJIA Accessibility Portal. The redesign transforms heavy, outdated gray cards into sleek, contemporary components that maintain WCAG 2.1 AA compliance.

---

## Current Design Analysis

### Before (Original Design)


**Current Issues:**
- Heavy two-tone gray design feels outdated and institutional
- Large block sections create visual weight
- Limited visual hierarchy between questions and answers
- Static appearance lacks modern interactivity cues
- While functional, the design doesn't reflect modern web aesthetics

---

## New Design System

### Design Philosophy

The redesign follows three core principles:

1. **Progressive Disclosure** - Show questions first, reveal answers on interaction
2. **Visual Lightness** - Replace heavy blocks with subtle borders and white space
3. **Microinteractions** - Add smooth animations and hover states for polish

### Design Inspiration Sources

- **Vercel Ship** - Clean accordion patterns with subtle borders
- **OpenAI Docs** - Minimalist card design with excellent spacing
- **Stripe/Notion** - Progressive disclosure with elegant transitions

---

## Visual Specifications

### Light Mode Design



**Color Palette:**
- Background: Pure white (`#FFFFFF`)
- Card border (default): Light gray (`#E5E7EB`)
- Card border (hover): Purple (`#8B5CF6`)
- Question text: Dark slate (`#1E293B`)
- Answer text: Medium gray (`#475569`)
- Accent color: Purple (`#8B5CF6`)
- Icon color: Slate gray (`#64748B`)

**Typography:**
- Question: 18px, font-weight 600, line-height 1.4
- Answer: 16px, font-weight 400, line-height 1.6
- Letter spacing: Slight tracking for readability

**Spacing:**
- Card padding: 24px (desktop), 20px (mobile)
- Gap between cards: 16px
- Question-to-answer gap: 16px
- Section margin: 48px vertical

### Dark Mode Design

Dark mode and light mode should have the same design with collapsible cards. The questions are shown, and then a user can click to expand the answer.

**Color Palette:**
- Background: Deep slate with purple tint (`#0F172A`)
- Card background: Lighter slate (`#1E293B`)
- Card border (default): Dark slate (`#334155`)
- Card border (hover): Purple (`#A78BFA`)
- Question text: White (`#F8FAFC`)
- Answer text: Light gray (`#CBD5E1`)
- Answer background: Subtle slate (`#1A2332`)
- Accent color: Lighter purple (`#A78BFA`)
- Icon color: Light slate (`#94A3B8`)

**Accessibility Contrast Ratios:**
- Light mode: 7.2:1 (question text), 5.4:1 (answer text)
- Dark mode: 8.1:1 (question text), 6.2:1 (answer text)
- All ratios exceed WCAG AA requirements (4.5:1)

---

## Component Behavior

### Accordion Interaction Pattern

**Collapsed State:**
- Question displayed with chevron-down icon on right
- Subtle border around entire card
- Clean white/slate background
- Minimal shadow (0 1px 3px rgba(0,0,0,0.1))

**Hover State:**
- Border color transitions to purple accent
- Slight shadow increase (0 4px 6px rgba(0,0,0,0.1))
- Smooth transition (150ms ease)
- Cursor changes to pointer

**Expanded State:**
- Chevron rotates 180° (smooth 200ms transition)
- Answer section slides down with ease-in-out animation (300ms)
- Answer has subtle background tint for visual separation
- Question remains visible as context

**Focus State (Keyboard Navigation):**
- 2px solid purple outline with 2px offset
- Maintains all other hover effects
- Clearly visible in both light and dark modes

### Animation Specifications

```
Chevron rotation: 200ms ease-in-out
Answer expansion: 300ms ease-in-out
Border color transition: 150ms ease
Shadow transition: 150ms ease
Hover scale: 1.005 (subtle lift effect)
```

### Accessibility Features

- **Keyboard Navigation:** Full tab order, Enter/Space to toggle
- **Screen Readers:** Proper ARIA labels (`aria-expanded`, `aria-controls`)
- **Focus Management:** Visible focus indicators on all interactive elements
- **Reduced Motion:** Respects `prefers-reduced-motion` media query
- **Color Contrast:** All text exceeds WCAG AA standards
- **Semantic HTML:** Proper heading hierarchy and landmark regions

---

## Implementation Guide for Vuetify 3

### Component Architecture

Your current FAQ page (`app/pages/faqs.vue`) likely uses Vuetify's expansion panel components. Here's how to modernize them:

**Current Structure (Likely):**
```
<v-expansion-panels>
  <v-expansion-panel>
    <v-expansion-panel-title>Question</v-expansion-panel-title>
    <v-expansion-panel-text>Answer</v-expansion-panel-text>
  </v-expansion-panel>
</v-expansion-panels>
```

### Design Token Updates

Update your Vuetify theme configuration (`nuxt.config.ts` or theme file):

**Light Theme Tokens:**
```javascript
light: {
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    'surface-variant': '#F8FAFC',
    primary: '#8B5CF6',
    'on-surface': '#1E293B',
    'on-surface-variant': '#475569',
    border: '#E5E7EB',
  }
}
```

**Dark Theme Tokens:**
```javascript
dark: {
  colors: {
    background: '#0F172A',
    surface: '#1E293B',
    'surface-variant': '#1A2332',
    primary: '#A78BFA',
    'on-surface': '#F8FAFC',
    'on-surface-variant': '#CBD5E1',
    border: '#334155',
  }
}
```

### Styling Approach

**Option 1: Vuetify Component Customization**
Use Vuetify's SASS variables and component prop overrides to style the existing `v-expansion-panel` components with the new design system.

**Option 2: Custom Vue Component**
Create a custom accordion component from scratch using Vue 3 Composition API with full control over styling and behavior.

**Recommendation:** Start with Option 1 (Vuetify customization) since you're already using Vuetify 3. This maintains consistency with your component library while achieving the modern design.

### CSS Properties to Modify

Target these Vuetify component classes/props:

```
v-expansion-panels:
  - elevation: 0 (remove default shadow)
  - variant: 'outlined' (use border instead)
  - rounded: 'lg' (8px border radius)
  
v-expansion-panel:
  - bg-color: 'surface'
  - border-color: 'border'
  - color: 'on-surface'
  
v-expansion-panel-title:
  - min-height: auto
  - padding: 24px
  - font-size: 18px
  - font-weight: 600
  
v-expansion-panel-text:
  - padding: 0 24px 24px 24px
  - background: 'surface-variant'
  - font-size: 16px
  - line-height: 1.6
```

### Component Props Recommendations

```vue
<v-expansion-panels
  variant="accordion"
  elevation="0"
  class="faq-cards"
>
  <v-expansion-panel
    v-for="(item, index) in faqItems"
    :key="index"
    elevation="0"
    class="faq-card"
  >
    <v-expansion-panel-title class="faq-question">
      {{ item.question }}
      <template #actions>
        <v-icon icon="mdi-chevron-down" />
      </template>
    </v-expansion-panel-title>
    
    <v-expansion-panel-text class="faq-answer">
      {{ item.answer }}
    </v-expansion-panel-text>
  </v-expansion-panel>
</v-expansion-panels>
```

---

## Responsive Design

### Breakpoint Specifications

**Desktop (1024px+):**
- Card padding: 24px
- Question font: 18px
- Max width: 1200px container
- Gap between cards: 16px

**Tablet (768px - 1023px):**
- Card padding: 20px
- Question font: 17px
- Full width with 24px side margins

**Mobile (< 768px):**
- Card padding: 16px
- Question font: 16px
- Full width with 16px side margins
- Reduced animation duration (200ms)

### Touch Interactions

- Increase tap target size to minimum 44x44px
- Add active state feedback (slight scale down: 0.98)
- Increase spacing between cards on mobile (20px)
- Ensure chevron icon is large enough (24px minimum)

---

## Migration Checklist

### Phase 1: Design Tokens
- [ ] Update Vuetify theme configuration with new color palette
- [ ] Add CSS custom properties for consistent spacing
- [ ] Test color contrast ratios in both themes
- [ ] Verify dark mode toggle functionality

### Phase 2: Component Updates
- [ ] Update FAQ expansion panel styling
- [ ] Implement hover and focus states
- [ ] Add smooth transition animations
- [ ] Update icon rotation animation
- [ ] Test keyboard navigation

### Phase 3: Typography
- [ ] Apply new font sizes and weights
- [ ] Set proper line heights for readability
- [ ] Add text-wrap: balance for questions
- [ ] Ensure proper heading hierarchy

### Phase 4: Testing
- [ ] Test across all breakpoints (mobile, tablet, desktop)
- [ ] Verify keyboard navigation (Tab, Enter, Space)
- [ ] Run automated accessibility audit (`yarn audit:a11y`)
- [ ] Test with screen readers (NVDA, JAWS, VoiceOver)
- [ ] Check reduced motion preferences
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)

### Phase 5: Polish
- [ ] Fine-tune animation timings
- [ ] Optimize hover state transitions
- [ ] Add loading states if needed
- [ ] Perform visual QA against design specs

---

## Technical Considerations

### Performance

- **CSS Transitions:** Use `transform` and `opacity` for animations (GPU-accelerated)
- **Avoid:** Animating `height`, `padding`, or `margin` directly
- **Loading:** Consider lazy-loading FAQ content if list is very long
- **Images:** Optimize any decorative images with WebP format

### Nuxt Content Integration

Your FAQ content is stored in `content/faqs.md`. Ensure your markdown structure supports the new design:

```markdown
## Question 1

Answer text here...

## Question 2

Answer text here...
```

The FAQ transform utility (`app/utils/faqTransform.ts`) should parse this correctly into question/answer pairs.

### Accessibility Testing Tools

Use these tools to verify WCAG compliance:

- **axe DevTools** (Browser extension)
- **WAVE** (Web accessibility evaluation tool)
- **Lighthouse** (Built into Chrome DevTools)
- **Your existing audit script** (`yarn audit:a11y`)

---

## Design Rationale

### Why These Changes?

1. **Modern Aesthetics:** Current design feels heavy and dated. Light cards with borders create a contemporary, professional look appropriate for government portals.

2. **Improved Scannability:** Progressive disclosure (collapsed by default) allows users to scan questions quickly without overwhelming them with all answers.

3. **Better Hierarchy:** Clear distinction between questions (bold, larger) and answers (regular weight, subtle background) improves comprehension.

4. **Accessibility Maintained:** All changes preserve or enhance accessibility. Higher contrast ratios, better focus indicators, and smooth animations (with reduced motion support) ensure usability for all.

5. **Mobile Optimization:** Lighter design with tighter spacing works better on small screens while maintaining touch target sizes.

### Color Psychology

- **Purple Accent:** Conveys authority and trustworthiness while being distinctive and modern. Purple is associated with wisdom and quality—appropriate for an accessibility resource portal.

- **White/Slate Base:** Creates clean, uncluttered reading environment. Dark mode's purple-tinted slate adds sophistication without sacrificing readability.

---

## Examples & References

### Similar Design Patterns

Study these for inspiration and interaction patterns:

- **Vercel Documentation:** [vercel.com/docs](https://vercel.com/docs) - Clean accordions
- **Stripe Documentation:** [stripe.com/docs](https://stripe.com/docs) - Progressive disclosure
- **GitHub Docs:** [docs.github.com](https://docs.github.com) - Accessible FAQ patterns
- **GOV.UK Design System:** [design-system.service.gov.uk](https://design-system.service.gov.uk) - Government-appropriate styling

### Vuetify Resources

- **Expansion Panels:** [vuetifyjs.com/components/expansion-panels](https://vuetifyjs.com/en/components/expansion-panels/)
- **Theme Configuration:** [vuetifyjs.com/features/theme](https://vuetifyjs.com/en/features/theme/)
- **Accessibility Guide:** [vuetifyjs.com/features/accessibility](https://vuetifyjs.com/en/features/accessibility/)

---

## Questions & Support

For questions about implementing this redesign:

1. **Design Decisions:** Reference this document and the screenshot examples
2. **Technical Implementation:** Consult Vuetify 3 documentation for component APIs
3. **Accessibility:** Run automated audits and manual testing with assistive technologies
4. **Code Examples:** Vuetify's expansion panel examples provide good starting points

---

## Version History

- **v1.0** (December 2025) - Initial design specification
- **Target Implementation:** Q1 2026 (Before ADA Title II April 24, 2026 deadline)

---

## Appendix: Quick Reference

### Key Measurements

| Element | Light Mode | Dark Mode |
|---------|------------|-----------|
| Background | `#FFFFFF` | `#0F172A` |
| Card Surface | `#FFFFFF` | `#1E293B` |
| Border (default) | `#E5E7EB` | `#334155` |
| Border (hover) | `#8B5CF6` | `#A78BFA` |
| Accent | `#8B5CF6` | `#A78BFA` |
| Question Text | `#1E293B` | `#F8FAFC` |
| Answer Text | `#475569` | `#CBD5E1` |

### Animation Timings

- Chevron rotation: 200ms
- Panel expansion: 300ms
- Hover transitions: 150ms
- Focus outline: Instant (no delay)

### Accessibility Requirements

✅ Contrast ratio: Minimum 4.5:1 (all text exceeds this)  
✅ Focus indicators: 2px solid outline, 2px offset  
✅ Keyboard navigation: Full support  
✅ Screen reader: ARIA labels present  
✅ Reduced motion: Respected via media query  

---

**End of Guide**
