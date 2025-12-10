'use client'

import { Layout } from 'antd'
import AppHeader from './AppHeader'
import AppFooter from './AppFooter'

const { Content } = Layout

export default function AppLayout({
  children,
  locale,
}: {
  children: React.ReactNode
  locale: string
}) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppHeader locale={locale} />
      <Content>{children}</Content>
      <AppFooter locale={locale} />
    </Layout>
  )
}

