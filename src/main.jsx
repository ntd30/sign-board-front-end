import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ManufacturePage from './pages/client/manufacture.jsx';
import DesignPage from './pages/client/design.jsx';
import RegisterPage from './pages/client/auth/register.jsx';
import { AuthWrapper } from './components/context/auth.context.jsx';
import LayoutAdmin from './components/admin/layout.admin.jsx';
import DashboardPage from './pages/admin/dashboard.jsx';
import PrivateRoute from './pages/private.route.jsx';
import UserPage from './pages/admin/user.jsx';
import ListProduct from './pages/client/list.product.jsx';
import ErrorPage from './pages/error.jsx'
import LoginPage from './pages/client/auth/login.jsx';
import ForgotPassword from './pages/client/auth/forgot.password.jsx';
import ConfirmCode from './pages/client/auth/confirm.code.jsx';
import LoginAdminPage from './pages/admin/auth/login.admin.jsx';
import PrivateRouteAdmin from './pages/private.route.admin.jsx';
import ProductDetailPage from './pages/client/product.detail.jsx';
import PermissionPage from './pages/admin/permission.jsx';
import GoogleAuthCallback from './pages/client/auth/google.auth.jsx';
import RolePage from './pages/admin/role.jsx';
import ProductPage from './pages/admin/product.jsx';
import CategoryPage from './pages/admin/category.jsx';
import DesignAdminPage from './pages/admin/design.jsx';
import ArticlesPage from './pages/admin/article.jsx';
import ContactPage from './pages/admin/contact.jsx';
import { HomePage } from './pages/client/home.jsx';
import NewsPage from './pages/client/news.jsx';
import { NewsDetail } from './pages/client/news.detail.jsx';

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
        path: "news/detail",
        element: <NewsDetail />,
      },
      {
        path: "manufacture",
        element: <ManufacturePage />,
      },
      {
        path: "design",
        element: <PrivateRoute><DesignPage /></PrivateRoute>
      },
      {
        path: "products",
        element: <ListProduct />
      },
      {
        path: "products/detail",
        element: <ProductDetailPage />
      }
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
  {
    path: `${import.meta.env.VITE_BACKEND_URL}/oauth2/authorization/google`,
    element: <GoogleAuthCallback />,
  },

  {
    path: "/admin",
    element:
      <PrivateRouteAdmin>
        <LayoutAdmin />
      </PrivateRouteAdmin>,
    children: [
      {
        index: true,
        element: <DashboardPage />
      },
      {
        path: "users",
        element: <UserPage />
      },
      {
        path: "products",
        element: <ProductPage />
      },
      {
        path: "categories",
        element: <CategoryPage />
      },
      {
        path: "roles",
        element: <RolePage />
      },
      {
        path: "permissions",
        element: <PermissionPage />
      },
      {
        path: "designs",
        element: <DesignAdminPage />
      },
      {
        path: "articles",
        element: <ArticlesPage />
      },
      {
        path: "contact",
        element: <ContactPage />
      }
    ]
  },

  {
    path: "/login-admin",
    element: <LoginAdminPage />,
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <AuthWrapper>
    <RouterProvider router={router} />
  </AuthWrapper>
  // </React.StrictMode>
)
