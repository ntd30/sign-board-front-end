import { DeleteOutlined, EditOutlined, SearchOutlined, DownOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Input, notification, Popconfirm, Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import ArticleCategoryUpdate from "./article.category.update";
import { deleteArticleCategoryAPI, searchArticleCategoriesAPI, fetchArticleCategoryTreeAPI } from "../../../services/api.service";

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
        current, 
        setCurrent, 
        pageSize, 
        setPageSize, 
        loadingTable, 
        permissionsOfCurrentUser 
    } = props;
    
    const [dataArticleCategories, setDataArticleCategories] = useState([]);
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);

    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchLoading, setSearchLoading] = useState(false);

    useEffect(() => {
        loadArticleCategoriesTree();
    }, [current, pageSize]);
    
    const loadArticleCategoriesTree = async () => {
        try {
            const res = await fetchArticleCategoryTreeAPI();
            const formattedData = formatTreeData(res.data);
            setDataArticleCategories(formattedData);
        } catch (error) {
            console.error("Error loading categories:", error);
            notification.error({
                message: "Lỗi",
                description: "Không thể tải danh sách danh mục"
            });
        }
    };
    
    const formatTreeData = (categories, parentId = null, level = 0) => {
        return categories.reduce((acc, category) => {
            const newCategory = {
                ...category,
                key: category.id,
                level,
                parentId,
                hasChildren: category.children && category.children.length > 0,
                children: null // We'll handle children with expanded rows
            };
            
            if (category.children && category.children.length > 0) {
                return [
                    ...acc,
                    newCategory,
                    ...formatTreeData(category.children, category.id, level + 1)
                ];
            }
            return [...acc, newCategory];
        }, []);
    };
    
    const onExpand = (expanded, record) => {
        if (expanded) {
            setExpandedRowKeys([...expandedRowKeys, record.key]);
        } else {
            setExpandedRowKeys(expandedRowKeys.filter(key => key !== record.key));
        }
    };
    
    const isExpanded = (record) => expandedRowKeys.includes(record.key);
    
    const getRowClassName = (record) => {
        return `level-${record.level}`;
    };
    
    const getNestedRows = (record) => {
        if (!record.hasChildren) return [];
        return dataArticleCategories.filter(item => item.parentId === record.id);
    };

    const onChange = (pagination) => {
        if (+pagination.current !== +current) {
            setCurrent(+pagination.current);
        }
        if (+pagination.pageSize !== +pageSize) {
            setPageSize(+pagination.pageSize);
        }
    };

    const handleEditCategory = (record) => {
        // Tạo một bản sao của record và đảm bảo có đầy đủ các trường cần thiết
        const categoryData = {
            ...record,
            // Đảm bảo có các trường bắt buộc
            id: record.id,
            name: record.name,
            description: record.description || '',
            image64: record.image64 || null,
            parentId: record.parentId || null,
            isActive: record.isActive !== undefined ? record.isActive : true
        };
        
        console.log('Setting category data for update:', categoryData);
        setDataUpdate(categoryData);
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
            loadArticleCategoriesTree();
            return;
        }

        setSearchLoading(true);
        try {
            const res = await ArticleCategoryRepository.searchCategories(searchKeyword);
            if (res && res.data) {
                // Flatten the search results for display
                const formattedData = formatTreeData(res.data);
                setDataArticleCategories(formattedData);
            }
        } catch (error) {
            console.error("Search error:", error);
            notification.error({
                message: "Lỗi tìm kiếm",
                description: error.response?.data?.message || "Đã xảy ra lỗi khi tìm kiếm"
            });
        } finally {
            setSearchLoading(false);
        }
    };

    const handleClearSearch = () => {
        setSearchKeyword("");
        loadArticleCategoriesTree();
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
            title: 'Tên danh mục',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <div style={{ display: 'flex', alignItems: 'center', paddingLeft: `${record.level * 20}px` }}>
                    {record.hasChildren && (
                        <span style={{ marginRight: 8 }}>
                            {isExpanded(record) ? <DownOutlined /> : <RightOutlined />}
                        </span>
                    )}
                    {!record.hasChildren && <span style={{ width: 16, display: 'inline-block' }}></span>}
                    <span>{text}</span>
                </div>
            ),
        },
        {
            title: 'Slug',
            dataIndex: 'slug',
            key: 'slug',
        },
        {
            title: 'Số bài viết',
            dataIndex: 'articleCount',
            key: 'articleCount',
            align: 'center',
        },
        
        {
            title: 'Cấp độ',
            dataIndex: 'level',
            width: 100,
            render: (level) => getLevelTag(level),
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
                columns={columns}
                dataSource={dataArticleCategories}
                rowKey="id"
                pagination={{
                    current,
                    pageSize,
                    total: dataArticleCategories.length,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '50', '100'],
                    onChange: (page, pageSize) => {
                        setCurrent(page);
                        setPageSize(pageSize);
                    },
                }}
                loading={loadingTable || searchLoading}
                onChange={onChange}
                expandable={{
                    expandedRowKeys,
                    onExpand: (expanded, record) => onExpand(expanded, record),
                    rowExpandable: record => record.hasChildren,
                    expandIcon: () => null,
                }}
                rowClassName={getRowClassName}
            />

            <ArticleCategoryUpdate
                isUpdateOpen={isUpdateOpen}
                setIsUpdateOpen={setIsUpdateOpen}
                dataUpdate={dataUpdate}
                loadArticleCategories={loadArticleCategoriesTree}
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
