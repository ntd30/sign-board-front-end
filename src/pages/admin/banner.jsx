import { useContext, useState, useEffect } from "react";
import BannerTable from "../../components/admin/banner/banner.table";
import BannerCreate from "../../components/admin/banner/banner.create";
import { Alert, Skeleton } from "antd";
import { fetchAllBannersAPI } from "../../services/api.service";
import { AuthContext } from "../../components/context/auth.context";

const BannerPage = () => {
    const [dataBanners, setDataBanners] = useState([]);
    const [current, setCurrent] = useState(1); // current hiển thị cho UI (bắt đầu từ 1)
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [loadingTable, setLoadingTable] = useState(false);
    const [error, setError] = useState(null);

    const { user } = useContext(AuthContext);
    const permissionsOfCurrentUser = (user?.permissions || []).map(perm => perm.name);

    const loadBanners = async () => {
        setLoadingTable(true);
        setError(null);
        try {
            // Gọi API với page = current - 1 (vì Spring Boot bắt đầu từ 0)
            const res = await fetchAllBannersAPI(current - 1, pageSize);
            console.log("API Response:", res);

            if (res.data) {
                setDataBanners(res.data.content || []);
                setTotal(res.data.totalElements || 0);
            } else {
                throw new Error(res.message || "Dữ liệu trả về không hợp lệ");
            }
        } catch (error) {
            console.error("Lỗi khi tải danh sách banner:", error);
            setError(error.message);
        } finally {
            setLoadingTable(false);
        }
    };

    useEffect(() => {
        loadBanners();
    }, [current, pageSize]);

    if (error) {
        return (
            <Alert
                type="error"
                message="Lỗi tải dữ liệu"
                description={error}
                showIcon
                closable
            />
        );
    }

    return (
        <div style={{ padding: 16 }}>
            {permissionsOfCurrentUser.includes("BANNER_CREATE") && (
                <div style={{ marginBottom: 16 }}>
                    <BannerCreate loadBanners={loadBanners} />
                </div>
            )}

            {loadingTable && dataBanners.length === 0 ? (
                <Skeleton active paragraph={{ rows: 6 }} />
            ) : (
                <BannerTable
                    current={current}
                    setCurrent={setCurrent}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    total={total}
                    loadBanners={loadBanners}
                    dataBanners={dataBanners}
                    loadingTable={loadingTable}
                    permissionsOfCurrentUser={permissionsOfCurrentUser}
                />
            )}
        </div>
    );
};

export default BannerPage;
