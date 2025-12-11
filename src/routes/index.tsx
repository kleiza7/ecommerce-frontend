import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "../components/RootLayout";
import AuthPage from "../pages/AuthPage";
import CartPage from "../pages/CartPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "dashboard",
        element: <Navigate to="/products" replace />,
      },

      {
        path: "products",
        element: <ProductsPage />,
      },

      {
        path: "product-detail/:id",
        element: <ProductDetailPage />,
      },

      {
        path: "cart",
        element: <CartPage />,
      },

      {
        path: "auth",
        element: <AuthPage />,
      },

      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
    ],
  },
]);

export default router;
