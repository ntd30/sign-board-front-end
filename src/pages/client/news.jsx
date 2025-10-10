import { Breadcrumb, Button, Card, Col, Grid, Pagination, Row, Typography } from "antd";
const { Title, Text } = Typography;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LazyImage from '../../components/common/LazyImage';
import { fetchAllArticlesAPI } from '../../services/api.service';
import SEO from '../../components/common/SEO';

const NewsPage = () => {
  const productCardStyle = {
    transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
    borderRadius: '12px',
    overflow: 'hidden',
    background: '#FFFFFF',
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
      const res = await fetchAllArticlesAPI(current, pageSize);
      if (res.data) {
        const sortedArticles = res.data.content ? res.data.content.sort((a, b) => b.id - a.id) : res.data.sort((a, b) => b.id - a.id);
        setDataNews(sortedArticles);
        setTotal(res.data.totalElements || res.data.length);
      }
    } catch (error) {
      console.error("Lỗi khi tải danh sách bài viết:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadNews();
  }, [current, pageSize]);

  const handlePaginationChange = (page, pageSize) => {
    setCurrent(page);
    setPageSize(pageSize);
  };

  const handleGetNewsDetail = (newsItem) => {
    // Tạo URL với slug nếu có, nếu không thì dùng ID
    const url = newsItem.slug
      ? `/news/${newsItem.slug}`
      : `/news/detail/${newsItem.id}`;
    navigate(url);
    // Cuộn lên đầu trang sau khi chuyển trang
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  };

  return (
    <div style={{
      maxWidth: '1400px',
      margin: '0 auto',
      padding: isMobile ? '20px' : '40px',
      background: 'linear-gradient(135deg, #f5f7ff 0%, #c3cfe2 100%)',
      minHeight: '100vh'
    }}>
      <SEO
        title="Tin tức - Sign Board"
        description="Cập nhật tin tức mới nhất về biển quảng cáo, bảng hiệu, xu hướng thiết kế và công nghệ quảng cáo từ Sign Board - chuyên gia biển quảng cáo hàng đầu Việt Nam."
        keywords="tin tức biển quảng cáo, tin tức bảng hiệu, tin tức sign board, xu hướng quảng cáo, công nghệ biển quảng cáo"
        url={window.location.href}
      />

      <div style={{
        textAlign: 'center',
        marginBottom: '60px',
        padding: '40px 20px',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8faff 100%)',
        borderRadius: '20px',
        border: '1px solid rgba(102, 126, 234, 0.1)',
        boxShadow: '0 8px 32px rgba(102, 126, 234, 0.1)'
      }}>
        <h1 style={{
          fontSize: isMobile ? '2rem' : '3rem',
          fontWeight: '800',
          margin: '0 0 20px 0',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          TIN TỨC
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#667eea',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Cập nhật tin tức mới nhất về biển quảng cáo và bảng hiệu
        </p>
      </div>

      <Breadcrumb style={{
        fontSize: '16px',
        marginBottom: '40px',
        padding: '16px 24px',
        background: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '12px',
        border: '1px solid rgba(102, 126, 234, 0.1)'
      }}>
        <Breadcrumb.Item>
          <a href="/" style={{ color: '#667eea', fontWeight: '600' }}>Trang chủ</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item style={{ color: '#667eea', fontWeight: '600' }}>Tin tức</Breadcrumb.Item>
      </Breadcrumb>

      <Row gutter={[24, 24]} style={rowStyle}>
        {loading ? (
  Array.from({ length: pageSize }).map((_, index) => (
    <Col key={`skeleton-${index}`} xs={24} sm={12} md={8} lg={6}>
      <Card style={productCardStyle}>
        <Card.Meta
          title={<div style={{ height: '20px', background: '#f0f0f0', borderRadius: '4px', marginBottom: '8px' }} />}
          description={
            <>
              <div style={{ height: '16px', background: '#f0f0f0', borderRadius: '4px', marginBottom: '8px' }} />
              <div style={{ height: '16px', background: '#f0f0f0', borderRadius: '4px', width: '80%' }} />
            </>
          }
        />
      </Card>
    </Col>
  ))
) : (
  dataNews.map((product) => (
    <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
      <Card
        hoverable
        style={hoveredCard === product.id ? { ...productCardStyle, ...productCardHoverStyle } : productCardStyle}
        onMouseEnter={() => setHoveredCard(product.id)}
        onMouseLeave={() => setHoveredCard(null)}
        cover={
          <LazyImage
            src={
              product.imageBase64
                ? `data:image/jpeg;base64,${product.imageBase64}`
                : product.featuredImageUrl
                  ? `${import.meta.env.VITE_BACKEND_URL}${product.featuredImageUrl}`
                  : "/default-image.jpg"
            }
            alt={`Hình ảnh bài viết: ${product.title}`}
            style={{ height: '220px', objectFit: 'cover' }}
          />
        }
        onClick={() => handleGetNewsDetail(product)}
        actions={[
          <Button
            type="primary"
            style={{ backgroundColor: '#FF6F00', borderColor: '#FF6F00', fontWeight: 'bold', width: '80%' }}
          >
            Xem ngay
          </Button>,
        ]}
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
  ))
)}

      </Row>
      {total > pageSize && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '60px',
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '16px',
          border: '1px solid rgba(102, 126, 234, 0.1)'
        }}>
          <Pagination
            current={current}
            pageSize={pageSize}
            total={total}
            onChange={handlePaginationChange}
            showSizeChanger
            pageSizeOptions={[6, 12, 18, 24]}
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} của ${total} bài viết`
            }
            style={{
              fontSize: '16px'
            }}
          />
        </div>
      )}

      {total === 0 && !loading && (
        <div style={{
          textAlign: 'center',
          padding: '80px 40px',
          background: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '16px',
          border: '1px solid rgba(102, 126, 234, 0.1)'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '24px' }}>📰</div>
          <h3 style={{ color: '#667eea', marginBottom: '16px' }}>
            Chưa có bài viết nào
          </h3>
          <p style={{ color: '#666', fontSize: '16px' }}>
            Hiện tại chưa có bài viết nào được đăng tải. Vui lòng quay lại sau!
          </p>
        </div>
      )}
    </div>
  );
};

export default NewsPage;