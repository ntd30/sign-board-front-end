import { Button, Cascader, Col, Form, Input, InputNumber, Modal, notification, Row, Select } from "antd"
import { useEffect, useState } from "react"
import { updateProductAPI } from "../../../services/api.service"

const { TextArea } = Input

const ProductUpdate = (props) => {
    // const { isUpdateOpen, setIsUpdateOpen, dataUpdate, setDataUpdate, loadProducts } = props
    const { isUpdateOpen, setIsUpdateOpen, dataUpdate, loadProducts, dataCategories } = props
    const [loadingBtn, setLoadingBtn] = useState(false)
    const [form] = Form.useForm()

    useEffect(() => {
        let numbersOnlyArray = []
        if (dataUpdate?.dimensions) {
            const numbersArray = dataUpdate?.dimensions?.split('x');
            // Để loại bỏ " mm" khỏi số cuối cùng nếu cần:
            const lastNumber = numbersArray[numbersArray?.length - 1].split(' ')[0]
            numbersOnlyArray = [...numbersArray?.slice(0, -1), lastNumber]
        }

        if (dataUpdate && dataUpdate.id) {
            form.setFieldsValue({
                id: dataUpdate.id,
                name: dataUpdate.name,
                categoryId: dataCategories.name,
                description: dataUpdate.description,
                length: numbersOnlyArray[0],
                width: numbersOnlyArray[1],
                height: numbersOnlyArray[2],
            })
        }
    }, [dataUpdate])

    const handleUpdateProduct = async (values) => {
        setLoadingBtn(true)

        const { id, fullName, phoneNumber, address, active, roleName } = values
        const res = await updateProductAPI(id, fullName, phoneNumber, address, active, roleName)

        if (res.data) {
            resetAndCloseModal()
            await loadProducts()
            notification.success({
                message: "Cập nhật Sản phẩm",
                description: "Cập nhật Sản phẩm thành công"
            })
        } else {
            notification.error({
                message: "Lỗi Cập nhật Sản phẩm",
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
        <Modal title="Cập nhật Sản phẩm" maskClosable={false} okText="Lưu" cancelText="Hủy"
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
                            rules={[
                                { required: true, message: 'Vui lòng không bỏ trống!' }
                            ]}
                        >
                            <Input placeholder="Nhập tên" />
                        </Form.Item>
                    </Col>

                    <Col lg={12} md={12} sm={24} xs={24}>
                        <Form.Item
                            label="Thuộc Danh mục"
                            name="categoryId"
                            rules={[
                                { required: true, message: 'Vui lòng không bỏ trống!' }
                            ]}
                        >
                            <Cascader options={dataCategories} placeholder="Nhập tên danh mục" />
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
                            <TextArea placeholder="Nhập mô tả" />
                        </Form.Item>
                    </Col>

                    <Col span={24} style={{ marginBottom: 10 }}>
                        <label>Kích thước</label>
                    </Col>

                    <Col lg={8} md={8} sm={24} xs={24}>
                        <Form.Item
                            label="Dài"
                            name="length"
                            rules={[{
                                required: true, message: 'Vui lòng không bỏ trống'
                            }]}
                            layout="horizontal"
                        >
                            <InputNumber />
                        </Form.Item>
                    </Col>

                    <Col lg={8} md={8} sm={24} xs={24}>
                        <Form.Item
                            label="Rộng"
                            name="width"
                            rules={[{
                                required: true, message: 'Vui lòng không bỏ trống'
                            }]}
                            layout="horizontal"
                        >
                            <InputNumber />
                        </Form.Item>
                    </Col>

                    <Col lg={8} md={8} sm={24} xs={24}>
                        <Form.Item
                            label="Cao"
                            name="height"
                            rules={[{
                                required: true, message: 'Vui lòng không bỏ trống'
                            }]}
                            layout="horizontal"
                        >
                            <InputNumber />
                        </Form.Item>
                    </Col>
                </Row>

            </Form>

        </Modal>
    )
}

export default ProductUpdate