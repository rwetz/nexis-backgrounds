# Nexis backgrounds

The welcome-screen background library for Nexis (`rwetz/Nexis`, `src/modules/welcome/backgroundLibrary.ts`). Nexis reads `index.json` from this repo's `main` and installs, updates and removes backgrounds from it. Public.

## Format

A background is **data, not code**: `backgrounds/<id>/<version>/loop.mp4` (H.264, 1600x1000, no audio) plus `poster.jpg`. Nexis plays it in a muted `<video>`. Nothing here runs as JavaScript. Keep it that way: the Nexis webview holds PTY, filesystem and AI-tool access, so a live scene shipped as code would run with all of it.

## Rules

- Adding or changing a background means running `node scripts/build-index.mjs` in the same change. Nexis refuses a loop whose size or SHA-256 doesn't match `index.json`.
- Never edit a published version folder; add a new version folder and rebuild the index.
- Keep each loop under 64 MB (Nexis's ceiling) and aim for about 10 MB (`scripts/encode.sh`).
- Pushing to `main` publishes to every Nexis install. Do not push without being asked.
- Sources live in occult-dioramas (`scenes/`, `npm run loops`).
