import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Button, Statistic, Carousel } from 'antd';
import {
    TeamOutlined, CustomerServiceOutlined, ProjectOutlined, LeftOutlined, RightOutlined
} from '@ant-design/icons';
import FontCarousel from '../../components/client/home/FontCarousel';
import ProjectCarousel from '../../components/client/home/ProjectCarousel';
import SEO from '../../components/common/SEO';
const { Title, Paragraph } = Typography;

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
            background: "url('/img/banner/Banner 1.jpg')",
            overlay: "transparent"
        },
        {
            title: "Biển Hiệu LED Hiện Đại",
            subtitle: "Công nghệ tiên tiến, tiết kiệm năng lượng",
            buttonText: "Xem sản phẩm",
            background: "url('/img/banner/banner2.jpg')",
            overlay: "transparent"
        },
        {
            title: "Thiết Kế Chuyên Nghiệp",
            subtitle: "Đội ngũ kinh nghiệm hơn 10 năm",
            buttonText: "Liên hệ ngay",
            background: "url('/img/banner/Banner 3.jpg')",
            overlay: "transparent"
        }
    ];

    return (
        <>
            <SEO
                title="Trang chủ - Sign Board"
                description="Sign Board - Công ty chuyên sản xuất và thi công biển quảng cáo, bảng hiệu chất lượng cao tại Việt Nam."
                keywords="biển quảng cáo, bảng hiệu, sign board, biển hộp đèn, biển led, thi công quảng cáo, Quảng Cáo Nhân Việt"
                url={window.location.href}
            />
            <style jsx global>{`
                .hero-slide {
                    position: relative !important;
                    width: 100%;
                    height: 100%;
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                    background-color: #000;
                    z-index: 1;
                    background-image: var(--bg-image);
                }

                .hero-content {
                    position: relative;
                    z-index: 2;
                }

                .fade-in {
                    animation: fadeInUp 1s ease-out;
                }

                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .slide-in-left {
                    animation: slideInLeft 0.8s ease-out;
                }

                @keyframes slideInLeft {
                    from { opacity: 0; transform: translateX(-50px); }
                    to { opacity: 1; transform: translateX(0); }
                }

                .slide-in-right {
                    animation: slideInRight 0.8s ease-out;
                }

                @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(50px); }
                    to { opacity: 1; transform: translateX(0); }
                }

                .scale-in {
                    animation: scaleIn 0.8s ease-out;
                }

                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.8); }
                    to { opacity: 1; transform: scale(1); }
                }

                .partners-scroll {
                    display: flex;
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
                    border-radius: 50%;
                }

                .hero-container {
                    position: relative;
                    height: 90vh;
                    overflow: hidden;
                }

                @media (max-width: 1024px) {
                    .hero-container {
                        height: 70vh;
                        min-height: 400px;
                    }
                    .hero-slide {
                        background-size: cover !important;
                        height: 70vh;
                        min-height: 400px;
                    }
                    .hero-content {
                        padding: 0 15px;
                    }
                    .hero-content h1 {
                        font-size: 2.5rem !important;
                    }
                    .hero-content p {
                        font-size: 1.2rem !important;
                        max-width: 90%;
                    }
                    .hero-content button {
                        height: 45px !important;
                        font-size: 1rem !important;
                        padding: 0 30px !important;
                    }
                }

                @media (max-width: 768px) {
                    .hero-container {
                        height: 60vh;
                        min-height: 350px;
                    }
                    .hero-slide {
                        background-size: cover !important;
                        height: 60vh;
                        min-height: 350px;
                    }
                    .hero-content h1 {
                        font-size: 2rem !important;
                    }
                    .hero-content p {
                        font-size: 1rem !important;
                    }
                    .hero-content button {
                        height: 40px !important;
                        font-size: 0.9rem !important;
                    }
                }

                @media (max-width: 480px) {
                    .hero-container {
                        height: 50vh;
                        min-height: 300px;
                    }
                    .hero-slide {
                        background-size: cover !important;
                        height: 50vh;
                        min-height: 300px;
                    }
                    .hero-content h1 {
                        font-size: 1.5rem !important;
                    }
                    .hero-content p {
                        font-size: 0.9rem !important;
                        margin-bottom: 20px !important;
                    }
                    .hero-content button {
                        height: 35px !important;
                        font-size: 0.85rem !important;
                        padding: 0 20px !important;
                    }
                }

                @media (max-width: 400px) {
                    .hero-content h1 {
                        font-size: 1.3rem !important;
                    }
                    .hero-content p {
                        font-size: 0.8rem !important;
                    }
                }
            `}</style>

            <div className="hero-container">
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
                                    '--bg-image': slide.background,
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
                                    <Title level={1} className="fade-in" style={{
                                        fontSize: '4rem',
                                        fontWeight: '800',
                                        color: 'white',
                                        marginBottom: '20px',
                                        textShadow: '0 4px 8px rgba(0,0,0,0.5)'
                                    }}>
                                        {slide.title}
                                    </Title>
                                    <Paragraph className="fade-in" style={{
                                        fontSize: '1.5rem',
                                        color: 'rgba(255, 255, 255, 0.9)',
                                        marginBottom: '40px',
                                        maxWidth: '800px',
                                        margin: '0 auto 40px'
                                    }}>
                                        {slide.subtitle}
                                    </Paragraph>
                                    <Button
                                        type="primary"
                                        size="large"
                                        shape="round"
                                        className="fade-in"
                                        style={{
                                            background: 'linear-gradient(135deg, #004D40, #00796B)',
                                            border: 'none',
                                            height: '55px',
                                            fontSize: '1.2rem',
                                            fontWeight: '600',
                                            padding: '0 40px',
                                            transition: 'all 0.3s ease',
                                            boxShadow: '0 4px 15px rgba(0, 77, 64, 0.3)'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 77, 64, 0.4)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 77, 64, 0.3)';
                                        }}
                                    >
                                        {slide.buttonText}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>

            {/* Services Section */}
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '80px 20px',
                background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <Title level={2} style={{
                        fontSize: '2.5rem',
                        fontWeight: '700',
                        color: '#004D40',
                        marginBottom: '20px'
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
                        fontSize: '1.1rem',
                        color: '#666',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        Chúng tôi cung cấp đa dạng các loại biển quảng cáo chất lượng cao, đáp ứng mọi nhu cầu của khách hàng
                    </Paragraph>
                </div>

                <Row gutter={[24, 24]}>
                    {[
                        {
                            title: 'Biển Quảng Cáo LED',
                            description: 'Các mẫu biển quảng cáo LED hiện đại, tiết kiệm năng lượng và thu hút ánh nhìn.',
                            image: 'https://placehold.co/600x400/004D40/ffffff?text=Biển+LED',
                            gradient: 'linear-gradient(135deg, #004D40, #00796B)'
                        },
                        {
                            title: 'Biển Hiệu Cửa Hàng',
                            description: 'Thiết kế biển hiệu chuyên nghiệp cho cửa hàng, nhà hàng và showroom.',
                            image: 'https://placehold.co/600x400/00796B/ffffff?text=Biển+hiệu',
                            gradient: 'linear-gradient(135deg, #00796B, #26A69A)'
                        },
                        {
                            title: 'Biển Quảng Cáo Tòa Nhà',
                            description: 'Các giải pháp biển quảng cáo cho tòa nhà văn phòng và chung cư cao cấp.',
                            image: 'https://placehold.co/600x400/26A69A/ffffff?text=Tòa+nhà',
                            gradient: 'linear-gradient(135deg, #26A69A, #4DB6AC)'
                        }
                    ].map((service, index) => (
                        <Col xs={24} sm={12} md={8} key={index}>
                            <Card
                                className={`service-card slide-in-${index % 2 === 0 ? 'left' : 'right'}`}
                                style={{
                                    textAlign: 'center',
                                    borderRadius: '20px',
                                    overflow: 'hidden',
                                    minHeight: '360px',
                                    position: 'relative'
                                }}
                                cover={
                                    <img
                                        alt={service.title}
                                        src={service.image}
                                        style={{
                                            width: '100%',
                                            height: '200px',
                                            objectFit: 'cover'
                                        }}
                                    />
                                }
                            >
                                <Card.Meta
                                    title={
                                        <Title level={3} style={{
                                            color: '#004D40',
                                            marginBottom: '15px',
                                            fontSize: '1.2rem'
                                        }}>
                                            {service.title}
                                        </Title>
                                    }
                                    description={
                                        <Paragraph style={{
                                            color: '#666',
                                            lineHeight: '1.6',
                                            fontSize: '0.95rem'
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

            {/* 4. Dự án tiêu biểu với carousel hiện đại */}
            <ProjectCarousel />

            <FontCarousel />

            {/* Đối tác – khách hàng */}
            <div style={{
                padding: '80px 20px',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    position: 'relative'
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <Title level={2} style={{
                            fontSize: '2.5rem',
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
                            gap: '40px',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            flexWrap: 'nowrap',
                            overflowX: 'auto',
                            scrollBehavior: 'smooth',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                            WebkitOverflowScrolling: 'touch'
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
                                    minWidth: '150px',
                                    opacity: 0.7,
                                    transition: 'all 0.3s ease',
                                    padding: '15px',
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
                                            height: '50px',
                                            width: 'auto',
                                            maxWidth: '120px',
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

            {/* Thành tựu nổi bật */}
            <div className="stats-gradient" style={{
                padding: '80px 20px',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    position: 'relative',
                    zIndex: 2
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <Title level={2} style={{
                            fontSize: '2.5rem',
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

                    <Row gutter={[24, 24]}>
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
                                        minHeight: '180px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <div style={{
                                        fontSize: '3rem',
                                        color: '#ffffff',
                                        marginBottom: '15px',
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
                                            fontSize: '2rem',
                                            fontWeight: '700',
                                            marginBottom: '10px'
                                        }}
                                    />
                                    <Title level={4} style={{
                                        color: '#ffffff',
                                        marginBottom: '10px',
                                        fontSize: '1rem'
                                    }}>
                                        {stat.title}
                                    </Title>
                                    <Paragraph style={{
                                        color: 'rgba(255, 255, 255, 0.8)',
                                        fontSize: '0.85rem',
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