import React from 'react';
import { Typography, Image, Space } from 'antd';
import { LinkOutlined, PictureOutlined } from '@ant-design/icons';

const { Text, Paragraph, Title } = Typography;

/**
 * Component để render văn bản thường
 */
const TextBlock = ({ content, className, style }) => {
    return (
        <div className={`content-text-block ${className || ''}`} style={style}>
            <Paragraph
                style={{
                    margin: '16px 0',
                    fontSize: '15px',
                    lineHeight: '1.7',
                    color: '#495057',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}
            >
                {content}
            </Paragraph>
        </div>
    );
};

/**
 * Component để render hình ảnh với styling linh hoạt
 */
const ImageBlock = ({ src, alt, className, style, isBase64 = false }) => {
    const generateImageAlt = (src) => {
        return 'Hình ảnh bài viết';
    };

    const imageAlt = alt || generateImageAlt(src);

    return (
        <div className={`content-image-block ${className || ''}`} style={{
            margin: '16px 0',
            textAlign: 'center',
            ...style
        }}>
            <div style={{
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e9ecef',
                display: 'inline-block',
                maxWidth: '100%'
            }}>
                <Image
                    src={src}
                    alt={imageAlt}
                    loading="lazy"
                    style={{
                        maxWidth: '100%',
                        height: 'auto',
                        display: 'block',
                        objectFit: 'contain'
                    }}
                    placeholder={
                        <div style={{
                            width: '100%',
                            height: '200px',
                            background: '#f5f5f5',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#999'
                        }}>
                            <PictureOutlined style={{ fontSize: '24px', marginRight: '8px' }} />
                            <span>Đang tải hình ảnh...</span>
                        </div>
                    }
                />
            </div>
            {/* Bỏ phần hiển thị tên hình ảnh */}
        </div>
    );
};

/**
 * Component để render link với styling đẹp
 */
const LinkBlock = ({ href, children, className, style }) => {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`content-link-block ${className || ''}`}
            style={{
                color: '#007bff',
                textDecoration: 'none',
                borderBottom: '1px solid transparent',
                transition: 'all 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                ...style
            }}
            onMouseEnter={(e) => {
                e.target.style.color = '#0056b3';
                e.target.style.borderBottomColor = '#007bff';
            }}
            onMouseLeave={(e) => {
                e.target.style.color = '#007bff';
                e.target.style.borderBottomColor = 'transparent';
            }}
        >
            {children}
            <LinkOutlined style={{ fontSize: '12px' }} />
        </a>
    );
};

/**
 * Component để render tiêu đề với styling
 */
const HeadingBlock = ({ level, content, className, style }) => {
    const HeadingTag = level <= 6 ? `h${level}` : 'h6';

    const headingStyles = {
        1: { fontSize: '2rem', fontWeight: '700', margin: '24px 0 16px 0', color: '#212529' },
        2: { fontSize: '1.75rem', fontWeight: '600', margin: '20px 0 14px 0', color: '#343a40' },
        3: { fontSize: '1.5rem', fontWeight: '600', margin: '18px 0 12px 0', color: '#495057' },
        4: { fontSize: '1.25rem', fontWeight: '500', margin: '16px 0 10px 0', color: '#6c757d' },
        5: { fontSize: '1.1rem', fontWeight: '500', margin: '14px 0 8px 0', color: '#6c757d' },
        6: { fontSize: '1rem', fontWeight: '500', margin: '12px 0 8px 0', color: '#6c757d' }
    };

    return React.createElement(
        HeadingTag,
        {
            className: `content-heading-block h${level} ${className || ''}`,
            style: {
                ...headingStyles[level] || headingStyles[6],
                lineHeight: '1.3',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                ...style
            }
        },
        content
    );
};

/**
 * Component để render danh sách
 */
const ListBlock = ({ items, ordered = false, className, style }) => {
    const ListTag = ordered ? 'ol' : 'ul';

    return React.createElement(
        ListTag,
        {
            className: `content-list-block ${className || ''}`,
            style: {
                margin: '16px 0',
                paddingLeft: '24px',
                color: '#495057',
                ...style
            }
        },
        items.map((item, index) => (
            <li
                key={index}
                style={{
                    marginBottom: '8px',
                    lineHeight: '1.6',
                    fontSize: '15px'
                }}
            >
                {item}
            </li>
        ))
    );
};

/**
 * Component để render block trích dẫn
 */
const QuoteBlock = ({ content, className, style }) => {
    return (
        <blockquote
            className={`content-quote-block ${className || ''}`}
            style={{
                margin: '16px 0',
                padding: '16px 20px',
                background: '#f8f9fa',
                borderLeft: '4px solid #007bff',
                borderRadius: '0 8px 8px 0',
                fontStyle: 'italic',
                color: '#495057',
                fontSize: '15px',
                lineHeight: '1.6',
                ...style
            }}
        >
            "{content}"
        </blockquote>
    );
};

/**
 * Component để render code block
 */
const CodeBlock = ({ content, language = 'text', className, style }) => {
    return (
        <pre
            className={`content-code-block ${className || ''}`}
            style={{
                margin: '16px 0',
                padding: '16px',
                background: '#2d3748',
                color: '#e2e8f0',
                borderRadius: '8px',
                overflow: 'auto',
                fontSize: '14px',
                fontFamily: 'Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                border: '1px solid #4a5568',
                ...style
            }}
        >
            <code>{content}</code>
        </pre>
    );
};

export {
    TextBlock,
    ImageBlock,
    LinkBlock,
    HeadingBlock,
    ListBlock,
    QuoteBlock,
    CodeBlock
};
