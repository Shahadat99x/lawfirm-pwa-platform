import Link from "next/link"
import Container from "@/components/ui/Container"
import { Button } from "@/components/ui/Button"
import { CheckCircle } from "lucide-react"

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-white py-16 sm:py-24 lg:py-32">
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
            </div>

            <Container>
                <div className="mx-auto max-w-2xl text-center">
                    <div className="mb-8 flex justify-center">
                        <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                            MB vs UAB: Which Business Structure is Right for You? <Link href="/blog/mb-vs-uab-which-business-structure-is-right-for-you-complete-guide-for-lithuania" className="font-semibold text-primary"><span className="absolute inset-0" aria-hidden="true" />Read more <span aria-hidden="true">&rarr;</span></Link>
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl font-serif">
                        Premium Legal Solutions for <span className="text-primary">Global Citizens</span>
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Specializing in Lithuanian immigration, business setup, and employment law. We simplify the complex to help you thrive in Europe.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Button asChild size="lg">
                            <Link href="/book">Book a Consultation</Link>
                        </Button>
                        <Link href="/services" className="text-sm font-semibold leading-6 text-gray-900">
                            Explore Services <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                    <div className="mt-10 flex justify-center gap-x-8 text-sm text-gray-500">
                        <div className="flex items-center gap-x-1">
                            <CheckCircle className="h-4 w-4 text-accent" />
                            <span>Response in 24h</span>
                        </div>
                        <div className="flex items-center gap-x-1">
                            <CheckCircle className="h-4 w-4 text-accent" />
                            <span>English-speaking</span>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}
