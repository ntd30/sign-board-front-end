import { useContext, useState } from "react"
import DesignTable from "../../components/admin/design/design.table"
import { fetchAllDesignsAPI } from "../../services/api.service"
import { AuthContext } from "../../components/context/auth.context"

const DesignAdminPage = () => {
    const [dataDesigns, setDataDesigns] = useState([])
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [total, setTotal] = useState(0)
    const [loadingTable, setLoadingTable] = useState(false)

    const { user } = useContext(AuthContext);
    const permissionsOfCurrentUser = (user?.permissions || []).map(perm => perm.name)

    const loadDesigns = async () => {
        setLoadingTable(true)
        const res = await fetchAllDesignsAPI(current, pageSize)

        console.log(res)

        if (res.data) {
            setTotal(res?.data?.totalElements)
        }
        setDataDesigns(res?.data?.content)
        setLoadingTable(false)
    }

    return (
        <>
            <h2>Quản lý Bản thiết kế</h2>
            <DesignTable
                current={current}
                setCurrent={setCurrent}
                pageSize={pageSize}
                setPageSize={setPageSize}
                total={total}
                loadDesigns={loadDesigns}
                dataDesigns={dataDesigns}
                loadingTable={loadingTable}
                permissionsOfCurrentUser={permissionsOfCurrentUser}
            />
        </>
    )
}

export default DesignAdminPage