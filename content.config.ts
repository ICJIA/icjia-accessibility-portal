import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'

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

