import React, { useEffect } from 'react';
import { MailTwoTone, PhoneTwoTone, FacebookFilled } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, notification, Row, Typography, Space, Divider } from "antd";

// Mock API call for demonstration
const createContactAPI = async (name, phone, email, address) => {
    console.log("Sending contact data:", { name, phone, email, address });
    return new Promise(resolve => {
        setTimeout(() => {
            if (name && phone && email && address) {
                resolve({ data: { success: true, message: "Contact created successfully!" } });
            } else {
                resolve({ message: "Mock API Error: Missing required fields." });
            }
        }, 1000);
    });
};


const ProductContact = (props) => {
    const { isContactOpen, setIsContactOpen } = props;
    const [form] = Form.useForm();
    const [loadingBtn, setLoadingBtn] = React.useState(false);

    // Custom styles for the modal and its elements, including responsive adjustments
    const customStyles = `
        .gradient-modal .ant-modal-content {
            /* Gradient đậm hơn và mãnh liệt hơn */
            background: linear-gradient(135deg, #FFB6C1 0%, #FF82AB 100%); /* LightPink to a deeper Pink */
            border-radius: 15px;
            padding: 0; 
            box-shadow: 0 8px 25px rgba(0,0,0,0.3); /* Bóng đổ nhiều hơn */
        }

        .gradient-modal .ant-modal-header {
            /* Gradient đậm hơn cho header */
            background: linear-gradient(135deg, #FF4500 0%, #DC143C 100%); /* OrangeRed to Crimson */
            border-top-left-radius: 15px;
            border-top-right-radius: 15px;
            border-bottom: none;
            padding: 20px 24px;
        }
        
        .gradient-modal .ant-modal-title {
            color: #FFFFFF !important; 
            font-weight: bold;
            font-size: 24px !important; 
        }

        .gradient-modal .ant-modal-body {
            padding: 24px;
            padding-top: 20px; 
        }
        
        .gradient-modal .ant-modal-close-x {
            color: #FFFFFF; 
            font-size: 18px;
        }
        .gradient-modal .ant-modal-close-x:hover {
            color: #FFDDE1; /* Lighter pink on hover */
        }

        .contact-info-column {
            /* Gradient đậm hơn cho cột thông tin */
            background: linear-gradient(to bottom right, #FFC0CB 0%, #FFB6C1 100%); /* Pink to LightPink */
            padding: 24px;
            border-radius: 10px;
            box-shadow: 0 6px 18px rgba(0,0,0,0.2); /* Bóng đổ nhiều hơn */
            height: 90%; 
            display: flex;
            flex-direction: column;
            justify-content: center; 
        }

        .contact-info-title {
            font-weight: bold;
            text-align: center;
            color: #C71585; /* MediumVioletRed - màu đậm hơn */
            margin-bottom: 20px;
            font-size: 19px; /* Tăng nhẹ kích thước */
        }
        
        .contact-info-item {
            display: flex;
            align-items: center;
            /* justify-content: center; /* Căn giữa nội dung item nếu cần */
            margin-bottom: 15px;
            font-size: 16px;
            color: #4A4A4A; /* Màu chữ đậm hơn một chút */
        }

        .contact-info-item .anticon {
            font-size: 22px; 
            margin-right: 12px;
            color: #B22222; /* Firebrick - màu icon đậm hơn */
        }
        
        .social-contact-title {
            font-weight: bold;
            text-align: center;
            color: #C71585; /* MediumVioletRed - màu đậm hơn */
            margin-top: 25px;
            margin-bottom: 15px;
            font-size: 18px; /* Tăng nhẹ kích thước */
        }

        .social-icons-container {
            display: flex;
            justify-content: center;
            gap: 25px; 
        }

        .social-icon-link {
            font-size: 32px; 
            transition: transform 0.2s ease-in-out, color 0.2s ease-in-out;
        }
        
        .social-icon-link.facebook:hover {
            color: #1877F2; 
            transform: scale(1.15); /* Tăng nhẹ hiệu ứng hover */
        }

        .social-icon-link.zalo:hover {
            color: #0068FF; 
            transform: scale(1.15); /* Tăng nhẹ hiệu ứng hover */
        }

        .submit-button-gradient {
            /* Gradient mãnh liệt hơn cho nút */
            background: linear-gradient(to right, #D2042D, #FF4500) !important; /* Scarlet to OrangeRed */
            border: none !important;
            color: white !important;
            font-weight: bold;
            transition: all 0.3s ease;
        }
        .submit-button-gradient:hover {
            box-shadow: 0 6px 15px rgba(220, 20, 60, 0.6); /* Bóng đổ đậm hơn cho nút */
            transform: translateY(-3px); /* Nhô lên nhiều hơn */
        }

        .gradient-modal .ant-form-item-label > label {
            color: #A52A2A; /* Brown - màu label đậm hơn */
            font-weight: 500;
        }

        /* Responsive Adjustments */
        @media (max-width: 767px) {
            .gradient-modal .ant-modal-body {
                padding: 16px; 
            }
            .gradient-modal .ant-modal-header {
                padding: 15px 16px; 
            }
            .gradient-modal .ant-modal-title {
                font-size: 20px !important; 
            }
            .contact-info-column {
                padding: 16px; 
            }
            .contact-info-title, .social-contact-title {
                font-size: 17px; 
                margin-bottom: 15px;
            }
            .contact-info-item {
                font-size: 15px; 
                margin-bottom: 12px;
            }
            .contact-info-item .anticon {
                font-size: 20px; 
                margin-right: 10px;
            }
            .social-icons-container {
                gap: 20px; 
            }
            .social-icon-link {
                font-size: 28px; 
            }
            .gradient-modal .ant-form-item-label > label {
                font-size: 14px; 
            }
            .submit-button-gradient {
                font-size: 15px; 
                height: 38px !important; 
            }
        }

        @media (max-width: 480px) { 
            .gradient-modal .ant-modal-body {
                padding: 12px;
            }
            .gradient-modal .ant-modal-header {
                padding: 12px;
            }
            .gradient-modal .ant-modal-title {
                font-size: 18px !important;
            }
            .contact-info-column {
                padding: 12px;
            }
            .contact-info-item .anticon {
                font-size: 18px;
            }
            .social-icon-link {
                font-size: 26px;
            }
             .submit-button-gradient {
                height: 36px !important;
            }
        }
    `;

    useEffect(() => {
        if (isContactOpen) {
            const styleSheet = document.createElement("style");
            styleSheet.id = "product-contact-custom-styles";
            if (!document.getElementById(styleSheet.id)) {
                styleSheet.innerText = customStyles;
                document.head.appendChild(styleSheet);
            }
        } else {
            const existingStyleSheet = document.getElementById("product-contact-custom-styles");
            if (existingStyleSheet) {
                document.head.removeChild(existingStyleSheet);
            }
        }
        return () => {
            const existingStyleSheet = document.getElementById("product-contact-custom-styles");
            if (existingStyleSheet) {
                document.head.removeChild(existingStyleSheet);
            }
        };
    }, [isContactOpen, customStyles]);


    const handleContact = async (values) => {
        setLoadingBtn(true);
        const { name, phone, email, address } = values;
        const res = await createContactAPI(name, phone, email, address);
        setLoadingBtn(false);

        if (res.data && res.data.success) {
            resetAndCloseModal();
            notification.success({
                message: "Gửi Liên Hệ Thành Công",
                description: "Chúng tôi đã nhận được thông tin của bạn và sẽ phản hồi sớm nhất!",
                placement: 'topRight'
            });
        } else {
            notification.error({
                message: "Lỗi Gửi Liên Hệ",
                description: res.message || "Đã có lỗi xảy ra. Vui lòng thử lại.",
                placement: 'topRight'
            });
        }
    };

    const resetAndCloseModal = () => {
        setIsContactOpen(false);
        form.resetFields();
    };

    const ZaloIcon = () => (
        <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
            <path d="M790.8 409.5c-13.2-10.7-63.4-43.8-100.2-65.2 45.1-65.5 71.3-149.2 71.3-239.5C761.9 46.5 715.4 0 657.1 0H366.9C308.6 0 262.1 46.5 262.1 104.8c0 90.2 26.2 174 71.3 239.5 -36.8 21.4-87 54.5-100.2 65.2C130.9 485.2 40.9 600.5 40.9 728.9c0 162.5 211.6 295.1 471.1 295.1s471.1-132.5 471.1-295.1c0-128.4-90-243.7-192.3-319.4zM430.4 113.9h163.3c11.4 0 20.6 9.2 20.6 20.6s-9.2 20.6-20.6 20.6H430.4c-11.4 0-20.6-9.2-20.6-20.6s9.2-20.6 20.6-20.6z m142.7 633.2c-16.6 0-30-13.4-30-30s13.4-30 30-30 30 13.4 30 30 -13.4 30-30 30z m88.8-107.8c-16.6 0-30-13.4-30-30s13.4-30 30-30 30 13.4 30 30 -13.4 30-30 30z m0-121.2c-16.6 0-30-13.4-30-30s13.4-30 30-30 30 13.4 30 30 -13.4 30-30 30z m0-121.1c-16.6 0-30-13.4-30-30s13.4-30 30-30 30 13.4 30 30 -13.4 30-30 30z m-250.7-7.2c-11.4 0-20.6-9.2-20.6-20.6V430.4c0-11.4 9.2-20.6 20.6-20.6s20.6 9.2 20.6 20.6v159.4c0 11.4-9.2 20.6-20.6 20.6z" />
        </svg>
    );


    return (
        <>
            <Modal
                className="gradient-modal"
                title={<Typography.Title level={3} style={{ color: '#FFFFFF', textAlign: 'center', margin: 0 }}>LIÊN HỆ VỚI CHÚNG TÔI</Typography.Title>}
                maskClosable={false}
                open={isContactOpen}
                onCancel={resetAndCloseModal}
                width={850}
                footer={null}
            >
                <Row gutter={[32, 24]} style={{ marginTop: 10 }}>
                    <Col xs={24} md={12}>
                        <Form
                            layout="vertical"
                            onFinish={handleContact}
                            form={form}
                            initialValues={{ remember: true }}
                        >
                            <Form.Item
                                label="Họ và tên"
                                name="name"
                                rules={[{ required: true, message: 'Vui lòng nhập Họ và tên!' }]}
                            >
                                <Input placeholder="Nguyễn Văn A" />
                            </Form.Item>

                            <Form.Item
                                label="Số điện thoại"
                                name="phone"
                                rules={[{ required: true, message: 'Vui lòng nhập Số điện thoại!' }, { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ!' }]}
                            >
                                <Input placeholder="09xxxxxxxx" />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập Email!' },
                                    { type: "email", message: "Email không hợp lệ!" }
                                ]}
                            >
                                <Input placeholder="example@email.com" />
                            </Form.Item>

                            <Form.Item
                                label="Địa chỉ của bạn"
                                name="address"
                                rules={[{ required: true, message: 'Vui lòng nhập Địa chỉ!' }]}
                            >
                                <Input.TextArea rows={3} placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố" />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    key="submit"
                                    type="primary"
                                    htmlType="submit"
                                    style={{ width: "100%", height: '40px', fontSize: '16px' }}
                                    className="submit-button-gradient"
                                    loading={loadingBtn}
                                >
                                    GỬI THÔNG TIN NGAY
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>

                    <Col xs={24} md={12}>
                        <div className="contact-info-column">
                            <Typography.Title level={4} className="contact-info-title">
                                THÔNG TIN HỖ TRỢ TRỰC TIẾP
                            </Typography.Title>

                            <div className="contact-info-item">
                                <MailTwoTone twoToneColor="#B22222" /> {/* Updated icon color */}
                                <Typography.Text>techbyte@gmail.com</Typography.Text>
                            </div>
                            <div className="contact-info-item">
                                <PhoneTwoTone twoToneColor="#B22222" /> {/* Updated icon color */}
                                <Typography.Text>0912 345 678</Typography.Text>
                            </div>

                            <Divider style={{ borderColor: '#B22222', margin: '25px 0' }}><span style={{ color: '#B22222' }}>Hoặc</span></Divider> {/* Updated divider color */}

                            <Typography.Title level={5} className="social-contact-title">
                                KẾT NỐI QUA MẠNG XÃ HỘI
                            </Typography.Title>
                            <Space className="social-icons-container" size="large" wrap>
                                <a href="https://facebook.com/yourpage" target="_blank" rel="noopener noreferrer" className="social-icon-link facebook">
                                    <FacebookFilled />
                                </a>
                                <a href="https://zalo.me/yourzalo" target="_blank" rel="noopener noreferrer" className="social-icon-link zalo">
                                    <img alt='zalo' src='/img/contact/zalo.png' style={{width: "28px"}}/>
                                </a>
                            </Space>
                        </div>
                    </Col>
                </Row>
            </Modal>
        </>
    );
};

export default ProductContact;
