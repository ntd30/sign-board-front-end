import { Card, Col, Row } from "antd"
import Meta from "antd/es/card/Meta"
import { Link, useLocation, useNavigate } from "react-router-dom"

const ListProduct = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const parentCategoryName = location?.state?.parentCategoryName
    const childCategoryName = location?.state?.childCategoryName
    const products = location?.state?.products

    const handleGetProductDetail = (product) => {
        navigate("/products/detail", {
            state: {
                product: product
            }
        })
    }

    // console.log(products)

    return (
        <div style={{ maxWidth: '60%', margin: '80px auto' }}>

            <h1>DANH SÁCH SẢN PHẨM</h1>
            <ol className="breadcrumb" style={{ fontSize: "20px" }}>
                <li className="breadcrumb-item active"><Link to="/">Trang chủ</Link></li>
                {/* {!childCategoryName ?
                    <li className="breadcrumb-item active">{parentCategoryName}</li>
                    :
                    <>
                        <li className="breadcrumb-item active"><Link to={"/"}>{parentCategoryName}</Link></li>
                        <li className="breadcrumb-item active">{childCategoryName}</li>
                    </>
                } */}

                <li className="breadcrumb-item active">{parentCategoryName}</li>

                {childCategoryName && <li className="breadcrumb-item active">{childCategoryName}</li>}
            </ol>

            <div>
                <Row gutter={[40, 50]}>
                    {products?.map(product => (
                        <Col sm={24} md={12} lg={8} key={product?.id}>
                            <Card
                                hoverable
                                cover={<img
                                    alt=""
                                    src={`${import.meta.env.VITE_BACKEND_URL}/images/${product?.images[0]?.imageUrl}`}
                                    // src="/img/bien-hop-den.png"
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
        </div>
    )
}

export default ListProduct