/**
 * @fileoverview Suppress Vuetify Console Logs Plugin (Client-Side)
 * @description Suppresses Vuetify instance and configuration object logs that appear in development mode.
 * 
 * This plugin addresses a known issue with Vuetify + Nuxt 4 where Vuetify instance objects
 * are logged to the browser console because Vuetify exposes functions in its configuration
 * that can't be serialized by Nuxt's dev server logging system.
 * 
 * **Vuetify Best Practices Compliance:**
 * - Only suppresses instance/config object logs, not Vuetify component warnings or errors
 * - Preserves all legitimate console output for debugging
 * - Non-invasive: doesn't modify Vuetify's functionality or initialization
 * - Compatible with Vuetify MCP server and debugging tools
 * 
 * The plugin:
 * - Intercepts console.log, console.info, and console.debug calls
 * - **NEVER intercepts console.error or console.warn** - all errors/warnings always pass through
 * - Filters out Vuetify instance objects (with install, unmount, theme, icons, etc.)
 * - Filters out Vuetify configuration objects
 * - Only runs in development mode on the client side
 * - Preserves all errors, warnings, hydration messages, and component errors
 * - Preserves all other console functionality
 * 
 * @module suppress-vuetify-logs
 * @author ICJIA
 * @version 1.0.0
 * @see {@link ./suppress-vuetify-logs.server.ts} Server-side plugin
 * @see {@link https://vuetifyjs.com/ Vuetify Documentation}
 */

/**
 * Checks if a value is a Vuetify instance or configuration object.
 * 
 * This function detects:
 * 1. Vuetify instance objects (the main Vuetify object with install, unmount, theme, icons, etc.)
 * 2. Vuetify configuration objects (config passed to createVuetify)
 * 
 * **Detection Criteria:**
 * - Has `install` and `unmount` functions (key indicators of Vuetify instance)
 * - Has instance properties: theme, icons, locale, defaults, display, date, goTo
 * - Has config properties: preset, components, directives, vuetifyOptions, moduleOptions
 * - Has function properties (common in Vuetify objects)
 * - Constructor name contains "vuetify"
 * 
 * **Exclusions:**
 * - Vue component instances (have $el, $props, $attrs, $vnode)
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
 * 
 * isVuetifyInstanceOrConfig('Vuetify warning message')
 * // Returns: false (string, should be preserved)
 * ```
 */
function isVuetifyInstanceOrConfig(value: any): boolean {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return false
  }

  // Exclude Vue component instances - these should NOT be filtered
  // Vue components have $el, $props, $attrs, etc.
  if ('$el' in value || '$props' in value || '$attrs' in value || '$vnode' in value) {
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

  // Vuetify configuration object indicators (config passed to createVuetify)
  const configIndicators = [
    'preset',
    'components',
    'directives',
    'vuetifyOptions',
    'moduleOptions'
  ]

  const hasConfigProperties = configIndicators.some(indicator => 
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

  // If it has config properties AND functions, it's likely a config object
  if (hasConfigProperties && hasFunctions) {
    return true
  }

  // Fallback: check stringified content
  try {
    const stringified = JSON.stringify(value)
    if (stringified.includes('vuetify') || stringified.includes('Vuetify')) {
      return hasFunctions || isVuetifyConstructor || hasInstanceProperties
    }
  } catch (e) {
    // Stringification failed (likely due to functions) - this is common for Vuetify objects
    // If it has instance/config properties and functions, it's likely a Vuetify object
    return hasFunctions && (hasInstanceProperties || hasConfigProperties || isVuetifyConstructor)
  }

  return false
}

/**
 * Checks if console arguments contain Vuetify instances or configuration objects.
 * 
 * Iterates through all console arguments and checks if any of them match the
 * Vuetify instance or configuration object pattern. Only filters Vuetify instance/config
 * objects, not component instances or error messages, ensuring important debugging
 * information from Vuetify components is preserved.
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
 * // Returns: false (errors should be preserved)
 * ```
 */
function containsVuetifyInstanceOrConfig(args: any[]): boolean {
  return args.some(arg => isVuetifyInstanceOrConfig(arg))
}

/**
 * Nuxt client-side plugin that suppresses Vuetify instance and configuration object logs.
 * 
 * This plugin intercepts console methods in the browser to filter out Vuetify objects
 * that are logged during development. It works in conjunction with the server-side
 * plugin to provide complete suppression across both environments.
 * 
 * **Behavior:**
 * - Only runs on client side (browser)
 * - Only runs in development mode
 * - Intercepts console.log, console.info, and console.debug
 * - Filters out Vuetify instance/config objects
 * - Preserves all other console output
 * 
 * @returns {Object} Plugin object with restoreConsole method for cleanup
 * @returns {Object.provide.restoreConsole} Function to restore original console methods
 * 
 * @example
 * ```typescript
 * // The plugin automatically runs in development mode
 * // To manually restore console methods (if needed):
 * const { $restoreConsole } = useNuxtApp()
 * $restoreConsole()
 * ```
 */
export default defineNuxtPlugin(() => {
  // Only run on client side
  if (process.server) {
    return
  }

  // Only suppress in development
  if (!import.meta.dev) {
    return
  }

  // Store original console methods
  // NOTE: console.error and console.warn are NEVER intercepted - all errors/warnings always pass through
  const originalLog = console.log
  const originalInfo = console.info
  const originalDebug = console.debug

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
   * **IMPORTANT**: Never filters errors, warnings, or hydration messages.
   * Preserves all other logs including Vuetify component warnings and errors,
   * which are important for debugging.
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

    if (!containsVuetifyInstanceOrConfig(args)) {
      originalLog.apply(console, args)
    }
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

  // Override console methods
  // NOTE: console.error and console.warn are NOT overridden - all errors/warnings always pass through
  console.log = filteredLog
  console.info = filteredInfo
  console.debug = filteredDebug

  // Restore original methods on unmount (though this is unlikely to be called)
  return {
    provide: {
      restoreConsole: () => {
        console.log = originalLog
        console.info = originalInfo
        console.debug = originalDebug
      }
    }
  }
})

