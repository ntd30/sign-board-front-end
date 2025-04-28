import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from './pages/home.page.jsx';
import NewsPage from './pages/news.page.jsx';
import ManufacturePage from './pages/manufacture.page.jsx';
import DesignPage from './pages/design.page.jsx';
import React from 'react';
import LoginPage from './pages/login.page.jsx';
import { RegisterPage } from './pages/register.page.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/news",
        element: <NewsPage />,
      },
      {
        path: "/manufacture",
        element: <ManufacturePage />,
      },
      {
        path: "/design",
        element: (
          // <PrivateRoute>
            <DesignPage />
          // </PrivateRoute>
        ),
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
  <React.StrictMode>

    <RouterProvider router={router} />

  </React.StrictMode>
)
