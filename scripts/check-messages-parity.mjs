#!/usr/bin/env node
// Every catalogue must carry the same keys as the reference one. Only
// `messages/ua.json` is type-checked against `t()` call sites (it is the
// catalogue wired into the next-intl `AppConfig` augmentation), so a missing
// `pl`/`ro` key would otherwise surface as a runtime fallback string.

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const REFERENCE = 'ua'
const LOCALES = ['ua', 'pl', 'ro']

const read = (locale) =>
  JSON.parse(readFileSync(join(root, 'messages', `${locale}.json`), 'utf8'))

const flatten = (value, prefix = '') =>
  Object.entries(value).flatMap(([key, entry]) => {
    const path = prefix ? `${prefix}.${key}` : key
    return entry && typeof entry === 'object' && !Array.isArray(entry)
      ? flatten(entry, path)
      : [path]
  })

const reference = new Set(flatten(read(REFERENCE)))
let failed = false

for (const locale of LOCALES.filter((one) => one !== REFERENCE)) {
  const keys = new Set(flatten(read(locale)))
  const missing = [...reference].filter((key) => !keys.has(key))
  const extra = [...keys].filter((key) => !reference.has(key))

  for (const key of missing) {
    console.error(`✖ ${locale}.json is missing "${key}"`)
  }
  for (const key of extra) {
    console.error(
      `✖ ${locale}.json has "${key}", absent from ${REFERENCE}.json`
    )
  }

  failed ||= missing.length > 0 || extra.length > 0
}

if (failed) {
  console.error('✖ Message catalogues are out of parity.')
  process.exit(1)
}

console.log(`✓ ${LOCALES.join(', ')} catalogues carry identical keys.`)
