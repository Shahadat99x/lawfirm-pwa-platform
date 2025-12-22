import { createClient } from '@/lib/supabase/server'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { Badge } from '@/components/ui/Badge'
import { ItemActions } from '@/components/admin/ItemActions'
import { deleteTeamMember } from '@/app/actions/team'

export const dynamic = 'force-dynamic'

export default async function TeamPage() {
    const supabase = await createClient()
    const { data: team } = await supabase
        .from('lawyers')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false })

    return (
        <div className="space-y-6">
            <AdminHeader
                title="Team Members"
                description="Manage your team profiles."
                newLink="/admin/team/new"
                newLabel="Add Member"
            />

            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-700 border-b">
                            <tr>
                                <th className="py-3 px-6 font-medium">Order</th>
                                <th className="py-3 px-6 font-medium">Name / Title</th>
                                <th className="py-3 px-6 font-medium">Status</th>
                                <th className="py-3 px-6 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {(team || []).length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="py-12 text-center text-gray-500">
                                        No team members found.
                                    </td>
                                </tr>
                            ) : (
                                team!.map((member) => (
                                    <tr key={member.id} className="hover:bg-gray-50">
                                        <td className="py-4 px-6 w-20 text-gray-500 font-mono">
                                            {member.sort_order}
                                        </td>
                                        <td className="py-4 px-6 font-medium text-gray-900">
                                            <div className="flex items-center gap-3">
                                                {member.photo_url && (
                                                    <img src={member.photo_url} alt="" className="h-8 w-8 rounded-full object-cover bg-gray-100" />
                                                )}
                                                <div>
                                                    <div>{member.name}</div>
                                                    <div className="text-xs text-gray-500 font-normal">{member.title}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <Badge variant={member.is_active ? 'default' : 'secondary'}>
                                                {member.is_active ? 'Active' : 'Inactive'}
                                            </Badge>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <ItemActions
                                                id={member.id}
                                                editUrl={`/admin/team/${member.id}`}
                                                onDelete={deleteTeamMember}
                                                deleteConfirmMessage={`Delete ${member.name}?`}
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
