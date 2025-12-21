import { createClient } from '@supabase/supabase-js'
import { env } from '@/lib/env'

/**
 * Creates a Supabase client with SERVICE ROLE privileges.
 * This must ONLY be used in server-side contexts (API routes, Server Actions).
 * NEVER expose this to the client.
 */
export function createAdminClient() {
    if (typeof window !== 'undefined') {
        throw new Error('❌ createAdminClient called in browser context! Security violation.')
    }

    return createClient(
        env.NEXT_PUBLIC_SUPABASE_URL,
        env.SUPABASE_SERVICE_ROLE_KEY,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
        }
    )
}
