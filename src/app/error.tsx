'use client'

import { useEffect } from 'react'
import Container from "@/components/ui/Container"
import { Button } from "@/components/ui/Button"
import { AlertCircle } from "lucide-react"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="flex min-h-[calc(100vh-200px)] flex-col bg-white">
            <Container className="flex flex-1 items-center justify-center">
                <div className="mx-auto max-w-xl py-12 text-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100 mb-6">
                        <AlertCircle className="h-10 w-10 text-red-600" />
                    </div>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-serif">
                        Something went wrong
                    </h1>
                    <p className="mt-4 text-base leading-7 text-gray-600">
                        We apologize for the inconvenience. An unexpected error occurred.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Button onClick={() => reset()}>
                            Try again
                        </Button>
                        <Button variant="ghost" onClick={() => window.location.href = '/'}>
                            Return Home
                        </Button>
                    </div>
                </div>
            </Container>
        </div>
    )
}
