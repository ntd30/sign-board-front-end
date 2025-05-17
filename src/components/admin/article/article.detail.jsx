import { Drawer, Descriptions, Empty, Typography, Image } from "antd";
import moment from "moment";

const { Title, Paragraph } = Typography;

const ArticleDetail = (props) => {
    const { isDetailOpen, setIsDetailOpen, dataUpdate } = props;

    return (
        <Drawer
            title="Chi Tiết Bài Viết"
            width={"100%"}
            open={isDetailOpen}
            onClose={() => setIsDetailOpen(false)}
            bodyStyle={{ padding: "16px" }}
        >
            {dataUpdate ? (
                <>
                    <Title level={4} style={{ marginBottom: "16px" }}>
                        {dataUpdate.title || "Không có tiêu đề"}
                    </Title>
                    <Descriptions bordered column={1} size="small">
                        <Descriptions.Item label="ID">{dataUpdate.id || "-"}</Descriptions.Item>
                        <Descriptions.Item label="Loại bài viết">
                            {dataUpdate.type || "-"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Tiêu đề">
                            {dataUpdate.title || "-"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Ngày tạo">
                            {dataUpdate.createdAt
                                ? moment(dataUpdate.createdAt).format("DD/MM/YYYY HH:mm:ss")
                                : "-"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Ngày cập nhật">
                            {dataUpdate.updatedAt
                                ? moment(dataUpdate.updatedAt).format("DD/MM/YYYY HH:mm:ss")
                                : "-"}
                        </Descriptions.Item>
                    </Descriptions>
                    <div style={{ marginTop: "24px" }}>
                        <Title level={5} style={{ marginBottom: "8px" }}>
                            Hình ảnh nổi bật
                        </Title>
                        {dataUpdate.featuredImageUrl ? (
                            <Image
                                src={`${import.meta.env.VITE_BACKEND_URL}${dataUpdate.featuredImageUrl}`}
                                // style={{ width: '100%', height: 200, objectFit: 'contain', display: 'block' }}
                                alt="Hình ảnh nổi bật"
                                width={150}
                                height={150}
                                style={{ objectFit: "cover", borderRadius: "4px" }}
                                preview
                            />
                        ) : (
                            <Paragraph style={{ color: "#8c8c8c" }}>
                                Không có hình ảnh
                            </Paragraph>
                        )}
                    </div>
                    <div style={{ marginTop: "24px" }}>
                        <Title level={5} style={{ marginBottom: "8px" }}>
                            Nội dung
                        </Title>
                        <Paragraph
                            ellipsis={{
                                rows: 5,
                                expandable: true,
                                symbol: "Xem thêm",
                            }}
                            style={{ background: "#fafafa", padding: "12px", borderRadius: "4px" }}
                        >
                            {dataUpdate.content || "Không có nội dung"}
                        </Paragraph>
                    </div>
                </>
            ) : (
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="Không có dữ liệu bài viết"
                    style={{ marginTop: "50px" }}
                />
            )}
        </Drawer>
    );
};

export default ArticleDetail;