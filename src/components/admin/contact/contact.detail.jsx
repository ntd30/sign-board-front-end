import { Drawer } from "antd"

const ContactDetail = (props) => {

    const { isDetailOpen, setIsDetailOpen, dataUpdate } = props

    console.log("datu", dataUpdate)

    return (
        <Drawer title="Detail Contact" width="20%"
            open={isDetailOpen}
            onClose={() => setIsDetailOpen(false)}
        >
            {dataUpdate ?
                <>
                    <p><b>Id:</b> {dataUpdate.id}</p>
                    <p><b>Tên sản phẩm:</b> {dataUpdate.productName}</p>
                    <p><b>Tên người dùng:</b> {dataUpdate.name}</p>
                    <p><b>Email:</b> {dataUpdate.email}</p>
                    <p><b>Số điện thoại:</b> {dataUpdate.phone}</p>
                    <p><b>Địa chỉ:</b> {dataUpdate.address}</p>
                    <p><b>Lời nhắn:</b> {dataUpdate.message}</p>
                    <p><b>Trạng thái:</b> {dataUpdate.status === "NOCONTACT" ? 'Chưa liên hệ' : (dataUpdate.status === "CONTACTED" ? 'Đã liên hệ' : '')}</p>
                </>
                :
                <>
                    <p>Không có dữ liệu</p>
                </>
            }

        </Drawer >
    )
}

export default ContactDetail