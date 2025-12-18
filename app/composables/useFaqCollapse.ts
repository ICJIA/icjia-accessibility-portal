/**
 * Composable to manage FAQ collapse state across components.
 * Used to collapse all FAQ panels when the logo is clicked,
 * and to ensure only one accordion panel is open at a time across all sections.
 */
export const useFaqCollapse = () => {
  // Shared state that increments each time we want to trigger collapse
  const collapseSignal = useState<number>("faq-collapse-signal", () => 0);

  // Shared state to track which accordion and panel is currently open
  // Format: { accordionId: string, panelIndex: number } | null
  const openAccordion = useState<{ accordionId: string; panelIndex: number } | null>(
    "faq-open-accordion",
    () => null
  );

  /**
   * Trigger all FAQ panels to collapse
   */
  const collapseAll = () => {
    collapseSignal.value++;
    openAccordion.value = null;
  };

  /**
   * Set the currently open accordion and panel
   * This will automatically close any other open accordions
   */
  const setOpenAccordion = (accordionId: string, panelIndex: number | undefined) => {
    if (panelIndex === undefined) {
      openAccordion.value = null;
    } else {
      openAccordion.value = { accordionId, panelIndex };
    }
  };

  /**
   * Check if a specific accordion panel is open
   */
  const isPanelOpen = (accordionId: string, panelIndex: number): boolean => {
    return (
      openAccordion.value?.accordionId === accordionId &&
      openAccordion.value?.panelIndex === panelIndex
    );
  };

  /**
   * Get the currently open panel index for a specific accordion
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

