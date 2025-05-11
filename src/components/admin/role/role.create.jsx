import { Button, Form, Input, InputNumber, Modal, notification, Select } from "antd"
import { useState } from "react";
import { createRoleAPI } from "../../../services/api.service";

const RoleCreate = (props) => {
    const { loadRoles } = props
    const [isModalOpen, setIsModalOpen] = useState(false)

    const [loadingBtn, setLoadingBtn] = useState(false)

    const [form] = Form.useForm()

    const handleCreateRole =  (values) => {
        alert("create")
        // setLoadingBtn(true)

        // const { Rolename, email, password, fullName, phoneNumber, address, roleName } = values

        // const resCreateRole = await createRoleAPI(
        //     Rolename, email, password, fullName, phoneNumber, address, roleName
        // )

        // if (resCreateRole.data) {
        //     resetAndCloseModal()
        //     await loadRoles()
        //     notification.success({
        //         message: "Thêm người dùng",
        //         description: "Thêm người dùng mới thành công"
        //     })
        // } else {
        //     notification.error({
        //         message: "Lỗi thêm mới người dùng",
        //         description: JSON.stringify(resCreateRole.message)
        //     })
        // }

        // setLoadingBtn(false)
    }


    const resetAndCloseModal = () => {
        setIsModalOpen(false)
        form.resetFields()
    }

    return (
        <div style={{ margin: "10px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>Quản lý Vai trò</h2>
                <Button type="primary" onClick={() => setIsModalOpen(true)}>Tạo mới</Button>
            </div>
            <Modal title="Tạo mới vai trò" maskClosable={false} okText="Thêm" cancelText="Hủy"
                open={isModalOpen}
                onOk={() => form.submit()}
                okButtonProps={{
                    loading: loadingBtn
                }}
                onCancel={resetAndCloseModal}
            >
                <Form
                    layout="vertical"
                    onFinish={handleCreateRole}
                    form={form}
                >
                    <Form.Item
                        label="Tên đăng nhập"
                        name="Rolename"
                        // rules={[
                        //     { required: true, message: 'Tên đăng nhập không được bỏ trống!' }
                        // ]}
                    >
                        <Input />
                    </Form.Item>

                </Form>
            </Modal>
        </div>
    )
}

export default RoleCreate