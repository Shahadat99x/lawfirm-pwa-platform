'use client'

import { useState } from 'react'
import { Trash2, Loader2, Edit2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface ItemActionsProps {
    id: string
    editUrl: string
    onDelete: (id: string) => Promise<any>
    deleteConfirmMessage?: string
}

export function ItemActions({ id, editUrl, onDelete, deleteConfirmMessage = "Are you sure?" }: ItemActionsProps) {
    const [isDeleting, setIsDeleting] = useState(false)
    const router = useRouter()

    const handleDelete = async () => {
        if (!confirm(deleteConfirmMessage)) return
        setIsDeleting(true)
        try {
            await onDelete(id)
            router.refresh()
        } catch (error: any) {
            alert('Error: ' + error.message)
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <div className="flex items-center justify-end gap-2">
            <Link href={editUrl}>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-blue-600">
                    <Edit2 className="h-4 w-4" />
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
            </Button>
        </div>
    )
}
