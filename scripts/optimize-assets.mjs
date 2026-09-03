/**
 * Asset optimizer / gate for every image under `src/` and `public/`.
 *
 *   npm run assets:check      # report only, exit 1 if anything is unoptimized
 *   npm run assets:optimize   # rewrite the unoptimized files in place
 *   node scripts/optimize-assets.mjs --check <file> <file> …   # subset (pre-commit)
 *
 * SVG  → SVGO (config: svgo.config.mjs). Unoptimized ⇔ SVGO output differs.
 * JPG/PNG → sharp. Unoptimized ⇔ oversized (> MAX_DIMENSION px on the long
 *           edge) or re-encodable below the savings thresholds below.
 *
 * If a file breaks visually after optimization, add its path to EXCLUDED — it
 * is then left byte-identical and never reported.
 */
import { readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadConfig, optimize } from 'svgo'
import sharp from 'sharp'

// Files that must stay verbatim, repo-relative, forward slashes.
const EXCLUDED = []

// A raster is "unoptimized" when re-encoding saves at least both of these.
const MIN_SAVED_RATIO = 0.15 // 15% smaller
const MIN_SAVED_BYTES = 8 * 1024
// Widest rendered size is 1360px @2x = 2720; next/image downscales at
// runtime, anything longer is wasted repo bytes.
const MAX_DIMENSION = 3000
const JPEG_QUALITY = 80

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SCAN_DIRS = [path.join(ROOT, 'src'), path.join(ROOT, 'public')]
const RASTER_EXT = ['.jpg', '.jpeg', '.png']

const args = process.argv.slice(2)
const checkOnly = args.includes('--check')
const explicit = args.filter((a) => !a.startsWith('--'))

const svgoConfig = await loadConfig(path.join(ROOT, 'svgo.config.mjs'))

const rel = (file) => path.relative(ROOT, file).split(path.sep).join('/')

async function walk(dir) {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await walk(full)))
    else out.push(full)
  }
  return out
}

async function collect() {
  const files = explicit.length
    ? explicit.map((f) => path.resolve(ROOT, f))
    : (await Promise.all(SCAN_DIRS.map((d) => walk(d).catch(() => [])))).flat()

  return files
    .filter((f) => SCAN_DIRS.some((d) => f.startsWith(d + path.sep)))
    .filter((f) => {
      const ext = path.extname(f).toLowerCase()
      return ext === '.svg' || RASTER_EXT.includes(ext)
    })
    .filter((f) => !EXCLUDED.includes(rel(f)))
    .sort()
}

/** @returns {{ before: number, after: number, note: string, write?: () => Promise<void> }} */
async function inspectSvg(file) {
  const input = await readFile(file, 'utf8')
  const { data } = optimize(input, { ...svgoConfig, path: file })
  const before = Buffer.byteLength(input)
  const after = Buffer.byteLength(data)

  if (data === input) return { before, after, note: '' }

  return {
    before,
    after,
    note: 'svgo',
    write: () => writeFile(file, data, 'utf8'),
  }
}

async function inspectRaster(file) {
  // Read into memory first: on Windows, sharp(path) keeps the file handle open
  // and the later writeFile to the same path fails with UNKNOWN/EBUSY.
  const source = await readFile(file)
  const before = source.length
  const meta = await sharp(source).metadata()
  const long = Math.max(meta.width ?? 0, meta.height ?? 0)
  const oversized = long > MAX_DIMENSION

  let pipeline = sharp(source)
  if (oversized) {
    pipeline = pipeline.resize({
      width: meta.width >= meta.height ? MAX_DIMENSION : undefined,
      height: meta.height > meta.width ? MAX_DIMENSION : undefined,
      withoutEnlargement: true,
    })
  }
  pipeline =
    path.extname(file).toLowerCase() === '.png'
      ? pipeline.png({ palette: true, compressionLevel: 9, effort: 10 })
      : pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true })

  const buffer = await pipeline.toBuffer()
  const after = buffer.length
  const saved = before - after
  const recompressible =
    saved >= MIN_SAVED_BYTES && saved / before >= MIN_SAVED_RATIO

  if (!oversized && !recompressible) return { before, after: before, note: '' }
  // Never write a bigger file — a downscale alone still counts as a win.
  if (!oversized && after >= before) return { before, after: before, note: '' }

  const notes = []
  if (oversized)
    notes.push(`${meta.width}×${meta.height} → ≤${MAX_DIMENSION}px`)
  if (recompressible) notes.push('recompress')

  return {
    before,
    after,
    note: notes.join(', '),
    write: () => writeFile(file, buffer),
  }
}

const kb = (n) => `${(n / 1024).toFixed(1)}KB`

const files = await collect()
const dirty = []

for (const file of files) {
  const result =
    path.extname(file).toLowerCase() === '.svg'
      ? await inspectSvg(file)
      : await inspectRaster(file)

  if (result.write) dirty.push({ file, ...result })
}

if (dirty.length === 0) {
  console.log(`✓ ${files.length} asset(s) checked — all optimized.`)
  process.exit(0)
}

const totalBefore = dirty.reduce((s, d) => s + d.before, 0)
const totalAfter = dirty.reduce((s, d) => s + d.after, 0)
const saved = totalBefore - totalAfter
const pct = ((saved / totalBefore) * 100).toFixed(0)

if (checkOnly) {
  console.log(`\n✖ ${dirty.length} unoptimized asset(s):\n`)
  for (const d of dirty) {
    console.log(
      `  ${rel(d.file)}\n      ${kb(d.before)} → ${kb(d.after)}  (${d.note})`
    )
  }
  console.log(
    `\n  Total: ${kb(totalBefore)} → ${kb(totalAfter)} (−${pct}%, ${kb(saved)} saved)`
  )
  console.log(`\n  Fix:  npm run assets:optimize`)
  console.log(
    `  Then re-check the images render correctly, and re-stage them.\n`
  )
  process.exit(1)
}

for (const d of dirty) {
  await d.write()
  console.log(`✓ ${rel(d.file)}: ${kb(d.before)} → ${kb(d.after)} (${d.note})`)
}
console.log(
  `\n${dirty.length}/${files.length} optimized, ${kb(saved)} saved (${pct}%), ${EXCLUDED.length} excluded.`
)
console.log('Visually verify the touched assets before committing.')
