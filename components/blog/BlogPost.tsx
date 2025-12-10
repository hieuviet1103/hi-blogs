'use client'

import { Typography, Tag, Space, Divider, Card } from 'antd'
import { ClockCircleOutlined, EyeOutlined, UserOutlined } from '@ant-design/icons'
import Image from 'next/image'

const { Title, Text, Paragraph } = Typography

type Post = {
  id: string
  title_vi: string
  title_en: string
  content_vi: string
  content_en: string
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

export default function BlogPost({ post, locale }: { post: Post; locale: string }) {
  const title = locale === 'vi' ? post.title_vi : post.title_en
  const content = locale === 'vi' ? post.content_vi : post.content_en
  const categoryName = locale === 'vi' ? post.categories?.name_vi : post.categories?.name_en

  return (
    <article style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        {post.categories && (
          <Tag
            color={post.categories.color || 'blue'}
            style={{ marginBottom: 16, fontSize: 14, padding: '4px 12px', borderRadius: 8 }}
          >
            {categoryName}
          </Tag>
        )}

        <Title level={1} style={{ marginBottom: 24, fontSize: 42, lineHeight: 1.3 }}>
          {title}
        </Title>

        <Space
          split={<Divider type="vertical" />}
          style={{ color: '#64748b', fontSize: 15 }}
        >
          <Space>
            <ClockCircleOutlined />
            <Text type="secondary">
              {new Date(post.published_at).toLocaleDateString(locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </Space>
          <Space>
            <EyeOutlined />
            <Text type="secondary">{post.view_count} {locale === 'vi' ? 'lượt xem' : 'views'}</Text>
          </Space>
        </Space>
      </div>

      {/* Cover Image */}
      {post.cover_image && (
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 400,
            marginBottom: 48,
            borderRadius: 16,
            overflow: 'hidden',
          }}
        >
          <Image src={post.cover_image} alt={title} fill style={{ objectFit: 'cover' }} />
        </div>
      )}

      {/* Content */}
      <div
        style={{
          fontSize: 18,
          lineHeight: 1.8,
          color: '#1e293b',
        }}
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* Tags */}
      {post.post_tags && post.post_tags.length > 0 && (
        <div style={{ marginTop: 48 }}>
          <Divider />
          <Space size="middle" wrap>
            <Text strong>{locale === 'vi' ? 'Thẻ:' : 'Tags:'}</Text>
            {post.post_tags.map((pt, index) => {
              const tagName = locale === 'vi' ? pt.tags.name_vi : pt.tags.name_en
              return (
                <Tag key={index} style={{ padding: '4px 12px', borderRadius: 6 }}>
                  {tagName}
                </Tag>
              )
            })}
          </Space>
        </div>
      )}

      {/* Call to Action */}
      <Card
        style={{
          marginTop: 64,
          background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
          border: 'none',
          borderRadius: 16,
          padding: 24,
        }}
      >
        <div style={{ textAlign: 'center', color: '#fff' }}>
          <Title level={3} style={{ color: '#fff', marginBottom: 16 }}>
            {locale === 'vi' ? '💬 Bạn thấy bài viết này thế nào?' : '💬 What do you think?'}
          </Title>
          <Paragraph style={{ color: '#fff', fontSize: 16, marginBottom: 0 }}>
            {locale === 'vi'
              ? 'Chia sẻ suy nghĩ của bạn hoặc kết nối với tôi trên mạng xã hội!'
              : 'Share your thoughts or connect with me on social media!'}
          </Paragraph>
        </div>
      </Card>

      <style jsx global>{`
        .blog-content h2 {
          font-size: 32px;
          font-weight: 600;
          margin-top: 48px;
          margin-bottom: 24px;
          color: #1e293b;
        }
        .blog-content h3 {
          font-size: 24px;
          font-weight: 600;
          margin-top: 36px;
          margin-bottom: 16px;
          color: #334155;
        }
        .blog-content p {
          margin-bottom: 24px;
        }
        .blog-content img {
          border-radius: 12px;
          margin: 32px 0;
        }
        .blog-content code {
          background: #f1f5f9;
          padding: 2px 8px;
          border-radius: 4px;
          font-family: 'Monaco', 'Courier New', monospace;
          font-size: 16px;
        }
        .blog-content pre {
          background: #1e293b;
          padding: 24px;
          border-radius: 12px;
          overflow-x: auto;
          margin: 32px 0;
        }
        .blog-content pre code {
          background: transparent;
          color: #e2e8f0;
          padding: 0;
        }
        .blog-content a {
          color: #10b981;
          text-decoration: underline;
        }
        .blog-content ul,
        .blog-content ol {
          margin-left: 24px;
          margin-bottom: 24px;
        }
        .blog-content li {
          margin-bottom: 12px;
        }
        .blog-content blockquote {
          border-left: 4px solid #10b981;
          padding-left: 24px;
          margin: 32px 0;
          color: #64748b;
          font-style: italic;
        }
      `}</style>
    </article>
  )
}

