# Lawfirm PWA Platform (LexNova Legal)
LexNova Legal is a production-oriented Progressive Web App for a law firm focused on immigration, business formation, and employment law in Lithuania.  
This repository includes a public marketing site, SEO-friendly blog, lead/appointment intake APIs, and an authenticated admin CMS backed by Supabase.

## Overview
This project is a full-stack legal services platform built to handle both public-facing trust/content pages and internal content/lead operations.  
It targets legal teams that need a fast website, editorial control, and structured intake workflows without maintaining a separate CMS product.

## ✨ Key Features
- Public website routes for home, services, team, blog, contact, booking, and legal policy pages
- Admin dashboard for managing blog posts, services, team members, testimonials, leads, appointments, and site settings
- Markdown-based blog authoring with draft/published states and server-side revalidation
- Lead intake API with validation, GDPR consent enforcement, honeypot check, and rate limiting
- Appointment booking API with weekday checks, conflict detection, and availability endpoint
- Email notifications for appointment events (client/admin)
- Cloudinary signed upload flow for media management
- SEO foundations: metadata, robots, dynamic sitemap, JSON-LD structured data
- PWA essentials: web manifest, service worker registration, offline fallback page

## 🛠 Tech Stack
- **Frontend**
  - Next.js 16 (App Router)
  - React 19
  - TypeScript 5
  - Tailwind CSS 4
- **Backend**
  - Next.js Route Handlers (API routes)
  - Next.js Server Actions
  - Nodemailer (SMTP)
- **Database / Auth**
  - Supabase (PostgreSQL)
  - Supabase Auth (`@supabase/ssr`, `@supabase/supabase-js`)
  - SQL migrations under `supabase/migrations`
- **Infrastructure / DevOps**
  - Vercel Analytics integration
  - ESLint + Prettier configuration
  - Deployment documentation for Vercel
- **Integrations / Services**
  - Cloudinary (signed uploads + CDN image delivery)
  - `react-markdown` + `remark-gfm` for blog rendering

## 🏗 Architecture Overview
- **App structure:** Next.js App Router with separate `(public)` and `(admin)` route groups
- **Data layer:** Supabase tables for practice areas, lawyers, testimonials, blog posts, leads, appointments, and site settings
- **Write paths:** Admin content changes go through server actions; lead/booking/media flows use API route handlers
- **Security model:** Supabase auth session checks for admin actions, RLS policies in migrations, server-only secret usage via env getters
- **Rendering:** Mixed static/ISR strategy for public pages with dynamic data fetchers in `src/lib/data.ts`

## 📸 Demo / Screenshots
- **Live demo:** No confirmed production URL is documented as an active public demo in this repository.
- **Repository:** `https://github.com/Shahadat99x/lawfirm-pwa-platform`
- **Suggested screenshots to add:**
  1. Public home page (desktop + mobile)
  2. Admin dashboard overview
  3. Blog editor (Markdown + preview)
  4. Appointment booking flow
- **Useful GIF idea:** A short end-to-end clip: create blog post in admin → publish → open on `/blog`.

## 🚀 Getting Started
### Prerequisites
- Node.js 20+
- npm
- Supabase project (for DB/Auth)

### Installation
```bash
git clone https://github.com/Shahadat99x/lawfirm-pwa-platform.git
cd lawfirm-pwa-platform
npm install
```

### Environment Variables
Copy the template:
```bash
cp .env.example .env.local
```

Required core variables:
```bash
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Optional integrations:
```bash
# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# SMTP (email notifications)
SMTP_HOST=
SMTP_PORT=
SMTP_SECURE=
SMTP_USER=
SMTP_PASS=
ADMIN_NOTIFY_EMAIL=
```

### Run Locally
Apply migrations in Supabase SQL Editor (in order):
- `supabase/migrations/0001_init.sql`
- `supabase/migrations/0002_seed.sql`
- `supabase/migrations/0003_leads_intake.sql`
- `supabase/migrations/0004_admin_rls_leads.sql`
- `supabase/migrations/0005_leads_fields.sql`
- `supabase/migrations/0006_blog_cms.sql`
- `supabase/migrations/0007_site_settings_seed.sql`
- `supabase/migrations/0008_practice_areas_update.sql`
- `supabase/migrations/0009_lawyers_update.sql`
- `supabase/migrations/0010_appointments.sql`

Start development server:
```bash
npm run dev
```

### Build / Production
```bash
npm run lint
npm run build
npm run start
```

## 📁 Project Structure
```text
.
├── docs/                     # Product, architecture, deployment, and setup docs
├── public/                   # Static assets + service worker
├── src/
│   ├── app/
│   │   ├── (public)/         # Public pages (marketing, services, blog, contact, book)
│   │   ├── (admin)/admin/    # Admin dashboard pages
│   │   ├── actions/          # Server actions for CMS modules
│   │   └── api/              # Route handlers (leads, appointments, media signatures)
│   ├── components/           # UI, layout, admin, section, and PWA components
│   ├── lib/                  # Data access, env validation, integrations, auth utilities
│   └── types/                # Domain types
├── supabase/
│   ├── config.toml
│   └── migrations/           # SQL schema and policy migrations
├── .env.example
└── package.json
```

## 🔄 Core Workflows / API / User Flow
- **Admin authentication**
  - Admin pages use Supabase session checks before privileged operations.
- **Lead capture**
  - `/api/leads` validates payload, rejects spam via honeypot, rate-limits requests, and writes to `leads`.
- **Appointment booking**
  - `/api/appointments` validates request, blocks weekend/taken slots, stores `requested` appointments, and sends emails.
  - `/api/appointments/availability` returns taken times for date-based slot checks.
- **Blog CMS flow**
  - Admin writes Markdown content, saves draft/published post via server actions, and revalidates `/blog`.
- **Media upload flow**
  - Authenticated admin requests signature at `/api/media/sign`, uploads directly to Cloudinary, then stores resulting URLs.

## 💡 Engineering Highlights
- Practical full-stack implementation with clear separation of public experience and internal operations
- Real-world data model with SQL migrations and policy-focused Supabase setup
- Security-conscious handling of server secrets and authenticated admin write operations
- Conversion-oriented backend workflows (lead intake + appointment scheduling)
- SEO and discoverability support via metadata, sitemap, robots, and structured data
- PWA readiness for installability/offline behavior
- Solid documentation baseline under `/docs` for onboarding and deployment

## ⚠ Challenges / Trade-offs
- No automated test suite is currently present in the repository.
- No GitHub Actions workflow is configured for CI validation.
- Some repository docs still reference planned phases that are now partially implemented.
- Current lead rate limiting is in-memory at API process level (simple MVP approach).

## 🗺 Roadmap
- Add automated tests for critical flows (lead submission, booking, blog publish)
- Add CI workflow for lint/build checks on pull requests
- Improve media and content governance (validation + editorial guardrails)
- Add polished screenshots and a short demo GIF for faster recruiter review
- Strengthen observability and operational runbooks for production readiness

## 👤 Author
- **GitHub:** https://github.com/Shahadat99x
- **Portfolio:** www.dhossain.com
- **LinkedIn:**https://linkedin.com/in/shahadat-ai
