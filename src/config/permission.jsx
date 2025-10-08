import { grey, green, blue, red, orange } from '@ant-design/colors'

export const ALL_PERMISSIONS = {
    PRODUCT: {
        GET_PAGINATE: { method: "GET", apiPath: '/api/admin/product', module: "PRODUCT" },
        CREATE: { method: "POST", apiPath: '/api/admin/product/create', module: "PRODUCT" },
        UPDATE: { method: "PUT", apiPath: '/api/admin/product/create', module: "PRODUCT" },
        DELETE: { method: "DELETE", apiPath: '/api/admin/product/create/{id}', module: "PRODUCT" },
    },
    DESIGN: {
        GET_PAGINATE: { method: "GET", apiPath: '/api/admin/user-designs', module: "DESIGN" },
        // CREATE: { method: "POST", apiPath: '/api/admin/user-designs', module: "DESIGN" },
        UPDATE: { method: "PUT", apiPath: '/api/admin/user-designs/{id}', module: "DESIGN" },
        DELETE: { method: "DELETE", apiPath: '/api/admin/user-designs/{id}', module: "DESIGN" },
    },
    USER: {
        GET_PAGINATE: { method: "GET", apiPath: '/api/admin/users', module: "USER" },
        CREATE: { method: "POST", apiPath: '/api/admin/users/create', module: "USER" },
        UPDATE: { method: "PUT", apiPath: '/api/admin/users/{id}', module: "USER" },
        DELETE: { method: "DELETE", apiPath: '/api/admin/users/{id}', module: "USER" },
    },
    CATEGORY: {
        GET_PAGINATE: { method: "GET", apiPath: '/api/admin/category', module: "CATEGORY" },
        CREATE: { method: "POST", apiPath: '/api/admin/category/create', module: "CATEGORY" },
        UPDATE: { method: "PUT", apiPath: '/api/admin/category/edit/{id}', module: "CATEGORY" },
        DELETE: { method: "DELETE", apiPath: '/api/admin/category/delete/{id}', module: "CATEGORY" },
    },
    INQUIRY: {
        GET_PAGINATE: { method: "GET", apiPath: '/api/admin/inquiry/list', module: "INQUIRY" },
        UPDATE: { method: "PUT", apiPath: '/api/admin/inquiry/{id}/status', module: "INQUIRY" },
    },
    PERMISSION: {
        GET_PAGINATE: { method: "GET", apiPath: '/api/admin/permissions', module: "PERMISSION" },
        CREATE: { method: "POST", apiPath: '/api/admin/permissions', module: "PERMISSION" },
        UPDATE: { method: "PUT", apiPath: '/api/admin/permissions', module: "PERMISSION" },
        DELETE: { method: "DELETE", apiPath: '/api/admin/permissions/{id}', module: "PERMISSION" },
    },
    ROLE: {
        GET_PAGINATE: { method: "GET", apiPath: '/api/admin/roles', module: "ROLE" },
        CREATE: { method: "POST", apiPath: '/api/admin/roles', module: "ROLE" },
        UPDATE: { method: "PUT", apiPath: '/api/admin/roles/{id}', module: "ROLE" },
        DELETE: { method: "DELETE", apiPath: '/api/admin/roles/{id}', module: "ROLE" },
    },
    ARTICLE: {
        GET_PAGINATE: { method: "GET", apiPath: '/api/admin/article', module: "ARTICLE" },
        CREATE: { method: "POST", apiPath: '/api/admin/article/create', module: "ARTICLE" },
        UPDATE: { method: "PUT", apiPath: '/api/admin/article/edit/{id}', module: "ARTICLE" },
        DELETE: { method: "DELETE", apiPath: '/api/admin/article/delete/{id}', module: "ARTICLE" },
    },
    BANNER: {
        GET_PAGINATE: { method: "GET", apiPath: '/api/admin/banners', module: "BANNER" },
        CREATE: { method: "POST", apiPath: '/api/admin/banners', module: "BANNER" },
        UPDATE: { method: "PUT", apiPath: '/api/admin/banners/{id}', module: "BANNER" },
        DELETE: { method: "DELETE", apiPath: '/api/admin/banners/{id}', module: "BANNER" },
    },
    ARTICLE_CATEGORY: {
        GET_PAGINATE: { method: "GET", apiPath: '/api/article-categories', module: "ARTICLE_CATEGORY" },
        CREATE: { method: "POST", apiPath: '/api/article-categories', module: "ARTICLE_CATEGORY" },
        UPDATE: { method: "PUT", apiPath: '/api/article-categories/{id}', module: "ARTICLE_CATEGORY" },
        DELETE: { method: "DELETE", apiPath: '/api/article-categories/{id}', module: "ARTICLE_CATEGORY" },
        TREE: { method: "GET", apiPath: '/api/article-categories/tree', module: "ARTICLE_CATEGORY" },
        SEARCH: { method: "GET", apiPath: '/api/article-categories/search', module: "ARTICLE_CATEGORY" },
    }
}

export const ALL_MODULES = [
    { value: 'PRODUCT', label: 'PRODUCT' },
    { value: 'DESIGN', label: 'DESIGN' },
    { value: 'USER', label: 'USER' },
    { value: 'BANNER', label: 'BANNER' },
    { value: 'CATEGORY', label: 'CATEGORY' },
    { value: 'ARTICLE_CATEGORY', label: 'ARTICLE_CATEGORY' },
    { value: 'INQUIRY', label: 'INQUIRY' },
    { value: 'PERMISSION', label: 'PERMISSION' },
    { value: 'ROLE', label: 'ROLE' },
    { value: 'ARTICLES', label: 'ARTICLES' },
    { value: 'BANNER', label: 'BANNERS' },
]

export function colorMethod(method) {
    switch (method) {
        case "POST":
            return green[6]
        case "PUT":
            return orange[6]
        case "GET":
            return blue[6]
        case "DELETE":
            return red[6]
        default:
            return grey[10]
    }
}