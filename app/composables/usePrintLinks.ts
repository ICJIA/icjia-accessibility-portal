/**
 * @fileoverview Composable to ensure all links and table headers have discernible text for print accessibility
 * @description Processes links and table headers in print pages to ensure they have visible text.
 * This is critical for WCAG 2.1 AA compliance, as screen readers need accessible text for all interactive elements.
 * 
 * Features:
 * - Ensures all links have visible text (uses URL if no text exists)
 * - Appends URLs to link text in parentheses for print accessibility
 * - Fixes empty table headers by providing meaningful defaults
 * - Adds proper ARIA labels for screen readers
 * 
 * @module usePrintLinks
 */

import { onMounted, nextTick } from 'vue';

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
  const text = element.textContent?.trim() || '';
  if (text.length > 0) return true;

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
                    th.setAttribute('aria-label', 'Item number');
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
          
          // Add aria-label for screen readers
          th.setAttribute('aria-label', defaultText);
        } else {
          // Header has text, but clean up any HTML comment artifacts
          if (innerHTML.includes('<!--')) {
            th.textContent = text;
          }
          
          // Ensure it has proper aria-label if needed
          if (!th.hasAttribute('aria-label') && !th.hasAttribute('aria-labelledby')) {
            th.setAttribute('aria-label', text);
          }
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
 * - Anchor links: Ensures they have descriptive text
 * - All links: Adds proper ARIA labels
 * 
 * For table headers:
 * - Empty headers: Provides meaningful defaults (e.g., "Column 1", "Item")
 * - Headers with only comments: Cleans and provides defaults
 * - All headers: Adds ARIA labels
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
   * - Adds ARIA labels for screen readers
   * 
   * @returns {void}
   * @private
   */
  const processPrintLinks = () => {
    // Target print content areas where links might appear
    const contentSelectors = [
      '.print-answer a',
      '.print-intro a',
      '.print-content a',
    ];

    contentSelectors.forEach((selector) => {
      const links = document.querySelectorAll<HTMLAnchorElement>(selector);
      links.forEach((link) => {
        const href = link.getAttribute('href');
        if (!href) return;

        // Skip anchor links (internal navigation)
        if (href.startsWith('#')) {
          // For anchor links, ensure they have text
          if (!hasVisibleText(link)) {
            // Use the anchor text or a default
            const anchorText = href.substring(1).replace(/-/g, ' ') || 'Section';
            link.textContent = anchorText;
            link.setAttribute('aria-label', `Link to ${anchorText}`);
          }
          return;
        }

        // Get the current text content (trimmed)
        const currentText = link.textContent?.trim() || '';

        // Check if link has no visible text
        if (!hasVisibleText(link)) {
          // If no visible text, use the URL as the link text
          link.textContent = href;
          // Add aria-label for screen readers
          link.setAttribute('aria-label', `Link to ${href}`);
        } else {
          // Link has text, but for print accessibility, append URL in parentheses
          // Check if URL is already appended to avoid duplicates
          const escapedHref = href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const urlPattern = new RegExp(`\\s*\\(${escapedHref}\\)$`);
          
          if (!urlPattern.test(currentText)) {
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

        // Ensure link has proper aria-label if it doesn't already
        if (!link.hasAttribute('aria-label') && !link.hasAttribute('aria-labelledby')) {
          const linkText = link.textContent?.trim() || href;
          link.setAttribute('aria-label', `Link: ${linkText}`);
        }
      });
    });
  };

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
    });
  });

  return {
    processPrintLinks,
    processTableHeaders,
  };
}

