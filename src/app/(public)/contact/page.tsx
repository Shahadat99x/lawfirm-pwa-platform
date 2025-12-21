"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Container from "@/components/ui/Container"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import { Select } from "@/components/ui/Select"
import { Mail, Phone, MapPin, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/Badge"

export default function ContactPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ContactContent />
        </Suspense>
    )
}

function ContactContent() {
    const searchParams = useSearchParams()
    const defaultService = searchParams.get('service') || ''

    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)
        setError(null)

        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(formData.entries())

        // Convert checkbox 'on' to boolean true
        const payload = {
            ...data,
            gdpr_consent: data.gdpr_consent === 'on',
        }

        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })

            const result = await res.json()

            if (!res.ok) {
                throw new Error(result.error || 'Something went wrong')
            }

            setIsSuccess(true)
            window.scrollTo({ top: 0, behavior: 'smooth' })
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError("An unexpected error occurred.")
            }
        } finally {
            setIsLoading(false)
        }
    }

    if (isSuccess) {
        return (
            <div className="bg-white py-24 sm:py-32">
                <Container>
                    <div className="mx-auto max-w-2xl text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-6">
                            <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-serif">Thank You!</h2>
                        <p className="mt-4 text-lg text-gray-600">
                            We have received your message. Our team will review your inquiry and get back to you within 24 hours.
                        </p>
                        <div className="mt-10">
                            <Button asChild onClick={() => window.location.reload()}>
                                <a href="/">Return Home</a>
                            </Button>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className="bg-white py-24 sm:py-32">
            <Container>
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-serif">Contact Us</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        Get in touch with our legal experts for a consultation.
                    </p>
                </div>

                <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">Contact Information</h3>
                        <dl className="space-y-6 text-base text-gray-600">
                            <div className="flex gap-x-4">
                                <dt className="flex-none">
                                    <span className="sr-only">Address</span>
                                    <MapPin className="h-6 w-6 text-gray-400" aria-hidden="true" />
                                </dt>
                                <dd>
                                    Gedimino pr. 1<br />
                                    Vilnius, Lithuania
                                </dd>
                            </div>
                            <div className="flex gap-x-4">
                                <dt className="flex-none">
                                    <span className="sr-only">Telephone</span>
                                    <Phone className="h-6 w-6 text-gray-400" aria-hidden="true" />
                                </dt>
                                <dd>
                                    <a className="hover:text-gray-900" href="tel:+37060000000">
                                        +370 600 00000
                                    </a>
                                </dd>
                            </div>
                            <div className="flex gap-x-4">
                                <dt className="flex-none">
                                    <span className="sr-only">Email</span>
                                    <Mail className="h-6 w-6 text-gray-400" aria-hidden="true" />
                                </dt>
                                <dd>
                                    <a className="hover:text-gray-900" href="mailto:info@lexnova.lt">
                                        info@lexnova.lt
                                    </a>
                                </dd>
                            </div>
                        </dl>
                        <div className="mt-10 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                            <h4 className="font-semibold text-gray-900 mb-2">Office Hours</h4>
                            <p className="text-sm text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                            <p className="text-sm text-gray-600">Weekend: Closed</p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-4 rounded-md bg-red-50 border border-red-200 flex items-start gap-3">
                                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                                <div className="text-sm text-red-700">{error}</div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                            <div>
                                <label htmlFor="full_name" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <div className="mt-2.5">
                                    <Input
                                        type="text"
                                        name="full_name"
                                        id="full_name"
                                        autoComplete="name"
                                        required
                                        minLength={2}
                                        maxLength={80}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Phone Number
                                </label>
                                <div className="mt-2.5">
                                    <Input
                                        type="tel"
                                        name="phone"
                                        id="phone"
                                        autoComplete="tel"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <div className="mt-2.5">
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    autoComplete="email"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                            <div>
                                <label htmlFor="city" className="block text-sm font-semibold leading-6 text-gray-900">
                                    City <span className="text-red-500">*</span>
                                </label>
                                <div className="mt-2.5">
                                    <Select name="city" id="city" required defaultValue="Vilnius">
                                        <option value="Vilnius">Vilnius</option>
                                        <option value="Kaunas">Kaunas</option>
                                        <option value="Klaipėda">Klaipėda</option>
                                        <option value="Šiauliai">Šiauliai</option>
                                        <option value="Panevėžys">Panevėžys</option>
                                        <option value="Other">Other / Abroad</option>
                                    </Select>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="practice_area_slug" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Service Interest <span className="text-red-500">*</span>
                                </label>
                                <div className="mt-2.5">
                                    <Select name="practice_area_slug" id="practice_area_slug" required defaultValue={defaultService || ''}>
                                        <option value="" disabled>Select a service...</option>
                                        <option value="immigration">Immigration Law</option>
                                        <option value="business-setup">Business Setup</option>
                                        <option value="employment">Employment Law</option>
                                        <option value="other">Other Inquiry</option>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                                Message <span className="text-red-500">*</span>
                            </label>
                            <div className="mt-2.5">
                                <Textarea
                                    name="message"
                                    id="message"
                                    rows={4}
                                    required
                                    minLength={20}
                                    placeholder="Please describe your situation briefly..."
                                />
                            </div>
                        </div>

                        {/* Honeypot Field - Hidden */}
                        <div className="hidden" aria-hidden="true">
                            <label htmlFor="honeypot">Don't fill this out if you're human:</label>
                            <input type="text" name="honeypot" id="honeypot" tabIndex={-1} autoComplete="off" />
                        </div>

                        <div className="flex gap-x-4 items-start">
                            <div className="flex h-6 items-center">
                                <input
                                    id="gdpr_consent"
                                    name="gdpr_consent"
                                    type="checkbox"
                                    required
                                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                            </div>
                            <label htmlFor="gdpr_consent" className="text-sm leading-6 text-gray-600">
                                I agree to the <a href="/privacy" className="font-semibold text-primary hover:underline">privacy policy</a> and consent to having my data processed for the purpose of this inquiry. <span className="text-red-500">*</span>
                            </label>
                        </div>

                        <div className="mt-10">
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                                    </>
                                ) : (
                                    "Send Message"
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </Container>
        </div>
    )
}
