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
    const { user, setUser } = useContext(AuthContext);
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
                if (res?.data) {
                    const menuItems = res.data.map(category => ({
                        key: category.slug,
                        label: (
                            <div className="menu-item-label-wrapper">
                                <Link to={`/${category.slug}`}>{category.name}</Link>
                                {category.children?.length > 0 && (
                                    <DownOutlined className="menu-item-arrow" />
                                )}
                            </div>
                        ),
                        children: category.children?.length > 0 ?
                            category.children.map(child => ({
                                key: child.slug,
                                label: <Link to={`/${child.slug}`}>{child.name}</Link>
                            })) : null
                    }));
                    setCategories(menuItems);
                }
            } catch (error) {
                console.error("Error loading article categories:", error);
                // You can set fallback categories here if needed
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
        ...(!user?.id ? [{
            key: 'login',
            label: <Link to="/login">Đăng nhập</Link>,
            icon: <LoginOutlined />
        }] : []),
    ];

    const userDropdownMenu = (
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

    const renderUserSection = () => {
        if (isMobile) return null; // Handled in Drawer for mobile

        if (user?.id) {
            return (
                <Dropdown overlay={userDropdownMenu} trigger={['hover']}>
                    <div className="user-menu-trigger">
                        <Avatar size="small" src={user.avatar} icon={<UserOutlined />} />
                        <span className="user-name">{user.fullName || 'User'}</span>
                        <DownOutlined style={{ fontSize: '12px' }} />
                    </div>
                </Dropdown>
            );
        }

        return (
            <Link to="/login">
                <Button type="primary" ghost className="login-button">
                    ĐĂNG NHẬP
                </Button>
            </Link>
        );
    };

    const renderMobileDrawer = () => (
        <Drawer
            title={
                <div className="drawer-title">
                    <img src="/img/NV logo.png" alt="Logo" className="drawer-logo" />
                    <span className="drawer-title-text">Menu</span>
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
            {user?.id ? (
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
                    <Col xs={12} sm={8} md={5} lg={4} className="header-logo">
                        <Link to="/">
                            <img src="/img/NV logo.png" alt="Sign Board Logo" />
                        </Link>
                    </Col>

                    {!isMobile && (
                        <Col md={14} lg={16} className="desktop-nav">
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

                    <Col xs={12} sm={16} md={5} lg={4} className="header-right">
                        {renderUserSection()}
                        {isMobile && (
                            <Button
                                className="mobile-menu-button"
                                type="text"
                                icon={<MenuOutlined />}
                                onClick={() => setDrawerVisible(true)}
                            />
                        )}
                    </Col>
                </Row>
            </header>
            {renderMobileDrawer()}
        </>
    );
};

export default Header;
