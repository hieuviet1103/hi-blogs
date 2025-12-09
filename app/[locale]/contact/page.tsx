import { getTranslations } from 'next-intl/server'

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations()

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">
        {t('contact.title', { defaultValue: 'Contact' })}
      </h1>
      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-600 mb-6">
          {t('contact.description', {
            defaultValue: 'Get in touch with me through the following channels.',
          })}
        </p>
        {/* Add contact form or links here */}
      </div>
    </div>
  )
}

