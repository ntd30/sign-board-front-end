import React, { useState, useRef, useEffect } from 'react';

const LazyImage = ({
    src,
    alt,
    className = '',
    style = {},
    onClick,
    onLoad,
    onError,
    placeholder,
    ...props
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const [hasError, setHasError] = useState(false);
    const imgRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.1,
                rootMargin: '50px'
            }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const handleLoad = () => {
        setIsLoaded(true);
        if (onLoad) onLoad();
    };

    const handleError = () => {
        setHasError(true);
        if (onError) onError();
    };

    // Tạo alt text tốt hơn cho SEO
    const optimizedAlt = alt || generateAltText(src);

    return (
        <div
            ref={imgRef}
            className={`lazy-image-container ${className}`}
            style={{
                position: 'relative',
                overflow: 'hidden',
                ...style
            }}
            onClick={onClick}
        >
            {/* Placeholder */}
            {(!isInView || !isLoaded) && !hasError && (
                <div
                    className="lazy-image-placeholder"
                    style={{
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 1
                    }}
                >
                    {placeholder || (
                        <div style={{
                            width: '40px',
                            height: '40px',
                            border: '3px solid #e9ecef',
                            borderTop: '3px solid #007bff',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite'
                        }} />
                    )}
                </div>
            )}

            {/* Actual image */}
            {isInView && !hasError && (
                <img
                    src={src}
                    alt={optimizedAlt}
                    className={`lazy-image ${isLoaded ? 'loaded' : ''}`}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: isLoaded ? 1 : 0,
                        transition: 'opacity 0.3s ease',
                        position: 'relative',
                        zIndex: 2
                    }}
                    onLoad={handleLoad}
                    onError={handleError}
                    loading="lazy"
                    decoding="async"
                    {...props}
                />
            )}

            {/* Error state */}
            {hasError && (
                <div
                    className="lazy-image-error"
                    style={{
                        width: '100%',
                        height: '100%',
                        background: '#f8f9fa',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        color: '#6c757d',
                        fontSize: '14px',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 1
                    }}
                >
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span>Không thể tải hình ảnh</span>
                </div>
            )}

            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                .lazy-image-container:hover .lazy-image {
                    transform: scale(1.05);
                    transition: transform 0.3s ease;
                }
            `}</style>
        </div>
    );
};

// Hàm tạo alt text tự động cho hình ảnh
const generateAltText = (src) => {
    if (!src) return 'Hình ảnh';

    // Nếu là base64 image
    if (src.startsWith('data:image')) {
        return 'Hình ảnh sản phẩm biển quảng cáo chất lượng cao';
    }

    // Nếu là URL từ backend
    if (src.includes('/uploads/') || src.includes('/img/')) {
        const filename = src.split('/').pop().split('.')[0];
        return `Biển quảng cáo ${filename.replace(/[-_]/g, ' ')} - Sign Board`;
    }

    return 'Hình ảnh biển quảng cáo chuyên nghiệp từ Sign Board';
};

export default LazyImage;
