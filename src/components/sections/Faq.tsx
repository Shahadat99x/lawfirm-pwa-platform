import Container from "@/components/ui/Container"

const faqs = [
    {
        question: "Do I need to be in Lithuania to open a business?",
        answer: "No, we can assist with remote company formation using Power of Attorney, though visiting at least once is recommended for banking purposes."
    },
    {
        question: "How long does the TRP process take?",
        answer: "Currently, migration authorities process TRP applications within 2-4 months depending on the basis (work, business, etc.)."
    },
    {
        question: "Do you offer consultations in Russian?",
        answer: "Yes, our team speaks English, Lithuanian, and Russian fluently."
    },
    {
        question: "What is your consultation fee?",
        answer: "Our initial evaluation is often included if you proceed with our services. Direct consultations start from €100/hr."
    }
]

export default function Faq() {
    return (
        <section className="py-24 bg-white">
            <Container>
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl font-serif">Frequently Asked Questions</h2>
                </div>
                <div className="mx-auto max-w-4xl grid gap-6 md:grid-cols-2">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-slate-50 p-6 rounded-lg">
                            <h3 className="font-semibold text-gray-900 flex items-start">
                                <span className="mr-3 text-accent text-lg">Q.</span>
                                {faq.question}
                            </h3>
                            <p className="mt-3 text-gray-600 text-sm leading-relaxed pl-7">
                                {faq.answer}
                            </p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}
