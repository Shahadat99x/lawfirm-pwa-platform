'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Edit2, Trash2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { deletePost } from '@/app/actions/blog'

interface BlogListActionsProps {
    postId: string
}

export function BlogListActions({ postId }: BlogListActionsProps) {
    const [isDeleting, setIsDeleting] = useState(false)
    const router = useRouter()

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) return

        setIsDeleting(true)
        try {
            await deletePost(postId)
            // Router refresh handled by server action revalidatePath, 
            // but we might want to ensure client state updates.
            router.refresh()
        } catch (error: any) {
            alert('Error deleting post: ' + error.message)
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <div className="flex items-center justify-end gap-2">
            <Link href={`/admin/blog/${postId}`}>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-blue-600">
                    <Edit2 className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                </Button>
            </Link>
            <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-500 hover:text-red-600"
                onClick={handleDelete}
                disabled={isDeleting}
            >
                {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                <span className="sr-only">Delete</span>
            </Button>
        </div>
    )
}
