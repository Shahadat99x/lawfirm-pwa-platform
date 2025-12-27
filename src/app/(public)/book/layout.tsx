import { type Metadata } from "next"

export const metadata: Metadata = {
    title: "Book a Consultation | LexNova Legal",
    description: "Schedule a 30-minute consultation with our legal experts. Select a time that works for you.",
}

export default function BookLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
