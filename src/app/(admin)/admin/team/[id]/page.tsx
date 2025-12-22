import { getTeamMemberForEdit } from '@/app/actions/team'
import { TeamEditor } from '@/components/admin/team/TeamEditor'
import { notFound } from 'next/navigation'

interface PageProps {
    params: { id: string }
}

export default async function EditTeamMemberPage({ params }: PageProps) {
    const member = await getTeamMemberForEdit(params.id)
    if (!member) notFound()

    return <TeamEditor member={member} />
}
