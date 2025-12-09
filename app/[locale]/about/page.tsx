import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations()

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">
        {t('about.title', { defaultValue: 'About Me' })}
      </h1>
      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-600 mb-6">
          {t('about.description', {
            defaultValue:
              'Welcome to my personal brand website! I share experiences about travel, technology, and artificial intelligence.',
          })}
        </p>
        {/* Add more content here */}
      </div>
    </div>
  )
}

