# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## IMPORTANT: Consult /docs Before Writing Any Code

Before generating or modifying any code, **always read the relevant file(s) in the `/docs` directory first**. These files define project-specific standards and conventions that take precedence over general best practices.

Current docs:
- `docs/ui.md` — UI standards (component library rules, shadcn/ui usage, styling conventions)

If the task touches a domain covered by a docs file, read that file before writing a single line of code.

## Commands

```bash
npm run dev      # Start dev server (Turbopack, outputs to .next/dev)
npm run build    # Production build (Turbopack by default)
npm run start    # Start production server
npm run lint     # Run ESLint directly (not next lint — that was removed in v16)
```

## Stack

- **Next.js 16.2.1** with App Router (`src/app/`)
- **React 19.2.4**
- **TypeScript** (strict mode, path alias `@/*` → `src/*`)
- **Tailwind CSS v4** (via `@tailwindcss/postcss`)
- ESLint v9 with flat config (`eslint.config.mjs`) using `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`

## Next.js 16 Breaking Changes to Know

This project runs **Next.js 16**, which has significant breaking changes from v15 and earlier. Always read `node_modules/next/dist/docs/` before writing Next.js-specific code.

Key differences from older Next.js:

- **Async Request APIs** — `cookies()`, `headers()`, `draftMode()`, `params`, and `searchParams` are **async only**. Synchronous access is removed. Always `await` them.
- **`middleware.ts` is deprecated** — use `proxy.ts` with a named export `proxy` instead. The `edge` runtime is not supported in `proxy`.
- **`next lint` removed** — use `eslint` directly (already configured in `package.json`).
- **Turbopack is the default** for both `next dev` and `next build`. Use `--webpack` to opt out.
- **Turbopack config** moved from `experimental.turbopack` to top-level `turbopack` in `next.config.ts`.
- **PPR** (`experimental.ppr`) removed — use `cacheComponents: true` in `next.config.ts` instead.
- **`serverRuntimeConfig`/`publicRuntimeConfig`** removed — use `process.env` and `NEXT_PUBLIC_` prefix.
- **`next/legacy/image`** deprecated — use `next/image`.
- **`images.domains`** deprecated — use `images.remotePatterns`.
- **Parallel route slots** require explicit `default.js` files or builds will fail.
- **`cacheLife`/`cacheTag`** — drop the `unstable_` prefix; import directly from `next/cache`.
- **`next build` no longer lints automatically** — run linting separately.
- **Dev output** goes to `.next/dev`; prod build goes to `.next`.

## Routing Conventions (App Router)

Files in `src/app/` follow file-system routing:

- `layout.tsx` — shared UI wrapper (root layout required, must contain `<html>` and `<body>`)
- `page.tsx` — public route
- `loading.tsx` — loading skeleton
- `error.tsx` — error boundary
- `route.ts` — API endpoint
- `default.tsx` — parallel route fallback (required when using parallel routes)
- `_folder/` — private, non-routable colocated files
- `(group)/` — route group, omitted from URL
