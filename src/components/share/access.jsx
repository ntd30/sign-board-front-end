import { useEffect, useState } from 'react';
import { Result } from "antd";
import { useAppSelector } from '@/redux/hooks';

const Access = (props) => {
    // const { permission, hideChildren = false, children } = props;
    const [allow, setAllow] = useState(true);

    // const permissions = useAppSelector(state => state.account.user.role.permissions);

    // useEffect(() => {
    //     if (permissions?.length) {
    //         const check = permissions.find(item =>
    //             item.apiPath === permission.apiPath
    //             && item.method === permission.method
    //             && item.module === permission.module
    //         );
    //         if (check) {
    //             setAllow(true);
    //         } else {
    //             setAllow(false);
    //         }
    //     }
    // }, [permissions]);

    return (
        <>
            {allow === true || import.meta.env.VITE_ACL_ENABLE === 'false' ?
                <>{props.children}</>
                :
                <>
                    {/* {hideChildren === false ? */}
                    <Result
                        status="403"
                        title="Truy cập bị từ chối"
                        subTitle="Xin lỗi, bạn không có quyền hạn (permission) truy cập thông tin này"
                    />
                    {/* :
                        <></>
                    } */}
                </>
            }
        </>
    );
}

export default Access;
