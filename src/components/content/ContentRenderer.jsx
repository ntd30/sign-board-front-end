import React from 'react';
import { TextBlock, ImageBlock, LinkBlock, HeadingBlock, ListBlock, QuoteBlock, CodeBlock } from './ContentBlocks';

/**
 * Parser đơn giản để chuyển đổi HTML thành các component React
 */
class ContentRenderer {
    constructor() {
        this.processedElements = [];
    }

    /**
     * Parse HTML string thành các React elements
     */
    parseHTML(htmlString) {
        if (!htmlString || typeof htmlString !== 'string') {
            return [];
        }

        // Tạo một DOM element tạm thời để parse HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlString;

        // Lấy tất cả child nodes
        const nodes = Array.from(tempDiv.childNodes);

        return this.processNodes(nodes);
    }

    /**
     * Xử lý các DOM nodes thành React elements
     */
    processNodes(nodes) {
        const elements = [];

        nodes.forEach((node, index) => {
            const reactElement = this.processNode(node, index);
            if (reactElement) {
                elements.push(reactElement);
            }
        });

        return elements;
    }

    /**
     * Xử lý một DOM node thành React element
     */
    processNode(node, key) {
        if (node.nodeType === Node.TEXT_NODE) {
            // Xử lý text node
            const text = node.textContent.trim();
            if (text) {
                return React.createElement(TextBlock, {
                    key,
                    content: text
                });
            }
            return null;
        }

        if (node.nodeType === Node.ELEMENT_NODE) {
            const tagName = node.tagName.toLowerCase();

            switch (tagName) {
                case 'img':
                    return this.processImage(node, key);

                case 'a':
                    return this.processLink(node, key);

                case 'h1':
                case 'h2':
                case 'h3':
                case 'h4':
                case 'h5':
                case 'h6':
                    return this.processHeading(node, key);

                case 'p':
                    return this.processParagraph(node, key);

                case 'ul':
                case 'ol':
                    return this.processList(node, key);

                case 'blockquote':
                    return this.processQuote(node, key);

                case 'pre':
                case 'code':
                    return this.processCode(node, key);

                case 'br':
                    return React.createElement('br', { key });

                case 'hr':
                    return React.createElement('hr', {
                        key,
                        style: {
                            margin: '20px 0',
                            border: 'none',
                            borderTop: '1px solid #dee2e6'
                        }
                    });

                default:
                    // Với các thẻ khác, xử lý đệ quy children
                    if (node.children && node.children.length > 0) {
                        const children = this.processNodes(Array.from(node.children));
                        if (children.length > 0) {
                            return React.createElement(
                                tagName,
                                { key },
                                children
                            );
                        }
                    }
                    return null;
            }
        }

        return null;
    }

    /**
     * Xử lý hình ảnh
     */
    processImage(imgNode, key) {
        const src = imgNode.getAttribute('src');
        const alt = imgNode.getAttribute('alt');

        if (!src) return null;

        // Kiểm tra xem có phải base64 không
        const isBase64 = src.includes('data:image');

        return React.createElement(ImageBlock, {
            key,
            src,
            alt,
            isBase64
        });
    }

    /**
     * Xử lý link
     */
    processLink(linkNode, key) {
        const href = linkNode.getAttribute('href');
        const textContent = linkNode.textContent.trim();

        if (!href || !textContent) return null;

        return React.createElement(LinkBlock, {
            key,
            href
        }, textContent);
    }

    /**
     * Xử lý tiêu đề
     */
    processHeading(headingNode, key) {
        const level = parseInt(headingNode.tagName.charAt(1));
        const content = headingNode.textContent.trim();

        if (!content) return null;

        return React.createElement(HeadingBlock, {
            key,
            level,
            content
        });
    }

    /**
     * Xử lý đoạn văn
     */
    processParagraph(pNode, key) {
        const children = pNode.children && pNode.children.length > 0
            ? this.processNodes(Array.from(pNode.children))
            : [pNode.textContent.trim()];

        if (children.length === 0) return null;

        return React.createElement(TextBlock, {
            key,
            content: children
        });
    }

    /**
     * Xử lý danh sách
     */
    processList(listNode, key) {
        const isOrdered = listNode.tagName.toLowerCase() === 'ol';
        const items = [];

        Array.from(listNode.children).forEach(liNode => {
            if (liNode.tagName.toLowerCase() === 'li') {
                const liChildren = liNode.children && liNode.children.length > 0
                    ? this.processNodes(Array.from(liNode.children))
                    : [liNode.textContent.trim()];
                items.push(liChildren);
            }
        });

        if (items.length === 0) return null;

        return React.createElement(ListBlock, {
            key,
            items,
            ordered: isOrdered
        });
    }

    /**
     * Xử lý block trích dẫn
     */
    processQuote(quoteNode, key) {
        const content = quoteNode.textContent.trim();
        if (!content) return null;

        return React.createElement(QuoteBlock, {
            key,
            content
        });
    }

    /**
     * Xử lý code block
     */
    processCode(codeNode, key) {
        const content = codeNode.textContent.trim();
        if (!content) return null;

        // Lấy ngôn ngữ từ class nếu có
        const className = codeNode.getAttribute('class') || '';
        const languageMatch = className.match(/language-(\w+)/);
        const language = languageMatch ? languageMatch[1] : 'text';

        return React.createElement(CodeBlock, {
            key,
            content,
            language
        });
    }
}

/**
 * ContentRenderer component để render nội dung bài viết
 */
const ContentRendererComponent = ({ htmlContent, className, style }) => {
    const renderer = new ContentRenderer();
    const parsedElements = renderer.parseHTML(htmlContent);

    return (
        <div
            className={`content-renderer ${className || ''}`}
            style={{
                width: '100%',
                ...style
            }}
        >
            {parsedElements.map((element, index) => element)}
        </div>
    );
};

export default ContentRendererComponent;
