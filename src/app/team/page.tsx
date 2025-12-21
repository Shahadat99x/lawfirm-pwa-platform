import type { Metadata } from 'next'
import Image from "next/image"
import Container from "@/components/ui/Container"
import { lawyers } from "@/lib/content/lawyers"
import { Badge } from "@/components/ui/Badge"
import { Mail } from "lucide-react"

export const metadata: Metadata = {
    title: 'Our Team | LexNova Legal',
    description: 'Meet our experienced team of lawyers specializing in Lithuanian immigration and business law.',
}

export default function TeamPage() {
    return (
        <div className="bg-white py-24 sm:py-32">
            <Container>
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-serif">Meet Our Experts</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Dedicated professionals committed to your success in Lithuania.
                    </p>
                </div>
                <ul role="list" className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {lawyers.map((person) => (
                        <li key={person.name}>
                            <div className="aspect-[3/2] w-full bg-slate-100 rounded-2xl object-cover relative overflow-hidden flex items-center justify-center">
                                {/* Placeholder for no image */}
                                <span className="text-gray-400">Photo: {person.name}</span>
                            </div>
                            <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">{person.name}</h3>
                            <p className="text-base leading-7 text-primary">{person.role}</p>
                            <div className="mt-4 flex gap-2 flex-wrap">
                                {person.languages.map(lang => (
                                    <Badge key={lang} variant="secondary" className="text-xs">
                                        {lang}
                                    </Badge>
                                ))}
                            </div>
                            <p className="mt-4 text-base leading-7 text-gray-600">{person.bio}</p>
                            <ul role="list" className="mt-6 flex gap-x-6">
                                <li>
                                    <a href={`mailto:${person.email}`} className="text-gray-400 hover:text-gray-500 flex items-center gap-1">
                                        <span className="sr-only">Email</span>
                                        <Mail className="h-5 w-5" />
                                        <span className="text-sm">{person.email}</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    ))}
                </ul>
            </Container>
        </div>
    )
}
