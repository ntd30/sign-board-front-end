import React, { useEffect, useState, useContext } from 'react';
import { Layout, Row, Col, Image, Rate, Typography, Button, Divider, Breadcrumb, Card, Tag, Space, Spin } from 'antd';
import { PhoneOutlined, HomeOutlined, GiftOutlined } from '@ant-design/icons';
import { AuthContext } from '../../components/context/auth.context';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ProductContact from '../../components/client/product/product.contact';
import { createContactAPI, loadProductsByCategoryAPI, GetProductById } from '../../services/api.service';
import '../../styles/ProductDetailPage.css'; // Import custom styles for the product detail page
import { notification } from 'antd'; // Added for notification handling
import { fetchAllProductsAPI } from '../../services/api.service';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const ProductDetailPage = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [currentProductIdForModal, setCurrentProductIdForModal] = useState(null);
  const [loadingMainContactBtn, setLoadingMainContactBtn] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const categoryId = location?.state?.categoryId;
  const [mainImage, setMainImage] = useState('');
  const [loadingImage, setLoadingImage] = useState(true);
  const { user } = useContext(AuthContext);

  // Hàm xử lý URL ảnh hoàn chỉnh
  const getImageUrlWithFormat = (imageUrl) => {
    if (!imageUrl) {
      return 'https://placehold.co/600x600/EFEFEF/CCC?text=No+Image';
    }

    // Nếu URL đã là full URL thì giữ nguyên
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }

    // Xử lý encode URI cho tiếng Việt và các ký tự đặc biệt
    const encodedUrl = encodeURI(imageUrl).replace(/%2F/g, '/');

    // Sử dụng biến môi trường hoặc fallback URL
    const baseUrl = import.meta.env.VITE_BACKEND_URL || 'https://api-v1.ai2.vn';
    
    // Xử lý cả trường hợp có hoặc không có dấu / ở đầu
    return imageUrl.startsWith('/') 
      ? `${baseUrl}${encodedUrl}`
      : `${baseUrl}/${encodedUrl}`;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await GetProductById(id);
        setProduct(res.data);
        
        // Ưu tiên sử dụng base64 nếu có
        const base64Key = Object.keys(res.data.imageBase64Map || {})[0];
        const base64Image = base64Key 
          ? `data:image/jpeg;base64,${res.data.imageBase64Map[base64Key]}` 
          : null;
        
        // Fallback logic theo thứ tự ưu tiên
        const fallbackImage = 
          base64Image ||
          getImageUrlWithFormat(res.data.imageURL) ||
          (res.data.imageURLs?.length > 0 ? getImageUrlWithFormat(res.data.imageURLs[0]) : null) ||
          'https://placehold.co/600x600/EFEFEF/CCC?text=No+Image';
        
        setMainImage(fallbackImage);
        setLoadingImage(false);
      } catch (error) {
        console.error("Failed to load product:", error);
        setMainImage('https://placehold.co/600x600/EFEFEF/CCC?text=Error');
        setLoadingImage(false);
      }
    };
    
    if (id) fetchProduct();
  }, [id]);

const loadRelatedProducts = async () => {
  try {
    const currentProductId = product?.id;
    const currentCategoryId = product?.category?.id || categoryId;

    let related = [];
    if (currentCategoryId) {
      const res = await loadProductsByCategoryAPI(currentCategoryId, 1, 20); // lấy nhiều hơn để lọc
      related = res?.data?.content?.filter(p => p.id !== currentProductId) || [];
    }

    if (related.length >= 4) {
      setRelatedProducts(related.slice(0, 4));
    } else {
      const resAll = await fetchAllProductsAPI(1, 50); // lấy nhiều để có dư
      const allProducts = resAll?.data?.content || [];

      // Loại bỏ sản phẩm hiện tại và các sản phẩm đã có trong related
      const filtered = allProducts.filter(p =>
        p.id !== currentProductId &&
        !related.find(rp => rp.id === p.id)
      );

      const needed = 4 - related.length;
      const additional = filtered.slice(0, needed);
      const finalRelated = [...related, ...additional];

      setRelatedProducts(finalRelated);
    }
  } catch (error) {
    console.error("Failed to load related products:", error);
  }
};




  useEffect(() => {
    if (product && (product.category?.id || categoryId)) {
      loadRelatedProducts();
    }
  }, [product, categoryId]);

  const handleMainProductContact = async () => {
    if (!user?.id) {
      setIsContactOpen(true);
      setCurrentProductIdForModal(product.id);
    } else {
      setLoadingMainContactBtn(true);
      const { fullName, phoneNumber, email, address } = user;
      try {
        const res = await createContactAPI(fullName, phoneNumber, email, address, '', product.id);
        notification[res.data ? 'success' : 'error']({
          message: res.data ? "Gửi Liên Hệ Thành Công" : "Lỗi Gửi Liên Hệ",
          description: res.data 
            ? "Chúng tôi đã nhận được thông tin của bạn và sẽ phản hồi sớm nhất!" 
            : res.data?.message || "Đã có lỗi xảy ra. Vui lòng thử lại.",
        });
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

  if (loadingImage && !product) {
    return (
      <Layout style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f0f2f5' }}>
        <Spin size="large" tip="Đang tải thông tin sản phẩm..." />
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout style={{ minHeight: '100vh', background: '#fff' }}>
        <Content style={{ padding: '50px', textAlign: 'center' }}>
          <Title level={2}>Không tìm thấy sản phẩm</Title>
          <Paragraph>Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</Paragraph>
          <Button type="primary" href="/">Quay về Trang Chủ</Button>
        </Content>
      </Layout>
    );
  }

  return (
    <Layout className="product-detail-page">
      <Content className="product-detail-content">
        <Breadcrumb style={{ fontSize: 16, marginBottom: 24 }}>
          <Breadcrumb.Item href="/">
            <HomeOutlined /> Trang chủ
          </Breadcrumb.Item>
          {product.category && (
            <Breadcrumb.Item>
              {product.category.name}
            </Breadcrumb.Item>
          )}
          <Breadcrumb.Item>{product.name}</Breadcrumb.Item>
        </Breadcrumb>

        <Row gutter={[32, 32]}>
          <Col xs={24} md={12} className="product-image-gallery">
            <Image.PreviewGroup>
              <Image
                src={mainImage}
                alt={product.name || 'Product image'}
                style={{
                  width: '100%',
                  height: '600px',
                  objectFit: 'contain',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '8px',
                  border: '1px solid #f0f0f0',
                  backgroundColor: '#f8f8f8'
                }}
                placeholder={
                  <div style={{
                    width: '100%',
                    height: '600px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '8px'
                  }}>
                    <Spin tip="Đang tải ảnh..." />
                  </div>
                }
                onError={(e) => {
                  console.error('Image load failed:', {
                    src: e.currentTarget.src,
                    productId: product?.id
                  });
                  e.currentTarget.src = 'https://placehold.co/600x600/EFEFEF/CCC?text=Image+Error';
                  e.currentTarget.onerror = null;
                }}
              />
            </Image.PreviewGroup>

            {product.imageURLs?.length > 1 && (
              <Row gutter={[8, 8]} style={{ marginTop: 16 }}>
                {product.imageURLs.map((img, idx) => {
                  const base64Key = Object.keys(product.imageBase64Map || {}).find(key => 
                    key.includes(img.split('/').pop().split('.')[0])
                  );
                  const imgSrc = base64Key 
                    ? `data:image/jpeg;base64,${product.imageBase64Map[base64Key]}`
                    : getImageUrlWithFormat(img);
                  const isActive = mainImage === imgSrc;

                  return (
                    <Col key={idx} xs={8} sm={6} md={4} lg={3}>
                      <div
                        onClick={() => setMainImage(imgSrc)}
                        style={{
                          cursor: 'pointer',
                          border: isActive ? '2px solid #1890ff' : '1px solid #d9d9d9',
                          borderRadius: 8,
                          padding: 4,
                          height: 80,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#fafafa'
                        }}
                      >
                        <img
                          src={imgSrc}
                          alt={`Thumbnail ${idx + 1}`}
                          style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain'
                          }}
                          onError={(e) => {
                            e.target.src = 'https://placehold.co/100x100/EFEFEF/CCC?text=Error';
                            e.target.onerror = null;
                          }}
                        />
                      </div>
                    </Col>
                  );
                })}
              </Row>
            )}
          </Col>

          <Col xs={24} md={12} className="product-info">
            <Title level={2} style={{ marginTop: 0, marginBottom: 12 }}>{product.name}</Title>
            <Space align="center" style={{ marginBottom: '16px' }}>
              <Rate disabled value={5} character="★" style={{ fontSize: 18 }} />
            </Space>

            <Paragraph className="product-price">
              Giá: {product.price ? `${product.price.toLocaleString()}đ` : 'Liên hệ'}
            </Paragraph>

            <Button
              onClick={handleMainProductContact}
              type="primary"
              size="large"
              icon={<PhoneOutlined />}
              style={{ minWidth: 200, fontWeight: 500 }}
              disabled={product.stock === 0}
              loading={loadingMainContactBtn}
            >
              Liên Hệ Tư Vấn
            </Button>

            <div className="promotion-section">
              <div className="promotion-title">
                <GiftOutlined className="promotion-title-icon" /> ƯU ĐÃI ĐẶC BIỆT
              </div>
              <div className="promotion-item">
                <GiftOutlined className="promotion-item-icon" /> Tặng miễn phí 01 website mẫu (hơn 520 mẫu đa ngành nghề)
              </div>
              <div className="promotion-item">
                <GiftOutlined className="promotion-item-icon" /> Miễn phí thiết kế bảng hiệu 2D theo yêu cầu
              </div>
              <div className="promotion-item">
                <GiftOutlined className="promotion-item-icon" /> Hỗ trợ cập nhật địa chỉ trên Google Map
              </div>
              <div className="promotion-item">
                <GiftOutlined className="promotion-item-icon" /> Đồng hành từ A-Z: tư vấn, thiết kế, thi công
              </div>
            </div>
          </Col>
        </Row>

        <Divider />

        <Title level={4} style={{ color: '#333' }}>Mô tả sản phẩm</Title>
        <div dangerouslySetInnerHTML={{ __html: product.description }} style={{ lineHeight: 1.7, color: '#595959' }} />

        {product.stock !== undefined && (
          <Text
            className={`stock-status ${product.stock <= 5 && product.stock > 0 ? 'low-stock' : product.stock === 0 ? 'out-of-stock' : ''}`}
            style={{ display: 'block', marginTop: '24px', marginBottom: '24px' }}
          >
            {product.stock > 0 ? `Chỉ còn ${product.stock} sản phẩm - Đặt ngay!` : 'Sản phẩm tạm thời hết hàng'}
          </Text>
        )}

        <Divider style={{ marginTop: 40, marginBottom: 0 }} />
        <Title level={3} className="related-products-title">Sản Phẩm Liên Quan</Title>
        <Row gutter={[16, 16]}>
          {relatedProducts
            ?.filter(item => item?.id !== product?.id)
            ?.map(item => (
              <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  onClick={() => navigate(`/products/detail/${item.id}`)}
                  cover={
                    <div style={{ height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <img
                        src={
                          item?.images[0]?.imageBase64
                            ? `data:image/jpeg;base64,${item.images[0].imageBase64}`
                            : item?.images[0]?.imageUrl
                              ? `${import.meta.env.VITE_BACKEND_URL}/images/${encodeURIComponent(item.images[0].imageUrl)}`
                              : 'https://placehold.co/300x200?text=No+Image'
                        }
                        alt={item.name}
                        style={{ 
                          maxWidth: '100%', 
                          maxHeight: '100%',
                          objectFit: 'contain'
                        }}
                        onError={(e) => {
                          e.target.src = 'https://placehold.co/300x200?text=Image+Error';
                          e.target.onerror = null;
                        }}
                      />
                    </div>
                  }
                >
                  <Card.Meta
                    title={item.name}
                    description={
                      <Space direction="vertical">
                        <Text strong>
                          Giá liên hệ
                        </Text>
                        <Button
              onClick={handleMainProductContact}
              type="primary"
              size="large"
              icon={<PhoneOutlined />}
              style={{ minWidth: 200, fontWeight: 500 }}
              disabled={product.stock === 0}
              loading={loadingMainContactBtn}
            >
              Liên Hệ Tư Vấn
            </Button>
                        
                      </Space>
                    }
                  />
                </Card>
              </Col>
            ))}
        </Row>
      </Content>

      <ProductContact
        isContactOpen={isContactOpen}
        setIsContactOpen={setIsContactOpen}
        productId={currentProductIdForModal}
      />
    </Layout>
  );
};

export default ProductDetailPage;