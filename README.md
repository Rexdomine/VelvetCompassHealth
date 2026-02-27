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

## Deploy
1. `npm run build`
2. `NODE_ENV=production npm run start`

The production server serves both API routes and the static React bundle.
