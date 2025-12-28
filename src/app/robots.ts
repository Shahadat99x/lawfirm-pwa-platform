import { type MetadataRoute } from 'next'
import { clientEnv } from '@/lib/env'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = clientEnv.NEXT_PUBLIC_SITE_URL

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin/', '/api/'],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
