---
name: optimize-assets
description: Optimizes every image under src/ and public/ — SVGs with SVGO, PNG/JPG with sharp — and unblocks the pre-commit assets gate. Triggered after adding or updating any SVG/PNG/JPG (icons, illustrations, photos), when a commit is blocked with "unoptimized assets staged", or when the user asks to optimize icons/images/assets. Handles excluding assets that visually break after optimization.
---

# Optimize image assets

Every `*.svg`, `*.png`, `*.jpg` under `src/` and `public/` must be optimized
before it is committed. The `.husky/pre-commit` hook **blocks** the commit
otherwise — it never rewrites your files, because a lossy re-encode is a human
decision. `next/image` optimizes at request time, but the repo's source files
still carry their full weight into git history and into any path that bypasses
the image loader (SVGR inline SVGs, `?url` imports, `public/` files served
as-is).

- SVG → SVGO, config at repo root `svgo.config.mjs` (multipass, `currentColor`
  preserved, `width`/`height` stripped in favour of `viewBox` — SVGR sizes via
  props).
- PNG/JPG → sharp: mozjpeg q80 / palette PNG, metadata stripped, long edge
  capped at 3000px (widest rendered size is 1360px @2x = 2720; `next/image`
  downscales from there at runtime).
- Script: `scripts/optimize-assets.mjs`.

## Step 1 — Run

```bash
npm run assets:check      # report only, exits 1 if anything is unoptimized
npm run assets:optimize   # rewrite the unoptimized files in place
```

Both accept an explicit file list (`node scripts/optimize-assets.mjs --check <paths…>`);
the pre-commit hook passes only the staged images.

An asset counts as unoptimized when:

- **SVG** — SVGO output differs from the file on disk (byte-exact oracle).
- **Raster** — re-encoding saves ≥15% **and** ≥8KB, or the long edge exceeds
  3000px. Files already near-optimal are left alone, so a clean run is quiet.

## Step 2 — Verify

- Re-run `npm run assets:check` → must print `✓ N asset(s) checked — all optimized.`
  (the optimizer is idempotent; a second pass must never find new work).
- Inspect the diff of any heavily-shrunk SVG (`git diff`): `viewBox` must stay,
  `currentColor` fills/strokes must stay, `stroke-width` must stay.
- **Look at the rasters that shrank a lot.** A >60% drop means the source was
  saved at q100 — usually fine, but confirm on screen (Storybook / dev server)
  that no visible banding or blur appeared.
- Re-stage the rewritten files (`git add`) and commit again.

## Step 2.5 — Near-duplicate check before commit (new images only)

Newly added images regularly duplicate an asset already in the repo —
re-exports, crops, the same photo at a new size. Before committing, check the
**newly added** rasters against the existing ones instead of committing copies:

- Compute a perceptual dHash via sharp, with the script run **from the repo
  root** so sharp resolves:

  ```js
  // node scripts/… or a one-off .mjs at the repo root
  import sharp from 'sharp'
  const dhash = async (file) => {
    const { data } = await sharp(file)
      .grayscale()
      .resize(9, 8, { fit: 'fill' })
      .raw()
      .toBuffer({ resolveWithObject: true })
    let bits = ''
    for (let y = 0; y < 8; y++)
      for (let x = 0; x < 8; x++)
        bits += data[y * 9 + x] < data[y * 9 + x + 1] ? '1' : '0'
    return bits
  }
  const dist = (a, b) => [...a].filter((c, i) => c !== b[i]).length
  ```

- Hamming distance ≤ 10 marks a near-duplicate pair; crops of the same source
  often land a little above that, so eyeball pairs up to ~16 too.
- Group the matches (a crop groups with its source) and report:
  **"N groups of near-duplicates — keep the largest of each group and
  reuse it?"** — then wait for the answer instead of committing copies.
- SVGs are text, not pixels — compare those by byte hash after SVGO; identical
  output = duplicate.

## Step 3 — If an asset breaks

1. Restore it: `git checkout -- <path>` (if the pre-optimization version was
   never committed, re-export it from Figma).
2. Add its **repo-relative path** to the `EXCLUDED` array at the top of
   `scripts/optimize-assets.mjs` — e.g. `'src/assets/icons/logo.svg'`.
   Excluded assets are left byte-identical and never reported by the gate.
3. Re-run `npm run assets:check` and confirm the file is no longer listed.

## Boundaries

- **Never bypass the gate with `git commit --no-verify`.** If an asset genuinely
  must ship as-is, `EXCLUDED` it (with a one-line comment saying why) — that
  keeps the decision visible in review.
- Never edit `svgo.config.mjs` or the sharp thresholds to unblock one file —
  they affect every asset and would need a visual re-check of all of them.
  Exclude the single file instead.
- Only `src/` and `public/` are scanned. `favicon.ico` is untouched (not an
  SVG/PNG/JPG).
