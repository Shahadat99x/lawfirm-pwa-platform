import { type MetadataRoute } from 'next'
import { getBlogPosts, getPracticeAreas } from '@/lib/data'
import { clientEnv } from '@/lib/env'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = clientEnv.NEXT_PUBLIC_SITE_URL

    // Static routes
    const routes = [
        '',
        '/services',
        '/team',
        '/blog',
        '/contact',
        '/book',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Dynamic routes: Blog Posts
    const posts = await getBlogPosts()
    const postRoutes = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.publishedAt || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    // Dynamic routes: Services
    const practiceAreas = await getPracticeAreas()
    const serviceRoutes = practiceAreas.map((area) => ({
        url: `${baseUrl}/services/${area.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    return [...routes, ...postRoutes, ...serviceRoutes]
}
