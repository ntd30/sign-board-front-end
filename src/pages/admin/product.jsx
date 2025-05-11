// import { useState } from "react"
// import { fetchAllProductsAPI } from "../../services/api.service"
// import ProductCreate from "../../components/admin/product/product.create"
// import ProductTable from "../../components/admin/product/product.table"

// const ProductPage = () => {
//     const [dataProducts, setDataProducts] = useState([])
//     const [current, setCurrent] = useState(1)
//     const [pageSize, setPageSize] = useState(5)
//     const [total, setTotal] = useState(0)
//     const [loadingTable, setLoadingTable] = useState(false)

//     const loadProducts = async () => {
//         setLoadingTable(true)
//         const res = await fetchAllProductsAPI(current, pageSize)
//         if (res.data) {
//             setTotal(res.data.meta.total)
//         }
//         setDataProducts(res.data.result)
//         setLoadingTable(false)
//     }

//     return (
//         <>
//             <ProductCreate
//                 loadProducts={loadProducts}
//             />
//             <ProductTable
//                 current={current}
//                 setCurrent={setCurrent}
//                 pageSize={pageSize}
//                 setPageSize={setPageSize}
//                 total={total}
//                 loadProducts={loadProducts}
//                 dataProducts={dataProducts}
//                 loadingTable={loadingTable}
//             />
//         </>
//     )
// }

// export default ProductPage