# Brand & Naming Guidelines

These conventions keep naming consistent across code, docs, analytics, and deployments.

## Canonical Names
- Brand (display): `HeliconTrade` (PascalCase)
- Domain: `helicontrade.com`
- npm scope: `@helicontrade`

## Acceptable Variants (context-dependent)
- Lowercase: `helicontrade` (for URLs, environment keys, repo names)
- Kebab-case: `helicontrade-marketing-frontend`, `helicontrade-web-app` (package names)

## Disallowed / To Avoid
- `HeliconiTrade` (with an extra “i”) — typo
- `Helicon Trade` (with a space) — avoid splitting the word in product/UI

## Repository Naming
- Monorepo (recommended): `helicontrade` or `helicontrade-monorepo`
- Single app repo (if split later): `helicontrade-marketing`, `helicontrade-web`, `helicontrade-api`, `helicontrade-cms`

## Package and App Names
- npm packages: `@helicontrade/marketing-frontend`, `@helicontrade/web-app`, `@helicontrade/api`
- Folder names: `marketing-site/`, `web-app/`, `api/`, `cms/`, `shared/`

## Analytics & External Systems
- GA4 property: `HeliconTrade Marketing`
- PostHog project: `HeliconTrade`
- Strapi project: `helicontrade-cms` (repo) / “HeliconTrade CMS” (display)

## Environment & Config Keys
- Prefer stable, lowercased keys where possible.
- Examples used in this repo (marketing-site):
  - `NUXT_PUBLIC_SITE_URL`
  - `NUXT_PUBLIC_APP_URL`
  - `NUXT_PUBLIC_API_BASE`
  - `NUXT_PUBLIC_STRAPI_URL`
  - `NUXT_PUBLIC_STRAPI_TOKEN`
  - `NUXT_PUBLIC_GA_MEASUREMENT_ID`
  - `NUXT_PUBLIC_POSTHOG_PUBLIC_KEY`

## Commit Messages / Issue Titles
- Use the display brand when needed: “Fix: update hero title to ‘HeliconTrade — Market Research & Alerts’”.
- Use lower/kebab for technical assets: `feat(marketing-site): add pricing page`.

## Migration Note
There are mixed usages in the codebase (e.g., `HeliconiTrade` vs `HeliconTrade`). Going forward, adopt `HeliconTrade`. I can provide an automated refactor PR on request.
