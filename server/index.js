import 'dotenv/config'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import { createApp } from './app.js'
import { createDatabase } from './db.js'
import { createBrevoEmailService } from './email.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

const port = Number.parseInt(process.env.PORT ?? '8080', 10)
const dbPath = process.env.DB_PATH ?? path.join(rootDir, 'data', 'app.db')
const adminEmail = process.env.ADMIN_EMAIL ?? 'office@velvetcompasshealth.com'
const senderEmail = process.env.BREVO_SENDER_EMAIL ?? ''
const senderName = process.env.BREVO_SENDER_NAME ?? 'Velvet Compass Health'
const publicSiteUrl = process.env.PUBLIC_SITE_URL ?? 'https://velvetcompasshealth.com'
const isProduction = process.env.NODE_ENV === 'production'

let emailService = null
if (process.env.BREVO_API_KEY) {
  emailService = createBrevoEmailService({
    apiKey: process.env.BREVO_API_KEY,
    adminEmail,
    senderEmail,
    senderName,
    publicSiteUrl,
  })
} else if (isProduction) {
  throw new Error('BREVO_API_KEY is required in production to send admin enquiry emails.')
}

function shouldFallbackDbPath(error) {
  return Boolean(
    error &&
      typeof error === 'object' &&
      'code' in error &&
      ['EACCES', 'EPERM', 'EROFS', 'ENOENT'].includes(error.code),
  )
}

function initDatabase() {
  try {
    return createDatabase(dbPath)
  } catch (error) {
    if (!shouldFallbackDbPath(error)) {
      throw error
    }

    const fallbackPath = path.join(rootDir, 'data', 'app.db')
    console.warn(
      `Unable to use DB_PATH="${dbPath}" (${error.code}). Falling back to "${fallbackPath}".`,
    )
    return createDatabase(fallbackPath)
  }
}

const db = initDatabase()
const app = createApp({ db, emailService })

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
