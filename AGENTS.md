# AGENTS.md — CV Mark Grenville

## Project Overview

A cinematic, Awwwards-quality personal CV website for Mark Grenville built with SvelteKit, Tailwind CSS v4, and Firebase. The site features 6 unique "view modes" (GUI, CLI, Swagger, JSON, YAML, Document) that all render the same centralized CV data in different formats.

## Tech Stack

- **Frontend:** SvelteKit 2, Svelte 5, TypeScript
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/vite`)
- **Backend:** SvelteKit API routes (server-side)
- **Hosting:** Firebase Hosting
- **Database:** Firestore (analytics only)
- **Package Manager:** pnpm
- **Process Manager:** PM2

## Key Architecture Decisions

- All CV content lives in `src/lib/data/cv.ts` — a single source of truth consumed by all 6 view modes and all API routes.
- TypeScript interfaces for the data model are in `src/lib/types/cv.ts`.
- View mode state is managed via a Svelte writable store in `src/lib/stores/viewMode.ts`.
- Animations use vanilla Intersection Observer wrapped in a Svelte action (`use:reveal` in `src/lib/utils/animations.ts`).
- YAML serialization uses a lightweight custom utility in `src/lib/utils/yaml.ts` (no external deps).
- The Swagger view calls real SvelteKit API routes at `/api/cv/*`.

## File Structure Reference

- `src/lib/data/cv.ts` — Centralized CV data (edit this to update content)
- `src/lib/types/cv.ts` — TypeScript interfaces for all data models
- `src/lib/stores/viewMode.ts` — View mode state (gui, cli, swagger, json, yaml, document)
- `src/lib/components/gui/` — 9 GUI section components (Hero, About, Experience, Skills, Projects, Capabilities, Clients, WhyAI, Contact)
- `src/lib/components/cli/Terminal.svelte` — CLI terminal emulator
- `src/lib/components/swagger/SwaggerUI.svelte` — Swagger-inspired API explorer
- `src/lib/components/json/JsonView.svelte` — Syntax-highlighted JSON view
- `src/lib/components/yaml/YamlView.svelte` — Syntax-highlighted YAML view
- `src/lib/components/document/DocView.svelte` — Printable document view
- `src/routes/api/cv/` — REST API routes returning CV data as JSON

## Documentation

- `docs/interfaces-and-models.md` — Data model reference
- `docs/UXGuidelines.md` — Design tokens, component inventory, accessibility

## Ports

- **8520** — SvelteKit dev server
- **8521** — Firebase Emulator Suite UI
- **8522** — Firestore emulator
- **8523** — Auth emulator
- **8524** — Hosting emulator
- **8525** — Storage emulator

## PM2 Process Names

- `cv-mark-frontend` — SvelteKit dev
- `cv-mark-emulator` — Firebase emulators

## How to Run

```bash
pm2 start ecosystem.config.cjs
# or
pnpm dev --port 8520
```

## Conventions

- Use `console.log('[Component]', ...)` for frontend logging.
- Use `console.log('[API]', ...)` for backend route logging.
- All styling uses Tailwind CSS custom theme tokens defined in `src/app.css`.
- No external animation or component libraries — everything is custom.
