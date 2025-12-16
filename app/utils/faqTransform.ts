type MiniMarkNode = any

function isElementNode(node: MiniMarkNode): node is any[] {
  return Array.isArray(node) && typeof node[0] === 'string'
}

function tagName(node: any[]): string {
  return node[0]
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
 * Transform FAQ markdown AST into structured accordion data.
 * Extracts H3 headings as questions and groups following content as answers.
 * 
 * @param value - Array of MiniMark nodes from the markdown AST
 * @returns Array of FAQ items with question (string) and answer (array of nodes)
 */
export function transformFaqsToAccordionData(value: MiniMarkNode[]): Array<{ question: string; answer: MiniMarkNode[] }> {
  if (!Array.isArray(value)) return []

  const faqItems: Array<{ question: string; answer: MiniMarkNode[] }> = []
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
        faqItems.push({
          question: questionText,
          answer: answerNodes
        })
      }
      continue
    }

    i += 1
  }

  return faqItems
}


