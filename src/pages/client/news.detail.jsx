import React, { useEffect, useState, useRef } from 'react';
import { Layout, Row, Col, Typography, Image, Breadcrumb, Divider, Tag, Space, Avatar, Spin, Alert, Button, Drawer } from 'antd'; // Thêm Drawer
import { HomeOutlined, UserOutlined, CalendarOutlined, TagOutlined, MenuOutlined, ArrowUpOutlined } from '@ant-design/icons'; // Thêm một vài icon tiện dụng
import { useParams } from 'react-router-dom';
import { GetNewById, GetArticleBySlug } from '../../services/api.service';
import LazyImage from '../../components/common/LazyImage';
import SEO from '../../components/common/SEO';
import TableOfContents from '../../components/client/news/TableOfContents';
import RelatedArticles from '../../components/client/news/RelatedArticles';
import ContentRenderer from '../../components/content/ContentRenderer';
import '../../components/content/ContentBlocks.css';

const NewsDetail = () => {
    const { id, slug } = useParams();
    const [newsItem, setNewsItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showMobileTOC, setShowMobileTOC] = useState(false); // Dùng cho Drawer
    const [showScrollTop, setShowScrollTop] = useState(false); // Thêm state để kiểm soát nút cuộn
    const [imageStats, setImageStats] = useState({
        totalImages: 0,
        base64Images: 0,
        externalImages: 0,
        localImages: 0
    });
    const { Content } = Layout;
    console.log("News detail11:", newsItem);
    const { Title, Paragraph, Text } = Typography;
    const contentRef = useRef(null);

    // Helper function to detect and process images in content
    const processImagesInContent = (content) => {
        // Check if content contains images
        const hasImages = /<img[^>]*>/i.test(content);

        if (!hasImages) {
            return content;
        }

        // Process each image with responsive styling
        return content
            .replace(/<img([^>]+)>/g, (match, attrs) => {
                let newAttrs = attrs;

                // Add lazy loading
                if (!newAttrs.includes('loading=')) {
                    newAttrs += ' loading="lazy"';
                }

                // Add alt text if missing
                if (!newAttrs.includes('alt=')) {
                    const srcMatch = newAttrs.match(/src=["']([^"']+)["']/);
                    const altText = srcMatch ? generateImageAlt(srcMatch[1]) : 'Hình ảnh biển quảng cáo';
                    newAttrs += ` alt="${altText}"`;
                }

                // Detect image type and apply appropriate styling
                const srcMatch = newAttrs.match(/src=["']([^"']+)["']/);
                if (srcMatch && srcMatch[1]) {
                    const src = srcMatch[1];

                    // Check if it's a base64 image
                    const isBase64 = src.includes('data:image');
                    const isExternalUrl = src.startsWith('http') && !src.includes(window.location.hostname);

                    // Apply responsive styling based on image type
                    if (isBase64 || isExternalUrl) {
                        // For base64 and external images, apply responsive styling
                        newAttrs += ' style="max-width: 100%; height: auto; display: block; margin: 0 auto; object-fit: contain;"';
                    } else {
                        // For local images, apply standard responsive styling
                        newAttrs += ' style="max-width: 100%; height: auto; display: block;"';
                    }
                }

                return `<img${newAttrs}/>`;
            });
    };

    // Helper function to get image statistics
    const getImageStats = (content) => {
        const imgTags = content.match(/<img[^>]*>/g) || [];
        const base64Images = imgTags.filter(img => img.includes('data:image')).length;
        const externalImages = imgTags.filter(img =>
            img.includes('http') && !img.includes(window.location.hostname)
        ).length;
        const localImages = imgTags.length - base64Images - externalImages;

        return {
            totalImages: imgTags.length,
            base64Images,
            externalImages,
            localImages
        };
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
                    console.log("News detail:", response.data);
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
        if (newsItem?.content) {
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
                        newAttrs += ` alt="Hình ảnh bài viết"`;
                    }

                    // Thêm responsive styles cho base64 images
                    if (newAttrs.includes('data:image')) {
                        // Thêm CSS inline cho base64 images để đảm bảo responsive
                        newAttrs += ' style="max-width: 100%; height: auto; display: block; margin: 0 auto"';
                    }

                    return `<img${newAttrs}/>`;
                });

            // Tạo một div tạm thời để parse HTML và thêm ID cho headings
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = content;

            // Tìm tất cả các heading và thêm ID nếu chưa có
            const headingElements = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
            Array.from(headingElements).forEach((heading, index) => {
                if (!heading.id) {
                    const level = parseInt(heading.tagName.charAt(1));
                    const text = heading.textContent.trim();
                    
                    // Tạo ID từ text của heading - chuẩn SEO
                    let baseSlug = text.toLowerCase()
                        .replace(/[^\w\s-]/g, '') // Loại bỏ ký tự đặc biệt
                        .replace(/\s+/g, '-') // Thay thế khoảng trắng bằng dấu gạch ngang
                        .replace(/^-+|-+$/g, ''); // Loại bỏ dấu gạch ngang ở đầu và cuối

                    let id = `heading-${level}-${index}-${baseSlug}`;
                    heading.id = id;
                }
            });

            // Lưu content đã xử lý với ID
            const processedContentWithIds = tempDiv.innerHTML;
            setProcessedContent(processedContentWithIds);
        }
    }, [newsItem?.content, contentRef]);

    // useEffect riêng để đảm bảo mục lục được tạo sau khi content đã sẵn sàng
    useEffect(() => {
        if (processedContent) {
            // Đợi một chút để đảm bảo content đã được render bởi ContentRenderer
            const checkContentReady = () => {
                const headings = document.querySelectorAll('.content-renderer h1, .content-renderer h2, .content-renderer h3, .content-renderer h4, .content-renderer h5, .content-renderer h6');
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
    }, [processedContent]);

    // Logic cho nút cuộn lên đầu trang (Scroll to Top)
    useEffect(() => {
        const checkScrollTop = () => {
            if (window.pageYOffset > 300) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        window.addEventListener('scroll', checkScrollTop);
        return () => window.removeEventListener('scroll', checkScrollTop);
    }, []);

    // Thêm useEffect để cuộn lên đầu trang khi component mount
    useEffect(() => {
        window.scrollTo(0, 0); // Cuộn lên đầu trang khi trang tải
    }, []); // Chạy một lần khi component được mount

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleTOCClose = () => {
        setShowMobileTOC(false);
    };

    const { title, featuredImageUrl, category, createdAt, author, authorAvatar, content, type } = newsItem || {};

    // Debug information for image processing
    console.log('Image Statistics:', imageStats);

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
        <Layout style={{ minHeight: '100vh', background: '#f8f9fa' }}>
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
            <Content style={{
                padding: '16px 0',
                background: '#f8f9fa',
                minHeight: '100vh'
            }}>
                <div className="news-detail-container" style={{
                    maxWidth: '100%',
                    margin: '0 auto',
                    padding: '0 12px',
                    width: '100%',
                    boxSizing: 'border-box'
                }}>
                    <Row justify="center" gutter={[12, 16]}>
                        {/* 1. Mobile TOC Toggle Button & Scroll to Top (Chỉ hiển thị trên Mobile) */}
                        <Col xs={24} sm={24} md={0} lg={0} xl={0} xxl={0}>
                            <div style={{
                                position: 'fixed',
                                bottom: '20px',
                                // THAY ĐỔI: Đặt ở góc trái dưới
                                left: '20px',
                                right: 'auto',
                                zIndex: 1000,
                                display: 'flex',
                                // THAY ĐỔI: Đặt các phần tử ở bên trái
                                justifyContent: 'flex-start',
                                alignItems: 'flex-start',
                                gap: '12px',
                                flexDirection: 'column', // Đặt nút chồng lên nhau
                            }}>
                                {/* Scroll to Top Button */}
                                {showScrollTop && (
                                    <Button
                                        type="default"
                                        shape="circle"
                                        size="large"
                                        onClick={handleScrollToTop}
                                        icon={<ArrowUpOutlined />}
                                        style={{
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: '50%',
                                            background: '#ffffff',
                                            border: '2px solid #667eea',
                                            color: '#667eea',
                                            boxShadow: '0 4px 16px rgba(102, 126, 234, 0.3)',
                                            transition: 'all 0.3s ease',
                                        }}
                                    />
                                )}

                                {/* Mobile TOC Toggle Button */}
                                <Button
                                    type="primary"
                                    shape="circle"
                                    size="large"
                                    onClick={() => setShowMobileTOC(true)} // Luôn bật Drawer
                                    icon={<MenuOutlined />}
                                    style={{
                                        width: '56px',
                                        height: '56px',
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        border: 'none',
                                        boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
                                        transition: 'all 0.3s ease',
                                    }}
                                />
                            </div>
                        </Col>

                        {/* 2. Mobile TOC Drawer (Khung mục lục di động) */}
                        <Drawer
                            title={
                                <span style={{
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    fontWeight: '700'
                                }}>
                                    📚 Mục lục bài viết
                                </span>
                            }
                            placement="left" // Vẫn giữ placement="left" để khung mục lục trượt ra từ bên trái
                            closable={true}
                            onClose={handleTOCClose}
                            open={showMobileTOC}
                            key="mobile-toc-drawer"
                            width="80%"
                            bodyStyle={{ padding: '16px' }}
                        >
                            <div
                                onClick={handleTOCClose} // Đóng Drawer khi click vào mục lục
                                style={{
                                    fontSize: '14px',
                                    lineHeight: '1.6',
                                    color: '#4a5568'
                                }}>
                                <TableOfContents content={processedContent} contentRef={contentRef} />
                            </div>
                        </Drawer>

                        {/* Table of Contents - Desktop Sidebar */}
                        <Col xs={0} sm={0} md={7} lg={6} xl={5} xxl={4} className="toc-container">
                            <div style={{
                                position: 'sticky',
                                top: '120px',
                                background: 'linear-gradient(135deg, #ffffff 0%, #f8faff 100%)',
                                borderRadius: '16px',
                                padding: '24px',
                                boxShadow: '0 8px 32px rgba(102, 126, 234, 0.12)',
                                border: '1px solid rgba(102, 126, 234, 0.15)',
                                marginBottom: '0',
                                maxWidth: '100%',
                                overflow: 'hidden',
                                height: 'fit-content',
                                maxHeight: 'calc(100vh - 140px)',
                                overflowY: 'auto'
                            }}>
                                <div style={{
                                    fontSize: '15px',
                                    color: '#2d3748',
                                    fontWeight: '700',
                                    marginBottom: '20px',
                                    textAlign: 'center',
                                    position: 'relative'
                                }}>
                                    <span style={{
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                        display: 'inline-block'
                                    }}>
                                        📚 Mục lục bài viết
                                    </span>
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '-8px',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        width: '60px',
                                        height: '3px',
                                        background: 'linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                                        borderRadius: '2px'
                                    }}></div>
                                </div>
                                <div style={{
                                    fontSize: '14px',
                                    lineHeight: '1.6',
                                    color: '#4a5568'
                                }}>
                                    <TableOfContents content={processedContent} contentRef={contentRef} />
                                </div>
                            </div>
                        </Col>

                        {/* Main Content */}
                        <Col xs={24} sm={24} md={17} lg={18} xl={19} xxl={20}>
                            <div className="article-container" style={{
                                background: '#ffffff',
                                borderRadius: '12px',
                                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                                border: '1px solid #e9ecef',
                                overflow: 'hidden',
                                marginBottom: '20px',
                                width: '100%',
                                boxSizing: 'border-box'
                            }}>
                                <Breadcrumb className="article-breadcrumb" style={{
                                    margin: '0',
                                    padding: '16px 20px 12px',
                                    background: '#f8f9fa',
                                    borderBottom: '1px solid #e9ecef'
                                }}>
                                    <Breadcrumb.Item href="/">
                                        <HomeOutlined />
                                        <span style={{ fontWeight: '500', color: '#495057', marginLeft: '4px' }}>Trang chủ</span>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item href="/news">
                                        <span style={{ fontWeight: '500', color: '#495057' }}>Tin tức</span>
                                    </Breadcrumb.Item>
                                    {category && category.slug && (
                                        <Breadcrumb.Item href={`/news/category/${category.slug}`}>
                                            <span style={{ fontWeight: '500', color: '#495057' }}>{category.name || category.slug}</span>
                                        </Breadcrumb.Item>
                                    )}
                                </Breadcrumb>

                                <div className="article-header" style={{
                                    textAlign: 'center',
                                    padding: '24px 16px 20px',
                                    background: '#ffffff',
                                    borderBottom: '1px solid #e9ecef'
                                }}>
                                    <Title level={1} className="article-title" style={{
                                        fontSize: '2.2rem',
                                        fontWeight: '700',
                                        margin: '0 0 16px 0',
                                        color: '#212529',
                                        lineHeight: '1.3',
                                        wordWrap: 'break-word',
                                        overflowWrap: 'break-word'
                                    }}>
                                        {title}
                                    </Title>

                                    <div className="article-meta" style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexWrap: 'wrap',
                                        gap: '12px',
                                        padding: '16px 0 0'
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            padding: '6px 12px',
                                            background: '#e9ecef',
                                            borderRadius: '16px',
                                            color: '#495057',
                                            fontSize: '12px',
                                            fontWeight: '500',
                                            whiteSpace: 'nowrap'
                                        }}>
                                            <TagOutlined style={{ fontSize: '12px' }} />
                                            <span>
                                                {type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                            </span>
                                        </div>

                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            padding: '6px 12px',
                                            background: '#e9ecef',
                                            borderRadius: '16px',
                                            color: '#495057',
                                            fontSize: '12px',
                                            fontWeight: '500',
                                            whiteSpace: 'nowrap'
                                        }}>
                                            <CalendarOutlined style={{ fontSize: '12px' }} />
                                            <span>
                                                {new Date(createdAt).toLocaleDateString('vi-VN', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                        </div>

                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            padding: '6px 12px',
                                            background: '#e9ecef',
                                            borderRadius: '16px',
                                            color: '#495057',
                                            fontSize: '12px',
                                            fontWeight: '500',
                                            whiteSpace: 'nowrap'
                                        }}>
                                            {authorAvatar ?
                                                <Avatar size="small" src={authorAvatar} /> :
                                                <UserOutlined style={{ fontSize: '12px' }} />
                                            }
                                            <span>{author}</span>
                                        </div>
                                    </div>
                                </div>

                                {featuredImageUrl && (
                                    <div className="article-image-container" style={{
                                        margin: '0 8px 24px',
                                        position: 'relative',
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                        border: '1px solid #e9ecef',
                                        width: '100%',
                                        maxWidth: '100%',
                                        boxSizing: 'border-box'
                                    }}>
                                        <LazyImage
                                            src={
                                                newsItem.imageBase64
                                                    ? `data:image/jpeg;base64,${newsItem.imageBase64}`
                                                    : newsItem.featuredImageUrl
                                                        ? `${import.meta.env.VITE_BACKEND_URL}${newsItem.featuredImageUrl}`
                                                        : "/default-image.jpg"}
                                            alt={`${title} - Hình ảnh đại diện bài viết`}
                                            className="article-image"
                                            style={{
                                                width: '100%',
                                                height: 'auto',
                                                minHeight: '200px',
                                                maxHeight: '400px',
                                                objectFit: 'cover',
                                                display: 'block'
                                            }}
                                        />
                                    </div>
                                )}


                                <div className="article-content" style={{
                                    background: '#ffffff',
                                    padding: '16px 12px',
                                    margin: '0 8px',
                                    borderRadius: '8px',
                                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                                    border: '1px solid #e9ecef',
                                    lineHeight: '1.7',
                                    fontSize: '15px',
                                    color: '#495057',
                                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                                    width: '100%',
                                    boxSizing: 'border-box',
                                    wordWrap: 'break-word',
                                    overflowWrap: 'break-word'
                                }}>
                                    <ContentRenderer htmlContent={processedContent || content} />
                                </div>

                                {/* Related Articles */}
                                <div className="related-articles-container" style={{
                                    marginTop: '32px',
                                    margin: '32px 8px 0',
                                    background: '#f8f9fa',
                                    borderRadius: '12px',
                                    padding: '16px 12px',
                                    border: '1px solid #e9ecef',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
                                    width: '100%',
                                    boxSizing: 'border-box'
                                }}>
                                    <RelatedArticles currentArticle={newsItem} limit={3} />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Content>
        </Layout>
    );
};

export default NewsDetail;