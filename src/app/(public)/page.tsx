import Hero from "@/components/sections/Hero"
import TrustBar from "@/components/sections/TrustBar"
import PracticeAreaCards from "@/components/sections/PracticeAreaCards"
import Testimonials from "@/components/sections/Testimonials"
import Faq from "@/components/sections/Faq"
import BlogPreview from "@/components/sections/BlogPreview"
import { getBlogPosts, getPracticeAreas, getTestimonials } from "@/lib/data"

import { siteConfig } from "@/lib/seo-config"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: siteConfig.name,
    description: siteConfig.description,
}

export const revalidate = 3600

export default async function Home() {
    const [practiceAreas, testimonials, recentPosts] = await Promise.all([
        getPracticeAreas(),
        getTestimonials(),
        getBlogPosts()
    ])

    // Limit recent posts to 3 for the preview
    const limitedPosts = recentPosts.slice(0, 3)

    return (
        <>
            <Hero />
            <TrustBar />
            <PracticeAreaCards practiceAreas={practiceAreas} />
            <Testimonials testimonials={testimonials} />
            <BlogPreview recentPosts={limitedPosts} />
            <Faq />
        </>
    )
}
