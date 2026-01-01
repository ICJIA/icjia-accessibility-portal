/**
 * @fileoverview Composable to manage FAQ collapse state across components
 * @description Manages global state for FAQ accordion panels, allowing:
 * - Collapsing all FAQ panels when logo is clicked
 * - Ensuring only one accordion panel is open at a time across all sections
 * - Tracking which panel is currently open
 * 
 * Uses Nuxt's useState for SSR-safe state management that persists across components.
 * 
 * @module useFaqCollapse
 */

/**
 * Composable to manage FAQ collapse state across components.
 * 
 * This composable provides a centralized way to manage FAQ accordion state:
 * - Collapse all panels: Triggered when logo is clicked
 * - Single open panel: Ensures only one accordion panel is open at a time
 * - State tracking: Tracks which accordion and panel is currently open
 * 
 * @returns {Object} Object containing:
 * - `collapseSignal`: Reactive ref that increments when collapse is triggered
 * - `collapseAll`: Function to collapse all FAQ panels
 * - `openAccordion`: Reactive ref tracking the currently open accordion/panel
 * - `setOpenAccordion`: Function to set which accordion panel is open
 * - `isPanelOpen`: Function to check if a specific panel is open
 * - `getOpenPanelIndex`: Function to get the open panel index for an accordion
 * 
 * @example
 * ```vue
 * <script setup>
 * const { collapseAll, setOpenAccordion, isPanelOpen } = useFaqCollapse()
 * 
 * // Collapse all panels
 * collapseAll()
 * 
 * // Open a specific panel
 * setOpenAccordion('section-1', 2)
 * 
 * // Check if panel is open
 * if (isPanelOpen('section-1', 2)) {
 *   console.log('Panel is open')
 * }
 * </script>
 * ```
 */
export const useFaqCollapse = () => {
  /**
   * Shared state that increments each time we want to trigger collapse.
   * Components watch this value and collapse when it changes.
   * 
   * @type {Ref<number>}
   */
  const collapseSignal = useState<number>("faq-collapse-signal", () => 0);

  /**
   * Shared state to track which accordion and panel is currently open.
   * Format: { accordionId: string, panelIndex: number } | null
   * 
   * @type {Ref<{accordionId: string, panelIndex: number} | null>}
   */
  const openAccordion = useState<{ accordionId: string; panelIndex: number } | null>(
    "faq-open-accordion",
    () => null
  );

  /**
   * Triggers all FAQ panels to collapse across all accordions.
   * 
   * This increments the collapseSignal, which components watch to collapse their panels.
   * Also resets the openAccordion state to null.
   * 
   * @returns {void}
   * 
   * @example
   * ```ts
   * // Collapse all FAQ panels (e.g., when logo is clicked)
   * collapseAll()
   * ```
   */
  const collapseAll = () => {
    collapseSignal.value++;
    openAccordion.value = null;
  };

  /**
   * Sets the currently open accordion and panel.
   * 
   * This will automatically close any other open accordions since only one
   * panel can be open at a time. Pass undefined to close all panels.
   * 
   * @param {string} accordionId - The ID of the accordion component
   * @param {number | undefined} panelIndex - The index of the panel to open, or undefined to close all
   * @returns {void}
   * 
   * @example
   * ```ts
   * // Open panel 2 in accordion 'section-1'
   * setOpenAccordion('section-1', 2)
   * 
   * // Close all panels
   * setOpenAccordion('section-1', undefined)
   * ```
   */
  const setOpenAccordion = (accordionId: string, panelIndex: number | undefined) => {
    if (panelIndex === undefined) {
      openAccordion.value = null;
    } else {
      openAccordion.value = { accordionId, panelIndex };
    }
  };

  /**
   * Checks if a specific accordion panel is currently open.
   * 
   * @param {string} accordionId - The ID of the accordion component
   * @param {number} panelIndex - The index of the panel to check
   * @returns {boolean} True if the specified panel is open, false otherwise
   * 
   * @example
   * ```ts
   * if (isPanelOpen('section-1', 2)) {
   *   console.log('Panel 2 in section-1 is open')
   * }
   * ```
   */
  const isPanelOpen = (accordionId: string, panelIndex: number): boolean => {
    return (
      openAccordion.value?.accordionId === accordionId &&
      openAccordion.value?.panelIndex === panelIndex
    );
  };

  /**
   * Gets the currently open panel index for a specific accordion.
   * 
   * @param {string} accordionId - The ID of the accordion component
   * @returns {number | undefined} The index of the open panel, or undefined if no panel is open
   * 
   * @example
   * ```ts
   * const openIndex = getOpenPanelIndex('section-1')
   * if (openIndex !== undefined) {
   *   console.log(`Panel ${openIndex} is open`)
   * }
   * ```
   */
  const getOpenPanelIndex = (accordionId: string): number | undefined => {
    if (openAccordion.value?.accordionId === accordionId) {
      return openAccordion.value.panelIndex;
    }
    return undefined;
  };

  return {
    collapseSignal,
    collapseAll,
    openAccordion,
    setOpenAccordion,
    isPanelOpen,
    getOpenPanelIndex,
  };
};

