'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { upsertTeamMember } from '@/app/actions/team'
import { MarkdownEditor } from '@/components/admin/blog/MarkdownEditor'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Loader2, ArrowLeft, Image as ImageIcon, Plus, X } from 'lucide-react'
import Link from 'next/link'
import { Modal } from '@/components/ui/Modal'
import { MediaPicker } from '@/components/admin/MediaPicker'
import { cn } from '@/lib/utils'

interface TeamEditorProps {
    member?: {
        id: string
        name: string
        title: string
        slug: string
        bio: string
        photo_url?: string
        languages?: string[]
        is_active: boolean
        sort_order: number
    }
}

export function TeamEditor({ member }: TeamEditorProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [name, setName] = useState(member?.name || '')
    const [title, setTitle] = useState(member?.title || '')
    const [slug, setSlug] = useState(member?.slug || '')
    const [bio, setBio] = useState(member?.bio || '')
    const [photoUrl, setPhotoUrl] = useState(member?.photo_url || '')
    const [languages, setLanguages] = useState<string[]>(member?.languages || [])
    const [isActive, setIsActive] = useState(member?.is_active ?? true)
    const [sortOrder, setSortOrder] = useState(member?.sort_order ?? 0)

    const [newLang, setNewLang] = useState('')
    const [showPhotoModal, setShowPhotoModal] = useState(false)
    const router = useRouter()

    const addLanguage = () => {
        if (newLang && !languages.includes(newLang)) {
            setLanguages([...languages, newLang])
            setNewLang('')
        }
    }

    const removeLanguage = (lang: string) => {
        setLanguages(languages.filter(l => l !== lang))
    }

    const handleSave = async () => {
        if (!name) return alert('Name is required')
        if (!title) return alert('Title is required')

        setIsLoading(true)
        try {
            await upsertTeamMember({
                id: member?.id,
                name,
                title,
                slug: slug || undefined,
                bio,
                photo_url: photoUrl,
                languages,
                is_active: isActive,
                sort_order: sortOrder
            })
            router.push('/admin/team')
            router.refresh()
        } catch (error) {
            alert('Error saving team member: ' + (error instanceof Error ? error.message : 'Unknown error'))
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between sticky top-0 z-10 bg-white/80 backdrop-blur-md py-4 border-b -mx-4 px-4 sm:-mx-8 sm:px-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin/team" className="text-gray-500 hover:text-gray-900 transition-colors">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-gray-900">
                            {member ? 'Edit Team Member' : 'New Team Member'}
                        </h1>
                        <p className="text-xs text-gray-500">
                            Manage your legal professionals
                        </p>
                    </div>
                </div>
                <Button onClick={handleSave} disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Member
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
                <div className="lg:col-span-2 space-y-6">
                    <div className="space-y-4">
                        <Input
                            placeholder="Full Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="text-3xl font-bold p-4 h-auto border-transparent hover:border-gray-200 focus:border-primary transition-all placeholder:font-normal"
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                placeholder="Job Title (e.g. Senior Partner)"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                            <div className="flex items-center gap-2 text-sm text-gray-500 px-4">
                                <span className="shrink-0">/team/</span>
                                <Input
                                    value={slug}
                                    onChange={e => setSlug(e.target.value)}
                                    className="h-7 text-xs font-mono bg-transparent border-transparent hover:border-gray-200 focus:bg-white w-full"
                                    placeholder="slug"
                                />
                            </div>
                        </div>
                    </div>

                    <MarkdownEditor value={bio} onChange={setBio} label="Biography" />
                </div>

                <div className="space-y-6">
                    <div className="bg-white p-5 rounded-xl border shadow-sm space-y-6 sticky top-24">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-900">Active</label>
                            <input
                                type="checkbox"
                                checked={isActive}
                                onChange={e => setIsActive(e.target.checked)}
                                className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
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
                            <label className="text-sm font-medium text-gray-900 block">Languages</label>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {languages.map(lang => (
                                    <Badge key={lang} variant="secondary" className="gap-1">
                                        {lang}
                                        <X className="h-3 w-3 cursor-pointer hover:text-red-500" onClick={() => removeLanguage(lang)} />
                                    </Badge>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Add language..."
                                    value={newLang}
                                    onChange={e => setNewLang(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addLanguage())}
                                />
                                <Button size="sm" onClick={addLanguage} type="button" variant="outline"><Plus className="h-4 w-4" /></Button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-gray-900 block">Photo</label>
                                {photoUrl && (
                                    <button onClick={() => setPhotoUrl('')} className="text-xs text-red-500 hover:underline">Remove</button>
                                )}
                            </div>
                            <div
                                className={cn(
                                    "border-2 border-dashed rounded-xl overflow-hidden text-center cursor-pointer transition-all aspect-square flex flex-col items-center justify-center relative group",
                                    photoUrl ? "border-transparent" : "border-gray-200 hover:border-primary/50 hover:bg-gray-50"
                                )}
                                onClick={() => setShowPhotoModal(true)}
                            >
                                {photoUrl ? (
                                    <>
                                        <img src={photoUrl} alt="Photo" className="object-cover w-full h-full" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium">
                                            Change Photo
                                        </div>
                                    </>
                                ) : (
                                    <div className="py-8 text-gray-400">
                                        <ImageIcon className="h-10 w-10 mx-auto mb-2 opacity-50" />
                                        <span className="text-sm">Add Photo</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal isOpen={showPhotoModal} onClose={() => setShowPhotoModal(false)} title="Select Photo">
                <MediaPicker onSelect={(url) => { setPhotoUrl(url); setShowPhotoModal(false) }} onCancel={() => setShowPhotoModal(false)} />
            </Modal>
        </div>
    )
}
