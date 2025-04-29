import { useContext } from "react"
import { AuthContext } from "../components/context/auth.context"
import { Link } from "react-router-dom"
import { Button, Result } from "antd"

const PrivateRoute = (props) => {
    const { user } = useContext(AuthContext)

    return (
        <>
            {
                (user && user.id) ?
                    (<>
                        {props.children}
                    </>)

                    :

                    (
                        <Result
                            status="403"
                            title="Unauthorize!"
                            subTitle="Bạn cần đăng nhập để truy cập nguồn tài nguyên này"
                            extra={<Button type="primary"><Link to="/login">Đăng nhập</Link></Button>}
                        />
                    )
            }
        </>
    )
}

export default PrivateRoute