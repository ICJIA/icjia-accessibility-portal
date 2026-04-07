/**
 * @fileoverview Suppress Vuetify Console Logs Plugin (Client-Side)
 * @description Suppresses Vuetify instance and configuration object logs in development mode.
 * All helper functions are defined inside the plugin so they are tree-shaken in production.
 * @module suppress-vuetify-logs
 */

export default defineNuxtPlugin(() => {
  if (process.server) return
  if (!import.meta.dev) return

  // --- All helpers are inside the plugin so they tree-shake in production ---

  function isVuetifyInstanceOrConfig(value: any): boolean {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return false
    if ('$el' in value || '$props' in value || '$attrs' in value || '$vnode' in value) return false
    if (value instanceof Error || typeof value === 'string') return false

    const keys = Object.keys(value)

    const hasInstallAndUnmount =
      typeof value.install === 'function' &&
      typeof value.unmount === 'function'

    const instanceIndicators = ['theme', 'icons', 'locale', 'defaults', 'display', 'date', 'goTo']
    const hasInstanceProperties = instanceIndicators.some(i => keys.includes(i))

    const configIndicators = ['preset', 'components', 'directives', 'vuetifyOptions', 'moduleOptions']
    const hasConfigProperties = configIndicators.some(i => keys.includes(i))

    if (hasInstallAndUnmount && hasInstanceProperties) return true

    const hasFunctions = Object.values(value).some(val => typeof val === 'function')

    if (hasInstanceProperties && hasFunctions) return true
    if (hasConfigProperties && hasFunctions) return true

    const constructorName = value.constructor?.name || ''
    const isVuetifyConstructor = constructorName.toLowerCase().includes('vuetify')

    try {
      const stringified = JSON.stringify(value)
      if (stringified.includes('vuetify') || stringified.includes('Vuetify')) {
        return hasFunctions || isVuetifyConstructor || hasInstanceProperties
      }
    } catch {
      return hasFunctions && (hasInstanceProperties || hasConfigProperties || isVuetifyConstructor)
    }

    return false
  }

  function containsVuetifyInstanceOrConfig(args: any[]): boolean {
    return args.some(arg => isVuetifyInstanceOrConfig(arg))
  }

  const isErrorOrWarning = (args: any[]): boolean => {
    if (args.some(arg => arg instanceof Error)) return true
    const message = args[0]?.toString() || ''
    const keywords = [
      'error', 'warning', 'hydration', 'mismatch', 'failed', 'exception',
      'stack', 'trace', 'component', 'render', 'invalid', 'missing', 'required',
      'vuetify error', 'vuetify warning', 'vuetify component', 'vuetify hydration'
    ]
    const lower = message.toLowerCase()
    return keywords.some(k => lower.includes(k))
  }

  // Store originals (console.error and console.warn are NEVER intercepted)
  const originalLog = console.log
  const originalInfo = console.info
  const originalDebug = console.debug

  const makeFilter = (original: (...args: any[]) => void) => (...args: any[]) => {
    if (isErrorOrWarning(args) || !containsVuetifyInstanceOrConfig(args)) {
      original.apply(console, args)
    }
  }

  console.log = makeFilter(originalLog)
  console.info = makeFilter(originalInfo)
  console.debug = makeFilter(originalDebug)

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
