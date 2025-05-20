// src/components/FloatingContact.js
import React, { useState } from 'react';
import { Button } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';
import ProductContact from './client/product/product.contact'; // Import component ProductContact
import '../styles/FloatingContact.css'; // CSS riêng cho component này

const FloatingContact = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const hotline = 'Hotline: 0363.119.968';

  return (
    <>
      <div className="floating-contact">
        <a
          href="https://zalo.me/0363119968"
          target="_blank"
          rel="noopener noreferrer"
          className="zalo-btn"
        >
          <span role="img" aria-label="Zalo">📱</span> Zalo
        </a>
        <Button className="phone-btn" onClick={() => setIsContactOpen(true)}>
          <PhoneOutlined /> {hotline}
        </Button>
      </div>

      <ProductContact isContactOpen={isContactOpen} setIsContactOpen={setIsContactOpen} />
    </>
  );
};

export default FloatingContact;