import { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { Button, Col, Form, Input, Modal, notification, Row, Select, Upload, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { createArticleCategoryAPI } from "../../../services/api.service";

const { TextArea } = Input;

const ArticleCategoryCreate = (props) => {
    const { loadArticleCategories, dataParentCategories, getParentCategoriesSelect } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [form] = Form.useForm();
    const [previewImage, setPreviewImage] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (getParentCategoriesSelect) {
            getParentCategoriesSelect().catch(error => {
                console.error("Error loading parent categories:", error);
            });
        }
    }, [getParentCategoriesSelect]);

    // Xử lý khi chọn ảnh
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log('Selected file:', file);
            
            // Kiểm tra kích thước (tối đa 5MB)
            if (file.size > 5 * 1024 * 1024) {
                notification.error({
                    message: "Ảnh quá lớn",
                    description: "Vui lòng chọn ảnh nhỏ hơn 5MB"
                });
                return;
            }

            // Kiểm tra định dạng file
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
                setPreviewImage(base64String);
                form.setFieldsValue({ image64: base64String });
                
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

    const handleCreateArticleCategory = async (values) => {
        setLoadingBtn(true);

        const { name, parentId, description, image64 } = values;
        console.log("Creating article category with data:", { name, parentId, description, hasImage: !!image64 });

        try {
            // Create FormData to handle file upload
            const formData = new FormData();
            formData.append('name', name);
            if (parentId) formData.append('parentId', parentId);
            if (description) formData.append('description', description);
            
            // If we have a base64 image, add it to form data
            if (image64) {
                // Convert base64 to blob
                const blob = await fetch(image64).then(res => res.blob());
                const file = new File([blob], 'category-image.jpg', { type: 'image/jpeg' });
                formData.append('image', file);
            }

            console.log('Sending form data:', Object.fromEntries(formData.entries()));
            
            // Call the API with FormData
            const URL_BACKEND = "/api/admin/article-categories";
            const res = await axios.post(URL_BACKEND, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            console.log("Create API Response:", res);

            if (res && (res.data || res.id || res.name)) {
                if (getParentCategoriesSelect) {
                    await getParentCategoriesSelect();
                }
                await loadArticleCategories();
                resetAndCloseModal();
                notification.success({
                    message: "Thêm danh mục bài viết",
                    description: "Thêm danh mục bài viết mới thành công"
                });
            } else {
                throw new Error(res?.message || "Không có dữ liệu trả về");
            }
        } catch (error) {
            console.error("Error creating article category:", error);
            let errorMessage = "Thêm danh mục bài viết mới thất bại";

            if (error.response?.data?.message?.includes("Maximum category depth exceeded")) {
                errorMessage = "Không thể tạo danh mục. Chỉ hỗ trợ tối đa 3 cấp danh mục (Cấp 0 → Cấp 1 → Cấp 2)";
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }

            notification.error({
                message: "Lỗi thêm mới danh mục bài viết",
                description: errorMessage
            });
        } finally {
            setLoadingBtn(false);
        }
    };

    const resetAndCloseModal = () => {
        setIsModalOpen(false);
        form.resetFields();
        setPreviewImage(null); // Xóa preview
    };

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
                okButtonProps={{ loading: loadingBtn }}
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
                                rules={[{ required: true, message: 'Vui lòng không bỏ trống!' }]}
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
                                        <Select.Option key={category.value} value={category.value}>
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
                                rules={[{ required: true, message: 'Vui lòng không bỏ trống!' }]}
                            >
                                <TextArea
                                    placeholder="Nhập mô tả danh mục bài viết"
                                    rows={4}
                                />
                            </Form.Item>
                        </Col>

                        {/* Ô tải ảnh lên */}
                        <Col span={24}>
                            <Form.Item
                                label="Ảnh đại diện (không bắt buộc)"
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
        </div>
    );
};

// Export as both named and default for compatibility
export { ArticleCategoryCreate };
export default ArticleCategoryCreate;