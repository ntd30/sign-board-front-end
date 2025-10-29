import React, { useEffect } from 'react';
import { Typography, Divider, Layout, List, Space, Card } from 'antd';
import {
    FileDoneOutlined,
    UserOutlined,
    CheckCircleOutlined,
    ToolOutlined,
    CopyrightOutlined,
    WarningOutlined,
    EditOutlined,
    MessageOutlined,
    PhoneOutlined,
    SolutionOutlined,
} from '@ant-design/icons';

const { Title, Paragraph, Text, Link: AntLink } = Typography;
const { Content } = Layout;

const styles = {
    layout: { minHeight: '100vh', background: '#f8f9fa' },
    content: { padding: '24px' },
    contentContainer: { maxWidth: '960px', margin: '24px auto' },
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
    sectionTitleIcon: { marginRight: '12px', color: '#007BFF', fontSize: '24px' },
    sectionContent: {
        color: '#343a40',
        lineHeight: 1.9,
        marginBottom: '24px',
        fontSize: '16px',
        textAlign: 'justify',
    },
    contentList: { paddingLeft: '20px' },
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
    contactInfoItem: { display: 'flex', alignItems: 'center', marginBottom: '12px' },
    contactIcon: {
        marginRight: '12px',
        color: '#007BFF',
        fontSize: '20px',
        marginTop: '3px',
    },
};

const OrderPolicy = () => {
    useEffect(() => {
        const antdResetCss = document.createElement('link');
        antdResetCss.id = 'antd-reset-css-order';
        if (!document.getElementById(antdResetCss.id)) {
            antdResetCss.rel = 'stylesheet';
            antdResetCss.href = 'https://unpkg.com/antd/dist/reset.css';
            document.head.appendChild(antdResetCss);
        }
    }, []);

    const companyName = 'Quảng cáo Nhân Việt';

    const orderSteps = [
        'Khách hàng lựa chọn sản phẩm/dịch vụ và gửi yêu cầu đặt hàng thông qua website hoặc liên hệ trực tiếp.',
        'Bộ phận chăm sóc khách hàng xác nhận đơn hàng, thông tin giao nhận và phương thức thanh toán.',
        'Khách hàng tiến hành thanh toán theo hình thức đã chọn (chuyển khoản, tiền mặt, hoặc COD).',
        'Đơn hàng được xử lý, sản xuất và giao đến địa chỉ của khách hàng theo đúng thời gian cam kết.',
    ];

    const customerDuties = [
        'Cung cấp thông tin đặt hàng chính xác: họ tên, địa chỉ, số điện thoại, và phương thức thanh toán.',
        'Kiểm tra kỹ thông tin đơn hàng trước khi xác nhận.',
        'Thanh toán đúng thời hạn theo quy định trong đơn hàng.',
        'Tiếp nhận sản phẩm đúng thời gian giao hàng và ký xác nhận khi nhận hàng.',
    ];

    const companyCommitments = [
        'Xử lý đơn hàng nhanh chóng, đúng sản phẩm và số lượng đã được xác nhận.',
        'Đảm bảo chất lượng sản phẩm trước khi giao hàng.',
        'Cung cấp hóa đơn và chứng từ theo yêu cầu của khách hàng.',
        'Hỗ trợ đổi/trả hàng trong các trường hợp sản phẩm lỗi, hư hỏng do nhà sản xuất (theo chính sách đổi trả).',
    ];

    return (
        <Layout style={styles.layout}>
            <Content style={styles.content}>
                <Card
                    bordered={false}
                    style={styles.contentContainer}
                    bodyStyle={{ padding: '30px 40px' }}
                >
                    <Title level={2} style={styles.mainTitle}>
                        <FileDoneOutlined style={{ marginRight: '12px' }} />
                        CHÍNH SÁCH ĐẶT HÀNG
                    </Title>
                    <Divider style={styles.customDivider} />

                    <Title level={4} style={styles.sectionTitle}>
                        <CheckCircleOutlined style={styles.sectionTitleIcon} />
                        1. Quy định chung
                    </Title>
                    <Paragraph style={styles.sectionContent}>
                        Khi khách hàng tiến hành đặt hàng tại <Text style={styles.codeText}>{companyName}</Text>, đồng nghĩa với việc khách hàng đã đọc, hiểu và đồng ý tuân thủ các điều khoản trong chính sách đặt hàng này.
                    </Paragraph>

                    <Title level={4} style={styles.sectionTitle}>
                        <ToolOutlined style={styles.sectionTitleIcon} />
                        2. Quy trình đặt hàng
                    </Title>
                    <Paragraph style={styles.sectionContent}>
                        Quy trình đặt hàng tại <Text style={styles.codeText}>{companyName}</Text> bao gồm:
                    </Paragraph>
                    <List
                        style={styles.contentList}
                        dataSource={orderSteps}
                        renderItem={(item, index) => (
                            <List.Item
                                style={
                                    index === orderSteps.length - 1
                                        ? styles.listItemLast
                                        : styles.listItem
                                }
                            >
                                <Text>{item}</Text>
                            </List.Item>
                        )}
                    />

                    <Title level={4} style={styles.sectionTitle}>
                        <UserOutlined style={styles.sectionTitleIcon} />
                        3. Trách nhiệm của Khách hàng
                    </Title>
                    <List
                        style={styles.contentList}
                        dataSource={customerDuties}
                        renderItem={(item, index) => (
                            <List.Item
                                style={
                                    index === customerDuties.length - 1
                                        ? styles.listItemLast
                                        : styles.listItem
                                }
                            >
                                <Text>{item}</Text>
                            </List.Item>
                        )}
                    />

                    <Title level={4} style={styles.sectionTitle}>
                        <SolutionOutlined style={styles.sectionTitleIcon} />
                        4. Cam kết của <Text style={styles.codeText}>{companyName}</Text>
                    </Title>
                    <List
                        style={styles.contentList}
                        dataSource={companyCommitments}
                        renderItem={(item, index) => (
                            <List.Item
                                style={
                                    index === companyCommitments.length - 1
                                        ? styles.listItemLast
                                        : styles.listItem
                                }
                            >
                                <Text>{item}</Text>
                            </List.Item>
                        )}
                    />

                    <Title level={4} style={styles.sectionTitle}>
                        <CopyrightOutlined style={styles.sectionTitleIcon} />
                        5. Xác nhận đơn hàng
                    </Title>
                    <Paragraph style={styles.sectionContent}>
                        Đơn hàng chỉ được xem là hợp lệ sau khi <Text style={styles.codeText}>{companyName}</Text> liên hệ xác nhận với khách hàng qua điện thoại hoặc email. Trường hợp khách hàng không phản hồi trong vòng 24 giờ, đơn hàng có thể bị hủy tự động.
                    </Paragraph>

                    <Title level={4} style={styles.sectionTitle}>
                        <WarningOutlined style={styles.sectionTitleIcon} />
                        6. Hủy đơn hàng
                    </Title>
                    <Paragraph style={styles.sectionContent}>
                        Khách hàng có thể yêu cầu hủy đơn hàng trước khi sản phẩm được sản xuất hoặc giao hàng. Sau thời điểm này, việc hủy đơn sẽ không được chấp nhận. Trong một số trường hợp đặc biệt, <Text style={styles.codeText}>{companyName}</Text> sẽ xem xét hỗ trợ linh hoạt tùy tình huống cụ thể.
                    </Paragraph>

                    <Title level={4} style={styles.sectionTitle}>
                        <EditOutlined style={styles.sectionTitleIcon} />
                        7. Thay đổi Chính sách
                    </Title>
                    <Paragraph style={styles.sectionContent}>
                        <Text style={styles.codeText}>{companyName}</Text> có thể cập nhật hoặc điều chỉnh chính sách đặt hàng theo từng thời điểm mà không cần thông báo trước. Chính sách mới sẽ có hiệu lực ngay khi được đăng tải trên website.
                    </Paragraph>

                    <Title level={4} style={styles.sectionTitle}>
                        <MessageOutlined style={styles.sectionTitleIcon} />
                        8. Liên hệ Hỗ trợ
                    </Title>
                    <Paragraph style={styles.sectionContent}>
                        Nếu có bất kỳ thắc mắc nào về chính sách đặt hàng, vui lòng liên hệ:
                        <Space
                            direction="vertical"
                            size="small"
                            style={{
                                marginTop: '15px',
                                display: 'block',
                                width: '100%',
                            }}
                        >
                            <div style={styles.contactInfoItem}>
                                <PhoneOutlined style={styles.contactIcon} />
                                <Text>
                                    Hotline: <Text strong>0973.454.140</Text>
                                </Text>
                            </div>
                        </Space>
                    </Paragraph>

                    <Divider style={styles.customDivider} />
                    <Paragraph
                        style={{
                            textAlign: 'center',
                            color: '#546e7a',
                            fontSize: '14px',
                        }}
                    >
                        Lưu ý: Khi xác nhận đặt hàng, khách hàng được xem là đã đồng ý với
                        toàn bộ các điều khoản trong chính sách này.
                    </Paragraph>
                </Card>
            </Content>
        </Layout>
    );
};

export default OrderPolicy;
