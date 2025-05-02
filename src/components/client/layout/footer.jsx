import { Layout, Row, Col, Typography, Space } from 'antd';
import { EnvironmentOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import '../../../styles/footer.css'; // Tạo file CSS riêng để dễ quản lý

const { Footer } = Layout;
const { Title, Text, Link } = Typography;

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
              <li><Link href="/chinh-sach-bao-hanh" className="footer-link">Chính sách bảo hành</Link></li>
              <li><Link href="/chinh-sach-van-chuyen" className="footer-link">Chính sách vận chuyển</Link></li>
              <li><Link href="/chinh-sach-bao-mat" className="footer-link">Chính sách bảo mật</Link></li>
              <li><Link href="/dieu-khoan-dieu-kien" className="footer-link">Điều khoản & điều kiện</Link></li>
            </ul>
          </Col>

          {/* Cột 2: Thông tin liên hệ */}
          <Col xs={24} sm={12} md={8}>
            <Title level={5} className="footer-title">THÔNG TIN LIÊN HỆ</Title>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
              <div>
                <Text strong className="contact-label"><EnvironmentOutlined /> Trụ sở chính:</Text>
                <Text className="contact-detail">Số nhà 10, dãy H, Khu tập thể Công an Đa Sỹ, Phường Kiến Hưng, Quận Hà Đông, Thành phố Hà Nội, Việt Nam</Text>
              </div>
              <div>
                <Text strong className="contact-label"><EnvironmentOutlined /> Văn phòng trưng bày và xem mẫu:</Text>
                <Text className="contact-detail">Nhà 2B, 110 Đường Nguyễn Hoàng Tôn, Xuân La, Tây Hồ, Hà Nội</Text>
              </div>
              <div>
                <Text strong className="contact-label"><EnvironmentOutlined /> Xưởng sản xuất:</Text>
                <Text className="contact-detail">Số 20, Ngõ 408, Xuân Đỉnh, Quận Từ Liêm, Thành phố Hà Nội, Việt Nam</Text> {/* Sửa lại địa chỉ nếu cần */}
              </div>
              <div>
                <Text strong className="contact-label"><PhoneOutlined /> Điện thoại:</Text>
                {/* Nên dùng thẻ Link cho số điện thoại */}
                <Link href="tel:0973454140" className="contact-detail footer-link">0973.454.140</Link>
              </div>
              <div>
                <Text strong className="contact-label"><MailOutlined /> Email:</Text>
                 {/* Nên dùng thẻ Link cho email */}
                <Link href="mailto:ak@datvn.vn" className="contact-detail footer-link">ak@datvn.vn</Link> {/* Sửa lại email nếu cần */}
              </div>
            </Space>
          </Col>

          {/* Cột 3: Bản đồ */}
          <Col xs={24} sm={24} md={8}>
            {/* Nhúng iframe từ Google Maps */}
            {/* Thay thế src bằng mã nhúng bản đồ của bạn */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.311661740765!2d105.77896477590993!3d20.97996358911461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135acc67838a83d%3A0x89925f611645a1a5!2zQuG6p3UgVMOqIEPDtG5nIE5naOG7hyBUZWNoIEJ5dGU!5e0!3m2!1svi!2s!4v1714040651782!5m2!1svi!2s" // Thay link này
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
      </div>

      {/* Phần Copyright (nền tối hơn) */}
      <div className="footer-copyright">
        <Text className="copyright-text">
          @ Copyright {currentYear} Biển hiệu. All Rights Reserved
        </Text>
      </div>
    </Footer>
  );
};

export default AppFooter;