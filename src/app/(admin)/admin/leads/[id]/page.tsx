"use client"

import { useEffect, useState, use } from "react"
import Link from "next/link"
import { notFound, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/browser"
import { Button } from "@/components/ui/Button"
import { Textarea } from "@/components/ui/Textarea"
import { Select } from "@/components/ui/Select"
import { Input } from "@/components/ui/Input"
import { Badge } from "@/components/ui/Badge"
import { LeadStatusBadge } from "@/components/admin/LeadStatusBadge"
import { Loader2, ArrowLeft, Save, MapPin, Mail, Phone, Calendar, Globe, User } from "lucide-react"

interface Lead {
    id: string
    full_name: string
    email: string
    phone: string | null
    city: string
    practice_area_slug: string
    message: string
    gdpr_consent: boolean
    source: string
    status: string
    created_at: string
    notes: string | null
    tags: string[] | null
}

export default function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const router = useRouter()
    const [lead, setLead] = useState<Lead | null>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    // Form State
    const [status, setStatus] = useState("")
    const [notes, setNotes] = useState("")
    const [tagInput, setTagInput] = useState("")
    const [tags, setTags] = useState<string[]>([])

    useEffect(() => {
        const supabase = createClient()
        async function fetchLead() {
            setLoading(true)
            const { data, error } = await supabase
                .from('leads')
                .select('*')
                .eq('id', id)
                .single()

            if (error) {
                console.error("Error fetching lead:", error)
                if (error.code === 'PGRST116') {
                    // Not found
                    return
                }
            } else if (data) {
                setLead(data)
                setStatus(data.status)
                setNotes(data.notes || "")
                setTags(data.tags || [])
            }
            setLoading(false)
        }
        fetchLead()
    }, [id])

    async function handleSave() {
        setSaving(true)
        const supabase = createClient()
        const { error } = await supabase
            .from('leads')
            .update({
                status,
                notes,
                tags
            })
            .eq('id', id)

        if (error) {
            alert("Failed to save updates: " + error.message)
        } else {
            // Optional: Show toast
            router.refresh()
        }
        setSaving(false)
    }

    function addTag(e: React.KeyboardEvent) {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault()
            if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()])
            }
            setTagInput("")
        }
    }

    function removeTag(tagToRemove: string) {
        setTags(tags.filter(t => t !== tagToRemove))
    }

    if (loading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
        )
    }

    if (!lead) {
        return (
            <div className="text-center py-24">
                <h2 className="text-xl font-semibold text-gray-900">Lead Not Found</h2>
                <Link href="/admin/leads" className="text-primary hover:underline mt-4 inline-block">
                    Return to Inbox
                </Link>
            </div>
        )
    }

    return (
        <div className="space-y-6 max-w-5xl mx-auto pb-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/admin/leads" className="p-2 rounded-full hover:bg-slate-100 text-gray-500">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold font-serif text-gray-900">{lead.full_name}</h1>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {new Date(lead.created_at).toLocaleString()}
                            <span className="mx-1">•</span>
                            {lead.practice_area_slug}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="default" onClick={handleSave} disabled={saving}>
                        {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                        Save Changes
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content: Message & Notes */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Inquiry Message</h3>
                        <div className="prose prose-sm max-w-none text-gray-700 bg-slate-50 p-4 rounded-md border border-slate-100">
                            {lead.message}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Internal Notes</h3>
                        <Textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={6}
                            placeholder="Add internal notes about this case..."
                            className="bg-yellow-50 border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400"
                        />
                    </div>
                </div>

                {/* Sidebar: Details & Metadata */}
                <div className="space-y-6">
                    {/* Status & Ops Card */}
                    <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Status & Action</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Current Status</label>
                                <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                                    <option value="new">New</option>
                                    <option value="contacted">Contacted</option>
                                    <option value="qualified">Qualified</option>
                                    <option value="won">Won</option>
                                    <option value="lost">Lost</option>
                                </Select>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Tags</label>
                                <Input
                                    placeholder="Add tag + Enter..."
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={addTag}
                                    className="mb-2"
                                />
                                <div className="flex flex-wrap gap-2">
                                    {tags.map(tag => (
                                        <Badge key={tag} variant="secondary" className="px-2 py-0.5 text-xs flex items-center gap-1">
                                            {tag}
                                            <button
                                                onClick={() => removeTag(tag)}
                                                className="ml-1 hover:text-red-500"
                                            >
                                                ×
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Detail Card */}
                    <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Contact Details</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-3">
                                <User className="h-4 w-4 text-gray-400 mt-0.5" />
                                <span className="text-gray-900 font-medium">{lead.full_name}</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail className="h-4 w-4 text-gray-400 mt-0.5" />
                                <a href={`mailto:${lead.email}`} className="text-primary hover:underline truncate">{lead.email}</a>
                            </li>
                            {lead.phone && (
                                <li className="flex items-start gap-3">
                                    <Phone className="h-4 w-4 text-gray-400 mt-0.5" />
                                    <a href={`tel:${lead.phone}`} className="text-gray-600 hover:text-gray-900">{lead.phone}</a>
                                </li>
                            )}
                            <li className="flex items-start gap-3">
                                <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                                <span className="text-gray-600">{lead.city}</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Globe className="h-4 w-4 text-gray-400 mt-0.5" />
                                <span className="text-gray-600 text-xs">Source: {lead.source}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
