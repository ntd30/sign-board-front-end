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
    const [deletedImages, setDeletedImages] = useState([]);
    console.log("dataCategories:", dataCategories);
    useEffect(() => {
      let numbersOnlyArray = [];
  if (dataUpdate?.dimensions) {
    const numbersArray = dataUpdate.dimensions.split('x');
    const lastNumber = numbersArray[numbersArray.length - 1].split(' ')[0];
    numbersOnlyArray = [...numbersArray.slice(0, -1), lastNumber];
  }

  if (dataUpdate && dataUpdate.id) {
    // Hàm tìm đường dẫn danh mục
    const findCategoryPath = (categories, targetId, path = []) => {
      for (let category of categories) {
        path.push(category.value);
        if (category.value === targetId) return [...path];
        if (category.children) {
          const childPath = findCategoryPath(category.children, targetId, path);
          if (childPath.length > 0) return childPath;
        }
        path.pop();
      }
      return [];
    };

    const categoryPath = dataUpdate.category?.id
      ? findCategoryPath(dataCategories, dataUpdate.category.id)
      : [];

    form.setFieldsValue({
      id: dataUpdate.id,
      name: dataUpdate.name,
      categoryId: categoryPath.length > 0 ? categoryPath : undefined, // Gán mảng đường dẫn
      description: dataUpdate.description,
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

    const handleRemoveImage = (file) => {
        // Nếu là ảnh hiện có trên server (không phải ảnh mới tải lên)
        if (file.isExisting) {
            // Thêm vào danh sách ảnh đã xóa
            const imageName = file.url.split('/').pop();
            setDeletedImages(prev => [...prev, imageName]);
        }

        // Cập nhật fileList (loại bỏ ảnh vừa xóa)
        const newFileList = fileList.filter(item => item.uid !== file.uid);
        setFileList(newFileList);

        return true; // Cho phép xóa
    };

    const handleUpdateProduct = async (values) => {
        setLoadingBtn(true);
        const formData = new FormData();

        // Thêm các trường dữ liệu cơ bản
        formData.append("name", values.name);
        formData.append("categoryId", values.categoryId);
        console.log("Category ID:", values.categoryId);
        formData.append("description", description || '');
        formData.append("dimensions", `${values.length}x${values.width}x${values.height}`);

        // Thêm danh sách ảnh cần xóa
        deletedImages.forEach(imageName => {
            formData.append("deletedImages", imageName);
        });

        // Xử lý ảnh cần giữ lại
        const keptImages = fileList
            .filter(file => file.isExisting)
            .map(file => file.url.split('/').pop())
            .filter(Boolean);

        keptImages.forEach(imageName => {
            formData.append("keptImageUtils", imageName);
        });

        console.log("Kept Images:", keptImages);

        // Thêm ảnh mới tải lên
        fileList
            .filter(file => !file.isExisting && file.originFileObj)
            .forEach(file => {
                formData.append("images", file.originFileObj);
            });

        try {
            console.log("Form Data:", Array.from(formData.entries()));
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
        setDeletedImages([]); // Reset danh sách ảnh đã xóa
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
    name="categoryId"
    rules={[{ required: true, message: 'Vui lòng không bỏ trống!' }]}
  >
    <Cascader
      options={dataCategories}
      fieldNames={{ label: 'label', value: 'value' }}
      placeholder="Chọn danh mục"
      onChange={(value) => {
        form.setFieldsValue({ categoryId: value }); // Đảm bảo giữ nguyên mảng giá trị
      }}
      displayRender={(labels) => labels[labels.length - 1]} // Hiển thị tên cuối cùng
    />
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
                                    onRemove={handleRemoveImage} // Thêm callback xử lý xóa ảnh
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