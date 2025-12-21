"use client"

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/browser'
import type { User } from '@supabase/supabase-js'

export function useSession() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const supabase = createClient()

        async function getUser() {
            const { data: { session }, error } = await supabase.auth.getSession()
            if (session) {
                setUser(session.user)
            }
            setLoading(false)
        }

        getUser()

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
            setLoading(false)
        })

        return () => subscription.unsubscribe()
    }, [])

    return { user, loading }
}
