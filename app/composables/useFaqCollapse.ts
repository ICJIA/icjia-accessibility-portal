/**
 * Composable to manage FAQ collapse state across components.
 * Used to collapse all FAQ panels when the logo is clicked.
 */
export const useFaqCollapse = () => {
  // Shared state that increments each time we want to trigger collapse
  const collapseSignal = useState<number>("faq-collapse-signal", () => 0);

  /**
   * Trigger all FAQ panels to collapse
   */
  const collapseAll = () => {
    collapseSignal.value++;
  };

  return {
    collapseSignal,
    collapseAll,
  };
};

