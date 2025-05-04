import { Form, Input, InputNumber, Modal, notification, Select } from "antd"
import { useEffect, useState } from "react"
import { updateProductAPI } from "../../../services/api.service"

const ProductUpdate = (props) => {
    // const { isUpdateOpen, setIsUpdateOpen, dataUpdate, setDataUpdate, loadProducts } = props
    const { isUpdateOpen, setIsUpdateOpen, dataUpdate, loadProducts } = props
    const [loadingBtn, setLoadingBtn] = useState(false)
    const [form] = Form.useForm()

    useEffect(() => {
        if (dataUpdate && dataUpdate._id) {
            form.setFieldsValue({
                id: dataUpdate._id,
                name: dataUpdate.name,
                description: dataUpdate.description,
                price: dataUpdate.price
            })
        }
    }, [dataUpdate])

    const handleUpdateProduct = async (values) => {
        setLoadingBtn(true)

        const { id, name, description, price } = values
        const res = await updateProductAPI(id, name, description, price)

        if (res.data) {
            resetAndCloseModal()
            await loadProducts()
            notification.success({
                message: "Cập nhật sản phẩm",
                description: "Cập nhật sản phẩm thành công"
            })
        } else {
            notification.error({
                message: "Lỗi Cập nhật sản phẩm",
                description: JSON.stringify(res.message)
            })
        }
        setLoadingBtn(false)
    }

    const resetAndCloseModal = () => {
        setIsUpdateOpen(false)
        // setDataUpdate(null)
        // form.resetFields()
    }

    return (
        <Modal title="Cập nhật sản phẩm" maskClosable={false} okText="Lưu" cancelText="Hủy"
            open={isUpdateOpen}
            onOk={() => form.submit()}
            okButtonProps={{ loading: loadingBtn }}
            onCancel={resetAndCloseModal}
        >
            <Form
                layout="vertical"
                onFinish={handleUpdateProduct}
                form={form}
            >
                <Form.Item
                    label="Id"
                    name="id"
                >
                    <Input disabled />
                </Form.Item>

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
                    label="Giá tiền"
                    name="price"
                    rules={[
                        { required: true, message: 'Giá tiền không được bỏ trống!' }
                    ]}
                >
                    <InputNumber addonAfter="đ" style={{ width: '100%' }} />
                </Form.Item>

            </Form>
        </Modal>
    )
}

export default ProductUpdate