import 'dotenv/config'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import { createApp } from './app.js'
import { createDatabase } from './db.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

const port = Number.parseInt(process.env.PORT ?? '8080', 10)
const dbPath = process.env.DB_PATH ?? path.join(rootDir, 'data', 'app.db')

const db = createDatabase(dbPath)
const app = createApp({ db })

if (process.env.NODE_ENV === 'production') {
  const distDir = path.join(rootDir, 'dist')
  app.use(express.static(distDir))
  app.use((req, res, next) => {
    if (req.method !== 'GET' || req.path.startsWith('/api/')) {
      return next()
    }
    return res.sendFile(path.join(distDir, 'index.html'))
  })
}

const server = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})

function shutdown() {
  server.close(() => {
    db.close()
    process.exit(0)
  })
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
