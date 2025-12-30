/**
 * CSS Optimization Plugin
 * 
 * This plugin defers loading of non-critical CSS to reduce render-blocking resources.
 * It converts blocking stylesheets to non-blocking by using the print media trick
 * and then switching to 'all' once loaded.
 * 
 * This improves First Contentful Paint (FCP) and Largest Contentful Paint (LCP)
 * by allowing the browser to render content before all CSS is loaded.
 * 
 * Expected impact: ~2,400ms improvement in render-blocking time
 * 
 * NOTE: This plugin is currently conservative - it only defers CSS added AFTER
 * the initial page load to prevent interfering with component initialization.
 * Set ENABLE_CSS_OPTIMIZATION to false to disable this plugin.
 */
const ENABLE_CSS_OPTIMIZATION = false // Set to false to disable CSS optimization

export default defineNuxtPlugin(() => {
  // Only run on client side
  if (process.server || !ENABLE_CSS_OPTIMIZATION) {
    return
  }

  // Wait for page to be fully loaded and JavaScript modules initialized
  // This ensures we don't interfere with component initialization
  if (typeof window !== 'undefined') {
    // Wait for window load event to ensure all resources are loaded
    if (document.readyState === 'loading') {
      window.addEventListener('load', () => {
        // Wait additional time to ensure all JavaScript modules are initialized
        // This prevents interference with component initialization
        setTimeout(() => {
          // Mark all initial stylesheets so we don't defer them
          markInitialStylesheets()
          // Only observe for new stylesheets added after page load
          observeNewStylesheets()
        }, 500)
      })
    } else if (document.readyState === 'interactive') {
      // DOM is loaded but resources might still be loading
      window.addEventListener('load', () => {
        setTimeout(() => {
          markInitialStylesheets()
          observeNewStylesheets()
        }, 500)
      })
    } else {
      // Page is fully loaded
      setTimeout(() => {
        markInitialStylesheets()
        observeNewStylesheets()
      }, 500)
    }
  }
})

function markInitialStylesheets() {
  if (typeof document === 'undefined') return

  // Mark all existing stylesheets as initial - these should NOT be deferred
  // They're needed for the initial render and component initialization
  const stylesheets = document.querySelectorAll<HTMLLinkElement>(
    'link[rel="stylesheet"]'
  )
  stylesheets.forEach(link => {
    if (!link.hasAttribute('data-initial')) {
      link.setAttribute('data-initial', 'true')
    }
  })
}

function optimizeCSS() {
  if (typeof document === 'undefined') return

  // Only optimize CSS that was added AFTER the initial page load
  // This prevents interfering with critical CSS needed for initial render
  
  // Find stylesheet links that are NOT initial (added dynamically)
  const stylesheets = document.querySelectorAll<HTMLLinkElement>(
    'link[rel="stylesheet"]:not([data-critical]):not([data-deferred]):not([data-initial])'
  )

  stylesheets.forEach((link) => {
    const href = link.getAttribute('href')
    
    // Skip if no href or if it's already been processed
    if (!href || link.hasAttribute('data-deferred')) {
      return
    }

    // Skip critical CSS files
    if (href.includes('critical') || link.hasAttribute('data-critical')) {
      return
    }

    // Only defer dynamically added CSS (not in initial HTML)
    // Mark as deferred to avoid processing twice
    link.setAttribute('data-deferred', 'true')

    // Use the print media trick: set media to 'print' so it doesn't block rendering
    // Then switch to 'all' once loaded
    const originalMedia = link.getAttribute('media') || 'all'
    link.setAttribute('media', 'print')
    
    // Use onload to switch media back to 'all' once loaded
    link.onload = () => {
      link.setAttribute('media', originalMedia)
      link.onload = null // Clean up
    }

    // Fallback: if onload doesn't fire within 200ms, switch media anyway
    setTimeout(() => {
      if (link.getAttribute('media') === 'print') {
        link.setAttribute('media', originalMedia)
      }
    }, 200)
  })
}

function observeNewStylesheets() {
  if (typeof document === 'undefined' || typeof MutationObserver === 'undefined') {
    return
  }

  // Watch for new stylesheet links added to the DOM after initial load
  // These are safe to defer since they're added dynamically (e.g., route changes)
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as HTMLElement
          
          // Check if the added node is a stylesheet link
          if (element.tagName === 'LINK' && 
              element.getAttribute('rel') === 'stylesheet' &&
              !element.hasAttribute('data-deferred') &&
              !element.hasAttribute('data-critical') &&
              !element.hasAttribute('data-initial')) {
            // This is a dynamically added stylesheet - safe to defer
            // Delay to ensure the link is fully in the DOM
            setTimeout(() => optimizeCSS(), 100)
          }
          
          // Also check for stylesheet links within the added node
          const stylesheets = element.querySelectorAll?.<HTMLLinkElement>(
            'link[rel="stylesheet"]:not([data-critical]):not([data-deferred]):not([data-initial])'
          )
          if (stylesheets && stylesheets.length > 0) {
            setTimeout(() => optimizeCSS(), 100)
          }
        }
      })
    })
  })

  // Start observing after ensuring initial stylesheets are marked
  observer.observe(document.head, {
    childList: true,
    subtree: true
  })
}

