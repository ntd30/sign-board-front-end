import {
    AntDesignOutlined, AuditOutlined, DownOutlined, FireOutlined, MenuOutlined, ProductOutlined, SearchOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Col, Drawer, Dropdown, Grid, Input, Menu, message, Row, Space } from "antd"
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/auth.context";
import { logoutAPI } from "../../../services/api.service";

const { useBreakpoint } = Grid

const Header = () => {
    const [drawerVisible, setDrawerVisible] = useState(false)
    const [current, setCurrent] = useState(''); // State quản lý menu item được chọn
    const [loading, setLoading] = useState(false)
    const screens = useBreakpoint()
    const location = useLocation()
    const isMobile = !screens.md
    const { user, setUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const items = [
        {
            label: <span to={"/"} >SẢN PHẨM{!isMobile && <DownOutlined />}</span>,
            href: "/",
            key: 'product',
            icon: <ProductOutlined />,
            children: [
                {
                    key: '12',
                    label: "Biển quảng cáo",
                    href: "/",
                    children: [
                        { key: '121', label: 'Biển chữ nổi quảng cáo' },
                        { key: '122', label: 'Biển gỗ quảng cáo' },
                        { key: '123', label: 'Biển hộp đèn âm bản' },
                        { key: '124', label: 'Biển hộp đèn' },
                        { key: '125', label: 'Biển Pano tấm lớn' },
                        { key: '126', label: 'Biến tấm ốp Alu' },
                    ],
                },
            ],
        },
        {
            label: <Link to={"/manufacture"}>SẢN XUẤT</Link>,
            key: 'manufacture',
            icon: <SettingOutlined />
        },
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
    ]

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
    }, [])

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

    const handleLogout = async () => {
        setLoading(true)
        const res = await logoutAPI()
        if (res.data) {
            localStorage.removeItem('access_token')
            setUser({})
            message.success("Đăng xuất thành công")
            navigate('/')
        }
        // setLoading(false)
    }

    const itemsDropdown = [
        {
            label: <Link to={'/admin'} style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Trang Quản Trị</Link>,
            key: '/',
            icon: <FireOutlined />,
        },
        ...(!isMobile && user.id ? [{
            label: <Button
                type="link"
                onClick={() => { }}
                style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}
            >Thông tin cá nhân</Button >,
            key: 'user-info',
        },] : []),

        ...(!isMobile && !user.id ? [{
            label: <Link to="/login" style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}> Đăng nhập</Link >,
            key: 'login'
        },] : []),

        ...(!isMobile && user.id ? [{
            label: <Button
                disabled={loading}
                type="link"
                onClick={handleLogout}
                style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}
            >Đăng xuất</Button>,
            key: 'logout'
        },] : []),
    ]

    return (
        <>
            <Row style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 40px',
                borderBottom: '1px solid #eee'
            }}>

                {/* Logo */}
                <Col xs={10} sm={10} md={4} lg={4} style={{ flex: 1 }}>
                    <Link onClick={handleMenuClick} to={"/"}><img src="/img/logo.png" alt="Logo" style={{ height: 60 }} /></Link>
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

                    <Dropdown menu={{ items: itemsDropdown }} trigger={['hover']}>
                        <Space style={{ cursor: "pointer" }}>
                            Welcome {user?.fullName}
                            <Avatar> {"Duy".substring(0, 2)?.toUpperCase()} </Avatar>
                        </Space>
                    </Dropdown>

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
                    items={items} // Dùng chung cấu trúc items
                // defaultOpenKeys={['product', 'sub_bienquangcao']} // Mở sẵn submenu nếu muốn
                />
                {/* Có thể thêm Login/Search vào cuối Drawer */}
                <div style={{ padding: '20px 16px', borderTop: '1px solid #f0f0f0' }}>
                    {/* <Input placeholder="Tìm kiếm..." prefix={<SearchOutlined />} style={{ marginBottom: 10 }} /> */}
                    <Link to="/login" onClick={closeDrawer} style={{ display: 'block' }}>Đăng nhập / Đăng ký</Link>
                </div>
            </Drawer>
        </>
    )
}

export default Header