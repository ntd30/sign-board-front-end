import { Children, useState } from "react"
import { fetchAllCategoriesAPI, fetchAllParentCategoriesAPI, fetchAllProductsAPI } from "../../services/api.service"
import ProductCreate from "../../components/admin/product/product.create"
import ProductTable from "../../components/admin/product/product.table"

const ProductPage = () => {
    const [dataProducts, setDataProducts] = useState([])
    const [dataCategories, setDataCategories] = useState([])

    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [total, setTotal] = useState(0)
    const [loadingTable, setLoadingTable] = useState(false)

    const loadProducts = async () => {
        setLoadingTable(true)
        const res = await fetchAllProductsAPI(current, pageSize)
        if (res.data) {
            setTotal(res.data.totalElements)
        }
        setDataProducts(res.data.content)
        setLoadingTable(false)
    }

    const getCategoriesSelect = async () => {
        const res = await fetchAllParentCategoriesAPI()
        setDataCategories(res.data.map((item) => ({
            value: item.id,
            label: item.name,
            children: item.childCategories ? item.childCategories.map((child) => ({
                value: child.id,
                label: child.name
            })) : []
        })))
    }

    return (
        <>
            <ProductCreate
                loadProducts={loadProducts}
                dataCategories={dataCategories}
                getCategoriesSelect={getCategoriesSelect}
            />
            <ProductTable
                current={current}
                setCurrent={setCurrent}
                pageSize={pageSize}
                setPageSize={setPageSize}
                total={total}
                loadProducts={loadProducts}
                dataProducts={dataProducts}
                loadingTable={loadingTable}
                dataCategories={dataCategories}
            />
        </>
    )
}

export default ProductPage