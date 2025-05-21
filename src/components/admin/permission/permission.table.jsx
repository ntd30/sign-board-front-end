import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { notification, Popconfirm, Space, Table, Input } from "antd";
import { useState } from "react";
import PermissionDetail from "./permission.detail";
import PermissionUpdate from "./permission.update";
import { deletePermissionAPI } from "../../../services/api.service";
import { colorMethod } from "../../../config/permission";

const { Search } = Input;

// Repository để quản lý các thao tác với quyền hạn
const PermissionRepository = {
    deletePermission: async (id) => {
        try {
            const res = await deletePermissionAPI(id);
            return res;
        } catch (error) {
            throw error;
        }
    },
};

const PermissionTable = (props) => {
    const { dataPermissions, loadPermissions, current, setCurrent, pageSize, setPageSize, total, loadingTable, searchTerm, setSearchTerm } = props;

    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);

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

    const handleGetDetailPermission = (record) => {
        setDataUpdate(record);
        setIsDetailOpen(true);
    };

    const handleEditPermission = (record) => {
        setDataUpdate(record);
        setIsUpdateOpen(true);
    };

    const handleDeletePermission = async (idDelete) => {
        try {
            const res = await PermissionRepository.deletePermission(idDelete);
            if (res) {
                notification.success({
                    message: "Xóa Quyền hạn",
                    description: "Xóa Quyền hạn thành công!",
                });
                await loadPermissions();
            } else {
                throw new Error("Xóa Quyền hạn thất bại!");
            }
        } catch (error) {
            notification.error({
                message: "Lỗi khi xóa Quyền hạn",
                description: error.message || JSON.stringify(error),
            });
        }
    };

    const columns = [
        {
            title: 'STT',
            render: (_, record, index) => (
                <>
                    {index + 1 + pageSize * (current - 1)}
                </>
            ),
            width: 70,
        },
        {
            title: 'Id',
            dataIndex: 'id',
            render: (text, record) => (
                <a onClick={() => handleGetDetailPermission(record)}>{text}</a>
            ),
            hidden: true,
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            width: 200,
        },
        {
            title: 'API',
            dataIndex: 'apiPath',
            width: 250,
            ellipsis: true,
        },
        {
            title: 'Phương thức',
            dataIndex: 'method',
            render: (_, record) => (
                <p style={{ paddingLeft: 10, fontWeight: 'bold', marginBottom: 0, color: colorMethod(record?.method) }}>
                    {record?.method || ''}
                </p>
            ),
            width: 120,
        },
        {
            title: 'Module',
            dataIndex: 'module',
            width: 150,
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            width: 150,
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'updatedAt',
            width: 150,
        },
        {
            title: 'Action',
            render: (_, record) => (
                <Space size="middle" style={{ gap: "20px" }}>
                    <EditOutlined
                        style={{ color: "orange", cursor: "pointer" }}
                        onClick={() => handleEditPermission(record)}
                    />
                    <Popconfirm
                        title="Xóa Quyền hạn"
                        description="Bạn có chắc muốn xóa Quyền hạn này?"
                        onConfirm={() => handleDeletePermission(record.id)}
                        onCancel={() => {}}
                        okText="Xác nhận"
                        cancelText="Hủy"
                        placement='left'
                    >
                        <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
                    </Popconfirm>
                </Space>
            ),
            width: 120,
        },
    ];

    return (
        <>
            <div style={{ marginBottom: 16 }}>
                <Search
                    placeholder="Tìm kiếm theo tên, API, phương thức, module, ngày tạo hoặc ngày cập nhật"
                    allowClear
                    enterButton="Tìm kiếm"
                    size="large"
                    onSearch={handleSearch}
                    onChange={(e) => handleSearch(e.target.value)}
                    value={searchTerm}
                />
            </div>
            <Table
                dataSource={dataPermissions}
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
                scroll={{ x: 1000 }}
                size="small"
                className="responsive-table"
            />
            <PermissionDetail
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
                dataUpdate={dataUpdate}
            />
            <PermissionUpdate
                isUpdateOpen={isUpdateOpen}
                setIsUpdateOpen={setIsUpdateOpen}
                dataUpdate={dataUpdate}
                loadPermissions={loadPermissions}
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

export default PermissionTable;