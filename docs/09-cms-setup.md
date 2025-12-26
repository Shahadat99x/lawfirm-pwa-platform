# Phase 5: Admin CMS & Blog Setup

## 1. Database Updates
We added new RLS policies to allow Administrative access to content tables (`blog_posts`, `practice_areas`, `lawyers`, `tests`, `site_settings`).
See `supabase/migrations/0006_blog_cms.sql` for details.

### Policies (Summary)
- **Insert/Update/Delete**: Allowed for `auth.role() = 'authenticated'` users (Admins).
- **Select**: Allowed for `authenticated` users (Admin/Dashboard view).

## 2. Cloudinary Integration
Images are hosted on Cloudinary.
- **Environment Variables**:
  - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
  - `CLOUDINARY_API_KEY`
  - `CLOUDINARY_API_SECRET`
  
- **Upload Flow**: 
  - Client requests signature from `/api/media/sign`.
  - Client uploads directly to Cloudinary using signature.
  - URL is stored in Supabase.

## 3. Admin Routes
- `/admin/blog`: List all posts (including drafts).
- `/admin/blog/new`: Create new markdown post.
- `/admin/blog/[id]`: Edit post.
- `/admin/settings`: Manage site settings (firm info).
- `/admin/services` & `/admin/team`: Placeholders for future extended CMS.

## 4. Markdown Rendering
- **Editor**: Custom Split-pane editor using `react-markdown` and `SimpleMDE` style logic in `src/components/admin/blog/MarkdownEditor.tsx`.
- **Public View**: Uses `@tailwindcss/typography` and `react-markdown` to render blog content.
