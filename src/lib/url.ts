/**
 * URL Utilities
 * 
 * Provides canonical URL helpers to ensure:
 * 1. Consistent base URL across sitemap, robots, and metadata
 * 2. No double slashes in generated URLs
 */

/**
 * Get the canonical base URL for the site.
 * 
 * Priority:
 * 1. NEXT_PUBLIC_SITE_URL (from environment)
 * 2. Fallback to https://www.lexnovaeu.xyz
 * 
 * Always strips trailing slash for consistency.
 */
export function getBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.lexnovaeu.xyz'
  // Remove trailing slash if present
  return url.endsWith('/') ? url.slice(0, -1) : url
}

/**
 * Safely join base URL with path, ensuring exactly one slash between them.
 * 
 * @param base - Base URL (will be normalized)
 * @param path - Path to append (can start with / or not)
 * @returns Properly formatted URL with no double slashes
 * 
 * @example
 * joinUrl('https://example.com/', '/about') // 'https://example.com/about'
 * joinUrl('https://example.com', 'about') // 'https://example.com/about'
 * joinUrl('https://example.com/', '/') // 'https://example.com/' 
 */
export function joinUrl(base: string, path: string): string {
  // Normalize base (remove trailing slash)
  const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base
  
  // Normalize path (ensure leading slash)
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  
  // Special case: if path is just '/', return base with trailing slash
  if (normalizedPath === '/') {
    return `${normalizedBase}/`
  }
  
  return `${normalizedBase}${normalizedPath}`
}
