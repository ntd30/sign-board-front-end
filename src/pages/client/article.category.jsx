import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { fetchArticleCategoryTreeAPI, getAllArticlesByCategoryAndSubcategoriesWithSearchAPI } from '../../services/api.service';
import { Card, Typography, Spin, Alert, Breadcrumb, Pagination, Skeleton, Grid } from 'antd';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import SEO from '../../components/common/SEO';
import LazyImage from '../../components/common/LazyImage';
import ArticleCarousel from '../../components/common/ArticleCarousel';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

// =================================================================
// 1. TỐI ƯU UX: SKELETON LOADER
// =================================================================

const SkeletonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  
  @media (min-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 992px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: 1200px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const PageWrapper = styled.div`
  padding: 16px 12px; 
  max-width: 1400px; 
  margin: 0 auto; 
  font-family: 'Inter', sans-serif;
  width: 100%;
  animation: ${keyframes`
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  `} 0.5s ease-out;

  @media (min-width: 768px) {
    padding: 24px 20px;
  }
  @media (min-width: 992px) {
    padding: 32px 24px;
  }
`;

const CategoryPageSkeleton = () => (
  <PageWrapper>
    <Skeleton active paragraph={{ rows: 1 }} style={{ width: '30%', marginBottom: '24px' }} />
    <Skeleton.Input active block style={{ height: 250, marginBottom: '40px', borderRadius: '12px' }} />
    <SkeletonGrid>
      {[...Array(10)].map((_, i) => (
        <Card key={i}>
          <Skeleton active paragraph={{ rows: 3 }} />
        </Card>
      ))}
    </SkeletonGrid>
  </PageWrapper>
);

// =================================================================
// 2. TÁI SỬ DỤNG UI: COMPONENT CARD BÀI VIẾT
// =================================================================

const StyledCard = styled(Card)`
  transition: all 0.3s ease;
  border-radius: var(--radius-md, 12px);
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--white, #FFFFFF);
  box-shadow: var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.12));
  border: 1px solid rgba(0,0,0,0.05);

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md, 0 4px 12px rgba(0,0,0,0.1));
    border-color: rgba(0,121,107,0.2);
  }

  .ant-card-cover {
    position: relative;
    padding-top: 60%; // Tỷ lệ 5:3
    overflow: hidden;
    background-color: #f8f9fa;
  }

  .ant-card-body {
    padding: var(--spacing-md, 16px);
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
  
  /* === SỬA LỖI HOVER IMAGE === */
  /* Target trực tiếp thẻ <img> bên trong để xử lý transition */
  .ant-card-cover img {
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Khi hover card, phóng to thẻ img */
  &:hover .ant-card-cover img {
    transform: scale(1.08);
  }
`;

const ImageGradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60%;
  background: linear-gradient(to top, rgba(0,0,0,0.5), transparent);
  z-index: 1; // Đảm bảo ở trên ảnh
`;

const CardTitle = styled(Title)`
  color: #004D40 !important;
  font-size: 1rem !important; // Cỡ chữ nhất quán
  font-weight: 700 !important;
  margin-bottom: 10px !important;
  line-height: 1.4;
  
  // Cắt bớt nếu quá 2 dòng
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// Tốt hơn hàm processArticleContent vì dùng CSS, không cắt ngang chữ
const CardDescription = styled.div`
  color: var(--text-secondary, #666666);
  font-size: 0.9rem;
  line-height: 1.5;
  flex-grow: 1; // Đẩy link "Xem thêm" xuống dưới
  
  // Cắt bớt nếu quá 3 dòng
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ReadMoreLink = styled(Link)`
  color: #00796B;
  font-weight: 500;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  margin-top: auto; // Luôn ở dưới cùng
  padding-top: 12px;

  span {
    transition: transform 0.2s ease;
  }
  
  &:hover {
    color: #005a4e;
    span {
      transform: translateX(4px);
    }
  }
`;

// === COMPONENT CARD ĐÃ SỬA LỖI ===
const ArticleCardComponent = ({ article }) => {
  if (!article) return null;
  
  // Lấy nội dung text thuần túy từ HTML
  const descriptionText = article.content?.replace(/<[^>]*>/g, '') || 'Chưa có mô tả';

  return (
    <StyledCard
      hoverable
      cover={
        <>
          {/* Dùng <LazyImage> và truyền 'style' trực tiếp */}
          <LazyImage
            src={`data:image/webp;base64,${article.imageBase64}`}
            alt={`Hình ảnh bài viết: ${article.title}`}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <ImageGradient />
        </>
      }
    >
      <Card.Meta
        title={
          <CardTitle level={5}>
            📝 {article.title}
          </CardTitle>
        }
        description={
          <CardDescription>
            {descriptionText}
          </CardDescription>
        }
      />
      <ReadMoreLink to={article.slug ? `/news/${article.slug}` : `/news/detail/${article.id}`}>
        Xem thêm
        <span style={{ marginLeft: '4px' }}>→</span>
      </ReadMoreLink>
    </StyledCard>
  );
};


// =================================================================
// 3. STYLED COMPONENTS CHO TRANG CHÍNH
// =================================================================

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ErrorWrapper = styled.div`
  padding: 50px 20px;
  text-align: center;
  max-width: 800px;
  margin: 40px auto;
`;

const StyledBreadcrumb = styled(Breadcrumb)`
  font-size: 0.9rem;
  margin-bottom: 24px;
  font-weight: 500;

  a {
    color: var(--text-secondary, #666);
    transition: color 0.3s ease;
    &:hover {
      color: var(--primary-color, #00796B) !important;
    }
  }
  
  & > span:last-child {
    color: var(--text-primary, #333);
    font-weight: 600;
  }
`;

const CategoryHeader = styled.div`
  text-align: center;
  margin: 0 -12px 40px; // Mở rộng ra cạnh
  padding: 40px 16px;
  background: linear-gradient(135deg, #004D40 0%, #00796B 100%);
  color: #FFFFFF;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);

  @media (min-width: 768px) {
    margin: 0 0 60px; // Không cần tràn cạnh nữa
    padding: 60px 20px;
    border-radius: 24px; // Bo góc trên desktop
  }
`;

const HeaderTitle = styled(Title)`
  color: #FFFFFF !important;
  font-size: 2rem !important;
  font-weight: 800 !important;
  margin: 0 0 12px !important;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  line-height: 1.2;

  @media (min-width: 576px) {
    font-size: 2.5rem !important;
  }
  @media (min-width: 768px) {
    font-size: 3rem !important;
    margin-bottom: 16px !important;
  }
  @media (min-width: 992px) {
    font-size: 3.5rem !important;
  }
`;

const ArticleCount = styled.div`
  font-size: 1rem; 
  font-weight: 400; 
  color: #E6F0FA; 
  opacity: 0.9;
  margin-top: 8px;

  @media (min-width: 576px) {
    font-size: 1.2rem;
  }
  @media (min-width: 768px) {
    font-size: 1.3rem;
    margin-top: 12px;
  }
`;

const CategoryDescription = styled(Text)`
  font-size: 0.95rem;
  color: #F0F7FF !important;
  opacity: 0.9;
  line-height: 1.7;
  max-width: 900px;
  margin: 0 auto;
  display: inline-block;
  padding: 0 16px;

  @media (min-width: 576px) {
    font-size: 1.1rem;
    padding: 0 24px;
  }
  @media (min-width: 768px) {
    font-size: 1.2rem;
    padding: 0 32px;
  }
`;

const FeaturedCarouselWrapper = styled.div`
  margin-top: 30px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px 10px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: ${fadeIn} 0.5s ease-in;
`;

// Đây là phần quan trọng nhất cho Responsive
const ArticleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); // 2 cột trên mobile
  gap: 16px;
  margin: 20px 0 40px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr); // 3 cột trên tablet
    gap: 20px;
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr); // 4 cột
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(5, 1fr); // 5 cột trên desktop
  }
`;

const PaginationWrapper = styled.div`
  text-align: center; 
  margin: 40px 0;
  padding: 0 8px;

  .total-text {
    display: block;
    margin-bottom: 16px;
    font-size: 0.95rem;
  }

  // CSS cho component Antd Pagination
  .ant-pagination {
    .ant-pagination-item, 
    .ant-pagination-prev, 
    .ant-pagination-next {
      min-width: 32px;
      height: 32px;
      line-height: 30px;
    }
    .ant-pagination-item-active {
      border-color: #00796B;
      a {
        color: #00796B;
      }
    }
  }

  @media (min-width: 576px) {
    padding: 0;
    margin: 48px 0 32px;

    .total-text {
      display: inline-block;
      margin-bottom: 20px;
      margin-right: 16px;
      font-size: 1rem;
    }
  }
`;

const SubcategorySection = styled.div`
  margin-top: 60px;
`;

const SubcategoryHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
  padding: 30px 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 15px;
  border: 1px solid #dee2e6;
  animation: ${fadeIn} 0.5s ease;

  .subcategory-title {
    color: #004D40;
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 10px;
    @media (min-width: 768px) {
      font-size: 2.2rem;
    }
  }

  .subcategory-description {
    font-size: 1rem;
    color: #666666;
    line-height: 1.6;
  }
`;

const EmptyStateWrapper = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: #f8f9fa;
  border-radius: 20px;
  margin-top: 50px;
  animation: ${fadeIn} 0.5s ease-in;

  .icon {
    font-size: 4rem;
    margin-bottom: 20px;
    opacity: 0.5;
    color: #666666;
  }
`;


// =================================================================
// 4. COMPONENT TRANG CHÍNH ĐÃ ĐƯỢC REFACTOR
// =================================================================

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
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // 5 per row x 2 rows
  const [totalItems, setTotalItems] = useState(0);
  const [isPaged, setIsPaged] = useState(false);
  const screens = useBreakpoint();

  const currentSlug = childSlug || parentSlug || slug;
  const categoryId = searchParams.get('id');

  useEffect(() => {
    // Scroll về đầu trang khi categoryId hoặc currentPage thay đổi
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (categoryId) {
      loadData();
    } else {
      setError('Không tìm thấy ID danh mục');
      setLoading(false);
    }
  }, [categoryId, currentPage]); // Bỏ slug, parentSlug vì categoryId là duy nhất

  const loadData = async () => {
    setLoading(true);
    setError(null);
    setArticles([]); // Xóa bài viết cũ trước khi tải
    setSubcategories([]); // Xóa danh mục con cũ

    try {
      // 1. Tải cây danh mục
      const categoryRes = await fetchArticleCategoryTreeAPI();
      let localCategoryTree = [];
      if (categoryRes?.data && Array.isArray(categoryRes.data)) {
        localCategoryTree = categoryRes.data;
        setCategoryTree(localCategoryTree);
      } else {
        setError('Không thể tải dữ liệu danh mục');
        setLoading(false);
        return;
      }

      // 2. Tải bài viết theo trang
      const articlesRes = await getAllArticlesByCategoryAndSubcategoriesWithSearchAPI(
        categoryId,
        currentPage - 1, 
        pageSize
      );

      if (articlesRes?.data) {
        const data = articlesRes.data;
        
        // 3. Xử lý dữ liệu trả về
        // Case 1: Dữ liệu trả về có phân trang (dạng { content: [], totalElements: ... })
        if (Array.isArray(data.content)) {
          setArticles(data.content);
          const total =
            (typeof data.totalElements === 'number' ? data.totalElements : undefined) ??
            (typeof data.total === 'number' ? data.total : undefined) ??
            (Array.isArray(data.content) ? data.content.length : 0);
          
          setTotalItems(total);
          setIsPaged(true);

          // Tìm thông tin category từ tree đã fetch
          const findCategoryInTree = (nodes, id) => {
            for (const node of nodes) {
              if (node.id.toString() === id.toString()) return { node, parent: null };
              if (node.children) {
                const found = findCategoryInTree(node.children, id);
                if (found.node) return { node: found.node, parent: found.parent || node };
              }
            }
            return { node: null, parent: null };
          };
          
          const { node: foundCategory, parent: foundParent } = findCategoryInTree(localCategoryTree, categoryId);
          
          if(foundCategory) {
            setCategory(foundCategory);
            if (foundParent) {
              setParentCategory({
                id: foundParent.id,
                name: foundParent.name,
                slug: foundParent.slug,
              });
            } else {
              setParentCategory(null);
            }
          }

        } 
        // Case 2: Dữ liệu trả về dạng object category (chứa articles, subcategories bên trong)
        // (Logic này của bạn giữ nguyên phòng trường hợp API trả về kiểu khác)
        else if (data.id) {
          const categoryData = data;
          setCategory(categoryData);
          setSubcategories(categoryData.subcategories || []);
          setArticles(Array.isArray(categoryData.articles) ? categoryData.articles : []);
          
          const total =
            (typeof categoryData.totalElements === 'number' ? categoryData.totalElements : undefined) ??
            (typeof categoryData.total === 'number' ? categoryData.total : undefined) ??
            (typeof categoryData.totalArticles === 'number' ? categoryData.totalArticles : undefined) ??
            (typeof categoryData.totalChildrenArticlesCount === 'number' ? categoryData.totalChildrenArticlesCount : undefined) ??
            (typeof categoryData.articleCount === 'number' ? categoryData.articleCount : undefined) ??
            (Array.isArray(categoryData.articles) ? categoryData.articles.length : 0);
          
          setTotalItems(total);
          setIsPaged(total > pageSize); // Tự quyết định có phân trang hay không

          if (categoryData.parentId && categoryData.parentName) {
            setParentCategory({
              id: categoryData.parentId,
              name: categoryData.parentName,
              slug: categoryData.parentSlug,
            });
          }
        } else {
           setError('Không thể tải dữ liệu bài viết (định dạng không đúng)');
        }
      } else {
        setError('Không thể tải dữ liệu bài viết');
      }
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu:", err);
      setError('Có lỗi xảy ra khi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  // 1. Dùng SKELETON LOADER
  if (loading) {
    return <CategoryPageSkeleton />;
  }

  // 2. Dùng ERROR WRAPPER
  if (error) {
    return (
      <ErrorWrapper>
        <Alert message="Lỗi" description={error} type="error" showIcon />
      </ErrorWrapper>
    );
  }

  // 3. Dùng CÁC STYLED COMPONENT
  return (
    <>
      <PageWrapper>
        <SEO
          title={`${category?.name || 'Danh mục'} - Sign Board`}
          description={category?.description || `Khám phá các bài viết về ${category?.name || 'biển quảng cáo'} từ Sign Board.`}
          keywords={`${category?.name || ''}, biển quảng cáo, bảng hiệu, sign board, ${category?.slug || ''}`}
          url={window.location.href}
        />

        {/* Breadcrumb */}
        <StyledBreadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Trang chủ</Link>
          </Breadcrumb.Item>
          {parentCategory && parentCategory.slug && parentCategory.id && (
            <Breadcrumb.Item>
              <Link to={`/${parentCategory.slug}?id=${parentCategory.id}`}>
                {parentCategory.name}
              </Link>
            </Breadcrumb.Item>
          )}
          {category && (
            <Breadcrumb.Item>{category.name}</Breadcrumb.Item>
          )}
        </StyledBreadcrumb>

        {/* Category Header */}
        {category && (
          <CategoryHeader>
            <HeaderTitle level={1}>
              {category.name}
              <ArticleCount>
                {/* Dùng totalItems vì nó chính xác nhất với dữ liệu đang hiển thị */}
                {totalItems} bài viết 
              </ArticleCount>
            </HeaderTitle>
            {category.description && (
              <CategoryDescription>
                {category.description}
              </CategoryDescription>
            )}
            
            {/* Carousel bài viết nổi bật (chỉ hiển thị nếu có bài viết) */}
            {articles.length > 0 && (
              <FeaturedCarouselWrapper>
                <Text style={{ color: '#FFFFFF', fontSize: '1.1rem', marginBottom: '20px', display: 'block', fontWeight: '500' }}>
                  Bài viết nổi bật:
                </Text>
                
                {/* ====================================================== */}
                {/* === NƠI BẠN YÊU CẦU SỬA (10 -> 5) === */}
                {/* ====================================================== */}
                <ArticleCarousel
                  items={articles.slice(0, 5)} // <-- ĐÃ SỬA THÀNH 5 BÀI
                  title=""
                  autoSlideInterval={5000}
                  gap="10px"
                  responsive={{
                    1200: { itemsPerView: 5, gap: '10px' },
                    1024: { itemsPerView: 4, gap: '8px' },
                    768: { itemsPerView: 3, gap: '8px' },
                    480: { itemsPerView: 2, gap: '8px' },
                    0: { itemsPerView: 2, gap: '8px' }, // Đảm bảo mobile cũng 2 cột
                  }}
                  // DÙNG COMPONENT TÁI SỬ DỤNG
                  renderCard={(article) => <ArticleCardComponent article={article} />}
                  emptyMessage="Chưa có bài viết nào"
                />
              </FeaturedCarouselWrapper>
            )}
          </CategoryHeader>
        )}

        {/* Main Articles Grid: ĐÃ RESPONSIVE */}
        {articles && articles.length > 0 && (
          <ArticleGrid>
            {articles.map((article) => (
              // DÙNG COMPONENT TÁI SỬ DỤNG
              <ArticleCardComponent key={article.id} article={article} />
            ))}
          </ArticleGrid>
        )}

        {/* Pagination: ĐÃ RESPONSIVE */}
        {category && totalItems > pageSize && (
          <PaginationWrapper>
            <Text strong className="total-text">
              Trang {currentPage} / {Math.ceil(totalItems / pageSize)}
            </Text>
            <Pagination
              current={currentPage}
              total={totalItems}
              pageSize={pageSize}
              showTotal={!screens.xs ? (total, range) => `${range[0]}-${range[1]} trong ${total} bài viết` : null}
              onChange={(page) => {
                setCurrentPage(page);
                // useEffect đã xử lý scroll to top
              }}
              showSizeChanger={false}
              showLessItems={screens.xs} // Hiển thị ít item hơn trên mobile
              responsive={true}
            />
          </PaginationWrapper>
        )}

        {/* Subcategories Section */}
        {subcategories.length > 0 && (
          <SubcategorySection>
            {subcategories.map((subcategory) => (
              <div key={subcategory.id} style={{ marginBottom: '60px' }}>
                <SubcategoryHeader>
                  <Title level={3} className="subcategory-title">
                    {subcategory.name}
                  </Title>
                  {subcategory.description && (
                    <Text className="subcategory-description">
                      {subcategory.description}
                    </Text>
                  )}
                </SubcategoryHeader>

                {subcategory.articles && subcategory.articles.length > 0 && (
                  <ArticleCarousel
                    items={subcategory.articles}
                    title=""
                    autoSlideInterval={4500}
                    gap="10px"
                    responsive={{
                      1200: { itemsPerView: 5, gap: '10px' },
                      1024: { itemsPerView: 4, gap: '8px' },
                      768: { itemsPerView: 3, gap: '8px' },
                      480: { itemsPerView: 2, gap: '8px' },
                      0: { itemsPerView: 2, gap: '8px' }, // Đảm bảo mobile cũng 2 cột
                    }}
                    // DÙNG COMPONENT TÁI SỬ DỤNG
                    renderCard={(article) => <ArticleCardComponent article={article} />}
                    emptyMessage={`Chưa có bài viết nào trong ${subcategory.name}`}
                  />
                )}
              </div>
            ))}
          </SubcategorySection>
        )}

        {/* Empty State */}
        {articles.length === 0 && subcategories.length === 0 && (
          <EmptyStateWrapper>
            <div className="icon">📂</div>
            <Title level={3} style={{ color: '#333333', marginBottom: '10px' }}>
              Chưa có nội dung nào
            </Title>
            <Text style={{ color: '#666666', fontSize: '1.1rem' }}>
              Danh mục này hiện đang được cập nhật. Vui lòng quay lại sau!
            </Text>
          </EmptyStateWrapper>
        )}
        
      </PageWrapper>
    </>
  );
};

export default ArticleCategoryClientPage;