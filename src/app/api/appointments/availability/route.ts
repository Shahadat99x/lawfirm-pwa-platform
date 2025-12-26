import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { env } from '@/lib/env'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const date = searchParams.get('date')

  if (!date) {
    return NextResponse.json({ error: 'Date is required' }, { status: 400 })
  }

  // Use service role to ensure we can see all appointments regardless of future policies
  // though for availability, we just need to know times
  const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY)

  const { data, error } = await supabase
    .from('appointments')
    .select('appointment_time')
    .eq('appointment_date', date)
    .in('status', ['requested', 'approved'])

  if (error) {
    console.error('Error fetching availability:', error)
    return NextResponse.json({ error: 'Failed to fetch availability' }, { status: 500 })
  }

  // extract times
  const takenSlots = data.map((a: { appointment_time: string }) => a.appointment_time.substring(0, 5)) // HH:MM

  return NextResponse.json({ takenSlots })
}
