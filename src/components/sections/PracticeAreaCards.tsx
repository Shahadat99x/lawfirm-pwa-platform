import Link from "next/link"
import { practiceAreas } from "@/lib/content/practiceAreas"
import Container from "@/components/ui/Container"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import * as Icons from "lucide-react"

export default function PracticeAreaCards() {
    return (
        <section className="py-24 sm:py-32 bg-white">
            <Container>
                <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
                    <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl font-serif">Legal Expertise</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Comprehensive legal support tailored to your personal and business needs in Lithuania.
                    </p>
                </div>
                <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {practiceAreas.map((area) => {
                        // Dynamically get icon
                        const IconComponent = (Icons as any)[area.icon] || Icons.HelpCircle

                        return (
                            <Card key={area.id} className="flex flex-col hover:shadow-lg transition-shadow border-slate-200">
                                <CardHeader>
                                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-slate-50">
                                        <IconComponent className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle className="text-xl">{area.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-1 flex-col justify-between">
                                    <p className="text-sm text-gray-600">{area.description}</p>
                                    <div className="mt-6">
                                        <Link
                                            href={`/services/${area.slug}`}
                                            className="text-sm font-semibold text-accent hover:text-accent/80"
                                        >
                                            Learn more <span aria-hidden="true">&rarr;</span>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
                <div className="mt-10 text-center">
                    <Link href="/services" className="text-sm font-semibold leading-6 text-gray-900 hover:underline">
                        View all services <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </Container>
        </section>
    )
}
