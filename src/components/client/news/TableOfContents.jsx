import React, { useEffect, useState } from 'react';
import { Anchor, Affix } from 'antd';

const { Link } = Anchor;

const TableOfContents = ({ content, contentRef }) => {
    const [headings, setHeadings] = useState([]);
    const [processedContent, setProcessedContent] = useState('');
    const [activeHeading, setActiveHeading] = useState('');

    useEffect(() => {
        if (content && contentRef?.current) {
            console.log('TOC - Processing content:', content.substring(0, 200) + '...');

            // Tạo một div tạm thời để parse HTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = content;

            // Lấy tất cả các heading h1, h2, h3, h4, h5, h6
            const headingElements = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');

            console.log('TOC - Found headings:', headingElements.length);

            if (headingElements.length === 0) {
                setHeadings([]);
                return;
            }

            const headingsData = Array.from(headingElements).map((heading, index) => {
                const level = parseInt(heading.tagName.charAt(1));
                const text = heading.textContent.trim();
                const originalHTML = heading.outerHTML;

                // Tạo ID từ text của heading
                let baseSlug = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                let id = `toc-${level}-${index}-${baseSlug}`;

                console.log(`TOC - Created ID: ${id} for heading: ${text}`);

                return {
                    id,
                    text,
                    level,
                    index,
                    originalHTML,
                    element: heading
                };
            });

            setHeadings(headingsData);

            // Đợi một chút để đảm bảo content đã được hiển thị trong DOM
            setTimeout(() => {
                if (headingsData.length > 0 && contentRef.current) {
                    console.log('TOC - Updating content with IDs');

                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = content;

                    const contentHeadings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');

                    Array.from(contentHeadings).forEach((heading, index) => {
                        if (index < headingsData.length) {
                            const headingData = headingsData[index];
                            if (heading.textContent.trim() === headingData.text) {
                                heading.id = headingData.id;
                                console.log(`TOC - Set ID ${headingData.id} for heading: ${heading.textContent.trim()}`);
                            }
                        }
                    });

                    const updatedContent = tempDiv.innerHTML;
                    setProcessedContent(updatedContent);
                    contentRef.current.innerHTML = updatedContent;
                }
            }, 100);
        }
    }, [content, contentRef]);

    // useEffect để đảm bảo mục lục được cập nhật khi content trong DOM đã sẵn sàng
    useEffect(() => {
        if (headings.length > 0 && contentRef?.current) {
            const checkDOMReady = () => {
                const domHeadings = contentRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6');
                const headingsWithIds = Array.from(domHeadings).filter(h => h.id);

                console.log(`TOC - DOM check: ${headingsWithIds.length}/${domHeadings.length} headings have IDs`);

                if (headingsWithIds.length > 0) {
                    // Force re-render để cập nhật active state
                    setActiveHeading(prev => prev);
                } else {
                    // Nếu chưa có ID, thử lại sau 200ms
                    setTimeout(checkDOMReady, 200);
                }
            };

            setTimeout(checkDOMReady, 150);
        }
    }, [headings, contentRef]);

    // Scroll spy để track heading đang active
    useEffect(() => {
        if (headings.length === 0) return;

        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const headingElements = headings.map(h => document.getElementById(h.id)).filter(Boolean);
                    const scrollPosition = window.scrollY + 150;

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
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [headings]);

    const handleClick = (e, link) => {
        e.preventDefault();
        e.stopPropagation();

        const href = link.href || link;
        const targetId = href.split('#')[1];

        console.log('TOC Click - Target ID:', targetId); // Debug log

        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            console.log('TOC Click - Element found:', targetElement); // Debug log

            const headerHeight = 150; // Điều chỉnh offset để tránh header che
            const targetPosition = targetElement.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Cập nhật active heading
            setActiveHeading(targetId);

            // Đánh dấu đã xử lý để tránh conflict
            return false;
        } else {
            console.log('TOC Click - Element NOT found for ID:', targetId); // Debug log
            console.log('Available IDs:', Array.from(document.querySelectorAll('[id]')).map(el => el.id)); // Debug log
        }
    };

    if (headings.length === 0) {
        return null;
    }

    return (
        <Affix offsetTop={120}>
            <div style={{
                background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
                borderRadius: '16px',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
                padding: '0',
                marginBottom: '32px',
                overflow: 'hidden',
                position: 'sticky',
                top: '120px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)'
            }}>
                {/* Header của mục lục */}
                <div style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(15px)',
                    padding: '24px 28px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
                    textAlign: 'center'
                }}>
                    <h3 style={{
                        margin: '0',
                        color: '#ffffff',
                        fontSize: '18px',
                        fontWeight: '700',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
                    }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                        </svg>
                        Mục lục bài viết
                    </h3>
                    <p style={{
                        margin: '8px 0 0 0',
                        color: 'rgba(255, 255, 255, 0.85)',
                        fontSize: '14px',
                        fontWeight: '500'
                    }}>
                        {headings.length} mục • Nhấn để chuyển đến
                    </p>
                </div>

                {/* Danh sách mục lục */}
                <div style={{
                    padding: '20px',
                    maxHeight: 'calc(100vh - 350px)',
                    overflowY: 'auto',
                    background: 'rgba(255, 255, 255, 0.02)'
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {headings.map((heading, index) => (
                            <div
                                key={heading.id}
                                onClick={(e) => handleClick(e, `#${heading.id}`)}
                                style={{
                                    padding: '14px 18px',
                                    margin: '0',
                                    borderRadius: '12px',
                                    background: activeHeading === heading.id
                                        ? 'rgba(255, 255, 255, 0.15)'
                                        : 'rgba(255, 255, 255, 0.05)',
                                    border: activeHeading === heading.id
                                        ? '2px solid rgba(255, 255, 255, 0.4)'
                                        : '2px solid transparent',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    cursor: 'pointer',
                                    boxShadow: activeHeading === heading.id
                                        ? '0 4px 12px rgba(255, 255, 255, 0.1)'
                                        : 'none'
                                }}
                                onMouseEnter={(e) => {
                                    if (activeHeading !== heading.id) {
                                        e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                                        e.target.style.transform = 'translateX(6px)';
                                        e.target.style.border = '2px solid rgba(255, 255, 255, 0.2)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (activeHeading !== heading.id) {
                                        e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                                        e.target.style.transform = 'translateX(0)';
                                        e.target.style.border = '2px solid transparent';
                                    }
                                }}
                            >
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px'
                                }}>
                                    {/* Icon cho level khác nhau */}
                                    <span style={{
                                        width: '24px',
                                        height: '24px',
                                        borderRadius: '50%',
                                        background: activeHeading === heading.id
                                            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                            : 'rgba(255, 255, 255, 0.25)',
                                        color: activeHeading === heading.id ? '#ffffff' : '#ffffff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '11px',
                                        fontWeight: 'bold',
                                        flexShrink: 0,
                                        boxShadow: activeHeading === heading.id
                                            ? '0 2px 8px rgba(102, 126, 234, 0.3)'
                                            : 'none'
                                    }}>
                                        {heading.level}
                                    </span>

                                    <span style={{
                                        color: '#ffffff',
                                        fontSize: '15px',
                                        fontWeight: activeHeading === heading.id ? '600' : '500',
                                        lineHeight: '1.4',
                                        flex: 1,
                                        textAlign: 'left',
                                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                                    }}>
                                        {heading.text}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Affix>
    );
};

export default TableOfContents;

