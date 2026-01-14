import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import RootLayout from "../components/RootLayout";
import AdminProductsPage from "../pages/AdminProductsPage/AdminProductsPage";
import AuthPage from "../pages/AuthPage/AuthPage";
import CartPage from "../pages/CartPage/CartPage";
import DashboardPage from "../pages/DashboardPage";
import MyFavoritesPage from "../pages/MyFavoritesPage/MyFavoritesPage";
import MyOrdersPage from "../pages/MyOrdersPage";
import NotFoundPage from "../pages/NotFoundPage";
import OrderDetailPage from "../pages/OrderDetailPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import SellerProductsPage from "../pages/SellerProductsPage/SellerProductsPage";
import { USER_DOMAIN } from "../shared/enums/UserDomain.enum";

const router = createBrowserRouter([
  // ✅ NORMAL APP (Navbar + Layout VAR)
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <DashboardPage /> },

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

      {
        element: <ProtectedRoute allowedDomains={[USER_DOMAIN.USER]} />,
        children: [
          { path: "my-orders", element: <MyOrdersPage /> },
          { path: "order-detail/:id", element: <OrderDetailPage /> },
        ],
      },

      {
        element: <ProtectedRoute allowedDomains={[USER_DOMAIN.SELLER]} />,
        children: [
          { path: "seller/products", element: <SellerProductsPage /> },
        ],
      },

      {
        element: <ProtectedRoute allowedDomains={[USER_DOMAIN.ADMIN]} />,
        children: [{ path: "admin/products", element: <AdminProductsPage /> }],
      },

      { path: "auth", element: <AuthPage /> },
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
