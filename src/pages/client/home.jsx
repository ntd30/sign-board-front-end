import React from 'react';
import { Row, Col, Card, Typography, Button, Statistic } from 'antd';
import {
    TeamOutlined, CustomerServiceOutlined, ProjectOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

// Component Trang Chủ chính với thứ tự đúng
export const HomePage = () => {
    return (
        <>
            {/* Hero Section */}
            <div style={{
                background: 'linear-gradient(135deg, #004D40, #00796B, #26A69A)',
                padding: '80px 20px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                minHeight: '80vh'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    position: 'relative',
                    zIndex: 2
                }}>
                    <h1 style={{
                        fontSize: '3.5rem',
                        fontWeight: '700',
                        marginBottom: '30px',
                        color: '#ffffff',
                        fontFamily: '"Montserrat", sans-serif',
                        letterSpacing: '-0.5px',
                        lineHeight: '1.2',
                        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                    }}>
                        Quảng cáo Nhân Việt
                    </h1>
                    <p style={{
                        fontSize: '1.3rem',
                        color: '#ffffff',
                        display: 'block',
                        marginBottom: '40px',
                        opacity: 0.9
                    }}>
                        Giải pháp bảng hiệu thông minh thời đại mới
                    </p>
                    <button style={{
                        background: 'rgba(255, 255, 255, 0.2)',
                        border: '2px solid #ffffff',
                        fontWeight: '600',
                        padding: '15px 45px',
                        fontSize: '1.2rem',
                        borderRadius: '30px',
                        color: '#ffffff',
                        cursor: 'pointer',
                        transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
                    }}>
                        Thiết kế ngay
                    </button>
                </div>
            </div>

            {/* Articles Section */}
            <div style={{ padding: '80px 20px', backgroundColor: '#f8f9fa' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h2 style={{
                        textAlign: 'center',
                        marginBottom: '50px',
                        color: '#004D40',
                        fontSize: '2.5rem',
                        fontWeight: '600'
                    }}>
                        Các lĩnh vực biển quảng cáo
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                        <div style={{
                            background: 'white',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                            transition: 'transform 0.3s ease',
                            padding: '20px'
                        }}>
                            <img src="https://placehold.co/400x250/004D40/ffffff?text=Biển+LED" alt="Biển LED" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }} />
                            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', margin: '15px 0', color: '#004D40' }}>Thiết kế biển quảng cáo LED</h3>
                            <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#666' }}>Các mẫu biển quảng cáo LED hiện đại, tiết kiệm năng lượng và thu hút ánh nhìn.</p>
                        </div>
                        <div style={{
                            background: 'white',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                            transition: 'transform 0.3s ease',
                            padding: '20px'
                        }}>
                            <img src="https://placehold.co/400x250/00796B/ffffff?text=Biển+hiệu" alt="Biển hiệu" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }} />
                            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', margin: '15px 0', color: '#004D40' }}>Biển hiệu cửa hàng</h3>
                            <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#666' }}>Thiết kế biển hiệu chuyên nghiệp cho cửa hàng, nhà hàng và showroom.</p>
                        </div>
                        <div style={{
                            background: 'white',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                            transition: 'transform 0.3s ease',
                            padding: '20px'
                        }}>
                            <img src="https://placehold.co/400x250/26A69A/ffffff?text=Tòa+nhà" alt="Tòa nhà" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }} />
                            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', margin: '15px 0', color: '#004D40' }}>Biển quảng cáo tòa nhà</h3>
                            <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#666' }}>Các giải pháp biển quảng cáo cho tòa nhà văn phòng và chung cư cao cấp.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div style={{
                padding: '80px 20px',
                background: 'linear-gradient(135deg, #004D40, #00796B)',
                color: 'white'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h2 style={{
                        textAlign: 'center',
                        marginBottom: '50px',
                        color: '#ffffff',
                        fontSize: '2.5rem',
                        fontWeight: '600'
                    }}>
                        Thành tựu nổi bật
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', textAlign: 'center' }}>
                        <div>
                            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#ffffff', marginBottom: '10px' }}>15+</div>
                            <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>Năm kinh nghiệm</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#ffffff', marginBottom: '10px' }}>50+</div>
                            <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>Nhân sự</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#ffffff', marginBottom: '10px' }}>500+</div>
                            <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>Khách hàng</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#ffffff', marginBottom: '10px' }}>1000+</div>
                            <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>Dự án hoàn thành</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Projects Section */}
            <div style={{ maxWidth: "1200px", margin: "40px auto", padding: '0 20px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#004D40', fontWeight: 'bold', fontSize: '2.5rem' }}>
                    Dự án tiêu biểu
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
                    {[1, 2, 3, 4].map((project) => (
                        <div key={project} style={{
                            background: 'white',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                            transition: 'transform 0.3s ease',
                        }}>
                            <img
                                src={`https://placehold.co/400x220/E0F2F1/00796B?text=Dự+án+${project}`}
                                alt={`Dự án ${project}`}
                                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                            />
                            <div style={{ padding: '20px' }}>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '10px', color: '#004D40' }}>
                                    Dự án Biển Quảng Cáo #{project}
                                </h3>
                                <p style={{ fontSize: '0.9rem', lineHeight: '1.5', color: '#666', marginBottom: '15px' }}>
                                    Mô tả chi tiết về dự án với thiết kế sáng tạo và chất lượng cao cấp.
                                </p>
                                <button style={{
                                    backgroundColor: '#004D40',
                                    border: 'none',
                                    color: 'white',
                                    padding: '10px 20px',
                                    borderRadius: '25px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    width: '100%',
                                    transition: 'background-color 0.3s ease'
                                }}>
                                    Xem Chi Tiết
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};