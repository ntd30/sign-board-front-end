import { useContext } from "react"
import { AuthContext } from "../components/context/auth.context"
import { Navigate } from "react-router-dom"

const PrivateRouteAdmin = (props) => {
    // const { user } = useContext(AuthContext)
    const user = localStorage.getItem("user");

    if (user) {
        return (<> {props.children} </>)
    }

    return <Navigate to="/login-admin" replace />
}

export default PrivateRouteAdmin