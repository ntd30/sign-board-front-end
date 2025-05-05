import { Card, Col, Row } from "antd"
import Meta from "antd/es/card/Meta"

const ListProduct = () => {
    return (
        <div style={{ maxWidth: '60%', margin: '80px auto' }}>

            <h1>DANH SÁCH SẢN PHẨM</h1>
            <ol className="breadcrumb" style={{ fontSize: "20px" }}>
                <li className="breadcrumb-item active"><a href="/">Trang chủ</a></li>
                <li className="breadcrumb-item active"><a href="/">Biển quảng cáo</a></li>
                <li className="breadcrumb-item active">Biển chữ nổi quảng cáo</li>
            </ol>

            <div>
                <Row gutter={[40, 50]}>
                    <Col sm={24} md={12} lg={8}>
                        <Card
                            hoverable
                            cover={<img alt="example" src="/img/bien-hop-den.png" />}
                        >
                            <Meta title="Europe Street beat" description="www.instagram.com" />
                        </Card>
                    </Col>
                    <Col sm={24} md={12} lg={8}>
                        <Card
                            hoverable
                            cover={<img alt="example" src="/img/bien-hop-den.png" />}
                        >
                            <Meta title="Europe Street beat" description="www.instagram.com" />
                        </Card>
                    </Col>
                    <Col sm={24} md={12} lg={8}>
                        <Card
                            hoverable
                            cover={<img alt="example" src="/img/bien-hop-den.png" />}
                        >
                            <Meta title="Europe Street beat" description="www.instagram.com" />
                        </Card>
                    </Col>
                    <Col sm={24} md={12} lg={8}>
                        <Card
                            hoverable
                            cover={<img alt="example" src="/img/bien-hop-den.png" />}
                        >
                            <Meta title="Europe Street beat" description="www.instagram.com" />
                        </Card>
                    </Col>
                    <Col sm={24} md={12} lg={8}>
                        <Card
                            hoverable
                            cover={<img alt="example" src="/img/bien-hop-den.png" />}
                        >
                            <Meta title="Europe Street beat" description="www.instagram.com" />
                        </Card>
                    </Col>
                    <Col sm={24} md={12} lg={8}>
                        <Card
                            hoverable
                            cover={<img alt="example" src="/img/bien-hop-den.png" />}
                        >
                            <Meta title="Europe Street beat" description="www.instagram.com" />
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default ListProduct