import { setRequestLocale } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import HeroSection from '@/components/home/HeroSection'
import FeaturedPosts from '@/components/home/FeaturedPosts'
import CategoriesSection from '@/components/home/CategoriesSection'

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  await setRequestLocale(locale)

  const supabase = await createClient()

  // Get featured posts
  const { data: featuredPosts } = await supabase
    .from('posts')
    .select('*, categories(*)')
    .eq('status', 'published')
    .eq('featured', true)
    .order('published_at', { ascending: false })
    .limit(3)

  // Get categories
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('order_index', { ascending: true })

  return (
    <div>
      <HeroSection locale={locale} />
      {featuredPosts && featuredPosts.length > 0 && (
        <FeaturedPosts posts={featuredPosts} locale={locale} />
      )}
      {categories && categories.length > 0 && (
        <CategoriesSection categories={categories} locale={locale} />
      )}
    </div>
  )
}
