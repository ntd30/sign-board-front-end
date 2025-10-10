import React, { useEffect, useState, useRef } from 'react';
import { Layout, Row, Col, Typography, Image, Breadcrumb, Divider, Tag, Space, Avatar, Spin, Alert } from 'antd';
import { HomeOutlined, UserOutlined, CalendarOutlined, TagOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { GetNewById, GetArticleBySlug } from '../../services/api.service';
import LazyImage from '../../components/common/LazyImage';
import SEO from '../../components/common/SEO';
import TableOfContents from '../../components/client/news/TableOfContents';
import RelatedArticles from '../../components/client/news/RelatedArticles';
export const NewsDetail = () => {
    const { id, slug } = useParams();
    const [newsItem, setNewsItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;
    const contentRef = useRef(null);

    // Helper function to generate alt text for images
    const generateImageAlt = (src) => {
        // Extract filename or generate a generic alt text
        const filename = src.split('/').pop().split('.')[0];
        return `Hình ảnh: ${filename.replace(/[-_]/g, ' ')}`;
    };

    useEffect(() => {
        const fetchNewsDetail = async () => {
            try {
                let response;
                if (slug && !id) {
                    response = await GetArticleBySlug(slug);
                } else if (id) {
                    response = await GetNewById(id);
                } else {
                    setError("Không tìm thấy bài viết");
                    return;
                }

                if (response && response.data) {
                    setNewsItem(response.data);
                } else {
                    setError("Không tìm thấy bài viết");
                }
            } catch (err) {
                console.error("Error fetching news detail:", err);
                setError("Không thể tải bài viết");
            } finally {
                setLoading(false);
            }
        };

        fetchNewsDetail();
    }, [id, slug]);

    // useEffect để xử lý nội dung bài viết
    useEffect(() => {
        if (newsItem?.content && contentRef?.current) {
            let processedContent = newsItem.content;

            // Decode HTML entities nếu cần
            processedContent = processedContent
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&amp;/g, '&')
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g, "'")
                .replace(/&nbsp;/g, ' ');

            // Đảm bảo các thẻ HTML được đóng đúng cách và thêm lazy loading cho hình ảnh
            processedContent = processedContent
                .replace(/<br>/g, '<br/>')
                .replace(/<img([^>]+)>/g, (match, attrs) => {
                    // Thêm loading="lazy" và alt text tốt hơn cho hình ảnh
                    let newAttrs = attrs;
                    if (!newAttrs.includes('loading=')) {
                        newAttrs += ' loading="lazy"';
                    }
                    if (!newAttrs.includes('alt=')) {
                        const srcMatch = newAttrs.match(/src=["']([^"']+)["']/);
                        const altText = srcMatch ? generateImageAlt(srcMatch[1]) : 'Hình ảnh biển quảng cáo';
                        newAttrs += ` alt="${altText}"`;
                    }
                    return `<img${newAttrs}/>`;
                });

            contentRef.current.innerHTML = processedContent;
        }
    }, [newsItem?.content, contentRef]);

    const { title, featuredImageUrl, category, createdAt, author, authorAvatar, content, type, slug: articleSlug } = newsItem || {};

    if (loading) {
        return (
            <Layout style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
                <Content style={{ padding: '20px 0' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                        <Spin size="large" tip="Đang tải bài viết..." />
                    </div>
                </Content>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
                <Content style={{ padding: '20px 0' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                        <Text type="danger">{error}</Text>
                    </div>
                </Content>
            </Layout>
        );
    }

    return (
        <Layout style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            <SEO
                title={newsItem?.title || 'Bài viết - Sign Board'}
                description={newsItem?.excerpt || newsItem?.content?.substring(0, 160) + '...' || 'Đọc bài viết chi tiết về biển quảng cáo, bảng hiệu tại Sign Board'}
                keywords={`${newsItem?.title || ''}, biển quảng cáo, bảng hiệu, sign board, ${newsItem?.category?.name || ''}`}
                image={newsItem?.featuredImageUrl ? `${import.meta.env.VITE_BACKEND_URL}${newsItem.featuredImageUrl}` : '/img/og-default.jpg'}
                url={window.location.href}
                type="article"
                author={newsItem?.author || 'Sign Board'}
                publishedTime={newsItem?.createdAt}
                section={newsItem?.category?.name}
                tags={[newsItem?.type]}
            />
            <Content style={{ padding: '20px 0' }}>
                <div className="news-detail-container">
                    <Row justify="center" gutter={24}>
                        {/* Table of Contents - Left Sidebar */}
                        <Col xs={0} sm={0} md={0} lg={6} xl={5} className="desktop-toc">
                            <div style={{ position: 'sticky', top: '120px' }}>
                                <TableOfContents content={content} contentRef={contentRef} />
                            </div>
                        </Col>

                        {/* Main Content */}
                        <Col xs={24} sm={24} md={24} lg={18} xl={14}>
                            <div className="article-container">
                                <Breadcrumb className="article-breadcrumb">
                                    <Breadcrumb.Item href="/">
                                        <HomeOutlined />
                                        <span>Trang chủ</span>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item href="/news">
                                        <span>Tin tức</span>
                                    </Breadcrumb.Item>
                                    {category && category.slug && (
                                        <Breadcrumb.Item href={`/news/category/${category.slug}`}>
                                            <span>{category.name || category.slug}</span>
                                        </Breadcrumb.Item>
                                    )}
                                </Breadcrumb>

                                <div className="article-header">
                                    <Title level={1} className="article-title">
                                        {title}
                                    </Title>

                                    <div className="article-meta">
                                        <Space size="large" wrap className="meta-space">
                                            {type && (
                                                <div className="meta-item">
                                                    <TagOutlined className="meta-icon" />
                                                    <Tag color="blue" className="meta-tag">
                                                        {type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                                    </Tag>
                                                </div>
                                            )}
                                            {createdAt && (
                                                <div className="meta-item">
                                                    <CalendarOutlined className="meta-icon" />
                                                    <Text className="meta-text">
                                                        {new Date(createdAt).toLocaleDateString('vi-VN', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}
                                                    </Text>
                                                </div>
                                            )}
                                            {author && (
                                                <div className="meta-item">
                                                    {authorAvatar ?
                                                        <Avatar size="small" src={authorAvatar} className="meta-avatar" /> :
                                                        <UserOutlined className="meta-icon" />
                                                    }
                                                    <Text className="meta-text">{author}</Text>
                                                </div>
                                            )}
                                        </Space>
                                    </div>
                                </div>

                                {featuredImageUrl && (
                                    <div className="article-image-container">
                                        <LazyImage
                                            src={
                                                newsItem.imageBase64
                                                    ? `data:image/jpeg;base64,${newsItem.imageBase64}`
                                                    : newsItem.featuredImageUrl
                                                        ? `${import.meta.env.VITE_BACKEND_URL}${newsItem.featuredImageUrl}`
                                                        : "/default-image.jpg"}
                                            alt={`Ảnh minh họa cho bài viết: ${title} - Biển quảng cáo chuyên nghiệp từ Sign Board`}
                                            className="article-image"
                                            onClick={() => {
                                                console.log('Image clicked for preview');
                                            }}
                                        />
                                    </div>
                                )}

                                <div className="article-content">
                                    <div
                                        ref={contentRef}
                                        className="news-article-content"
                                        dangerouslySetInnerHTML={{ __html: content }}
                                    />
                                </div>

                                {articleSlug && (
                                    <div className="article-tags">
                                        <Space size={[0, 8]} wrap>
                                            <Text strong className="tags-label">🏷️ Tags:</Text>
                                            <Tag key={type} color="geekblue" className="article-tag">
                                                {type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                            </Tag>
                                        </Space>
                                    </div>
                                )}
                            </div>

                            {/* Related Articles */}
                            <div className="related-articles-container">
                                <RelatedArticles currentArticle={newsItem} limit={3} />
                            </div>
                        </Col>
                    </Row>
                </div>
            </Content>
        </Layout>
    );
};

export default NewsDetail;