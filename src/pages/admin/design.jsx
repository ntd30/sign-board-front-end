import { useContext, useState, useEffect } from "react";
import DesignTable from "../../components/admin/design/design.table";
import { fetchAllDesignsAPI } from "../../services/api.service";
import { AuthContext } from "../../components/context/auth.context";

const DesignAdminPage = () => {
    const [dataDesigns, setDataDesigns] = useState([]);
    const [filteredDesigns, setFilteredDesigns] = useState([]); // Danh sách bản thiết kế sau khi lọc
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [loadingTable, setLoadingTable] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); // Thêm trạng thái searchTerm

    const { user } = useContext(AuthContext);
    const permissionsOfCurrentUser = (user?.permissions || []).map(perm => perm.name);

    // Tải toàn bộ danh sách bản thiết kế
    const loadDesigns = async () => {
        setLoadingTable(true);
        try {
            const res = await fetchAllDesignsAPI(1, 1000); // Tăng pageSize để lấy nhiều dữ liệu
            if (res.data) {
                setDataDesigns(res.data.content);
                setFilteredDesigns(res.data.content); // Khởi tạo danh sách đã lọc
                setTotal(res.data.totalElements);
            }
        } catch (error) {
            console.error("Lỗi khi tải danh sách bản thiết kế:", error);
        }
        setLoadingTable(false);
    };

    // Lọc bản thiết kế dựa trên searchTerm
    useEffect(() => {
        const filtered = dataDesigns.filter((design) =>
            [
                design.designerFullName,
                design.designerEmail,
                design.designerPhoneNumber,
                design.status,
                design.description
            ]
                .filter(value => value) // Loại bỏ giá trị undefined/null
                .join(" ")
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        );
        setFilteredDesigns(filtered);
        setTotal(filtered.length);
        setCurrent(1); // Đặt lại trang về 1 khi tìm kiếm
    }, [searchTerm, dataDesigns]);

    useEffect(() => {
        loadDesigns();
    }, []);

    return (
        <>
            <h2>Quản lý Bản thiết thiết kế</h2>
            <DesignTable
                current={current}
                setCurrent={setCurrent}
                pageSize={pageSize}
                setPageSize={setPageSize}
                total={total}
                loadDesigns={loadDesigns}
                dataDesigns={filteredDesigns} // Truyền danh sách đã lọc
                loadingTable={loadingTable}
                permissionsOfCurrentUser={permissionsOfCurrentUser}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm} // Truyền searchTerm và setSearchTerm
            />
        </>
    );
};

export default DesignAdminPage;