import { Button, Card, Col, Form, Input, InputNumber, Modal, notification, Row, Select, Switch } from "antd"
import { useEffect, useState } from "react"
import { ALL_MODULES } from "../../../config/permission"
import ModuleApi from "./module.api"
import { fetchRoleByIdAPI } from "../../../services/api.service"
// import { updateRoleAPI } from "../../../services/api.service"

const { TextArea } = Input

const RoleUpdate = (props) => {
    const { isUpdateOpen, setIsUpdateOpen, dataUpdate, loadRoles } = props
    const [loadingBtn, setLoadingBtn] = useState(false)
    const [form] = Form.useForm()
    const [permissionIds, setPermissionIds] = useState([])

    useEffect(() => {
        if (dataUpdate && dataUpdate.id) {
            form?.setFieldsValue({
                id: dataUpdate.id,
                name: dataUpdate.name,
                description: dataUpdate.description,
                active: dataUpdate.active
            })
        }
    }, [dataUpdate])

    const handleUpdateRole = async (values) => {
        setLoadingBtn(true)
        const { name, apiPath, method, module } = values
        const res = await updateRoleAPI(dataUpdate.id, name, apiPath, method, module)

        if (res.data) {
            resetAndCloseModal()
            await loadRoles()
            notification.success({
                message: "Cập nhật Vai trò",
                description: "Cập nhật Vai trò thành công"
            })
        } else {
            notification.error({
                message: "Lỗi Cập nhật Vai trò",
                description: JSON.stringify(res.message)
            })
        }
        setLoadingBtn(false)
    }

    const resetAndCloseModal = () => {
        setIsUpdateOpen(false)
    }

    return (
        <Modal title="Cập nhật Vai trò" maskClosable={false} okText="Lưu" cancelText="Hủy"
            open={isUpdateOpen}
            onOk={() => form.submit()}
            okButtonProps={{ loading: loadingBtn }}
            onCancel={resetAndCloseModal}
            width={900}
        >
            <Form
                layout="vertical"
                onFinish={handleUpdateRole}
                form={form}
            >
                <Row gutter={16}>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <Form.Item
                            label="Tên Vai trò"
                            name="name"
                            rules={[
                                { required: true, message: 'Tên Vai trò không được bỏ trống!' }
                            ]}
                        >
                            <Input placeholder="Nhập tên" />
                        </Form.Item>
                    </Col>

                    <Col lg={12} md={12} sm={24} xs={24}>
                        <Form.Item
                            label="Trạng thái"
                            name="active"
                            initialValue={true}
                        >
                            <Switch checkedChildren="ACTIVE" unCheckedChildren="INACTIVE" defaultChecked />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item
                            label="Mô tả"
                            name="description"
                            rules={[
                                { required: true, message: 'Mô tả không được bỏ trống!' }
                            ]}
                        >
                            <TextArea placeholder="Nhập mô tả" />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item name="permissions" valuePropName="checked" initialValue={false}>
                            <Card
                                title="Quyền hạn - Các quyền hạn được phép cho vai trò này"
                                size="small"
                            >
                                <ModuleApi
                                    permissionIds={permissionIds}
                                    setPermissionIds={setPermissionIds}
                                />
                            </Card>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>

        </Modal>
    )
}

export default RoleUpdate