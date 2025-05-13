import { Drawer } from "antd"

const UserDetail = (props) => {

    const { isDetailOpen, setIsDetailOpen, dataUpdate } = props

    return (
        <Drawer title="Detail User" width="20%"
            open={isDetailOpen}
            onClose={() => setIsDetailOpen(false)}
        >
            {dataUpdate ?
                <>
                    <p><b>Id:</b> {dataUpdate.id}</p>
                    <p><b>Username:</b> {dataUpdate.username}</p>
                    <p><b>Email:</b> {dataUpdate.email}</p>
                    <p><b>Họ và tên:</b> {dataUpdate.fullName}</p>
                    <p><b>Số điện thoại:</b> {dataUpdate.phoneNumber}</p>
                    <p><b>Địa chỉ:</b> {dataUpdate.address}</p>
                    <p><b>Trạng thái:</b> {dataUpdate.active ? '✅ Hoạt động' : '❌ Tạm khóa'}</p>
                    <p><b>Quyền hạn:</b> {dataUpdate.roleName}</p>
                </>
                :
                <>
                    <p>Không có dữ liệu</p>
                </>
            }

        </Drawer >
    )
}

export default UserDetail