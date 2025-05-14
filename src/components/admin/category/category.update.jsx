import { Button, Cascader, Col, Form, Input, InputNumber, Modal, notification, Row, Select } from "antd"
import { useEffect, useState } from "react"
import { updateCategoryAPI } from "../../../services/api.service"

const { TextArea } = Input

const CategoryUpdate = (props) => {
    const { isUpdateOpen, setIsUpdateOpen, dataUpdate, loadCategories } = props
    const [loadingBtn, setLoadingBtn] = useState(false)
    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue({
            name: dataUpdate?.name,
            description: dataUpdate?.description,
            // parentCategory: [],
        })
    }, [dataUpdate])

    const handleUpdateCategory = async (values) => {
        setLoadingBtn(true)

        const { name, description } = values

        const res = await updateCategoryAPI(dataUpdate?.id, name, description)

        if (res.data) {
            resetAndCloseModal()
            await loadCategories()
            notification.success({
                message: "Cập nhật Danh mục",
                description: "Cập nhật Danh mục thành công"
            })
        } else {
            notification.error({
                message: "Lỗi Cập nhật Danh mục",
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
        <Modal title="Cập nhật Danh mục" maskClosable={false} okText="Lưu" cancelText="Hủy"
            open={isUpdateOpen}
            onOk={() => form.submit()}
            okButtonProps={{ loading: loadingBtn }}
            onCancel={resetAndCloseModal}
            width={900}
        >
            <Form
                layout="vertical"
                onFinish={handleUpdateCategory}
                form={form}
            >
                <Row gutter={16}>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <Form.Item
                            label="Tên Danh mục"
                            name="name"
                            rules={[
                                { required: true, message: 'Vui lòng không bỏ trống!' }
                            ]}
                        >
                            <Input placeholder="Nhập tên" />
                        </Form.Item>
                    </Col>

                    {/* <Col lg={12} md={12} sm={24} xs={24}>
                        <Form.Item
                            label="Thuộc Danh mục"
                            name="parentCategory"
                        >
                            <Cascader options={dataParentCategories} placeholder="Nhập tên danh mục" />
                        </Form.Item>
                    </Col> */}

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
                </Row>

            </Form>

        </Modal>
    )
}

export default CategoryUpdate