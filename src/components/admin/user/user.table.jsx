import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { notification, Popconfirm, Space, Table } from "antd";
import { useEffect, useState } from "react";
import UserDetail from "./user.detail";
import UserUpdate from "./user.update";
import { deleteUserAPI } from "../../../services/api.service";

// Repository để quản lý các thao tác với người dùng
const UserRepository = {
  deleteUser: async (id) => {
    try {
      const res = await deleteUserAPI(id);
      return res;
    } catch (error) {
      throw error;
    }
  },
  getUser: async (id) => {
    try {
      const res = await fetch(`/api/users/${id}`); // Giả định endpoint
      return res.json();
    } catch (error) {
      throw error;
    }
  },
};

const UserTable = (props) => {
    const { dataUsers, loadUsers, current, setCurrent, pageSize, setPageSize, total, loadingTable } = props;

    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);

    useEffect(() => {
        loadUsers();
    }, [current, pageSize]);

    const onChange = (pagination) => {
        if (+pagination.current !== +current) {
            setCurrent(+pagination.current);
        }
        if (+pagination.pageSize !== +pageSize) {
            setPageSize(+pagination.pageSize);
        }
    };

    const handleGetDetailUser = (record) => {
        setDataUpdate(record);
        setIsDetailOpen(true);
    };

    const handleEditUser = (record) => {
        setDataUpdate(record);
        setIsUpdateOpen(true);
    };

    const handleDeleteUser = async (idDelete) => {
        try {
            const res = await UserRepository.deleteUser(idDelete);

            if (res.data) {
                notification.success({
                    message: "Xóa người dùng",
                    description: "Xóa người dùng thành công!",
                });
                await loadUsers();
            } else {
                throw new Error("Xóa người dùng thất bại!");
            }
        } catch (error) {
            notification.error({
                message: "Lỗi khi xóa người dùng",
                description: error.message || "Xóa người dùng thất bại!",
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
        },
        {
            title: 'Id',
            dataIndex: 'id',
            render: (text, record) => (
                <a onClick={() => handleGetDetailUser(record)}>{text}</a>
            ),
            hidden: true,
        },
        {
            title: 'Username',
            dataIndex: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Họ và Tên',
            dataIndex: 'fullName',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'active',
            render: (value) => (value ? '✅ Hoạt động' : '❌ Tạm khóa'),
        },
        {
            title: 'Quyền hạn',
            dataIndex: 'roleName',
        },
        {
            title: 'Action',
            render: (_, record) => (
                <Space size="middle" style={{ gap: "20px" }}>
                    <EditOutlined
                        style={{ color: "orange", cursor: "pointer" }}
                        onClick={() => handleEditUser(record)}
                    />

                    <Popconfirm
                        title="Xóa người dùng"
                        description="Bạn có chắc muốn xóa người dùng này?"
                        onConfirm={() => handleDeleteUser(record.id)}
                        onCancel={() => {}}
                        okText="Xác nhận"
                        cancelText="Hủy"
                        placement='left'
                    >
                        <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Table
                dataSource={dataUsers}
                columns={columns}
                pagination={{
                    current: current,
                    pageSize: pageSize,
                    showSizeChanger: true,
                    total: total,
                    showTotal: (total, range) => {
                        return (<div> {range[0]}-{range[1]} trên {total} rows</div>);
                    },
                }}
                onChange={onChange}
                loading={loadingTable}
                scroll={{ x: 1200 }} // Thay đổi scroll để hỗ trợ cuộn ngang
            />

            <UserDetail
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
                dataUpdate={dataUpdate}
            />

            <UserUpdate
                isUpdateOpen={isUpdateOpen}
                setIsUpdateOpen={setIsUpdateOpen}
                dataUpdate={dataUpdate}
                loadUsers={loadUsers}
            />
        </>
    );
};

export default UserTable;