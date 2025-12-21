export interface PracticeArea {
    id: string
    title: string
    slug: string
    description?: string // Mapped from excerpt for compatibility
    excerpt?: string
    content: string
    icon?: string
}

export interface Lawyer {
    id: string
    name: string
    title?: string // role -> title in db, but keeping compat if needed
    role?: string
    slug: string
    bio: string
    languages: string[]
    photo_url?: string
    image?: string // compat
    is_active?: boolean
    email?: string
}

export interface Testimonial {
    id: string
    name: string // author -> name
    author?: string // compat
    text: string
    role?: string
    company?: string
    rating?: number
    country?: string
}

export interface BlogPost {
    id: string
    title: string
    slug: string
    excerpt?: string
    content: string
    cover_image_url?: string
    published_at?: string
    publishedAt?: string // compat
    author: Lawyer | string // string name in db initially
    tags: string[]
    reading_time?: string // mapped from db text or int
    readingTime?: string // compat
    status?: 'draft' | 'published'
}

export interface SiteSettings {
    firm_name: string
    phone?: string
    email?: string
    whatsapp?: string
    address?: string
    city?: string
    country?: string
    languages?: string[]
}
