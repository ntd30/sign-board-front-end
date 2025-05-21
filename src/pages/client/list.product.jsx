import { Breadcrumb, Button, Card, Col, Pagination, Row, Typography } from "antd";
import Meta from "antd/es/card/Meta";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loadProductsByCategoryAPI } from "../../services/api.service";

const { Title, Text } = Typography;

const ListProductCard = () => {
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

    const navigate = useNavigate();
    const location = useLocation();
    const parentCategoryId = location?.state?.parentCategoryId;
    const parentCategoryName = location?.state?.parentCategoryName;
    const childCategoryId = location?.state?.childCategoryId;
    const childCategoryName = location?.state?.childCategoryName;

    const [products, setProducts] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(12); // Số lượng card trên mỗi trang
    const [total, setTotal] = useState(0);
    const [loadingTable, setLoadingTable] = useState(false);
    const [hoveredCard, setHoveredCard] = useState(null);

    useEffect(() => {
        loadProductsByCategory();
    }, [current, pageSize, parentCategoryId, childCategoryId]);

    const loadProductsByCategory = async () => {
        setLoadingTable(true);
        const res = await loadProductsByCategoryAPI(parentCategoryId ? parentCategoryId : childCategoryId, current, pageSize);

        console.log("res products list from category", res)

        if (res?.data) {
            setTotal(res?.data?.totalElements);
        }
        setProducts(res?.data?.content);
        setLoadingTable(false);
    };

    const handleGetProductDetail = (product, categoryId) => {
        navigate("/products/detail", {
            state: {
                product: product,
                categoryId: categoryId,
            }
        });
    };

    const handlePaginationChange = (page, pageSize) => {
        setCurrent(page);
        setPageSize(pageSize);
    };

    return (
        <div style={{ width: "70%", margin: "auto", padding: '60px 20px' }}>
            <h1>DANH SÁCH SẢN PHẨM</h1>
            <Breadcrumb style={{ fontSize: 20, marginBottom: 50 }}>
                <Breadcrumb.Item>
                    <a href="/">Trang chủ</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{parentCategoryName}</Breadcrumb.Item>
                {childCategoryName && <Breadcrumb.Item>{childCategoryName}</Breadcrumb.Item>}
            </Breadcrumb>

            <div>
                <Row gutter={[24, 24]}>
                    {products.map((product) => (
                        <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                            <Card
                                hoverable
                                style={hoveredCard === product.id ? { ...productCardStyle, ...productCardHoverStyle } : productCardStyle}
                                onMouseEnter={() => setHoveredCard(product.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                                cover={<img alt={product.name} src={`${import.meta.env.VITE_BACKEND_URL}/images/${product?.images[0].imageUrl}`} style={{ height: '220px', objectFit: 'cover' }} />}
                                onClick={() => handleGetProductDetail(product, parentCategoryId ? parentCategoryId : childCategoryId)}
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
            </div>
            {total > pageSize && (
                <Pagination
                    current={current}
                    pageSize={pageSize}
                    total={total}
                    onChange={handlePaginationChange}
                    style={{ marginTop: 32, textAlign: 'center' }}
                    showSizeChanger
                    pageSizeOptions={[12, 16, 24]}
                    showTotal={(total, range) => `Hiển thị ${range[0]}-${range[1]} trên ${total} sản phẩm`}
                />
            )}
        </div>
    );
};

export default ListProductCard;