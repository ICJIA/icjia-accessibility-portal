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

    // If there's a hash, let our plugin handle FAQ questions
    // For FAQ hashes, return undefined to prevent Vue Router from trying to scroll
    // Our plugin will handle opening accordions and scrolling
    if (to.hash) {
      const hashId = to.hash.substring(1);
      
      // Wait a bit for components to mount, then check if it's a FAQ question
      return new Promise((resolve) => {
        setTimeout(() => {
          // Check if this is a FAQ panel (with or without section prefix)
          const element = document.getElementById(hashId);
          const isFaqPanel = element && element.classList.contains('faq-panel');
          
          if (!isFaqPanel) {
            // Check if any FAQ panel has an ID ending with this hash
            const allPanels = document.querySelectorAll<HTMLElement>('.faq-panel[id]');
            for (const panel of allPanels) {
              const panelId = panel.id;
              if (panelId === hashId || panelId.endsWith(`-${hashId}`)) {
                // It's a FAQ question - let our plugin handle it
                resolve(undefined);
                return;
              }
            }
          } else {
            // It's a FAQ question - let our plugin handle it
            resolve(undefined);
            return;
          }
          
          // Not a FAQ question, try normal scroll behavior
          resolve({
            el: to.hash,
            behavior: 'smooth',
          });
        }, 200); // Wait for components to mount
      });
    }

    // No hash, scroll to top
    return { top: 0, behavior: 'smooth' }
  }
}

