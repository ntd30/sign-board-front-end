import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticleCategoryTreeAPI, fetchArticlesByCategorySlugAPI } from '../../services/api.service';
import { Row, Col, Card, Typography, Spin, Alert, Breadcrumb, Button } from 'antd';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import LazyImage from '../../components/common/LazyImage';

const { Title, Text } = Typography;

const ArticleCategoryClientPage = () => {
    const { slug, parentSlug, childSlug } = useParams();
    const [category, setCategory] = useState(null);
    const [parentCategory, setParentCategory] = useState(null);
    const [subcategories, setSubcategories] = useState([]);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categoryTree, setCategoryTree] = useState([]); // Lưu trữ toàn bộ category tree
    const [showDebug, setShowDebug] = useState(false); // Debug panel toggle

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
        console.log('🔍 useEffect triggered with:', { currentSlug, parentSlug, childSlug });
        if (currentSlug) {
            console.log('🚀 Loading category data for slug:', currentSlug);
            loadCategoryTree();
        } else {
            console.log('⚠️ No currentSlug available');
        }
    }, [currentSlug, parentSlug]);

    useEffect(() => {
        // Thêm CSS để style nội dung bài viết trong danh sách
        const style = document.createElement('style');
        style.innerHTML = `
            .article-card-description {
                color: #666 !important;
                font-size: 14px !important;
                line-height: 1.5 !important;
                margin: 0 !important;
                padding: 0 !important;
            }

            .article-card-description * {
                display: none !important;
            }

            .article-card-description::before {
                content: attr(data-text);
                display: block !important;
                color: #666 !important;
                font-size: 14px !important;
                line-height: 1.5 !important;
                white-space: pre-wrap !important;
            }

            .category-card {
                min-height: 400px;
            }

            .category-card:hover {
                transform: translateY(-10px) !important;
            }

            .category-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(45deg, rgba(255,255,255,0.05) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.05) 75%, transparent 75%, transparent);
                background-size: 30px 30px;
                opacity: 0;
                transition: opacity 0.3s ease;
                border-radius: 25px;
                pointer-events: none;
            }

            .category-card:hover::before {
                opacity: 1;
            }

                .stats-counter {
                    transition: all 0.8s ease-out;
                    opacity: 0;
                    transform: translateY(20px);
                    animation: slideInUp 1s ease-out 0.3s forwards;
                }

                @keyframes slideInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .stats-divider {
                    transition: all 0.5s ease;
                }

                .stats-divider:hover {
                    transform: scaleY(1.2);
                }
        `;

        if (!document.getElementById('article-category-styles')) {
            style.id = 'article-category-styles';
            document.head.appendChild(style);
        }

        return () => {
            const existingStyle = document.getElementById('article-category-styles');
            if (existingStyle) {
                document.head.removeChild(existingStyle);
            }
        };
    }, []);

    // Load thống kê cho các danh mục con - không cần thiết nữa vì dữ liệu đã có sẵn
    useEffect(() => {
        if (subcategories.length > 0) {
            // Không cần load stats nữa vì dữ liệu đã có sẵn trong tree
            console.log('Category stats loaded from tree data');
        }
    }, [subcategories]);

    // Hàm load dữ liệu danh mục và bài viết
    const loadCategoryTree = async () => {
        console.log('🌳 loadCategoryTree function called');
        try {
            console.log('📡 Calling fetchArticleCategoryTreeAPI...');
            const categoryRes = await fetchArticleCategoryTreeAPI();
            console.log("✅ Category tree response:", categoryRes);
            console.log("📊 Category tree data:", categoryRes.data);

            // Lưu trữ toàn bộ category tree để tính toán số liệu
            if (categoryRes?.data && Array.isArray(categoryRes.data)) {
                console.log('💾 Setting category tree with', categoryRes.data.length, 'items');
                setCategoryTree(categoryRes.data);
            } else {
                console.log('⚠️ Category tree data is not an array or is empty');
            }

            // Nếu có parentSlug và childSlug, tìm child category và parent category
            if (parentSlug && childSlug) {
                console.log('🔍 Finding parent and child categories:', { parentSlug, childSlug });
                const parentCat = findCategoryBySlug(categoryRes.data, parentSlug);
                console.log("🏆 Found parent category:", parentCat);

                if (parentCat && parentCat.children) {
                    const foundCategory = findCategoryBySlug(parentCat.children, childSlug);
                    console.log("🏆 Found child category:", foundCategory);

                    if (foundCategory) {
                        console.log('✅ Setting found child category');
                        setCategory(foundCategory);
                        setParentCategory(parentCat);
                        setSubcategories([]);
                    } else {
                        console.log('❌ Child category not found');
                        setError('Không tìm thấy danh mục bài viết con');
                    }
                } else {
                    console.log('❌ Parent category not found or has no children');
                    setError('Không tìm thấy danh mục bài viết cha');
                }
            } else {
                // Trường hợp chỉ có một slug (category cấp 1)
                console.log('🔍 Finding single category with slug:', currentSlug);
                const foundCategory = findCategoryBySlug(categoryRes.data, currentSlug);
                console.log("🏆 Found category:", foundCategory);

                if (foundCategory) {
                    console.log('✅ Setting found category');
                    setCategory(foundCategory);
                    setParentCategory(null);

                    // Lấy subcategories nếu có
                    if (foundCategory.children && foundCategory.children.length > 0) {
                        console.log('📁 Setting subcategories:', foundCategory.children.length, 'items');
                        setSubcategories(foundCategory.children);
                    } else {
                        console.log('📁 No subcategories found');
                    }
                } else {
                    console.log('❌ Category not found');
                    setError('Không tìm thấy danh mục bài viết');
                }
            }

            // Lấy articles của category này
            try {
                let articlesRes;
                if (parentSlug && childSlug) {
                    // Nếu có cả parent và child slug, lấy bài viết theo cả hai
                    console.log("📖 Fetching articles for parent:", parentSlug, "child:", childSlug);
                    articlesRes = await fetchArticlesByCategorySlugAPI(parentSlug, childSlug);
                } else {
                    // Nếu chỉ có một slug, lấy bài viết theo slug đó
                    console.log("📖 Fetching articles for slug:", currentSlug);
                    articlesRes = await fetchArticlesByCategorySlugAPI(currentSlug);
                }

                console.log("📨 Articles response:", articlesRes);
                console.log("📋 Articles data:", articlesRes.data);
                console.log("📋 Articles data type:", typeof articlesRes.data);
                console.log("📋 Is array:", Array.isArray(articlesRes.data));

                // Xử lý response từ API
                if (Array.isArray(articlesRes.data)) {
                    console.log("✅ Setting articles:", articlesRes.data.length, "items");
                    setArticles(articlesRes.data);
                } else if (typeof articlesRes.data === 'string') {
                    // Nếu API trả về message string thay vì array
                    console.log("⚠️ API returned string message:", articlesRes.data);
                    setArticles([]);
                } else if (articlesRes.data && typeof articlesRes.data === 'object') {
                    // Nếu API trả về object có thuộc tính content hoặc data
                    const articlesArray = articlesRes.data.content || articlesRes.data.data || [];
                    if (Array.isArray(articlesArray)) {
                        console.log("✅ Setting articles from object:", articlesArray.length, "items");
                        setArticles(articlesArray);
                    } else {
                        console.log("⚠️ No valid articles array found in response");
                        setArticles([]);
                    }
                } else {
                    console.log("⚠️ API returned unexpected format");
                    setArticles([]);
                }
            } catch (err) {
                console.error('❌ Error loading articles:', err);
                setArticles([]);
            }
        } catch (err) {
            console.error('❌ Error loading category data:', err);
            setError('Có lỗi xảy ra khi tải dữ liệu danh mục');
        } finally {
            console.log('🏁 Setting loading to false');
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCategoryTree();
    }, [currentSlug, parentSlug]);

    // Các hàm thống kê không cần thiết nữa vì dữ liệu đã có sẵn từ backend
    // const fetchArticleCountForCategory = ... (removed)
    // const loadCategoryStats = ... (removed)
    // Hàm lấy số lượng bài viết thực tế từ dữ liệu tree hoặc từ cache
    const getArticleCountForCategory = (categorySlug) => {
        console.log('🔍 Getting article count for slug:', categorySlug);

        // Tìm category trong tree để lấy số liệu thống kê
        const findCategoryInTree = (categories, slug) => {
            for (const cat of categories) {
                console.log('🔍 Checking category:', cat.slug, 'looking for:', slug);
                if (cat.slug === slug) {
                    console.log('✅ Found category:', cat.name);
                    console.log('📊 Category data:', {
                        totalChildrenArticlesCount: cat.totalChildrenArticlesCount,
                        articleCount: cat.articleCount,
                        childrenCount: cat.childrenCount
                    });

                    // Ưu tiên totalChildrenArticlesCount (bao gồm cả bài viết của children)
                    // Nếu không có thì fallback về articleCount (chỉ bài viết trực tiếp)
                    const count = cat.totalChildrenArticlesCount || cat.articleCount || 0;
                    console.log('🎯 Final count:', count);
                    return count;
                }
                if (cat.children && cat.children.length > 0) {
                    const found = findCategoryInTree(cat.children, slug);
                    if (found !== null) return found;
                }
            }
            return 0;
        };

        const result = findCategoryInTree(categoryTree, categorySlug);
        console.log('📊 Final result for', categorySlug, ':', result);
        return result;
    };

    // Hàm tính số lượng bài viết với loading state (cho tương lai)
    const getArticleCountWithLoading = (categorySlug) => {
        // Trong tương lai có thể implement loading state cho việc tính toán này
        return getArticleCountForCategory(categorySlug);
    };

    // Hàm xử lý nội dung bài viết - loại bỏ HTML tags và giới hạn độ dài
    const processArticleContent = (content) => {
        if (!content) return '';
        // Loại bỏ HTML tags đơn giản
        const textContent = content.replace(/<[^>]*>/g, '');
        // Giới hạn độ dài và thêm dấu ... nếu quá dài
        return textContent.length > 150 ? `${textContent.substring(0, 150)}...` : textContent;
    };

    // Hàm tính số lượng danh mục con thực tế
    const getSubcategoryCount = (categorySlug) => {
        // Tìm category trong tree để đếm số lượng children thực tế
        const findCategoryInTree = (categories, slug) => {
            for (const cat of categories) {
                if (cat.slug === slug && cat.children) {
                    return cat.children.length;
                }
                if (cat.children) {
                    const found = findCategoryInTree(cat.children, slug);
                    if (found !== null) return found;
                }
            }
            return 0;
        };

        // Sử dụng categoryTree state để tính toán chính xác
        return findCategoryInTree(categoryTree, categorySlug);
    };

    if (loading) {
        console.log('⏳ Component is loading...');
        return (
            <div style={{ padding: '50px', textAlign: 'center' }}>
                <Spin size="large" />
            </div>
        );
    }

    if (error) {
        console.log('❌ Component has error:', error);
        return (
            <div style={{ padding: '50px', textAlign: 'center' }}>
                <Alert message="Lỗi" description={error} type="error" />
            </div>
        );
    }

    console.log('🎨 Rendering component with state:', {
        category,
        parentCategory,
        subcategories: subcategories.length,
        articles: articles.length,
        categoryTree: categoryTree.length,
        loading,
        error
    });

    return (
        <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
            {/* Debug Toggle Button */}
            {process.env.NODE_ENV === 'development' && (
                <div style={{ textAlign: 'right', marginBottom: '10px' }}>
                    <Button
                        type={showDebug ? "primary" : "default"}
                        size="small"
                        onClick={() => setShowDebug(!showDebug)}
                        icon="🔍"
                    >
                        {showDebug ? 'Hide Debug' : 'Show Debug'}
                    </Button>
                </div>
            )}

            {/* Debug Panel - Chỉ hiển thị trong development */}
            {process.env.NODE_ENV === 'development' && showDebug && (
                <div style={{
                    background: '#f0f8ff',
                    border: '2px solid #00796B',
                    borderRadius: '10px',
                    padding: '15px',
                    marginBottom: '20px',
                    fontFamily: 'monospace',
                    fontSize: '12px'
                }}>
                    <div style={{ color: '#004D40', fontWeight: 'bold', marginBottom: '10px' }}>
                        🔍 DEBUG PANEL - Chỉ hiển thị trong development
                    </div>
                    <div style={{ textAlign: 'right', marginBottom: '10px' }}>
                        <Button
                            size="small"
                            type="dashed"
                            onClick={() => {
                                console.log('📋 FULL DEBUG DATA:');
                                console.log('Current state:', {
                                    currentSlug,
                                    parentSlug,
                                    childSlug,
                                    category,
                                    parentCategory,
                                    subcategories,
                                    articles,
                                    categoryTree,
                                    loading,
                                    error
                                });
                                console.log('📋 Category Tree JSON:', JSON.stringify(categoryTree, null, 2));
                                alert('Debug data exported to console!');
                            }}
                        >
                            📋 Export to Console
                        </Button>
                        <Button
                            size="small"
                            style={{ marginLeft: '5px' }}
                            onClick={() => {
                                console.log('🌳 CATEGORY TREE DEBUG:');
                                const debugTree = (categories, level = 0) => {
                                    categories.forEach(cat => {
                                        console.log(`${'  '.repeat(level)}📁 ${cat.name} (${cat.slug})`);
                                        console.log(`${'  '.repeat(level)}  📊 totalChildrenArticlesCount: ${cat.totalChildrenArticlesCount}`);
                                        console.log(`${'  '.repeat(level)}  📰 articleCount: ${cat.articleCount}`);
                                        console.log(`${'  '.repeat(level)}  👶 childrenCount: ${cat.childrenCount}`);
                                        if (cat.children && cat.children.length > 0) {
                                            debugTree(cat.children, level + 1);
                                        }
                                    });
                                };
                                if (categoryTree.length > 0) {
                                    debugTree(categoryTree);
                                }
                                alert('Category tree debug info exported to console!');
                            }}
                        >
                            🌳 Debug Tree
                        </Button>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                        <div>
                            <strong>📂 Current Slug:</strong> {currentSlug || 'None'}<br/>
                            <strong>👨‍👩‍👧‍👦 Parent Slug:</strong> {parentSlug || 'None'}<br/>
                            <strong>👶 Child Slug:</strong> {childSlug || 'None'}
                        </div>
                        <div>
                            <strong>📊 Category:</strong> {category?.name || 'Not loaded'}<br/>
                            <strong>👴 Parent Category:</strong> {parentCategory?.name || 'None'}<br/>
                            <strong>📈 Loading:</strong> {loading ? '⏳ Yes' : '✅ No'}
                        </div>
                        <div>
                            <strong>📁 Subcategories:</strong> {subcategories.length} items<br/>
                            <strong>📰 Articles:</strong> {articles.length} items<br/>
                            <strong>🌳 Category Tree:</strong> {categoryTree.length} items
                        </div>
                        <div>
                            <strong>❌ Error:</strong> {error || 'None'}<br/>
                            <strong>🔧 Component Status:</strong> {loading ? 'Loading...' : error ? 'Error' : 'Ready'}<br/>
                            <strong>🌐 Current URL:</strong> {window.location.href}
                        </div>
                        <div>
                            <strong>🔗 API Endpoints:</strong><br/>
                            <small>Tree: /api/admin/article-categories/tree</small><br/>
                            <small>Articles: /api/cms/category/{'{slug}'}</small><br/>
                            <small>Backend: {import.meta.env.VITE_BACKEND_URL || 'Not set'}</small><br/>
                            <strong>🔍 Category Search Status:</strong><br/>
                            <small style={{ color: categoryTree.length > 0 ? 'green' : 'orange' }}>
                                {categoryTree.length > 0 ? '✅ Tree loaded' : '⏳ Loading tree...'}
                            </small>
                        </div>
                    </div>
                    {categoryTree.length > 0 && (
                        <details style={{ marginTop: '10px' }}>
                            <summary style={{ cursor: 'pointer', color: '#00796B' }}>
                                📋 Category Tree Data (Click to expand)
                            </summary>
                            <pre style={{
                                background: '#fff',
                                padding: '10px',
                                borderRadius: '5px',
                                overflow: 'auto',
                                maxHeight: '200px',
                                fontSize: '10px'
                            }}>
                                {JSON.stringify(categoryTree, null, 2)}
                            </pre>
                        </details>
                    )}
                </div>
            )}
            <SEO
                title={`${category?.name || 'Danh mục'} - Sign Board`}
                description={category?.description || `Khám phá các bài viết về ${category?.name || 'biển quảng cáo'} từ Sign Board - chuyên gia biển quảng cáo hàng đầu Việt Nam.`}
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
                <div style={{
                    textAlign: 'center',
                    marginBottom: '50px',
                    padding: '40px 20px',
                    background: 'linear-gradient(135deg, #004D40 0%, #00796B 100%)',
                    borderRadius: '20px',
                    color: 'white',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                        zIndex: 1
                    }}></div>
                    <div style={{ position: 'relative', zIndex: 2 }}>
                        <Title level={1} style={{
                            color: 'white',
                            fontSize: '3rem',
                            fontWeight: '700',
                            marginBottom: '15px',
                            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
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
                                margin: '0 auto'
                            }}>
                                {category.description}
                            </Text>
                        )}
                    </div>
                </div>
            )}

            {/* Subcategories Grid */}
            {subcategories.length > 0 && (
                <div style={{ marginBottom: '50px' }}>
                    <div style={{
                        textAlign: 'center',
                        marginBottom: '40px'
                    }}>
                        <Title level={2} style={{
                            fontSize: '2.5rem',
                            fontWeight: '700',
                            color: '#004D40',
                            marginBottom: '15px',
                            position: 'relative',
                            display: 'inline-block'
                        }}>
                            Khám phá danh mục
                            <div style={{
                                width: '80px',
                                height: '4px',
                                background: 'linear-gradient(90deg, #004D40, #26A69A)',
                                margin: '15px auto 0',
                                borderRadius: '2px'
                            }}></div>
                        </Title>
                        <Text style={{
                            fontSize: '1.1rem',
                            color: '#666',
                            maxWidth: '600px',
                            display: 'block',
                            margin: '0 auto'
                        }}>
                            Chọn danh mục phù hợp để khám phá các bài viết và dịch vụ của chúng tôi
                        </Text>
                    </div>

                    <Row gutter={[32, 32]}>
                        {subcategories.map((sub, index) => (
                            <Col xs={24} sm={12} lg={8} key={sub.id}>
                                <div
                                    className="category-card"
                                    style={{
                                        position: 'relative',
                                        borderRadius: '25px',
                                        overflow: 'hidden',
                                        background: '#ffffff',
                                        transition: 'all 0.3s ease',
                                        cursor: 'pointer',
                                        boxShadow: '0 8px 25px rgba(0, 77, 64, 0.1)',
                                        height: '100%'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-10px)';
                                        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 77, 64, 0.2)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 77, 64, 0.1)';
                                    }}
                                >
                                    <Link to={`/${currentSlug}/${sub.slug}`} style={{ textDecoration: 'none' }}>
                                        {/* Card Header with Gradient Background */}
                                        <div style={{
                                            height: '160px',
                                            background: `linear-gradient(135deg, ${index % 3 === 0 ? '#004D40' : index % 3 === 1 ? '#00796B' : '#26A69A'}, ${index % 3 === 0 ? '#00796B' : index % 3 === 1 ? '#26A69A' : '#4DB6AC'})`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            position: 'relative'
                                        }}>
                                            <div style={{
                                                textAlign: 'center',
                                                color: 'white',
                                                position: 'relative',
                                                zIndex: 2
                                            }}>
                                                <div style={{
                                                    fontSize: '3.5rem',
                                                    marginBottom: '10px',
                                                    opacity: 0.8
                                                }}>
                                                    📁
                                                </div>
                                                <div style={{
                                                    fontSize: '1.3rem',
                                                    fontWeight: '600',
                                                    lineHeight: '1.2'
                                                }}>
                                                    {sub.name}
                                                </div>
                                            </div>
                                            <div style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                background: 'rgba(255, 255, 255, 0.1)',
                                                opacity: 0,
                                                transition: 'opacity 0.3s ease'
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                                            onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                                            ></div>
                                        </div>

                                        {/* Card Content */}
                                        <div style={{ padding: '25px' }}>
                                            {sub.description && (
                                                <Text style={{
                                                    color: '#666',
                                                    lineHeight: '1.6',
                                                    display: 'block',
                                                    marginBottom: '20px'
                                                }}>
                                                    {sub.description.length > 100
                                                        ? `${sub.description.substring(0, 100)}...`
                                                        : sub.description
                                                    }
                                                </Text>
                                            )}

                                            {/* Stats */}
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-around',
                                                alignItems: 'center',
                                                marginBottom: '25px',
                                                padding: '20px 15px',
                                                background: 'linear-gradient(135deg, #f8f9fa 0%, #e8f5e8 100%)',
                                                borderRadius: '15px',
                                                border: '1px solid #e0f2e0'
                                            }}>
                                                <div className="stats-counter" style={{ textAlign: 'center', flex: 1 }}>
                                                    <div style={{
                                                        fontSize: '2rem',
                                                        fontWeight: '800',
                                                        color: '#004D40',
                                                        lineHeight: '1',
                                                        marginBottom: '5px'
                                                    }}>
                                                        {getArticleCountForCategory(sub.slug)}
                                                    </div>
                                                    <div style={{
                                                        fontSize: '0.9rem',
                                                        color: '#666',
                                                        fontWeight: '500',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.5px'
                                                    }}>
                                                        {getArticleCountForCategory(sub.slug) > 0 ? 'Bài viết' : 'Chưa có bài viết'}
                                                    </div>
                                                </div>
                                                <div className="stats-divider" style={{
                                                    width: '1px',
                                                    height: '40px',
                                                    background: '#ddd',
                                                    margin: '0 10px'
                                                }}></div>
                                                <div className="stats-counter" style={{ textAlign: 'center', flex: 1 }}>
                                                    <div style={{
                                                        fontSize: '2rem',
                                                        fontWeight: '800',
                                                        color: '#00796B',
                                                        lineHeight: '1',
                                                        marginBottom: '5px'
                                                    }}>
                                                        {getSubcategoryCount(sub.slug)}
                                                    </div>
                                                    <div style={{
                                                        fontSize: '0.9rem',
                                                        color: '#666',
                                                        fontWeight: '500',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.5px'
                                                    }}>
                                                        {getSubcategoryCount(sub.slug) > 0 ? 'Danh mục con' : 'Không giới hạn'}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Action Button */}
                                            <Button
                                                type="primary"
                                                block
                                                shape="round"
                                                style={{
                                                    background: 'linear-gradient(135deg, #004D40, #00796B)',
                                                    border: 'none',
                                                    height: '45px',
                                                    fontWeight: '600',
                                                    fontSize: '1rem'
                                                }}
                                            >
                                                Khám phá ngay →
                                            </Button>
                                        </div>
                                    </Link>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            )}

            {/* Articles Section - Only show if no subcategories */}
            {articles.length > 0 && subcategories.length === 0 && (
                <div style={{ marginTop: '50px' }}>
                    <div style={{
                        textAlign: 'center',
                        marginBottom: '40px'
                    }}>
                        <Title level={2} style={{
                            fontSize: '2.5rem',
                            fontWeight: '700',
                            color: '#004D40',
                            marginBottom: '15px'
                        }}>
                            Bài viết liên quan
                        </Title>
                    </div>
                    <Row gutter={[16, 16]}>
                        {articles.map(article => (
                            <Col xs={24} sm={12} md={8} key={article.id}>
                                <Card
                                    hoverable
                                    cover={
                                        article.imageBase64 ? (
                                            <LazyImage
                                                src={`data:image/jpeg;base64,${article.imageBase64}`}
                                                alt={`Hình ảnh bài viết: ${article.title} - Biển quảng cáo từ Sign Board`}
                                                style={{ height: '200px', objectFit: 'cover' }}
                                                onError={(e) => {
                                                    console.error('Failed to load base64 image');
                                                    e.target.style.display = 'none';
                                                }}
                                            />
                                        ) : article.featuredImageUrl ? (
                                            <LazyImage
                                                src={`${import.meta.env.VITE_BACKEND_URL}${article.featuredImageUrl}`}
                                                alt={`Hình ảnh bài viết: ${article.title} - Biển quảng cáo từ Sign Board`}
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
                                            <div
                                                className="article-card-description"
                                                data-text={processArticleContent(article.content)}
                                            >
                                                {processArticleContent(article.content)}
                                            </div>
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
                <div style={{
                    textAlign: 'center',
                    padding: '80px 20px',
                    background: '#f8f9fa',
                    borderRadius: '20px',
                    marginTop: '50px'
                }}>
                    <div style={{
                        fontSize: '4rem',
                        marginBottom: '20px',
                        opacity: 0.5
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
