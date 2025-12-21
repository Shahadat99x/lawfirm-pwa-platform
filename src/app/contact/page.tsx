import type { Metadata } from 'next'
import Container from "@/components/ui/Container"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import { Select } from "@/components/ui/Select"
import { Card } from "@/components/ui/Card"
import { Phone, Mail, MapPin, MessageSquare } from "lucide-react"

export const metadata: Metadata = {
    title: 'Contact Us | LexNova Legal',
    description: 'Book a consultation for immigration or business legal services. Response within 24 hours.',
}

export default function ContactPage() {
    return (
        <div className="bg-slate-50 py-24 sm:py-32">
            <Container>
                <div className="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-2">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-serif">Get in Touch</h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Ready to start your journey in Lithuania? Fill out the form or reach us directly.
                            We typically respond within 1 business day.
                        </p>

                        <div className="mt-12 space-y-6">
                            <Card className="flex items-center gap-4 p-4 hover:shadow-md transition-shadow">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                                    <Phone className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">Call Us</p>
                                    <p className="text-gray-600">+370 600 00000</p>
                                </div>
                            </Card>
                            <Card className="flex items-center gap-4 p-4 hover:shadow-md transition-shadow">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50">
                                    <MessageSquare className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">WhatsApp</p>
                                    <p className="text-gray-600">+370 600 00000</p>
                                </div>
                            </Card>
                            <Card className="flex items-center gap-4 p-4 hover:shadow-md transition-shadow">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50">
                                    <Mail className="h-6 w-6 text-gray-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">Email</p>
                                    <p className="text-gray-600">info@lexnova.lt</p>
                                </div>
                            </Card>
                            <Card className="flex items-center gap-4 p-4 hover:shadow-md transition-shadow">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50">
                                    <MapPin className="h-6 w-6 text-gray-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">Office</p>
                                    <p className="text-gray-600">Gedimino pr. 1, Vilnius, LT-01103</p>
                                </div>
                            </Card>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Book a Consultation</h3>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">First name</label>
                                    <div className="mt-2.5">
                                        <Input type="text" name="first-name" id="first-name" autoComplete="given-name" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">Last name</label>
                                    <div className="mt-2.5">
                                        <Input type="text" name="last-name" id="last-name" autoComplete="family-name" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">Email</label>
                                <div className="mt-2.5">
                                    <Input type="email" name="email" id="email" autoComplete="email" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="practice-area" className="block text-sm font-semibold leading-6 text-gray-900">Practice Area</label>
                                <div className="mt-2.5">
                                    <Select id="practice-area" name="practice-area">
                                        <option>Immigration Law</option>
                                        <option>Business Setup</option>
                                        <option>Employment Law</option>
                                        <option>Other Legal Inquiry</option>
                                    </Select>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">How can we help?</label>
                                <div className="mt-2.5">
                                    <Textarea name="message" id="message" rows={4} />
                                </div>
                            </div>
                            <div className="flex gap-x-4 items-center">
                                <div className="flex h-6 items-center">
                                    <input id="gdpr" name="gdpr" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                                </div>
                                <label htmlFor="gdpr" className="text-sm leading-6 text-gray-600">
                                    I agree to the processing of my personal data.
                                </label>
                            </div>
                            <div>
                                <Button type="submit" size="lg" className="w-full">
                                    Send Request
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </Container>
        </div>
    )
}
