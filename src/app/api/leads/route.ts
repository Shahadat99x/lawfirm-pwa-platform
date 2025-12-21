import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

// Simple in-memory rate limiter (Map<IP, Timestamp[]>)
// In production/serverless this would be Redis/KV, but sufficient for Phase 3 reqs.
const rateLimitMap = new Map<string, number[]>()
const RATE_LIMIT_WINDOW = 10 * 60 * 1000 // 10 minutes
const MAX_REQUESTS = 5

function isRateLimited(ip: string): boolean {
    const now = Date.now()
    const timestamps = rateLimitMap.get(ip) || []

    // Filter out old timestamps
    const validTimestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW)

    if (validTimestamps.length >= MAX_REQUESTS) return true

    validTimestamps.push(now)
    rateLimitMap.set(ip, validTimestamps)
    return false
}

export async function POST(request: NextRequest) {
    try {
        const ip = request.headers.get('x-forwarded-for') || 'unknown'

        if (isRateLimited(ip)) {
            return NextResponse.json(
                { ok: false, error: "Too many requests. Please try again later." },
                { status: 429 }
            )
        }

        const body = await request.json()
        const { full_name, email, phone, city, practice_area_slug, message, gdpr_consent, honeypot } = body

        // 1. Anti-spam: Honeypot check
        if (honeypot) {
            // Silent rejection - looks like success to bot
            return NextResponse.json({ ok: true })
        }

        // 2. Validation
        if (!full_name || full_name.length < 2 || full_name.length > 80) {
            return NextResponse.json({ ok: false, error: "Invalid name (2-80 chars)." }, { status: 400 })
        }
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ ok: false, error: "Invalid email address." }, { status: 400 })
        }
        if (!practice_area_slug) {
            return NextResponse.json({ ok: false, error: "Please select a service." }, { status: 400 })
        }
        if (!message || message.length < 20 || message.length > 2000) {
            return NextResponse.json({ ok: false, error: "Message too short/long (20-2000 chars)." }, { status: 400 })
        }
        if (!gdpr_consent) {
            return NextResponse.json({ ok: false, error: "GDPR consent required." }, { status: 400 })
        }
        if (!city) {
            return NextResponse.json({ ok: false, error: "City is required." }, { status: 400 })
        }

        // 3. Database Insert
        const supabase = createAdminClient()

        const { error: dbError } = await supabase.from('leads').insert({
            full_name,
            email,
            phone: phone ? phone.trim() : null,
            city,
            practice_area_slug,
            message,
            gdpr_consent,
            source: 'contact_page',
            status: 'new'
        })

        if (dbError) {
            console.error('Supabase Insert Error:', dbError)
            // Generic error for client
            return NextResponse.json({ ok: false, error: "Failed to submit. Please contact us directly." }, { status: 500 })
        }

        // 4. Optional: Email Notification (Placeholder)
        // if (env.RESEND_API_KEY) { await sendEmail(...) }

        return NextResponse.json({ ok: true })

    } catch (error) {
        console.error('API Error:', error)
        return NextResponse.json({ ok: false, error: "Internal Server Error" }, { status: 500 })
    }
}
