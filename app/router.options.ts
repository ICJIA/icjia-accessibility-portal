/**
 * @fileoverview Vue Router options configuration
 * @description Configures scroll behavior to handle FAQ anchor links properly.
 * 
 * This configuration ensures that:
 * - FAQ anchor links scroll smoothly to the correct position
 * - Navbar height is accounted for when scrolling
 * - Browser back/forward button positions are preserved
 * - Components have time to mount before scrolling
 * 
 * @module router.options
 */

import type { RouterConfig } from '@nuxt/schema'

/**
 * Router configuration with custom scroll behavior.
 * 
 * Handles three scenarios:
 * 1. Saved position (browser back/forward): Restores saved position
 * 2. Hash navigation (FAQ anchor links): Scrolls to element with navbar offset
 * 3. Regular navigation: Scrolls to top smoothly
 * 
 * @type {RouterConfig}
 */
export default <RouterConfig>{
  /**
   * Custom scroll behavior function for Vue Router.
   * 
   * @param {RouteLocationNormalized} to - The target route
   * @param {RouteLocationNormalized} from - The source route
   * @param {ScrollPosition | null} savedPosition - Saved scroll position from browser history
   * @returns {ScrollPosition | Promise<ScrollPosition>} Scroll position or promise that resolves to scroll position
   */
  scrollBehavior(to, from, savedPosition) {
    // If there's a saved position (e.g., browser back button), use it
    if (savedPosition) {
      return savedPosition
    }

    // If there's a hash, scroll to the element
    if (to.hash) {
      // Wait for components to mount, then scroll
      return new Promise((resolve) => {
        const scrollToElement = () => {
          const element = document.querySelector(to.hash);
          if (element) {
            // Element exists, scroll to it
            const navbar = document.querySelector('header');
            const navbarHeight = navbar ? navbar.offsetHeight : 64;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - navbarHeight - 20;
            
            window.scrollTo({
              top: Math.max(0, offsetPosition),
              behavior: 'smooth',
            });
            resolve(undefined); // Return undefined to prevent Vue Router from trying to scroll again
          } else {
            // Element not found yet, try again after a short delay
            setTimeout(scrollToElement, 100);
          }
        };
        
        // Start trying to scroll after a brief delay
        setTimeout(scrollToElement, 100);
      });
    }

    // No hash, scroll to top
    return { top: 0, behavior: 'smooth' }
  }
}









