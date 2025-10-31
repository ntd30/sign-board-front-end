import { useContext, useState, useEffect, useCallback } from "react";
import { fetchAllArticleCategoriesAPI, fetchArticleCategoryTreeAPI } from "../../services/api.service";
import ArticleCategoryTable from "../../components/admin/article-category/article.category.table";
import { ArticleCategoryCreate } from "../../components/admin/article-category/article.category.create";
import { AuthContext } from "../../components/context/auth.context";
import { Card, Typography, Space, Divider } from "antd";

const { Title, Text } = Typography;

const ArticleCategoryPage = () => {
    // State management
    const [dataArticleCategories, setDataArticleCategories] = useState([]);
    const [dataParentCategories, setDataParentCategories] = useState([]);
    const [dataCategoryTree, setDataCategoryTree] = useState([]);

    // Pagination state
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10); // Tăng lên 10 để hiển thị nhiều hơn
    const [total, setTotal] = useState(0);
    const [loadingTable, setLoadingTable] = useState(false);

    // Authentication context
    const { user } = useContext(AuthContext);
    const permissionsOfCurrentUser = (user?.permissions || []).map(perm => perm.name);

    // Load article categories from API
    const loadArticleCategories = useCallback(async () => {
        setLoadingTable(true);
        try {
            console.log("Loading article categories with params:", { current, pageSize });
            const res = await fetchAllArticleCategoriesAPI(current, pageSize);
            console.log("API Response:", res);

            if (res && res.data) {
                setTotal(res.data.totalElements || 0);
                setDataArticleCategories(res.data.content || []);
            } else if (res && Array.isArray(res)) {
                // Handle case where response is direct array
                setDataArticleCategories(res);
                setTotal(res.length);
            }
        } catch (error) {
            console.error("Error loading article categories:", error);
            setDataArticleCategories([]);
            setTotal(0);
        } finally {
            setLoadingTable(false);
        }
    }, [current, pageSize]);

    // Get parent categories for select dropdown
    const getParentCategoriesSelect = useCallback(async () => {
        try {
            const res = await fetchArticleCategoryTreeAPI();
            if (res.data) {
                // Convert tree structure to flat select options
                const flattenCategories = (categories, level = 0) => {
                    let options = [];
                    categories.forEach((item) => {
                        options.push({
                            value: item.id,
                            label: '—'.repeat(level) + ' ' + item.name,
                            level: level
                        });
                        if (item.children && item.children.length > 0) {
                            options = options.concat(flattenCategories(item.children, level + 1));
                        }
                    });
                    return options;
                };

                const flattenedCategories = flattenCategories(res.data);
                setDataParentCategories(flattenedCategories);
                setDataCategoryTree(res.data);
                return flattenedCategories;
            }
            return [];
        } catch (error) {
            console.error("Error loading parent categories:", error);
            setDataParentCategories([]);
            return [];
        }
    }, []);

    // Load data on component mount
    useEffect(() => {
        loadArticleCategories();
    }, [loadArticleCategories]);

    return (
        <div style={{ padding: '20px' }}>
            <Card>
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <div>
                        <Title level={2} style={{ margin: 0 }}>Quản lý danh mục bài viết</Title>
                        <Text type="secondary" style={{ fontSize: '14px' }}>
                            Quản lý danh mục cho bài viết/tin tức - Hỗ trợ cấu trúc cây phân cấp tối đa 3 cấp (Cấp 0 → Cấp 1 → Cấp 2)
                        </Text>
                    </div>

                    <Divider />

                    {(permissionsOfCurrentUser.includes("ARTICLE_CATEGORY_CREATE") || user.roleName === "ADMIN") && (
                        <ArticleCategoryCreate
                            loadArticleCategories={loadArticleCategories}
                            dataParentCategories={dataParentCategories}
                            getParentCategoriesSelect={getParentCategoriesSelect}
                        />
                    )}

                    <ArticleCategoryTable
                        current={current}
                        setCurrent={setCurrent}
                        pageSize={pageSize}
                        setPageSize={setPageSize}
                        total={total}
                        loadingTable={loadingTable}
                        dataArticleCategories={dataArticleCategories}
                        loadArticleCategories={loadArticleCategories}
                        dataParentCategories={dataParentCategories}
                        permissionsOfCurrentUser={permissionsOfCurrentUser}
                    />
                </Space>
            </Card>
        </div>
    );
};

export default ArticleCategoryPage;
