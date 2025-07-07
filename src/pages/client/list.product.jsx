import React, { useEffect, useState, useMemo } from "react";
import { Breadcrumb, Button, Card, Col, Pagination, Row, Typography, Input, Spin } from "antd";
import Meta from "antd/es/card/Meta";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loadProductsByCategoryAPI, fetchAllProductsAPI } from "../../services/api.service";

const { Title, Text } = Typography;
const { Search } = Input;

const ListProductCard = () => {
    const productCardStyle = {
        transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
        borderRadius: '12px',
        overflow: 'hidden',
        background: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    };
    const productCardHoverStyle = {
        transform: 'translateY(-10px)',
        boxShadow: '0 15px 30px rgba(0, 77, 64, 0.2)',
    };
    const cardImageStyle = {
        height: '220px',
        objectFit: 'cover',
        padding: '5px',
        borderBottom: '1px solid #f0f0f0'
    };
    const cardBodyStyle = {
        flexGrow: 1,
        padding: '16px'
    };
    const cardActionsStyle = {
        marginTop: 'auto',
        padding: '10px 16px',
        borderTop: '1px solid #f0f0f0'
    };

    const navigate = useNavigate();
    const location = useLocation();
    const parentCategoryId = location?.state?.parentCategoryId;
    const parentCategoryName = location?.state?.parentCategoryName;
    const childCategoryId = location?.state?.childCategoryId;
    const childCategoryName = location?.state?.childCategoryName;
    console.log("ListProductCard - Parent Category ID:", parentCategoryId);
    const [allCategoryProducts, setAllCategoryProducts] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(12);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchAllProductsForCategory = async () => {
            const categoryId = parentCategoryId || childCategoryId;
            setLoading(true);
            try {
                let res;
                if (!categoryId) {
                    // Nếu không có danh mục cha hoặc con, lấy tất cả sản phẩm
                    res = await fetchAllProductsAPI(current, pageSize);
                } else {
                    // Nếu có danh mục, lấy sản phẩm theo danh mục
                    res = await loadProductsByCategoryAPI(categoryId, current, pageSize);
                }

                if (res?.data?.content) {
                    setAllCategoryProducts(res.data.content);
                    setTotal(res.data.total || res.data.content.length);
                } else {
                    setAllCategoryProducts([]);
                    setTotal(0);
                }
            } catch (error) {
                console.error("Failed to load products:", error);
                setAllCategoryProducts([]);
                setTotal(0);
            } finally {
                setLoading(false);
            }
        };

        fetchAllProductsForCategory();
        setCurrent(1);
        setSearchTerm("");
    }, [parentCategoryId, childCategoryId, current, pageSize]);

    const processedProducts = useMemo(() => {
        let filtered = allCategoryProducts;
        if (searchTerm) {
            filtered = allCategoryProducts.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        setTotal(filtered.length);
        const startIndex = (current - 1) * pageSize;
        console.log("Filtered Products:", filtered);
        return filtered.slice(startIndex, startIndex + pageSize);
    }, [allCategoryProducts, searchTerm, current, pageSize]);

    const handleGetProductDetail = (productId) => {
        const categoryId = parentCategoryId || childCategoryId;
        navigate(`/products/detail/${productId}`, {
            state: {
                categoryId
            }
        });
        console.log("Navigating to product detail with ID:", productId, "and category ID:", categoryId);
        window.scrollTo(0, 0);
    };

    const handlePaginationChange = (page, newPageSize) => {
        setCurrent(page);
        if (newPageSize) setPageSize(newPageSize);
    };

    const onSearch = (value) => {
        setSearchTerm(value.trim());
        setCurrent(1);
    };

    return (
        <div style={{ maxWidth: "95%", margin: "40px auto", padding: '0 20px' }}>
            <Title level={2} style={{ textAlign: 'center', marginBottom: '10px', color: '#004D40', fontWeight: 'bold' }}>
                {childCategoryName || parentCategoryName || "Sản phẩm"}
            </Title>
            <div style={{ fontSize: 16, marginBottom: 30, textAlign: 'center' }}>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to="/">Trang chủ</Link>
                    </Breadcrumb.Item>
                    {parentCategoryName && <Breadcrumb.Item>{parentCategoryName}</Breadcrumb.Item>}
                    {childCategoryName && <Breadcrumb.Item>{childCategoryName}</Breadcrumb.Item>}
                </Breadcrumb>
            </div>

            <Search
                placeholder="Tìm kiếm sản phẩm theo tên..."
                allowClear
                enterButton="Tìm kiếm"
                size="large"
                onSearch={onSearch}
                onChange={(e) => {
                    if (!e.target.value.trim()) {
                        setSearchTerm("");
                        setCurrent(1);
                    }
                }}
                style={{ marginBottom: 30, width: '100%', maxWidth: '600px', display: 'block', margin: '0 auto 30px auto' }}
            />

            {loading ? (
                <div style={{ textAlign: 'center', padding: '50px' }}><Spin size="large" /></div>
            ) : processedProducts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '50px', color: '#00796B', fontSize: '18px' }}>
                    {searchTerm
                        ? `Không tìm thấy sản phẩm nào với tên "${searchTerm}".`
                        : "Hiện chưa có sản phẩm nào trong danh mục này."}
                </div>
            ) : (
                <>
                    <Row gutter={[24, 24]}>
                        {processedProducts.map((product) => (
                            <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                                <Card
                                    hoverable
                                    style={hoveredCard === product.id ? { ...productCardStyle, ...productCardHoverStyle } : productCardStyle}
                                    onMouseEnter={() => setHoveredCard(product.id)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                    onClick={() => handleGetProductDetail(product.id)}
                                    cover={
                                        <img
                                            alt={product.name}
                                            src={
                                                product?.images?.[0]?.imageBase64
                                                    ? `data:image/jpeg;base64,${product.images[0].imageBase64}`
                                                    : product?.images?.[0]?.imageUrl
                                                    ? `${import.meta.env.VITE_BACKEND_URL}/images/${product.images[0].imageUrl}`
                                                    : 'https://placehold.co/400x220/E0F2F1/00796B?text=Ảnh+SP'
                                            }
                                            style={cardImageStyle}
                                        />
                                    }
                                    bodyStyle={cardBodyStyle}
                                    actions={[
                                        <Button
                                            type="primary"
                                            style={{ backgroundColor: '#FF6F00', borderColor: '#FF6F00', fontWeight: 'bold', width: 'calc(100% - 32px)', margin: '0 16px' }}
                                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FF8F00'; e.currentTarget.style.borderColor = '#FF8F00'; }}
                                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FF6F00'; e.currentTarget.style.borderColor = '#FF6F00'; }}
                                        >
                                            Xem Chi Tiết
                                        </Button>,
                                    ]}
                                >
                                    <Card.Meta
                                        title={
                                            <Title
                                                level={5}
                                                style={{ color: '#004D40', minHeight: '44px', marginBottom: '8px', cursor: 'pointer' }}
                                                onClick={() => handleGetProductDetail(product.id)}
                                            >
                                                {product.name}
                                            </Title>
                                        }
                                        description={<Text strong style={{ color: '#00796B', fontSize: '17px' }}>Giá: Liên hệ</Text>}
                                    />
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    {total > pageSize && (
                        <Pagination
                            current={current}
                            pageSize={pageSize}
                            total={total}
                            onChange={handlePaginationChange}
                            style={{ marginTop: 40, textAlign: 'center' }}
                            showSizeChanger
                            pageSizeOptions={[12, 16, 24, 48]}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default ListProductCard;