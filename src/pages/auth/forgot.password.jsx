import { Button, Card, Col, Form, Input, Row, Typography } from "antd"
import { useNavigate } from "react-router-dom"
import { getAuthCode } from "../../services/api.service"

const { Title, Text } = Typography

const ForgotPassword = () => {
    const [form] = Form.useForm()
    const navigate = useNavigate()

    const handleForgotPassword = async (values) => {
        navigate("/confirm-code", {
            state: {
                email: values.email
            }
        })
        const res = await getAuthCode(values.email)
    }

    return (
        <Row
            justify={"center"} style={{ marginTop: "30px" }}
        >
            <Col xs={24} md={16} lg={6}>
                <Card style={{ borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
                    <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>
                        Quên mật khẩu
                    </Title>
                    <Title level={3} style={{ textAlign: 'center', marginBottom: '30px' }}>
                        Nhập địa chỉ email của bạn
                    </Title>

                    <Form
                        onFinish={handleForgotPassword}
                        layout="vertical"
                        form={form}
                    >
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Email không được bỏ trống!' }]}
                        >
                            <Input placeholder="Enter your email address" size="large" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block size="large">
                                Tiếp tục
                            </Button>
                        </Form.Item>

                    </Form >
                </Card>
            </Col>
        </Row >
    )
}

export default ForgotPassword