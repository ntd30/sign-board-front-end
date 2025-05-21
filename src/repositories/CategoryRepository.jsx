import { deleteCategoryAPI, fetchAllCategoriesAPI as getCategoriesAPI, updateCategoryAPI } from "./../services/api.service";

class CategoryRepository {
  // Lấy danh sách danh mục với phân trang
  async getCategories(current, pageSize) {
    try {
      const response = await getCategoriesAPI(current, pageSize);
      console.log("getCategories response:", response); // Log để kiểm tra response

      if (response && response.data && response.data.categories) {
        return {
          data: response.data.categories,
          total: response.data.total || 0, // Đảm bảo total luôn có giá trị
        };
      }
      throw new Error(response?.message || "Không thể lấy danh sách danh mục");
    } catch (error) {
      console.error("Lỗi trong getCategories:", error); // Log lỗi chi tiết
      throw new Error(`Lỗi khi lấy danh sách danh mục: ${error.message}`);
    }
  }

  // Xóa danh mục theo ID
  async deleteCategory(id) {
    try {
      const response = await deleteCategoryAPI(id);
      console.log("deleteCategory response:", response); // Log để kiểm tra response

      if (response && response.data) {
        return response.data;
      }
      throw new Error(response?.message || "Không thể xóa danh mục");
    } catch (error) {
      console.error("Lỗi trong deleteCategory:", error); // Log lỗi chi tiết
      throw new Error(`Lỗi khi xóa danh mục: ${error.message}`);
    }
  }

  // Cập nhật danh mục
  async updateCategory(id, categoryData) {
    try {
      const response = await updateCategoryAPI(id, categoryData);
      console.log("updateCategory response:", response); // Log để kiểm tra response

      if (response && response.data) {
        return response.data;
      }
      throw new Error(response?.message || "Không thể cập nhật danh mục");
    } catch (error) {
      console.error("Lỗi trong updateCategory:", error); // Log lỗi chi tiết
      throw new Error(`Lỗi khi cập nhật danh mục: ${error.message}`);
    }
  }
}

export default new CategoryRepository();