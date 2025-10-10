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

    const [processedContent, setProcessedContent] = useState('');

    // useEffect để xử lý nội dung bài viết và tạo mục lục
    useEffect(() => {
        if (newsItem?.content && contentRef?.current) {
            let content = newsItem.content;

            // Decode HTML entities nếu cần
            content = content
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&amp;/g, '&')
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g, "'")
                .replace(/&nbsp;/g, ' ');

            // Đảm bảo các thẻ HTML được đóng đúng cách và thêm lazy loading cho hình ảnh
            content = content
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

            // Lưu content đã xử lý và cập nhật DOM
            setProcessedContent(content);

            // Đặt timeout nhỏ để đảm bảo DOM được cập nhật trước khi tạo mục lục
            setTimeout(() => {
                if (contentRef.current) {
                    contentRef.current.innerHTML = content;
                }
            }, 10);
        }
    }, [newsItem?.content, contentRef, generateImageAlt]);

    // useEffect riêng để đảm bảo mục lục được tạo sau khi content đã sẵn sàng
    useEffect(() => {
        if (processedContent && contentRef?.current) {
            // Đảm bảo content đã được hiển thị với ID
            const checkContentReady = () => {
                const headings = contentRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6');
                if (headings.length > 0) {
                    // Force re-render mục lục bằng cách trigger một sự kiện
                    window.dispatchEvent(new Event('resize'));
                } else {
                    // Nếu chưa có headings, thử lại sau 100ms
                    setTimeout(checkContentReady, 100);
                }
            };

            // Đợi một chút để đảm bảo content đã được render
            setTimeout(checkContentReady, 50);
        }
    }, [processedContent, contentRef]);

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
        <Layout style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
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
            <Content style={{ padding: '40px 0', background: 'linear-gradient(135deg, #f5f7ff 0%, #c3cfe2 100%)', minHeight: '100vh' }}>
                <div className="news-detail-container" style={{
                    maxWidth: '1400px',
                    margin: '0 auto',
                    padding: '0 24px'
                }}>
                    <Row justify="center" gutter={32}>
                        {/* Table of Contents - Left Sidebar */}
                        <Col xs={0} sm={0} md={0} lg={6} xl={5} className="desktop-toc">
                            <div style={{ position: 'sticky', top: '120px' }}>
                                <TableOfContents content={processedContent} contentRef={contentRef} />
                            </div>
                        </Col>

                        {/* Main Content */}
                        <Col xs={24} sm={24} md={24} lg={18} xl={14}>
                            <div className="article-container">
                                <Breadcrumb className="article-breadcrumb" style={{
                                    marginBottom: '32px',
                                    padding: '16px 24px',
                                    background: 'linear-gradient(135deg, #f8f9ff 0%, #e8f2ff 100%)',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(102, 126, 234, 0.1)',
                                    boxShadow: '0 2px 8px rgba(102, 126, 234, 0.08)'
                                }}>
                                    <Breadcrumb.Item href="/">
                                        <HomeOutlined />
                                        <span style={{ fontWeight: '600', color: '#667eea' }}>Trang chủ</span>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item href="/news">
                                        <span style={{ fontWeight: '600', color: '#667eea' }}>Tin tức</span>
                                    </Breadcrumb.Item>
                                    {category && category.slug && (
                                        <Breadcrumb.Item href={`/news/category/${category.slug}`}>
                                            <span style={{ fontWeight: '600', color: '#667eea' }}>{category.name || category.slug}</span>
                                        </Breadcrumb.Item>
                                    )}
                                </Breadcrumb>

                                <div className="article-header" style={{
                                    textAlign: 'center',
                                    marginBottom: '40px',
                                    padding: '40px 32px',
                                    background: 'linear-gradient(135deg, #ffffff 0%, #f8faff 100%)',
                                    borderRadius: '20px',
                                    border: '1px solid rgba(102, 126, 234, 0.1)',
                                    boxShadow: '0 8px 32px rgba(102, 126, 234, 0.1)',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}>
                                    <div style={{
                                        position: 'absolute',
                                        top: '0',
                                        left: '0',
                                        right: '0',
                                        height: '4px',
                                        background: 'linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
                                    }}></div>

                                    <Title level={1} className="article-title" style={{
                                        fontSize: '2.5rem',
                                        fontWeight: '800',
                                        margin: '0 0 24px 0',
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                        lineHeight: '1.2',
                                        textAlign: 'center'
                                    }}>
                                        {title}
                                    </Title>

                                    <div className="article-meta" style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexWrap: 'wrap',
                                        gap: '32px',
                                        padding: '24px 0',
                                        borderTop: '1px solid rgba(102, 126, 234, 0.1)'
                                    }}>
                                        <Space size="large" wrap className="meta-space">
                                            {type && (
                                                <div className="meta-item" style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px',
                                                    padding: '12px 20px',
                                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                    borderRadius: '25px',
                                                    color: 'white',
                                                    fontWeight: '600',
                                                    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
                                                }}>
                                                    <TagOutlined className="meta-icon" />
                                                    <Tag color="white" className="meta-tag">
                                                        {type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                                    </Tag>
                                                </div>
                                            )}
                                            {createdAt && (
                                                <div className="meta-item" style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px',
                                                    padding: '12px 20px',
                                                    background: 'rgba(102, 126, 234, 0.1)',
                                                    borderRadius: '25px',
                                                    color: '#667eea',
                                                    fontWeight: '600'
                                                }}>
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
                                                <div className="meta-item" style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px',
                                                    padding: '12px 20px',
                                                    background: 'rgba(102, 126, 234, 0.05)',
                                                    borderRadius: '25px',
                                                    color: '#667eea',
                                                    fontWeight: '600'
                                                }}>
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
                                    <div className="article-image-container" style={{
                                        marginBottom: '40px',
                                        position: 'relative',
                                        borderRadius: '16px',
                                        overflow: 'hidden',
                                        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
                                        border: '1px solid rgba(102, 126, 234, 0.1)'
                                    }}>
                                        <LazyImage
                                            src={
                                                newsItem.imageBase64
                                                    ? `data:image/jpeg;base64,${newsItem.imageBase64}`
                                                    : newsItem.featuredImageUrl
                                                        ? `${import.meta.env.VITE_BACKEND_URL}${newsItem.featuredImageUrl}`
                                                        : "/default-image.jpg"}
                                            alt={`Ảnh minh họa cho bài viết: ${title} - Biển quảng cáo chuyên nghiệp từ Sign Board`}
                                            className="article-image"
                                            style={{
                                                width: '100%',
                                                height: '400px',
                                                objectFit: 'cover',
                                                transition: 'transform 0.3s ease',
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => {
                                                console.log('Image clicked for preview');
                                            }}
                                        />
                                        <div style={{
                                            position: 'absolute',
                                            bottom: '0',
                                            left: '0',
                                            right: '0',
                                            background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.7))',
                                            padding: '32px 24px 24px',
                                            color: 'white'
                                        }}>
                                            <p style={{
                                                margin: '0',
                                                fontSize: '14px',
                                                opacity: '0.9',
                                                fontStyle: 'italic'
                                            }}>
                                                🖼️ Nhấn vào hình để xem chi tiết
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <div className="article-content" style={{
                                    background: '#ffffff',
                                    padding: '48px 40px',
                                    borderRadius: '16px',
                                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                                    border: '1px solid rgba(102, 126, 234, 0.1)',
                                    lineHeight: '1.8',
                                    fontSize: '17px',
                                    color: '#2d3748',
                                    marginBottom: '40px'
                                }}>
                                    <div
                                        ref={contentRef}
                                        className="news-article-content"
                                        dangerouslySetInnerHTML={{ __html: processedContent || content }}
                                        style={{
                                            '& h1, & h2, & h3, & h4, & h5, & h6': {
                                                color: '#667eea',
                                                marginTop: '32px',
                                                marginBottom: '16px',
                                                fontWeight: '700',
                                                scrollMarginTop: '150px' // Đảm bảo scroll offset đúng
                                            },
                                            '& p': {
                                                marginBottom: '20px',
                                                textAlign: 'justify'
                                            },
                                            '& img': {
                                                borderRadius: '12px',
                                                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                                                margin: '24px 0',
                                                maxWidth: '100%',
                                                height: 'auto'
                                            },
                                            '& blockquote': {
                                                borderLeft: '4px solid #667eea',
                                                paddingLeft: '24px',
                                                margin: '32px 0',
                                                fontStyle: 'italic',
                                                background: 'rgba(102, 126, 234, 0.05)',
                                                padding: '24px',
                                                borderRadius: '0 12px 12px 0'
                                            }
                                        }}
                                    />
                                </div>

                                {articleSlug && (
                                    <div className="article-tags" style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '16px',
                                        padding: '32px 40px',
                                        background: 'linear-gradient(135deg, #f8f9ff 0%, #e8f2ff 100%)',
                                        borderRadius: '16px',
                                        border: '1px solid rgba(102, 126, 234, 0.1)',
                                        boxShadow: '0 4px 16px rgba(102, 126, 234, 0.08)',
                                        flexWrap: 'wrap'
                                    }}>
                                        <Text strong className="tags-label" style={{
                                            fontSize: '16px',
                                            color: '#667eea',
                                            marginRight: '16px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px'
                                        }}>
                                            🏷️ Tags:
                                        </Text>
                                        <Space size={[12, 8]} wrap>
                                            <Tag
                                                key={type}
                                                color="blue"
                                                className="article-tag"
                                                style={{
                                                    padding: '8px 20px',
                                                    borderRadius: '25px',
                                                    fontSize: '14px',
                                                    fontWeight: '600',
                                                    border: 'none',
                                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                    color: 'white',
                                                    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.3s ease'
                                                }}
                                            >
                                                {type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                            </Tag>
                                        </Space>
                                    </div>
                                )}
                            </div>

                            {/* Related Articles */}
                            <div className="related-articles-container" style={{
                                marginTop: '60px',
                                background: 'linear-gradient(135deg, #f8f9ff 0%, #e8f2ff 100%)',
                                borderRadius: '20px',
                                padding: '32px 24px',
                                border: '1px solid rgba(102, 126, 234, 0.1)',
                                boxShadow: '0 8px 32px rgba(102, 126, 234, 0.08)'
                            }}>
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