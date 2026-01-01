/**
 * @fileoverview Font Optimization Plugin for Nuxt
 * @description Optimizes font loading to improve First Contentful Paint (FCP) and Largest Contentful Paint (LCP).
 * 
 * This plugin:
 * 1. Adds `font-display: swap` to all @font-face rules to prevent invisible text during font load
 * 2. Preloads critical fonts (Material Design Icons) for faster rendering
 * 3. Injects a global style to ensure dynamically loaded fonts use font-display: swap
 * 
 * Benefits:
 * - Prevents FOIT (Flash of Invisible Text)
 * - Improves perceived performance
 * - Better Core Web Vitals scores
 * 
 * @module optimize-fonts
 */

/**
 * Nuxt plugin that optimizes font loading on the client side.
 * 
 * Only runs on client side (browser). Waits for DOM to be ready before processing.
 * 
 * @returns {void}
 */
export default defineNuxtPlugin(() => {
  // Only run on client side
  if (process.server) {
    return
  }

  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', optimizeFonts)
  } else {
    optimizeFonts()
  }
})

/**
 * Optimizes fonts by adding font-display: swap and preloading critical fonts.
 * 
 * Process:
 * 1. Finds all @font-face rules in stylesheets
 * 2. Adds font-display: swap if not already present
 * 3. Injects global style for dynamically loaded fonts
 * 4. Preloads Material Design Icons font if present
 * 
 * @returns {void}
 * @private
 */
function optimizeFonts() {
  if (typeof document === 'undefined') return

  // Find all @font-face rules and ensure they have font-display: swap
  const styleSheets = Array.from(document.styleSheets)
  
  styleSheets.forEach((sheet) => {
    try {
      const rules = Array.from(sheet.cssRules || [])
      rules.forEach((rule) => {
        if (rule instanceof CSSFontFaceRule) {
          // Check if font-display is already set
          const style = rule.style
          if (!style.getPropertyValue('font-display')) {
            // Add font-display: swap to prevent invisible text
            style.setProperty('font-display', 'swap', 'important')
          }
        }
      })
    } catch (e) {
      // Cross-origin stylesheets may throw errors - ignore them
    }
  })

  // Also inject a style tag to ensure font-display: swap for dynamically loaded fonts
  const styleId = 'font-display-optimization'
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style')
    style.id = styleId
    style.textContent = `
      @font-face {
        font-display: swap;
      }
    `
    document.head.appendChild(style)
  }

  // Preload Material Design Icons font if it exists
  const iconFontLink = document.querySelector('link[href*="materialdesignicons"]')
  if (iconFontLink && !document.querySelector('link[rel="preload"][href*="materialdesignicons"]')) {
    const preloadLink = document.createElement('link')
    preloadLink.rel = 'preload'
    preloadLink.as = 'font'
    preloadLink.type = 'font/woff2'
    preloadLink.crossOrigin = 'anonymous'
    preloadLink.href = iconFontLink.getAttribute('href') || ''
    if (preloadLink.href) {
      document.head.insertBefore(preloadLink, iconFontLink)
    }
  }
}

