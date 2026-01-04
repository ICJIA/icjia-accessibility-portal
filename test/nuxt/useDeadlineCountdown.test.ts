import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { useDeadlineCountdown } from '../../app/composables/useDeadlineCountdown'

// Suppress Vue lifecycle warnings in tests
const originalWarn = console.warn
beforeEach(() => {
  console.warn = (...args: any[]) => {
    const message = args[0]?.toString() || ''
    if (
      message.includes('onMounted is called when there is no active component instance') ||
      message.includes('onUnmounted is called when there is no active component instance') ||
      message.includes('Lifecycle injection APIs can only be used during execution of setup()')
    ) {
      return // Suppress these warnings
    }
    originalWarn.apply(console, args)
  }
})

afterEach(() => {
  console.warn = originalWarn
})

describe('useDeadlineCountdown', () => {
  let originalDateNow: typeof Date.now

  /**
   * All tests use Chicago timezone (America/Chicago) since the deadline
   * is for Illinois state agencies. April uses Central Daylight Time (CDT = UTC-5).
   * The deadline is April 24, 2026 at midnight Central Time.
   */
  const CHICAGO_TZ_OFFSET = '-05:00' // CDT in April

  beforeEach(() => {
    // Save original Date.now
    originalDateNow = Date.now
  })

  afterEach(() => {
    // Restore original Date.now
    Date.now = originalDateNow
    vi.useRealTimers()
  })

  it('should calculate days remaining correctly', () => {
    // Set date to 100 days before deadline (2026-04-24) in Chicago timezone
    const testDate = new Date(`2026-01-14T00:00:00${CHICAGO_TZ_OFFSET}`).getTime()
    Date.now = vi.fn(() => testDate)
    vi.useFakeTimers({ now: testDate })

    const { daysRemaining } = useDeadlineCountdown()
    
    // Should be approximately 100 days (allowing for some variance)
    expect(daysRemaining.value).toBeGreaterThan(95)
    expect(daysRemaining.value).toBeLessThan(105)
  })

  it('should return 0 days when deadline has passed', () => {
    // Set date to after deadline in Chicago timezone
    const testDate = new Date(`2026-05-01T00:00:00${CHICAGO_TZ_OFFSET}`).getTime()
    Date.now = vi.fn(() => testDate)
    vi.useFakeTimers({ now: testDate })

    const { daysRemaining, deadlinePassed } = useDeadlineCountdown()
    
    expect(daysRemaining.value).toBe(0)
    expect(deadlinePassed.value).toBe(true)
  })

  it('should format days remaining text correctly', () => {
    const testDate = new Date(`2026-01-14T00:00:00${CHICAGO_TZ_OFFSET}`).getTime()
    Date.now = vi.fn(() => testDate)
    vi.useFakeTimers({ now: testDate })

    const { daysRemainingText } = useDeadlineCountdown()
    
    expect(daysRemainingText.value).toMatch(/\d+ days/)
  })

  it('should format "1 day" correctly', () => {
    // Set date to 1 day before deadline in Chicago timezone
    const testDate = new Date(`2026-04-23T00:00:00${CHICAGO_TZ_OFFSET}`).getTime()
    Date.now = vi.fn(() => testDate)
    vi.useFakeTimers({ now: testDate })

    const { daysRemainingText } = useDeadlineCountdown()
    
    expect(daysRemainingText.value).toBe('1 day')
  })

  it('should format "less than 1 day" when less than 24 hours remain', () => {
    // Set date to 12 hours before deadline in Chicago timezone
    const testDate = new Date(`2026-04-23T12:00:00${CHICAGO_TZ_OFFSET}`).getTime()
    Date.now = vi.fn(() => testDate)
    vi.useFakeTimers({ now: testDate })

    const { daysRemainingText } = useDeadlineCountdown()
    
    expect(daysRemainingText.value).toBe('less than 1 day')
  })

  it('should show deadline passed message when deadline has passed', () => {
    const testDate = new Date(`2026-05-01T00:00:00${CHICAGO_TZ_OFFSET}`).getTime()
    Date.now = vi.fn(() => testDate)
    vi.useFakeTimers({ now: testDate })

    const { daysRemainingText } = useDeadlineCountdown()
    
    expect(daysRemainingText.value).toBe('the deadline has passed')
  })

  it('should provide urgency text for different time ranges', () => {
    // Test for 0 days (less than 24 hours remaining, but not passed) in Chicago timezone
    // When days === 0, urgencyText says "The deadline is today"
    const almostDeadline = new Date(`2026-04-23T23:00:00${CHICAGO_TZ_OFFSET}`).getTime()
    Date.now = vi.fn(() => almostDeadline)
    vi.useFakeTimers({ now: almostDeadline })

    const { urgencyText: urgencyAlmost, daysRemainingText } = useDeadlineCountdown()
    // daysRemainingText will be "less than 1 day" but urgencyText says "today" when days === 0
    expect(daysRemainingText.value).toContain('less than 1 day')
    expect(urgencyAlmost.value).toContain('today')
    expect(urgencyAlmost.value).toContain('Immediate action')

    // Test for 15 days (within 30 days) in Chicago timezone
    const fifteenDaysDate = new Date(`2026-04-09T00:00:00${CHICAGO_TZ_OFFSET}`).getTime()
    Date.now = vi.fn(() => fifteenDaysDate)
    vi.useFakeTimers({ now: fifteenDaysDate })

    const { urgencyText: urgency15 } = useDeadlineCountdown()
    expect(urgency15.value).toContain('Urgent action')

    // Test for 60 days (within 90 days) in Chicago timezone
    // Note: February is still CDT in 2026
    const sixtyDaysDate = new Date(`2026-02-23T00:00:00-06:00`).getTime() // CST in February
    Date.now = vi.fn(() => sixtyDaysDate)
    vi.useFakeTimers({ now: sixtyDaysDate })

    const { urgencyText: urgency60 } = useDeadlineCountdown()
    expect(urgency60.value).toContain('systematic work')
  })

  it('should update deadlinePassed correctly', () => {
    // Before deadline in Chicago timezone
    const beforeDeadline = new Date(`2026-01-01T00:00:00-06:00`).getTime() // CST in January
    Date.now = vi.fn(() => beforeDeadline)
    vi.useFakeTimers({ now: beforeDeadline })

    const { deadlinePassed: before } = useDeadlineCountdown()
    expect(before.value).toBe(false)

    // After deadline in Chicago timezone
    const afterDeadline = new Date(`2026-05-01T00:00:00${CHICAGO_TZ_OFFSET}`).getTime()
    Date.now = vi.fn(() => afterDeadline)
    vi.useFakeTimers({ now: afterDeadline })

    const { deadlinePassed: after } = useDeadlineCountdown()
    expect(after.value).toBe(true)
  })

  it('should use Chicago timezone (America/Chicago) for all calculations', () => {
    // This test verifies that the deadline is interpreted in Chicago timezone
    // The deadline is April 24, 2026 at midnight CDT (UTC-5)
    
    // At 11:59 PM on April 23 in Chicago, deadline has NOT passed
    const justBeforeDeadline = new Date('2026-04-23T23:59:00-05:00').getTime()
    Date.now = vi.fn(() => justBeforeDeadline)
    vi.useFakeTimers({ now: justBeforeDeadline })
    
    const { deadlinePassed: beforeMidnight } = useDeadlineCountdown()
    expect(beforeMidnight.value).toBe(false)
    
    // At 12:01 AM on April 24 in Chicago, deadline HAS passed
    const justAfterDeadline = new Date('2026-04-24T00:01:00-05:00').getTime()
    Date.now = vi.fn(() => justAfterDeadline)
    vi.useFakeTimers({ now: justAfterDeadline })
    
    const { deadlinePassed: afterMidnight } = useDeadlineCountdown()
    expect(afterMidnight.value).toBe(true)
  })
})

