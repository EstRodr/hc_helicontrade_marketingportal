# HeliconTrade Marketing (Nuxt 3)

A minimal Nuxt 3 marketing site scaffold, CMS-ready (Strapi recommended). SSR/SSG for SEO.

## Dev
- Node 18+
- pnpm 8 (recommended)

Commands:
- pnpm i
- pnpm dev  # http://localhost:3030
- pnpm build && pnpm preview

## CMS
- Configure `NUXT_PUBLIC_CMS_BASE` for Strapi/Directus.
- Fetch content via server routes or `useFetch()`.

## Routing
- `/login` and `/register` redirect to App portal (`/app/*`).
- Keep marketing routes public and indexable; exclude auth routes from indexing.

