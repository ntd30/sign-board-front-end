import { useState, useEffect } from "react";
import { fetchAllPermissionsAPI } from "../../services/api.service";
import PermissionCreate from "../../components/admin/permission/permission.create";
import PermissionTable from "../../components/admin/permission/permission.table";
import { notification } from "antd";

const PermissionPage = () => {
    const [dataPermissions, setDataPermissions] = useState([]);
    const [filteredPermissions, setFilteredPermissions] = useState([]); // Danh sách quyền hạn sau khi lọc
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [loadingTable, setLoadingTable] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); // Thêm trạng thái searchTerm

    // Tải toàn bộ danh sách quyền hạn
    const loadPermissions = async () => {
        setLoadingTable(true);
        try {
            const res = await fetchAllPermissionsAPI(1, 1000); // Tăng pageSize để lấy nhiều dữ liệu
            if (res?.data?.content && Array.isArray(res.data.content)) {
                setDataPermissions(res.data.content);
                setFilteredPermissions(res.data.content); // Khởi tạo danh sách đã lọc
                setTotal(res.data.totalElements || 0);
            } else {
                setDataPermissions([]);
                setFilteredPermissions([]);
                setTotal(0);
                notification.error({
                    message: "Lỗi tải danh sách Quyền hạn",
                    description: `Dữ liệu quyền hạn không hợp lệ: ${JSON.stringify(res?.data)}`,
                });
            }
        } catch (error) {
            setDataPermissions([]);
            setFilteredPermissions([]);
            setTotal(0);
            notification.error({
                message: "Lỗi tải danh sách Quyền hạn",
                description: error.response?.data?.message || error.message || "Đã xảy ra lỗi khi tải dữ liệu",
            });
        } finally {
            setLoadingTable(false);
        }
    };

    // Lọc quyền hạn dựa trên searchTerm
    useEffect(() => {
        const filtered = dataPermissions.filter((permission) =>
            [
                permission.name,
                permission.apiPath,
                permission.method,
                permission.module,
                permission.createdAt,
                permission.updatedAt
            ]
                .filter(value => value) // Loại bỏ giá trị undefined/null
                .join(" ")
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        );
        setFilteredPermissions(filtered);
        setTotal(filtered.length);
        setCurrent(1); // Đặt lại trang về 1 khi tìm kiếm
    }, [searchTerm, dataPermissions]);

    useEffect(() => {
        loadPermissions();
    }, []);

    return (
        <>
            <PermissionCreate
                loadPermissions={loadPermissions}
            />
            <PermissionTable
                current={current}
                setCurrent={setCurrent}
                pageSize={pageSize}
                setPageSize={setPageSize}
                total={total}
                loadPermissions={loadPermissions}
                dataPermissions={filteredPermissions} // Truyền danh sách đã lọc
                loadingTable={loadingTable}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm} // Truyền searchTerm và setSearchTerm
            />
        </>
    );
};

export default PermissionPage;