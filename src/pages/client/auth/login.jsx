import { ArrowRightOutlined, GoogleOutlined, LockOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Card, Col, Divider, Flex, Form, Input, message, Row, Space, Typography } from "antd"
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginAPI, loginWithGoogle } from "../../../services/api.service"
import { AuthContext } from "../../../components/context/auth.context"

const { Title, Text } = Typography

const LoginPage = () => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { setUser } = useContext(AuthContext)

    const onFinish = async (values) => {
        setLoading(true)
        const res = await loginAPI(values.username, values.password)

        if (res.data) {
            message.success("Đăng nhập thành công")
            localStorage.setItem('access_token', res.data.token)
            setUser(res.data.user)
            navigate("/")
        } else {
            message.error(res)
        }
        setLoading(false)
    }

    const handleGoogleLogin = () => {
        // const res = await loginWithGoogle()

        navigate(`${import.meta.env.VITE_BACKEND_URL}/login/oauth2/authorization/google`)
    }

    const handleForgotPassword = () => {
        navigate("/forgot-password")
    }

    return (
        <Row
            justify={"center"} style={{ marginTop: "30px" }}
        >
            <Col xs={24} md={16} lg={6}>
                <Card style={{ borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
                    <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>
                        Đăng nhập
                    </Title>
                    <Form
                        onFinish={onFinish}
                        layout="vertical"
                        form={form}
                    >
                        {/* Tên đăng nhập */}
                        <Form.Item
                            label="Tên đăng nhập"
                            name="username"
                            rules={[{ required: true, message: 'Tên đăng nhập không được bỏ trống!' }]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Username" size="large" />
                        </Form.Item>

                        {/* Mật khẩu */}
                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[
                                { required: true, message: 'Mật khẩu không được bỏ trống!' },
                                { min: 6, message: 'Mật khẩu phải có tối thiểu 6 ký tự' }
                            ]}
                        >
                            <Input.Password prefix={<LockOutlined />} placeholder="Password" size="large" />
                        </Form.Item>

                        {/* Quên mật khẩu */}
                        <Form.Item style={{ marginBottom: '15px' }}>
                            <Link onClick={handleForgotPassword} style={{ float: 'right', fontSize: '14px' }}>
                                Quên mật khẩu?
                            </Link>
                        </Form.Item>

                        {/* Nút Đăng nhập */}
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading} block size="large">
                                Đăng nhập
                            </Button>
                        </Form.Item>

                        {/* Đường phân cách */}
                        <Divider plain style={{ fontSize: '14px', color: '#8c8c8c', margin: '20px 0' }}>Hoặc đăng nhập với</Divider>

                        {/* Nút Đăng nhập Google */}
                        <Form.Item>
                            <a href={`${import.meta.env.VITE_BACKEND_URL}/oauth2/authorization/google`}>
                                <Button
                                    icon={<GoogleOutlined />}
                                    onClick={handleGoogleLogin}
                                    block
                                    size="large"
                                >
                                    Google
                                </Button>
                            </a>
                        </Form.Item>

                        {/* Link Đăng ký */}
                        <div style={{ textAlign: "start", marginTop: "25px" }}>
                            <Text type="secondary">Chưa có tài khoản? </Text>
                            <Link to="/register">Đăng ký tại đây</Link>
                        </div>

                        {/* Link Trở về trang chủ */}
                        <div style={{ textAlign: "start", marginTop: "15px" }}>
                            <Link to="/">
                                <Space align="center" size={4}> {/* Dùng Space để căn icon và text */}
                                    <ArrowRightOutlined rotate={180} /> {/* Icon quay lại */}
                                    Trở về trang chủ
                                </Space>
                            </Link>
                        </div>
                    </Form >
                </Card>
            </Col>
        </Row >
    )
}

export default LoginPage