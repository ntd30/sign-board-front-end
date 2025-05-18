import { Button, Card, Col, Form, Input, Modal, notification, Row, Switch } from "antd";
import { useEffect, useState } from "react";
import ModuleApi from "./module.api";
import { fetchRoleByIdAPI } from "../../../services/api.service";

const { TextArea } = Input;

const RoleUpdate = (props) => {
    const { isUpdateOpen, setIsUpdateOpen, dataUpdate, loadRoles } = props;
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [form] = Form.useForm();
    const [permissionIds, setPermissionIds] = useState([]);

    useEffect(() => {
        if (dataUpdate && dataUpdate.id) {
            // Fetch role details including permissions
            const fetchRoleDetails = async () => {
                try {
                    const res = await fetchRoleByIdAPI(dataUpdate.id);
                    console.log("resrole", res)
                    if (res.data) {
                        form.setFieldsValue({
                            id: res.data.id,
                            name: res.data.name,
                            description: res.data.description,
                            active: res.data.active,
                        });
                        // Set permissionIds from the role's permissions
                        const permissions = res.data.permissions || [];
                        setPermissionIds(permissions.map((perm) => perm.id));
                    }
                } catch (error) {
                    notification.error({
                        message: "Lỗi khi lấy chi tiết Vai trò",
                        description: error.message,
                    });
                }
            };
            fetchRoleDetails();
        }
    }, [dataUpdate, form]);

    const handleUpdateRole = async (values) => {
        setLoadingBtn(true);
        // try {
        //     const { name, description, active } = values;
        //     const res = await updateRoleAPI(dataUpdate.id, {
        //         name,
        //         description,
        //         active,
        //         permissionIds,
        //     });

        //     if (res.data) {
        //         resetAndCloseModal();
        //         await loadRoles();
        //         notification.success({
        //             message: "Cập nhật Vai trò",
        //             description: "Cập nhật Vai trò thành công",
        //         });
        //     } else {
        //         notification.error({
        //             message: "Lỗi Cập nhật Vai trò",
        //             description: JSON.stringify(res.message),
        //         });
        //     }
        // } catch (error) {
        //     notification.error({
        //         message: "Lỗi Cập nhật Vai trò",
        //         description: error.message,
        //     });
        // }
        setLoadingBtn(false);
    };

    const resetAndCloseModal = () => {
        form.resetFields();
        setPermissionIds([]);
        setIsUpdateOpen(false);
    };

    return (
        <Modal
            title="Cập nhật Vai trò"
            maskClosable={false}
            okText="Lưu"
            cancelText="Hủy"
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
                            rules={[{ required: true, message: "Tên Vai trò không được bỏ trống!" }]}
                        >
                            <Input placeholder="Nhập tên" />
                        </Form.Item>
                    </Col>

                    <Col lg={12} md={12} sm={24} xs={24}>
                        <Form.Item
                            label="Trạng thái"
                            name="active"
                            valuePropName="checked"
                            initialValue={true}
                        >
                            <Switch checkedChildren="ACTIVE" unCheckedChildren="INACTIVE" />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item
                            label="Mô tả"
                            name="description"
                            rules={[{ required: true, message: "Mô tả không được bỏ trống!" }]}
                        >
                            <TextArea placeholder="Nhập mô tả" />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item>
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
    );
};

export default RoleUpdate;