import { ArrowRightOutlined } from "@ant-design/icons"
import { Button, Col, Divider, Flex, Form, Input, message, Row } from "antd"
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginAPI } from "../services/api.service"
import { AuthContext } from "../components/context/auth.context"

const LoginPage = () => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { setUser } = useContext(AuthContext)

    const onFinish = async (values) => {
        setLoading(true)
        const res = await loginAPI(values.email, values.password)

        if (res.data) {
            message.success("Đăng nhập thành công")
            localStorage.setItem('access_token', res.data.access_token)
            setUser(res.data.user)
            navigate("/")
        } else {
            message.error(res.message)
        }
        setLoading(false)
    }

    return (
        <Row justify={"center"} style={{ marginTop: "30px" }}>
            <Col xs={24} md={16} lg={6}>
                <fieldset style={{
                    padding: "15px",
                    margin: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "5px"
                }}>
                    <legend>Đăng nhập</legend>
                    <Form
                        onFinish={onFinish}
                        layout="vertical"
                        form={form}
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Email không được bỏ trống!' },
                                { type: "email", message: 'Email không đúng định dạng!' },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Mật khẩu không được bỏ trống!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Flex justify="space-between" align="baseline">
                            <Form.Item label={null}>
                                <Button type="primary" htmlType="submit" loading={loading}>
                                    Login
                                </Button>
                            </Form.Item>

                            <Link to={"/"}>Go to Homepage <ArrowRightOutlined /></Link>
                        </Flex>


                    </Form >
                    <Divider />
                    <p style={{ textAlign: "center" }}>Chưa có tài khoản? <Link to={"/register"}>Đăng ký tại đây</Link></p>
                </fieldset>
            </Col>
        </Row >
    )
}

export default LoginPage