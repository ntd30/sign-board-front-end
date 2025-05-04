import axios from './axios.customize'

const fetchAllUsersAPI = (current, pageSize) => {
    const URL_BACKEND = `/api/v1/user?current=${current}&pageSize=${pageSize}`
    return axios.get(URL_BACKEND)
}

const loginAPI = (username, password) => {
    const URL_BACKEND = "/api/v1/auth/login"
    const data = {
        username: username,
        password: password,
        // delay: 2000
    }
    return axios.post(URL_BACKEND, data)
}

const logoutAPI = () => {
    const URL_BACKEND = "/api/v1/auth/logout"
    return axios.post(URL_BACKEND)
}

const registerAPI = (fullName, email, password, phone) => {
    const URL_BACKEND = "/api/v1/user/register"
    const data = {
        fullName: fullName,
        email: email,
        password: password,
        phone: phone
    }
    return axios.post(URL_BACKEND, data)
}

const createUserAPI = (email, password, fullName, phone) => {
    const URL_BACKEND = "api/v1/user"
    const data = {
        email: email,
        password: password,
        fullName: fullName,
        phone: phone
    }
    return axios.post(URL_BACKEND, data)
}

const updateUserAPI = (id, email, fullName, phone) => {
    const URL_BACKEND = "/api/v1/user"
    const data = {
        _id: id,
        email: email,
        fullName: fullName,
        phone: phone
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

export { fetchAllUsersAPI, loginAPI, logoutAPI, registerAPI, createUserAPI, updateUserAPI, deleteUserAPI, 
    fetchAllProductsAPI, createProductAPI, deleteProductAPI, updateProductAPI }