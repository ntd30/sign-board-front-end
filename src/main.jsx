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
import LoginPage from './pages/login.jsx';
import RegisterPage from './pages/register.jsx';
import { AuthWrapper } from './components/context/auth.context.jsx';
import ErrorPage from './pages/error.jsx';
import LayoutAdmin from './components/admin/layout.admin.jsx';
import DashboardPage from './pages/admin/dashboard.jsx';
import PrivateRoute from './pages/private.route.jsx';
import UserPage from './pages/admin/user.jsx';

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
    ]
  },

  {
    path: "/admin",
    element:
      // <PrivateRoute>
      <LayoutAdmin />,
    // </PrivateRoute>,
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
        path: "category",
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
    ]
  },

  {
    path: "/login",
    element: <LoginPage />,
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
