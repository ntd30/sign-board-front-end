import { useState, useEffect, useContext } from 'react';
import { Row, Col, Card, Button, Typography, Grid, notification, Divider, Collapse } from 'antd';
import { loadProductsByCategoryAPI, createContactAPI } from '../../../services/api.service';
import { useNavigate } from 'react-router-dom';
import Promotion from './Promotion';
import { AuthContext } from '../../context/auth.context';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;
const { Panel } = Collapse;

const customStyles = `
  .product-card {
    transition: transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out, opacity 0.5s ease-in-out;
    border-radius: 12px;
    overflow: hidden;
    background: #FFFFFF;
  }
  .product-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 77, 64, 0.2);
  }
  .promo-collapse .ant-collapse-item > .ant-collapse-header {
    padding: 8px 12px !important;
  }
  .promo-collapse .ant-collapse-content-box {
    padding: 0 !important;
  }
  .promo-collapse .ant-collapse-header {
    pointer-events: none;
  }
  .promo-collapse .ant-collapse-expand-icon {
    pointer-events: auto;
  }
`;

export const ProductList = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const { user } = useContext(AuthContext);
  const [loadingMainContactBtn, setLoadingMainContactBtn] = useState(false);
  const [productsByCategory, setProductsByCategory] = useState({});
  const navigate = useNavigate();
  
  // Define the categories we want to display
  const featuredCategories = [
    { id: 1, name: 'Biển quảng cáo LED' },
    { id: 12, name: 'Biển vẫy quảng cáo' },
    { id: 22, name: 'Chữ nổi quảng cáo' }
  ];

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.id = "product-list-styles";
    styleSheet.innerText = customStyles;
    document.head.appendChild(styleSheet);

    return () => {
      const existingStyleSheet = document.getElementById("product-list-styles");
      if (existingStyleSheet) {
        document.head.removeChild(existingStyleSheet);
      }
    };
  }, []);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const results = await Promise.all(
        featuredCategories.map(category => 
          loadProductsByCategoryAPI(category.id, 1, 4)
        )
      );
      
      const productsMap = {};
      featuredCategories.forEach((category, index) => {
        // Thêm categoryId vào từng sản phẩm
        const productsWithCategory = (results[index]?.data?.content || []).map(product => ({
          ...product,
          categoryId: category.id // Đảm bảo mỗi sản phẩm có categoryId
        }));
        
        productsMap[category.id] = {
          name: category.name,
          products: productsWithCategory
        };
      });
      
      setProductsByCategory(productsMap);
    } catch (error) {
      console.error("Error loading products:", error);
      notification.error({
        message: "Lỗi tải sản phẩm",
        description: "Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.",
      });
    }
  };

  const handleMainProductContact = async (productId, e) => {
    e.stopPropagation();
    if (!user?.id) {
      notification.info({
        message: "Yêu cầu đăng nhập",
        description: "Vui lòng đăng nhập để sử dụng tính năng này",
      });
      return;
    }

    setLoadingMainContactBtn(true);
    try {
      const { fullName, phoneNumber, email, address } = user;
      const res = await createContactAPI(fullName, phoneNumber, email, address, '', productId);
      if (res.data) {
        notification.success({
          message: "Gửi Liên Hệ Thành Công",
          description: "Chúng tôi đã nhận được thông tin của bạn và sẽ phản hồi sớm nhất!",
        });
      }
    } catch (error) {
      notification.error({
        message: "Lỗi Gửi Liên Hệ",
        description: error.response?.data?.message || "Đã có lỗi xảy ra. Vui lòng thử lại.",
      });
    } finally {
      setLoadingMainContactBtn(false);
    }
  };

  const handleGetProductDetail = (productId, categoryId) => {
    if (!categoryId) {
      console.error("Category ID is missing for product:", productId);
      notification.warning({
        message: "Thông báo",
        description: "Không tìm thấy danh mục sản phẩm. Vui lòng thử lại.",
      });
      return;
    }
    
    navigate(`/products/detail/${productId}`, {
      state: { categoryId }
    });
    window.scrollTo(0, 0);
  };

  const renderPromotionSection = () => {
    const promoContent = (
      <>
        🎁 Tặng website mẫu + bảng hiệu 2D. <br />
        🗺️ Hỗ trợ Google Map, thiết kế tận tâm.<br />
        ✨ AI2 cam kết đúng tiến độ, trách nhiệm, uy tín.
      </>
    );

    if (isMobile) {
      return (
        <div onClick={(e) => e.stopPropagation()}>
          <Collapse 
            bordered={false} 
            className="promo-collapse"
            expandIconPosition="end"
            ghost
          >
            <Panel 
              header="Ưu đãi đặc biệt" 
              key="1"
              style={{ 
                backgroundColor: '#FFF3E0',
                borderRadius: '8px',
              }}
            >
              <div style={{
                fontSize: '13px',
                color: '#BF360C',
                lineHeight: 1.4,
              }}>
                {promoContent}
              </div>
            </Panel>
          </Collapse>
        </div>
      );
    }

    return (
      <div 
        style={{
          backgroundColor: '#FFF3E0',
          padding: '8px 12px',
          marginTop: 12,
          borderRadius: 8,
          fontSize: '13px',
          color: '#BF360C',
          lineHeight: 1.4,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {promoContent}
      </div>
    );
  };

  const renderProductCard = (product) => {
    return (
      <Card
        hoverable
        className="product-card"
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
        onClick={() => handleGetProductDetail(product.id, product.categoryId || product.category?.id)}
      >
        <Card.Meta
          title={<Title level={5} style={{ color: '#004D40' }}>{product.name}</Title>}
          description={<Text strong style={{ color: '#00796B', fontSize: '17px' }}>Giá: Liên hệ</Text>}
        />
        <div style={{ marginTop: 16 }}>
          <Button
            type="primary"
            style={{ 
              backgroundColor: '#FF6F00', 
              borderColor: '#FF6F00', 
              fontWeight: 'bold', 
              width: '100%',
              '&:hover': {
                backgroundColor: '#FF8F00',
                borderColor: '#FF8F00',
              }
            }}
            onClick={(e) => handleMainProductContact(product.id, e)}
            loading={loadingMainContactBtn}
          >
            Liên Hệ Ngay
          </Button>
          {renderPromotionSection()}
        </div>
      </Card>
    );
  };

  const renderProductSection = (categoryId) => {
    const category = productsByCategory[categoryId];
    if (!category || category.products.length === 0) return null;

    return (
      <div key={categoryId} style={{ marginBottom: '40px' }}>
        <Divider orientation="left">
          <Title level={3} style={{ color: '#004D40' }}>{category.name}</Title>
        </Divider>
        <Row gutter={[16, 16]} style={{ padding: '0 1%' }}>
          {category.products.map((product) => (
            <Col key={`${product.id}-${categoryId}`} xs={12} sm={12} md={8} lg={6}>
              {renderProductCard(product)}
            </Col>
          ))}
        </Row>
      </div>
    );
  };

  return (
    <div style={{ width: isMobile ? "100%" : "70%", margin: "auto", padding: '60px 20px' }}>
      <Promotion />
      <Row justify="space-between" align="center" style={{ marginBottom: '35px', padding: '0 2%' }}>
        <Col>
          <Title level={2} style={{ color: '#004D40', margin: 0 }}>Danh Mục Sản Phẩm</Title>
        </Col>
      </Row>
      {featuredCategories.map(category => renderProductSection(category.id))}
    </div>
  );
};