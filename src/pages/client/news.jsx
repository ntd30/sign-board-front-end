import { Breadcrumb, Button, Card, Col, Grid, Pagination, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { fetchAllArticlesAPI } from "../../services/api.service";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const NewsPage = () => {
  const productCardStyle = {
    transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
    borderRadius: '12px',
    overflow: 'hidden',
    background: '#FFFFFF',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  };

  const productCardHoverStyle = {
    transform: 'translateY(-10px)',
    boxShadow: '0 15px 30px rgba(0, 77, 64, 0.2)',
  };

  const rowStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'stretch',
  };

  const cardBodyStyle = {
    flexGrow: 1,
  };

  const descriptionStyle = {
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxHeight: '4.5em',
  };

  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const [dataNews, setDataNews] = useState([]);
  const [displayedNews, setDisplayedNews] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [total, setTotal] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const loadNews = async () => {
    setLoading(true);
    try {
      const res = await fetchAllArticlesAPI(1, 1000);
      if (res.data) {
        const sortedArticles = res.data.content.sort((a, b) => b.id - a.id);
        setDataNews(sortedArticles);
        setTotal(res.data.totalElements);
      }
    } catch (error) {
      console.error("Lỗi khi tải danh sách bài viết:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const startIndex = (current - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedArticles = dataNews.slice(startIndex, endIndex);
    setDisplayedNews(paginatedArticles);
  }, [dataNews, current, pageSize]);

  useEffect(() => {
    loadNews();
  }, []);

  const handlePaginationChange = (page, pageSize) => {
    setCurrent(page);
    setPageSize(pageSize);
  };

  const handleGetNewsDetail = (newsId) => {
    navigate(`/news/detail/${newsId}`);
  };

  return (
    <div style={{ maxWidth: isMobile ? '90%' : '70%', margin: '80px auto' }}>
      <h1>TIN TỨC</h1>
      <Breadcrumb style={{ fontSize: 20, marginBottom: 50 }}>
        <Breadcrumb.Item>
          <a href="/">Trang chủ</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Tin tức</Breadcrumb.Item>
      </Breadcrumb>

      <Row gutter={[24, 24]} style={rowStyle}>
        {displayedNews.map((product) => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              style={hoveredCard === product.id ? { ...productCardStyle, ...productCardHoverStyle } : productCardStyle}
              onMouseEnter={() => setHoveredCard(product.id)}
              onMouseLeave={() => setHoveredCard(null)}
              cover={
                <img
                  alt={product.name}
                  src={
                    product.imageBase64
                      ? `data:image/jpeg;base64,${product.imageBase64}`
                      : product.featuredImageUrl
                        ? `${import.meta.env.VITE_BACKEND_URL}${product.featuredImageUrl}`
                        : "/default-image.jpg"
                  }
                  style={{ height: '220px', objectFit: 'cover' }}
                />
              }
              bodyStyle={cardBodyStyle}
              onClick={() => handleGetNewsDetail(product.id)}
              actions={[
                <Button
                  type="primary"
                  style={{ backgroundColor: '#FF6F00', borderColor: '#FF6F00', fontWeight: 'bold', width: '80%' }}
                >
                  Xem ngay
                </Button>,
              ]}
              loading={loading}
            >
              <Card.Meta
                title={<Title level={5} style={{ color: '#004D40' }}>{product.title}</Title>}
                description={
                  <Text strong style={{ ...descriptionStyle, color: '#00796B', fontSize: '17px' }}>
                    {stripHtml(product.content)}
                  </Text>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
      {total > pageSize && (
        <Pagination
          current={current}
          pageSize={pageSize}
          total={total}
          onChange={handlePaginationChange}
          style={{ marginTop: 32, textAlign: 'center' }}
          showSizeChanger
          pageSizeOptions={[12, 16, 20]}
        />
      )}
    </div>
  );
};

export default NewsPage;