import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { env } from '@/lib/env'
import { sendMail } from '@/lib/email/mailer'
import { appointmentRequested, adminNewAppointmentNotification } from '@/lib/email/templates'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      full_name,
      email,
      phone,
      practice_area_slug,
      message,
      gdpr_consent,
      appointment_date,
      appointment_time,
    } = body

    // 1. Validation
    if (!full_name || !email || !appointment_date || !appointment_time || !practice_area_slug || !gdpr_consent) {
      return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 })
    }

    // Basic date validation (future, weekday) - optional, can rely on client but good to have
    const dateObj = new Date(appointment_date)
    const day = dateObj.getDay()
    if (day === 0 || day === 6) {
       return NextResponse.json({ ok: false, error: 'Appointments available on weekdays only' }, { status: 400 })
    }

    // 2. Conflict Check
    const supabaseAdmin = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY)
    
    const { data: existing } = await supabaseAdmin
      .from('appointments')
      .select('id')
      .eq('appointment_date', appointment_date)
      .eq('appointment_time', appointment_time)
      .in('status', ['requested', 'approved'])
      .maybeSingle()

    if (existing) {
      return NextResponse.json({ ok: false, error: 'Slot already taken' }, { status: 409 })
    }

    // 3. Insert
    const { data: newAppointment, error: insertError } = await supabaseAdmin
      .from('appointments')
      .insert({
        full_name,
        email,
        phone,
        practice_area_slug,
        message,
        gdpr_consent,
        appointment_date,
        appointment_time,
        status: 'requested'
      })
      .select()
      .single()

    if (insertError) {
      console.error('Insert error:', insertError)
      return NextResponse.json({ ok: false, error: 'Failed to create appointment' }, { status: 500 })
    }

    // 4. Send Emails (Non-blocking usually, but for MVP we wait or not? let's await to report errors if any)
    
    // To User
    await sendMail({
      to: email,
      subject: 'Appointment Request Received - LexNova Legal',
      html: appointmentRequested(full_name, appointment_date, appointment_time)
    })

    // To Admin
    if (env.ADMIN_NOTIFY_EMAIL) {
      await sendMail({
        to: env.ADMIN_NOTIFY_EMAIL,
        subject: 'New Appointment Request',
        html: adminNewAppointmentNotification(full_name, email, appointment_date, appointment_time, practice_area_slug)
      })
    }

    return NextResponse.json({ ok: true, id: newAppointment.id })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ ok: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
