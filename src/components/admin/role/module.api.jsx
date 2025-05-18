import { useEffect, useState } from "react";
import { fetchAllPermissionsAPI } from "../../../services/api.service";
import { Card, Col, Collapse, Row, Space, Switch, Tooltip } from "antd";
import { ALL_MODULES, colorMethod } from "../../../config/permission";
import { grey } from '@ant-design/colors';

const ModuleApi = (props) => {
    const { permissionIds, setPermissionIds } = props;
    const [listPermissions, setListPermissions] = useState([]);

    useEffect(() => {
        const init = async () => {
            const res = await fetchAllPermissionsAPI(1, 100);
            if (res.data?.content) {
                setListPermissions(res.data?.content);
            }
        };
        init();
    }, []);

    const handleSingleCheck = (value, permissionId) => {
        if (value) {
            setPermissionIds([...permissionIds, permissionId]);
        } else {
            setPermissionIds(permissionIds.filter((id) => id !== permissionId));
        }
    };

    const panels = ALL_MODULES?.map((item, index) => ({
        key: `${index}-parent`,
        label: <div>{item.value}</div>,
        forceRender: true,
        children: (
            <Row gutter={[16, 16]}>
                {listPermissions
                    ?.filter((value) => value?.module === item.value)
                    ?.map((value, i) => (
                        <Col lg={12} md={12} sm={24} key={`${i}-child-${item.module}`}>
                            <Card
                                size="small"
                                bodyStyle={{ display: "flex", flex: 1, flexDirection: 'row', alignItems: 'center' }}
                            >
                                <div style={{ marginRight: 10 }}>
                                    <Switch
                                        checked={permissionIds.includes(value.id)}
                                        onChange={(v) => handleSingleCheck(v, value.id)}
                                    />
                                </div>
                                <div>
                                    <Tooltip title={value?.name}>
                                        <p style={{ paddingLeft: 10, marginBottom: 3 }}>{value?.name || ''}</p>
                                        <div style={{ display: 'flex' }}>
                                            <p style={{ paddingLeft: 10, fontWeight: 'bold', marginBottom: 0, color: colorMethod(value?.method) }}>{value?.method || ''}</p>
                                            <p style={{ paddingLeft: 10, marginBottom: 0, color: grey[5] }}>{value?.apiPath || ''}</p>
                                        </div>
                                    </Tooltip>
                                </div>
                            </Card>
                        </Col>
                    ))}
            </Row>
        ),
    }));

    return (
        <Card size="small" bordered={false}>
            <Collapse items={panels} />
        </Card>
    );
};

export default ModuleApi;