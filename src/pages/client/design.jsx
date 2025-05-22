import { HomeOutlined, RobotOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Card, Col, Divider, notification, Row, Typography, Upload } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../components/context/auth.context';
import { uploadDesign } from '../../services/api.service';

const { Title, Paragraph } = Typography;

// --- Style dùng chung cho các Card ---
const cardStyle = {
    height: '100%',
    borderRadius: '16px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    padding: '16px',
};

const coverImageStyle = {
    display: 'block',
    width: '100%',
    height: '200px',
    objectFit: 'cover',
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
                const imageData = event.data.image;
                setPreview(imageData);
                const file = base64ToFile(imageData, 'design.png');
                setSelectedFile(file);
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    const handleOnChangeFile = ({ file }) => {
        if (!file) {
            setSelectedFile(null);
            setPreview(null);
            setDescription('');
            return;
        }

        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
        setDescription('');
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            notification.error({
                message: 'Lỗi tải lên',
                description: 'Vui lòng chọn ảnh bản thiết kế trước khi gửi',
            });
            return;
        }

        const res = await uploadDesign(user.id, selectedFile, description);

        if (res) {
            setSelectedFile(null);
            setPreview(null);
            setDescription('');
            notification.success({
                message: 'Thêm Bản thiết kế',
                description: 'Thêm bản thiết kế mới thành công',
            });
        } else {
            notification.error({
                message: 'Lỗi thêm mới bản thiết kế',
                description: JSON.stringify(res.message),
            });
        }
    };

    const handleOpenEditor = () => {
        window.open('/editor.html', '_blank');
    };

    return (
        <div style={{ padding: '16px', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <Title
                    level={3}
                    style={{
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        background: 'linear-gradient(90deg, #ff4d4f, #1890ff)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        animation: 'fadeIn 1s ease-in',
                        marginBottom: '24px',
                    }}
                >
                    Thiết kế biển hiệu
                </Title>
                <div>
                    <Button
                        type="primary"
                        size="large"
                        icon={<UploadOutlined />}
                        onClick={handleOpenEditor}
                        style={{
                            background: 'linear-gradient(45deg, #1890ff, #40c4ff)',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '0 24px',
                            height: '48px',
                            fontSize: '16px',
                            fontWeight: '500',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            marginBottom: '24px',
                        }}
                        onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
                        onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                    >
                        Mở trình chỉnh sửa thiết kế
                    </Button>

                    <Paragraph
                        type="secondary"
                        style={{
                            margin: '15px auto',
                            maxWidth: '100%',
                            fontSize: '1rem',
                            color: '#666',
                            lineHeight: '1.6',
                            padding: '10px 0',
                            animation: 'fadeIn 1s ease-in',
                        }}
                    >
                        Hoặc tải lên bản thiết kế độc đáo của bạn hoặc mở trình chỉnh sửa để bắt đầu từ ý tưởng mới!
                    </Paragraph>

                    <Upload
                        showUploadList={false}
                        beforeUpload={() => false} // Prevent auto-upload
                        onChange={handleOnChangeFile}
                        accept="image/*"
                    >
                        <Button
                            icon={<UploadOutlined />}
                            style={{
                                background: 'linear-gradient(45deg, #ff4d4f, #ff7875)',
                                border: 'none',
                                borderRadius: '30px',
                                padding: '12px 24px',
                                height: '48px',
                                fontSize: '16px',
                                fontWeight: '500',
                                color: 'white',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                animation: 'ripple 2s infinite ease-in-out',
                            }}
                            onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
                            onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                        >
                            Tải lên ngay
                        </Button>
                    </Upload>
                </div>

                {preview && (
                    <div style={{ margin: '20px 0', textAlign: 'center' }}>
                        <div style={{ maxWidth: '100%', margin: '0 auto', height: '300px' }}>
                            <img
                                style={{ maxWidth: '100%', height: '100%', objectFit: 'contain' }}
                                src={preview}
                                alt="Preview"
                            />
                        </div>
                        <input
                            placeholder="Nhập mô tả cho bản thiết kế của bạn"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            style={{
                                margin: '15px 0',
                                borderRadius: '8px',
                                padding: '10px',
                                fontSize: '1rem',
                                border: '1px solid #d9d9d9',
                                width: '100%',
                                maxWidth: '500px',
                            }}
                        />
                        <Button
                            onClick={handleUpload}
                            type="primary"
                            danger
                            block
                            size="large"
                            style={{
                                background: 'linear-gradient(45deg, #ff4d4f, #ff7875)',
                                border: 'none',
                                borderRadius: '12px',
                                height: '48px',
                                fontSize: '16px',
                                fontWeight: '500',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                maxWidth: '500px',
                                marginBottom: '15px',
                            }}
                            onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
                            onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                        >
                            Gửi
                        </Button>
                    </div>
                )}
            </div>

            <style>
                {`
                    @keyframes ripple {
                        0% {
                            box-shadow: 0 0 0 3px rgba(255, 77, 79, 0.2), 0 0 0 6px rgba(255, 77, 79, 0.1);
                        }
                        50% {
                            box-shadow: 0 0 0 12px rgba(255, 77, 79, 0.3), 0 0 0 24px rgba(255, 77, 79, 0.15);
                        }
                        100% {
                            box-shadow: 0 0 0 3px rgba(255, 77, 79, 0.2), 0 0 0 6px rgba(255, 77, 79, 0.1);
                        }
                    }
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                `}
            </style>

            <Row gutter={[16, 16]} style={{ padding: '20px', background: '#f0f2f5', borderRadius: '16px' }}>
                <Col xs={24} lg={8}>
                    <Card style={cardStyle}>
                        <HomeOutlined style={{ fontSize: 48, color: '#e64980', marginBottom: 16 }} />
                        <Title level={4} style={{ marginBottom: 8 }}>
                            Thiết kế biển hiệu
                        </Title>
                        <Paragraph type="secondary" style={{ marginBottom: 0 }}>
                            Bạn có thể tạo ra vô vàn cấu hình biển hiệu, đáp ứng mọi yêu cầu riêng biệt của bạn.
                        </Paragraph>
                    </Card>
                </Col>
                <Col xs={24} lg={8}>
                    <Card style={cardStyle} cover={<img src="/img/logo_robot.jpg" alt="AI Robot" style={coverImageStyle} />} />
                </Col>
                <Col xs={24} lg={8}>
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
                                <RobotOutlined style={{ fontSize: 48, color: '#74c0fc' }} />
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

            <Divider variant="dotted" style={{ borderColor: '#7cb305', margin: '30px auto' }} />

            <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
                <Col xs={24} lg={14}>
                    <img
                        src="/img/design/image.png"
                        style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: 16 }}
                        alt="Design Showcase"
                    />
                </Col>
                <Col xs={24} lg={10}>
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