import { Form, Input, Modal } from "antd"

const ProductContact = (props) => {
    const { isContactOpen, setIsContactOpen } = props
    const [form] = Form.useForm()

    const handleContact = () => {
        alert("Duy")
    }

    return (
        <Modal title="Nhập thông tin liên hệ" maskClosable={false} okText="Gửi" cancelText="Hủy"
            open={isContactOpen}
            onOk={() => form.submit()}
            // okButtonProps={{ loading: loadingBtn }}
            onCancel={() => setIsContactOpen(false)}
        >
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

            </Form>
        </Modal>
    )
}

export default ProductContact