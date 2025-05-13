import axios from './axios.customize'

const fetchAllUsersAPI = (current, pageSize) => {
    const URL_BACKEND = `/api/admin/users?page=${current}&size=${pageSize}`
    return axios.get(URL_BACKEND)
}

const loginAPI = (username, password) => {
    const URL_BACKEND = "/api/auth/login"
    const data = {
        username: username,
        password: password,
        // delay: 2000
    }
    return axios.post(URL_BACKEND, data)
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

const registerAPI = (username, email, password, fullName) => {
    const URL_BACKEND = "/api/auth/register"
    const data = {
        username: username,
        email: email,
        password: password,
        fullName: fullName
    }
    return axios.post(URL_BACKEND, data)
}

const createUserAPI = (username, email, password, fullName, phoneNumber, address, roleName) => {
    const URL_BACKEND = "api/admin/users/create"
    const data = {
        username: username,
        email: email,
        password: password,
        fullName: fullName,
        phoneNumber: phoneNumber,
        address: address,
        roleName: roleName
    }
    return axios.post(URL_BACKEND, data)
}

const updateUserAPI = (id, fullName, phoneNumber, address, active, roleName) => {
    const URL_BACKEND = `/api/admin/users/${id}`
    const data = {
        fullName: fullName,
        phoneNumber: phoneNumber,
        address: address,
        isActive: active,
        roleName: roleName
    }
    return axios.put(URL_BACKEND, data)
}

const deleteUserAPI = (id) => {
    const URL_BACKEND = `/api/v1/user/${id}`
    return axios.delete(URL_BACKEND)
}

const fetchAllProductsAPI = (current, pageSize) => {
    const URL_BACKEND = `/api/v1/products?current=${current}&pageSize=${pageSize}`
    return axios.get(URL_BACKEND)
}

const createProductAPI = (name, description, price) => {
    const URL_BACKEND = "api/v1/products"
    const data = {
        name: name,
        description: description,
        price: price
    }
    return axios.post(URL_BACKEND, data)
}

const deleteProductAPI = (id) => {
    const URL_BACKEND = `/api/v1/products/${id}`
    return axios.delete(URL_BACKEND)
}

const updateProductAPI = (id, name, description, price) => {
    const URL_BACKEND = "/api/v1/products"
    const data = {
        _id: id,
        name: name,
        description: description,
        price: price
    }
    return axios.put(URL_BACKEND, data)
}

const fetchAllCategoriesAPI = () => {
    const URL_BACKEND = "/api/categories/parent"
    return axios.get(URL_BACKEND)
}

const fetchAllNewsAPI = () => {
    const URL_BACKEND = "/api/cms/news"
    return axios.get(URL_BACKEND)
}

const fetchAllProjectsAPI = () => {
    const URL_BACKEND = "/api/cms/featured-projects"
    return axios.get(URL_BACKEND)
}

const uploadFile = (file, folder) => {
    const URL_BACKEND = "/api/v1/file/upload"

    const bodyFormData = new FormData()
    bodyFormData.append("fileImg", file)

    let config = {
        headers: {
            'upload-type': folder,
            'Content-Type': 'multipart/form-data'
        }
    }
    return axios.post(URL_BACKEND, bodyFormData, config)
}

const fetchAllRolesAPI = (current, pageSize) => {
    const URL_BACKEND = `/api/admin/roles?page=${current}&size=${pageSize}`
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

export {
    fetchAllUsersAPI, loginAPI, logoutAPI, registerAPI, createUserAPI, updateUserAPI, deleteUserAPI,
    fetchAllProductsAPI, createProductAPI, deleteProductAPI, updateProductAPI, loginWithGoogle, getAuthCode,
    resetPasswordAPI, fetchAllCategoriesAPI, fetchAllNewsAPI, fetchAllProjectsAPI, uploadFile, fetchAllRolesAPI,
    createRoleAPI, fetchAllPermissionsAPI, createPermissionAPI, updatePermissionAPI, deletePermissionAPI
}