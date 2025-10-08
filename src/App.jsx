import { Outlet } from "react-router-dom"
import Header from "./components/client/layout/header"
import AppFooter from "./components/client/layout/footer"
import FloatingContact from "./components/FloatingContact"; // Import component FloatingContact
import { useContext, useEffect } from "react";
import { AuthContext } from "./components/context/auth.context";
import { getProfileAPI } from "./services/api.service";

function App() {
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    loadUserInfo()
  }, []);

  const loadUserInfo = async () => {
    try {
      const res = await getProfileAPI();
      console.log("=== USER PROFILE DEBUG ===");
      console.log("Full API Response:", res);
      console.log("User data:", res.data);
      console.log("User permissions count:", res.data?.permissions?.length || 0);
      console.log("User permissions:", res.data?.permissions);
      console.log("User role:", res.data?.roleName);
      console.log("========================");
      setUser(res.data)
    } catch (error) {
      console.error("Error loading user info:", error);
    }
  }

  return (
    <>
      <Header />

      <Outlet />

      <AppFooter />

      <FloatingContact />
    </>
  )
}

export default App
