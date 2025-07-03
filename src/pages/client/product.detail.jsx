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
  console.log("Product Detail Page - Product:", product);
  // Custom styles with adjustments for image sizing
  const customStyles = `
    .product-detail-page { background-color: #ffffff; }
    .product-detail-content { max-width: 1200px; margin: 40px auto; padding: 24px; background: #fff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); }
    .product-image-gallery .ant-image { border: 1px solid #f0f0f0; border-radius: 8px; transition: transform 0.3s ease, box-shadow 0.3s ease; }
    .product-image-gallery .ant-image:hover { transform: scale(1.02); box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    .product-image-gallery .ant-image-img { 
      width: 100%; 
      height: 600px; 
      object-fit: scale-down;  /* Changed to prevent enlarging small images */
      border-radius: 8px; 
      background: #f8f8f8;
    }
    .thumbnail-list .ant-image { 
      width: 100px; 
      height: 100px; 
      border: 2px solid transparent; 
      border-radius: 6px; 
      transition: border-color 0.3s ease; 
      background: #f8f8f8;
    }
    .thumbnail-list .ant-image-img { 
      width: 100%; 
      height: 100%; 
      object-fit: scale-down;  /* Changed to prevent enlarging small images */
      cursor: pointer; 
      border-radius: 6px; 
    }
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
    .related-product-card .ant-card-cover img { width: 100%; height: 200px; object-fit: cover; }
    .related-product-card .ant-card-actions > li { margin: 0 !important; width: 100% !important; }
    .related-product-card .ant-card-actions > li > span { display: block; width: 100%; }
    .promotion-section { background: #fff9e6; padding: 16px; border-radius: 8px; margin-top: 16px; border: 1px solid #ffe7ba; }
    .promotion-section .promotion-title { font-size: 18px; font-weight: 600; color: #d4380d; margin-bottom: 12px; }
    .promotion-section .promotion-title::before { content: '🎁'; margin-right: 6px; }
    .promotion-section .promotion-item { font-size: 14px; color: #333; margin-bottom: 8px; display: flex; align-items: flex-start; }
    .promotion-section .promotion-item::before { content: '✅'; margin-right: 6px; }
    .promotion-section .promotion-subitem { font-size: 13px; color: #595959; margin-left: 20px; }
    @media (max-width: 992px) {
      .product-detail-content { max-width: 100%; margin: 20px; padding: 16px; }
      .product-image-gallery .ant-image-img { height: 450px; }
      .thumbnail-list .ant-image { width: 90px; height: 90px; }
      .product-info .product-price { font-size: 1.8em; }
      .related-products-title { font-size: 22px; }
      .related-product-card .ant-card-cover img { height: 180px; }
    }
    @media (max-width: 768px) {
      .product-image-gallery .ant-image-img { height: 400px; }
      .thumbnail-list .ant-image { width: 80px; height: 80px; }
      .product-info { text-align: center; }
      .product-info .ant-btn { width: 100%; max-width: 300px; }
      .promotion-section { padding: 12px; }
      .promotion-section .promotion-title { font-size: 16px; }
      .promotion-section .promotion-item { font-size: 13px; }
      .promotion-section .promotion-subitem { font-size: 12px; }
    }
    @media (max-width: 575px) {
      .product-detail-content { margin: 10px; padding: 12px; }
      .ant-breadcrumb { font-size: 12px !important; }
      .product-price { font-size: 1.5em; }
      .product-image-gallery .ant-image-img { height: 300px; }
      .thumbnail-list .ant-image { width: 60px; height: 60px; }
      .promotion-section { padding: 10px; }
      .promotion-section .promotion-title { font-size: 14px; }
      .promotion-section .promotion-item { font-size: 12px; }
      .promotion-section .promotion-subitem { font-size: 11px; }
      .related-products-title { font-size: 20px; }
      .related-product-card .ant-card-cover img { height: 150px; }
      .product-info .ant-typography h2 { font-size: 20px; }
      .product-info .ant-rate { font-size: 16px; }
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
    const setDefaultImage = () => {
      setMainImage('https://placehold.co/600x600/EFEFEF/CCC?text=No+Image');
      setLoadingImage(false);
    };

    if (!product) {
      console.error("Product data is missing!");
      setDefaultImage();
      return;
    }

    setCurrentProductIdForModal(product.id);

    if (!product.images || product.images.length === 0) {
      console.log('Product has no images');
      setDefaultImage();
      return;
    }

    const firstImage = product.images[0];
    console.log('Processing first image:', firstImage);

    // Ưu tiên base64 trước
    const base64Image = formatBase64Image(firstImage.imageBase64);
    if (base64Image) {
      console.log('Using base64 image');
      setMainImage(base64Image);
      setLoadingImage(false);
      return;
    }

    // Nếu không có base64 thì dùng URL
    const urlImage = getImageUrlWithFormat(firstImage.imageUrl);
    if (urlImage) {
      console.log('Using URL image:', urlImage);
      setMainImage(urlImage);
      setLoadingImage(false);
      return;
    }

    // Nếu cả hai đều không có
    console.log('No valid image found');
    setDefaultImage();

    loadRelatedProducts();
  }, [product]);

  // Hàm định dạng Base64 cho nhiều loại ảnh
  const formatBase64Image = (base64Str) => {
    if (!base64Str || typeof base64Str !== 'string') {
      console.log('Invalid base64 input:', base64Str);
      return null;
    }

    const trimmedStr = base64Str.trim();
    if (!trimmedStr) {
      console.log('Empty base64 string');
      return null;
    }

    // Nếu đã là data URL hợp lệ
    if (trimmedStr.match(/^data:image\/[a-z]+;base64,/)) {
      return trimmedStr;
    }

    // Kiểm tra định dạng ảnh
    const signature = trimmedStr.substring(0, 30); // Lấy nhiều hơn để kiểm tra chính xác
    let mimeType = 'image/jpeg';

    if (signature.match(/^\/9j\/4AAQ/)) mimeType = 'image/jpeg';
    else if (signature.startsWith('iVBORw0KGgo')) mimeType = 'image/png';
    else if (signature.startsWith('R0lGODdh') || signature.startsWith('R0lGODlh')) mimeType = 'image/gif';
    else if (signature.startsWith('UklGR')) mimeType = 'image/webp';
    else {
      console.log('Unrecognized image format:', signature);
      return null;
    }

    return `data:${mimeType};base64,${trimmedStr}`;
  };

  // Hàm lấy URL với định dạng
  const getImageUrlWithFormat = (imageUrl) => {
    if (!imageUrl) {
      console.log('No image URL provided');
      return null;
    }

    // Nếu URL đã đầy đủ (http/https)
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }

    // Nếu là đường dẫn tương đối
    const baseUrl = import.meta.env.VITE_BACKEND_URL
      ? `${import.meta.env.VITE_BACKEND_URL}/images/`
      : '/images/';

    // Kiểm tra định dạng file ảnh
    const extension = imageUrl.split('.').pop().toLowerCase();
    const imageExtensions = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'];

    if (!imageExtensions.includes(extension)) {
      console.warn('Potentially unsupported image format:', imageUrl);
    }

    return `${baseUrl}${imageUrl}`;
  };

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

  const handleThumbnailClick = (image) => {
    console.log('Thumbnail clicked with:', image);

    // Nếu image là string (direct URL hoặc base64)
    if (typeof image === 'string') {
      const base64Img = formatBase64Image(image);
      if (base64Img) {
        setMainImage(base64Img);
        return;
      }

      const urlImg = getImageUrlWithFormat(image);
      if (urlImg) {
        setMainImage(urlImg);
        return;
      }

      console.warn('Invalid image string:', image);
      setMainImage('https://placehold.co/600x600/EFEFEF/CCC?text=Invalid+Image');
      return;
    }

    // Nếu image là object (cấu trúc ảnh sản phẩm)
    if (image && typeof image === 'object') {
      const base64Img = formatBase64Image(image.imageBase64);
      if (base64Img) {
        setMainImage(base64Img);
        return;
      }

      const urlImg = getImageUrlWithFormat(image.imageUrl);
      if (urlImg) {
        setMainImage(urlImg);
        return;
      }

      console.warn('Invalid image object:', image);
      setMainImage('https://placehold.co/600x600/EFEFEF/CCC?text=Invalid+Image');
      return;
    }

    // Trường hợp không xác định
    console.error('Unknown image format:', image);
    setMainImage('https://placehold.co/600x600/EFEFEF/CCC?text=No+Image');
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
  const slugify = (text) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9 ]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
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
                  alt={product.name || 'Product image'}
                  style={{
                    width: '100%',
                    height: '600px',
                    objectFit: 'contain', // Changed from 'scale-down' to 'contain'
                    display: 'flex',      // Added
                    justifyContent: 'center', // Added
                    alignItems: 'center', // Added
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
                    console.error('Failed to load image:', {
                      src: e.currentTarget.src,
                      error: e.message,
                      productId: product?.id
                    });
                    e.currentTarget.src = 'https://placehold.co/600x600/EFEFEF/CCC?text=Image+Error';
                    e.currentTarget.style.objectFit = 'contain';
                    e.currentTarget.onerror = null; // Ngăn loop lỗi
                  }}
                />
              </Image.PreviewGroup>
              {product.images && product.images.length > 1 && (
                <Row gutter={[8, 8]} style={{ marginTop: '16px' }} className="thumbnail-list">
                  {product.images.map((img) => (
                    <Col key={img.id} xs={6} sm={4} >
                      <Image
                        width={90}
                        height={90}
                        style={{
                          marginRight: 20,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                        preview={false}
                        src={
                          formatBase64Image(img.imageBase64) || // Ưu tiên Base64
                          (img.imageUrl
                            ? getImageUrlWithFormat(img.imageUrl)
                            : 'https://placehold.co/90x90/EFEFEF/CCC?text=No+Image')
                        }
                        alt={`${product.name} - thumbnail ${img.id}`}
                        onClick={() => handleThumbnailClick(img.imageBase64 || img.imageUrl)}
                        className={
                          mainImage === (formatBase64Image(img.imageBase64) || getImageUrlWithFormat(img.imageUrl))
                            ? 'selected-thumbnail'
                            : ''
                        }
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          console.log("Thumbnail image load error:", e.target.src, e.message);
                        }}
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

              {/* {product?.slug && (
                <Space size={[0, 8]} wrap style={{ marginBottom: '16px' }}>
                  <Tag color="blue" key={product.slug}>{product.name}</Tag>
                </Space>
              )} */}

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
                <div className="promotion-title">ƯU ĐÃI ĐẶC BIỆT 01/07 - 30/07</div>
                <div className="promotion-item">Tặng miễn phí 01 website mẫu (hơn 520 mẫu đa ngành nghề)</div>
                <div className="promotion-item">Miễn phí thiết kế bảng hiệu 2D theo yêu cầu</div>
                <div className="promotion-item">Hỗ trợ cập nhật địa chỉ trên Google Map</div>
                <div className="promotion-item">Đồng hành từ A-Z: tư vấn, thiết kế, thi công</div>
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
                        src={
                          formatBase64Image(relatedProduct?.images[0]?.imageBase64) || // Ưu tiên Base64
                          (relatedProduct?.images[0]?.imageUrl
                            ? getImageUrlWithFormat(relatedProduct.images[0].imageUrl)
                            : `https://placehold.co/300x200/EFEFEF/CCC?text=${encodeURIComponent(relatedProduct?.name.substring(0, 15))}`)
                        }
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#f8f8f8'
                        }}
                        preview={false}
                        onError={(e) => {
                          e.currentTarget.src = `https://placehold.co/300x200/EFEFEF/CCC?text=${encodeURIComponent(relatedProduct?.name.substring(0, 15))}`;
                          console.log("Related product image load error:", e.target.src, e.message);
                        }}
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