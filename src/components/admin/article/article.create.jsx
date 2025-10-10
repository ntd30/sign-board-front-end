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
import { createArticleAPI, fetchArticleCategoryTreeAPI } from "../../../services/api.service";
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
    const [articleCategories, setArticleCategories] = useState([]);
    const [selectedParentCategory, setSelectedParentCategory] = useState(null);
    const [form] = Form.useForm();

    // Load danh mục bài viết từ API
    useEffect(() => {
        loadArticleCategories();
    }, []);

    const loadArticleCategories = async () => {
        try {
            const res = await fetchArticleCategoryTreeAPI();
            if (res?.data) {
                // Giữ nguyên cấu trúc cây để hiển thị phân cấp
                setArticleCategories(res.data);
            }
        } catch (error) {
            console.error("Error loading article categories:", error);
            // Fallback to default categories if API fails
            setArticleCategories([
                { id: 1, name: 'Dịch vụ', slug: 'dich-vu', level: 0, children: [] },
                { id: 2, name: 'Mẫu biển đẹp', slug: 'mau-bien-dep', level: 0, children: [] },
                { id: 3, name: 'Mẫu chữ', slug: 'mau-chu', level: 0, children: [] },
                { id: 4, name: 'Dự án', slug: 'du-an', level: 0, children: [] },
            ]);
        }
    };

    // Hàm để lấy danh mục cấp 1 (cha)
    const getParentCategories = () => {
        return articleCategories.filter(cat => cat.level === 0);
    };

    // Hàm để lấy danh mục con của danh mục cha được chọn
    const getChildCategories = (parentSlug) => {
        const parentCategory = articleCategories.find(cat => cat.slug === parentSlug);
        return parentCategory ? parentCategory.children || [] : [];
    };

    // Hàm xử lý khi chọn danh mục cha
    const handleParentCategoryChange = (value) => {
        setSelectedParentCategory(value);
        // Reset danh mục con khi chọn danh mục cha khác
        form.setFieldsValue({ childCategory: undefined });
    };

    const onFinish = async (values) => {
        console.log("Form values:", values);
        setLoadingBtn(true);

        // Combine parent and child category slugs
        let finalCategorySlug = values.parentCategory;
        if (values.childCategory) {
            finalCategorySlug = values.childCategory;
        }

        // Tìm category ID từ slug
        let categoryId = null;
        const findCategoryBySlug = (categories, targetSlug) => {
            for (const category of categories) {
                if (category.slug === targetSlug) {
                    return category.id;
                }
                if (category.children && category.children.length > 0) {
                    const found = findCategoryBySlug(category.children, targetSlug);
                    if (found) return found;
                }
            }
            return null;
        };

        if (finalCategorySlug) {
            categoryId = findCategoryBySlug(articleCategories, finalCategorySlug);
            console.log("Found category ID:", categoryId, "for slug:", finalCategorySlug);
        }

        // Create FormData
        const formData = new FormData();
        // Append individual fields
        formData.append("title", values.title);
        console.log("tile", values.title);
        formData.append("content", content); // Use the `content` state directly
        formData.append("excerpt", values.excerpt || content.slice(0, 200)); // Use excerpt or first 200 chars of content
        formData.append("isFeatured", false); // Default value if not provided

        // Gửi categoryId nếu tìm thấy
        if (categoryId) {
            formData.append("categoryId", categoryId);
            console.log("Sending categoryId:", categoryId, "to backend");
        } else {
            console.warn("No categoryId found for slug:", finalCategorySlug);
        }

        // Append image file
        if (fileList.length > 0 && fileList[0].originFileObj) {
            formData.append("image", fileList[0].originFileObj);
        }
                console.log("formData2", formData);


        try {
                    console.log("formData", formData);

            const resCreateArticle = await createArticleAPI(formData);
            if (resCreateArticle.data) {
                resetAndCloseModal();
                await loadArticles();
                notification.success({
                    message: "Thêm bài viết",
                    description: "Thêm bài viết mới thành công",
                });
            } else {
                notification.error({
                    message: "Lỗi thêm mới bài viết",
                    description: resCreateArticle.message,
                });
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message ||
                error.response?.data?.error ||
                error.message ||
                "Có lỗi không xác định khi thêm mới sản phẩm";
            notification.error({
                message: "Lỗi thêm mới bài viết",
                description: errorMessage,
            });
            console.error("API Error:", error.response?.data || error);
        } finally {
            setLoadingBtn(false);
        }
    };

    const resetAndCloseModal = () => {
        setIsModalOpen(false);
        form.resetFields();
        setFileList([]);
        setContent('');
        setSelectedParentCategory(null);
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
                <h2>Quản lý Bài viết</h2>
                <Button type="primary" onClick={() => setIsModalOpen(true)}>
                    Tạo mới
                </Button>
            </div>
            <Modal
                title="Tạo mới Bài viết"
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
                                name="parentCategory"
                                label="Danh mục cha"
                                rules={[{ required: true, message: 'Vui lòng chọn danh mục cha!' }]}
                            >
                                <Select
                                    placeholder="Chọn danh mục cha"
                                    onChange={handleParentCategoryChange}
                                >
                                    {getParentCategories().map(category => (
                                        <Option key={category.slug} value={category.slug}>
                                            {category.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="childCategory"
                                label="Danh mục con (tùy chọn)"
                                rules={[]}
                            >
                                <Select
                                    placeholder="Chọn danh mục con (nếu có)"
                                    disabled={!selectedParentCategory}
                                >
                                    {getChildCategories(selectedParentCategory).map(category => (
                                        <Option key={category.slug} value={category.slug}>
                                            {category.name}
                                        </Option>
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