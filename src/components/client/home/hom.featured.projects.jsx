import { Card, Col, Row } from "antd"
import Meta from "antd/es/card/Meta"

const FeaturedProject = () => {
    return (
        <>
            <div style={{ width: "60%", margin: "50px auto" }}>
                <div>
                    <h1 style={{textAlign: "center"}}>DỰ ÁN TIÊU BIỂU</h1>
                </div>

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
        </>
    )
}

export default FeaturedProject