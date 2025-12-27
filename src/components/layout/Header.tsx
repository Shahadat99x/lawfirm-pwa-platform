"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Shield } from "lucide-react"
import { cn } from "@/lib/utils"
import Container from "@/components/ui/Container"
import { Button } from "@/components/ui/Button"

const navigation = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Team", href: "/team" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
]

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const pathname = usePathname()

    return (
        <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-100">
            <Container>
                <div className="flex h-16 items-center justify-between">
                    <div className="flex lg:flex-1">
                        <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                            <span className="sr-only">LexNova Legal</span>
                            <Shield className="h-8 w-8 text-primary" />
                            <span className="font-serif text-xl font-bold tracking-tight text-primary">
                                LexNova
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex lg:gap-x-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "text-sm font-semibold leading-6 transition-colors hover:text-primary",
                                    pathname === item.href
                                        ? "text-primary font-bold"
                                        : "text-muted-foreground"
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <Button asChild size="sm" className="hidden sm:flex">
                            <Link href="/book">Book Consultation</Link>
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-expanded={mobileMenuOpen}
                            aria-controls="mobile-menu"
                            aria-label="Open main menu"
                        >
                            <span className="sr-only">Open main menu</span>
                            {mobileMenuOpen ? (
                                <X className="h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </Container>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div id="mobile-menu" className="lg:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-200 shadow-lg animate-in slide-in-from-top-2">
                    <div className="space-y-1 px-4 pb-3 pt-2">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "block rounded-md px-3 py-2 text-base font-medium",
                                    pathname === item.href
                                        ? "bg-gray-50 text-primary"
                                        : "text-gray-900 hover:bg-gray-50 hover:text-gray-900"
                                )}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <Button asChild className="w-full justify-center">
                                <Link href="/book" onClick={() => setMobileMenuOpen(false)}>Book Consultation</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}
