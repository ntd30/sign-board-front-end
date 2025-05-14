import { Button, Cascader, Col, Form, Input, InputNumber, Modal, notification, Row, Upload, Select } from "antd"
import { useEffect, useState } from "react"
import { updateProductAPI } from "../../../services/api.service"
import { UploadOutlined } from "@ant-design/icons"

const { TextArea } = Input
const { Option } = Select

const ProductUpdate = (props) => {
    const { isUpdateOpen, setIsUpdateOpen, dataUpdate, loadProducts, dataCategories } = props
    const [loadingBtn, setLoadingBtn] = useState(false)
    const [fileList, setFileList] = useState([])
    const [form] = Form.useForm()

    useEffect(() => {
        let numbersOnlyArray = []
        if (dataUpdate?.dimensions) {
            const numbersArray = dataUpdate.dimensions.split('x');
            const lastNumber = numbersArray[numbersArray.length - 1].split(' ')[0]
            numbersOnlyArray = [...numbersArray.slice(0, -1), lastNumber]
        }

        if (dataUpdate && dataUpdate.id) {

            form.setFieldsValue({
                id: dataUpdate.id,
                name: dataUpdate.name,
                categoryId: dataUpdate.category.id,
                categoryName: dataUpdate.category.name,
                description: dataUpdate.description,
                price: 0,
                discount: 0,
                discountPrice: 0,
                slug: dataUpdate.name.toLowerCase().replace(/\s+/g, "-"),
                materialIds: [],
                length: parseFloat(numbersOnlyArray[0]) || 0,
                width: parseFloat(numbersOnlyArray[1]) || 0,
                height: parseFloat(numbersOnlyArray[2]) || 0,
            })

            // Xử lý ảnh hiện có từ dataUpdate.images

            if (Array.isArray(dataUpdate?.images)) {
                const existingImages = dataUpdate.images
                    .filter(item => item) // Loại bỏ null/undefined
                    .map((item, index) => {
                        // Xử lý trường hợp item là chuỗi URL hoặc đối tượng có url
                        const url = typeof item === 'string' ? item : item?.url;
                        if (!url || typeof url !== 'string') {
                            console.warn(`Invalid image at index ${index}:`, item);
                            return null;
                        }
                        return {
                            uid: `existing-${index}`,
                            name: `image-${index}.jpg`,
                            status: 'done',
                            url: url,
                        };
                    })
                    .filter(item => item); // Loại bỏ các item null
                setFileList(existingImages);
            } else {
                setFileList([]);
            }
        }
    }, [dataUpdate, form])

    const handleUpdateProduct = async (values) => {
        setLoadingBtn(true)

        const formData = new FormData()

        const productData = {
            name: values.name,
            categoryId: typeof values.categoryName === "string" ? values.categoryId : values.categoryName[values.categoryId.length - 1],
            description: values.description,
            price: values.price,
            discount: values.discount,
            discountPrice: values.discountPrice,
            slug: values.slug,
            materialIds: values.materialIds || [],
            dimensions: `${values.length}x${values.width}x${values.height}`,
        }

        formData.append('product', new Blob([JSON.stringify(productData)], { type: 'application/json' }))

        // Chỉ gửi ảnh mới (không gửi ảnh hiện có)
        const newImages = fileList.filter(file => !file.url)
        if (newImages.length > 0) {
            newImages.forEach(file => {
                if (file.originFileObj) {
                    formData.append('images', file.originFileObj)
                }
            })
        }

        try {
            const res = await updateProductAPI(dataUpdate.id, formData)

            if (res) {
                resetAndCloseModal()
                await loadProducts()
                notification.success({
                    message: "Cập nhật Sản phẩm",
                    description: "Cập nhật Sản phẩm thành công"
                })
            } else {
                notification.error({
                    message: "Lỗi Cập nhật Sản phẩm",
                    description: res.message || "Có lỗi xảy ra khi cập nhật sản phẩm"
                })
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message ||
                error.response?.data?.error ||
                error.message ||
                "Có lỗi không xác định khi cập nhật sản phẩm"
            notification.error({
                message: "Lỗi Cập nhật Sản phẩm",
                description: errorMessage
            })
            console.error("API Error:", error.response?.data || error)
        }
        setLoadingBtn(false)
    }

    const resetAndCloseModal = () => {
        setIsUpdateOpen(false)
        form.resetFields()
        setFileList([])
    }

    const handleUploadChange = ({ fileList: newFileList }) => {
        setFileList(newFileList)
    }

    return (
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
                        >
                            <TextArea placeholder="Nhập mô tả" />
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
                                beforeUpload={() => false}
                                multiple
                                accept="image/*"
                                listType="picture"
                                maxCount={5}
                            >
                                <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                            </Upload>
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
    )
}

export default ProductUpdate