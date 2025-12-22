import { getServiceForEdit } from '@/app/actions/services'
import { ServiceEditor } from '@/components/admin/services/ServiceEditor'
import { notFound } from 'next/navigation'

interface PageProps {
    params: { id: string }
}

export default async function EditServicePage({ params }: PageProps) {
    const { id } = await params
    const service = await getServiceForEdit(id)
    if (!service) notFound()

    return <ServiceEditor service={service} />
}
