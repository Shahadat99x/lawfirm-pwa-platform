import { type MetadataRoute } from 'next'
import { getBaseUrl, joinUrl } from '@/lib/url'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = getBaseUrl()

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin/', '/api/'],
            },
        ],
        sitemap: joinUrl(baseUrl, '/sitemap.xml'),
    }
}
