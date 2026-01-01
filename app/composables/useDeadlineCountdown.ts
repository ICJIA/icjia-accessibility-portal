/**
 * @fileoverview Composable for calculating days remaining until compliance deadline
 * @description Provides reactive countdown calculations for the April 24, 2026 deadline.
 * This deadline is set by ADA Title II requirements for Illinois state agencies.
 * 
 * Features:
 * - Reactive countdown that updates every minute
 * - Formatted text for display (e.g., "45 days", "1 day", "less than 1 day")
 * - Urgency messaging based on days remaining
 * - Automatic cleanup on component unmount
 * 
 * @module useDeadlineCountdown
 */

import { computed, ref, onMounted, onUnmounted } from 'vue'

/**
 * Target date for WCAG 2.1 AA compliance deadline (April 24, 2026).
 * This is the deadline set by ADA Title II for Illinois state agencies.
 * 
 * @constant {number}
 * @readonly
 */
const DEADLINE_DATE = new Date('2026-04-24T00:00:00').getTime()

/**
 * Composable that provides deadline countdown information.
 * 
 * Provides reactive values and computed properties for displaying the countdown
 * to the April 24, 2026 compliance deadline. Updates automatically every minute.
 * 
 * @returns {Object} Object containing:
 * - `daysRemaining`: Computed ref with number of days remaining
 * - `deadlinePassed`: Computed ref indicating if deadline has passed
 * - `daysRemainingText`: Computed ref with formatted text (e.g., "45 days", "1 day")
 * - `urgencyText`: Computed ref with urgency messaging based on days remaining
 * 
 * @example
 * ```vue
 * <script setup>
 * const { daysRemaining, daysRemainingText, urgencyText } = useDeadlineCountdown()
 * </script>
 * 
 * <template>
 *   <p>{{ daysRemainingText }} until the deadline</p>
 *   <p>{{ urgencyText }}</p>
 * </template>
 * ```
 */
export function useDeadlineCountdown() {
  /**
   * Current timestamp, updated every minute.
   * 
   * @type {Ref<number>}
   */
  const now = ref(Date.now())

  /**
   * Calculates the number of days remaining until the deadline.
   * Returns 0 if the deadline has passed.
   * 
   * @type {ComputedRef<number>}
   * @returns {number} Number of days remaining (0 if deadline passed)
   */
  const daysRemaining = computed(() => {
    const distance = DEADLINE_DATE - now.value
    if (distance <= 0) return 0
    return Math.floor(distance / (1000 * 60 * 60 * 24))
  })

  /**
   * Checks if the deadline has passed.
   * 
   * @type {ComputedRef<boolean>}
   * @returns {boolean} True if deadline has passed, false otherwise
   */
  const deadlinePassed = computed(() => {
    return DEADLINE_DATE <= now.value
  })

  /**
   * Gets formatted text for days remaining or deadline status.
   * 
   * Formats:
   * - "X days" for multiple days
   * - "1 day" for exactly one day
   * - "less than 1 day" for less than 24 hours
   * - "the deadline has passed" if deadline passed
   * 
   * @type {ComputedRef<string>}
   * @returns {string} Formatted text describing days remaining
   */
  const daysRemainingText = computed(() => {
    if (deadlinePassed.value) {
      return 'the deadline has passed'
    }
    const days = daysRemaining.value
    if (days === 0) {
      return 'less than 1 day'
    } else if (days === 1) {
      return '1 day'
    } else {
      return `${days} days`
    }
  })

  /**
   * Gets urgency text based on days remaining.
   * 
   * Provides different messaging based on urgency:
   * - 0 days: "The deadline is today. Immediate action is required."
   * - 1-30 days: "Only X days remain. Urgent action is required."
   * - 31-90 days: "Only X days remain, and achieving compliance requires systematic work..."
   * - 91-180 days: "X days remain, and achieving compliance requires systematic work..."
   * - 181+ days: Same as 91-180 days
   * - Passed: "The compliance deadline has passed. Immediate action is required..."
   * 
   * @type {ComputedRef<string>}
   * @returns {string} Urgency message based on days remaining
   */
  const urgencyText = computed(() => {
    if (deadlinePassed.value) {
      return 'The compliance deadline has passed. Immediate action is required to achieve compliance.'
    }
    const days = daysRemaining.value
    if (days === 0) {
      return 'The deadline is today. Immediate action is required.'
    } else if (days <= 30) {
      return `Only ${days} days remain. Urgent action is required.`
    } else if (days <= 90) {
      return `Only ${days} days remain, and achieving compliance requires systematic work across all digital content. Organizations need to prioritize this work immediately.`
    } else if (days <= 180) {
      return `${days} days remain, and achieving compliance requires systematic work across all digital content. Organizations are realizing that this work needs to start now.`
    } else {
      return `${days} days remain, and achieving compliance requires systematic work across all digital content. Organizations are realizing that this work needs to start now.`
    }
  })

  /**
   * Updates the current time to keep the countdown accurate.
   * Called periodically by setInterval.
   * 
   * @returns {void}
   * @private
   */
  const updateTime = () => {
    now.value = Date.now()
  }

  /**
   * Interval ID for the periodic time update.
   * Stored so it can be cleared on unmount.
   * 
   * @type {ReturnType<typeof setInterval> | null}
   * @private
   */
  let intervalId: ReturnType<typeof setInterval> | null = null

  /**
   * Sets up the countdown timer when component mounts.
   * Updates the time immediately and then every minute.
   */
  onMounted(() => {
    updateTime()
    // Update every minute to keep days count accurate
    intervalId = setInterval(updateTime, 60000)
  })

  /**
   * Cleans up the interval when component unmounts.
   * Prevents memory leaks.
   */
  onUnmounted(() => {
    if (intervalId) {
      clearInterval(intervalId)
    }
  })

  return {
    daysRemaining,
    deadlinePassed,
    daysRemainingText,
    urgencyText,
  }
}
