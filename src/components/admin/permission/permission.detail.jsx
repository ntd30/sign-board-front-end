import { Descriptions, Drawer } from "antd"

const PermissionDetail = (props) => {

    const { isDetailOpen, setIsDetailOpen, dataUpdate } = props

    return (
        <Drawer title="Thông tin Quyền hạn"
            open={isDetailOpen}
            onClose={() => setIsDetailOpen(false)}
            width={"40vw"}
        >
            {dataUpdate ?
                <Descriptions title="" bordered column={2} layout="vertical">
                    <Descriptions.Item label="Tên Permission">{dataUpdate?.name}</Descriptions.Item>
                    <Descriptions.Item label="API Path">{dataUpdate?.apiPath}</Descriptions.Item>

                    <Descriptions.Item label="Method">{dataUpdate?.method}</Descriptions.Item>
                    <Descriptions.Item label="Thuộc Module">{dataUpdate?.module}</Descriptions.Item>

                    <Descriptions.Item label="Ngày tạo">{dataUpdate.createdAt}</Descriptions.Item>
                    <Descriptions.Item label="Ngày sửa">{dataUpdate.updatedAt}</Descriptions.Item>

                </Descriptions>
                :
                <>
                    <p>Không có dữ liệu</p>
                </>
            }

        </Drawer >
    )
}

export default PermissionDetail