import { Layout, Row, Col, Typography, Space } from 'antd';
import { EnvironmentOutlined, PhoneOutlined, MailOutlined, AppstoreFilled, EnvironmentFilled, PhoneFilled, MailFilled, FileFilled } from '@ant-design/icons';
import '../../../styles/footer.css'; // Tạo file CSS riêng để dễ quản lý
import { Link } from 'react-router-dom';

const { Footer } = Layout;
const { Title, Text } = Typography;

const AppFooter = () => {
  // Lấy năm hiện tại cho bản quyền
  const currentYear = new Date().getFullYear();

  return (
    <Footer className="app-footer">
      {/* Phần Nội dung chính của Footer (nền tối) */}
      <div className="footer-content">
        <Row gutter={[32, 32]}> {/* gutter={[ngang, doc]} */}

          {/* Cột 1: Chính sách & Điều khoản */}
          <Col xs={24} sm={12} md={8}>
            <Title level={5} className="footer-title">CHÍNH SÁCH & ĐIỀU KHOẢN</Title>
            <ul className="footer-links">
              <li><Link to="/policy/privacy" className="footer-link">Chính sách về quyền riêng tư</Link></li>
              <li><Link to="/policy/useService" className="footer-link">Thỏa Thuận Sử Dụng Dịch Vụ</Link></li>
              <li><Link to="/policy/refund" className="footer-link">Chính Sách Hoàn Trả</Link></li>
              <li><Link to="/policy/standard" className="footer-link">Tiêu chuẩn dịch vụ</Link></li>
            </ul>
          </Col>

          {/* Cột 2: Thông tin liên hệ */}
          <Col xs={24} sm={12} md={8}>
            <Title level={5} className="footer-title">THÔNG TIN LIÊN HỆ</Title>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
              <div>
                <Text strong className="contact-label"><AppstoreFilled /> CÔNG TY TNHH ĐẦU TƯ CÔNG NGHỆ TECHBYTE</Text>
              </div>
              <div>
                <Text strong className="contact-label"><FileFilled /> Mã số thuế: 0110801570</Text>
              </div>
              <div>
                <Text strong className="contact-label"><PhoneFilled /> 0973.454.140</Text>
              </div>
              <div>
                <Text strong className="contact-label"><MailFilled /> ai@idai.vn</Text>
              </div>
              <div>
                <Text strong className="contact-label"><EnvironmentFilled /> Trụ sở chính:</Text>
                <Text className="contact-detail">Nhà 10, dãy H, Khu tập thể Công an Đa Sỹ, Phường Kiến Hưng, Quận Hà Đông, Thành phố Hà Nội, Việt Nam</Text>
              </div>
              <div>
                <Text strong className="contact-label"><EnvironmentFilled /> Văn phòng giao dịch:</Text>
                <Text className="contact-detail">Nhà 2B, 110 Đường Nguyễn Hoàng Tôn, Xuân La, Tây Hồ, Hà Nội</Text>
              </div>
            </Space>
          </Col>

          {/* Cột 3: Bản đồ */}
          <Col xs={24} sm={24} md={8}>
            {/* Nhúng iframe từ Google Maps */}
            {/* Thay thế src bằng mã nhúng bản đồ của bạn */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.1981910875847!2d105.78366786885267!3d20.958258798493727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad2c52118147%3A0xe1131005d075626a!2zxJBhIFPhu7ksIEtp4bq_biBIxrBuZywgSMOgIMSQw7RuZywgSGFub2ksIFZpZXRuYW0!5e1!3m2!1sen!2s!4v1746923124633!5m2!1sen!2s" // Thay link này
              width="100%"
              height="350px" // Điều chỉnh chiều cao nếu cần
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bản đồ công ty"
            ></iframe>
          </Col>

        </Row>
      </div >

      {/* Phần Copyright (nền tối hơn) */}
      <div div className="footer-copyright" >
        <Text className="copyright-text">
          @ Copyright {currentYear} Biển hiệu. All Rights Reserved
        </Text>
      </div >
    </Footer >
  );
};

export default AppFooter;