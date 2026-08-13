/**
 * @fileoverview Centralized MDI icon imports for tree-shaking
 * @description Imports only the MDI icons actually used in the application,
 * reducing bundle size compared to loading the full @mdi/font CSS (~50KB saved).
 * Icons are prefixed with 'svg:' for Vuetify's mdi-svg icon set.
 * @module icons
 */

import {
  mdiCalendarCheck as _mdiCalendarCheck,
  mdiCheckCircle as _mdiCheckCircle,
  mdiChevronDown as _mdiChevronDown,
  mdiChevronRight as _mdiChevronRight,
  mdiCopyright as _mdiCopyright,
  mdiCreation as _mdiCreation,
  mdiDownload as _mdiDownload,
  mdiFileCheckOutline as _mdiFileCheckOutline,
  mdiFileDocumentOutline as _mdiFileDocumentOutline,
  mdiFileQuestionOutline as _mdiFileQuestionOutline,
  mdiFileSearchOutline as _mdiFileSearchOutline,
  mdiFileWord as _mdiFileWord,
  mdiFrequentlyAskedQuestions as _mdiFrequentlyAskedQuestions,
  mdiGithub as _mdiGithub,
  mdiHelpCircleOutline as _mdiHelpCircleOutline,
  mdiHome as _mdiHome,
  mdiInformation as _mdiInformation,
  mdiLanguageMarkdown as _mdiLanguageMarkdown,
  mdiLightbulbOutline as _mdiLightbulbOutline,
  mdiLink as _mdiLink,
  mdiLinkVariant as _mdiLinkVariant,
  mdiMagnify as _mdiMagnify,
  mdiMenu as _mdiMenu,
  mdiOpenInNew as _mdiOpenInNew,
  mdiPrinter as _mdiPrinter,
  mdiRobot as _mdiRobot,
  mdiTextSearch as _mdiTextSearch,
  mdiUpdate as _mdiUpdate,
} from '@mdi/js'

/** Prefix raw SVG paths with 'svg:' for Vuetify's mdi-svg icon set */
const svg = (path: string) => `svg:${path}`

export const mdiCalendarCheck = svg(_mdiCalendarCheck)
export const mdiCheckCircle = svg(_mdiCheckCircle)
export const mdiChevronDown = svg(_mdiChevronDown)
export const mdiChevronRight = svg(_mdiChevronRight)
export const mdiCopyright = svg(_mdiCopyright)
export const mdiCreation = svg(_mdiCreation)
export const mdiDownload = svg(_mdiDownload)
export const mdiFileCheckOutline = svg(_mdiFileCheckOutline)
export const mdiFileDocumentOutline = svg(_mdiFileDocumentOutline)
export const mdiFileQuestionOutline = svg(_mdiFileQuestionOutline)
export const mdiFileSearchOutline = svg(_mdiFileSearchOutline)
export const mdiFileWord = svg(_mdiFileWord)
export const mdiFrequentlyAskedQuestions = svg(_mdiFrequentlyAskedQuestions)
export const mdiGithub = svg(_mdiGithub)
export const mdiHelpCircleOutline = svg(_mdiHelpCircleOutline)
export const mdiHome = svg(_mdiHome)
export const mdiInformation = svg(_mdiInformation)
export const mdiLanguageMarkdown = svg(_mdiLanguageMarkdown)
export const mdiLightbulbOutline = svg(_mdiLightbulbOutline)
export const mdiLink = svg(_mdiLink)
export const mdiLinkVariant = svg(_mdiLinkVariant)
export const mdiMagnify = svg(_mdiMagnify)
export const mdiMenu = svg(_mdiMenu)
export const mdiOpenInNew = svg(_mdiOpenInNew)
export const mdiPrinter = svg(_mdiPrinter)
export const mdiRobot = svg(_mdiRobot)
export const mdiTextSearch = svg(_mdiTextSearch)
export const mdiUpdate = svg(_mdiUpdate)
