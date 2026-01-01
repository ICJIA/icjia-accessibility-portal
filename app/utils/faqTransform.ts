/**
 * @fileoverview FAQ transformation utilities for markdown AST processing
 * @description Provides functions to transform markdown AST nodes into structured FAQ data.
 * Handles extraction of questions, answers, "new" badges, and dynamic placeholder replacement.
 * 
 * @module faqTransform
 */

/**
 * Type alias for MiniMark AST nodes.
 * MiniMark is the AST format used by Nuxt Content.
 * 
 * @typedef {any} MiniMarkNode
 */
type MiniMarkNode = any

/**
 * Number of days a question is considered "new" after its date tag.
 * Questions marked with {new:YYYY-MM-DD} will show a "NEW" badge for this many days.
 * 
 * @constant {number}
 * @default 10
 */
const NEW_QUESTION_DAYS = 10

/**
 * Calculates days remaining until the compliance deadline (April 24, 2026).
 * 
 * @returns {number} Number of days remaining (0 if deadline has passed)
 * @private
 */
function getDaysUntilDeadline(): number {
  const deadline = new Date('2026-04-24T00:00:00').getTime()
  const now = Date.now()
  const distance = deadline - now
  if (distance <= 0) return 0
  return Math.floor(distance / (1000 * 60 * 60 * 24))
}

/**
 * Type guard to check if a node is an element node (not a text node).
 * 
 * Element nodes in MiniMark are arrays where the first element is the tag name.
 * 
 * @param {MiniMarkNode} node - The node to check
 * @returns {boolean} True if the node is an element node
 * @private
 */
function isElementNode(node: MiniMarkNode): node is any[] {
  return Array.isArray(node) && typeof node[0] === 'string'
}

/**
 * Gets the tag name from an element node.
 * 
 * @param {any[]} node - The element node (array with tag name as first element)
 * @returns {string} The tag name (e.g., 'p', 'h3', 'ul')
 * @private
 */
function tagName(node: any[]): string {
  return node[0]
}

/**
 * Replaces dynamic placeholders in text nodes with actual values.
 * 
 * Currently supports:
 * - `{days_until_deadline}` - Replaced with days until April 24, 2026
 * 
 * @param {string} text - Text that might contain placeholders
 * @returns {string} Text with placeholders replaced with actual values
 * @private
 * 
 * @example
 * ```ts
 * replaceDynamicPlaceholders("There are {days_until_deadline} days left")
 * // Returns: "There are 123 days left"
 * ```
 */
function replaceDynamicPlaceholders(text: string): string {
  const daysUntilDeadline = getDaysUntilDeadline()
  return text.replace(/\{days_until_deadline\}/g, daysUntilDeadline.toString())
}

/**
 * Extracts text content from a node recursively.
 * 
 * Handles both text nodes (strings) and element nodes (arrays).
 * For element nodes, recursively extracts text from all children.
 * 
 * @param {MiniMarkNode} node - The node to extract text from
 * @returns {string} Extracted text content
 * @private
 */
function extractNodeText(node: MiniMarkNode): string {
  if (typeof node === 'string') return node
  if (Array.isArray(node) && node.length > 2) {
    return node.slice(2).map(extractNodeText).join('')
  }
  return ''
}

/**
 * Checks if a date string is within the "new" window.
 * 
 * A question is considered "new" if its date is within NEW_QUESTION_DAYS
 * (default: 10 days) of the current date.
 * 
 * @param {string} dateStr - Date string in YYYY-MM-DD format
 * @returns {boolean} True if the date is within the new window, false otherwise
 * 
 * @example
 * ```ts
 * // If today is 2026-01-10
 * isWithinNewWindow('2026-01-05') // true (5 days ago, within 10 day window)
 * isWithinNewWindow('2025-12-20') // false (21 days ago, outside window)
 * ```
 */
export function isWithinNewWindow(dateStr: string): boolean {
  const addedDate = new Date(dateStr)
  const now = new Date()
  const diffTime = now.getTime() - addedDate.getTime()
  const diffDays = diffTime / (1000 * 60 * 60 * 24)
  return diffDays <= NEW_QUESTION_DAYS
}

/**
 * Regular expression pattern to match the "new" tag in various formats.
 * 
 * Supports:
 * - `{new:2025-12-27}` - Curly braces format (preferred, survives markdown parsing)
 * - `<!-- new:2025-12-27 -->` - HTML comment format (may be stripped by parser)
 * 
 * @constant {RegExp}
 * @private
 */
const NEW_TAG_PATTERN = /(?:\{new:\s*(\d{4}-\d{2}-\d{2})\}|<!--\s*new:\s*(\d{4}-\d{2}-\d{2})\s*-->)/

/**
 * Extracts the "new" date from answer nodes if present.
 * 
 * Searches through answer nodes for the new tag pattern and returns the date
 * if found and within the new window. Returns null if not found or outside window.
 * 
 * @param {MiniMarkNode[]} answerNodes - Array of answer nodes to search
 * @returns {string | null} Date string (YYYY-MM-DD) if found and within window, null otherwise
 * 
 * @example
 * ```ts
 * const nodes = [['p', {}, '{new:2026-01-01}'], ['p', {}, 'Answer text']]
 * extractNewDate(nodes) // Returns: "2026-01-01" if within 10 days
 * ```
 */
export function extractNewDate(answerNodes: MiniMarkNode[]): string | null {
  for (const node of answerNodes) {
    if (typeof node === 'string') {
      const match = node.match(NEW_TAG_PATTERN)
      if (match) {
        const dateStr = match[1] || match[2]
        if (isWithinNewWindow(dateStr)) {
          return dateStr
        }
      }
    }
    // Check inside paragraph nodes
    if (isElementNode(node) && tagName(node) === 'p') {
      const text = extractNodeText(node)
      const match = text.match(NEW_TAG_PATTERN)
      if (match) {
        const dateStr = match[1] || match[2]
        if (isWithinNewWindow(dateStr)) {
          return dateStr
        }
      }
    }
  }
  return null
}

/**
 * Removes the "new" tag from answer nodes so it doesn't display.
 * 
 * Also replaces dynamic placeholders like `{days_until_deadline}` with actual values.
 * Filters out empty nodes that result from removing the new tag.
 * 
 * @param {MiniMarkNode[]} answerNodes - Array of answer nodes to process
 * @returns {MiniMarkNode[]} Filtered array without the new tag and with dynamic values replaced
 * 
 * @example
 * ```ts
 * const nodes = [['p', {}, '{new:2026-01-01}'], ['p', {}, 'Answer text']]
 * filterNewComments(nodes) // Returns: [['p', {}, 'Answer text']]
 * ```
 */
export function filterNewComments(answerNodes: MiniMarkNode[]): MiniMarkNode[] {
  const newTagFullPattern = /(?:\{new:\s*\d{4}-\d{2}-\d{2}\}|<!--\s*new:\s*\d{4}-\d{2}-\d{2}\s*-->)/g
  
  return answerNodes.map(node => {
    if (typeof node === 'string') {
      // Remove the new tag from strings and replace dynamic placeholders
      let cleaned = node.replace(newTagFullPattern, '').trim()
      cleaned = replaceDynamicPlaceholders(cleaned)
      return cleaned
    }
    // Handle paragraph nodes that might contain the tag or placeholders
    if (isElementNode(node) && tagName(node) === 'p') {
      // Process text content recursively
      const processedNode = processNodeForDynamicContent(node)
      const text = extractNodeText(processedNode)
      // If the paragraph only contains the new tag, filter it out by returning null
      const cleaned = text.replace(newTagFullPattern, '').trim()
      if (cleaned === '') {
        return null // Will be filtered below
      }
      return processedNode
    }
    // Process other element nodes recursively
    if (isElementNode(node)) {
      return processNodeForDynamicContent(node)
    }
    return node
  }).filter(node => {
    // Remove null nodes and empty strings
    if (node === null) return false
    if (typeof node === 'string' && node.trim() === '') return false
    return true
  })
}

/**
 * Processes a node recursively to replace dynamic placeholders.
 * 
 * Traverses the node tree and replaces placeholders like `{days_until_deadline}`
 * in all text nodes.
 * 
 * @param {MiniMarkNode} node - The node to process
 * @returns {MiniMarkNode} Processed node with dynamic content replaced
 * @private
 */
function processNodeForDynamicContent(node: MiniMarkNode): MiniMarkNode {
  if (typeof node === 'string') {
    return replaceDynamicPlaceholders(node)
  }
  if (isElementNode(node)) {
    // Node structure: [tagName, attributes, ...children]
    const [tag, attrs, ...children] = node
    const processedChildren = children.map(child => processNodeForDynamicContent(child))
    return [tag, attrs, ...processedChildren]
  }
  return node
}

/**
 * Wraps each H3 question and all following content into a single container div.
 * 
 * This ensures the entire answer (all content until the next H3/H2/H1/HR) stays
 * together in one "card" for consistent styling and layout.
 * 
 * Process:
 * 1. Finds H3 nodes (questions)
 * 2. Collects all following nodes until next heading or HR
 * 3. Wraps question + answer in a div with class "qa-card"
 * 
 * This is intentionally simple and only operates on top-level nodes.
 * 
 * @param {MiniMarkNode[]} value - Array of MiniMark nodes from markdown AST
 * @returns {MiniMarkNode[]} Array with H3 questions and answers wrapped in div.qa-card
 * 
 * @example
 * ```ts
 * const nodes = [
 *   ['h3', {}, 'Question 1'],
 *   ['p', {}, 'Answer 1'],
 *   ['h3', {}, 'Question 2'],
 *   ['p', {}, 'Answer 2']
 * ]
 * wrapFaqQuestionsIntoCards(nodes)
 * // Returns: [
 * //   ['div', {class: 'qa-card'}, ['h3', {}, 'Question 1'], ['p', {}, 'Answer 1']],
 * //   ['div', {class: 'qa-card'}, ['h3', {}, 'Question 2'], ['p', {}, 'Answer 2']]
 * // ]
 * ```
 */
export function wrapFaqQuestionsIntoCards(value: MiniMarkNode[]): MiniMarkNode[] {
  if (!Array.isArray(value)) return value

  const out: MiniMarkNode[] = []
  let i = 0

  while (i < value.length) {
    const node = value[i]

    if (isElementNode(node) && tagName(node) === 'h3') {
      const group: MiniMarkNode[] = [node]
      i += 1

      while (i < value.length) {
        const next = value[i]

        if (isElementNode(next)) {
          const t = tagName(next)
          if (t === 'h1' || t === 'h2' || t === 'h3' || t === 'hr') break
        }

        group.push(next)
        i += 1
      }

      out.push(['div', { class: 'qa-card' }, ...group])
      continue
    }

    out.push(node)
    i += 1
  }

  return out
}

/**
 * Interface for a FAQ item with question, answer, and optional "new" badge information.
 * 
 * @interface FaqItem
 * @property {string} question - The question text (extracted from H3 heading)
 * @property {MiniMarkNode[]} answer - Array of nodes containing the answer content
 * @property {boolean} [isNew] - Whether the question should display a "NEW" badge
 * @property {string} [newDate] - The date string (YYYY-MM-DD) when the question was marked as new
 */
export interface FaqItem {
  question: string
  answer: MiniMarkNode[]
  isNew?: boolean
  newDate?: string
}

/**
 * Transforms FAQ markdown AST into structured accordion data.
 * 
 * This is the main transformation function that:
 * 1. Extracts H3 headings as questions
 * 2. Groups all following content (until next H1/H2/H3/HR) as answers
 * 3. Extracts "new" dates from answer content
 * 4. Filters out the "new" tags from display
 * 5. Replaces dynamic placeholders with actual values
 * 
 * @param {MiniMarkNode[]} value - Array of MiniMark nodes from the markdown AST
 * @returns {FaqItem[]} Array of FAQ items with question, answer, and optional isNew flag
 * 
 * @example
 * ```ts
 * const ast = [
 *   ['h3', {}, 'What is accessibility?'],
 *   ['p', {}, '{new:2026-01-01}'],
 *   ['p', {}, 'Accessibility means...']
 * ]
 * transformFaqsToAccordionData(ast)
 * // Returns: [{
 * //   question: 'What is accessibility?',
 * //   answer: [['p', {}, 'Accessibility means...']],
 * //   isNew: true,
 * //   newDate: '2026-01-01'
 * // }]
 * ```
 */
export function transformFaqsToAccordionData(value: MiniMarkNode[]): FaqItem[] {
  if (!Array.isArray(value)) return []

  const faqItems: FaqItem[] = []
  let i = 0

  while (i < value.length) {
    const node = value[i]

    if (isElementNode(node) && tagName(node) === 'h3') {
      // Extract question text from H3 node
      // H3 node structure: ['h3', {}, ...children] or ['h3', {id: '...'}, ...children]
      let questionText = ''
      if (node.length > 2) {
        // Extract text from children nodes
        const extractText = (n: any): string => {
          if (typeof n === 'string') return n
          if (Array.isArray(n)) {
            return n.slice(2).map(extractText).join('')
          }
          return ''
        }
        questionText = node.slice(2).map(extractText).join('').trim()
      }

      // Collect answer content (everything until next H1/H2/H3/HR)
      const answerNodes: MiniMarkNode[] = []
      i += 1

      while (i < value.length) {
        const next = value[i]

        if (isElementNode(next)) {
          const t = tagName(next)
          if (t === 'h1' || t === 'h2' || t === 'h3' || t === 'hr') break
        }

        answerNodes.push(next)
        i += 1
      }

      if (questionText) {
        // Check for "new" date in answer nodes
        const newDate = extractNewDate(answerNodes)
        const filteredAnswer = filterNewComments(answerNodes)
        
        faqItems.push({
          question: questionText,
          answer: filteredAnswer,
          isNew: newDate !== null,
          newDate: newDate || undefined
        })
      }
      continue
    }

    i += 1
  }

  return faqItems
}


