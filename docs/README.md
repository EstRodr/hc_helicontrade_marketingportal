# HeliconTrade Documentation

This repository is a small monorepo that currently contains the marketing website and shared utilities. This page centralizes documentation and links to existing guides.

## Repository Name — Recommendation
- Current: `helicontrade-workspace`
- Recommended: `helicontrade` (preferred) or `helicontrade-monorepo`

Rationale:
- Matches the domain `helicontrade.com` and npm scope `@helicontrade`.
- Shorter and clearer than `-workspace`.
- Leaves room to add more apps/packages (e.g., web app, API, CMS) under a single monorepo.

If you’d like, I can prepare a rename checklist (Git remote, CI, deploys, README badges) — just say the word.

## Project Structure
```
helicontrade-workspace/
├── marketing-site/          # Nuxt 3 marketing website (dev: helicontrade.local:3002)
├── shared/                  # Shared utilities between projects
└── docs/                    # Centralized documentation (this folder)
```

## Quick Links
- Brand & Naming Guidelines: `docs/brand/naming.md`
- Marketing Site Docs Index: `docs/marketing-site/README.md`
- Development Setup: `DEVELOPMENT_SETUP.md`

## Quick Start (Marketing Site)
```bash
# From repo root
pnpm -C marketing-site install
pnpm -C marketing-site dev
# App runs at http://helicontrade.local:3002
```

## Next Steps (optional)
- Adopt the naming guidelines throughout code and docs to remove any historical brand-name inconsistencies.
- If/when you add more apps (e.g., `web-app/`, `api/`, `cms/`), mirror this docs structure with per-app indexes.
