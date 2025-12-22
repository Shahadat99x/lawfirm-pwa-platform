import { getTestimonialForEdit } from '@/app/actions/testimonials'
import { TestimonialEditor } from '@/components/admin/testimonials/TestimonialEditor'
import { notFound } from 'next/navigation'

interface PageProps {
    params: { id: string }
}

export default async function EditTestimonialPage({ params }: PageProps) {
    const { id } = await params
    const testimonial = await getTestimonialForEdit(id)
    if (!testimonial) notFound()

    return <TestimonialEditor testimonial={testimonial} />
}
