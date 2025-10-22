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
              <li><Link to="/policy/privacy" className="footer-link">Chính Sách Về Quyền Riêng Tư</Link></li>
              <li><Link to="/policy/useService" className="footer-link">Thỏa Thuận Sử Dụng Dịch Vụ</Link></li>
              <li><Link to="/policy/refund" className="footer-link">Chính Sách Hoàn Trả</Link></li>
              <li><Link to="/policy/standard" className="footer-link">Tiêu chuẩn dịch vụ</Link></li>
              <li><Link to="/policy/handOver" className="footer-link">Chính Sách Bàn Giao</Link></li>
              <li><Link to="/policy/payment" className="footer-link">Chính Sách Thanh Toán</Link></li>
            </ul>
          </Col>

          {/* Cột 2: Thông tin liên hệ */}
          <Col xs={24} sm={12} md={8}>
            <Title level={5} className="footer-title">THÔNG TIN LIÊN HỆ</Title>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
              <div>
                <Text strong className="contact-label"><AppstoreFilled /> CÔNG TY CỔ PHẦN QUẢNG CÁO VÀ TRUYỀN THÔNG NHÂN VIỆT
</Text>
              </div>
              {/* <div>
                <Text strong className="contact-label"><FileFilled /> Mã số thuế: 0111208677</Text>
              </div> */}
              <div>
                <Text strong className="contact-label"><PhoneFilled /> 0915935225</Text>
              </div>
              <div>
                <Text strong className="contact-label"><MailFilled /> quangcaonhanviet86@gmail.com </Text>
              </div>
              <div>
                <Text strong className="contact-label"><EnvironmentFilled /> Trụ sở chính:</Text>
                <Text className="contact-detail">Số N10-LK14, khu đất dịch vụ LK20a, LK20b, Phường Dương Nội, TP Hà Nội, Việt Nam
</Text>
              </div>
              <div>
                <Text strong className="contact-label"><EnvironmentFilled /> Xưởng sản xuất:</Text>
                <Text className="contact-detail">Số N10-LK14, khu đất dịch vụ LK20a, LK20b , Phường Dương Nội, Thành phố Hà Nội, Việt Nam
</Text>
              </div>
              
            </Space>
          </Col>

          {/* Cột 3: Bản đồ */}
          <Col xs={24} sm={24} md={8}>
            {/* Nhúng iframe từ Google Maps */}
            {/* Thay thế src bằng mã nhúng bản đồ của bạn */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2290.547913733201!2d105.7505441!3d20.9736845!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad2549a106e1%3A0x34b4798fb3752599!2zUXXhuqNuZyBDw6FvIE5ow6JuIFZp4buHdA!5e1!3m2!1svi!2s!4v1761105393605!5m2!1svi!2s" // Thay link này
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