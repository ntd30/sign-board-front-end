import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { HomePage } from './pages/client/home.jsx';
import NewsPage from './pages/client/news.jsx';
import ManufacturePage from './pages/client/manufacture.jsx';
import DesignPage from './pages/client/design.jsx';
import RegisterPage from './pages/client/auth/register.jsx';
import { AuthWrapper } from './components/context/auth.context.jsx';
import LayoutAdmin from './components/admin/layout.admin.jsx';
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
import RolePage from './pages/admin/role.jsx';
import ProductPage from './pages/admin/product.jsx';
import CategoryPage from './pages/admin/category.jsx';
import DesignAdminPage from './pages/admin/design.jsx';
import ArticlesPage from './pages/admin/article.jsx';
import ContactPageClient from './pages/client/contact.jsx';
import AboutPage from './pages/client/about.jsx';
import { NewsDetail } from './pages/client/news.detail.jsx';
import ProductContact from './components/client/product/product.contact.jsx';
import { DashboardPage } from './pages/admin/dashboard.jsx';
import GoogleAuthCallback from './components/google.auth.callback.jsx';
import AuthCallback from './components/google.auth.callback.jsx';
import Privacy from './pages/client/policy/privacy.jsx';
import UseService from './pages/client/policy/useService.jsx';
import RefundPolicy from './pages/client/policy/refund.jsx';
import ServiceStandards from './pages/client/policy/standard.jsx';
import HandoverPolicy from './pages/client/policy/handOver.jsx';
import PaymentPolicy from './pages/client/policy/payment.jsx';
import BannerPage from './pages/admin/banner.jsx';
import ArticleCategoryPage from './pages/admin/article.category.jsx';
import DebugPermissionsPage from './pages/admin/debug.permissions.jsx';
import ArticleCategoryClientPage from './pages/client/article.category.jsx';

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
        path: "news/detail/:id",
        element: <NewsDetail />,
      },
      {
        path: "news/:slug",
        element: <NewsDetail />,
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
        path: "products",
        element: <ListProduct />
      },
      {
        path: "products/detail/:id",
        element: <ProductDetailPage />
      },
      {
        path: "products/contact",
        element: <ProductContact />
      },
      {
        path: "policy/privacy",
        element: <Privacy />
      },
      {
        path: "policy/useService",
        element: <UseService />
      },
      {
        path: "policy/refund",
        element: <RefundPolicy />
      },
      {
        path: "policy/standard",
        element: <ServiceStandards />
      },
      {
        path: "policy/handOver",
        element: <HandoverPolicy />
      },
      {
        path: "policy/payment",
        element: <PaymentPolicy />
      },
      {
        path: "about",
        element: <AboutPage />
      },
      {
        path: "contact",
        element: <ContactPageClient />
      },
      {
        path: ":parentSlug/:childSlug",
        element: <ArticleCategoryClientPage />
      },
      {
        path: ":slug",
        element: <ArticleCategoryClientPage />
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
  {
    path: "/auth/callback",
    element: <AuthCallback />,
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
        element: <ContactPageClient />
      },{
        path: "banners",
        element: <BannerPage />
      },{
        path: "article-categories",
        element: <ArticleCategoryPage />
      },{
        path: "debug-permissions",
        element: <DebugPermissionsPage />
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
