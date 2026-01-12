import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import RootLayout from "../components/RootLayout";
import AdminProductsPage from "../pages/AdminProductsPage/AdminProductsPage";
import AuthPage from "../pages/AuthPage/AuthPage";
import CartPage from "../pages/CartPage/CartPage";
import DashboardPage from "../pages/DashboardPage";
import MyFavoritesPage from "../pages/MyFavoritesPage/MyFavoritesPage";
import MyOrdersPage from "../pages/MyOrdersPage";
import OrderDetailPage from "../pages/OrderDetailPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import SellerProductsPage from "../pages/SellerProductsPage/SellerProductsPage";
import { USER_DOMAIN } from "../shared/enums/UserDomain.enum";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },

      // ✅ GUEST + USER
      {
        element: (
          <ProtectedRoute
            allowedDomains={[USER_DOMAIN.GUEST, USER_DOMAIN.USER]}
          />
        ),
        children: [
          { path: "products", element: <ProductsPage /> },
          { path: "product-detail/:id", element: <ProductDetailPage /> },
          { path: "cart", element: <CartPage /> },
          { path: "my-favorites", element: <MyFavoritesPage /> },
        ],
      },

      // ✅ ONLY USER
      {
        element: <ProtectedRoute allowedDomains={[USER_DOMAIN.USER]} />,
        children: [
          { path: "my-orders", element: <MyOrdersPage /> },
          { path: "order-detail/:id", element: <OrderDetailPage /> },
        ],
      },

      // ✅ SELLER
      {
        element: <ProtectedRoute allowedDomains={[USER_DOMAIN.SELLER]} />,
        children: [
          { path: "seller/products", element: <SellerProductsPage /> },
        ],
      },

      // ✅ ADMIN
      {
        element: <ProtectedRoute allowedDomains={[USER_DOMAIN.ADMIN]} />,
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
