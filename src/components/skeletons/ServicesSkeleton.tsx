import { Skeleton } from "@/components/ui/Skeleton"
import Container from "@/components/ui/Container"

export function ServicesListSkeleton() {
    return (
        <div className="bg-slate-50 py-24 sm:py-32">
            <Container>
                <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
                    <Skeleton className="h-10 w-64 mx-auto mb-4" />
                    <Skeleton className="h-6 w-96 mx-auto" />
                </div>
                <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="h-full bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-slate-50 border border-slate-100 overflow-hidden relative">
                                <Skeleton className="h-6 w-6" />
                            </div>
                            <Skeleton className="h-7 w-3/4 mb-4" />
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-2/3 mb-4" />
                            <div className="mt-4 flex items-center">
                                <Skeleton className="h-4 w-24" />
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}
