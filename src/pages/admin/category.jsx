import { Children, useState } from "react"
import { fetchAllCategoriesAPI, fetchAllParentCategoriesAPI } from "../../services/api.service"
import CategoryTable from "../../components/admin/category/category.table"
import CategoryCreate from "../../components/admin/category/category.create"

const CategoryPage = () => {
    const [dataCategories, setDataCategories] = useState([])
    const [dataParentCategories, setDataParentCategories] = useState([])

    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [total, setTotal] = useState(0)
    const [loadingTable, setLoadingTable] = useState(false)

    const loadCategories = async () => {
        setLoadingTable(true)
        const res = await fetchAllCategoriesAPI(current, pageSize)
        if (res.data) {
            setTotal(res.data.totalElements)
        }
        setDataCategories(res.data.content)
        setLoadingTable(false)
    }

    const getParentCategoriesSelect = async () => {
        const res = await fetchAllParentCategoriesAPI()
        setDataParentCategories(res.data.map((item) => ({
            value: item.id,
            label: item.name,
        })))
    }

    return (
        <>
            <CategoryCreate
                loadCategories={loadCategories}
                dataParentCategories={dataParentCategories}
                getParentCategoriesSelect={getParentCategoriesSelect}
            />
            <CategoryTable
                current={current}
                setCurrent={setCurrent}
                pageSize={pageSize}
                setPageSize={setPageSize}
                total={total}
                loadingTable={loadingTable}
                dataCategories={dataCategories}
                loadCategories={loadCategories}
                dataParentCategories={dataParentCategories}
            />
        </>
    )
}

export default CategoryPage