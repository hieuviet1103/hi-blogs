'use client'

import { Layout, Menu, Button, Dropdown, Space } from 'antd'
import { GlobalOutlined, HomeOutlined, ReadOutlined, UserOutlined, MailOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'

const { Header } = Layout

export default function AppHeader({ locale }: { locale: string }) {
  const t = useTranslations()
  const pathname = usePathname()

  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: <Link href={`/${locale}`}>{t('nav.home')}</Link>,
    },
    {
      key: 'blog',
      icon: <ReadOutlined />,
      label: <Link href={`/${locale}/blog`}>{t('nav.blog')}</Link>,
    },
    {
      key: 'about',
      icon: <UserOutlined />,
      label: <Link href={`/${locale}/about`}>{t('nav.about')}</Link>,
    },
    {
      key: 'contact',
      icon: <MailOutlined />,
      label: <Link href={`/${locale}/contact`}>{t('nav.contact')}</Link>,
    },
  ]

  const languageItems = [
    {
      key: 'vi',
      label: <Link href={pathname.replace(/^\/(en|vi)/, '/vi')}>🇻🇳 Tiếng Việt</Link>,
    },
    {
      key: 'en',
      label: <Link href={pathname.replace(/^\/(en|vi)/, '/en')}>🇺🇸 English</Link>,
    },
  ]

  return (
    <Header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
        <Link
          href={`/${locale}`}
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textDecoration: 'none',
          }}
        >
          Hieu Solutions
        </Link>
        <Menu
          mode="horizontal"
          items={menuItems}
          selectedKeys={[pathname.split('/')[2] || 'home']}
          style={{ border: 'none', background: 'transparent', minWidth: '400px' }}
        />
      </div>

      <Dropdown menu={{ items: languageItems }} placement="bottomRight">
        <Button icon={<GlobalOutlined />} type="text">
          {locale === 'vi' ? '🇻🇳 VI' : '🇺🇸 EN'}
        </Button>
      </Dropdown>
    </Header>
  )
}

