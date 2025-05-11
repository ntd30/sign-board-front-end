import { useState } from "react"
import { fetchAllPermissionsAPI } from "../../services/api.service"
import PermissionCreate from "../../components/admin/permission/permission.create"
import PermissionTable from "../../components/admin/permission/permission.table"

const PermissionPage = () => {
    const [dataPermissions, setDataPermissions] = useState([])
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [total, setTotal] = useState(0)
    const [loadingTable, setLoadingTable] = useState(false)

    const loadPermissions = async () => {
        setLoadingTable(true)
        const res = await fetchAllPermissionsAPI(current, pageSize)
        if (res.data) {
            setTotal(res.data.totalElements)
        }
        setDataPermissions(res.data.content)
        setLoadingTable(false)
    }

    return (
        <>
            <PermissionCreate
                loadPermissions={loadPermissions}
            />
            <PermissionTable
                current={current}
                setCurrent={setCurrent}
                pageSize={pageSize}
                setPageSize={setPageSize}
                total={total}
                loadPermissions={loadPermissions}
                dataPermissions={dataPermissions}
                loadingTable={loadingTable}
            />
        </>
    )
}

export default PermissionPage