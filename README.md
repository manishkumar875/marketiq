# Prime Eye Research — Production Website

A Next.js 15 marketing site and internal admin console for Prime Eye Research, a market
research and consumer insights company. Built with a real Supabase backend — every form
submission, admin login, note, and status change is genuine and persisted, with no mock
or seed data anywhere.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui (Radix primitives)
- Framer Motion (UI animation) + Canvas2D (hero background animation)
- Supabase: Postgres database, Auth, Row Level Security
- Zod (server-side input validation)
- Resend (optional email notifications)
- Recharts (where used in admin views)

## Getting started

### 1. Set up Supabase

Follow **[supabase/README.md](./supabase/README.md)** for full step-by-step instructions:
creating the project, running the schema, getting your API keys, and creating your first
admin login. This must be done before the site will actually work — without it, forms
will fail to submit and `/admin` will have nothing to show.

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

Fill in the values from your Supabase project (see `supabase/README.md` for where to find
them). `RESEND_API_KEY` and `NOTIFICATION_EMAIL` are optional — leave them unset if you
don't want email notifications yet.

### 3. Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To run a production build locally:

```bash
npm run build
npm run start
```

## Deploying to Vercel

1. Push this project to a GitHub repository.
2. In Vercel, **New Project** → import that repository. Next.js is auto-detected, no
   build configuration needed.
3. Before the first deploy (or in **Project Settings → Environment Variables** any time
   after), add the same variables from your `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `RESEND_API_KEY` and `NOTIFICATION_EMAIL` (optional)
4. Deploy. HTTPS, CDN, and security headers (set via `middleware.ts`) all apply
   automatically — no extra configuration required.
5. Point your domain (`prime-eyeresearch.com`) at the Vercel project under
   **Project Settings → Domains**.

## Routes

| Route | Description |
|---|---|
| `/` | Marketing homepage — Hero (with animated background), Stats, About, Services, Solutions, AI Survey Builder demo, multi-step Research Request form, quick Contact form, Footer |
| `/signup` | Respondent panel sign-up (unchanged from the earlier demo phase — not yet connected to Supabase) |
| `/admin` | Redirects to `/admin/leads` |
| `/admin/login` | Admin sign-in — no public sign-up exists anywhere in the app |
| `/admin/leads` | Lead management — real data from the `leads` table, search/filter, status updates, real persisted notes |
| `/admin/requests` | Research request triage — real data from the `research_requests` table, search/filter, status updates, "Convert to Project," real persisted notes |
| `/admin/projects` | Project management — real data from the `projects` table; **empty until an admin explicitly converts a research request** |

## What's real vs. what's intentionally unchanged

- **Real and fully wired**: the homepage's Research Request form, the quick Contact form,
  admin authentication, lead/request/project data, notes, status changes, the
  request-to-project conversion flow, rate limiting, bot protection, audit logging, and
  all Row Level Security policies.
- **Intentionally left as-is, not in scope for this phase**: `/signup` (the respondent
  panel registration page) was explicitly excluded from this backend integration phase
  per client direction and still behaves as a front-end-only demo.
- **No mock data anywhere** in `leads`, `research_requests`, or `projects` — every row in
  those tables exists because a real form was submitted or a real admin action was taken.

## Security

See the **Security** section of [supabase/README.md](./supabase/README.md) for the full
rundown. Summary: Supabase Auth with no public admin sign-up, role-based access via a
dedicated `admin_roles` table, Row Level Security enforced at the database on every
table, server-side Zod validation on every form, database-level rate limiting (5
submissions per IP per 10 minutes), a honeypot field on both public forms, an append-only
audit log, and security headers (CSP, HSTS, X-Frame-Options, etc.) applied to every
response via `middleware.ts`.

## Project structure

```
app/
  actions/              Server Actions for the public forms (lead, research request)
  admin/
    login/               Admin sign-in (outside the auth-gated layout)
    (protected)/         Everything behind the auth check: leads, requests, projects
  page.tsx               Homepage
components/              UI components — shared, admin-specific, and shadcn/ui primitives
lib/
  supabase/               Browser, server, and admin (service-role) Supabase clients
  get-client-ip.ts        IP extraction for rate limiting
  send-notification-email.ts   Optional Resend email helper
middleware.ts             Auth gate for /admin + security headers on every request
supabase/
  migrations/              Numbered SQL migrations, run in order
  schema_combined.sql       All migrations concatenated, for a one-paste setup
  README.md                 Full Supabase setup walkthrough
```
