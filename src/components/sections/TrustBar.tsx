import Container from "@/components/ui/Container"

export default function TrustBar() {
    return (
        <div className="bg-slate-50 py-12 sm:py-16">
            <Container>
                <div className="mx-auto max-w-2xl lg:max-w-none">
                    <div className="text-center">
                        <h2 className="text-lg font-semibold leading-8 text-gray-900">Trusted by businesses and individuals from 20+ countries</h2>
                    </div>
                    <dl className="mt-10 grid grid-cols-1 gap-0.5 overflow-hidden text-center sm:grid-cols-2 lg:grid-cols-4 rounded-2xl">
                        <div className="flex flex-col bg-white p-8">
                            <dt className="text-sm font-semibold leading-6 text-gray-600">Successful Cases</dt>
                            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">500+</dd>
                        </div>
                        <div className="flex flex-col bg-white p-8">
                            <dt className="text-sm font-semibold leading-6 text-gray-600">Years Experience</dt>
                            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">15+</dd>
                        </div>
                        <div className="flex flex-col bg-white p-8">
                            <dt className="text-sm font-semibold leading-6 text-gray-600">Business Sethups</dt>
                            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">200+</dd>
                        </div>
                        <div className="flex flex-col bg-white p-8">
                            <dt className="text-sm font-semibold leading-6 text-gray-600">Client Satisfaction</dt>
                            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">98%</dd>
                        </div>
                    </dl>
                </div>
            </Container>
        </div>
    )
}
