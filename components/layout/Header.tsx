'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { locales, localeNames } from '@/i18n/config'

export default function Header() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()

  const getLocalizedPath = (path: string) => {
    return `/${locale}${path}`
  }

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href={getLocalizedPath('/')} className="text-2xl font-bold text-primary-600">
            Hieu Solutions
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href={getLocalizedPath('/')}
              className="hover:text-primary-600 transition-colors"
            >
              {t('home')}
            </Link>
            <Link
              href={getLocalizedPath('/blog')}
              className="hover:text-primary-600 transition-colors"
            >
              {t('blog')}
            </Link>
            <Link
              href={getLocalizedPath('/about')}
              className="hover:text-primary-600 transition-colors"
            >
              {t('about')}
            </Link>
            <Link
              href={getLocalizedPath('/contact')}
              className="hover:text-primary-600 transition-colors"
            >
              {t('contact')}
            </Link>
          </nav>

          {/* Language Switcher */}
          <div className="flex items-center space-x-2">
            {locales.map((loc) => {
              const pathWithoutLocale = pathname.replace(`/${locale}`, '')
              const newPath = `/${loc}${pathWithoutLocale}`
              return (
                <Link
                  key={loc}
                  href={newPath}
                  className={`px-2 py-1 rounded text-sm ${
                    locale === loc
                      ? 'bg-primary-600 text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {localeNames[loc]}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </header>
  )
}

