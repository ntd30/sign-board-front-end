import React, { useState, useEffect } from 'react';
import { PhoneOutlined } from '@ant-design/icons';
import '../styles/FloatingContact.css';
import zaloIcon from '../../public/img/contact/zalo.png';

const FloatingContact = () => {
  const hotline = '0915935225';
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);

  // Add fade-in effect on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseEnter = (buttonName) => {
    setHoveredButton(buttonName);
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };

  return (
    <div className="floating-contact" style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s ease' }}>
      {/* Zalo Button */}
      <a
        href="https://zalo.me/0915935225"
        target="_blank"
        rel="noopener noreferrer"
        className="circle-btn zalo-btn"
        aria-label="Chat with us on Zalo"
        onMouseEnter={() => handleMouseEnter('zalo')}
        onMouseLeave={handleMouseLeave}
        onFocus={() => handleMouseEnter('zalo')}
        onBlur={handleMouseLeave}
      >
        <img src={zaloIcon} alt="Zalo" className="icon-img" />
        {hoveredButton === 'zalo' && (
          <span className="tooltip">Chat với chúng tôi qua Zalo</span>
        )}
      </a>

      {/* Phone Button */}
      <a 
        href={`tel:${hotline}`} 
        className="circle-btn phone-btn"
        aria-label={`Gọi ngay ${hotline}`}
        onMouseEnter={() => handleMouseEnter('phone')}
        onMouseLeave={handleMouseLeave}
        onFocus={() => handleMouseEnter('phone')}
        onBlur={handleMouseLeave}
      >
        <PhoneOutlined />
        {hoveredButton === 'phone' && (
          <span className="tooltip">Gọi ngay: {hotline}</span>
        )}
      </a>
    </div>
  );
};

export default FloatingContact;
