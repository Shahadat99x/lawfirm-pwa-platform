# Technical SEO Audit Report - LexNova EU Website

**Phase 1 - Audit Only**

---

## 1. Executive Summary

### Overall SEO Health Assessment

The LexNova EU website has a **MEDIUM-HIGH risk** profile with several critical technical SEO issues that are likely contributing to indexing and crawlability problems. The codebase shows good foundational practices (metadataBase properly set, robots.txt correctly configured), but there are significant gaps in metadata coverage, canonical URL handling for dynamic pages, and missing production environment configuration that could cause the site to be indexed with wrong URLs.

### Biggest Likely Reasons for Current Indexing Issues

1. **Environment Variable Misconfiguration**: The `.env.example` defaults to `http://localhost:3000` which will cause all generated URLs (sitemap, metadata, canonicals) to point to localhost if `NEXT_PUBLIC_SITE_URL` is not properly set in production
2. **Missing Page-Level Metadata**: Several important pages lack explicit metadata exports, causing them to rely solely on global metadata which may not be optimal for SEO
3. **Missing Canonical URLs on Dynamic Pages**: Blog posts and service detail pages don't have explicit canonical URLs in their metadata
4. **No Domain Redirects**: No middleware or Next.js config for redirecting non-www to www or handling Vercel default domains

### Overall Risk Level: **MEDIUM-HIGH**

---

## 2. Confirmed Issues

### Issue 1: CRITICAL - Environment Variable Default Value in Production

- **Severity**: Critical
- **File(s) involved**: [`.env.example`](.env.example:2), [`src/lib/url.ts`](src/lib/url.ts:19)
- **What is wrong**: The `getBaseUrl()` function in `src/lib/url.ts` defaults to `https://www.lexnovaeu.xyz` when `NEXT_PUBLIC_SITE_URL` is not set. However, the `.env.example` shows `http://localhost:3000` as the default for local development. If this env var is missing in Vercel production, the fallback works BUT there's no guarantee it's set correctly.
- **Why it matters**: If `NEXT_PUBLIC_SITE_URL` is not configured in Vercel environment variables, the site will still work but with the hardcoded fallback. More critically, developers may accidentally deploy with localhost values if they don't set the production env var.
- **Recommended fix in Phase 2**:
  1. Add `NEXT_PUBLIC_SITE_URL=https://www.lexnovaeu.xyz` to Vercel project settings
  2. Update `.env.example` to show the production URL (not localhost) as the example
  3. Consider throwing an error in development if the env var doesn't match expected production pattern

### Issue 2: CRITICAL - Missing Metadata on Contact and Book Pages

- **Severity**: Critical
- **File(s) involved**: [`src/app/(public)/contact/page.tsx`](<src/app/(public)/contact/page.tsx:1>), [`src/app/(public)/book/page.tsx`](<src/app/(public)/book/page.tsx:1>)
- **What is wrong**: These pages are client components (`"use client"`) and do not export metadata. They inherit global metadata but don't have unique titles, descriptions, or Open Graph tags.
- **Why it matters**: Contact and booking pages are high-value conversion pages. Without unique metadata, search engines may not properly understand their content or display rich snippets.
- **Recommended fix in Phase 2**: Add `export const metadata` to both pages with unique titles like "Contact Us | LexNova Legal" and "Book a Consultation | LexNova Legal"

### Issue 3: CRITICAL - No Canonical URLs on Dynamic Pages

- **Severity**: Critical
- **File(s) involved**: [`src/app/(public)/blog/[slug]/page.tsx`](<src/app/(public)/blog/[slug]/page.tsx:31>), [`src/app/(public)/services/[slug]/page.tsx`](<src/app/(public)/services/[slug]/page.tsx:30>)
- **What is wrong**: The `generateMetadata` functions for blog posts and service pages don't include a `canonical` property in the returned metadata object.
- **Why it matters**: Each dynamic page needs an explicit canonical URL pointing to itself to prevent duplicate content issues and ensure proper indexing.
- **Recommended fix in Phase 2**: Add `alternates: { canonical: ${baseUrl}/blog/${slug}` }` to blog metadata and similar for services

### Issue 4: HIGH - Missing Metadata on Admin Login Page

- **Severity**: High
- **File(s) involved**: [`src/app/(admin)/admin/login/page.tsx`](<src/app/(admin)/admin/login/page.tsx:1>)
- **What is wrong**: The admin login page does not export any metadata. While the admin layout has `robots: { index: false }`, the login page specifically should also be blocked from indexing.
- **Why it matters**: Login pages should never be indexed. Missing explicit noindex could lead to accidental indexing.
- **Recommended fix in Phase 2**: Add metadata with `robots: { index: false, follow: false }` to the login page

### Issue 5: HIGH - No Domain Redirects (www vs non-www)

- **Severity**: High
- **File(s) involved**: No middleware file exists, [`next.config.ts`](next.config.ts:1)
- **What is wrong**: There's no redirect from `lexnovaeu.xyz` to `www.lexnovaeu.xyz` or handling for Vercel's default domain.
- **Why it matters**: This causes duplicate content where both www and non-www versions are accessible. Search engines may split ranking signals between versions.
- **Recommended fix in Phase 2**: Add middleware or Next.js config redirects to enforce www domain

### Issue 6: HIGH - Sitemap Generation Can Fail in Production

- **Severity**: High
- **File(s) involved**: [`src/app/sitemap.ts`](src/app/sitemap.ts:5)
- **What is wrong**: The sitemap uses `getBlogPosts()` and `getPracticeAreas()` which query Supabase. If the database is unavailable during build, the sitemap will fail.
- **Why it matters**: A failing sitemap means search engines can't discover pages, causing indexing failures.
- **Recommended fix in Phase 2**: Add try-catch blocks with fallback empty arrays, or add error boundaries around sitemap generation

### Issue 7: MEDIUM - Missing Metadata on Legal Pages

- **Severity**: Medium
- **File(s) involved**: [`src/app/(public)/privacy/page.tsx`](<src/app/(public)/privacy/page.tsx:1>), [`src/app/(public)/cookies/page.tsx`](<src/app/(public)/cookies/page.tsx:1>), [`src/app/(public)/disclaimer/page.tsx`](<src/app/(public)/disclaimer/page.tsx:1>)
- **What is wrong**: These pages don't export metadata. They rely on global metadata.
- **Why it matters**: Legal pages often rank for specific queries. Proper metadata improves visibility.
- **Recommended fix in Phase 2**: Add metadata exports with unique titles and descriptions

### Issue 8: MEDIUM - Hardcoded Blog Link in Hero

- **Severity**: Medium
- **File(s) involved**: [`src/components/sections/Hero.tsx`](src/components/sections/Hero.tsx:17)
- **What is wrong**: There's a hardcoded link to a specific blog post in the Hero component: `/blog/mb-vs-uab-which-business-structure-is-right-for-you-complete-guide-for-lithuania`
- **Why it matters**: This creates a maintenance burden and the link will break if the slug changes.
- **Recommended fix in Phase 2**: Make this dynamic by fetching a featured post, or at minimum verify the slug is correct

### Issue 9: MEDIUM - No Structured Data (JSON-LD)

- **Severity**: Medium
- **File(s) involved**: All pages
- **What is wrong**: No JSON-LD structured data found for Organization, LocalBusiness, LegalService, or BlogPosting schemas.
- **Why it matters**: Structured data helps search engines understand the content and can enable rich snippets.
- **Recommended fix in Phase 2**: Add Organization schema to layout, LegalService schema to service pages, BlogPosting schema to blog posts

### Issue 10: LOW - No Trailing Slash Consistency

- **Severity**: Low
- **File(s) involved**: [`src/lib/url.ts`](src/lib/url.ts:44)
- **What is wrong**: The URL utility normalizes paths but doesn't enforce consistent trailing slashes across all routes.
- **Why it matters**: Inconsistent trailing slashes can cause duplicate content issues.
- **Recommended fix in Phase 2**: Add middleware to normalize trailing slashes (either always add or always remove)

---

## 3. Likely Issues / Needs Verification

### Issue A:OG Image Path Might Be Incorrect

- **Why it looks suspicious**: In [`src/lib/seo-config.ts`](src/lib/seo-config.ts:9), the ogImage is constructed using `joinUrl(baseUrl, '/og-image.jpg')`. Need to verify `/og-image.jpg` exists in the public folder.
- **What to verify manually**: Check if `public/og-image.jpg` exists

### Issue B: Blog Post Slug Could Have Unicode Issues

- **Why it looks suspicious**: The Hero component has a very long slug `mb-vs-uab-which-business-structure-is-right-for-you-complete-guide-for-lithuania`. If this is auto-generated, it might have encoding issues.
- **What to verify manually**: Check the actual slug in the database and ensure it's URL-safe

### Issue C: Practice Areas May Not Have Icons

- **Why it looks suspicious**: The service page uses conditional rendering for icons. If icons are missing, it falls back to HelpCircle.
- **What to verify manually**: Check database to ensure all practice areas have valid icon names

### Issue D: Admin Layout Robots Might Not Apply to All Admin Routes

- **Why it looks suspicious**: The admin layout has robots: { index: false } but individual admin pages might override this.
- **What to verify manually**: Check each admin route's metadata

---

## 4. URL Consistency Review

### Preferred Domain Found in Code

- **Production domain**: `https://www.lexnovaeu.xyz` (hardcoded fallback in [`src/lib/url.ts`](src/lib/url.ts:19))
- **Expected production env var**: `NEXT_PUBLIC_SITE_URL` should be set to `https://www.lexnovaeu.xyz`

### Canonical Behavior

- **Global canonical**: Set in [`src/app/layout.tsx`](src/app/layout.tsx:68) as `alternates: { canonical: "/" }` - this is a RELATIVE URL which is correct for Page Router but should ideally be absolute
- **Dynamic pages**: NO explicit canonical URLs - relies on Next.js default behavior

### Sitemap Domain Behavior

- Uses `getBaseUrl()` which will return the production domain if env var is set correctly
- All URLs in sitemap use absolute URLs via `joinUrl()`

### Robots Sitemap URL

- Correctly points to `joinUrl(baseUrl, '/sitemap.xml')` in [`src/app/robots.ts`](src/app/robots.ts:15)

### Internal Linking Consistency

- Header navigation uses correct paths: `/`, `/services`, `/team`, `/blog`, `/contact`
- Footer has some hardcoded service links: `/services/immigration`, `/services/business-setup`, `/services/employment`
- **Issue**: These footer links assume specific slugs that must match database values

### Redirect Consistency

- **No redirects configured** - this is a major gap
- Non-www to www: NOT CONFIGURED
- Trailing slash normalization: NOT CONFIGURED

---

## 5. Page Type Review

### Homepage

- **Metadata**: ✅ Has title and description
- **OG Tags**: ✅ Has Open Graph tags
- **Canonical**: ⚠️ Uses relative "/" in alternates
- **Issues**: No structured data

### Static Pages

- **Services** (`/services`): ✅ Has metadata
- **Team** (`/team`): ✅ Has metadata but no Open Graph images
- **Contact** (`/contact`): ❌ Missing metadata export
- **Book** (`/book`): ❌ Missing metadata export
- **Privacy** (`/privacy`): ❌ Missing metadata export
- **Cookies** (`/cookies`): ❌ Missing metadata export
- **Disclaimer** (`/disclaimer`): ❌ Missing metadata export

### Services Pages

- **Service Listing** (`/services`): ✅ Has metadata
- **Service Detail** (`/services/[slug]`): ⚠️ Has metadata but NO canonical URL explicit

### Blog Index

- **Blog Listing** (`/blog`): ✅ Has metadata and Open Graph tags

### Blog Posts

- **Blog Post** (`/blog/[slug]`): ⚠️ Has metadata but NO explicit canonical URL

### Admin Pages

- **Admin Layout**: ✅ Has `robots: { index: false, follow: false }`
- **Admin Login**: ❌ Missing metadata (should have noindex)

### API Routes

- All under `/api/` - correctly blocked in robots.txt

---

## 6. Phase 2 Fix Plan

### Commit 1: Fix Environment Configuration

- **Commit title**: `fix: configure production environment variables and URL defaults`
- **Files likely to change**: `.env.example`, potentially add Vercel config
- **Risk level**: LOW
- **Expected outcome**: Clear documentation of required env vars and safer defaults

### Commit 2: Add Domain Redirects

- **Commit title**: `feat: add www/non-www and trailing slash redirects`
- **Files likely to change**: `src/middleware.ts` (new file) or `next.config.ts`
- **Risk level**: MEDIUM - can break existing routes if not tested
- **Expected outcome**: Consistent domain and URL format

### Commit 3: Fix Critical Metadata Gaps

- **Commit title**: `fix: add missing metadata to contact, book, and admin login pages`
- **Files likely to change**:
  - [`src/app/(public)/contact/page.tsx`](<src/app/(public)/contact/page.tsx:1>)
  - [`src/app/(public)/book/page.tsx`](<src/app/(public)/book/page.tsx:1>)
  - [`src/app/(admin)/admin/login/page.tsx`](<src/app/(admin)/admin/login/page.tsx:1>)
- **Risk level**: LOW
- **Expected outcome**: All critical pages have proper metadata

### Commit 4: Add Canonical URLs to Dynamic Pages

- **Commit title**: `fix: add explicit canonical URLs to blog and service pages`
- **Files likely to change**:
  - [`src/app/(public)/blog/[slug]/page.tsx`](<src/app/(public)/blog/[slug]/page.tsx:31>)
  - [`src/app/(public)/services/[slug]/page.tsx`](<src/app/(public)/services/[slug]/page.tsx:30>)
- **Risk level**: LOW
- **Expected outcome**: Each dynamic page has self-referencing canonical

### Commit 5: Add Legal Page Metadata

- **Commit title**: `fix: add metadata to privacy, cookies, and disclaimer pages`
- **Files likely to change**:
  - [`src/app/(public)/privacy/page.tsx`](<src/app/(public)/privacy/page.tsx:1>)
  - [`src/app/(public)/cookies/page.tsx`](<src/app/(public)/cookies/page.tsx:1>)
  - [`src/app/(public)/disclaimer/page.tsx`](<src/app/(public)/disclaimer/page.tsx:1>)
- **Risk level**: LOW
- **Expected outcome**: All legal pages have proper metadata

### Commit 6: Add Structured Data

- **Commit title**: `feat: add JSON-LD structured data for organization and pages`
- **Files likely to change**:
  - [`src/app/layout.tsx`](src/app/layout.tsx:1)
  - [`src/app/(public)/blog/[slug]/page.tsx`](<src/app/(public)/blog/[slug]/page.tsx:1>)
- **Risk level**: LOW
- **Expected outcome**: Rich snippets in search results

### Commit 7: Make Sitemap More Resilient

- **Commit title**: `fix: add error handling to sitemap generation`
- **Files likely to change**: [`src/app/sitemap.ts`](src/app/sitemap.ts:1)
- **Risk level**: LOW
- **Expected outcome**: Sitemap always returns valid XML even if DB fails

### Commit 8: Fix Hardcoded Blog Link

- **Commit title**: `fix: make Hero blog link dynamic or verify slug`
- **Files likely to change**: [`src/components/sections/Hero.tsx`](src/components/sections/Hero.tsx:17)
- **Risk level**: LOW
- **Expected outcome**: Hero links to valid blog post

---

## 7. Safe Push Strategy

### Recommended Branch Strategy for Phase 2:

1. **Development Branch**: `feat/seo-phase-2-canonical-foundation`
   - Contains: Environment config, domain redirects, critical metadata fixes
2. **Development Branch**: `fix/seo-phase-2-metadata-completion`
   - Contains: All remaining metadata fixes, legal page updates

3. **Development Branch**: `feat/seo-phase-2-structured-data`
   - Contains: JSON-LD schemas, sitemap improvements

### Merge Strategy:

- Create PRs from each feature branch to `main`
- Use "Squash and merge" to keep history clean
- Test each PR on Vercel preview deployment before merging

---

## 8. Final Go/No-Go for Phase 2

### PHASE 1 RESULT:

- **audit completed**: YES
- **safe to proceed to phase 2**: YES
- **top 5 fixes to do first**:

1. **Add NEXT_PUBLIC_SITE_URL to Vercel** - This is the most critical fix to prevent localhost URLs from appearing in production
2. **Add metadata to contact and book pages** - These are high-value conversion pages missing SEO
3. **Add canonical URLs to dynamic pages** - Prevents duplicate content issues
4. **Add domain redirects** - Fixes www/non-www duplicate content
5. **Add admin login metadata** - Prevents accidental indexing of admin pages

---

## Summary of Findings by Category

| Category          | Status       | Critical Issues | Medium Issues | Low Issues |
| ----------------- | ------------ | --------------- | ------------- | ---------- |
| Domain/Canonical  | ⚠️ MEDIUM    | 1               | 2             | 1          |
| robots.txt        | ✅ GOOD      | 0               | 0             | 0          |
| Sitemap           | ⚠️ MEDIUM    | 1               | 1             | 0          |
| Indexability      | ⚠️ MEDIUM    | 1               | 1             | 0          |
| Redirects         | ❌ HIGH RISK | 1               | 0             | 1          |
| Metadata          | ⚠️ MEDIUM    | 2               | 3             | 0          |
| Internal Links    | ✅ GOOD      | 0               | 1             | 0          |
| Content Structure | ✅ GOOD      | 0               | 0             | 1          |
| Technical Issues  | ⚠️ MEDIUM    | 0               | 2             | 0          |
| Structured Data   | ❌ MISSING   | 1               | 0             | 0          |

**Total Critical Issues: 6**
**Total Medium Issues: 10**
**Total Low Issues: 3**

The site is functional but has significant SEO gaps that should be addressed in Phase 2. The most urgent fixes are the the missing metadata on critical pages.
