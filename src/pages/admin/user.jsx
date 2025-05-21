import { useState, useEffect } from "react";
import UserCreate from "../../components/admin/user/user.create";
import { fetchAllUsersAPI } from "../../services/api.service";
import UserTable from "../../components/admin/user/user.table";

const UserPage = () => {
    const [dataUsers, setDataUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]); // Danh sách người dùng sau khi lọc
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [loadingTable, setLoadingTable] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // Tải toàn bộ danh sách người dùng (hoặc phân trang lớn)
    const loadUsers = async () => {
        setLoadingTable(true);
        try {
            // Giả sử API hỗ trợ lấy tất cả người dùng hoặc phân trang lớn
            const res = await fetchAllUsersAPI(1, 1000); // Tăng pageSize để lấy nhiều dữ liệu hơn
            if (res.data) {
                setDataUsers(res.data.content);
                setFilteredUsers(res.data.content); // Khởi tạo danh sách đã lọc
                setTotal(res.data.totalElements);
            }
        } catch (error) {
            console.error("Lỗi khi tải danh sách người dùng:", error);
        }
        setLoadingTable(false);
    };

    // Lọc người dùng dựa trên searchTerm
    useEffect(() => {
        const filtered = dataUsers.filter((user) =>
            Object.values(user)
                .join(" ")
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
        setTotal(filtered.length);
        setCurrent(1); // Đặt lại trang về 1 khi tìm kiếm
    }, [searchTerm, dataUsers]);

    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <>
            <UserCreate loadUsers={loadUsers} />
            <UserTable
                current={current}
                setCurrent={setCurrent}
                pageSize={pageSize}
                setPageSize={setPageSize}
                total={total}
                loadUsers={loadUsers}
                dataUsers={filteredUsers} // Truyền danh sách đã lọc
                loadingTable={loadingTable}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
        </>
    );
};

export default UserPage;