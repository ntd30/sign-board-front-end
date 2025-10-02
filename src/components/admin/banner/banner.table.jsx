import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { notification, Popconfirm, Space, Table, Input } from "antd";
import { useState } from "react";
import moment from "moment";
import { deleteBannerAPI } from "../../../services/api.service";

const { Search } = Input;

const BannerTable = (props) => {
    const { dataBanners, loadBanners, current, setCurrent, pageSize, setPageSize, total, loadingTable, permissionsOfCurrentUser } = props;

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
console.log("record",dataBanners)
    const handleGetDetailBanner = (record) => {
        setDataUpdate(record);
        setIsDetailOpen(true);
    };

    const handleEditBanner = (record) => {
        setDataUpdate(record);
        setIsUpdateOpen(true);
    };

    const handleDeleteBanner = async (idDelete) => {
        try {
            const res = await deleteBannerAPI(idDelete);
            if (res.data) {
                notification.success({
                    message: "Xóa banner",
                    description: "Xóa banner thành công!",
                });
                await loadBanners();
            } else {
                notification.error({
                    message: "Lỗi khi xóa banner",
                    description: JSON.stringify(res.message),
                });
            }
        } catch (error) {
            notification.error({
                message: "Lỗi khi xóa banner",
                description: error.message,
            });
        }
    };

    const columns = [
        {
            title: "STT",
            render: (_, record, index) => index + 1 + pageSize * (current - 1),
            width: 60,
        },
        {
            title: "Id",
            dataIndex: "id",
            render: (text, record) => (
                <a onClick={() => handleGetDetailBanner(record)}>{text}</a>
            ),
        },
        {
            title: 'Ảnh',
            dataIndex: 'imageBase64',
            render: (text) => (
                <img 
                    src={`data:image/jpeg;base64,${text}`} 
                    alt="Banner" 
                    style={{ width: 200, height: 100, objectFit: 'cover' }}
                />
            ),
            width: 250
        },
        {
            title: "Tiêu đề",
            dataIndex: "title",
            width: 200,
            ellipsis: true,
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            width: 300,
            ellipsis: true,
        },
        {
            title: "Trạng thái",
            dataIndex: "active",
            render: (isActive) => (
                <span style={{ color: isActive ? 'green' : 'red' }}>
                    {isActive ? 'Đang hoạt động' : 'Không hoạt động'}
                </span>
            ),
            width: 150,
        },
        {
            title: "Ngày tạo",
            dataIndex: "createdAt",
            render: (date) => (date ? moment(date).format("DD/MM/YYYY HH:mm:ss") : "-"),
            width: 180,
        },
        {
            title: "Action",
            render: (_, record) => (
                <Space size="middle" style={{ gap: "20px" }}>
                    <EyeOutlined 
                        style={{ color: "blue", cursor: "pointer" }}
                        onClick={() => handleGetDetailBanner(record)}
                    />
                    {permissionsOfCurrentUser.includes("BANNER_UPDATE") && (
                        <EditOutlined
                            style={{ color: "orange", cursor: "pointer" }}
                            onClick={() => handleEditBanner(record)}
                        />
                    )}
                    {permissionsOfCurrentUser.includes("BANNER_DELETE") && (
                        <Popconfirm
                            title="Xóa banner"
                            description="Bạn có chắc muốn xóa banner này?"
                            onConfirm={() => handleDeleteBanner(record.id)}
                            onCancel={() => { }}
                            okText="Xác nhận"
                            cancelText="Hủy"
                            placement="left"
                        >
                            <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
                        </Popconfirm>
                    )}
                </Space>
            ),
            width: 120,
            align: "center",
        },
    ];

    return (
        <>
            <Table
                dataSource={dataBanners}
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
                rowKey="id"
            />
           
           
        </>
    );
};

export default BannerTable;