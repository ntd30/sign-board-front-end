import React, { useEffect, useState } from 'react';
import { Layout, Row, Col, Typography, Image, Breadcrumb, Divider, Tag, Space, Avatar, Spin } from 'antd';
import { HomeOutlined, UserOutlined, CalendarOutlined, TagOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { GetNewById } from '../../services/api.service';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

export const NewsDetail = () => {
    const { id } = useParams();
    const [newsItem, setNewsItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    console.log("NewsDetail - ID:", id);
    console.log("NewsDetail - News Item:", newsItem);
    useEffect(() => {
        const fetchNewsDetail = async () => {
            try {
                const response = await GetNewById(id);
                if (response.data) {
                    setNewsItem(response.data);
                } else {
                    setError("Bài viết không tồn tại");
                }
            } catch (err) {
                console.error("Error fetching news detail:", err);
                setError("Không thể tải bài viết");
            } finally {
                setLoading(false);
            }
        };

        fetchNewsDetail();
    }, [id]);

    const articleContentStyle = `
        .news-article-content p {
            font-size: 16px;
            line-height: 1.8;
            margin-bottom: 20px;
            color: #333;
        }
        .news-article-content h3 {
            font-size: 22px;
            margin-top: 30px;
            margin-bottom: 15px;
            color: #1890ff;
        }
        .news-article-content ul {
            list-style-type: disc;
            margin-left: 20px;
            margin-bottom: 20px;
        }
        .news-article-content li {
            font-size: 16px;
            line-height: 1.7;
            margin-bottom: 8px;
        }
        .news-article-content img {
            max-width: 100%;
            height: auto;
            border-radius: 4px;
            margin: 15px 0;
        }
    `;

    useEffect(() => {
        const styleSheet = document.createElement("style");
        styleSheet.id = "news-article-styles";
        styleSheet.innerText = articleContentStyle;
        document.head.appendChild(styleSheet);

        return () => {
            document.head.removeChild(styleSheet);
        };
    }, [articleContentStyle]);

    if (loading) {
        return (
            <Layout style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
                <Content style={{ padding: '20px 0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Spin size="large" />
                </Content>
            </Layout>
        );
    }

    if (error || !newsItem) {
        return (
            <Layout style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
                <Content style={{ padding: '20px 0' }}>
                    <Row justify="center">
                        <Col xs={23} sm={22} md={20} lg={18} xl={16}>
                            <div style={{ padding: '24px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
                                <Title level={2} style={{ textAlign: 'center' }}>{error || 'Không tìm thấy bài viết'}</Title>
                                <Paragraph style={{ textAlign: 'center' }}>
                                    {error ? 'Đã xảy ra lỗi khi tải bài viết' : 'Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.'}
                                </Paragraph>
                            </div>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        );
    }

    const { title, featuredImageUrl, category, createdAt, author, authorAvatar, content, type, slug } = newsItem;

    return (
        <Layout style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
            <Content style={{ padding: '20px 0' }}>
                <Row justify="center">
                    <Col xs={23} sm={22} md={20} lg={18} xl={16}>
                        <div style={{ padding: '24px 32px', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)' }}>
                            <Breadcrumb style={{ marginBottom: '20px' }}>
                                <Breadcrumb.Item href="/">
                                    <HomeOutlined />
                                    <span>Trang chủ</span>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item href="/news">
                                    <span>Tin tức</span>
                                </Breadcrumb.Item>
                                {category && (
                                    <Breadcrumb.Item>
                                        <span>{category}</span>
                                    </Breadcrumb.Item>
                                )}
                            </Breadcrumb>

                            <Title level={1} style={{ marginBottom: '12px', fontSize: '32px', color: '#262626' }}>{title}</Title>

                            <Space size="middle" wrap style={{ marginBottom: '24px', color: '#8c8c8c' }}>
                                {type && (
                                    <Tag color="blue" icon={<TagOutlined />}>
                                        {type}
                                    </Tag>
                                )}
                                {createdAt && (
                                    <Space align="center">
                                        <CalendarOutlined />
                                        <Text type="secondary">{new Date(createdAt).toLocaleDateString()}</Text>
                                    </Space>
                                )}
                                {author && (
                                    <Space align="center">
                                        {authorAvatar ? <Avatar size="small" src={authorAvatar} /> : <UserOutlined />}
                                        <Text type="secondary">{author}</Text>
                                    </Space>
                                )}
                            </Space>

                            {featuredImageUrl && (
                                <Image
                                    width="100%"
                                    src={
                                        newsItem.imageBase64
                                            ? `data:image/jpeg;base64,${newsItem.imageBase64}`
                                            : newsItem.featuredImageUrl
                                                ? `${import.meta.env.VITE_BACKEND_URL}${newsItem.featuredImageUrl}`
                                                : "/default-image.jpg"}
                                    alt={`Ảnh minh họa cho bài viết: ${title}`}
                                    style={{ borderRadius: '8px', marginBottom: '24px', maxHeight: '500px', objectFit: 'cover' }}
                                    preview={true}
                                />
                            )}

                            <Divider />

                            <div className="news-article-content" dangerouslySetInnerHTML={{ __html: content }} />

                            {slug && (
                                <>
                                    <Divider style={{ marginTop: '30px' }} />
                                    <Space size={[0, 8]} wrap style={{ marginTop: '16px' }}>
                                        <Text strong style={{ marginRight: '8px', color: '#595959' }}>Tags:</Text>
                                        <Tag key={type} color="geekblue">
                                            {type}
                                        </Tag>
                                    </Space>
                                </>
                            )}
                        </div>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};