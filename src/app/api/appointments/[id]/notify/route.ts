import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { env } from '@/lib/env'
import { sendMail } from '@/lib/email/mailer'
import { appointmentApproved, appointmentRejected } from '@/lib/email/templates'

export async function POST(req: NextRequest) { // removed params argument to avoid sync/async issues with Next 15/16
  const authHeader = req.headers.get('Authorization')
  
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const token = authHeader.split(' ')[1]
  const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  
  const { data: { user }, error: authError } = await supabase.auth.getUser(token)

  if (authError || !user) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }

  // Optional: check if user is actually an admin if you have a roles table or custom claims
  // For now, any authenticated user is considered admin per existing context

  try {
    const body = await req.json()
    const { action, rejection_reason, appointment_date, appointment_time, email, full_name } = body

    if (!email || !action) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
    }

    if (action === 'approved') {
      await sendMail({
        to: email,
        subject: 'Appointment Approved - LexNova Legal',
        html: appointmentApproved(full_name, appointment_date, appointment_time)
      })
    } else if (action === 'rejected') {
      await sendMail({
        to: email,
        subject: 'Update on Your Appointment Request',
        html: appointmentRejected(full_name, rejection_reason)
      })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Notify Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
