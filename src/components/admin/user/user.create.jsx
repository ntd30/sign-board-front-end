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

        const { email, password, fullName, phone } = values

        const resCreateUser = await createUserAPI(
            email, password, fullName, phone
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
                message: "Error create book",
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
                <h2>Table Users</h2>
                <Button type="primary" onClick={() => setIsModalOpen(true)}>Create User</Button>
            </div>
            <Modal title="Create Book" maskClosable={false} okText="CREATE"
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
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Email không được bỏ trống!' }
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
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Tên đầy đủ"
                        name="fullName"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                    >
                        <Input />
                    </Form.Item>

                </Form>
            </Modal>
        </div>
    )
}

export default UserCreate