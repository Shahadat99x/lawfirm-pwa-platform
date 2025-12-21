"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/browser"
import { Input } from "@/components/ui/Input"
import { Select } from "@/components/ui/Select"
import { LeadStatusBadge } from "@/components/admin/LeadStatusBadge"
import { Loader2, Search, AlertCircle } from "lucide-react"

interface Lead {
    id: string
    full_name: string
    email: string
    practice_area_slug: string
    status: string
    created_at: string
}

export default function LeadsPage() {
    const [leads, setLeads] = useState<Lead[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [filterStatus, setFilterStatus] = useState("all")
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        const supabase = createClient()
        async function fetchLeads() {
            setLoading(true)
            setError(null)

            try {
                const { data, error } = await supabase
                    .from('leads')
                    .select('id, full_name, email, practice_area_slug, status, created_at')
                    .order('created_at', { ascending: false })

                if (error) {
                    console.error("Error fetching leads:", error)
                    setError(error.message)
                } else {
                    setLeads(data || [])
                }
            } catch (err: any) {
                console.error("Unexpected error:", err)
                setError(err.message || "An unexpected error occurred")
            } finally {
                setLoading(false)
            }
        }
        fetchLeads()
    }, [])

    const filteredLeads = leads.filter(lead => {
        const matchesStatus = filterStatus === 'all' || lead.status === filterStatus
        const searchLower = searchQuery.toLowerCase()
        const matchesSearch = lead.full_name.toLowerCase().includes(searchLower) ||
            lead.email.toLowerCase().includes(searchLower)
        return matchesStatus && matchesSearch
    })

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-2xl font-bold font-serif text-gray-900">Leads Inbox</h1>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative flex items-center gap-2" role="alert">
                    <AlertCircle className="h-5 w-5" />
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                        placeholder="Search by name or email..."
                        className="pl-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="w-full sm:w-48">
                    <Select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="all">All Statuses</option>
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="won">Won</option>
                        <option value="lost">Lost</option>
                    </Select>
                </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="p-12 flex justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                    </div>
                ) : filteredLeads.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">
                        {error ? "Failed to load leads." : "No leads found matching your criteria."}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredLeads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(lead.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{lead.full_name}</div>
                                            <div className="text-sm text-gray-500">{lead.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {lead.practice_area_slug}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <LeadStatusBadge status={lead.status} />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link href={`/admin/leads/${lead.id}`} className="text-primary hover:text-indigo-900">
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}
