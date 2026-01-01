/**
 * @fileoverview Suppress Vuetify Server-Side Console Logs Plugin
 * @description Suppresses Vuetify instance object logs that appear in Nuxt's dev server console.
 * 
 * This plugin addresses the server-side logging issue where Nuxt's dev server attempts to
 * log the Vuetify instance object, which contains functions that can't be serialized,
 * resulting in the warning: "Failed to stringify dev server logs. Received DevalueError: Cannot stringify a function."
 * 
 * **Note**: This is a server-side plugin that intercepts console logs during Nuxt's
 * server-side rendering and development mode. It works in conjunction with the
 * client-side plugin to suppress Vuetify logs in both environments.
 * 
 * **Features:**
 * - Suppresses Vuetify instance object dumps in command line
 * - Suppresses "Failed to stringify dev server logs" warnings related to Vuetify
 * - Runs on server side in development, build, and generate modes
 * - Preserves all other console output
 * 
 * @module suppress-vuetify-logs-server
 * @author ICJIA
 * @version 1.0.0
 * @see {@link ./suppress-vuetify-logs.client.ts} Client-side plugin
 * @see {@link https://vuetifyjs.com/ Vuetify Documentation}
 */

/**
 * Checks if a value is a Vuetify instance or configuration object.
 * 
 * Detects the Vuetify instance object that Nuxt tries to log, which has properties
 * like install, unmount, theme, icons, locale, defaults, display, date, goTo.
 * 
 * **Detection Criteria:**
 * - Has `install` and `unmount` functions (key indicators of Vuetify instance)
 * - Has instance properties: theme, icons, locale, defaults, display, date, goTo
 * - Has function properties (common in Vuetify objects)
 * - Constructor name contains "vuetify"
 * 
 * **Exclusions:**
 * - Error objects (preserved for debugging)
 * - Strings (preserved for warnings/errors)
 * 
 * @param {any} value - The value to check for Vuetify instance/config characteristics
 * @returns {boolean} True if the value appears to be a Vuetify instance or config object
 * @private
 * 
 * @example
 * ```typescript
 * isVuetifyInstanceOrConfig({ install: () => {}, unmount: () => {}, theme: {} })
 * // Returns: true
 * 
 * isVuetifyInstanceOrConfig({ $el: {}, $props: {} })
 * // Returns: false (Vue component instance)
 * ```
 */
function isVuetifyInstanceOrConfig(value: any): boolean {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return false
  }

  // Exclude Error objects and strings (warnings/errors should be preserved)
  if (value instanceof Error || typeof value === 'string') {
    return false
  }

  const keys = Object.keys(value)

  // Check for Vuetify instance indicators (the main Vuetify object)
  // This is the object logged by Nuxt that has install, unmount, theme, icons, etc.
  const hasInstallAndUnmount = 
    typeof value.install === 'function' && 
    typeof value.unmount === 'function'

  // Vuetify instance/core properties
  const instanceIndicators = [
    'theme',
    'icons',
    'locale',
    'defaults',
    'display',
    'date',
    'goTo'
  ]

  // Check if it has Vuetify instance properties
  const hasInstanceProperties = instanceIndicators.some(indicator => 
    keys.includes(indicator)
  )

  // If it has install/unmount AND instance properties, it's the Vuetify instance
  if (hasInstallAndUnmount && hasInstanceProperties) {
    return true
  }

  // If it has instance properties AND functions, it's likely a Vuetify object
  const hasFunctions = Object.values(value).some(
    val => typeof val === 'function'
  )

  if (hasInstanceProperties && hasFunctions) {
    return true
  }

  // Check constructor name
  const constructorName = value.constructor?.name || ''
  const isVuetifyConstructor = constructorName.toLowerCase().includes('vuetify')

  // Fallback: check if it has Vuetify-related properties
  const hasVuetifyProperties = keys.some(key => 
    key.toLowerCase().includes('vuetify')
  )

  return (hasInstanceProperties || hasVuetifyProperties) && 
         (hasFunctions || isVuetifyConstructor)
}

/**
 * Checks if console arguments contain Vuetify instances or configuration objects.
 * 
 * Iterates through all console arguments and checks if any of them match the
 * Vuetify instance or configuration object pattern.
 * 
 * @param {any[]} args - Array of console log arguments to check
 * @returns {boolean} True if any argument is a Vuetify instance or config object
 * @private
 * 
 * @example
 * ```typescript
 * containsVuetifyInstanceOrConfig(['Some log', vuetifyInstance])
 * // Returns: true
 * 
 * containsVuetifyInstanceOrConfig(['Error message', new Error('test')])
 * // Returns: false
 * ```
 */
function containsVuetifyInstanceOrConfig(args: any[]): boolean {
  return args.some(arg => isVuetifyInstanceOrConfig(arg))
}

/**
 * Nuxt server-side plugin that suppresses Vuetify instance object logs.
 * 
 * This plugin intercepts console methods on the server side to filter out Vuetify objects
 * that are logged during Nuxt's dev server initialization, build, and generate processes.
 * It also suppresses the "Failed to stringify dev server logs" warning that occurs when
 * Nuxt tries to serialize Vuetify objects containing functions.
 * 
 * **Behavior:**
 * - Only runs on server side (Node.js)
 * - Runs in development, build, and generate modes (all non-production contexts)
 * - Intercepts console.log, console.info, console.debug, and console.warn
 * - **NEVER intercepts console.error** - all errors always pass through
 * - Filters out Vuetify instance/config objects
 * - Suppresses stringification warnings related to Vuetify
 * - Preserves all errors, warnings, hydration messages, and component errors
 * - Preserves all other console output
 * 
 * **Note**: This plugin runs during `yarn dev`, `yarn build`, and `yarn generate` to
 * suppress Vuetify object logs in all development/build contexts.
 * 
 * @returns {Object} Plugin object with restoreConsole method for cleanup
 * @returns {Object.provide.restoreConsole} Function to restore original console methods
 * 
 * @example
 * ```typescript
 * // The plugin automatically runs in non-production contexts
 * // To manually restore console methods (if needed):
 * const { $restoreConsole } = useNuxtApp()
 * $restoreConsole()
 * ```
 */
export default defineNuxtPlugin(() => {
  // Only run on server side
  if (!process.server) {
    return
  }

  // Suppress in development, build, and generate modes
  // During generate/build, import.meta.dev may be false, but we still want to suppress
  // Check if we're NOT in production (production shouldn't have these logs anyway)
  const isProduction = process.env.NODE_ENV === 'production' && (import.meta.env?.PROD === true || import.meta.env?.MODE === 'production')
  if (isProduction) {
    return
  }

  // Store original console methods
  // NOTE: console.error is NEVER intercepted - all errors always pass through
  const originalLog = console.log
  const originalInfo = console.info
  const originalDebug = console.debug
  const originalWarn = console.warn

  /**
   * Checks if a console message is an error, warning, or important debug message.
   * 
   * These should NEVER be filtered, even if they mention Vuetify.
   * 
   * @param {any[]} args - Console arguments
   * @returns {boolean} True if this is an error/warning that should be preserved
   * @private
   */
  const isErrorOrWarning = (args: any[]): boolean => {
    // If any argument is an Error object, always preserve
    if (args.some(arg => arg instanceof Error)) {
      return true
    }

    const firstArg = args[0]
    const message = firstArg?.toString() || ''
    
    // Check for error/warning keywords (case-insensitive)
    const errorKeywords = [
      'error',
      'warning',
      'hydration',
      'mismatch',
      'failed',
      'exception',
      'stack',
      'trace',
      'component',
      'render',
      'invalid',
      'missing',
      'required',
      'vuetify error', // Vuetify-specific errors
      'vuetify warning', // Vuetify-specific warnings
      'vuetify component', // Component-related messages
      'vuetify hydration' // Hydration errors from Vuetify
    ]
    
    const lowerMessage = message.toLowerCase()
    return errorKeywords.some(keyword => lowerMessage.includes(keyword))
  }

  /**
   * Wrapper function that filters out Vuetify instance/config object logs.
   * 
   * Also filters out the specific Nuxt warning about stringification failures
   * when they're related to Vuetify objects.
   * 
   * **IMPORTANT**: Never filters errors, warnings, or hydration messages.
   * 
   * @param {any[]} args - Console arguments
   * @returns {void}
   */
  const filteredLog = (...args: any[]) => {
    // NEVER filter errors, warnings, or important messages
    if (isErrorOrWarning(args)) {
      originalLog.apply(console, args)
      return
    }

    // Check if this is the Vuetify object log or the stringification warning
    const message = args[0]?.toString() || ''
    const isStringificationWarning = 
      message.includes('Failed to stringify dev server logs') ||
      message.includes('DevalueError') ||
      message.includes('Cannot stringify a function')

    // If it's the warning about Vuetify, suppress it
    if (isStringificationWarning && containsVuetifyInstanceOrConfig(args.slice(1))) {
      return
    }

    // If it contains Vuetify instance/config objects, suppress it
    if (containsVuetifyInstanceOrConfig(args)) {
      return
    }

    originalLog.apply(console, args)
  }

  /**
   * Wrapper function that filters out Vuetify instance/config object info logs.
   * 
   * **IMPORTANT**: Never filters errors, warnings, or hydration messages.
   * 
   * @param {any[]} args - Console arguments
   * @returns {void}
   */
  const filteredInfo = (...args: any[]) => {
    // NEVER filter errors, warnings, or important messages
    if (isErrorOrWarning(args)) {
      originalInfo.apply(console, args)
      return
    }

    if (!containsVuetifyInstanceOrConfig(args)) {
      originalInfo.apply(console, args)
    }
  }

  /**
   * Wrapper function that filters out Vuetify instance/config object debug logs.
   * 
   * **IMPORTANT**: Never filters errors, warnings, or hydration messages.
   * 
   * @param {any[]} args - Console arguments
   * @returns {void}
   */
  const filteredDebug = (...args: any[]) => {
    // NEVER filter errors, warnings, or important messages
    if (isErrorOrWarning(args)) {
      originalDebug.apply(console, args)
      return
    }

    if (!containsVuetifyInstanceOrConfig(args)) {
      originalDebug.apply(console, args)
    }
  }

  /**
   * Wrapper function that filters out stringification warnings related to Vuetify.
   * 
   * **IMPORTANT**: Only suppresses the specific harmless stringification warning.
   * All other warnings (including Vuetify component errors) are preserved.
   * 
   * @param {any[]} args - Console arguments
   * @returns {void}
   */
  const filteredWarn = (...args: any[]) => {
    const message = args[0]?.toString() || ''
    
    // NEVER filter actual errors or important warnings
    // Only suppress the specific harmless stringification warning
    const isStringificationWarning = 
      (message.includes('Failed to stringify dev server logs') ||
       message.includes('DevalueError') ||
       message.includes('Cannot stringify a function')) &&
      !isErrorOrWarning(args) // Double-check it's not a real error

    // Suppress only the harmless stringification warning
    if (isStringificationWarning) {
      return
    }

    // Preserve all other warnings (including Vuetify component errors)
    originalWarn.apply(console, args)
  }

  // Override console methods
  // NOTE: console.error is NOT overridden - all errors always pass through untouched
  console.log = filteredLog
  console.info = filteredInfo
  console.debug = filteredDebug
  console.warn = filteredWarn

  // Restore original methods on unmount
  return {
    provide: {
      restoreConsole: () => {
        console.log = originalLog
        console.info = originalInfo
        console.debug = originalDebug
        console.warn = originalWarn
      }
    }
  }
})

