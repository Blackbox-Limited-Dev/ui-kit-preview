import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../storybook-static'
)
const port = Number(process.env.PORT) || 6006

const MIME = {
  '.css': 'text/css',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.map': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
}

if (!fs.existsSync(dir)) {
  console.error('No storybook-static/. Run npm run storybook:build first.')
  process.exit(1)
}

http
  .createServer((req, res) => {
    const url = decodeURIComponent((req.url ?? '/').split('?')[0])
    let file = path.join(dir, url === '/' ? 'index.html' : url)
    if (!file.startsWith(dir)) {
      res.writeHead(403).end()
      return
    }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
      file = path.join(file, 'index.html')
    }
    if (!fs.existsSync(file)) {
      file = path.join(dir, 'index.html')
    }
    const ext = path.extname(file)
    res.writeHead(200, {
      'Content-Type': MIME[ext] ?? 'application/octet-stream',
    })
    fs.createReadStream(file).pipe(res)
  })
  .listen(port, () => {
    console.log(`Storybook static → http://localhost:${port}`)
  })
