import { describe, it, expect, beforeEach } from 'vitest'
import { useFaqCollapse } from '../../app/composables/useFaqCollapse'

describe('useFaqCollapse', () => {
  beforeEach(() => {
    // Reset state before each test
    const { collapseAll } = useFaqCollapse()
    collapseAll()
  })

  it('should initialize with collapseSignal at 0', () => {
    const { collapseSignal } = useFaqCollapse()
    expect(collapseSignal.value).toBeGreaterThanOrEqual(0)
  })

  it('should initialize with openAccordion as null', () => {
    const { openAccordion } = useFaqCollapse()
    expect(openAccordion.value).toBeNull()
  })

  it('should increment collapseSignal when collapseAll is called', () => {
    const { collapseSignal, collapseAll } = useFaqCollapse()
    const initialValue = collapseSignal.value
    
    collapseAll()
    
    expect(collapseSignal.value).toBe(initialValue + 1)
  })

  it('should reset openAccordion when collapseAll is called', () => {
    const { openAccordion, collapseAll, setOpenAccordion } = useFaqCollapse()
    
    // Set an accordion as open
    setOpenAccordion('test-accordion', 0)
    expect(openAccordion.value).not.toBeNull()
    
    // Collapse all
    collapseAll()
    expect(openAccordion.value).toBeNull()
  })

  it('should set open accordion correctly', () => {
    const { openAccordion, setOpenAccordion } = useFaqCollapse()
    
    setOpenAccordion('accordion-1', 2)
    
    expect(openAccordion.value).toEqual({
      accordionId: 'accordion-1',
      panelIndex: 2
    })
  })

  it('should close accordion when setOpenAccordion is called with undefined', () => {
    const { openAccordion, setOpenAccordion } = useFaqCollapse()
    
    // Open an accordion
    setOpenAccordion('accordion-1', 2)
    expect(openAccordion.value).not.toBeNull()
    
    // Close it
    setOpenAccordion('accordion-1', undefined)
    expect(openAccordion.value).toBeNull()
  })

  it('should check if panel is open correctly', () => {
    const { isPanelOpen, setOpenAccordion } = useFaqCollapse()
    
    setOpenAccordion('accordion-1', 2)
    
    expect(isPanelOpen('accordion-1', 2)).toBe(true)
    expect(isPanelOpen('accordion-1', 1)).toBe(false)
    expect(isPanelOpen('accordion-2', 2)).toBe(false)
  })

  it('should get open panel index correctly', () => {
    const { getOpenPanelIndex, setOpenAccordion } = useFaqCollapse()
    
    setOpenAccordion('accordion-1', 3)
    
    expect(getOpenPanelIndex('accordion-1')).toBe(3)
    expect(getOpenPanelIndex('accordion-2')).toBeUndefined()
  })

  it('should return undefined when no panel is open', () => {
    const { getOpenPanelIndex } = useFaqCollapse()
    
    expect(getOpenPanelIndex('accordion-1')).toBeUndefined()
  })

  it('should handle multiple accordions correctly', () => {
    const { openAccordion, setOpenAccordion, isPanelOpen } = useFaqCollapse()
    
    // Open first accordion
    setOpenAccordion('accordion-1', 0)
    expect(openAccordion.value?.accordionId).toBe('accordion-1')
    expect(isPanelOpen('accordion-1', 0)).toBe(true)
    expect(isPanelOpen('accordion-2', 0)).toBe(false)
    
    // Open second accordion (should close first)
    setOpenAccordion('accordion-2', 1)
    expect(openAccordion.value?.accordionId).toBe('accordion-2')
    expect(isPanelOpen('accordion-1', 0)).toBe(false)
    expect(isPanelOpen('accordion-2', 1)).toBe(true)
  })
})

