import AdminShell from "@/components/admin/AdminShell"

export const metadata = {
    title: 'Admin | LexNova Legal',
    description: 'Admin Dashboard',
    robots: {
        index: false,
        follow: false,
    },
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // We strictly replicate Step 4, Option A: Client-side guard in AdminShell
    // The "layout.tsx" just renders the Shell which handles the rest.
    return (
        <AdminShell>
            {children}
        </AdminShell>
    )
}
