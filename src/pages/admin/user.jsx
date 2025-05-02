import { useState } from "react"
import UserCreate from "../../components/admin/user/user.create"
import { fetchAllUsersAPI } from "../../services/api.service"
import UserTable from "../../components/admin/user/user.table"

const UserPage = () => {
    const [dataUsers, setDataUsers] = useState([])
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [total, setTotal] = useState(0)
    const [loadingTable, setLoadingTable] = useState(false)

    const loadUsers = async () => {
        setLoadingTable(true)
        const res = await fetchAllUsersAPI(current, pageSize)
        if (res.data) {
            setTotal(res.data.meta.total)
        }
        setDataUsers(res.data.result)
        setLoadingTable(false)
    }

    return (
        <>
            <UserCreate
                loadUsers={loadUsers}
            />
            <UserTable
                current={current}
                setCurrent={setCurrent}
                pageSize={pageSize}
                setPageSize={setPageSize}
                total={total}
                loadUsers={loadUsers}
                dataUsers={dataUsers}
                loadingTable={loadingTable}
            />
        </>
    )
}

export default UserPage