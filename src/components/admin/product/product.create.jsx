import { Button, Cascader, Col, Form, Input, InputNumber, Modal, notification, Row, Upload } from "antd";
import { useEffect, useState } from "react";
import { createProductAPI } from "../../../services/api.service";
import { PlusOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ProductCreate = (props) => {
    const { loadProducts, dataCategories, getCategoriesSelect } = props;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [description, setDescription] = useState('');

    useEffect(() => {
        getCategoriesSelect();
    }, []);

    const handleCreateProduct = async (values) => {
        setLoadingBtn(true);

        const { name, categoryId, length, width, height } = values;

        const formData = new FormData();
        formData.append("name", name);
        formData.append("slug", name.toLowerCase().replace(/\s+/g, "-"));
        formData.append("description", description);
        formData.append("dimensions", `${length}x${width}x${height}`);
        formData.append("categoryId", categoryId[categoryId.length - 1]); // Take the last ID in the category chain

        // Add temporary price fields
        formData.append("price", "0");
        formData.append("discount", "0");
        formData.append("discountPrice", "0");

        // Add materialIds if available (e.g., from a checkbox or multi-select)
        const materialIds = []; // Replace with actual data if available
        materialIds.forEach((id) => {
            formData.append("materialIds", id);
        });

        // Add images
        fileList.forEach((file) => {
            formData.append("images", file.originFileObj);
        });

        try {
            const resCreateProduct = await createProductAPI(formData);

            if (resCreateProduct.data) {
                resetAndCloseModal();
                await loadProducts();
                notification.success({
                    message: "Thêm Sản phẩm",
                    description: "Thêm Sản phẩm mới thành công",
                });
            } else {
                notification.error({
                    message: "Lỗi thêm mới Sản phẩm",
                    description: resCreateProduct.message || "Lỗi không xác định",
                });
            }
        } catch (error) {
            notification.error({
                message: "Lỗi thêm mới Sản phẩm",
                description: error.message || "Đã xảy ra lỗi khi tạo sản phẩm",
            });
        }

        setLoadingBtn(false);
    };

    const resetAndCloseModal = () => {
        setIsModalOpen(false);
        form.resetFields();
        setFileList([]);
        setDescription('');
    };

    const handleUploadChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Tải lên</div>
        </div>
    );

    return (
        <div style={{ margin: "10px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>Quản lý Sản phẩm</h2>
                <Button type="primary" onClick={() => setIsModalOpen(true)}>Tạo mới</Button>
            </div>
            <Modal
                title="Tạo mới Sản phẩm"
                maskClosable={false}
                okText="Thêm"
                cancelText="Hủy"
                open={isModalOpen}
                onOk={() => form.submit()}
                okButtonProps={{
                    loading: loadingBtn,
                }}
                onCancel={resetAndCloseModal}
                width={900}
            >
                <Form layout="vertical" onFinish={handleCreateProduct} form={form}>
                    <Row gutter={16}>
                        <Col lg={12} md={12} sm={24} xs={24}>
                            <Form.Item
                                label="Tên Sản phẩm"
                                name="name"
                                rules={[{ required: true, message: 'Vui lòng không bỏ trống!' }]}
                            >
                                <Input placeholder="Nhập tên" />
                            </Form.Item>
                        </Col>

                        <Col lg={12} md={12} sm={24} xs={24}>
                            <Form.Item
                                label="Thuộc Danh mục"
                                name="categoryId"
                                rules={[{ required: true, message: 'Vui lòng không bỏ trống!' }]}
                            >
                                <Cascader options={dataCategories} placeholder="Nhập tên danh mục" />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                label="Mô tả"
                                name="description"
                                rules={[{ required: true, message: 'Vui lòng không bỏ trống!' }]}
                            >
                                <ReactQuill
                                    theme="snow"
                                    value={description}
                                    onChange={(value) => {
                                        setDescription(value);
                                        form.setFieldsValue({ description: value });
                                    }}
                                    placeholder="Nhập mô tả"
                                    modules={{
                                        toolbar: [
                                            [{ header: [1, 2, false] }],
                                            ['bold', 'italic', 'underline', 'strike'],
                                            [{ list: 'ordered' }, { list: 'bullet' }],
                                            ['link', 'image'],
                                            ['clean'],
                                        ],
                                    }}
                                    formats={[
                                        'header',
                                        'bold',
                                        'italic',
                                        'underline',
                                        'strike',
                                        'list',
                                        'bullet',
                                        'link',
                                        'image',
                                    ]}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={24} style={{ marginBottom: 10 }}>
                            <label>Kích thước</label>
                        </Col>

                        <Col lg={8} md={8} sm={24} xs={24}>
                            <Form.Item
                                label="Dài"
                                name="length"
                                rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                            >
                                <InputNumber min={0} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>

                        <Col lg={8} md={8} sm={24} xs={24}>
                            <Form.Item
                                label="Rộng"
                                name="width"
                                rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                            >
                                <InputNumber min={0} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>

                        <Col lg={8} md={8} sm={24} xs={24}>
                            <Form.Item
                                label="Cao"
                                name="height"
                                rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                            >
                                <InputNumber min={0} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                label="Hình ảnh"
                                name="images"
                                rules={[{ required: true, message: 'Vui lòng tải lên ít nhất một hình ảnh!' }]}
                                validateStatus={fileList.length === 0 ? 'error' : ''}
                                help={fileList.length === 0 ? 'Vui lòng tải lên ít nhất một hình ảnh!' : ''}
                            >
                                <Upload
                                    listType="picture-card"
                                    fileList={fileList}
                                    onChange={handleUploadChange}
                                    multiple
                                    maxCount={5}
                                    beforeUpload={() => false} // Prevent auto-upload
                                >
                                    {fileList.length >= 5 ? null : uploadButton}
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    );
};

export default ProductCreate;