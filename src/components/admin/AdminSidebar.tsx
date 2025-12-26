"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Inbox, LogOut, FileText, Briefcase, Users, MessageSquare, Settings, Calendar } from "lucide-react"
import { createClient } from "@/lib/supabase/browser"
import { useRouter } from "next/navigation"

export default function AdminSidebar() {
    const pathname = usePathname()
    const router = useRouter()

    async function handleLogout() {
        const supabase = createClient()
        await supabase.auth.signOut()
        router.push("/admin/login")
    }

    const navigation = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Appointments', href: '/admin/appointments', icon: Calendar },
        { name: 'Leads', href: '/admin/leads', icon: Inbox },
        { name: 'Blog', href: '/admin/blog', icon: FileText },
        { name: 'Services', href: '/admin/services', icon: Briefcase },
        { name: 'Team', href: '/admin/team', icon: Users },
        { name: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
    ]

    return (
        <div className="flex h-full w-64 flex-col border-r bg-slate-900 text-white">
            <div className="flex h-16 items-center px-6">
                <span className="text-xl font-bold font-serif text-accent">LexNova Admin</span>
            </div>
            <nav className="flex-1 space-y-1 px-4 py-4">
                {navigation.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium transition-colors ${isActive
                                ? "bg-slate-800 text-white"
                                : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                }`}
                        >
                            <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                            {item.name}
                        </Link>
                    )
                })}
            </nav>
            <div className="border-t border-slate-800 p-4">
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                    <LogOut className="mr-3 h-5 w-5" />
                    Sign Out
                </button>
            </div>
        </div>
    )
}
