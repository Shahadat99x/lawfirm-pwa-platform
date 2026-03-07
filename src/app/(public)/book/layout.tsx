import { type Metadata } from "next"
import { getBaseUrl } from "@/lib/url"

export const metadata: Metadata = {
    title: "Book a Consultation | LexNova Legal",
    description: "Schedule a 30-minute consultation with our legal experts. Select a time that works for you.",
    alternates: {
        canonical: `${getBaseUrl()}/book`,
    },
}

export default function BookLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
