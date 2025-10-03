import React, { useEffect } from 'react';
import { Typography, Divider, Layout, List, Space, Card } from 'antd'; // List might not be needed based on new content
import { UndoOutlined, CheckSquareOutlined, ProfileOutlined, SyncOutlined, MessageOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons'; // Relevant icons

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
    // contentList and listItem styles can be kept for potential future use, but not directly used if content is all paragraphs
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

const RefundPolicy = () => {
    useEffect(() => {
        const antdResetCss = document.createElement("link");
        antdResetCss.id = "antd-reset-css-refund"; // ID riêng cho trang này
        if (!document.getElementById(antdResetCss.id)) {
            antdResetCss.rel = "stylesheet";
            antdResetCss.href = "https://unpkg.com/antd/dist/reset.css";
            document.head.appendChild(antdResetCss);
        }
    }, []);

    const companyName = "Quảng cáo Nhân Việt"; // Tên công ty/website

    return (
        <Layout style={styles.layout}>
            <Content style={styles.content}>
                <Card bordered={false} style={styles.contentContainer} bodyStyle={{ padding: '30px 40px' }}>
                    <Title level={2} style={styles.mainTitle}>
                        <UndoOutlined style={{ marginRight: '12px' }} />
                        CHÍNH SÁCH HOÀN TRẢ
                    </Title>
                    <Divider style={styles.customDivider} />

                    <Title level={4} style={styles.sectionTitle}>
                        <CheckSquareOutlined style={styles.sectionTitleIcon} />
                        1. Cam kết Hoàn trả
                    </Title>
                    <Paragraph style={styles.sectionContent}>
                        <Text style={styles.codeText}>{companyName}</Text> cam kết mang lại sự hài lòng cho khách hàng. Trong trường hợp sản phẩm hoặc dịch vụ không đáp ứng yêu cầu, chúng tôi sẽ thực hiện hoàn tiền theo các điều kiện cụ thể.
                    </Paragraph>

                    <Title level={4} style={styles.sectionTitle}>
                        <ProfileOutlined style={styles.sectionTitleIcon} />
                        2. Điều kiện Hoàn trả
                    </Title>
                    <Paragraph style={styles.sectionContent}>
                        <strong>Dịch vụ không đạt yêu cầu:</strong> Sản phẩm có lỗi kỹ thuật hoặc không đúng như mô tả sẽ được hoàn tiền đầy đủ.
                    </Paragraph>
                    <Paragraph style={styles.sectionContent}>
                        <strong>Thời gian yêu cầu hoàn trả:</strong> Khách hàng cần yêu cầu hoàn trả trong vòng 7 ngày kể từ khi nhận sản phẩm.
                    </Paragraph>

                    <Title level={4} style={styles.sectionTitle}>
                        <SyncOutlined style={styles.sectionTitleIcon} />
                        3. Quy trình Hoàn trả
                    </Title>
                    <Paragraph style={styles.sectionContent}>
                        Khách hàng liên hệ với chúng tôi qua hotline hoặc email để gửi yêu cầu. <Text style={styles.codeText}>{companyName}</Text> sẽ tiến hành kiểm tra và xử lý yêu cầu hoàn tiền trong vòng 7 ngày làm việc kể từ khi nhận được yêu cầu.
                    </Paragraph>

                    <Title level={4} style={styles.sectionTitle}>
                        <MessageOutlined style={styles.sectionTitleIcon} />
                        4. Liên hệ và Hỗ trợ
                    </Title>
                    <Paragraph style={styles.sectionContent}>
                        Để yêu cầu hoàn trả hoặc có bất kỳ thắc mắc nào, khách hàng có thể liên hệ:
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
                        Lưu ý: Chính sách hoàn trả chỉ áp dụng đối với sản phẩm và dịch vụ mua tại <Text style={styles.codeText}>{companyName}</Text> và theo đúng các điều khoản nêu trên.
                    </Paragraph>
                </Card>
            </Content>
        </Layout>
    );
};

export default RefundPolicy;
