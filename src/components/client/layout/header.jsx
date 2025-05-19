import {
    AntDesignOutlined, AuditOutlined, DownOutlined, FireOutlined, HomeFilled, HomeOutlined, LoginOutlined, LogoutOutlined, MenuOutlined, ProductOutlined, SearchOutlined,
    SettingOutlined, UserOutlined
} from "@ant-design/icons";
import { Avatar, Button, Col, Drawer, Dropdown, Grid, Input, Menu, message, Row, Space } from "antd"
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/auth.context";
import { fetchAllCategoriesAPI, fetchAllParentCategoriesAPI, logoutAPI } from "../../../services/api.service";

const { useBreakpoint } = Grid

const Header = () => {
    const [drawerVisible, setDrawerVisible] = useState(false)
    const [current, setCurrent] = useState(''); // State quản lý menu item được chọn
    const [categories, setCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])

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
            const allRoutes = ["product", "manufacture", "news", "design"]
            const currentRoute = allRoutes.find(item => `/${item}` === location.pathname)
            if (currentRoute) {
                setCurrent(currentRoute)
            } else {
                setCurrent("home")
            }
        }

        loadCategories()
    }, [])

    const loadCategories = async () => {
        const res = await fetchAllParentCategoriesAPI()
        // setCategories(res.data)
        const parentCat = res?.data?.map(parent => {
            // children
            const childCat = parent.childCategories ? parent.childCategories.map(item => ({
                key: item.id,
                label:
                    <div
                        onClick={() => handleGetProductByChildCategory(item.id, parent.name, item.name)}
                    >
                        {item.name}
                    </div >
            })) : []

            // parent
            return {
                key: parent.id,
                label: <div onClick={() => handleGetProductByParentCategory(parent.id, parent.name)}>{parent.name}</div>,
                children: childCat
            }
        })
        setCategories(parentCat)
    }

    const handleGetProductByParentCategory = (parentCategoryId, parentCategoryName) => {
        navigate("/products", {
            state: {
                parentCategoryId: parentCategoryId,
                parentCategoryName: parentCategoryName
            }
        })
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
            label: <span to={"/"} >SẢN PHẨM{!isMobile && <DownOutlined />}</span>,
            href: "/",
            key: 'product',
            icon: <ProductOutlined />,
            children: categories,
        },
        // {
        //     label: <Link to={"/manufacture"}>SẢN XUẤT</Link>,
        //     key: 'manufacture',
        //     icon: <SettingOutlined />
        // },
        {
            label: <Link to={"/news"}>TIN TỨC</Link>,
            key: 'news',
            icon: <AuditOutlined />,
        },
        {
            label: <Link to={"/design"}>THIẾT KẾ</Link>,
            key: 'design',
            icon: <AntDesignOutlined />
        },
        ...(!user.id ? [{
            label: <Link
                to={"/login"}
                style={{ cursor: "pointer" }}
            >Đăng nhập</Link>,
            key: 'login',
            icon: <LoginOutlined />
        },] : []),
        ...(user.id ? [{
            label: <label
                onClick={handleLogout}
                style={{ cursor: "pointer" }}
            >Đăng xuất</label>,
            key: 'logout',
            icon: <LogoutOutlined />
        },] : []),
    ]

    const items = [
        {
            label: <span to={"/"} >SẢN PHẨM{!isMobile && <DownOutlined />}</span>,
            href: "/",
            key: 'product',
            icon: <ProductOutlined />,
            children: categories
        },
        {
            label: <Link to={"/news"}>TIN TỨC</Link>,
            key: 'news',
            icon: <AuditOutlined />,
        },
        // {
        //     label: <Link to={"/projects"}>DỰ ÁN</Link>,
        //     key: 'projects',
        //     icon: <SettingOutlined />
        // },
        {
            label: <Link to={"/design"}>THIẾT KẾ</Link>,
            key: 'design',
            icon: <AntDesignOutlined />
        },
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

        ...(!isMobile && user.id ? [{
            label: <label
                onClick={handleLogout}
                style={{ cursor: "pointer" }}
            >Đăng xuất</label>,
            key: 'logout',
            icon: <LogoutOutlined />
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
                width: isMobile ? "100%" : "70%",
                margin: "auto",
                fontSize: 16
            }}>

                {/* Logo */}
                <Col xs={10} sm={10} md={4} lg={4} style={{ flex: 1 }}>
                    <Link onClick={handleMenuClick} to={"/"}><img src="/img/logo_robot.jpg" alt="Logo" style={{ height: 80, borderRadius: "50%" }} /></Link>
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
                            display: 'inline-block'
                        }}
                    />
                </Col>
                )}

                {/* Search + Cart + Login */}
                <Col xs={14} sm={14} md={8} lg={6}
                    style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', gap: 16, alignItems: 'center' }}>
                    {!isMobile ? ( // Input trên Desktop
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
                    )}

                    {!isMobile && user?.id ?
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