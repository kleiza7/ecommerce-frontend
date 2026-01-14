import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary";
import PageFallback from "../components/PageFallback";
import ProtectedRoute from "../components/ProtectedRoute";
import RootLayout from "../components/RootLayout";
import { USER_DOMAIN } from "../shared/enums/UserDomain.enum";

const DashboardPage = lazy(() => import("../pages/DashboardPage"));
const ProductsPage = lazy(() => import("../pages/ProductsPage/ProductsPage"));
const ProductDetailPage = lazy(
  () => import("../pages/ProductDetailPage/ProductDetailPage"),
);
const CartPage = lazy(() => import("../pages/CartPage/CartPage"));
const MyFavoritesPage = lazy(
  () => import("../pages/MyFavoritesPage/MyFavoritesPage"),
);
const MyOrdersPage = lazy(() => import("../pages/MyOrdersPage"));
const OrderDetailPage = lazy(() => import("../pages/OrderDetailPage"));
const SellerProductsPage = lazy(
  () => import("../pages/SellerProductsPage/SellerProductsPage"),
);
const AdminProductsPage = lazy(
  () => import("../pages/AdminProductsPage/AdminProductsPage"),
);
const AuthPage = lazy(() => import("../pages/AuthPage/AuthPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

const router = createBrowserRouter([
  {
    element: (
      <ErrorBoundary>
        <Suspense fallback={<PageFallback />}>
          <RootLayout />
        </Suspense>
      </ErrorBoundary>
    ),
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
    element: (
      <Suspense fallback={<PageFallback />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
]);

export default router;
