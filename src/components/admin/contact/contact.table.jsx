import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { notification, Popconfirm, Space, Table } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";

const ContactTable = (props) => {
    const { dataContacts, loadContacts, current, setCurrent, pageSize, setPageSize, total, loadingTable } = props;

    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);

    useEffect(() => {
        loadContacts();
    }, [current, pageSize]);

    const onChange = (pagination) => {
        if (+pagination.current !== +current) {
            setCurrent(+pagination.current);
        }
        if (+pagination.pageSize !== +pageSize) {
            setPageSize(+pagination.pageSize);
        }
    };

    const handleGetDetailContact = (record) => {
        setDataUpdate(record);
        setIsDetailOpen(true);
    };

    const handleEditContact = (record) => {
        setDataUpdate(record);
        setIsUpdateOpen(true);
    };

    const handleDeleteContact = async (idDelete) => {
        const res = await deleteContactAPI(idDelete);

        if (res.data) {
            notification.success({
                message: "Xóa liên hệ",
                description: "Xóa liên hệ thành công!",
            });
            await loadContacts();
        } else {
            notification.error({
                message: "Lỗi khi xóa liên hệ",
                description: JSON.stringify(res.message),
            });
        }
    };

    const columns = [
        {
            title: "STT",
            render: (_, record, index) => index + 1 + pageSize * (current - 1),
            width: 60,
        },
        // {
        //     title: "Id",
        //     dataIndex: "inquiry_id",
        //     // render: (text, record) => (
        //     //     <a onClick={() => handleGetDetailContact(record)}>{text}</a>
        //     // ),
        //     width: 100,
        // },
        {
            title: "Họ và tên",
            dataIndex: "name",
            width: 150,
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            width: 150,
        },
        {
            title: "Email",
            dataIndex: "email",
            width: 200,
            ellipsis: true,
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
            width: 200,
            ellipsis: true,
        },
        {
            title: "Tin nhắn",
            dataIndex: "message",
            width: 250,
            ellipsis: true,
        },
        {
            title: "Ngày tạo",
            dataIndex: "createdAt",
            render: (date) => (date ? moment(date).format("DD/MM/YYYY HH:mm:ss") : "-"),
            width: 180,
        },
        // {
        //     title: "Action",
        //     render: (_, record) => (
        //         <Space size="middle" style={{ gap: "20px" }}>
        //             <EditOutlined
        //                 style={{ color: "orange", cursor: "pointer" }}
        //                 onClick={() => handleEditContact(record)}
        //             />
        //             <Popconfirm
        //                 title="Xóa liên hệ"
        //                 description="Bạn có chắc muốn xóa liên hệ này?"
        //                 onConfirm={() => handleDeleteContact(record.id)}
        //                 onCancel={() => {}}
        //                 okText="Xác nhận"
        //                 cancelText="Hủy"
        //                 placement="left"
        //             >
        //                 <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
        //             </Popconfirm>
        //         </Space>
        //     ),
        //     width: 120,
        //     align: "center",
        // },
    ];

    return (
        <>
            <Table
                dataSource={dataContacts}
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

            {/* <ContactDetail
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
                dataUpdate={dataUpdate}
            /> */}

            {/* 
            <ContactUpdate
                isUpdateOpen={isUpdateOpen}
                setIsUpdateOpen={setIsUpdateOpen}
                dataUpdate={dataUpdate}
                loadContacts={loadContacts}
            /> */}
        </>
    );
};

export default ContactTable;