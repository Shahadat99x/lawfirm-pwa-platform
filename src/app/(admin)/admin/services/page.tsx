import { createClient } from '@/lib/supabase/server'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { Badge } from '@/components/ui/Badge'
import { ItemActions } from '@/components/admin/ItemActions'
import { deleteService } from '@/app/actions/services'

export const dynamic = 'force-dynamic'

export default async function ServicesPage() {
    const supabase = await createClient()
    const { data: services } = await supabase
        .from('practice_areas')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false })

    return (
        <div className="space-y-6">
            <AdminHeader
                title="Practice Areas"
                description="Manage the services you offer to clients."
                newLink="/admin/services/new"
                newLabel="New Practice Area"
            />

            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-700 border-b">
                            <tr>
                                <th className="py-3 px-6 font-medium">Order</th>
                                <th className="py-3 px-6 font-medium">Title</th>
                                <th className="py-3 px-6 font-medium">Status</th>
                                <th className="py-3 px-6 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {(services || []).length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="py-12 text-center text-gray-500">
                                        No practice areas found.
                                    </td>
                                </tr>
                            ) : (
                                services!.map((service) => (
                                    <tr key={service.id} className="hover:bg-gray-50">
                                        <td className="py-4 px-6 w-20 text-gray-500 font-mono">
                                            {service.sort_order}
                                        </td>
                                        <td className="py-4 px-6 font-medium text-gray-900">
                                            {service.title}
                                            <div className="text-xs text-gray-500 font-normal mt-1 truncate max-w-md">
                                                /{service.slug}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <Badge variant={service.is_published ? 'default' : 'secondary'}>
                                                {service.is_published ? 'Published' : 'Draft'}
                                            </Badge>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <ItemActions
                                                id={service.id}
                                                editUrl={`/admin/services/${service.id}`}
                                                onDelete={deleteService}
                                                deleteConfirmMessage="Delete this practice area?"
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
