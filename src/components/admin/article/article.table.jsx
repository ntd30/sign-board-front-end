import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { notification, Popconfirm, Space, Table, Input } from "antd";
import { useState, useEffect } from "react";
import moment from "moment";
import ArticleDetail from "./article.detail";
import { deleteArticleAPI, fetchArticleCategoryTreeAPI } from "../../../services/api.service";
import ArticleUpdate from "./article.update";

const { Search } = Input;

const ArticleTable = (props) => {
    const { dataArticles, loadArticles, current, setCurrent, pageSize, setPageSize, total, loadingTable, permissionsOfCurrentUser, searchTerm, setSearchTerm } = props;

    console.log("ArticleTable props - dataArticles:", dataArticles);
    if (dataArticles && dataArticles.length > 0) {
        console.log("First article type:", dataArticles[0].type);
        console.log("First article full data:", dataArticles[0]);
    }

    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);
    const [articleCategories, setArticleCategories] = useState([]);
    const [categoryMap, setCategoryMap] = useState({});
    const [categoriesLoaded, setCategoriesLoaded] = useState(false);

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

        console.log("Setting category map:", map);
        setCategoryMap(map);
        setCategoriesLoaded(true);
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
    const onChange = (pagination) => {
        if (+pagination.current !== +current) {
            setCurrent(+pagination.current);
        }
        if (+pagination.pageSize !== +pageSize) {
            setPageSize(+pagination.pageSize);
        }
    };

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    const handleGetDetailArticle = (record) => {
        setDataUpdate(record);
        setIsDetailOpen(true);
    };

    const handleEditArticle = (record) => {
        setDataUpdate(record);
        setIsUpdateOpen(true);
    };

    const handleDeleteArticle = async (idDelete) => {
        try {
            const res = await deleteArticleAPI(idDelete);
            if (res.data) {
                notification.success({
                    message: "Xóa bài viết",
                    description: "Xóa bài viết thành công!",
                });
                await loadArticles();
            } else {
                notification.error({
                    message: "Lỗi khi xóa bài viết",
                    description: JSON.stringify(res.message),
                });
            }
        } catch (error) {
            notification.error({
                message: "Lỗi khi xóa bài viết",
                description: error.message,
            });
        }
    };

    const columns = [
        {
            title: "STT",
            render: (_, record, index) => index + 1 + pageSize * (current - 1),
            width: 60,
        },
        {
            title: "Id",
            dataIndex: "id",
            render: (text, record) => (
                <a onClick={() => handleGetDetailArticle(record)}>{text}</a>
            ),
            width: 80
        },
        {
            title: 'Ảnh',
            dataIndex: 'featuredImageUrl',
            render: (text, record) => {
                const imageUrl = record.imageBase64
                    ? `data:image/jpeg;base64,${record.imageBase64}`
                    :
                    record.featuredImageUrl
                        ? `${import.meta.env.VITE_BACKEND_URL}${record.featuredImageUrl}`
                        :

                        "/default-image.jpg" // fallback nếu không có ảnh nào
                return (
                    <div>
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt={`Article ${record.id}`}
                                style={{ width: '100%', height: 200, objectFit: 'contain', display: 'block' }}
                                onError={(e) => {
                                    console.error('Failed to load image for record:', record.id, 'URL:', imageUrl);
                                    e.target.src = '/placeholder-image.jpg';
                                }}
                            />
                        ) : (
                            <p>Không có ảnh</p>
                        )}
                    </div>
                );
            },
            width: 250
        },
        {
            title: "Danh mục bài viết",
            dataIndex: "category",
            render: (category, record) => {
                // Ưu tiên hiển thị tên category từ dữ liệu thực tế
                if (category && category.name) {
                    return category.name;
                }

                // Nếu không có category, hiển thị type (tên danh mục đã được format)
                if (record.type) {
                    // Convert enum style back to readable name
                    return record.type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                }

                return '-';
            },
            width: 150
        },
        {
            title: "Tiêu đề",
            dataIndex: "title",
            width: 250,
            ellipsis: true,
        },
        {
            title: "Ảnh",
            dataIndex: "featuredImageUrl",
            width: 250,
            ellipsis: true,
            hidden: true
        },
        {
            title: "Ngày tạo",
            dataIndex: "createdAt",
            render: (date) => (date ? moment(date).format("DD/MM/YYYY HH:mm:ss") : "-"),
            width: 180,
        },
        {
            title: "Ngày cập nhật",
            dataIndex: "updatedAt",
            render: (date) => (date ? moment(date).format("DD/MM/YYYY HH:mm:ss") : "-"),
            width: 180,
        },
        {
            title: "Action",
            render: (_, record) => (
                <Space size="middle" style={{ gap: "20px" }}>
                    {permissionsOfCurrentUser.includes("ARTICLE_UPDATE") && (
                        <EditOutlined
                            style={{ color: "orange", cursor: "pointer" }}
                            onClick={() => handleEditArticle(record)}
                        />
                    )}
                    {permissionsOfCurrentUser.includes("ARTICLE_DELETE") && (
                        <Popconfirm
                            title="Xóa bài viết"
                            description="Bạn có chắc muốn xóa bài viết này?"
                            onConfirm={() => handleDeleteArticle(record.id)}
                            onCancel={() => { }}
                            okText="Xác nhận"
                            cancelText="Hủy"
                            placement="left"
                        >
                            <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
                        </Popconfirm>
                    )}
                </Space>
            ),
            width: 120,
            align: "center",
        },
    ];

    return (
        <>
            <div style={{ marginBottom: 16 }}>
                <Search
                    placeholder="Tìm kiếm theo tiêu đề, danh mục bài viết, ngày tạo hoặc ngày cập nhật"
                    allowClear
                    enterButton="Tìm kiếm"
                    size="large"
                    onSearch={handleSearch}
                    onChange={(e) => handleSearch(e.target.value)}
                    value={searchTerm}
                />
            </div>
            <Table
                dataSource={dataArticles}
                columns={columns}
                pagination={{
                    current: current,
                    pageSize: pageSize,
                    showSizeChanger: true,
                    total: total,
                    showTotal: (total, range) => (
                        <div>
                            {range[0]}-{range[1]} trên {total} rows
                        </div>
                    ),
                }}
                onChange={onChange}
                loading={loadingTable}
                rowKey="id"
            />
            <ArticleDetail
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
                dataUpdate={dataUpdate}
            />
            <ArticleUpdate
                isUpdateOpen={isUpdateOpen}
                setIsUpdateOpen={setIsUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadArticles={loadArticles}
            />
        </>
    );
};

export default ArticleTable;