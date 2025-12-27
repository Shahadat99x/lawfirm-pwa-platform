"use client"

import { useSession } from "@/lib/auth/session"
import AdminSidebar from "./AdminSidebar"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Loader2, Menu } from "lucide-react"

export default function AdminShell({ children }: { children: React.ReactNode }) {
    const { user, loading } = useSession()
    const router = useRouter()
    const pathname = usePathname()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const isLoginPage = pathname === "/admin/login"

    useEffect(() => {
        if (!loading && !user && !isLoginPage) {
            router.push("/admin/login")
        }
        if (!loading && user && isLoginPage) {
            router.push("/admin")
        }
    }, [user, loading, isLoginPage, router])

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-50">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (isLoginPage) {
        return <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">{children}</div>
    }

    if (!user) return null // Will redirect

    return (
        <div className="flex h-screen bg-slate-50">
            {/* Mobile Sidebar (Drawer) */}
            <div className={`fixed inset-0 z-50 flex md:hidden ${isSidebarOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
                {/* Backdrop */}
                <div
                    className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${isSidebarOpen ? "opacity-100" : "opacity-0"}`}
                    onClick={() => setIsSidebarOpen(false)}
                />

                {/* Sidebar Panel */}
                <div className={`fixed inset-y-0 left-0 w-64 transform transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <AdminSidebar onNavigate={() => setIsSidebarOpen(false)} />
                </div>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden md:flex md:w-64 md:flex-col">
                <AdminSidebar />
            </div>

            {/* Main Content Area */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Mobile Top Bar */}
                <div className="flex items-center justify-between border-b bg-white p-4 md:hidden">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="-ml-2 flex items-center justify-center rounded-md p-2 text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                    >
                        <span className="sr-only">Open sidebar</span>
                        <Menu className="h-6 w-6" />
                    </button>
                    <span className="text-lg font-bold font-serif text-accent">LexNova Admin</span>
                    <div className="w-8" /> {/* Spacer for centering */}
                </div>

                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}
