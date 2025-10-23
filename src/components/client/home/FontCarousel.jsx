import React, { useState, useEffect, useRef } from 'react';
import { Card, Button, Typography, Spin } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { fetchArticlesByCategorySlugAPI, fetchArticleCategoryTreeAPI } from '../../../services/api.service';
import LazyImage from '../../common/LazyImage';

const { Title, Paragraph } = Typography;

const FontCarousel = () => {
    const [fonts, setFonts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [subcategories, setSubcategories] = useState([]);
    const carouselRef = useRef(null);

    // Hàm xử lý nội dung bài viết - loại bỏ HTML tags và giới hạn độ dài
    const processArticleContent = (content) => {
        if (!content) return '';
        // Loại bỏ HTML tags đơn giản
        const textContent = content.replace(/<[^>]*>/g, '');
        // Giới hạn độ dài và thêm dấu ... nếu quá dài
        return textContent.length > 150 ? `${textContent.substring(0, 150)}...` : textContent;
    };

    // Hàm xử lý nội dung bài viết cho description - loại bỏ HTML tags và giới hạn độ dài
    const processDescription = (content) => {
        if (!content) return '';
        const textContent = content.replace(/<[^>]*>/g, '');
        return textContent.length > 100 ? `${textContent.substring(0, 100)}...` : textContent;
    };

    const fontsArray = Array.isArray(fonts) ? fonts : [];

    useEffect(() => {
        loadFonts();
    }, []);

    const loadFonts = async () => {
        try {
            setLoading(true);
            console.log('Loading fonts from API...');

            // Lấy thông tin danh mục từ category tree
            const categoryRes = await fetchArticleCategoryTreeAPI();
            console.log('Category tree response:', categoryRes);

            let subcategories = [];
            let mainCategorySlug = 'mau-chu';

            // Tìm danh mục "mau-chu" trong category tree
            if (categoryRes?.data && Array.isArray(categoryRes.data)) {
                const findCategoryBySlug = (categories, slug) => {
                    for (const category of categories) {
                        if (category.slug === slug) {
                            return category;
                        }
                        if (category.children && category.children.length > 0) {
                            const found = findCategoryBySlug(category.children, slug);
                            if (found) return found;
                        }
                    }
                    return null;
                };

                const mainCategory = findCategoryBySlug(categoryRes.data, mainCategorySlug);
                if (mainCategory && mainCategory.children && mainCategory.children.length > 0) {
                    subcategories = mainCategory.children;
                    setSubcategories(subcategories);
                    console.log('Found subcategories:', subcategories.length);
                }
            }

            // Lấy bài viết của danh mục chính và tất cả danh mục con
            let allFonts = [];

            try {
                // Lấy bài viết của danh mục chính
                console.log("📖 Fetching articles for main category:", mainCategorySlug);
                const mainCategoryResponse = await fetchArticlesByCategorySlugAPI(mainCategorySlug);
                console.log("📨 Main category response:", mainCategoryResponse);

                if (Array.isArray(mainCategoryResponse.data)) {
                    allFonts.push(...mainCategoryResponse.data);
                    console.log(`✅ Added ${mainCategoryResponse.data.length} articles from main category`);
                } else if (typeof mainCategoryResponse.data === 'object') {
                    const articlesArray = mainCategoryResponse.data.content || mainCategoryResponse.data.data || [];
                    if (Array.isArray(articlesArray)) {
                        allFonts.push(...articlesArray);
                        console.log(`✅ Added ${articlesArray.length} articles from main category (object)`);
                    }
                }

                // Nếu có danh mục con, lấy bài viết của từng danh mục con
                if (subcategories.length > 0) {
                    console.log(` Fetching articles from ${subcategories.length} subcategories`);

                    for (const subcategory of subcategories) {
                        try {
                            console.log(`📖 Fetching articles for subcategory: ${subcategory.slug}`);
                            const subcategoryResponse = await fetchArticlesByCategorySlugAPI(subcategory.slug);
                            console.log(`📨 Subcategory ${subcategory.slug} response:`, subcategoryResponse);

                            if (Array.isArray(subcategoryResponse.data)) {
                                allFonts.push(...subcategoryResponse.data);
                                console.log(`✅ Added ${subcategoryResponse.data.length} articles from subcategory ${subcategory.slug}`);
                            } else if (typeof subcategoryResponse.data === 'object') {
                                const articlesArray = subcategoryResponse.data.content || subcategoryResponse.data.data || [];
                                if (Array.isArray(articlesArray)) {
                                    allFonts.push(...articlesArray);
                                    console.log(`✅ Added ${articlesArray.length} articles from subcategory ${subcategory.slug} (object)`);
                                }
                            }
                        } catch (subErr) {
                            console.error(`❌ Error fetching articles for subcategory ${subcategory.slug}:`, subErr);
                        }
                    }
                }

                // Loại bỏ bài viết trùng lặp dựa trên ID
                const uniqueFonts = allFonts.filter((font, index, self) =>
                    index === self.findIndex(f => f.id === font.id)
                );

                console.log(`📋 Final unique fonts count: ${uniqueFonts.length}`);

                if (uniqueFonts.length > 0) {
                    // Transform API data to match component structure
                    const transformedFonts = uniqueFonts.map((article, index) => ({
                        id: article.id || index + 1,
                        title: article.title || `Mẫu chữ ${index + 1}`,
                        description: article.description || article.excerpt || 'Mô tả mẫu chữ chưa được cập nhật.',
                        thumbnail: article.thumbnail || article.imageUrl || 'https://placehold.co/300x200/004D40/ffffff?text=Chữ',
                        category: article.category || 'mau-chu',
                        slug: article.slug,
                        content: article.content,
                        featuredImageUrl: article.featuredImageUrl,
                        imageBase64: article.imageBase64
                    }));
                    setFonts(transformedFonts);
                    console.log('Fonts loaded successfully:', transformedFonts.length);
                } else {
                    // Không có dữ liệu từ API, sử dụng fallback
                    console.log('No fonts data from API, using fallback');
                    setFonts([
                        {
                            id: 1,
                            title: 'Mẫu chữ nổi 3D',
                            description: 'Chữ nổi 3D với hiệu ứng ánh sáng và chiều sâu, tạo điểm nhấn mạnh mẽ cho thương hiệu.',
                            thumbnail: 'https://placehold.co/300x200/004D40/ffffff?text=Chữ+3D',
                            category: 'mau-chu',
                        },
                        {
                            id: 2,
                            title: 'Mẫu chữ LED',
                            description: 'Chữ LED sáng tạo với hiệu ứng động, thu hút ánh nhìn cả ngày lẫn đêm.',
                            thumbnail: 'https://placehold.co/300x200/00796B/ffffff?text=Chữ+LED',
                            category: 'mau-chu',
                        },
                        {
                            id: 3,
                            title: 'Mẫu chữ inox',
                            description: 'Chữ inox cao cấp với độ bóng cao, sang trọng và bền đẹp theo thời gian.',
                            thumbnail: 'https://placehold.co/300x200/26A69A/ffffff?text=Chữ+inox',
                            category: 'mau-chu',
                        },
                        {
                            id: 4,
                            title: 'Mẫu chữ mica',
                            description: 'Chữ mica trong suốt với hiệu ứng đẹp mắt, hiện đại và tinh tế.',
                            thumbnail: 'https://placehold.co/300x200/4DB6AC/ffffff?text=Chữ+mica',
                            category: 'mau-chu',
                        }
                    ]);
                }
            } catch (err) {
                console.error('❌ Error loading fonts:', err);
                // Fallback to mock data on error
                setFonts([
                    {
                        id: 1,
                        title: 'Mẫu chữ nổi 3D',
                        description: 'Chữ nổi 3D với hiệu ứng ánh sáng và chiều sâu, tạo điểm nhấn mạnh mẽ cho thương hiệu.',
                        thumbnail: 'https://placehold.co/300x200/004D40/ffffff?text=Chữ+3D',
                    },
                    {
                        id: 2,
                        title: 'Mẫu chữ LED',
                        description: 'Chữ LED sáng tạo với hiệu ứng động, thu hút ánh nhìn cả ngày lẫn đêm.',
                        thumbnail: 'https://placehold.co/300x200/00796B/ffffff?text=Chữ+LED',
                    },
                    {
                        id: 3,
                        title: 'Mẫu chữ inox',
                        description: 'Chữ inox cao cấp với độ bóng cao, sang trọng và bền đẹp theo thời gian.',
                        thumbnail: 'https://placehold.co/300x200/26A69A/ffffff?text=Chữ+inox',
                    },
                    {
                        id: 4,
                        title: 'Mẫu chữ mica',
                        description: 'Chữ mica trong suốt với hiệu ứng đẹp mắt, hiện đại và tinh tế.',
                        thumbnail: 'https://placehold.co/300x200/4DB6AC/ffffff?text=Chữ+mica',
                    }
                ]);
            }
        } catch (error) {
            console.error('Lỗi khi tải dữ liệu mẫu chữ đẹp:', error);
            // Fallback to mock data on error
            setFonts([
                {
                    id: 1,
                    title: 'Mẫu chữ nổi 3D',
                    description: 'Chữ nổi 3D với hiệu ứng ánh sáng và chiều sâu, tạo điểm nhấn mạnh mẽ cho thương hiệu.',
                    thumbnail: 'https://placehold.co/300x200/004D40/ffffff?text=Chữ+3D',
                },
                {
                    id: 2,
                    title: 'Mẫu chữ LED',
                    description: 'Chữ LED sáng tạo với hiệu ứng động, thu hút ánh nhìn cả ngày lẫn đêm.',
                    thumbnail: 'https://placehold.co/300x200/00796B/ffffff?text=Chữ+LED',
                },
                {
                    id: 3,
                    title: 'Mẫu chữ inox',
                    description: 'Chữ inox cao cấp với độ bóng cao, sang trọng và bền đẹp theo thời gian.',
                    thumbnail: 'https://placehold.co/300x200/26A69A/ffffff?text=Chữ+inox',
                },
                {
                    id: 4,
                    title: 'Mẫu chữ mica',
                    description: 'Chữ mica trong suốt với hiệu ứng đẹp mắt, hiện đại và tinh tế.',
                    thumbnail: 'https://placehold.co/300x200/4DB6AC/ffffff?text=Chữ+mica',
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const extendedFontsArray = fontsArray.length > 0 ? [...fontsArray, ...fontsArray, ...fontsArray] : [];

    const nextSlide = () => {
        if (fontsArray.length > 0) {
            setCurrentIndex((prev) => (prev + 1) % fontsArray.length);
            if (carouselRef.current) {
                const cardWidth = carouselRef.current.children[0]?.offsetWidth || 300;
                carouselRef.current.scrollTo({
                    left: ((currentIndex + 1) % fontsArray.length) * (cardWidth + 15),
                    behavior: 'smooth'
                });
            }
        }
    };

    const prevSlide = () => {
        if (fontsArray.length > 0) {
            setCurrentIndex((prev) => {
                const prevIndex = prev - 1;
                return prevIndex < 0 ? fontsArray.length - 1 : prevIndex;
            });
            if (carouselRef.current) {
                const cardWidth = carouselRef.current.children[0]?.offsetWidth || 300;
                const prevIndex = currentIndex - 1 < 0 ? fontsArray.length - 1 : currentIndex - 1;
                carouselRef.current.scrollTo({
                    left: prevIndex * (cardWidth + 15),
                    behavior: 'smooth'
                });
            }
        }
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
        if (carouselRef.current) {
            const cardWidth = carouselRef.current.children[0]?.offsetWidth || 300;
            carouselRef.current.scrollTo({
                left: index * (cardWidth + 15),
                behavior: 'smooth'
            });
        }
    };

    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [isUserInteracting, setIsUserInteracting] = useState(false);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setIsUserInteracting(true);
        setStartPos(e.pageX - (carouselRef.current?.offsetLeft || 0));
        setScrollLeft(carouselRef.current?.scrollLeft || 0);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
        const walk = (x - startPos) * 1.5;
        if (carouselRef.current) {
            carouselRef.current.scrollLeft = scrollLeft - walk;
        }
    };

    const handleTouchStart = (e) => {
        setIsDragging(true);
        setIsUserInteracting(true);
        setStartPos(e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0));
        setScrollLeft(carouselRef.current?.scrollLeft || 0);
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        const x = e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0);
        const walk = (x - startPos) * 1.5;
        if (carouselRef.current) {
            carouselRef.current.scrollLeft = scrollLeft - walk;
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setTimeout(() => setIsUserInteracting(false), 1000);
        if (carouselRef.current) {
            const cardWidth = carouselRef.current.children[0]?.offsetWidth || 300;
            const newIndex = Math.round(carouselRef.current.scrollLeft / (cardWidth + 15));
            setCurrentIndex(newIndex % fontsArray.length);
        }
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        setTimeout(() => setIsUserInteracting(false), 1000);
        if (carouselRef.current) {
            const cardWidth = carouselRef.current.children[0]?.offsetWidth || 300;
            const newIndex = Math.round(carouselRef.current.scrollLeft / (cardWidth + 15));
            setCurrentIndex(newIndex % fontsArray.length);
        }
    };

    useEffect(() => {
        if (fontsArray.length <= 1 || isUserInteracting) return;
        const interval = setInterval(() => {
            nextSlide();
        }, 4000);
        return () => clearInterval(interval);
    }, [fontsArray.length, isUserInteracting, currentIndex]);

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <Spin size="large" />
            </div>
        );
    }

    if (fontsArray.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <p>Không có dữ liệu mẫu chữ đẹp để hiển thị.</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '60px 15px', background: 'linear-gradient(135deg, #f8f9fa 0%, #e8f5e8 100%)' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <Title level={2} style={{
                        fontSize: '2.5rem',
                        fontWeight: '700',
                        color: '#004D40',
                        marginBottom: '15px'
                    }}>
                        <span style={{ marginRight: '10px', color: '#00796B' }}></span>
                        Mẫu Chữ Đẹp
                        <div style={{
                            width: '80px',
                            height: '4px',
                            background: 'linear-gradient(90deg, #004D40, #26A69A)',
                            margin: '15px auto 0',
                            borderRadius: '2px'
                        }}></div>
                    </Title>
                </div>

                <div style={{ position: 'relative' }}>
                    <Button
                        shape="circle"
                        icon={<LeftOutlined />}
                        onClick={prevSlide}
                        className="nav-button nav-button-left"
                        style={{
                            position: 'absolute',
                            left: '-50px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 10,
                            background: 'rgba(0, 77, 64, 0.1)',
                            border: '2px solid #004D40',
                            color: '#004D40',
                            width: '50px',
                            height: '50px',
                            fontSize: '20px',
                            borderRadius: '50%'
                        }}
                    />
                    <Button
                        shape="circle"
                        icon={<RightOutlined />}
                        onClick={nextSlide}
                        className="nav-button nav-button-right"
                        style={{
                            position: 'absolute',
                            right: '-50px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 10,
                            background: 'rgba(0, 77, 64, 0.1)',
                            border: '2px solid #004D40',
                            color: '#004D40',
                            width: '50px',
                            height: '50px',
                            fontSize: '20px',
                            borderRadius: '50%'
                        }}
                    />

                    <div
                        ref={carouselRef}
                        style={{
                            display: 'flex',
                            overflowX: 'auto',
                            overflowY: 'hidden',
                            gap: '15px',
                            scrollBehavior: 'smooth',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                            padding: '0 10px',
                            cursor: isDragging ? 'grabbing' : 'grab',
                            WebkitOverflowScrolling: 'touch',
                            scrollSnapType: 'x mandatory'
                        }}
                        className="carousel-container"
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        {extendedFontsArray.map((font, index) => (
                            <div
                                key={`${font.id || index}-${Math.floor(index / fontsArray.length)}`}
                                className={`font-card-wrapper ${
                                    index % fontsArray.length === currentIndex ? 'is-active' : ''
                                }`}
                                style={{
                                    minWidth: 'calc(100% / 4 - 15px)',
                                    maxWidth: '300px',
                                    flex: '0 0 auto',
                                    scrollSnapAlign: 'center'
                                }}
                            >
                                <Card
                                    className="font-card"
                                    style={{
                                        textAlign: 'center',
                                        borderRadius: '20px',
                                        overflow: 'hidden',
                                        background: '#ffffff',
                                        position: 'relative',
                                        minHeight: '340px',
                                        boxShadow: '0 6px 24px rgba(0, 77, 64, 0.15)',
                                        transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
                                        border: 'none'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                                        e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 77, 64, 0.25)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                        e.currentTarget.style.boxShadow = '0 6px 24px rgba(0, 77, 64, 0.15)';
                                    }}
                                    cover={
                                        <Link to={font.slug ? `/news/${font.slug}` : `/news/detail/${font.id}`}>
                                        <div style={{
                                            height: '180px',
                                            // *** THAY ĐỔI 1: Bỏ nền gradient màu xanh ***
                                            // background: `linear-gradient(135deg, ${index % 2 === 0 ? '#004D40' : '#00796B'}, ${index % 2 === 0 ? '#00796B' : '#26A69A'})`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            position: 'relative',
                                            overflow: 'hidden'
                                        }}>
                                            {font.imageBase64 ? (
                                                <LazyImage
                                                    src={`data:image/jpeg;base64,${font.imageBase64}`}
                                                    alt={`Hình ảnh mẫu chữ: ${font.title || font.name} - Mẫu chữ đẹp từ Sign Board`}
                                                    style={{
                                                        // *** THAY ĐỔI 2: Hiển thị full ảnh ***
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                        // *** THAY ĐỔI 3: Bỏ borderRadius, boxShadow, transform ***
                                                        // borderRadius: '15px',
                                                        // boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                                                        transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
                                                        // transform: 'scale(0.95)'
                                                    }}
                                                    onError={(e) => {
                                                        console.error('Failed to load base64 image');
                                                        e.target.style.display = 'none';
                                                    }}
                                                />
                                            ) : font.featuredImageUrl ? (
                                                <LazyImage
                                                    src={`${import.meta.env.VITE_BACKEND_URL}${font.featuredImageUrl}`}
                                                    alt={`Hình ảnh mẫu chữ: ${font.title || font.name} - Mẫu chữ đẹp từ Sign Board`}
                                                    style={{
                                                        // *** THAY ĐỔI 2: Hiển thị full ảnh ***
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                        // *** THAY ĐỔI 3: Bỏ borderRadius, boxShadow, transform ***
                                                        // borderRadius: '15px',
                                                        // boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                                                        transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
                                                        // transform: 'scale(0.95)'
                                                    }}
                                                    onError={(e) => {
                                                        console.error('Failed to load image:', font.featuredImageUrl);
                                                        e.target.style.display = 'none';
                                                    }}
                                                />
                                            ) : font.thumbnail || font.image ? (
                                                <img
                                                    src={font.thumbnail || font.image}
                                                    alt={font.title || font.name}
                                                    style={{
                                                        // *** THAY ĐỔI 2: Hiển thị full ảnh ***
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                        // *** THAY ĐỔI 3: Bỏ borderRadius, boxShadow, transform ***
                                                        // borderRadius: '15px',
                                                        // boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                                                        transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
                                                        // transform: 'scale(0.95)'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.transform = 'scale(1.05)'; // Giữ lại hiệu ứng zoom nhỏ
                                                        e.currentTarget.style.filter = 'brightness(1.1)';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.transform = 'scale(1)'; // Trở về scale 1
                                                        e.currentTarget.style.filter = 'brightness(1)';
                                                    }}
                                                />
                                            ) : null}
                                        </div>
                                        </Link>
                                    }
                                >
                                    <div style={{ padding: '15px' }}>
                                        <Title level={3} style={{
                                            color: '#004D40',
                                            marginBottom: '10px',
                                            fontSize: '1rem',
                                            fontWeight: '600'
                                        }}>
                                            {font.title || font.name}
                                        </Title>
                                        <Paragraph style={{
                                            color: '#666',
                                            lineHeight: '1.5',
                                            fontSize: '0.85rem',
                                            marginBottom: '15px',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden'
                                        }}>
                                            {processDescription(font.description || font.content)}
                                        </Paragraph>
                                        <Link to={font.slug ? `/news/${font.slug}` : `/news/detail/${font.id}`}>
                                            <Button
                                                type="primary"
                                                shape="round"
                                                style={{
                                                    background: 'linear-gradient(135deg, #004D40, #00796B)',
                                                    border: 'none',
                                                    fontWeight: '600',
                                                    padding: '0 25px',
                                                    height: '45px',
                                                    fontSize: '0.9rem',
                                                    borderRadius: '25px',
                                                    transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                                                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 77, 64, 0.4)';
                                                    e.currentTarget.style.background = 'linear-gradient(135deg, #00796B, #004D40)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                                    e.currentTarget.style.boxShadow = 'none';
                                                    e.currentTarget.style.background = 'linear-gradient(135deg, #004D40, #00796B)';
                                                }}
                                            >
                                                Xem Chi Tiết
                                            </Button>
                                        </Link>
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </div>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '8px',
                        marginTop: '20px'
                    }}>
                        {fontsArray.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`pagination-dot ${index === currentIndex ? 'active' : ''}`}
                                style={{
                                    width: '14px',
                                    height: '14px',
                                    borderRadius: '50%',
                                    border: 'none',
                                    background: index === currentIndex ? '#004D40' : 'rgba(0, 77, 64, 0.3)',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                            />
                        ))}
                    </div>
                </div>

                <style jsx>{`
                    .font-card {
                        transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
                        transform-origin: center;
                    }

                    .font-card:hover {
                        transform: translateY(-8px) scale(1.02) !important;
                        box-shadow: 0 15px 40px rgba(0, 77, 64, 0.25) !important;
                    }

                    .carousel-container::-webkit-scrollbar {
                        display: none;
                    }

                    .carousel-container {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }

                    .nav-button {
                        opacity: 0.8;
                        transition: all 0.3s ease;
                        backdrop-filter: blur(10px);
                    }

                    .nav-button:hover {
                        opacity: 1;
                        background: rgba(0, 77, 64, 0.2) !important;
                        border-color: #00796B !important;
                        color: #00796B !important;
                        transform: scale(1.1);
                    }

                    @media (max-width: 1024px) {
                        .carousel-container {
                            gap: 12px !important;
                        }
                        /* Chuyển style kích thước sang wrapper */
                        .font-card-wrapper {
                            min-width: calc(100% / 3 - 12px) !important;
                            max-width: 280px !important;
                        }
                        .font-card {
                            min-height: 320px !important;
                        }
                        /* Đảm bảo ảnh full trong mobile mode */
                        .font-card img {
                            height: 100% !important; /* Đảm bảo full height */
                            width: 100% !important; /* Đảm bảo full width */
                            object-fit: cover !important;
                        }
                        .font-card h3 {
                            font-size: 0.95rem !important;
                        }
                        .font-card p {
                            font-size: 0.8rem !important;
                        }
                        .font-card button {
                            height: 36px !important;
                            font-size: 0.85rem !important;
                            padding: 0 20px !important;
                        }
                    }

                    @media (max-width: 768px) {
                        .nav-button-left,
                        .nav-button-right {
                            display: none !important;
                        }
                        .carousel-container {
                            padding: 0 8px !important;
                            gap: 10px !important;
                        }
                        /* Chuyển style kích thước sang wrapper */
                        .font-card-wrapper {
                            min-width: calc(100% / 2 - 10px) !important;
                            max-width: 260px !important;
                        }
                        .font-card {
                            min-height: 300px !important;
                        }
                         /* Đảm bảo ảnh full trong mobile mode */
                        .font-card img {
                            height: 100% !important;
                            width: 100% !important;
                            object-fit: cover !important;
                        }
                    }

                    /* --- BẮT ĐẦU CHỈNH SỬA CHO ĐIỆN THOẠI (CENTER MODE) --- */
                    @media (max-width: 480px) {
                        .carousel-container {
                            padding: 0 10px !important;
                            gap: 8px !important;
                        }

                        /* Ghi đè style của .font-card */
                        .font-card {
                            min-width: 100% !important;
                            max-width: none !important;
                            min-height: 280px !important;
                            opacity: 0.7; /* Thẻ không active mờ đi */
                            transition: opacity 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
                        }

                        /* Style cho wrapper mới */
                        .font-card-wrapper {
                            min-width: 85% !important;
                            max-width: 85% !important;
                            flex: 0 0 85% !important;
                            transform: scale(0.92); /* Thẻ không active nhỏ lại */
                            transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
                        }

                        /* Style cho wrapper active (ở giữa) */
                        .font-card-wrapper.is-active {
                            transform: scale(1);
                        }

                        /* Style cho thẻ card bên trong wrapper active */
                        .font-card-wrapper.is-active .font-card {
                            opacity: 1;
                            box-shadow: 0 10px 30px rgba(0, 77, 64, 0.2) !important;
                        }
                        /* --- KẾT THÚC CHỈNH SỬA --- */

                        /* Đảm bảo ảnh full trong mobile mode */
                        .font-card img {
                            height: 100% !important;
                            width: 100% !important;
                            object-fit: cover !important;
                        }
                        .font-card h3 {
                            font-size: 0.9rem !important;
                        }
                        .font-card p {
                            font-size: 0.75rem !important;
                        }
                        .font-card button {
                            height: 32px !important;
                            font-size: 0.8rem !important;
                            padding: 0 15px !important;
                        }
                    }

                    @media (max-width: 400px) {
                        /* Điều chỉnh cho màn hình nhỏ hơn */
                        .font-card-wrapper {
                            min-width: 90% !important;
                            max-width: 90% !important;
                            flex: 0 0 90% !important;
                        }
                        .font-card {
                            min-height: 260px !important;
                        }
                        /* Đảm bảo ảnh full trong mobile mode */
                        .font-card img {
                            height: 100% !important;
                            width: 100% !important;
                            object-fit: cover !important;
                        }
                        .font-card h3 {
                            font-size: 0.85rem !important;
                        }
                        .font-card p {
                            font-size: 0.7rem !important;
                        }
                        .font-card button {
                            height: 30px !important;
                            font-size: 0.75rem !important;
                            padding: 0 12px !important;
                        }
                    }
                `}</style>
            </div>
        </div>
    );
};

export default FontCarousel;