"use client"

import { useSession } from "@/lib/auth/session"
import AdminSidebar from "./AdminSidebar"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"

export default function AdminShell({ children }: { children: React.ReactNode }) {
    const { user, loading } = useSession()
    const router = useRouter()
    const pathname = usePathname()

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
            <div className="hidden md:flex md:w-64 md:flex-col">
                <AdminSidebar />
            </div>
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Mobile header could go here */}
                <main className="flex-1 overflow-y-auto p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}
