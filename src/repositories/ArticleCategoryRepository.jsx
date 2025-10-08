import {
    deleteArticleCategoryAPI,
    fetchAllArticleCategoriesAPI,
    updateArticleCategoryAPI,
    fetchArticleCategoryTreeAPI,
    fetchArticleCategoryByIdAPI,
    createArticleCategoryAPI,
    searchArticleCategoriesAPI,
    fetchArticleCategoriesByLevelAPI
} from "../services/api.service";

class ArticleCategoryRepository {
    // Lấy danh sách danh mục bài viết với phân trang
    async getCategories(current, pageSize) {
        try {
            const response = await fetchAllArticleCategoriesAPI(current, pageSize);
            console.log("getArticleCategories response:", response);

            if (response && response.data) {
                return {
                    data: response.data.content || [],
                    total: response.data.totalElements || 0,
                    pageNumber: response.data.pageNumber || 1,
                    pageSize: response.data.pageSize || pageSize,
                    totalPages: response.data.totalPages || 0
                };
            }
            throw new Error(response?.message || "Không thể lấy danh sách danh mục bài viết");
        } catch (error) {
            console.error("Lỗi trong getArticleCategories:", error);
            throw new Error(`Lỗi khi lấy danh sách danh mục bài viết: ${error.message}`);
        }
    }

    // Lấy cây danh mục bài viết
    async getCategoryTree() {
        try {
            const response = await fetchArticleCategoryTreeAPI();
            console.log("getCategoryTree response:", response);

            if (response && response.data) {
                return response.data;
            }
            throw new Error(response?.message || "Không thể lấy cây danh mục bài viết");
        } catch (error) {
            console.error("Lỗi trong getCategoryTree:", error);
            throw new Error(`Lỗi khi lấy cây danh mục bài viết: ${error.message}`);
        }
    }

    // Lấy danh mục bài viết theo ID
    async getCategoryById(id) {
        try {
            const response = await fetchArticleCategoryByIdAPI(id);
            console.log("getCategoryById response:", response);

            if (response && response.data) {
                return response.data;
            }
            throw new Error(response?.message || "Không thể lấy thông tin danh mục bài viết");
        } catch (error) {
            console.error("Lỗi trong getCategoryById:", error);
            throw new Error(`Lỗi khi lấy thông tin danh mục bài viết: ${error.message}`);
        }
    }

    // Tạo danh mục bài viết mới
    async createCategory(name, parentId, description) {
        try {
            const response = await createArticleCategoryAPI(name, parentId, description);
            console.log("createArticleCategory response:", response);

            if (response && response.data) {
                return response.data;
            }
            throw new Error(response?.message || "Không thể tạo danh mục bài viết");
        } catch (error) {
            console.error("Lỗi trong createArticleCategory:", error);
            throw new Error(`Lỗi khi tạo danh mục bài viết: ${error.message}`);
        }
    }

    // Cập nhật danh mục bài viết
    async updateCategory(id, name, parentId, description) {
        try {
            const response = await updateArticleCategoryAPI(id, name, parentId, description);
            console.log("updateArticleCategory response:", response);

            if (response && response.data) {
                return response.data;
            }
            throw new Error(response?.message || "Không thể cập nhật danh mục bài viết");
        } catch (error) {
            console.error("Lỗi trong updateArticleCategory:", error);
            throw new Error(`Lỗi khi cập nhật danh mục bài viết: ${error.message}`);
        }
    }

    // Xóa danh mục bài viết theo ID
    async deleteCategory(id) {
        try {
            const response = await deleteArticleCategoryAPI(id);
            console.log("deleteArticleCategory response:", response);

            if (response && response.data !== undefined) {
                return response.data;
            }
            throw new Error(response?.message || "Không thể xóa danh mục bài viết");
        } catch (error) {
            console.error("Lỗi trong deleteArticleCategory:", error);
            throw new Error(`Lỗi khi xóa danh mục bài viết: ${error.message}`);
        }
    }

    // Tìm kiếm danh mục bài viết
    async searchCategories(keyword) {
        try {
            const response = await searchArticleCategoriesAPI(keyword);
            console.log("searchArticleCategories response:", response);

            if (response && response.data) {
                return response.data;
            }
            throw new Error(response?.message || "Không thể tìm kiếm danh mục bài viết");
        } catch (error) {
            console.error("Lỗi trong searchArticleCategories:", error);
            throw new Error(`Lỗi khi tìm kiếm danh mục bài viết: ${error.message}`);
        }
    }

    // Lấy danh mục theo level
    async getCategoriesByLevel(level) {
        try {
            const response = await fetchArticleCategoriesByLevelAPI(level);
            console.log("getCategoriesByLevel response:", response);

            if (response && response.data) {
                return response.data;
            }
            throw new Error(response?.message || "Không thể lấy danh mục theo cấp độ");
        } catch (error) {
            console.error("Lỗi trong getCategoriesByLevel:", error);
            throw new Error(`Lỗi khi lấy danh mục theo cấp độ: ${error.message}`);
        }
    }
}

export default new ArticleCategoryRepository();
