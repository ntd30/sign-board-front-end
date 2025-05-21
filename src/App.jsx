import { Outlet } from "react-router-dom"
import Header from "./components/client/layout/header"
import AppFooter from "./components/client/layout/footer"
import FloatingContact from "./components/FloatingContact"; // Import component FloatingContact
function App() {
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
