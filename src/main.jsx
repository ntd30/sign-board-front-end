import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from './pages/client/home.jsx';
import NewsPage from './pages/client/news.jsx';
import ManufacturePage from './pages/client/manufacture.jsx';
import DesignPage from './pages/client/design.jsx';
import RegisterPage from './pages/auth/register.jsx';
import { AuthWrapper } from './components/context/auth.context.jsx';
import LayoutAdmin from './components/admin/layout.admin.jsx';
import DashboardPage from './pages/admin/dashboard.jsx';
import PrivateRoute from './pages/private.route.jsx';
import UserPage from './pages/admin/user.jsx';
import ProductPage from './pages/admin/product.jsx';
import ListProduct from './pages/client/list.product.jsx';
import ErrorPage from './pages/error.jsx'
import LoginPage from './pages/auth/login.jsx';
import ForgotPassword from './pages/auth/forgot.password.jsx';
import ConfirmCode from './pages/auth/confirm.code.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "news",
        element: <NewsPage />,
      },
      {
        path: "manufacture",
        element: <ManufacturePage />,
      },
      {
        path: "design",
        element: <DesignPage />
      },
      {
        path: "list-product",
        element: <ListProduct />
      },
    ]
  },

  {
    path: "/admin",
    element:
      <PrivateRoute>
        <LayoutAdmin />,
      </PrivateRoute>,
    children: [
      {
        index: true,
        element: <DashboardPage />
      },
      {
        path: "users",
        element: <UserPage />,
      },
      {
        path: "products",
        element: <ProductPage />,
      },
    ]
  },

  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/confirm-code",
    element: <ConfirmCode />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <AuthWrapper>
    <RouterProvider router={router} />
  </AuthWrapper>
  // </React.StrictMode>
)
