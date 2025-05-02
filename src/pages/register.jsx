import { Button, Input, Form, notification, Row, Col, Divider } from "antd"
import { registerAPI } from "../services/api.service";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [form] = Form.useForm()
    const navigate = useNavigate();

    const onFinish = async (values) => {
        const res = await registerAPI(values.fullName, values.email, values.password, values.phone)

        if (res.data) {
            notification.success({
                message: "Register user",
                description: "Đăng ký người dùng thành công"
            })
            navigate("/login")
        } else {
            notification.error({
                message: "Error register user",
                description: JSON.stringify(res.message)
            })
        }
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
                    <legend>Đăng Ký</legend>
                    <Form
                        onFinish={onFinish}
                        layout="vertical"
                        form={form}
                    >
                        {/* <h3 style={{ textAlign: "center" }}>Đăng ký tài khoản</h3> */}

                        <Form.Item
                            label="Full name"
                            name="fullName"
                            rules={[{ required: true, message: 'Please input your full name!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            label="Phone number"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    pattern: new RegExp(/\d+/g),
                                    message: "Wrong format!"
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item label={null}>
                            <Button type="primary" htmlType="submit">
                                Register
                            </Button>
                        </Form.Item>

                    </Form >
                </fieldset>
                <Divider />
                <p>Đã có tài khoản? <Link to={"/login"}>Đăng nhập tại đây</Link></p>
            </Col>
        </Row>
    )
}

export default RegisterPage