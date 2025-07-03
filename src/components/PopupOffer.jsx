import React, { useState, useEffect } from 'react';

const PopupOffer = ({ setIsContactOpen }) => {
  const [showPopup, setShowPopup] = useState(true);

  const handleClose = () => {
    setShowPopup(false);
  };

  // Thêm CSS hover cho nút đóng
 useEffect(() => {
  const style = document.createElement('style');
  style.innerHTML = `
    .popup-appear {
      animation: fadeInZoom 1s ease-in-out forwards;
      opacity: 0;
      transform: scale(0.85);
    }

    @keyframes fadeInZoom {
      0% {
        opacity: 0;
        transform: scale(0.85);
      }
      50% {
        opacity: 0.6;
        transform: scale(1.02); /* Nhẹ nhàng phóng to một chút rồi co lại */
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }

    .popup-close:hover {
      background-color: #e60000 !important;
      transform: scale(1.1);
    }

    @media (max-width: 480px) {
      .popup-content h2 {
        font-size: 18px !important;
      }
      .popup-text li {
        font-size: 14px !important;
      }
      .popup-action-btn {
        width: 100% !important;
        font-size: 15px !important;
      }
      .popup-close {
        width: 32px !important;
        height: 32px !important;
        font-size: 20px !important;
      }
    }
  `;
  document.head.appendChild(style);
  return () => {
    document.head.removeChild(style);
  };
}, []);


  if (!showPopup) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <button className="popup-close" style={styles.closeBtn} onClick={handleClose}>×</button>
        <div style={styles.content} className="popup-content">
          <img src="/img/34.jpg" alt="Offer" style={styles.image} />
          <div style={styles.text} className="popup-text">
            <h2 style={{ color: '#d62828', marginBottom: 12 }}>🎁 ƯU ĐÃI ĐẶC BIỆT TỪ 01/07 - 30/07</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li>✅ <strong>TẶNG MIỄN PHÍ 01 WEBSITE MẪU</strong><br />
                Hơn 520 mẫu đẹp - hiện đại - tối ưu chuyển đổi cho mọi ngành nghề:<br />
                👉 Mua bán, dịch vụ, ăn uống, nội thất, thời trang, làm đẹp…
              </li>
              <li>✅ <strong>MIỄN PHÍ thiết kế bảng hiệu 2D</strong> theo yêu cầu, phù hợp thương hiệu</li>
              <li>✅ <strong>HỖ TRỢ cập nhật địa chỉ Google Map</strong> - giúp khách tìm dễ hơn, tăng uy tín</li>
              <li>✅ <strong>Đồng hành A-Z:</strong> tư vấn, thiết kế, thi công, bảo hành tận tâm</li>
            </ul>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                className="popup-action-btn"
                style={styles.actionBtn}
                onClick={() => {
                  setIsContactOpen(true);
                  handleClose();
                }}
              >
                Nhận Ưu Đãi Ngay
              </button>
            </div>
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
    padding: '10px',
  },
  popup: {
    width: '100%',
    maxWidth: 600,
    backgroundColor: '#fff',
    borderRadius: 10,
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    overflow: 'hidden',
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 36,
    height: 36,
    fontSize: 24,
    backgroundColor: '#ff4d4f',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
    marginTop: '20px',
    backgroundColor: '#fbbf24',
    color: '#000',
    fontWeight: 'bold',
    border: 'none',
    padding: '12px 24px',
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: '16px',
    minWidth: '180px',
    boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
  },
};

export default PopupOffer;
