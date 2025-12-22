'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Modal } from '@/components/ui/Modal'
import { MediaPicker } from '@/components/admin/MediaPicker'
import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Textarea'
import { cn } from '@/lib/utils'
import { Image as ImageIcon, Eye, Edit2, Bold, Italic, Link as LinkIcon, List, Heading as HeadingIcon } from 'lucide-react'

interface MarkdownEditorProps {
    value: string
    onChange: (value: string) => void
    label?: string
}

export function MarkdownEditor({ value, onChange, label }: MarkdownEditorProps) {
    const [view, setView] = useState<'edit' | 'preview'>('edit')
    const [showMediaModal, setShowMediaModal] = useState(false)

    const insertText = (before: string, after: string = '') => {
        const textarea = document.getElementById('markdown-editor') as HTMLTextAreaElement
        if (!textarea) return

        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        const text = textarea.value
        const selected = text.substring(start, end)

        const newText = text.substring(0, start) + before + selected + after + text.substring(end)
        onChange(newText)

        // Reset focus next tick
        setTimeout(() => {
            textarea.focus()
            textarea.setSelectionRange(start + before.length, end + before.length)
        }, 0)
    }

    const handleImageSelect = (url: string) => {
        const imageMarkdown = `\n![Image Description](${url})\n`
        insertText(imageMarkdown)
        setShowMediaModal(false)
    }

    return (
        <div className="space-y-2">
            {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}

            <div className="border rounded-md overflow-hidden bg-white shadow-sm">
                {/* Toolbar */}
                <div className="flex items-center justify-between border-b px-3 py-2 bg-gray-50">
                    <div className="flex items-center space-x-1">
                        <EditorButton
                            icon={Bold}
                            onClick={() => insertText('**', '**')}
                            label="Bold"
                        />
                        <EditorButton
                            icon={Italic}
                            onClick={() => insertText('*', '*')}
                            label="Italic"
                        />
                        <EditorButton
                            icon={HeadingIcon}
                            onClick={() => insertText('### ')}
                            label="Heading"
                        />
                        <div className="w-px h-4 bg-gray-300 mx-2" />
                        <EditorButton
                            icon={LinkIcon}
                            onClick={() => insertText('[Link Title](', ')')}
                            label="Link"
                        />
                        <EditorButton
                            icon={ImageIcon}
                            onClick={() => setShowMediaModal(true)}
                            label="Image"
                        />
                        <EditorButton
                            icon={List}
                            onClick={() => insertText('- ')}
                            label="List"
                        />
                    </div>

                    <div className="flex bg-gray-200 rounded p-1">
                        <button
                            type="button"
                            onClick={() => setView('edit')}
                            className={cn(
                                "px-3 py-1 text-xs font-medium rounded-sm transition-all flex items-center gap-1.5",
                                view === 'edit' ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-900"
                            )}
                        >
                            <Edit2 className="h-3 w-3" />
                            Write
                        </button>
                        <button
                            type="button"
                            onClick={() => setView('preview')}
                            className={cn(
                                "px-3 py-1 text-xs font-medium rounded-sm transition-all flex items-center gap-1.5",
                                view === 'preview' ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-900"
                            )}
                        >
                            <Eye className="h-3 w-3" />
                            Preview
                        </button>
                    </div>
                </div>

                {/* Editor / Preview Area */}
                <div className="relative min-h-[500px]">
                    {view === 'edit' ? (
                        <Textarea
                            id="markdown-editor"
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            className="w-full h-full min-h-[500px] border-0 focus:ring-0 rounded-none p-4 font-mono text-sm resize-y"
                            placeholder="Write your brilliant legal insights here..."
                        />
                    ) : (
                        <div className="prose prose-slate max-w-none p-8 min-h-[500px] border-t-0">
                            {value ? (
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {value}
                                </ReactMarkdown>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-gray-400 italic pt-20">
                                    <Eye className="h-10 w-10 mb-2 opacity-20" />
                                    No content to preview
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <Modal
                isOpen={showMediaModal}
                onClose={() => setShowMediaModal(false)}
                title="Insert Image"
            >
                <MediaPicker onSelect={handleImageSelect} onCancel={() => setShowMediaModal(false)} />
            </Modal>
        </div>
    )
}

function EditorButton({ icon: Icon, onClick, label }: { icon: React.ElementType, onClick: () => void, label: string }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
            title={label}
        >
            <Icon className="h-4 w-4" />
            <span className="sr-only">{label}</span>
        </button>
    )
}
