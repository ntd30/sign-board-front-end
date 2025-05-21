import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { notification, Popconfirm, Space, Table, Modal, Form, Input, Select, Button } from "antd";
import { useEffect, useState } from "react";
import { deleteDesignAPI, updateDesignAPI } from "../../../services/api.service";

const { Option } = Select;

// Repository để quản lý các thao tác với bản thiết kế
const DesignRepository = {
  deleteDesign: async (id) => {
    try {
      const res = await deleteDesignAPI(id);
      return res;
    } catch (error) {
      throw error;
    }
  },
  updateDesign: async (id, description, status) => {
    try {
      const res = await updateDesignAPI(id, description, status);
      return res;
    } catch (error) {
      throw error;
    }
  },
  // Phương thức để lấy hoặc xử lý trạng thái (nếu cần)
  getStatusText: (status) => {
    switch (status) {
      case 'NEW':
        return 'Mới';
      case 'INCONTACT':
        return 'Đang liên hệ';
      case 'INPERFORM':
        return 'Đang thực hiện';
      case 'DONE':
        return 'Đã hoàn thành';
      default:
        return status || '-'; // Fallback nếu không khớp
    }
  },
};

const DesignTable = (props) => {
  const { dataDesigns, loadDesigns, current, setCurrent, pageSize, setPageSize, total, loadingTable, permissionsOfCurrentUser } = props;

  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);
  const [form] = Form.useForm();

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
    try {
      const res = await DesignRepository.deleteDesign(idDelete);

      if (res.data) {
        notification.success({
          message: "Xóa Bản thiết kế",
          description: "Xóa Bản thiết kế thành công!",
        });
        await loadDesigns();
      } else {
        throw new Error(res.message || "Xóa Bản thiết kế thất bại!");
      }
    } catch (error) {
      notification.error({
        message: "Lỗi khi xóa Bản thiết kế",
        description: JSON.stringify(error.message),
      });
    }
  };

  const handleUpdateDesign = async (values) => {
    try {
      const res = await DesignRepository.updateDesign(dataUpdate.designId, values.description, values.status);

      if (res.data) {
        notification.success({
          message: "Cập nhật Bản thiết kế",
          description: "Cập nhật Bản thiết kế thành công!",
        });
        setIsUpdateOpen(false);
        form.resetFields();
        await loadDesigns();
      } else {
        notification.error({
          message: "Lỗi khi cập nhật Bản thiết kế",
          description: JSON.stringify(res.message),
        });
      }
    } catch (error) {
      notification.error({
        message: "Lỗi khi cập nhật Bản thiết kế",
        description: error.message,
      });
    }
  };

  const columns = [
    {
      title: 'STT',
      render: (_, record, index) => (
        <>{index + 1 + pageSize * (current - 1)}</>
      ),
      width: 70,
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
          alt="Design"
        />
      ),
      width: 220,
    },
    {
      title: 'Tên người sở hữu',
      dataIndex: 'designerFullName',
      width: 200,
    },
    {
      title: 'Email',
      dataIndex: 'designerEmail',
      width: 250,
      ellipsis: true,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'designerPhoneNumber',
      width: 150,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (value) => DesignRepository.getStatusText(value), // Sử dụng phương thức từ repository
      width: 150,
    },
    {
      title: 'Action',
      render: (_, record) => {
        const hasUpdatePermission = permissionsOfCurrentUser && permissionsOfCurrentUser.includes("MANAGE_DESIGNS_UPDATE");
        const hasDeletePermission = permissionsOfCurrentUser && permissionsOfCurrentUser.includes("MANAGE_DESIGNS_DELETE");

        if (!hasUpdatePermission && !hasDeletePermission) {
          return <span>-</span>;
        }

        return (
          <Space size="middle" style={{ gap: "10px", display: 'flex', alignItems: 'center' }}>
            {hasUpdatePermission && (
              <EditOutlined
                key={`edit-${record.designId}`}
                style={{ color: "orange", cursor: "pointer", fontSize: 16 }}
                onClick={() => handleEditDesign(record)}
              />
            )}
            {hasDeletePermission && (
              <Popconfirm
                key={`delete-${record.designId}`}
                title="Xóa Bản thiết kế"
                description="Bạn có chắc muốn xóa Bản thiết kế này?"
                onConfirm={() => handleDeleteDesign(record.designId)}
                onCancel={() => {}}
                okText="Xác nhận"
                cancelText="Hủy"
                placement="left"
              >
                <DeleteOutlined style={{ color: "red", cursor: "pointer", fontSize: 16 }} />
              </Popconfirm>
            )}
          </Space>
        );
      },
      width: 100,
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
        scroll={{ x: 1200 }}
        size="small"
        className="responsive-table"
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
            label="Trạng thái"
            name="status"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
          >
            <Select placeholder="Chọn trạng thái">
              <Option value="NEW">Mới</Option>
              <Option value="INCONTACT">Đang liên hệ</Option>
              <Option value="INPERFORM">Đang thực hiện</Option>
              <Option value="DONE">Đã hoàn thành</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

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
          .responsive-table :global(.anticon) {
            font-size: 16px !important;
            display: inline-block !important;
          }
          .responsive-table :global(.ant-space-item) {
            margin-right: 5px !important;
          }
        }
      `}</style>
    </>
  );
};

export default DesignTable;