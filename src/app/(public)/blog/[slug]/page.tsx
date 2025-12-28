import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import Container from "@/components/ui/Container"
import { getBlogPostBySlug, getBlogPosts } from "@/lib/data"
import { Badge } from "@/components/ui/Badge"
import { ArrowLeft } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface PageProps {
    params: Promise<{ slug: string }>
}

export const revalidate = 3600

export async function generateStaticParams() {
    try {
        const posts = await getBlogPosts()
        return posts.map((post) => ({
            slug: post.slug,
        }))
    } catch (err) {
        return []
    }
}

export async function generateMetadata({ params }: PageProps) {
    try {
        const { slug } = await params
        const post = await getBlogPostBySlug(slug)

        if (!post) {
            return {
                title: 'Post Not Found | LexNova Legal',
                description: 'The requested blog post could not be found.',
            }
        }

        const ogImage = post.cover_image_url || '/og-image.jpg' // Fallback to safe default if no cover

        return {
            title: `${post.title} | LexNova Legal`,
            description: post.excerpt || 'Read more on LexNova Legal blog',
            openGraph: {
                title: post.title,
                description: post.excerpt || '',
                type: 'article',
                publishedTime: post.publishedAt,
                authors: [typeof post.author === 'object' ? post.author.name : post.author],
                images: [
                    {
                        url: ogImage,
                        width: 1200,
                        height: 630,
                        alt: post.title,
                    },
                ],
            },
            twitter: {
                card: 'summary_large_image',
                title: post.title,
                description: post.excerpt || '',
                images: [ogImage],
            },
        }
    } catch (error) {
        console.error('Error generating blog post metadata:', error)
        return {
            title: 'Blog Post | LexNova Legal',
            description: 'Legal insights and advice from LexNova Legal',
        }
    }
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params
    const post = await getBlogPostBySlug(slug)

    if (!post) {
        notFound()
    }

    return (
        <div className="py-16 sm:py-24 bg-white">
            <Container>
                <div className="mx-auto max-w-3xl">
                    <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
                        <ArrowLeft className="mr-1 h-4 w-4" /> Back to Blog
                    </Link>
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-x-4 text-xs mb-6">
                            {post.publishedAt && (
                                <time dateTime={post.publishedAt} className="text-gray-500">
                                    {new Date(post.publishedAt).toLocaleDateString()}
                                </time>
                            )}
                            <span className="text-gray-300">·</span>
                            <span className="text-gray-500">{post.readingTime}</span>
                        </div>
                        {post.cover_image_url && (
                            <div className="aspect-video w-full rounded-2xl overflow-hidden mb-8 bg-gray-100 shadow-md relative">
                                <Image
                                    src={post.cover_image_url}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                    priority
                                    sizes="(max-width: 768px) 100vw, 800px"
                                />
                            </div>
                        )}
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-serif mb-6">{post.title}</h1>
                        <div className="flex justify-center gap-2 mb-8">
                            {post.tags && Array.isArray(post.tags) && post.tags.map(tag => (
                                <Badge key={tag} variant="secondary">{tag}</Badge>
                            ))}
                        </div>
                    </div>

                    <div className="prose prose-lg prose-slate mx-auto prose-headings:font-serif prose-a:text-primary">
                        {post.content ? (
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {post.content}
                            </ReactMarkdown>
                        ) : (
                            <p className="text-gray-500 italic">No content available</p>
                        )}
                    </div>

                    <div className="mt-16 border-t border-gray-200 pt-8 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-gray-500">
                            {typeof post.author === 'object' ? post.author.name.charAt(0) : 'A'}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-900">
                                {typeof post.author === 'object' ? post.author.name : post.author}
                            </p>
                            {typeof post.author === 'object' && (
                                <p className="text-sm text-gray-500">{post.author.role}</p>
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}
