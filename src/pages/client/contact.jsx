import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Card, Typography, Button, Form, Input, message, Select } from 'antd';
import { Link } from 'react-router-dom';
import {
    SendOutlined, PhoneOutlined, MailOutlined, EnvironmentOutlined,
    ClockCircleOutlined, UserOutlined, TeamOutlined, CustomerServiceOutlined,
    ProjectOutlined, HomeOutlined, SettingOutlined, FireOutlined, ProductOutlined,
    AuditOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

// Custom styles cho trang liên hệ với màu xanh chủ đạo
const contactStyles = `
    .contact-hero {
        background: linear-gradient(135deg, #004D40, #00796B, #26A69A);
        padding: 80px 20px;
        text-align: center;
        position: relative;
        overflow: hidden;
    }

    .contact-hero::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        z-index: 1;
    }

    .contact-hero-content {
        position: relative;
        z-index: 2;
        max-width: 800px;
        margin: 0 auto;
    }

    .contact-section {
        padding: 80px 20px;
    }

    .form-card {
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        border-radius: 16px;
        overflow: hidden;
        transition: transform 0.3s ease;
    }

    .form-card:hover {
        transform: translateY(-5px);
    }

    .info-card {
        background: linear-gradient(135deg, #f8f9fa, #ffffff);
        border-radius: 16px;
        padding: 30px;
        height: 100%;
        transition: all 0.3s ease;
    }

    .info-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }

    .contact-info-item {
        display: flex;
        align-items: flex-start;
        margin-bottom: 25px;
        padding: 20px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        transition: all 0.3s ease;
    }

    .contact-info-item:hover {
        transform: translateX(5px);
        box-shadow: 0 4px 15px rgba(0, 77, 64, 0.1);
    }

    .contact-icon {
        font-size: 24px;
        color: #004D40;
        margin-right: 15px;
        margin-top: 2px;
        flex-shrink: 0;
    }

    .form-section {
        background: linear-gradient(135deg, #f8f9fa, #ffffff);
    }

    .submit-button {
        background: linear-gradient(135deg, #004D40, #00796B);
        border: none;
        height: 50px;
        font-size: 16px;
        font-weight: 600;
        border-radius: 25px;
        transition: all 0.3s ease;
    }

    .submit-button:hover {
        background: linear-gradient(135deg, #00796B, #004D40);
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0, 77, 64, 0.3);
    }

    .map-container {
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
        transition: transform 0.3s ease;
    }

    .map-container:hover {
        transform: scale(1.02);
    }

    .animate-fade-in {
        animation: fadeInUp 0.8s ease-out forwards;
    }

    .animate-slide-left {
        animation: slideInLeft 0.8s ease-out forwards;
    }

    .animate-slide-right {
        animation: slideInRight 0.8s ease-out forwards;
    }

    @keyframes fadeInUp {
        0% {
            opacity: 0;
            transform: translateY(30px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideInLeft {
        0% {
            opacity: 0;
            transform: translateX(-30px);
        }
        100% {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideInRight {
        0% {
            opacity: 0;
            transform: translateX(30px);
        }
        100% {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;

// Hook để theo dõi intersection observer
const useIntersectionObserver = (options = {}) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1, ...options }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [isVisible]);

    return [ref, isVisible];
};

// Component thông tin liên hệ
const ContactInfo = () => {
    const contactInfo = [
        {
            icon: <PhoneOutlined />,
            title: 'Điện thoại',
            content: ['0915935225', '0915935225'],
            description: 'Liên hệ với chúng tôi 24/7'
        },
        {
            icon: <MailOutlined />,
            title: 'Email',
            content: ['info@nhanviet.com', 'support@nhanviet.com'],
            description: 'Gửi email cho chúng tôi'
        },
        {
            icon: <EnvironmentOutlined />,
            title: 'Địa chỉ',
            content: ['Xưởng sản xuất: Số N10-LK14, khu đất dịch vụ LK20a, LK20b, Phường Dương Nội, Hà Nội'],
            description: 'Ghé thăm xưởng sản xuất của chúng tôi'
        },
        {
            icon: <ClockCircleOutlined />,
            title: 'Giờ làm việc',
            content: ['Thứ 2 - Thứ 6: 8:00 - 17:30', 'Thứ 7: 8:00 - 12:00', 'Chủ nhật: Nghỉ'],
            description: 'Thời gian làm việc của công ty'
        }
    ];

    return (
        <div style={{ padding: '60px 20px', backgroundColor: '#f8f9fa' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <Title level={2} style={{ color: '#333', fontSize: '2.5rem', fontWeight: '600', marginBottom: '15px' }}>
                        Thông tin liên hệ
                    </Title>
                    <Text style={{ fontSize: '1.1rem', color: '#666' }}>
                        Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7
                    </Text>
                </div>

                <Row gutter={[24, 24]}>
                    {contactInfo.map((info, index) => (
                        <Col xs={24} sm={12} key={index}>
                            <div className="contact-info-item">
                                <div className="contact-icon">
                                    {info.icon}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <Title level={4} style={{ margin: '0 0 8px 0', color: '#333', fontSize: '1.2rem' }}>
                                        {info.title}
                                    </Title>
                                    {info.content.map((line, i) => (
                                        <Text key={i} style={{ display: 'block', color: '#666', fontSize: '1rem', lineHeight: '1.5' }}>
                                            {line}
                                        </Text>
                                    ))}
                                    <Text style={{ color: '#999', fontSize: '0.9rem', fontStyle: 'italic' }}>
                                        {info.description}
                                    </Text>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

// Component form liên hệ
const ContactForm = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            // Giả lập API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            message.success('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.');
            form.resetFields();
        } catch (error) {
            message.error('Có lỗi xảy ra. Vui lòng thử lại sau.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '60px 20px' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <Card className="form-card" style={{ border: 'none' }}>
                    <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                        <Title level={3} style={{ color: '#333', fontSize: '2rem', fontWeight: '600', marginBottom: '10px' }}>
                            Gửi tin nhắn cho chúng tôi
                        </Title>
                        <Text style={{ fontSize: '1.1rem', color: '#666' }}>
                            Điền thông tin vào form dưới đây và chúng tôi sẽ liên hệ lại với bạn
                        </Text>
                    </div>

                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        size="large"
                    >
                        <Row gutter={20}>
                            <Col xs={24} sm={12}>
                                <Form.Item
                                    label="Họ và tên"
                                    name="fullName"
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập họ và tên!' },
                                        { min: 2, message: 'Họ và tên phải có ít nhất 2 ký tự!' }
                                    ]}
                                >
                                    <Input placeholder="Nhập họ và tên của bạn" />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={12}>
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập email!' },
                                        { type: 'email', message: 'Email không hợp lệ!' }
                                    ]}
                                >
                                    <Input placeholder="Nhập địa chỉ email" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={20}>
                            <Col xs={24} sm={12}>
                                <Form.Item
                                    label="Số điện thoại"
                                    name="phone"
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập số điện thoại!' },
                                        { pattern: /^[0-9+\-\s()]{10,}$/, message: 'Số điện thoại không hợp lệ!' }
                                    ]}
                                >
                                    <Input placeholder="Nhập số điện thoại" />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={12}>
                                <Form.Item
                                    label="Công ty (tùy chọn)"
                                    name="company"
                                >
                                    <Input placeholder="Nhập tên công ty" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item
                            label="Chủ đề"
                            name="subject"
                            rules={[
                                { required: true, message: 'Vui lòng nhập chủ đề!' }
                            ]}
                        >
                            <Input placeholder="Nhập chủ đề liên hệ" />
                        </Form.Item>

                        <Form.Item
                            label="Tin nhắn"
                            name="message"
                            rules={[
                                { required: true, message: 'Vui lòng nhập tin nhắn!' },
                                { min: 10, message: 'Tin nhắn phải có ít nhất 10 ký tự!' }
                            ]}
                        >
                            <TextArea
                                rows={5}
                                placeholder="Nhập nội dung tin nhắn của bạn..."
                                style={{ resize: 'vertical' }}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                className="submit-button"
                                style={{ width: '100%' }}
                                icon={<SendOutlined />}
                            >
                                {loading ? 'Đang gửi...' : 'Gửi tin nhắn'}
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
    );
};

// Component bản đồ
const MapSection = () => {
    return (
        <div style={{ padding: '0 20px 60px 20px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div className="map-container">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2290.547913733201!2d105.7505441!3d20.9736845!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad2549a106e1%3A0x34b4798fb3752599!2zUXXhuqNuZyBDw6FvIE5ow6JuIFZp4buHdA!5e1!3m2!1svi!2s!4v1759912678547!5m2!1svi!2s"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Bản đồ Quảng cáo Nhân Việt"
                    />
                </div>
            </div>
        </div>
    );
};

// Component trang liên hệ chính
const ContactPage = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Inject styles
        const styleSheet = document.createElement("style");
        styleSheet.innerText = contactStyles;
        document.head.appendChild(styleSheet);

        return () => {
            const existingStyleSheet = document.head.querySelector('style');
            if (existingStyleSheet && existingStyleSheet.innerText === contactStyles) {
                document.head.removeChild(existingStyleSheet);
            }
        };
    }, []);

    return (
        <>
            {/* Hero Section */}
            <div className="contact-hero">
                <div className="contact-hero-content">
                    <Title level={1} style={{
                        fontSize: '3.5rem',
                        fontWeight: '700',
                        marginBottom: '20px',
                        color: '#ffffff',
                        fontFamily: '"Montserrat", sans-serif',
                        letterSpacing: '-0.5px',
                        lineHeight: '1.2',
                        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                    }}>
                        Liên hệ với chúng tôi
                    </Title>
                    <Text style={{
                        fontSize: '1.3rem',
                        color: '#ffffff',
                        opacity: 0.9,
                        display: 'block'
                    }}>
                        Chúng tôi luôn sẵn sàng hỗ trợ và tư vấn cho bạn
                    </Text>
                </div>
            </div>

            {/* Form liên hệ */}
            <ContactForm />

            {/* Thông tin liên hệ */}
            <ContactInfo />

            {/* Bản đồ */}
            <MapSection />
        </>
    );
};

export default ContactPage;
