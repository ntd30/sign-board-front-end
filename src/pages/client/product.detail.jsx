import React, { useState } from 'react'
import { Layout, Row, Col, Image, Rate, Typography, Button, Divider, Modal } from 'antd'
import { PhoneOutlined } from '@ant-design/icons'
import { useLocation } from 'react-router-dom'
import ProductContact from '../../components/client/product/product.contact'

const { Content } = Layout
const { Title, Text } = Typography

const ProductDetailPage = () => {
  const [isContactOpen, setIsContactOpen] = useState(false)
  const location = useLocation()
  const product = location?.state?.product

  return (
    <>
      <Content style={{ maxWidth: '70%', margin: '80px auto' }}>
        <h1>Thông tin sản phẩm</h1>
        <ol className="breadcrumb" style={{ fontSize: "20px" }}>
          <li className="breadcrumb-item active"><a href="/">Trang chủ</a></li>
          <li className="breadcrumb-item active">Chi tiết sản phẩm</li>
        </ol>

        <Row gutter={[50]} style={{ marginTop: '24px' }}>
          {/* Image */}
          <Col xs={24} md={12}>
            <Image
              src={`${import.meta.env.VITE_BACKEND_URL}/images/${product?.images[0]?.imageUrl}`}
              alt={product?.slug}
              style={{ width: 'auto', maxHeight: 500, objectFit: 'cover', display: 'block' }}
            />

            <Row gutter={[8, 8]} style={{ marginTop: '16px' }}>
              {product?.images?.slice(1).map((img, index) => (
                <Col key={img.id} xs={6}>
                  <Image
                    src={`${import.meta.env.VITE_BACKEND_URL}/images/${img.imageUrl}`}
                    alt={`${img.imageUrl} - thumbnail ${index + 1}`} />
                </Col>
              ))}
            </Row>

          </Col>

          {/* Title, desc,... */}
          <Col xs={24} md={12}>
            <Title level={2} style={{ marginTop: 0 }} >{product?.name}</Title>
            <Rate disabled defaultValue={5} style={{ marginBottom: '16px' }} character="★" />
            {/* <Text strong style={{ fontSize: '1.5em', display: 'block' }}>
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product?.price)}
            </Text> */}

            <Divider />

            <p>{product?.description}</p>

            <Divider />

            <Text style={{ display: 'block', marginBottom: '24px', color: '#ff4d4f' }}>Last 1 left-make it yours !</Text>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Button onClick={() => setIsContactOpen(true)} type="primary" icon={<PhoneOutlined />}>Liên hệ</Button>
            </div>
          </Col>
        </Row>
      </Content>

      <ProductContact
        isContactOpen={isContactOpen}
        setIsContactOpen={setIsContactOpen}
      />
    </>
  )
}

export default ProductDetailPage