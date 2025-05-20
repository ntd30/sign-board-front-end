import { Button, Card, Col, Form, Input, Modal, notification, Row, Switch } from "antd";
import { useEffect, useState } from "react";
import ModuleApi from "./module.api";
import { ganNhieuQuyenChoVaiTro, goNhieuQuyenChoVaiTro, updateRoleAPI } from "../../../services/api.service";

const { TextArea } = Input;

const RoleUpdate = ({ isUpdateOpen, setIsUpdateOpen, dataUpdate, setDataUpdate, loadRoles }) => {
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [form] = Form.useForm();
    const [permissionIds, setPermissionIds] = useState([]);
    const [listPermissionDeletes, setListPermissionDeletes] = useState([]);

    useEffect(() => {
        if (dataUpdate && dataUpdate.id) {
            form.setFieldsValue({
                id: dataUpdate.id,
                name: dataUpdate.name,
                description: dataUpdate.description,
                active: dataUpdate.active,
            });
            const permissions = dataUpdate.permissions || [];
            setPermissionIds(permissions.map((perm) => perm.id));
            setListPermissionDeletes([]); // Reset deletes on load
        }
    }, [dataUpdate, form]);

    const handleUpdateRole = async (values) => {
        setLoadingBtn(true);
        try {
            const { name, description, active } = values;
            const roleId = Number(dataUpdate.id); // Ensure roleId is a number
            const res = await updateRoleAPI(roleId, name, active, description);

            if (res.data) {
                let assignSuccess = true;
                let revokeSuccess = true;

                // Assign permissions
                if (permissionIds.length > 0) {
                    const validPermissionIds = permissionIds.map(Number); // Ensure IDs are numbers
                    const resAssignPermissions = await ganNhieuQuyenChoVaiTro(roleId, validPermissionIds);
                    if (!resAssignPermissions) {
                        assignSuccess = false;
                        notification.error({
                            message: "Lỗi gán quyền",
                            description: "Không thể gán các quyền cho vai trò",
                        });
                    }
                }

                // Revoke permissions
                if (listPermissionDeletes.length > 0) {
                    const validDeleteIds = listPermissionDeletes.map(Number); // Ensure IDs are numbers
                    // console.log("listdele", listPermissionDeletes)
                    // console.log("validde", validDeleteIds)
                    const resRevokePermissions = await goNhieuQuyenChoVaiTro(roleId, validDeleteIds);
                    if (!resRevokePermissions) {
                        revokeSuccess = false;
                        notification.error({
                            message: "Lỗi gỡ quyền",
                            description: "Không thể gỡ các quyền khỏi vai trò",
                        });
                    }
                }

                if (assignSuccess && revokeSuccess) {
                    resetAndCloseModal();
                    await loadRoles();
                    notification.success({
                        message: "Cập nhật Vai trò",
                        description: "Cập nhật vai trò và quyền thành công",
                    });
                } else {
                    notification.warning({
                        message: "Cập nhật Vai trò",
                        description: "Cập nhật vai trò thành công, nhưng có lỗi khi gán hoặc gỡ quyền",
                    });
                }
            }
        } catch (error) {
            notification.error({
                message: "Lỗi Cập nhật Vai trò",
                description: error.response?.data?.message || error.message || "Đã xảy ra lỗi không xác định",
            });
        } finally {
            setLoadingBtn(false);
        }
    };

    const resetAndCloseModal = () => {
        form.resetFields();
        setPermissionIds([]);
        setListPermissionDeletes([]);
        setIsUpdateOpen(false);
        setDataUpdate(null);
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
                                    listPermissionDeletes={listPermissionDeletes}
                                    setListPermissionDeletes={setListPermissionDeletes}
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