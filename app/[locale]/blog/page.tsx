import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import BlogList from '@/components/blog/BlogList'

export const dynamic = 'force-dynamic'

export default async function BlogPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ page?: string }>
}) {
  const { locale } = await params
  await setRequestLocale(locale)
  
  const t = await getTranslations()
  const supabase = await createClient()

  const searchParamsResolved = await searchParams
  const page = Number(searchParamsResolved.page) || 1
  const perPage = 9

  const from = (page - 1) * perPage
  const to = from + perPage - 1

  const { data: posts, count } = await supabase
    .from('posts')
    .select('*, categories(*), post_tags(tags(*))', { count: 'exact' })
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .range(from, to)

  return <BlogList posts={posts || []} count={count || 0} locale={locale} page={page} />
}
