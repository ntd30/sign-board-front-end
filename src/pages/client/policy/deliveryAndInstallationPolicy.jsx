import React, { useEffect } from 'react';
import { Typography, Divider, Layout, List, Space, Card } from 'antd';
import {
    CarOutlined,
    CheckSquareOutlined,
    ProfileOutlined,
    ToolOutlined,
    MessageOutlined,
    PhoneOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
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

const DeliveryAndInstallationPolicy = () => {
    useEffect(() => {
        const antdResetCss = document.createElement("link");
        antdResetCss.id = "antd-reset-css-delivery";
        if (!document.getElementById(antdResetCss.id)) {
            antdResetCss.rel = "stylesheet";
            antdResetCss.href = "https://unpkg.com/antd/dist/reset.css";
            document.head.appendChild(antdResetCss);
        }
    }, []);

    const companyName = "Quảng cáo Nhân Việt";

    const shippingScope = [
        "Chúng tôi hỗ trợ giao hàng tận nơi trên toàn quốc thông qua các đơn vị vận chuyển uy tín.",
        "Tại khu vực nội thành TP.HCM, nhân viên của " + companyName + " sẽ trực tiếp giao và lắp đặt sản phẩm cho khách hàng.",
        "Đối với khu vực ngoài phạm vi hỗ trợ trực tiếp, chúng tôi sẽ hướng dẫn và phối hợp cùng đơn vị vận chuyển để đảm bảo quá trình giao hàng suôn sẻ."
    ];

    const installationPolicy = [
        "Dịch vụ lắp đặt chỉ áp dụng cho các sản phẩm có yêu cầu kỹ thuật, ví dụ như biển quảng cáo, bảng hiệu, hoặc các thiết bị trưng bày đặc biệt.",
        "Khách hàng cần chuẩn bị sẵn mặt bằng và điều kiện thi công trước khi đội kỹ thuật đến lắp đặt.",
        companyName + " sẽ thông báo thời gian lắp đặt cụ thể và thực hiện đúng lịch hẹn đã xác nhận."
    ];

    const shippingFeePolicy = [
        "Miễn phí vận chuyển trong nội thành TP.HCM đối với đơn hàng trên 5.000.000 VNĐ.",
        "Đối với đơn hàng nhỏ hơn hoặc giao đến các tỉnh thành khác, chi phí vận chuyển sẽ được tính theo biểu phí của đơn vị vận chuyển.",
        "Mọi chi phí phát sinh (bốc xếp, phí cầu đường, phí vào khu vực hạn chế,...) sẽ được thông báo trước cho khách hàng."
    ];

    return (
        <Layout style={styles.layout}>
            <Content style={styles.content}>
                <Card bordered={false} style={styles.contentContainer} bodyStyle={{ padding: '30px 40px' }}>
                    <Title level={2} style={styles.mainTitle}>
                        <CarOutlined style={{ marginRight: '12px' }} />
                        CHÍNH SÁCH VẬN CHUYỂN & LẮP ĐẶT
                    </Title>
                    <Divider style={styles.customDivider} />

                    <Title level={4} style={styles.sectionTitle}>
                        <CheckSquareOutlined style={styles.sectionTitleIcon} />
                        1. Phạm vi Áp dụng
                    </Title>
                    <Paragraph style={styles.sectionContent}>
                        Chính sách vận chuyển và lắp đặt được áp dụng cho tất cả các đơn hàng đặt tại <Text style={styles.codeText}>{companyName}</Text>.  
                        Chúng tôi cam kết mang đến dịch vụ giao hàng và lắp đặt nhanh chóng, an toàn và đúng hẹn.
                    </Paragraph>

                    <Title level={4} style={styles.sectionTitle}>
                        <ProfileOutlined style={styles.sectionTitleIcon} />
                        2. Phương thức Vận chuyển
                    </Title>
                    <List
                        dataSource={shippingScope}
                        renderItem={(item, index) => (
                            <List.Item style={index === shippingScope.length - 1 ? styles.listItemLast : styles.listItem}>
                                <Text>{item}</Text>
                            </List.Item>
                        )}
                    />

                    <Title level={4} style={styles.sectionTitle}>
                        <ToolOutlined style={styles.sectionTitleIcon} />
                        3. Chính sách Lắp đặt
                    </Title>
                    <List
                        dataSource={installationPolicy}
                        renderItem={(item, index) => (
                            <List.Item style={index === installationPolicy.length - 1 ? styles.listItemLast : styles.listItem}>
                                <Text>{item}</Text>
                            </List.Item>
                        )}
                    />

                    <Title level={4} style={styles.sectionTitle}>
                        <CheckSquareOutlined style={styles.sectionTitleIcon} />
                        4. Phí Vận chuyển và Lắp đặt
                    </Title>
                    <List
                        dataSource={shippingFeePolicy}
                        renderItem={(item, index) => (
                            <List.Item style={index === shippingFeePolicy.length - 1 ? styles.listItemLast : styles.listItem}>
                                <Text>{item}</Text>
                            </List.Item>
                        )}
                    />

                    <Title level={4} style={styles.sectionTitle}>
                        <MessageOutlined style={styles.sectionTitleIcon} />
                        5. Liên hệ và Hỗ trợ
                    </Title>
                    <Paragraph style={styles.sectionContent}>
                        Nếu có bất kỳ câu hỏi hoặc yêu cầu hỗ trợ nào về vận chuyển và lắp đặt, vui lòng liên hệ:
                        <Space direction="vertical" size="small" style={{ marginTop: '15px', display: 'block', width: '100%' }}>
                            <div style={styles.contactInfoItem}>
                                <PhoneOutlined style={styles.contactIcon} />
                                <Text>Hotline: <Text strong>0973.454.140</Text></Text>
                            </div>
                        </Space>
                    </Paragraph>

                    <Divider style={styles.customDivider} />
                    <Paragraph style={styles.noteText}>
                        Lưu ý: Chính sách vận chuyển và lắp đặt có thể được điều chỉnh tùy theo từng khu vực và loại sản phẩm.  
                        Quý khách vui lòng kiểm tra kỹ trước khi xác nhận đơn hàng.
                    </Paragraph>
                </Card>
            </Content>
        </Layout>
    );
};

export default DeliveryAndInstallationPolicy;
