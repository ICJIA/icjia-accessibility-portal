/**
 * @fileoverview Custom slugify composable for FAQ IDs with extended length support
 * @description Provides URL-friendly slug generation for FAQ question IDs.
 * Uses 150 character limit instead of default 50 to prevent ID collisions
 * for long question texts while maintaining URL safety.
 * 
 * @module useSlugify
 */

/**
 * Converts text to a URL-friendly slug.
 * 
 * Process:
 * 1. Converts to lowercase
 * 2. Replaces non-alphanumeric characters with hyphens
 * 3. Removes leading/trailing hyphens
 * 4. Truncates to maxLength
 * 5. Removes trailing hyphens after truncation
 * 
 * @param {string} text - The text to convert to a slug
 * @param {number} [maxLength=150] - Maximum length of the slug (default: 150)
 * @returns {string} URL-friendly slug string
 * 
 * @example
 * ```ts
 * slugify("What is WCAG 2.1?") // "what-is-wcag-21"
 * slugify("How do I make a PDF accessible?", 50) // "how-do-i-make-a-pdf-accessible"
 * ```
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
 * Generates a complete question ID with section prefix.
 * 
 * Creates a unique ID by combining the section heading and question text.
 * This ensures FAQ questions have unique IDs even if question text is similar
 * across different sections.
 * 
 * Format: `{section-slug}-{question-slug}`
 * 
 * @param {string} sectionHeading - The section heading text (e.g., "Getting Started")
 * @param {string} questionText - The question text (e.g., "What is accessibility?")
 * @returns {string} Complete slugified ID for the question
 * 
 * @example
 * ```ts
 * getQuestionId("Getting Started", "What is accessibility?")
 * // Returns: "getting-started-what-is-accessibility"
 * 
 * getQuestionId("Content Accessibility", "What is accessibility?")
 * // Returns: "content-accessibility-what-is-accessibility"
 * ```
 */
export function getQuestionId(sectionHeading: string, questionText: string): string {
  const sectionSlug = slugify(sectionHeading, 150);
  const questionSlug = slugify(questionText, 150);
  const combinedSlug = `${sectionSlug}-${questionSlug}`;
  return slugify(combinedSlug, 150);
}

/**
 * Composable that provides slug generation utilities.
 * 
 * Exposes the slugify and getQuestionId functions for use in components.
 * 
 * @returns {Object} Object containing:
 * - `slugify`: Function to convert text to URL-friendly slug
 * - `getQuestionId`: Function to generate complete question ID with section prefix
 * 
 * @example
 * ```vue
 * <script setup>
 * const { slugify, getQuestionId } = useSlugify()
 * 
 * const id = getQuestionId("Section Name", "Question Text")
 * </script>
 * ```
 */
export function useSlugify() {
  return {
    slugify,
    getQuestionId
  };
}

