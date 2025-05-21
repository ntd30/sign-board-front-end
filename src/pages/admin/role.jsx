import { useState, useEffect } from "react";
import RoleCreate from "../../components/admin/role/role.create";
import { fetchAllRolesAPI } from "../../services/api.service";
import RoleTable from "../../components/admin/role/role.table";
import { notification } from "antd";

const RolePage = () => {
    const [dataRoles, setDataRoles] = useState([]);
    const [filteredRoles, setFilteredRoles] = useState([]); // Danh sách vai trò sau khi lọc
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [loadingTable, setLoadingTable] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); // Thêm trạng thái searchTerm

    // Tải toàn bộ danh sách vai trò
    const loadRoles = async () => {
        setLoadingTable(true);
        try {
            const res = await fetchAllRolesAPI(1, 1000); // Tăng pageSize để lấy nhiều dữ liệu
            console.log("fetchAllRolesAPI response:", res); // Debug log
            if (res?.data?.content && Array.isArray(res.data.content)) {
                setDataRoles(res.data.content);
                setFilteredRoles(res.data.content); // Khởi tạo danh sách đã lọc
                setTotal(res.data.totalElements || 0);
            } else {
                setDataRoles([]);
                setFilteredRoles([]);
                setTotal(0);
                notification.error({
                    message: "Lỗi tải danh sách Vai trò",
                    description: `Dữ liệu vai trò không hợp lệ: ${JSON.stringify(res?.data)}`,
                });
            }
        } catch (error) {
            setDataRoles([]);
            setFilteredRoles([]);
            setTotal(0);
            notification.error({
                message: "Lỗi tải danh sách Vai trò",
                description: error.response?.data?.message || error.message || "Đã xảy ra lỗi khi tải dữ liệu",
            });
        } finally {
            setLoadingTable(false);
        }
    };

    // Lọc vai trò dựa trên searchTerm
    useEffect(() => {
        const filtered = dataRoles.filter((role) =>
            [
                role.name,
                role.description,
                role.active ? "ACTIVE" : "INACTIVE"
            ]
                .filter(value => value) // Loại bỏ giá trị undefined/null
                .join(" ")
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        );
        setFilteredRoles(filtered);
        setTotal(filtered.length);
        setCurrent(1); // Đặt lại trang về 1 khi tìm kiếm
    }, [searchTerm, dataRoles]);

    useEffect(() => {
        loadRoles();
    }, []);

    return (
        <>
            <RoleCreate
                loadRoles={loadRoles}
            />
            <RoleTable
                current={current}
                setCurrent={setCurrent}
                pageSize={pageSize}
                setPageSize={setPageSize}
                total={total}
                loadRoles={loadRoles}
                dataRoles={filteredRoles} // Truyền danh sách đã lọc
                loadingTable={loadingTable}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm} // Truyền searchTerm và setSearchTerm
            />
        </>
    );
};

export default RolePage;