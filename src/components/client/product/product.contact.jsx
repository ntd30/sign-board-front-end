import React, { useEffect } from 'react';
import { Button, Col, Form, Input, Modal, notification, Row, Typography } from "antd";
import { createContactAPI } from '../../../services/api.service';

const ProductContact = (props) => {
    const { isContactOpen, setIsContactOpen, productId } = props;
    const [form] = Form.useForm();
    const [loadingBtn, setLoadingBtn] = React.useState(false);

    // Custom styles (updated to remove contact-info-column styles)
    const customStyles = `
        .gradient-modal .ant-modal-content {
            background: linear-gradient(135deg, #FFB6C1 0%, #FF82AB 100%);
            border-radius: 15px;
            padding: 0;
            box-shadow: 0 8px 25px rgba(0,0,0,0.3);
        }
        .gradient-modal .ant-modal-header {
            background: linear-gradient(135deg, #FF4500 0%, #DC143C 100%);
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
            color: #FFDDE1;
        }
        .submit-button-gradient {
            background: linear-gradient(to right, #D2042D, #FF4500) !important;
            border: none !important;
            color: white !important;
            font-weight: bold;
            transition: all 0.3s ease;
        }
        .submit-button-gradient:hover {
            box-shadow: 0 6px 15px rgba(220, 20, 60, 0.6);
            transform: translateY(-3px);
        }
        .gradient-modal .ant-form-item-label > label {
            color: #A52A2A;
            font-weight: 500;
        }
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
    }, [isContactOpen]);

    const handleContact = async (values) => {
        setLoadingBtn(true);
        const { name, phone, email, address, message } = values;
        try {
            const res = await createContactAPI(name, phone, email, address, message, productId);
            if (res.data) {
                resetAndCloseModal();
                notification.success({
                    message: "Gửi Liên Hệ Thành Công",
                    description: "Chúng tôi đã nhận được thông tin của bạn và sẽ phản hồi sớm nhất!",
                });
            } else {
                notification.error({
                    message: "Lỗi Gửi Liên Hệ",
                    description: res.data?.message || "Đã có lỗi xảy ra. Vui lòng thử lại.",
                });
            }
        } catch (error) {
            console.error("Contact API Error:", error.response?.data || error.message);
            notification.error({
                message: "Lỗi Gửi Liên Hệ",
                description: error.response?.data?.message || "Đã có lỗi xảy ra. Vui lòng thử lại.",
                placement: 'topRight'
            });
        }
        setLoadingBtn(false);
    };

    const resetAndCloseModal = () => {
        setIsContactOpen(false);
        form.resetFields();
    };

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
                <Row gutter={[32, 24]} style={{ marginTop: 10, justifyContent: 'center' }}>
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
                                <Input rows={3} placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố" />
                            </Form.Item>

                            <Form.Item
                                label="Lời nhắn"
                                name="message"
                            >
                                <Input.TextArea rows={3} placeholder="Nội dung tin nhắn hoặc yêu cầu của bạn" />
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
                </Row>
            </Modal>
        </>
    );
};

export default ProductContact;