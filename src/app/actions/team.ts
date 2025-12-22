'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export type TeamData = {
    id?: string
    name: string
    title: string
    slug?: string
    bio: string
    photo_url?: string
    languages?: string[]
    is_active?: boolean
    sort_order?: number
}

function generateSlug(name: string): string {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export async function upsertTeamMember(data: TeamData) {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) throw new Error('Unauthorized')

    const adminSupabase = createAdminClient()

    const slug = data.slug || generateSlug(data.name)

    const payload = {
        name: data.name,
        title: data.title,
        slug,
        bio: data.bio,
        photo_url: data.photo_url,
        languages: data.languages || [],
        is_active: data.is_active ?? true,
        sort_order: data.sort_order ?? 0,
        updated_at: new Date().toISOString()
    }

    let error
    if (data.id) {
        const { error: updateError } = await adminSupabase
            .from('lawyers')
            .update(payload)
            .eq('id', data.id)
        error = updateError
    } else {
        const { error: insertError } = await adminSupabase
            .from('lawyers')
            .insert([payload])
        error = insertError
    }

    if (error) {
        console.error('Team Member Upsert Error:', error)
        throw new Error(error.message)
    }

    revalidatePath('/team') // Public team page (check if it exists or uses /about)
    revalidatePath('/about') 
    revalidatePath('/admin/team')
    return { success: true }
}

export async function deleteTeamMember(id: string) {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) throw new Error('Unauthorized')

    const adminSupabase = createAdminClient()
    const { error } = await adminSupabase.from('lawyers').delete().eq('id', id)
    
    if (error) throw new Error(error.message)

    revalidatePath('/admin/team')
    revalidatePath('/team')
    return { success: true }
}

export async function getTeamMemberForEdit(id: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const adminSupabase = createAdminClient()
    const { data, error } = await adminSupabase
        .from('lawyers')
        .select('*')
        .eq('id', id)
        .single()
    
    if (error) return null
    return data
}
