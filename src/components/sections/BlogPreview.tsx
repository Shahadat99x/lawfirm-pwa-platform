import Link from "next/link"
import Container from "@/components/ui/Container"
import { blogPosts } from "@/lib/content/blogPosts"

import { Badge } from "@/components/ui/Badge"


export default function BlogPreview() {
    const recentPosts = blogPosts.slice(0, 3)

    return (
        <section className="py-24 bg-white">
            <Container>
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl font-serif">Latest Legal Insights</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Stay informed on Lithuanian immigration and business landscape.
                    </p>
                </div>
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {recentPosts.map((post) => (
                        <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                            <article className="flex max-w-xl flex-col items-start justify-between h-full">
                                <div className="flex items-center gap-x-4 text-xs">
                                    <time dateTime={post.publishedAt} className="text-gray-500">
                                        {new Date(post.publishedAt).toLocaleDateString()}
                                    </time>
                                    <Badge variant="secondary" className="bg-slate-100">{post.tags[0]}</Badge>
                                </div>
                                <div className="group relative">
                                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-primary transition-colors">
                                        <span className="absolute inset-0" />
                                        {post.title}
                                    </h3>
                                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.excerpt}</p>
                                </div>
                                <div className="relative mt-8 flex items-center gap-x-4">
                                    <div className="text-sm leading-6">
                                        <p className="font-semibold text-gray-900">
                                            <span className="absolute inset-0" />
                                            {post.author.name}
                                        </p>
                                        <p className="text-gray-600">{post.author.role}</p>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
                <div className="mt-10 text-center">
                    <Link href="/blog" className="text-sm font-semibold leading-6 text-gray-900 hover:underline">
                        View all articles <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </Container>
        </section>
    )
}
