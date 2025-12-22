'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export type TestimonialData = {
    id?: string
    name: string
    text: string
    rating: number
    country?: string
    is_published?: boolean
    sort_order?: number
}

export async function upsertTestimonial(data: TestimonialData) {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) throw new Error('Unauthorized')

    const adminSupabase = createAdminClient()

    const payload = {
        name: data.name,
        text: data.text,
        rating: data.rating || 5,
        country: data.country,
        is_published: data.is_published ?? true,
        sort_order: data.sort_order ?? 0,
        // updated_at not in schema for testimonials?
        // 0001_init.sql: created_at but no updated_at for testimonials.
    }

    let error
    if (data.id) {
        const { error: updateError } = await adminSupabase
            .from('testimonials')
            .update(payload)
            .eq('id', data.id)
        error = updateError
    } else {
        const { error: insertError } = await adminSupabase
            .from('testimonials')
            .insert([payload])
        error = insertError
    }

    if (error) {
        console.error('Testimonial Upsert Error:', error)
        throw new Error(error.message)
    }

    revalidatePath('/') // Revalidate home page
    revalidatePath('/admin/testimonials')
    return { success: true }
}

export async function deleteTestimonial(id: string) {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) throw new Error('Unauthorized')

    const adminSupabase = createAdminClient()
    const { error } = await adminSupabase.from('testimonials').delete().eq('id', id)
    
    if (error) throw new Error(error.message)

    revalidatePath('/admin/testimonials')
    revalidatePath('/')
    return { success: true }
}

export async function getTestimonialForEdit(id: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const adminSupabase = createAdminClient()
    const { data, error } = await adminSupabase
        .from('testimonials')
        .select('*')
        .eq('id', id)
        .single()
    
    if (error) return null
    return data
}
