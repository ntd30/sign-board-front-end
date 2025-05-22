import React, { useEffect } from 'react';
import { Typography, Divider, Layout, List, Space, Card } from 'antd';
import { FileDoneOutlined, UserOutlined, CheckCircleOutlined, ToolOutlined, CopyrightOutlined, WarningOutlined, EditOutlined, MessageOutlined, PhoneOutlined, MailOutlined, SolutionOutlined } from '@ant-design/icons'; // Các icon phù hợp

const { Title, Paragraph, Text, Link: AntLink } = Typography;
const { Content } = Layout;

// Định nghĩa styles bằng object - có thể tái sử dụng hoặc tùy chỉnh nhẹ từ trang Privacy
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
        antdResetCss.id = "antd-reset-css-terms"; // ID riêng cho trang này
        if (!document.getElementById(antdResetCss.id)) {
            antdResetCss.rel = "stylesheet";
            antdResetCss.href = "https://unpkg.com/antd/dist/reset.css";
            document.head.appendChild(antdResetCss);
        }
    }, []);

    const companyName = "idai.vn"; // Tên công ty/website

    const serviceScopeData = [
        `Tương tác trực tuyến qua các nền tảng xã hội như YouTube, Telegram, và TikTok.`,
        // Thêm các dịch vụ khác nếu có
    ];

    const userResponsibilitiesData = [
        `Sử dụng dịch vụ đúng mục đích và không thực hiện các hành vi vi phạm pháp luật.`,
        `Cung cấp thông tin cá nhân chính xác, bảo mật tài khoản cá nhân và bảo vệ dữ liệu cá nhân.`,
        `Không sao chép, phát tán hoặc chia sẻ tài liệu và mã nguồn từ website mà không có sự cho phép.`,
    ];

    const idaiResponsibilitiesData = [
        `Bảo vệ quyền riêng tư và thông tin cá nhân của người dùng.`,
        `Đảm bảo dịch vụ ổn định và sẵn sàng, nhưng không chịu trách nhiệm về các gián đoạn do các yếu tố ngoài tầm kiểm soát.`,
        `Có quyền điều chỉnh hoặc ngừng cung cấp dịch vụ mà không cần báo trước, đồng thời bảo lưu quyền hạn chế hoặc chấm dứt tài khoản của người dùng nếu vi phạm điều khoản.`,
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
                        Khi truy cập và sử dụng các dịch vụ tại <Text style={styles.codeText}>{companyName}</Text>, bạn đồng ý tuân thủ các điều khoản sử dụng dịch vụ này. Vui lòng đọc kỹ để hiểu rõ quyền lợi và trách nhiệm của bạn.
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
                        3. Trách nhiệm của Người dùng
                    </Title>
                    <Paragraph style={styles.sectionContent}>
                        Người dùng có trách nhiệm:
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
                        Toàn bộ nội dung, tài liệu và mã nguồn trên <Text style={styles.codeText}>{companyName}</Text> thuộc quyền sở hữu của <Text style={styles.codeText}>{companyName}</Text> và được bảo vệ bởi luật sở hữu trí tuệ. Người dùng không được phép sao chép hoặc sử dụng cho mục đích thương mại nếu không có sự đồng ý bằng văn bản.
                    </Paragraph>

                    <Title level={4} style={styles.sectionTitle}>
                        <WarningOutlined style={styles.sectionTitleIcon} />
                        6. Giới hạn Trách nhiệm
                    </Title>
                    <Paragraph style={styles.sectionContent}>
                        <Text style={styles.codeText}>{companyName}</Text> không chịu trách nhiệm về các thiệt hại trực tiếp hoặc gián tiếp phát sinh từ việc sử dụng dịch vụ. Người dùng tự chịu trách nhiệm về việc sử dụng thông tin và tài nguyên trên website.
                    </Paragraph>

                    <Title level={4} style={styles.sectionTitle}>
                        <EditOutlined style={styles.sectionTitleIcon} />
                        7. Thay đổi Điều khoản Sử dụng
                    </Title>
                    <Paragraph style={styles.sectionContent}>
                        <Text style={styles.codeText}>{companyName}</Text> có quyền thay đổi, cập nhật các điều khoản sử dụng mà không cần báo trước. Mọi thay đổi sẽ có hiệu lực ngay khi được công bố trên website. Người dùng nên kiểm tra điều khoản định kỳ để cập nhật các thay đổi.
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
                        Lưu ý: Việc tiếp tục sử dụng dịch vụ sau khi có các thay đổi đồng nghĩa với việc người dùng chấp nhận điều khoản cập nhật mới.
                    </Paragraph>
                </Card>
            </Content>
        </Layout>
    );
};

export default UseService;
