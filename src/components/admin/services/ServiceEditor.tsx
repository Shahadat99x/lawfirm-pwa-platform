'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { upsertService } from '@/app/actions/services'
import { MarkdownEditor } from '@/components/admin/blog/MarkdownEditor'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Loader2, ArrowLeft, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'
import { Modal } from '@/components/ui/Modal'
import { MediaPicker } from '@/components/admin/MediaPicker'
import { cn } from '@/lib/utils'

interface ServiceEditorProps {
    service?: {
        id: string
        title: string
        slug: string
        excerpt: string
        content: string
        icon?: string
        is_published: boolean
        sort_order: number
    }
}

export function ServiceEditor({ service }: ServiceEditorProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [title, setTitle] = useState(service?.title || '')
    const [slug, setSlug] = useState(service?.slug || '')
    const [excerpt, setExcerpt] = useState(service?.excerpt || '')
    const [content, setContent] = useState(service?.content || '')
    const [icon, setIcon] = useState(service?.icon || '')
    const [isPublished, setIsPublished] = useState(service?.is_published ?? true)
    const [sortOrder, setSortOrder] = useState(service?.sort_order ?? 0)

    const [showIconModal, setShowIconModal] = useState(false)
    const router = useRouter()

    const handleSave = async () => {
        if (!title) return alert('Title is required')

        setIsLoading(true)
        try {
            await upsertService({
                id: service?.id,
                title,
                slug: slug || undefined,
                excerpt,
                content,
                icon,
                is_published: isPublished,
                sort_order: sortOrder
            })
            router.push('/admin/services')
            router.refresh()
        } catch (error) {
            alert('Error saving service: ' + (error instanceof Error ? error.message : 'Unknown error'))
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between sticky top-0 z-10 bg-white/80 backdrop-blur-md py-4 border-b -mx-4 px-4 sm:-mx-8 sm:px-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin/services" className="text-gray-500 hover:text-gray-900 transition-colors">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-gray-900">
                            {service ? 'Edit Practice Area' : 'New Practice Area'}
                        </h1>
                        <p className="text-xs text-gray-500">
                            Manage services offered by the firm
                        </p>
                    </div>
                </div>
                <Button onClick={handleSave} disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Changes
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
                <div className="lg:col-span-2 space-y-6">
                    <div className="space-y-4">
                        <Input
                            placeholder="Service Title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            className="text-3xl font-bold p-4 h-auto border-transparent hover:border-gray-200 focus:border-primary transition-all placeholder:font-normal"
                        />
                        <div className="flex items-center gap-2 text-sm text-gray-500 px-4">
                            <span className="shrink-0">/services/</span>
                            <Input
                                value={slug}
                                onChange={e => setSlug(e.target.value)}
                                className="h-7 text-xs font-mono bg-transparent border-transparent hover:border-gray-200 focus:bg-white w-full max-w-md"
                                placeholder="url-slug-auto-generated"
                            />
                        </div>
                    </div>

                    <MarkdownEditor value={content} onChange={setContent} label="Content" />
                </div>

                <div className="space-y-6">
                    <div className="bg-white p-5 rounded-xl border shadow-sm space-y-6 sticky top-24">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-900">Published</label>
                            <input
                                type="checkbox"
                                checked={isPublished}
                                onChange={e => setIsPublished(e.target.checked)}
                                className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-medium text-gray-900 block">Short Excerpt</label>
                            <Textarea
                                value={excerpt}
                                onChange={e => setExcerpt(e.target.value)}
                                className="h-28 text-sm resize-none"
                                placeholder="Brief description for homepage..."
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-medium text-gray-900 block">Sort Order</label>
                            <Input
                                type="number"
                                value={sortOrder}
                                onChange={e => setSortOrder(parseInt(e.target.value) || 0)}
                            />
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-gray-900 block">Cover Image</label>
                                {icon && (
                                    <button onClick={() => setIcon('')} className="text-xs text-red-500 hover:underline">Remove</button>
                                )}
                            </div>
                            <div
                                className={cn(
                                    "border-2 border-dashed rounded-xl overflow-hidden text-center cursor-pointer transition-all aspect-video flex flex-col items-center justify-center relative group",
                                    icon ? "border-transparent" : "border-gray-200 hover:border-primary/50 hover:bg-gray-50"
                                )}
                                onClick={() => setShowIconModal(true)}
                            >
                                {icon ? (
                                    <>
                                        <img src={icon} alt="Cover" className="object-cover w-full h-full" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium">
                                            Change Image
                                        </div>
                                    </>
                                ) : (
                                    <div className="py-8 text-gray-400">
                                        <ImageIcon className="h-10 w-10 mx-auto mb-2 opacity-50" />
                                        <span className="text-sm">Add Image</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal isOpen={showIconModal} onClose={() => setShowIconModal(false)} title="Select Image">
                <MediaPicker onSelect={(url) => { setIcon(url); setShowIconModal(false) }} onCancel={() => setShowIconModal(false)} />
            </Modal>
        </div>
    )
}
