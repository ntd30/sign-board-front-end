import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { notification, Popconfirm, Space, Table, Input } from "antd";
import { useState } from "react";
import ProductUpdate from "./product.update";
import { deleteProductAPI } from "../../../services/api.service";

const { Search } = Input;

// Repository để quản lý các thao tác với sản phẩm
const ProductRepository = {
    deleteProduct: async (id) => {
        try {
            const res = await deleteProductAPI(id);
            return res;
        } catch (error) {
            throw error;
        }
    },
};

const ProductTable = (props) => {
    const { dataProducts, loadProducts, current, setCurrent, pageSize, setPageSize, total, loadingTable, dataCategories, permissionsOfCurrentUser, searchTerm, setSearchTerm } = props;

    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);

    // Debug: Kiểm tra permissions được truyền vào
    console.log("🔐 Permissions in ProductTable:", permissionsOfCurrentUser);
    console.log("📊 Total products:", dataProducts?.length || 0);
    console.log("🔍 Search term:", searchTerm);
console.log("dataupdate", dataUpdate);  
    const onChange = (pagination) => {
        if (+pagination.current !== +current) {
            setCurrent(+pagination.current);
        }
        if (+pagination.pageSize !== +pageSize) {
            setPageSize(+pagination.pageSize);
        }
    };

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    const handleGetDetailProduct = (record) => {
        setDataUpdate(record);
        setIsDetailOpen(true);
    };

    const handleEditProduct = (record) => {
        setDataUpdate(record);
        setIsUpdateOpen(true);
    };

    const handleDeleteProduct = async (idDelete) => {
        try {
            const res = await ProductRepository.deleteProduct(idDelete);
            if (res) {
                notification.success({
                    message: "Xóa Sản phẩm",
                    description: "Xóa Sản phẩm thành công!",
                });
                await loadProducts();
            } else {
                throw new Error("Xóa Sản phẩm thất bại!");
            }
        } catch (error) {
            notification.error({
                message: "Lỗi khi xóa Sản phẩm",
                description: error.message || "Xóa Sản phẩm thất bại!",
            });
        }
    };

    const columns = [
        {
            title: "STT",
            render: (_, record, index) => index + 1 + pageSize * (current - 1),
            width: 70,
        },
        {
            title: "Id",
            dataIndex: "id",
            render: (text, record) => (
                <a onClick={() => handleGetDetailProduct(record)}>{text}</a>
            ),
            hidden: true,
        },
        {
            title: "Ảnh sản phẩm",
            dataIndex: "images",
            render: (text, record) => {
                const image = record.images && record.images[0]; // Lấy ảnh đầu tiên
                if (image && image.imageBase64) {
                    // Ưu tiên hiển thị ảnh Base64
                    return (
                        <img
                            src={`data:image/jpeg;base64,${image.imageBase64}`}
                            style={{ width: "100%", height: 200, objectFit: "contain", display: "block" }}
                            alt="Product"
                        />
                    );
                } else if (image && image.imageUrl) {
                    // Fallback về imageUrl nếu Base64 không có
                    return (
                        <img
                            src={`${import.meta.env.VITE_BACKEND_URL}/images/${image.imageUrl}`}
                            style={{ width: "100%", height: 200, objectFit: "contain", display: "block" }}
                            alt="Product"
                        />
                    );
                } else {
                    // Hiển thị ảnh placeholder nếu cả hai không có
                    return (
                        <img
                            src="https://via.placeholder.com/150?text=No+Image"
                            style={{ width: "100%", height: 200, objectFit: "contain", display: "block" }}
                            alt="No Image"
                        />
                    );
                }
            },
            width: 220,
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "name",
            render: (text, record) => (
                <a onClick={() => handleGetDetailProduct(record)}>{text}</a>
            ),
            width: 200,
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            width: 300,
            ellipsis: true,
        },
        {
            title: "Ảnh",
            dataIndex: "image",
            render: (_, record) => { },
            hidden: true,
        },
        {
            title: "Danh mục",
            dataIndex: "category",
            render: (_, record) => record.category?.name,
            width: 150,
        },
        {
            title: "Kích thước",
            dataIndex: "dimensions",
            width: 120,
        },
        {
            title: "Ngày tạo",
            dataIndex: "createdAt",
            width: 150,
        },
        {
            title: "Ngày cập nhật",
            dataIndex: "updatedAt",
            width: 150,
        },
        {
            title: "Action",
            render: (_, record) => {
                // Debug: Kiểm tra điều kiện hiển thị các nút
                const hasUpdatePermission = permissionsOfCurrentUser.includes("PRODUCT_UPDATE");
                const hasDeletePermission = permissionsOfCurrentUser.includes("PRODUCT_DELETE");

                console.log("🔧 Record ID:", record.id, "Has UPDATE permission:", hasUpdatePermission, "Has DELETE permission:", hasDeletePermission);

                return (
                    <Space size="middle" style={{ gap: "20px" }}>
                        {hasUpdatePermission && (
                            <EditOutlined
                                style={{ color: "orange", cursor: "pointer" }}
                                onClick={() => handleEditProduct(record)}
                            />
                        )}
                        {hasDeletePermission && (
                            <Popconfirm
                                title="Xóa Sản phẩm"
                                description="Bạn có chắc muốn xóa Sản phẩm này?"
                                onConfirm={() => handleDeleteProduct(record.id)}
                                onCancel={() => { }}
                                okText="Xác nhận"
                                cancelText="Hủy"
                                placement="left"
                            >
                                <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
                            </Popconfirm>
                        )}
                        {!hasUpdatePermission && !hasDeletePermission && (
                            <span style={{ color: "gray", fontSize: "12px" }}>Không có quyền</span>
                        )}
                    </Space>
                );
            },
            width: 120,
        },
    ];

    return (
        <>
            <div style={{ marginBottom: 16 }}>
                <Search
                    placeholder="Tìm kiếm theo tên, mô tả, danh mục, kích thước, ngày tạo hoặc ngày cập nhật"
                    allowClear
                    enterButton="Tìm kiếm"
                    size="large"
                    onSearch={handleSearch}
                    onChange={(e) => handleSearch(e.target.value)}
                    value={searchTerm}
                />
            </div>
            <Table
                dataSource={dataProducts}
                columns={columns}
                pagination={{
                    current: current,
                    pageSize: pageSize,
                    showSizeChanger: true,
                    total: total,
                    showTotal: (total, range) => (
                        <div>
                            {range[0]}-{range[1]} trên {total} rows
                        </div>
                    ),
                }}
                onChange={onChange}
                loading={loadingTable}
                scroll={{ x: 1200 }}
                size="small"
                className="responsive-table"
            />
            <ProductUpdate
                isUpdateOpen={isUpdateOpen}
                setIsUpdateOpen={setIsUpdateOpen}
                dataUpdate={dataUpdate}
                loadProducts={loadProducts}
                dataCategories={dataCategories}
            />
            <style jsx>{`
                .responsive-table :global(.ant-table) {
                    min-width: 100%;
                }
                @media (max-width: 768px) {
                    .responsive-table :global(.ant-table) {
                        font-size: 12px;
                    }
                    .responsive-table :global(.ant-table-cell) {
                        padding: 8px !important;
                    }
                }
            `}</style>
        </>
    );
};

export default ProductTable;