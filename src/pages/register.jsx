import { Button, Input, Form, notification, Row, Col, Divider } from "antd"
import { registerAPI } from "../services/api.service";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../components/context/auth.context";

const RegisterPage = () => {
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const { setUser } = useContext(AuthContext)

    const onFinish = async (values) => {
        const res = await registerAPI(values.username, values.email, values.password, values.fullName)

        if (res.data) {
            localStorage.setItem('access_token', res.data.access_token)
            setUser(res.data.user)
            notification.success({
                message: "Đăng ký người dùng",
                description: "Đăng ký người dùng thành công"
            })
            navigate("/")
        } else {
            notification.error({
                message: "Lỗi đăng ký người dùng",
                description: JSON.stringify(res)
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
                            label="Tên đăng nhập"
                            name="username"
                            rules={[{ required: true, message: 'Tên đăng nhập không được để trống!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'email không được để trống!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[
                                { required: true, message: 'Mật khẩu không được để trống!' },
                                {min: 6, message: 'Mật khẩu phải có tối thiểu 6 ký tự'}
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            label="Họ và tên"
                            name="fullName"
                            rules={[{ required: true, message: 'Họ và tên không được để trống!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item label={null}>
                            <Button type="primary" htmlType="submit">
                                Đăng ký
                            </Button>
                        </Form.Item>

                    </Form >
                </fieldset>
                <Divider />
                <p style={{ textAlign: "center" }}>Đã có tài khoản? <Link to={"/login"}>Đăng nhập tại đây</Link></p>
            </Col>
        </Row>
    )
}

export default RegisterPage