/**
 * @fileoverview Vue Router options configuration
 * @description Configures scroll behavior to handle FAQ anchor links properly
 */

import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
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









