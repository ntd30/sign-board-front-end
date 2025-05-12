import { useState } from "react"
import RoleCreate from "../../components/admin/role/role.create"
import { fetchAllRolesAPI } from "../../services/api.service"
import RoleTable from "../../components/admin/role/role.table"

const RolePage = () => {
    const [dataRoles, setDataRoles] = useState([])
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [total, setTotal] = useState(0)
    const [loadingTable, setLoadingTable] = useState(false)

    const loadRoles = async () => {
        setLoadingTable(true)
        const res = await fetchAllRolesAPI(current, pageSize)
        if (res.data) {
            setTotal(res.data.totalElements)
        }
        setDataRoles(res.data.content)
        setLoadingTable(false)
    }

    return (
        <>
            <RoleCreate
                loadRoles={loadRoles}
            />
            <RoleTable
                current={current}
                setCurrent={setCurrent}
                pageSize={pageSize}
                setPageSize={setPageSize}
                total={total}
                loadRoles={loadRoles}
                dataRoles={dataRoles}
                loadingTable={loadingTable}
            />
        </>
    )
}

export default RolePage