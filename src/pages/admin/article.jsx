import { useContext, useState } from "react"
import { fetchAllArticlesAPI } from "../../services/api.service"
import ArticleTable from "../../components/admin/article/article.table"
import ArticleCreate from "../../components/admin/article/article.create"
import { AuthContext } from "../../components/context/auth.context"

const ArticlesPage = () => {
    const [dataArticles, setDataArticles] = useState([])
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [total, setTotal] = useState(0)
    const [loadingTable, setLoadingTable] = useState(false)

    const { user } = useContext(AuthContext);
    const permissionsOfCurrentUser = (user?.permissions || []).map(perm => perm.name)

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
            {permissionsOfCurrentUser.includes("MANAGE_ARTICLES_CREATE") && (
                <ArticleCreate
                    loadArticles={loadArticles}
                />
            )}

            <ArticleTable
                current={current}
                setCurrent={setCurrent}
                pageSize={pageSize}
                setPageSize={setPageSize}
                total={total}
                loadArticles={loadArticles}
                dataArticles={dataArticles}
                loadingTable={loadingTable}
                permissionsOfCurrentUser={permissionsOfCurrentUser}
            />
        </>
    )
}

export default ArticlesPage