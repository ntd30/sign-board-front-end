import { Card, Col, Row } from "antd"
import Meta from "antd/es/card/Meta"
import { useEffect, useState } from "react"
import { fetchAllNewsAPI } from "../../../services/api.service"

const FeaturedNews = () => {
    const [dataNews, setDataNews] = useState([])

    useEffect(() => {
        loadNews()
    }, [])

    const loadNews = async () => {
        const res = await fetchAllNewsAPI()
        setDataNews(res.data)
    }

    return (
        <>
            <div style={{ width: "60%", margin: "50px auto" }}>
                <div>
                    <h1 style={{ textAlign: "center" }}>TIN TỨC NỔI BẬT</h1>
                </div>

                <div>
                    <Row gutter={[40, 50]}>
                        {dataNews.slice(0, 6).map(post => (
                            <Col sm={24} md={12} lg={8} key={post.id}>
                                <Card
                                    hoverable
                                    cover={<img alt={post?.slug} src={`${import.meta.env.VITE_BACKEND_URL}${post?.featuredImageUrl}`} />}
                                >
                                    <Meta title={post?.title} description={post?.content} />
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        </>
    )
}

export default FeaturedNews