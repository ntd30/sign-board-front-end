import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Form, Input, Modal, notification, Popconfirm, Select, Space, Table } from "antd";
import moment from "moment";
import { useState } from "react";
import { updateContactAPI } from "../../../services/api.service";
import ContactDetail from "./contact.detail";

const { Search } = Input;
const { Option } = Select;

const ContactTable = (props) => {
    const { dataContacts, loadContacts, current, setCurrent, pageSize, setPageSize, total, loadingTable, searchTerm, setSearchTerm } = props;

    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);
    const [form] = Form.useForm();

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

    const handleEditContact = (record) => {
        setDataUpdate(record);
        setIsUpdateOpen(true);
        form.setFieldsValue({
            id: record.id,
            name: record.name,
            status: record.status,
        });
    };

    const handleUpdateContact = async (values) => {
        const { id, status } = values;
        try {
            const res = await updateContactAPI(id, status);
            console.log("Kết quả cập nhật liên hệ:", res);
            if (res.data) {
                notification.success({
                    message: "Cập nhật liên hệ",
                    description: "Cập nhật liên hệ thành công!",
                });
                setIsUpdateOpen(false);
                form.resetFields();
                await loadContacts();
            } else {
                notification.error({
                    message: "Lỗi khi cập nhật liên hệ",
                    description: JSON.stringify(res.message),
                });
            }
        } catch (error) {
            notification.error({
                message: "Lỗi khi cập nhật liên hệ",
                description: error.message,
            });
        }
    };

    const handleGetDetailContact = (record) => {
        setDataUpdate(record);
        setIsDetailOpen(true);
    };

    const columns = [
        {
            title: "STT",
            render: (_, record, index) => index + 1 + pageSize * (current - 1),
            width: 60,
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "productName",
            render: (text, record) => (
                <a onClick={() => handleGetDetailContact(record)}>{text}</a>
            ),
            width: 250,
        },
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
            hidden: true,
        },
        {
            title: "Tin nhắn",
            dataIndex: "message",
            width: 250,
            hidden: true,
        },
        {
            title: "Ngày tạo",
            dataIndex: "createdAt",
            render: (date) => (date ? moment(date).format("DD/MM/YYYY HH:mm:ss") : "-"),
            width: 180,
            hidden: true
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            render: (stt) => (stt === "NOCONTACT" ? "Chưa liên hệ" : (stt === "CONTACTED" ? "Đã liên hệ" : "")),
            width: 150,
        },
        {
            title: "Action",
            render: (_, record) => (
                <Space size="middle" style={{ gap: "20px" }}>
                    <EditOutlined
                        style={{ color: "orange", cursor: "pointer" }}
                        onClick={() => handleEditContact(record)}
                    />
                    {/* <Popconfirm
                        title="Xóa liên hệ"
                        description="Bạn có chắc muốn xóa liên hệ này?"
                        onConfirm={() => handleDeleteContact(record.id)}
                        onCancel={() => {}}
                        okText="Xác nhận"
                        cancelText="Hủy"
                        placement="left"
                    >
                        <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
                    </Popconfirm> */}
                </Space>
            ),
            width: 120,
            align: "center",
        },
    ];

    return (
        <>
            <div style={{ marginBottom: 16 }}>
                <Search
                    placeholder="Tìm kiếm theo tên sản phẩm, họ tên, số điện thoại, email, địa chỉ, tin nhắn hoặc trạng thái"
                    allowClear
                    enterButton="Tìm kiếm"
                    size="large"
                    onSearch={handleSearch}
                    onChange={(e) => handleSearch(e.target.value)}
                    value={searchTerm}
                />
            </div>
            <Modal
                title="Cập nhật liên hệ"
                open={isUpdateOpen}
                onOk={() => form.submit()}
                onCancel={() => {
                    setIsUpdateOpen(false);
                    form.resetFields();
                }}
                okText="Lưu"
                cancelText="Hủy"
                width={600}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleUpdateContact}
                >
                    <Form.Item
                        label="ID liên hệ"
                        name="id"
                        initialValue={dataUpdate?.id}
                        hidden
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        label="Họ và tên"
                        name="name"
                        initialValue={dataUpdate?.name}
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        label="Trạng thái"
                        name="status"
                        rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
                    >
                        <Select placeholder="Chọn trạng thái">
                            <Option value="NOCONTACT">Chưa liên hệ</Option>
                            <Option value="CONTACTED">Đã liên hệ</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
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

            <ContactDetail
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
                dataUpdate={dataUpdate}
            />
        </>
    );
};

export default ContactTable;