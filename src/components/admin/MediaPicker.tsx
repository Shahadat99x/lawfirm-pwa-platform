'use client'

import { useState, useRef } from 'react'
import { Upload, Link as LinkIcon, Loader2, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { cn } from '@/lib/utils'

interface MediaPickerProps {
    onSelect: (url: string) => void
    onCancel?: () => void
    initialUrl?: string
}

export function MediaPicker({ onSelect, onCancel }: MediaPickerProps) {
    const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload')
    const [urlInput, setUrlInput] = useState('')
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploading(true)
        try {
            // 1. Get Signature
            const signRes = await fetch('/api/media/sign', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ folder: 'lexnova_blog' })
            })
            const signData = await signRes.json()

            if (!signRes.ok) throw new Error(signData.error || 'Failed to sign upload')

            // 2. Upload to Cloudinary
            const formData = new FormData()
            formData.append('file', file)
            formData.append('api_key', signData.apiKey)
            formData.append('timestamp', signData.timestamp.toString())
            formData.append('signature', signData.signature)
            formData.append('folder', signData.folder)

            const uploadRes = await fetch(
                `https://api.cloudinary.com/v1_1/${signData.cloudName}/image/upload`,
                { method: 'POST', body: formData }
            )
            const uploadData = await uploadRes.json()

            if (!uploadRes.ok) throw new Error(uploadData.error?.message || 'Upload failed')

            onSelect(uploadData.secure_url)

        } catch (error) {
            console.error(error)
            alert('Upload failed: ' + (error instanceof Error ? error.message : 'Unknown error'))
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex border-b">
                <button
                    className={cn("px-4 py-2 text-sm font-medium border-b-2 transition-colors", activeTab === 'upload' ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-700")}
                    onClick={() => setActiveTab('upload')}
                >
                    Upload
                </button>
                <button
                    className={cn("px-4 py-2 text-sm font-medium border-b-2 transition-colors", activeTab === 'url' ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-700")}
                    onClick={() => setActiveTab('url')}
                >
                    Link URL
                </button>
            </div>

            {activeTab === 'upload' && (
                <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => !isUploading && fileInputRef.current?.click()}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={isUploading}
                    />
                    {isUploading ? (
                        <Loader2 className="h-10 w-10 text-primary animate-spin mb-3" />
                    ) : (
                        <div className="bg-primary/10 p-3 rounded-full mb-3">
                            <Upload className="h-6 w-6 text-primary" />
                        </div>
                    )}
                    <p className="text-sm font-medium text-gray-900">
                        {isUploading ? 'Uploading...' : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG or GIF</p>
                </div>
            )}

            {activeTab === 'url' && (
                <div className="space-y-3">
                    <Input
                        placeholder="https://example.com/image.jpg"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                    />
                    <div className="flex justify-end gap-2">
                        {onCancel && (
                            <Button variant="outline" type="button" onClick={onCancel}>Cancel</Button>
                        )}
                        <Button
                            type="button"
                            onClick={() => {
                                if (urlInput) onSelect(urlInput)
                            }}
                            disabled={!urlInput}
                        >
                            Use this URL
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
