/**
 * @fileoverview Nuxt Content configuration
 * @description Defines content collections for the application.
 * 
 * This configuration sets up:
 * - FAQs collection: Reads from content/faqs.md
 * - Links collection: Reads from content/links.md
 * 
 * Each collection has a schema that validates the frontmatter.
 * 
 * @module content.config
 */

import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'

/**
 * Nuxt Content configuration.
 * 
 * Defines two collections:
 * - `faqs`: FAQ content from faqs.md
 * - `links`: Links/resources content from links.md
 * 
 * Both collections use Zod schemas to validate frontmatter:
 * - `title`: Required string
 * - `description`: Optional string
 * 
 * @type {ContentConfig}
 */
export default defineContentConfig({
  collections: {
    links: defineCollection({
      type: 'page',
      source: 'links.md',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
      }),
    }),
    faqs: defineCollection({
      type: 'page',
      source: 'faqs.md',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
      }),
    }),
  },
})

