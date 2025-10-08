import { useEffect, useState } from "react";
import { Button, Col, Form, Input, Modal, notification, Row, Select } from "antd"
import { createArticleCategoryAPI } from "../../../services/api.service";

const { TextArea } = Input

const ArticleCategoryCreate = (props) => {
    const { loadArticleCategories, dataParentCategories, getParentCategoriesSelect } = props
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [loadingBtn, setLoadingBtn] = useState(false)
    const [form] = Form.useForm()

    useEffect(() => {
        if (getParentCategoriesSelect) {
            getParentCategoriesSelect().catch(error => {
                console.error("Error loading parent categories:", error)
            })
        }
    }, [getParentCategoriesSelect])

    const handleCreateArticleCategory = async (values) => {
        setLoadingBtn(true)

        const { name, parentId, description } = values
        console.log("Creating article category with data:", { name, parentId, description })

        try {
            const res = await createArticleCategoryAPI(
                name,
                parentId || undefined, // Convert null to undefined so API service doesn't include it
                description
            )
            console.log("Create API Response:", res)

            if (res && (res.data || res.id || res.name)) {
                if (getParentCategoriesSelect) {
                    await getParentCategoriesSelect()
                }
                await loadArticleCategories()
                resetAndCloseModal()
                notification.success({
                    message: "Thêm danh mục bài viết",
                    description: "Thêm danh mục bài viết mới thành công"
                })
            } else {
                throw new Error(res?.message || "Không có dữ liệu trả về")
            }
        } catch (error) {
            console.error("Error creating article category:", error)
            let errorMessage = "Thêm danh mục bài viết mới thất bại"

            if (error.response?.data?.message?.includes("Maximum category depth exceeded")) {
                errorMessage = "Không thể tạo danh mục. Chỉ hỗ trợ tối đa 3 cấp danh mục (Cấp 0 → Cấp 1 → Cấp 2)"
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message
            } else if (error.message) {
                errorMessage = error.message
            }

            notification.error({
                message: "Lỗi thêm mới danh mục bài viết",
                description: errorMessage
            })
        } finally {
            setLoadingBtn(false)
        }
    }

    const resetAndCloseModal = () => {
        setIsModalOpen(false)
        form.resetFields()
    }

    const filterOption = (input, option) => {
        return (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    };

    return (
        <div style={{ margin: "10px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <h2>Quản lý danh mục bài viết</h2>
                    <p style={{ color: "#666", fontSize: "14px", margin: "5px 0" }}>
                        Quản lý danh mục cho bài viết/tin tức - Hỗ trợ cấu trúc cây phân cấp
                    </p>
                </div>
                <Button type="primary" onClick={() => setIsModalOpen(true)}>
                    Tạo mới danh mục bài viết
                </Button>
            </div>
            
            <Modal 
                title="Tạo mới danh mục bài viết" 
                maskClosable={false} 
                okText="Thêm" 
                cancelText="Hủy"
                open={isModalOpen}
                onOk={() => form.submit()}
                okButtonProps={{
                    loading: loadingBtn
                }}
                onCancel={resetAndCloseModal}
                width={800}
            >
                <Form
                    layout="vertical"
                    onFinish={handleCreateArticleCategory}
                    form={form}
                >
                    <Row gutter={16}>
                        <Col lg={12} md={12} sm={24} xs={24}>
                            <Form.Item
                                label="Tên danh mục bài viết"
                                name="name"
                                rules={[
                                    { required: true, message: 'Vui lòng không bỏ trống!' }
                                ]}
                            >
                                <Input placeholder="Nhập tên danh mục bài viết" />
                            </Form.Item>
                        </Col>

                        <Col lg={12} md={12} sm={24} xs={24}>
                            <Form.Item
                                label="Danh mục cha (không bắt buộc)"
                                name="parentId"
                            >
                                <Select
                                    showSearch
                                    placeholder="Chọn danh mục cha"
                                    optionFilterProp="children"
                                    filterOption={filterOption}
                                    allowClear
                                >
                                    {dataParentCategories.map(category => (
                                        <Select.Option 
                                            key={category.value} 
                                            value={category.value}
                                        >
                                            {category.label}
                                        </Select.Option>
                                    ))}
                                </Select>
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
                                <TextArea 
                                    placeholder="Nhập mô tả danh mục bài viết"
                                    rows={4}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    )
}

export default ArticleCategoryCreate
