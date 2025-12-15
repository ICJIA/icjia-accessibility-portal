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


