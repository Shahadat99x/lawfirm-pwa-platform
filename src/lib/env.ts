/**
 * Environment Variable Validation
 * Lazy validation via getters to avoid import-time failures.
 * 
 * CRITICAL: This file uses lazy getters instead of immediate validation
 * to ensure env vars are only checked when actually accessed at runtime,
 * not during module import evaluation.
 */

/**
 * Client-safe environment variables (NEXT_PUBLIC_*)
 * These are safe to use in both server and client code.
 */
export const clientEnv = {
  get NEXT_PUBLIC_SUPABASE_URL(): string {
    const value = process.env.NEXT_PUBLIC_SUPABASE_URL
    if (!value) {
      throw new Error(
        '❌ Missing required environment variable: NEXT_PUBLIC_SUPABASE_URL'
      )
    }
    return value
  },

  get NEXT_PUBLIC_SUPABASE_ANON_KEY(): string {
    const value = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!value) {
      throw new Error(
        '❌ Missing required environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY'
      )
    }
    return value
  },

  get NEXT_PUBLIC_SITE_URL(): string {
    const value = process.env.NEXT_PUBLIC_SITE_URL
    if (!value) {
      throw new Error(
        '❌ Missing required environment variable: NEXT_PUBLIC_SITE_URL'
      )
    }
    return value
  },
}

/**
 * Server-only environment variables
 * These should NEVER be used in client code.
 * Import this only in API routes, Server Components, or server utilities.
 */
export const serverEnv = {
  get SUPABASE_SERVICE_ROLE_KEY(): string {
    const value = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!value) {
      throw new Error(
        '❌ Missing required environment variable: SUPABASE_SERVICE_ROLE_KEY'
      )
    }
    return value
  },

  get ADMIN_NOTIFY_EMAIL(): string | undefined {
    return process.env.ADMIN_NOTIFY_EMAIL
  },

  get SMTP_HOST(): string | undefined {
    return process.env.SMTP_HOST
  },

  get SMTP_PORT(): string | undefined {
    return process.env.SMTP_PORT
  },

  get SMTP_SECURE(): string | undefined {
    return process.env.SMTP_SECURE
  },

  get SMTP_USER(): string | undefined {
    return process.env.SMTP_USER
  },

  get SMTP_PASS(): string | undefined {
    return process.env.SMTP_PASS
  },

  get SMTP_FROM(): string | undefined {
    return process.env.SMTP_FROM
  },
}

/**
 * @deprecated Use `clientEnv` or `serverEnv` instead.
 * This export is kept temporarily for backwards compatibility
 * but will be removed in a future version.
 */
export const env = {
  get NEXT_PUBLIC_SUPABASE_URL() {
    return clientEnv.NEXT_PUBLIC_SUPABASE_URL
  },
  get NEXT_PUBLIC_SUPABASE_ANON_KEY() {
    return clientEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY
  },
  get NEXT_PUBLIC_SITE_URL() {
    return clientEnv.NEXT_PUBLIC_SITE_URL
  },
  get SUPABASE_SERVICE_ROLE_KEY() {
    return serverEnv.SUPABASE_SERVICE_ROLE_KEY
  },
  get ADMIN_NOTIFY_EMAIL() {
    return serverEnv.ADMIN_NOTIFY_EMAIL
  },
  get SMTP_HOST() {
    return serverEnv.SMTP_HOST
  },
  get SMTP_PORT() {
    return serverEnv.SMTP_PORT
  },
  get SMTP_SECURE() {
    return serverEnv.SMTP_SECURE
  },
  get SMTP_USER() {
    return serverEnv.SMTP_USER
  },
  get SMTP_PASS() {
    return serverEnv.SMTP_PASS
  },
  get SMTP_FROM() {
    return serverEnv.SMTP_FROM
  },
}
