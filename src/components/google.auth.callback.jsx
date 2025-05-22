// src/pages/AuthCallback.jsx
import { useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { message } from "antd";
import { AuthContext } from "./context/auth.context";
import { getProfileAPI } from "../services/api.service";

const AuthCallback = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setUser } = useContext(AuthContext);

    const loadUserInfo = async () => {
        const res = await getProfileAPI();
        console.log("res.data", res?.data)
        setUser(res?.data);
    }

    useEffect(() => {
        loadUserInfo();

        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get("token");

        if (token) {
            try {
                localStorage.setItem("access_token", token);
                message.success("Đăng nhập Google thành công!");
                navigate("/");
            } catch (error) {
                message.error("Lỗi khi xử lý thông tin đăng nhập: " + error.message);
                navigate("/login");
            }
        } else {
            message.error("Không nhận được thông tin đăng nhập từ server.");
            navigate("/login");
        }
    }, [navigate, setUser]);

    return <div>Đang xử lý đăng nhập...</div>;
};

export default AuthCallback;