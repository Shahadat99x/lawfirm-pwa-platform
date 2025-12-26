"use client"

import { useEffect, useState, use } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/browser"
import { Button } from "@/components/ui/Button"
import { Textarea } from "@/components/ui/Textarea"
import { ArrowLeft, Check, X, Calendar, Clock, Mail, Phone, MessageSquare, Loader2 } from "lucide-react"
import Link from "next/link"

interface Appointment {
    id: string
    full_name: string
    email: string
    phone: string | null
    appointment_date: string
    appointment_time: string
    practice_area_slug: string
    message: string | null
    status: string
    gdpr_consent: boolean
    created_at: string
    rejection_reason?: string
}

export default function AppointmentDetailPage(props: { params: Promise<{ id: string }> }) {
    const params = use(props.params)
    const router = useRouter()
    const [appointment, setAppointment] = useState<Appointment | null>(null)
    const [loading, setLoading] = useState(true)
    const [actionLoading, setActionLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Rejection Modal State
    const [showRejectModal, setShowRejectModal] = useState(false)
    const [rejectionReason, setRejectionReason] = useState("")

    useEffect(() => {
        const supabase = createClient()
        async function fetchAppointment() {
            setLoading(true)
            const { data, error } = await supabase
                .from('appointments')
                .select('*')
                .eq('id', params.id)
                .single()

            if (error) {
                console.error(error)
                setError("Failed to load appointment")
            } else {
                setAppointment(data)
            }
            setLoading(false)
        }
        fetchAppointment()
    }, [params.id])

    async function handleAction(action: 'approved' | 'rejected', reason?: string) {
        if (!appointment) return
        setActionLoading(true)
        setError(null)

        try {
            const supabase = createClient()

            // 1. Update DB (RLS allows update)
            const { error: updateError } = await supabase
                .from('appointments')
                .update({
                    status: action,
                    rejection_reason: reason || null,
                    updated_at: new Date().toISOString()
                })
                .eq('id', appointment.id)

            if (updateError) throw updateError

            // 2. Notify (Email)
            const session = await supabase.auth.getSession()
            const token = session.data.session?.access_token

            const notifyRes = await fetch(`/api/appointments/${appointment.id}/notify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    action,
                    rejection_reason: reason,
                    email: appointment.email,
                    full_name: appointment.full_name,
                    appointment_date: appointment.appointment_date,
                    appointment_time: appointment.appointment_time
                })
            })

            if (!notifyRes.ok) {
                console.error("Failed to send notification email")
                // Non-critical (?) but good to warn
            }

            // 3. Refresh
            setAppointment(prev => prev ? { ...prev, status: action, rejection_reason: reason } : null)
            setShowRejectModal(false)
            router.refresh()

        } catch (err: unknown) {
            console.error(err)
            if (err instanceof Error) {
                setError(err.message || "Action failed")
            } else {
                setError("Action failed")
            }
        } finally {
            setActionLoading(false)
        }
    }

    if (loading) return <div className="p-12"><Loader2 className="animate-spin h-8 w-8 text-gray-400" /></div>
    if (!appointment) return <div className="p-12">Appointment not found</div>

    return (
        <div className="space-y-6 max-w-4xl">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/admin/appointments" className="p-2 hover:bg-slate-100 rounded-full">
                    <ArrowLeft className="h-5 w-5 text-gray-500" />
                </Link>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold font-serif text-gray-900">
                        Appointment Details
                    </h1>
                    <p className="text-gray-500 text-sm">ID: {appointment.id}</p>
                </div>
                <div className="flex items-center gap-2">
                    {appointment.status === 'requested' && (
                        <>
                            <Button
                                onClick={() => handleAction('approved')}
                                disabled={actionLoading}
                                className="bg-green-600 hover:bg-green-700 text-white"
                            >
                                <Check className="mr-2 h-4 w-4" /> Approve
                            </Button>
                            <Button
                                onClick={() => setShowRejectModal(true)}
                                disabled={actionLoading}
                                variant="outline"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                            >
                                <X className="mr-2 h-4 w-4" /> Reject
                            </Button>
                        </>
                    )}
                    {appointment.status !== 'requested' && (
                        <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize 
                             ${appointment.status === 'approved' ? 'bg-green-100 text-green-800' :
                                appointment.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}
                         `}>
                            {appointment.status}
                        </span>
                    )}
                </div>
            </div>

            {error && (
                <div className="p-4 bg-red-50 text-red-700 rounded-md border border-red-200">
                    {error}
                </div>
            )}

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Left: Info */}
                <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-6">
                    <h3 className="font-semibold text-gray-900 border-b pb-2">Client Information</h3>

                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase">Full Name</label>
                            <div className="text-lg font-medium">{appointment.full_name}</div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                            <div>
                                <label className="text-xs font-semibold text-gray-500 uppercase">Email</label>
                                <div className="text-gray-900">{appointment.email}</div>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                            <div>
                                <label className="text-xs font-semibold text-gray-500 uppercase">Phone</label>
                                <div className="text-gray-900">{appointment.phone || 'N/A'}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Slots & Topic */}
                <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-6">
                    <h3 className="font-semibold text-gray-900 border-b pb-2">Appointment Details</h3>

                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <Calendar className="h-5 w-5 text-primary mt-0.5" />
                            <div>
                                <label className="text-xs font-semibold text-gray-500 uppercase">Date</label>
                                <div className="text-lg font-medium">{appointment.appointment_date}</div>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Clock className="h-5 w-5 text-primary mt-0.5" />
                            <div>
                                <label className="text-xs font-semibold text-gray-500 uppercase">Time</label>
                                <div className="text-lg font-medium">{appointment.appointment_time.substring(0, 5)}</div>
                            </div>
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase">Topic (Practice Area)</label>
                            <div className="inline-block mt-1 px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 text-sm font-medium">
                                {appointment.practice_area_slug}
                            </div>
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase">GDPR Consent</label>
                            <div className="text-sm">{appointment.gdpr_consent ? 'Yes' : 'No'}</div>
                        </div>
                    </div>
                </div>

                {/* Full Width: Message */}
                <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm md:col-span-2">
                    <h3 className="font-semibold text-gray-900 border-b pb-2 mb-4 flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-gray-400" /> Message from Client
                    </h3>
                    <div className="text-gray-700 whitespace-pre-wrap bg-slate-50 p-4 rounded-md">
                        {appointment.message || "No message provided."}
                    </div>
                </div>

                {/* Rejection Info if rejected */}
                {appointment.status === 'rejected' && appointment.rejection_reason && (
                    <div className="bg-red-50 p-6 rounded-lg border border-red-100 md:col-span-2">
                        <h3 className="font-semibold text-red-900 mb-2">Rejection Reason</h3>
                        <p className="text-red-800">{appointment.rejection_reason}</p>
                    </div>
                )}
            </div>

            {/* Rejection Modal */}
            {showRejectModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 space-y-4">
                        <h3 className="text-lg font-bold">Reject Appointment</h3>
                        <p className="text-sm text-gray-500">
                            Please provide a reason for rejection. This will be sent to the client via email.
                        </p>
                        <Textarea
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            placeholder="Reason for rejection (e.g. Schedule conflict, Outside of scope...)"
                            rows={3}
                        />
                        <div className="flex justify-end gap-3 pt-2">
                            <Button variant="ghost" onClick={() => setShowRejectModal(false)}>Cancel</Button>
                            <Button
                                variant="default"
                                onClick={() => handleAction('rejected', rejectionReason)}
                                disabled={actionLoading || !rejectionReason.trim()}
                                className="bg-red-600 hover:bg-red-700 text-white"
                            >
                                {actionLoading ? 'Rejecting...' : 'Confirm Reject'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
