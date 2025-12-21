import type { Metadata } from 'next'
import Link from 'next/link'
import Container from "@/components/ui/Container"
import { blogPosts } from "@/lib/content/blogPosts"
import { Badge } from "@/components/ui/Badge"
import { Card, CardContent } from "@/components/ui/Card"

export const metadata: Metadata = {
    title: 'Legal Blog | LexNova Legal',
    description: 'Latest updates on Lithuanian immigration law, business regulations, and employment compliance.',
}

export default function BlogIndex() {
    return (
        <div className="bg-white py-24 sm:py-32">
            <Container>
                <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-serif">Legal Updates & Insights</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Professional guidance through the complexities of Lithuanian law.
                    </p>
                </div>
                <div className="mt-16 space-y-16 lg:space-y-20">
                    {blogPosts.map((post) => (
                        <article key={post.id} className="relative isolate flex flex-col gap-8 lg:flex-row hover:bg-slate-50 transition-colors p-6 -mx-6 rounded-2xl">
                            <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0 bg-slate-100 rounded-2xl flex items-center justify-center text-gray-400">
                                {/* Placeholder image */}
                                <span>No Image</span>
                            </div>
                            <div>
                                <div className="flex items-center gap-x-4 text-xs">
                                    <time dateTime={post.publishedAt} className="text-gray-500">
                                        {new Date(post.publishedAt).toLocaleDateString()}
                                    </time>
                                    {post.tags.map(tag => (
                                        <Badge key={tag} variant="secondary" className="bg-blue-50 text-primary">{tag}</Badge>
                                    ))}
                                </div>
                                <div className="group relative max-w-xl">
                                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-primary">
                                        <Link href={`/blog/${post.slug}`}>
                                            <span className="absolute inset-0" />
                                            {post.title}
                                        </Link>
                                    </h3>
                                    <p className="mt-5 text-sm leading-6 text-gray-600">{post.excerpt}</p>
                                </div>
                                <div className="mt-6 flex border-t border-gray-900/5 pt-6">
                                    <div className="relative flex items-center gap-x-4">
                                        <div className="text-sm leading-6">
                                            <p className="font-semibold text-gray-900">
                                                <span className="absolute inset-0" />
                                                {post.author.name}
                                            </p>
                                            <p className="text-gray-600">{post.author.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </Container>
        </div>
    )
}
