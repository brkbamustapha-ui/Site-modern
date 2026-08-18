# La Dolce Vita — Ristorante Italiano

A cinematic, immersive 3D website for a high-end Italian restaurant. Built with Next.js (App Router), TypeScript, Tailwind CSS, React Three Fiber, Framer Motion, Prisma and PostgreSQL.

The hero, the interactive table scene and every floating ingredient on the plate are procedurally generated Three.js geometry — no external 3D models or stock photography are used, so the whole experience runs from source with zero binary assets.

## Stack

| Layer | Tech |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack), React 19, TypeScript (strict) |
| Styling | Tailwind CSS v4 (CSS-based theme in `app/globals.css`) |
| 3D | Three.js, `@react-three/fiber`, `@react-three/drei` |
| Motion | Framer Motion (reveal animations, magnetic buttons, page transitions) |
| Database | PostgreSQL + Prisma ORM |
| Validation | Zod (shared client/server schemas) |
| Auth (admin) | Passcode + signed HTTP-only session cookie (no third-party auth needed) |

## Project structure

```
app/
  (site)/              Public site — layout wires up Navbar/Footer/CustomCursor
    page.tsx            Home page, assembles all sections
  admin/
    login/              Passcode login (public)
    (protected)/        Auth-gated admin shell (dashboard, menu, reservations, messages, users, settings)
    actions.ts           Server Actions used by the admin panel (create/update/delete, login/logout)
  api/
    products/            GET  — public menu data
    reservations/         POST — create a reservation · GET (admin) — list reservations
    contact/              POST — send a contact message
  icon.tsx, apple-icon.tsx, opengraph-image.tsx   Generated favicons / share image
  robots.ts, sitemap.ts

components/
  3d/                  React Three Fiber scenes & primitives (procedural geometry only)
  ui/                  Cursor, navbar, footer, magnetic buttons, scroll/text reveal
  sections/            Hero, Menu, Experience (3D table), Story, Chef, Gallery, Reservation, Contact
  admin/               Admin shell, product form, reservation row actions

lib/
  prisma.ts             Prisma client singleton
  data.ts                Query helpers used by Server Components
  validations.ts          Zod schemas shared by forms + API routes
  admin-auth.ts            Passcode check + signed session cookie helpers
  motion-context.tsx        Client context: prefers-reduced-motion, touch detection, device performance tier
  use-reveal.ts             Scroll-reveal hook (IntersectionObserver + fallback)

prisma/
  schema.prisma           User, Category, Product, Reservation, ContactMessage, RestaurantContent
  seed.ts                   Realistic Italian menu + demo content
  migrations/                Versioned SQL migrations
```

## Getting started

### 1. Prerequisites

- Node.js 22+ (the Neon driver uses the global `WebSocket`)
- A [Neon](https://neon.tech) PostgreSQL project (free tier is enough)

> **Why Neon rather than a local Postgres container?** The app is deployed to
> Cloudflare Workers, which cannot open the raw TCP socket the standard `pg`
> driver needs, so Prisma goes through Neon's WebSocket-based serverless driver
> (`@prisma/adapter-neon`). That same driver is used in development, which means
> `DATABASE_URL` must point at Neon — a plain `localhost:5432` Postgres will not
> answer it. Neon's free per-developer branches are designed for exactly this.

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example file and fill in real values:

```bash
cp .env.example .env
```

| Variable | Description |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string used by Prisma |
| `ADMIN_PASSCODE` | Passcode required to sign in at `/admin/login` |
| `ADMIN_SESSION_SECRET` | Random secret used to sign the admin session cookie |
| `NEXT_PUBLIC_SITE_URL` | Public site URL, used for SEO metadata and Open Graph tags |

Neon hands you two connection strings. Both are needed, for different things:

| String | Contains | Used by |
| --- | --- | --- |
| **Pooled** | `-pooler` in the host | the app at runtime → `DATABASE_URL` |
| **Direct** | no `-pooler` | `prisma migrate` / `db:seed`, which use plain TCP |

### 4. Set up the database

Migrations and seeding bypass the serverless driver, so point them at the
**direct** string:

```bash
DATABASE_URL="<direct-string>" npm run db:migrate   # applies prisma/migrations
DATABASE_URL="<direct-string>" npm run db:seed      # categories, dishes, admin user, "story" block
```

`npm run db:studio` opens Prisma Studio if you want to browse/edit data visually.

### 5. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the public site, and [http://localhost:3000/admin](http://localhost:3000/admin) for the admin panel (passcode = `ADMIN_PASSCODE`).

## Admin panel

`/admin` is gated by a signed, HTTP-only cookie set after the passcode form succeeds (`app/admin/actions.ts`). From the dashboard you can:

- **Menu** — create, edit, delete dishes; toggle availability and "signature dish" status
- **Reservations** — view bookings, change status (pending/confirmed/cancelled/completed), delete
- **Messages** — read and manage contact form submissions
- **Users** — read-only staff directory (`User` model)
- **Settings** — edit the restaurant's "Our Story" copy shown on the public site

All mutations go through Next.js Server Actions directly against Prisma — no separate REST layer is needed for the admin panel. The public-facing `POST /api/reservations` and `POST /api/contact` routes are the ones consumed by visitors.

## Performance & accessibility

- All Three.js scenes are dynamically imported with `ssr: false` and code-split per section (Hero, Experience) — the 3D bundle is never sent to a page that doesn't render it.
- `lib/motion-context.tsx` detects device performance (CPU cores, memory, viewport) and exposes a `high | medium | low` tier consumed by every 3D component to scale geometry detail, particle counts, shadow quality and renderer DPR.
- `prefers-reduced-motion` disables the custom cursor, camera parallax, floating objects and staggered text reveal across the whole site.
- Touch devices get a self-sustained ambient camera drift instead of pointer-following parallax.
- Images use `next/image`-compatible formats (AVIF/WebP) where photography is added later (see "Adding real photography" below).

## Adding real photography

The menu, gallery and chef sections currently use art-directed gradient tiles + icons instead of stock photography, so the repository ships with zero binary assets and no licensing concerns. To swap in real photos:

1. Add optimized images to `public/`.
2. Replace the gradient/icon tile in `components/sections/MenuInteractive.tsx` and `components/sections/Gallery.tsx` with a `next/image`.
3. Optionally store an image path on `Product.imageQuery` (already part of the schema) and read it from the admin panel.

## Build & deploy

```bash
npm run build
npm run start
```

`next build` type-checks the project and prerenders every static route (icons, sitemap, robots.txt); all data-backed pages are marked `force-dynamic` so they render per-request against your database. Deploy to any Node.js host (Vercel, Fly.io, a container, etc.) with `DATABASE_URL`, `ADMIN_PASSCODE`, `ADMIN_SESSION_SECRET` and `NEXT_PUBLIC_SITE_URL` set in the environment. Run `npm run db:deploy` (`prisma migrate deploy`) against the production database before the first deploy.

## Deploying to Cloudflare Workers

The app runs on Cloudflare Workers through the [OpenNext](https://opennext.js.org/cloudflare) adapter. Two pieces make that possible:

- `nodejs_compat` (set in `wrangler.jsonc`) gives the Worker `node:crypto`, used for the admin session HMAC.
- Prisma talks to Postgres through **Neon's serverless driver** (`@prisma/adapter-neon`), which uses WebSocket/HTTP instead of a raw TCP socket. Workers cannot open the TCP connection the standard `pg` driver expects.

### 1. Create the database (Neon)

Create a project at [neon.tech](https://neon.tech). From the dashboard, copy both connection strings:

| String | Contains | Used by |
| --- | --- | --- |
| **Pooled** | `-pooler` in the host | the Worker at runtime (`DATABASE_URL`) |
| **Direct** | no `-pooler` | migrations and seeding, which use plain TCP |

Apply the schema and (optionally) the demo menu, using the **direct** string:

```bash
DATABASE_URL="<direct-string>" npm run db:deploy
DATABASE_URL="<direct-string>" npm run db:seed
```

### 2. Connect the repository to Cloudflare

In the Cloudflare dashboard: **Workers & Pages → Create → Workers → Import a repository**, then pick this repo and branch. Set:

| Setting | Value |
| --- | --- |
| Build command | `npm run cf:build` |
| Deploy command | `npx wrangler deploy` |

`prisma generate` runs automatically via `postinstall`.

### 3. Set the environment

Add these as **encrypted secrets** on the Worker (Settings → Variables and Secrets):

| Name | Value |
| --- | --- |
| `DATABASE_URL` | the Neon **pooled** connection string |
| `ADMIN_PASSCODE` | a long random passcode |
| `ADMIN_SESSION_SECRET` | `openssl rand -hex 32` |

`NEXT_PUBLIC_SITE_URL` is different: `NEXT_PUBLIC_*` values are inlined at build time, so add it as a **build variable** (plain text, not a secret) set to your final URL — e.g. `https://la-dolce-vita.<subdomain>.workers.dev` or your custom domain.

Every push to the connected branch now builds and deploys automatically.

### Deploying from your own machine instead

```bash
npx wrangler login          # opens a browser to authorise the CLI
npx wrangler secret put DATABASE_URL
npx wrangler secret put ADMIN_PASSCODE
npx wrangler secret put ADMIN_SESSION_SECRET
npm run cf:deploy
```

`npm run cf:preview` builds and serves the Worker locally on workerd first, which is the quickest way to catch a Workers-only problem before shipping.

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Start the production server |
| `npm run lint` | ESLint |
| `npm run db:migrate` | Create/apply a Prisma migration locally |
| `npm run db:deploy` | Apply migrations in production |
| `npm run db:seed` | Seed the database |
| `npm run db:studio` | Open Prisma Studio |
| `npm run cf:build` | Build the Cloudflare Worker bundle (OpenNext) |
| `npm run cf:preview` | Run the Worker locally on workerd |
| `npm run cf:deploy` | Build and deploy to Cloudflare Workers |

## Security model

- `/admin` pages are gated by the `(protected)` layout, and **every mutating Server Action independently re-checks the session** (`requireAdmin()` in `app/admin/actions.ts`). This matters because Server Actions are publicly reachable POST endpoints once their ID is known — a layout guard alone protects rendering, not invocation.
- The session cookie is `httpOnly`, `sameSite=lax`, `secure` in production, and holds an HMAC of a server-side secret rather than the passcode itself. Passcode comparison uses `timingSafeEqual`.
- No secrets are hardcoded: `ADMIN_PASSCODE` and `ADMIN_SESSION_SECRET` come from the environment. **Set both to strong values before deploying** — the defaults in `.env.example` are placeholders.
- `GET /api/reservations` requires an admin session; the public `POST` endpoints validate every field with Zod before touching the database.

### Known advisory

`npm audit` reports a high-severity advisory in `deepmerge-ts`, pulled in transitively by `@prisma/config` — which is only used by the **Prisma CLI** (`migrate`, `generate`, `studio`), not by `@prisma/client` at runtime. It is not reachable from the running web app, and npm's only offered remedy is a downgrade to `prisma@6.12.0`. Left as-is deliberately; it will clear on the next Prisma release.

## Notes

- The previous static single-page site for a different business (a real-estate agency) has been preserved under `_legacy-static-site/` for reference and is excluded from linting/builds.
- If WebGL is unavailable (blocklisted GPU, hardware acceleration disabled, exhausted context pool) or a scene throws, `SceneCanvas` degrades to a static gradient backdrop instead of breaking the page — see `components/3d/SceneBoundary.tsx`.
- Prisma is pinned to the 6.x line, which uses the classic `datasource { url = env("DATABASE_URL") }` schema format — Prisma 7 moved connection configuration into a separate `prisma.config.ts` + driver-adapter model, which is a bigger migration than this project needs today.
