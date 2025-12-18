/**
 * @fileoverview Nuxt plugin to add target="_blank" to external links in content areas
 * @description Automatically adds target="_blank" and rel="noopener noreferrer" to external links
 * in FAQ and links content areas for security and UX. Also handles internal FAQ anchor links.
 */

/**
 * Finds a FAQ question element by anchor ID, searching across all sections
 * @param {string} anchorId - The anchor ID (without #)
 * @returns {HTMLElement | null} The matching FAQ panel element or null
 */
const findFaqQuestionById = (anchorId: string): HTMLElement | null => {
  // First try exact match
  let element = document.getElementById(anchorId);
  if (element && element.classList.contains('faq-panel')) {
    return element;
  }

  // If not found, search for FAQ panels with IDs that match or end with the anchor ID
  // This handles section-prefixed IDs like "content-accessibility-how-do-i-make-a-pdf-accessible"
  const allFaqPanels = document.querySelectorAll<HTMLElement>('.faq-panel[id]');
  for (const panel of allFaqPanels) {
    const id = panel.id;
    // Check if ID exactly matches or ends with the anchor (handles section prefixes)
    // e.g., "how-do-i-make-a-pdf-accessible" matches "content-accessibility-how-do-i-make-a-pdf-accessible"
    if (id === anchorId || id.endsWith(`-${anchorId}`)) {
      return panel;
    }
  }

  return null;
};

/**
 * Navigates to the homepage with the given hash.
 * Used as a fallback when the target FAQ panel isn't present on the current page.
 */
const navigateToHomeHash = (anchorId: string) => {
  // If we're already on the homepage, just update the hash
  if (window.location.pathname === "/") {
    const currentState = window.history.state;
    window.history.replaceState(currentState, "", `#${anchorId}`);
    // Wait a bit for the hash change to register, then try to find and scroll to the panel
    setTimeout(() => {
      const panel = findFaqQuestionById(anchorId);
      if (panel) {
        performScrollAndExpand(panel);
      }
    }, 100);
    return;
  }

  // Navigate to homepage with hash
  window.location.assign(`/#${anchorId}`);
};

/**
 * Scrolls to a FAQ question and opens it if it's in an accordion
 * @param {string} anchorId - The anchor ID (without #)
 * @returns {void}
 */
const scrollToFaqQuestion = (anchorId: string) => {
  const panel = findFaqQuestionById(anchorId);
  if (!panel) {
    // Try to find it after a delay in case it's not mounted yet
    setTimeout(() => {
      const retryPanel = findFaqQuestionById(anchorId);
      if (retryPanel) {
        performScrollAndExpand(retryPanel);
      } else {
        // If the panel isn't on this page, navigate to the homepage with hash.
        navigateToHomeHash(anchorId);
      }
    }, 250);
    return;
  }

  performScrollAndExpand(panel);
};

/**
 * Performs the actual scroll and expand operation
 * @param {HTMLElement} panel - The FAQ panel element
 * @returns {void}
 */
const performScrollAndExpand = (panel: HTMLElement) => {
  // Get the actual ID of the panel (might have section prefix)
  const actualId = panel.id;

  // Find the accordion panel title and click it to open
  const panelTitle = panel.querySelector('.faq-question') as HTMLElement;
  if (!panelTitle) {
    return;
  }

  // Check if panel is already open (Vuetify uses class, not aria-expanded on panel itself)
  const isExpanded = panel.classList.contains('v-expansion-panel--active');
  
  // If not open, click to open it
  if (!isExpanded) {
    panelTitle.click();
  }
  
  // Update URL hash with the actual panel ID (preserving history state for Vue Router)
  const currentState = window.history.state;
  window.history.replaceState(currentState, '', `#${actualId}`);
  
  // Wait a bit for the accordion to open (if it wasn't already), then scroll
  setTimeout(() => {
    const navbar = document.querySelector('header');
    const navbarHeight = navbar ? navbar.offsetHeight : 64;
    const elementPosition = panel.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - navbarHeight - 20;

    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior: 'smooth',
    });
  }, isExpanded ? 50 : 350); // Longer delay if opening panel
};

/**
 * Handles clicks on internal anchor links in FAQ content
 * @param {Event} event - The click event
 * @returns {void}
 */
const handleAnchorLinkClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  const link = target.closest('a') as HTMLAnchorElement;
  if (!link) return;

  const href = link.getAttribute('href');
  if (!href || !href.startsWith('#')) return;

  // Check if this is a FAQ anchor link (not just a regular page anchor)
  const anchorId = href.substring(1); // Remove the #
  if (!anchorId) return;

  // Check if we're in FAQ content area - be more permissive
  const isInFaqContent = link.closest('.faq-answer-content, .faq-content, [data-content], .faq-accordion');
  if (!isInFaqContent) return;

  // Only take over the click if we can actually handle it.
  // If we can't find the panel, don't block default behavior; our retry will navigate to /faqs.
  const panel = findFaqQuestionById(anchorId);
  if (panel) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    performScrollAndExpand(panel);
    return;
  }

  // Let the browser update the hash immediately, then handle via retry.
  scrollToFaqQuestion(anchorId);
};

/**
 * Processes all links in content areas and adds target="_blank" to external links
 * Also sets up click handlers for internal FAQ anchor links
 * @returns {void}
 */
const processLinks = () => {
  // Target content areas where markdown is rendered
  const contentSelectors = [
    '.faq-answer-content a',
    '.faq-content a',
    '.links-content a',
    '[data-content] a',
  ];

  contentSelectors.forEach((selector) => {
    const links = document.querySelectorAll<HTMLAnchorElement>(selector);
    links.forEach((link) => {
      const href = link.getAttribute('href');
      
      // Handle internal anchor links for FAQ questions
      if (href && href.startsWith('#')) {
        // Remove any existing click handler to avoid duplicates
        link.removeEventListener('click', handleAnchorLinkClick, true);
        link.removeEventListener('click', handleAnchorLinkClick, false);
        // Add click handler with capture: true to catch it before Vue Router
        link.addEventListener('click', handleAnchorLinkClick, { capture: true });
        return;
      }
      
      // Only add target="_blank" to external links if not already set
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
    /**
     * Handles initial page load with hash (for direct navigation to FAQ questions)
     * @returns {void}
     */
    const handleInitialHash = () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#')) {
        const anchorId = hash.substring(1);
        if (anchorId) {
          // Wait for FAQ components to be mounted
          setTimeout(() => {
            const panel = findFaqQuestionById(anchorId);
            if (panel) {
              performScrollAndExpand(panel);
            }
          }, 500); // Wait for components to mount
        }
      }
    };

    // Global click handler as fallback to catch FAQ anchor links
    // This runs in capture phase to catch clicks before Vue Router
    const globalClickHandler = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest('a') as HTMLAnchorElement;
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      const anchorId = href.substring(1);
      if (!anchorId) return;

      // Check if we're in FAQ content area
      const isInFaqContent = link.closest('.faq-answer-content, .faq-content, [data-content], .faq-accordion');
      if (!isInFaqContent) return;

      // Only handle if this looks like a FAQ question ID (not a regular anchor)
      // FAQ question IDs typically contain hyphens and are lowercase
      if (anchorId.includes('-')) {
        const panel = findFaqQuestionById(anchorId);
        if (panel) {
          event.preventDefault();
          event.stopPropagation();
          event.stopImmediatePropagation();
          performScrollAndExpand(panel);
          return;
        }

        // Don't block default hash update; fallback will navigate if needed.
        scrollToFaqQuestion(anchorId);
      }
    };

    // Add global click handler with capture
    document.addEventListener('click', globalClickHandler, { capture: true });

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
      const contentAreas = document.querySelectorAll('.faq-answer-content, .faq-content, .links-content, [data-content]');
      contentAreas.forEach((area) => {
        observer.observe(area, {
          childList: true,
          subtree: true,
        });
      });
    };

    // Start observing when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        observeContent();
        handleInitialHash();
      });
    } else {
      observeContent();
      handleInitialHash();
    }
  }
});
