import React, { useEffect } from 'react';
import { Typography, Divider, Layout, List, Space, Card } from 'antd';
import {
    DeliveredProcedureOutlined, // Icon cho bàn giao
    CheckCircleOutlined,      // Icon cho cam kết
    ProfileOutlined,          // Icon cho quy trình
    ToolOutlined,             // Icon cho hỗ trợ kỹ thuật
    LikeOutlined,             // Icon cho phản hồi, hài lòng
    ContactsOutlined,
    PhoneOutlined,
    MailOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text, Link: AntLink } = Typography;
const { Content } = Layout;

// Định nghĩa styles bằng object - tái sử dụng và tinh chỉnh từ các trang trước
const styles = {
    layout: {
        minHeight: '100vh',
        background: '#f8f9fa',
    },
    content: {
        padding: '24px',
    },
    contentContainer: {
        maxWidth: '960px',
        margin: '24px auto',
    },
    mainTitle: {
        color: '#1A237E',
        textAlign: 'center',
        marginBottom: '24px',
        fontWeight: 700,
        fontSize: '28px',
    },
    customDivider: {
        borderColor: '#007BFF',
        borderWidth: '2px',
        margin: '32px 0',
    },
    sectionTitle: {
        color: '#0056b3',
        marginTop: '32px',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        fontSize: '22px',
        fontWeight: 600,
    },
    sectionTitleIcon: {
        marginRight: '12px',
        color: '#007BFF',
        fontSize: '24px',
    },
    sectionContent: {
        color: '#343a40',
        lineHeight: 1.9,
        marginBottom: '24px',
        fontSize: '16px',
        textAlign: 'justify',
    },
    contentList: {
        marginLeft: '0px',
        paddingLeft: '20px',
    },
    listItem: {
        padding: '10px 0',
        color: '#343a40',
        borderBottom: '1px dashed #dee2e6',
        fontSize: '16px',
        textAlign: 'justify',
    },
    listItemLast: {
        padding: '10px 0',
        color: '#343a40',
        borderBottom: 'none',
        fontSize: '16px',
        textAlign: 'justify',
    },
    codeText: {
        background: '#e9ecef',
        padding: '3px 8px',
        borderRadius: '4px',
        color: '#0056b3',
        fontFamily: 'monospace',
        fontWeight: 600,
    },
    contactInfoItem: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '12px',
    },
    contactIcon: {
        marginRight: '12px',
        color: '#007BFF',
        fontSize: '20px',
        marginTop: '3px',
    },
    noteText: {
        display: 'block',
        marginTop: '20px',
        color: '#546e7a',
        fontSize: '14px',
        fontStyle: 'italic',
        textAlign: 'center',
    }
};

const HandoverPolicy = () => {
    useEffect(() => {
        const antdResetCss = document.createElement("link");
        antdResetCss.id = "antd-reset-css-handover-policy"; // ID riêng cho trang này
        if (!document.getElementById(antdResetCss.id)) {
            antdResetCss.rel = "stylesheet";
            antdResetCss.href = "https://unpkg.com/antd/dist/reset.css";
            document.head.appendChild(antdResetCss);
        }
    }, []);

    const companyName = "IDAI.VN";

    const handoverProcessData = [
        `<strong>Xác nhận hoàn thành:</strong> Sau khi hoàn thành dự án, ${companyName} sẽ gửi thông báo và thực hiện kiểm tra để đảm bảo chất lượng sản phẩm trước khi bàn giao.`,
        `<strong>Bàn giao trực tiếp hoặc trực tuyến:</strong> Khách hàng có thể lựa chọn nhận sản phẩm qua các phương thức trực tuyến hoặc tại văn phòng ${companyName} theo yêu cầu.`,
        `<strong>Hướng dẫn sử dụng:</strong> Hỗ trợ khách hàng trong quá trình cài đặt và sử dụng, bao gồm tài liệu hướng dẫn và giải đáp thắc mắc kỹ thuật liên quan đến sản phẩm.`,
    ];

    const postHandoverSupportData = [
        `<strong>Hỗ trợ kỹ thuật sau bàn giao:</strong> ${companyName} cung cấp hỗ trợ kỹ thuật trong thời gian nhất định sau bàn giao để đảm bảo sản phẩm hoạt động đúng cách và đáp ứng yêu cầu của khách hàng.`,
        `<strong>Sửa lỗi và bảo trì:</strong> Trong trường hợp phát hiện lỗi kỹ thuật sau khi bàn giao, chúng tôi cam kết khắc phục nhanh chóng mà không phát sinh thêm chi phí trong thời hạn hỗ trợ.`,
    ];

    return (
        <Layout style={styles.layout}>
            <Content style={styles.content}>
                <Card bordered={false} style={styles.contentContainer} bodyStyle={{ padding: '30px 40px' }}>
                    <Title level={2} style={styles.mainTitle}>
                        <DeliveredProcedureOutlined style={{ marginRight: '12px' }} />
                        CHÍNH SÁCH BÀN GIAO
                    </Title>
                    <Divider style={styles.customDivider} />

                    <Title level={4} style={styles.sectionTitle}>
                        <CheckCircleOutlined style={styles.sectionTitleIcon} />
                        1. Cam kết Bàn giao Đầy đủ và Chính xác
                    </Title>
                    <Paragraph style={styles.sectionContent}>
                        <Text style={styles.codeText}>{companyName}</Text> đảm bảo bàn giao sản phẩm và dịch vụ đúng với mô tả, yêu cầu đã được thống nhất với khách hàng. Mọi tài liệu, mã nguồn, hướng dẫn, và tài sản kỹ thuật số khác sẽ được bàn giao đúng theo tiến độ thỏa thuận.
                    </Paragraph>

                    <Title level={4} style={styles.sectionTitle}>
                        <ProfileOutlined style={styles.sectionTitleIcon} />
                        2. Quy trình Bàn giao
                    </Title>
                    <List
                        style={styles.contentList}
                        dataSource={handoverProcessData}
                        renderItem={(item, index) => (
                            <List.Item style={index === handoverProcessData.length - 1 ? styles.listItemLast : styles.listItem}>
                                {/* Sử dụng span thay vì Typography.Text để render HTML */}
                                <span dangerouslySetInnerHTML={{ __html: item }} />
                            </List.Item>
                        )}
                    />

                    <Title level={4} style={styles.sectionTitle}>
                        <ToolOutlined style={styles.sectionTitleIcon} />
                        3. Cam kết Hỗ trợ sau Bàn giao
                    </Title>
                    <List
                        style={styles.contentList}
                        dataSource={postHandoverSupportData}
                        renderItem={(item, index) => (
                            <List.Item style={index === postHandoverSupportData.length - 1 ? styles.listItemLast : styles.listItem}>
                                {/* Sử dụng span thay vì Typography.Text để render HTML */}
                                <span dangerouslySetInnerHTML={{ __html: item }} />
                            </List.Item>
                        )}
                    />

                    <Title level={4} style={styles.sectionTitle}>
                        <LikeOutlined style={styles.sectionTitleIcon} />
                        4. Xác nhận Bàn giao và Phản hồi
                    </Title>
                    <Paragraph style={styles.sectionContent}>
                        Sau khi bàn giao, khách hàng được khuyến khích phản hồi để đánh giá và giúp chúng tôi nâng cao chất lượng dịch vụ. Bàn giao sẽ được xác nhận hoàn tất khi khách hàng đồng ý và hài lòng với sản phẩm.
                    </Paragraph>

                    <Title level={4} style={styles.sectionTitle}>
                        <ContactsOutlined style={styles.sectionTitleIcon} />
                        5. Kênh Liên hệ
                    </Title>
                    <Paragraph style={styles.sectionContent}>
                        Để nhận hỗ trợ về các vấn đề bàn giao, khách hàng vui lòng liên hệ qua:
                        <Space direction="vertical" size="small" style={{ marginTop: '15px', display: 'block', width: '100%' }}>
                            <div style={styles.contactInfoItem}>
                                <PhoneOutlined style={styles.contactIcon} />
                                <Text>Hotline: <Text strong>0973.454.140</Text></Text>
                            </div>
                            <div style={styles.contactInfoItem}>
                                <MailOutlined style={styles.contactIcon} />
                                <Text>Email: <Text strong><AntLink href="mailto:ai@idai.vn">ai@idai.vn</AntLink></Text></Text>
                            </div>
                        </Space>
                    </Paragraph>

                    <Divider style={styles.customDivider} />
                    <Paragraph style={styles.noteText}>
                        Lưu ý: Chúng tôi cam kết bàn giao minh bạch và đồng hành cùng khách hàng trong quá trình sử dụng sản phẩm, bảo đảm mọi yêu cầu kỹ thuật và hỗ trợ sau bàn giao được đáp ứng đầy đủ và hiệu quả.
                    </Paragraph>
                </Card>
            </Content>
        </Layout>
    );
};

export default HandoverPolicy;
