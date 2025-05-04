import { Drawer } from "antd"

const ProductDetail = (props) => {

    const { isDetailOpen, setIsDetailOpen, dataUpdate } = props

    return (
        <Drawer title="Thông tin sản phẩm" width="20%"
            open={isDetailOpen}
            onClose={() => setIsDetailOpen(false)}
        >
            {dataUpdate ?
                <>
                    <p><b>Id:</b> {dataUpdate._id}</p>
                    <p><b>Tên sản phẩm:</b> {dataUpdate.name}</p>
                    <p><b>Mô tả:</b> {dataUpdate.description}</p>
                    <p><b>Giá tiền:</b> {dataUpdate.price}</p>
                </>
                :
                <>
                    <p>Không có dữ liệu</p>
                </>
            }

        </Drawer >
    )
}

export default ProductDetail