import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Drawer, notification, Popconfirm, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { deleteProductAPI } from "../../../services/api.service";
import ProductDetail from "./product.detail";
import ProductUpdate from "./product.update";

const ProductTable = (props) => {
    const { dataProducts, loadProducts, current, setCurrent, pageSize, setPageSize, total, loadingTable } = props

    const [isDetailOpen, setIsDetailOpen] = useState(false)
    const [isUpdateOpen, setIsUpdateOpen] = useState(false)
    const [dataUpdate, setDataUpdate] = useState(null)

    useEffect(() => {
        loadProducts()
    }, [current, pageSize])

    const onChange = (pagination) => {
        if (+pagination.current !== +current) {
            setCurrent(+pagination.current)
        }
        if (+pagination.pageSize !== +pageSize) {
            setPageSize(+pagination.pageSize)
        }
    }

    const handleGetDetailProduct = record => {
        setDataUpdate(record)
        setIsDetailOpen(true)
    }

    const handleEditProduct = (record) => {
        setDataUpdate(record)
        setIsUpdateOpen(true)
    }

    const handleDeleteProduct = async (idDelete) => {
        const res = await deleteProductAPI(idDelete)

        if (res.data) {
            notification.success({
                message: "Xóa người dùng",
                description: "Xóa người dùng thành công!"
            })
            await loadProducts()
        } else {
            notification.error({
                message: "Lỗi khi xóa người dùng",
                description: JSON.stringify(res.message)
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
            ),
        },
        {
            title: 'Id',
            dataIndex: '_id',
            render: (text, record) => (
                <a onClick={() => handleGetDetailProduct(record)}>{text}</a>
            ),
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
        },
        {
            title: 'Action',
            render: (_, record) => (
                <Space size="middle" style={{ gap: "20px" }}>
                    <EditOutlined
                        style={{ color: "orange", cursor: "pointer" }}
                        onClick={() => handleEditProduct(record)}
                    />

                    <Popconfirm
                        title="Xóa sản phẩm"
                        description="Bạn có chắc muốn xóa sản phẩm này?"
                        onConfirm={() => handleDeleteProduct(record._id)}
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
            <Table dataSource={dataProducts} columns={columns}
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

            <ProductDetail
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
                dataUpdate={dataUpdate}
            />

            <ProductUpdate
                isUpdateOpen={isUpdateOpen}
                setIsUpdateOpen={setIsUpdateOpen}
                dataUpdate={dataUpdate}
                // setDataUpdate={setDataUpdate}
                loadProducts={loadProducts}
            />
        </>
    )
}

export default ProductTable