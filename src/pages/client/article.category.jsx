import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { fetchArticleCategoryTreeAPI, getAllArticlesByCategoryAndSubcategoriesWithSearchAPI } from '../../services/api.service';
import { Card, Typography, Spin, Alert, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import LazyImage from '../../components/common/LazyImage';
import ArticleCarousel from '../../components/common/ArticleCarousel';

const { Title, Text } = Typography;

const ArticleCategoryClientPage = () => {
    const { slug, parentSlug, childSlug } = useParams();
    const [searchParams] = useSearchParams();
    const [category, setCategory] = useState(null);
    const [parentCategory, setParentCategory] = useState(null);
    const [subcategories, setSubcategories] = useState([]);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categoryTree, setCategoryTree] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);

    const currentSlug = childSlug || parentSlug || slug;
    const categoryId = searchParams.get('id');

    useEffect(() => {
        if (categoryId) {
            // Reset pagination states when category changes
            setCurrentPage(0);
            setArticles([]);
            setHasMore(true);
            setLoadingMore(false);
            loadCategoryTree();
        } else {
            setError('Không tìm thấy ID danh mục');
            setLoading(false);
        }
    }, [categoryId, parentSlug, slug]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            const clientHeight = document.documentElement.clientHeight;

            // Load more when user is near the bottom (100px threshold)
            if (scrollTop + clientHeight >= scrollHeight - 100 && hasMore && !loadingMore) {
                loadMoreArticles();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasMore, loadingMore]);

    const loadCategoryTree = async () => {
        setLoading(true);
        setError(null);
        setArticles([]);
        setSubcategories([]);

        try {
            const categoryRes = await fetchArticleCategoryTreeAPI();
            if (categoryRes?.data && Array.isArray(categoryRes.data)) {
                setCategoryTree(categoryRes.data);
            } else {
                setError('Không thể tải dữ liệu danh mục');
                return;
            }

            const categoryWithArticlesRes = await getAllArticlesByCategoryAndSubcategoriesWithSearchAPI(categoryId, currentPage, 20);
            if (categoryWithArticlesRes?.data) {
                const categoryData = categoryWithArticlesRes.data;
                setCategory({
                    id: categoryData.id,
                    name: categoryData.name,
                    slug: categoryData.slug,
                    description: categoryData.description,
                    isActive: categoryData.isActive,
                    level: categoryData.level,
                    sortOrder: categoryData.sortOrder,
                    createdAt: categoryData.createdAt,
                    updatedAt: categoryData.updatedAt,
                    totalChildrenArticlesCount: categoryData.totalChildrenArticlesCount,
                    articleCount: categoryData.articleCount,
                    childrenCount: categoryData.childrenCount,
                });

                if (categoryData.subcategories && categoryData.subcategories.length > 0) {
                    setSubcategories(categoryData.subcategories.map(sub => ({
                        id: sub.id,
                        name: sub.name,
                        slug: sub.slug,
                        description: sub.description,
                        isActive: sub.isActive,
                        level: sub.level,
                        sortOrder: sub.sortOrder,
                        createdAt: sub.createdAt,
                        updatedAt: sub.updatedAt,
                        totalChildrenArticlesCount: sub.totalChildrenArticlesCount,
                        articleCount: sub.articleCount,
                        childrenCount: sub.childrenCount,
                        articles: sub.articles || [],
                    })));
                }

                if (categoryData.articles && categoryData.articles.length > 0) {
                    const newArticles = categoryData.articles.map(article => ({
                        id: article.id,
                        title: article.title,
                        content: article.content,
                        excerpt: article.excerpt,
                        slug: article.slug,
                        imageBase64: article.imageBase64,
                        categoryId: article.categoryId,
                        isActive: article.isActive,
                        createdAt: article.createdAt,
                        updatedAt: article.updatedAt,
                        createdBy: article.createdBy,
                        updatedBy: article.updatedBy,
                    }));

                    // Check if we got fewer articles than requested (indicates last page)
                    if (newArticles.length < 20) {
                        setHasMore(false);
                    }

                    setArticles(prevArticles => [...prevArticles, ...newArticles]);
                } else {
                    setHasMore(false);
                }

                if (categoryData.parentId && categoryData.parentName) {
                    setParentCategory({
                        id: categoryData.parentId,
                        name: categoryData.parentName,
                    });
                }
            } else {
                setError('Không thể tải dữ liệu bài viết');
            }
        } catch (err) {
            setError('Có lỗi xảy ra khi tải dữ liệu danh mục');
        } finally {
            setLoading(false);
        }
    };

    const loadMoreArticles = async () => {
        if (loadingMore || !hasMore) return;

        setLoadingMore(true);
        const nextPage = currentPage + 1;

        try {
            const response = await getAllArticlesByCategoryAndSubcategoriesWithSearchAPI(categoryId, nextPage, 20);
            if (response?.data?.articles) {
                const newArticles = response.data.articles.map(article => ({
                    id: article.id,
                    title: article.title,
                    content: article.content,
                    excerpt: article.excerpt,
                    slug: article.slug,
                    imageBase64: article.imageBase64,
                    categoryId: article.categoryId,
                    isActive: article.isActive,
                    createdAt: article.createdAt,
                    updatedAt: article.updatedAt,
                    createdBy: article.createdBy,
                    updatedBy: article.updatedBy,
                }));

                // Check if we got fewer articles than requested (indicates last page)
                if (newArticles.length < 20) {
                    setHasMore(false);
                }

                setArticles(prevArticles => [...prevArticles, ...newArticles]);
                setCurrentPage(nextPage);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error loading more articles:', error);
            setHasMore(false);
        } finally {
            setLoadingMore(false);
        }
    };

    // Helper function để chia articles thành các nhóm 8 bài
    const chunkArticles = (articles, chunkSize = 8) => {
        const chunks = [];
        for (let i = 0; i < articles.length; i += chunkSize) {
            chunks.push(articles.slice(i, i + chunkSize));
        }
        return chunks;
    };

    const articleChunks = chunkArticles(articles, 8);

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
        <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
            <SEO
                title={`${category?.name || 'Danh mục'} - Sign Board`}
                description={category?.description || `Khám phá các bài viết về ${category?.name || 'biển quảng cáo'} từ Sign Board.`}
                keywords={`${category?.name || ''}, biển quảng cáo, bảng hiệu, sign board, ${category?.slug || ''}`}
                url={window.location.href}
            />

            {/* Breadcrumb */}
            <Breadcrumb style={{ marginBottom: '20px' }}>
                <Breadcrumb.Item>
                    <Link to="/">Trang chủ</Link>
                </Breadcrumb.Item>
                {parentCategory && (
                    <Breadcrumb.Item>
                        <Link to={`/${parentCategory.slug}?id=${parentCategory.id}`}>
                            {parentCategory.name}
                        </Link>
                    </Breadcrumb.Item>
                )}
                {category && (
                    <Breadcrumb.Item>{category.name}</Breadcrumb.Item>
                )}
            </Breadcrumb>

            {/* Category Header */}
            {category && (
                <div style={{
                    textAlign: 'center',
                    marginBottom: '50px',
                    padding: '40px 20px',
                    background: 'linear-gradient(135deg, #004D40 0%, #00796B 100%)',
                    borderRadius: '20px',
                    color: 'white',
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                        zIndex: 1,
                    }}></div>
                    <div style={{ position: 'relative', zIndex: 2 }}>
                        <Title level={1} style={{
                            color: 'white',
                            fontSize: '3rem',
                            fontWeight: '700',
                            marginBottom: '15px',
                            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                        }}>
                             {category.name}
                        </Title>
                        {category.description && (
                            <Text style={{
                                fontSize: '1.2rem',
                                opacity: 0.9,
                                lineHeight: '1.6',
                                maxWidth: '800px',
                                display: 'block',
                                margin: '0 auto',
                            }}>
                                {category.description}
                            </Text>
                        )}
                        {articles.length > 0 && (
                            <div style={{ marginTop: '20px' }}>
                                <Text style={{
                                    color: 'white',
                                    fontSize: '1rem',
                                    marginBottom: '15px',
                                    display: 'block',
                                    opacity: 0.9,
                                }}>
                                    Bài viết nổi bật:
                                </Text>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                                    {articleChunks.map((chunk, chunkIndex) => (
                                        <div key={chunkIndex} style={{
                                            background: 'rgba(255, 255, 255, 0.1)',
                                            borderRadius: '15px',
                                            padding: '20px',
                                            backdropFilter: 'blur(10px)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)'
                                        }}>
                                            <ArticleCarousel
                                                items={chunk}
                                                title=""
                                                titleLevel={3}
                                                autoSlideInterval={5000}
                                                cardWidth="calc(100% / 8 - 15px)"
                                                maxCardWidth="200px"
                                                cardHeight="280px"
                                                imageHeight="120px"
                                                containerStyle={{
                                                    padding: '20px 15px',
                                                    background: 'transparent',
                                                    marginTop: '10px'
                                                }}
                                                cardStyle={{
                                                    borderRadius: '8px',
                                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                                    transition: 'all 0.3s ease'
                                                }}
                                                titleStyle={{
                                                    color: '#004D40',
                                                    fontSize: '1.2rem',
                                                    fontWeight: '600'
                                                }}
                                                enableAutoSlide={true}
                                                enableSwipe={true}
                                                enableDrag={true}
                                                gap="10px"
                                                responsive={{
                                                    1200: { itemsPerView: 8, gap: '10px' },
                                                    1024: { itemsPerView: 6, gap: '8px' },
                                                    768: { itemsPerView: 4, gap: '8px' },
                                                    480: { itemsPerView: 2, gap: '8px' }
                                                }}
                                                renderCard={(article, index) => {
                                                    // Define processArticleContent locally within renderCard scope
                                                    const processArticleContent = (content) => {
                                                        if (!content) return '';
                                                        const textContent = content.replace(/<[^>]*>/g, '');
                                                        return textContent.length > 150 ? `${textContent.substring(0, 150)}...` : textContent;
                                                    };

                                                    return (
                                                        <Card
                                                            hoverable
                                                            className="article-card"
                                                            style={{
                                                                borderRadius: '8px',
                                                                overflow: 'hidden',
                                                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                                                transition: 'all 0.3s ease',
                                                                minHeight: '280px'
                                                            }}
                                                            cover={
                                                                article.imageBase64 ? (
                                                                    <LazyImage
                                                                        src={`data:image/jpeg;base64,${article.imageBase64}`}
                                                                        alt={`Hình ảnh bài viết: ${article.title}`}
                                                                        style={{
                                                                            height: '120px',
                                                                            objectFit: 'cover',
                                                                            borderRadius: '8px 8px 0 0',
                                                                        }}
                                                                        onError={(e) => {
                                                                            e.target.style.display = 'none';
                                                                        }}
                                                                    />
                                                                ) : (
                                                                    <div style={{
                                                                        height: '120px',
                                                                        background: `linear-gradient(135deg, #004D40, #00796B)`,
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        borderRadius: '8px 8px 0 0'
                                                                    }}>
                                                                        <span style={{
                                                                            color: 'white',
                                                                            fontSize: '1.5rem',
                                                                            opacity: 0.7
                                                                        }}>
                                                                            📄
                                                                        </span>
                                                                    </div>
                                                                )
                                                            }
                                                        >
                                                            <Card.Meta
                                                                title={
                                                                    <div style={{
                                                                        color: '#004D40',
                                                                        fontSize: '0.85rem',
                                                                        fontWeight: '600',
                                                                        marginBottom: '8px',
                                                                        overflow: 'hidden',
                                                                        textOverflow: 'ellipsis',
                                                                        whiteSpace: 'nowrap',
                                                                    }}>
                                                                        📝 {article.title}
                                                                    </div>
                                                                }
                                                                description={
                                                                    <div
                                                                        className="article-card-description"
                                                                        data-text={processArticleContent(article.content)}
                                                                    >
                                                                        📄 {processArticleContent(article.content)}
                                                                    </div>
                                                                }
                                                            />
                                                            <div style={{ marginTop: '8px' }}>
                                                                <Link to={article.slug ? `/news/${article.slug}` : `/news/detail/${article.id}`}>
                                                                    🔗 Đọc thêm →
                                                                </Link>
                                                            </div>
                                                        </Card>
                                                    );
                                                }}
                                                emptyMessage="Chưa có bài viết nào trong danh mục này"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Loading More Indicator */}
            {loadingMore && (
                <div style={{
                    textAlign: 'center',
                    padding: '40px 20px',
                    background: 'rgba(0, 77, 64, 0.05)',
                    borderRadius: '15px',
                    marginTop: '20px'
                }}>
                    <Spin size="large" />
                    <div style={{ marginTop: '10px', color: '#004D40', fontSize: '1rem' }}>
                        Đang tải thêm bài viết...
                    </div>
                </div>
            )}

            {/* Subcategories Section */}
            {subcategories.length > 0 && (
                <div style={{ marginTop: '50px' }}>
                    
                    {subcategories.map((subcategory) => (
                        <div key={subcategory.id} style={{ marginBottom: '60px' }}>
                            <div style={{
                                textAlign: 'center',
                                marginBottom: '30px',
                                padding: '30px 20px',
                                background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                                borderRadius: '15px',
                                border: '1px solid #dee2e6',
                            }}>
                                <Title level={3} style={{
                                    color: '#004D40',
                                    fontSize: '2rem',
                                    fontWeight: '600',
                                    marginBottom: '10px',
                                }}>
                                     {subcategory.name}
                                </Title>
                                {subcategory.description && (
                                    <Text style={{
                                        fontSize: '1rem',
                                        color: '#666',
                                        lineHeight: '1.6',
                                    }}>
                                        {subcategory.description}
                                    </Text>
                                )}
                                {subcategory.articles && subcategory.articles.length > 0 && (
                                    <div style={{ marginTop: '20px' }}>
                                        <Text style={{
                                            color: '#004D40',
                                            fontSize: '0.9rem',
                                            marginBottom: '10px',
                                            display: 'block',
                                            fontWeight: '500',
                                        }}>
                                            Bài viết nổi bật:
                                        </Text>
                                        {(() => {
                                            const subcategoryArticleChunks = chunkArticles(subcategory.articles, 8);
                                            return (
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                                                    {subcategoryArticleChunks.map((chunk, chunkIndex) => (
                                                        <div key={chunkIndex} style={{
                                                            background: 'rgba(0, 77, 64, 0.05)',
                                                            borderRadius: '12px',
                                                            padding: '15px',
                                                            border: '1px solid rgba(0, 77, 64, 0.1)'
                                                        }}>
                                                            <ArticleCarousel
                                                                items={chunk}
                                                                title=""
                                                                titleLevel={4}
                                                                autoSlideInterval={4000}
                                                                cardWidth="calc(100% / 8 - 12px)"
                                                                maxCardWidth="220px"
                                                                cardHeight="260px"
                                                                imageHeight="110px"
                                                                containerStyle={{
                                                                    padding: '15px 0',
                                                                    background: 'transparent'
                                                                }}
                                                                cardStyle={{
                                                                    borderRadius: '8px',
                                                                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                                                    transition: 'all 0.3s ease'
                                                                }}
                                                                enableAutoSlide={true}
                                                                enableSwipe={true}
                                                                enableDrag={true}
                                                                gap="8px"
                                                                responsive={{
                                                                    1200: { itemsPerView: 8, gap: '8px' },
                                                                    1024: { itemsPerView: 6, gap: '6px' },
                                                                    768: { itemsPerView: 4, gap: '6px' },
                                                                    480: { itemsPerView: 2, gap: '6px' }
                                                                }}
                                                                renderCard={(article, index) => {
                                                                    // Define processArticleContent locally within renderCard scope
                                                                    const processArticleContent = (content) => {
                                                                        if (!content) return '';
                                                                        const textContent = content.replace(/<[^>]*>/g, '');
                                                                        return textContent.length > 150 ? `${textContent.substring(0, 150)}...` : textContent;
                                                                    };

                                                                    return (
                                                                        <Card
                                                                            hoverable
                                                                            className="article-card"
                                                                            style={{
                                                                                borderRadius: '8px',
                                                                                overflow: 'hidden',
                                                                                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                                                                transition: 'all 0.3s ease',
                                                                                minHeight: '260px'
                                                                            }}
                                                                            cover={
                                                                                article.imageBase64 ? (
                                                                                    <LazyImage
                                                                                        src={`data:image/jpeg;base64,${article.imageBase64}`}
                                                                                        alt={`Hình ảnh bài viết: ${article.title}`}
                                                                                        style={{
                                                                                            height: '110px',
                                                                                            objectFit: 'cover',
                                                                                            borderRadius: '8px 8px 0 0',
                                                                                        }}
                                                                                        onError={(e) => {
                                                                                            e.target.style.display = 'none';
                                                                                        }}
                                                                                    />
                                                                                ) : (
                                                                                    <div style={{
                                                                                        height: '110px',
                                                                                        background: `linear-gradient(135deg, #00796B, #26A69A)`,
                                                                                        display: 'flex',
                                                                                        alignItems: 'center',
                                                                                        justifyContent: 'center',
                                                                                        borderRadius: '8px 8px 0 0'
                                                                                    }}>
                                                                                        <span style={{
                                                                                            color: 'white',
                                                                                            fontSize: '1.2rem',
                                                                                            opacity: 0.7
                                                                                        }}>
                                                                                            📄
                                                                                        </span>
                                                                                    </div>
                                                                                )
                                                                            }
                                                                        >
                                                                            <Card.Meta
                                                                                title={
                                                                                    <div style={{
                                                                                        color: '#004D40',
                                                                                        fontSize: '0.8rem',
                                                                                        fontWeight: '600',
                                                                                        marginBottom: '6px',
                                                                                        overflow: 'hidden',
                                                                                        textOverflow: 'ellipsis',
                                                                                        whiteSpace: 'nowrap',
                                                                                    }}>
                                                                                        📝 {article.title}
                                                                                    </div>
                                                                                }
                                                                                description={
                                                                                    <div
                                                                                        className="article-card-description"
                                                                                        data-text={processArticleContent(article.content)}
                                                                                    >
                                                                                        📄 {processArticleContent(article.content)}
                                                                                    </div>
                                                                                }
                                                                            />
                                                                            <div style={{ marginTop: '8px' }}>
                                                                                <Link to={article.slug ? `/news/${article.slug}` : `/news/detail/${article.id}`}>
                                                                                    🔗 Đọc thêm →
                                                                                </Link>
                                                                            </div>
                                                                        </Card>
                                                                    );
                                                                }}
                                                                emptyMessage={`Chưa có bài viết nào trong danh mục ${subcategory.name}`}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            );
                                        })()}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Empty State */}
            {articles.length === 0 && subcategories.length === 0 && (
                <div style={{
                    textAlign: 'center',
                    padding: '80px 20px',
                    background: '#f8f9fa',
                    borderRadius: '20px',
                    marginTop: '50px',
                }}>
                    <div style={{
                        fontSize: '4rem',
                        marginBottom: '20px',
                        opacity: 0.5,
                    }}>
                        📂
                    </div>
                    <Title level={3} style={{ color: '#666', marginBottom: '10px' }}>
                        Chưa có nội dung nào
                    </Title>
                    <Text style={{ color: '#999' }}>
                        Danh mục này hiện đang được cập nhật. Vui lòng quay lại sau!
                    </Text>
                </div>
            )}
        </div>
    );
};

export default ArticleCategoryClientPage;