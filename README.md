# Velvet Compass Health

## Project Foundation

Read the [VCH master project brief](docs/project-brief.md) before website, design, content, or video work. It combines the client meeting and written brief, tracks unresolved decisions, and links the preserved local sources. Record approved updates in the [change log](docs/change-log.md).

## Current website work

The public homepage now implements the [client-approved concept 04 revision 04](docs/homepage-approval.md) as a local, responsive website preview. The separate member-area route and existing Express API remain in the repository. The homepage hero uses Rex's supplied arrival film as a muted, continuously looping autoplay video without visible playback controls; the approved design still is its poster and reduced-motion fallback. This local film use does not establish client approval for publication. The homepage's private-enquiry action opens an email draft to the repository's existing default address; confirm that destination before any public launch.

Navigation reaches the dedicated Membership, How it works, Health Intelligence, Clinical Network, International Care, and About VCH routes; other named destinations still point to relevant homepage sections until their pages are built.

The dedicated `/enquire` route implements the seven-step Request Access journey. It incorporates the refreshed brief's enquiry type, preferred contact method, short message, privacy and emergency wording. The Enquire and hotel partnership forms submit to separate server-side endpoints that send an office notification and a visitor receipt through Brevo. Controlled local delivery tests have passed; verify both paths again on the deployed site before treating production delivery as confirmed.

The /membership local route contains the three core tiers, the full client-supplied comparison and service tables, proportionate-care imagery, and expandable entry points for Athletes and International Students. Its service claims and access wording require confirmation before publication; the page and new artwork are available for Rex's local review.

The [How it works](/how-it-works) local route now uses the client brief's nine-part journey and urgent-care boundary, with a continuous vertical line and three new page-specific medical-art images. The approved homepage remains the visual foundation. The route is for local review; its imagery and implementation have not yet received separate client sign-off.

The `/health-intelligence` local route follows the client's page copy and product-like visual direction, with original medical-art imagery and a continuous line through its eight sections. Potential health-platform sources are marked for availability and connection-method confirmation before launch. This page is ready for Rex's local review; its design and new imagery are not yet client-approved.

The `/clinical-network` local route follows the written brief's hero and coordinated-care explanation. Its responsive editorial grid combines seven source-listed clinicians with an eighth profile from Rex's deck excerpt and a ninth from his later portrait and biography, all marked as draft. It now uses eight grayscale portrait previews from public professional profiles, one grayscale crop of Rex’s supplied portrait, and two original, page-specific artworks about a person centred among varied perspectives and distinct contributions brought together. Image reuse rights, credentials, relationships and the final roster require confirmation before publication. The page is ready for Rex's local review and has not received separate client approval.

The `/international-care` local route follows the written brief's continuity across locations and before/during/after care journey. It uses two new page-specific navigation and records artworks, a continuous fine line, and the required local-clinician responsibility and destination caveats. It is ready for Rex's local review; its design and new imagery are not yet client-approved.

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

For homepage-only local review, `npm run dev:client` starts the frontend without the API. This is the workflow used for the current preview; no external hosting or publishing is part of this milestone.

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
The Enquire and hotel partnership forms post to server-side API routes. After the office notification is accepted by Brevo, the visitor sees a confirmation and the server attempts a separate email receipt. If that receipt fails, the confirmation says so without inviting a duplicate submission. If the office notification fails, the visitor sees a retryable error and the enquiry is not stored. If Brevo is not configured in production, the server fails at startup to prevent silent intake drops.

Keep `.env` private and out of Git. Before publishing active forms, confirm the key authenticates, the sender is verified, the target office mailbox is correct, and both office and visitor messages arrive in a controlled test. The replacement local key and sender passed a read-only Brevo check. Controlled local submissions to both form endpoints produced four messages in the Rex Tech test inbox, and Rex confirmed receipt of a separate synthetic notification in the VCH office inbox. Render deployment and production delivery require their own verification. Data retention and privacy policy still need operational approval.

## Deploy
1. `npm run build`
2. `NODE_ENV=production npm run start`

The production server serves both API routes and the static React bundle.
