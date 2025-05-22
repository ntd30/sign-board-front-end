import { useContext, useEffect } from "react"
import { AuthContext } from "../components/context/auth.context"
import { Navigate } from "react-router-dom"
import { getProfileAPI } from "../services/api.service";

const PrivateRouteAdmin = (props) => {
    const { user, setUser } = useContext(AuthContext);

    useEffect(() => {
        loadUserInfo();
    }, []);

    const loadUserInfo = async () => {
        const res = await getProfileAPI();
        console.log("res.data", res.data)
        setUser(res.data);
    }

    if (user && user.roleName !== "Customer") {
        return (<> {props.children} </>)
    }

    return <Navigate to="/login-admin" replace />
}

export default PrivateRouteAdmin