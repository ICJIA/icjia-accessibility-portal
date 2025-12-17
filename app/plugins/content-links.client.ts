/**
 * @fileoverview Nuxt plugin to add target="_blank" to external links in content areas
 * @description Automatically adds target="_blank" and rel="noopener noreferrer" to external links
 * in FAQ and links content areas for security and UX
 */

/**
 * Processes all links in content areas and adds target="_blank" to external links
 * @returns {void}
 */
const processLinks = () => {
  // Target content areas where markdown is rendered
  const contentSelectors = [
    '.faq-content a',
    '.links-content a',
    '[data-content] a',
  ];

  contentSelectors.forEach((selector) => {
    const links = document.querySelectorAll<HTMLAnchorElement>(selector);
    links.forEach((link) => {
      // Skip internal anchor links (like #main-content)
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        return;
      }
      
      // Only add target="_blank" if not already set
      if (!link.hasAttribute('target')) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });
  });
};

/**
 * Nuxt plugin definition
 * @returns {import('nuxt/app').NuxtAppPlugin} Plugin configuration
 */
export default defineNuxtPlugin(() => {
  // Process links when DOM is ready
  if (typeof window !== 'undefined') {
    // Process immediately
    setTimeout(processLinks, 100);

    // Process links after Vue updates (for dynamic content)
    const observer = new MutationObserver(() => {
      processLinks();
    });

    /**
     * Observes content areas for changes and processes links
     * @returns {void}
     */
    const observeContent = () => {
      const contentAreas = document.querySelectorAll('.faq-content, .links-content, [data-content]');
      contentAreas.forEach((area) => {
        observer.observe(area, {
          childList: true,
          subtree: true,
        });
      });
    };

    // Start observing when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', observeContent);
    } else {
      observeContent();
    }
  }
});
