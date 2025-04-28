import { Card, Col, Divider, Row, Typography } from "antd"
const { Text } = Typography
import "../styles/news.css"
import { Link } from "react-router-dom";

const NewsPage = () => {
    const featuredPost = {
        title: 'Tiêu đề lớn - bài viết nổi bật',
        description: 'Nội dung mô tả ngắn gọn cho bài viết nổi bật nằm ở đây, với thông tin chi tiết hơn...',
        image: 'img/news/1.png',
    };

    const smallPosts = [
        {
            title: 'Bài viết nhỏ 1',
            description: 'Mô tả bài viết nhỏ ngắn gọn.',
            image: 'img/news/2.png',
        },
        {
            title: 'Bài viết nhỏ 2',
            description: 'Mô tả bài viết nhỏ ngắn gọn.',
            image: 'img/news/2.png',
        },
        {
            title: 'Bài viết nhỏ 3',
            description: '',
            image: 'img/news/2.png',
        },
    ];

    const quickViews = [
        { title: 'Bàn Ghế Cafe Giá Rẻ - Top 10 Mẫu Bán Chạy 2024 Giá Tốt & Chất Lượng 1', image: 'img/news/2.png' },
        { title: 'Bàn Ghế Cafe Giá Rẻ - Top 10 Mẫu Bán Chạy 2024 Giá Tốt & Chất Lượng 2', image: 'img/news/2.png' },
        { title: 'Bàn Ghế Cafe Giá Rẻ - Top 10 Mẫu Bán Chạy 2024 Giá Tốt & Chất Lượng 3', image: 'img/news/2.png' },
        { title: 'Bàn Ghế Cafe Giá Rẻ - Top 10 Mẫu Bán Chạy 2024 Giá Tốt & Chất Lượng 4', image: 'img/news/2.png' },
        { title: 'Bàn Ghế Cafe Giá Rẻ - Top 10 Mẫu Bán Chạy 2024 Giá Tốt & Chất Lượng 5', image: 'img/news/2.png' },
        { title: 'Bàn Ghế Cafe Giá Rẻ - Top 10 Mẫu Bán Chạy 2024 Giá Tốt & Chất Lượng 6', image: 'img/news/2.png' },
        { title: 'Bàn Ghế Cafe Giá Rẻ - Top 10 Mẫu Bán Chạy 2024 Giá Tốt & Chất Lượng 7', image: 'img/news/2.png' },
        { title: 'Bàn Ghế Cafe Giá Rẻ - Top 10 Mẫu Bán Chạy 2024 Giá Tốt & Chất Lượng 8', image: 'img/news/2.png' },
    ];

    return (
        <>
            <div style={{ maxWidth: '70%', margin: '80px auto' }}>

                <h1>TIN TỨC</h1>
                <ol className="breadcrumb" style={{ fontSize: "20px" }}>
                    <li className="breadcrumb-item active"><a href="/">Trang chủ</a></li>
                    <li className="breadcrumb-item active">Tin tức</li>
                </ol>

                <Row gutter={[32, 32]} >
                    {/* Col trái */}
                    <Col xs={24} md={18}>
                        {/* Row 1 */}
                        <Row gutter={[24, 24]}>
                            {/* Col trái 2/3 */}
                            <Col xs={24} md={16}>
                                <Card
                                    hoverable
                                    cover={<img alt="main-news" src={featuredPost.image} />}
                                >
                                    <Card.Meta title={featuredPost.title} description={featuredPost.description} />

                                </Card>
                            </Col>

                            {/* Col phải 1/3 */}
                            <Col xs={24} md={8}>
                                <img
                                    alt="small-news" src={featuredPost.image}
                                    style={{ width: '100%', height: 'auto', objectFit: 'cover', borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
                                />
                                <div className="gradient-background">
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, soluta temporibus eos suscipit ipsa debitis iste corporis aspernatur, nisi accusamus deserunt voluptates veniam dicta reprehenderit consectetur, perferendis iure aliquid repellendus.</p>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse illum magni assumenda sit officia dolore odio sequi, repellat placeat consequuntur minima, aliquam voluptas maxime et reiciendis facere magnam adipisci ducimus.</p>
                                </div>
                            </Col>
                        </Row>

                        {/* Row 2 */}
                        <Row gutter={[24, 24]} style={{ marginTop: '16px' }}>
                            {smallPosts.map((post, index) => (
                                <Col key={index} xs={24} md={8}>
                                    <Card
                                        hoverable
                                        cover={<img alt={`small-news-${index}`} src={post.image} />}
                                    >
                                        <Card.Meta title={post.title} />
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                        <Divider variant="dotted" style={{ borderColor: '#7cb305' }} />
                    </Col>

                    {/* Col phải */}
                    <Col xs={24} md={6} >
                        <Divider orientation="left" variant="dotted" style={{ borderColor: '#7cb305', marginTop: 0 }}>Xem nhanh</Divider>
                        <Row style={{ borderStyle: "none none dashed dashed", padding: "0 0 20px 20px", borderRadius: "8px", borderColor: "#7bced8" }}>
                            {/* <Title
                                level={4}
                                style={{ marginTop: 0, fontFamily: "initial", fontStyle: "italic" }}
                            >Xem nhanh</Title> */}
                            {/* <Divider variant="dotted" style={{ borderColor: '#7cb305' }} /> */}
                            <Row style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {quickViews.map((item, index) => (

                                    <Row gutter={16} key={index}>
                                        <Col span={12}>
                                            <Text>{item.title}</Text>
                                        </Col>
                                        <Col span={12}>
                                            <img
                                                alt={`small-news-${index}`}
                                                src={item.image}
                                                style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: 8 }}
                                            />
                                        </Col>
                                    </Row>

                                ))}
                            </Row>
                        </Row>
                    </Col>
                </Row>


                {/* List */}
                <Row style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <Col xs={24} md={18}>
                        {quickViews.map((item, index) => (

                            <Row gutter={16} key={index}>
                                <Col span={8}>
                                    <img
                                        alt={`small-news-${index}`}
                                        src={item.image}
                                        style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: 8 }}
                                    />
                                </Col>
                                <Col span={16}>
                                    <Link style={{ fontSize: "20px", fontWeight: "650" }}>{item.title}</Link>
                                    <p style={{ fontSize: "15px" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga quas labore omnis error. Dolorem asperiores possimus laborum molestiae est alias labore vitae saepe facilis tenetur! Ipsa culpa asperiores blanditiis nam!</p>
                                </Col>
                            </Row>
                        ))}
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default NewsPage