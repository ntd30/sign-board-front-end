import { Card, Col, Pagination, Row } from "antd";
import Meta from "antd/es/card/Meta";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loadProductsByCategoryAPI } from "../../services/api.service";

const ListProductCard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const parentCategoryId = location?.state?.parentCategoryId;
    const parentCategoryName = location?.state?.parentCategoryName;
    const childCategoryId = location?.state?.childCategoryId;
    const childCategoryName = location?.state?.childCategoryName;

    const [products, setProducts] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(9); // Số lượng card trên mỗi trang
    const [total, setTotal] = useState(0);
    const [loadingTable, setLoadingTable] = useState(false);

    useEffect(() => {
        loadProductsByCategory();
    }, [current, pageSize, parentCategoryId, childCategoryId]);

    const loadProductsByCategory = async () => {
        setLoadingTable(true);
        const res = await loadProductsByCategoryAPI(parentCategoryId ? parentCategoryId : childCategoryId, current, pageSize);
        if (res?.data) {
            setTotal(res?.data?.totalElements);
        }
        setProducts(res?.data?.content);
        setLoadingTable(false);
    };

    const handleGetProductDetail = (product) => {
        navigate("/products/detail", {
            state: {
                product: product
            }
        });
    };

    const handlePaginationChange = (page, pageSize) => {
        setCurrent(page);
        setPageSize(pageSize);
    };

    return (
        <div style={{ maxWidth: '80%', margin: '80px auto' }}>
            <h1>DANH SÁCH SẢN PHẨM</h1>
            <ol className="breadcrumb" style={{ fontSize: "20px" }}>
                <li className="breadcrumb-item active"><Link to="/">Trang chủ</Link></li>
                <li className="breadcrumb-item active">{parentCategoryName}</li>
                {childCategoryName && <li className="breadcrumb-item active">{childCategoryName}</li>}
            </ol>
            <div>
                <Row gutter={[24, 32]}>
                    {products?.map(product => (
                        <Col sm={24} md={12} lg={8} key={product?.id}>
                            <Card
                                hoverable
                                cover={<img
                                    alt={product?.name}
                                    src={`${import.meta.env.VITE_BACKEND_URL}/images/${product?.images?.[0]?.imageUrl}`}
                                    style={{ width: '100%', height: 200, objectFit: 'contain', display: 'block' }}
                                />}
                                onClick={() => handleGetProductDetail(product)}
                            >
                                <Meta title={product?.name}
                                    description={
                                        <div style={{
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            {product?.description}
                                        </div>
                                    }
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
                    pageSizeOptions={[9, 15, 24]}
                    showTotal={(total, range) => `Hiển thị ${range[0]}-${range[1]} trên ${total} sản phẩm`}
                />
            )}
        </div>
    );
};

export default ListProductCard;