import { createClient } from '@/lib/supabase/server'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { Badge } from '@/components/ui/Badge'
import { ItemActions } from '@/components/admin/ItemActions'
import { deleteTestimonial } from '@/app/actions/testimonials'
import { Star } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function TestimonialsPage() {
    const supabase = await createClient()
    const { data: testimonials } = await supabase
        .from('testimonials')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false })

    return (
        <div className="space-y-6">
            <AdminHeader
                title="Testimonials"
                description="Manage client reviews."
                newLink="/admin/testimonials/new"
                newLabel="New Testimonial"
            />

            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-700 border-b">
                            <tr>
                                <th className="py-3 px-6 font-medium">Client</th>
                                <th className="py-3 px-6 font-medium">Rating</th>
                                <th className="py-3 px-6 font-medium">Status</th>
                                <th className="py-3 px-6 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {(testimonials || []).length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="py-12 text-center text-gray-500">
                                        No testimonials found.
                                    </td>
                                </tr>
                            ) : (
                                testimonials!.map((t) => (
                                    <tr key={t.id} className="hover:bg-gray-50">
                                        <td className="py-4 px-6 font-medium text-gray-900 max-w-xs truncate">
                                            {t.name}
                                            <div className="text-xs text-gray-500 font-normal">{t.country}</div>
                                        </td>
                                        <td className="py-4 px-6 text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <span className="font-semibold text-gray-900">{t.rating}</span>
                                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <Badge variant={t.is_published ? 'default' : 'secondary'}>
                                                {t.is_published ? 'Published' : 'Hidden'}
                                            </Badge>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <ItemActions
                                                id={t.id}
                                                editUrl={`/admin/testimonials/${t.id}`}
                                                onDelete={deleteTestimonial}
                                                deleteConfirmMessage="Delete this testimonial?"
                                            />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
