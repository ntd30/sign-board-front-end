import { useState } from "react"
import { fetchAllArticlesAPI } from "../../services/api.service"
import ArticleCreate from "../../components/admin/article/article.create"
import ArticleTable from "../../components/admin/article/article.table"

const ArticlesPage = () => {
    const [dataArticles, setDataArticles] = useState([])
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [total, setTotal] = useState(0)
    const [loadingTable, setLoadingTable] = useState(false)

    const loadArticles = async () => {
        setLoadingTable(true)
        const res = await fetchAllArticlesAPI(current, pageSize)
        if (res.data) {
            setTotal(res.data.totalElements)
        }
        setDataArticles(res.data.content)
        setLoadingTable(false)
    }

    return (
        <>
            {/* <ArticleCreate
                loadArticles={loadArticles}
            /> */}
            <ArticleTable
                current={current}
                setCurrent={setCurrent}
                pageSize={pageSize}
                setPageSize={setPageSize}
                total={total}
                loadArticles={loadArticles}
                dataArticles={dataArticles}
                loadingTable={loadingTable}
            />
        </>
    )
}

export default ArticlesPage