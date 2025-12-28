import { notFound } from "next/navigation"
import Link from "next/link"
import Container from "@/components/ui/Container"
import { getPracticeAreaBySlug, getPracticeAreas } from "@/lib/data"
import { Button } from "@/components/ui/Button"
import { ArrowLeft, CheckCircle } from "lucide-react"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface PageProps {
    params: Promise<{ slug: string }>
}

// Force dynamic rendering to prevent "static to dynamic at runtime" errors
// This page accesses cookies via Supabase server client
export const dynamic = 'force-dynamic'
export const revalidate = 3600

export async function generateStaticParams() {
    try {
        const areas = await getPracticeAreas()
        return areas.map((area) => ({
            slug: area.slug,
        }))
    } catch (error) {
        return []
    }
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params
    const area = await getPracticeAreaBySlug(slug)

    if (!area) {
        return {
            title: 'Service Not Found',
        }
    }

    return {
        title: `${area.title} | LexNova Legal`,
        description: area.description || area.excerpt,
        openGraph: {
            title: area.title,
            description: area.description || area.excerpt,
            type: 'website',
            images: area.icon && area.icon.startsWith('http') ? [area.icon] : [],
        },
    }
}

export default async function ServicePage({ params }: PageProps) {
    const { slug } = await params
    const area = await getPracticeAreaBySlug(slug)

    if (!area) {
        notFound()
    }

    return (
        <div className="py-16 sm:py-24">
            <Container>
                <Link href="/services" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
                    <ArrowLeft className="mr-1 h-4 w-4" /> Back to Services
                </Link>
                <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                    <div className="lg:col-span-8">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-serif mb-6">{area.title}</h1>
                        <div className="prose prose-slate max-w-none prose-headings:font-serif prose-a:text-primary">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{area.content}</ReactMarkdown>
                        </div>
                    </div>
                    <div className="lg:col-span-4 mt-12 lg:mt-0">
                        <div className="bg-slate-50 rounded-2xl p-8 sticky top-24">
                            <h3 className="text-lg font-semibold text-gray-900">Need legal assistance?</h3>
                            <p className="mt-4 text-sm text-gray-600">
                                Book a consultation with our experts to discuss your specific situation regarding {area.title}.
                            </p>
                            <ul className="mt-6 space-y-3 text-sm text-gray-600">
                                <li className="flex gap-2"><CheckCircle className="h-5 w-5 text-accent" /> Initial assessment</li>
                                <li className="flex gap-2"><CheckCircle className="h-5 w-5 text-accent" /> Clear roadmap</li>
                                <li className="flex gap-2"><CheckCircle className="h-5 w-5 text-accent" /> Fixed pricing available</li>
                            </ul>
                            <Button asChild className="w-full mt-8" size="lg">
                                <Link href={`/contact?service=${area.slug}`}>Book Consultation</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}
