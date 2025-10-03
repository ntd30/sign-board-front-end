import React, { useEffect } from 'react';
import { Typography, Divider, Layout, List, Space, Card } from 'antd';
import {
    CreditCardOutlined,
    DollarCircleOutlined,
    SafetyCertificateOutlined,
    ContactsOutlined,
    PhoneOutlined,
    MailOutlined,
    BankOutlined,
    ShopOutlined
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

const PaymentPolicy = () => {
    useEffect(() => {
        const antdResetCss = document.createElement("link");
        antdResetCss.id = "antd-reset-css-payment-policy";
        if (!document.getElementById(antdResetCss.id)) {
            antdResetCss.rel = "stylesheet";
            antdResetCss.href = "https://unpkg.com/antd/dist/reset.css";
            document.head.appendChild(antdResetCss);
        }
    }, []);

    const companyName = "Quảng cáo Nhân Việt";
    const companyAddress = "Văn phòng giao dịch: Nhà 2B, 110 Đường Nguyễn Hoàng Tôn, Xuân La, Tây Hồ, Hà Nội";

    const paymentMethodsData = [
        `Thanh toán qua chuyển khoản ngân hàng hoặc các ví điện tử được chấp nhận (như Momo, ZaloPay). Thông tin tài khoản ngân hàng sẽ được cung cấp trong báo giá hoặc hợp đồng.`,
        `Thanh toán trực tiếp bằng tiền mặt hoặc thẻ tín dụng/thẻ ghi nợ tại văn phòng của <Text style={styles.codeText}>${companyName}</Text> tại địa chỉ: ${companyAddress}.`,
    ];

    const paymentTermsData = [
        `Đối với các dự án thiết kế, sản xuất và lắp đặt biển quảng cáo, thanh toán được chia thành các giai đoạn: đặt cọc (thường 30-50%), thanh toán sau khi duyệt thiết kế, và thanh toán phần còn lại sau khi hoàn tất lắp đặt.`,
        `Chi tiết điều khoản thanh toán, bao gồm tỷ lệ và thời điểm thanh toán, sẽ được nêu rõ trong hợp đồng dịch vụ ký kết với khách hàng.`,
        `<Text style={styles.codeText}>${companyName}</Text> cung cấp hóa đơn VAT (nếu yêu cầu) và biên lai đầy đủ cho tất cả các giao dịch thanh toán.`,
    ];

    return (
        <Layout style={styles.layout}>
            <Content style={styles.content}>
                <Card bordered={false} style={styles.contentContainer} bodyStyle={{ padding: '30px 40px' }}>
                    <Title level={2} style={styles.mainTitle}>
                        <CreditCardOutlined style={{ marginRight: '12px' }} />
                        CHÍNH SÁCH THANH TOÁN
                    </Title>
                    <Divider style={styles.customDivider} />

                    <Title level={4} style={styles.sectionTitle}>
                        <BankOutlined style={styles.sectionTitleIcon} />
                        1. Hình thức Thanh toán
                    </Title>
                    <Paragraph style={styles.sectionContent}>
                        Để hỗ trợ khách hàng trong việc thanh toán cho các dịch vụ thiết kế, sản xuất và lắp đặt biển quảng cáo, <Text style={styles.codeText}>{companyName}</Text> cung cấp các hình thức thanh toán linh hoạt sau:
                    </Paragraph>
                    <List
                        style={styles.contentList}
                        dataSource={paymentMethodsData}
                        renderItem={(item, index) => (
                            <List.Item style={index === paymentMethodsData.length - 1 ? styles.listItemLast : styles.listItem}>
                                <span dangerouslySetInnerHTML={{ __html: item }} />
                            </List.Item>
                        )}
                    />

                    <Title level={4} style={styles.sectionTitle}>
                        <DollarCircleOutlined style={styles.sectionTitleIcon} />
                        2. Điều khoản Thanh toán
                    </Title>
                    <List
                        style={styles.contentList}
                        dataSource={paymentTermsData}
                        renderItem={(item, index) => (
                            <List.Item style={index === paymentTermsData.length - 1 ? styles.listItemLast : styles.listItem}>
                                <span dangerouslySetInnerHTML={{ __html: item }} />
                            </List.Item>
                        )}
                    />

                    <Title level={4} style={styles.sectionTitle}>
                        <SafetyCertificateOutlined style={styles.sectionTitleIcon} />
                        3. Cam kết Bảo mật Thông tin Thanh toán
                    </Title>
                    <Paragraph style={styles.sectionContent}>
                        <Text style={styles.codeText}>{companyName}</Text> cam kết bảo vệ thông tin thanh toán của khách hàng bằng các biện pháp bảo mật tiên tiến. Mọi thông tin tài chính được cung cấp sẽ được xử lý an toàn và không chia sẻ với bên thứ ba, trừ khi có yêu cầu hợp pháp từ cơ quan chức năng.
                    </Paragraph>

                    <Title level={4} style={styles.sectionTitle}>
                        <ContactsOutlined style={styles.sectionTitleIcon} />
                        4. Kênh Liên hệ Hỗ trợ Thanh toán
                    </Title>
                    <Paragraph style={styles.sectionContent}>
                        Nếu có bất kỳ thắc mắc nào về chính sách thanh toán hoặc cần hỗ trợ trong quá trình giao dịch, quý khách vui lòng liên hệ qua:
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
                        Lưu ý: Quý khách vui lòng kiểm tra kỹ thông tin đơn hàng và chi tiết thanh toán trước khi thực hiện giao dịch. Hãy lưu giữ biên lai hoặc xác nhận giao dịch để đảm bảo quyền lợi khi sử dụng dịch vụ thiết kế, sản xuất và lắp đặt biển quảng cáo của <Text style={styles.codeText}>{companyName}</Text>.
                    </Paragraph>
                </Card>
            </Content>
        </Layout>
    );
};

export default PaymentPolicy;