import { HomeOutlined, RobotOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Card, Col, Divider, notification, Row, Typography, Upload, Input } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../components/context/auth.context';
import { uploadDesign } from '../../services/api.service';

const { Title, Paragraph } = Typography;

const cardStyle = {
    height: '100%',
    borderRadius: '16px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center'
};

const coverImageStyle = {
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'cover'
};

const DesignPage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [description, setDescription] = useState('');
    const { user } = useContext(AuthContext);

    // Hàm chuyển base64 thành file để gửi qua API
    const base64ToFile = (base64, filename) => {
        const arr = base64.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };

    // Nhận ảnh từ editor.html qua postMessage
    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data.type === 'DESIGN_IMAGE') {
                const imageData = event.data.image; // Dữ liệu ảnh dạng base64
                setPreview(imageData); // Hiển thị ảnh xem trước

                // Chuyển base64 thành file để chuẩn bị gửi
                const file = base64ToFile(imageData, 'design.png');
                setSelectedFile(file);
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    const handleOnChangeFile = event => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
            setDescription('');
            return;
        }

        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
            setDescription('');
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            notification.error({
                message: "Lỗi tải lên",
                description: "Vui lòng chọn ảnh bản thiết kế trước khi gửi"
            });
            return;
        }

        const res = await uploadDesign(user.id, selectedFile, description);

        if (res) {
            setSelectedFile(null);
            setPreview(null);
            setDescription('');
            notification.success({
                message: "Thêm Bản thiết kế",
                description: "Thêm bản thiết kế mới thành công"
            });
        } else {
            notification.error({
                message: "Lỗi thêm mới bản thiết kế",
                description: JSON.stringify(res.message)
            });
        }
    };

    const handleOpenEditor = () => {
        window.open('/editor.html', '_blank');
    };

    return (
        <div style={{ width: '60%', margin: 'auto' }}>
            <div style={{ textAlign: 'center', padding: 50 }}>
                <Title level={2}>Thiết kế biển hiệu theo phong cách riêng của bạn</Title>

                <div>
                    <Button
                        type="primary"
                        size="large"
                        icon={<UploadOutlined />}
                        style={{ marginBottom: 24 }}
                        onClick={handleOpenEditor}
                    >
                        Mở trình chỉnh sửa thiết kế
                    </Button>

                    <label
                        htmlFor="btnUpload"
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
                    >
                        <UploadOutlined /> Tải ảnh thiết kế
                    </label>
                    <input
                        type="file"
                        id="btnUpload"
                        style={{ display: "none" }}
                        onChange={event => handleOnChangeFile(event)}
                        onClick={event => event.target.value = null}
                    />
                    <Paragraph
                        type="secondary"
                        style={{
                            margin: '15px auto',
                            maxWidth: '500px',
                            fontSize: '16px',
                            color: '#555',
                        }}
                    >
                        Tải lên bản thiết kế độc đáo của bạn hoặc mở trình chỉnh sửa để bắt đầu từ ý tưởng mới!
                    </Paragraph>
                </div>

                {preview && (
                    <div style={{ width: 500, margin: "auto" }}>
                        <div style={{
                            marginTop: "50px",
                            marginBottom: "15px",
                            height: "500px",
                        }}>
                            <img
                                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                src={preview}
                                alt="Preview"
                            />
                        </div>
                        <Input
                            placeholder="Nhập mô tả cho bản thiết kế của bạn"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            style={{
                                marginBottom: '15px',
                                borderRadius: '8px',
                                padding: '10px',
                            }}
                        />
                        <Button onClick={handleUpload} type='primary' danger block size='large'>Gửi</Button>
                    </div>
                )}

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
                                src="/img/logo_robot.jpg"
                                alt="AI Robot"
                                style={coverImageStyle}
                            />
                        }
                    >
                    </Card>
                </Col>
                <Col sm={24} lg={8}>
                    <Card
                        style={cardStyle}
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
                        alt="Design Showcase"
                    />
                </Col>
                <Col sm={24} lg={10}>
                    <Title level={4}>Chia sẻ ngay thiết kế biển hiệu của bạn với cộng đồng!</Title>
                    <Paragraph>
                        Bạn có một thiết kế biển hiệu độc đáo và đầy sáng tạo? Hãy tự tin chia sẻ tác phẩm nghệ thuật của bạn với cộng đồng những người yêu thích thiết kế trên khắp mọi nơi bằng cách tải lên hình ảnh một cách đơn giản, để không chỉ trưng bày tài năng cá nhân mà còn góp phần tạo nên một không gian trực tuyến phong phú, nơi mọi người có thể khám phá, học hỏi và tìm kiếm nguồn cảm hứng bất tận từ vô vàn những ý tưởng biển hiệu ấn tượng.
                    </Paragraph>
                </Col>
            </Row>
        </div>
    );
};

export default DesignPage;