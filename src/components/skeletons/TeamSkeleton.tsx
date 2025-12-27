import { Skeleton } from "@/components/ui/Skeleton"
import Container from "@/components/ui/Container"

export function TeamListSkeleton() {
    return (
        <div className="bg-white py-24 sm:py-32">
            <Container>
                <div className="mx-auto max-w-2xl text-center">
                    <Skeleton className="h-10 w-48 mx-auto mb-6" />
                    <Skeleton className="h-6 w-96 mx-auto" />
                </div>
                <div className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i}>
                            <Skeleton className="aspect-[3/2] w-full rounded-2xl mb-6" />
                            <Skeleton className="h-6 w-3/4 mb-2" />
                            <Skeleton className="h-5 w-1/2 mb-4" />
                            <div className="flex gap-2 mb-4">
                                <Skeleton className="h-5 w-12 rounded-full" />
                                <Skeleton className="h-5 w-12 rounded-full" />
                            </div>
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-2/3 mb-6" />
                            <Skeleton className="h-5 w-24" />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}
