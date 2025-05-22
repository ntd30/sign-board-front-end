import React, { useEffect, useState, useContext } from 'react';
import { Layout, Row, Col, Image, Rate, Typography, Button, Divider, Breadcrumb, Card, Tag, Space, Spin, Modal, Form, Input, notification } from 'antd';
import { PhoneOutlined, HomeOutlined, ShoppingCartOutlined, EyeOutlined, UserOutlined, MailOutlined, MessageOutlined } from '@ant-design/icons';
import { AuthContext } from '../../components/context/auth.context';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductContact from '../../components/client/product/product.contact';
import { createContactAPI, loadProductsByCategoryAPI } from '../../services/api.service';

const { Content } = Layout;
const { Title, Text, Paragraph, Link: AntLink } = Typography;

const ProductDetailPage = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [currentProductIdForModal, setCurrentProductIdForModal] = useState(null);
  const [loadingMainContactBtn, setLoadingMainContactBtn] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState(location?.state?.product);
  const categoryId = location?.state?.categoryId;

  const [mainImage, setMainImage] = useState('');
  const [loadingImage, setLoadingImage] = useState(true);

  const { user } = useContext(AuthContext);

  // Custom styles with adjustments for image sizing
  const customStyles = `
    .product-detail-page { background-color: #ffffff; }
    .product-detail-content { max-width: 1200px; margin: 40px auto; padding: 24px; background: #fff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); }
    .product-image-gallery .ant-image { border: 1px solid #f0f0f0; border-radius: 8px; transition: transform 0.3s ease, box-shadow 0.3s ease; }
    .product-image-gallery .ant-image:hover { transform: scale(1.02); box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    .product-image-gallery .ant-image-img { width: 100%; height: 600px; object-fit: cover; border-radius: 8px; } /* Increased height for larger main image */
    .thumbnail-list .ant-image { width: 100px; height: 100px; border: 2px solid transparent; border-radius: 6px; transition: border-color 0.3s ease; }
    .thumbnail-list .ant-image-img { width: 100%; height: 100%; object-fit: cover; cursor: pointer; border-radius: 6px; } /* Ensure thumbnails are uniform */
    .thumbnail-list .ant-image.selected-thumbnail { border-color: #1890ff; }
    .product-info .ant-typography { margin-bottom: 12px; }
    .product-info .ant-rate { margin-bottom: 16px; font-size: 20px; }
    .product-price { font-size: 2em; font-weight: 700; color: #ff4d4f; margin-bottom: 16px; }
    .stock-status { font-weight: 500; margin-bottom: 24px; }
    .stock-status.low-stock { color: #faad14; }
    .stock-status.out-of-stock { color: #f5222d; }
    .related-products-title { margin-top: 40px; margin-bottom: 24px; text-align: center; font-size: 24px; font-weight: 600; color: #333; }
    .related-product-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
    .related-product-card:hover { transform: translateY(-5px); box-shadow: 0 8px 16px rgba(0,0,0,0.1); }
    .related-product-card .ant-card-cover img { width: 100%; height: 200px; object-fit: cover; } /* Uniform size for related product images */
    .related-product-card .ant-card-actions > li { margin: 0 !important; width: 100% !important; }
    .related-product-card .ant-card-actions > li > span { display: block; width: 100%; }
    @media (max-width: 768px) {
      .product-image-gallery .ant-image-img { height: 400px; } /* Adjust main image height for tablets */
      .thumbnail-list .ant-image { width: 80px; height: 80px; }
    }
    @media (max-width: 575px) {
      .product-detail-content { margin: 20px auto; padding: 16px; }
      .ant-breadcrumb { font-size: 14px !important; }
      .product-price { font-size: 1.5em; }
      .product-image-gallery .ant-image-img { height: 300px; } /* Adjust main image height for mobile */
      .thumbnail-list .ant-image { width: 60px; height: 60px; }
    }
  `;

  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.id = 'product-detail-custom-styles';
    if (!document.getElementById(styleTag.id)) {
      styleTag.innerHTML = customStyles;
      document.head.appendChild(styleTag);
    }
    return () => {
      const existingStyleTag = document.getElementById('product-detail-custom-styles');
      if (existingStyleTag) document.head.removeChild(existingStyleTag);
    };
  }, [customStyles]);

  useEffect(() => {
    if (product) {
      setCurrentProductIdForModal(product.id);
      if (product.images && product.images.length > 0) {
        setMainImage(`${import.meta.env.VITE_BACKEND_URL || ''}/images/${product.images[0].imageUrl}`);
        setLoadingImage(false);
      } else {
        setMainImage('https://placehold.co/600x600/EFEFEF/CCC?text=No+Image');
        setLoadingImage(false);
      }
    } else {
      console.error("Product data is missing!");
      setLoadingImage(false);
    }

    loadRelatedProducts();
  }, [product]);

  const loadRelatedProducts = async () => {
    const res = await loadProductsByCategoryAPI(product?.category?.id || categoryId, 1, 5);
    setRelatedProducts(res?.data?.content || []);
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

  const handleThumbnailClick = (imageUrl) => {
    setMainImage(`${import.meta.env.VITE_BACKEND_URL || ''}/images/${imageUrl}`);
  };

  const handleMainProductContact = async () => {
    if (!user?.id) {
      setIsContactOpen(true);
    } else {
      setLoadingMainContactBtn(true);
      const { fullName, phoneNumber, email, address } = user;
      try {
        const res = await createContactAPI(fullName, phoneNumber, email, address, '', currentProductIdForModal);
        console.log("rescontac", res)
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

  const handleGetProductDetail = (item) => {
    setProduct(item);
  };

  return (
    <>
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
                  alt={product.name}
                  style={{ width: '100%', height: '600px', objectFit: 'cover', display: 'block', borderRadius: '8px', border: '1px solid #f0f0f0' }}
                  placeholder={
                    <div style={{ width: '100%', height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f5f5f5', borderRadius: '8px' }}>
                      <Spin tip="Đang tải ảnh..." />
                    </div>
                  }
                  onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x600/EFEFEF/CCC?text=Image+Error'; }}
                />
              </Image.PreviewGroup>
              {product.images && product.images.length > 1 && (
                <Row gutter={[8, 8]} style={{ marginTop: '16px' }} className="thumbnail-list">
                  {product.images.map((img) => (
                    <Col key={img.id} xs={6} sm={4} >
                      <Image
                        width={90}
                        height={90}
                        style={{marginRight: 20}}
                        preview={false}
                        src={`${import.meta.env.VITE_BACKEND_URL || ''}/images/${img.imageUrl}`}
                        alt={`${product.name} - thumbnail ${img.id}`}
                        onClick={() => handleThumbnailClick(img.imageUrl)}
                        className={mainImage.includes(img.imageUrl) ? 'selected-thumbnail' : ''}
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    </Col>
                  ))}
                </Row>
              )}
            </Col>

            <Col xs={24} md={12} className="product-info">
              <Title level={2} style={{ marginTop: 0, marginBottom: 12 }}>{product.name}</Title>
              <Space align="center" style={{ marginBottom: '16px' }}>
                <Rate disabled value={5 || 0} character="★" style={{ fontSize: 18 }} />
              </Space>

              <Paragraph className="product-price">
                Giá: Liên hệ
              </Paragraph>

              {product?.slug && (
                <Space size={[0, 8]} wrap style={{ marginBottom: '16px' }}>
                  <Tag color="blue" key={product.slug}>{product.name}</Tag>
                </Space>
              )}

              <Divider />

              <Title level={4} style={{ color: '#333' }}>Mô tả sản phẩm</Title>
              <div dangerouslySetInnerHTML={{ __html: product.description }} style={{ lineHeight: 1.7, color: '#595959' }} />

              <Divider />

              {product.stock !== undefined && (
                <Text
                  className={`stock-status ${product.stock <= 5 && product.stock > 0 ? 'low-stock' : product.stock === 0 ? 'out-of-stock' : ''}`}
                  style={{ display: 'block', marginBottom: '24px' }}
                >
                  {product.stock > 0 ? `Chỉ còn ${product.stock} sản phẩm - Đặt ngay!` : 'Sản phẩm tạm thời hết hàng'}
                </Text>
              )}

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
            </Col>
          </Row>

          <Divider style={{ marginTop: 40, marginBottom: 0 }} />
          <Title level={3} className="related-products-title">Sản Phẩm Liên Quan</Title>
          <Row gutter={[16, 16]}>
            {relatedProducts
              ?.filter((value) => value?.id !== product.id)
              ?.map(relatedProduct => (
                <Col key={relatedProduct?.id} xs={24} sm={12} md={8} lg={6}>
                  <Card
                    hoverable
                    className="related-product-card"
                    onClick={() => handleGetProductDetail(relatedProduct)}
                    cover={
                      <Image
                        alt={relatedProduct?.name}
                        src={`${import.meta.env.VITE_BACKEND_URL || ''}/images/${relatedProduct?.images[0]?.imageUrl}`}
                        preview={false}
                        onError={(e) => { e.currentTarget.src = `https://placehold.co/300x200/EFEFEF/CCC?text=${encodeURIComponent(relatedProduct?.name.substring(0, 15))}`; }}
                      />
                    }
                  >
                    <Card.Meta
                      title={<AntLink href={`/product/${relatedProduct?.id}`} style={{ color: '#1890ff' }}>{relatedProduct?.name}</AntLink>}
                      description={
                        <Text strong style={{ color: '#f5222d' }}>
                          Liên Hệ
                        </Text>
                      }
                    />
                    <Tag color="cyan" style={{ marginTop: 8 }}>{product?.category?.name}</Tag>
                  </Card>
                </Col>
              ))}
          </Row>
        </Content>
      </Layout>

      <ProductContact
        isContactOpen={isContactOpen}
        setIsContactOpen={setIsContactOpen}
        productId={currentProductIdForModal}
      />
    </>
  );
};

export default ProductDetailPage;