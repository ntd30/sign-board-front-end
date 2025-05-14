import { RightOutlined } from '@ant-design/icons'
import { Row, Col, Card, Typography } from 'antd'
import { fetchAllParentCategoriesAPI, fetchAllProductsAPI, fetchAllProjectsAPI } from '../../../services/api.service'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const { Meta } = Card

const { Text } = Typography

// --- CSS Tối thiểu dưới dạng Object Style ---

// Style cho nhãn tiêu đề (phần CSS quan trọng nhất là clip-path)
const titleLabelStyle = {
  display: 'inline-block',        // Để áp dụng padding và background
  backgroundColor: '#E53935',   // Màu nền đỏ (thay đổi nếu cần)
  color: 'white',               // Màu chữ trắng
  padding: '8px 25px 8px 15px', // Padding (điều chỉnh)
  clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 100%, 0 100%)', // CSS tạo góc chéo
  position: 'relative',         // Cần cho z-index
  zIndex: 1,                    // Đảm bảo nằm trên border
  marginBottom: '-2px',         // Kéo nhẹ xuống để đè lên border-bottom của Row
}

// Style cho Row chứa (chủ yếu là border-bottom)
const rowStyle = {
  borderBottom: '2px solid #E53935', // CSS tạo đường kẻ dưới
  paddingBottom: '2px',              // Khoảng đệm nhỏ nếu cần (có thể không cần nếu dùng margin-bottom âm)
  marginBottom: '35px',              // Khoảng cách tổng thể bên dưới
  marginTop: '50px'
}

// Style cho Link "Xem thêm"
const linkStyle = {
  color: '#E53935',         // Màu chữ (điều chỉnh)
  marginLeft: '16px',       // Khoảng cách bên trái
  position: 'relative',     // Cần cho z-index
  zIndex: 1,                // Đảm bảo nằm trên border
  marginBottom: '2px',      // Nhấc nhẹ lên khỏi đường border
  cursor: 'pointer'
}

const HomeList = () => {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    const res = await fetchAllProductsAPI(1, 6)
    setProducts(res?.data?.content)
  }

  // const handleGetProductByParentCategory = (parentCategoryName, childCategories) => {
  //   navigate("/products", {
  //     state: {
  //       parentCategoryName: parentCategoryName,
  //       products: childCategories.flatMap(childCategory => childCategory.products)
  //     }
  //   })
  // }

  // const handleGetProductByChildCategory = (parentCategoryName, childCategoryName, products) => {
  //   navigate("/products", {
  //     state: {
  //       parentCategoryName: parentCategoryName,
  //       childCategoryName: childCategoryName,
  //       products: products
  //     }
  //   })
  // }

  return (
    <>
      <div style={{ width: "60%", margin: "50px auto" }}>
        <div>
          <h1 style={{ textAlign: "center" }}>SẢN PHẨM MỚI NHẤT</h1>
        </div>

        <div>
          <Row gutter={24}>
            {/* Banner bên trái */}
            <Col xs={24} lg={9}>
              <img
                src={`/img/image.png`}
                alt=""
                style={{ width: '100%', height: 600, objectFit: 'fill', borderRadius: 8 }} />
            </Col>

            {/* Danh sách sản phẩm bên phải */}
            <Col xs={24} lg={15}>
              <Row gutter={[16, 24]}>
                {products?.map(product => (
                  <Col sm={24} md={12} lg={8} key={product.id}
                    onClick={() => { }}
                  >
                    <Card
                      hoverable
                      cover={
                        <img
                          alt={product.slug}
                          src={`${import.meta.env.VITE_BACKEND_URL}/images/${product?.images[0].imageUrl}`}
                          style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }}
                        />
                      }
                    >
                      <Meta
                        title={product.name}
                        description={
                          <div style={{
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis'
                          }}>
                            {product.description}
                          </div>
                        }
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row >
        </div>
      </div >
    </>
  )
}

export default HomeList;
