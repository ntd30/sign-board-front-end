import React, { useEffect } from 'react';
import { Typography, Divider, Layout, List, Space, Card } from 'antd';
import { LockOutlined, UserOutlined, FileTextOutlined, MailOutlined, PhoneOutlined, EnvironmentOutlined, BulbOutlined, SafetyCertificateOutlined, SolutionOutlined, MessageOutlined } from '@ant-design/icons'; // Thay ShieldCheckOutlined bằng SafetyCertificateOutlined

const { Title, Paragraph, Text, Link: AntLink } = Typography;
const { Content } = Layout;

// Định nghĩa styles bằng object - đã được làm mới và thêm căn lề
const styles = {
    layout: {
        minHeight: '100vh',
        background: '#f8f9fa', // Một màu nền sáng và sạch sẽ hơn
    },
    content: {
        padding: '24px', // Giảm padding cho màn hình nhỏ
    },
    contentContainer: {
        maxWidth: '960px',
        margin: '24px auto',
    },
    mainTitle: {
        color: '#1A237E', // Màu xanh navy đậm, chuyên nghiệp
        textAlign: 'center',
        marginBottom: '24px',
        fontWeight: 700,
        fontSize: '28px', // Tăng kích thước tiêu đề chính
    },
    customDivider: {
        borderColor: '#007BFF', // Màu xanh dương nổi bật hơn cho divider
        borderWidth: '2px',
        margin: '32px 0',
    },
    sectionTitle: {
        color: '#0056b3', // Màu xanh đậm cho tiêu đề mục
        marginTop: '32px',
        marginBottom: '16px', // Tăng khoảng cách dưới
        display: 'flex',
        alignItems: 'center',
        fontSize: '22px', // Tăng font size
        fontWeight: 600, // Thêm độ đậm
    },
    sectionTitleIcon: {
        marginRight: '12px',
        color: '#007BFF', // Màu xanh cho icon
        fontSize: '24px', // Tăng kích thước icon
    },
    sectionContent: {
        color: '#343a40', // Màu xám đậm cho nội dung dễ đọc
        lineHeight: 1.9,
        marginBottom: '24px',
        fontSize: '16px',
        textAlign: 'justify', // Căn lề hai bên cho đoạn văn
    },
    contentList: {
        marginLeft: '0px',
        paddingLeft: '20px',
    },
    listItem: {
        padding: '10px 0',
        color: '#343a40',
        borderBottom: '1px dashed #dee2e6', // Đường kẻ mờ hơn
        fontSize: '16px',
        textAlign: 'justify', // Căn lề hai bên cho mục trong danh sách
    },
    listItemLast: {
        padding: '10px 0',
        color: '#343a40',
        borderBottom: 'none',
        fontSize: '16px',
        textAlign: 'justify',
    },
    codeText: { // Dùng để highlight tên công ty hoặc thông tin quan trọng
        background: '#e9ecef',
        padding: '3px 8px',
        borderRadius: '4px',
        color: '#0056b3',
        fontFamily: 'monospace',
        fontWeight: 600, // Làm nổi bật hơn
    },
    contactInfoItem: {
        display: 'flex',
        alignItems: 'flex-start', // Căn trên nếu địa chỉ dài
        marginBottom: '12px', // Tăng khoảng cách
    },
    contactIcon: {
        marginRight: '12px',
        color: '#007BFF',
        fontSize: '20px', // Tăng kích thước icon liên hệ
        marginTop: '3px', // Căn chỉnh icon với dòng text đầu tiên
    }
};

const Privacy = () => {
    useEffect(() => {
        const antdResetCss = document.createElement("link");
        antdResetCss.id = "antd-reset-css-privacy";
        if (!document.getElementById(antdResetCss.id)) {
            antdResetCss.rel = "stylesheet";
            antdResetCss.href = "https://unpkg.com/antd/dist/reset.css";
            document.head.appendChild(antdResetCss);
        }
    }, []);

    const companyName = "Quảng cáo Nhân Việt"; // Tên công ty mẫu

    const listPurposeData = [
        `Xử lý yêu cầu thiết kế, báo giá và thi công các dự án biển hiệu, biển quảng cáo.`,
        `Gửi thông tin cập nhật về tiến độ dự án, các mẫu thiết kế mới hoặc chương trình khuyến mãi liên quan đến dịch vụ của ${companyName}.`,
        `Nâng cao chất lượng dịch vụ thiết kế, sản xuất và lắp đặt biển hiệu.`,
        `Giải quyết các vấn đề hỗ trợ kỹ thuật hoặc bảo hành sản phẩm.`,
    ];

    const listAccessiblePartiesData = [
        `Nhân viên của ${companyName} trong phạm vi trách nhiệm công việc để thực hiện dự án.`,
        `Các đối tác sản xuất, vận chuyển hoặc lắp đặt đã ký kết hợp đồng bảo mật thông tin với ${companyName} .`,
        `Các cơ quan nhà nước có thẩm quyền khi có yêu cầu theo quy định của pháp luật.`,
    ];

    return (
        <Layout style={styles.layout}>
            <Content style={styles.content}>
                <Card bordered={false} style={styles.contentContainer} bodyStyle={{padding: '30px 40px'}}>
                    <Title level={2} style={styles.mainTitle}>
                        <SafetyCertificateOutlined style={{ marginRight: '12px' }} /> {/* Đã thay icon */}
                        CHÍNH SÁCH BẢO MẬT THÔNG TIN KHÁCH HÀNG
                    </Title>
                    <Divider style={styles.customDivider} />

                    <Title level={4} style={styles.sectionTitle}>
                        <UserOutlined style={styles.sectionTitleIcon} />
                        1. Cam Kết Bảo Mật
                    </Title>
                    <Paragraph style={styles.sectionContent}>
                        Tại <Text style={styles.codeText}>{companyName}</Text>, chúng tôi hiểu rằng quyền riêng tư của quý khách hàng và đối tác là vô cùng quan trọng. Chúng tôi cam kết bảo vệ tuyệt đối thông tin cá nhân và dữ liệu dự án mà quý vị cung cấp khi sử dụng dịch vụ thiết kế và thi công biển hiệu, biển quảng cáo của chúng tôi. Chính sách này giải thích rõ ràng cách chúng tôi thu thập, sử dụng, bảo vệ và (trong một số trường hợp nhất định) chia sẻ thông tin của bạn.
                    </Paragraph>

                    <Title level={4} style={styles.sectionTitle}>
                        <BulbOutlined style={styles.sectionTitleIcon} />
                        2. Mục Đích Thu Thập Thông Tin
                    </Title>
                    <Paragraph style={styles.sectionContent}>
                        Chúng tôi thu thập thông tin cá nhân của bạn nhằm các mục đích sau:
                    </Paragraph>
                    <List
                        style={styles.contentList}
                        dataSource={listPurposeData}
                        renderItem={(item, index) => (
                            <List.Item style={index === listPurposeData.length - 1 ? styles.listItemLast : styles.listItem}>
                                <Text>{item}</Text>
                            </List.Item>
                        )}
                    />

                    <Title level={4} style={styles.sectionTitle}>
                        <LockOutlined style={styles.sectionTitleIcon} />
                        3. Phạm Vi Sử Dụng Thông Tin
                    </Title>
                    <Paragraph style={styles.sectionContent}>
                        Thông tin cá nhân và chi tiết dự án của bạn sẽ được <Text style={styles.codeText}>{companyName}</Text> sử dụng nội bộ để phục vụ các mục đích đã nêu. Chúng tôi cam kết không bán, trao đổi hoặc tiết lộ thông tin của bạn cho bất kỳ bên thứ ba nào vì mục đích thương mại mà không có sự đồng ý rõ ràng từ bạn, ngoại trừ các trường hợp được yêu cầu bởi cơ quan pháp luật hoặc cần thiết để thực hiện các dịch vụ bạn đã yêu cầu (ví dụ: cung cấp thông tin cho đơn vị vận chuyển, lắp đặt).
                    </Paragraph>

                    <Title level={4} style={styles.sectionTitle}>
                        <FileTextOutlined style={styles.sectionTitleIcon} />
                        4. Thời Gian Lưu Trữ Thông Tin
                    </Title>
                    <Paragraph style={styles.sectionContent}>
                        Thông tin của bạn sẽ được lưu trữ trong suốt quá trình thực hiện dự án và một khoảng thời gian hợp lý sau đó để phục vụ cho các mục đích bảo hành, hỗ trợ kỹ thuật hoặc theo yêu cầu của pháp luật về lưu trữ hồ sơ. Bạn có quyền yêu cầu chúng tôi cập nhật hoặc xóa thông tin cá nhân của mình theo quy định.
                    </Paragraph>

                    <Title level={4} style={styles.sectionTitle}>
                        <SolutionOutlined style={styles.sectionTitleIcon} />
                        5. Các Bên Có Thể Tiếp Cận Thông Tin
                    </Title>
                     <Paragraph style={styles.sectionContent}>
                        Trong một số trường hợp cần thiết, các bên sau đây có thể tiếp cận thông tin của bạn:
                    </Paragraph>
                    <List
                        style={styles.contentList}
                        dataSource={listAccessiblePartiesData}
                        renderItem={(item, index) => (
                            <List.Item style={index === listAccessiblePartiesData.length - 1 ? styles.listItemLast : styles.listItem}>
                                 <Text>{item}</Text>
                            </List.Item>
                        )}
                    />

                    <Title level={4} style={styles.sectionTitle}>
                        <UserOutlined style={styles.sectionTitleIcon} />
                        6. Quyền Của Quý Khách Hàng
                    </Title>
                    <Paragraph style={styles.sectionContent}>
                        Quý khách hàng có các quyền sau đối với thông tin cá nhân của mình:
                        <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
                            <li>Yêu cầu truy cập và xem lại thông tin cá nhân mà chúng tôi đang lưu trữ.</li>
                            <li>Yêu cầu chỉnh sửa, cập nhật thông tin cá nhân nếu có sai sót.</li>
                            <li>Yêu cầu xóa thông tin cá nhân khỏi hệ thống của chúng tôi (trong trường hợp không còn ràng buộc pháp lý hoặc hợp đồng).</li>
                            <li>Rút lại sự đồng ý cho việc thu thập và xử lý thông tin bất cứ lúc nào (việc này có thể ảnh hưởng đến khả năng cung cấp dịch vụ của chúng tôi).</li>
                        </ul>
                    </Paragraph>

                    <Title level={4} style={styles.sectionTitle}>
                        <MessageOutlined style={styles.sectionTitleIcon} />
                        7. Thông Tin Liên Hệ và Giải Quyết Khiếu Nại
                    </Title>
                    <Paragraph style={styles.sectionContent}>
                        Mọi thắc mắc, yêu cầu hoặc khiếu nại liên quan đến chính sách bảo mật và việc xử lý thông tin cá nhân, xin vui lòng liên hệ với <Text style={styles.codeText}>{companyName}</Text> qua:
                        <Space direction="vertical" size="middle" style={{ marginTop: '15px', display: 'block', width: '100%' }}>
                            <div style={styles.contactInfoItem}>
                                <PhoneOutlined style={styles.contactIcon} />
                                <Text>Hotline Hỗ Trợ: <Text strong>0879485678</Text></Text>
                            </div>
                            {/* <div style={styles.contactInfoItem}>
                                <MailOutlined style={styles.contactIcon} />
                                <Text>Email: <Text strong><AntLink href="mailto: ai@idai.vn"> ai@idai.vn</AntLink></Text> </Text>
                            </div> */}
                            <div style={styles.contactInfoItem}>
                                <EnvironmentOutlined style={styles.contactIcon} />
                                <Text>Địa chỉ văn phòng: Số N10-LK14, khu đất dịch vụ LK20a, LK20b, Phường Dương Nội, Thành phố Hà Nội, Việt Nam</Text>
                            </div>
                        </Space>
                    </Paragraph>
                    <Paragraph style={styles.sectionContent}>
                        Chúng tôi cam kết sẽ xem xét và phản hồi mọi yêu cầu, khiếu nại một cách nhanh chóng và minh bạch, nhằm đảm bảo quyền lợi và sự tin tưởng của quý khách hàng.
                    </Paragraph>
                     <Divider style={styles.customDivider} />
                </Card>
            </Content>
        </Layout>
    );
};

export default Privacy;
