import React, { useEffect, useState } from 'react';
import { Anchor, Affix, Divider } from 'antd';

const { Link } = Anchor;

const TableOfContents = ({ content, contentRef }) => {
    const [headings, setHeadings] = useState([]);
    const [processedContent, setProcessedContent] = useState('');
    const [activeHeading, setActiveHeading] = useState('');

    useEffect(() => {
        if (content && contentRef?.current) {
            // Tạo một div tạm thời để parse HTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = content;

            // Lấy tất cả các heading h1, h2, h3, h4, h5, h6
            const headingElements = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');

            const headingsData = Array.from(headingElements).map((heading, index) => {
                const level = parseInt(heading.tagName.charAt(1));
                const text = heading.textContent.trim();
                const originalHTML = heading.outerHTML;

                // Tạo ID từ text của heading - đảm bảo unique
                let baseSlug = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                let id = `toc-${level}-${index}-${baseSlug}`;

                return {
                    id,
                    text,
                    level,
                    index,
                    originalHTML,
                    element: heading
                };
            });

            // Đảm bảo ID unique nếu có nhiều heading giống nhau
            const existingIds = new Set();
            headingsData.forEach(headingData => {
                let counter = 1;
                let originalId = headingData.id;
                while (existingIds.has(headingData.id)) {
                    headingData.id = `${originalId}-${counter}`;
                    counter++;
                }
                existingIds.add(headingData.id);
            });

            setHeadings(headingsData);

            // Cập nhật nội dung thật với ID cho các heading
            if (headingsData.length > 0) {
                // Tạo một bản sao của content để thay thế
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = content;

                // Cập nhật các heading elements trực tiếp
                const contentHeadings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');

                Array.from(contentHeadings).forEach((heading, index) => {
                    if (index < headingsData.length) {
                        const headingData = headingsData[index];
                        if (heading.textContent.trim() === headingData.text) {
                            heading.id = headingData.id;
                        }
                    }
                });

                const updatedContent = tempDiv.innerHTML;
                setProcessedContent(updatedContent);
                contentRef.current.innerHTML = updatedContent;
            }
        }
    }, [content, contentRef]);

    // Scroll spy để track heading đang active
    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const headingElements = headings.map(h => document.getElementById(h.id)).filter(Boolean);
                    const scrollPosition = window.scrollY + 120;

                    for (let i = headingElements.length - 1; i >= 0; i--) {
                        const element = headingElements[i];
                        if (element.offsetTop <= scrollPosition) {
                            setActiveHeading(element.id);
                            break;
                        }
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Gọi ngay để set active heading ban đầu
        return () => window.removeEventListener('scroll', handleScroll);
    }, [headings]);

    if (headings.length === 0) {
        return null;
    }

    return (
        <Affix offsetTop={100}>
            <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '16px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                padding: '0',
                marginBottom: '24px',
                overflow: 'hidden',
                position: 'sticky',
                top: '100px'
            }}>
                {/* Header của mục lục */}
                <div style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    padding: '20px 24px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                    <h3 style={{
                        margin: '0',
                        color: '#ffffff',
                        fontSize: '18px',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                        </svg>
                        Mục lục bài viết
                    </h3>
                    <p style={{
                        margin: '8px 0 0 0',
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontSize: '14px',
                        fontWeight: '400'
                    }}>
                        {headings.length} mục • Nhấn để chuyển đến
                    </p>
                </div>

                {/* Danh sách mục lục */}
                <div style={{
                    padding: '16px',
                    maxHeight: 'calc(100vh - 300px)',
                    overflowY: 'auto',
                    background: 'rgba(255, 255, 255, 0.05)'
                }}>
                    <Anchor
                        targetOffset={120}
                        affix={false}
                        items={headings.map((heading, index) => ({
                            key: heading.id,
                            href: `#${heading.id}`,
                            className: activeHeading === heading.id ? 'toc-item-active' : 'toc-item',
                            title: (
                                <div style={{
                                    padding: '12px 16px',
                                    margin: '4px 0',
                                    borderRadius: '8px',
                                    background: activeHeading === heading.id
                                        ? 'rgba(255, 255, 255, 0.15)'
                                        : 'rgba(255, 255, 255, 0.05)',
                                    border: activeHeading === heading.id
                                        ? '1px solid rgba(255, 255, 255, 0.3)'
                                        : '1px solid transparent',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}>
                                        {/* Icon cho level khác nhau */}
                                        <span style={{
                                            width: '20px',
                                            height: '20px',
                                            borderRadius: '50%',
                                            background: activeHeading === heading.id
                                                ? '#ffffff'
                                                : 'rgba(255, 255, 255, 0.2)',
                                            color: activeHeading === heading.id ? '#667eea' : '#ffffff',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '10px',
                                            fontWeight: 'bold',
                                            flexShrink: 0
                                        }}>
                                            {heading.level}
                                        </span>

                                        <span style={{
                                            color: '#ffffff',
                                            fontSize: '14px',
                                            fontWeight: activeHeading === heading.id ? '600' : '400',
                                            lineHeight: '1.4',
                                            flex: 1,
                                            textAlign: 'left'
                                        }}>
                                            {heading.text}
                                        </span>
                                    </div>
                                </div>
                            )
                        }))}
                    />
                </div>

                <style jsx>{`
                    .toc-item:hover {
                        background: rgba(255, 255, 255, 0.1) !important;
                        border: 1px solid rgba(255, 255, 255, 0.2) !important;
                        transform: translateX(4px);
                    }

                    .toc-item-active {
                        background: rgba(255, 255, 255, 0.15) !important;
                        border: 1px solid rgba(255, 255, 255, 0.3) !important;
                        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
                    }
                `}</style>
            </div>
        </Affix>
    );
};

export default TableOfContents;
