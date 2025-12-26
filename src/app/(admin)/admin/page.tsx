"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/browser"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Loader2, Users, CheckCircle, Clock, XCircle, Inbox, Calendar } from "lucide-react"
import Link from "next/link"

export default function AdminDashboardPage() {
    const [metrics, setMetrics] = useState({
        leadsTotal: 0,
        leadsNew: 0,
        leadsWon: 0,
        appointmentsRequested: 0,
        appointmentsUpcoming: 0
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const supabase = createClient()

        async function fetchMetrics() {
            setLoading(true)

            // Leads
            const { data: leads } = await supabase
                .from('leads')
                .select('status')

            // Appointments
            const { data: appointments } = await supabase
                .from('appointments')
                .select('status, appointment_date')

            if (leads && appointments) {
                const today = new Date().toISOString().split('T')[0]

                setMetrics({
                    leadsTotal: leads.length,
                    leadsNew: leads.filter(l => l.status === 'new').length,
                    leadsWon: leads.filter(l => l.status === 'won').length,
                    appointmentsRequested: appointments.filter(a => a.status === 'requested').length,
                    appointmentsUpcoming: appointments.filter(a => a.status === 'approved' && a.appointment_date >= today).length
                })
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
                <p className="mt-2 text-gray-600">Overview of your lead generation and appointments.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Leads Cards */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">New Leads</CardTitle>
                        <Inbox className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{metrics.leadsNew}</div>
                        <p className="text-xs text-muted-foreground">Unread inquiries</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Appointment Requests</CardTitle>
                        <Clock className="h-4 w-4 text-yellow-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{metrics.appointmentsRequested}</div>
                        <p className="text-xs text-muted-foreground">Pending review</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
                        <Calendar className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{metrics.appointmentsUpcoming}</div>
                        <p className="text-xs text-muted-foreground">Approved future slots</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Lead Quick Actions</h2>
                    <div className="flex gap-4">
                        <Link href="/admin/leads" className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                            View All Leads
                        </Link>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Appointment Actions</h2>
                    <div className="flex gap-4">
                        <Link href="/admin/appointments" className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-slate-900 text-white hover:bg-slate-800 h-10 px-4 py-2">
                            Manage Appointments
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
