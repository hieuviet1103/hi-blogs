import { setRequestLocale } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import BlogPost from '@/components/blog/BlogPost'

export async function generateStaticParams() {
  // Use env variables directly for build time
  const { createClient } = await import('@supabase/supabase-js')
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  
  const { data: posts } = await supabase.from('posts').select('slug').eq('status', 'published')

  return posts?.map((post) => ({
    slug: post.slug,
  })) || []
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  await setRequestLocale(locale)

  const supabase = await createClient()

  const { data: post } = await supabase
    .from('posts')
    .select('*, categories(*), post_tags(tags(*))')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (!post) {
    notFound()
  }

  // Update view count
  await supabase.from('posts').update({ view_count: (post.view_count || 0) + 1 }).eq('id', post.id)

  return <BlogPost post={post} locale={locale} />
}
