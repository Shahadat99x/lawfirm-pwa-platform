import Link from "next/link"
import Container from "@/components/ui/Container"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import type { PracticeArea } from "@/types/content"
import * as Icons from "lucide-react"

interface PracticeAreaCardsProps {
    practiceAreas: PracticeArea[]
}

export default function PracticeAreaCards({ practiceAreas }: PracticeAreaCardsProps) {
    return (
        <section className="py-24 bg-slate-50">
            <Container>
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-serif">Comprehensive Legal Services</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Specialized guidance for every step of your journey in Lithuania.
                    </p>
                </div>
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-6 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {practiceAreas.map((area) => {
                        const IconComponent = area.icon && (Icons as unknown as Record<string, React.ElementType>)[area.icon]
                            ? (Icons as unknown as Record<string, React.ElementType>)[area.icon]
                            : Icons.HelpCircle
                        return (
                            <Link key={area.id} href={`/services/${area.slug}`} className="block group h-full">
                                <Card className="h-full transition-all hover:shadow-md hover:border-primary/20">
                                    <CardHeader>
                                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-white shadow-sm border border-slate-100 group-hover:border-primary/20">
                                            <IconComponent className="h-6 w-6 text-primary" />
                                        </div>
                                        <CardTitle className="group-hover:text-primary transition-colors">{area.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-gray-600 line-clamp-3">{area.description || area.excerpt}</p>
                                    </CardContent>
                                </Card>
                            </Link>
                        )
                    })}
                </div>
            </Container>
        </section>
    )
}
