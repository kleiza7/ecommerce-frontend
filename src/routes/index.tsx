import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import ErrorBoundary from "../components/ErrorBoundary";
import PageFallback from "../components/PageFallback";
import ProtectedRoute from "../components/ProtectedRoute";
import RootLayout from "../components/RootLayout";
import SellerLayout from "../components/SellerLayout";
import { ROUTES } from "../shared/constants/Routes.constants";
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
const MyOrdersPage = lazy(() => import("../pages/MyOrdersPage/MyOrdersPage"));
const OrderDetailPage = lazy(() => import("../pages/OrderDetailPage"));

const SellerProductsPage = lazy(
  () => import("../pages/SellerProductsPage/SellerProductsPage"),
);

const AdminProductsPage = lazy(
  () => import("../pages/AdminProductsPage/AdminProductsPage"),
);
const BrandsPage = lazy(() => import("../pages/BrandsPage/BrandsPage"));

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
      { path: ROUTES.HOME_PAGE.path, element: <DashboardPage /> },

      {
        element: (
          <ProtectedRoute
            allowedDomains={[USER_DOMAIN.GUEST, USER_DOMAIN.USER]}
          />
        ),
        children: [
          { path: ROUTES.PRODUCTS_PAGE.path, element: <ProductsPage /> },
          {
            path: ROUTES.PRODUCT_DETAIL_PAGE.path,
            element: <ProductDetailPage />,
          },
          { path: ROUTES.CART_PAGE.path, element: <CartPage /> },
          {
            path: ROUTES.MY_FAVORITES_PAGE.path,
            element: <MyFavoritesPage />,
          },
        ],
      },

      {
        element: <ProtectedRoute allowedDomains={[USER_DOMAIN.USER]} />,
        children: [
          {
            path: ROUTES.MY_ORDERS_PAGE.path,
            element: <MyOrdersPage />,
          },
          {
            path: ROUTES.ORDER_DETAIL_PAGE.path,
            element: <OrderDetailPage />,
          },
        ],
      },

      {
        element: <ProtectedRoute allowedDomains={[USER_DOMAIN.SELLER]} />,
        children: [
          {
            path: ROUTES.SELLER_PAGE.path,
            element: <SellerLayout />,
            children: [
              {
                path: ROUTES.SELLER_PRODUCTS_PAGE.path,
                element: <SellerProductsPage />,
              },
            ],
          },
        ],
      },

      {
        element: <ProtectedRoute allowedDomains={[USER_DOMAIN.ADMIN]} />,
        children: [
          {
            path: ROUTES.ADMIN_PAGE.path,
            element: <AdminLayout />,
            children: [
              {
                path: ROUTES.ADMIN_PRODUCTS_PAGE.path,
                element: <AdminProductsPage />,
              },
              {
                path: ROUTES.ADMIN_BRANDS_PAGE.path,
                element: <BrandsPage />,
              },
            ],
          },
        ],
      },

      { path: ROUTES.AUTH_PAGE.path, element: <AuthPage /> },
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
