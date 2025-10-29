import React, { useEffect } from 'react';
import { Typography, Divider, Layout, Space, Card } from 'antd';
import { SafetyCertificateOutlined, CheckCircleOutlined, ProfileOutlined, ToolOutlined, MessageOutlined, PhoneOutlined } from '@ant-design/icons';

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

const WarrantyPolicy = () => {
    useEffect(() => {
        const antdResetCss = document.createElement("link");
        antdResetCss.id = "antd-reset-css-warranty";
        if (!document.getElementById(antdResetCss.id)) {
            antdResetCss.rel = "stylesheet";
            antdResetCss.href = "https://unpkg.com/antd/dist/reset.css";
            document.head.appendChild(antdResetCss);
        }
    }, []);

    const companyName = "Quảng cáo Nhân Việt";

    return (
        <Layout style={styles.layout}>
            <Content style={styles.content}>
                <Card bordered={false} style={styles.contentContainer} bodyStyle={{ padding: '30px 40px' }}>
                    <Title level={2} style={styles.mainTitle}>
                        <SafetyCertificateOutlined style={{ marginRight: '12px' }} />
                        CHÍNH SÁCH BẢO HÀNH
                    </Title>
                    <Divider style={styles.customDivider} />

                    <Title level={4} style={styles.sectionTitle}>
                        <CheckCircleOutlined style={styles.sectionTitleIcon} />
                        1. Thời gian bảo hành
                    </Title>
                    <Paragraph style={styles.sectionContent}>
                        <Text style={styles.codeText}>{companyName}</Text> cam kết bảo hành sản phẩm và công trình trong thời gian từ <strong>06 - 12 tháng</strong> tùy theo loại sản phẩm hoặc dịch vụ đã cung cấp, được ghi rõ trong hợp đồng hoặc phiếu bảo hành kèm theo.
                    </Paragraph>

                    <Title level={4} style={styles.sectionTitle}>
                        <ProfileOutlined style={styles.sectionTitleIcon} />
                        2. Phạm vi bảo hành
                    </Title>
                    <Paragraph style={styles.sectionContent}>
                        Chính sách bảo hành áp dụng cho các trường hợp:
                        <br />- Sản phẩm bị lỗi kỹ thuật do nhà sản xuất hoặc trong quá trình thi công của <Text style={styles.codeText}>{companyName}</Text>. 
                        <br />- Các linh kiện, phụ kiện còn trong thời hạn bảo hành và có tem, nhãn mác đầy đủ.
                    </Paragraph>
                    <Paragraph style={styles.sectionContent}>
                        Chính sách không áp dụng cho các trường hợp:
                        <br />- Sản phẩm bị hư hỏng do tác động từ bên ngoài như thiên tai, hỏa hoạn, va đập hoặc do người dùng tự ý sửa chữa, di dời, tháo lắp.
                        <br />- Sản phẩm hết hạn bảo hành hoặc bị mất phiếu bảo hành.
                    </Paragraph>

                    <Title level={4} style={styles.sectionTitle}>
                        <ToolOutlined style={styles.sectionTitleIcon} />
                        3. Quy trình bảo hành
                    </Title>
                    <Paragraph style={styles.sectionContent}>
                        - Khách hàng liên hệ với <Text style={styles.codeText}>{companyName}</Text> để thông báo tình trạng sản phẩm.  
                        - Bộ phận kỹ thuật của chúng tôi sẽ tiếp nhận và xác minh lỗi.  
                        - Sau khi kiểm tra, chúng tôi sẽ tiến hành sửa chữa, thay thế hoặc đổi mới sản phẩm (nếu cần) trong vòng <strong>5 - 10 ngày làm việc</strong>.  
                        - Tất cả chi phí vận chuyển, thay thế trong phạm vi bảo hành sẽ do <Text style={styles.codeText}>{companyName}</Text> chịu.
                    </Paragraph>

                    <Title level={4} style={styles.sectionTitle}>
                        <MessageOutlined style={styles.sectionTitleIcon} />
                        4. Liên hệ bảo hành và hỗ trợ
                    </Title>
                    <Paragraph style={styles.sectionContent}>
                        Mọi yêu cầu bảo hành hoặc hỗ trợ kỹ thuật vui lòng liên hệ:
                        <Space direction="vertical" size="small" style={{ marginTop: '15px', display: 'block', width: '100%' }}>
                            <div style={styles.contactInfoItem}>
                                <PhoneOutlined style={styles.contactIcon} />
                                <Text>Hotline: <Text strong>0973.454.140</Text></Text>
                            </div>
                        </Space>
                    </Paragraph>

                    <Divider style={styles.customDivider} />
                    <Paragraph style={styles.noteText}>
                        Lưu ý: Chính sách bảo hành được áp dụng thống nhất cho toàn bộ sản phẩm và dịch vụ của <Text style={styles.codeText}>{companyName}</Text>, 
                        trừ khi có thỏa thuận riêng ghi trong hợp đồng.
                    </Paragraph>
                </Card>
            </Content>
        </Layout>
    );
};

export default WarrantyPolicy;
