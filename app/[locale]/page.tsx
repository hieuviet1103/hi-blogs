import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import PostCard from '@/components/blog/PostCard'
import CategoryCard from '@/components/blog/CategoryCard'

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  await setRequestLocale(locale)
  const t = await getTranslations()
  const supabase = await createClient()

  // Fetch featured posts
  const { data: posts } = await supabase
    .from('posts')
    //.select('*, categories(*), profiles(*)')
    .select('*, categories(*), post_tags(tags(*))')
    .eq('status', 'published')
    .eq('featured', true)
    .order('published_at', { ascending: false })
    .limit(6)

  // Fetch categories
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('order_index', { ascending: true })

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">
          {t('home.title', { defaultValue: 'Welcome to Hieu Solutions' })}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {t('home.subtitle', {
            defaultValue: 'Personal brand website sharing experiences about travel, technology, and AI',
          })}
        </p>
      </section>

      {/* Categories */}
      {categories && categories.length > 0 && (
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {t('home.categories', { defaultValue: 'Categories' })}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} locale={locale} />
            ))}
          </div>
        </section>
      )}

      {/* Featured Posts */}
      {posts && posts.length > 0 && (
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">
              {t('home.featured_posts', { defaultValue: 'Featured Posts' })}
            </h2>
            <Link
              href={`/${locale}/blog`}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              {t('home.view_all', { defaultValue: 'View All' })} →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} locale={locale} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

