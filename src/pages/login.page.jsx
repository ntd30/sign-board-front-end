import { ArrowRightOutlined } from "@ant-design/icons"
import { Button, Col, Divider, Flex, Form, Input, Row } from "antd"
import { useState } from "react"
import { Link } from "react-router-dom"

const LoginPage = () => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)

    const onFinish = () => {
        alert('Submit')
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
                                <Button type="primary" htmlType="submit" loading={loading}
                                // onClick={() => form.submit()}
                                >
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