'use client'

import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface AdminHeaderProps {
    title: string
    description?: string
    newLink: string
    newLabel?: string
}

export function AdminHeader({ title, description, newLink, newLabel = 'Create New' }: AdminHeaderProps) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
                {description && <p className="text-muted-foreground text-gray-500">{description}</p>}
            </div>
            <Link href={newLink}>
                <Button className="w-full sm:w-auto">
                    <Plus className="mr-2 h-4 w-4" /> {newLabel}
                </Button>
            </Link>
        </div>
    )
}
