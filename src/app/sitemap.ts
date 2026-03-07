import { type MetadataRoute } from 'next'
import { getBlogPosts, getPracticeAreas } from '@/lib/data'
import { getBaseUrl, joinUrl } from '@/lib/url'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = getBaseUrl()

    // Static routes - always available
    const routes: MetadataRoute.Sitemap = [
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

    // Dynamic routes: Blog Posts - graceful fallback if DB unavailable
    let postRoutes: MetadataRoute.Sitemap = []
    try {
        const posts = await getBlogPosts()
        postRoutes = posts.map((post) => ({
            url: joinUrl(baseUrl, `/blog/${post.slug}`),
            lastModified: new Date(post.publishedAt || new Date()),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }))
    } catch (error) {
        // Log error but don't break sitemap - static pages will still be served
        console.warn('Sitemap: Failed to fetch blog posts, excluding from sitemap:', error instanceof Error ? error.message : 'Unknown error')
    }

    // Dynamic routes: Services - graceful fallback if DB unavailable
    let serviceRoutes: MetadataRoute.Sitemap = []
    try {
        const practiceAreas = await getPracticeAreas()
        serviceRoutes = practiceAreas.map((area) => ({
            url: joinUrl(baseUrl, `/services/${area.slug}`),
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }))
    } catch (error) {
        // Log error but don't break sitemap - static pages will still be served
        console.warn('Sitemap: Failed to fetch practice areas, excluding from sitemap:', error instanceof Error ? error.message : 'Unknown error')
    }

    return [...routes, ...postRoutes, ...serviceRoutes]
}
