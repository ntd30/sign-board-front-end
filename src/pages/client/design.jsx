import { HomeOutlined, RobotOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Card, Col, Divider, Row, Typography, Upload } from 'antd';

const { Title, Paragraph } = Typography;

// --- Style dùng chung cho các Card ---
const cardStyle = {
    height: '100%',
    borderRadius: '16px',
    overflow: 'hidden',     // Cắt nội dung theo góc bo
    display: 'flex',        // Giúp body card co giãn tốt hơn
    flexDirection: 'column',
    textAlign: 'center'
}

const coverImageStyle = {
    display: 'block',
    width: '100%',
    height: '100%', // Cho ảnh cố gắng fill card
    objectFit: 'cover' // Cắt ảnh cho vừa card
}

const DesignPage = () => {
    return (
        <div style={{ width: '60%', margin: 'auto' }}>
            <div style={{ textAlign: 'center', padding: 50 }}>
                <Title level={2}>Thiết kế biển hiệu theo phong cách riêng của bạn</Title>

                <Upload
                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    listType="picture"
                >
                    <Button
                        type="primary"
                        danger
                        icon={<UploadOutlined />}
                        style={{
                            // background: '#d80000',
                            margin: '30px 0',
                            borderRadius: 30,
                            padding: '20px 30px',
                            border: 'none',
                            animation: 'ripple 2s infinite ease-in-out',
                        }}
                    >
                        Tải lên ngay
                    </Button>
                </Upload>

                <style>
                    {`
              @keyframes ripple {
                0% {
                  box-shadow: 0 0 0 3px rgba(216, 0, 0, 0.2), 0 0 0 6px rgba(216, 0, 0, 0.1);
                }
                50% {
                  box-shadow: 0 0 0 12px rgba(216, 0, 0, 0.3), 0 0 0 24px rgba(216, 0, 0, 0.15);
                }
                100% {
                  box-shadow: 0 0 0 3px rgba(216, 0, 0, 0.2), 0 0 0 6px rgba(216, 0, 0, 0.1);
                }
              }
            `}
                </style>
            </div>

            <Row gutter={[24, 24]} style={{ padding: '40px', background: '#f0f2f5', borderRadius: '16px' }}>
                <Col sm={24} lg={8}>
                    <Card style={cardStyle}>
                        <HomeOutlined style={{ fontSize: 64, color: '#e64980', marginBottom: 24 }} />
                        <Title level={4} style={{ marginBottom: 8 }}>Thiết kế biển hiệu</Title>
                        <Paragraph type="secondary" style={{ marginBottom: 0 }}>
                            Bạn có thể tạo ra vô vàn cấu hình biển hiệu, đáp ứng mọi yêu cầu riêng biệt của bạn.
                        </Paragraph>
                    </Card>
                </Col>
                <Col sm={24} lg={8}>
                    <Card
                        style={cardStyle}
                        cover={
                            <img
                                src="/img/logo_robot.jpg" // *** THAY ĐƯỜNG DẪN ***
                                alt="AI Robot"
                                // preview={false}
                                style={coverImageStyle} // Style cho ảnh cover
                            // fallback="/path/to/placeholder.png" // Nên có ảnh dự phòng
                            />
                        }
                    >
                    </Card>
                </Col>
                <Col sm={24} lg={8}>
                    <Card style={cardStyle}
                        bordered={false}
                        cover={
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: 160,
                                    background: '#fff',
                                }}
                            >
                                <RobotOutlined style={{ fontSize: 64, color: '#74c0fc' }} />
                            </div>
                        }
                    >
                        <Title level={3}>Mô tả biển hiệu thật theo ý tưởng của bạn</Title>
                        <Paragraph>
                            Bạn có ý tưởng biển hiệu độc đáo? Hãy tải ảnh lên và khoe nó với mọi người!
                        </Paragraph>
                    </Card>
                </Col>
            </Row>

            <Divider variant="dotted" style={{ borderColor: '#7cb305', margin: '50px auto' }} />

            <Row gutter={24} style={{ marginBottom: 50 }}>
                <Col sm={24} lg={14}>
                    <img
                        src='/img/design/image.png'
                        style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: 16 }}
                    />
                </Col>
                <Col sm={24} lg={10}>
                    <Title level={4}>Chia sẻ ngay thiết kế biển hiệu của bạn với cộng đồng!</Title>
                    <Paragraph>
                        Bạn có một thiết kế biển hiệu độc đáo và đầy sáng tạo? Hãy tự tin chia sẻ tác phẩm nghệ thuật của bạn với cộng đồng những người yêu thích thiết kế trên khắp mọi nơi bằng cách tải lên hình ảnh một cách đơn giản, để không chỉ trưng bày tài năng cá nhân mà còn góp phần tạo nên một không gian trực tuyến phong phú, nơi mọi người có thể khám phá, học hỏi và tìm kiếm nguồn cảm hứng bất tận từ vô vàn những ý tưởng biển hiệu ấn tượng.
                    </Paragraph>
                </Col>
            </Row>
        </div >
    )
}

export default DesignPage;
