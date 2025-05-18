import { grey, green, blue, red, orange } from '@ant-design/colors'

export const ALL_MODULES = [
    { value: 'PRODUCT', label: 'PRODUCT' },
    { value: 'DESIGN', label: 'DESIGN' },
    { value: 'USER', label: 'USER' },
    { value: 'CATEGORY', label: 'CATEGORY' },
    { value: 'CONTACT', label: 'CONTACT' },
    { value: 'PERMISSION', label: 'PERMISSION' },
    { value: 'ROLE', label: 'ROLE' },
    { value: 'ARTICLES', label: 'ARTICLES' },
    { value: 'CONTACT', label: 'CONTACT' },
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