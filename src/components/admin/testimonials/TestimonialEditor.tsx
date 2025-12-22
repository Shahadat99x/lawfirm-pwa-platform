'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { upsertTestimonial } from '@/app/actions/testimonials'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Loader2, ArrowLeft, Star } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface TestimonialEditorProps {
    testimonial?: {
        id: string
        name: string
        text: string
        rating: number
        country?: string
        is_published: boolean
        sort_order: number
    }
}

export function TestimonialEditor({ testimonial }: TestimonialEditorProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [name, setName] = useState(testimonial?.name || '')
    const [text, setText] = useState(testimonial?.text || '')
    const [rating, setRating] = useState(testimonial?.rating || 5)
    const [country, setCountry] = useState(testimonial?.country || '')
    const [isPublished, setIsPublished] = useState(testimonial?.is_published ?? true)
    const [sortOrder, setSortOrder] = useState(testimonial?.sort_order ?? 0)

    const router = useRouter()

    const handleSave = async () => {
        if (!name) return alert('Name is required')
        if (!text) return alert('Feedback is required')

        setIsLoading(true)
        try {
            await upsertTestimonial({
                id: testimonial?.id,
                name,
                text,
                rating,
                country,
                is_published: isPublished,
                sort_order: sortOrder
            })
            router.push('/admin/testimonials')
            router.refresh()
        } catch (error) {
            alert('Error saving testimonial: ' + (error instanceof Error ? error.message : 'Unknown error'))
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between sticky top-0 z-10 bg-white/80 backdrop-blur-md py-4 border-b -mx-4 px-4 sm:-mx-8 sm:px-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin/testimonials" className="text-gray-500 hover:text-gray-900 transition-colors">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-gray-900">
                            {testimonial ? 'Edit Testimonial' : 'New Testimonial'}
                        </h1>
                        <p className="text-xs text-gray-500">
                            Client success stories
                        </p>
                    </div>
                </div>
                <Button onClick={handleSave} disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Testimonial
                </Button>
            </div>

            <div className="max-w-2xl mx-auto space-y-8 pb-20">
                <div className="bg-white p-6 rounded-xl border shadow-sm space-y-6">
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-900">Client Name</label>
                                <Input
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    placeholder="e.g. John Doe"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-900">Country / Location</label>
                                <Input
                                    value={country}
                                    onChange={e => setCountry(e.target.value)}
                                    placeholder="e.g. Lithuania"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-900">Rating</label>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        className={cn("focus:outline-none transition-transform hover:scale-110", star <= rating ? "text-yellow-400" : "text-gray-200")}
                                    >
                                        <Star className="h-8 w-8 fill-current" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-900">Feedback</label>
                            <Textarea
                                value={text}
                                onChange={e => setText(e.target.value)}
                                className="h-40 text-base"
                                placeholder="What did the client say?"
                            />
                        </div>
                    </div>

                    <div className="pt-4 border-t grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-900 block">Published</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={isPublished}
                                    onChange={e => setIsPublished(e.target.checked)}
                                    className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <span className="text-sm text-gray-500">{isPublished ? 'Visible on site' : 'Hidden'}</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-900 block">Sort Order</label>
                            <Input
                                type="number"
                                value={sortOrder}
                                onChange={e => setSortOrder(parseInt(e.target.value) || 0)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
