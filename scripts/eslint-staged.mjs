/**
 * Chunks paths so Windows does not hit "The command line is too long"
 * when nano-staged appends a large staged-file list to eslint.
 */
import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const eslint = path.join(root, 'node_modules/.bin/eslint.cmd')
const files = process.argv.slice(2)
const CHUNK = 40

for (let i = 0; i < files.length; i += CHUNK) {
  const chunk = files.slice(i, i + CHUNK)
  const result = spawnSync(eslint, chunk, {
    cwd: root,
    stdio: 'inherit',
    shell: true,
  })
  if (result.status) process.exit(result.status)
}
