import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Statistic, Carousel } from 'antd';
import {
    TeamOutlined, CustomerServiceOutlined, ProjectOutlined, LeftOutlined, RightOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom'; // THÊM IMPORT NÀY
import FontCarousel from '../../components/client/home/FontCarousel';
import ProjectCarousel from '../../components/client/home/ProjectCarousel';
import SEO from '../../components/common/SEO';
import { fetchArticleCategoryByIdAPI } from '../../services/api.service';

const { Title, Paragraph } = Typography;

export const HomePage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [countersVisible, setCountersVisible] = useState(false);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCountersVisible(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    // Fetch article categories from API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const response = await fetchArticleCategoryByIdAPI(2);
                if (response && response.data && response.data.children) {
                    const formattedCategories = response.data.children.map((cat, index) => {
                        const gradients = [
                            'linear-gradient(135deg, #004D40, #00796B)',
                            'linear-gradient(135deg, #00796B, #26A69A)',
                            'linear-gradient(135deg, #26A69A, #4DB6AC)',
                            'linear-gradient(135deg, #004D40, #26A69A)',
                            'linear-gradient(135deg, #00695C, #4DB6AC)',
                            'linear-gradient(135deg, #004D40, #4DB6AC)'
                        ];
                        return {
                            id: cat.id, // GIỮ LẠI ID
                            title: cat.name,
                            description: cat.description || 'Mô tả đang được cập nhật',
                            image: cat.image64 || `https://placehold.co/600x400/004D40/ffffff?text=${encodeURIComponent(cat.name)}`,
                            gradient: gradients[index % gradients.length],
                            slug: cat.slug
                        };
                    });
                    setCategories(formattedCategories);
                }
            } catch (error) {
                console.error('Lỗi khi tải danh mục:', error);
                // Fallback data
                setCategories([
                    {
                        id: 1,
                        title: 'Biển Quảng Cáo LED',
                        description: 'Các mẫu biển quảng cáo LED hiện đại, tiết kiệm năng lượng và thu hút ánh nhìn.',
                        image: 'https://placehold.co/600x400/004D40/ffffff?text=Biển+LED',
                        gradient: 'linear-gradient(135deg, #004D40, #00796B)',
                        slug: 'bien-quang-cao-led'
                    },
                    {
                        id: 2,
                        title: 'Biển Hiệu Cửa Hàng',
                        description: 'Thiết kế biển hiệu chuyên nghiệp cho cửa hàng, nhà hàng và showroom.',
                        image: 'https://placehold.co/600x400/00796B/ffffff?text=Biển+hiệu',
                        gradient: 'linear-gradient(135deg, #00796B, #26A69A)',
                        slug: 'bien-hieu-cua-hang'
                    },
                    {
                        id: 3,
                        title: 'Biển Quảng Cáo Tòa Nhà',
                        description: 'Các giải pháp biển quảng cáo cho tòa nhà văn phòng và chung cư cao cấp.',
                        image: 'https://placehold.co/600x400/26A69A/ffffff?text=600x400',
                        gradient: 'linear-gradient(135deg, #26A69A, #4DB6AC)',
                        slug: 'bien-quang-cao-toa-nha'
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const slides = [
        {
            background: "url('img/banner/Banner 1.jpg')",
            title: "Biển Quảng Cáo Chuyên Nghiệp",
            description: "Thiết kế và thi công biển quảng cáo LED, hộp đèn, mặt dựng alu cao cấp với chất lượng vượt trội"
        },
        {
            background: "url('img/banner/banner2.jpg')",
            title: "Giải Pháp Quảng Cáo Toàn Diện",
            description: "Đồng hành cùng doanh nghiệp trong việc xây dựng thương hiệu với các giải pháp quảng cáo sáng tạo và hiệu quả"
        },
        {
            background: "url('img/banner/Banner 3.jpg')",
            title: "Công Nghệ LED Hiện Đại",
            description: "Ứng dụng công nghệ LED tiên tiến, tiết kiệm năng lượng và mang lại hiệu quả quảng cáo tối ưu"
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
                /* === TOÀN BỘ CSS GIỮ NGUYÊN NHƯ CŨ === */
                .slick-slider { overflow: visible !important; }
                .slick-initialized .slick-slide { display: block !important; }
                .hero-slide {
                    width: 100%; min-height: 700px; background-size: cover;
                    background-position: center; background-repeat: no-repeat;
                    background-color: #f0f0f0; display: flex; align-items: center;
                    justify-content: center; position: relative; padding: 2rem;
                    color: #ffffff; text-align: center;
                }
                .hero-slide-content { position: relative; max-width: 90%; z-index: 2; }
                .hero-slide-title { font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; text-shadow: 0 2px 4px rgba(0,0,0,0.5); }
                .hero-slide-description { font-size: 1.2rem; max-width: 600px; margin: 0 auto; }
                .custom-dots .ant-carousel-dot { background: rgba(255,255,255,0.5); width: 12px; height: 12px; border-radius: 50%; }

                .section-container { padding: 30px 20px; }
                .section-title { font-size: 2.2rem !important; }
                .section-subtitle { font-size: 1.1rem !important; }
                .service-card-title { font-size: 1.2rem !important; }
                .service-card-description { font-size: 0.95rem !important; }
                .stat-value .ant-statistic-content { font-size: 2rem !important; }
                .stat-title { font-size: 1rem !important; }
                .stat-description { font-size: 0.85rem !important; }

                @media (max-width: 1024px) {
                    .carousel-container { padding: 0 15px !important; margin: 0 auto !important; max-width: 1024px; }
                    .hero-slide { min-height: 600px; }
                    .hero-slide-title { font-size: 2rem; }
                    .hero-slide-description { font-size: 1.1rem; }
                    .partners-scroll { gap: 30px !important; }
                    .partners-scroll > div { min-width: 120px !important; height: 70px !important; }
                    .partners-scroll img { height: 40px !important; max-width: 100px !important; }
                }

                @media (max-width: 768px) {
                    .hero-slide { min-height: 200px; background-color: #ffffff; }
                    .hero-slide-title { font-size: 1.6rem; }
                    .hero-slide-description { font-size: 1rem; }
                    .section-container { padding: 20px 10px !important; }
                    .section-title { font-size: 1.8rem !important; }
                    .section-subtitle { font-size: 1rem !important; }
                    .service-card-title { font-size: 1.1rem !important; }
                    .service-card-description { font-size: 0.9rem !important; }
                    .stat-value .ant-statistic-content { font-size: 1.8rem !important; }
                    .stat-title { font-size: 0.95rem !important; }
                    .partners-scroll { gap: 20px !important; padding: 0 10px !important; }
                    .partners-scroll > div { min-width: 100px !important; height: 60px !important; padding: 10px !important; }
                    .partners-scroll img { height: 35px !important; max-width: 80px !important; }
                }

                @media (max-width: 480px) {
                    .hero-slide { min-height: 150px; padding: 1rem; }
                    .hero-slide-title { font-size: 1.3rem; }
                    .hero-slide-description { font-size: 0.9rem; }
                    .section-container { padding: 20px 5px !important; }
                    .section-title { font-size: 1.6rem !important; }
                    .section-subtitle { font-size: 0.95rem !important; }
                    .service-card-title { font-size: 1.05rem !important; }
                    .service-card-description { font-size: 0.85rem !important; }
                    .stat-value .ant-statistic-content { font-size: 1.6rem !important; }
                    .stat-title { font-size: 0.9rem !important; }
                    .stat-description { font-size: 0.75rem !important; }
                    .partners-scroll { gap: 15px !important; padding: 0 5px !important; }
                    .partners-scroll > div { min-width: 80px !important; height: 50px !important; padding: 8px !important; }
                    .partners-scroll img { height: 30px !important; max-width: 65px !important; }
                }

                .partners-scroll { display: flex; animation: scroll 30s linear infinite; }
                @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                .counter-animate { transition: all 2s ease-out; }
                .section-card { transition: all 0.3s ease; border: none; box-shadow: 0 4px 20px rgba(0,77,64,0.1); }
                .section-card:hover { transform: translateY(-5px); box-shadow: 0 8px 30px rgba(0,77,64,0.2); }
                .service-card { background: linear-gradient(145deg, #ffffff, #f8f9fa); border: 2px solid transparent; transition: all 0.3s ease; }
                .service-card:hover { border-color: #004D40; transform: translateY(-3px); }
                .stats-gradient { background: linear-gradient(135deg, #004D40 0%, #00796B 50%, #26A69A 100%); }
            `}</style>

            {/* === BANNER CAROUSEL === */}
            <div className="carousel-container">
                <Carousel
                    autoplay
                    autoplaySpeed={5000}
                    dots={{ className: 'custom-dots' }}
                    arrows
                    prevArrow={<LeftOutlined style={{ fontSize: '24px', color: 'white' }} />}
                    nextArrow={<RightOutlined style={{ fontSize: '24px', color: 'white' }} />}
                    afterChange={(current) => setCurrentSlide(current)}
                    effect="fade"
                    style={{ width: '100%', overflow: 'hidden', position: 'relative', marginBottom: '0.5rem' }}
                >
                    {slides.map((slide, index) => (
                        <div key={index} style={{ width: '100%' }}>
                            <div className="hero-slide" style={{ backgroundImage: slide.background }} />
                        </div>
                    ))}
                </Carousel>
            </div>

            {/* === SERVICES SECTION - CÓ LINK === */}
            <div className="section-container" style={{ maxWidth: '1200px', margin: '0 auto', background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)' }}>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <Title level={2} className="section-title" style={{ fontWeight: '700', color: '#004D40', marginBottom: '15px' }}>
                        Các Lĩnh Vực Biển Quảng Cáo
                        <div style={{ width: '80px', height: '4px', background: 'linear-gradient(90deg, #004D40, #26A69A)', margin: '15px auto 0', borderRadius: '2px' }}></div>
                    </Title>
                    <Paragraph className="section-subtitle" style={{ color: '#666', maxWidth: '600px', margin: '0 auto' }}>
                        Chúng tôi cung cấp đa dạng các loại biển quảng cáo chất lượng cao, đáp ứng mọi nhu cầu của khách hàng
                    </Paragraph>
                </div>

                {loading ? (
                    <Row gutter={[24, 24]} justify="center">
                        {[1, 2, 3].map((item) => (
                            <Col key={item} xs={24} sm={12} md={8}>
                                <Card loading={true} className="service-card" style={{ height: '100%', minHeight: '360px' }} />
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <Row gutter={[24, 24]}>
                        {categories.map((service, index) => (
                            <Col xs={24} sm={12} md={8} key={service.id || index}>
                                <Link
                                    to={`/${service.slug}?id=${service.id}`}
                                    style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                                >
                                    <Card
                                        hoverable
                                        className={`service-card slide-in-${index % 2 === 0 ? 'left' : 'right'}`}
                                        style={{
                                            textAlign: 'center',
                                            borderRadius: '20px',
                                            overflow: 'hidden',
                                            minHeight: '360px',
                                            position: 'relative',
                                            height: '100%'
                                        }}
                                        cover={
                                            <img
                                                alt={service.title}
                                                src={service.image}
                                                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                            />
                                        }
                                    >
                                        <Card.Meta
                                            title={
                                                <Title level={3} className="service-card-title" style={{ color: '#004D40', marginBottom: '15px' }}>
                                                    {service.title}
                                                </Title>
                                            }
                                            description={
                                                <Paragraph className="service-card-description" style={{ color: '#666', lineHeight: '1.6' }}>
                                                    {service.description}
                                                </Paragraph>
                                            }
                                        />
                                    </Card>
                                </Link>
                            </Col>
                        ))}
                    </Row>
                )}
            </div>

            {/* === PROJECT CAROUSEL === */}
            <div className="section-container" style={{ maxWidth: '1200px', margin: '0 auto', background: 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)' }}>
                <ProjectCarousel />
            </div>

            {/* === FONT CAROUSEL === */}
            <div className="section-container" style={{ maxWidth: '1200px', margin: '0 auto', background: 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)' }}>
                <FontCarousel />
            </div>

            {/* === PARTNERS === */}
            <div className="section-container" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <Title level={2} className="section-title" style={{ fontWeight: '700', color: '#004D40', marginBottom: '15px' }}>
                            Đối Tác & Khách Hàng
                            <div style={{ width: '80px', height: '4px', background: 'linear-gradient(90deg, #004D40, #26A69A)', margin: '15px auto 0', borderRadius: '2px' }}></div>
                        </Title>
                    </div>

                    <div style={{ overflow: 'hidden', position: 'relative', background: 'rgba(255,255,255,0.8)', borderRadius: '20px', padding: '40px 0', backdropFilter: 'blur(10px)' }}>
                        <div className="partners-scroll" style={{ display: 'flex', gap: '40px', alignItems: 'center', justifyContent: 'flex-start', flexWrap: 'nowrap', overflowX: 'visible', width: 'max-content' }}>
                            {[
                                ...[
                                    { name: 'Samsung', logo: 'img/contact/samsung.png', url: 'https://www.samsung.com' },
                                    { name: 'LG', logo: 'img/contact/lg.png', url: 'https://www.lg.com' },
                                    { name: 'Sony', logo: 'img/contact/sony.png', url: 'https://www.sony.com' },
                                    { name: 'Apple', logo: 'img/contact/apple.png', url: 'https://www.apple.com' },
                                    { name: 'Google', logo: 'img/contact/google.png', url: 'https://www.google.com' },
                                    { name: 'Microsoft', logo: 'img/contact/microsoft.png', url: 'https://www.microsoft.com' }
                                ],
                                ...[
                                    { name: 'Samsung', logo: 'img/contact/samsung.png', url: 'https://www.samsung.com' },
                                    { name: 'LG', logo: 'img/contact/lg.png', url: 'https://www.lg.com' },
                                    { name: 'Sony', logo: 'img/contact/sony.png', url: 'https://www.sony.com' },
                                    { name: 'Apple', logo: 'img/contact/apple.png', url: 'https://www.apple.com' },
                                    { name: 'Google', logo: 'img/contact/google.png', url: 'https://www.google.com' },
                                    { name: 'Microsoft', logo: 'img/contact/microsoft.png', url: 'https://www.microsoft.com' }
                                ]
                            ].map((partner, index) => (
                                <div
                                    key={`${partner.name}-${index}`}
                                    style={{
                                        flex: '0 0 auto', minWidth: '150px', height: '80px', opacity: 0.7,
                                        transition: 'all 0.3s ease', padding: '15px', borderRadius: '15px',
                                        backgroundColor: 'rgba(255,255,255,0.9)', boxShadow: '0 4px 15px rgba(0,77,64,0.1)',
                                        transform: 'scale(0.9)', willChange: 'transform', border: '2px solid transparent'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.opacity = '1';
                                        e.currentTarget.style.transform = 'scale(1.1)';
                                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,77,64,0.2)';
                                        e.currentTarget.style.borderColor = '#26A69A';
                                        e.currentTarget.parentElement.style.animationPlayState = 'paused';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.opacity = '0.7';
                                        e.currentTarget.style.transform = 'scale(0.9)';
                                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,77,64,0.1)';
                                        e.currentTarget.style.borderColor = 'transparent';
                                        e.currentTarget.parentElement.style.animationPlayState = 'running';
                                    }}
                                >
                                    <a href={partner.url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', textDecoration: 'none' }}>
                                        <img src={partner.logo} alt={partner.name} style={{ height: '50px', width: 'auto', maxWidth: '120px', transition: 'filter 0.3s ease' }} />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* === STATS === */}
            <div className="stats-gradient section-container" style={{ position: 'relative', overflow: 'hidden' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <Title level={2} className="section-title" style={{ fontWeight: '700', color: '#ffffff', marginBottom: '15px', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                            Thành Tựu Nổi Bật
                            <div style={{ width: '80px', height: '4px', background: 'rgba(255,255,255,0.8)', margin: '15px auto 0', borderRadius: '2px' }}></div>
                        </Title>
                    </div>

                    <Row gutter={[24, 24]}>
                        {[
                            { icon: <TeamOutlined />, value: 10, suffix: "+", title: "Năm Kinh Nghiệm", description: "Trên 15 năm kinh nghiệm trong lĩnh vực quảng cáo" },
                            { icon: <TeamOutlined />, value: 50, suffix: "+", title: "Nhân Sự", description: "Đội ngũ nhân viên chuyên nghiệp và tận tâm" },
                            { icon: <CustomerServiceOutlined />, value: 500, suffix: "+", title: "Khách Hàng", description: "Đã phục vụ hơn 500 khách hàng lớn nhỏ" },
                            { icon: <ProjectOutlined />, value: 1000, suffix: "+", title: "Dự Án Hoàn Thành", description: "Hơn 1000 dự án được thực hiện thành công" }
                        ].map((stat, index) => (
                            <Col xs={24} sm={12} lg={6} key={index}>
                                <Card className="section-card" style={{
                                    textAlign: 'center', borderRadius: '20px', background: 'rgba(255,255,255,0.1)',
                                    backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', color: 'white',
                                    minHeight: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'center'
                                }}>
                                    <div style={{
                                        fontSize: '3rem', color: '#ffffff', marginBottom: '15px',
                                        opacity: countersVisible ? 1 : 0, transform: countersVisible ? 'scale(1)' : 'scale(0.5)',
                                        transition: `all 1s ease-out ${index * 0.2}s`
                                    }}>
                                        {stat.icon}
                                    </div>
                                    <Statistic className="stat-value" value={countersVisible ? stat.value : 0} suffix={stat.suffix}
                                        valueStyle={{ color: '#ffffff', fontWeight: '700', marginBottom: '10px' }} />
                                    <Title level={4} className="stat-title" style={{ color: '#fffhomfff', marginBottom: '10px' }}>
                                        {stat.title}
                                    </Title>
                                    <Paragraph className="stat-description" style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.4', margin: 0 }}>
                                        {stat.description}
                                    </Paragraph>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'radial-gradient(circle at 20% 80%, rgba(120,119,198,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15) 0%, transparent 50%)',
                    zIndex: 1
                }}></div>
            </div>
        </>
    );
};