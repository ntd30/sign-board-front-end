import { Button, Col, Form, Input, InputNumber, Modal, notification, Row, Select } from "antd"
import { lazy, useState } from "react";
import { createPermissionAPI } from "../../../services/api.service";
import { ALL_MODULES } from "../../../config/permission";

const PermissionCreate = (props) => {
    const { loadPermissions } = props
    const [isModalOpen, setIsModalOpen] = useState(false)

    const [loadingBtn, setLoadingBtn] = useState(false)

    const [form] = Form.useForm()

    const handleCreatePermission = async (values) => {
        setLoadingBtn(true)

        const { name, apiPath, method, module } = values

        const resCreatePermission = await createPermissionAPI(
            name, apiPath, method, module
        )

        if (resCreatePermission.data) {
            resetAndCloseModal()
            await loadPermissions()
            notification.success({
                message: "Thêm Quyền hạn",
                description: "Thêm Quyền hạn mới thành công"
            })
        } else {
            notification.error({
                message: "Lỗi thêm mới Quyền hạn",
                description: JSON.stringify(resCreatePermission.message)
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
                <h2>Quản lý Quyền hạn</h2>
                <Button type="primary" onClick={() => setIsModalOpen(true)}>Tạo mới</Button>
            </div>
            <Modal title="Tạo mới quyền hạn" maskClosable={false} okText="Thêm" cancelText="Hủy"
                open={isModalOpen}
                onOk={() => form.submit()}
                okButtonProps={{ loading: loadingBtn }}
                onCancel={resetAndCloseModal}
                width={900}
            >
                <Form
                    layout="vertical"
                    onFinish={handleCreatePermission}
                    form={form}
                >
                    <Row gutter={16}>
                        <Col lg={12} md={12} sm={24} xs={24}>
                            <Form.Item
                                label="Tên Quyền hạn"
                                name="name"
                                rules={[
                                    { required: true, message: 'Tên quyền hạn không được bỏ trống!' }
                                ]}
                            >
                                <Input placeholder="Nhập tên" />
                            </Form.Item>
                        </Col>

                        <Col lg={12} md={12} sm={24} xs={24}>
                            <Form.Item
                                label="API Path"
                                name="apiPath"
                                rules={[
                                    { required: true, message: 'API Path không được bỏ trống!' }
                                ]}
                            >
                                <Input placeholder="Nhập api path" />
                            </Form.Item>
                        </Col>

                        <Col lg={12} md={12} sm={24} xs={24}>
                            <Form.Item
                                label="Phương thức"
                                name="method"
                                rules={[{
                                    required: true, message: 'Phương thức không được bỏ trống'
                                }]}
                            >
                                <Select placeholder="Nhập phương thức">
                                    <Select.Option value="GET">GET</Select.Option>
                                    <Select.Option value="POST">POST</Select.Option>
                                    <Select.Option value="PUT">PUT</Select.Option>
                                    <Select.Option value="DELETE">DELETE</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col lg={12} md={12} sm={24} xs={24}>
                            <Form.Item
                                label="Thuộc Module"
                                name="module"
                                rules={[
                                    { required: true, message: 'Module không được bỏ trống!' }
                                ]}
                            >
                                <Select options={ALL_MODULES} placeholder="Nhập module" />
                            </Form.Item>
                        </Col>

                    </Row>

                </Form>
            </Modal>
        </div>
    )
}

export default PermissionCreate