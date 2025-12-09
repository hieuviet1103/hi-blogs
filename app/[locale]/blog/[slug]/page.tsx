import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import { format } from 'date-fns'
import Link from 'next/link'
import PostCard from '@/components/blog/PostCard'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const supabase = await createClient()

  const { data: post } = await supabase
    .from('posts')
    .select('*, categories(*)')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (!post) {
    return {}
  }

  const title = locale === 'vi' ? post.title_vi : post.title_en
  const excerpt = locale === 'vi' ? post.excerpt_vi : post.excerpt_en

  return {
    title: title,
    description: excerpt || title,
    openGraph: {
      title: title,
      description: excerpt || title,
      images: post.cover_image ? [post.cover_image] : [],
    },
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  await setRequestLocale(locale)
  const t = await getTranslations()
  const supabase = await createClient()

  const { data: post } = await supabase
    .from('posts')
    //.select('*, categories(*), profiles(*), post_tags(tags(*))')
    .select('*, categories(*), post_tags(tags(*))')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

    // const { data: post } =  await supabase
    // .from('posts')
    // .select('*, categories(*)')
    // .eq('slug', slug)
    // .eq('status', 'published')
    // .single()

  if (!post) {
    notFound()
  }

  // Get related posts
  const { data: relatedPosts } = await supabase
    .from('posts')
    //.select('*, categories(*), profiles(*)')
    .select('*, categories(*), post_tags(tags(*))')

    .eq('status', 'published')
    .eq('category_id', post.category_id)
    .neq('id', post.id)
    .limit(3)

  const title =
    (locale === 'vi' ? post.title_vi : post.title_en) ||
    post.title_vi ||
    post.title_en

  const content =
    (locale === 'vi' ? post.content_vi : post.content_en) ||
    post.content_vi ||
    post.content_en

  const categoryName =
    (locale === 'vi' ? post.categories?.name_vi : post.categories?.name_en) ||
    post.categories?.name_vi ||
    post.categories?.name_en

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Header */}
      <header className="mb-8">
        {categoryName && (
          <Link
            href={`/${locale}/blog/category/${post.categories.slug}`}
            className="text-primary-600 hover:text-primary-700 font-medium mb-4 inline-block"
          >
            {categoryName}
          </Link>
        )}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        <div className="flex items-center text-gray-600 text-sm space-x-4">
          {post.published_at && (
            <span>
              {t('blog.published_on')}{' '}
              {format(new Date(post.published_at), 'MMMM dd, yyyy', {
                locale: locale === 'vi' ? require('date-fns/locale/vi') : undefined,
              })}
            </span>
          )}
          {post.profiles && (
            <span>
              {t('blog.author')}: {post.profiles.full_name || 'Admin'}
            </span>
          )}
        </div>
      </header>

      {/* Cover Image */}
      {post.cover_image && (
        <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.cover_image}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Content */}
      <div
        className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-primary-600 prose-img:rounded-lg"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* Tags */}
      {post.post_tags && post.post_tags.length > 0 && (
        <div className="mt-8 pt-8 border-t">
          <h3 className="font-bold mb-4">{t('blog.tags')}:</h3>
          <div className="flex flex-wrap gap-2">
            {post.post_tags.map((pt: any) => {
              const tagName = locale === 'vi' ? pt.tags.name_vi : pt.tags.name_en
              return (
                <Link
                  key={pt.tags.id}
                  href={`/${locale}/blog?tag=${pt.tags.slug}`}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200"
                >
                  {tagName}
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* Related Posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="mt-16 pt-8 border-t">
          <h2 className="text-3xl font-bold mb-8">{t('blog.related_posts')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <PostCard key={relatedPost.id} post={relatedPost} locale={locale} />
            ))}
          </div>
        </section>
      )}
    </article>
  )
}

