'use client'

import { Row, Col, Card, Typography } from 'antd'
import Link from 'next/link'

const { Title, Text } = Typography

type Category = {
  id: string
  slug: string
  name_vi: string
  name_en: string
  description_vi: string | null
  description_en: string | null
  icon: string | null
  color: string | null
}

export default function CategoriesSection({
  categories,
  locale,
}: {
  categories: Category[]
  locale: string
}) {
  return (
    <div
      style={{
        maxWidth: 1200,
        margin: '80px auto 0',
        background: '#f8fafc',
        borderRadius: 24,
        padding: '64px 48px',
      }}
    >
      <Title level={2} style={{ textAlign: 'center', marginBottom: 48 }}>
        📚 {locale === 'vi' ? 'Danh mục' : 'Categories'}
      </Title>

      <Row gutter={[24, 24]}>
        {categories.map((category) => {
          const name = locale === 'vi' ? category.name_vi : category.name_en
          const description = locale === 'vi' ? category.description_vi : category.description_en

          return (
            <Col xs={24} sm={12} md={6} key={category.id}>
              <Link href={`/${locale}/blog/category/${category.slug}`}>
                <Card
                  hoverable
                  style={{
                    textAlign: 'center',
                    borderRadius: 16,
                    border: 'none',
                    height: '100%',
                    background: category.color
                      ? `linear-gradient(135deg, ${category.color}15 0%, ${category.color}05 100%)`
                      : '#fff',
                  }}
                  bodyStyle={{ padding: '32px 24px' }}
                >
                  <div
                    style={{
                      fontSize: 48,
                      marginBottom: 16,
                    }}
                  >
                    {category.icon || '📁'}
                  </div>
                  <Title level={4} style={{ marginBottom: 8 }}>
                    {name}
                  </Title>
                  {description && (
                    <Text type="secondary" style={{ fontSize: 14 }}>
                      {description}
                    </Text>
                  )}
                </Card>
              </Link>
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

