'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export type PostData = {
    id?: string
    title: string
    slug?: string
    excerpt: string
    content: string
    cover_image_url?: string
    status: 'draft' | 'published'
    tags?: string[]
    author?: string
}

export async function upsertPost(data: PostData) {
    const supabase = await createClient()
    
    // 1. Verify Authentication (using user session)
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) throw new Error('Unauthorized')

    // 2. Perform DB Write (using Admin Client to bypass RLS if policy not applied)
    const adminSupabase = createAdminClient()

    // Generate slug if missing
    let slug = data.slug
    if (!slug && data.title) {
        slug = data.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
    }

    const payload = {
        title: data.title,
        slug: slug,
        excerpt: data.excerpt,
        content: data.content,
        cover_image_url: data.cover_image_url,
        tags: data.tags || [],
        status: data.status,
        published_at: data.status === 'published' ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
        ...(data.id ? {} : { author: data.author || 'LexNova Team' }), 
        reading_time: Math.ceil(data.content.split(' ').length / 200) + ' min read'
    }

    let error
    if (data.id) {
        const { error: updateError } = await adminSupabase
            .from('blog_posts')
            .update(payload)
            .eq('id', data.id)
        error = updateError
    } else {
        const { error: insertError } = await adminSupabase
            .from('blog_posts')
            .insert([payload])
        error = insertError
    }

    if (error) {
        console.error('Blog Upsert Error:', error)
        throw new Error(error.message)
    }

    revalidatePath('/blog')
    revalidatePath('/admin/blog')
    return { success: true }
}

export async function deletePost(id: string) {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) throw new Error('Unauthorized')

    const adminSupabase = createAdminClient()
    const { error } = await adminSupabase.from('blog_posts').delete().eq('id', id)
    if (error) throw new Error(error.message)
    
    revalidatePath('/blog')
    revalidatePath('/admin/blog')
    return { success: true }
}

export async function getPostForEdit(id: string) {
    const supabase = await createClient()
    // For edit, we might need to read drafts, which might be blocked if RLS not applied.
    // Safest to use Admin client if auth checks out.
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) return null

    const adminSupabase = createAdminClient()
    const { data, error } = await adminSupabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single()
        
    if (error) return null
    return data
}
