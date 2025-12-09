import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'
import { locales } from '@/i18n/config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient()
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hieu-solutions.vercel.app'

  // Get all published posts
  const { data: posts } = await supabase
    .from('posts')
    .select('slug, updated_at, published_at')
    .eq('status', 'published')

  // Get all categories
  const { data: categories } = await supabase
    .from('categories')
    .select('slug')

  const routes: MetadataRoute.Sitemap = []

  // Add homepage for each locale
  locales.forEach((locale) => {
    routes.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    })
    routes.push({
      url: `${baseUrl}/${locale}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    })
    routes.push({
      url: `${baseUrl}/${locale}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    })
  })

  // Add post pages
  posts?.forEach((post) => {
    locales.forEach((locale) => {
      routes.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.updated_at || post.published_at || new Date()),
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    })
  })

  // Add category pages
  categories?.forEach((category) => {
    locales.forEach((locale) => {
      routes.push({
        url: `${baseUrl}/${locale}/blog/category/${category.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
      })
    })
  })

  return routes
}

