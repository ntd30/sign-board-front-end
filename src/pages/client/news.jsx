import { Breadcrumb, Button, Card, Col, Pagination, Row, Typography } from "antd";
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
    height: '100%', // Đảm bảo card chiếm toàn bộ chiều cao
  };

  const productCardHoverStyle = {
    transform: 'translateY(-10px)',
    boxShadow: '0 15px 30px rgba(0, 77, 64, 0.2)',
  };

  const rowStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'stretch', // Đảm bảo các Col có chiều cao bằng nhau
  };

  const cardBodyStyle = {
    flexGrow: 1, // Phần body mở rộng để lấp đầy không gian
  };

  const descriptionStyle = {
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxHeight: '4.5em',
  };

  const [dataNews, setDataNews] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [total, setTotal] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadNews();
  }, [current, pageSize]);

  const loadNews = async () => {
    const res = await fetchAllArticlesAPI(current, pageSize);
    if (res.data) {
      setTotal(res.data.totalElements);
      setDataNews(res.data.content);
    }
  };

  const handlePaginationChange = (page, pageSize) => {
    setCurrent(page);
    setPageSize(pageSize);
  };

  const handleGetNewsDetail = (news) => {
    navigate("/news/detail", {
      state: { news },
    });
  };

  return (
    <div style={{ maxWidth: '70%', margin: '80px auto' }}>
      <h1>TIN TỨC</h1>
      <Breadcrumb style={{fontSize: 20, marginBottom: 50}}>
        <Breadcrumb.Item>
          <a href="/">Trang chủ</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Tin tức</Breadcrumb.Item>
      </Breadcrumb>

      <Row gutter={[24, 24]} style={rowStyle}>
        {dataNews.map((product) => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              style={hoveredCard === product.id ? { ...productCardStyle, ...productCardHoverStyle } : productCardStyle}
              onMouseEnter={() => setHoveredCard(product.id)}
              onMouseLeave={() => setHoveredCard(null)}
              cover={<img alt={product.name} src={`${import.meta.env.VITE_BACKEND_URL}${product?.featuredImageUrl}`} style={{ height: '220px', objectFit: 'cover' }} />}
              bodyStyle={cardBodyStyle}
              actions={[
                <Button
                  onClick={() => handleGetNewsDetail(product)}
                  type="primary"
                  style={{ backgroundColor: '#FF6F00', borderColor: '#FF6F00', fontWeight: 'bold', width: '80%' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#FF8F00';
                    e.currentTarget.style.borderColor = '#FF8F00';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FF6F00';
                    e.currentTarget.style.borderColor = '#FF6F00';
                  }}
                >
                  Xem ngay
                </Button>,
              ]}
            >
              <Card.Meta
                title={<Title level={5} style={{ color: '#004D40' }}>{product.title}</Title>}
                description={
                  <Text strong style={{ ...descriptionStyle, color: '#00796B', fontSize: '17px' }}>
                    {product.content}
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
          pageSizeOptions={[12, 16, 24]}
          showTotal={(total, range) => `Hiển thị ${range[0]}-${range[1]} trên ${total} sản phẩm`}
        />
      )}
    </div>
  );
};

export default NewsPage;