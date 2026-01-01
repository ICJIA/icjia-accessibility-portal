/**
 * Font Optimization Plugin
 * 
 * This plugin optimizes font loading to improve FCP and LCP by:
 * 1. Adding font-display: swap to @font-face rules
 * 2. Preloading critical fonts
 * 3. Using font-display: swap to prevent invisible text during font load
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

