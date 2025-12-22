import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Plus, Edit2 } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { BlogListActions } from '@/components/admin/blog/BlogListActions'

export const dynamic = 'force-dynamic'

export default async function AdminBlogPage() {
    const supabase = await createClient()
    const { data: posts } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Blog Posts</h1>
                    <p className="text-muted-foreground text-gray-500">Manage your articles and insights.</p>
                </div>
                <Link href="/admin/blog/new">
                    <Button className="w-full sm:w-auto">
                        <Plus className="mr-2 h-4 w-4" /> New Post
                    </Button>
                </Link>
            </div>

            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-700 border-b">
                            <tr>
                                <th className="py-3 px-4 sm:px-6 font-medium">Title</th>
                                <th className="py-3 px-4 sm:px-6 font-medium hidden xs:table-cell">Status</th>
                                <th className="py-3 px-4 sm:px-6 font-medium hidden sm:table-cell">Published</th>
                                <th className="py-3 px-4 sm:px-6 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {(posts || []).length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="py-12 text-center text-gray-500">
                                        No posts found. Create your first insight!
                                    </td>
                                </tr>
                            ) : (
                                posts!.map((post) => (
                                    <tr key={post.id} className="hover:bg-gray-50 group transition-colors">
                                        <td className="py-4 px-4 sm:px-6 font-medium text-gray-900 max-w-[200px] sm:max-w-md">
                                            <div className="line-clamp-1">{post.title}</div>
                                            <div className="text-xs text-gray-500 font-normal mt-1 truncate">
                                                /{post.slug}
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 sm:px-6 hidden xs:table-cell">
                                            <Badge variant={post.status === 'published' ? 'default' : 'secondary'} className="whitespace-nowrap">
                                                {post.status}
                                            </Badge>
                                        </td>
                                        <td className="py-4 px-4 sm:px-6 text-gray-500 hidden sm:table-cell whitespace-nowrap">
                                            {post.published_at
                                                ? new Date(post.published_at).toLocaleDateString()
                                                : <span className="italic opacity-50">Draft</span>
                                            }
                                        </td>
                                        <td className="py-4 px-4 sm:px-6 text-right">
                                            <BlogListActions postId={post.id} />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
