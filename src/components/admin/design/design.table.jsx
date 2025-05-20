import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { notification, Popconfirm, Space, Table, Modal, Form, Input, Select, Button } from "antd";
import { useEffect, useState } from "react";
import { deleteDesignAPI, updateDesignAPI } from "../../../services/api.service";

const { Option } = Select;

const DesignTable = (props) => {
    const { dataDesigns, loadDesigns, current, setCurrent, pageSize, setPageSize, total, loadingTable } = props;

    const [isUpdateOpen, setIsUpdateOpen] = useState(false); // State for update modal
    const [dataUpdate, setDataUpdate] = useState(null); // State for selected record
    const [form] = Form.useForm(); // Form instance for update modal

    useEffect(() => {
        loadDesigns();
    }, [current, pageSize]);

    const onChange = (pagination) => {
        if (+pagination.current !== +current) {
            setCurrent(+pagination.current);
        }
        if (+pagination.pageSize !== +pageSize) {
            setPageSize(+pagination.pageSize);
        }
    };

    const handleGetDetailDesign = (record) => {
        setDataUpdate(record);
        // setIsDetailOpen(true); // Uncomment if you want to re-enable detail modal
    };

    const handleEditDesign = (record) => {
        setDataUpdate(record);
        setIsUpdateOpen(true);
        form.setFieldsValue({
            description: record.description,
            status: record.status,
        });
    };

    const handleDeleteDesign = async (idDelete) => {
        const res = await deleteDesignAPI(idDelete);

        if (res.data) {
            notification.success({
                message: "Xóa Bản thiết kế",
                description: "Xóa Bản thiết kế thành công!"
            });
            await loadDesigns();
        } else {
            notification.error({
                message: "Lỗi khi xóa Bản thiết kế",
                description: JSON.stringify(res.message)
            });
        }
    };

    const handleUpdateDesign = async (values) => {
        try {
            const res = await updateDesignAPI(dataUpdate.designId, values.description, values.status);

            if (res.data) {
                notification.success({
                    message: "Cập nhật Bản thiết kế",
                    description: "Cập nhật Bản thiết kế thành công!"
                });
                setIsUpdateOpen(false);
                form.resetFields();
                await loadDesigns();
            } else {
                notification.error({
                    message: "Lỗi khi cập nhật Bản thiết kế",
                    description: JSON.stringify(res.message)
                });
            }
        } catch (error) {
            notification.error({
                message: "Lỗi khi cập nhật Bản thiết kế",
                description: error.message
            });
        }
    };

    const columns = [
        {
            title: 'STT',
            render: (_, record, index) => (
                <>{index + 1 + pageSize * (current - 1)}</>
            ),
        },
        {
            title: 'Id',
            dataIndex: 'designId',
            render: (text, record) => (
                <a onClick={() => handleGetDetailDesign(record)}>{text}</a>
            ),
            hidden: true,
        },
        {
            title: 'Ảnh bản thiết kế',
            dataIndex: 'designImage',
            render: (text, record) => (
                <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/images/${text}`}
                    style={{ width: '100%', height: 200, objectFit: 'contain', display: 'block' }}
                />
            ),
            width: 200,
        },
        {
            title: 'Tên người sở hữu',
            dataIndex: 'designerFullName',
        },
        {
            title: 'Email',
            dataIndex: 'designerEmail',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'designerPhoneNumber',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
        },
        {
            title: 'Action',
            render: (_, record) => (
                <Space size="middle" style={{ gap: "20px" }}>
                    <EditOutlined
                        style={{ color: "orange", cursor: "pointer" }}
                        onClick={() => handleEditDesign(record)}
                    />
                    <Popconfirm
                        title="Xóa Bản thiết kế"
                        description="Bạn có chắc muốn xóa Bản thiết kế này?"
                        onConfirm={() => handleDeleteDesign(record.designId)}
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
    ];

    return (
        <>
            <Table
                dataSource={dataDesigns}
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
            />

            <Modal
                title="Cập nhật Bản thiết kế"
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
                    onFinish={handleUpdateDesign}
                >
                    <Form.Item
                        label="ID Bản thiết kế"
                        name="designId"
                        initialValue={dataUpdate?.designId}
                        hidden
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        label="Tên người sở hữu"
                        name="designerFullName"
                        initialValue={dataUpdate?.designerFullName}
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="designerEmail"
                        initialValue={dataUpdate?.designerEmail}
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        label="Số điện thoại"
                        name="designerPhoneNumber"
                        initialValue={dataUpdate?.designerPhoneNumber}
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        label="Mô tả"
                        name="description"
                        rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item
                        label="Trạng thái"
                        name="status"
                        rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
                    >
                        <Select placeholder="Chọn trạng thái">
                            <Option value="NEW">Mới</Option>
                            <Option value="INCONTACT">Đang liên hệ</Option>
                            <Option value="INPERFORM">Đang thực hiện </Option>
                            <Option value="DONE">Đã hoàn thành </Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default DesignTable;