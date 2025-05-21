import { useContext, useState, useEffect } from "react";
import { fetchAllCategoriesAPI, fetchAllParentCategoriesAPI, fetchAllProductsAPI } from "../../services/api.service";
import ProductCreate from "../../components/admin/product/product.create";
import ProductTable from "../../components/admin/product/product.table";
import { AuthContext } from "../../components/context/auth.context";

const ProductPage = () => {
    const [dataProducts, setDataProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]); // Danh sách sản phẩm sau khi lọc
    const [dataCategories, setDataCategories] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [loadingTable, setLoadingTable] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); // Thêm trạng thái searchTerm

    const { user } = useContext(AuthContext);
    const permissionsOfCurrentUser = (user?.permissions || []).map(perm => perm.name);

    // Tải toàn bộ danh sách sản phẩm
    const loadProducts = async () => {
        setLoadingTable(true);
        try {
            const res = await fetchAllProductsAPI(1, 1000); // Tăng pageSize để lấy nhiều dữ liệu
            if (res.data) {
                setDataProducts(res.data.content);
                setFilteredProducts(res.data.content); // Khởi tạo danh sách đã lọc
                setTotal(res.data.totalElements);
            }
        } catch (error) {
            console.error("Lỗi khi tải danh sách sản phẩm:", error);
        }
        setLoadingTable(false);
    };

    // Lọc sản phẩm dựa trên searchTerm
    useEffect(() => {
        const filtered = dataProducts.filter((product) =>
            [
                product.name,
                product.description,
                product.category?.name,
                product.dimensions,
                product.createdAt,
                product.updatedAt
            ]
                .filter(value => value) // Loại bỏ giá trị undefined/null
                .join(" ")
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
        setTotal(filtered.length);
        setCurrent(1); // Đặt lại trang về 1 khi tìm kiếm
    }, [searchTerm, dataProducts]);

    // Tải danh mục
    const getCategoriesSelect = async () => {
        const res = await fetchAllParentCategoriesAPI();
        setDataCategories(
            res.data.map((item) => ({
                value: item.id,
                label: item.name,
                children: item.childCategories
                    ? item.childCategories.map((child) => ({
                          value: child.id,
                          label: child.name,
                      }))
                    : [],
            }))
        );
    };

    useEffect(() => {
        loadProducts();
        getCategoriesSelect();
    }, []);

    return (
        <>
            {permissionsOfCurrentUser.includes("CREATE_PRODUCTS") && (
                <ProductCreate
                    loadProducts={loadProducts}
                    dataCategories={dataCategories}
                    getCategoriesSelect={getCategoriesSelect}
                />
            )}
            <ProductTable
                current={current}
                setCurrent={setCurrent}
                pageSize={pageSize}
                setPageSize={setPageSize}
                total={total}
                loadProducts={loadProducts}
                dataProducts={filteredProducts} // Truyền danh sách đã lọc
                loadingTable={loadingTable}
                dataCategories={dataCategories}
                permissionsOfCurrentUser={permissionsOfCurrentUser}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm} // Truyền searchTerm và setSearchTerm
            />
        </>
    );
};

export default ProductPage;