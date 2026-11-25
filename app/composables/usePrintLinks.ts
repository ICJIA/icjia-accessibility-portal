/**
 * @fileoverview Composable to ensure all links and table headers have discernible text for print accessibility
 * @description Processes links and table headers in print pages to ensure they have visible text.
 * This is critical for WCAG 2.1 AA compliance, as screen readers need accessible text for all interactive elements.
 * 
 * Features:
 * - Ensures all links have visible text (uses URL if no text exists)
 * - Appends URLs to link text in parentheses for print accessibility
 * - Fixes empty table headers by providing meaningful defaults
 * - Ensures all elements use text content as accessible names (no unnecessary ARIA)
 * 
 * @module usePrintLinks
 */

import { onMounted, onUnmounted, nextTick } from 'vue';

/**
 * Checks if an element has visible text content accessible to screen readers.
 * 
 * This function checks for:
 * - Direct text content
 * - Images with alt text
 * - SVGs with aria-label or aria-labelledby attributes
 * 
 * @param {HTMLElement} element - The HTML element to check for visible text
 * @returns {boolean} True if the element has discernible text content, false otherwise
 * 
 * @example
 * ```ts
 * const link = document.querySelector('a');
 * if (!hasVisibleText(link)) {
 *   link.textContent = link.href; // Use URL as fallback
 * }
 * ```
 */
function hasVisibleText(element: HTMLElement): boolean {
  // Get text content - this includes text from all child nodes
  const text = element.textContent?.trim() || '';
  if (text.length > 0) return true;

  // Check innerHTML for any non-whitespace content
  const innerHTML = element.innerHTML?.trim() || '';
  // Remove HTML comments and whitespace
  const cleanHTML = innerHTML.replace(/<!--[\s\S]*?-->/g, '').replace(/\s+/g, ' ').trim();
  if (cleanHTML.length > 0) {
    // Check if there's actual content (not just empty tags)
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = cleanHTML;
    if (tempDiv.textContent?.trim().length > 0) {
      return true;
    }
  }

  // Check for images with alt text
  const images = element.querySelectorAll('img');
  for (const img of images) {
    if (img.alt && img.alt.trim().length > 0) return true;
  }

  // Check for SVGs with aria-label or aria-labelledby
  const svgs = element.querySelectorAll('svg');
  for (const svg of svgs) {
    if (svg.getAttribute('aria-label') || svg.getAttribute('aria-labelledby')) {
      return true;
    }
  }

  // Check for aria-label or aria-labelledby on the element itself
  if (element.getAttribute('aria-label') || element.getAttribute('aria-labelledby')) {
    return true;
  }

  return false;
}

/**
 * Processes table headers to ensure they have discernible text for accessibility.
 * 
 * This function:
 * - Finds all tables in print content areas
 * - Checks each header cell for visible text
 * - Removes HTML comment artifacts that might make headers appear empty
 * - Provides meaningful defaults for empty headers (e.g., "Column 1", "Item")
 * - Adds ARIA labels for screen readers
 * 
 * Handles edge cases:
 * - Headers with only HTML comments (e.g., `<!--[--><!--]-->`)
 * - Completely empty headers
 * - First column headers that might be row numbers
 * 
 * @returns {void}
 * 
 * @example
 * ```ts
 * // Called automatically by usePrintLinks composable
 * processTableHeaders();
 * ```
 */
function processTableHeaders() {
  // Target print content areas
  const contentSelectors = [
    '.print-answer table',
    '.print-intro table',
    '.print-content table',
  ];

  contentSelectors.forEach((selector) => {
    const tables = document.querySelectorAll<HTMLTableElement>(selector);
    tables.forEach((table) => {
      const headers = table.querySelectorAll<HTMLTableCellElement>('th');
      headers.forEach((th, index) => {
        // Get text content, removing HTML comments and whitespace
        let text = th.textContent?.trim() || '';
        // Also check innerHTML for HTML comment artifacts
        const innerHTML = th.innerHTML.trim();
        
        // Remove HTML comment markers that might be left behind
        text = text.replace(/<!--\[?--\]?-->/g, '').trim();
        // Check if innerHTML only contains comments
        const onlyComments = /^(\s*<!--\[?--\]?-->)*\s*$/.test(innerHTML);

        // If header has no visible text or only contains comments, provide a default
        if (!text || text.length === 0 || onlyComments) {
          // Clear any HTML comments
          th.innerHTML = '';
          
          // Try to infer header from other headers in the same row
          const headerRow = th.closest('tr');
          if (headerRow) {
            const allHeaders = headerRow.querySelectorAll('th');
            // Check if other headers have text that might help us infer this one
            const otherHeaders = Array.from(allHeaders).filter((h, i) => i !== index);
            const hasOtherHeaders = otherHeaders.some(h => {
              const hText = h.textContent?.trim() || '';
              return hText.length > 0;
            });
            
            // If this is the first column and others have text, it might be a row number column
            if (index === 0 && hasOtherHeaders) {
              // Check first data row to see if first cell looks like a number
              const firstDataRow = table.querySelector('tbody tr:first-child, tbody tr');
              if (firstDataRow) {
                const firstCell = firstDataRow.querySelector('td:first-child');
                if (firstCell) {
                  const firstCellText = firstCell.textContent?.trim() || '';
                  // If first cell is a number, header might be "Item" or "Number"
                  if (/^\d+\.?\s*/.test(firstCellText)) {
                    th.textContent = 'Item';
                    // ARIA: Do not use aria-label on <th> - text content is the accessible name
                    return;
                  }
                }
              }
            }
          }
          
          // Default: use column number
          const columnNumber = index + 1;
          const defaultText = `Column ${columnNumber}`;
          th.textContent = defaultText;
          // ARIA: Do not use aria-label on <th> - text content is the accessible name
        } else {
          // Header has text, but clean up any HTML comment artifacts
          if (innerHTML.includes('<!--')) {
            th.textContent = text;
          }
          
          // ARIA: Remove any existing aria-label from <th> - text content is the accessible name
          th.removeAttribute('aria-label');
          th.removeAttribute('aria-labelledby');
        }
      });
    });
  });
}

/**
 * Composable that ensures all links and table headers have discernible text for print accessibility.
 * 
 * This composable is essential for WCAG 2.1 AA compliance on the printer-friendly page.
 * It processes all links and table headers after content is rendered to ensure they meet
 * accessibility requirements.
 * 
 * For links:
 * - Links with text: Appends URL in parentheses (e.g., "Link text (https://example.com)")
 * - Links without text: Uses the URL as the link text
 * - Anchor links: Converts to spans (non-interactive) to avoid ARIA issues
 * - All links: Uses visible text as accessible name (no unnecessary ARIA)
 * 
 * For table headers:
 * - Empty headers: Provides meaningful defaults (e.g., "Column 1", "Item")
 * - Headers with only comments: Cleans and provides defaults
 * - All headers: Uses text content as accessible name (no aria-label)
 * 
 * @returns {Object} Object containing:
 * - `processPrintLinks`: Function to manually process links
 * - `processTableHeaders`: Function to manually process table headers
 * 
 * @example
 * ```vue
 * <script setup>
 * import { usePrintLinks } from '@/composables/usePrintLinks'
 * 
 * // Automatically processes links and headers on mount
 * usePrintLinks()
 * </script>
 * ```
 * 
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html WCAG 2.1: Non-text Content}
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html WCAG 2.1: Name, Role, Value}
 */
export function usePrintLinks() {
  /**
   * Processes all links in print content areas to ensure they have discernible text.
   * 
   * This function:
   * - Finds all links in print content areas
 * - Ensures each link has visible text
 * - Appends URLs in parentheses for print accessibility
 * - Uses visible text as accessible name (no unnecessary ARIA)
   * 
   * @returns {void}
   * @private
   */
  const processPrintLinks = () => {
    // WCAG 2.4.4, 2.4.9, 4.1.2: All links must have text alternatives
    // Get ALL links in the entire document to ensure we don't miss any
    // This is more aggressive but necessary to catch all links including those
    // rendered by ContentRenderer or other dynamic content
    const allLinks = document.querySelectorAll<HTMLAnchorElement>('a');
    const linkSet = new Set<HTMLAnchorElement>();
    
    // Add all links found in the document
    allLinks.forEach((link) => {
      // Only process links that are within the print container or are print-related
      // This avoids processing links in navigation or other areas
      const isInPrintContainer = link.closest('.print-container') !== null;
      const hasPrintClass = link.classList.contains('print-url') || 
                           link.classList.contains('print-internal-link') ||
                           link.classList.contains('print-toc-link');
      
      if (isInPrintContainer || hasPrintClass) {
        linkSet.add(link);
      }
    });

    // Process all unique links
    linkSet.forEach((link) => {
        // Skip if link is already processed and has text (to avoid re-processing)
        // But we still want to check it in case it was cleared
        const href = link.getAttribute('href');
        if (!href) {
          // WCAG 2.4.4, 2.4.9, 4.1.2: Links without href should be removed or converted
          // If it's an anchor without href, it's likely a non-functional link
          // But still ensure it has text if it's visible
          if (link.offsetParent !== null || link.style.display !== 'none') {
            // Link is visible but has no href - ensure it has text
            if (!hasVisibleText(link)) {
              link.textContent = 'Link';
            }
          }
          return;
        }

        // Style internal links (anchor links starting with #) - make bold, remove underline
        // Internal links don't work when printed, so we convert them to spans to avoid ARIA issues
        if (href.startsWith('#')) {
          // Ensure they have text
          if (!hasVisibleText(link)) {
            const anchorText = href.substring(1).replace(/-/g, ' ') || 'Section';
            link.textContent = anchorText;
          }
          
          // Convert <a> to <span> since it's no longer interactive (no href)
          // This avoids ARIA issues with non-interactive links
          const span = document.createElement('span');
          // Preserve all classes from the original link
          span.className = link.className;
          // Ensure print-internal-link class is present
          if (!span.classList.contains('print-internal-link')) {
            span.classList.add('print-internal-link');
          }
          span.textContent = link.textContent;
          
          // Copy any data attributes
          Array.from(link.attributes).forEach(attr => {
            if (attr.name.startsWith('data-')) {
              span.setAttribute(attr.name, attr.value);
            }
          });
          
          // Replace the link with the span
          link.parentNode?.replaceChild(span, link);
          
          return;
        }

        // Get the current text content (trimmed)
        const currentText = link.textContent?.trim() || '';

        // WCAG 2.4.4, 2.4.9, 4.1.2: Links must have text alternatives
        // Check if link has no visible text
        if (!hasVisibleText(link)) {
          // If no visible text, use the URL as the link text
          // This ensures the link has an accessible name
          // Clean any existing content first (might be empty HTML tags or comments)
          link.innerHTML = '';
          link.textContent = href;
          // Ensure the link is visible (not hidden)
          link.style.visibility = 'visible';
          link.style.display = 'inline-block';
          link.style.opacity = '1';
          // Remove any hidden attributes
          link.removeAttribute('hidden');
          link.removeAttribute('aria-hidden');
          // ARIA: For links with no visible text initially, aria-label is not needed
          // since we're setting textContent which becomes the accessible name
        } else {
          // Link has text, but for print accessibility, append URL in parentheses
          // Check if URL is already appended to avoid duplicates
          const escapedHref = href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const urlPattern = new RegExp(`\\s*\\(${escapedHref}\\)$`);
          
          // An email link whose text is already the address needs nothing
          // appended: "name@example.gov (mailto:name@example.gov)" just repeats it.
          const addressAlreadyShown =
            /^mailto:/i.test(href) &&
            currentText.includes(href.replace(/^mailto:/i, ''));

          if (!urlPattern.test(currentText) && !addressAlreadyShown) {
            // Append URL in parentheses for print accessibility
            const urlText = ` (${href})`;
            // Preserve any existing HTML structure if possible, otherwise use textContent
            if (link.children.length === 0) {
              link.textContent = currentText + urlText;
            } else {
              // If there are child elements, append URL as text node
              const urlNode = document.createTextNode(urlText);
              link.appendChild(urlNode);
            }
          }
        }

        // ARIA: Remove any aria-label attributes - visible text should be the accessible name
        // Only use aria-label when absolutely necessary (e.g., icon-only buttons)
        // For text links, the visible text content is the accessible name
        link.removeAttribute('aria-label');
        link.removeAttribute('aria-labelledby');
        
        // Final safety check: WCAG 2.4.4, 2.4.9, 4.1.2 - ensure link has text
        // Double-check after all processing that the link has visible text
        // This is critical - every link MUST have text content
        const finalText = link.textContent?.trim() || '';
        const finalHTML = link.innerHTML?.trim() || '';
        const hasAnyContent = finalText.length > 0 || 
                             (finalHTML.length > 0 && finalHTML.replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]*>/g, '').trim().length > 0);
        
        if (!hasAnyContent && href) {
          // Last resort: use the URL as text if somehow the link is still empty
          // This ensures the link always has an accessible name
          link.textContent = href;
          link.style.visibility = 'visible';
          link.style.display = 'inline-block';
          link.style.opacity = '1';
        }
        
        // One more check: if link has href but no accessible text, force text
        // This is a critical final check - every link MUST have text
        const accessibleText = link.textContent?.trim() || 
                              link.getAttribute('aria-label') || 
                              link.getAttribute('aria-labelledby') ||
                              '';
        if (href && !accessibleText) {
          // Force text content - this is non-negotiable for accessibility
          link.textContent = href;
          link.style.visibility = 'visible';
          link.style.display = 'inline-block';
          link.style.opacity = '1';
          link.removeAttribute('hidden');
          link.removeAttribute('aria-hidden');
        }
        
        // Final verification: log if we still have an empty link (for debugging)
        const finalCheck = link.textContent?.trim() || link.getAttribute('aria-label') || '';
        if (href && !finalCheck && process.env.NODE_ENV === 'development') {
          console.warn('Link still missing text after processing:', href, link);
        }
        
        // Note: If a link has complex content (images/icons) that needs clarification,
        // aria-label could be used, but only if the visible text doesn't already
        // provide a clear accessible name. For print pages, links should have visible text.
      });
  };

  // Store observer reference for cleanup
  let observer: MutationObserver | null = null;
  
  onMounted(() => {
    // Process links and table headers after content is rendered
    nextTick(() => {
      processPrintLinks();
      processTableHeaders();
      
      // Also process after a short delay to catch dynamically rendered content
      setTimeout(() => {
        processPrintLinks();
        processTableHeaders();
      }, 100);
      
      // Process again after a longer delay for any async content
      setTimeout(() => {
        processPrintLinks();
        processTableHeaders();
      }, 500);
      
      // Process one more time after a longer delay to catch any late-rendering content
      setTimeout(() => {
        processPrintLinks();
        processTableHeaders();
      }, 1500);
      
      // Final aggressive pass after 3 seconds to catch any Vue/Nuxt async rendering
      setTimeout(() => {
        processPrintLinks();
        processTableHeaders();
      }, 3000);
    });
    
    // Also process on window load to catch any links rendered after Vue hydration
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        setTimeout(() => {
          processPrintLinks();
          processTableHeaders();
        }, 500);
      });
    }
    
    // Use MutationObserver to catch links added dynamically or content changes
    observer = new MutationObserver((mutations) => {
      let shouldProcess = false;
      mutations.forEach((mutation) => {
        // Check for added nodes
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            // Check if a link was added or if a link's content changed
            if (element.tagName === 'A' || element.querySelector('a')) {
              shouldProcess = true;
            }
          }
        });
        
        // Also check for attribute changes (like href being added)
        if (mutation.type === 'attributes' && 
            (mutation.target as Element).tagName === 'A') {
          shouldProcess = true;
        }
        
        // Check for character data changes (text content changes)
        if (mutation.type === 'characterData') {
          const parent = mutation.target.parentElement;
          if (parent && parent.tagName === 'A') {
            shouldProcess = true;
          }
        }
      });
      
      if (shouldProcess) {
        // Debounce processing to avoid excessive calls
        setTimeout(() => {
          processPrintLinks();
          processTableHeaders();
        }, 50);
      } else {
        // Even if no obvious changes, do a periodic check to catch any missed links
        // This ensures we catch links that might have been rendered in a way
        // that doesn't trigger the mutation observer
        const lastCheck = (window as any).__lastLinkCheck || 0;
        const now = Date.now();
        if (now - lastCheck > 2000) { // Check every 2 seconds max
          (window as any).__lastLinkCheck = now;
          setTimeout(() => {
            processPrintLinks();
            processTableHeaders();
          }, 100);
        }
      }
    });
    
    // Observe the print container for changes
    // Also observe the entire document body to catch any links that might be added
    const printContainer = document.querySelector('.print-container');
    if (printContainer) {
      observer.observe(printContainer, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
        attributeFilter: ['href', 'aria-label', 'aria-labelledby'],
      });
    }
    
    // Also observe the document body as a fallback to catch any links outside the container
    // This is more aggressive but ensures we don't miss any links
    if (document.body) {
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
        attributeFilter: ['href'],
      });
    }
  });
  
  // Cleanup observer on unmount
  onUnmounted(() => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  });

  return {
    processPrintLinks,
    processTableHeaders,
  };
}

