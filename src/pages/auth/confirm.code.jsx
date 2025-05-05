import { SafetyOutlined } from "@ant-design/icons"
import { Alert, Button, Card, Col, Form, Input, InputNumber, notification, Row, Typography } from "antd"
import { resetPasswordAPI } from "../../services/api.service"
import { useLocation, useNavigate } from "react-router-dom"

const { Title, Text } = Typography

const ConfirmCode = () => {
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const location = useLocation()
    const email = location.state.email

    const resetPassword = async (values) => {
        const res = await resetPasswordAPI(values.code, values.newPassword)
        if (res.data) {
            notification.success({
                message: "Đặt lại mật khẩu",
                description: "Đặt lại mật khẩu thành công"
            })
            navigate("/login")
        } else {
            notification.error({
                message: "Lỗi đặt lại mật khẩu",
                description: JSON.stringify(res)
            })
        }
    }

    return (
        <Row
            justify={"center"} style={{ marginTop: "30px" }}
        >
            <Col xs={24} md={16} lg={6}>
                <Card style={{ borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
                    <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>
                        Mã xác thực
                    </Title>

                    {/* Thông báo đã gửi mã */}
                    <Alert
                        message={ // Sử dụng thẻ Text để nhấn mạnh email nếu muốn
                            <Text>
                                Chúng tôi đã gửi mã OTP đặt lại mật khẩu tới email của bạn - <Text strong>{email}</Text>
                            </Text>
                        }
                        type="success" // Loại thông báo thành công (màu xanh lá)
                        showIcon // Hiển thị icon
                        icon={<SafetyOutlined />} // Icon tùy chọn
                        style={{ marginBottom: 24 }}
                    />

                    <Form
                        onFinish={resetPassword}
                        layout="vertical"
                        form={form}
                    >
                        <Form.Item
                            name="code"
                            rules={[{ required: true, message: 'Mã xác thực không được bỏ trống!' }]}
                        >
                            <InputNumber placeholder="Nhập mã xác thực" size="large" style={{ width: "100%" }} />
                        </Form.Item>

                        <Form.Item
                            name="newPassword"
                            rules={[{ required: true, message: 'Mật khẩu không được bỏ trống!' }]}
                        >
                            <Input.Password placeholder="Nhập mật khẩu mới" size="large" />
                        </Form.Item>

                        {/* Nút Đăng nhập */}
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block size="large">
                                Xác thực
                            </Button>
                        </Form.Item>

                    </Form >
                </Card>
            </Col>
        </Row >
    )
}

export default ConfirmCode