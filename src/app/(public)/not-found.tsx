import Link from 'next/link'
import Container from "@/components/ui/Container"
import { Button } from "@/components/ui/Button"

export default function NotFound() {
    return (
        <div className="flex min-h-[calc(100vh-200px)] flex-col bg-white">
            <Container className="flex flex-1 items-center justify-center">
                <div className="mx-auto max-w-xl py-12 text-center">
                    <p className="text-base font-semibold text-primary">404</p>
                    <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl font-serif">
                        Page not found
                    </h1>
                    <p className="mt-6 text-base leading-7 text-gray-600">
                        Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Button asChild>
                            <Link href="/">Go back home</Link>
                        </Button>
                        <Link href="/contact" className="text-sm font-semibold text-gray-900">
                            Contact support <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>
                </div>
            </Container>
        </div>
    )
}
