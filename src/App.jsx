import { Outlet } from "react-router-dom"
import Header from "./components/client/layout/header"
import AppFooter from "./components/client/layout/footer"
import FloatingContact from "./components/FloatingContact"; // Import component FloatingContact
import { useContext, useEffect } from "react";
import { AuthContext } from "./components/context/auth.context";

function App() {
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    // Lấy thông tin người dùng từ localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error("Lỗi khi parse thông tin người dùng:", error);
        setUser(null);
      }
    }
  }, []);

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
