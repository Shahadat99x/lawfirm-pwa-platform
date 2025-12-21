# Architecture

## Tech Stack
- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database / Auth**: Supabase
- **Media**: Cloudinary (optimized image delivery)
- **Deployment**: Vercel

## Rendering Strategy
- **Marketing Pages**: Statically Generated (SSG) or ISR for performance.
- **Blog**: ISR (Incremental Static Regeneration) for SEO + freshness.
- **Admin**: Client-side rendering (CSR) or Server Components with dynamic data.

## Security
- **Supabase RLS**: Row Level Security enabled on all tables.
- **Environment**: Server-only secrets (`SUPABASE_SERVICE_ROLE_KEY`) never exposed.
- **Forms**: Server Actions with Zod validation.
