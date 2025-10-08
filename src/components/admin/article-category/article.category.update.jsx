import { Col, Form, Input, Modal, notification, Row, Select } from "antd"
import { useEffect, useState } from "react";
import { updateArticleCategoryAPI, fetchArticleCategoryTreeAPI } from "../../../services/api.service";

const { TextArea } = Input

const ArticleCategoryUpdate = (props) => {
    const { isUpdateOpen, setIsUpdateOpen, dataUpdate, loadArticleCategories } = props
    const [loadingBtn, setLoadingBtn] = useState(false)
    const [dataParentCategories, setDataParentCategories] = useState([])
    const [form] = Form.useForm()

    useEffect(() => {
        if (isUpdateOpen && dataUpdate) {
            // Set form fields when modal opens
            form.setFieldsValue({
                name: dataUpdate.name,
                parentId: dataUpdate.parentId,
                description: dataUpdate.description
            });
            getParentCategoriesSelect();
        }
    }, [isUpdateOpen, dataUpdate]);

    const getParentCategoriesSelect = async () => {
        try {
            const res = await fetchArticleCategoryTreeAPI()
            if (res.data) {
                // Convert tree structure to flat select options, excluding current category and its children
                const flattenCategories = (categories, level = 0, excludeId = dataUpdate?.id) => {
                    let options = []
                    categories.forEach((item) => {
                        // Exclude current category and its descendants
                        if (item.id !== excludeId && !isDescendantOf(item, excludeId, categories)) {
                            options.push({
                                value: item.id,
                                label: '—'.repeat(level) + ' ' + item.name,
                                level: level
                            })
                            if (item.children && item.children.length > 0) {
                                options = options.concat(flattenCategories(item.children, level + 1, excludeId))
                            }
                        }
                    })
                    return options
                }
                
                setDataParentCategories(flattenCategories(res.data))
            }
        } catch (error) {
            console.error("Error loading parent categories:", error)
        }
    }

    // Helper function to check if a category is a descendant of another
    const isDescendantOf = (category, ancestorId, allCategories) => {
        if (category.parentId === ancestorId) return true;
        if (category.parentId === null) return false;
        
        const parent = findCategoryById(category.parentId, allCategories);
        return parent ? isDescendantOf(parent, ancestorId, allCategories) : false;
    }

    // Helper function to find category by ID in tree structure
    const findCategoryById = (id, categories) => {
        for (let category of categories) {
            if (category.id === id) return category;
            if (category.children) {
                const found = findCategoryById(id, category.children);
                if (found) return found;
            }
        }
        return null;
    }

    const handleUpdateArticleCategory = async (values) => {
        if (!dataUpdate?.id) return;
        
        setLoadingBtn(true)
        const { name, parentId, description } = values
        console.log("Updating article category:", { id: dataUpdate.id, name, parentId, description })

        try {
            const res = await updateArticleCategoryAPI(
                dataUpdate.id,
                name,
                parentId || null,
                description
            )
            console.log("Update API Response:", res)

            if (res && (res.data || res.id)) {
                await loadArticleCategories()
                resetAndCloseModal()
                notification.success({
                    message: "Cập nhật danh mục bài viết",
                    description: "Cập nhật danh mục bài viết thành công"
                })
            } else {
                throw new Error(res?.message || "Không có dữ liệu trả về")
            }
        } catch (error) {
            console.error("Error updating article category:", error)
            notification.error({
                message: "Lỗi cập nhật danh mục bài viết",
                description: error.response?.data?.message || error.message || "Cập nhật danh mục bài viết thất bại"
            })
        } finally {
            setLoadingBtn(false)
        }
    }

    const resetAndCloseModal = () => {
        setIsUpdateOpen(false)
        form.resetFields()
    }

    const filterOption = (input, option) => {
        return (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    };

    return (
        <Modal 
            title="Cập nhật danh mục bài viết" 
            maskClosable={false} 
            okText="Cập nhật" 
            cancelText="Hủy"
            open={isUpdateOpen}
            onOk={() => form.submit()}
            okButtonProps={{
                loading: loadingBtn
            }}
            onCancel={resetAndCloseModal}
            width={800}
        >
            <Form
                layout="vertical"
                onFinish={handleUpdateArticleCategory}
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
    )
}

export default ArticleCategoryUpdate
