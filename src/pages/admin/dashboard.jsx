import React, { useEffect } from 'react';
import { Layout, Row, Col, Typography, Button } from 'antd';
import { SmileOutlined, ExperimentOutlined, CheckCircleTwoTone } from '@ant-design/icons';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

// Component Trang Chào Mừng Dashboard - Tối ưu cho màn hình lớn
export const DashboardPage = () => {
    // CSS tùy chỉnh cho theme trắng, hiệu ứng và các style khác
    const customStyles = `
    .dashboard-welcome-page-light {
      min-height: 100vh;
      background: #f7f9fc; /* Nền xám rất nhạt, tạo sự mềm mại */
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      text-align: center;
      overflow: hidden;
    }

    /* Định nghĩa animation fadeIn */
    @keyframes fadeInUpWelcome {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .welcome-content-wrapper-light {
      background: #ffffff; 
      padding: 40px 50px; 
      border-radius: 12px; 
      box-shadow: 0 8px 24px rgba(140, 140, 140, 0.12); 
      max-width: 800px; /* Tăng max-width cho màn hình lớn hơn */
      width: 100%;
      animation: fadeInUpWelcome 0.9s ease-out forwards; 
      opacity: 0; 
    }
    
    .welcome-title-light {
      color: #262626; 
      font-weight: 600; 
      margin-bottom: 16px;
      font-size: 2.5rem; 
    }

    .welcome-paragraph-light {
      color: #595959; 
      font-size: 1.1rem;
      line-height: 1.7;
      margin-bottom: 30px;
    }

    .welcome-icon-light {
      font-size: 50px;
      margin-bottom: 25px;
      display: block;
      margin-left: auto;
      margin-right: auto;
      color: #1890ff; 
    }
    
    .welcome-button-light {
        font-weight: 500;
        transition: all 0.3s ease;
        box-shadow: 0 2px 8px rgba(24, 144, 255, 0.2); 
    }
    .welcome-button-light:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(24, 144, 255, 0.3);
    }

    /* Responsive adjustments */
    @media (max-width: 767px) { /* Tablet and smaller */
      .welcome-title-light {
        font-size: 2rem;
      }
      .welcome-paragraph-light {
        font-size: 1rem;
      }
      .welcome-content-wrapper-light {
        padding: 30px 25px;
        animation-duration: 0.8s; 
        max-width: 90%; /* Cho phép chiếm nhiều hơn trên mobile */
      }
      .welcome-icon-light {
        font-size: 40px;
      }
    }
    @media (max-width: 575px) { /* Mobile phones */
      .welcome-title-light {
        font-size: 1.75rem;
      }
      .welcome-paragraph-light {
        font-size: 0.95rem;
      }
       .welcome-content-wrapper-light {
        padding: 25px 20px; 
      }
    }

    /* Adjustments for larger screens */
    @media (min-width: 1200px) { /* Large desktops */
        .welcome-content-wrapper-light {
            max-width: 900px; /* Tăng thêm max-width */
            padding: 50px 60px; /* Tăng padding */
        }
        .welcome-title-light {
            font-size: 2.8rem; /* Tăng kích thước tiêu đề */
        }
        .welcome-paragraph-light {
            font-size: 1.2rem; /* Tăng kích thước đoạn văn */
        }
        .welcome-icon-light {
            font-size: 55px; /* Tăng kích thước icon */
        }
    }
     @media (min-width: 1600px) { /* Extra large desktops */
        .welcome-content-wrapper-light {
            max-width: 960px; /* Giới hạn cuối cùng cho max-width */
        }
         .welcome-title-light {
            font-size: 3rem; 
        }
    }
  `;

    useEffect(() => {
        const styleSheet = document.createElement("style");
        styleSheet.id = "dashboard-welcome-styles-light";
        if (!document.getElementById(styleSheet.id)) {
            styleSheet.innerText = customStyles;
            document.head.appendChild(styleSheet);
        }

        const antdResetCss = document.createElement("link");
        antdResetCss.id = "antd-reset-css-dynamic-dashboard-light";
        if (!document.getElementById(antdResetCss.id)) {
            antdResetCss.rel = "stylesheet";
            antdResetCss.href = "https://unpkg.com/antd/dist/reset.css";
            document.head.appendChild(antdResetCss);
        }
        return () => {
            const existingStyleSheet = document.getElementById(styleSheet.id);
            if (existingStyleSheet) {
                document.head.removeChild(existingStyleSheet);
            }
        };
    }, [customStyles]);

    return (
        <Row justify="center" align="middle" style={{ height: '100%' }}>
            {/* Điều chỉnh Col spans để khối nội dung có thể rộng hơn trên màn hình lớn, 
              nhưng chiều rộng thực tế sẽ bị giới hạn bởi max-width trong CSS.
              Mục đích là để nó không bị quá "lọt thỏm" giữa màn hình rộng.
          */}
            <Col xs={22} sm={20} md={18} lg={16} xl={14} xxl={12}>
                <div className="welcome-content-wrapper-light">
                    <CheckCircleTwoTone twoToneColor="#52c41a" className="welcome-icon-light" />
                    <Title level={1} className="welcome-title-light">
                        Chào Mừng Bạn Đến Trang Quản Trị
                    </Title>
                    <Paragraph className="welcome-paragraph-light">
                        Hệ thống đã sẵn sàng phục vụ. Tại đây, bạn có thể dễ dàng quản lý và theo dõi mọi hoạt động. Chúc bạn có những trải nghiệm tuyệt vời!
                    </Paragraph>
                    <Button
                        type="primary"
                        size="large"
                        icon={<ExperimentOutlined />}
                        className="welcome-button-light"
                        onClick={() => console.log("Bắt đầu khám phá!")}
                    >
                        Bắt Đầu Khám Phá
                    </Button>
                </div>
            </Col>
        </Row>
    );
};