import React from 'react';
import { Row, Col, Typography, Card, List, Avatar, Divider } from 'antd';
import {
    EyeOutlined,
    RocketOutlined,
    HeartOutlined,
    CheckCircleOutlined,
    PhoneOutlined,
    GlobalOutlined,
    MailOutlined,
    EnvironmentOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const AboutPage = () => {
    return (
        <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            {/* Hero Section */}
            <div style={{
                background: 'linear-gradient(135deg, #004D40, #00796B, #26A69A)',
                padding: '80px 20px',
                textAlign: 'center',
                color: 'white'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <Title level={1} style={{
                        fontSize: '3.5rem',
                        fontWeight: '700',
                        marginBottom: '20px',
                        color: '#ffffff',
                        fontFamily: 'Montserrat, sans-serif'
                    }}>
                        Về Chúng Tôi
                    </Title>
                    <Text style={{
                        fontSize: '1.3rem',
                        opacity: 0.9,
                        display: 'block',
                        marginBottom: '30px'
                    }}>
                        Quảng Cáo Nhân Việt - Đồng hành cùng thương hiệu của bạn
                    </Text>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
                {/* Company Introduction */}
                <Card style={{ marginBottom: '40px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                    <Row gutter={[40, 40]}>
                        <Col xs={24} md={12}>
                            <img
                                src="https://placehold.co/600x400/004D40/ffffff?text=Quảng+Cáo+Nhân+Việt"
                                alt="Quảng Cáo Nhân Việt"
                                style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '8px' }}
                            />
                        </Col>
                        <Col xs={24} md={12}>
                            <Title level={2} style={{ color: '#004D40', marginBottom: '20px' }}>
                                Quảng Cáo Nhân Việt
                            </Title>
                            <Paragraph style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
                                <Text strong>Quảng Cáo Nhân Việt</Text> là đơn vị chuyên <Text strong>làm biển hiệu quảng cáo</Text> chuyên nghiệp,
                                cung cấp các giải pháp thiết kế, sản xuất và thi công biển bảng, hộp đèn, chữ nổi, in UV,…
                                dành cho doanh nghiệp, cửa hàng và tổ chức trên toàn quốc.
                            </Paragraph>
                            <Paragraph style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
                                Mặc dù là <Text strong>công ty mới thành lập</Text>, nhưng đội ngũ nhân sự của chúng tôi đều có
                                <Text strong>hơn 10 năm kinh nghiệm</Text> trong nghề quảng cáo – từng trực tiếp thực hiện hàng trăm dự án lớn nhỏ cho các thương hiệu trong nước.
                            </Paragraph>
                            <Paragraph style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
                                Với tinh thần <Text strong>Sáng tạo – Uy tín – Chất lượng</Text>, chúng tôi cam kết mang đến cho khách hàng
                                sản phẩm <Text strong>Thẩm mỹ – Bền Vững – Hiệu quả quảng bá cao</Text>.
                            </Paragraph>
                        </Col>
                    </Row>
                </Card>

                {/* Vision, Mission, Values */}
                <Card style={{ marginBottom: '40px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                    <Title level={2} style={{ color: '#004D40', textAlign: 'center', marginBottom: '40px' }}>
                        Tầm Nhìn – Sứ Mệnh – Giá Trị Cốt Lõi
                    </Title>

                    <Row gutter={[40, 40]}>
                        <Col xs={24} md={8}>
                            <Card style={{ textAlign: 'center', height: '100%', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                                <EyeOutlined style={{ fontSize: '3rem', color: '#004D40', marginBottom: '20px' }} />
                                <Title level={3} style={{ color: '#004D40' }}>Tầm nhìn</Title>
                                <Paragraph style={{ fontSize: '1rem', lineHeight: '1.6', color: '#555' }}>
                                    Trở thành <Text strong>Đơn vị hàng đầu</Text> trong lĩnh vực làm biển hiệu quảng cáo tại Việt Nam,
                                    tiên phong ứng dụng công nghệ mới (AI, Số hóa quy trình….), mang đến các sản phẩm chất lượng cao, thẩm mỹ và bền vững.
                                </Paragraph>
                            </Card>
                        </Col>
                        <Col xs={24} md={8}>
                            <Card style={{ textAlign: 'center', height: '100%', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                                <RocketOutlined style={{ fontSize: '3rem', color: '#004D40', marginBottom: '20px' }} />
                                <Title level={3} style={{ color: '#004D40' }}>Sứ mệnh</Title>
                                <Paragraph style={{ fontSize: '1rem', lineHeight: '1.6', color: '#555' }}>
                                    Giúp doanh nghiệp xây dựng hình ảnh thương hiệu chuyên nghiệp qua từng sản phẩm biển hiệu.
                                    Mang đến giải pháp quảng cáo sáng tạo – hiệu quả – tiết kiệm cho khách hàng.
                                    Góp phần nâng cao diện mạo đô thị bằng những công trình đẹp – an toàn – thân thiện.
                                </Paragraph>
                            </Card>
                        </Col>
                        <Col xs={24} md={8}>
                            <Card style={{ textAlign: 'center', height: '100%', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                                <HeartOutlined style={{ fontSize: '3rem', color: '#004D40', marginBottom: '20px' }} />
                                <Title level={3} style={{ color: '#004D40' }}>Giá trị cốt lõi</Title>
                                <Paragraph style={{ fontSize: '1rem', lineHeight: '1.6', color: '#555' }}>
                                    <Text strong>Uy tín:</Text> Luôn đặt lợi ích và sự hài lòng của khách hàng lên hàng đầu.<br/>
                                    <Text strong>Chất lượng:</Text> Tỉ mỉ trong từng chi tiết, lựa chọn vật liệu tốt nhất.<br/>
                                    <Text strong>Sáng tạo:</Text> Không ngừng đổi mới để mang đến thiết kế ấn tượng và độc đáo.<br/>
                                    <Text strong>Tận tâm:</Text> Hỗ trợ khách hàng từ khâu tư vấn đến bảo hành hậu mãi.
                                </Paragraph>
                            </Card>
                        </Col>
                    </Row>
                </Card>

                {/* Services */}
                <Card style={{ marginBottom: '40px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                    <Title level={2} style={{ color: '#004D40', textAlign: 'center', marginBottom: '40px' }}>
                        Lĩnh Vực Hoạt Động
                    </Title>

                    <Paragraph style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', textAlign: 'center', marginBottom: '40px' }}>
                        Chúng tôi chuyên cung cấp dịch vụ <Text strong>làm biển hiệu quảng cáo</Text> trọn gói, bao gồm:
                    </Paragraph>

                    <Row gutter={[32, 32]}>
                        <Col xs={24} md={12}>
                            <Card title="1. Bảng hiệu chữ nổi" style={{ borderRadius: '8px', border: '1px solid #004D40' }}>
                                <List
                                    size="small"
                                    dataSource={[
                                        'Bảng hiệu inox',
                                        'Bảng hiệu mica',
                                        'Bảng hiệu alu',
                                        'Bảng hiệu nhôm',
                                        'Bảng hiệu chữ nổi tôn (tole)'
                                    ]}
                                    renderItem={item => (
                                        <List.Item>
                                            <CheckCircleOutlined style={{ color: '#004D40', marginRight: '10px' }} />
                                            {item}
                                        </List.Item>
                                    )}
                                />
                                <Paragraph style={{ marginTop: '15px', fontStyle: 'italic', color: '#666' }}>
                                    Bảng hiệu chữ nổi giúp thương hiệu trở nên sang trọng, nổi bật cả ngày lẫn đêm, phù hợp với mọi loại hình kinh doanh.
                                </Paragraph>
                            </Card>
                        </Col>

                        <Col xs={24} md={12}>
                            <Card title="2. Bảng hiệu in UV" style={{ borderRadius: '8px', border: '1px solid #004D40' }}>
                                <List
                                    size="small"
                                    dataSource={[
                                        'Bảng hiệu inox in UV',
                                        'Bảng hiệu mica in UV',
                                        'Bảng hiệu nhôm in UV',
                                        'Bảng hiệu alu in UV',
                                        'Bảng hiệu hiflex in UV'
                                    ]}
                                    renderItem={item => (
                                        <List.Item>
                                            <CheckCircleOutlined style={{ color: '#004D40', marginRight: '10px' }} />
                                            {item}
                                        </List.Item>
                                    )}
                                />
                                <Paragraph style={{ marginTop: '15px', fontStyle: 'italic', color: '#666' }}>
                                    Công nghệ in UV hiện đại cho hình ảnh sắc nét, chống trầy xước, bền màu theo thời gian và phù hợp cho cả trong nhà lẫn ngoài trời.
                                </Paragraph>
                            </Card>
                        </Col>

                        <Col xs={24} md={12}>
                            <Card title="3. Bảng hiệu đèn LED" style={{ borderRadius: '8px', border: '1px solid #004D40' }}>
                                <List
                                    size="small"
                                    dataSource={[
                                        'Bảng hiệu đèn LED siêu sáng',
                                        'Bảng hiệu đèn LED ma trận',
                                        'Bảng hiệu đèn LED module gắn chữ nổi',
                                        'Bảng hiệu đèn LED đơn màu',
                                        'Bảng hiệu đèn LED đa màu'
                                    ]}
                                    renderItem={item => (
                                        <List.Item>
                                            <CheckCircleOutlined style={{ color: '#004D40', marginRight: '10px' }} />
                                            {item}
                                        </List.Item>
                                    )}
                                />
                                <Paragraph style={{ marginTop: '15px', fontStyle: 'italic', color: '#666' }}>
                                    Các loại bảng hiệu đèn LED giúp thu hút ánh nhìn, tiết kiệm điện năng và tạo điểm nhấn mạnh mẽ cho thương hiệu, đặc biệt vào ban đêm.
                                </Paragraph>
                            </Card>
                        </Col>

                        <Col xs={24} md={12}>
                            <Card title="4. Bảng hiệu hộp đèn" style={{ borderRadius: '8px', border: '1px solid #004D40' }}>
                                <List
                                    size="small"
                                    dataSource={[
                                        'Hộp đèn mica hút nổi',
                                        'Hộp đèn mica thổi cầu',
                                        'Hộp đèn chữ nổi',
                                        'Hộp đèn quảng cáo LED',
                                        'Hộp đèn mica in UV'
                                    ]}
                                    renderItem={item => (
                                        <List.Item>
                                            <CheckCircleOutlined style={{ color: '#004D40', marginRight: '10px' }} />
                                            {item}
                                        </List.Item>
                                    )}
                                />
                                <Paragraph style={{ marginTop: '15px', fontStyle: 'italic', color: '#666' }}>
                                    Hộp đèn là lựa chọn phổ biến và hiệu quả trong việc nhận diện thương hiệu, dễ thi công, độ bền cao và linh hoạt về kích thước.
                                </Paragraph>
                            </Card>
                        </Col>
                    </Row>
                </Card>

                {/* Commitments */}
                <Card style={{ marginBottom: '40px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                    <Title level={2} style={{ color: '#004D40', textAlign: 'center', marginBottom: '30px' }}>
                        Cam Kết Chất Lượng
                    </Title>
                    <Row gutter={[32, 32]}>
                        {[
                            'Thiết kế sáng tạo, đúng nhận diện thương hiệu.',
                            'Thi công nhanh chóng, đúng tiến độ.',
                            'Chất liệu bền đẹp, chịu được thời tiết khắc nghiệt.',
                            'Bảo hành dài hạn, hỗ trợ kỹ thuật tận nơi.'
                        ].map((commitment, index) => (
                            <Col xs={24} sm={12} key={index}>
                                <Card style={{ textAlign: 'center', height: '100%', border: 'none', backgroundColor: '#f0f8ff', borderRadius: '8px' }}>
                                    <CheckCircleOutlined style={{ fontSize: '2rem', color: '#004D40', marginBottom: '15px' }} />
                                    <Text style={{ fontSize: '1.1rem', color: '#333' }}>{commitment}</Text>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Card>

                {/* Contact Info */}
                <Card style={{ borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                    <Title level={2} style={{ color: '#004D40', textAlign: 'center', marginBottom: '40px' }}>
                        Liên Hệ Với Chúng Tôi
                    </Title>

                    <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                        <Paragraph style={{ fontSize: '1.2rem', color: '#555', marginBottom: '20px' }}>
                            Hãy để <Text strong>Quảng cáo Nhân Việt</Text> đồng hành cùng bạn trong việc xây dựng hình ảnh chuyên nghiệp, ấn tượng và khác biệt!
                        </Paragraph>
                    </div>

                    <Row gutter={[32, 32]}>
                        <Col xs={24} sm={8}>
                            <Card style={{ textAlign: 'center', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                                <PhoneOutlined style={{ fontSize: '2rem', color: '#004D40', marginBottom: '15px' }} />
                                <Title level={4} style={{ color: '#004D40' }}>Hotline / Zalo</Title>
                                <Text style={{ fontSize: '1.1rem', color: '#666' }}>0915 93 5225</Text>
                            </Card>
                        </Col>
                        <Col xs={24} sm={8}>
                            <Card style={{ textAlign: 'center', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                                <GlobalOutlined style={{ fontSize: '2rem', color: '#004D40', marginBottom: '15px' }} />
                                <Title level={4} style={{ color: '#004D40' }}>Website</Title>
                                <Text style={{ fontSize: '1.1rem', color: '#666' }}>https://nhanvietadv.com</Text>
                            </Card>
                        </Col>
                        <Col xs={24} sm={8}>
                            <Card style={{ textAlign: 'center', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                                <MailOutlined style={{ fontSize: '2rem', color: '#004D40', marginBottom: '15px' }} />
                                <Title level={4} style={{ color: '#004D40' }}>Email</Title>
                                <Text style={{ fontSize: '1.1rem', color: '#666' }}>quangcaonhanviet86@gmail.com</Text>
                            </Card>
                        </Col>
                    </Row>

                    <Divider />

                    <div style={{ textAlign: 'center' }}>
                        <EnvironmentOutlined style={{ fontSize: '1.5rem', color: '#004D40', marginRight: '10px' }} />
                        <Text style={{ fontSize: '1.1rem', color: '#666' }}>
                            <Text strong>Xưởng sản xuất:</Text> L10-LK14, khu đất dịch vụ LK20 AB, Phường Dương Nội, Thành phố Hà Nội
                        </Text>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AboutPage;
