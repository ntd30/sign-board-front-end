import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Button, Statistic, Carousel, Avatar } from 'antd';
import {
    TeamOutlined, CustomerServiceOutlined, ProjectOutlined, LeftOutlined, RightOutlined,
    BulbOutlined, ShopOutlined, ApartmentOutlined, FontSizeOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

// Component Trang Chủ chính với thứ tự đúng
export const HomePage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [countersVisible, setCountersVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCountersVisible(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const slides = [
        {
            title: "Quảng Cáo Nhân Việt",
            subtitle: "Giải pháp bảng hiệu thông minh thời đại mới",
            buttonText: "Thiết kế ngay",
            background: "linear-gradient(135deg, #004D40 0%, #00796B 50%, #26A69A 100%)",
            overlay: "rgba(0, 77, 64, 0.8)"
        },
        {
            title: "Biển Hiệu LED Hiện Đại",
            subtitle: "Công nghệ tiên tiến, tiết kiệm năng lượng",
            buttonText: "Xem sản phẩm",
            background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #3d6db3 100%)",
            overlay: "rgba(30, 60, 114, 0.8)"
        },
        {
            title: "Thiết Kế Chuyên Nghiệp",
            subtitle: "Đội ngũ kinh nghiệm hơn 10 năm",
            buttonText: "Liên hệ ngay",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
            overlay: "rgba(102, 126, 234, 0.8)"
        }
    ];

    return (
        <>
            {/* Custom CSS for better styling */}
            <style jsx global>{`
                .hero-slide {
                    position: relative;
                    background-size: cover;
                    background-position: center;
                    background-attachment: fixed;
                }

                .hero-slide::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: var(--overlay);
                    z-index: 1;
                }

                .hero-content {
                    position: relative;
                    z-index: 2;
                }

                .fade-in {
                    animation: fadeInUp 1s ease-out;
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .slide-in-left {
                    animation: slideInLeft 0.8s ease-out;
                }

                @keyframes slideInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                .slide-in-right {
                    animation: slideInRight 0.8s ease-out;
                }

                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                .scale-in {
                    animation: scaleIn 0.8s ease-out;
                }

                @keyframes scaleIn {
                    from {
                        opacity: 0;
                        transform: scale(0.8);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                .partners-scroll {
                    animation: scroll 30s linear infinite;
                }

                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }

                .counter-animate {
                    transition: all 2s ease-out;
                }

                .section-card {
                    transition: all 0.3s ease;
                    border: none;
                    box-shadow: 0 4px 20px rgba(0, 77, 64, 0.1);
                }

                .section-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 30px rgba(0, 77, 64, 0.2);
                }

                .service-card {
                    background: linear-gradient(145deg, #ffffff, #f8f9fa);
                    border: 2px solid transparent;
                    transition: all 0.3s ease;
                }

                .service-card:hover {
                    border-color: #004D40;
                    transform: translateY(-3px);
                }

                .stats-gradient {
                    background: linear-gradient(135deg, #004D40 0%, #00796B 50%, #26A69A 100%);
                }

                .custom-dots .ant-carousel-dot {
                    background: rgba(255, 255, 255, 0.5);
                    width: 12px;
                    height: 12px;
                }

                .custom-dots .ant-carousel-dot-active {
                    background: #ffffff;
                    transform: scale(1.2);
                }
            `}</style>

            {/* 1. Slide ảnh với hiệu ứng đẹp hơn */}
            <div style={{ position: 'relative', height: '90vh', overflow: 'hidden' }}>
                <Carousel
                    autoplay
                    autoplaySpeed={5000}
                    dots={{ className: 'custom-dots' }}
                    arrows
                    prevArrow={<LeftOutlined style={{ fontSize: '24px', color: 'white' }} />}
                    nextArrow={<RightOutlined style={{ fontSize: '24px', color: 'white' }} />}
                    afterChange={(current) => setCurrentSlide(current)}
                    effect="fade"
                >
                    {slides.map((slide, index) => (
                        <div key={index}>
                            <div
                                className="hero-slide"
                                style={{
                                    background: slide.background,
                                    minHeight: '90vh',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <div className="hero-content" style={{
                                    maxWidth: '1200px',
                                    margin: '0 auto',
                                    textAlign: 'center',
                                    padding: '0 20px',
                                    width: '100%'
                                }}>
                                    <div className={`fade-in ${currentSlide === index ? 'fade-in' : ''}`}>
                                        <Title level={1} style={{
                                            fontSize: '4rem',
                                            fontWeight: '800',
                                            marginBottom: '30px',
                                            color: '#ffffff',
                                            fontFamily: '"Montserrat", "Helvetica Neue", Arial, sans-serif',
                                            letterSpacing: '-1px',
                                            lineHeight: '1.1',
                                            textShadow: '0 4px 8px rgba(0,0,0,0.3)',
                                            background: 'linear-gradient(45deg, #ffffff, #e0f2f1)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text'
                                        }}>
                                            {slide.title}
                                        </Title>
                                        <Paragraph style={{
                                            fontSize: '1.4rem',
                                            color: '#ffffff',
                                            marginBottom: '50px',
                                            opacity: 0.95,
                                            fontWeight: '400',
                                            maxWidth: '800px',
                                            margin: '0 auto 50px'
                                        }}>
                                            {slide.subtitle}
                                        </Paragraph>
                                        <Button
                                            type="primary"
                                            size="large"
                                            shape="round"
                                            style={{
                                                background: 'rgba(255, 255, 255, 0.15)',
                                                border: '2px solid rgba(255, 255, 255, 0.8)',
                                                fontWeight: '600',
                                                padding: '0 50px',
                                                height: '60px',
                                                fontSize: '1.2rem',
                                                borderRadius: '50px',
                                                color: '#ffffff',
                                                backdropFilter: 'blur(20px)',
                                                transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
                                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                                                e.currentTarget.style.transform = 'translateY(-3px)';
                                                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.3)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                                                e.currentTarget.style.transform = 'translateY(0)';
                                                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
                                            }}
                                        >
                                            {slide.buttonText}
                                        </Button>
                                    </div>
                                </div>
                                <div style={{
                                    position: 'absolute',
                                    top: '0',
                                    left: '0',
                                    right: '0',
                                    bottom: '0',
                                    background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 50%)',
                                    zIndex: 1
                                }}></div>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>

            {/* 2. Các bài viết về các lĩnh vực biển với thiết kế hiện đại */}
            <div style={{ padding: '100px 20px', background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <Title level={2} style={{
                            fontSize: '3rem',
                            fontWeight: '700',
                            color: '#004D40',
                            marginBottom: '20px',
                            position: 'relative'
                        }}>
                            Các Lĩnh Vực Biển Quảng Cáo
                            <div style={{
                                width: '80px',
                                height: '4px',
                                background: 'linear-gradient(90deg, #004D40, #26A69A)',
                                margin: '20px auto 0',
                                borderRadius: '2px'
                            }}></div>
                        </Title>
                        <Paragraph style={{
                            fontSize: '1.2rem',
                            color: '#666',
                            maxWidth: '600px',
                            margin: '0 auto'
                        }}>
                            Chúng tôi cung cấp đa dạng các loại biển quảng cáo chất lượng cao, đáp ứng mọi nhu cầu của khách hàng
                        </Paragraph>
                    </div>

                    <Row gutter={[32, 32]}>
                        {[
                            {
                                icon: <BulbOutlined style={{ fontSize: '3rem', color: '#004D40' }} />,
                                title: 'Biển Quảng Cáo LED',
                                description: 'Các mẫu biển quảng cáo LED hiện đại, tiết kiệm năng lượng và thu hút ánh nhìn.',
                                image: 'https://placehold.co/400x250/004D40/ffffff?text=Biển+LED',
                                gradient: 'linear-gradient(135deg, #004D40, #00796B)'
                            },
                            {
                                icon: <ShopOutlined style={{ fontSize: '3rem', color: '#004D40' }} />,
                                title: 'Biển Hiệu Cửa Hàng',
                                description: 'Thiết kế biển hiệu chuyên nghiệp cho cửa hàng, nhà hàng và showroom.',
                                image: 'https://placehold.co/400x250/00796B/ffffff?text=Biển+hiệu',
                                gradient: 'linear-gradient(135deg, #00796B, #26A69A)'
                            },
                            {
                                icon: <ApartmentOutlined style={{ fontSize: '3rem', color: '#004D40' }} />,
                                title: 'Biển Quảng Cáo Tòa Nhà',
                                description: 'Các giải pháp biển quảng cáo cho tòa nhà văn phòng và chung cư cao cấp.',
                                image: 'https://placehold.co/400x250/26A69A/ffffff?text=Tòa+nhà',
                                gradient: 'linear-gradient(135deg, #26A69A, #4DB6AC)'
                            }
                        ].map((service, index) => (
                            <Col xs={24} md={8} key={index}>
                                <Card
                                    className={`service-card slide-in-${index % 2 === 0 ? 'left' : 'right'}`}
                                    style={{
                                        textAlign: 'center',
                                        borderRadius: '20px',
                                        overflow: 'hidden',
                                        minHeight: '400px',
                                        position: 'relative'
                                    }}
                                    cover={
                                        <div style={{
                                            height: '200px',
                                            background: service.gradient,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            {service.icon}
                                        </div>
                                    }
                                >
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        style={{
                                            width: '100%',
                                            height: '180px',
                                            objectFit: 'cover',
                                            borderRadius: '10px',
                                            marginBottom: '20px'
                                        }}
                                    />
                                    <Card.Meta
                                        title={
                                            <Title level={3} style={{
                                                color: '#004D40',
                                                marginBottom: '15px',
                                                fontSize: '1.3rem'
                                            }}>
                                                {service.title}
                                            </Title>
                                        }
                                        description={
                                            <Paragraph style={{
                                                color: '#666',
                                                lineHeight: '1.6',
                                                fontSize: '1rem'
                                            }}>
                                                {service.description}
                                            </Paragraph>
                                        }
                                    />
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>

            {/* 3. Đối tác – khách hàng với hiệu ứng cuộn đẹp */}
            <div style={{
                padding: '100px 20px',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    position: 'relative'
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <Title level={2} style={{
                            fontSize: '3rem',
                            fontWeight: '700',
                            color: '#004D40',
                            marginBottom: '20px'
                        }}>
                            Đối Tác & Khách Hàng
                            <div style={{
                                width: '80px',
                                height: '4px',
                                background: 'linear-gradient(90deg, #004D40, #26A69A)',
                                margin: '20px auto 0',
                                borderRadius: '2px'
                            }}></div>
                        </Title>
                    </div>

                    <div style={{
                        overflow: 'hidden',
                        position: 'relative',
                        background: 'rgba(255, 255, 255, 0.8)',
                        borderRadius: '20px',
                        padding: '40px 0',
                        backdropFilter: 'blur(10px)'
                    }}>
                        <div className="partners-scroll" style={{
                            display: 'flex',
                            gap: '60px',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexWrap: 'wrap'
                        }}>
                            {[
                                { name: 'Đối tác Samsung', logo: 'https://placehold.co/200x100/f0f0f0/333333?text=Samsung' },
                                { name: 'Đối tác LG', logo: 'https://placehold.co/200x100/e0e0e0/333333?text=LG' },
                                { name: 'Đối tác Sony', logo: 'https://placehold.co/200x100/d0d0d0/333333?text=Sony' },
                                { name: 'Đối tác Apple', logo: 'https://placehold.co/200x100/c0c0c0/333333?text=Apple' },
                                { name: 'Đối tác Google', logo: 'https://placehold.co/200x100/b0b0b0/333333?text=Google' },
                                { name: 'Đối tác Microsoft', logo: 'https://placehold.co/200x100/a0a0a0/333333?text=Microsoft' }
                            ].map((partner, index) => (
                                <div key={`${partner.name}-${index}`} style={{
                                    flex: '0 0 auto',
                                    opacity: 0.7,
                                    transition: 'all 0.3s ease',
                                    padding: '20px',
                                    borderRadius: '15px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                                    transform: 'scale(0.9)'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.opacity = '1';
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.opacity = '0.7';
                                    e.currentTarget.style.transform = 'scale(0.9)';
                                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                                }}>
                                    <img
                                        src={partner.logo}
                                        alt={partner.name}
                                        style={{
                                            height: '60px',
                                            width: 'auto',
                                            maxWidth: '150px',
                                            filter: 'grayscale(100%)',
                                            transition: 'filter 0.3s ease'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.filter = 'grayscale(0%)'}
                                        onMouseLeave={(e) => e.currentTarget.style.filter = 'grayscale(100%)'}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. Dự án tiêu biểu với layout hiện đại */}
            <div style={{
                maxWidth: "1400px",
                margin: "0 auto",
                padding: '100px 20px',
                background: 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <Title level={2} style={{
                        fontSize: '3rem',
                        fontWeight: '700',
                        color: '#004D40',
                        marginBottom: '20px',
                        position: 'relative'
                    }}>
                        Dự Án Tiêu Biểu
                        <div style={{
                            width: '80px',
                            height: '4px',
                            background: 'linear-gradient(90deg, #004D40, #26A69A)',
                            margin: '20px auto 0',
                            borderRadius: '2px'
                        }}></div>
                    </Title>
                    <Paragraph style={{
                        fontSize: '1.2rem',
                        color: '#666',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        Những dự án nổi bật với thiết kế sáng tạo và chất lượng cao cấp
                    </Paragraph>
                </div>

                <Row gutter={[32, 32]}>
                    {[1, 2, 3, 4].map((project, index) => (
                        <Col xs={24} sm={12} lg={6} key={project}>
                            <Card
                                className="section-card"
                                style={{
                                    borderRadius: '20px',
                                    overflow: 'hidden',
                                    position: 'relative',
                                    background: '#ffffff'
                                }}
                                cover={
                                    <div style={{
                                        height: '220px',
                                        background: `linear-gradient(135deg, ${index % 2 === 0 ? '#004D40' : '#00796B'}, ${index % 2 === 0 ? '#00796B' : '#26A69A'})`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'relative'
                                    }}>
                                        <img
                                            src={`https://placehold.co/400x220/E0F2F1/00796B?text=Dự+án+${project}`}
                                            alt={`Dự án ${project}`}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                opacity: 0.8
                                            }}
                                        />
                                        <div style={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            background: 'rgba(255, 255, 255, 0.9)',
                                            padding: '10px 20px',
                                            borderRadius: '25px',
                                            fontWeight: '600',
                                            color: '#004D40'
                                        }}>
                                            Dự án #{project}
                                        </div>
                                    </div>
                                }
                            >
                                <div style={{ padding: '25px 20px' }}>
                                    <Title level={3} style={{
                                        color: '#004D40',
                                        marginBottom: '15px',
                                        fontSize: '1.2rem',
                                        fontWeight: '600'
                                    }}>
                                        Dự án Biển Quảng Cáo #{project}
                                    </Title>
                                    <Paragraph style={{
                                        color: '#666',
                                        lineHeight: '1.6',
                                        marginBottom: '20px',
                                        fontSize: '0.95rem'
                                    }}>
                                        Mô tả chi tiết về dự án với thiết kế sáng tạo và chất lượng cao cấp, đáp ứng mọi yêu cầu của khách hàng.
                                    </Paragraph>
                                    <Button
                                        type="primary"
                                        block
                                        shape="round"
                                        style={{
                                            background: 'linear-gradient(135deg, #004D40, #00796B)',
                                            border: 'none',
                                            height: '45px',
                                            fontWeight: '600',
                                            fontSize: '1rem',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 77, 64, 0.3)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = 'none';
                                        }}
                                    >
                                        Xem Chi Tiết
                                    </Button>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>

            {/* 5. Mẫu chữ với thiết kế hiện đại */}
            <div style={{
                padding: '100px 20px',
                background: 'linear-gradient(135deg, #f8f9fa 0%, #e8f5e8 100%)'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <Title level={2} style={{
                            fontSize: '3rem',
                            fontWeight: '700',
                            color: '#004D40',
                            marginBottom: '20px'
                        }}>
                            <FontSizeOutlined style={{ marginRight: '15px', color: '#00796B' }} />
                            Mẫu Chữ Đẹp
                            <div style={{
                                width: '80px',
                                height: '4px',
                                background: 'linear-gradient(90deg, #004D40, #26A69A)',
                                margin: '20px auto 0',
                                borderRadius: '2px'
                            }}></div>
                        </Title>
                    </div>

                    <Row gutter={[32, 32]}>
                        {[
                            {
                                id: 1,
                                name: 'Mẫu chữ nổi 3D',
                                description: 'Chữ nổi 3D với hiệu ứng ánh sáng và chiều sâu, tạo điểm nhấn mạnh mẽ cho thương hiệu.',
                                image: 'https://placehold.co/300x200/004D40/ffffff?text=Chữ+3D',
                                gradient: 'linear-gradient(135deg, #004D40, #00796B)'
                            },
                            {
                                id: 2,
                                name: 'Mẫu chữ LED',
                                description: 'Chữ LED sáng tạo với hiệu ứng động, thu hút ánh nhìn cả ngày lẫn đêm.',
                                image: 'https://placehold.co/300x200/00796B/ffffff?text=Chữ+LED',
                                gradient: 'linear-gradient(135deg, #00796B, #26A69A)'
                            },
                            {
                                id: 3,
                                name: 'Mẫu chữ inox',
                                description: 'Chữ inox cao cấp với độ bóng cao, sang trọng và bền đẹp theo thời gian.',
                                image: 'https://placehold.co/300x200/26A69A/ffffff?text=Chữ+inox',
                                gradient: 'linear-gradient(135deg, #26A69A, #4DB6AC)'
                            },
                            {
                                id: 4,
                                name: 'Mẫu chữ mica',
                                description: 'Chữ mica trong suốt với hiệu ứng đẹp mắt, hiện đại và tinh tế.',
                                image: 'https://placehold.co/300x200/4DB6AC/ffffff?text=Chữ+mica',
                                gradient: 'linear-gradient(135deg, #4DB6AC, #80CBC4)'
                            }
                        ].map((letter, index) => (
                            <Col xs={24} sm={12} lg={6} key={letter.id}>
                                <Card
                                    className="section-card"
                                    style={{
                                        textAlign: 'center',
                                        borderRadius: '20px',
                                        overflow: 'hidden',
                                        background: '#ffffff',
                                        position: 'relative'
                                    }}
                                    cover={
                                        <div style={{
                                            height: '200px',
                                            background: letter.gradient,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            position: 'relative'
                                        }}>
                                            <img
                                                src={letter.image}
                                                alt={letter.name}
                                                style={{
                                                    width: '80%',
                                                    height: '80%',
                                                    objectFit: 'cover',
                                                    borderRadius: '15px',
                                                    boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
                                                }}
                                            />
                                        </div>
                                    }
                                >
                                    <div style={{ padding: '20px' }}>
                                        <Title level={3} style={{
                                            color: '#004D40',
                                            marginBottom: '15px',
                                            fontSize: '1.1rem',
                                            fontWeight: '600'
                                        }}>
                                            {letter.name}
                                        </Title>
                                        <Paragraph style={{
                                            color: '#666',
                                            lineHeight: '1.6',
                                            fontSize: '0.9rem',
                                            marginBottom: '20px'
                                        }}>
                                            {letter.description}
                                        </Paragraph>
                                        <Button
                                            type="primary"
                                            shape="round"
                                            style={{
                                                background: 'linear-gradient(135deg, #004D40, #00796B)',
                                                border: 'none',
                                                fontWeight: '600',
                                                transition: 'all 0.3s ease'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = 'translateY(-2px)';
                                                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 77, 64, 0.3)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = 'translateY(0)';
                                                e.currentTarget.style.boxShadow = 'none';
                                            }}
                                        >
                                            Xem Chi Tiết
                                        </Button>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>

            {/* 6. Các con số với hiệu ứng đếm số và thiết kế hiện đại */}
            <div className="stats-gradient" style={{
                padding: '100px 20px',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    position: 'relative',
                    zIndex: 2
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <Title level={2} style={{
                            fontSize: '3rem',
                            fontWeight: '700',
                            color: '#ffffff',
                            marginBottom: '20px',
                            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                        }}>
                            Thành Tựu Nổi Bật
                            <div style={{
                                width: '80px',
                                height: '4px',
                                background: 'rgba(255, 255, 255, 0.8)',
                                margin: '20px auto 0',
                                borderRadius: '2px'
                            }}></div>
                        </Title>
                    </div>

                    <Row gutter={[40, 40]}>
                        {[
                            {
                                icon: <TeamOutlined />,
                                value: 15,
                                suffix: "+",
                                title: "Năm Kinh Nghiệm",
                                description: "Trên 15 năm kinh nghiệm trong lĩnh vực quảng cáo"
                            },
                            {
                                icon: <TeamOutlined />,
                                value: 50,
                                suffix: "+",
                                title: "Nhân Sự",
                                description: "Đội ngũ nhân viên chuyên nghiệp và tận tâm"
                            },
                            {
                                icon: <CustomerServiceOutlined />,
                                value: 500,
                                suffix: "+",
                                title: "Khách Hàng",
                                description: "Đã phục vụ hơn 500 khách hàng lớn nhỏ"
                            },
                            {
                                icon: <ProjectOutlined />,
                                value: 1000,
                                suffix: "+",
                                title: "Dự Án Hoàn Thành",
                                description: "Hơn 1000 dự án được thực hiện thành công"
                            }
                        ].map((stat, index) => (
                            <Col xs={24} sm={12} lg={6} key={index}>
                                <Card
                                    className="section-card"
                                    style={{
                                        textAlign: 'center',
                                        borderRadius: '20px',
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                        color: 'white',
                                        minHeight: '200px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <div style={{
                                        fontSize: '4rem',
                                        color: '#ffffff',
                                        marginBottom: '20px',
                                        opacity: countersVisible ? 1 : 0,
                                        transform: countersVisible ? 'scale(1)' : 'scale(0.5)',
                                        transition: `all 1s ease-out ${index * 0.2}s`
                                    }}>
                                        {stat.icon}
                                    </div>
                                    <Statistic
                                        value={countersVisible ? stat.value : 0}
                                        suffix={stat.suffix}
                                        valueStyle={{
                                            color: '#ffffff',
                                            fontSize: '2.5rem',
                                            fontWeight: '700',
                                            marginBottom: '10px'
                                        }}
                                    />
                                    <Title level={4} style={{
                                        color: '#ffffff',
                                        marginBottom: '10px',
                                        fontSize: '1.1rem'
                                    }}>
                                        {stat.title}
                                    </Title>
                                    <Paragraph style={{
                                        color: 'rgba(255, 255, 255, 0.8)',
                                        fontSize: '0.9rem',
                                        lineHeight: '1.4',
                                        margin: 0
                                    }}>
                                        {stat.description}
                                    </Paragraph>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>

                {/* Background decoration */}
                <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    right: '0',
                    bottom: '0',
                    background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 50%)',
                    zIndex: 1
                }}></div>
            </div>
        </>
    );
};