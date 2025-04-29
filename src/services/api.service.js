import axios from './axios.customize'

const fetchAllUsersAPI = () => {
    const URL_BACKEND = `/api/v1/user`
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

export { fetchAllUsersAPI, loginAPI, logoutAPI, registerAPI }