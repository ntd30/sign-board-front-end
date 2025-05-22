import { useEffect, useState } from "react";
import {
    Row,
    Col,
    Typography,
    Form,
    Input,
    Select,
    Button,
    Upload,
    message,
    Divider,
    Modal,
    notification,
    Switch,
} from 'antd';
import { UploadOutlined, FileAddOutlined } from '@ant-design/icons';
import { createArticleAPI } from "../../../services/api.service";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const { Title, Paragraph } = Typography;
const { Option } = Select;

const customStyles = `
    .form-section-title {
      margin-bottom: 20px;
      color: #1890ff;
      border-bottom: 1px solid #f0f0f0;
      padding-bottom: 10px;
    }
`;

const newsTypes = [
    { id: 'news', name: 'Tin tức' },
    { id: 'project', name: 'Dự án' },
];

const ArticleCreate = (props) => {
    const { loadArticles } = props;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [content, setContent] = useState('');
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        setLoadingBtn(true);

        const { title, excerpt, type, images } = values;
        const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

        const imageFile = images?.fileList[0].originFileObj;

        const articleData = {
            title,
            slug,
            content,
            excerpt: excerpt || content.slice(0, 200),
            isFeatured: false,
            type,
        };

        const resCreateArticle = await createArticleAPI(articleData, imageFile);

        if (resCreateArticle.data) {
            resetAndCloseModal();
            await loadArticles();
            notification.success({
                message: "Thêm Tin tức / Dự án",
                description: "Thêm Tin tức / Dự án mới thành công",
            });
        } else {
            notification.error({
                message: "Lỗi thêm mới Tin tức / Dự án",
                description: resCreateArticle.message,
            });
        }

        setLoadingBtn(false);
    };

    const resetAndCloseModal = () => {
        setIsModalOpen(false);
        form.resetFields();
        setFileList([]);
        setContent('');
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Lỗi:', errorInfo);
        message.error('Vui lòng kiểm tra lại các trường thông tin!');
    };

    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };

    const handleUploadChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    useEffect(() => {
        const styleSheet = document.createElement("style");
        styleSheet.id = "add-news-form-styles";
        if (!document.getElementById(styleSheet.id)) {
            styleSheet.innerText = customStyles;
            document.head.appendChild(styleSheet);
        }
        const antdResetCss = document.createElement("link");
        antdResetCss.id = "antd-reset-css-dynamic-admin";
        if (!document.getElementById(antdResetCss.id)) {
            antdResetCss.rel = "stylesheet";
            antdResetCss.href = "https://unpkg.com/antd/dist/reset.css";
            document.head.appendChild(antdResetCss);
        }
        return () => {
            const existingStyleSheet = document.getElementById(styleSheet.id);
            if (existingStyleSheet) {
                document.head.removeChild(existingStyleSheet);
            }
        };
    }, []);

    return (
        <div style={{ margin: "10px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>Quản lý Tin tức / Dự án</h2>
                <Button type="primary" onClick={() => setIsModalOpen(true)}>
                    Tạo mới
                </Button>
            </div>
            <Modal
                title="Tạo mới Tin tức / Dự án"
                maskClosable={false}
                okText="Thêm"
                cancelText="Hủy"
                open={isModalOpen}
                onOk={() => form.submit()}
                okButtonProps={{ loading: loadingBtn }}
                onCancel={resetAndCloseModal}
                width="80%"
            >
                <Title level={3} className="form-section-title">
                    <FileAddOutlined style={{ marginRight: '8px' }} />
                    Thêm Bài Viết Mới
                </Title>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    initialValues={{}}
                >
                    <Row gutter={24}>
                        <Col xs={24} md={16}>
                            <Form.Item
                                name="title"
                                label="Tiêu đề bài viết"
                                rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
                            >
                                <Input placeholder="Nhập tiêu đề bài viết" />
                            </Form.Item>
                            <Form.Item
                                name="excerpt"
                                label="Tóm tắt"
                                rules={[{ max: 200, message: 'Tóm tắt không được vượt quá 200 ký tự!' }]}
                            >
                                <Input.TextArea
                                    rows={3}
                                    placeholder="Nhập tóm tắt bài viết (tối đa 200 ký tự)"
                                />
                            </Form.Item>
                            <Form.Item
                                name="content"
                                label="Nội dung bài viết"
                                rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
                                initialValue={content}
                            >
                                <ReactQuill
                                    theme="snow"
                                    value={content}
                                    onChange={setContent}
                                    placeholder="Nhập nội dung chi tiết của bài viết..."
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
                                    style={{ height: '400px', marginBottom: '50px' }}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item
                                name="type"
                                label="Loại bài viết"
                                rules={[{ required: true, message: 'Vui lòng chọn loại tin tức!' }]}
                            >
                                <Select placeholder="Chọn loại tin tức">
                                    {newsTypes.map(type => (
                                        <Option key={type.id} value={type.id}>{type.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="images"
                                label="Ảnh bài viết"
                                rules={[{ required: true, message: 'Vui lòng tải lên ảnh của bài viết!' }]}
                            >
                                <Upload
                                    customRequest={dummyRequest}
                                    listType="picture"
                                    fileList={fileList}
                                    onChange={handleUploadChange}
                                    beforeUpload={(file) => {
                                        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
                                        if (!isJpgOrPng) {
                                            message.error('Bạn chỉ có thể tải lên file JPG/PNG!');
                                        }
                                        const isLt2M = file.size / 1024 / 1024 < 2;
                                        if (!isLt2M) {
                                            message.error('Ảnh phải nhỏ hơn 2MB!');
                                        }
                                        if (isJpgOrPng && isLt2M && fileList.length < 1) {
                                            return true;
                                        }
                                        if (fileList.length >= 1) {
                                            message.warning('Chỉ được phép tải lên một ảnh đại diện.');
                                        }
                                        return Upload.LIST_IGNORE;
                                    }}
                                    onRemove={() => setFileList([])}
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
                            {/* <Paragraph type="secondary" style={{ marginTop: '-10px', fontSize: '12px' }}>
                                Hỗ trợ JPG, PNG. Kích thước tối đa 2MB.
                            </Paragraph> */}
                        </Col>
                    </Row>
                    <Divider />
                </Form>
            </Modal>
        </div>
    );
};

export default ArticleCreate;