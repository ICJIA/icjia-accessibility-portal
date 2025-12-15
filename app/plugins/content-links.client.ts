export default defineNuxtPlugin(() => {
  // Function to add target="_blank" to all links in content areas
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

  // Process links when DOM is ready
  if (typeof window !== 'undefined') {
    // Process immediately
    setTimeout(processLinks, 100);

    // Process links after Vue updates (for dynamic content)
    const observer = new MutationObserver(() => {
      processLinks();
    });

    // Observe changes in content areas
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
