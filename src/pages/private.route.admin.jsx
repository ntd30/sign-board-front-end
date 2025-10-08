import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/context/auth.context";
import { Navigate } from "react-router-dom";
import { getProfileAPI } from "../services/api.service";
import Error403Page from "./error/403";

const PrivateRouteAdmin = ({ children }) => {
    const { user, setUser } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const loadUserInfo = async () => {
            try {
                const res = await getProfileAPI();
                console.log("=== ADMIN ROUTE USER PROFILE DEBUG ===");
                console.log("Admin route API Response:", res);
                console.log("Admin route user data:", res.data);
                console.log("Admin route permissions count:", res.data?.permissions?.length || 0);
                console.log("Admin route user role:", res.data?.roleName);
                console.log("=====================================");

                if (res?.data) {
                    setUser(res.data);
                    if (res.data.roleName !== "Customer") {
                        setIsAuthorized(true);
                    } else {
                        setIsAuthorized(false);
                    }
                } else {
                    setIsAuthorized(false);
                }
            } catch (error) {
                console.error("Error loading user info:", error);
                setIsAuthorized(false);
            } finally {
                setIsLoading(false);
            }
        };

        loadUserInfo();
    }, [setUser]);

    // Handle loading state
    if (isLoading) {
        return null; // Or a loading spinner component
    }

    // If user is not authorized, redirect to login-admin
    if (!isAuthorized) {
        return <Navigate to="/login-admin" replace />;
    }

    // If user is authorized and not a Customer, render children
    if (user?.roleName !== "Customer") {
        return <>{children}</>;
    }

    // If user is a Customer, show 403 error
    return <Error403Page />;
};

export default PrivateRouteAdmin;