import { RightOutlined } from '@ant-design/icons'
import { Row, Col, Card, Typography } from 'antd'
import { fetchAllCategoriesAPI } from '../../../services/api.service'
import { useEffect, useState } from 'react'

const { Meta } = Card

const { Text, Link } = Typography

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

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    const res = await fetchAllCategoriesAPI()
    setCategories(res.data)
  }

  return (
    <>
      <div style={{ width: "60%", margin: "50px auto" }}>
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
                  BIỂN QUẢNG CÁO
                </Text>
              </div>
            </Col>

            {/* Cột phải */}
            <Col flex="none">
              <Link href="#" style={linkStyle}> {/* Áp dụng style cho link */}
                Xem thêm <RightOutlined />
              </Link>
            </Col>
          </Row>
        </div>

        <div>
          <Row gutter={24}>
            {/* Banner bên trái */}
            <Col xs={24} lg={9}>
              <img src="/img/bien-quang-cao.png" alt="banner" style={{ width: '100%', borderRadius: 8 }} />
            </Col>

            {/* Danh sách sản phẩm bên phải */}
            <Col xs={24} lg={15}>
              <Row gutter={[16, 24]}>
                {categories.map(item => (
                  <Col sm={24} md={12} lg={8} key={item.title}>
                    <Card
                      hoverable
                      cover={<img src={item.imageURL} />}
                    >
                      <Meta title={item.name} description={item.description} />
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
}

export default HomeList;
