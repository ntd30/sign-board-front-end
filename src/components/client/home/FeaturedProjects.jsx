import React from 'react';
import { Row, Col, Card, Typography, Button } from 'antd';

const { Title, Text } = Typography;

const FeaturedProjects = () => {
  const projects = [
    {
      id: 1,
      name: 'Dự án Biển Quảng Cáo LED Công Ty ABC',
      description: 'Thiết kế và thi công hệ thống biển quảng cáo LED hiện đại cho công ty ABC với công nghệ tiên tiến nhất.',
    },
    {
      id: 2,
      name: 'Biển Hiệu Nhà Hàng XYZ',
      description: 'Tạo dựng thương hiệu nhà hàng XYZ với biển hiệu độc đáo và thu hút khách hàng.',
    },
    {
      id: 3,
      name: 'Hệ Thống Biển Tòa Nhà Văn Phòng',
      description: 'Thi công biển quảng cáo tòa nhà văn phòng với chất lượng cao cấp và độ bền vượt trội.',
    },
    {
      id: 4,
      name: 'Biển Quảng Cáo Siêu Thị DEF',
      description: 'Hệ thống biển quảng cáo siêu thị DEF với thiết kế sáng tạo và hiệu quả marketing cao.',
    }
  ];

  const projectCardStyle = {
    transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
    borderRadius: '12px',
    overflow: 'hidden',
    background: '#FFFFFF',
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  };

  const projectCardHoverStyle = {
    transform: 'translateY(-10px)',
    boxShadow: '0 15px 30px rgba(0, 77, 64, 0.2)',
  };

  const cardImageStyle = {
    height: '220px',
    objectFit: 'cover',
    padding: '5px',
    borderBottom: '1px solid #f0f0f0'
  };

  const cardBodyStyle = {
    flexGrow: 1,
    padding: '16px'
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "40px auto", padding: '0 20px' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '30px', color: '#004D40', fontWeight: 'bold' }}>
        Dự án tiêu biểu
      </Title>

      <Row gutter={[24, 24]}>
        {projects.map((project) => (
          <Col key={project.id} xs={12} sm={12} md={12} lg={6} style={{ display: 'flex' }}>
            <Card
              hoverable
              style={projectCardStyle}
              cover={
                <img
                  alt={project.name}
                  src="https://placehold.co/400x220/E0F2F1/00796B?text=Ảnh+Dự+Án"
                  style={cardImageStyle}
                />
              }
              bodyStyle={cardBodyStyle}
              actions={[
                <Button
                  type="primary"
                  style={{
                    backgroundColor: '#004D40',
                    borderColor: '#004D40',
                    fontWeight: 'bold',
                    width: 'calc(100% - 32px)',
                    margin: '0 16px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#00796B';
                    e.currentTarget.style.borderColor = '#00796B';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#004D40';
                    e.currentTarget.style.borderColor = '#004D40';
                  }}
                >
                  Xem Chi Tiết
                </Button>,
              ]}
            >
              <Card.Meta
                title={
                  <div
                    style={{
                      color: '#004D40',
                      marginBottom: '8px',
                      cursor: 'pointer',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      lineHeight: '1.4',
                      maxHeight: '2.8em',
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                      fontSize: '16px',
                      fontWeight: 'bold'
                    }}
                  >
                    {project.name}
                  </div>
                }
                description={
                  <Text
                    style={{
                      color: '#455A64',
                      fontSize: '14px',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {project.description}
                  </Text>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FeaturedProjects;
