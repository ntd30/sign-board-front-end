import React, { useState, useEffect, useRef } from 'react';
import { Card, Button, Typography, Spin } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import LazyImage from './LazyImage';

const { Title, Paragraph } = Typography;

const ArticleCarousel = ({
    items = [],
    loading = false,
    autoSlideInterval = 4000,
    showNavigation = true,
    showPagination = true,
    cardWidth = 'calc(100% / 4 - 15px)',
    maxCardWidth = '300px',
    cardHeight = '340px',
    imageHeight = '180px',
    title = '',
    titleLevel = 2,
    titleStyle = {},
    containerStyle = {},
    cardStyle = {},
    enableAutoSlide = true,
    enableSwipe = true,
    enableDrag = true,
    gap = '15px',
    itemsPerView = 4,
    responsive = {
        1024: { itemsPerView: 3, gap: '12px' },
        768: { itemsPerView: 2, gap: '10px' },
        480: { itemsPerView: 1, gap: '8px' }
    },
    renderCard = null, // Custom render function for card content
    onItemClick = null, // Custom click handler
    emptyMessage = 'Không có nội dung để hiển thị'
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isUserInteracting, setIsUserInteracting] = useState(false);
    const carouselRef = useRef(null);

    // Process article content - remove HTML tags and limit length
    const processArticleContent = (content, maxLength = 100) => {
        if (!content) return '';
        const textContent = content.replace(/<[^>]*>/g, '');
        return textContent.length > maxLength ? `${textContent.substring(0, maxLength)}...` : textContent;
    };

    // Default card render function
    const defaultRenderCard = (item, index) => {
        return (
            <Card
                className="article-card"
                style={{
                    textAlign: 'center',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    background: '#ffffff',
                    position: 'relative',
                    minHeight: cardHeight,
                    boxShadow: '0 6px 24px rgba(0, 77, 64, 0.15)',
                    transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
                    border: 'none',
                    ...cardStyle
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
                    <Link to={item.slug ? `/news/${item.slug}` : `/news/detail/${item.id}`} onClick={(e) => {
                        if (onItemClick) {
                            e.preventDefault();
                            onItemClick(item);
                        }
                    }}>
                        <div style={{
                            height: imageHeight,
                            background: `linear-gradient(135deg, ${index % 2 === 0 ? '#004D40' : '#00796B'}, ${index % 2 === 0 ? '#00796B' : '#26A69A'})`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            {item.imageBase64 ? (
                                <LazyImage
                                    src={`data:image/jpeg;base64,${item.imageBase64}`}
                                    alt={`Hình ảnh: ${item.title || item.name}`}
                                    style={{
                                        width: '90%',
                                        height: '90%',
                                        objectFit: 'cover',
                                        borderRadius: '15px',
                                        boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                                        transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
                                        transform: 'scale(0.95)'
                                    }}
                                    onError={(e) => {
                                        console.error('Failed to load base64 image');
                                        e.target.style.display = 'none';
                                    }}
                                />
                            ) : item.featuredImageUrl ? (
                                <LazyImage
                                    src={`${import.meta.env.VITE_BACKEND_URL}${item.featuredImageUrl}`}
                                    alt={`Hình ảnh: ${item.title || item.name}`}
                                    style={{
                                        width: '90%',
                                        height: '90%',
                                        objectFit: 'cover',
                                        borderRadius: '15px',
                                        boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                                        transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
                                        transform: 'scale(0.95)'
                                    }}
                                    onError={(e) => {
                                        console.error('Failed to load image:', item.featuredImageUrl);
                                        e.target.style.display = 'none';
                                    }}
                                />
                            ) : item.thumbnail || item.image ? (
                                <img
                                    src={item.thumbnail || item.image}
                                    alt={item.title || item.name}
                                    style={{
                                        width: '90%',
                                        height: '90%',
                                        objectFit: 'cover',
                                        borderRadius: '15px',
                                        boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                                        transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
                                        transform: 'scale(0.95)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'scale(1.05) rotate(2deg)';
                                        e.currentTarget.style.filter = 'brightness(1.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'scale(0.95) rotate(0deg)';
                                        e.currentTarget.style.filter = 'brightness(1)';
                                    }}
                                />
                            ) : (
                                <div style={{
                                    height: imageHeight,
                                    background: `linear-gradient(135deg, #004D40, #00796B)`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    borderRadius: '15px 15px 0 0'
                                }}>
                                    <span style={{
                                        color: 'white',
                                        fontSize: '3rem',
                                        opacity: 0.7
                                    }}>
                                        📄
                                    </span>
                                </div>
                            )}
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
                        {item.title || item.name}
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
                        {processArticleContent(item.description || item.content || item.excerpt)}
                    </Paragraph>
                    <Link to={item.slug ? `/news/${item.slug}` : `/news/detail/${item.id}`} onClick={(e) => {
                        if (onItemClick) {
                            e.preventDefault();
                            onItemClick(item);
                        }
                    }}>
                        <Button
                            type="primary"
                            shape="round"
                            style={{
                                background: 'linear-gradient(135deg, #004D40, #00796B)',
                                border: 'none',
                                fontWeight: '600',
                                padding: '0 25px',
                                height: '40px',
                                fontSize: '0.9rem',
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
        );
    };

    const extendedItems = items.length > 0 ? [...items, ...items, ...items] : [];

    const nextSlide = () => {
        if (items.length > 0) {
            setCurrentIndex((prev) => (prev + 1) % items.length);
            if (carouselRef.current) {
                const cardWidth = carouselRef.current.children[0]?.offsetWidth || 300;
                carouselRef.current.scrollTo({
                    left: ((currentIndex + 1) % items.length) * (cardWidth + parseInt(gap)),
                    behavior: 'smooth'
                });
            }
        }
    };

    const prevSlide = () => {
        if (items.length > 0) {
            setCurrentIndex((prev) => {
                const prevIndex = prev - 1;
                return prevIndex < 0 ? items.length - 1 : prevIndex;
            });
            if (carouselRef.current) {
                const cardWidth = carouselRef.current.children[0]?.offsetWidth || 300;
                const prevIndex = currentIndex - 1 < 0 ? items.length - 1 : currentIndex - 1;
                carouselRef.current.scrollTo({
                    left: prevIndex * (cardWidth + parseInt(gap)),
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
                left: index * (cardWidth + parseInt(gap)),
                behavior: 'smooth'
            });
        }
    };

    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e) => {
        if (!enableDrag) return;
        setIsDragging(true);
        setIsUserInteracting(true);
        setStartPos(e.pageX - (carouselRef.current?.offsetLeft || 0));
        setScrollLeft(carouselRef.current?.scrollLeft || 0);
    };

    const handleMouseMove = (e) => {
        if (!isDragging || !enableDrag) return;
        e.preventDefault();
        const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
        const walk = (x - startPos) * 1.5;
        if (carouselRef.current) {
            carouselRef.current.scrollLeft = scrollLeft - walk;
        }
    };

    const handleTouchStart = (e) => {
        if (!enableSwipe) return;
        setIsDragging(true);
        setIsUserInteracting(true);
        setStartPos(e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0));
        setScrollLeft(carouselRef.current?.scrollLeft || 0);
    };

    const handleTouchMove = (e) => {
        if (!isDragging || !enableSwipe) return;
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
            const newIndex = Math.round(carouselRef.current.scrollLeft / (cardWidth + parseInt(gap)));
            setCurrentIndex(newIndex % items.length);
        }
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        setTimeout(() => setIsUserInteracting(false), 1000);
        if (carouselRef.current) {
            const cardWidth = carouselRef.current.children[0]?.offsetWidth || 300;
            const newIndex = Math.round(carouselRef.current.scrollLeft / (cardWidth + parseInt(gap)));
            setCurrentIndex(newIndex % items.length);
        }
    };

    // Auto-slide effect
    useEffect(() => {
        if (items.length <= 1 || !enableAutoSlide || isUserInteracting) return;
        const interval = setInterval(() => {
            nextSlide();
        }, autoSlideInterval);
        return () => clearInterval(interval);
    }, [items.length, isUserInteracting, currentIndex, enableAutoSlide, autoSlideInterval]);

    // Responsive card width calculation
    const getResponsiveCardWidth = () => {
        const screenWidth = window.innerWidth;
        for (const breakpoint in responsive) {
            if (screenWidth <= parseInt(breakpoint)) {
                return `calc(100% / ${responsive[breakpoint].itemsPerView} - ${responsive[breakpoint].gap})`;
            }
        }
        return cardWidth;
    };

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <Spin size="large" />
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <p>{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '60px 15px', background: 'linear-gradient(135deg, #f8f9fa 0%, #e8f5e8 100%)', ...containerStyle }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {title && (
                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <Title level={titleLevel} style={{
                            fontSize: '2.5rem',
                            fontWeight: '700',
                            color: '#004D40',
                            marginBottom: '15px',
                            ...titleStyle
                        }}>
                            <span style={{ marginRight: '10px', color: '#00796B' }}></span>
                            {title}
                            <div style={{
                                width: '80px',
                                height: '4px',
                                background: 'linear-gradient(90deg, #004D40, #26A69A)',
                                margin: '15px auto 0',
                                borderRadius: '2px'
                            }}></div>
                        </Title>
                    </div>
                )}

                <div style={{ position: 'relative' }}>
                    {showNavigation && (
                        <>
                            <Button
                                shape="circle"
                                icon={<LeftOutlined />}
                                onClick={prevSlide}
                                className="nav-button nav-button-left"
                                style={{
                                    position: 'absolute',
                                    left: '-60px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    zIndex: 10,
                                    background: 'linear-gradient(135deg, rgba(0, 77, 64, 0.9), rgba(0, 121, 107, 0.9))',
                                    border: 'none',
                                    color: '#ffffff',
                                    width: '48px',
                                    height: '48px',
                                    fontSize: '20px',
                                    boxShadow: '0 4px 15px rgba(0, 77, 64, 0.3)',
                                    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                                    backdropFilter: 'blur(10px)'
                                }}
                            />
                            <Button
                                shape="circle"
                                icon={<RightOutlined />}
                                onClick={nextSlide}
                                className="nav-button nav-button-right"
                                style={{
                                    position: 'absolute',
                                    right: '-60px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    zIndex: 10,
                                    background: 'linear-gradient(135deg, rgba(0, 77, 64, 0.9), rgba(0, 121, 107, 0.9))',
                                    border: 'none',
                                    color: '#ffffff',
                                    width: '48px',
                                    height: '48px',
                                    fontSize: '20px',
                                    boxShadow: '0 4px 15px rgba(0, 77, 64, 0.3)',
                                    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                                    backdropFilter: 'blur(10px)'
                                }}
                            />
                        </>
                    )}

                    <div
                        ref={carouselRef}
                        style={{
                            display: 'flex',
                            overflowX: 'auto',
                            overflowY: 'hidden',
                            gap: gap,
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
                        {extendedItems.map((item, index) => (
                            <div
                                key={`${item.id || index}-${Math.floor(index / items.length)}`}
                                style={{
                                    minWidth: getResponsiveCardWidth(),
                                    maxWidth: maxCardWidth,
                                    flex: '0 0 auto',
                                    scrollSnapAlign: 'center'
                                }}
                            >
                                {renderCard ? renderCard(item, index) : defaultRenderCard(item, index)}
                            </div>
                        ))}
                    </div>

                    {showPagination && (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '8px',
                            marginTop: '20px'
                        }}>
                            {items.map((_, index) => (
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
                    )}
                </div>

                <style jsx>{`
                    .article-card {
                        transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
                        transform-origin: center;
                    }

                    .article-card:hover {
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
                        .article-card {
                            min-width: calc(100% / 3 - 12px) !important;
                            max-width: 280px !important;
                            min-height: 320px !important;
                        }
                        .article-card img {
                            height: 160px !important;
                        }
                        .article-card h3 {
                            font-size: 0.95rem !important;
                        }
                        .article-card p {
                            font-size: 0.8rem !important;
                        }
                        .article-card button {
                            height: 36px !important;
                            font-size: 0.85rem !important;
                            padding: 0 20px !important;
                        }
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
                        .article-card {
                            min-width: calc(100% / 2 - 10px) !important;
                            max-width: 260px !important;
                            min-height: 300px !important;
                        }
                        .article-card img {
                            height: 150px !important;
                        }
                    }

                    @media (max-width: 480px) {
                        .carousel-container {
                            padding: 0 5px !important;
                            gap: 8px !important;
                        }
                        .article-card {
                            min-width: calc(100% - 8px) !important;
                            max-width: 240px !important;
                            min-height: 280px !important;
                        }
                        .article-card img {
                            height: 140px !important;
                        }
                        .article-card h3 {
                            font-size: 0.9rem !important;
                        }
                        .article-card p {
                            font-size: 0.75rem !important;
                        }
                        .article-card button {
                            height: 32px !important;
                            font-size: 0.8rem !important;
                            padding: 0 15px !important;
                        }
                    }

                    @media (max-width: 400px) {
                        .article-card {
                            min-width: calc(100% - 8px) !important;
                            max-width: 220px !important;
                            min-height: 260px !important;
                        }
                        .article-card img {
                            height: 130px !important;
                        }
                    }
                `}</style>
            </div>
        </div>
    );
};

export default ArticleCarousel;