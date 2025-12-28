import { createClient } from '@supabase/supabase-js'
import { clientEnv, serverEnv } from '@/lib/env'

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
        clientEnv.NEXT_PUBLIC_SUPABASE_URL,
        serverEnv.SUPABASE_SERVICE_ROLE_KEY,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
        }
    )
}
