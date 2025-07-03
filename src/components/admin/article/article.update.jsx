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
    Tooltip,
} from 'antd';
import { UploadOutlined, FileAddOutlined, EyeOutlined } from '@ant-design/icons';
import { updateArticleAPI } from "../../../services/api.service";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const { Title } = Typography;
const { Option } = Select;

const customStyles = `
    .add-news-form-container {
      background-color: #ffffff;
      padding: 24px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
    }
    .form-section-title {
      margin-bottom: 20px;
      color: #1890ff;
      border-bottom: 1px solid #f0f0f0;
      padding-bottom: 10px;
    }
    .ant-upload-picture-card-wrapper .ant-upload-list-picture-card .ant-upload-list-item,
    .ant-upload.ant-upload-select-picture-card {
      width: 450px !important;
      height: 450px !important;
      border-radius: 12px;
    }
    .ant-upload.ant-upload-select-picture-card > div {
      font-size: 18px;
      padding: 16px 8px;
    }
    .ant-upload-list-picture-card .ant-upload-list-item-info {
      border-radius: 12px;
    }
    .ant-upload-list-item-info {
      background: rgba(0, 0, 0, 0.05);
    }
`;

const newsTypes = [
    { id: 'news', name: 'Tin tức' },
    { id: 'project', name: 'Dự án' },
];

const ArticleUpdate = (props) => {
    const { isUpdateOpen, setIsUpdateOpen, dataUpdate, setDataUpdate, loadArticles } = props;

    const [loadingBtn, setLoadingBtn] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [content, setContent] = useState('');
    const [form] = Form.useForm();

    useEffect(() => {
    if (dataUpdate && dataUpdate.id) {
        const initialContent = dataUpdate.content || '<p></p>';
        console.log("dataUpdate:", dataUpdate);
        form.setFieldsValue({
            title: dataUpdate.title,
            excerpt: dataUpdate.excerpt || '',
            type: dataUpdate.type,
            isFeatured: dataUpdate.isFeatured || false,
        });
        setContent(initialContent);

        // Ưu tiên sử dụng imageBase64, sau đó mới đến featuredImageUrl
        if (dataUpdate.imageBase64) {
            setFileList([{
                uid: '-1',
                name: 'image-base64.jpg',
                status: 'done',
                url: `data:image/jpeg;base64,${dataUpdate.imageBase64}`,
                isExisting: true,
            }]);
        } else if (dataUpdate.featuredImageUrl && typeof dataUpdate.featuredImageUrl === 'string' && dataUpdate.featuredImageUrl.match(/\.(jpg|jpeg|png)$/i)) {
            setFileList([{
                uid: '-1',
                name: dataUpdate.featuredImageUrl.split('/').pop() || 'image.jpg',
                status: 'done',
                url: `${import.meta.env.VITE_BACKEND_URL}${dataUpdate.featuredImageUrl}`,
                isExisting: true,
            }]);
        } else {
            setFileList([{
                uid: '-1',
                name: 'no-image.jpg',
                status: 'done',
                url: 'https://via.placeholder.com/150?text=No+Image',
                isExisting: true,
            }]);
            message.info('Bài viết hiện tại chưa có ảnh.');
        }
    }
}, [dataUpdate, form]);
    const onFinish = async (values) => {
        setLoadingBtn(true);

        const { title, excerpt, type, isFeatured } = values;
        const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

        const formData = new FormData();
        formData.append("title", title);
        formData.append("slug", slug);
        formData.append("content", content);
        formData.append("excerpt", excerpt || content.slice(0, 200));
        formData.append("isFeatured", isFeatured || false);
        formData.append("type", type);

        // Append image only if a new file is uploaded
        const newImageFile = fileList.length > 0 && !fileList[0].isExisting ? fileList[0].originFileObj : null;
        if (newImageFile) {
            formData.append("image", newImageFile);
        }

        try {
            const resUpdateArticle = await updateArticleAPI(dataUpdate.id, formData);
            if (resUpdateArticle) {
                resetAndCloseModal();
                await loadArticles();
                notification.success({
                    message: "Cập nhật bài viết",
                    description: "Cập nhật bài viết thành công",
                });
            } else {
                notification.error({
                    message: "Lỗi cập nhật bài viết",
                    description: "Không có dữ liệu phản hồi từ server",
                });
            }
        } catch (error) {
            notification.error({
                message: "Lỗi cập nhật bài viết",
                description: error.message || 'Đã xảy ra lỗi khi cập nhật',
            });
        } finally {
            setLoadingBtn(false);
        }
    };

    const resetAndCloseModal = () => {
        setIsUpdateOpen(false);
        form.resetFields();
        setFileList([]);
        setContent('');
        setDataUpdate(null);
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
        setFileList(newFileList.map(file => ({
            ...file,
            isExisting: file.isExisting || false,
        })));
    };

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('Bạn chỉ có thể tải lên file JPG/PNG!');
            return Upload.LIST_IGNORE;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Ảnh phải nhỏ hơn 2MB!');
            return Upload.LIST_IGNORE;
        }
        if (fileList.length >= 1 && !fileList[0].isExisting) {
            message.warning('Chỉ được phép tải lên một ảnh đại diện.');
            return Upload.LIST_IGNORE;
        }
        return true;
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
                if (dataUpdate.imageBase64) {
                    window.open(`data:image/jpeg;base64,${dataUpdate.imageBase64}`, '_blank');
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
                title="Cập nhật bài viết"
                maskClosable={false}
                okText="Lưu"
                cancelText="Hủy"
                open={isUpdateOpen}
                onOk={() => form.submit()}
                okButtonProps={{ loading: loadingBtn }}
                onCancel={resetAndCloseModal}
                width="80%"
            >
                <Title level={3} className="form-section-title">
                    <FileAddOutlined style={{ marginRight: '8px' }} />
                    Chỉnh sửa bài viết
                </Title>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    initialValues={{ isFeatured: false }}
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
                                label="Nội dung bài viết"
                                rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
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
                                name="isFeatured"
                                label="Nổi bật"
                                valuePropName="checked"
                            >
                                <Switch />
                            </Form.Item>
                            <Form.Item
                                name="images"
                                label="Ảnh bài viết"
                                rules={[{ required: true, message: 'Vui lòng tải lên ảnh của bài viết!' }]}
                            >
                                <Upload
                                    customRequest={dummyRequest}
                                    listType="picture-card"
                                    fileList={fileList}
                                    onChange={handleUploadChange}
                                    beforeUpload={beforeUpload}
                                    onPreview={handlePreview}
                                    onRemove={(file) => {
                                        if (!file.isExisting) setFileList([]);
                                    }}
                                    maxCount={1}
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
                    <Divider />
                </Form>
            </Modal>
        </div>
    );
};

export default ArticleUpdate;