import { Button, Form, Input, InputNumber, Modal, notification, Select } from "antd"
import { useEffect, useState } from "react"
import { updateUserAPI } from "../../../services/api.service"

const UserUpdate = (props) => {
    // const { isUpdateOpen, setIsUpdateOpen, dataUpdate, setDataUpdate, loadUsers } = props
    const { isUpdateOpen, setIsUpdateOpen, dataUpdate, loadUsers } = props
    const [loadingBtn, setLoadingBtn] = useState(false)
    const [form] = Form.useForm()

    useEffect(() => {
        if (dataUpdate && dataUpdate.id) {
            form.setFieldsValue({
                id: dataUpdate.id,
                username: dataUpdate.username,
                email: dataUpdate.email,
                fullName: dataUpdate.fullName,
                phoneNumber: dataUpdate.phoneNumber,
                address: dataUpdate.address,
                active: dataUpdate.active,
                roleName: dataUpdate.roleName
            })
        }
    }, [dataUpdate])

    const handleUpdateUser = async (values) => {
        setLoadingBtn(true)

        const { id, fullName, phoneNumber, address, active, roleName } = values
        const res = await updateUserAPI(id, fullName, phoneNumber, address, active, roleName)

        if (res.data) {
            resetAndCloseModal()
            await loadUsers()
            notification.success({
                message: "Cập nhật người dùng",
                description: "Cập nhật người dùng thành công"
            })
        } else {
            notification.error({
                message: "Lỗi Cập nhật người dùng",
                description: JSON.stringify(res.message)
            })
        }
        setLoadingBtn(false)
    }

    const resetAndCloseModal = () => {
        setIsUpdateOpen(false)
        // setDataUpdate(null)
        // form.resetFields()
    }

    return (
        <Modal title="Cập nhật người dùng" maskClosable={false} okText="Lưu" cancelText="Hủy"
            open={isUpdateOpen}
            onOk={() => form.submit()}
            okButtonProps={{ loading: loadingBtn }}
            onCancel={resetAndCloseModal}
        >
            <Form
                layout="vertical"
                onFinish={handleUpdateUser}
                form={form}
            >
                <Form.Item label="Id" name="id">
                    <Input disabled />
                </Form.Item>

                <Form.Item
                    label="Username"
                    name="username"
                >
                    <Input disabled />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                >
                    <Input disabled />
                </Form.Item>

                <Form.Item
                    label="Tên đầy đủ"
                    name="fullName"
                    rules={[{ required: true, message: 'Tên đầy đủ không được bỏ trống!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Số điện thoại"
                    name="phoneNumber"
                    rules={[{ required: true, message: 'Số điện thoại không được bỏ trống!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Địa chỉ"
                    name="address"
                    rules={[{ required: true, message: 'Địa chỉ không được bỏ trống!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Trạng thái"
                    name="active"
                    rules={[{ required: true, message: 'Trạng thái không được bỏ trống!' }]}
                >
                    <Select>
                        <Select.Option value={true}>Hoạt động</Select.Option>
                        <Select.Option value={false}>Tạm khóa</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Quyền hạn"
                    name="roleName"
                    rules={[{ required: true, message: 'Quyền hạn không được bỏ trống!' }]}
                >
                    <Select>
                        <Select.Option value="Admin">Admin</Select.Option>
                        <Select.Option value="User">Customer</Select.Option>
                    </Select>
                </Form.Item>
            </Form>

        </Modal>
    )
}

export default UserUpdate