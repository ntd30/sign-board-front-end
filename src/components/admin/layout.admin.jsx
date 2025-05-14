import {
    AliwangwangOutlined, ApiOutlined, AppstoreOutlined, BugOutlined, EditOutlined, ExceptionOutlined, GlobalOutlined, HomeOutlined,
    LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UnorderedListOutlined, UserOutlined
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, Menu, message, Space } from "antd"
import React, { useContext, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { logoutAPI } from "../../services/api.service";
const { Sider, Content } = Layout

const menuItems = [
    {
        label: <Link to='/admin'>Dashboard</Link>,
        key: '/admin',
        icon: <AppstoreOutlined />
    },
    {
        label: <Link to='/admin/categories'>Danh mục</Link>,
        key: '/admin/categories',
        icon: <UnorderedListOutlined />
    },
    {
        label: <Link to='/admin/products'>Sản phẩm</Link>,
        key: '/admin/products',
        icon: <AliwangwangOutlined />
    },
    {
        label: <Link to='/admin/users'>Người dùng</Link>,
        key: '/admin/users',
        icon: <UserOutlined />
    },
    {
        label: <Link to='/admin'>Bản thiết kế</Link>,
        key: '/admin/design',
        icon: <EditOutlined />
    },
    {
        label: <Link to='/admin/roles'>Vai trò</Link>,
        key: '/admin/roles',
        icon: <ExceptionOutlined />
    },
    {
        label: <Link to='/admin/permissions'>Quyền hạn</Link>,
        key: '/admin/permissions',
        icon: <ApiOutlined />
    },
    {
        label: <Link to='/admin'>Tin tức</Link>,
        key: '/admin/news',
        icon: <GlobalOutlined />
    },
]

const LayoutAdmin = () => {
    const [collapsed, setCollapsed] = useState(false)
    const { user, setUser } = useContext(AuthContext)
    const navigate = useNavigate()

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
            label: <label
                style={{ cursor: 'pointer' }}
                onClick={handleLogout}
            >Đăng xuất</label>,
            key: 'logout',
            icon: <LogoutOutlined />
        },
    ]

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