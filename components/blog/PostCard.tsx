'use client'

import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { useLocale } from 'next-intl'

interface PostCardProps {
  post: any
  locale: string
}

export default function PostCard({ post, locale }: PostCardProps) {
  const title = locale === 'vi' ? post.title_vi : post.title_en
  const excerpt = locale === 'vi' ? post.excerpt_vi : post.excerpt_en
  const categoryName = locale === 'vi' ? post.categories?.name_vi : post.categories?.name_en

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {post.cover_image && (
        <Link href={`/${locale}/blog/${post.slug}`}>
          <div className="relative h-48 w-full">
            <Image
              src={post.cover_image}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        </Link>
      )}
      <div className="p-6">
        {categoryName && (
          <span className="text-sm text-primary-600 font-medium">
            {categoryName}
          </span>
        )}
        <Link href={`/${locale}/blog/${post.slug}`}>
          <h3 className="text-xl font-bold mt-2 mb-2 hover:text-primary-600 transition-colors">
            {title}
          </h3>
        </Link>
        {excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-2">{excerpt}</p>
        )}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>
            {post.published_at &&
              format(new Date(post.published_at), 'MMM dd, yyyy', {
                locale: locale === 'vi' ? require('date-fns/locale/vi') : undefined,
              })}
          </span>
          <Link
            href={`/${locale}/blog/${post.slug}`}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Read more →
          </Link>
        </div>
      </div>
    </article>
  )
}

