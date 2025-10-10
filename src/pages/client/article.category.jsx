import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticleCategoryTreeAPI, fetchArticlesByCategorySlugAPI } from '../../services/api.service';
import { Row, Col, Card, Typography, Spin, Alert, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

const ArticleCategoryClientPage = () => {
    const { slug, parentSlug, childSlug } = useParams();
    const [category, setCategory] = useState(null);
    const [parentCategory, setParentCategory] = useState(null);
    const [subcategories, setSubcategories] = useState([]);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Hàm đệ quy để tìm category theo slug
    const findCategoryBySlug = (categories, targetSlug) => {
        for (const category of categories) {
            if (category.slug === targetSlug) {
                return category;
            }
            if (category.children && category.children.length > 0) {
                const found = findCategoryBySlug(category.children, targetSlug);
                if (found) return found;
            }
        }
        return null;
    };

    // Xác định slug hiện tại để xử lý (có thể là parentSlug hoặc slug)
    const currentSlug = childSlug || slug;

    useEffect(() => {
        if (currentSlug) {
            loadCategoryData();
        }
    }, [currentSlug, parentSlug]);

    const loadCategoryData = async () => {
        try {
            setLoading(true);
            setError(null);

            console.log("Loading categories for slug:", currentSlug);

            // Lấy cây danh mục từ API
            const categoryRes = await fetchArticleCategoryTreeAPI();
            console.log("Category tree response:", categoryRes.data);

            // Nếu có parentSlug và childSlug, tìm child category và parent category
            if (parentSlug && childSlug) {
                const parentCat = findCategoryBySlug(categoryRes.data, parentSlug);
                console.log("Found parent category:", parentCat);

                if (parentCat && parentCat.children) {
                    const foundCategory = findCategoryBySlug(parentCat.children, childSlug);
                    console.log("Found child category:", foundCategory);

                    if (foundCategory) {
                        setCategory(foundCategory);
                        setParentCategory(parentCat);
                        setSubcategories([]);
                    } else {
                        setError('Không tìm thấy danh mục bài viết con');
                    }
                } else {
                    setError('Không tìm thấy danh mục bài viết cha');
                }
            } else {
                // Trường hợp chỉ có một slug (category cấp 1)
                const foundCategory = findCategoryBySlug(categoryRes.data, currentSlug);
                console.log("Found category:", foundCategory);

                if (foundCategory) {
                    setCategory(foundCategory);
                    setParentCategory(null);

                    // Lấy subcategories nếu có
                    if (foundCategory.children && foundCategory.children.length > 0) {
                        setSubcategories(foundCategory.children);
                    }
                } else {
                    setError('Không tìm thấy danh mục bài viết');
                }
            }

            // Lấy articles của category này
            try {
                let articlesRes;
                if (parentSlug && childSlug) {
                    // Nếu có cả parent và child slug, lấy bài viết theo cả hai
                    console.log("Fetching articles for parent:", parentSlug, "child:", childSlug);
                    articlesRes = await fetchArticlesByCategorySlugAPI(parentSlug, childSlug);
                } else {
                    // Nếu chỉ có một slug, lấy bài viết theo slug đó
                    console.log("Fetching articles for slug:", currentSlug);
                    articlesRes = await fetchArticlesByCategorySlugAPI(currentSlug);
                }

                console.log("Articles response:", articlesRes);
                console.log("Articles data:", articlesRes.data);
                console.log("Articles data type:", typeof articlesRes.data);
                console.log("Is array:", Array.isArray(articlesRes.data));

                // Xử lý response từ API
                if (Array.isArray(articlesRes.data)) {
                    console.log("Setting articles:", articlesRes.data.length, "items");
                    setArticles(articlesRes.data);
                } else if (typeof articlesRes.data === 'string') {
                    // Nếu API trả về message string thay vì array
                    console.log("API returned string message:", articlesRes.data);
                    setArticles([]);
                } else {
                    console.log("API returned unexpected format");
                    setArticles([]);
                }
            } catch (err) {
                console.error('Error loading articles:', err);
                setArticles([]);
            }
        } catch (err) {
            console.error('Error loading category data:', err);
            setError('Có lỗi xảy ra khi tải dữ liệu danh mục');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div style={{ padding: '50px', textAlign: 'center' }}>
                <Spin size="large" />
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ padding: '50px', textAlign: 'center' }}>
                <Alert message="Lỗi" description={error} type="error" />
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            {/* Breadcrumb */}
            <Breadcrumb style={{ marginBottom: '20px' }}>
                <Breadcrumb.Item>
                    <Link to="/">Trang chủ</Link>
                </Breadcrumb.Item>
                {parentCategory && (
                    <Breadcrumb.Item>
                        <Link to={`/${parentCategory.slug}`}>{parentCategory.name}</Link>
                    </Breadcrumb.Item>
                )}
                {category && (
                    <Breadcrumb.Item>
                        {category.name}
                    </Breadcrumb.Item>
                )}
            </Breadcrumb>

            {/* Category Header */}
            {category && (
                <div style={{ marginBottom: '30px' }}>
                    <Title level={1}>{category.name}</Title>
                    {category.description && (
                        <Text type="secondary" style={{ fontSize: '16px' }}>
                            {category.description}
                        </Text>
                    )}
                </div>
            )}

            {/* Subcategories */}
            {subcategories.length > 0 && (
                <div style={{ marginBottom: '40px' }}>
                    <Title level={2}>Danh mục con</Title>
                    <Row gutter={[16, 16]}>
                        {subcategories.map(sub => (
                            <Col xs={24} sm={12} md={8} lg={6} key={sub.id}>
                                <Link to={`/${currentSlug}/${sub.slug}`}>
                                    <Card
                                        hoverable
                                        style={{
                                            height: '100%',
                                            textAlign: 'center'
                                        }}
                                    >
                                        <Card.Meta
                                            title={sub.name}
                                            description={sub.description}
                                        />
                                    </Card>
                                </Link>
                            </Col>
                        ))}
                    </Row>
                </div>
            )}

            {/* Articles */}
            {articles.length > 0 && (
                <div>
                    <Title level={2}>Bài viết</Title>
                    <Row gutter={[16, 16]}>
                        {articles.map(article => (
                            <Col xs={24} sm={12} md={8} key={article.id}>
                                <Card
                                    hoverable
                                    cover={
                                        article.imageBase64 ? (
                                            <img
                                                alt={article.title}
                                                src={`data:image/jpeg;base64,${article.imageBase64}`}
                                                style={{ height: '200px', objectFit: 'cover' }}
                                                onError={(e) => {
                                                    console.error('Failed to load base64 image');
                                                    e.target.style.display = 'none';
                                                }}
                                            />
                                        ) : article.featuredImageUrl ? (
                                            <img
                                                alt={article.title}
                                                src={`${import.meta.env.VITE_BACKEND_URL}${article.featuredImageUrl}`}
                                                style={{ height: '200px', objectFit: 'cover' }}
                                                onError={(e) => {
                                                    console.error('Failed to load image:', article.featuredImageUrl);
                                                    e.target.style.display = 'none';
                                                }}
                                            />
                                        ) : null
                                    }
                                >
                                    <Card.Meta
                                        title={article.title}
                                        description={
                                            article.excerpt || article.content?.substring(0, 100) + '...'
                                        }
                                    />
                                    <div style={{ marginTop: '10px' }}>
                                        <Link to={article.slug ? `/news/${article.slug}` : `/news/detail/${article.id}`}>
                                            Đọc thêm →
                                        </Link>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            )}

            {/* Empty state */}
            {articles.length === 0 && subcategories.length === 0 && (
                <div style={{ textAlign: 'center', padding: '50px' }}>
                    <Text type="secondary">
                        Chưa có nội dung nào trong danh mục này.
                    </Text>
                </div>
            )}
        </div>
    );
};

export default ArticleCategoryClientPage;
