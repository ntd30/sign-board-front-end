import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, Space, Divider, Tag, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { ClockCircleOutlined, EyeOutlined, ArrowRightOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const RelatedArticles = ({ currentArticle, limit = 3 }) => {
    const [relatedArticles, setRelatedArticles] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadRelatedArticles = async () => {
            if (!currentArticle || !currentArticle.category) {
                return;
            }

            setLoading(true);
            try {
                let response;

                // Nếu bài viết hiện tại có category với slug, lấy bài viết cùng category
                if (currentArticle.category && currentArticle.category.slug) {
                    response = await fetch(`http://localhost:8080/api/articles/category-slug/${currentArticle.category.slug}`).then(res => res.json());
                } else if (currentArticle.category && currentArticle.category.id) {
                    // Fallback: lấy theo category ID nếu không có slug
                    response = await fetch(`http://localhost:8080/api/articles/category/${currentArticle.category.id}`).then(res => res.json());
                }

                if (response && response.data) {
                    // Lọc bỏ bài viết hiện tại và giới hạn số lượng
                    const filtered = response.data
                        .filter(article => article.id !== currentArticle.id)
                        .slice(0, limit);

                    setRelatedArticles(filtered);
                }
            } catch (error) {
                console.error('Error loading related articles:', error);
            } finally {
                setLoading(false);
            }
        };

        loadRelatedArticles();
    }, [currentArticle, limit]);

    if (loading || relatedArticles.length === 0) {
        return null;
    }

    return (
        <div style={{
            marginTop: '40px',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '32px'
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

            <Row gutter={[20, 20]}>
                {relatedArticles.map((article, index) => (
                    <Col xs={24} sm={24} md={8} key={article.id}>
                        <Link to={article.slug ? `/news/${article.slug}` : `/news/detail/${article.id}`}>
                            <Card
                                hoverable
                                style={{
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    border: 'none',
                                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                                    transition: 'all 0.3s ease',
                                    position: 'relative'
                                }}
                                bodyStyle={{
                                    padding: '20px',
                                    height: 'auto'
                                }}
                                cover={
                                    <div style={{
                                        position: 'relative',
                                        height: '180px',
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
                                            background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.1) 100%)',
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
                                                        borderRadius: '6px',
                                                        fontSize: '10px',
                                                        padding: '2px 8px',
                                                        margin: 0
                                                    }}
                                                >
                                                    {article.category.name}
                                                </Tag>
                                            </div>
                                        )}
                                    </div>
                                }
                            >
                                <div style={{ position: 'relative' }}>
                                    <Title
                                        level={5}
                                        style={{
                                            margin: '0 0 8px 0',
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
                                            minHeight: '42px'
                                        }}
                                        ellipsis={{ rows: 2 }}
                                    >
                                        {article.excerpt || (article.content ? article.content.substring(0, 80) + '...' : 'Không có mô tả')}
                                    </Paragraph>

                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        fontSize: '12px',
                                        color: '#bfbfbf'
                                    }}>
                                        <Space size="small">
                                            <ClockCircleOutlined />
                                            <span>{new Date(article.createdAt || Date.now()).toLocaleDateString('vi-VN')}</span>
                                        </Space>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                            color: '#667eea',
                                            cursor: 'pointer',
                                            fontWeight: '500'
                                        }}>
                                            Đọc thêm
                                            <ArrowRightOutlined style={{ fontSize: '10px' }} />
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>

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
