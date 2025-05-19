import React, { useState, useEffect } from 'react';
import {
    Layout,
    Row,
    Col,
    Typography,
    Form,
    Input,
    Select,
    Button,
    Upload,
    message,
    Breadcrumb,
    Card,
    Divider
} from 'antd';
import { UploadOutlined, HomeOutlined, FileAddOutlined, ProfileOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title, Paragraph } = Typography;
const { Option } = Select;

// Các loại tin tức có sẵn (ví dụ)
const newsTypes = [
    { id: 'thoi-su', name: 'Thời sự' },
    { id: 'kinh-te', name: 'Kinh tế' },
    { id: 'giao-duc', name: 'Giáo dục' },
    { id: 'the-thao', name: 'Thể thao' },
    { id: 'giai-tri', name: 'Giải trí' },
    { id: 'cong-nghe', name: 'Công nghệ' },
];

// Component Form Thêm Mới Tin Tức
export const AddNewsForm = () => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Xử lý khi submit form
    const onFinish = async (values) => {
        setIsSubmitting(true);
        // Giả lập quá trình gửi dữ liệu lên server
        console.log('Dữ liệu gửi đi:', { ...values, image: fileList.length > 0 ? fileList[0] : null });

        // Trong thực tế, bạn sẽ gọi API ở đây
        // Ví dụ: const response = await api.createNews({...values, image: fileList[0]?.originFileObj });

        await new Promise(resolve => setTimeout(resolve, 1500)); // Giả lập độ trễ mạng

        // Sau khi API thành công
        message.success('Thêm mới tin tức thành công!');
        form.resetFields();
        setFileList([]);
        setIsSubmitting(false);

        // Xử lý lỗi (ví dụ)
        // message.error('Có lỗi xảy ra, vui lòng thử lại!');
        // setIsSubmitting(false);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Lỗi:', errorInfo);
        message.error('Vui lòng kiểm tra lại các trường thông tin!');
    };

    // Xử lý việc tải ảnh lên
    const handleUploadChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    // Custom request cho Upload component (để ngăn chặn việc tự động upload)
    // Trong thực tế, bạn có thể cần logic upload file lên server ở đây
    // hoặc xử lý file khi submit form.
    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };

    // CSS tùy chỉnh (nếu cần thiết, chủ yếu là để đảm bảo nền trắng và các khoảng cách)
    const customStyles = `
    .add-news-form-container {
      background-color: #ffffff;
      padding: 24px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
    }
    .form-section-title {
      margin-bottom: 20px;
      color: #1890ff; /* Ant Design primary color */
      border-bottom: 1px solid #f0f0f0;
      padding-bottom: 10px;
    }
  `;

    useEffect(() => {
        // Chèn CSS tùy chỉnh vào <head>
        const styleSheet = document.createElement("style");
        styleSheet.id = "add-news-form-styles";
        if (!document.getElementById(styleSheet.id)) {
            styleSheet.innerText = customStyles;
            document.head.appendChild(styleSheet);
        }
        // Load Ant Design reset CSS (nếu chưa có trong dự án)
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
    }, [customStyles]);


    return (
        <div className="add-news-form-container">
            <Title level={3} className="form-section-title">
                <FileAddOutlined style={{ marginRight: '8px' }} />
                Thêm Bài Viết Mới
            </Title>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                initialValues={{
                    // Giá trị mặc định nếu có
                }}
            >
                <Row gutter={24}> {/* Sử dụng Row và Col cho responsive */}
                    <Col xs={24} md={16}> {/* Cột chính cho tiêu đề và nội dung */}
                        <Form.Item
                            name="title"
                            label="Tiêu đề bài viết"
                            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
                        >
                            <Input placeholder="Nhập tiêu đề bài viết" />
                        </Form.Item>

                        <Form.Item
                            name="content"
                            label="Nội dung bài viết"
                            rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
                        >
                            <Input.TextArea
                                rows={15} // Tăng số dòng cho dễ soạn thảo
                                placeholder="Nhập nội dung chi tiết của bài viết..."
                            // Lưu ý: Để có trải nghiệm soạn thảo WYSIWYG đầy đủ (in đậm, in nghiêng, chèn ảnh, v.v.),
                            // bạn nên cân nhắc sử dụng thư viện chuyên dụng như React Quill, Draft.js, CKEditor, TinyMCE.
                            // Ant Design Input.TextArea chỉ hỗ trợ văn bản thuần.
                            />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={8}> {/* Cột phụ cho loại tin và ảnh */}
                        <Form.Item
                            name="type"
                            label="Loại tin tức"
                            rules={[{ required: true, message: 'Vui lòng chọn loại tin tức!' }]}
                        >
                            <Select placeholder="Chọn loại tin tức">
                                {newsTypes.map(type => (
                                    <Option key={type.id} value={type.id}>{type.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="image"
                            label="Ảnh đại diện"
                            // valuePropName="fileList" // Không cần thiết nếu dùng custom logic với fileList state
                            // getValueFromEvent={normFile} // Có thể cần nếu xử lý phức tạp hơn
                            rules={[{ required: true, message: 'Vui lòng tải lên ảnh đại diện!' }]}
                        >
                            <Upload
                                customRequest={dummyRequest}
                                listType="picture-card" // Hiển thị dạng card xem trước ảnh
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
                                    // Chỉ cho phép tải lên 1 ảnh
                                    if (isJpgOrPng && isLt2M && fileList.length < 1) {
                                        return true;
                                    }
                                    if (fileList.length >= 1) {
                                        message.warning('Chỉ được phép tải lên một ảnh đại diện.');
                                    }
                                    return Upload.LIST_IGNORE; // Bỏ qua file nếu không hợp lệ hoặc đã có file
                                }}
                                onRemove={() => setFileList([])} // Xóa file khỏi state khi người dùng nhấn nút xóa
                                maxCount={1} // Chỉ cho phép tải 1 file
                            >
                                {fileList.length < 1 && (
                                    <div>
                                        <UploadOutlined />
                                        <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
                                    </div>
                                )}
                            </Upload>
                        </Form.Item>
                        <Paragraph type="secondary" style={{ marginTop: '-10px', fontSize: '12px' }}>
                            Hỗ trợ JPG, PNG. Kích thước tối đa 2MB.
                        </Paragraph>
                    </Col>
                </Row>

                <Divider />

                <Form.Item style={{ textAlign: 'right' }}> {/* Căn phải nút submit */}
                    <Button type="primary" htmlType="submit" loading={isSubmitting} size="large">
                        Thêm Mới
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
