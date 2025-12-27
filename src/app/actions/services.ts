'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export type ServiceData = {
    id?: string
    title: string
    slug?: string
    excerpt?: string
    content: string
    icon?: string
    is_published?: boolean
    sort_order?: number
}

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
        content: data.content,
        icon: data.icon,
        is_published: data.is_published ?? true,
        sort_order: data.sort_order ?? 0,
        updated_at: new Date().toISOString()
    }

    let error
    if (data.id) {
        const { error: updateError } = await adminSupabase
            .from('practice_areas')
            .update(payload)
            .eq('id', data.id)
        error = updateError
    } else {
        const { error: insertError } = await adminSupabase
            .from('practice_areas')
            .insert([payload])
        error = insertError
    }

    if (error) {
        console.error('Service Upsert Error:', error)
        if (error.code === 'PGRST204') {
            throw new Error('Database schema outdated. Missing columns (e.g. is_published). Please run migration 0008_practice_areas_update.sql.')
        }
        throw new Error(error.message)
    }

    revalidatePath('/services')
    revalidatePath('/admin/services')
    return { success: true }
}

export async function deleteService(id: string) {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) throw new Error('Unauthorized')

    const adminSupabase = createAdminClient()
    const { error } = await adminSupabase.from('practice_areas').delete().eq('id', id)
    
    if (error) throw new Error(error.message)

    revalidatePath('/services')
    revalidatePath('/admin/services')
    return { success: true }
}

export async function getServiceForEdit(id: string) {
    const supabase = await createClient() // Admin check
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return null
    }

    const adminSupabase = createAdminClient()
    const { data, error } = await adminSupabase
        .from('practice_areas')
        .select('*')
        .eq('id', id)
        .single()
    
    if (error) {
        console.error('[getServiceForEdit] Error fetching service:', error)
        return null
    }
    return data
}
