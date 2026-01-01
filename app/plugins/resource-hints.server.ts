/**
 * Resource Hints Plugin (Server-side)
 * 
 * This plugin adds resource hints (preload, preconnect) to the HTML head
 * to improve initial page load performance.
 */

export default defineNuxtPlugin({
  name: 'resource-hints',
  enforce: 'pre',
  hooks: {
    'app:rendered'(ctx) {
      // This hook runs after SSR rendering
      // We'll use a different approach - add hints via nuxt.config.ts head
    }
  }
})

// Note: Resource hints are better added via nuxt.config.ts app.head.link
// This plugin serves as a placeholder for future server-side optimizations

