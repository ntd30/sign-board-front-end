import { useEffect, useState } from "react"
import { fetchAllUsersAPI } from "../services/api.service"

const ManufacturePage = () => {
    const [dataUsers, setDataUsers] = useState([])

    const loadUsers = async () => {
        const users = await fetchAllUsersAPI()
        if (users.data) {
            // setCurrent(users.data.meta.current)
            // setPageSize(users.data.meta.pageSize)
            // setTotal(users.data.meta.total)
        }
        setDataUsers(users.data.result)
    }

    useEffect(() => {
        loadUsers()
    }, [])

    return (
        <h1>Duy</h1>
    )
}

export default ManufacturePage