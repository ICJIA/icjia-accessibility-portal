/**
 * @fileoverview Composable for calculating days remaining until compliance deadline
 * @description Provides reactive countdown calculations for the April 24, 2026 deadline
 */

import { computed, ref, onMounted, onUnmounted } from 'vue'

/** Target date for WCAG 2.1 AA compliance deadline (April 24, 2026) */
const DEADLINE_DATE = new Date('2026-04-24T00:00:00').getTime()

/**
 * Composable that provides deadline countdown information
 * @returns Object with days remaining, formatted text, and deadline status
 */
export function useDeadlineCountdown() {
  const now = ref(Date.now())

  /**
   * Calculate days remaining until deadline
   */
  const daysRemaining = computed(() => {
    const distance = DEADLINE_DATE - now.value
    if (distance <= 0) return 0
    return Math.floor(distance / (1000 * 60 * 60 * 24))
  })

  /**
   * Check if deadline has passed
   */
  const deadlinePassed = computed(() => {
    return DEADLINE_DATE <= now.value
  })

  /**
   * Get formatted text for days remaining or deadline status
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
   * Get urgency text based on days remaining
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
   * Update the current time (called periodically)
   */
  const updateTime = () => {
    now.value = Date.now()
  }

  let intervalId: ReturnType<typeof setInterval> | null = null

  onMounted(() => {
    updateTime()
    // Update every minute to keep days count accurate
    intervalId = setInterval(updateTime, 60000)
  })

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
