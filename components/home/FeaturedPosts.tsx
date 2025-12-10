'use client'

import { Row, Col, Card, Tag, Typography, Space } from 'antd'
import { ClockCircleOutlined, EyeOutlined } from '@ant-design/icons'
import Link from 'next/link'
import Image from 'next/image'

const { Title, Paragraph, Text } = Typography

type Post = {
  id: string
  slug: string
  title_vi: string
  title_en: string
  excerpt_vi: string
  excerpt_en: string
  cover_image: string | null
  view_count: number
  published_at: string
  categories: {
    name_vi: string
    name_en: string
    color: string
  } | null
}

export default function FeaturedPosts({ posts, locale }: { posts: Post[]; locale: string }) {
  return (
    <div style={{ maxWidth: 1200, margin: '80px auto', padding: '0 48px' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 48 }}>
        ✨ {locale === 'vi' ? 'Bài viết nổi bật' : 'Featured Posts'}
      </Title>

      <Row gutter={[24, 24]}>
        {posts.map((post) => {
          const title = locale === 'vi' ? post.title_vi : post.title_en
          const excerpt = locale === 'vi' ? post.excerpt_vi : post.excerpt_en
          const categoryName = locale === 'vi' ? post.categories?.name_vi : post.categories?.name_en

          return (
            <Col xs={24} sm={24} md={8} key={post.id}>
              <Link href={`/${locale}/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                <Card
                  hoverable
                  cover={
                    post.cover_image ? (
                      <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                        <Image
                          src={post.cover_image}
                          alt={title}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    ) : (
                      <div
                        style={{
                          height: 200,
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        }}
                      />
                    )
                  }
                  style={{
                    borderRadius: 16,
                    overflow: 'hidden',
                    height: '100%',
                  }}
                >
                  {post.categories && (
                    <Tag
                      color={post.categories.color || 'blue'}
                      style={{ marginBottom: 12, borderRadius: 6 }}
                    >
                      {categoryName}
                    </Tag>
                  )}
                  <Title level={4} ellipsis={{ rows: 2 }} style={{ marginBottom: 12 }}>
                    {title}
                  </Title>
                  <Paragraph
                    ellipsis={{ rows: 3 }}
                    style={{ color: '#64748b', marginBottom: 16 }}
                  >
                    {excerpt}
                  </Paragraph>
                  <Space split={<span style={{ color: '#cbd5e1' }}>•</span>}>
                    <Text type="secondary" style={{ fontSize: 14 }}>
                      <ClockCircleOutlined /> {new Date(post.published_at).toLocaleDateString()}
                    </Text>
                    <Text type="secondary" style={{ fontSize: 14 }}>
                      <EyeOutlined /> {post.view_count}
                    </Text>
                  </Space>
                </Card>
              </Link>
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

