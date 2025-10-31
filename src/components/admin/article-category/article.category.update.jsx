import { Button, Col, Form, Input, Modal, notification, Row, Select, Upload, Image } from "antd"
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState, useRef } from "react";
import { updateArticleCategoryAPI, fetchArticleCategoryTreeAPI } from "../../../services/api.service";

const { TextArea } = Input

const ArticleCategoryUpdate = (props) => {
    const { isUpdateOpen, setIsUpdateOpen, dataUpdate, loadArticleCategories } = props
    const [loadingBtn, setLoadingBtn] = useState(false)
    const [dataParentCategories, setDataParentCategories] = useState([])
    const [previewImage, setPreviewImage] = useState(null);
    const [form] = Form.useForm()
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (isUpdateOpen && dataUpdate) {
            console.log('Setting up form with data:', dataUpdate);
            // Set form fields when modal opens
            const formValues = {
                name: dataUpdate.name,
                parentId: dataUpdate.parentId || null,
                description: dataUpdate.description || '',
                image64: dataUpdate.image64 || undefined
            };
            
            form.setFieldsValue(formValues);
            
            // Set preview image if exists
            if (dataUpdate.image64) {
                console.log('Setting preview image from dataUpdate');
                // Kiểm tra xem image64 đã có tiền tố data:image/ chưa
                const imageSrc = dataUpdate.image64.startsWith('data:image/') 
                    ? dataUpdate.image64 
                    : `data:image/jpeg;base64,${dataUpdate.image64}`;
                setPreviewImage(imageSrc);
                // Đảm bảo form cũng có giá trị image64 chính xác
                form.setFieldsValue({ image64: dataUpdate.image64 });
            } else {
                console.log('No image in dataUpdate');
                setPreviewImage(null);
                form.setFieldsValue({ image64: null });
            }
            
            getParentCategoriesSelect();
        } else if (!isUpdateOpen) {
            // Reset form and preview when modal is closed
            form.resetFields();
            setPreviewImage(null);
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

    // Handle image selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log('Selected file:', file);
            
            // Check file size (optional: < 5MB)
            if (file.size > 5 * 1024 * 1024) {
                notification.error({
                    message: "Ảnh quá lớn",
                    description: "Vui lòng chọn ảnh nhỏ hơn 5MB"
                });
                return;
            }

            // Check file type
            if (!file.type.match('image.*')) {
                notification.error({
                    message: "Định dạng không hợp lệ",
                    description: "Vui lòng chọn file ảnh (JPEG, PNG, etc.)"
                });
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                const base64String = event.target.result;
                console.log('Image loaded successfully, setting preview and form value');
                // Lưu cả base64 đầy đủ vào form để gửi lên server
                form.setFieldsValue({ image64: base64String });
                // Hiển thị ảnh preview
                setPreviewImage(base64String);
                
                // Log the current form values for debugging
                form.validateFields()
                    .then(values => console.log('Current form values:', values))
                    .catch(err => console.log('Form validation error:', err));
            };
            reader.onerror = (error) => {
                console.error("Error reading file:", error);
                notification.error({
                    message: "Lỗi",
                    description: "Không thể đọc file ảnh"
                });
            };
            reader.readAsDataURL(file);
        } else {
            console.log('No file selected or file selection cancelled');
        }
    };

    const handleUpdateArticleCategory = async (values) => {
        if (!dataUpdate?.id) return;
        
        setLoadingBtn(true);
        const { name, parentId, description, image64 } = values;
        console.log("Updating article category:", { id: dataUpdate.id, name, parentId, description, hasImage: !!image64 });

        try {
            // Create the update data object with the correct structure
            const updateData = {
                name,
                description,
                image64: image64 || null,
                parentId: parentId || null,
                isActive: dataUpdate.isActive !== undefined ? dataUpdate.isActive : true
            };

            console.log("Sending update data:", updateData);
            
            const res = await updateArticleCategoryAPI(dataUpdate.id, updateData);
            console.log("Update API Response:", res);

            if (res && (res.data || res.id)) {
                await loadArticleCategories();
                resetAndCloseModal();
                notification.success({
                    message: "Cập nhật danh mục bài viết",
                    description: "Cập nhật danh mục bài viết thành công"
                });
            } else {
                throw new Error(res?.message || "Không có dữ liệu trả về");
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
        setPreviewImage(null)
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
                            {
                                required: true,
                                message: 'Vui lòng nhập mô tả!',
                            },
                        ]}
                    >
                        <TextArea rows={4} />
                    </Form.Item>

                    <Form.Item
                        label="Ảnh đại diện"
                        name="image64"
                    >
                        <div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ display: 'none' }}
                            />
                            <Button 
                                icon={<UploadOutlined />} 
                                style={{ marginBottom: 8 }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    fileInputRef.current?.click();
                                }}
                            >
                                Chọn ảnh
                            </Button>
                            {previewImage ? (
                                <div style={{ marginTop: 8 }}>
                                    <Image
                                        src={previewImage}
                                        alt="Preview"
                                        style={{ 
                                            maxWidth: '100%', 
                                            maxHeight: '200px',
                                            border: '1px solid #d9d9d9',
                                            borderRadius: '4px',
                                            padding: '4px',
                                            objectFit: 'contain'
                                        }}
                                        preview={false}
                                        onError={(e) => {
                                            console.error('Error loading image:', e);
                                            notification.error({
                                                message: 'Lỗi tải ảnh',
                                                description: 'Không thể tải ảnh. Vui lòng thử lại hoặc chọn ảnh khác.'
                                            });
                                        }}
                                    />
                                    <div style={{ marginTop: 8, textAlign: 'center' }}>
                                        <Button 
                                            type="link" 
                                            danger 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setPreviewImage(null);
                                                form.setFieldsValue({ image64: null });
                                            }}
                                        >
                                            Xóa ảnh
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div style={{ 
                                    marginTop: 8, 
                                    padding: '16px', 
                                    textAlign: 'center',
                                    border: '1px dashed #d9d9d9',
                                    borderRadius: '4px',
                                    color: '#8c8c8c'
                                }}>
                                    Chưa có ảnh nào được chọn
                                </div>
                            )}
                        </div>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}

export default ArticleCategoryUpdate
