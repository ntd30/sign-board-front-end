import { DeleteOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, notification, Popconfirm, Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import ArticleCategoryUpdate from "./article.category.update";
import { deleteArticleCategoryAPI, searchArticleCategoriesAPI } from "../../../services/api.service";

const ArticleCategoryRepository = {
    deleteCategory: async (id) => {
        try {
            const res = await deleteArticleCategoryAPI(id);
            return res;
        } catch (error) {
            throw error;
        }
    },
    searchCategories: async (keyword) => {
        try {
            const res = await searchArticleCategoriesAPI(keyword);
            return res;
        } catch (error) {
            throw error;
        }
    }
};

const ArticleCategoryTable = (props) => {
    const { 
        dataArticleCategories, 
        current, 
        setCurrent, 
        pageSize, 
        setPageSize, 
        total, 
        loadingTable, 
        loadArticleCategories, 
        permissionsOfCurrentUser 
    } = props;

    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchLoading, setSearchLoading] = useState(false);

    useEffect(() => {
        loadArticleCategories();
    }, [current, pageSize]);

    const onChange = (pagination) => {
        if (+pagination.current !== +current) {
            setCurrent(+pagination.current);
        }
        if (+pagination.pageSize !== +pageSize) {
            setPageSize(+pagination.pageSize);
        }
    };

    const handleEditCategory = (record) => {
        setDataUpdate(record);
        setIsUpdateOpen(true);
    };

    const handleDeleteCategory = async (idDelete) => {
        console.log("Deleting article category with ID:", idDelete)
        try {
            const res = await ArticleCategoryRepository.deleteCategory(idDelete);
            console.log("Delete API Response:", res);

            if (res && (res.data !== undefined || res.status === 200 || res === "Xóa danh mục thành công")) {
                await loadArticleCategories();
                notification.success({
                    message: "Xóa Danh mục bài viết",
                    description: "Xóa danh mục bài viết thành công!",
                });
            } else {
                throw new Error(res?.message || "Không có dữ liệu trả về khi xóa danh mục bài viết");
            }
        } catch (error) {
            console.error("Lỗi trong handleDeleteArticleCategory:", error);
            notification.error({
                message: "Lỗi khi xóa danh mục bài viết",
                description: error.response?.data?.message || error.message || "Đã xảy ra lỗi không xác định",
            });
        }
    };

    const handleSearch = async () => {
        if (!searchKeyword.trim()) {
            loadArticleCategories();
            return;
        }

        setSearchLoading(true);
        try {
            const res = await ArticleCategoryRepository.searchCategories(searchKeyword);
            if (res && res.data) {
                // Update table data with search results - this should be handled by the parent component
                // For now, we'll just trigger a reload of categories
                loadArticleCategories();
            }
        } catch (error) {
            console.error("Search error:", error);
            notification.error({
                message: "Lỗi tìm kiếm",
                description: "Không thể tìm kiếm danh mục bài viết"
            });
        } finally {
            setSearchLoading(false);
        }
    };

    const handleClearSearch = () => {
        setSearchKeyword("");
        loadArticleCategories();
    };



    const getLevelTag = (level) => {
        const levels = {
            0: { text: "Cấp 1", color: "blue" },
            1: { text: "Cấp 2", color: "green" },
            2: { text: "Cấp 3", color: "orange" }
        };
        const levelInfo = levels[level] || { text: `Cấp ${level + 1}`, color: "default" };
        return <Tag color={levelInfo.color}>{levelInfo.text}</Tag>;
    };

    const columns = [
        {
            title: 'STT',
            render: (_, record, index) => (
                <>
                    {index + 1 + pageSize * (current - 1)}
                </>
            ),
            width: 70,
        },
        {
            title: 'ID',
            dataIndex: 'id',
            width: 80,
        },
        {
            title: 'Tên Danh mục',
            dataIndex: 'name',
            width: 200,
            ellipsis: true,
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            width: 250,
            ellipsis: true,
        },
        {
            title: 'Cấp độ',
            dataIndex: 'level',
            width: 100,
            render: (level) => getLevelTag(level),
        },
        {
            title: 'Danh mục cha',
            dataIndex: 'parentName',
            width: 150,
            render: (parentName) => parentName || 'Danh mục gốc'
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            width: 150,
            render: (date) => date ? new Date(date).toLocaleDateString('vi-VN') : ''
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'updatedAt',
            width: 150,
            render: (date) => date ? new Date(date).toLocaleDateString('vi-VN') : ''
        },
        {
            title: 'Action',
            render: (_, record) => (
                <Space size="middle" style={{ gap: "20px" }}>
                    {permissionsOfCurrentUser.includes("ARTICLE_CATEGORY_UPDATE") && (
                        <EditOutlined
                            style={{ color: "orange", cursor: "pointer" }}
                            onClick={() => handleEditCategory(record)}
                        />
                    )}

                    {permissionsOfCurrentUser.includes("ARTICLE_CATEGORY_DELETE") && (
                        <Popconfirm
                            title="Xóa danh mục bài viết"
                            description="Bạn có chắc muốn xóa danh mục bài viết này?"
                            onConfirm={() => handleDeleteCategory(record.id)}
                            onCancel={() => {}}
                            okText="Xác nhận"
                            cancelText="Hủy"
                            placement='left'
                        >
                            <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
                        </Popconfirm>
                    )}
                </Space>
            ),
            width: 120,
        },
    ];

    return (
        <>
            <div style={{ marginBottom: 16, display: 'flex', gap: '10px' }}>
                <Input.Search
                    placeholder="Tìm kiếm danh mục bài viết..."
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    onSearch={handleSearch}
                    onPressEnter={handleSearch}
                    loading={searchLoading}
                    style={{ width: 300 }}
                />
                {searchKeyword && (
                    <Button onClick={handleClearSearch}>
                        Xóa bộ lọc
                    </Button>
                )}
            </div>

            <Table
                dataSource={dataArticleCategories}
                columns={columns}
                rowKey="id"
                pagination={{
                    current: current,
                    pageSize: pageSize,
                    showSizeChanger: true,
                    total: total,
                    showTotal: (total, range) => {
                        return (<div> {range[0]}-{range[1]} trên {total} rows</div>);
                    },
                }}
                onChange={onChange}
                loading={loadingTable}
                scroll={{ x: 1200 }}
                size="small"
                className="responsive-table"
            />

            <ArticleCategoryUpdate
                isUpdateOpen={isUpdateOpen}
                setIsUpdateOpen={setIsUpdateOpen}
                dataUpdate={dataUpdate}
                loadArticleCategories={loadArticleCategories}
            />

            <style jsx>{`
                .responsive-table :global(.ant-table) {
                    min-width: 100%;
                }
                @media (max-width: 768px) {
                    .responsive-table :global(.ant-table) {
                        font-size: 12px;
                    }
                    .responsive-table :global(.ant-table-cell) {
                        padding: 8px !important;
                    }
                }
            `}</style>
        </>
    );
};

export default ArticleCategoryTable;
