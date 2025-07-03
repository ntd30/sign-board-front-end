// src/components/Promotion.jsx
import React from 'react';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

const Promotion = () => {
  return (
    <div
      style={{
        background: `
          linear-gradient(
            135deg,
            rgba(255, 0, 255, 0.7) 0%,
            rgba(0, 255, 255, 0.7) 50%,
            rgba(255, 255, 0, 0.7) 100%
          )
        `,
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '12px',
        padding: '24px',
        margin: '0 auto 40px',
        maxWidth: '1000px',
        color: '#FFFFFF',
        textAlign: 'center',
        textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        backgroundSize: '200% 200%',
        animation: 'gentleWave 12s ease infinite',
        backdropFilter: 'blur(4px)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <style>
        {`
          @keyframes gentleWave {
            0% {
              background-position: 0% 50%;
              opacity: 0.9;
            }
            50% {
              background-position: 100% 50%;
              opacity: 1;
            }
            100% {
              background-position: 0% 50%;
              opacity: 0.9;
            }
          }
          
          .promotion-content {
            position: relative;
            z-index: 2;
          }
        `}
      </style>

      {/* Lớp phủ mờ để làm mềm hiệu ứng */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(255, 255, 255, 0.1)',
        zIndex: 1
      }}></div>

      <div className="promotion-content">
        <Title level={4} style={{ 
          color: '#FFFFFF', 
          marginBottom: 16, 
          fontWeight: 500,
          letterSpacing: '1px'
        }}>
          ✨ TINH HOA SÁNG TẠO:
        </Title>

        {[
          "📍 Ba tư tỉnh – tinh gọn để mạnh",
          "🌟 Bảng hiệu thông minh – thương hiệu vươn xa 🚀",
          "🤖 AI đồng hành – định hình sắc hoa 🎨",
          "✨ Thiết kế đỉnh cao – cuốn hút mọi nhà 🏠",
          "💡 Bừng sáng mặt tiền – tỏa chất riêng ta!"
        ].map((text, index) => (
          <Paragraph 
            key={index}
            style={{ 
              fontSize: 15, 
              margin: '14px 0', 
              fontWeight: 400,
              opacity: 0.9,
              transition: 'all 0.3s ease',
              transform: 'translateY(0)',
              ':hover': {
                transform: 'translateY(-2px)',
                opacity: 1
              }
            }}
          >
            <strong>{text}</strong>
          </Paragraph>
        ))}
      </div>
    </div>
  );
};

export default Promotion;