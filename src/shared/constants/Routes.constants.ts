import type { AUTH_PAGE_MODE } from "../enums/AuthPageMode.enum";

export const ROUTES = {
  HOME_PAGE: {
    path: "/",
    build: () => "/",
  },

  PRODUCTS_PAGE: {
    path: "products",
    build: () => "/products",
  },

  PRODUCT_DETAIL_PAGE: {
    path: "product-detail/:id",
    build: (id: string | number) => `/product-detail/${id}`,
  },

  CART_PAGE: {
    path: "cart",
    build: () => "/cart",
  },

  MY_FAVORITES_PAGE: {
    path: "my-favorites",
    build: () => "/my-favorites",
  },

  MY_ORDERS_PAGE: {
    path: "my-orders",
    build: () => "/my-orders",
  },

  ORDER_DETAIL_PAGE: {
    path: "order-detail/:id",
    build: (id: string | number) => `/order-detail/${id}`,
  },

  CHECKOUT_PAGE: {
    path: "checkout/:orderId",
    build: (orderId: string | number) => `/checkout/${orderId}`,
  },

  SELLER_PAGE: {
    path: "seller",
    build: () => "/seller",
  },

  SELLER_PRODUCTS_PAGE: {
    path: "products",
    build: () => "/seller/products",
  },

  ADMIN_PAGE: {
    path: "admin",
    build: () => "/admin",
  },

  ADMIN_PRODUCTS_PAGE: {
    path: "products",
    build: () => "/admin/products",
  },

  ADMIN_BRANDS_PAGE: {
    path: "brands",
    build: () => "/admin/brands",
  },

  AUTH_PAGE: {
    path: "auth",
    build: (mode?: AUTH_PAGE_MODE) => (mode ? `/auth?mode=${mode}` : "/auth"),
  },
} as const;

export const SELLER_ROUTES = [
  {
    label: "My Products",
    path: ROUTES.SELLER_PRODUCTS_PAGE.build(),
  },
];

export const ADMIN_ROUTES = [
  {
    label: "Products",
    path: ROUTES.ADMIN_PRODUCTS_PAGE.build(),
  },
  {
    label: "Brands",
    path: ROUTES.ADMIN_BRANDS_PAGE.build(),
  },
];
