import React, { useEffect } from 'react';
import { Typography, Divider, Layout, List, Space, Card } from 'antd';
import {
    DeliveredProcedureOutlined,
    CheckCircleOutlined,
    ProfileOutlined,
    ToolOutlined,
    LikeOutlined,
    ContactsOutlined,
    PhoneOutlined,
    MailOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text, Link: AntLink } = Typography;
const { Content } = Layout;

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
        antdResetCss.id = "antd-reset-css-handover-policy";
        if (!document.getElementById(antdResetCss.id)) {
            antdResetCss.rel = "stylesheet";
            antdResetCss.href = "https://unpkg.com/antd/dist/reset.css";
            document.head.appendChild(antdResetCss);
        }
    }, []);

    const companyName = "Quảng cáo Nhân Việt";

    const handoverProcessData = [
        `<strong>Kiểm tra chất lượng:</strong> Sau khi hoàn thành sản xuất biển quảng cáo, ${companyName} sẽ tiến hành kiểm tra chất lượng kỹ lưỡng để đảm bảo sản phẩm đáp ứng yêu cầu thiết kế và tiêu chuẩn kỹ thuật.`,
        `<strong>Bàn giao sản phẩm:</strong> Biển quảng cáo sẽ được bàn giao trực tiếp tại địa điểm lắp đặt hoặc tại kho của ${companyName} theo thỏa thuận. Các file thiết kế số (nếu có) sẽ được gửi qua email hoặc nền tảng trực tuyến.`,
        `<strong>Hướng dẫn sử dụng và lắp đặt:</strong> ${companyName} cung cấp hướng dẫn chi tiết về cách sử dụng, bảo quản và lắp đặt biển quảng cáo, cùng với hỗ trợ kỹ thuật tại chỗ nếu cần.`,
    ];

    const postHandoverSupportData = [
        `<strong>Bảo hành sản phẩm:</strong> ${companyName} cung cấp bảo hành cho biển quảng cáo theo thời gian quy định trong hợp đồng, bao gồm sửa chữa hoặc thay thế miễn phí trong trường hợp lỗi do sản xuất.`,
        `<strong>Hỗ trợ kỹ thuật:</strong> Sau bàn giao, chúng tôi cung cấp hỗ trợ kỹ thuật để đảm bảo biển quảng cáo hoạt động hiệu quả, bao gồm tư vấn bảo trì và xử lý sự cố trong thời gian bảo hành.`,
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
                        <Text style={styles.codeText}>{companyName}</Text> cam kết bàn giao biển quảng cáo và các tài liệu thiết kế liên quan đúng với yêu cầu đã thống nhất trong hợp đồng. Sản phẩm sẽ được giao đúng tiến độ, đảm bảo chất lượng và tính thẩm mỹ.
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
                                <span dangerouslySetInnerHTML={{ __html: item }} />
                            </List.Item>
                        )}
                    />

                    <Title level={4} style={styles.sectionTitle}>
                        <LikeOutlined style={styles.sectionTitleIcon} />
                        4. Xác nhận Bàn giao và Phản hồi
                    </Title>
                    <Paragraph style={styles.sectionContent}>
                        Sau khi bàn giao biển quảng cáo, khách hàng được khuyến khích kiểm tra và xác nhận chất lượng sản phẩm. Phản hồi của khách hàng sẽ giúp <Text style={styles.codeText}>{companyName}</Text> cải thiện dịch vụ và đảm bảo sự hài lòng tối đa.
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
                                <Text>Hotline: <Text strong>0375145998</Text></Text>
                            </div>
                            <div style={styles.contactInfoItem}>
                                <MailOutlined style={styles.contactIcon} />
                                <Text>Email: <Text strong><AntLink href="mailto:ai@idai.vn">ai@idai.vn</AntLink></Text></Text>
                            </div>
                        </Space>
                    </Paragraph>

                    <Divider style={styles.customDivider} />
                    <Paragraph style={styles.noteText}>
                        Lưu ý: Chúng tôi cam kết bàn giao minh bạch và đồng hành cùng khách hàng để đảm bảo biển quảng cáo được sử dụng hiệu quả, với đầy đủ hỗ trợ kỹ thuật và bảo hành theo thỏa thuận.
                    </Paragraph>
                </Card>
            </Content>
        </Layout>
    );
};

export default HandoverPolicy;