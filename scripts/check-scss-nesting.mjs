/**
 * `&_` nesting gate for SCSS modules (pre-commit, via nano-staged).
 *
 *   node scripts/check-scss-nesting.mjs <file.module.scss> …
 *
 * Fails when a file declares a flat top-level selector `.block_element`
 * while `.block` is also defined at the top level of the same file — the
 * convention (AGENTS.md → Conventions → Styles) is to nest child classes
 * as `&_element` under the block class:
 *
 *   .footer { &_card { … } }     // ✓  → s.footer_card
 *   .footer_card { … }           // ✖  flat duplicate of the block prefix
 *
 * Dependency-free on purpose: plain fs + regex, no PostCSS parse.
 */
import { readFile } from 'node:fs/promises'

const files = process.argv.slice(2).filter((a) => !a.startsWith('--'))

if (files.length === 0) {
  console.log('check-scss-nesting: no files passed — nothing to check.')
  process.exit(0)
}

const CLASS_RE = /\.([A-Za-z_][A-Za-z0-9_-]*)/g

// Returns [{ name, line }] for every class selector declared at brace depth 0.
const topLevelClasses = (source) => {
  const noComments = source
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '))
    .replace(/\/\/[^\n]*/g, '')

  const found = []
  let depth = 0
  let buffer = ''
  let bufferLine = 1
  let line = 1

  for (const ch of noComments) {
    if (ch === '\n') line += 1

    if (ch === '{') {
      if (depth === 0) {
        for (const match of buffer.matchAll(CLASS_RE)) {
          found.push({ name: match[1], line: bufferLine })
        }
      }
      depth += 1
      buffer = ''
      bufferLine = line
    } else if (ch === '}') {
      depth = Math.max(0, depth - 1)
      buffer = ''
      bufferLine = line
    } else if (depth === 0) {
      if (ch === ';') {
        buffer = ''
        bufferLine = line
      } else {
        if (buffer.trim() === '') bufferLine = line
        buffer += ch
      }
    }
  }
  return found
}

let violations = 0

for (const file of files) {
  const source = await readFile(file, 'utf8')
  const classes = topLevelClasses(source)
  const defined = new Map()
  for (const { name, line } of classes) {
    if (!defined.has(name)) defined.set(name, line)
  }

  for (const { name, line } of classes) {
    if (!name.includes('_')) continue
    const parts = name.split('_')
    for (let i = 1; i < parts.length; i++) {
      const prefix = parts.slice(0, i).join('_')
      if (defined.has(prefix)) {
        violations += 1
        console.error(
          `✖ ${file}:${line} — flat selector \`.${name}\` but \`.${prefix}\` is defined in this file (line ${defined.get(prefix)}).` +
            `\n  Nest it instead:  .${prefix} { &_${name.slice(prefix.length + 1)} { … } }`
        )
        break
      }
    }
  }
}

if (violations > 0) {
  console.error(
    `\nSCSS nesting check failed: ${violations} flat selector(s). ` +
      'Child classes nest under the block class as `&_element` (AGENTS.md → Conventions → Styles).'
  )
  process.exit(1)
}

console.log(`✓ ${files.length} file(s) checked — \`&_\` nesting OK.`)
