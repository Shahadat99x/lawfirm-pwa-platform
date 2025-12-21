import { testimonials } from "@/lib/content/testimonials"
import Container from "@/components/ui/Container"
import { Card, CardContent } from "@/components/ui/Card"
import { Quote } from "lucide-react"

export default function Testimonials() {
    return (
        <section className="py-24 bg-slate-50">
            <Container>
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl font-serif">What Our Clients Say</h2>
                </div>
                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {testimonials.map((testimonial) => (
                        <Card key={testimonial.id} className="bg-white border-0 shadow-sm relative pt-8">
                            <CardContent>
                                <Quote className="h-8 w-8 text-blue-100 absolute top-4 left-4 -z-10" />
                                <p className="text-gray-600 italic">&quot;{testimonial.text}&quot;</p>
                                <div className="mt-6 border-t border-gray-100 pt-4">
                                    <p className="font-semibold text-gray-900">{testimonial.author}</p>
                                    {(testimonial.role || testimonial.company) && (
                                        <p className="text-sm text-gray-500">
                                            {testimonial.role}{testimonial.company && `, ${testimonial.company}`}
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </Container>
        </section>
    )
}
