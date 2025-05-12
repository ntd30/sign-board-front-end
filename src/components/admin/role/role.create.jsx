import { Button, Card, Col, Form, Input, InputNumber, Modal, notification, Row, Select, Switch } from "antd"
import ModuleApi from "./module.api"
import { useState } from "react"

const { TextArea } = Input

const RoleCreate = (props) => {
  const { loadRoles } = props
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loadingBtn, setLoadingBtn] = useState(false)
  const [permissionIds, setPermissionIds] = useState([])

  const [form] = Form.useForm()

  const handleCreateRole = (values) => {
    setLoadingBtn(true)

    const { name, active, description } = values

    console.log("name", name)
    console.log("active", active)
    console.log("description", description)
    console.log("permissionIds", permissionIds)

    // const { name, apiPath, method, module } = values

    // const resCreateRole = await createRoleAPI(
    //     name, apiPath, method, module
    // )

    // if (resCreateRole.data) {
    //     resetAndCloseModal()
    //     await loadRoles()
    //     notification.success({
    //         message: "Thêm Vai trò",
    //         description: "Thêm Vai trò mới thành công"
    //     })
    // } else {
    //     notification.error({
    //         message: "Lỗi thêm mới Vai trò",
    //         description: JSON.stringify(resCreateRole.message)
    //     })
    // }

    setLoadingBtn(false)
    resetAndCloseModal()
  }

  const resetAndCloseModal = () => {
    setIsModalOpen(false)
    form.resetFields()
    setPermissionIds([])
  }

  return (
    <div style={{ margin: "10px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Quản lý Vai trò</h2>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>Tạo mới</Button>
      </div>
      <Modal title="Tạo mới Vai trò" maskClosable={false} okText="Thêm" cancelText="Hủy"
        open={isModalOpen}
        onOk={() => form.submit()}
        okButtonProps={{ loading: loadingBtn }}
        onCancel={resetAndCloseModal}
        width={900}
      >
        <Form
          layout="vertical"
          onFinish={handleCreateRole}
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
    </div >
  )
}

export default RoleCreate