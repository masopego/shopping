export const ROUTES = {
  HOME: '/',
  CART: '/cart',
  PRODUCT_DETAIL: (productId: string) => `/products/${encodeURIComponent(productId)}`,
} as const;
