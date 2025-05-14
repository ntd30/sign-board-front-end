import { HomeOutlined, RobotOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Card, Col, Divider, notification, Row, Typography, Upload } from 'antd';
import { useContext, useState } from 'react';
import { AuthContext } from '../../components/context/auth.context';
import { uploadDesign } from '../../services/api.service';

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
    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const { user } = useContext(AuthContext)

    const handleOnChangeFile = event => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null)
            setPreview(null)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        const file = event.target.files[0]
        if (file) {
            setSelectedFile(file)
            setPreview(URL.createObjectURL(file))
        }
    }

    const handleUpload = async () => {
        if (!selectedFile) {
            notification.error({
                message: "Error create book",
                description: "Vui lòng upload ảnh thumbnail"
            })
        }

        // const resUpload = await uploadFile(selectedFile, 'book')
        const res = await uploadDesign(user.id, selectedFile, null)

        if (res) {
            setSelectedFile(null)
            setPreview(null)
            notification.success({
                message: "Thêm Bản thiết kế",
                description: "Thêm Bản thiết kế mới thành công"
            })
        } else {
            notification.error({
                message: "Lỗi thêm mới Bản thiết kế",
                description: JSON.stringify(resCreateUser.message)
            })
        }
    }

    return (
        <div style={{ width: '60%', margin: 'auto' }}>
            <div style={{ textAlign: 'center', padding: 50 }}>
                <Title level={2}>Thiết kế biển hiệu theo phong cách riêng của bạn</Title>

                <div>
                    <label htmlFor="btnUpload"
                        style={{
                            display: "block",
                            width: "fit-content",
                            cursor: "pointer",
                            margin: "25px auto",
                            borderRadius: 30,
                            padding: '15px 30px',
                            border: 'none',
                            color: 'white',
                            backgroundColor: 'rgba(216, 0, 0, 0.8)',
                            animation: 'ripple 2s infinite ease-in-out',
                        }}
                    ><UploadOutlined /> Tải lên ngay</label>
                    <input type="file" id="btnUpload" style={{ display: "none" }}
                        onChange={event => handleOnChangeFile(event)}
                        onClick={event => event.target.value = null}
                    />
                </div>

                {preview ?
                    <div style={{ width: 500, margin: "auto" }}>
                        <div style={{
                            marginTop: "50px",
                            marginBottom: "15px",
                            // width: "500px",
                            height: "500px",
                        }}>
                            <img style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                src={preview} alt="" />
                        </div>

                        <Button onClick={handleUpload} type='primary' danger block size='large'>Gửi</Button>
                    </div>
                    :
                    <div></div>
                }

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
