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
    const res = await getProfileAPI();
    setUser(res.data)
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
