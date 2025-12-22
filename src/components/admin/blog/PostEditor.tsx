'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { upsertPost } from '@/app/actions/blog'
import { MarkdownEditor } from '@/components/admin/blog/MarkdownEditor'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Badge } from '@/components/ui/Badge'
import { Loader2, ArrowLeft, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'
import { Modal } from '@/components/ui/Modal'
import { MediaPicker } from '@/components/admin/MediaPicker'
import { cn } from '@/lib/utils'

interface PostEditorProps {
    post?: {
        id: string
        title: string
        slug: string
        excerpt: string
        content: string
        cover_image_url?: string
        status: 'draft' | 'published'
        tags?: string[]
        author?: string
    }
}

export function PostEditor({ post }: PostEditorProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [title, setTitle] = useState(post?.title || '')
    const [slug, setSlug] = useState(post?.slug || '')
    const [excerpt, setExcerpt] = useState(post?.excerpt || '')
    const [content, setContent] = useState(post?.content || '')
    const [coverImage, setCoverImage] = useState(post?.cover_image_url || '')
    const [status, setStatus] = useState<'draft' | 'published'>(post?.status || 'draft')

    const [showCoverModal, setShowCoverModal] = useState(false)
    const router = useRouter()

    const handleSave = async (newStatus?: 'draft' | 'published') => {
        if (!title) return alert('Title is required')

        setIsLoading(true)
        try {
            await upsertPost({
                id: post?.id,
                title,
                slug: slug || undefined,
                excerpt,
                content,
                cover_image_url: coverImage,
                status: newStatus || status
            })
            router.push('/admin/blog')
            router.refresh()
        } catch (error) {
            alert('Error saving post: ' + (error instanceof Error ? error.message : 'Unknown error'))
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between sticky top-0 z-10 bg-white/80 backdrop-blur-md py-4 border-b -mx-4 px-4 sm:-mx-8 sm:px-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin/blog" className="text-gray-500 hover:text-gray-900 transition-colors">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-gray-900">
                            {post ? 'Edit Post' : 'New Post'}
                        </h1>
                        <p className="text-xs text-gray-500">
                            {status === 'published' ? 'Live on site' : 'Draft mode'}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        onClick={() => handleSave('draft')}
                        disabled={isLoading}
                    >
                        Save Draft
                    </Button>
                    <Button
                        onClick={() => handleSave('published')}
                        disabled={isLoading}
                        className={status === 'published' ? "bg-green-600 hover:bg-green-700" : ""}
                    >
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {status === 'published' ? 'Update' : 'Publish'}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
                <div className="lg:col-span-2 space-y-6">
                    <div className="space-y-4">
                        <Input
                            placeholder="Post Title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            className="text-3xl font-bold p-4 h-auto border-transparent hover:border-gray-200 focus:border-primary transition-all placeholder:font-normal"
                        />
                        <div className="flex items-center gap-2 text-sm text-gray-500 px-4">
                            <span className="shrink-0">/blog/</span>
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
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-gray-900 block">Excerpt</label>
                            <Textarea
                                value={excerpt}
                                onChange={e => setExcerpt(e.target.value)}
                                className="h-28 text-sm resize-none"
                                placeholder="Short summary for preview cards (SEO)..."
                            />
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-gray-900 block">Cover Image</label>
                                {coverImage && (
                                    <button onClick={() => setCoverImage('')} className="text-xs text-red-500 hover:underline">Remove</button>
                                )}
                            </div>
                            <div
                                className={cn(
                                    "border-2 border-dashed rounded-xl overflow-hidden text-center cursor-pointer transition-all aspect-video flex flex-col items-center justify-center relative group",
                                    coverImage ? "border-transparent" : "border-gray-200 hover:border-primary/50 hover:bg-gray-50"
                                )}
                                onClick={() => setShowCoverModal(true)}
                            >
                                {coverImage ? (
                                    <>
                                        <img src={coverImage} alt="Cover" className="object-cover w-full h-full" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium">
                                            Change Image
                                        </div>
                                    </>
                                ) : (
                                    <div className="py-8 text-gray-400">
                                        <ImageIcon className="h-10 w-10 mx-auto mb-2 opacity-50" />
                                        <span className="text-sm">Add Cover</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal isOpen={showCoverModal} onClose={() => setShowCoverModal(false)} title="Select Cover Image">
                <MediaPicker onSelect={(url) => { setCoverImage(url); setShowCoverModal(false) }} onCancel={() => setShowCoverModal(false)} />
            </Modal>
        </div>
    )
}
