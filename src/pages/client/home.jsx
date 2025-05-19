import React, { useEffect, useState, useRef } from 'react';
import { Carousel, Row, Col, Button, Typography } from 'antd';
import { ProductList } from '../../components/client/home/product.list';
import { Banner } from '../../components/client/home/banner';
import { Link } from 'react-router-dom';
import ProductContact from '../../components/client/product/product.contact';

const { Title, Text } = Typography;

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
    const [ref, isVisible] = useIntersectionObserver();
    const sliderColors = ['#00796B', '#00BCD4', '#4DB6AC', '#B2DFDB']; // Teal, Cyan, Lighter Teals
    const sliderStyle = {
        ...getAnimatedGradientStyle(sliderColors),
        padding: '0',
    };
    const imgStyle = {
        width: '100%',
        height: 'auto',
        objectFit: 'cover',
    };

    return (
        <div ref={ref} style={sliderStyle}>
            <Carousel autoplay dotPosition="bottom" effect="fade">
                <div>
                    <img src={"/img/1.png"} alt="Ảnh trượt 1" style={imgStyle} />
                </div>
                <div>
                    <img src={"/img/2.png"} alt="Ảnh trượt 2" style={imgStyle} />
                </div>
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
                                <Text style={{ fontSize: '18px', lineHeight: '1.9', color: '#B2DFDB' }}>
                                    Với sự sáng tạo không ngừng và cam kết về chất lượng, chúng tôi mang đến những giải pháp tối ưu, giúp thương hiệu của bạn tỏa sáng và thu hút mọi ánh nhìn.
                                </Text>
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
export const HomePage = () => {
    // Thêm keyframes và Ant Design CSS vào style của trang
    useEffect(() => {
        // Inject custom styles (gradient and fade-in keyframes)
        const styleSheet = document.createElement("style");
        styleSheet.id = "home-page-styles";
        styleSheet.innerText = customStyles;
        document.head.appendChild(styleSheet);

        // Inject Ant Design reset CSS from CDN
        const antdResetCss = document.createElement("link");
        antdResetCss.id = "antd-reset-css";
        antdResetCss.rel = "stylesheet";
        antdResetCss.href = "https://unpkg.com/antd/dist/reset.css";
        document.head.appendChild(antdResetCss);

        return () => {
            // Cleanup khi component unmount
            const existingStyleSheet = document.getElementById("home-page-styles");
            if (existingStyleSheet) {
                document.head.removeChild(existingStyleSheet);
            }
            const existingAntdCss = document.getElementById("antd-reset-css");
            if (existingAntdCss) {
                document.head.removeChild(existingAntdCss);
            }
        };
    }, []);

    // Intersection Observer cho Banner và ProductList
    const [bannerRef, bannerVisible] = useIntersectionObserver();
    const [productListRef, productListVisible] = useIntersectionObserver();

    return (
        <>
            <SliderComponent />
            <div ref={bannerRef} className={`zoom-in-section ${bannerVisible ? 'visible' : ''}`}>
                <Banner />
            </div>
            <div ref={productListRef} className={`zoom-in-section ${productListVisible ? 'visible' : ''}`}>
                <ProductList />
            </div>

            <AboutUsComponent />

        </>
    );
};