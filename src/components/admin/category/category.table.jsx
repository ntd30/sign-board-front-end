import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { notification, Popconfirm, Space, Table } from "antd";
import { useEffect, useState } from "react";
import CategoryUpdate from "./category.update";
import { deleteCategoryAPI } from "../../../services/api.service";

const CategoryTable = (props) => {
    const { dataCategories, current, setCurrent, pageSize, setPageSize, total, loadingTable, loadCategories, dataParentCategories } = props

    const [isDetailOpen, setIsDetailOpen] = useState(false)
    const [isUpdateOpen, setIsUpdateOpen] = useState(false)
    const [dataUpdate, setDataUpdate] = useState(null)

    useEffect(() => {
        loadCategories()
    }, [current, pageSize])

    const onChange = (pagination) => {
        if (+pagination.current !== +current) {
            setCurrent(+pagination.current)
        }
        if (+pagination.pageSize !== +pageSize) {
            setPageSize(+pagination.pageSize)
        }
    }

    const handleGetDetailCategory = record => {
        setDataUpdate(record)
        setIsDetailOpen(true)
    }

    const handleEditCategory = (record) => {
        setDataUpdate(record)
        setIsUpdateOpen(true)
    }

    const handleDeleteCategory = async (idDelete) => {
        const res = await deleteCategoryAPI(idDelete)

        if (res.data) {
            notification.success({
                message: "Xóa Danh mục",
                description: "Xóa Danh mục thành công!"
            })
            await loadCategories()
        } else {
            notification.error({
                message: "Lỗi khi xóa Danh mục",
                description: res
            })
        }
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
                <a onClick={() => handleGetDetailCategory(record)}>{text}</a>
            ),
        },
        {
            title: 'Tên Danh mục',
            dataIndex: 'name',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
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
                        onClick={() => handleEditCategory(record)}
                    />

                    <Popconfirm
                        title="Xóa Danh mục"
                        description="Bạn có chắc muốn xóa Danh mục này?"
                        onConfirm={() => handleDeleteCategory(record.id)}
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
            <Table dataSource={dataCategories} columns={columns}
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

            {/* <CategoryDetail
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
                dataUpdate={dataUpdate}
            /> */}

            <CategoryUpdate
                isUpdateOpen={isUpdateOpen}
                setIsUpdateOpen={setIsUpdateOpen}
                dataUpdate={dataUpdate}
                dataCategories={dataCategories}
                loadCategories={loadCategories}
            />
        </>
    )
}

export default CategoryTable