import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, Space, Divider, Tag, Avatar } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { ClockCircleOutlined, EyeOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { fetchAllArticlesAPI, fetchArticlesByCategorySlugAPI } from '../../../services/api.service';
import ArticleCarousel from '../../common/ArticleCarousel';

const { Title, Text, Paragraph } = Typography;

const RelatedArticles = ({ currentArticle, limit = 3 }) => {
    const [relatedArticles, setRelatedArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const stripHtml = (html) => {
        const div = document.createElement("div");
        div.innerHTML = html;
        return div.textContent || div.innerText || "";
    };

    const renderCard = (article, index) => {
        function handleArticleClick(article) {
            const url = article.slug ? `/news/${article.slug}` : `/news/detail/${article.id}`;
            navigate(url);
            // Cuộn lên đầu trang sau khi chuyển trang
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 100);
        }

        return (
            <Link to={article.slug ? `/news/${article.slug}` : `/news/detail/${article.id}`} onClick={(e) => {
                e.preventDefault();
                handleArticleClick(article);
            }}>
                <Card
                    hoverable
                    style={{
                        borderRadius: '16px',
                        overflow: 'hidden',
                        border: 'none',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        height: '100%',
                        position: 'relative'
                    }}
                    bodyStyle={{
                        padding: '24px',
                        height: 'auto',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                    cover={
                        <div style={{
                            position: 'relative',
                            height: '200px',
                            overflow: 'hidden',
                            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
                        }}>
                            {article.imageBase64 ? (
                                <img
                                    alt={article.title}
                                    src={`data:image/jpeg;base64,${article.imageBase64}`}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.3s ease'
                                    }}
                                />
                            ) : article.featuredImageUrl ? (
                                <img
                                    alt={article.title}
                                    src={`${import.meta.env.VITE_BACKEND_URL}${article.featuredImageUrl}`}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.3s ease'
                                    }}
                                />
                            ) : (
                                <div style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#999',
                                    fontSize: '48px',
                                    background: 'rgba(255, 255, 255, 0.8)'
                                }}>
                                    📄
                                </div>
                            )}

                            {/* Overlay gradient */}
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.15) 100%)',
                                pointerEvents: 'none'
                            }}></div>

                            {/* Category tag */}
                            {article.category && article.category.name && (
                                <div style={{
                                    position: 'absolute',
                                    top: '12px',
                                    left: '12px'
                                }}>
                                    <Tag
                                        color="blue"
                                        style={{
                                            borderRadius: '8px',
                                            fontSize: '11px',
                                            padding: '4px 12px',
                                            margin: 0,
                                            background: 'rgba(255, 255, 255, 0.95)',
                                            color: '#667eea',
                                            border: 'none',
                                            fontWeight: '600'
                                        }}
                                    >
                                        {article.category.name}
                                    </Tag>
                                </div>
                            )}

                            {/* New indicator */}
                            {index < 1 && (
                                <div style={{
                                    position: 'absolute',
                                    top: '12px',
                                    right: '12px'
                                }}>
                                    <Tag
                                        color="green"
                                        style={{
                                            borderRadius: '8px',
                                            fontSize: '10px',
                                            padding: '2px 8px',
                                            margin: 0,
                                            background: 'linear-gradient(135deg, #52c41a 0%, #389e0d 100%)',
                                            color: 'white',
                                            border: 'none',
                                            fontWeight: '600'
                                        }}
                                    >
                                        Mới
                                    </Tag>
                                </div>
                            )}
                        </div>
                    }
                >
                    <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <Title
                            level={5}
                            style={{
                                margin: '0 0 12px 0',
                                fontSize: '16px',
                                fontWeight: '600',
                                lineHeight: '1.4',
                                color: '#262626',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                minHeight: '48px'
                            }}
                        >
                            {article.title}
                        </Title>

                        <Paragraph
                            style={{
                                margin: '0 0 16px 0',
                                fontSize: '14px',
                                color: '#8c8c8c',
                                lineHeight: '1.5',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                flex: 1
                            }}
                            ellipsis={{ rows: 2 }}
                        >
                            {stripHtml(article.excerpt) || (article.content ? stripHtml(article.content).substring(0, 100) + '...' : 'Không có mô tả')}
                        </Paragraph>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            fontSize: '12px',
                            color: '#bfbfbf',
                            marginTop: 'auto'
                        }}>
                            <Space size="small">
                                <ClockCircleOutlined />
                                <span>{new Date(article.createdAt || Date.now()).toLocaleDateString('vi-VN', {
                                    day: '2-digit',
                                    month: '2-digit'
                                })}</span>
                            </Space>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                color: '#667eea',
                                cursor: 'pointer',
                                fontWeight: '600',
                                fontSize: '13px'
                            }}>
                                Đọc ngay
                                <ArrowRightOutlined style={{ fontSize: '11px' }} />
                            </div>
                        </div>
                    </div>
                </Card>
            </Link>
        );
    };

    useEffect(() => {
        const loadRelatedArticles = async () => {
            if (!currentArticle) {
                console.log('RelatedArticles: No current article provided');
                return;
            }

            console.log('RelatedArticles: Loading for article:', currentArticle.title, 'Category:', currentArticle.category);

            setLoading(true);
            setError(null);

            try {
                let response;

                // Nếu bài viết hiện tại có category với slug, lấy bài viết cùng category
                if (currentArticle.category && currentArticle.category.slug) {
                    console.log('RelatedArticles: Fetching by category slug:', currentArticle.category.slug);
                    response = await fetchArticlesByCategorySlugAPI(currentArticle.category.slug);
                } else {
                    console.log('RelatedArticles: Fetching all articles');
                    // Nếu không có category, lấy tất cả bài viết
                    response = await fetchAllArticlesAPI(1, limit + 1);
                }

                if (response && response.data) {
                    let filtered = [];

                    if (currentArticle.category) {
                        // Lọc bỏ bài viết hiện tại và giới hạn số lượng
                        filtered = response.data
                            .filter(article => article.id !== currentArticle.id)
                            .slice(0, limit);
                    } else {
                        // Nếu không có category, lấy bài viết mới nhất (trừ bài hiện tại)
                        filtered = response.data
                            .filter(article => article.id !== currentArticle.id)
                            .slice(0, limit);
                    }

                    console.log('RelatedArticles: Filtered articles:', filtered.length);
                    setRelatedArticles(filtered);

                    // Nếu không có bài viết liên quan, thử lấy bài viết mới nhất
                    if (filtered.length === 0) {
                        console.log('RelatedArticles: No related articles, fetching latest articles');
                        const latestResponse = await fetchAllArticlesAPI(1, limit);

                        if (latestResponse && latestResponse.data) {
                            const latestFiltered = latestResponse.data
                                .filter(article => article.id !== currentArticle.id)
                                .slice(0, limit);
                            setRelatedArticles(latestFiltered);
                        }
                    }
                } else {
                    console.log('RelatedArticles: No data in response, fetching latest articles');
                    // Nếu không có dữ liệu từ category, lấy bài viết mới nhất
                    const latestResponse = await fetchAllArticlesAPI(1, limit + 1);

                    if (latestResponse && latestResponse.data) {
                        const latestFiltered = latestResponse.data
                            .filter(article => article.id !== currentArticle.id)
                            .slice(0, limit);
                        setRelatedArticles(latestFiltered);
                    }
                }
            } catch (error) {
                console.error('RelatedArticles: Error loading related articles:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadRelatedArticles();
    }, [currentArticle, limit]);

    // Nếu không có bài viết liên quan, hiển thị thông báo hoặc bài viết mới nhất
    if (relatedArticles.length === 0 && !loading) {
        return (
            <div style={{
                marginTop: '40px',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                borderRadius: '16px',
                padding: '32px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                textAlign: 'center'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    marginBottom: '24px'
                }}>
                    <div style={{
                        width: '4px',
                        height: '32px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: '2px'
                    }}></div>
                    <Title level={3} style={{
                        margin: 0,
                        color: '#262626',
                        fontSize: '20px',
                        fontWeight: '600'
                    }}>
                        Bài viết mới nhất
                    </Title>
                </div>

                <div style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '12px',
                    padding: '24px',
                    border: '1px solid rgba(102, 126, 234, 0.1)'
                }}>
                    <p style={{ color: '#666', margin: '0', fontSize: '16px' }}>
                        Hiện tại chưa có bài viết liên quan. Dưới đây là những bài viết mới nhất:
                    </p>

                    <div style={{ marginTop: '24px' }}>
                        <Link
                            to="/news"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '12px 24px',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: '#ffffff',
                                textDecoration: 'none',
                                borderRadius: '8px',
                                fontSize: '14px',
                                fontWeight: '500',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Xem tất cả tin tức
                            <ArrowRightOutlined />
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div style={{
                marginTop: '40px',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                borderRadius: '16px',
                padding: '32px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                textAlign: 'center'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px'
                }}>
                    <div style={{
                        width: '4px',
                        height: '32px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: '2px'
                    }}></div>
                    <Title level={3} style={{
                        margin: 0,
                        color: '#262626',
                        fontSize: '20px',
                        fontWeight: '600'
                    }}>
                        Đang tải bài viết liên quan...
                    </Title>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            marginTop: '40px',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '24px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        width: '4px',
                        height: '32px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: '2px'
                    }}></div>
                    <Title level={3} style={{
                        margin: 0,
                        color: '#262626',
                        fontSize: '24px',
                        fontWeight: '600',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>
                        Bài viết liên quan
                    </Title>
                </div>
                <Tag color="blue" style={{
                    padding: '6px 16px',
                    fontSize: '12px',
                    borderRadius: '20px',
                    border: 'none'
                }}>
                    {relatedArticles.length} bài viết
                </Tag>
            </div>

            <ArticleCarousel
                items={relatedArticles}
                renderCard={renderCard}
                title=""
                loading={loading}
                showNavigation={true}
                showPagination={true}
                cardWidth="calc(100% / 3 - 15px)"
                cardHeight="400px"
                imageHeight="200px"
                enableAutoSlide={false}
                enableSwipe={true}
                enableDrag={true}
                gap="15px"
                responsive={{
                    1024: { itemsPerView: 2, gap: '12px' },
                    768: { itemsPerView: 1, gap: '10px' },
                    480: { itemsPerView: 1, gap: '8px' }
                }}
                emptyMessage="Không có bài viết liên quan để hiển thị"
            />

            <Divider style={{ margin: '32px 0 0 0' }} />

            <div style={{
                textAlign: 'center',
                marginTop: '24px'
            }}>
                <Link
                    to="/news"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '12px 24px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: '#ffffff',
                        textDecoration: 'none',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '500',
                        transition: 'all 0.3s ease'
                    }}
                >
                    Xem tất cả tin tức
                    <ArrowRightOutlined />
                </Link>
            </div>
        </div>
    );
};

export default RelatedArticles;
