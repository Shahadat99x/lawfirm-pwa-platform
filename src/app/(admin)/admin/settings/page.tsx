'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/browser'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Loader2 } from 'lucide-react'

import { SiteSettings } from '@/types/content'

export default function SettingsPage() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [settings, setSettings] = useState<Partial<SiteSettings>>({})
    const supabase = createClient()

    useEffect(() => {
        const fetchSettings = async () => {
            const { data } = await supabase.from('site_settings').select('*').single()
            if (data) setSettings(data)
            setLoading(false)
        }
        fetchSettings()
    }, [])

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        try {
            const { error } = await supabase
                .from('site_settings')
                .upsert({ id: 1, ...settings, updated_at: new Date().toISOString() })

            if (error) throw error
            alert('Settings saved successfully!')
        } catch (err) {
            alert('Error: ' + (err instanceof Error ? err.message : 'Unknown error'))
        } finally {
            setSaving(false)
        }
    }

    if (loading) return <div className="p-20 text-center"><Loader2 className="animate-spin h-8 w-8 mx-auto text-gray-400" /></div>

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Site Settings</h1>
                <p className="text-gray-500">Manage contact information and global site details.</p>
            </div>

            <form onSubmit={handleSave} className="bg-white p-8 rounded-xl shadow-sm border space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Firm Name</label>
                    <Input
                        value={settings.firm_name || ''}
                        onChange={e => setSettings({ ...settings, firm_name: e.target.value })}
                        className="max-w-md"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Phone Number</label>
                        <Input value={settings.phone || ''} onChange={e => setSettings({ ...settings, phone: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Email Address</label>
                        <Input value={settings.email || ''} onChange={e => setSettings({ ...settings, email: e.target.value })} />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">WhatsApp Number</label>
                    <Input
                        value={settings.whatsapp || ''}
                        onChange={e => setSettings({ ...settings, whatsapp: e.target.value })}
                        className="max-w-md"
                        placeholder="+370..."
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Address</label>
                    <Input value={settings.address || ''} onChange={e => setSettings({ ...settings, address: e.target.value })} />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">City</label>
                        <Input value={settings.city || ''} onChange={e => setSettings({ ...settings, city: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Country</label>
                        <Input value={settings.country || ''} onChange={e => setSettings({ ...settings, country: e.target.value })} />
                    </div>
                </div>

                <div className="pt-4">
                    <Button type="submit" disabled={saving} className="w-full sm:w-auto">
                        {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Changes
                    </Button>
                </div>
            </form>
        </div>
    )
}
