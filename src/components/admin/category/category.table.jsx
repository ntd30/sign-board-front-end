import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { notification, Popconfirm, Space, Table } from "antd";
import { useEffect, useState } from "react";
import CategoryUpdate from "./category.update";
import { deleteCategoryAPI } from "../../../services/api.service";

// Repository để quản lý các thao tác với danh mục
const CategoryRepository = {
  deleteCategory: async (id) => {
    try {
      const res = await deleteCategoryAPI(id);
      return res;
    } catch (error) {
      throw error;
    }
  },
};

const CategoryTable = (props) => {
  const { dataCategories, current, setCurrent, pageSize, setPageSize, total, loadingTable, loadCategories, permissionsOfCurrentUser } = props;

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);

  useEffect(() => {
    loadCategories();
  }, [current, pageSize]);

  const onChange = (pagination) => {
    if (+pagination.current !== +current) {
      setCurrent(+pagination.current);
    }
    if (+pagination.pageSize !== +pageSize) {
      setPageSize(+pagination.pageSize);
    }
  };

  const handleGetDetailCategory = (record) => {
    setDataUpdate(record);
    setIsDetailOpen(true);
  };

  const handleEditCategory = (record) => {
    setDataUpdate(record);
    setDataUpdate(record);
    setIsUpdateOpen(true);
  };

  const handleDeleteCategory = async (idDelete) => {
    try {
      const res = await CategoryRepository.deleteCategory(idDelete);
      console.log("handleDeleteCategory res:", res); // Log để kiểm tra response

      if (res && res.data) {
        await loadCategories();
        notification.success({
          message: "Xóa Danh mục",
          description: "Xóa Danh mục thành công!",
        });
      } else {
        throw new Error(res?.message || "Không có dữ liệu trả về khi xóa danh mục");
      }
    } catch (error) {
      console.error("Lỗi trong handleDeleteCategory:", error);
      notification.error({
        message: "Lỗi khi xóa Danh mục",
        description: error.message || "Đã xảy ra lỗi không xác định",
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
      width: 70, // Đặt chiều rộng cố định cho cột STT
    },
    {
      title: 'Id',
      dataIndex: 'id',
      render: (text, record) => (
        <a onClick={() => handleGetDetailCategory(record)}>{text}</a>
      ),
      hidden: true,
    },
    {
      title: 'Tên Danh mục',
      dataIndex: 'name',
      width: 200, // Đặt chiều rộng để tránh tràn
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      width: 300,
      ellipsis: true, // Cắt ngắn nội dung nếu quá dài
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      width: 150,
    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'updatedAt',
      width: 150,
    },
    {
      title: 'Action',
      render: (_, record) => (
        <Space size="middle" style={{ gap: "20px" }}>
          {permissionsOfCurrentUser.includes("CATEGORY_UPDATE") && (
            <EditOutlined
              style={{ color: "orange", cursor: "pointer" }}
              onClick={() => handleEditCategory(record)}
            />
          )}

          {permissionsOfCurrentUser.includes("CATEGORY_DELETE") && (
            <Popconfirm
              title="Xóa Danh mục"
              description="Bạn có chắc muốn xóa Danh mục này?"
              onConfirm={() => handleDeleteCategory(record.id)}
              onCancel={() => {}}
              okText="Xác nhận"
              cancelText="Hủy"
              placement='left'
            >
              <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
            </Popconfirm>
          )}
        </Space>
      ),
      width: 100,
     
       // Cố định cột Action bên phải
    },
  ];

  return (
    <>
      <Table
        dataSource={dataCategories}
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
        scroll={{ x: 1000 }} // Thêm thanh cuộn ngang cho màn hình nhỏ
        size="small" // Giảm kích thước bảng cho màn hình nhỏ
        className="responsive-table"
      />

      <CategoryUpdate
        isUpdateOpen={isUpdateOpen}
        setIsUpdateOpen={setIsUpdateOpen}
        dataUpdate={dataUpdate}
        dataCategories={dataCategories}
        loadCategories={loadCategories}
      />

      <style jsx>{`
        .responsive-table :global(.ant-table) {
          min-width: 100%;
        }
        @media (max-width: 768px) {
          .responsive-table :global(.ant-table) {
            font-size: 12px; /* Giảm kích thước chữ trên màn hình nhỏ */
          }
          .responsive-table :global(.ant-table-cell) {
            padding: 8px !important; /* Giảm padding cho ô */
          }
        }
      `}</style>
    </>
  );
};

export default CategoryTable;