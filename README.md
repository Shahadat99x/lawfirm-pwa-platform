# LexNova Legal

**LexNova Legal** is a modern Progressive Web App (PWA) for a Lithuania-focused law firm, specializing in immigration, business setup, and employment law. This repository contains the source code for the public website, blog, and admin CMS.

## Features (Planned)
- 🚀 **High Performance**: Built on Next.js 15 (App Router) for optimal SEO and speed.
- 📱 **PWA Ready**: Installable on mobile devices.
- 📝 **Blog CMS**: Integration with Supabase/Markdown for legal updates.
- 🔒 **Admin Dashboard**: Secure management of posts and leads.
- 📨 **Lead Intake**: Optimized forms for client conversion.

## Tech Stack
- **Framework**: [Next.js](https://nextjs.org/) (TypeScript)
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel

## Local Setup

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd lawfirm-pwa-platform
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment**:
   Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```
   > Note: Functional keys are not required for Phase 0 (Scaffold).

4. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Validation
To ensure repository hygiene:
```bash
npm run lint    # Check for linting errors
npm run format  # Format code with Prettier
npm run build   # Verify production build
```

## Roadmap
- [x] **Phase 0**: Foundations, Scaffold, & Docs
- [ ] **Phase 1**: Landing Page & Core UI Components
- [ ] **Phase 2**: Blog System & CMS
- [ ] **Phase 3**: Services Pages & Lead Forms
- [ ] **Phase 4**: Admin Dashboard
- [ ] **Phase 5**: PWA Implementation
- [ ] **Phase 6**: SEO & Analytics
- [ ] **Phase 7**: Launch & Handover

## Screenshots
*(Coming soon in Phase 1)*
