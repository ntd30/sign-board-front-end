import { RightOutlined } from '@ant-design/icons'
import { Row, Col, Card, Typography } from 'antd'
import { fetchAllCategoriesAPI } from '../../../services/api.service'
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

const products = [
  {
    title: 'BIỂN HỘP ĐÈN',
    count: 6,
    image: '/img/bien-hop-den.png',
  },
  {
    title: 'BIỂN HỘP ĐÈN ÂM BẢN',
    count: 4,
    image: '/img/bien-hop-den.png',
  },
  {
    title: 'BIỂN TẤM ỐP ALU',
    count: 4,
    image: '/img/bien-hop-den.png',
  },
  {
    title: 'BIỂN PANO TẤM LỚN',
    count: 3,
    image: '/img/bien-hop-den.png',
  },
  {
    title: 'BIỂN GỖ QUẢNG CÁO',
    count: 2,
    image: '/img/bien-hop-den.png',
  },
  {
    title: 'BIỂN CHỮ NỔI QUẢNG CÁO',
    count: 3,
    image: '/img/bien-hop-den.png',
  },
];

const HomeList = () => {
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    const res = await fetchAllCategoriesAPI()
    setCategories(res.data)
    // console.log(res.data[0])
  }

  const handleGetProductByParentCategory = (parentCategoryName, childCategories) => {
    navigate("/products", {
      state: {
        parentCategoryName: parentCategoryName,
        products: childCategories.flatMap(childCategory => childCategory.products)
      }
    })
  }

  const handleGetProductByChildCategory = (parentCategoryName, childCategoryName, products) => {
    navigate("/products", {
      state: {
        parentCategoryName: parentCategoryName,
        childCategoryName: childCategoryName,
        products: products
      }
    })
  }

  return (
    <>
      <div style={{ width: "60%", margin: "50px auto" }}>
        {categories.slice(0, 3).map(parentCategory => (
          <div key={parentCategory.id}>
            <div>
              <Row
                justify="space-between" // Đẩy sang 2 bên
                align="bottom"          // Căn đáy
                style={rowStyle}        // Áp dụng style cho Row (có border-bottom)
                wrap={false}            // Không xuống dòng
              >
                {/* Cột trái */}
                <Col flex="none">       {/* flex="none" để cột co lại theo nội dung */}
                  <div style={titleLabelStyle}> {/* Áp dụng style cho nhãn */}
                    <Text strong style={{ color: 'white', display: 'block' }}> {/* Đảm bảo Text có màu trắng */}
                      {parentCategory.name}
                    </Text>
                  </div>
                </Col>

                {/* Cột phải */}
                <Col flex="none">
                  <span
                    style={linkStyle}
                    onClick={() => handleGetProductByParentCategory(parentCategory.name, parentCategory.childCategories)}
                  >
                    Xem thêm <RightOutlined />
                  </span>
                </Col>
              </Row>
            </div >

            <div>
              <Row gutter={24}>
                {/* Banner bên trái */}
                <Col xs={24} lg={9}>
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}${parentCategory.imageURL}`}
                    alt={parentCategory.slug}
                    style={{ width: '100%', height: 600, objectFit: 'fill', borderRadius: 8 }} />
                </Col>

                {/* Danh sách sản phẩm bên phải */}
                <Col xs={24} lg={15}>
                  <Row gutter={[16, 24]}>
                    {parentCategory.childCategories.map(childCategory => (
                      <Col sm={24} md={12} lg={8} key={childCategory.id}
                        onClick={() => handleGetProductByChildCategory(parentCategory.name, childCategory.name, childCategory.products)}
                      >
                        <Card
                          hoverable
                          cover={
                            <img
                              alt={childCategory.slug}
                              src={`${import.meta.env.VITE_BACKEND_URL}${childCategory.imageURL}`}
                              style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }}
                            />
                          }
                        >
                          <Meta
                            title={childCategory.name}
                            description={
                              <div style={{
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis'
                              }}>
                                {childCategory.description}
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
          </div>
        ))
        }
      </div >
    </>
  )
}

export default HomeList;
