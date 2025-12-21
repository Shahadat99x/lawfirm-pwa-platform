import type { Metadata } from 'next'
import Link from 'next/link'
import Container from "@/components/ui/Container"
import { getBlogPosts } from "@/lib/data"
import { Badge } from "@/components/ui/Badge"

export const metadata: Metadata = {
    title: 'Legal Insights & News | LexNova Legal',
    description: 'Stay updated with the latest changes in Lithuanian immigration, business, and employment law.',
}

export const revalidate = 3600

export default async function BlogPage() {
    const posts = await getBlogPosts()

    return (
        <div className="bg-white py-24 sm:py-32">
            <Container>
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-serif">Legal Insights</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        Expert analysis and updates on Lithuanian law.
                    </p>
                </div>
                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {posts.map((post) => (
                        <Link key={post.id} href={`/blog/${post.slug}`} className="group block h-full">
                            <article className="flex flex-col items-start justify-between h-full bg-slate-50 p-6 rounded-2xl transition-shadow hover:shadow-md">
                                <div className="flex items-center gap-x-4 text-xs w-full">
                                    {post.publishedAt && (
                                        <time dateTime={post.publishedAt} className="text-gray-500">
                                            {new Date(post.publishedAt).toLocaleDateString()}
                                        </time>
                                    )}
                                    {post.tags?.[0] && (
                                        <Badge variant="secondary" className="bg-white">{post.tags[0]}</Badge>
                                    )}
                                </div>
                                <div className="group relative">
                                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-primary transition-colors">
                                        <span className="absolute inset-0" />
                                        {post.title}
                                    </h3>
                                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.excerpt}</p>
                                </div>
                                <div className="relative mt-8 flex items-center gap-x-4">
                                    {/* Author handling */}
                                    <div className="flex gap-2 items-center">
                                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500 font-bold">
                                            {typeof post.author === 'object' ? post.author.name.charAt(0) : 'A'}
                                        </div>
                                        <div className="text-sm leading-6">
                                            <p className="font-semibold text-gray-900">
                                                {typeof post.author === 'object' ? post.author.name : post.author}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </Container>
        </div>
    )
}
