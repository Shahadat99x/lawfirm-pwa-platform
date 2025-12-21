import type { Metadata } from 'next'
import Link from 'next/link'
import Container from "@/components/ui/Container"
import { getPracticeAreas } from "@/lib/data"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import * as Icons from "lucide-react"

export const metadata: Metadata = {
    title: 'Our Services | LexNova Legal',
    description: 'Full range of legal services including immigration, business formation, and employment contracts.',
}

export const revalidate = 3600 // 1 hour

export default async function ServicesPage() {
    const practiceAreas = await getPracticeAreas()

    return (
        <div className="bg-slate-50 py-24 sm:py-32">
            <Container>
                <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-serif">Our Practice Areas</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        We provide specialized legal counsel for international clients.
                    </p>
                </div>
                <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {practiceAreas.map((area) => {
                        const IconComponent = area.icon && (Icons as unknown as Record<string, React.ElementType>)[area.icon]
                            ? (Icons as unknown as Record<string, React.ElementType>)[area.icon]
                            : Icons.HelpCircle
                        return (
                            <Link key={area.id} href={`/services/${area.slug}`} className="block group">
                                <Card className="h-full transition-all group-hover:shadow-md group-hover:border-primary/20">
                                    <CardHeader>
                                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-white shadow-sm border border-slate-100 group-hover:border-primary/20">
                                            <IconComponent className="h-6 w-6 text-primary" />
                                        </div>
                                        <CardTitle className="group-hover:text-primary transition-colors">{area.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-gray-600 line-clamp-3">{area.description || area.excerpt}</p>
                                        <div className="mt-4 flex items-center text-sm font-semibold text-accent">
                                            View Details <Icons.ArrowRight className="ml-1 h-4 w-4" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        )
                    })}
                </div>
            </Container>
        </div>
    )
}
