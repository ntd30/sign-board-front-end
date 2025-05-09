import { Card, Col, Row } from "antd"
import Meta from "antd/es/card/Meta"
import { useEffect, useState } from "react"
import { fetchAllProjectsAPI } from "../../../services/api.service"

const FeaturedProject = () => {
    const [dataProjects, setDataProjects] = useState([])

    useEffect(() => {
        loadProjects()
    }, [])

    const loadProjects = async () => {
        const res = await fetchAllProjectsAPI()
        setDataProjects(res.data)
    }

    return (
        <>
            <div style={{ width: "60%", margin: "50px auto" }}>
                <div>
                    <h1 style={{ textAlign: "center" }}>DỰ ÁN TIÊU BIỂU</h1>
                </div>

                <div>
                    <Row gutter={[40, 50]}>
                        {dataProjects.slice(0, 6).map(proj => (
                            <Col sm={24} md={12} lg={8} key={proj.id}>
                                <Card
                                    hoverable
                                    cover={<img alt={proj?.slug} src={`${import.meta.env.VITE_BACKEND_URL}${proj?.featuredImageUrl}`} />}
                                >
                                    <Meta title={proj?.title} description={proj?.content} />
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        </>
    )
}

export default FeaturedProject