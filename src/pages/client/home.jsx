import React, { useEffect } from 'react';
import { Carousel, Row, Col, Button, Typography } from 'antd';
import { ProductList } from '../../components/client/home/product.list';
import { Banner } from '../../components/client/home/banner';

const { Title, Text } = Typography;

// Hàm tiện ích tạo URL ảnh placeholder
const placeholderImg = (width, height, text, bgColor = 'cccccc', textColor = '555555') =>
    `https://placehold.co/${width}x${height}/${bgColor}/${textColor}?text=${encodeURIComponent(text)}`;

// CSS Keyframes cho hiệu ứng gradient chuyển động
const gradientAnimationKeyframes = `
  @keyframes animatedGradientBackground {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

// Hàm tạo style cho gradient chuyển động
const getAnimatedGradientStyle = (colors) => ({
    background: `linear-gradient(-45deg, ${colors.join(', ')})`,
    backgroundSize: '400% 400%',
    animation: 'animatedGradientBackground 15s ease infinite',
});

// Component 1: Slider
const SliderComponent = () => {
    const sliderColors = ['#00796B', '#00BCD4', '#4DB6AC', '#B2DFDB']; // Teal, Cyan, Lighter Teals
    const sliderStyle = {
        ...getAnimatedGradientStyle(sliderColors),
        padding: '0',
    };
    const imgStyle = {
        width: '100%',
        height: '550px', // Tăng chiều cao một chút
        objectFit: 'cover',
    };

    return (
        <div style={sliderStyle}>
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
    const aboutSectionColors = ['#004D40', '#00796B', '#26A69A', '#00695C']; // Dark Teals to Medium Teals
    const aboutSectionStyle = {
        ...getAnimatedGradientStyle(aboutSectionColors),
        padding: '70px 20px',
        textAlign: 'center',
        color: '#E0F2F1', // Màu chữ sáng trên nền gradient đậm
    };
    const contentContainerStyle = {
        maxWidth: '950px',
        margin: '0 auto',
        background: 'rgba(0, 77, 64, 0.5)', // Nền teal đậm trong suốt
        padding: '50px',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
    };

    return (
        <div style={aboutSectionStyle}>
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
                                borderRadius: '15px', // Bo góc nhẹ thay vì tròn
                                border: '6px solid #4DB6AC',
                                boxShadow: '0 0 25px rgba(77,182,172,0.6)'
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
                            type="primary"
                            size="large"
                            style={{
                                backgroundColor: '#FF8C00', // Cam sáng
                                borderColor: '#FF8C00',
                                marginTop: '30px',
                                fontWeight: 'bold',
                                color: '#FFFFFF', // Chữ trắng
                                padding: '0 30px',
                                boxShadow: '0 5px 10px rgba(0,0,0,0.25)'
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FFA000'; e.currentTarget.style.borderColor = '#FFA000'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FF8C00'; e.currentTarget.style.borderColor = '#FF8C00'; }}
                        >
                            Tìm Hiểu Thêm
                        </Button>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

// Component Trang Chủ chính
export const HomePage = () => {
    // Thêm keyframes và Ant Design CSS vào style của trang
    useEffect(() => {
        // Inject gradient animation keyframes
        const keyframesStyleSheet = document.createElement("style");
        keyframesStyleSheet.id = "gradient-keyframes"; // Thêm ID để tránh trùng lặp nếu component re-render
        if (!document.getElementById(keyframesStyleSheet.id)) {
            keyframesStyleSheet.innerText = gradientAnimationKeyframes;
            document.head.appendChild(keyframesStyleSheet);
        }

        // Inject Ant Design reset CSS from CDN
        const antdResetCss = document.createElement("link");
        antdResetCss.id = "antd-reset-css"; // Thêm ID
        if (!document.getElementById(antdResetCss.id)) {
            antdResetCss.rel = "stylesheet";
            antdResetCss.href = "https://unpkg.com/antd/dist/reset.css"; // Sử dụng CDN cho Ant Design reset styles
            document.head.appendChild(antdResetCss);
        }

        return () => {
            // Cleanup khi component unmount
            const keyframesElement = document.getElementById(keyframesStyleSheet.id);
            if (keyframesElement) {
                document.head.removeChild(keyframesElement);
            }
            const antdCssElement = document.getElementById(antdResetCss.id);
            if (antdCssElement) {
                document.head.removeChild(antdCssElement);
            }
        };
    }, []);

    return (
        <>
            <SliderComponent />
            <Banner />
            <ProductList />
            <AboutUsComponent />
        </>
    );
};