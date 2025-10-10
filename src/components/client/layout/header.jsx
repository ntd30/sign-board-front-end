import {
    AntDesignOutlined, AuditOutlined, DownOutlined, FireOutlined, HomeFilled, HomeOutlined, LoginOutlined, LogoutOutlined, MenuOutlined, ProductOutlined, SearchOutlined,
    SettingOutlined, UserOutlined
} from "@ant-design/icons";
import { Avatar, Button, Col, Drawer, Dropdown, Grid, Input, Menu, message, Row, Space } from "antd"
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/auth.context";
import { fetchAllCategoriesAPI, fetchAllParentCategoriesAPI, logoutAPI, fetchArticleCategoryTreeAPI } from '../../../services/api.service';

const { useBreakpoint } = Grid

const Header = () => {
    const [drawerVisible, setDrawerVisible] = useState(false)
    const [current, setCurrent] = useState(''); // State quản lý menu item được chọn
    const [categories, setCategories] = useState([])
    const token = localStorage.getItem("access_token")

    const screens = useBreakpoint()
    const isMobile = !screens.md

    const location = useLocation()
    const { user, setUser } = useContext(AuthContext)

    const navigate = useNavigate()

    // const loadCategories = async () => {
    //     const res = await fetchAllCategoriesAPI()
    //     setCategories(res.data)
    //     // console.log(res.data[0])
    // }

    useEffect(() => {
        if (location && location.pathname) {
            // Tìm slug từ pathname
            const pathSlug = location.pathname.substring(1) // Remove leading slash
            if (pathSlug) {
                setCurrent(pathSlug)
            } else {
                setCurrent("home")
            }
        }

        loadCategories()
    }, [])

    // Custom CSS for submenu styling
    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
            .header-submenu-popup .ant-menu-submenu-popup {
                min-width: 220px !important;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12) !important;
                border-radius: 12px !important;
                padding: 8px 0 !important;
                border: 1px solid #e9ecef !important;
                margin-top: 8px !important;
            }

            .header-submenu-popup .ant-menu-item {
                padding: 12px 20px !important;
                margin: 0 !important;
                font-size: 14px !important;
                line-height: 1.5 !important;
                transition: all 0.2s ease !important;
                border-radius: 8px !important;
                margin: 4px 8px !important;
            }

            .header-submenu-popup .ant-menu-item:hover {
                background-color: #f8f9fa !important;
                color: #007bff !important;
                transform: translateX(4px) !important;
            }

            .header-submenu-popup .ant-menu-item-selected {
                background-color: #e7f3ff !important;
                color: #007bff !important;
                font-weight: 500 !important;
            }

            .header-submenu-popup .ant-menu-submenu-arrow {
                color: #6c757d !important;
                font-size: 12px !important;
            }

            /* Mobile menu improvements */
            .ant-drawer-body .ant-menu-item {
                padding: 16px 20px !important;
                margin: 8px 0 !important;
                border-radius: 12px !important;
                font-size: 16px !important;
                font-weight: 500 !important;
                transition: all 0.2s ease !important;
            }

            .ant-drawer-body .ant-menu-item:hover {
                background-color: #f8f9fa !important;
                transform: translateX(8px) !important;
            }

            .ant-drawer-body .ant-menu-item-selected {
                background-color: #e7f3ff !important;
                color: #007bff !important;
            }

            /* Responsive header adjustments */
            @media (max-width: 768px) {
                .header-main {
                    padding: 12px 16px !important;
                }

                .ant-menu-horizontal {
                    font-size: 14px !important;
                }

                .ant-menu-horizontal .ant-menu-item {
                    padding: 0 12px !important;
                }
            }

            @media (max-width: 576px) {
                .header-main {
                    padding: 8px 12px !important;
                }

                .ant-menu-horizontal {
                    display: none !important;
                }
            }
        `;

        if (!document.getElementById('header-responsive-styles')) {
            style.id = 'header-responsive-styles';
            document.head.appendChild(style);
        }

        return () => {
            const existingStyle = document.getElementById('header-responsive-styles');
            if (existingStyle) {
                document.head.removeChild(existingStyle);
            }
        };
    }, []);

    const loadCategories = async () => {
        try {
            const res = await fetchArticleCategoryTreeAPI()
            if (res?.data) {
                // Chuyển đổi dữ liệu từ API thành format phù hợp với Ant Design Menu
                const menuItems = res.data.map(category => ({
                    key: category.slug,
                    label: (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                            <Link to={`/${category.slug}`} style={{ flex: 1 }}>{category.name}</Link>
                            {category.children && category.children.length > 0 && (
                                <DownOutlined style={{ fontSize: '12px', color: '#666', marginLeft: '8px' }} />
                            )}
                        </div>
                    ),
                    children: category.children && category.children.length > 0 ?
                        category.children.map(child => ({
                            key: child.slug,
                            label: <Link to={`/${child.slug}`} style={{ width: '100%', display: 'block' }}>{child.name}</Link>
                        })) : null
                }))
                setCategories(menuItems)
            }
        } catch (error) {
            console.error("Error loading article categories:", error)
            // Fallback to static menu items if API fails
            setCategories([
                {
                    key: 'dich-vu',
                    label: (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                            <Link to="/dich-vu" style={{ flex: 1 }}>Dịch vụ</Link>
                            <DownOutlined style={{ fontSize: '12px', color: '#666', marginLeft: '8px' }} />
                        </div>
                    ),
                    children: [
                        { key: 'lam-bien-quang-cao', label: <Link to="/lam-bien-quang-cao">Làm biển quảng cáo</Link> },
                        { key: 'bien-hop-den-bien-vay', label: <Link to="/bien-hop-den-bien-vay">Biển hộp đèn – Biển vẫy</Link> },
                        { key: 'bien-led-man-hinh-led', label: <Link to="/bien-led-man-hinh-led">Biển Led – màn hình Led</Link> },
                        { key: 'backrop-van-phong-khach-san', label: <Link to="/backrop-van-phong-khach-san">Backrop Văn Phòng – Khách sạn</Link> },
                        { key: 'bien-cong-ty-bien-chuc-danh', label: <Link to="/bien-cong-ty-bien-chuc-danh">Biển công ty – biển chức danh</Link> }
                    ]
                },
                {
                    key: 'mau-bien-dep',
                    label: (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                            <Link to="/mau-bien-dep" style={{ flex: 1 }}>Mẫu biển đẹp</Link>
                            <DownOutlined style={{ fontSize: '12px', color: '#666', marginLeft: '8px' }} />
                        </div>
                    ),
                    children: [
                        { key: 'mau-bien-linh-vuc-am-thuc', label: <Link to="/mau-bien-linh-vuc-am-thuc">Mẫu biển lĩnh vực ẩm thực</Link> },
                        { key: 'mau-bien-linh-vuc-spa', label: <Link to="/mau-bien-linh-vuc-spa">Mẫu biển lĩnh vực Spa</Link> },
                        { key: 'mau-bien-linh-vuc-suc-khoe', label: <Link to="/mau-bien-linh-vuc-suc-khoe">Mẫu biển lĩnh vực Sức khỏe</Link> },
                        { key: 'mau-bien-linh-vuc-khac', label: <Link to="/mau-bien-linh-vuc-khac">Mẫu biển lĩnh vực Khác</Link> }
                    ]
                },
                {
                    key: 'mau-chu',
                    label: <Link to="/mau-chu">Mẫu chữ</Link>
                },
                {
                    key: 'du-an',
                    label: <Link to="/du-an">Dự án</Link>
                }
            ])
        }
    }

    const handleGetProductByChildCategory = (childCategoryId, parentCategoryName, childCategoryName) => {
        navigate("/products", {
            state: {
                childCategoryId: childCategoryId,
                parentCategoryName: parentCategoryName,
                childCategoryName: childCategoryName,
            }
        })
    }

    const handleLogout = () => {
        localStorage.removeItem('access_token')
        setUser({})
        message.success("Đăng xuất thành công")
        navigate('/')
    }

    const itemsMobile = [
        {
            label: <Link to={"/"}>Trang chủ</Link>,
            key: 'home',
            icon: <HomeOutlined />
        },
        ...categories,
        {
            label: <Link to={"/about"}>Giới thiệu</Link>,
            key: 'about',
            icon: <UserOutlined />
        },
        {
            label: <Link to={"/contact"}>Liên hệ</Link>,
            key: 'contact',
            icon: <LoginOutlined />
        },
        ...(!user?.id ? [{
            label: <Link
                to={"/login"}
                style={{ cursor: "pointer" }}
            >Đăng nhập</Link>,
            key: 'login',
            icon: <LoginOutlined />
        },] : []),
        ...(user?.id ? [{
            label: "Đăng xuất",
            key: 'logout',
            icon: <LogoutOutlined />,
            onClick: handleLogout
        },] : []),
    ]

    const items = [
        {
            label: <Link to={"/"}>Trang chủ</Link>,
            key: 'home',
            icon: <HomeOutlined />
        },
        ...categories,
        {
            label: <Link to={"/about"}>Giới thiệu</Link>,
            key: 'about',
            icon: <UserOutlined />
        },
        {
            label: <Link to={"/contact"}>Liên hệ</Link>,
            key: 'contact',
            icon: <LoginOutlined />
        }
    ]

    const showDrawer = () => {
        setDrawerVisible(true);
    };

    const closeDrawer = () => {
        setDrawerVisible(false);
    };

    const handleMenuClick = (e) => {
        // Đóng drawer nếu đang mở trên mobile
        if (isMobile) {
            closeDrawer();
        }
        setCurrent(e.key);
    }

    const itemsDropdown = [
        // ...(!isMobile && user.id ? [{
        //     label: <Link to={'/news'} >Thông tin cá nhân</Link >,
        //     key: 'user-info',
        //     icon: <UserOutlined />
        // },] : []),

        ...(!isMobile && user?.id ? [{
            label: "Đăng xuất",
            key: 'logout',
            icon: <LogoutOutlined />,
            onClick: handleLogout
        },] : []),
    ]

    return (
        <>
            <Row
                className="header-main"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 20px',
                    borderBottom: '1px solid #eee',
                    width: '100%',
                    margin: '0 auto',
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1000
                }}
            >
                {/* Logo Section */}
                <Col
                    xs={8}
                    sm={8}
                    md={6}
                    lg={4}
                    xl={4}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start'
                    }}
                >
                    <Link
                        to="/"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            textDecoration: 'none'
                        }}
                    >
                        <img
                            src="/img/NV logo.png"
                            alt="Sign Board Logo - Chuyên gia biển quảng cáo"
                            style={{
                                height: 'clamp(40px, 6vw, 60px)',
                                width: 'auto',
                                maxWidth: '180px'
                            }}
                        />
                    </Link>
                </Col>

                {/* Desktop Navigation */}
                {!isMobile && (
                    <Col
                        md={12}
                        lg={14}
                        xl={14}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Menu
                            onClick={handleMenuClick}
                            selectedKeys={[current]}
                            mode="horizontal"
                            items={items}
                            disabledOverflow
                            style={{
                                borderBottom: 'none',
                                fontWeight: '500',
                                fontSize: '15px',
                                lineHeight: '64px',
                                backgroundColor: 'transparent',
                                minWidth: '100%',
                                justifyContent: 'center'
                            }}
                            popupClassName="header-submenu-popup"
                        />
                    </Col>
                )}

                {/* Right Section - Search & User */}
                <Col
                    xs={14}
                    sm={14}
                    md={6}
                    lg={6}
                    xl={6}
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        gap: '16px'
                    }}
                >
                    {/* Desktop User Menu */}
                    {!isMobile && token ? (
                        <Dropdown menu={{ items: itemsDropdown }} trigger={['hover', 'click']}>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    cursor: 'pointer',
                                    padding: '8px 12px',
                                    borderRadius: '20px',
                                    backgroundColor: '#f8f9fa',
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = '#e9ecef';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = '#f8f9fa';
                                }}
                            >
                                <Avatar
                                    size="small"
                                    src={user?.avatar}
                                    icon={!user?.avatar && <UserOutlined />}
                                />
                                <span style={{
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    color: '#495057',
                                    maxWidth: '120px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }}>
                                    {user?.fullName || 'User'}
                                </span>
                                <DownOutlined style={{ fontSize: '12px', color: '#6c757d' }} />
                            </div>
                        </Dropdown>
                    ) : !isMobile ? (
                        <Link
                            to="/login"
                            style={{
                                fontWeight: '600',
                                fontSize: '14px',
                                color: '#007bff',
                                textDecoration: 'none',
                                padding: '8px 16px',
                                borderRadius: '20px',
                                border: '1px solid #007bff',
                                transition: 'all 0.2s ease',
                                whiteSpace: 'nowrap'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#007bff';
                                e.target.style.color = '#fff';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'transparent';
                                e.target.style.color = '#007bff';
                            }}
                        >
                            ĐĂNG NHẬP
                        </Link>
                    ) : null}

                    {/* Mobile Hamburger Menu */}
                    {isMobile && (
                        <Button
                            type="text"
                            onClick={showDrawer}
                            icon={<MenuOutlined style={{ fontSize: '20px', color: '#495057' }} />}
                            style={{
                                border: 'none',
                                boxShadow: 'none',
                                width: '44px',
                                height: '44px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        />
                    )}
                </Col>
            </Row>

            {/* Mobile Drawer */}
            <Drawer
                title={
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '8px 0'
                    }}>
                        <img
                            src="/img/NV logo.png"
                            alt="Sign Board Logo"
                            style={{
                                height: '32px',
                                width: 'auto'
                            }}
                        />
                        <span style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#2c3e50'
                        }}>
                            Menu
                        </span>
                    </div>
                }
                placement="right"
                onClose={closeDrawer}
                open={isMobile && drawerVisible}
                width={Math.min(280, window.innerWidth * 0.8)}
                zIndex={1050}
                destroyOnClose
                bodyStyle={{
                    padding: '20px 0',
                    backgroundColor: '#fafbfc'
                }}
                headerStyle={{
                    backgroundColor: '#fff',
                    borderBottom: '1px solid #e9ecef',
                    padding: '16px 20px'
                }}
            >
                <div style={{ padding: '0 20px' }}>
                    <Menu
                        onClick={handleMenuClick}
                        selectedKeys={[current]}
                        mode="inline"
                        items={itemsMobile}
                        style={{
                            backgroundColor: 'transparent',
                            border: 'none'
                        }}
                        itemStyle={{
                            margin: '8px 0',
                            borderRadius: '12px',
                            padding: '12px 16px',
                            fontSize: '15px'
                        }}
                    />

                    {/* Mobile User Section */}
                    {token && user && (
                        <div style={{
                            marginTop: '24px',
                            padding: '16px',
                            backgroundColor: '#fff',
                            borderRadius: '12px',
                            border: '1px solid #e9ecef'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                marginBottom: '16px'
                            }}>
                                <Avatar
                                    size="large"
                                    src={user.avatar}
                                    icon={!user.avatar && <UserOutlined />}
                                />
                                <div>
                                    <div style={{
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        color: '#2c3e50'
                                    }}>
                                        {user.fullName}
                                    </div>
                                    <div style={{
                                        fontSize: '12px',
                                        color: '#6c757d'
                                    }}>
                                        {user.email}
                                    </div>
                                </div>
                            </div>
                            <Button
                                type="primary"
                                danger
                                block
                                onClick={handleLogout}
                                style={{
                                    borderRadius: '8px',
                                    fontWeight: '500'
                                }}
                            >
                                Đăng xuất
                            </Button>
                        </div>
                    )}

                    {!token && (
                        <div style={{
                            marginTop: '24px',
                            padding: '16px',
                            backgroundColor: '#fff',
                            borderRadius: '12px',
                            border: '1px solid #e9ecef',
                            textAlign: 'center'
                        }}>
                            <Link to="/login">
                                <Button
                                    type="primary"
                                    block
                                    style={{
                                        borderRadius: '8px',
                                        fontWeight: '500',
                                        marginBottom: '12px'
                                    }}
                                >
                                    Đăng nhập
                                </Button>
                            </Link>
                            <Link to="/register">
                                <Button
                                    block
                                    style={{
                                        borderRadius: '8px',
                                        fontWeight: '500'
                                    }}
                                >
                                    Đăng ký
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </Drawer>
        </>
    );
}

export default Header