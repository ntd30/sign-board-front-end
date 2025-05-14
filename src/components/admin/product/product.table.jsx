import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { notification, Popconfirm, Space, Table } from "antd";
import { useEffect, useState } from "react";
import ProductUpdate from "./product.update";
import { deleteProductAPI } from "../../../services/api.service";

const ProductTable = (props) => {
    const { dataProducts, loadProducts, current, setCurrent, pageSize, setPageSize, total, loadingTable, dataCategories } = props

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

        if (res) {
            notification.success({
                message: "Xóa Sản phẩm",
                description: "Xóa Sản phẩm thành công!"
            })
            await loadProducts()
        } else {
            notification.error({
                message: "Lỗi khi xóa Sản phẩm",
                description: "Xóa Sản phẩm thất bại!"
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
            title: 'Ảnh',
            dataIndex: 'images',
            render: (_, record) => {
                const images = record.images || [];
                return images.length > 0 ? `${images.length} ảnh` : "0 ảnh";
            },
            hidden: true
        },
        {
            title: 'Danh mục',
            dataIndex: 'category',
            render: (_, record) => record.category?.name,
        },
        {
            title: 'Kích thước',
            dataIndex: 'dimensions',
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
                        onClick={() => handleEditProduct(record)}
                    />

                    <Popconfirm
                        title="Xóa Sản phẩm"
                        description="Bạn có chắc muốn xóa Sản phẩm này?"
                        onConfirm={() => handleDeleteProduct(record.id)}
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

            {/* <ProductDetail
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
                dataUpdate={dataUpdate}
            /> */}

            <ProductUpdate
                isUpdateOpen={isUpdateOpen}
                setIsUpdateOpen={setIsUpdateOpen}
                dataUpdate={dataUpdate}
                loadProducts={loadProducts}
                dataCategories={dataCategories}
            />
        </>
    )
}

export default ProductTable