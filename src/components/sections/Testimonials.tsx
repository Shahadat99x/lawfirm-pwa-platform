import Container from "@/components/ui/Container"
import { Card, CardContent } from "@/components/ui/Card"
import { Star, Quote } from "lucide-react"
import type { Testimonial } from "@/types/content"

interface TestimonialsProps {
    testimonials: Testimonial[]
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
    return (
        <section className="py-24 bg-primary text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-accent rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
            </div>

            <Container className="relative z-10">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-serif">Client Success Stories</h2>
                    <p className="mt-4 text-lg text-slate-300">
                        Don&apos;t just take our word for it. Here is what our clients have to say.
                    </p>
                </div>
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {testimonials.map((testimonial) => (
                        <Card key={testimonial.id} className="bg-white/5 border-white/10 text-white backdrop-blur-sm">
                            <CardContent className="pt-6">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 text-accent fill-accent" />
                                    ))}
                                </div>
                                <Quote className="h-8 w-8 text-accent/20 mb-2" />
                                <p className="text-lg font-medium leading-8 text-slate-100 mb-4 italic">
                                    &quot;{testimonial.text}&quot;
                                </p>
                                <div className="mt-4 border-t border-white/10 pt-4">
                                    <div className="font-semibold text-white">{testimonial.name}</div>
                                    <div className="text-sm text-slate-400">
                                        {testimonial.role ? `${testimonial.role}, ` : ''}{testimonial.company || testimonial.country}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </Container>
        </section>
    )
}
