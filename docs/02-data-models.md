# Data Models

Planned Database: **Supabase (PostgreSQL)**

## Tables

### `practice_areas`
- `id`: uuid
- `slug`: text (unique)
- `title`: text
- `description`: text
- `icon_key`: text

### `blog_posts`
- `id`: uuid
- `slug`: text (unique)
- `title`: text
- `content_html`: text
- `excerpt`: text
- `status`: text ('draft', 'published')
- `published_at`: timestamp
- `author_id`: uuid

### `leads`
- `id`: uuid
- `created_at`: timestamp
- `name`: text
- `email`: text
- `phone`: text
- `service_interest`: text
- `message`: text
- `status`: text ('new', 'contacted', 'closed')

### `site_settings`
- `key`: text (primary)
- `value`: jsonb (flexible config)
