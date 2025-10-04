import React from 'react';
import { PhoneOutlined } from '@ant-design/icons';
import '../styles/FloatingContact.css';
import zaloIcon from '../../public/img/contact/zalo.png'; // Đảm bảo ảnh đúng đường dẫn

const FloatingContact = () => {
  const hotline = '0879485678';

  return (
    <div className="floating-contact">
      {/* Nút Zalo */}
      <a
        href="https://zalo.me/0879485678"
        target="_blank"
        rel="noopener noreferrer"
        className="circle-btn zalo-btn"
      >
        <img src={zaloIcon} alt="Zalo" className="icon-img" />
      </a>

      {/* Nút gọi điện */}
      <a href={`tel:${hotline}`} className="circle-btn phone-btn">
        <PhoneOutlined />
      </a>
    </div>
  );
};

export default FloatingContact;
