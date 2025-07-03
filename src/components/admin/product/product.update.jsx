import { Button, Cascader, Col, Form, Input, InputNumber, Modal, notification, Row, Upload, message, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { updateProductAPI } from "../../../services/api.service";
import { UploadOutlined, EyeOutlined } from "@ant-design/icons";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const customStyles = `
    // .ant-upload-picture-card-wrapper .ant-upload-list-picture-card .ant-upload-list-item {
    //     width: 150px;
    //     height: 150px;
    //     border: 2px solid #e8e8e8;
    //     border-radius: 8px;
    // }
    // .ant-upload-list-item-info {
    //     background: rgba(0, 0, 0, 0.05);
    // }
`;

const ProductUpdate = (props) => {
    const { isUpdateOpen, setIsUpdateOpen, dataUpdate, loadProducts, dataCategories } = props;

    const [loadingBtn, setLoadingBtn] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [description, setDescription] = useState('');
    const [form] = Form.useForm();


    useEffect(() => {
        let numbersOnlyArray = [];
        if (dataUpdate?.dimensions) {
            const numbersArray = dataUpdate.dimensions.split('x');
            const lastNumber = numbersArray[numbersArray.length - 1].split(' ')[0];
            numbersOnlyArray = [...numbersArray.slice(0, -1), lastNumber];
        }

        if (dataUpdate && dataUpdate.id) {
            form.setFieldsValue({
                id: dataUpdate.id,
                name: dataUpdate.name,
                categoryId: dataUpdate.category?.id,
                categoryName: dataUpdate.category?.name,
                description: dataUpdate.description,
                price: 0,
                discount: 0,
                discountPrice: 0,
                slug: dataUpdate.name?.toLowerCase().replace(/\s+/g, "-"),
                materialIds: [],
                length: parseFloat(numbersOnlyArray[0]) || 0,
                width: parseFloat(numbersOnlyArray[1]) || 0,
                height: parseFloat(numbersOnlyArray[2]) || 0,
            });
            setDescription(dataUpdate.description || '');

            if (Array.isArray(dataUpdate?.images) && dataUpdate.images.length > 0) {
                const existingImages = dataUpdate.images
                    .filter(item => item)
                    .map((item, index) => {
                        const imageUrl = typeof item === 'string' ? item : item?.imageUrl;
                        const imageBase64 = item?.imageBase64;
                        if (imageBase64) {
                            // Ưu tiên sử dụng Base64
                            return {
                                uid: `existing-${index}`,
                                name: `image-${index}.jpg`,
                                status: 'done',
                                url: `data:image/jpeg;base64,${imageBase64}`,
                                isExisting: true,
                            };
                        } else if (imageUrl && typeof imageUrl === 'string' && imageUrl.match(/\.(jpg|jpeg|png)$/i)) {
                            // Fallback về imageUrl nếu Base64 không có
                            return {
                                uid: `existing-${index}`,
                                name: `image-${index}.jpg`,
                                status: 'done',
                                url: `${import.meta.env.VITE_BACKEND_URL}/images/${imageUrl}`,
                                isExisting: true,
                            };
                        }
                        console.warn(`Invalid image at index ${index}:`, item);
                        return null;
                    })
                    .filter(item => item);
                setFileList(existingImages);
            } else {
                setFileList([{
                    uid: '-1',
                    name: 'no-image.jpg',
                    status: 'done',
                    url: 'https://via.placeholder.com/150?text=No+Image',
                    isExisting: true,
                }]);
                message.info('Sản phẩm hiện tại chưa có ảnh.');
            }
        }
    }, [dataUpdate, form]);

    const handleUpdateProduct = async (values) => {
    setLoadingBtn(true);
    const formData = new FormData();

    // 1. Thêm các trường dữ liệu cơ bản
    formData.append("name", values.name);
    formData.append("categoryId", values.categoryId);
    formData.append("description", description || '');
    formData.append("slug", values.slug || '');
    formData.append("dimensions", `${values.length}x${values.width}x${values.height}`);

    // 2. Xử lý ảnh cần giữ lại (theo đúng format Postman)
    const existingImages = fileList
        .filter(file => file.isExisting)
        .map(file => {
            // Lấy tên file từ URL hoặc từ originalData
            if (file.url.includes(import.meta.env.VITE_BACKEND_URL)) {
                return file.url.split('/').pop();
            }
            return file.originalUrl || file.name;
        });

    // Thêm từng ảnh cần giữ vào FormData (giống Postman)
    existingImages.forEach((imageUrl, index) => {
        formData.append(index === 0 ? "keptImageUrl" : "keptImageUrls", imageUrl);
    });

    // 3. Thêm ảnh mới tải lên
    fileList
        .filter(file => !file.isExisting && file.originFileObj)
        .forEach(file => {
            formData.append("images", file.originFileObj);
        });

    // Debug: Kiểm tra dữ liệu trước khi gửi
    for (let [key, value] of formData.entries()) {
        console.log(key, value instanceof File ? value.name : value);
    }

    try {
        const res = await updateProductAPI(dataUpdate.id, formData);
        if (res) {
            notification.success({
                message: "Thành công",
                description: "Cập nhật sản phẩm thành công"
            });
            resetAndCloseModal();
            await loadProducts();
        }
    } catch (error) {
        console.error("Error updating product:", error);
        notification.error({
            message: "Lỗi",
            description: error.response?.data?.message || "Cập nhật thất bại"
        });
    } finally {
        setLoadingBtn(false);
    }
};


    const resetAndCloseModal = () => {
        setIsUpdateOpen(false);
        form.resetFields();
        setFileList([]);
        setDescription('');
    };

    const handleUploadChange = ({ fileList: newFileList }) => {
        setFileList(newFileList.map(file => ({
            ...file,
            isExisting: file.isExisting || false,
        })));
    };

    const beforeUpload = (file) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            message.error('Bạn chỉ có thể tải lên tệp ảnh!');
            return Upload.LIST_IGNORE;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Ảnh phải nhỏ hơn 2MB!');
            return Upload.LIST_IGNORE;
        }
        if (fileList.length >= 5) {
            message.warning('Tối đa 5 ảnh!');
            return Upload.LIST_IGNORE;
        }
        return false;
    };

    const handlePreview = (file) => {
        if (file.url) {
            // Nếu ảnh là Base64, hiển thị trực tiếp
            if (file.url.startsWith('data:image')) {
                window.open(file.url, '_blank');
            } else {
                // Nếu là URL, kiểm tra và fallback về Base64 nếu có
                const img = new Image();
                img.src = file.url;
                img.onerror = () => {
                    const image = dataUpdate.images?.find(item => file.url.includes(item.imageUrl));
                    if (image?.imageBase64) {
                        window.open(`data:image/jpeg;base64,${image.imageBase64}`, '_blank');
                    } else {
                        message.error('Không thể xem trước ảnh này.');
                    }
                };
                img.onload = () => {
                    window.open(file.url, '_blank');
                };
            }
        } else {
            message.error('Không thể xem trước ảnh này.');
        }
    };

    return (
        <div>
            <style>{customStyles}</style>
            <Modal
                title="Cập nhật Sản phẩm"
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
                    onFinish={handleUpdateProduct}
                    form={form}
                >
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
                                name="categoryName"
                                rules={[{ required: true, message: 'Vui lòng không bỏ trống!' }]}
                            >
                                <Cascader
                                    options={dataCategories}
                                    placeholder="Nhập tên danh mục"
                                />
                            </Form.Item>
                        </Col>

                        <Col lg={12} md={12} sm={24} xs={24}>
                            <Form.Item
                                label="Thuộc Danh mục"
                                name="categoryId"
                                rules={[{ required: true, message: 'Vui lòng không bỏ trống!' }]}
                                hidden
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                label="Mô tả"
                                name="description"
                                rules={[{ required: true, message: 'Vui lòng không bỏ trống!' }]}
                                initialValue={description}
                            >
                                <ReactQuill
                                    theme="snow"
                                    value={description}
                                    onChange={setDescription}
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

                        <Col span={24}>
                            <Form.Item
                                label="Hình ảnh"
                                name="images"
                            >
                                <Upload
                                    fileList={fileList}
                                    onChange={handleUploadChange}
                                    beforeUpload={beforeUpload}
                                    multiple
                                    accept="image/*"
                                    listType="picture-card"
                                    maxCount={5}
                                    showUploadList={{
                                        showPreviewIcon: true,
                                        showRemoveIcon: true,
                                        previewIcon: <EyeOutlined />,
                                    }}
                                    itemRender={(originNode, file) => (
                                        <Tooltip title={file.isExisting ? 'Ảnh hiện có từ hệ thống' : 'Ảnh mới tải lên'}>
                                            {originNode}
                                        </Tooltip>
                                    )}
                                    onPreview={handlePreview}
                                >
                                    {fileList.length < 5 && (
                                        <div>
                                            <UploadOutlined />
                                            <div style={{ marginTop: 8 }}>Chọn ảnh</div>
                                        </div>
                                    )}
                                </Upload>
                                <div style={{ color: '#888', fontSize: '12px', marginTop: '8px' }}>
                                    {fileList.length > 0
                                        ? 'Tải lên tối đa 5 ảnh (JPG/PNG, <2MB). Ảnh hiện tại sẽ được thay thế nếu tải ảnh mới.'
                                        : 'Chưa có ảnh. Tải lên tối đa 5 ảnh (JPG/PNG, <2MB).'}
                                </div>
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
                                <InputNumber style={{ width: '100%' }} min={0} />
                            </Form.Item>
                        </Col>

                        <Col lg={8} md={8} sm={24} xs={24}>
                            <Form.Item
                                label="Rộng"
                                name="width"
                                rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                            >
                                <InputNumber style={{ width: '100%' }} min={0} />
                            </Form.Item>
                        </Col>

                        <Col lg={8} md={8} sm={24} xs={24}>
                            <Form.Item
                                label="Cao"
                                name="height"
                                rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                            >
                                <InputNumber style={{ width: '100%' }} min={0} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    );
};

export default ProductUpdate;