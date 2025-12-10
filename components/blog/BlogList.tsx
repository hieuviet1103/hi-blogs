'use client'

import { Row, Col, Card, Tag, Typography, Space, Pagination } from 'antd'
import { ClockCircleOutlined, EyeOutlined } from '@ant-design/icons'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

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
  post_tags: Array<{
    tags: {
      name_vi: string
      name_en: string
    }
  }>
}

export default function BlogList({
  posts,
  count,
  locale,
  page,
}: {
  posts: Post[]
  count: number
  locale: string
  page: number
}) {
  const router = useRouter()
  const perPage = 9

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 48px' }}>
      <div style={{ marginBottom: 48, textAlign: 'center' }}>
        <Title level={1} style={{ marginBottom: 16 }}>
          📝 {locale === 'vi' ? 'Blog' : 'Blog'}
        </Title>
        <Text type="secondary" style={{ fontSize: 18 }}>
          {locale === 'vi'
            ? 'Khám phá những bài viết về công nghệ, du lịch và cuộc sống'
            : 'Explore articles about technology, travel and life'}
        </Text>
      </div>

      {posts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '64px 0' }}>
          <Title level={3} type="secondary">
            {locale === 'vi' ? 'Chưa có bài viết nào' : 'No posts yet'}
          </Title>
        </div>
      ) : (
        <>
          <Row gutter={[24, 24]}>
            {posts.map((post) => {
              const title = locale === 'vi' ? post.title_vi : post.title_en
              const excerpt = locale === 'vi' ? post.excerpt_vi : post.excerpt_en
              const categoryName =
                locale === 'vi' ? post.categories?.name_vi : post.categories?.name_en

              return (
                <Col xs={24} sm={12} md={8} key={post.id}>
                  <Link href={`/${locale}/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                    <Card
                      hoverable
                      cover={
                        post.cover_image ? (
                          <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
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
                              height: 220,
                              background: `linear-gradient(135deg, ${
                                post.categories?.color || '#667eea'
                              } 0%, ${post.categories?.color || '#764ba2'} 100%)`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: 64,
                            }}
                          >
                            📄
                          </div>
                        )
                      }
                      style={{
                        borderRadius: 16,
                        overflow: 'hidden',
                        height: '100%',
                      }}
                    >
                      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                        {post.categories && (
                          <Tag
                            color={post.categories.color || 'blue'}
                            style={{ marginBottom: 0, borderRadius: 6 }}
                          >
                            {categoryName}
                          </Tag>
                        )}
                        <Title level={4} ellipsis={{ rows: 2 }} style={{ marginBottom: 0 }}>
                          {title}
                        </Title>
                        <Paragraph
                          ellipsis={{ rows: 3 }}
                          style={{ color: '#64748b', marginBottom: 0 }}
                        >
                          {excerpt}
                        </Paragraph>
                        <Space split={<span style={{ color: '#cbd5e1' }}>•</span>}>
                          <Text type="secondary" style={{ fontSize: 14 }}>
                            <ClockCircleOutlined />{' '}
                            {new Date(post.published_at).toLocaleDateString()}
                          </Text>
                          <Text type="secondary" style={{ fontSize: 14 }}>
                            <EyeOutlined /> {post.view_count}
                          </Text>
                        </Space>
                      </Space>
                    </Card>
                  </Link>
                </Col>
              )
            })}
          </Row>

          {count > perPage && (
            <div style={{ textAlign: 'center', marginTop: 48 }}>
              <Pagination
                current={page}
                total={count}
                pageSize={perPage}
                onChange={(newPage) => {
                  router.push(`/${locale}/blog?page=${newPage}`)
                }}
                showSizeChanger={false}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}

