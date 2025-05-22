import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext } from "react";
import { message } from "antd";
import { AuthContext } from "./context/auth.context";

const GoogleAuthCallback = () => {
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const token = searchParams.get("token");
        const userJson = searchParams.get("user");

        console.log("token", token)
        console.log("userJson", userJson)

        if (token && userJson) {
            try {
                // Parse the user JSON (assuming it's a stringified UserResponse)
                const user = JSON.parse(decodeURIComponent(userJson));

                // Store token in localStorage
                localStorage.setItem("access_token", token);

                // Update AuthContext with user data
                setUser(user);

                // Show success message and redirect to homepage
                message.success("Đăng nhập với Google thành công");
                navigate("/");
            } catch (error) {
                message.error("Lỗi xử lý thông tin đăng nhập");
                navigate("/login");
            }
        } else {
            message.error("Thông tin đăng nhập không hợp lệ");
            navigate("/login");
        }
    }, [searchParams, setUser, navigate]);

    return <div>Đang xử lý đăng nhập...</div>;
};

export default GoogleAuthCallback;