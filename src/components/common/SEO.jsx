import { useEffect } from 'react';

const SEO = ({
    title,
    description,
    keywords,
    image,
    url,
    type = 'website',
    author,
    publishedTime,
    modifiedTime,
    section,
    tags
}) => {
    useEffect(() => {
        // Title
        if (title) {
            document.title = `${title} | Sign Board - Chuyên gia biển quảng cáo`;
        }

        // Basic meta tags
        updateMetaTag('name', 'description', description || 'Sign Board - Công ty chuyên sản xuất và thi công biển quảng cáo, bảng hiệu chất lượng cao tại Việt Nam. Đội ngũ kỹ thuật viên giàu kinh nghiệm.');
        updateMetaTag('name', 'keywords', keywords || 'biển quảng cáo, bảng hiệu, sign board, biển hộp đèn, biển led, thi công quảng cáo');
        updateMetaTag('name', 'author', author || 'Sign Board');
        updateMetaTag('name', 'robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
        updateMetaTag('name', 'language', 'vi');
        updateMetaTag('name', 'geo.region', 'VN');
        updateMetaTag('name', 'geo.placename', 'Việt Nam');

        // Open Graph tags
        updateMetaTag('property', 'og:title', title || 'Sign Board - Chuyên gia biển quảng cáo');
        updateMetaTag('property', 'og:description', description || 'Công ty chuyên sản xuất và thi công biển quảng cáo, bảng hiệu chất lượng cao tại Việt Nam.');
        updateMetaTag('property', 'og:image', image || '/img/og-default.jpg');
        updateMetaTag('property', 'og:url', url || window.location.href);
        updateMetaTag('property', 'og:type', type);
        updateMetaTag('property', 'og:site_name', 'Sign Board');
        updateMetaTag('property', 'og:locale', 'vi_VN');

        // Twitter Card tags
        updateMetaTag('name', 'twitter:card', 'summary_large_image');
        updateMetaTag('name', 'twitter:title', title || 'Sign Board - Chuyên gia biển quảng cáo');
        updateMetaTag('name', 'twitter:description', description || 'Công ty chuyên sản xuất và thi công biển quảng cáo, bảng hiệu chất lượng cao tại Việt Nam.');
        updateMetaTag('name', 'twitter:image', image || '/img/og-default.jpg');

        // Article specific tags
        if (type === 'article') {
            updateMetaTag('property', 'article:author', author);
            updateMetaTag('property', 'article:published_time', publishedTime);
            updateMetaTag('property', 'article:modified_time', modifiedTime);
            updateMetaTag('property', 'article:section', section);

            if (tags && tags.length > 0) {
                tags.forEach(tag => {
                    updateMetaTag('property', 'article:tag', tag);
                });
            }
        }

        // Canonical URL
        updateCanonicalUrl(url || window.location.href);

        // Structured data (JSON-LD)
        if (type === 'article') {
            addStructuredData({
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": title,
                "description": description,
                "image": image,
                "author": {
                    "@type": "Organization",
                    "name": "Sign Board"
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "Sign Board",
                    "logo": {
                        "@type": "ImageObject",
                        "url": `${window.location.origin}/img/logo.png`
                    }
                },
                "datePublished": publishedTime,
                "dateModified": modifiedTime,
                "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": url || window.location.href
                }
            });
        } else {
            addStructuredData({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Sign Board",
                "description": "Công ty chuyên sản xuất và thi công biển quảng cáo, bảng hiệu chất lượng cao tại Việt Nam.",
                "url": window.location.origin,
                "logo": `${window.location.origin}/img/logo.png`,
                "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+84-XXX-XXX-XXX",
                    "contactType": "customer service"
                },
                "sameAs": [
                    "https://facebook.com/signboard",
                    "https://instagram.com/signboard"
                ]
            });
        }

    }, [title, description, keywords, image, url, type, author, publishedTime, modifiedTime, section, tags]);

    return null;
};

// Helper function to update meta tags
const updateMetaTag = (attribute, name, content) => {
    if (!content) return;

    let element = document.querySelector(`meta[${attribute}="${name}"]`);
    if (element) {
        element.setAttribute('content', content);
    } else {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        element.setAttribute('content', content);
        document.head.appendChild(element);
    }
};

// Helper function to update canonical URL
const updateCanonicalUrl = (url) => {
    let element = document.querySelector('link[rel="canonical"]');
    if (element) {
        element.setAttribute('href', url);
    } else {
        element = document.createElement('link');
        element.setAttribute('rel', 'canonical');
        element.setAttribute('href', url);
        document.head.appendChild(element);
    }
};

// Helper function to add structured data
const addStructuredData = (data) => {
    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
        existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
};

export default SEO;
