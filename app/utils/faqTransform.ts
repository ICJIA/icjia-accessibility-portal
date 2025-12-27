type MiniMarkNode = any

/**
 * Number of days a question is considered "new"
 */
const NEW_QUESTION_DAYS = 14

function isElementNode(node: MiniMarkNode): node is any[] {
  return Array.isArray(node) && typeof node[0] === 'string'
}

function tagName(node: any[]): string {
  return node[0]
}

/**
 * Extract text content from a node recursively
 */
function extractNodeText(node: MiniMarkNode): string {
  if (typeof node === 'string') return node
  if (Array.isArray(node) && node.length > 2) {
    return node.slice(2).map(extractNodeText).join('')
  }
  return ''
}

/**
 * Check if a date string is within the "new" window (default 14 days)
 * @param dateStr - Date string in YYYY-MM-DD format
 * @returns true if the date is within the new window
 */
export function isWithinNewWindow(dateStr: string): boolean {
  const addedDate = new Date(dateStr)
  const now = new Date()
  const diffTime = now.getTime() - addedDate.getTime()
  const diffDays = diffTime / (1000 * 60 * 60 * 24)
  return diffDays <= NEW_QUESTION_DAYS
}

/**
 * Pattern to match the new tag in various formats:
 * - {new:2025-12-27} (curly braces - preferred, survives markdown parsing)
 * - <!-- new:2025-12-27 --> (HTML comment - may be stripped by parser)
 */
const NEW_TAG_PATTERN = /(?:\{new:\s*(\d{4}-\d{2}-\d{2})\}|<!--\s*new:\s*(\d{4}-\d{2}-\d{2})\s*-->)/

/**
 * Extract the "new" date from answer nodes if present
 * Looks for pattern: {new:YYYY-MM-DD} in a paragraph
 * @param answerNodes - Array of answer nodes
 * @returns Date string if found and within window, null otherwise
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
 * Remove the "new" tag from answer nodes so it doesn't display
 * @param answerNodes - Array of answer nodes
 * @returns Filtered array without the new tag
 */
export function filterNewComments(answerNodes: MiniMarkNode[]): MiniMarkNode[] {
  const newTagFullPattern = /(?:\{new:\s*\d{4}-\d{2}-\d{2}\}|<!--\s*new:\s*\d{4}-\d{2}-\d{2}\s*-->)/g
  
  return answerNodes.map(node => {
    if (typeof node === 'string') {
      // Remove the new tag from strings
      const cleaned = node.replace(newTagFullPattern, '').trim()
      return cleaned
    }
    // Handle paragraph nodes that might contain the tag
    if (isElementNode(node) && tagName(node) === 'p') {
      const text = extractNodeText(node)
      // If the paragraph only contains the new tag, filter it out by returning null
      const cleaned = text.replace(newTagFullPattern, '').trim()
      if (cleaned === '') {
        return null // Will be filtered below
      }
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
 * Wrap each H3 question + all following nodes (until next H3/H2/H1/HR)
 * into a single container so the entire answer stays in one "card".
 *
 * This is intentionally simple and only operates on top-level nodes.
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
 * FAQ item with optional "new" date
 */
export interface FaqItem {
  question: string
  answer: MiniMarkNode[]
  isNew?: boolean
  newDate?: string
}

/**
 * Transform FAQ markdown AST into structured accordion data.
 * Extracts H3 headings as questions and groups following content as answers.
 * Also extracts "new" dates from HTML comments and filters them from display.
 * 
 * @param value - Array of MiniMark nodes from the markdown AST
 * @returns Array of FAQ items with question (string), answer (array of nodes), and optional isNew flag
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


