import { useContext, useState, useEffect } from "react";
import { fetchAllArticlesAPI } from "../../services/api.service";
import ArticleTable from "../../components/admin/article/article.table";
import ArticleCreate from "../../components/admin/article/article.create";
import { AuthContext } from "../../components/context/auth.context";
import moment from "moment";

const ArticlesPage = () => {
    const [dataArticles, setDataArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]); // Danh sách bài viết sau khi lọc
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [loadingTable, setLoadingTable] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); // Thêm trạng thái searchTerm

    const { user } = useContext(AuthContext);
    const permissionsOfCurrentUser = (user?.permissions || []).map(perm => perm.name);

    // Tải toàn bộ danh sách bài viết
    const loadArticles = async () => {
        setLoadingTable(true);
        try {
            const res = await fetchAllArticlesAPI(1, 1000); // Tăng pageSize để lấy nhiều dữ liệu
            if (res.data) {
                setDataArticles(res.data.content);
                setFilteredArticles(res.data.content); // Khởi tạo danh sách đã lọc
                setTotal(res.data.totalElements);
            }
        } catch (error) {
            console.error("Lỗi khi tải danh sách bài viết:", error);
        }
        setLoadingTable(false);
    };

    // Lọc bài viết dựa trên searchTerm
    useEffect(() => {
        const filtered = dataArticles.filter((article) =>
            [
                article.title,
                article.type,
                article.createdAt ? moment(article.createdAt).format("DD/MM/YYYY HH:mm:ss") : "",
                article.updatedAt ? moment(article.updatedAt).format("DD/MM/YYYY HH:mm:ss") : ""
            ]
                .filter(value => value) // Loại bỏ giá trị undefined/null
                .join(" ")
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        );
        setFilteredArticles(filtered);
        setTotal(filtered.length);
        setCurrent(1); // Đặt lại trang về 1 khi tìm kiếm
    }, [searchTerm, dataArticles]);

    useEffect(() => {
        loadArticles();
    }, []);

    return (
        <>
            {permissionsOfCurrentUser.includes("ARTICLE_CREATE") && (
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
                dataArticles={filteredArticles} // Truyền danh sách đã lọc
                loadingTable={loadingTable}
                permissionsOfCurrentUser={permissionsOfCurrentUser}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm} // Truyền searchTerm và setSearchTerm
            />
        </>
    );
};

export default ArticlesPage;