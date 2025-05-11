import { Button, Col, Form, Input, InputNumber, Modal, notification, Row, Select } from "antd"
import { useEffect, useState } from "react"
import { ALL_MODULES } from "../../../config/permission"
import { updatePermissionAPI } from "../../../services/api.service"

const PermissionUpdate = (props) => {
    const { isUpdateOpen, setIsUpdateOpen, dataUpdate, loadPermissions } = props
    const [loadingBtn, setLoadingBtn] = useState(false)
    const [form] = Form.useForm()

    useEffect(() => {
        if (dataUpdate && dataUpdate.id) {
            form.setFieldsValue({
                id: dataUpdate.id,
                name: dataUpdate.name,
                apiPath: dataUpdate.apiPath,
                method: dataUpdate.method,
                module: dataUpdate.module,
            })
        }
    }, [dataUpdate])

    const handleUpdatePermission = async (values) => {
        setLoadingBtn(true)
        const { name, apiPath, method, module } = values
        const res = await updatePermissionAPI(dataUpdate.id, name, apiPath, method, module)

        if (res.data) {
            resetAndCloseModal()
            await loadPermissions()
            notification.success({
                message: "Cập nhật Quyền hạn",
                description: "Cập nhật Quyền hạn thành công"
            })
        } else {
            notification.error({
                message: "Lỗi Cập nhật Quyền hạn",
                description: JSON.stringify(res.message)
            })
        }
        setLoadingBtn(false)
    }

    const resetAndCloseModal = () => {
        setIsUpdateOpen(false)
    }

    return (
        <Modal title="Cập nhật Quyền hạn" maskClosable={false} okText="Lưu" cancelText="Hủy"
            open={isUpdateOpen}
            onOk={() => form.submit()}
            okButtonProps={{ loading: loadingBtn }}
            onCancel={resetAndCloseModal}
            width={900}
        >
            <Form
                layout="vertical"
                onFinish={handleUpdatePermission}
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
    )
}

export default PermissionUpdate