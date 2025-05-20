import { useState } from "react"
import RoleCreate from "../../components/admin/role/role.create"
import { fetchAllRolesAPI } from "../../services/api.service"
import RoleTable from "../../components/admin/role/role.table"
import { notification } from "antd"

const RolePage = () => {
    const [dataRoles, setDataRoles] = useState([])
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [total, setTotal] = useState(0)
    const [loadingTable, setLoadingTable] = useState(false)

    const loadRoles = async () => {
        setLoadingTable(true)
        try {
            const res = await fetchAllRolesAPI(current, pageSize)
            console.log("fetchAllRolesAPI response:", res) // Debug log
            if (res?.data?.content && Array.isArray(res.data.content)) {
                setDataRoles(res.data.content)
                setTotal(res.data.totalElements || 0)
            } else {
                setDataRoles([])
                setTotal(0)
                notification.error({
                    message: "Lỗi tải danh sách Vai trò",
                    description: `Dữ liệu vai trò không hợp lệ: ${JSON.stringify(res?.data)}`,
                })
            }
        } catch (error) {
            setDataRoles([])
            setTotal(0)
            notification.error({
                message: "Lỗi tải danh sách Vai trò",
                description: error.response?.data?.message || error.message || "Đã xảy ra lỗi khi tải dữ liệu",
            })
        } finally {
            setLoadingTable(false)
        }
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