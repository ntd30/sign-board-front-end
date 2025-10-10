import { Drawer, Descriptions, Empty, Typography, Image } from "antd";
import { useState, useEffect } from "react";
import moment from "moment";
import { fetchArticleCategoryTreeAPI } from "../../../services/api.service";

const { Title, Paragraph } = Typography;

const ArticleDetail = (props) => {
    const { isDetailOpen, setIsDetailOpen, dataUpdate } = props;
    const [categoryMap, setCategoryMap] = useState({});

    // Load danh mục bài viết từ API
    useEffect(() => {
        loadArticleCategories();
    }, []);

    const loadArticleCategories = async () => {
        // Tạo category map cố định dựa trên dữ liệu mẫu từ database
        const map = {
            // Danh mục cha
            'dich-vu': 'Dịch vụ',
            'mau-bien-dep': 'Mẫu biển đẹp',
            'mau-chu': 'Mẫu chữ',
            'du-an': 'Dự án',

            // Danh mục con - Dịch vụ
            'lam-bien-quang-cao': 'Làm biển quảng cáo',
            'bien-hop-den-bien-vay': 'Biển hộp đèn – Biển vẫy',
            'bien-led-man-hinh-led': 'Biển Led – màn hình Led',
            'backrop-van-phong-khach-san': 'Backrop Văn Phòng – Khách sạn',
            'bien-cong-ty-bien-chuc-danh': 'Biển công ty – biển chức danh',

            // Danh mục con - Mẫu biển đẹp
            'mau-bien-linh-vuc-am-thuc': 'Mẫu biển lĩnh vực ẩm thực',
            'mau-bien-linh-vuc-spa': 'Mẫu biển lĩnh vực Spa',
            'mau-bien-linh-vuc-suc-khoe': 'Mẫu biển lĩnh vực Sức khỏe',
            'mau-bien-linh-vuc-khac': 'Mẫu biển lĩnh vực Khác',
        };

        console.log("Setting category map in detail:", map);
        setCategoryMap(map);
    };

    // Hàm để lấy tên danh mục từ slug hoặc enum cố định
    const getCategoryName = (type) => {
        if (!type) return '-';

        // Ánh xạ các giá trị enum cố định với tên hiển thị
        const typeMapping = {
            'news': 'Tin tức',
            'project': 'Dự án',
            'production_info': 'Thông tin sản xuất',
            'policy': 'Chính sách'
        };

        // Nếu là giá trị enum cố định, trả về tên hiển thị
        if (typeMapping[type]) {
            return typeMapping[type];
        }

        // Nếu không phải enum cố định, thử tìm trong category map
        return categoryMap[type] || type || '-';
    };

    return (
        <Drawer
            title="Chi Tiết Bài Viết"
            width={"100%"}
            open={isDetailOpen}
            onClose={() => setIsDetailOpen(false)}
            bodyStyle={{ padding: "16px" }}
        >
            {dataUpdate ? (
                <>
                    <Title level={4} style={{ marginBottom: "16px" }}>
                        {dataUpdate.title || "Không có tiêu đề"}
                    </Title>
                    <Descriptions bordered column={1} size="small">
                        <Descriptions.Item label="ID">{dataUpdate.id || "-"}</Descriptions.Item>
                        <Descriptions.Item label="Danh mục bài viết">
                            {dataUpdate.category && dataUpdate.category.name
                                ? dataUpdate.category.name
                                : (dataUpdate.type ? dataUpdate.type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : '-')}
                        </Descriptions.Item>
                        <Descriptions.Item label="Tiêu đề">
                            {dataUpdate.title || "-"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Ngày tạo">
                            {dataUpdate.createdAt
                                ? moment(dataUpdate.createdAt).format("DD/MM/YYYY HH:mm:ss")
                                : "-"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Ngày cập nhật">
                            {dataUpdate.updatedAt
                                ? moment(dataUpdate.updatedAt).format("DD/MM/YYYY HH:mm:ss")
                                : "-"}
                        </Descriptions.Item>
                    </Descriptions>
                    <div style={{ marginTop: "24px" }}>
                        <Title level={5} style={{ marginBottom: "8px" }}>
                            Hình ảnh nổi bật
                        </Title>
                        {dataUpdate.featuredImageUrl ? (
                            <Image
                                src={`${import.meta.env.VITE_BACKEND_URL}${dataUpdate.featuredImageUrl}`}
                                // style={{ width: '100%', height: 200, objectFit: 'contain', display: 'block' }}
                                alt="Hình ảnh nổi bật"
                                width={150}
                                height={150}
                                style={{ objectFit: "cover", borderRadius: "4px" }}
                                preview
                            />
                        ) : (
                            <Paragraph style={{ color: "#8c8c8c" }}>
                                Không có hình ảnh
                            </Paragraph>
                        )}
                    </div>
                    <div style={{ marginTop: "24px" }}>
                        <Title level={5} style={{ marginBottom: "8px" }}>
                            Nội dung
                        </Title>
                        <Paragraph
                            ellipsis={{
                                rows: 5,
                                expandable: true,
                                symbol: "Xem thêm",
                            }}
                            style={{ background: "#fafafa", padding: "12px", borderRadius: "4px" }}
                        >
                            {dataUpdate.content || "Không có nội dung"}
                        </Paragraph>
                    </div>
                </>
            ) : (
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="Không có dữ liệu bài viết"
                    style={{ marginTop: "50px" }}
                />
            )}
        </Drawer>
    );
};

export default ArticleDetail;