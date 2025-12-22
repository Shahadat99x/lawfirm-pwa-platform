'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'
import { PracticeArea } from '@/types/content'

export type ServiceData = {
    id?: string
    title: string
    slug: string
    excerpt?: string
    content: string
    icon?: string
    is_published?: boolean
    sort_order?: number
}

// Helper to generate slug
function generateSlug(title: string): string {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export async function upsertService(data: ServiceData) {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) throw new Error('Unauthorized')

    const adminSupabase = createAdminClient()

    const slug = data.slug || generateSlug(data.title)

    const payload = {
        title: data.title,
        slug,
        excerpt: data.excerpt,
        content: data.content, // mapped to content column, schema has content_markdown? check schema.
        // Schema from 0001_init.sql says `content text NOT NULL`.
        icon: data.icon, // using as image_url placeholder or actual icon
        // Schema doesn't have is_published or sort_order on practice_areas in 0001_init.sql?
        // Let's re-read 0001_init.sql carefully.
        // 0001_init.sql: id, title, slug, excerpt, content, icon, created_at, updated_at.
        // Missing: is_published, sort_order.
        // I need a migration to add these if required by the plan.
        // Plan says: is_published boolean, sort_order int.
        updated_at: new Date().toISOString()
    }
    
    // Create migration for missing columns first!
    // I will return an error here to prompt self to create migration.
    // Actually, I can just do the migration in the next step.
    
    // For now, let's assume I'll add them.
}
