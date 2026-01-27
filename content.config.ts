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
 * Defines three collections:
 * - `faqs`: FAQ content from faqs.md
 * - `links`: Links/resources content from links.md
 * - `skills`: Claude skill modules from skills/*.md
 *
 * All collections use Zod schemas to validate frontmatter.
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
        lastUpdated: z.string().optional(),
        disclaimer: z.array(z.object({
          label: z.string(),
          text: z.string(),
        })).optional(),
      }),
    }),
    skills: defineCollection({
      type: 'page',
      source: 'skills/*.md',
      schema: z.object({
        id: z.string(),
        title: z.string(),
        description: z.string().optional(),
        difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
        duration: z.number().optional(),
        tags: z.array(z.string()).optional(),
        objectives: z.array(z.string()).optional(),
        lastUpdated: z.string().optional(),
        icon: z.string().optional(),
      }),
    }),
  },
})

