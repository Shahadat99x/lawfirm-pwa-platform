import { type Metadata } from "next"
import { getBaseUrl } from "@/lib/url"

export const metadata: Metadata = {
    title: "Contact Us | LexNova Legal",
    description: "Get in touch with our legal experts for a consultation regarding immigration, business setup, or employment law.",
    alternates: {
        canonical: `${getBaseUrl()}/contact`,
    },
}

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
