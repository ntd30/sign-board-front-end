import {
    DownOutlined, HomeOutlined, LoginOutlined, LogoutOutlined, MenuOutlined, UserOutlined
} from "@ant-design/icons";
import { Avatar, Button, Col, Drawer, Dropdown, Grid, Menu, message, Row } from "antd";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { fetchArticleCategoryTreeAPI } from '../../../services/api.service';
import '../../../styles/header.css'; // Import the new CSS file

const { useBreakpoint } = Grid;

const Header = () => {
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [current, setCurrent] = useState('home');
    const [categories, setCategories] = useState([]);
    const { user, setUser } = useContext(AuthContext); // Giữ lại để dùng cho mobile drawer nếu cần
    const navigate = useNavigate();
    const location = useLocation();
    const screens = useBreakpoint();
    const isMobile = !screens.md;

    // Determine current menu item from URL
    useEffect(() => {
        const path = location.pathname.substring(1);
        setCurrent(path || 'home');
    }, [location.pathname]);

    // Fetch categories for the menu
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const res = await fetchArticleCategoryTreeAPI();
                console.log('📋 Categories loaded from API:', res?.data);

                if (res?.data) {
                    const validCategories = res.data.filter(category => {
                        const hasArticles = category.articleCount && category.articleCount > 0;
                        const hasChildrenArticles = category.totalChildrenArticlesCount && category.totalChildrenArticlesCount > 0;
                        const hasChildren = category.children && category.children.length > 0;
                        return hasArticles || hasChildrenArticles || hasChildren;
                    });

                    const menuItems = validCategories.map(category => {
                        const children = category.children || [];
                        const validChildren = children.filter(child => {
                            const hasArticles = child.articleCount && child.articleCount > 0;
                            const hasChildrenArticles = child.totalChildrenArticlesCount && child.totalChildrenArticlesCount > 0;
                            const hasChildren = child.children && child.children.length > 0;
                            return hasArticles || hasChildrenArticles || hasChildren;
                        });

                        const childrenMenuItems = validChildren.map(child => ({
                            key: child.slug,
                            label: (
                                <Link to={`/${child.slug}?id=${child.id}`}>{child.name}</Link>
                            ),
                        }));

                        if (childrenMenuItems.length > 0) {
                            return {
                                key: category.slug,
                                label: (
                                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        {category.name}
                                        <DownOutlined style={{
                                            fontSize: '10px',
                                            marginLeft: '8px',
                                            transition: 'transform 0.3s ease',
                                            transform: 'rotate(0deg)'
                                        }} />
                                    </span>
                                ),
                                children: childrenMenuItems,
                                popupClassName: 'submenu-with-arrow',
                            };
                        }

                        return {
                            key: category.slug,
                            label: (
                                <Link to={`/${category.slug}?id=${category.id}`}>{category.name}</Link>
                            ),
                        };
                    });
                    setCategories(menuItems);
                }
            } catch (error) {
                console.error("Error loading article categories:", error);
            }
        };

        loadCategories();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        setUser({});
        message.success("Đăng xuất thành công");
        navigate('/');
    };

    const handleMenuClick = (e) => {
        if (isMobile) {
            setDrawerVisible(false);
        }
        setCurrent(e.key);
    };

    const menuItems = [
        { key: 'home', label: <Link to="/">Trang chủ</Link>, icon: <HomeOutlined /> },
        ...categories,
        { key: 'about', label: <Link to="/about">Giới thiệu</Link> },
        { key: 'contact', label: <Link to="/contact">Liên hệ</Link> },
    ];

    const mobileMenuItems = [
        ...menuItems,
        // Giữ lại phần login cho mobile nếu bạn muốn
        ...(!user?.id ? [{
            key: 'login',
            label: <Link to="/login">Đăng nhập</Link>,
            icon: <LoginOutlined />
        }] : []),
    ];

    const userDropdownMenu = ( // Giữ lại cho mobile drawer
        <Menu items={[
            {
                key: 'profile',
                label: <Link to={'/user'}>Thông tin cá nhân</Link>,
                icon: <UserOutlined />
            },
            {
                key: 'logout',
                label: "Đăng xuất",
                icon: <LogoutOutlined />,
                onClick: handleLogout,
                danger: true,
            }
        ]} />
    );

    const renderMobileDrawer = () => (
        <Drawer
            title={
                <div className="drawer-title">
                    <img src="/img/nhanvietadv-logo.png" alt="Logo" className="drawer-logo" />
                </div>
            }
            placement="right"
            onClose={() => setDrawerVisible(false)}
            open={isMobile && drawerVisible}
            width={Math.min(300, window.innerWidth * 0.85)}
            className="mobile-drawer"
            destroyOnClose
        >
            <Menu
                onClick={handleMenuClick}
                selectedKeys={[current]}
                mode="inline"
                items={mobileMenuItems}
            />
            {user?.id ? ( // Vẫn hiển thị user section trong mobile drawer
                <div className="mobile-user-section">
                    <div className="mobile-user-info">
                        <Avatar size="large" src={user.avatar} icon={<UserOutlined />} />
                        <div className="mobile-user-details">
                            <div className="user-name">{user.fullName}</div>
                            <div className="user-email">{user.email}</div>
                        </div>
                    </div>
                    <Button type="primary" danger block onClick={handleLogout}>
                        Đăng xuất
                    </Button>
                </div>
            ) : (
                <div className="mobile-auth-buttons">
                    <Link to="/login" style={{ width: '100%' }}>
                        <Button type="primary" block>Đăng nhập</Button>
                    </Link>
                    <Link to="/register" style={{ width: '100%' }}>
                        <Button block>Đăng ký</Button>
                    </Link>
                </div>
            )}
        </Drawer>
    );

    return (
        <>
            <header className="app-header">
                <Row align="middle" justify="space-between" className="header-row">
                    {/* === CỘT LOGO (Trái) === */}
                    <Col xs={12} sm={8} md={6} lg={4} className="header-logo">
                        <Link to="/">
                            <img src="/img/nhanvietadv-logo.png" alt="Sign Board Logo" />
                        </Link>
                    </Col>

                    {/* === CỘT MENU (Giữa) === */}
                    {!isMobile && (
                        <Col md={12} lg={16} className="desktop-nav"> {/* Đổi tên thành desktop-nav để dễ quản lý style */}
                            <Menu
                                onClick={handleMenuClick}
                                selectedKeys={[current]}
                                mode="horizontal"
                                items={menuItems}
                                popupClassName="header-submenu-popup"
                                disabledOverflow
                            />
                        </Col>
                    )}

                    {/* === CỘT PHẢI (Trống trên desktop, Mobile Button trên mobile) === */}
                    <Col xs={12} sm={16} md={6} lg={4} className="header-right">
                        {isMobile && (
                            <Button
                                className="mobile-menu-button"
                                type="text"
                                icon={<MenuOutlined />}
                                onClick={() => setDrawerVisible(true)}
                            />
                        )}
                        {/* Trên desktop, cột này sẽ trống để tạo khoảng cách */}
                    </Col>
                </Row>
            </header>
            {renderMobileDrawer()}
        </>
    );
};

export default Header;