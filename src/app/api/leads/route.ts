import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { env } from '@/lib/env'

// Simple in-memory rate limiter (Map<IP, Timestamp[]>)
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

        type LeadPayload = {
            full_name?: string
            email?: string
            phone?: string
            city?: string
            practice_area_slug?: string
            message?: string
            gdpr_consent?: boolean
            honeypot?: string
        }

        let body: LeadPayload
        try {
            body = await request.json()
        } catch (parseError) {
            console.error('[API/Leads] Invalid JSON payload:', parseError)
            return NextResponse.json(
                { ok: false, error: "Invalid JSON payload." },
                { status: 400 }
            )
        }

        const { full_name, email, phone, city, practice_area_slug, message, gdpr_consent, honeypot } = body

        // 1. Anti-spam: Honeypot & Validation
        if (honeypot) return NextResponse.json({ ok: true })
        if (!full_name || full_name.length < 2) return NextResponse.json({ ok: false, error: "Invalid name." }, { status: 400 })
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ ok: false, error: "Invalid email." }, { status: 400 })
        if (!practice_area_slug) return NextResponse.json({ ok: false, error: "Service required." }, { status: 400 })
        if (!message || message.length < 20) return NextResponse.json({ ok: false, error: "Message too short." }, { status: 400 })
        if (!gdpr_consent) return NextResponse.json({ ok: false, error: "Consent required." }, { status: 400 })

        // 2. Database Insert
        // Debug Log (Server only)
        console.log(`[API/Leads] Inserting lead using URL: ${env.NEXT_PUBLIC_SUPABASE_URL}`)

        const supabase = createAdminClient()

        const { data: insertedData, error: dbError } = await supabase.from('leads').insert({
            full_name,
            email,
            phone: phone ? phone.trim() : null,
            city,
            practice_area_slug,
            message,
            gdpr_consent,
            source: 'contact_page',
            status: 'new'
        }).select().single()

        if (dbError) {
            console.error('[API/Leads] Supabase Insert Error:', dbError)
            return NextResponse.json({
                ok: false,
                error: dbError.message
            }, { status: 500 })
        }

        console.log(`[API/Leads] Success. ID: ${insertedData?.id}`)
        return NextResponse.json({ ok: true })

    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown'
        console.error('[API/Leads] Internal Error:', error)
        return NextResponse.json({
            ok: false,
            error: `Internal Server Error: ${message}`
        }, { status: 500 })
    }
}
