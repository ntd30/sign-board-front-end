import { useEffect, useState } from "react";
import {
    Row,
    Col,
    Typography,
    Form,
    Input,
    Button,
    Upload,
    message,
    Divider,
    Modal,
    notification,
    Switch,
    Select
} from 'antd';
import { UploadOutlined, FileAddOutlined } from '@ant-design/icons';
import { createBannerAPI } from "../../../services/api.service";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const { Title } = Typography;
const { Option } = Select;

const BannerCreate = (props) => {
    const { loadBanners } = props;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        setLoadingBtn(true);

        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("isActive", values.isActive ? 1 : 0);
        console.log("values", values.isActive);
        formData.append("productId", values.productId || "");
        
        if (fileList.length > 0 && fileList[0].originFileObj) {
            formData.append("image", fileList[0].originFileObj);
        }

        try {
            const res = await createBannerAPI(formData);
            if (res.data) {
                resetAndCloseModal();
                await loadBanners();
                notification.success({
                    message: "Thêm banner",
                    description: "Thêm banner mới thành công",
                });
            }
        } catch (error) {
            notification.error({
                message: "Lỗi thêm mới banner",
                description: error.message,
            });
        } finally {
            setLoadingBtn(false);
        }
    };

    const resetAndCloseModal = () => {
        setIsModalOpen(false);
        form.resetFields();
        setFileList([]);
    };

    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };

    const handleUploadChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    return (
        <div style={{ margin: "10px 0" }}>
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
                Thêm banner mới
            </Button>
            <Modal
                title="Thêm banner mới"
                maskClosable={false}
                okText="Thêm"
                cancelText="Hủy"
                open={isModalOpen}
                onOk={() => form.submit()}
                okButtonProps={{ loading: loadingBtn }}
                onCancel={resetAndCloseModal}
                width="60%"
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{ isActive: true }}
                >
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item
                                name="title"
                                label="Tiêu đề"
                                rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
                            >
                                <Input placeholder="Nhập tiêu đề banner" />
                            </Form.Item>

                            <Form.Item
                                name="description"
                                label="Mô tả"
                            >
                                <Input.TextArea rows={4} placeholder="Nhập mô tả banner" />
                            </Form.Item>

                          

                            {/* <Form.Item
                                name="isActive"
                                label="Trạng thái"
                                valuePropName="checked"
                            >
                                <Switch checkedChildren="Hoạt động" unCheckedChildren="Ẩn" />
                            </Form.Item> */}
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="image"
                                label="Ảnh banner"
                                rules={[{ required: true, message: 'Vui lòng tải lên ảnh banner!' }]}
                            >
                                <Upload
                                    customRequest={dummyRequest}
                                    listType="picture-card"
                                    fileList={fileList}
                                    onChange={handleUploadChange}
                                    beforeUpload={(file) => {
                                        const isImage = file.type.includes('image');
                                        if (!isImage) {
                                            message.error('Chỉ được tải lên file ảnh!');
                                        }
                                        const isLt5M = file.size / 1024 / 1024 < 5;
                                        if (!isLt5M) {
                                            message.error('Ảnh phải nhỏ hơn 5MB!');
                                        }
                                        return isImage && isLt5M;
                                    }}
                                    maxCount={1}
                                >
                                    {fileList.length < 1 && (
                                        <div>
                                            <UploadOutlined />
                                            <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
                                        </div>
                                    )}
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    );
};

export default BannerCreate;