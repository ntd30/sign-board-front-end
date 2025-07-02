import axios from './axios.customize'

const fetchAllUsersAPI = (current, pageSize, search = "") => {
    const URL_BACKEND = `/api/admin/users?page=${current}&size=${pageSize}&sort=id,desc&search=${encodeURIComponent(search)}`;
    return axios.get(URL_BACKEND);
};

const loginAPI = (username, password) => {
    const URL_BACKEND = "/api/auth/login"
    const data = {
        username: username,
        password: password,
        // delay: 2000
    }
    return axios.post(URL_BACKEND, data)
}

const getProfileAPI = () => {
    const URL_BACKEND = "/api/auth/profile"
    return axios.get(URL_BACKEND)
}

const logoutAPI = () => {
    const URL_BACKEND = "/api/auth/logout"
    return axios.post(URL_BACKEND)
}

const loginWithGoogle = () => {
    const URL_BACKEND = "/api/auth/google-login"

    return axios.get(URL_BACKEND)
}

const getAuthCode = (email) => {
    const URL_BACKEND = `/api/auth/forgot-password?email=${email}`
    return axios.post(URL_BACKEND)
}

const resetPasswordAPI = (token, newPassword) => {
    const URL_BACKEND = `/api/auth/reset-password`
    const data = {
        token: token,
        newPassword: newPassword,
    }
    return axios.post(URL_BACKEND, data)
}

const registerAPI = (username, email, password, fullName, phone, address) => {
    const URL_BACKEND = "/api/auth/register"
    const data = {
        username: username,
        email: email,
        password: password,
        fullName: fullName,
        phoneNumber: phone,
        address: address,
    }
    return axios.post(URL_BACKEND, data)
}

const createUserAPI = (username, email, password, fullName, phoneNumber, address, roleId) => {
    const URL_BACKEND = "api/admin/users/create"
    const data = {
        username: username,
        email: email,
        password: password,
        fullName: fullName,
        phoneNumber: phoneNumber,
        address: address,
        isActive: true,
        roleId: roleId
    }
    return axios.post(URL_BACKEND, data)
}

const updateUserAPI = (id, fullName, phoneNumber, address, active, roleId) => {
    const URL_BACKEND = `/api/admin/users/${id}`
    const data = {
        fullName: fullName,
        phoneNumber: phoneNumber,
        address: address,
        isActive: active,
        roleId: roleId
    }
    return axios.put(URL_BACKEND, data)
}

const deleteUserAPI = (id) => {
    const URL_BACKEND = `/api/admin/users/${id}`
    return axios.delete(URL_BACKEND)
}

const fetchAllProductsAPI = (current, pageSize) => {
    const URL_BACKEND = `/api/products/list?page=${current}&size=${pageSize}&sort=createdAt,desc`
    return axios.get(URL_BACKEND)
}

const createProductAPI = (formData) => {
    const URL_BACKEND = "api/admin/product/create";
    return axios.post(URL_BACKEND, formData);
};

const deleteProductAPI = (id) => {
    const URL_BACKEND = `/api/admin/product/delete/${id}`
    return axios.delete(URL_BACKEND)
}

const updateProductAPI = async (productId, formData) => {
    const URL_BACKEND = `api/admin/product/edit/${productId}`
    try {
        const response = await axios.put(URL_BACKEND, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Lỗi khi gọi API cập nhật sản phẩm" };
    }
}

const fetchAllParentCategoriesAPI = () => {
    const URL_BACKEND = `/api/categories/parent`
    return axios.get(URL_BACKEND)
}

const fetchAllCategoriesAPI = (current, pageSize) => {
    const URL_BACKEND = `/api/categories/list?page=${current}&size=${pageSize}&sort=id,desc`
    return axios.get(URL_BACKEND)
}

const createCategoryAPI = (name, parentCategory, description) => {
    const URL_BACKEND = "/api/admin/category/create"
    const data = {
        name: name,
        parentCategory: parentCategory,
        description: description
    }
    return axios.post(URL_BACKEND, data)

}
const updateCategoryAPI = (id, name, description) => {
    const URL_BACKEND = `/api/admin/category/edit/${id}`
    const data = {
        name: name,
        description: description
    }
    return axios.put(URL_BACKEND, data)
}

const fetchAllNewsAPI = () => {
    const URL_BACKEND = "/api/cms/news"
    return axios.get(URL_BACKEND)
}

const fetchAllProjectsAPI = () => {
    const URL_BACKEND = "/api/cms/featured-projects"
    return axios.get(URL_BACKEND)
}

const uploadDesign = (userId, designImage, desc) => {
    const URL_BACKEND = `/api/user-designs/${userId}`

    const bodyFormData = new FormData()
    bodyFormData.append("designImage", designImage)
    bodyFormData.append("designLink", null)
    bodyFormData.append("desc", desc)

    let config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    return axios.post(URL_BACKEND, bodyFormData, config)
}

const fetchAllRolesAPI = (current, pageSize) => {
    const URL_BACKEND = `/api/admin/roles?page=${current - 1}&size=${pageSize}`
    return axios.get(URL_BACKEND)
}

const fetchRoleByIdAPI = (roleId) => {
    const URL_BACKEND = `/api/admin/roles/${roleId}`
    return axios.get(URL_BACKEND)
}

const createRoleAPI = (name, active, description) => {
    const URL_BACKEND = "/api/admin/roles"
    const data = {
        name: name,
        active: active,
        description: description
    }
    return axios.post(URL_BACKEND, data)

}
const updateRoleAPI = (id, name, active, description) => {
    const URL_BACKEND = `/api/admin/roles/${id}`
    const data = {
        name: name,
        active: active,
        description: description
    }
    return axios.put(URL_BACKEND, data)
}

const ganNhieuQuyenChoVaiTro = (roleId, permissionIds) => {
    const URL_BACKEND = `/api/admin/permissions/assign`
    const data = {
        roleId: roleId,
        permissionIds: permissionIds
    }
    return axios.post(URL_BACKEND, data)
}

const goNhieuQuyenChoVaiTro = (roleId, permissionIds) => {
    console.log("relid", roleId)
    console.log("permissionIds", permissionIds)
    const URL_BACKEND = `/api/admin/permissions/revoke`
    const data = {
        roleId: roleId,
        permissionIds: permissionIds
    }
    return axios.delete(URL_BACKEND, {
        data: data,
        headers: {
            "Content-Type": "application/json"
        }
    })
}

const deleteRoleAPI = (id) => {
    const URL_BACKEND = `/api/admin/roles/${id}`
    return axios.delete(URL_BACKEND)
}

const fetchAllPermissionsAPI = (current, pageSize) => {
    const URL_BACKEND = `/api/admin/permissions?page=${current}&size=${pageSize}`
    return axios.get(URL_BACKEND)
}

const createPermissionAPI = (name, apiPath, method, module) => {
    const URL_BACKEND = "api/admin/permissions"
    const data = {
        name: name,
        apiPath: apiPath,
        method: method,
        module: module
    }
    return axios.post(URL_BACKEND, data)
}

const updatePermissionAPI = (id, name, apiPath, method, module) => {
    const URL_BACKEND = "api/admin/permissions"
    const data = {
        id: id,
        name: name,
        apiPath: apiPath,
        method: method,
        module: module
    }
    return axios.put(URL_BACKEND, data)
}

const deletePermissionAPI = (id) => {
    const URL_BACKEND = `api/admin/permissions/${id}`
    return axios.delete(URL_BACKEND)
}

const deleteCategoryAPI = (id) => {
    const URL_BACKEND = `api/admin/category/delete/${id}`
    return axios.delete(URL_BACKEND)
}

const fetchAllDesignsAPI = (current, pageSize) => {
    const URL_BACKEND = `/api/admin/user-designs?page=${current - 1}&size=${pageSize}`
    return axios.get(URL_BACKEND)
}

const deleteDesignAPI = (id) => {
    const URL_BACKEND = `/api/admin/user-designs/${id}`
    return axios.delete(URL_BACKEND)

}
const deleteArticleAPI = (id) => {
    const URL_BACKEND = `/api/admin/article/delete/${id}`
    return axios.delete(URL_BACKEND)
}

const loadProductsByCategoryAPI = (categoryId, current, pageSize) => {
    console.log("cateid", categoryId)
    const URL_BACKEND = `/api/categories/${categoryId}/products?page=${current}&size=${pageSize}`
    return axios.get(URL_BACKEND)
}

const createContactAPI = (name, phone, email, address, message, productId) => {
    console.log("phone", phone)
    const URL_BACKEND = `/api/inquiries/create`
    const data = {
        name: name,
        phone: phone,
        email: email,
        address: address,
        message: message || '',
        productId: productId || null,
    }
    return axios.post(URL_BACKEND, data)
}

const updateDesignAPI = (id, desc, status) => {
    const URL_BACKEND = `/api/admin/user-designs/${id}?status=${status}`
    return axios.put(URL_BACKEND)
}

const fetchAllArticlesAPI = (current, pageSize) => {
    const URL_BACKEND = `/api/cms/list?page=${current}&size=${pageSize}`
    return axios.get(URL_BACKEND)
}

const fetchAllContactAPI = (current, pageSize) => {
    const URL_BACKEND = `/api/admin/inquiry/list?page=${current}&size=${pageSize}`
    return axios.get(URL_BACKEND)
}

// Không gói lại FormData nữa
const createArticleAPI = async (formData) => {
    const URL_BACKEND = "/api/admin/article/create";
    return axios.post(URL_BACKEND, formData);
};


const updateArticleAPI = async (id, formData) => {
const URL_BACKEND = `api/admin/article/edit/${id}`
    try {
        const response = await axios.put(URL_BACKEND, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Lỗi khi gọi API cập nhật tin tức" };
    }
};

const updateContactAPI = (id, status) => {
    const URL_BACKEND = `/api/admin/inquiry/${id}/status?status=${status}`
    return axios.put(URL_BACKEND)
}



export {
    fetchAllUsersAPI, loginAPI, logoutAPI, registerAPI, createUserAPI, updateUserAPI, deleteUserAPI,
    fetchAllProductsAPI, createProductAPI, deleteProductAPI, updateProductAPI, loginWithGoogle, getAuthCode,
    resetPasswordAPI, fetchAllCategoriesAPI, fetchAllNewsAPI, fetchAllProjectsAPI, uploadDesign, fetchAllRolesAPI,
    createRoleAPI, fetchAllPermissionsAPI, createPermissionAPI, updatePermissionAPI, deletePermissionAPI, fetchAllParentCategoriesAPI,
    createCategoryAPI, ganNhieuQuyenChoVaiTro, fetchRoleByIdAPI, updateCategoryAPI, deleteCategoryAPI, fetchAllDesignsAPI,
    loadProductsByCategoryAPI, createContactAPI, deleteDesignAPI, deleteRoleAPI, fetchAllArticlesAPI, fetchAllContactAPI,
    deleteArticleAPI, createArticleAPI, updateArticleAPI, updateRoleAPI, goNhieuQuyenChoVaiTro, updateDesignAPI, updateContactAPI,
    getProfileAPI
}