import React, { useEffect, useState, useRef } from 'react';
import { Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { fetchAllBannersAPI } from '../../../services/api.service';

const SliderComponent = ({ autoplaySpeed = 4000 }) => {
    const carouselRef = useRef();
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Gọi API để lấy danh sách banner
    useEffect(() => {
        const fetchBanners = async () => {
            try {
                setLoading(true);
                const response = await fetchAllBannersAPI(1, 10); // Gọi API với page=1, size=10
                const formattedBanners = response.data.content.map(banner => ({
                    id: banner.id,
                    src: banner.imageBase64 && !banner.active // Sử dụng active=false để kiểm tra hợp lệ
                        ? `data:image/jpeg;base64,${banner.imageBase64}` // Thêm prefix
                        : `https://placehold.co/1200x514/cccccc/555555?text=Banner+${banner.id}`, // Fallback nếu rỗng
                }));
                setBanners(formattedBanners);
                setLoading(false);
            } catch (err) {
                setError('Không thể tải danh sách banner');
                setLoading(false);
            }
        };

        fetchBanners();
    }, []);

    const outerContainerStyle = {
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0px",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        backgroundColor: "#000",
        position: "relative",
        aspectRatio: "21 / 9",
    };

    const imgStyle = {
        width: "100%",
        height: "100%",
        objectFit: "cover",
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
            <LeftOutlined
                onClick={() => carouselRef.current.prev()}
                style={{ ...arrowStyle, left: "10px" }}
            />
            <RightOutlined
                onClick={() => carouselRef.current.next()}
                style={{ ...arrowStyle, right: "10px" }}
            />
            {loading ? (
                <div style={{ color: "#fff", textAlign: "center", padding: "20px" }}>Đang tải...</div>
            ) : error ? (
                <div style={{ color: "#fff", textAlign: "center", padding: "20px" }}>{error}</div>
            ) : (
                <Carousel
                    autoplay
                    effect="fade"
                    dotPosition="bottom"
                    ref={carouselRef}
                    arrows={false}
                >
                    {banners.map(banner => (
                        <div key={banner.id}>
                            <img
                                src={banner.src}
                                alt={`Banner ${banner.id}`}
                                style={imgStyle}
                            />
                        </div>
                    ))}
                </Carousel>
            )}
        </div>
    );
};

export default SliderComponent;