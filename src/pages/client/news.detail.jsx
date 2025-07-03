import React, { useEffect } from 'react';
import { Layout, Row, Col, Typography, Image, Breadcrumb, Divider, Tag, Space, Avatar } from 'antd';
import { HomeOutlined, UserOutlined, CalendarOutlined, TagOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

// Giả lập dữ liệu tin tức được truyền vào component
const mockNewsItem = {
    id: '123',
    title: 'Việt Nam Phấn Đấu Trở Thành Trung Tâm Đổi Mới Sáng Tạo Khu Vực Đông Nam Á vào Năm 2030',
    imageUrl: 'https://placehold.co/1200x600/E6F7FF/1890FF?text=Ảnh+Minh+Họa+Bài+Viết&font=roboto',
    category: 'Kinh Tế Số',
    publishDate: '18/05/2025',
    author: 'Ban Biên Tập',
    authorAvatar: 'https://placehold.co/40x40/1890FF/FFFFFF?text=BBT&font=roboto',
    // Nội dung có thể là một chuỗi HTML hoặc Markdown.
    // Để đơn giản, ở đây dùng chuỗi văn bản thường với các đoạn ngắt dòng.
    // Nếu là HTML, cần xử lý bằng dangerouslySetInnerHTML một cách cẩn thận.
    content: `
    <p>Với những bước tiến vượt bậc trong công nghệ và sự đầu tư mạnh mẽ vào nguồn nhân lực chất lượng cao, Việt Nam đang đặt mục tiêu trở thành một trong những trung tâm đổi mới sáng tạo (innovation hub) hàng đầu khu vực Đông Nam Á vào năm 2030. Chiến lược này tập trung vào việc phát triển các ngành công nghiệp mũi nhọn như công nghệ thông tin, trí tuệ nhân tạo (AI), công nghệ sinh học, và năng lượng tái tạo.</p>
    
    <p>Chính phủ đã ban hành nhiều chính sách ưu đãi nhằm thu hút đầu tư trong và ngoài nước vào lĩnh vực R&D (Nghiên cứu và Phát triển), đồng thời xây dựng các khu công nghệ cao và trung tâm khởi nghiệp hiện đại. Các trường đại học và viện nghiên cứu cũng đóng vai trò quan trọng trong việc đào tạo và cung cấp nguồn nhân lực có kỹ năng chuyên môn cao, đáp ứng nhu cầu của thị trường lao động trong kỷ nguyên số.</p>
    
    <h3>Các Trụ Cột Chính Của Chiến Lược</h3>
    <ul>
      <li><strong>Phát triển hạ tầng số:</strong> Mở rộng mạng lưới 5G, trung tâm dữ liệu và các nền tảng điện toán đám mây.</li>
      <li><strong>Nâng cao năng lực R&D:</strong> Tăng cường đầu tư cho nghiên cứu khoa học và ứng dụng công nghệ mới.</li>
      <li><strong>Hỗ trợ hệ sinh thái khởi nghiệp:</strong> Tạo môi trường thuận lợi cho các startup công nghệ phát triển và vươn ra thị trường quốc tế.</li>
      <li><strong>Đào tạo nguồn nhân lực:</strong> Tập trung vào các ngành STEM (Khoa học, Công nghệ, Kỹ thuật, Toán học) và kỹ năng số.</li>
    </ul>

    <p>Theo các chuyên gia, mục tiêu này hoàn toàn khả thi nếu Việt Nam tiếp tục duy trì tốc độ phát triển hiện tại và giải quyết được các thách thức về cơ chế chính sách cũng như khả năng hấp thụ công nghệ của doanh nghiệp. Sự thành công của chiến lược này không chỉ nâng cao vị thế của Việt Nam trên bản đồ công nghệ thế giới mà còn góp phần thúc đẩy tăng trưởng kinh tế bền vững và cải thiện đời sống người dân.</p>

    <p><em>"Chúng tôi tin tưởng rằng với sự đồng lòng của cả hệ thống chính trị, cộng đồng doanh nghiệp và người dân, Việt Nam sẽ sớm hiện thực hóa khát vọng trở thành một quốc gia đổi mới sáng tạo,"</em> một đại diện từ Bộ Khoa học và Công nghệ chia sẻ.</p>
  `,
    // tags: ['Đổi mới sáng tạo', 'Công nghệ', 'Kinh tế 2030', 'Việt Nam']
};

// Component hiển thị chi tiết tin tức
export const NewsDetail = () => {
    const location = useLocation()
    const newsItem = location?.state?.news

    if (!newsItem) {
        return (
            <Layout style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
                <Content style={{ padding: '20px 0' }}>
                    <Row justify="center">
                        <Col xs={23} sm={22} md={20} lg={18} xl={16}>
                            <div style={{ padding: '24px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
                                <Title level={2} style={{ textAlign: 'center' }}>Không tìm thấy thông tin bài viết</Title>
                                <Paragraph style={{ textAlign: 'center' }}>
                                    Có vẻ như bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
                                </Paragraph>
                            </div>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        );
    }

    const { title, featuredImageUrl, category, createdAt, author, authorAvatar, content, type, slug } = newsItem;

    // CSS tùy chỉnh cho nội dung bài viết (nếu cần)
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
      color: #1890ff; /* Ant Design primary color */
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
    .news-article-content img { /* Đảm bảo ảnh trong nội dung cũng responsive */
      max-width: 100%;
      height: auto;
      border-radius: 4px;
      margin: 15px 0;
    }
  `;

    useEffect(() => {
        // Chèn CSS tùy chỉnh vào <head>
        const styleSheet = document.createElement("style");
        styleSheet.id = "news-article-styles";
        if (!document.getElementById(styleSheet.id)) {
            styleSheet.innerText = articleContentStyle;
            document.head.appendChild(styleSheet);
        }
        // Load Ant Design reset CSS (nếu chưa có trong dự án)
        const antdResetCss = document.createElement("link");
        antdResetCss.id = "antd-reset-css-dynamic";
        if (!document.getElementById(antdResetCss.id)) {
            antdResetCss.rel = "stylesheet";
            antdResetCss.href = "https://unpkg.com/antd/dist/reset.css";
            document.head.appendChild(antdResetCss);
        }

        return () => {
            const existingStyleSheet = document.getElementById(styleSheet.id);
            if (existingStyleSheet) {
                document.head.removeChild(existingStyleSheet);
            }
        };
    }, [articleContentStyle]);


    return (
        <Row justify="center"> {/* Căn giữa nội dung chính */}
            <Col xs={23} sm={22} md={20} lg={18} xl={16}> {/* Responsive Col */}
                <div style={{ padding: '24px 32px', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)' }}>
                    <Breadcrumb style={{ marginBottom: '20px' }}>
                        <Breadcrumb.Item href="/">
                            <HomeOutlined />
                            <span>Trang chủ</span>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item href="/tin-tuc">
                            <span>Tin tức</span>
                        </Breadcrumb.Item>
                        {category && (
                            <Breadcrumb.Item href={`/tin-tuc/${category.toLowerCase().replace(/\s+/g, '-')}`}>
                                <span>{category}</span>
                            </Breadcrumb.Item>
                        )}
                        {/* <Breadcrumb.Item>{title.length > 50 ? `${title.substring(0, 50)}...` : title}</Breadcrumb.Item> */}
                    </Breadcrumb>

                    <Title level={1} style={{ marginBottom: '12px', fontSize: '32px', color: '#262626' }}>{title}</Title>

                    <Space size="middle" wrap style={{ marginBottom: '24px', color: '#8c8c8c' }}>
                        {type && (
                            <Tag color="blue" icon={<TagOutlined />} style={{ fontSize: '13px', padding: '3px 8px' }}>
                                {type}
                            </Tag>
                        )}
                        {createdAt && (
                            <Space align="center">
                                <CalendarOutlined />
                                <Text type="secondary">{createdAt}</Text>
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
                                    : `${import.meta.env.VITE_BACKEND_URL}${featuredImageUrl}`
                            }
                            alt={`Ảnh minh họa cho bài viết: ${title}`}
                            style={{ borderRadius: '8px', marginBottom: '24px', maxHeight: '500px', objectFit: 'cover' }}
                            preview={true}
                        />
                    )}

                    <Divider />

                    {/* Sử dụng dangerouslySetInnerHTML nếu content là HTML. Cần đảm bảo HTML là an toàn. */}
                    {/* Nếu content là plain text hoặc Markdown, bạn có thể cần một thư viện để render Markdown. */}
                    {/* Ở đây, giả sử content là HTML và được chèn một cách an toàn. */}
                    <div className="news-article-content" dangerouslySetInnerHTML={{ __html: content }} />

                    {/* {tags && tags.length > 0 && (
                        <>
                            <Divider style={{ marginTop: '30px' }} />
                            <Space size={[0, 8]} wrap style={{ marginTop: '16px' }}>
                                <Text strong style={{ marginRight: '8px', color: '#595959' }}>Tags:</Text>
                                {tags.map(tag => (
                                    <Tag key={tag} color="geekblue" style={{ cursor: 'pointer' }} onClick={() => console.log(`Clicked tag: ${tag}`)}>
                                        {tag}
                                    </Tag>
                                ))}
                            </Space>
                        </>
                    )} */}

                    {slug && (
                        <>
                            <Divider style={{ marginTop: '30px' }} />
                            <Space size={[0, 8]} wrap style={{ marginTop: '16px' }}>
                                <Text strong style={{ marginRight: '8px', color: '#595959' }}>Tags:</Text>
                                <Tag key={type} color="geekblue" style={{ cursor: 'pointer' }} onClick={() => console.log(`Clicked slug: ${slug}`)}>
                                    {type}
                                </Tag>
                            </Space>
                        </>
                    )}
                </div>
            </Col>
        </Row>
    );
};