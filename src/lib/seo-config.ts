import { env } from "@/lib/env"

export const siteConfig = {
    name: "LexNova Legal",
    description: "Specialized legal counsel for immigration, business formation, and employment law in Lithuania and the EU.",
    url: env.NEXT_PUBLIC_SITE_URL,
    ogImage: `${env.NEXT_PUBLIC_SITE_URL}/og-image.jpg`,
    links: {
        twitter: "https://twitter.com/lexnovalegal",
        github: "https://github.com/lexnovalegal",
    },
    creator: "LexNova Legal",
    keywords: ["Lawyer", "Lithuania", "Immigration", "Business Setup", "Employment Law", "Legal Services"],
}

export type SiteConfig = typeof siteConfig
