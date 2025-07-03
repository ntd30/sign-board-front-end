import { useState, useEffect, useContext } from 'react';
import { Row, Col, Card, Button, Typography, Grid, notification } from 'antd';
import { fetchAllProductsAPI, createContactAPI } from '../../../services/api.service';
import { useNavigate } from 'react-router-dom';
import Promotion from './Promotion';
import { AuthContext } from '../../context/auth.context';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const customStyles = `
  .product-card {
    transition: transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out, opacity 0.5s ease-in-out;
    border-radius: 12px;
    overflow: hidden;
    background: #FFFFFF;
  }
`;

export const ProductList = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const { user } = useContext(AuthContext);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [loadingMainContactBtn, setLoadingMainContactBtn] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
console.log("ProductList - Products:", products);
  const productCardStyle = {
    borderRadius: '12px',
    overflow: 'hidden',
    background: '#FFFFFF',
  };

  const productCardHoverStyle = {
    transform: 'translateY(-10px)',
    boxShadow: '0 15px 30px rgba(0, 77, 64, 0.2)',
  };

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.id = "product-list-styles";
    styleSheet.innerText = customStyles;
    document.head.appendChild(styleSheet);

    const antdResetCss = document.createElement("link");
    antdResetCss.id = "antd-reset-css-dynamic";
    antdResetCss.rel = "stylesheet";
    antdResetCss.href = "https://unpkg.com/antd/dist/reset.css";
    document.head.appendChild(antdResetCss);

    return () => {
      const existingStyleSheet = document.getElementById("product-list-styles");
      if (existingStyleSheet) {
        document.head.removeChild(existingStyleSheet);
      }
      const existingAntdCss = document.getElementById("antd-reset-css-dynamic");
      if (existingAntdCss) {
        document.head.removeChild(existingAntdCss);
      }
    };
  }, []);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const res = await fetchAllProductsAPI(1, 8);
    setProducts(res?.data?.content || []);
  };

  const handleMainProductContact = async (productId) => {
    if (!user?.id) {
      setIsContactOpen(true);
      // Có thể thêm redirect đến trang đăng nhập hoặc hiển thị modal đăng nhập
      notification.info({
        message: "Yêu cầu đăng nhập",
        description: "Vui lòng đăng nhập để sử dụng tính năng này",
      });
    } else {
      setLoadingMainContactBtn(true);
      const { fullName, phoneNumber, email, address } = user;
      try {
        const res = await createContactAPI(fullName, phoneNumber, email, address, '', productId);
        if (res.data) {
          notification.success({
            message: "Gửi Liên Hệ Thành Công",
            description: "Chúng tôi đã nhận được thông tin của bạn và sẽ phản hồi sớm nhất!",
          });
        } else {
          notification.error({
            message: "Lỗi Gửi Liên Hệ",
            description: res.data?.message || "Đã có lỗi xảy ra. Vui lòng thử lại.",
          });
        }
      } catch (error) {
        console.error("Contact API Error:", error.response?.data || error.message);
        notification.error({
          message: "Lỗi Gửi Liên Hệ",
          description: error.response?.data?.message || "Đã có lỗi xảy ra. Vui lòng thử lại.",
          placement: 'topRight',
        });
      }
      setLoadingMainContactBtn(false);
    }
  };

  const handleGetProductDetail = (product) => {
    navigate("/products/detail", {
      state: {
        product: product,
        categoryId: product?.category?.id,
      },
    });
    window.scrollTo(0, 0);
  };

  return (
    <div style={{ width: isMobile ? "100%" : "70%", margin: "auto", padding: '60px 20px' }}>
      {/* ƯU ĐÃI ĐẶC BIỆT */}
      <Promotion />

      {/* Tiêu đề */}
      <Row justify="space-between" align="center" style={{ marginBottom: '35px', padding: '0 2%' }}>
        <Col>
          <Title level={2} style={{ color: '#004D40', margin: 0 }}>Sản Phẩm Tiêu Biểu</Title>
        </Col>
      </Row>

      {/* Danh sách sản phẩm */}
      <Row gutter={[16, 16]} style={{ padding: '0 1%' }}>
        {products.map((product) => (
          <Col key={product.id} xs={12} sm={12} md={8} lg={6}>
            <Card
              hoverable
              className="product-card"
              style={{
                ...productCardStyle,
                ...(hoveredCard === product.id ? productCardHoverStyle : {}),
              }}
              onMouseEnter={() => setHoveredCard(product.id)}
              onMouseLeave={() => setHoveredCard(null)}
              cover={
                <img
                  alt={product.name}
                  src={
                    product?.images[0]?.imageBase64
                      ? `data:image/jpeg;base64,${product.images[0].imageBase64}`
                      : product?.images[0]?.imageUrl
                        ? `${import.meta.env.VITE_BACKEND_URL}/images/${product.images[0].imageUrl}`
                        : 'https://via.placeholder.com/150?text=No+Image'
                  }
                  style={{ height: '220px', objectFit: 'cover' }}
                />
              }
              onClick={() => handleGetProductDetail(product)}
            >
              <Card.Meta
                title={<Title level={5} style={{ color: '#004D40' }}>{product.name}</Title>}
                description={<Text strong style={{ color: '#00796B', fontSize: '17px' }}>Giá: Liên hệ</Text>}
              />
              <div style={{ marginTop: 16 }}>
                <Button
                  type="primary"
                  style={{ backgroundColor: '#FF6F00', borderColor: '#FF6F00', fontWeight: 'bold', width: '100%' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMainProductContact(product.id);
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#FF8F00';
                    e.currentTarget.style.borderColor = '#FF8F00';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FF6F00';
                    e.currentTarget.style.borderColor = '#FF6F00';
                  }}
                  loading={loadingMainContactBtn}
                >
                  Liên Hệ Ngay
                </Button>

                {/* Ưu đãi bên dưới nút */}
                <div style={{
                  backgroundColor: '#FFF3E0',
                  padding: '8px 12px',
                  marginTop: 12,
                  borderRadius: 8,
                  fontSize: '13px',
                  color: '#BF360C',
                  lineHeight: 1.4,
                }}>
                  🎁 Tặng website mẫu + bảng hiệu 2D. <br />
                  🗺️ Hỗ trợ Google Map, thiết kế tận tâm.<br />
                  ✨ AI2 cam kết đúng tiến độ, trách nhiệm, uy tín.
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};