import { Button, Form, Input, InputNumber, Modal, notification, Select } from "antd"
import { useState } from "react";
import { createUserAPI } from "../../../services/api.service";

const UserCreate = (props) => {
    const { loadUsers } = props
    const [isModalOpen, setIsModalOpen] = useState(false)

    const [loadingBtn, setLoadingBtn] = useState(false)

    const [form] = Form.useForm()

    const handleCreateUser = async (values) => {
        setLoadingBtn(true)

        const { username, email, password, fullName, phoneNumber, address, roleName } = values

        const resCreateUser = await createUserAPI(
            username, email, password, fullName, phoneNumber, address, roleName
        )

        if (resCreateUser.data) {
            resetAndCloseModal()
            await loadUsers()
            notification.success({
                message: "Thêm người dùng",
                description: "Thêm người dùng mới thành công"
            })
        } else {
            notification.error({
                message: "Lỗi thêm mới người dùng",
                description: JSON.stringify(resCreateUser.message)
            })
        }

        setLoadingBtn(false)
    }


    const resetAndCloseModal = () => {
        setIsModalOpen(false)
        form.resetFields()
    }

    return (
        <div style={{ margin: "10px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>Quản lý người dùng</h2>
                <Button type="primary" onClick={() => setIsModalOpen(true)}>Tạo mới</Button>
            </div>
            <Modal title="Tạo mới người dùng" maskClosable={false} okText="Thêm" cancelText="Hủy"
                open={isModalOpen}
                onOk={() => form.submit()}
                okButtonProps={{
                    loading: loadingBtn
                }}
                onCancel={resetAndCloseModal}
            >
                <Form
                    layout="vertical"
                    onFinish={handleCreateUser}
                    form={form}
                >

                    <Form.Item
                        label="Tên đăng nhập"
                        name="username"
                        rules={[
                            { required: true, message: 'Tên đăng nhập không được bỏ trống!' }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Email không được bỏ trống!' },
                            { type: 'email', message: 'Email không đúng định dạng' }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[
                            { required: true, message: 'Mật khẩu không được bỏ trống!' }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="Tên đầy đủ"
                        name="fullName"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại"
                        name="phoneNumber"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Địa chỉ"
                        name="address"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Quyền hạn"
                        name="roleName"
                        initialValue={"Customer"}
                    >
                        <Select>
                            <Select.Option value="Admin">Admin</Select.Option>
                            <Select.Option value="Customer">Customer</Select.Option>
                        </Select>
                    </Form.Item>

                </Form>
            </Modal>
        </div>
    )
}

export default UserCreate