import React, { useState } from 'react';

const PopupOffer = () => {
  const [showPopup, setShowPopup] = useState(true);

  const handleClose = () => {
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <button style={styles.closeBtn} onClick={handleClose}>×</button>
        <div style={styles.content}>
          <img
            src="/img/1.jpg"
            alt="Offer"
            style={styles.image}
          />
          <div style={styles.text}>
            <h2 style={{ color: '#d62828' }}>🎁 ƯU ĐÃI ĐẶC BIỆT TỪ 01/07 - 30/07</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li>✅ <strong>TẶNG MIỄN PHÍ 01 WEBSITE MẪU</strong><br />
                Hơn 520 mẫu đẹp – hiện đại – tối ưu chuyển đổi cho mọi ngành nghề:
                <br />
                👉 Mua bán, dịch vụ, ăn uống, nội thất, thời trang, làm đẹp…
              </li>
              <li>✅ <strong>MIỄN PHÍ thiết kế bảng hiệu 2D</strong> theo yêu cầu, phù hợp thương hiệu</li>
              <li>✅ <strong>HỖ TRỢ cập nhật địa chỉ Google Map</strong> – giúp khách tìm dễ hơn, tăng uy tín</li>
              <li>✅ <strong>Đồng hành A-Z:</strong> tư vấn, thiết kế, thi công, bảo hành tận tâm</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0,
    width: '100vw', height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 9999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    width: '90%',
    maxWidth: 600,
    backgroundColor: '#fff',
    borderRadius: 8,
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    overflow: 'hidden',
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    top: 8, right: 12,
    fontSize: 24,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  image: {
    width: '100%',
    height: 'auto',
  },
  text: {
    padding: '16px',
    fontSize: '16px',
    lineHeight: '1.5',
    color: '#333',
  },
  actionBtn: {
    marginTop: '16px',
    backgroundColor: '#fbbf24',
    color: '#000',
    fontWeight: 'bold',
    border: 'none',
    padding: '10px 20px',
    borderRadius: 6,
    cursor: 'pointer',
  },
};

export default PopupOffer;