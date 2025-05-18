import React, { useEffect } from 'react';
import { Row, Col } from 'antd'; // Removed Card and Typography from antd imports

// CSS cho hiệu ứng card (áp dụng cho container ảnh)
const customBannerStyles = `
  .card-image-container,
  .large-card-image-container {
    border-radius: 12px;
    box-shadow: 0 6px 12px rgba(0,0,0,0.15);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    overflow: hidden; 
    position: relative; 
    width: 100%; /* Đảm bảo container chiếm toàn bộ Col */
    background-color: #f0f0f0; /* Màu nền mặc định phòng khi ảnh lỗi */
  }

  .card-image-container:hover,
  .large-card-image-container:hover {
    transform: translateY(-10px); /* Hiệu ứng nhô lên */
    box-shadow: 0 10px 20px rgba(0,0,0,0.5); /* Bóng đổ rõ hơn khi hover */
  }

  /* Container cho ảnh nhỏ với aspect ratio 16:9 */
  .card-image-container {
    padding-top: 56.25%; 
  }
  
  /* Container cho ảnh lớn với aspect ratio tùy chỉnh */
  .large-card-image-container {
    padding-top: 40%; 
  }

  .card-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover; /* Đảm bảo ảnh che phủ và giữ tỷ lệ */
  }
`;

// Component Banner chính
export const Banner = () => {
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.id = "custom-banner-styles";
    if (!document.getElementById(styleSheet.id)) {
      styleSheet.innerText = customBannerStyles;
      document.head.appendChild(styleSheet);
    }

    // Đảm bảo Ant Design reset CSS được tải nếu component này được dùng độc lập
    const antdResetCss = document.createElement("link");
    antdResetCss.id = "antd-reset-css";
    if (!document.getElementById(antdResetCss.id)) {
      antdResetCss.rel = "stylesheet";
      antdResetCss.href = "https://unpkg.com/antd/dist/reset.css";
      document.head.appendChild(antdResetCss);
    }

    return () => {
      // Dọn dẹp style khi component unmount
      const existingStyleSheet = document.getElementById(styleSheet.id);
      if (existingStyleSheet) {
        document.head.removeChild(existingStyleSheet);
      }
      // Không xóa antdResetCss vì nó có thể được dùng bởi các component khác
    };
  }, []);

  const cardData = [
    {
      bgColor: '#FF7F50', // Coral - Màu nền dự phòng
      height: '280px'     // Chiều cao tối thiểu cho container ảnh nhỏ
    },
    {
      bgColor: '#FF6347', // Tomato - Màu nền dự phòng
      height: '280px'     // Chiều cao tối thiểu cho container ảnh nhỏ
    },
    {
      bgColor: '#DC143C', // Crimson - Màu nền dự phòng
      height: '100%'      // Chiều cao 100% cho container ảnh lớn để lấp đầy Col
    },
  ];

  return (
    <Row style={{ width: "70%", margin: "50px auto 20px auto" }} gutter={[24, 24]} align="stretch">
      {/* Cột 1: Chứa 2 ảnh nhỏ */}
      <Col xs={24} sm={24} md={8} lg={6}>
        <Row gutter={[0, 24]}> {/* Gutter dọc giữa 2 ảnh */}
          <Col span={24}>
            <div
              className="card-image-container"
              style={{ backgroundColor: cardData[0].bgColor, minHeight: cardData[0].height }}
            >
              <img alt="Banner 1" src={"/img/banner/banner1.jpg"} className="card-image" />
            </div>
          </Col>
          <Col span={24}>
            <div
              className="card-image-container"
              style={{ backgroundColor: cardData[1].bgColor, minHeight: cardData[1].height }}
            >
              <img alt="Banner 2" src={"/img/banner/banner2.jpg"} className="card-image" />
            </div>
          </Col>
        </Row>
      </Col>

      {/* Cột 2: Chứa 1 ảnh lớn */}
      <Col xs={24} sm={24} md={16} lg={18}>
        <div
          className="large-card-image-container"
          style={{ backgroundColor: cardData[2].bgColor, height: cardData[2].height }}
        >
          <img alt="Banner 3" src={"/img/banner/banner3.jpg"} className="card-image" />
        </div>
      </Col>
    </Row>
  );
};
