import { Skeleton } from "@/components/ui/Skeleton"
import Container from "@/components/ui/Container"

export function BlogListSkeleton() {
    return (
        <div className="bg-white py-24 sm:py-32">
            <Container>
                <div className="mx-auto max-w-2xl text-center">
                    <Skeleton className="h-10 w-48 mx-auto mb-4" />
                    <Skeleton className="h-6 w-96 mx-auto" />
                </div>
                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="flex flex-col items-start justify-between h-full bg-slate-50 p-6 rounded-2xl">
                            <div className="flex items-center gap-x-4 w-full mb-4">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-5 w-16 px-2 rounded-full" />
                            </div>
                            <Skeleton className="aspect-video w-full rounded-xl mb-4" />
                            <Skeleton className="h-6 w-full mb-2" />
                            <Skeleton className="h-6 w-3/4 mb-4" />
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-2/3" />
                            <div className="relative mt-8 flex items-center gap-x-4 w-full">
                                <Skeleton className="h-8 w-8 rounded-full" />
                                <div className="flex-1">
                                    <Skeleton className="h-4 w-24" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}
