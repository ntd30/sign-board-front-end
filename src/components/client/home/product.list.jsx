import { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Typography, Rate } from 'antd';
import { fetchAllProductsAPI } from '../../../services/api.service';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography

export const ProductList = () => {
    // const products = Array.from({ length: 8 }).map((_, index) => ({
    //     id: index + 1,
    //     name: `Biển Hiệu Quảng Cáo Mẫu ${index + 1}`,
    //     image: placeholderImg(300, 220, `Mẫu Biển ${index + 1}`, 'B2DFDB', '004D40'), // Nền teal nhạt, chữ teal đậm
    //     price: 'Giá liên hệ',
    // }));

    const productCardStyle = {
        transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
        borderRadius: '12px',
        overflow: 'hidden',
        background: '#FFFFFF'
    };
    const productCardHoverStyle = {
        transform: 'translateY(-10px)',
        boxShadow: '0 15px 30px rgba(0, 77, 64, 0.2)', // Bóng đổ màu teal đậm hơn
    };

    const [hoveredCard, setHoveredCard] = useState(null);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadProducts();
    }, [])

    const loadProducts = async () => {
        const res = await fetchAllProductsAPI(1, 8);
        setProducts(res?.data?.content);
    }

    const handleGetProductDetail = (product) => {
        navigate("/products/detail", {
            state: {
                product: product
            }
        });
    };

    return (
        <div style={{ width: "70%", margin: "auto", padding: '60px 20px' }}>
            <Row justify="space-between" align="center" style={{ marginBottom: '35px', padding: '0 2%' }}>
                <Col>
                    <Title level={2} style={{ color: '#004D40', margin: 0 }}>Sản Phẩm Tiêu Biểu</Title>
                </Col>
                {/* <Col>
                    <Button type="link" href="#" style={{ color: '#00796B', fontSize: '18px', fontWeight: '600' }}>
                        Xem tất cả sản phẩm &rarr;
                    </Button>
                </Col> */}
            </Row>
            <Row gutter={[24, 24]} style={{ padding: '0 1%' }}>
                {products.map((product) => (
                    <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                        <Card
                            hoverable
                            style={hoveredCard === product.id ? { ...productCardStyle, ...productCardHoverStyle } : productCardStyle}
                            onMouseEnter={() => setHoveredCard(product.id)}
                            onMouseLeave={() => setHoveredCard(null)}
                            cover={<img alt={product.name} src={`${import.meta.env.VITE_BACKEND_URL}/images/${product?.images[0].imageUrl}`} style={{ height: '220px', objectFit: 'cover' }} />}
                            onClick={() => handleGetProductDetail(product)}
                            actions={[
                                <Button
                                    type="primary"
                                    style={{ backgroundColor: '#FF6F00', borderColor: '#FF6F00', fontWeight: 'bold', width: '80%' }}
                                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FF8F00'; e.currentTarget.style.borderColor = '#FF8F00'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FF6F00'; e.currentTarget.style.borderColor = '#FF6F00'; }}
                                >
                                    Liên Hệ Ngay
                                </Button>,
                            ]}
                        >
                            <Card.Meta
                                title={<Title level={5} style={{ color: '#004D40' }}>{product.name}</Title>}
                                description={<Text strong style={{ color: '#00796B', fontSize: '17px' }}>Giá: Liên hệ</Text>}
                            />
                        </Card>
                    </Col>
                ))}
            </Row>
        </div >
    );
};