import React, { useEffect } from 'react';
import { Typography, Divider, Layout, List, Space, Card } from 'antd';
import {
    AuditOutlined,
    StarOutlined,
    TeamOutlined,
    ScheduleOutlined,
    EditOutlined,
    CustomerServiceOutlined,
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

const ServiceStandards = () => {
    useEffect(() => {
        const antdResetCss = document.createElement("link");
        antdResetCss.id = "antd-reset-css-service-standards";
        if (!document.getElementById(antdResetCss.id)) {
            antdResetCss.rel = "stylesheet";
            antdResetCss.href = "https://unpkg.com/antd/dist/reset.css";
            document.head.appendChild(antdResetCss);
        }
    }, []);

    const companyName = "SignMaster.vn";

    const customerResponsibilitiesData = [
        `Đảm bảo chất lượng của các sản phẩm biển quảng cáo, từ thiết kế đến sản xuất, đáp ứng tiêu chuẩn kỹ thuật và thẩm mỹ.`,
        `Cung cấp dịch vụ tư vấn và hỗ trợ khách hàng liên tục qua các kênh trực tuyến, điện thoại và tại chỗ.`,
    ];

    const progressReportingData = [
        `Cung cấp báo cáo tiến độ định kỳ (hàng tuần hoặc theo thỏa thuận) về quá trình thiết kế, sản xuất và lắp đặt biển quảng cáo.`,
        `Tổ chức các buổi gặp mặt hoặc liên hệ trực tiếp để cập nhật tiến độ và giải đáp thắc mắc của khách hàng.`,
    ];

    const editingCommitmentData = [
        `Thực hiện chỉnh sửa thiết kế biển quảng cáo theo yêu cầu của khách hàng để đảm bảo sản phẩm phù hợp với mục đích sử dụng.`,
        `Cam kết hỗ trợ chỉnh sửa cho đến khi khách hàng hài lòng, đảm bảo chất lượng và tính thẩm mỹ của sản phẩm.`,
    ];

    return (
        <Layout style={styles.layout}>
            <Content style={styles.content}>
                <Card bordered={false} style={styles.contentContainer} bodyStyle={{ padding: '30px 40px' }}>
                    <Title level={2} style={styles.mainTitle}>
                        <AuditOutlined style={{ marginRight: '12px' }} />
                        TIÊU CHUẨN DỊCH VỤ
                    </Title>
                    <Divider style={styles.customDivider} />

                    <Title level={4} style={styles.sectionTitle}>
                        <StarOutlined style={styles.sectionTitleIcon} />
                        1. Chất lượng Dịch vụ
                    </Title>
                    <Paragraph style={styles.sectionContent}>
                        <Text style={styles.codeText}>{companyName}</Text> cam kết cung cấp dịch vụ thiết kế, sản xuất và lắp đặt biển quảng cáo chất lượng cao, bao gồm các loại biển LED, biển chữ nổi, biển hộp đèn và biển in bạt, đáp ứng đầy đủ yêu cầu về thẩm mỹ và kỹ thuật của khách hàng.
                    </Paragraph>

                    <Title level={4} style={styles.sectionTitle}>
                        <TeamOutlined style={styles.sectionTitleIcon} />
                        2. Trách nhiệm Đối với Khách hàng
                    </Title>
                    <List
                        style={styles.contentList}
                        dataSource={customerResponsibilitiesData}
                        renderItem={(item, index) => (
                            <List.Item style={index === customerResponsibilitiesData.length - 1 ? styles.listItemLast : styles.listItem}>
                                <Text>{item}</Text>
                            </List.Item>
                        )}
                    />

                    <Title level={4} style={styles.sectionTitle}>
                        <ScheduleOutlined style={styles.sectionTitleIcon} />
                        3. Tiến độ và Báo cáo
                    </Title>
                    <List
                        style={styles.contentList}
                        dataSource={progressReportingData}
                        renderItem={(item, index) => (
                            <List.Item style={index === progressReportingData.length - 1 ? styles.listItemLast : styles.listItem}>
                                <Text>{item}</Text>
                            </List.Item>
                        )}
                    />

                    <Title level={4} style={styles.sectionTitle}>
                        <EditOutlined style={styles.sectionTitleIcon} />
                        4. Cam kết Chỉnh sửa
                    </Title>
                    <List
                        style={styles.contentList}
                        dataSource={editingCommitmentData}
                        renderItem={(item, index) => (
                            <List.Item style={index === editingCommitmentData.length - 1 ? styles.listItemLast : styles.listItem}>
                                <Text>{item}</Text>
                            </List.Item>
                        )}
                    />

                    <Title level={4} style={styles.sectionTitle}>
                        <CustomerServiceOutlined style={styles.sectionTitleIcon} />
                        5. Phản hồi và Hỗ trợ
                    </Title>
                    <Paragraph style={styles.sectionContent}>
                        Đội ngũ chăm sóc khách hàng của <Text style={styles.codeText}>{companyName}</Text> luôn sẵn sàng tiếp nhận phản hồi và cung cấp hỗ trợ kỹ thuật, bảo trì để đảm bảo sự hài lòng và hiệu quả sử dụng biển quảng cáo.
                    </Paragraph>

                    <Title level={4} style={styles.sectionTitle}>
                        <ContactsOutlined style={styles.sectionTitleIcon} />
                        6. Kênh Liên hệ
                    </Title>
                    <Paragraph style={styles.sectionContent}>
                        Để được tư vấn và hỗ trợ, khách hàng vui lòng liên hệ qua:
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
                        Lưu ý: Chúng tôi luôn lắng nghe phản hồi từ khách hàng để không ngừng nâng cao chất lượng dịch vụ, đảm bảo mang đến những sản phẩm biển quảng cáo đáp ứng tốt nhất nhu cầu quảng bá thương hiệu.
                    </Paragraph>
                </Card>
            </Content>
        </Layout>
    );
};

export default ServiceStandards;