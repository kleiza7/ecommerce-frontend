import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import RootLayout from "../components/RootLayout";
import AdminProductsPage from "../pages/AdminProductsPage";
import AuthPage from "../pages/AuthPage/AuthPage";
import CartPage from "../pages/CartPage/CartPage";
import DashboardPage from "../pages/DashboardPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import SellerProductsPage from "../pages/SellerProductsPage";
import { USER_DOMAIN } from "../shared/enums/UserDomain.enum";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },

      {
        element: <ProtectedRoute allowedDomain={USER_DOMAIN.PUBLIC} />,
        children: [
          { path: "products", element: <ProductsPage /> },
          { path: "product-detail/:id", element: <ProductDetailPage /> },
          { path: "cart", element: <CartPage /> },
        ],
      },

      {
        element: <ProtectedRoute allowedDomain={USER_DOMAIN.SELLER} />,
        children: [
          { path: "seller/products", element: <SellerProductsPage /> },
        ],
      },

      {
        element: <ProtectedRoute allowedDomain={USER_DOMAIN.ADMIN} />,
        children: [{ path: "admin/products", element: <AdminProductsPage /> }],
      },

      {
        path: "auth",
        element: <AuthPage />,
      },

      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

export default router;
