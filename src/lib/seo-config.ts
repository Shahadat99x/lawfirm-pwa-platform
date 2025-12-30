import { getBaseUrl, joinUrl } from "@/lib/url"

const baseUrl = getBaseUrl()

export const siteConfig = {
    name: "LexNova Legal",
    description: "Specialized legal counsel for immigration, business formation, and employment law in Lithuania and the EU.",
    url: baseUrl,
    ogImage: joinUrl(baseUrl, '/og-image.jpg'),
    links: {
        twitter: "https://twitter.com/lexnovalegal",
        github: "https://github.com/lexnovalegal",
    },
    creator: "LexNova Legal",
    keywords: ["Lawyer", "Lithuania", "Immigration", "Business Setup", "Employment Law", "Legal Services"],
}

export type SiteConfig = typeof siteConfig
