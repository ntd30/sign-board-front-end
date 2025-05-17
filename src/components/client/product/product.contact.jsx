import { MailTwoTone, PhoneTwoTone } from "@ant-design/icons"
import { Button, Col, Form, Input, Modal, notification, Row, Typography } from "antd"
import { createContactAPI } from "../../../services/api.service"

const ProductContact = (props) => {
    const { isContactOpen, setIsContactOpen } = props
    const [form] = Form.useForm()

    const handleContact = async (values) => {
        const {name, phone, email, address} = values
        const res = await createContactAPI(name, phone, email, address)

        if (res.data) {
            console.log("1234")
            resetAndCloseModal()
            notification.success({
                message: "Thêm Liên hệ",
                description: "Thêm Liên hệ mới thành công"
            })
        } else {
            notification.error({
                message: "Lỗi thêm mới Liên hệ",
                description: JSON.stringify(res.message)
            })
        }
    }

    const resetAndCloseModal = () => {
        setIsContactOpen(false)
        form.resetFields()
    }

    return (
        <>
            <Modal
                title={<Typography.Title level={3} style={{ color: '#1890ff', textAlign: 'center', marginBottom: 0 }}>LIÊN HỆ NGAY</Typography.Title>}
                maskClosable={false}
                // okText="Gửi thông tin liên hệ"
                // cancelText="Hủy"
                open={isContactOpen}
                // onOk={() => form.submit()}
                // okButtonProps={{ loading: loadingBtn }}
                onCancel={() => setIsContactOpen(false)}
                width={800}
                footer={null}
            >
                <Row gutter={24} style={{ marginTop: 50 }}>
                    <Col span={12}>
                        <Form
                            layout="vertical"
                            onFinish={handleContact}
                            form={form}
                        >
                            <Form.Item
                                label="Họ tên"
                                name="name"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập Họ tên!' }
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Số điện thoại"
                                name="phone"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập Số điện thoại!' }
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập Email!' },
                                    { type: "email", message: "Email không hợp lệ" }
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Địa chỉ"
                                name="address"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập Địa chỉ!' }
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Button key="submit" type="primary" style={{ width: "100%" }} onClick={() => form.submit()}>
                                Gửi thông tin liên hệ
                            </Button>

                        </Form>
                    </Col>

                    <Col span={12} style={{ backgroundColor: "ButtonFace", borderRadius: "10px" }}>
                        <div style={{ marginBottom: '20px', color: 'rgba(0, 0, 0, 0.85)' }}>
                            <b style={{ display: "block", textAlign: "center" }}>HOẶC LIÊN HỆ VỚI THÔNG TIN BÊN DƯỚI ĐỂ HỖ TRỢ NGAY BÂY GIỜ</b>
                            <div style={{ marginTop: '8px' }}>
                                <Typography.Text><span style={{ marginRight: '8px' }}><MailTwoTone /></span> techbyte@gmail.com</Typography.Text>
                            </div>
                            <div>
                                <Typography.Text><span style={{ marginRight: '8px' }}><PhoneTwoTone /></span> 0912345678  </Typography.Text>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Modal>
        </>
    )
}

export default ProductContact