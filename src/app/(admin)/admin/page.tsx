"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/browser"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Loader2, Users, CheckCircle, Clock, XCircle, Inbox } from "lucide-react"

export default function AdminDashboardPage() {
    const [metrics, setMetrics] = useState({
        total: 0,
        new: 0,
        contacted: 0,
        qualified: 0,
        won: 0,
        lost: 0,
        recent: 0 // last 7 days
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const supabase = createClient()

        async function fetchMetrics() {
            setLoading(true)
            const { data, error } = await supabase
                .from('leads')
                .select('status, created_at')

            if (!error && data) {
                const now = new Date()
                const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

                const stats = {
                    total: data.length,
                    new: data.filter(l => l.status === 'new').length,
                    contacted: data.filter(l => l.status === 'contacted').length,
                    qualified: data.filter(l => l.status === 'qualified').length,
                    won: data.filter(l => l.status === 'won').length,
                    lost: data.filter(l => l.status === 'lost').length,
                    recent: data.filter(l => new Date(l.created_at) > sevenDaysAgo).length
                }
                setMetrics(stats)
            }
            setLoading(false)
        }

        fetchMetrics()
    }, [])

    if (loading) {
        return <div className="p-8 flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-gray-400" /></div>
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold font-serif text-gray-900">Dashboard</h1>
                <p className="mt-2 text-gray-600">Overview of your lead generation performance.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{metrics.total}</div>
                        <p className="text-xs text-muted-foreground">{metrics.recent} in last 7 days</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">New Inquiries</CardTitle>
                        <Inbox className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{metrics.new}</div>
                        <p className="text-xs text-muted-foreground">Requires attention</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Qualified</CardTitle>
                        <CheckCircle className="h-4 w-4 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{metrics.qualified}</div>
                        <p className="text-xs text-muted-foreground">{((metrics.qualified / (metrics.total || 1)) * 100).toFixed(0)}% conversion rate</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Won Business</CardTitle>
                        <Users className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{metrics.won}</div>
                        <p className="text-xs text-muted-foreground">Clients signed</p>
                    </CardContent>
                </Card>
            </div>

            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <p className="text-sm text-gray-500 mb-4">
                    Manage your leads or update practice area content.
                </p>
                <div className="flex gap-4">
                    <a href="/admin/leads" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                        View All Leads
                    </a>
                </div>
            </div>
        </div>
    )
}
