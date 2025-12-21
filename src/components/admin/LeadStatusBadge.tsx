import { Badge } from "@/components/ui/Badge"

export function LeadStatusBadge({ status }: { status: string }) {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
        new: "default", // or custom color logic
        contacted: "secondary",
        qualified: "outline",
        won: "default", // maybe green
        lost: "destructive"
    }

    const labels: Record<string, string> = {
        new: "New",
        contacted: "Contacted",
        qualified: "Qualified",
        won: "Won",
        lost: "Lost"
    }

    // Quick hack for custom colors using style or className since Badge variant is limited
    let className = ""
    if (status === 'new') className = "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200"
    if (status === 'contacted') className = "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200"
    if (status === 'qualified') className = "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200"
    if (status === 'won') className = "bg-green-100 text-green-800 border-green-200 hover:bg-green-200"
    if (status === 'lost') className = "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200"

    return (
        <Badge variant="outline" className={`border ${className}`}>
            {labels[status] || status}
        </Badge>
    )
}
