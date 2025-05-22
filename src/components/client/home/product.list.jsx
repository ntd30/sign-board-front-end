import { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Typography, Grid } from 'antd';
import { fetchAllProductsAPI } from '../../../services/api.service';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

// Custom CSS for the product list
const customStyles = `
  .product-card {
    transition: transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out, opacity 0.5s ease-in-out;
    border-radius: 12px;
    overflow: hidden;
    background: #FFFFFF;
  }
`;

export const ProductList = () => {
    const screens = useBreakpoint()
    const isMobile = !screens.md

    const productCardStyle = {
        borderRadius: '12px',
        overflow: 'hidden',
        background: '#FFFFFF',
    };
    const productCardHoverStyle = {
        transform: 'translateY(-10px)',
        boxShadow: '0 15px 30px rgba(0, 77, 64, 0.2)', // Bóng đổ màu teal đậm hơn
    };

    const [hoveredCard, setHoveredCard] = useState(null);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    // Inject custom styles
    useEffect(() => {
        const styleSheet = document.createElement("style");
        styleSheet.id = "product-list-styles";
        styleSheet.innerText = customStyles;
        document.head.appendChild(styleSheet);

        // Load Ant Design reset CSS
        const antdResetCss = document.createElement("link");
        antdResetCss.id = "antd-reset-css-dynamic";
        antdResetCss.rel = "stylesheet";
        antdResetCss.href = "https://unpkg.com/antd/dist/reset.css";
        document.head.appendChild(antdResetCss);

        // Cleanup
        return () => {
            const existingStyleSheet = document.getElementById("product-list-styles");
            if (existingStyleSheet) {
                document.head.removeChild(existingStyleSheet);
            }
            const existingAntdCss = document.getElementById("antd-reset-css-dynamic");
            if (existingAntdCss) {
                document.head.removeChild(existingAntdCss);
            }
        };
    }, []);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        const res = await fetchAllProductsAPI(1, 8);
        setProducts(res?.data?.content || []);
    };

    const handleGetProductDetail = (product) => {
        navigate("/products/detail", {
            state: {
                product: product,
                categoryId: product?.category?.id,
            },
        });
    };

    return (
        <div style={{ width: isMobile ? "100%" : "70%", margin: "auto", padding: '60px 20px' }}>
            <Row justify="space-between" align="center" style={{ marginBottom: '35px', padding: '0 2%' }}>
                <Col>
                    <Title level={2} style={{ color: '#004D40', margin: 0 }}>Sản Phẩm Tiêu Biểu</Title>
                </Col>
            </Row>
            <Row gutter={[24, 24]} style={{ padding: '0 1%' }}>
                {products.map((product, index) => (
                    <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                        <Card
                            hoverable
                            className="product-card"
                            style={{
                                ...productCardStyle,
                                ...(hoveredCard === product.id ? productCardHoverStyle : {}),
                            }}
                            onMouseEnter={() => setHoveredCard(product.id)}
                            onMouseLeave={() => setHoveredCard(null)}
                            cover={
                                <img
                                    alt={product.name}
                                    src={`${import.meta.env.VITE_BACKEND_URL}/images/${product?.images[0]?.imageUrl}`}
                                    style={{ height: '220px', objectFit: 'cover' }}
                                />
                            }
                            onClick={() => handleGetProductDetail(product)}
                            actions={[
                                <Button
                                    type="primary"
                                    style={{ backgroundColor: '#FF6F00', borderColor: '#FF6F00', fontWeight: 'bold', width: '80%' }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#FF8F00';
                                        e.currentTarget.style.borderColor = '#FF8F00';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = '#FF6F00';
                                        e.currentTarget.style.borderColor = '#FF6F00';
                                    }}
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
        </div>
    );
};