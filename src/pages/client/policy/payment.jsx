import React, { useEffect } from 'react';
import { Typography, Divider, Layout, List, Space, Card } from 'antd';
import {
    CreditCardOutlined, // Icon cho thanh toán
    DollarCircleOutlined,   // Icon cho điều khoản thanh toán
    SafetyCertificateOutlined, // Icon cho cam kết bảo mật
    ContactsOutlined,
    PhoneOutlined,
    MailOutlined,
    BankOutlined, // Icon cho chuyển khoản ngân hàng
    ShopOutlined // Icon cho thanh toán tại văn phòng
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

const PaymentPolicy = () => {
    useEffect(() => {
        const antdResetCss = document.createElement("link");
        antdResetCss.id = "antd-reset-css-payment-policy"; // ID riêng cho trang này
        if (!document.getElementById(antdResetCss.id)) {
            antdResetCss.rel = "stylesheet";
            antdResetCss.href = "https://unpkg.com/antd/dist/reset.css";
            document.head.appendChild(antdResetCss);
        }
    }, []);

    const companyName = "IDAI.VN"; // Tên công ty/website (có thể đổi thành tên công ty biển hiệu của bạn)
    const companyAddress = "Văn phòng giao dịch: Nhà 2B, 110 Đường Nguyễn Hoàng Tôn, Xuân La, Tây Hồ, Hà Nội"; // Địa chỉ công ty

    const paymentMethodsData = [
        `Thanh toán trực tuyến qua chuyển khoản ngân hàng hoặc các phương thức thanh toán điện tử được chấp nhận (Ví dụ: Momo, VNPay,...). Thông tin tài khoản sẽ được cung cấp chi tiết trong báo giá hoặc hợp đồng.`,
        `Thanh toán trực tiếp bằng tiền mặt hoặc thẻ tại văn phòng của <Text style={styles.codeText}>${companyName}</Text> tại địa chỉ: ${companyAddress}.`,
    ];

    const paymentTermsData = [
        `Đối với các dự án thiết kế và thi công biển hiệu, biển quảng cáo, khoản thanh toán thường được chia thành các giai đoạn (ví dụ: đặt cọc, thanh toán sau khi duyệt thiết kế, thanh toán sau khi hoàn thiện thi công).`,
        `Các điều khoản thanh toán chi tiết, bao gồm tỷ lệ thanh toán cho mỗi giai đoạn, sẽ được quy định rõ ràng trong hợp đồng hoặc thỏa thuận dịch vụ với khách hàng.`,
        `Chúng tôi sẽ cung cấp hóa đơn VAT (nếu có) và biên nhận đầy đủ cho mọi khoản thanh toán đã được hoàn tất.`,
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
                        Để thuận tiện cho quý khách hàng khi đặt làm biển hiệu, biển quảng cáo tại <Text style={styles.codeText}>{companyName}</Text>, chúng tôi hỗ trợ các hình thức thanh toán linh hoạt sau:
                    </Paragraph>
                    <List
                        style={styles.contentList}
                        dataSource={paymentMethodsData}
                        renderItem={(item, index) => (
                            <List.Item style={index === paymentMethodsData.length - 1 ? styles.listItemLast : styles.listItem}>
                                {/* Sử dụng span thay vì Typography.Text để render HTML */}
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
                                {/* Sử dụng span thay vì Typography.Text để render HTML */}
                                <span dangerouslySetInnerHTML={{ __html: item }} />
                            </List.Item>
                        )}
                    />

                    <Title level={4} style={styles.sectionTitle}>
                        <SafetyCertificateOutlined style={styles.sectionTitleIcon} />
                        3. Cam kết Bảo mật Thông tin Thanh toán
                    </Title>
                    <Paragraph style={styles.sectionContent}>
                        <Text style={styles.codeText}>{companyName}</Text> cam kết bảo vệ an toàn tuyệt đối thông tin thanh toán của quý khách. Chúng tôi áp dụng các biện pháp bảo mật tiên tiến để đảm bảo mọi giao dịch được thực hiện một cách an toàn và bảo mật. Thông tin tài chính của khách hàng sẽ không được tiết lộ cho bất kỳ bên thứ ba nào, trừ khi có yêu cầu hợp pháp từ cơ quan nhà nước có thẩm quyền.
                    </Paragraph>

                    <Title level={4} style={styles.sectionTitle}>
                        <ContactsOutlined style={styles.sectionTitleIcon} />
                        4. Kênh Liên hệ Hỗ trợ Thanh toán
                    </Title>
                    <Paragraph style={styles.sectionContent}>
                        Nếu quý khách có bất kỳ câu hỏi nào về chính sách thanh toán hoặc cần hỗ trợ trong quá trình giao dịch, vui lòng liên hệ với chúng tôi qua:
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
                        Lưu ý: Quý khách hàng vui lòng kiểm tra kỹ thông tin đơn hàng và các chi tiết thanh toán trước khi hoàn tất giao dịch. Hãy giữ lại các chứng từ thanh toán (biên lai, ảnh chụp màn hình giao dịch thành công) để đảm bảo quyền lợi của mình trong quá trình sử dụng dịch vụ thiết kế và thi công biển hiệu, biển quảng cáo của <Text style={styles.codeText}>{companyName}</Text>.
                    </Paragraph>
                </Card>
            </Content>
        </Layout>
    );
};

export default PaymentPolicy;
