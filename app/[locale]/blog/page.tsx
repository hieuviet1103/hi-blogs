import { getTranslations, setRequestLocale } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import PostCard from '@/components/blog/PostCard'

export const dynamic = 'force-dynamic'

export default async function BlogPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ page?: string; category?: string; tag?: string }>
}) {
  const { locale } = await params
  const { page = '1', category, tag } = await searchParams
  await setRequestLocale(locale)
  const t = await getTranslations()
  const supabase = await createClient()

  const pageNumber = parseInt(page, 10)
  const postsPerPage = 12
  const from = (pageNumber - 1) * postsPerPage
  const to = from + postsPerPage - 1

  let query = supabase
    .from('posts')
    //.select('*, categories(*), profiles(*)', { count: 'exact' })
    .select('*, categories(*), post_tags(tags(*))', { count: 'exact' })
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .range(from, to)

  if (category) {
    query = query.eq('categories.slug', category)
  }

  if (tag) {
    query = query.contains('tags', [{ slug: tag }])
  }

  const { data: posts, count } = await query

  const totalPages = count ? Math.ceil(count / postsPerPage) : 1

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">
        {t('blog.all_posts', { defaultValue: 'All Posts' })}
      </h1>

      {posts && posts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} locale={locale} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2">
              {pageNumber > 1 && (
                <a
                  href={`?page=${pageNumber - 1}${category ? `&category=${category}` : ''}${tag ? `&tag=${tag}` : ''}`}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Previous
                </a>
              )}
              <span className="px-4 py-2">
                Page {pageNumber} of {totalPages}
              </span>
              {pageNumber < totalPages && (
                <a
                  href={`?page=${pageNumber + 1}${category ? `&category=${category}` : ''}${tag ? `&tag=${tag}` : ''}`}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Next
                </a>
              )}
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-600 py-12">
          {t('blog.no_posts', { defaultValue: 'No posts yet' })}
        </p>
      )}
    </div>
  )
}

