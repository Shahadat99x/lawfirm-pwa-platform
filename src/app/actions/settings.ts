'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'
import { SiteSettings } from '@/types/content'

export async function getSettings() {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) return null

    const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .single()
        
    if (error) return null
    return data as SiteSettings
}

export async function updateSettings(settings: Partial<SiteSettings>) {
    const supabase = await createClient()
    
    // 1. Verify Authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) throw new Error('Unauthorized')

    // 2. Perform DB Write (Use Admin Client to be safe, though policies exist)
    const adminSupabase = createAdminClient()

    // Remove immutable fields if passing them
    const { id, ...dataToUpdate } = settings

    const { error } = await adminSupabase
        .from('site_settings')
        .upsert({ id: 1, ...dataToUpdate, updated_at: new Date().toISOString() })

    if (error) {
        console.error('Settings Update Error:', error)
        throw new Error(error.message)
    }

    revalidatePath('/admin/settings')
    revalidatePath('/') // Revalidate home as it might show phone/email
    return { success: true }
}
