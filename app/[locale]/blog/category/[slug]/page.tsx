import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import PostCard from '@/components/blog/PostCard'

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  await setRequestLocale(locale)
  const t = await getTranslations()
  const supabase = await createClient()

  // Get category
  const { data: category } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!category) {
    notFound()
  }



  // Get posts in this category
  const { data: posts } = await supabase
    .from('posts')
    //.select('*, categories(*), profiles(*)')
    .select('*, categories(*), post_tags(tags(*))')
    .eq('status', 'published')
    .eq('category_id', category.id)
    .order('published_at', { ascending: false })

  console.log("posts", posts);
  const categoryName = locale === 'vi' ? category.name_vi : category.name_en
  const categoryDescription = locale === 'vi' ? category.description_vi : category.description_en

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <span className="text-4xl mr-4">{category.icon}</span>
          <h1 className="text-4xl font-bold">{categoryName}</h1>
        </div>
        {categoryDescription && (
          <p className="text-xl text-gray-600">{categoryDescription}</p>
        )}
      </div>

      {posts && posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} locale={locale} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 py-12">
          {t('blog.no_posts', { defaultValue: 'No posts in this category yet' })}
        </p>
      )}
    </div>
  )
}

