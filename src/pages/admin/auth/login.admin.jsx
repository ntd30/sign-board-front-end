import { ArrowRightOutlined, GoogleOutlined, LockOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Card, Col, Divider, Flex, Form, Input, message, Row, Space, Typography } from "antd"
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginAPI, loginWithGoogle } from "../../../services/api.service"

const { Title, Text } = Typography

const LoginAdminPage = () => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const onFinish = async (values) => {
        setLoading(true)
        const res = await loginAPI(values.username, values.password)

        console.log("res", res)

        if (res.data) {
            if (res.data.user.roleName === "Customer") {
                message.error("Đăng nhập thất bại")
                navigate("/login-admin")
            } else {
                message.success("Đăng nhập thành công")
                localStorage.setItem('access_token', res.data.token)
                navigate("/admin")
            }
        } else {
            message.error(res)
        }
        setLoading(false)
    }

    return (
        <Row
            justify={"center"} style={{ marginTop: "30px" }}
        >
            <Col xs={24} md={16} lg={6}>
                <Card style={{ borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
                    <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>
                        Đăng nhập Trang quản trị
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

                        {/* Nút Đăng nhập */}
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading} block size="large">
                                Đăng nhập
                            </Button>
                        </Form.Item>

                        {/* Đường phân cách */}
                        <Divider plain style={{ fontSize: '14px', color: '#8c8c8c', margin: '20px 0' }} />

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

export default LoginAdminPage