import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { notification, Popconfirm, Space, Table, Tag } from "antd"
import { useEffect, useState } from "react"

const RoleTable = (props) => {
    const { dataRoles, loadRoles, current, setCurrent, pageSize, setPageSize, total, loadingTable } = props

    const [isDetailOpen, setIsDetailOpen] = useState(false)
    const [isUpdateOpen, setIsUpdateOpen] = useState(false)
    const [dataUpdate, setDataUpdate] = useState(null)

    useEffect(() => {
        loadRoles()
    }, [current, pageSize])

    const onChange = (pagination) => {
        if (+pagination.current !== +current) {
            setCurrent(+pagination.current)
        }
        if (+pagination.pageSize !== +pageSize) {
            setPageSize(+pagination.pageSize)
        }
    }

    const handleGetDetailRole = record => {
        setDataUpdate(record)
        setIsDetailOpen(true)
    }

    const handleEditRole = (record) => {
        setDataUpdate(record)
        setIsUpdateOpen(true)
    }

    const handleDeleteRole = async (idDelete) => {
        // const res = await deleteRoleAPI(idDelete)

        // if (res) {
        //     notification.success({
        //         message: "Xóa Vai trò",
        //         description: "Xóa Vai trò thành công!"
        //     })
        //     await loadRoles()
        // } else {
        //     notification.error({
        //         message: "Lỗi khi xóa Vai trò",
        //         description: JSON.stringify(res)
        //     })
        // }
        alert("Delete")
    }

    const columns = [
        {
            title: 'STT',
            render: (_, record, index) => (
                <>
                    {index + 1 + pageSize * (current - 1)}
                </>
            )
        },
        {
            title: 'Id',
            dataIndex: 'id',
            render: (text, record) => (
                <a onClick={() => handleGetDetailRole(record)}>{text}</a>
            ),
        },
        {
            title: 'Tên',
            dataIndex: 'name',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'active',
            render: (value) => <Tag color={value ? "lime" : "red"}>
                {value ? "ACTIVE" : "INACTIVE"}
            </Tag>
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'updatedAt',
        },
        {
            title: 'Action',
            render: (_, record) => (
                <Space size="middle" style={{ gap: "20px" }}>
                    <EditOutlined
                        style={{ color: "orange", cursor: "pointer" }}
                        onClick={() => handleEditRole(record)}
                    />

                    <Popconfirm
                        title="Xóa Vai trò"
                        description="Bạn có chắc muốn xóa Vai trò này?"
                        onConfirm={() => handleDeleteRole(record.id)}
                        onCancel={() => { }}
                        okText="Xác nhận"
                        cancelText="Hủy"
                        placement='left'
                    >
                        <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
                    </Popconfirm>
                </Space>
            ),
        },
    ]

    return (
        <>
            <Table dataSource={dataRoles} columns={columns}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) },
                    }
                }
                onChange={onChange}
                loading={loadingTable}
            />

            {/* <RoleDetail
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
                dataUpdate={dataUpdate}
            />

            <RoleUpdate
                isUpdateOpen={isUpdateOpen}
                setIsUpdateOpen={setIsUpdateOpen}
                dataUpdate={dataUpdate}
                // setDataUpdate={setDataUpdate}
                loadRoles={loadRoles}
            /> */}
        </>
    )
}

export default RoleTable