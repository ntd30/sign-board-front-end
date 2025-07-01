import React, { useEffect } from 'react';
import { Typography, Divider, Layout, List, Space, Card } from 'antd';
import { FileDoneOutlined, UserOutlined, CheckCircleOutlined, ToolOutlined, CopyrightOutlined, WarningOutlined, EditOutlined, MessageOutlined, PhoneOutlined, MailOutlined, SolutionOutlined } from '@ant-design/icons';

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
    }
};

const UseService = () => {
    useEffect(() => {
        const antdResetCss = document.createElement("link");
        antdResetCss.id = "antd-reset-css-terms";
        if (!document.getElementById(antdResetCss.id)) {
            antdResetCss.rel = "stylesheet";
            antdResetCss.href = "https://unpkg.com/antd/dist/reset.css";
            document.head.appendChild(antdResetCss);
        }
    }, []);

    const companyName = "ai2.vn";

    const serviceScopeData = [
        `Thiết kế và sản xuất các loại biển quảng cáo, bao gồm biển LED, biển chữ nổi, biển hộp đèn và biển in bạt.`,
        `Tư vấn, lắp đặt và bảo trì biển quảng cáo tại địa điểm của khách hàng.`,
        `Cung cấp dịch vụ thiết kế đồ họa chuyên nghiệp cho các chiến dịch quảng cáo.`,
    ];

    const userResponsibilitiesData = [
        `Cung cấp thông tin chính xác về yêu cầu thiết kế, kích thước và vị trí lắp đặt biển quảng cáo.`,
        `Thanh toán đầy đủ và đúng hạn theo thỏa thuận trong hợp đồng dịch vụ.`,
        `Không tự ý tháo dỡ, sửa chữa hoặc thay đổi biển quảng cáo mà không có sự đồng ý của ai2.vn.`,
    ];

    const idaiResponsibilitiesData = [
        `Đảm bảo chất lượng sản phẩm và dịch vụ theo đúng cam kết trong hợp đồng.`,
        `Cung cấp dịch vụ tư vấn và hỗ trợ kỹ thuật trong suốt quá trình thiết kế, sản xuất và lắp đặt.`,
        `Bảo hành sản phẩm theo thời gian quy định trong hợp đồng, trừ các trường hợp hư hỏng do yếu tố khách quan hoặc sử dụng sai mục đích.`,
    ];

    return (
        <Layout style={styles.layout}>
            <Content style={styles.content}>
                <Card bordered={false} style={styles.contentContainer} bodyStyle={{ padding: '30px 40px' }}>
                    <Title level={2} style={styles.mainTitle}>
                        <FileDoneOutlined style={{ marginRight: '12px' }} />
                        THỎA THUẬN SỬ DỤNG DỊCH VỤ
                    </Title>
                    <Divider style={styles.customDivider} />

                    <Title level={4} style={styles.sectionTitle}>
                        <CheckCircleOutlined style={styles.sectionTitleIcon} />
                        1. Chấp nhận Điều khoản Sử dụng
                    </Title>
                    <Paragraph style={styles.sectionContent}>
                        Khi sử dụng dịch vụ thiết kế, sản xuất và lắp đặt biển quảng cáo tại <Text style={styles.codeText}>{companyName}</Text>, bạn đồng ý tuân thủ các điều khoản sử dụng dịch vụ này. Vui lòng đọc kỹ để hiểu rõ quyền lợi và trách nhiệm của bạn.
                    </Paragraph>

                    <Title level={4} style={styles.sectionTitle}>
                        <ToolOutlined style={styles.sectionTitleIcon} />
                        2. Phạm vi Dịch vụ
                    </Title>
                    <Paragraph style={styles.sectionContent}>
                        <Text style={styles.codeText}>{companyName}</Text> cung cấp các dịch vụ bao gồm:
                    </Paragraph>
                    <List
                        style={styles.contentList}
                        dataSource={serviceScopeData}
                        renderItem={(item, index) => (
                            <List.Item style={index === serviceScopeData.length - 1 ? styles.listItemLast : styles.listItem}>
                                <Text>{item}</Text>
                            </List.Item>
                        )}
                    />

                    <Title level={4} style={styles.sectionTitle}>
                        <UserOutlined style={styles.sectionTitleIcon} />
                        3. Trách nhiệm của Khách hàng
                    </Title>
                    <Paragraph style={styles.sectionContent}>
                        Khách hàng có trách nhiệm:
                    </Paragraph>
                    <List
                        style={styles.contentList}
                        dataSource={userResponsibilitiesData}
                        renderItem={(item, index) => (
                            <List.Item style={index === userResponsibilitiesData.length - 1 ? styles.listItemLast : styles.listItem}>
                                <Text>{item}</Text>
                            </List.Item>
                        )}
                    />

                    <Title level={4} style={styles.sectionTitle}>
                        <SolutionOutlined style={styles.sectionTitleIcon} />
                        4. Quyền và Trách nhiệm của <Text style={styles.codeText}>{companyName}</Text>
                    </Title>
                    <Paragraph style={styles.sectionContent}>
                        <Text style={styles.codeText}>{companyName}</Text> cam kết:
                    </Paragraph>
                    <List
                        style={styles.contentList}
                        dataSource={idaiResponsibilitiesData}
                        renderItem={(item, index) => (
                            <List.Item style={index === idaiResponsibilitiesData.length - 1 ? styles.listItemLast : styles.listItem}>
                                <Text>{item}</Text>
                            </List.Item>
                        )}
                    />

                    <Title level={4} style={styles.sectionTitle}>
                        <CopyrightOutlined style={styles.sectionTitleIcon} />
                        5. Quyền Sở hữu Trí tuệ
                    </Title>
                    <Paragraph style={styles.sectionContent}>
                        Toàn bộ thiết kế, mẫu mã và nội dung trên <Text style={styles.codeText}>{companyName}</Text> thuộc quyền sở hữu của <Text style={styles.codeText}>{companyName}</Text> và được bảo vệ bởi luật sở hữu trí tuệ. Khách hàng không được phép sao chép hoặc sử dụng thiết kế cho mục đích thương mại nếu không có sự đồng ý bằng văn bản.
                    </Paragraph>

                    <Title level={4} style={styles.sectionTitle}>
                        <WarningOutlined style={styles.sectionTitleIcon} />
                        6. Giới hạn Trách nhiệm
                    </Title>
                    <Paragraph style={styles.sectionContent}>
                        <Text style={styles.codeText}>{companyName}</Text> không chịu trách nhiệm về các thiệt hại phát sinh từ việc sử dụng sai mục đích hoặc do các yếu tố ngoài tầm kiểm soát như thiên tai, hỏa hoạn. Khách hàng tự chịu trách nhiệm về việc cung cấp thông tin chính xác và sử dụng sản phẩm đúng cách.
                    </Paragraph>

                    <Title level={4} style={styles.sectionTitle}>
                        <EditOutlined style={styles.sectionTitleIcon} />
                        7. Thay đổi Điều khoản Sử dụng
                    </Title>
                    <Paragraph style={styles.sectionContent}>
                        <Text style={styles.codeText}>{companyName}</Text> có quyền thay đổi, cập nhật các điều khoản sử dụng mà không cần báo trước. Mọi thay đổi sẽ có hiệu lực ngay khi được công bố trên website. Khách hàng nên kiểm tra điều khoản định kỳ để cập nhật các thay đổi.
                    </Paragraph>

                    <Title level={4} style={styles.sectionTitle}>
                        <MessageOutlined style={styles.sectionTitleIcon} />
                        8. Liên hệ và Hỗ trợ
                    </Title>
                    <Paragraph style={styles.sectionContent}>
                        Nếu có bất kỳ câu hỏi nào về thỏa thuận sử dụng dịch vụ, vui lòng liên hệ qua:
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
                    <Paragraph style={{ textAlign: 'center', color: '#546e7a', fontSize: '14px' }}>
                        Lưu ý: Việc tiếp tục sử dụng dịch vụ sau khi có các thay đổi đồng nghĩa với việc khách hàng chấp nhận điều khoản cập nhật mới.
                    </Paragraph>
                </Card>
            </Content>
        </Layout>
    );
};

export default UseService;