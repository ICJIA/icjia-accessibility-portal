/**
 * Custom slugify composable for FAQ IDs with extended length support
 * Uses 150 character limit instead of 50 to prevent ID collisions
 */

/**
 * Convert text to URL-friendly slug
 * @param text - Text to slugify
 * @param maxLength - Maximum length (default: 150)
 * @returns Slugified string
 */
export function slugify(text: string, maxLength: number = 150): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, maxLength)
    .replace(/-+$/, '');
}

/**
 * Generate a complete question ID with section prefix
 * @param sectionHeading - Section heading text
 * @param questionText - Question text
 * @returns Complete ID for the question
 */
export function getQuestionId(sectionHeading: string, questionText: string): string {
  const sectionSlug = slugify(sectionHeading, 150);
  const questionSlug = slugify(questionText, 150);
  const combinedSlug = `${sectionSlug}-${questionSlug}`;
  return slugify(combinedSlug, 150);
}

export function useSlugify() {
  return {
    slugify,
    getQuestionId
  };
}

