import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { notification, Popconfirm, Space, Table, Input } from "antd";
import { useState } from "react";
import moment from "moment";
import ArticleDetail from "./article.detail";
import { deleteArticleAPI } from "../../../services/api.service";
import ArticleUpdate from "./article.update";

const { Search } = Input;

const ArticleTable = (props) => {
    const { dataArticles, loadArticles, current, setCurrent, pageSize, setPageSize, total, loadingTable, permissionsOfCurrentUser, searchTerm, setSearchTerm } = props;

    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);

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
            hidden: true
        },
        {
            title: 'Ảnh',
            dataIndex: 'featuredImageUrl',
            render: (text, record) => {
                const imageUrl = text ? `${import.meta.env.VITE_BACKEND_URL}${text}` : '';
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
            title: "Loại bài viết",
            dataIndex: "type",
            width: 100
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
                    {permissionsOfCurrentUser.includes("MANAGE_ARTICLES_UPDATE") && (
                        <EditOutlined
                            style={{ color: "orange", cursor: "pointer" }}
                            onClick={() => handleEditArticle(record)}
                        />
                    )}
                    {permissionsOfCurrentUser.includes("MANAGE_ARTICLES_DELETE") && (
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
                    placeholder="Tìm kiếm theo tiêu đề, loại bài viết, ngày tạo hoặc ngày cập nhật"
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