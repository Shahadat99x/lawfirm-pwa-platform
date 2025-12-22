import { createClient } from '@/lib/supabase/server'
import { PostEditor } from '@/components/admin/blog/PostEditor'
import { notFound } from 'next/navigation'

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function EditPostPage({ params }: PageProps) {
    const { id } = await params
    const supabase = await createClient()
    const { data: post } = await supabase.from('blog_posts').select('*').eq('id', id).single()

    if (!post) notFound()

    return <PostEditor post={post} />
}
