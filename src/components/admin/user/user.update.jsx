import { Form, Input, InputNumber, Modal, notification, Select } from "antd"
import { useEffect, useState } from "react"
import { updateUserAPI } from "../../../services/api.service"

const UserUpdate = (props) => {
    // const { isUpdateOpen, setIsUpdateOpen, dataUpdate, setDataUpdate, loadUsers } = props
    const { isUpdateOpen, setIsUpdateOpen, dataUpdate, loadUsers } = props
    const [loadingBtn, setLoadingBtn] = useState(false)
    const [form] = Form.useForm()

    useEffect(() => {
        if (dataUpdate && dataUpdate._id) {
            form.setFieldsValue({
                id: dataUpdate._id,
                email: dataUpdate.email,
                fullName: dataUpdate.fullName,
                phone: dataUpdate.phone
            })
        }
    }, [dataUpdate])

    const handleUpdateUser = async (values) => {
        setLoadingBtn(true)

        const { id, email, fullName, phone } = values
        const res = await updateUserAPI(id, email, fullName, phone)

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
                <Form.Item
                    label="Id"
                    name="id"
                >
                    <Input disabled />
                </Form.Item>

                <Form.Item
                    label="Tên đầy đủ"
                    name="fullName"
                    rules={[
                        { required: true, message: 'Tên đầy đủ không được bỏ trống!' }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Số điện thoại"
                    name="phone"
                    rules={[
                        { required: true, message: 'Price không được bỏ trống!' }
                    ]}
                >
                    <Input />
                </Form.Item>

            </Form>
        </Modal>
    )
}

export default UserUpdate