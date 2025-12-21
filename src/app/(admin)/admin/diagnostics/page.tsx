"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/browser"
import { Button } from "@/components/ui/Button"
import { useSession } from "@/lib/auth/session"

export default function DiagnosticsPage() {
    const { user } = useSession()
    const [readResult, setReadResult] = useState<any>(null)
    const [insertResult, setInsertResult] = useState<any>(null)
    const [config, setConfig] = useState<any>({})

    useEffect(() => {
        // Safe exposure of non-secret config
        setConfig({
            url: process.env.NEXT_PUBLIC_SUPABASE_URL,
            hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        })
    }, [])

    async function testRead() {
        const supabase = createClient()
        const { data, error, count } = await supabase
            .from('leads')
            .select('id, created_at, full_name, email, status', { count: 'exact' })
            .limit(5)
            .order('created_at', { ascending: false })

        if (error) {
            setReadResult({ success: false, error })
        } else {
            setReadResult({ success: true, count, data })
        }
    }

    async function testInsert() {
        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    full_name: "Test Diagnostics Lead",
                    email: `test-${Date.now()}@example.com`,
                    phone: "123456789",
                    city: "Test City",
                    practice_area_slug: "business-setup",
                    message: "This is a test lead from the diagnostics page.",
                    gdpr_consent: true,
                    is_diagnostics: true // Optional flag if we wanted to handle differently
                })
            })
            const data = await res.json()
            setInsertResult({ status: res.status, data })
        } catch (err: any) {
            setInsertResult({ success: false, error: err.message })
        }
    }

    return (
        <div className="space-y-8 p-8 max-w-4xl">
            <h1 className="text-2xl font-bold font-serif text-red-600">Admin Diagnostics (DEV ONLY)</h1>

            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">1. Environment & Auth</h2>
                <pre className="bg-slate-900 text-slate-50 p-4 rounded text-xs overflow-x-auto">
                    {JSON.stringify({
                        supabaseUrl: config.url,
                        hasAnonKey: config.hasAnonKey,
                        userEmail: user?.email,
                        userId: user?.id,
                        authenticated: !!user
                    }, null, 2)}
                </pre>
            </div>

            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">2. Database Read Test (RLS Check)</h2>
                <div className="mb-4 text-sm text-gray-600">
                    Attempts to read top 5 leads using current user session.
                </div>
                <Button onClick={testRead}>Run Read Test</Button>
                {readResult && (
                    <div className="mt-4">
                        <h3 className="font-semibold text-sm mb-2">Result:</h3>
                        <pre className={`p-4 rounded text-xs overflow-x-auto ${readResult.success ? 'bg-green-50 text-green-900' : 'bg-red-50 text-red-900'}`}>
                            {JSON.stringify(readResult, null, 2)}
                        </pre>
                    </div>
                )}
            </div>

            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">3. API Insert Test (Service Role Check)</h2>
                <div className="mb-4 text-sm text-gray-600">
                    Attempts to POST to /api/leads which uses the server-side Service Role key.
                </div>
                <Button onClick={testInsert} variant="secondary">Run Insert Test</Button>
                {insertResult && (
                    <div className="mt-4">
                        <h3 className="font-semibold text-sm mb-2">Result:</h3>
                        <pre className={`p-4 rounded text-xs overflow-x-auto ${insertResult.data?.ok ? 'bg-green-50 text-green-900' : 'bg-red-50 text-red-900'}`}>
                            {JSON.stringify(insertResult, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    )
}
