import { Button, Cascader, Col, Form, Input, InputNumber, Modal, notification, Row, Select } from "antd"
import { useEffect, useState } from "react";
import { createCategoryAPI } from "../../../services/api.service";

const { TextArea } = Input

const CategoryCreate = (props) => {
    const { loadCategories, dataParentCategories, getParentCategoriesSelect } = props
    const [isModalOpen, setIsModalOpen] = useState(false)

    const [loadingBtn, setLoadingBtn] = useState(false)

    const [form] = Form.useForm()

    useEffect(() => {
        getParentCategoriesSelect()
    }, [])

    const handleCreateCategory = async (values) => {
        setLoadingBtn(true)

        const { name, parentCategory, description } = values

        const res = await createCategoryAPI(
            name,
            parentCategory ? { id: parentCategory[0] } : null,
            description
        )

        if (res) {
            await getParentCategoriesSelect()
            await loadCategories()
            resetAndCloseModal()
            notification.success({
                message: "Thêm Danh mục",
                description: "Thêm Danh mục mới thành công"
            })
        } else {
            notification.error({
                message: "Lỗi thêm mới Danh mục",
                description: "Thêm Danh mục mới thất bại"
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
                <h2>Quản lý Danh mục</h2>
                <Button type="primary" onClick={() => setIsModalOpen(true)}>Tạo mới</Button>
            </div>
            <Modal title="Tạo mới Danh mục" maskClosable={false} okText="Thêm" cancelText="Hủy"
                open={isModalOpen}
                onOk={() => form.submit()}
                okButtonProps={{
                    loading: loadingBtn
                }}
                onCancel={resetAndCloseModal}
                width={900}
            >
                <Form
                    layout="vertical"
                    onFinish={handleCreateCategory}
                    form={form}
                >

                    <Row gutter={16}>
                        <Col lg={12} md={12} sm={24} xs={24}>
                            <Form.Item
                                label="Tên Danh mục"
                                name="name"
                                rules={[
                                    { required: true, message: 'Vui lòng không bỏ trống!' }
                                ]}
                            >
                                <Input placeholder="Nhập tên" />
                            </Form.Item>
                        </Col>

                        <Col lg={12} md={12} sm={24} xs={24}>
                            <Form.Item
                                label="Danh mục cha (không bắt buộc)"
                                name="parentCategory"
                            >
                                <Cascader options={dataParentCategories} placeholder="Nhập tên danh mục cha" />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                label="Mô tả"
                                name="description"
                                rules={[
                                    { required: true, message: 'Vui lòng không bỏ trống!' }
                                ]}
                            >
                                <TextArea placeholder="Nhập mô tả" />
                            </Form.Item>
                        </Col>

                    </Row>

                </Form>
            </Modal>
        </div>
    )
}

export default CategoryCreate