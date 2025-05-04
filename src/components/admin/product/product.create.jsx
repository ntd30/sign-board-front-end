import { Button, Form, Input, InputNumber, Modal, notification, Select } from "antd"
import { useState } from "react"
import { createProductAPI } from "../../../services/api.service"

const ProductCreate = (props) => {
    const { loadProducts } = props
    const [isModalOpen, setIsModalOpen] = useState(false)

    const [loadingBtn, setLoadingBtn] = useState(false)

    const [form] = Form.useForm()

    const handleCreateProduct = async (values) => {
        setLoadingBtn(true)

        const { name, description, price } = values

        const resCreateProduct = await createProductAPI(
            name, description, price
        )

        if (resCreateProduct.data) {
            resetAndCloseModal()
            await loadProducts()
            notification.success({
                message: "Thêm sản phẩm",
                description: "Thêm mới sản phẩm thành công"
            })
        } else {
            notification.error({
                message: "Lỗi thêm sản phẩm",
                description: JSON.stringify(resCreateProduct.message)
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
                <h2>Sản phẩm</h2>
                <Button type="primary" onClick={() => setIsModalOpen(true)}>Thêm mới sản phẩm</Button>
            </div>
            <Modal title="Thêm mới sản phẩm" maskClosable={false} okText="Tạo"
                open={isModalOpen}
                onOk={() => form.submit()}
                okButtonProps={{
                    loading: loadingBtn
                }}
                onCancel={resetAndCloseModal}
            >
                <Form
                    layout="vertical"
                    onFinish={handleCreateProduct}
                    form={form}
                >
                    <Form.Item
                        label="Tên sản phẩm"
                        name="name"
                        rules={[
                            { required: true, message: 'Tên sản phẩm không được bỏ trống!' }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Mô tả"
                        name="description"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Giá"
                        name="price"
                        rules={[
                            { required: true, message: 'Giá không được bỏ trống!' }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                </Form>
            </Modal>
        </div>
    )
}

export default ProductCreate