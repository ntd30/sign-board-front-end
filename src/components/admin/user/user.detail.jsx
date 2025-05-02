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
                    <p><b>Id:</b> {dataUpdate._id}</p>
                    <p><b>Email:</b> {dataUpdate.email}</p>
                    <p><b>Họ và tên:</b> {dataUpdate.fullName}</p>
                    <p><b>Số điện thoại:</b> {dataUpdate.phone}</p>
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