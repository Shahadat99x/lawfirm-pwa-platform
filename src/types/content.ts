export interface PracticeArea {
    id: string
    title: string
    slug: string
    description: string
    content: string
    icon: string // Lucide icon name
}

export interface Lawyer {
    id: string
    name: string
    role: string
    image: string
    bio: string
    languages: string[]
    email: string
}

export interface Testimonial {
    id: string
    text: string
    author: string
    role?: string
    company?: string
}

export interface BlogPost {
    id: string
    title: string
    slug: string
    excerpt: string
    content: string // HTML or Markdown
    coverImage?: string
    publishedAt: string
    author: Lawyer
    tags: string[]
    readingTime: string
}
