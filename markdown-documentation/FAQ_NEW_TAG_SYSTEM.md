# FAQ "New" Tag System

This document explains how to mark FAQ questions as "new" so they display a green "New" badge for 2 weeks.

## How It Works

When you add a new FAQ question, you can mark it as "new" by adding a special tag on its own line after the question heading. The system will automatically:

1. Display a green "New" badge next to the question
2. Remove the badge after 14 days (no manual cleanup required)
3. Hide the tag from the displayed content

## How to Add a "New" Tag

Add the following tag on its own line immediately after your `### Question heading`:

```markdown
### Your New Question Here?

{new:YYYY-MM-DD}

**Quick answer:** Your answer here...
```

Replace `YYYY-MM-DD` with the date you're adding the question (e.g., `2025-12-27`).

## Example

```markdown
### What if we can't meet the April 24, 2026 deadline?

{new:2025-12-27}

**Quick answer:** The deadline is a legal requirement, not a target...
```

## Important Notes

- **Date format must be `YYYY-MM-DD`** (e.g., `2025-12-27`)
- **Use curly braces format:** `{new:YYYY-MM-DD}` (this survives markdown parsing)
- **Place the tag on its own line** after the `###` heading (with a blank line before it)
- **The badge appears for 14 days** from the date specified
- **No cleanup needed** — the badge disappears automatically after 14 days
- **The tag is hidden** from users viewing the FAQ

## Technical Details

The system is implemented in:
- `app/utils/faqTransform.ts` — Contains `extractNewDate()` and `filterNewComments()` functions
- `app/components/FaqAccordion.vue` — Displays the "New" badge using Vuetify's `v-chip` component
- `app/pages/index.vue` — Processes FAQs and passes the `isNew` flag to the accordion

The `NEW_QUESTION_DAYS` constant in `faqTransform.ts` controls the duration (default: 14 days).

## Changing the Duration

To change how long the "New" badge appears, edit `app/utils/faqTransform.ts`:

```typescript
/**
 * Number of days a question is considered "new"
 */
const NEW_QUESTION_DAYS = 14  // Change this value
```

