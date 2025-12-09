'use client'

import Link from 'next/link'

interface CategoryCardProps {
  category: any
  locale: string
}

export default function CategoryCard({ category, locale }: CategoryCardProps) {
  const name = locale === 'vi' ? category.name_vi : category.name_en
  const description = locale === 'vi' ? category.description_vi : category.description_en

  return (
    <Link
      href={`/${locale}/blog/category/${category.slug}`}
      className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4"
      style={{ borderLeftColor: category.color || '#3B82F6' }}
    >
      <div className="flex items-center mb-3">
        <span className="text-3xl mr-3">{category.icon}</span>
        <h3 className="text-xl font-bold">{name}</h3>
      </div>
      {description && (
        <p className="text-gray-600 text-sm">{description}</p>
      )}
    </Link>
  )
}

