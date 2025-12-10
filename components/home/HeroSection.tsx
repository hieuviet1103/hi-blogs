'use client'

import { Typography, Button, Space } from 'antd'
import { ReadOutlined, RocketOutlined } from '@ant-design/icons'
import Link from 'next/link'

const { Title, Paragraph } = Typography

export default function HeroSection({ locale }: { locale: string }) {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
        padding: '120px 48px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative elements */}
      <div
        style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-100px',
          left: '-100px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto' }}>
        <Title
          level={1}
          style={{
            color: '#fff',
            fontSize: '56px',
            fontWeight: 'bold',
            marginBottom: '24px',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          {locale === 'vi' ? '👋 Xin chào!' : '👋 Welcome!'}
        </Title>
        <Title
          level={2}
          style={{
            color: '#fff',
            fontSize: '36px',
            fontWeight: 600,
            marginBottom: '24px',
            opacity: 0.95,
          }}
        >
          {locale === 'vi' ? 'Hieu Solutions' : 'Hieu Solutions'}
        </Title>
        <Paragraph
          style={{
            color: '#fff',
            fontSize: '20px',
            marginBottom: '48px',
            opacity: 0.9,
            maxWidth: 600,
            margin: '0 auto 48px',
          }}
        >
          {locale === 'vi'
            ? 'Chia sẻ kiến thức về công nghệ, du lịch và những trải nghiệm cuộc sống. Cùng khám phá và học hỏi mỗi ngày!'
            : 'Sharing knowledge about technology, travel and life experiences. Explore and learn together every day!'}
        </Paragraph>
        <Space size="large">
          <Link href={`/${locale}/blog`}>
            <Button
              type="primary"
              size="large"
              icon={<ReadOutlined />}
              style={{
                height: 50,
                padding: '0 32px',
                fontSize: '16px',
                background: '#fff',
                color: '#10b981',
                border: 'none',
                fontWeight: 600,
              }}
            >
              {locale === 'vi' ? 'Khám phá Blog' : 'Explore Blog'}
            </Button>
          </Link>
          <Link href={`/${locale}/about`}>
            <Button
              size="large"
              icon={<RocketOutlined />}
              style={{
                height: 50,
                padding: '0 32px',
                fontSize: '16px',
                background: 'rgba(255,255,255,0.2)',
                color: '#fff',
                border: '2px solid #fff',
                fontWeight: 600,
              }}
            >
              {locale === 'vi' ? 'Về tôi' : 'About Me'}
            </Button>
          </Link>
        </Space>
      </div>
    </div>
  )
}

