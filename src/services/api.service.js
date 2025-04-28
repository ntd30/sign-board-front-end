import axios from './axios.customize'

const fetchAllUsersAPI = () => {
    const URL_BACKEND = `/api/v1/user`
    return axios.get(URL_BACKEND)
}

export { fetchAllUsersAPI }