import { Button, Form, Input, InputNumber, Modal, notification, Select } from "antd"
import { useEffect, useState } from "react";
import { createUserAPI, fetchAllRolesAPI } from "../../../services/api.service";

const UserCreate = (props) => {
    const { loadUsers } = props
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [loadingBtn, setLoadingBtn] = useState(false)
    const [roles, setRoles] = useState([])

    const [form] = Form.useForm()

    const handleCreateUser = async (values) => {
        setLoadingBtn(true)

        const { username, email, password, fullName, phoneNumber, address, roleId } = values

        console.log("roleid", roleId)

        const resCreateUser = await createUserAPI(
            username, email, password, fullName, phoneNumber, address, roleId === "Customer" ? 2 : roleId
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
                description: JSON.stringify(resCreateUser)
            })
        }

        setLoadingBtn(false)
    }


    const resetAndCloseModal = () => {
        setIsModalOpen(false)
        form.resetFields()
    }

    // Lấy danh sách vai trò
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const res = await fetchAllRolesAPI(1, 100);
                console.log("res", res)
                setRoles(res.data.content);
            } catch (error) {
                notification.error({
                    message: "Lỗi lấy danh sách vai trò",
                    description: error.message || "Không thể lấy danh sách vai trò từ server",
                });
            }
        };
        fetchRoles();
    }, []);

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
                            { required: true, message: 'Vui lòng không được bỏ trống!' },
                            { min: 6, message: 'Mật khẩu phải có tối thiểu 6 ký tự' }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="Tên đầy đủ"
                        name="fullName"
                        rules={[
                            { required: true, message: 'Vui lòng không được bỏ trống!' }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại"
                        name="phoneNumber"
                        rules={[
                            { required: true, message: 'Vui lòng không được bỏ trống!' }
                        ]}
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
                        label="Vai trò"
                        name="roleId"
                        initialValue={"Customer"}
                        rules={[
                            { required: true, message: 'Vui lòng không được bỏ trống!' }
                        ]}
                    >
                        <Select placeholder="Chọn vai trò">
                            {roles.map((role) => (
                                <Select.Option key={role.id} value={role.id} >
                                    {role.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                </Form>
            </Modal>
        </div>
    )
}

export default UserCreate