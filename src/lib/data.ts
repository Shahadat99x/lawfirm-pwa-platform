import { createClient } from '@/lib/supabase/server'
import { PracticeArea, Lawyer, Testimonial, BlogPost, SiteSettings } from '@/types/content'

// --- Helpers ---

// Handle missing/null values for compatibility
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapPracticeArea(row: any): PracticeArea {
    return {
        ...row,
        description: row.excerpt || '', // Fallback for UI that expects description
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapLawyer(row: any): Lawyer {
    return {
        ...row,
        role: row.title, // Map DB 'title' to UI 'role'
        image: row.photo_url || undefined,
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapTestimonial(row: any): Testimonial {
    return {
        ...row,
        author: row.name, // Map DB 'name' to UI 'author'
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapBlogPost(row: any): BlogPost {
    return {
        ...row,
        publishedAt: row.published_at,
        readingTime: row.reading_time || '5 min read',
        // If author is a string in DB (from seed), we object-ify it for UI compatibility locally
        // or keep it simple if UI adapts. 
        // The previous mock data had author as a full object. 
        // We will patch it to match the UI expectation of an object with name/role.
        author: typeof row.author === 'string'
            ? { name: row.author, role: 'Author', id: '0', slug: '', bio: '', languages: [] }
            : row.author,
    }
}

// --- Data Fetchers ---

export async function getSiteSettings(): Promise<SiteSettings | null> {
    const supabase = await createClient()
    const { data, error } = await supabase.from('site_settings').select('*').single()

    if (error) {
        console.warn('Error fetching site settings:', error.message)
        return null
    }
    return data
}

export async function getPracticeAreas(): Promise<PracticeArea[]> {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('practice_areas')
        .select('*')
        .order('created_at', { ascending: true })

    if (error) {
        throw new Error(`Supabase error: ${error.message}`)
    }
    return (data || []).map(mapPracticeArea)
}

export async function getPracticeAreaBySlug(slug: string): Promise<PracticeArea | null> {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('practice_areas')
        .select('*')
        .eq('slug', slug)
        .single()

    if (error) return null
    return mapPracticeArea(data)
}

export async function getLawyers(): Promise<Lawyer[]> {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('lawyers')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true })

    if (error) {
        throw new Error(`Supabase error: ${error.message}`)
    }
    return (data || []).map(mapLawyer)
}

export async function getTestimonials(): Promise<Testimonial[]> {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_published', true)
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false })
        .limit(6) // Increased limit just in case

    if (error) {
        // Non-critical, return empty
        console.warn('Error fetching testimonials', error.message)
        return []
    }
    return (data || []).map(mapTestimonial)
}

export async function getBlogPosts(): Promise<BlogPost[]> {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false })

    if (error) {
        throw new Error(`Supabase error: ${error.message}`)
    }
    return (data || []).map(mapBlogPost)
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('slug', slug)
            .eq('status', 'published')
            .maybeSingle() // Use maybeSingle() instead of single() to avoid throwing on no results
        
        if (error) {
            console.error(`Error fetching blog post with slug "${slug}":`, error.message)
            return null
        }
        
        if (!data) {
            return null
        }
        
        return mapBlogPost(data)
    } catch (err) {
        console.error(`Unexpected error in getBlogPostBySlug for slug "${slug}":`, err)
        return null
    }
}
