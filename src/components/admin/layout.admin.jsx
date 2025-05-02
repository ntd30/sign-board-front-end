import { AliwangwangOutlined, AppstoreOutlined, BugOutlined, EditOutlined, GlobalOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UnorderedListOutlined, UserOutlined } from "@ant-design/icons";
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
        label: <Link to='/admin/category'>Danh mục</Link>,
        key: '/admin/category',
        icon: <UnorderedListOutlined />
    },
    {
        label: <Link to='/admin'>Sản phẩm</Link>,
        key: '/admin/product',
        icon: <AliwangwangOutlined />
    },
    {
        label: <Link to='/admin'>Tin tức</Link>,
        key: '/admin/news',
        icon: <GlobalOutlined />
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
]

const LayoutAdmin = () => {
    const [collapsed, setCollapsed] = useState(false)
    const [loading, setLoading] = useState(false)
    const { user, setUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogout = async () => {
        setLoading(true)
        const res = await logoutAPI()
        if (res.data) {
            localStorage.removeItem('access_token')
            setUser({})
            message.success("Đăng xuất thành công")
            navigate('/')
        }
    }

    const itemsDropdown = [
        {
            label: <Link to={'/'}>Trang chủ</Link>,
            key: 'home',
        },
        {
            label: <Button
                style={{ cursor: 'pointer' }}
                onClick={handleLogout}
                disabled={loading}
            >Đăng xuất</Button>,
            key: 'logout',
        },
    ]

    return (
        <>
            <Layout
                style={{ minHeight: '100vh'}}
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

                        <Dropdown menu={{ items: itemsDropdown }} trigger={['hover']}>
                            <Space style={{ cursor: "pointer" }}>
                                Welcome {user?.fullName}
                                <Avatar> {"Duy".substring(0, 2)?.toUpperCase()} </Avatar>
                            </Space>
                        </Dropdown>
                    </div>

                    <Content style={{padding: '15px'}}>
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </>
    )
}

export default LayoutAdmin