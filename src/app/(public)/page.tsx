import type { Metadata } from 'next'
import Hero from "@/components/sections/Hero"
import TrustBar from "@/components/sections/TrustBar"
import PracticeAreaCards from "@/components/sections/PracticeAreaCards"
import Testimonials from "@/components/sections/Testimonials"
import Faq from "@/components/sections/Faq"
import BlogPreview from "@/components/sections/BlogPreview"

export const metadata: Metadata = {
    title: 'LexNova Legal | Immigration & Business Law in Lithuania',
    description: 'Premium legal services for immigration, business formation, and employment law in Lithuania. Expert guidance for global citizens.',
}

export default function Home() {
    return (
        <>
            <Hero />
            <TrustBar />
            <PracticeAreaCards />
            <Testimonials />
            <BlogPreview />
            <Faq />
        </>
    )
}
