import {
    AliwangwangOutlined, ApiOutlined, AppstoreOutlined, BugOutlined, ContactsOutlined, EditOutlined, ExceptionOutlined, GlobalOutlined, PictureOutlined, HomeOutlined,
    LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UnorderedListOutlined, UserOutlined
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, Menu, message, Space } from "antd"
import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { logoutAPI } from "../../services/api.service";
import { ALL_PERMISSIONS } from "../../config/permission";
const { Sider, Content } = Layout;

const LayoutAdmin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [menuItems, setMenuItems] = useState([]);
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        localStorage.removeItem('access_token')
        setUser({})
        message.success("Đăng xuất thành công")
        navigate('/')
    }

    const itemsDropdown = [
        {
            label: <Link to={'/'}>Trang chủ</Link>,
            key: 'home',
            icon: <HomeOutlined />
        },
        {
            label: "Đăng xuất",
            key: 'logout',
            icon: <LogoutOutlined />,
            onClick: handleLogout
        },
    ]

    useEffect(() => {
        if (user?.permissions?.length) {
            console.log("=== LAYOUT ADMIN DEBUG ===");
            console.log("User permissions count:", user.permissions.length);
            console.log("User permissions:", user.permissions);
            console.log("User role:", user.roleName);
            
            // List all permission names for easier analysis
            const permissionNames = user.permissions.map(p => p.name).sort();
            console.log("Permission names (sorted):", permissionNames);
            
            // Check for duplicates
            const duplicates = permissionNames.filter((item, index) => permissionNames.indexOf(item) !== index);
            if (duplicates.length > 0) {
                console.warn("Duplicate permissions found:", duplicates);
            }
            console.log("========================");

            const viewCategory = user?.permissions?.find(item =>
                item.apiPath === ALL_PERMISSIONS?.CATEGORY?.GET_PAGINATE?.apiPath
                && item.method === ALL_PERMISSIONS?.CATEGORY?.GET_PAGINATE?.method
            )

            const viewProduct = user?.permissions?.find(item =>
                item.apiPath === ALL_PERMISSIONS?.PRODUCT?.GET_PAGINATE?.apiPath
                && item.method === ALL_PERMISSIONS?.PRODUCT?.GET_PAGINATE?.method
            )

            // const viewUser = user?.permissions?.find(item =>
            //     item.apiPath === ALL_PERMISSIONS?.USER?.GET_PAGINATE?.apiPath
            //     && item.method === ALL_PERMISSIONS?.USER?.GET_PAGINATE?.method
            // )

            const viewDesign = user?.permissions?.find(item =>
                item.apiPath === ALL_PERMISSIONS?.DESIGN?.GET_PAGINATE?.apiPath
                && item.method === ALL_PERMISSIONS?.DESIGN?.GET_PAGINATE?.method
            )

            // const viewRole = user?.permissions?.find(item =>
            //     item.apiPath === ALL_PERMISSIONS?.ROLE?.GET_PAGINATE?.apiPath
            //     && item.method === ALL_PERMISSIONS?.ROLE?.GET_PAGINATE?.method
            // )

            // const viewPermission = user?.permissions?.find(item =>
            //     item.apiPath === ALL_PERMISSIONS?.PERMISSION?.GET_PAGINATE?.apiPath
            //     && item.method === ALL_PERMISSIONS?.PERMISSION?.GET_PAGINATE?.method
            // )

            const viewArticle = user?.permissions?.find(item =>
                item.apiPath === ALL_PERMISSIONS?.ARTICLE?.GET_PAGINATE?.apiPath
                && item.method === ALL_PERMISSIONS?.ARTICLE?.GET_PAGINATE?.method
            )

            const viewContact = user?.permissions?.find(item =>
                item.apiPath === ALL_PERMISSIONS?.INQUIRY?.GET_PAGINATE?.apiPath
                && item.method === ALL_PERMISSIONS?.INQUIRY?.GET_PAGINATE?.method
            )

            const viewBanner = user?.permissions?.find(item =>
                item.apiPath === ALL_PERMISSIONS?.BANNER?.GET_PAGINATE?.apiPath
                && item.method === ALL_PERMISSIONS?.BANNER?.GET_PAGINATE?.method
            )

            const viewArticleCategory = user?.permissions?.find(item =>
                item.name === 'ARTICLE_CATEGORY_LIST' ||
                item.apiPath === ALL_PERMISSIONS?.ARTICLE_CATEGORY?.GET_PAGINATE?.apiPath
            ) || user.roleName === "ADMIN"

            const full = [
                {
                    label: <Link to='/admin'>Dashboard</Link>,
                    key: '/admin',
                    icon: <AppstoreOutlined />
                },
                ...(viewCategory ? [{
                    label: <Link to='/admin/categories'>Danh mục</Link>,
                    key: '/admin/categories',
                    icon: <UnorderedListOutlined />
                }] : []),
                ...(viewProduct ? [{
                    label: <Link to='/admin/products'>Sản phẩm</Link>,
                    key: '/admin/products',
                    icon: <AliwangwangOutlined />
                }] : []),
                ...(user.roleName === "ADMIN" ? [{
                    label: <Link to='/admin/users'>Người dùng</Link>,
                    key: '/admin/users',
                    icon: <UserOutlined />
                }] : []),
                ...(viewDesign ? [{
                    label: <Link to='/admin/designs'>Bản thiết kế</Link>,
                    key: '/admin/designs',
                    icon: <EditOutlined />
                }] : []),
                ...(user.roleName === "ADMIN" ? [{
                    label: <Link to='/admin/roles'>Vai trò</Link>,
                    key: '/admin/roles',
                    icon: <ExceptionOutlined />
                }] : []),
                ...(user.roleName === "ADMIN" ? [{
                    label: <Link to='/admin/permissions'>Quyền hạn</Link>,
                    key: '/admin/permissions',
                    icon: <ApiOutlined />
                }] : []),
                ...(viewArticle ? [{
                    label: <Link to='/admin/articles'>Tin tức / Dự án</Link>,
                    key: '/admin/articles',
                    icon: <GlobalOutlined />
                }] : []),
                // Temporarily always show article categories for testing
                {
                    label: <Link to='/admin/article-categories'>Danh mục bài viết</Link>,
                    key: '/admin/article-categories',
                    icon: <UnorderedListOutlined />
                },
                // Debug permissions page - always show for admin
                ...(user.roleName === "ADMIN" ? [{
                    label: <Link to='/admin/debug-permissions'>🐛 Debug Permissions</Link>,
                    key: '/admin/debug-permissions',
                    icon: <BugOutlined />
                }] : []),
                ...(viewContact ? [{
                    label: <Link to='/admin/contact'>Liên hệ</Link>,
                    key: '/admin/contact',
                    icon: <ContactsOutlined />
                }] : []),
                ...(viewBanner ? [{
                    label: <Link to='/admin/banners'>Quản lý Banner</Link>,
                    key: '/admin/banners',
                    icon: <PictureOutlined />
                }] : []),

            ];

            setMenuItems(full);
        }
    }, [user?.permissions])

    return (
        <>
            <Layout
                style={{ minHeight: '100vh' }}
            >
                <Sider theme="light" collapsible collapsed={collapsed}>
                    <div className="demo-logo-vertical" />
                    <div style={{ height: 32, margin: 16, textAlign: 'center' }}>
                        <BugOutlined />  ADMIN
                    </div>
                    <Menu
                        mode="inline"
                        items={menuItems}
                    />
                </Sider>

                <Layout>
                    <div style={{ display: "flex", justifyContent: "space-between", marginRight: 20 }}>
                        <Button
                            type="text"
                            icon={collapsed ? React.createElement(MenuUnfoldOutlined) : React.createElement(MenuFoldOutlined)}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />

                        <Dropdown menu={{ items: itemsDropdown }} trigger={['click']}>
                            <Space style={{ cursor: "pointer" }}>
                                <span>Welcome {user?.fullName}</span>
                                <Avatar> {user?.fullName?.substring(0, 2)?.toUpperCase()} </Avatar>
                            </Space>
                        </Dropdown>
                    </div>

                    <Content style={{ padding: '15px' }}>
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </>
    )
}

export default LayoutAdmin