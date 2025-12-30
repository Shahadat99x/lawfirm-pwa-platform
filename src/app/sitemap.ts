import { type MetadataRoute } from 'next'
import { getBlogPosts, getPracticeAreas } from '@/lib/data'
import { getBaseUrl, joinUrl } from '@/lib/url'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = getBaseUrl()

    // Static routes
    const routes = [
        '/',
        '/services',
        '/team',
        '/blog',
        '/contact',
        '/book',
        '/data-deletion',
    ].map((route) => ({
        url: joinUrl(baseUrl, route),
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '/' ? 1 : 0.8,
    }))

    // Dynamic routes: Blog Posts
    const posts = await getBlogPosts()
    const postRoutes = posts.map((post) => ({
        url: joinUrl(baseUrl, `/blog/${post.slug}`),
        lastModified: new Date(post.publishedAt || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    // Dynamic routes: Services
    const practiceAreas = await getPracticeAreas()
    const serviceRoutes = practiceAreas.map((area) => ({
        url: joinUrl(baseUrl, `/services/${area.slug}`),
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    return [...routes, ...postRoutes, ...serviceRoutes]
}
