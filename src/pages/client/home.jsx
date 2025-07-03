import React, { useEffect, useState, useRef } from 'react';
import { Carousel, Row, Col, Button, Typography } from 'antd';
import { ProductList } from '../../components/client/home/product.list';
import { Banner } from '../../components/client/home/banner';
import ProductContact from '../../components/client/product/product.contact';
import PopupOffer from '../../components/PopupOffer';
import FeaturedProjects from '../../components/client/home/FeaturedProjects';

import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

// Hàm tiện ích tạo URL ảnh placeholder
const placeholderImg = (width, height, text, bgColor = 'cccccc', textColor = '555555') =>
    `https://placehold.co/${width}x${height}/${bgColor}/${textColor}?text=${encodeURIComponent(text)}`;

// CSS Keyframes cho hiệu ứng gradient và fade-in
const customStyles = `
  @keyframes animatedGradientBackground {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes zoomIn {
    0% {
      opacity: 0;
      transform: scale(0.5);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
  .zoom-in-section {
    opacity: 0;
    transform: scale(0.8);
  }
  .zoom-in-section.visible {
    opacity: 1;
    animation: zoomIn 1s ease-in-out forwards;
  }
`;

// Custom hook để theo dõi Intersection Observer
const useIntersectionObserver = (options = {}) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true); // Chỉ set visible một lần
                }
            },
            { threshold: 0.1, ...options } // Kích hoạt khi 10% của phần tử hiển thị
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

// Hàm tạo style cho gradient chuyển động
const getAnimatedGradientStyle = (colors) => ({
    background: `linear-gradient(-45deg, ${colors.join(', ')})`,
    backgroundSize: '400% 400%',
    animation: 'animatedGradientBackground 15s ease infinite',
});

// Component 1: Slider
const SliderComponent = () => {
    const carouselRef = useRef();

    const outerContainerStyle = {
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0px",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        backgroundColor: "#000", // Nền chờ ảnh load
        position: "relative", // Cho nút điều hướng đặt được chính xác
        aspectRatio: "21 / 9", // Tỷ lệ vàng
    };

    const imgStyle = {
        width: "100%",
        height: "100%",
        objectFit: "cover", // Hiển thị đầy khung không để trống
        display: "block",
    };

    const arrowStyle = {
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        fontSize: "24px",
        color: "#fff",
        backgroundColor: "rgba(0,0,0,0.4)",
        borderRadius: "50%",
        padding: "10px",
        zIndex: 2,
        cursor: "pointer",
        transition: "0.3s",
    };

    return (
        <div style={outerContainerStyle}>
            {/* Nút trái */}
            <LeftOutlined
                onClick={() => carouselRef.current.prev()}
                style={{ ...arrowStyle, left: "10px" }}
            />

            {/* Nút phải */}
            <RightOutlined
                onClick={() => carouselRef.current.next()}
                style={{ ...arrowStyle, right: "10px" }}
            />

            {/* Carousel */}
            <Carousel
                autoplay
                effect="fade"
                dotPosition="bottom"
                ref={carouselRef}
                arrows={false} // Tắt mặc định để dùng custom nút
            >
                <div><img src="/img/12.jpg" alt="Slide 1" style={imgStyle} /></div>
                <div><img src="/img/2.jpg" alt="Slide 2" style={imgStyle} /></div>
                <div><img src="/img/33.jpg" alt="Slide 3" style={imgStyle} /></div>
                <div><img src="/img/43.jpg" alt="Slide 4" style={imgStyle} /></div>
            </Carousel>
        </div>
    );
};

// Component 4: Về Chúng Tôi (About Us)
const AboutUsComponent = () => {
    const [ref, isVisible] = useIntersectionObserver();
    const aboutSectionColors = ['#004D40', '#00796B', '#26A69A', '#00695C']; // Dark Teals to Medium Teals
    const aboutSectionStyle = {
        ...getAnimatedGradientStyle(aboutSectionColors),
        padding: '70px 20px',
        textAlign: 'center',
        color: '#E0F2F1',
    };
    const contentContainerStyle = {
        maxWidth: '950px',
        margin: '0 auto',
        background: 'rgba(0, 77, 64, 0.5)',
        padding: '50px',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
    };

    const [isContactOpen, setIsContactOpen] = useState(false);
    const [aboutUsRef, aboutUsVisible] = useIntersectionObserver();

    return (
        <>
            <div ref={ref} style={aboutSectionStyle}>
                <div ref={aboutUsRef} className={`zoom-in-section ${aboutUsVisible ? 'visible' : ''}`}>
                    <div style={contentContainerStyle}>
                        <Title level={2} style={{ color: '#FFFFFF', marginBottom: '25px' }}>Chúng Tôi Là Ai?</Title>
                        <Row gutter={[40, 30]} align="middle" justify="center">
                            <Col xs={24} md={10}>
                                <img
                                    src={placeholderImg(380, 380, 'Đội Ngũ Chuyên Gia', '009688', 'FFFFFF')}
                                    alt="Hình ảnh về chúng tôi"
                                    style={{
                                        width: '100%',
                                        maxWidth: '380px',
                                        borderRadius: '15px',
                                        border: '6px solid #4DB6AC',
                                        boxShadow: '0 0 25px rgba(77,182,172,0.6)',
                                    }}
                                />
                            </Col>
                            <Col xs={24} md={14} style={{ textAlign: 'left' }}>
                                <Text style={{ fontSize: '18px', lineHeight: '1.9', color: '#B2DFDB' }}>
                                    Chào mừng đến với <strong style={{ color: '#FFFFFF' }}>Website của chúng tôi</strong>! Chúng tôi tự hào là đơn vị tiên phong trong lĩnh vực thiết kế và thi công biển quảng cáo, biển hiệu chất lượng cao.
                                </Text>
                                <br /><br />
                                <Paragraph style={{ fontSize: '18px', lineHeight: '1.9', color: '#B2DFDB' }}>
                                    Với sự sáng tạo không ngừng và cam kết về chất lượng, chúng tôi mang đến những giải pháp tối ưu, giúp thương hiệu của bạn tỏa sáng và thu hút mọi ánh nhìn.
                                </Paragraph>
                                <Button
                                    onClick={() => setIsContactOpen(true)}
                                    type="primary"
                                    size="large"
                                    style={{
                                        backgroundColor: '#FF8C00',
                                        borderColor: '#FF8C00',
                                        marginTop: '30px',
                                        fontWeight: 'bold',
                                        color: '#FFFFFF',
                                        padding: '0 30px',
                                        boxShadow: '0 5px 10px rgba(0,0,0,0.25)',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#FFA000';
                                        e.currentTarget.style.borderColor = '#FFA000';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = '#FF8C00';
                                        e.currentTarget.style.borderColor = '#FF8C00';
                                    }}
                                >
                                    Tìm Hiểu Thêm
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
            <ProductContact isContactOpen={isContactOpen} setIsContactOpen={setIsContactOpen} />
        </>
    );
};

// Component Trang Chủ chính
// Trong component HomePage
export const HomePage = () => {
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    // Thêm keyframes và Ant Design CSS vào style của trang
    useEffect(() => {
        // Inject custom styles
        const styleSheet = document.createElement("style");
        styleSheet.id = "home-page-styles";
        styleSheet.innerText = customStyles;
        document.head.appendChild(styleSheet);

        // Inject Ant Design reset CSS
        const antdResetCss = document.createElement("link");
        antdResetCss.id = "antd-reset-css";
        antdResetCss.rel = "stylesheet";
        antdResetCss.href = "https://unpkg.com/antd/dist/reset.css";
        document.head.appendChild(antdResetCss);

        // Logic Popup - Thay đổi ở đây
        let popupTimer;
        const popupData = localStorage.getItem('popupData');
        const now = new Date().getTime();
        const tenMinutesInMs = 10 * 60 * 1000; // 10 phút = 600,000ms

        if (!popupData || now - JSON.parse(popupData).lastSeen > tenMinutesInMs) {
            popupTimer = setTimeout(() => {
                setShowPopup(true);
                localStorage.setItem('popupData', JSON.stringify({
                    lastSeen: now
                }));
            }, 3000); // Hiện sau 3 giây (có thể chỉnh thành 0 nếu muốn hiện ngay)
        }

        // Cleanup
        return () => {
            if (popupTimer) clearTimeout(popupTimer);
            const existingStyleSheet = document.getElementById("home-page-styles");
            if (existingStyleSheet) document.head.removeChild(existingStyleSheet);
            const existingAntdCss = document.getElementById("antd-reset-css");
            if (existingAntdCss) document.head.removeChild(existingAntdCss);
        };
    }, []);

    // Intersection Observer cho Banner và ProductList
    const [bannerRef, bannerVisible] = useIntersectionObserver();
    const [productListRef, productListVisible] = useIntersectionObserver();

    return (
        <>
            {showPopup && <PopupOffer setIsContactOpen={setIsContactOpen} />}
            <div style={{
                textAlign: 'center',
                margin: '60px 0',
                padding: '40px 20px',
                borderRadius: '12px',
                fontFamily: '"Segoe UI", "Roboto", "Helvetica Neue", sans-serif',
                border: 'none'
            }}>
                <h1 style={{
                    fontSize: '2.8rem',
                    fontWeight: '700',
                    marginBottom: '30px',
                    color: '#ff0400', // Màu đỏ đậm theo yêu cầu
                    fontFamily: '"Montserrat", sans-serif',
                    letterSpacing: '-0.5px',
                    lineHeight: '1.2',
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>AI2.VN - Giải pháp bảng hiệu thông minh thời đại mới</h1>

                <Button
                    type="primary"
                    size="large"
                    onClick={() => window.open('https://www.canva.com/', '_blank')} // Thêm link Canva
                    style={{
                        background: 'linear-gradient(135deg, #ff0400, #d90000)', // Màu đỏ phù hợp
                        border: 'none',
                        fontWeight: '600',
                        padding: '0 45px',
                        height: '56px',
                        fontSize: '1.2rem',
                        borderRadius: '30px',
                        boxShadow: '0 4px 15px rgba(255, 4, 0, 0.4)',
                        transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
                        position: 'relative',
                        overflow: 'hidden',
                        fontFamily: '"Montserrat", sans-serif',
                        letterSpacing: '0.5px',
                        color: '#ffffff' // Màu chữ trắng
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-3px)';
                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 4, 0, 0.5)';
                        e.currentTarget.style.background = 'linear-gradient(135deg, #d90000, #ff0400)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 4, 0, 0.4)';
                        e.currentTarget.style.background = 'linear-gradient(135deg, #ff0400, #d90000)';
                    }}
                >
                    <span style={{
                        position: 'relative',
                        zIndex: '2',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 4V20M20 12H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        Thiết kế ngay
                    </span>
                    <span style={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(135deg, #d90000, #ff0400)',
                        opacity: '0',
                        transition: 'opacity 0.4s ease',
                        zIndex: '1'
                    }}></span>
                </Button>
            </div>

            <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&display=swap');
`}</style>
            <SliderComponent
                slides={[
                    { src: '/img/12.jpg', alt: 'Slide 1' },
                    { src: '/img/2.jpg', alt: 'Slide 2' },
                    { src: '/img/33.jpg', alt: 'Slide 3' },
                    { src: '/img/43.jpg', alt: 'Slide 4' },
                ]}
                autoplaySpeed={4000}
            />
            <div ref={bannerRef} className={`zoom-in-section ${bannerVisible ? 'visible' : ''}`}>
                <FeaturedProjects />
            </div>
            <div ref={productListRef} className={`zoom-in-section ${productListVisible ? 'visible' : ''}`}>
                <ProductList />
            </div>
            <ProductContact isContactOpen={isContactOpen} setIsContactOpen={setIsContactOpen} />
        </>
    );
};