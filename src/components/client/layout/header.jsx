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
                min-width: 200px !important;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
                border-radius: 8px !important;
                padding: 8px 0 !important;
            }

            .header-submenu-popup .ant-menu-item {
                padding: 8px 16px !important;
                margin: 0 !important;
                font-size: 14px !important;
                line-height: 1.5 !important;
                transition: all 0.2s ease !important;
            }

            .header-submenu-popup .ant-menu-item:hover {
                background-color: #f5f5f5 !important;
                color: #1890ff !important;
            }

            .header-submenu-popup .ant-menu-item-selected {
                background-color: #e6f7ff !important;
                color: #1890ff !important;
            }

            .header-submenu-popup .ant-menu-submenu-arrow {
                color: #666 !important;
                font-size: 12px !important;
            }
        `;

        if (!document.getElementById('header-submenu-styles')) {
            style.id = 'header-submenu-styles';
            document.head.appendChild(style);
        }

        return () => {
            const existingStyle = document.getElementById('header-submenu-styles');
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
            <Row style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px',
                borderBottom: '1px solid #eee',
                width: isMobile ? "100%" : "80%",
                margin: "auto",
                fontSize: 16
            }}>

                {/* Logo */}
                <Col xs={10} sm={10} md={4} lg={4} style={{ flex: 1 }}>
                    <Link onClick={handleMenuClick} to={"/"}><img src="/img/NV logo.png" alt="Logo" style={{ height: 80, }} /></Link>
                </Col>

                {/* Menu */}
                {!isMobile && (<Col md={12} lg={14} style={{ textAlign: "center" }}>
                    <Menu
                        onClick={handleMenuClick}
                        selectedKeys={[current]}
                        mode="horizontal"
                        items={items}
                        disabledOverflow

                        style={{
                            borderBottom: 'none',
                            fontWeight: 'bold',
                            lineHeight: '70px', // Căn giữa với chiều cao header
                            display: 'inline-block',
                            backgroundColor: 'transparent'
                        }}

                        // Custom styling cho submenu items
                        submenuItemStyle={{
                            padding: '8px 16px',
                            fontSize: '14px',
                            borderBottom: '1px solid #f0f0f0'
                        }}

                        // Override default submenu styling
                        popupClassName="header-submenu-popup"
                    />
                </Col>
                )}

                {/* Search + Cart + Login */}
                <Col xs={14} sm={14} md={8} lg={6}
                    style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', gap: 16, alignItems: 'center' }}>
                    {/* {!isMobile ? ( // Input trên Desktop
                        <Input
                            placeholder="Tìm kiếm"
                            prefix={<SearchOutlined />}
                            style={{
                                width: 160,
                                borderColor: 'orange',
                                borderRadius: 4
                            }}
                        />
                    ) : ( // Nút Search Icon trên Mobile
                        <Button type="text" shape="circle" icon={<SearchOutlined style={{ fontSize: 18 }} />} />
                    )} */}

                    {!isMobile && token ?
                        <Dropdown menu={{ items: itemsDropdown }} trigger={['hover']}>
                            <Space style={{ cursor: "pointer" }}>
                                <span>Welcome {user?.fullName}</span>
                                <Avatar> {user?.fullName?.substring(0, 2)?.toUpperCase()} </Avatar>
                            </Space>
                        </Dropdown>
                        :
                        !isMobile && <Link to="/login" style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>ĐĂNG NHẬP</Link>
                    }

                    {/* --- Nút Hamburger (Mobile) --- */}
                    {isMobile && (
                        <Button
                            type="text"
                            onClick={showDrawer}
                            icon={<MenuOutlined style={{ fontSize: 20 }} />}
                        />
                    )}
                </Col>
            </Row>

            {/* Drawer cho Mobile Menu */}
            {/* Chỉ render Drawer khi isMobile là true */}
            <Drawer
                title="Menu"
                placement="right"
                onClose={closeDrawer}
                open={isMobile && drawerVisible} // Chỉ open khi là mobile và state là true
                width={280} // Chiều rộng của Drawer
                zIndex={1050} // Đảm bảo cao hơn các element khác nếu cần
                destroyOnClose // Xóa khỏi DOM khi đóng để tối ưu
            >
                <Menu
                    onClick={handleMenuClick} // Dùng chung handle click
                    selectedKeys={[current]} // Đồng bộ selected key
                    mode="inline" // Menu dọc
                    items={itemsMobile} // Dùng chung cấu trúc items
                // defaultOpenKeys={['product', 'sub_bienquangcao']} // Mở sẵn submenu nếu muốn
                />
            </Drawer>
        </>
    )
}

export default Header