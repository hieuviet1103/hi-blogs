'use client'

import { Layout, Row, Col, Space, Typography } from 'antd'
import {
  GithubOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  MailOutlined,
  HeartFilled,
} from '@ant-design/icons'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

const { Footer } = Layout
const { Text, Title } = Typography

export default function AppFooter({ locale }: { locale: string }) {
  const t = useTranslations()
  const currentYear = new Date().getFullYear()

  return (
    <Footer
      style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        color: '#e2e8f0',
        padding: '64px 48px 24px',
        marginTop: '80px',
      }}
    >
      <Row gutter={[48, 32]} style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Col xs={24} sm={24} md={8}>
          <Space direction="vertical" size="middle">
            <Title
              level={3}
              style={{
                color: '#fff',
                margin: 0,
                background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Hieu Solutions
            </Title>
            <Text style={{ color: '#cbd5e1' }}>
              {locale === 'vi'
                ? 'Chia sẻ kiến thức về công nghệ, du lịch và cuộc sống.'
                : 'Sharing knowledge about technology, travel and life.'}
            </Text>
          </Space>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Title level={5} style={{ color: '#fff' }}>
            {locale === 'vi' ? 'Liên kết' : 'Quick Links'}
          </Title>
          <Space direction="vertical">
            <Link href={`/${locale}`} style={{ color: '#cbd5e1' }}>
              {t('nav.home')}
            </Link>
            <Link href={`/${locale}/blog`} style={{ color: '#cbd5e1' }}>
              {t('nav.blog')}
            </Link>
            <Link href={`/${locale}/about`} style={{ color: '#cbd5e1' }}>
              {t('nav.about')}
            </Link>
            <Link href={`/${locale}/contact`} style={{ color: '#cbd5e1' }}>
              {t('nav.contact')}
            </Link>
          </Space>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Title level={5} style={{ color: '#fff' }}>
            {locale === 'vi' ? 'Kết nối' : 'Connect'}
          </Title>
          <Space size="large">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#cbd5e1', fontSize: '20px' }}
            >
              <GithubOutlined />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#cbd5e1', fontSize: '20px' }}
            >
              <LinkedinOutlined />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#cbd5e1', fontSize: '20px' }}
            >
              <TwitterOutlined />
            </a>
            <a
              href="mailto:hello@hieu.solutions"
              style={{ color: '#cbd5e1', fontSize: '20px' }}
            >
              <MailOutlined />
            </a>
          </Space>
        </Col>
      </Row>

      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          marginTop: '48px',
          paddingTop: '24px',
          textAlign: 'center',
        }}
      >
        <Text style={{ color: '#94a3b8' }}>
          © {currentYear} Hieu Solutions. {locale === 'vi' ? 'Made with' : 'Made with'}{' '}
          <HeartFilled style={{ color: '#ef4444' }} /> {locale === 'vi' ? 'tại Việt Nam' : 'in Vietnam'}
        </Text>
      </div>
    </Footer>
  )
}

