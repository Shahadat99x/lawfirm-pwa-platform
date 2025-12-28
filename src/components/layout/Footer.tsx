import Link from "next/link"
import { Shield } from "lucide-react"
import Container from "@/components/ui/Container"

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-white" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <Container className="pb-8 pt-16 sm:pt-24 lg:pt-32">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8">
                        <Link href="/" className="flex items-center gap-2">
                            <Shield className="h-8 w-8 text-accent" />
                            <span className="font-serif text-xl font-bold tracking-tight text-white">
                                LexNova
                            </span>
                        </Link>
                        <p className="text-sm leading-6 text-gray-300 max-w-sm">
                            Providing premium legal services for immigration, business setup, and employment in Lithuania.
                        </p>
                        <div className="flex space-x-6">
                            {/* Social placeholders */}
                        </div>
                    </div>
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-white">Services</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li>
                                        <Link href="/services/immigration" className="text-sm leading-6 text-gray-300 hover:text-white">
                                            Immigration Law
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/services/business-setup" className="text-sm leading-6 text-gray-300 hover:text-white">
                                            Business Setup
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/services/employment" className="text-sm leading-6 text-gray-300 hover:text-white">
                                            Employment Law
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6 text-white">Company</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li>
                                        <Link href="/team" className="text-sm leading-6 text-gray-300 hover:text-white">
                                            Our Team
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/blog" className="text-sm leading-6 text-gray-300 hover:text-white">
                                            Legal Blog
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/contact" className="text-sm leading-6 text-gray-300 hover:text-white">
                                            Contact Us
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-white">Legal</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li>
                                        <Link href="/privacy" className="text-sm leading-6 text-gray-300 hover:text-white">
                                            Privacy Policy
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/cookies" className="text-sm leading-6 text-gray-300 hover:text-white">
                                            Cookie Policy
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/disclaimer" className="text-sm leading-6 text-gray-300 hover:text-white">
                                            Disclaimer
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <p className="text-xs leading-5 text-gray-400">
                            &copy; {new Date().getFullYear()} LexNova Legal. All rights reserved. <br />
                            Located in Vilnius, Lithuania. Not a government agency.
                        </p>
                        <Link
                            href="/admin/login"
                            className="text-xs text-gray-500 hover:text-gray-400 transition-colors"
                            aria-label="Staff login"
                        >
                            Staff Login
                        </Link>
                    </div>
                </div>
            </Container>
        </footer>
    )
}
