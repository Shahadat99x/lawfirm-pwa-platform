"use client"

import Container from "@/components/ui/Container"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { WifiOff } from "lucide-react"

export default function OfflinePage() {
    return (
        <div className="flex min-h-[calc(100vh-200px)] flex-col bg-white">
            <Container className="flex flex-1 items-center justify-center">
                <div className="mx-auto max-w-xl py-12 text-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 mb-6">
                        <WifiOff className="h-10 w-10 text-slate-500" />
                    </div>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-serif">
                        You are offline
                    </h1>
                    <p className="mt-4 text-base leading-7 text-gray-600">
                        It looks like you&apos;ve lost your internet connection. Please check your network and try again.
                        Some parts of the app may be available while offline.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Button asChild onClick={() => window.location.reload()}>
                            <span className="cursor-pointer">Try Again</span>
                        </Button>
                        <Button asChild variant="ghost">
                            <Link href="/">Go to Home</Link>
                        </Button>
                    </div>
                </div>
            </Container>
        </div>
    )
}
