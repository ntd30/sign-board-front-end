import { Outlet } from "react-router-dom"
import Header from "./components/layout/header"
import AppFooter from "./components/layout/footer"

function App() {
  console.log('Hello 123')

  return (
    <>
      <Header />

      <Outlet />

      <AppFooter />
    </>
  )
}

export default App
