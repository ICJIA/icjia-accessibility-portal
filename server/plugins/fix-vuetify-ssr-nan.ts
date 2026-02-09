/**
 * @fileoverview Nitro render plugin to fix Vuetify SSR hydration mismatches
 * @description Vuetify's v-progress-linear (rendered inside every v-card) computes
 * `opacity:NaN` during SSR. The browser cannot parse NaN as a valid CSS value,
 * so `el.style.opacity` becomes empty, while Vue's client VDOM also has `opacity:NaN`.
 *
 * Since both SSR and client produce `opacity:NaN`, the raw attribute string matches
 * and there's no mismatch from that alone. This plugin is kept minimal to avoid
 * introducing mismatches by changing SSR output away from what Vue's VDOM expects.
 *
 * @see https://github.com/vuetifyjs/vuetify/issues
 */
export default defineNitroPlugin((nitroApp) => {
  // Intentionally minimal - do NOT modify styles that Vuetify's client VDOM
  // also produces (like transition:none, translateY(0%), --v-layout-top:0px)
  // as those would create mismatches between modified SSR and unmodified VDOM.
})
