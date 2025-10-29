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
        const textContent = content.replace(/<[^>]*>/g, '');
        return textContent.length > 150 ? `${textContent.substring(0, 150)}...` : textContent;
    };

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

            const categoryRes = await fetchArticleCategoryTreeAPI();
            console.log('Category tree response:', categoryRes);

            let subcategories = [];
            let mainCategorySlug = 'mau-chu';

            if (categoryRes?.data && Array.isArray(categoryRes.data)) {
                const findCategoryBySlug = (categories, slug) => {
                    for (const category of categories) {
                        if (category.slug === slug) return category;
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

            let allFonts = [];

            try {
                console.log("Fetching articles for main category:", mainCategorySlug);
                const mainCategoryResponse = await fetchArticlesByCategorySlugAPI(mainCategorySlug);
                console.log("Main category response:", mainCategoryResponse);

                if (Array.isArray(mainCategoryResponse.data)) {
                    allFonts.push(...mainCategoryResponse.data);
                    console.log(`Added ${mainCategoryResponse.data.length} articles from main category`);
                } else if (typeof mainCategoryResponse.data === 'object') {
                    const articlesArray = mainCategoryResponse.data.content || mainCategoryResponse.data.data || [];
                    if (Array.isArray(articlesArray)) {
                        allFonts.push(...articlesArray);
                        console.log(`Added ${articlesArray.length} articles from main category (object)`);
                    }
                }

                if (subcategories.length > 0) {
                    console.log(`Fetching articles from ${subcategories.length} subcategories`);
                    for (const subcategory of subcategories) {
                        try {
                            console.log(`Fetching articles for subcategory: ${subcategory.slug}`);
                            const subcategoryResponse = await fetchArticlesByCategorySlugAPI(subcategory.slug);
                            console.log(`Subcategory ${subcategory.slug} response:`, subcategoryResponse);

                            if (Array.isArray(subcategoryResponse.data)) {
                                allFonts.push(...subcategoryResponse.data);
                                console.log(`Added ${subcategoryResponse.data.length} articles from subcategory ${subcategory.slug}`);
                            } else if (typeof subcategoryResponse.data === 'object') {
                                const articlesArray = subcategoryResponse.data.content || subcategoryResponse.data.data || [];
                                if (Array.isArray(articlesArray)) {
                                    allFonts.push(...articlesArray);
                                    console.log(`Added ${articlesArray.length} articles from subcategory ${subcategory.slug} (object)`);
                                }
                            }
                        } catch (subErr) {
                            console.error(`Error fetching articles for subcategory ${subcategory.slug}:`, subErr);
                        }
                    }
                }

                const uniqueFonts = allFonts.filter((font, index, self) =>
                    index === self.findIndex(f => f.id === font.id)
                );

                console.log(`Final unique fonts count: ${uniqueFonts.length}`);

                if (uniqueFonts.length > 0) {
                    const transformedFonts = uniqueFonts.map((article, index) => ({
                        id: article.id || index + 1,
                        title: article.title || `Mẫu chữ ${index + 1}`,
                        description: article.description || article.excerpt || 'Mô tả mẫu chữ chưa được cập nhật.',
                        image: article.thumbnail || article.imageUrl || 'https://placehold.co/400x220/004D40/ffffff?text=Mẫu+Chữ',
                        slug: article.slug,
                        content: article.content,
                        featuredImageUrl: article.featuredImageUrl,
                        imageBase64: article.imageBase64
                    }));
                    setFonts(transformedFonts);
                    console.log('Fonts loaded successfully:', transformedFonts.length);
                } else {
                    console.log('No fonts data from API, using fallback');
                    setFonts([
                        {
                            id: 1,
                            title: 'Mẫu Chữ Nổi 3D',
                            description: 'Chữ nổi 3D với hiệu ứng ánh sáng và chiều sâu, tạo điểm nhấn mạnh mẽ cho thương hiệu.',
                            image: 'https://placehold.co/400x220/004D40/ffffff?text=Chữ+3D',
                            slug: 'mau-chu-noi-3d'
                        },
                        {
                            id: 2,
                            title: 'Mẫu Chữ LED Động',
                            description: 'Chữ LED sáng tạo với hiệu ứng động, thu hút ánh nhìn cả ngày lẫn đêm.',
                            image: 'https://placehold.co/400x220/00796B/ffffff?text=Chữ+LED',
                            slug: 'mau-chu-led'
                        },
                        {
                            id: 3,
                            title: 'Mẫu Chữ Inox Cao Cấp',
                            description: 'Chữ inox cao cấp với độ bóng cao, sang trọng và bền đẹp theo thời gian.',
                            image: 'https://placehold.co/400x220/26A69A/ffffff?text=Chữ+Inox',
                            slug: 'mau-chu-inox'
                        },
                        {
                            id: 4,
                            title: 'Mẫu Chữ Mica Trong Suốt',
                            description: 'Chữ mica trong suốt với hiệu ứng đẹp mắt, hiện đại và tinh tế.',
                            image: 'https://placehold.co/400x220/4DB6AC/ffffff?text=Chữ+Mica',
                            slug: 'mau-chu-mica'
                        }
                    ]);
                }
            } catch (err) {
                console.error('Error loading fonts:', err);
                setFonts([
                    {
                        id: 1,
                        title: 'Mẫu Chữ Nổi 3D',
                        description: 'Chữ nổi 3D với hiệu ứng ánh sáng và chiều sâu, tạo điểm nhấn mạnh mẽ cho thương hiệu.',
                        image: 'https://placehold.co/400x220/004D40/ffffff?text=Chữ+3D',
                        slug: 'mau-chu-noi-3d'
                    },
                    {
                        id: 2,
                        title: 'Mẫu Chữ LED Động',
                        description: 'Chữ LED sáng tạo với hiệu ứng động, thu hút ánh nhìn cả ngày lẫn đêm.',
                        image: 'https://placehold.co/400x220/00796B/ffffff?text=Chữ+LED',
                        slug: 'mau-chu-led'
                    },
                    {
                        id: 3,
                        title: 'Mẫu Chữ Inox Cao Cấp',
                        description: 'Chữ inox cao cấp với độ bóng cao, sang trọng và bền đẹp theo thời gian.',
                        image: 'https://placehold.co/400x220/26A69A/ffffff?text=Chữ+Inox',
                        slug: 'mau-chu-inox'
                    },
                    {
                        id: 4,
                        title: 'Mẫu Chữ Mica Trong Suốt',
                        description: 'Chữ mica trong suốt với hiệu ứng đẹp mắt, hiện đại và tinh tế.',
                        image: 'https://placehold.co/400x220/4DB6AC/ffffff?text=Chữ+Mica',
                        slug: 'mau-chu-mica'
                    }
                ]);
            }
        } catch (error) {
            console.error('Lỗi khi tải dữ liệu mẫu chữ:', error);
            setFonts([
                {
                    id: 1,
                    title: 'Mẫu Chữ Nổi 3D',
                    description: 'Chữ nổi 3D với hiệu ứng ánh sáng và chiều sâu, tạo điểm nhấn mạnh mẽ cho thương hiệu.',
                    image: 'https://placehold.co/400x220/004D40/ffffff?text=Chữ+3D',
                    slug: 'mau-chu-noi-3d'
                },
                {
                    id: 2,
                    title: 'Mẫu Chữ LED Động',
                    description: 'Chữ LED sáng tạo với hiệu ứng động, thu hút ánh nhìn cả ngày lẫn đêm.',
                    image: 'https://placehold.co/400x220/00796B/ffffff?text=Chữ+LED',
                    slug: 'mau-chu-led'
                },
                {
                    id: 3,
                    title: 'Mẫu Chữ Inox Cao Cấp',
                    description: 'Chữ inox cao cấp với độ bóng cao, sang trọng và bền đẹp theo thời gian.',
                    image: 'https://placehold.co/400x220/26A69A/ffffff?text=Chữ+Inox',
                    slug: 'mau-chu-inox'
                },
                {
                    id: 4,
                    title: 'Mẫu Chữ Mica Trong Suốt',
                    description: 'Chữ mica trong suốt với hiệu ứng đẹp mắt, hiện đại và tinh tế.',
                    image: 'https://placehold.co/400x220/4DB6AC/ffffff?text=Chữ+Mica',
                    slug: 'mau-chu-mica'
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
                <p>Không có dữ liệu mẫu chữ để hiển thị.</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '60px 15px', background: 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <Title level={2} style={{
                        fontSize: '2.2rem',
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
                    <Paragraph style={{
                        fontSize: '1.1rem',
                        color: '#666',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        Bộ sưu tập mẫu chữ sáng tạo, hiện đại và độc đáo cho mọi nhu cầu
                    </Paragraph>
                </div>

                <div style={{ position: 'relative' }}>
                    {/* --- NÚT ĐÃ SỬA (THEO MẪU) --- */}
                    <Button
                        shape="circle"
                        icon={<LeftOutlined />}
                        onClick={prevSlide}
                        className="nav-button nav-button-left"
                        style={{
                            position: 'absolute',
                            left: '-60px',
                            top: '50%',
                            // transform đã chuyển sang CSS
                            zIndex: 10,
                            background: 'linear-gradient(135deg, rgba(0, 77, 64, 0.9), rgba(0, 121, 107, 0.9))',
                            border: 'none',
                            color: '#ffffff',
                            width: '48px',
                            height: '48px',
                            fontSize: '20px',
                            boxShadow: '0 4px 15px rgba(0, 77, 64, 0.3)',
                            // transition đã chuyển sang CSS
                            backdropFilter: 'blur(10px)'
                        }}
                    />
                    
                    {/* --- NÚT ĐÃ SỬA (THEO MẪU) --- */}
                    <Button
                        shape="circle"
                        icon={<RightOutlined />}
                        onClick={nextSlide}
                        className="nav-button nav-button-right"
                        style={{
                            position: 'absolute',
                            right: '-60px',
                            top: '50%',
                            // transform đã chuyển sang CSS
                            zIndex: 10,
                            background: 'linear-gradient(135deg, rgba(0, 77, 64, 0.9), rgba(0, 121, 107, 0.9))',
                            border: 'none',
                            color: '#ffffff',
                            width: '48px',
                            height: '48px',
                            fontSize: '20px',
                            boxShadow: '0 4px 15px rgba(0, 77, 64, 0.3)',
                            // transition đã chuyển sang CSS
                            backdropFilter: 'blur(10px)'
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
                                        minHeight: '380px',
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
                                        <div style={{
                                            height: '200px',
                                            background: 'rgba(0, 77, 64, 0.05)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            position: 'relative',
                                            overflow: 'hidden'
                                        }}>
                                            {font.imageBase64 ? (
                                                <LazyImage
                                                    src={`data:image/jpeg;base64,${font.imageBase64}`}
                                                    alt={`Hình ảnh mẫu chữ: ${font.title} - Mẫu chữ đẹp từ Sign Board`}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                        opacity: 1,
                                                        transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
                                                        transform: 'scale(0.95)'
                                                    }}
                                                    onError={(e) => {
                                                        console.error('Failed to load base64 image');
                                                        e.target.style.display = 'none';
                                                    }}
                                                />
                                            ) : font.featuredImageUrl ? (
                                                <LazyImage
                                                    src={`${import.meta.env.VITE_BACKEND_URL}${font.featuredImageUrl}`}
                                                    alt={`Hình ảnh mẫu chữ: ${font.title} - Mẫu chữ đẹp từ Sign Board`}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                        opacity: 1,
                                                        transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
                                                        transform: 'scale(0.95)'
                                                    }}
                                                    onError={(e) => {
                                                        console.error('Failed to load image:', font.featuredImageUrl);
                                                        e.currentTarget.style.transform = 'scale(1.05) rotate(2deg)';
                                                        e.currentTarget.style.filter = 'brightness(1.1)';
                                                        e.currentTarget.style.opacity = '1';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.transform = 'scale(0.95) rotate(0deg)';
                                                        e.currentTarget.style.filter = 'brightness(1)';
                                                        e.currentTarget.style.opacity = '1';
                                                    }}
                                                />
                                            ) : null}
                                        </div>
                                    }
                                >
                                    <div style={{ padding: '20px 15px' }}>
                                        <Title level={3} style={{
                                            color: '#004D40',
                                            marginBottom: '12px',
                                            fontSize: '1.1rem',
                                            fontWeight: '600'
                                        }}>
                                            {font.title}
                                        </Title>
                                        <Paragraph style={{
                                            color: '#666',
                                            lineHeight: '1.5',
                                            fontSize: '0.85rem',
                                            marginBottom: '18px',
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
                                                block
                                                shape="round"
                                                style={{
                                                    background: 'linear-gradient(135deg, #004D40, #00796B)',
                                                    border: 'none',
                                                    fontWeight: '600',
                                                    height: '42px',
                                                    fontSize: '0.9rem',
                                                    transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
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
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    border: 'none',
                                    background: index === currentIndex ? '#004D40' : 'rgba(0, 77, 64, 0.3)',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                            />
                        ))}
                    </div>

                    {/* View More Button */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '30px',
                        marginBottom: '20px',
                        width: '100%'
                    }}>
                        <Link to="/mau-chu?id=3" style={{ textDecoration: 'none' }}>
                            <Button 
                                type="primary"
                                size="large"
                                style={{
                                    background: 'transparent',
                                    border: '2px solid #004D40',
                                    color: '#004D40',
                                    fontWeight: 600,
                                    padding: '0 32px',
                                    height: '46px',
                                    borderRadius: '30px',
                                    transition: 'all 0.3s ease',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    zIndex: 1
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 77, 64, 0.2)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <span style={{ position: 'relative', zIndex: 2 }}>Xem Thêm Mẫu Chữ</span>
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '0%',
                                    height: '100%',
                                    background: 'linear-gradient(135deg, #004D40, #00796B)',
                                    transition: 'all 0.4s cubic-bezier(0.65, 0, 0.35, 1)',
                                    zIndex: 1
                                }} className="button-hover-bg"></div>
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* --- THAY ĐỔI: CẬP NHẬT CSS CHO NÚT MỚI --- */}
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

                    /* --- CSS CHO NÚT MỚI (THEO MẪU) --- */
                    .nav-button {
                        opacity: 0.8;
                        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
                        backdrop-filter: blur(10px);
                        transform: translateY(-50%); /* Base transform */
                    }

                    .nav-button:hover {
                        opacity: 1;
                        transform: translateY(-50%) scale(1.1); /* Combined transform on hover */
                    }

                    @media (max-width: 1024px) {
                        .carousel-container {
                            gap: 12px !important;
                        }
                        .font-card-wrapper {
                            min-width: calc(100% / 3 - 12px) !important;
                            max-width: 280px !important;
                        }
                        .font-card {
                            min-height: 360px !important;
                        }
                        .font-card img {
                            height: 180px !important;
                        }
                        .font-card h3 {
                            font-size: 1rem !important;
                        }
                        .font-card p {
                            font-size: 0.8rem !important;
                        }
                        .font-card button {
                            height: 38px !important;
                            fontSize: '0.85rem' !important;
                        }

                        /* --- THÊM CSS RESPONSIVE CHO NÚT --- */
                        .nav-button-left,
                        .nav-button-right {
                            left: '-30px' !important;
                            right: '-30px' !important;
                            width: '35px' !important;
                            height: '35px' !important;
                            font-size: '16px' !important;
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
                        .font-card-wrapper {
                            min-width: calc(100% / 2 - 10px) !important;
                            max-width: 260px !important;
                        }
                        .font-card {
                            min-height: 340px !important;
                        }
                        .font-card img {
                            height: 170px !important;
                        }
                    }

                    @media (max-width: 480px) {
                        .carousel-container {
                            padding: 0 10px !important;
                            gap: 8px !important;
                        }

                        .font-card {
                            min-width: 100% !important;
                            max-width: none !important;
                            min-height: 320px !important;
                            opacity: 0.7;
                            transition: opacity 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
                        }

                        .font-card-wrapper {
                            min-width: 85% !important;
                            max-width: 85% !important;
                            flex: 0 0 85% !important;
                            transform: scale(0.92);
                            transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
                        }

                        .font-card-wrapper.is-active {
                            transform: scale(1);
                        }

                        .font-card-wrapper.is-active .font-card {
                            opacity: 1;
                            box-shadow: 0 10px 30px rgba(0, 77, 64, 0.2) !important;
                        }

                        .font-card img {
                            height: 160px !important;
                        }
                        .font-card h3 {
                            font-size: 0.95rem !important;
                        }
                        .font-card p {
                            font-size: 0.75rem !important;
                        }
                        .font-card button {
                            height: 34px !important;
                            font-size: 0.8rem !important;
                        }
                    }

                    @media (max-width: 400px) {
                        .font-card-wrapper {
                            min-width: 90% !important;
                            max-width: 90% !important;
                            flex: 0 0 90% !important;
                        }
                        .font-card {
                            min-height: 300px !important;
                        }
                        .font-card img {
                            height: 150px !important;
                        }
                    }
                `}</style>
            </div>
        </div>
    );
};

export default FontCarousel;