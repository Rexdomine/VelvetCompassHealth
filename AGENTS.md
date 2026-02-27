# Repository Guidelines

## Project Structure & Module Organization
This repository is currently a clean bootstrap. Use the structure below as the default layout for all new work:
- `src/`: application source code (group by feature, not by file type).
- `tests/`: unit and integration tests mirroring `src/` paths.
- `public/` or `assets/`: static files (images, icons, fonts).
- `scripts/`: local automation (seed, migration, maintenance tasks).
- `docs/`: architecture notes and decision records.

Keep modules small and cohesive. Prefer `src/features/<feature-name>/` with colocated UI, logic, and tests.

## Build, Test, and Development Commands
Standardize all local workflows behind npm scripts:
- `npm install`: install dependencies.
- `npm run dev`: start local development server.
- `npm run build`: create production build artifacts.
- `npm run test`: run full automated test suite.
- `npm run lint`: run static analysis/lint checks.
- `npm run format`: apply code formatting.

If you add tooling, update `package.json` scripts and this guide in the same PR.

## Coding Style & Naming Conventions
- Indentation: 2 spaces for JS/TS, JSON, and YAML.
- Prefer TypeScript for new modules.
- File naming: `kebab-case` for files, `PascalCase` for React components, `camelCase` for variables/functions.
- Keep functions focused and side effects explicit.
- Use ESLint + Prettier; do not merge code with lint or format violations.

## Testing Guidelines
- Test framework: Vitest or Jest (choose one and keep consistent).
- Test files: `*.test.ts` or `*.spec.ts`.
- Place unit tests near code or under `tests/` with mirrored paths.
- Add regression tests for bug fixes.
- Target meaningful coverage on core paths; avoid shallow snapshot-only tests.

## Commit & Pull Request Guidelines
- Use Conventional Commits: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`.
- Keep commits atomic and message scope specific (example: `feat(auth): add session timeout handling`).
- PRs must include:
  - clear summary of behavior changes,
  - test evidence (`npm run test`, `npm run lint`),
  - screenshots for UI changes,
  - linked issue/ticket when applicable.

## Security & Configuration Tips
Never commit secrets. Store local config in `.env.local` and commit only `.env.example` with placeholder values.
