import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../components/context/auth.context";
import { getProfileAPI } from "../../services/api.service";
import { Card, Table, Tag, Space, Button, Typography } from "antd";

const { Title, Text } = Typography;

const DebugPermissionsPage = () => {
    const { user } = useContext(AuthContext);
    const [refreshedUser, setRefreshedUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const refreshUserData = async () => {
        setLoading(true);
        try {
            const res = await getProfileAPI();
            console.log("=== MANUAL REFRESH DEBUG ===");
            console.log("Fresh API Response:", res);
            console.log("Fresh permissions count:", res.data?.permissions?.length || 0);
            console.log("============================");
            setRefreshedUser(res.data);
        } catch (error) {
            console.error("Error refreshing user data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshUserData();
    }, []);

    const currentUser = refreshedUser || user;

    const columns = [
        {
            title: 'STT',
            render: (_, record, index) => index + 1,
            width: 60,
        },
        {
            title: 'Permission Name',
            dataIndex: 'name',
            key: 'name',
            width: 250,
        },
        {
            title: 'API Path',
            dataIndex: 'apiPath',
            key: 'apiPath',
            width: 200,
            ellipsis: true,
        },
        {
            title: 'Method',
            dataIndex: 'method',
            key: 'method',
            width: 80,
            render: (method) => (
                <Tag color={
                    method === 'GET' ? 'blue' :
                    method === 'POST' ? 'green' :
                    method === 'PUT' ? 'orange' :
                    method === 'DELETE' ? 'red' : 'default'
                }>
                    {method}
                </Tag>
            ),
        },
        {
            title: 'Module',
            dataIndex: 'module',
            key: 'module',
            width: 120,
        },
    ];

    const permissionsByModule = currentUser?.permissions?.reduce((acc, permission) => {
        const module = permission.module || 'OTHER';
        if (!acc[module]) {
            acc[module] = [];
        }
        acc[module].push(permission);
        return acc;
    }, {}) || {};

    return (
        <div style={{ padding: '20px' }}>
            <Title level={2}>Debug Permissions</Title>
            
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Card title="User Info Summary">
                    <Space direction="vertical">
                        <Text><strong>User:</strong> {currentUser?.fullName} ({currentUser?.username})</Text>
                        <Text><strong>Role:</strong> {currentUser?.roleName}</Text>
                        <Text><strong>Total Permissions:</strong> 
                            <Tag color="blue">{currentUser?.permissions?.length || 0}</Tag>
                        </Text>
                        <Button onClick={refreshUserData} loading={loading}>
                            Refresh User Data
                        </Button>
                    </Space>
                </Card>

                <Card title="Permissions by Module">
                    {Object.entries(permissionsByModule).map(([module, permissions]) => (
                        <div key={module} style={{ marginBottom: '16px' }}>
                            <Text strong>{module}: </Text>
                            <Tag color="green">{permissions.length} permissions</Tag>
                        </div>
                    ))}
                </Card>

                <Card title="All Permissions Detail">
                    <Table
                        dataSource={currentUser?.permissions || []}
                        columns={columns}
                        rowKey="id"
                        pagination={{ pageSize: 20 }}
                        size="small"
                        scroll={{ x: 800 }}
                    />
                </Card>

                <Card title="Debug Console Data">
                    <pre style={{ background: '#f5f5f5', padding: '10px', overflow: 'auto' }}>
                        {JSON.stringify(currentUser?.permissions || [], null, 2)}
                    </pre>
                </Card>
            </Space>
        </div>
    );
};

export default DebugPermissionsPage;
