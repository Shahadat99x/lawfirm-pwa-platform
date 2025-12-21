/**
 * Environment Variable Accessor
 * Ensures all required environment variables are present before starting the app (or accessing them).
 * Throws helpful errors if missing.
 */

const requiredServerEnv = [
    'SUPABASE_SERVICE_ROLE_KEY',
    'CLOUDINARY_CLOUD_NAME',
    'CLOUDINARY_API_KEY',
    'CLOUDINARY_API_SECRET',
    'RESEND_API_KEY',
] as const

const requiredClientEnv = [
    'NEXT_PUBLIC_SITE_URL',
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
] as const



/**
 * Validates existence of server-side environment variables.
 * Should be called in server contexts.
 */
export function validateEnv() {
    if (typeof window !== 'undefined') return // Skip on client

    const missing: string[] = []

    for (const key of requiredServerEnv) {
        if (!process.env[key]) {
            missing.push(key)
        }
    }

    for (const key of requiredClientEnv) {
        if (!process.env[key]) {
            missing.push(key)
        }
    }

    if (missing.length > 0) {
        throw new Error(
            `❌ Missing required environment variables:\n${missing.join('\n')}\nHave you configured .env.local?`
        )
    }
}

// Export typed accessors (optional helper, or just use process.env directly after validation)
export const env = {
    // Client
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL!,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,

    // Server
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY!,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME!,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY!,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET!,
    RESEND_API_KEY: process.env.RESEND_API_KEY!,
}
