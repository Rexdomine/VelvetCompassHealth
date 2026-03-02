# Velvet Compass Health

Production-ready one-page React website with an Express API and SQLite storage for enquiry submissions.

## Stack
- Frontend: React + Vite + Tailwind CSS
- Backend: Express + Zod validation + Helmet + Rate Limiting
- Database: SQLite (`better-sqlite3`)

## Quick Start
```bash
npm install
cp .env.example .env
npm run dev
```

- Frontend runs on `http://localhost:5173`
- Backend runs on `http://localhost:8080`
- API endpoint: `POST /api/enquiries`

## Scripts
- `npm run dev`: start frontend + backend in watch mode
- `npm run build`: build frontend assets
- `npm run start`: run production server (serves `dist/`)
- `npm run test`: run API tests
- `npm run lint`: run ESLint

## Environment
Set in `.env`:
- `PORT` (default `8080`)
- `DB_PATH` (default `./data/app.db`)
- `CORS_ORIGIN` (optional comma-separated allowlist)
- `ADMIN_EMAIL` (default `office@velvetcompasshealth.com`)
- `BREVO_API_KEY` (required in production)
- `BREVO_SENDER_EMAIL` (required in production; must be a verified Brevo sender)
- `BREVO_SENDER_NAME` (optional, default `Velvet Compass Health`)
- `PUBLIC_SITE_URL` (optional, default `https://velvetcompasshealth.com`; used for email logo URL)

## Enquiry Email Notifications
When an enquiry is submitted, the API sends a transactional notification email to `ADMIN_EMAIL` using Brevo.
If Brevo is not configured in production, the server fails fast at startup to prevent silent intake drops.

## Deploy
1. `npm run build`
2. `NODE_ENV=production npm run start`

The production server serves both API routes and the static React bundle.
